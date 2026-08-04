// Pure, side-effect-free salary percentile estimator.
//
// Why this exists: the original plan for this tool was a "region + years of
// experience" personalized calculator, but src/data/bls-wages.ts has no
// region- or experience-level breakdown at all -- building that calculator
// would mean inventing numbers BLS never published. See
// 工资分位数工具-实施方案_20260804.md for the full rationale.
//
// What this does instead: takes a user's stated annual salary and locates it
// within the *real* percentile points BLS already publishes for that
// occupation (p10, p25, medianAnnual, p75, p90), via linear interpolation
// between whichever of those points actually exist for the occupation.
// Many occupations in bls-wages.ts only have {p10, p90} (no p25/p75), and a
// few have no percentiles at all (only medianAnnual) -- both are handled by
// degrading gracefully rather than fabricating missing points.

import type { WagePercentiles } from '../data/bls-wages';

/** Minimal shape this module needs -- deliberately narrower than BlsWageEntry so callers/tests don't have to construct a full entry. */
export interface PercentileSource {
	medianAnnual: number;
	percentiles: WagePercentiles;
}

export type PercentileEstimateStatus =
	/** Input falls between two known points (or exactly matches one) -- an exact interpolated percentile is available. */
	| 'interpolated'
	/** Input is below the lowest percentile point BLS publishes for this occupation. Percentile is capped, not extrapolated past 0. */
	| 'below_range'
	/** Input is above the highest percentile point BLS publishes for this occupation. Percentile is capped, not extrapolated past 100. */
	| 'above_range'
	/** Occupation has no percentile breakdown at all (only medianAnnual) -- input is below the median. No precise percentile can be computed. */
	| 'degraded_below_median'
	/** Same degraded case, input is above the median. */
	| 'degraded_above_median'
	/** Same degraded case, input equals the median exactly. */
	| 'degraded_equal_median';

export interface PercentileEstimate {
	status: PercentileEstimateStatus;
	/** Estimated percentile, 0-100. Only set when status is 'interpolated'. */
	percentile?: number;
	/** The known percentile point the input was capped against, for below_range/above_range. */
	boundPercentile?: number;
	/** Ready-to-render summary sentence. */
	message: string;
}

const ORDINAL_LABELS: Record<number, string> = {
	10: '10th',
	25: '25th',
	50: '50th',
	75: '75th',
	90: '90th',
};

function ordinal(n: number): string {
	if (ORDINAL_LABELS[n]) return ORDINAL_LABELS[n];
	// Fallback for any percentile not in the fixed BLS set above (shouldn't
	// occur with current data, but keeps this function honestly general).
	const rounded = Math.round(n);
	const mod100 = rounded % 100;
	if (mod100 >= 11 && mod100 <= 13) return `${rounded}th`;
	switch (rounded % 10) {
		case 1:
			return `${rounded}st`;
		case 2:
			return `${rounded}nd`;
		case 3:
			return `${rounded}rd`;
		default:
			return `${rounded}th`;
	}
}

const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

/**
 * Estimate where `input` (a user-supplied annual salary) falls within the
 * known BLS percentile points for `source`, via piecewise linear
 * interpolation. Pure function, no I/O, no rounding surprises hidden from
 * callers -- `percentile` is returned unrounded so UI code can format it.
 */
export function estimatePercentile(input: number, source: PercentileSource): PercentileEstimate {
	const { medianAnnual, percentiles } = source;

	const knownPoints: Array<[number, number]> = (
		[
			[10, percentiles.p10],
			[25, percentiles.p25],
			[50, medianAnnual],
			[75, percentiles.p75],
			[90, percentiles.p90],
		] as Array<[number, number | undefined]>
	).filter((point): point is [number, number] => typeof point[1] === 'number');

	// Degraded mode: this occupation has no percentile breakdown published,
	// only a median. The most honest thing this tool can say is above/below/
	// about-equal-to the median -- anything more precise would be a guess.
	if (knownPoints.length <= 1) {
		if (input === medianAnnual) {
			return {
				status: 'degraded_equal_median',
				message: `That's about equal to the published median wage (${usd(medianAnnual)}) for this occupation. BLS hasn't published a fuller percentile breakdown for it, so a more precise standing can't be estimated.`,
			};
		}
		if (input < medianAnnual) {
			return {
				status: 'degraded_below_median',
				message: `That's below the published median wage (${usd(medianAnnual)}) for this occupation. BLS hasn't published a fuller percentile breakdown for it, so a more precise standing can't be estimated.`,
			};
		}
		return {
			status: 'degraded_above_median',
			message: `That's above the published median wage (${usd(medianAnnual)}) for this occupation. BLS hasn't published a fuller percentile breakdown for it, so a more precise standing can't be estimated.`,
		};
	}

	// Sort defensively -- percentile/value pairs should already be ascending
	// (verified separately by tools/bls-data/wages-source.test.mjs), but this
	// function shouldn't silently misbehave if that invariant is ever broken.
	knownPoints.sort((a, b) => a[0] - b[0]);

	const [minPct, minVal] = knownPoints[0];
	const [maxPct, maxVal] = knownPoints[knownPoints.length - 1];

	if (input <= minVal) {
		if (input === minVal) {
			return {
				status: 'interpolated',
				percentile: minPct,
				message: `That matches the ${ordinal(minPct)} percentile for this occupation, right at the bottom of the range BLS tracks.`,
			};
		}
		return {
			status: 'below_range',
			boundPercentile: minPct,
			message: `That's below the ${ordinal(minPct)} percentile tracked for this occupation, the lowest point BLS publishes for it.`,
		};
	}

	if (input >= maxVal) {
		if (input === maxVal) {
			return {
				status: 'interpolated',
				percentile: maxPct,
				message: `That matches the ${ordinal(maxPct)} percentile for this occupation, right at the top of the range BLS tracks.`,
			};
		}
		return {
			status: 'above_range',
			boundPercentile: maxPct,
			message: `That's above the ${ordinal(maxPct)} percentile tracked for this occupation, the highest point BLS publishes for it.`,
		};
	}

	for (let i = 1; i < knownPoints.length; i++) {
		const [lowPct, lowVal] = knownPoints[i - 1];
		const [highPct, highVal] = knownPoints[i];
		if (input < lowVal || input > highVal) continue;

		// Guard against a zero-width segment (equal values at two different
		// declared percentiles) so this never divides by zero -- shouldn't
		// happen given the ascending-values invariant, but stay defensive.
		const percentile = highVal === lowVal ? lowPct : lowPct + ((input - lowVal) / (highVal - lowVal)) * (highPct - lowPct);

		return {
			status: 'interpolated',
			percentile,
			message: `Your income is higher than about ${Math.round(percentile)}% of workers in this occupation, based on BLS wage percentiles.`,
		};
	}

	// Unreachable: input is bounded within [minVal, maxVal] by the checks
	// above, and knownPoints spans that same range, so some segment above
	// must contain it. Thrown instead of silently returning nothing so a
	// future refactor that breaks this invariant fails loudly.
	throw new Error('estimatePercentile: input was within known range but no segment matched -- this is a bug');
}
