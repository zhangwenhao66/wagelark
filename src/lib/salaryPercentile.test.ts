// Unit tests for src/lib/salaryPercentile.ts.
// Run with: npm test (node --test tools/bls-data/*.test.mjs src/lib/*.test.ts)
//
// This repo doesn't use vitest -- the existing convention (see
// tools/bls-data/wages-source.test.mjs) is node's built-in test runner, and
// Node 22's native TypeScript stripping runs .test.ts files directly, so
// this file follows the same node:test/node:assert pattern rather than
// introducing a new test framework dependency.

import test from 'node:test';
import assert from 'node:assert/strict';
import { estimatePercentile, type PercentileSource } from './salaryPercentile.ts';

// Modeled on the real shape of src/data/bls-wages.ts entries -- e.g. Actuaries
// (15-2011) has all four percentiles in the current dataset... except this
// repo's real data never actually has p25/p75 populated (see
// FULL_PERCENTILES note below). This fixture still exercises the general
// five-point case so the interpolation logic itself is proven correct even
// though today's live data happens to be sparser.
const FULL_PERCENTILES: PercentileSource = {
	medianAnnual: 100_000,
	percentiles: { p10: 60_000, p25: 80_000, p75: 120_000, p90: 160_000 },
};

// Matches the actual shape most bls-wages.ts entries use today: only p10/p90
// populated, p25/p75 absent (e.g. Dental Hygienists, Actuaries, Pharmacists).
const SPARSE_PERCENTILES: PercentileSource = {
	medianAnnual: 94_260,
	percentiles: { p10: 66_470, p90: 120_060 },
};

// Matches entries with no percentile breakdown at all, only medianAnnual
// (e.g. Diagnostic Medical Sonographers, Nurse Anesthetists in the real data).
const NO_PERCENTILES: PercentileSource = {
	medianAnnual: 89_340,
	percentiles: {},
};

test('all five known points present: interpolates within each segment', () => {
	// Between p25 (80k -> 25th) and median (100k -> 50th), so 90k is the
	// midpoint -> 37.5th percentile.
	const result = estimatePercentile(90_000, FULL_PERCENTILES);
	assert.equal(result.status, 'interpolated');
	assert.ok(result.percentile !== undefined);
	assert.ok(Math.abs(result.percentile! - 37.5) < 1e-9, `expected ~37.5, got ${result.percentile}`);
});

test('all five known points present: interpolates between median and p75', () => {
	// Between median (100k -> 50th) and p75 (120k -> 75th); 110k is the
	// midpoint -> 62.5th percentile.
	const result = estimatePercentile(110_000, FULL_PERCENTILES);
	assert.equal(result.status, 'interpolated');
	assert.ok(Math.abs(result.percentile! - 62.5) < 1e-9, `expected ~62.5, got ${result.percentile}`);
});

test('sparse percentiles (p25/p75 missing): interpolates using only p10/median/p90', () => {
	// Between p10 (66,470 -> 10th) and median (94,260 -> 50th).
	const midpoint = (66_470 + 94_260) / 2;
	const result = estimatePercentile(midpoint, SPARSE_PERCENTILES);
	assert.equal(result.status, 'interpolated');
	assert.ok(Math.abs(result.percentile! - 30) < 1e-9, `expected ~30, got ${result.percentile}`);
});

test('sparse percentiles: interpolates between median and p90', () => {
	const midpoint = (94_260 + 120_060) / 2;
	const result = estimatePercentile(midpoint, SPARSE_PERCENTILES);
	assert.equal(result.status, 'interpolated');
	assert.ok(Math.abs(result.percentile! - 70) < 1e-9, `expected ~70, got ${result.percentile}`);
});

test('input below the lowest known point: capped at the min, not extrapolated past 0', () => {
	const result = estimatePercentile(30_000, SPARSE_PERCENTILES);
	assert.equal(result.status, 'below_range');
	assert.equal(result.boundPercentile, 10);
	assert.equal(result.percentile, undefined);
	assert.match(result.message, /10th percentile/);
});

test('input above the highest known point: capped at the max, not extrapolated past 100', () => {
	const result = estimatePercentile(500_000, SPARSE_PERCENTILES);
	assert.equal(result.status, 'above_range');
	assert.equal(result.boundPercentile, 90);
	assert.equal(result.percentile, undefined);
	assert.match(result.message, /90th percentile/);
});

test('input exactly equal to p10: returns exact percentile 10, not below_range', () => {
	const result = estimatePercentile(66_470, SPARSE_PERCENTILES);
	assert.equal(result.status, 'interpolated');
	assert.equal(result.percentile, 10);
});

test('input exactly equal to p90: returns exact percentile 90, not above_range', () => {
	const result = estimatePercentile(120_060, SPARSE_PERCENTILES);
	assert.equal(result.status, 'interpolated');
	assert.equal(result.percentile, 90);
});

test('input exactly equal to medianAnnual: returns exact percentile 50', () => {
	const result = estimatePercentile(94_260, SPARSE_PERCENTILES);
	assert.equal(result.status, 'interpolated');
	assert.equal(result.percentile, 50);
});

test('input exactly equal to p25 (full dataset): returns exact percentile 25', () => {
	const result = estimatePercentile(80_000, FULL_PERCENTILES);
	assert.equal(result.status, 'interpolated');
	assert.equal(result.percentile, 25);
});

test('no percentiles at all: input below median degrades to below_median, no percentile number', () => {
	const result = estimatePercentile(50_000, NO_PERCENTILES);
	assert.equal(result.status, 'degraded_below_median');
	assert.equal(result.percentile, undefined);
	assert.match(result.message, /below the published median/);
});

test('no percentiles at all: input above median degrades to above_median, no percentile number', () => {
	const result = estimatePercentile(150_000, NO_PERCENTILES);
	assert.equal(result.status, 'degraded_above_median');
	assert.equal(result.percentile, undefined);
	assert.match(result.message, /above the published median/);
});

test('no percentiles at all: input exactly equal to median degrades to equal_median', () => {
	const result = estimatePercentile(89_340, NO_PERCENTILES);
	assert.equal(result.status, 'degraded_equal_median');
	assert.equal(result.percentile, undefined);
	assert.match(result.message, /about equal/);
});

test('percentile is monotonically non-decreasing as input increases (sanity check across full range)', () => {
	const inputs = [60_000, 70_000, 80_000, 90_000, 100_000, 110_000, 120_000, 140_000, 160_000];
	let prev = -Infinity;
	for (const input of inputs) {
		const result = estimatePercentile(input, FULL_PERCENTILES);
		const value = result.percentile ?? (result.status === 'below_range' ? 0 : 100);
		assert.ok(value >= prev, `percentile went backwards at input=${input}: ${value} < ${prev}`);
		prev = value;
	}
});

// ---------------------------------------------------------------------------
// Hourly <-> annual conversion helpers.
// ---------------------------------------------------------------------------

import {
	BLS_FULL_TIME_HOURS_PER_YEAR,
	hourlyToAnnual,
	annualToHourly,
	normalizeWageInput,
	describeWagePair,
} from './salaryPercentile.ts';

test('BLS full-time convention constant is 2,080 hours (40 x 52)', () => {
	assert.equal(BLS_FULL_TIME_HOURS_PER_YEAR, 2080);
	assert.equal(BLS_FULL_TIME_HOURS_PER_YEAR, 40 * 52);
});

test('hourlyToAnnual: defaults to 2,080 hours', () => {
	assert.equal(hourlyToAnnual(28.5), 59_280);
	assert.equal(hourlyToAnnual(1), 2080);
});

test('hourlyToAnnual: rounds to whole dollars', () => {
	// 17.333 * 2080 = 36052.64 -> 36053
	assert.equal(hourlyToAnnual(17.333), 36_053);
	// 34.65 * 2080 = 72072 exactly (Forensic Science Technicians' real medianHourly)
	assert.equal(hourlyToAnnual(34.65), 72_072);
	assert.ok(Number.isInteger(hourlyToAnnual(0.005)));
});

test('hourlyToAnnual: honours a custom hoursPerYear', () => {
	// Half-time: 20 hours x 52 weeks.
	assert.equal(hourlyToAnnual(28.5, 1040), 29_640);
});

test('annualToHourly: defaults to 2,080 hours', () => {
	assert.equal(annualToHourly(59_280), 28.5);
	assert.equal(annualToHourly(2080), 1);
});

test('annualToHourly: rounds to cents', () => {
	// 72060 / 2080 = 34.6442... -> 34.64
	assert.equal(annualToHourly(72_060), 34.64);
	// 100000 / 2080 = 48.0769... -> 48.08
	assert.equal(annualToHourly(100_000), 48.08);
	// Never more than two decimals.
	assert.equal(annualToHourly(94_260) * 100, Math.round(annualToHourly(94_260) * 100));
});

test('annualToHourly: honours a custom hoursPerYear', () => {
	assert.equal(annualToHourly(29_640, 1040), 28.5);
});

test('round trip: hourly -> annual -> hourly returns the same cents value', () => {
	for (const h of [16.12, 22.11, 28.5, 47.28, 86.16]) {
		assert.equal(annualToHourly(hourlyToAnnual(h)), h);
	}
});

test('normalizeWageInput: hourly mode converts to annual for the lookup and keeps cents', () => {
	const pair = normalizeWageInput(28.5, 'hourly');
	assert.deepEqual(pair, { annual: 59_280, hourly: 28.5, enteredAs: 'hourly' });
});

test('normalizeWageInput: hourly mode rounds the typed hourly value to cents before converting', () => {
	const pair = normalizeWageInput(28.499, 'hourly');
	assert.equal(pair?.hourly, 28.5);
	assert.equal(pair?.annual, 59_280);
});

test('normalizeWageInput: annual mode leaves the typed value untouched and derives hourly', () => {
	const pair = normalizeWageInput(72_060, 'annual');
	assert.deepEqual(pair, { annual: 72_060, hourly: 34.64, enteredAs: 'annual' });
	// Unrounded annual input is passed through unchanged, so the percentile
	// lookup behaves exactly as before hourly input existed.
	assert.equal(normalizeWageInput(72_060.4, 'annual')?.annual, 72_060.4);
});

test('normalizeWageInput: rejects zero, negatives, NaN and Infinity in both modes', () => {
	for (const mode of ['annual', 'hourly'] as const) {
		assert.equal(normalizeWageInput(0, mode), null);
		assert.equal(normalizeWageInput(-5, mode), null);
		assert.equal(normalizeWageInput(Number.NaN, mode), null);
		assert.equal(normalizeWageInput(Number.POSITIVE_INFINITY, mode), null);
	}
});

test('normalizeWageInput: annual-mode result feeds estimatePercentile identically to a direct call', () => {
	const pair = normalizeWageInput(94_260, 'annual');
	assert.ok(pair);
	assert.deepEqual(estimatePercentile(pair!.annual, SPARSE_PERCENTILES), estimatePercentile(94_260, SPARSE_PERCENTILES));
});

test('describeWagePair: hourly entered leads with the hourly figure', () => {
	assert.equal(describeWagePair({ annual: 59_280, hourly: 28.5, enteredAs: 'hourly' }), '$28.50/hour ≈ $59,280/year');
});

test('describeWagePair: annual entered leads with the annual figure, hourly shown to two decimals', () => {
	assert.equal(describeWagePair({ annual: 72_060, hourly: 34.64, enteredAs: 'annual' }), '$72,060/year ≈ $34.64/hour');
	assert.equal(describeWagePair({ annual: 2080, hourly: 1, enteredAs: 'annual' }), '$2,080/year ≈ $1.00/hour');
});
