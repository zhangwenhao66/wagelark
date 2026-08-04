// Unit tests for tools/bls-data/wages-source.json.
// Run with: npm test  (node --test tools/bls-data/*.test.mjs)
//
// Two kinds of checks:
//  1. Structural sanity -- percentile ordering, required fields, source URLs.
//  2. Spot checks -- specific numbers transcribed by hand from live BLS.gov
//     pages on 2026-08-03 and hardcoded here independently of the source
//     file, so a future silent edit (typo, wrong occupation pasted in) to
//     wages-source.json gets caught instead of both drifting together.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = JSON.parse(readFileSync(path.join(__dirname, 'wages-source.json'), 'utf-8'));
const occupations = source.occupations;

const REQUIRED_SOC_CODES = [
	'29-1292', // Dental Hygienists
	'15-2011', // Actuaries
	'29-1051', // Pharmacists
	'29-1123', // Physical Therapists
	'29-1071', // Physician Assistants
	'23-2011', // Paralegals and Legal Assistants
	'29-2032', // Diagnostic Medical Sonographers
	'31-9097', // Phlebotomists
	'53-2031', // Flight Attendants
	'29-2034', // Radiologic Technologists and Technicians
	'29-1151', // Nurse Anesthetists
	'29-1171', // Nurse Practitioners
];

test('day-1 launch occupations are all present', () => {
	for (const soc of REQUIRED_SOC_CODES) {
		assert.ok(occupations[soc], `missing SOC ${soc} needed for launch articles`);
	}
});

test('every occupation has required fields with sane values', () => {
	for (const [soc, occ] of Object.entries(occupations)) {
		assert.match(soc, /^\d{2}-\d{4}$/, `${soc}: SOC code format`);
		assert.ok(occ.title && occ.title.length > 0, `${soc}: title required`);
		assert.ok(occ.medianAnnual > 0, `${soc}: medianAnnual must be positive`);
		assert.ok(occ.employment > 0, `${soc}: employment must be positive`);
		assert.ok(occ.entryEducation && occ.entryEducation.length > 0, `${soc}: entryEducation required`);
		assert.match(occ.dataYear, /^May \d{4}$/, `${soc}: dataYear must look like "May 2024"`);
		assert.match(occ.publishedDate, /^\d{4}-\d{2}-\d{2}$/, `${soc}: publishedDate must be ISO date`);
		assert.match(occ.projectionPeriod, /^\d{4}-\d{2}$/, `${soc}: projectionPeriod must look like "2024-34"`);
		assert.ok(occ.sourceUrl.startsWith('https://www.bls.gov/'), `${soc}: sourceUrl must be an official bls.gov page, got ${occ.sourceUrl}`);
		assert.ok(occ.sourceLabel && occ.sourceLabel.includes('BLS'), `${soc}: sourceLabel must credit BLS`);
		assert.ok(Array.isArray(occ.industryWages), `${soc}: industryWages must be an array`);
		for (const iw of occ.industryWages) {
			assert.ok(iw.annualWage > 0, `${soc}: industry wage for "${iw.industry}" must be positive`);
		}
	}
});

test('percentiles are strictly ascending where present', () => {
	for (const [soc, occ] of Object.entries(occupations)) {
		const p = occ.percentiles ?? {};
		const ordered = [
			['p10', p.p10],
			['p25', p.p25],
			['median', occ.medianAnnual],
			['p75', p.p75],
			['p90', p.p90],
		].filter(([, v]) => v !== undefined && v !== null);

		for (let i = 1; i < ordered.length; i++) {
			const [prevLabel, prevVal] = ordered[i - 1];
			const [label, val] = ordered[i];
			assert.ok(
				val > prevVal,
				`${soc}: expected ${prevLabel} (${prevVal}) < ${label} (${val})`,
			);
		}
	}
});

test('medianHourly * 2080 is within 2% of medianAnnual when both are present', () => {
	for (const [soc, occ] of Object.entries(occupations)) {
		if (occ.medianHourly === undefined) continue;
		const implied = occ.medianHourly * 2080;
		const diffPct = Math.abs(implied - occ.medianAnnual) / occ.medianAnnual;
		assert.ok(
			diffPct < 0.02,
			`${soc}: hourly*2080 (${implied.toFixed(0)}) vs annual (${occ.medianAnnual}) differ by ${(diffPct * 100).toFixed(1)}%`,
		);
	}
});

// Hand-transcribed from live bls.gov OOH pages on 2026-08-03. Independent of
// wages-source.json's own numbers -- do not derive these from the source file.
test('spot check: Dental Hygienists (29-1292) matches BLS OOH page', () => {
	const occ = occupations['29-1292'];
	assert.equal(occ.medianAnnual, 94260);
	assert.equal(occ.percentiles.p10, 66470);
	assert.equal(occ.percentiles.p90, 120060);
	assert.equal(occ.employment, 221600);
	assert.equal(occ.jobOutlookPct, 7);
});

test('spot check: Actuaries (15-2011) matches BLS OOH page', () => {
	const occ = occupations['15-2011'];
	assert.equal(occ.medianAnnual, 125770);
	assert.equal(occ.percentiles.p10, 75240);
	assert.equal(occ.percentiles.p90, 206430);
	assert.equal(occ.jobOutlookPct, 22);
});

test('spot check: Pharmacists (29-1051) matches BLS OOH page', () => {
	const occ = occupations['29-1051'];
	assert.equal(occ.medianAnnual, 137480);
	assert.equal(occ.medianHourly, 66.10);
	assert.equal(occ.employment, 335100);
});

test('spot check: Paralegals and Legal Assistants (23-2011) matches BLS OOH page', () => {
	const occ = occupations['23-2011'];
	assert.equal(occ.medianAnnual, 61010);
	assert.equal(occ.jobOutlookPct, 0);
	assert.equal(occ.employmentChange, 600);
});

test('spot check: Physician Assistants (29-1071) matches BLS OOH page', () => {
	const occ = occupations['29-1071'];
	assert.equal(occ.medianAnnual, 133260);
	assert.equal(occ.percentiles.p10, 95240);
	assert.equal(occ.percentiles.p90, 182200);
});

test('spot check: Flight Attendants (53-2031) matches BLS OOH page', () => {
	const occ = occupations['53-2031'];
	assert.equal(occ.medianAnnual, 67130);
	assert.equal(occ.percentiles.p10, 34030);
	assert.equal(occ.percentiles.p90, 138040);
});

// Hand-transcribed from live bls.gov OOH page on 2026-08-04. Independent of
// wages-source.json's own numbers -- do not derive these from the source file.
test('spot check: Radiologic Technologists and Technicians (29-2034) matches BLS OOH page', () => {
	const occ = occupations['29-2034'];
	assert.equal(occ.medianAnnual, 77660);
	// No medianHourly: the OOH page's only hourly figure ($37.97) is the
	// combined "Radiologic and MRI Technologists" Quick Facts number
	// ($78,980/yr / 2,080hrs), not specific to 29-2034 alone -- omitted
	// rather than published as a fact this page doesn't actually state.
	assert.equal(occ.medianHourly, undefined);
	assert.equal(occ.percentiles.p10, 52360);
	assert.equal(occ.percentiles.p90, 106990);
	assert.equal(occ.employment, 228000);
	assert.equal(occ.jobOutlookPct, 4);
	assert.equal(occ.employmentChange, 9800);
});

// Hand-transcribed from live bls.gov OOH page on 2026-08-04. Independent of
// wages-source.json's own numbers -- do not derive these from the source file.
test('spot check: Nurse Anesthetists (29-1151) matches BLS OOH page', () => {
	const occ = occupations['29-1151'];
	assert.equal(occ.medianAnnual, 223210);
	// This OOH page merges Nurse Anesthetists, Nurse Midwives, and Nurse
	// Practitioners. Its only 10th/90th percentile figures ($98,520 /
	// $217,270) are the combined-group range, not specific to nurse
	// anesthetists alone -- left empty rather than mislabeled as this
	// occupation's own split (same reasoning as the medianHourly omission
	// on Radiologic Technologists above).
	assert.deepEqual(occ.percentiles, {});
	assert.equal(occ.employment, 53800);
	// Per-occupation projections table breaks these two figures out by SOC
	// code (29-1151 specifically), unlike the percentile range above.
	assert.equal(occ.jobOutlookPct, 9);
	assert.equal(occ.employmentChange, 4600);
});

// Hand-transcribed from live bls.gov OOH page on 2026-08-04. Independent of
// wages-source.json's own numbers -- do not derive these from the source file.
test('spot check: Nurse Practitioners (29-1171) matches BLS OOH page', () => {
	const occ = occupations['29-1171'];
	assert.equal(occ.medianAnnual, 129210);
	// Same merged-page situation as 29-1151 above: the page's only 10th/90th
	// percentile and industry-wage figures are for the combined three-role
	// group, not nurse practitioners alone -- left empty rather than
	// mislabeled as this occupation's own split.
	assert.deepEqual(occ.percentiles, {});
	assert.deepEqual(occ.industryWages, []);
	assert.equal(occ.employment, 320400);
	// Per-occupation projections table breaks these two figures out by SOC
	// code (29-1171 specifically), unlike the percentile range above.
	assert.equal(occ.jobOutlookPct, 40);
	assert.equal(occ.employmentChange, 128400);
});
