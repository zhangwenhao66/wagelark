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
