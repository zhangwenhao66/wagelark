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
	'29-2055', // Surgical Technologists
	'29-2052', // Pharmacy Technicians
	'31-9091', // Dental Assistants
	'31-9092', // Medical Assistants
	'53-2021', // Air Traffic Controllers
	'31-1131', // Nursing Assistants
	'29-1126', // Respiratory Therapists
	'47-2111', // Electricians
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

// Re-verified against the live bls.gov OOH page on 2026-08-04 (still May 2024
// data, page last modified 2025-08-28 -- unchanged since the 2026-08-03 transcription).
test('spot check: Physician Assistants (29-1071) matches BLS OOH page', () => {
	const occ = occupations['29-1071'];
	assert.equal(occ.medianAnnual, 133260);
	assert.equal(occ.medianHourly, 64.07);
	assert.equal(occ.percentiles.p10, 95240);
	assert.equal(occ.percentiles.p90, 182200);
	assert.equal(occ.employment, 162700);
	assert.equal(occ.jobOutlookPct, 20);
	assert.equal(occ.employmentChange, 33200);
	assert.equal(occ.industryWages.length, 5);
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

// Hand-transcribed from the live bls.gov OOH page (Surgical Assistants and
// Technologists, combined narrative) and the live BLS Employment Projections
// National Employment Matrix Table 1.2 (which breaks the combined occupation
// back out to individual SOC codes) on 2026-08-05. Independent of
// wages-source.json's own numbers -- do not derive these from the source file.
test('spot check: Surgical Technologists (29-2055) matches BLS OOH page + Employment Projections Table 1.2', () => {
	const occ = occupations['29-2055'];
	assert.equal(occ.medianAnnual, 62830);
	// The OOH page merges Surgical Assistants and Surgical Technologists.
	// Its only 10th/90th percentile figures, if any, would be for the
	// combined group -- this page publishes none at all, so percentiles are
	// left empty rather than fabricated (same reasoning as the Nurse
	// Anesthetists / Nurse Practitioners entries above).
	assert.deepEqual(occ.percentiles, {});
	assert.deepEqual(occ.industryWages, []);
	// Employment Projections Table 1.2 breaks employment, growth rate, and
	// job change out by SOC code even though the OOH narrative combines
	// the two roles: 115.6k -> 120.8k (2024-34), a 4.5% change.
	assert.equal(occ.employment, 115600);
	assert.equal(occ.jobOutlookPct, 4.5);
	assert.equal(occ.employmentChange, 5200);
	// No medianHourly: the OOH page's only hourly figure ($30.04) is the
	// combined "Surgical Assistants and Technologists" Quick Facts number,
	// not specific to surgical technologists alone -- omitted rather than
	// published as a fact this page doesn't actually state for this SOC.
	assert.equal(occ.medianHourly, undefined);
});

// Hand-transcribed from the live bls.gov OOH page (Pharmacy Technicians has
// its own standalone page, unlike several merged-occupation pages above) on
// 2026-08-05. Independent of wages-source.json's own numbers -- do not
// derive these from the source file.
test('spot check: Pharmacy Technicians (29-2052) matches BLS OOH page', () => {
	const occ = occupations['29-2052'];
	assert.equal(occ.medianAnnual, 43460);
	// Independent review on 2026-08-05 caught that the Pay tab's narrative
	// text omits an hourly figure, but the page's Quick Facts box does state
	// one ($20.90/hr) -- corrected here after being wrongly published as
	// "no separate hourly rate" in the article on first draft.
	assert.equal(occ.medianHourly, 20.90);
	assert.equal(occ.percentiles.p10, 35100);
	assert.equal(occ.percentiles.p90, 59450);
	assert.equal(occ.employment, 490400);
	assert.equal(occ.jobOutlookPct, 6);
	assert.equal(occ.employmentChange, 31500);
	assert.equal(occ.industryWages.length, 5);
});

// Hand-transcribed from the live bls.gov OOH page (Dental Assistants has its
// own standalone page) on 2026-08-06 via Browser pane (curl 403s on bls.gov).
// Independent of wages-source.json's own numbers -- do not derive these from
// the source file.
test('spot check: Dental Assistants (31-9091) matches BLS OOH page', () => {
	const occ = occupations['31-9091'];
	assert.equal(occ.medianAnnual, 47300);
	assert.equal(occ.medianHourly, 22.74);
	assert.equal(occ.percentiles.p10, 36190);
	assert.equal(occ.percentiles.p90, 61780);
	assert.equal(occ.employment, 381900);
	assert.equal(occ.jobOutlookPct, 6);
	assert.equal(occ.employmentChange, 24400);
	assert.equal(occ.industryWages.length, 3);
});

// Re-verified 2026-08-28 (trafficsite-content-quality-audit) via a direct
// curl fetch of the live bls.gov OOH page with a descriptive User-Agent
// (`curl -A "Mozilla/5.0 (Research; contact: 0009888@gmail.com)" ...`) --
// this returned HTTP 200, not the 403 the 2026-08-06 write-up hit, so this
// is a direct fetch, not a Wayback snapshot. BLS had refreshed this specific
// occupation page from May 2024 to May 2025 data (2025-2035 projections) by
// this date; a second, fully independent sub-agent re-fetched the same URL
// separately and confirmed every figure below verbatim. Independent of
// wages-source.json's own numbers -- do not derive these from the source
// file.
test('spot check: Medical Assistants (31-9092) matches BLS OOH page', () => {
	const occ = occupations['31-9092'];
	assert.equal(occ.medianAnnual, 45690);
	assert.equal(occ.medianHourly, 21.97);
	assert.equal(occ.percentiles.p10, 36050);
	assert.equal(occ.percentiles.p90, 59310);
	assert.equal(occ.employment, 833900);
	assert.equal(occ.jobOutlookPct, 13);
	assert.equal(occ.employmentChange, 107600);
	assert.equal(occ.industryWages.length, 4);
});

// Re-verified 2026-08-30 (trafficsite-content-quality-audit) via a direct
// curl fetch of the live bls.gov OOH page with a descriptive User-Agent
// (`curl -A "Mozilla/5.0 (compatible; WageLarkContentAudit/1.0; ...)" ...`)
// -- this returned HTTP 200, not the 403 the 2026-08-09 write-up hit, so
// this is a direct fetch, not a Wayback snapshot. BLS had refreshed this
// occupation page from May 2024 to May 2025 data (2025-2035 projections) by
// this date; a second, fully independent sub-agent re-fetched the same URL
// separately and confirmed every figure below (except p90, independently
// confirmed instead from this session's own direct fetch, since the
// sub-agent's extraction of that one figure landed on an adjacent
// occupation's chart value by mistake). Independent of wages-source.json's
// own numbers -- do not derive these from the source file.
test('spot check: Air Traffic Controllers (53-2021) matches BLS OOH page', () => {
	const occ = occupations['53-2021'];
	assert.equal(occ.medianAnnual, 148080);
	assert.equal(occ.medianHourly, 71.19);
	assert.equal(occ.percentiles.p10, 78420);
	assert.equal(occ.percentiles.p90, 215610);
	assert.equal(occ.employment, 24000);
	assert.equal(occ.jobOutlookPct, 2);
	assert.equal(occ.employmentChange, 400);
	assert.equal(occ.industryWages.length, 2);
});

// Numbers below transcribed by hand on 2026-08-10 from a Wayback Machine
// snapshot (2026-07-31 crawl) of bls.gov/ooh/healthcare/nursing-assistants.htm
// (direct fetch returns Akamai 403, same pattern as prior spot checks).
// Independent of wages-source.json's own numbers -- do not derive these from
// the source file. The OOH page covers "Nursing Assistants and Orderlies" as
// one profile but breaks out separate SOC-level figures in its Pay and
// Employment Projections tables for the two sub-occupations; these are the
// Nursing Assistants (31-1131) breakout, not the blended profile figure.
test('spot check: Nursing Assistants (31-1131) matches BLS OOH page', () => {
	const occ = occupations['31-1131'];
	assert.equal(occ.medianAnnual, 39530);
	assert.equal(occ.percentiles.p10, 31390);
	assert.equal(occ.percentiles.p90, 50140);
	assert.equal(occ.employment, 1441500);
	assert.equal(occ.jobOutlookPct, 2);
	assert.equal(occ.employmentChange, 32600);
	assert.equal(occ.industryWages.length, 5);
});

// Numbers below transcribed by hand on 2026-08-10 from a Wayback Machine
// snapshot (2026-07-18 crawl) of bls.gov/ooh/healthcare/respiratory-therapists.htm
// (direct fetch returns Akamai 403, same pattern as prior spot checks).
// Independent of wages-source.json's own numbers -- do not derive these from
// the source file. This is an independent OOH page (not a merged profile
// with another occupation), so all fields including percentiles and
// industryWages are specific to Respiratory Therapists (29-1126).
test('spot check: Respiratory Therapists (29-1126) matches BLS OOH page', () => {
	const occ = occupations['29-1126'];
	assert.equal(occ.medianAnnual, 80450);
	assert.equal(occ.medianHourly, 38.68);
	assert.equal(occ.percentiles.p10, 61900);
	assert.equal(occ.percentiles.p90, 108820);
	assert.equal(occ.employment, 139600);
	assert.equal(occ.jobOutlookPct, 12);
	assert.equal(occ.employmentChange, 16800);
	assert.equal(occ.industryWages.length, 3);
});

// Numbers below transcribed by hand on 2026-08-11 from a live fetch of
// bls.gov/ooh/construction-and-extraction/electricians.htm via the r.jina.ai
// reader proxy (direct curl returns Akamai 403, same pattern as prior spot
// checks; the reader's raw-HTML mode also surfaced the page's own "Last
// modified date: August 28, 2025" footer, matching the same data-freshness
// date as every other spot check in this file). Independent of
// wages-source.json's own numbers -- do not derive these from the source file.
// This is an independent OOH page (not a merged profile with another
// occupation), so all fields including percentiles and industryWages are
// specific to Electricians (47-2111).
test('spot check: Electricians (47-2111) matches BLS OOH page', () => {
	const occ = occupations['47-2111'];
	assert.equal(occ.medianAnnual, 62350);
	assert.equal(occ.medianHourly, 29.98);
	assert.equal(occ.percentiles.p10, 39430);
	assert.equal(occ.percentiles.p90, 106030);
	assert.equal(occ.employment, 818700);
	assert.equal(occ.jobOutlookPct, 9);
	assert.equal(occ.employmentChange, 77400);
	assert.equal(occ.industryWages.length, 4);
});

// Independently transcribed by hand from the live BLS OOH Firefighters page
// (https://www.bls.gov/ooh/protective-service/firefighters.htm) on 2026-08-11
// via r.jina.ai proxy read (direct bls.gov fetch returns 403 for this agent's
// network path -- same footer confirms "Last modified date: August 28, 2025",
// matching the same data-freshness date as every other spot check in this
// file). Independent of wages-source.json's own numbers -- do not derive
// these from the source file. This is an independent OOH page, so all fields
// including percentiles and industryWages are specific to Firefighters (33-2011).
test('spot check: Firefighters (33-2011) matches BLS OOH page', () => {
	const occ = occupations['33-2011'];
	assert.equal(occ.medianAnnual, 59530);
	assert.equal(occ.medianHourly, 28.62);
	assert.equal(occ.percentiles.p10, 34490);
	assert.equal(occ.percentiles.p90, 101330);
	assert.equal(occ.employment, 344900);
	assert.equal(occ.jobOutlookPct, 3);
	assert.equal(occ.employmentChange, 11800);
	assert.equal(occ.industryWages.length, 3);
});

// Independently transcribed by hand from the live BLS OOH Plumbers,
// Pipefitters, and Steamfitters page
// (https://www.bls.gov/ooh/construction-and-extraction/plumbers-pipefitters-and-steamfitters.htm)
// on 2026-08-12 via r.jina.ai proxy read (direct bls.gov fetch returns 403
// for this agent's network path -- same footer confirms "Last modified
// date: August 28, 2025", matching the same data-freshness date as every
// other spot check in this file). Independent of wages-source.json's own
// numbers -- do not derive these from the source file. This occupation
// covers three related job titles under one SOC code and OOH page, but BLS
// publishes single unified Pay/Outlook figures for the combined group
// (not separate percentiles per title), so all fields here are that
// combined-group figure as BLS itself reports it.
test('spot check: Plumbers, Pipefitters, and Steamfitters (47-2152) matches BLS OOH page', () => {
	const occ = occupations['47-2152'];
	assert.equal(occ.medianAnnual, 62970);
	assert.equal(occ.medianHourly, 30.27);
	assert.equal(occ.percentiles.p10, 40670);
	assert.equal(occ.percentiles.p90, 105150);
	assert.equal(occ.employment, 504500);
	assert.equal(occ.jobOutlookPct, 4);
	assert.equal(occ.employmentChange, 22700);
	assert.equal(occ.industryWages.length, 4);
});

// Independently transcribed by hand from the live BLS OOH Heavy and
// Tractor-trailer Truck Drivers page
// (https://www.bls.gov/ooh/transportation-and-material-moving/heavy-and-tractor-trailer-truck-drivers.htm)
// on 2026-08-12 via r.jina.ai proxy read (direct bls.gov fetch returns 403
// for this agent's network path -- same footer confirms "Last modified
// date: August 28, 2025", matching the same data-freshness date as every
// other spot check in this file). Independent of wages-source.json's own
// numbers -- do not derive these from the source file. This is an
// independent OOH page, so all fields including percentiles and
// industryWages are specific to Heavy and Tractor-trailer Truck Drivers
// (53-3032).
test('spot check: Heavy and Tractor-trailer Truck Drivers (53-3032) matches BLS OOH page', () => {
	const occ = occupations['53-3032'];
	assert.equal(occ.medianAnnual, 57440);
	assert.equal(occ.medianHourly, 27.62);
	assert.equal(occ.percentiles.p10, 38640);
	assert.equal(occ.percentiles.p90, 78800);
	assert.equal(occ.employment, 2235100);
	assert.equal(occ.jobOutlookPct, 4);
	assert.equal(occ.employmentChange, 89300);
	assert.equal(occ.industryWages.length, 4);
});

// Independently transcribed by hand from the live BLS OOH Welders, Cutters,
// Solderers, and Brazers page
// (https://www.bls.gov/ooh/production/welders-cutters-solderers-and-brazers.htm)
// on 2026-08-13 via r.jina.ai proxy read (direct bls.gov fetch returns 403
// for this agent's network path -- same footer confirms "Last modified
// date: August 28, 2025", matching the same data-freshness date as every
// other spot check in this file). Independent of wages-source.json's own
// numbers -- do not derive these from the source file.
test('spot check: Welders, Cutters, Solderers, and Brazers (51-4121) matches BLS OOH page', () => {
	const occ = occupations['51-4121'];
	assert.equal(occ.medianAnnual, 51000);
	assert.equal(occ.medianHourly, 24.52);
	assert.equal(occ.percentiles.p10, 38130);
	assert.equal(occ.percentiles.p90, 75850);
	assert.equal(occ.employment, 457300);
	assert.equal(occ.jobOutlookPct, 2);
	assert.equal(occ.employmentChange, 9900);
	assert.equal(occ.industryWages.length, 3);
});

// Independently transcribed by hand from the live BLS OOH Registered Nurses
// page (https://www.bls.gov/ooh/healthcare/registered-nurses.htm) on
// 2026-08-17 via r.jina.ai proxy read (direct bls.gov fetch returns 403 for
// this agent's network path -- same footer confirms "Last modified date:
// August 28, 2025", matching the same data-freshness date as every other
// spot check in this file). Independent of wages-source.json's own numbers
// -- do not derive these from the source file.
test('spot check: Registered Nurses (29-1141) matches BLS OOH page', () => {
	const occ = occupations['29-1141'];
	assert.equal(occ.medianAnnual, 93600);
	assert.equal(occ.medianHourly, 45.00);
	assert.equal(occ.percentiles.p10, 66030);
	assert.equal(occ.percentiles.p90, 135320);
	assert.equal(occ.employment, 3391000);
	assert.equal(occ.jobOutlookPct, 5);
	assert.equal(occ.employmentChange, 166100);
	assert.equal(occ.industryWages.length, 5);
});

// Independently transcribed by hand from the live BLS OOH Lawyers page
// (https://www.bls.gov/ooh/legal/lawyers.htm) on 2026-08-17 via r.jina.ai
// proxy read (direct bls.gov fetch returns 403 for this agent's network
// path -- same footer confirms "Last modified date: August 28, 2025",
// matching the same data-freshness date as every other spot check in this
// file). p90 of 239200 is BLS's own top-coded floor value ("the highest 10
// percent earned more than $239,200"), not an exact percentile -- carried
// through as-is per the source page's own number. Independent of
// wages-source.json's own numbers -- do not derive these from the source
// file.
test('spot check: Lawyers (23-1011) matches BLS OOH page', () => {
	const occ = occupations['23-1011'];
	assert.equal(occ.medianAnnual, 151160);
	assert.equal(occ.medianHourly, 72.67);
	assert.equal(occ.percentiles.p10, 72780);
	assert.equal(occ.percentiles.p90, 239200);
	assert.equal(occ.employment, 864800);
	assert.equal(occ.jobOutlookPct, 4);
	assert.equal(occ.employmentChange, 35900);
	assert.equal(occ.industryWages.length, 4);
});

// Independently transcribed by hand from the live BLS OOH Heating, Air
// Conditioning, and Refrigeration Mechanics and Installers page
// (https://www.bls.gov/ooh/installation-maintenance-and-repair/heating-air-conditioning-and-refrigeration-mechanics-and-installers.htm)
// on 2026-08-18 via r.jina.ai proxy read (direct bls.gov fetch returns 403
// for this agent's network path -- same footer confirms "Last modified
// date: August 28, 2025", matching the same data-freshness date as every
// other spot check in this file). Both p10 ("earned less than $39,130")
// and p90 ("earned more than $91,020") are BLS's own bottom/top-coded
// boundary values, not exact percentiles -- carried through as-is per the
// source page's own wording. Independent of wages-source.json's own
// numbers -- do not derive these from the source file.
test('spot check: Heating, Air Conditioning, and Refrigeration Mechanics and Installers (49-9021) matches BLS OOH page', () => {
	const occ = occupations['49-9021'];
	assert.equal(occ.medianAnnual, 59810);
	assert.equal(occ.medianHourly, 28.75);
	assert.equal(occ.percentiles.p10, 39130);
	assert.equal(occ.percentiles.p90, 91020);
	assert.equal(occ.employment, 425200);
	assert.equal(occ.jobOutlookPct, 8);
	assert.equal(occ.employmentChange, 34500);
	assert.equal(occ.industryWages.length, 4);
});

// Independently transcribed by hand from the live BLS OOH Dentists page
// (https://www.bls.gov/ooh/healthcare/dentists.htm) on 2026-08-18 via
// r.jina.ai proxy read (direct bls.gov fetch returns 403 for this agent's
// network path -- same footer confirms "Last modified date: August 28,
// 2025", matching the same data-freshness date as every other spot check in
// this file). Figures are for the "Dentists" umbrella occupation (SOC
// 29-1020, $179,210 median), not the "Dentists, general" sub-detail
// ($172,790) -- the umbrella figure is what BLS surfaces as Quick Facts.
// p10 ("earned less than $84,740") and p90 ("earned more than $239,200")
// are BLS's own bottom/top-coded boundary values, not exact percentiles --
// carried through as-is per the source page's own wording. Independent of
// wages-source.json's own numbers -- do not derive these from the source
// file.
test('spot check: Dentists (29-1020) matches BLS OOH page', () => {
	const occ = occupations['29-1020'];
	assert.equal(occ.medianAnnual, 179210);
	assert.equal(occ.medianHourly, 86.16);
	assert.equal(occ.percentiles.p10, 84740);
	assert.equal(occ.percentiles.p90, 239200);
	assert.equal(occ.employment, 149300);
	assert.equal(occ.jobOutlookPct, 4);
	assert.equal(occ.employmentChange, 5900);
	assert.equal(occ.industryWages.length, 4);
});

// Independently transcribed by hand from the live BLS OOH Librarians and
// Library Media Specialists page
// (https://www.bls.gov/ooh/education-training-and-library/librarians.htm),
// re-verified twice on 2026-08-19: once via direct curl fetch (200 OK) and
// again independently via r.jina.ai proxy during pre-publish audit. Direct
// fetch to bls.gov is UA-sensitive for this agent's network path -- a UA
// string with a declared contact URL (e.g. "Mozilla/5.0 (compatible;
// WageLarkResearch/1.0; +https://wagelark.com/contact)") consistently
// returned 200 across repeated attempts, while a plain browser UA, no UA,
// and a bare "curl/8.0" UA all returned 403 (Akamai block) in the same
// window -- so a future re-check that gets 403 should try a UA with a
// contact string before assuming the page moved or BLS tightened blocking.
// Footer confirms "Last modified date: August 28, 2025", matching the same
// data-freshness date as every other spot check in this file. The page's
// own Employment Projections table labels the occupation "Librarians and
// media collections specialists" under SOC 25-4022 (the 2018 SOC merge of
// legacy 25-4021 Librarians + 25-9011 Audio-Visual and Multimedia
// Collections Specialists), independently cross-checked against O*NET
// OnLine's 25-4022.00 profile. p10 ("earned less than $38,920") and p90
// ("earned more than $100,880") are BLS's own bottom/top-coded boundary
// values, not exact percentiles -- carried through as-is per the source
// page's own wording. Independent of wages-source.json's own numbers -- do
// not derive these from the source file.
test('spot check: Librarians and Media Collections Specialists (25-4022) matches BLS OOH page', () => {
	const occ = occupations['25-4022'];
	assert.equal(occ.medianAnnual, 64320);
	assert.equal(occ.medianHourly, 30.92);
	assert.equal(occ.percentiles.p10, 38920);
	assert.equal(occ.percentiles.p90, 100880);
	assert.equal(occ.employment, 142100);
	assert.equal(occ.jobOutlookPct, 2);
	assert.equal(occ.employmentChange, 2400);
	assert.equal(occ.industryWages.length, 5);
});

// Hand-transcribed from the live bls.gov OOH page (Bartenders) on
// 2026-08-19. Independent of wages-source.json's own numbers.
test('spot check: Bartenders (35-3011) matches BLS OOH page', () => {
	const occ = occupations['35-3011'];
	assert.equal(occ.medianAnnual, 33530);
	assert.equal(occ.medianHourly, 16.12);
	// The OOH page's Pay tab publishes only hourly 10th/90th percentiles
	// ($9.58 / $34.58) for this occupation, not annual ones -- BLS itself
	// flags that bartender pay includes tips and part-time work is common,
	// so annualizing hourly*2080 would overstate a derived figure as if it
	// were BLS's own. Left empty rather than fabricated (same reasoning as
	// the Surgical Technologists and Nurse Practitioners entries above).
	assert.deepEqual(occ.percentiles, {});
	// Same reasoning applies to the industry breakdown: BLS publishes only
	// median hourly wages by industry for bartenders, not annual ones.
	assert.deepEqual(occ.industryWages, []);
	assert.equal(occ.employment, 756700);
	assert.equal(occ.jobOutlookPct, 6);
	assert.equal(occ.employmentChange, 44800);
	assert.equal(occ.entryEducation, 'No formal educational credential');
});

// Hand-transcribed from the live bls.gov OOH page (Psychologists, the
// broad-occupation page covering 19-3032/19-3033/19-3034/19-3039) on
// 2026-08-20. Independent of wages-source.json's own numbers.
test('spot check: Psychologists (19-3030) matches BLS OOH page', () => {
	const occ = occupations['19-3030'];
	assert.equal(occ.medianAnnual, 94310);
	assert.equal(occ.medianHourly, 45.34);
	assert.equal(occ.percentiles.p10, 54860);
	assert.equal(occ.percentiles.p90, 157330);
	assert.equal(occ.employment, 204300);
	assert.equal(occ.jobOutlookPct, 6);
	assert.equal(occ.employmentChange, 11800);
	assert.equal(occ.entryEducation, "Master's or doctoral degree");
	assert.equal(occ.industryWages.length, 4);
});

// Hand-transcribed from the live bls.gov OOH page (Social Workers, the
// broad-occupation page covering 21-1021/21-1022/21-1023/21-1029) on
// 2026-08-20. Independent of wages-source.json's own numbers.
test('spot check: Social Workers (21-1020) matches BLS OOH page', () => {
	const occ = occupations['21-1020'];
	assert.equal(occ.medianAnnual, 61330);
	assert.equal(occ.medianHourly, 29.49);
	assert.equal(occ.percentiles.p10, 41580);
	assert.equal(occ.percentiles.p90, 99500);
	assert.equal(occ.employment, 810900);
	assert.equal(occ.jobOutlookPct, 6);
	assert.equal(occ.employmentChange, 44700);
	assert.equal(occ.entryEducation, "Bachelor's or master's degree");
	assert.equal(occ.industryWages.length, 4);
});

// Hand-transcribed from the live bls.gov OOH page (Electrical Power-Line
// Installers and Repairers) on 2026-08-20. Independent of wages-source.json's
// own numbers.
test('spot check: Electrical Power-Line Installers and Repairers (49-9051) matches BLS OOH page', () => {
	const occ = occupations['49-9051'];
	assert.equal(occ.medianAnnual, 92560);
	assert.equal(occ.medianHourly, 44.50);
	assert.equal(occ.percentiles.p10, 50020);
	assert.equal(occ.percentiles.p90, 126610);
	assert.equal(occ.employment, 127400);
	assert.equal(occ.jobOutlookPct, 7);
	assert.equal(occ.employmentChange, 8400);
	assert.equal(occ.entryEducation, 'High school diploma or equivalent');
	assert.equal(occ.industryWages.length, 5);
});

// Hand-transcribed from the live bls.gov OOH page (Accountants and Auditors)
// on 2026-08-21. Independent of wages-source.json's own numbers.
test('spot check: Accountants and Auditors (13-2011) matches BLS OOH page', () => {
	const occ = occupations['13-2011'];
	assert.equal(occ.medianAnnual, 81680);
	assert.equal(occ.medianHourly, 39.27);
	assert.equal(occ.percentiles.p10, 52780);
	assert.equal(occ.percentiles.p90, 141420);
	assert.equal(occ.employment, 1579800);
	assert.equal(occ.jobOutlookPct, 5);
	assert.equal(occ.employmentChange, 72800);
	assert.equal(occ.entryEducation, "Bachelor's degree");
	assert.equal(occ.industryWages.length, 4);
});

// Hand-transcribed from the live bls.gov OOH page (Chefs and Head Cooks)
// on 2026-08-21. Independent of wages-source.json's own numbers.
test('spot check: Chefs and Head Cooks (35-1011) matches BLS OOH page', () => {
	const occ = occupations['35-1011'];
	assert.equal(occ.medianAnnual, 60990);
	assert.equal(occ.medianHourly, 29.32);
	assert.equal(occ.percentiles.p10, 36000);
	assert.equal(occ.percentiles.p90, 96030);
	assert.equal(occ.employment, 197300);
	assert.equal(occ.jobOutlookPct, 7);
	assert.equal(occ.employmentChange, 14000);
	assert.equal(occ.entryEducation, 'High school diploma or equivalent');
	assert.equal(occ.industryWages.length, 4);
});

// Hand-transcribed from the live BLS OOH page (Software Developers, Quality
// Assurance Analysts, and Testers -- combined narrative) for the pay figures,
// and independently cross-checked against the live BLS Employment Projections
// National Employment Matrix Table 1.2 (occupation.xlsx, downloaded from
// bls.gov/emp/tables/occupational-projections-and-characteristics.htm) and
// the BLS Economics Daily article "Artificial intelligence, information
// technology, and employment, 2024-34" on 2026-08-22.
test('spot check: Software Developers (15-1252) matches BLS OOH page + Employment Projections Table 1.2', () => {
	const occ = occupations['15-1252'];
	// The OOH page's Quick Facts median ($131,450) and hourly figure ($63.20)
	// are for the combined "Software Developers, Quality Assurance Analysts,
	// and Testers" group. Its Pay section breaks the annual median out by
	// occupation -- $133,080 for software developers specifically -- but
	// publishes no separate hourly figure for developers alone, so
	// medianHourly is omitted rather than derived (same reasoning as the
	// Radiologic Technologists entry above).
	assert.equal(occ.medianAnnual, 133080);
	assert.equal(occ.medianHourly, undefined);
	assert.equal(occ.percentiles.p10, 79850);
	assert.equal(occ.percentiles.p90, 211450);
	assert.equal(occ.industryWages.length, 5);
	// Employment, employment change, and percent change are not broken out
	// by occupation on the OOH page itself (Quick Facts gives only the
	// combined 1,895,500 figure). The National Employment Matrix Table 1.2
	// breaks it out by SOC code: 1,693.8k -> 1,961.4k (2024-34), a 15.8%
	// change of +267.7k jobs -- this independently matches the 15.8%/+267,700
	// figures published in the BLS Economics Daily article, so both official
	// BLS sources agree.
	assert.equal(occ.employment, 1693800);
	assert.equal(occ.jobOutlookPct, 15.8);
	assert.equal(occ.employmentChange, 267700);
	assert.equal(occ.entryEducation, "Bachelor's degree");
});

// Hand-transcribed from the live BLS OOH page (Financial Managers) on
// 2026-08-22. This SOC code (11-3031) covers controllers, treasurers,
// credit managers, cash managers, risk managers, and insurance managers
// as one group. BLS publishes a single combined median and employment
// figure for the whole group -- it does not break out a controller-specific
// wage the way it splits Software Developers from QA Testers. O*NET's more
// detailed 11-3031.02 "Treasurers and Controllers" code now redirects to
// the parent 11-3031.00, confirming BLS/O*NET no longer track it separately.
test('spot check: Financial Managers (11-3031) matches BLS OOH page', () => {
	const occ = occupations['11-3031'];
	assert.equal(occ.medianAnnual, 161700);
	assert.equal(occ.medianHourly, 77.74);
	assert.equal(occ.percentiles.p10, 86490);
	assert.equal(occ.percentiles.p90, 239200);
	assert.equal(occ.employment, 868600);
	assert.equal(occ.jobOutlookPct, 15);
	assert.equal(occ.employmentChange, 128800);
	assert.equal(occ.entryEducation, "Bachelor's degree");
	assert.equal(occ.industryWages.length, 5);
});

// Hand-transcribed from the live BLS OOH page (Court Reporters and
// Simultaneous Captioners, canonical URL bls.gov/ooh/legal/court-reporters.htm)
// on 2026-08-22. This is a rare flat/no-growth occupation (0% job outlook,
// 0 employment change 2024-34) -- BLS attributes the ~1,700 annual openings
// entirely to replacement need, not growth. The 10th/90th percentiles are
// published as "less than $39,100" / "more than $127,020" (standard OOH
// phrasing for the percentile boundary, not an approximation).
test('spot check: Court Reporters and Simultaneous Captioners (27-3092) matches BLS OOH page', () => {
	const occ = occupations['27-3092'];
	assert.equal(occ.medianAnnual, 67310);
	assert.equal(occ.medianHourly, 32.36);
	assert.equal(occ.percentiles.p10, 39100);
	assert.equal(occ.percentiles.p90, 127020);
	assert.equal(occ.employment, 17700);
	assert.equal(occ.jobOutlookPct, 0);
	assert.equal(occ.employmentChange, 0);
	assert.equal(occ.entryEducation, 'Postsecondary nondegree award');
	assert.equal(occ.industryWages.length, 3);
	assert.equal(occ.industryWages[0].annualWage, 75150);
});

// Hand-transcribed from the live BLS OOH page (Industrial Machinery
// Mechanics, Machinery Maintenance Workers, and Millwrights) on 2026-08-23.
// This SOC group is the mirror image of the Financial Managers/controller
// case: unlike controllers, BLS DOES break out a millwright-specific median
// annual wage ($65,170, distinct from industrial machinery mechanics at
// $63,760 and machinery maintenance workers at $60,500) and a millwright-
// specific employment/outlook figure in the Pay and Job Outlook tabs' detail
// tables. It does NOT break out millwright-specific 10th/90th percentiles or
// industry wages -- those are published only for the combined three-title
// group (p10 $44,430 / p90 $91,620; Manufacturing $64,360 highest industry).
// percentiles/industryWages are deliberately left empty here (rather than
// populated with the combined-group numbers) so [slug].astro's auto-rendered
// "Millwrights -- Annual Wage by Percentile" chart and industry table never
// mislabel three-title combined-group data as millwright-specific; those
// combined-group figures are still reported, with that caveat, in the
// article's prose. Millwrights are also a rare flat/no-growth line: BLS's
// own projections table shows 41,300 -> 41,300 (2024-34), a 0% change, while
// the combined group's headline growth (13%, driven by industrial machinery
// mechanics at +16%) does not apply to millwrights specifically.
test('spot check: Millwrights (49-9044) matches BLS OOH page', () => {
	const occ = occupations['49-9044'];
	assert.equal(occ.medianAnnual, 65170);
	assert.equal(occ.medianHourly, undefined);
	assert.deepEqual(occ.percentiles, {});
	assert.equal(occ.employment, 41300);
	assert.equal(occ.jobOutlookPct, 0);
	assert.equal(occ.employmentChange, 0);
	assert.equal(occ.entryEducation, 'High school diploma or equivalent');
	assert.deepEqual(occ.industryWages, []);
});

// Paramedics (29-2043) is the inverse split from Millwrights: BLS's Pay tab
// breaks out a paramedic-specific medianAnnual and a paramedic-specific
// industryWages table (both transcribed from bls.gov/ooh/healthcare/
// emts-and-paramedics.htm on 2026-08-23), but employment/jobOutlookPct/
// employmentChange/entryEducation are published only for the combined
// EMTs-and-Paramedics group (29-2040), not split by title -- those
// combined-group numbers are used here with that caveat in the article
// prose. Percentiles are left empty because BLS does not publish 10th/90th
// wages anywhere on this page, at any granularity (not an EMT-vs-paramedic
// split issue like Millwrights -- the data simply does not exist).
test('spot check: Paramedics (29-2043) matches BLS OOH page', () => {
	const occ = occupations['29-2043'];
	assert.equal(occ.medianAnnual, 58410);
	assert.equal(occ.medianHourly, undefined);
	assert.deepEqual(occ.percentiles, {});
	assert.equal(occ.employment, 282900);
	assert.equal(occ.jobOutlookPct, 5);
	assert.equal(occ.employmentChange, 14300);
	assert.equal(occ.entryEducation, 'Postsecondary nondegree award');
	assert.equal(occ.industryWages.length, 5);
	assert.equal(occ.industryWages[0].industry, 'Local government, excluding education and hospitals');
	assert.equal(occ.industryWages[0].annualWage, 59840);
	assert.equal(occ.industryWages[3].industry, 'Ambulance services');
	assert.equal(occ.industryWages[3].annualWage, 57720);
	// employmentIsGroupLevel flags that employment/jobOutlookPct/employmentChange/
	// entryEducation above are the combined-group numbers, not paramedic-specific --
	// [slug].astro renders an inline caveat under the stat cards when this is true.
	assert.equal(occ.employmentIsGroupLevel, true);
});

// Insurance Underwriters (13-2053) is this dataset's first occupation with a
// declining outlook (transcribed from bls.gov/ooh/business-and-financial/
// insurance-underwriters.htm on 2026-08-24: automated underwriting software
// is reducing headcount need). jobOutlookPct and employmentChange are both
// negative, which exercises the sign-handling fix in [slug].astro's
// "Employment change" stat card (previously hardcoded a "+" prefix that would
// have rendered "+-3,300" for this occupation).
test('spot check: Insurance Underwriters (13-2053) matches BLS OOH page', () => {
	const occ = occupations['13-2053'];
	assert.equal(occ.medianAnnual, 79880);
	assert.equal(occ.medianHourly, 38.4);
	assert.deepEqual(occ.percentiles, { p10: 51640, p90: 138020 });
	assert.equal(occ.employment, 127000);
	assert.equal(occ.jobOutlookPct, -3);
	assert.equal(occ.employmentChange, -3300);
	assert.equal(occ.entryEducation, "Bachelor's degree");
	assert.equal(occ.industryWages.length, 5);
	assert.equal(occ.industryWages[0].industry, 'Credit intermediation and related activities');
	assert.equal(occ.industryWages[0].annualWage, 90000);
	assert.equal(occ.industryWages[4].industry, 'Insurance agencies and brokerages');
	assert.equal(occ.industryWages[4].annualWage, 79200);
	assert.equal(occ.employmentIsGroupLevel, undefined);
});

test('spot check: Bookkeeping, Accounting, and Auditing Clerks (43-3031) matches BLS OOH page', () => {
	const occ = occupations['43-3031'];
	assert.equal(occ.medianAnnual, 49210);
	assert.equal(occ.medianHourly, 23.66);
	assert.deepEqual(occ.percentiles, { p10: 34600, p90: 72660 });
	assert.equal(occ.employment, 1613400);
	assert.equal(occ.jobOutlookPct, -6);
	assert.equal(occ.employmentChange, -94300);
	assert.equal(occ.entryEducation, 'Some college, no degree');
	assert.equal(occ.industryWages.length, 5);
	assert.equal(occ.industryWages[0].industry, 'Construction');
	assert.equal(occ.industryWages[0].annualWage, 51670);
	assert.equal(occ.industryWages[4].industry, 'Retail trade');
	assert.equal(occ.industryWages[4].annualWage, 45030);
	assert.equal(occ.employmentIsGroupLevel, undefined);
});

test('spot check: Chief Executives (11-1011) matches BLS OOH page', () => {
	const occ = occupations['11-1011'];
	assert.equal(occ.medianAnnual, 206420);
	assert.equal(occ.medianHourly, 99.24);
	assert.deepEqual(occ.percentiles, { p10: 73710, p90: 239200 });
	assert.equal(occ.employment, 309400);
	assert.equal(occ.jobOutlookPct, 4);
	assert.equal(occ.employmentChange, 13300);
	assert.equal(occ.entryEducation, "Bachelor's degree");
	assert.equal(occ.industryWages.length, 4);
	assert.equal(occ.industryWages[0].industry, 'Management of companies and enterprises');
	assert.equal(occ.industryWages[0].annualWage, 239200);
	assert.equal(occ.industryWages[3].industry, 'Government (excl. state/local education, hospitals)');
	assert.equal(occ.industryWages[3].annualWage, 137310);
	assert.equal(occ.employmentIsGroupLevel, undefined);
});

test('spot check: Occupational Therapists (29-1122) matches BLS OOH page', () => {
	const occ = occupations['29-1122'];
	assert.equal(occ.medianAnnual, 98340);
	assert.equal(occ.medianHourly, 47.28);
	assert.deepEqual(occ.percentiles, { p10: 67090, p90: 129830 });
	assert.equal(occ.employment, 160000);
	assert.equal(occ.jobOutlookPct, 14);
	assert.equal(occ.employmentChange, 22100);
	assert.equal(occ.entryEducation, "Master's degree");
	assert.equal(occ.industryWages.length, 5);
	assert.equal(occ.industryWages[0].industry, 'Nursing care facilities (skilled nursing facilities)');
	assert.equal(occ.industryWages[0].annualWage, 103210);
	assert.equal(occ.industryWages[4].industry, 'Educational services; state, local, and private');
	assert.equal(occ.industryWages[4].annualWage, 83890);
});

// Hand-transcribed from live bls.gov OOH page on 2026-08-27 (last modified
// August 28, 2025). Independent of wages-source.json's own numbers -- do
// not derive these from the source file.
test('spot check: Diagnostic Medical Sonographers (29-2032) matches BLS OOH page', () => {
	const occ = occupations['29-2032'];
	assert.equal(occ.medianAnnual, 89340);
	assert.equal(occ.medianHourly, 42.95);
	assert.deepEqual(occ.percentiles, { p10: 64760, p90: 123170 });
	assert.equal(occ.employment, 90000);
	assert.equal(occ.jobOutlookPct, 13);
	assert.equal(occ.employmentChange, 11700);
	assert.equal(occ.entryEducation, "Associate's degree");
	assert.equal(occ.industryWages.length, 4);
	assert.equal(occ.industryWages[0].industry, 'Outpatient care centers');
	assert.equal(occ.industryWages[0].annualWage, 123610);
	assert.equal(occ.industryWages[3].industry, 'Medical and diagnostic laboratories');
	assert.equal(occ.industryWages[3].annualWage, 83200);
});

// Hand-transcribed from live bls.gov OOH page on 2026-08-27 (last modified
// August 28, 2025). Independent of wages-source.json's own numbers -- do
// not derive these from the source file.
test('spot check: Veterinary Technologists and Technicians (29-2056) matches BLS OOH page', () => {
	const occ = occupations['29-2056'];
	assert.equal(occ.medianAnnual, 45980);
	assert.equal(occ.medianHourly, 22.11);
	assert.deepEqual(occ.percentiles, { p10: 32120, p90: 60880 });
	assert.equal(occ.employment, 134200);
	assert.equal(occ.jobOutlookPct, 9);
	assert.equal(occ.employmentChange, 12200);
	assert.equal(occ.entryEducation, "Associate's degree");
	assert.equal(occ.industryWages.length, 4);
	assert.equal(occ.industryWages[0].industry, 'Educational services (state, local, private)');
	assert.equal(occ.industryWages[0].annualWage, 51250);
	assert.equal(occ.industryWages[3].industry, 'Social advocacy organizations');
	assert.equal(occ.industryWages[3].annualWage, 41640);
});

// Hand-transcribed from live bls.gov OOH page on 2026-08-28 (last modified
// August 27, 2026). Independent of wages-source.json's own numbers -- do
// not derive these from the source file.
test('spot check: Morticians, Undertakers, and Funeral Arrangers (39-4031) matches BLS OOH page', () => {
	const occ = occupations['39-4031'];
	assert.equal(occ.medianAnnual, 55010);
	assert.equal(occ.medianHourly, 26.45);
	assert.deepEqual(occ.percentiles, { p10: 33350, p90: 88620 });
	assert.equal(occ.employment, 26700);
	assert.equal(occ.jobOutlookPct, 3);
	assert.equal(occ.employmentChange, 800);
	assert.equal(occ.entryEducation, "Associate's degree");
	assert.equal(occ.industryWages.length, 1);
	assert.equal(occ.industryWages[0].industry, 'Death care services');
	assert.equal(occ.industryWages[0].annualWage, 54530);
});

// Hand-transcribed from live bls.gov OOH page on 2026-08-29 (last modified
// August 27, 2026, carrying newly-refreshed May 2025 data). Independent of
// wages-source.json's own numbers -- do not derive these from the source file.
test('spot check: Magnetic Resonance Imaging Technologists (29-2035) matches BLS OOH page', () => {
	const occ = occupations['29-2035'];
	assert.equal(occ.medianAnnual, 95480);
	assert.equal(occ.medianHourly, 45.90);
	assert.deepEqual(occ.percentiles, { p10: 68890, p90: 127670 });
	// SOC-specific figures from the Job Outlook tab's Employment Projections
	// Data table, not the combined-group Quick Facts box (278,100/5%/15,100).
	assert.equal(occ.employment, 43900);
	assert.equal(occ.jobOutlookPct, 8);
	assert.equal(occ.employmentChange, 3400);
	assert.equal(occ.entryEducation, "Associate's degree");
	assert.equal(occ.employmentIsGroupLevel, undefined);
	assert.equal(occ.industryWages.length, 4);
	assert.equal(occ.industryWages[0].industry, 'Outpatient care centers');
	assert.equal(occ.industryWages[0].annualWage, 140390);
	assert.equal(occ.industryWages[3].industry, 'Medical and diagnostic laboratories');
	assert.equal(occ.industryWages[3].annualWage, 93540);
});

// Hand-transcribed from live bls.gov OOH page on 2026-08-30 (last modified
// August 27, 2026, carrying May 2025 data). Independent of wages-source.json's
// own numbers -- do not derive these from the source file.
test('spot check: Veterinarians (29-1131) matches BLS OOH page', () => {
	const occ = occupations['29-1131'];
	assert.equal(occ.medianAnnual, 130100);
	assert.equal(occ.medianHourly, 62.55);
	assert.deepEqual(occ.percentiles, { p10: 73920, p90: 215700 });
	assert.equal(occ.employment, 91100);
	assert.equal(occ.jobOutlookPct, 9);
	assert.equal(occ.employmentChange, 8600);
	assert.equal(occ.entryEducation, 'Doctoral or professional degree');
	assert.equal(occ.industryWages.length, 4);
	assert.equal(occ.industryWages[0].industry, 'Social advocacy organizations');
	assert.equal(occ.industryWages[0].annualWage, 131760);
	assert.equal(occ.industryWages[3].industry, 'Government (excluding state/local education)');
	assert.equal(occ.industryWages[3].annualWage, 115210);
});

// Hand-transcribed from live bls.gov OOH page on 2026-08-31 (last modified
// August 27, 2026, carrying May 2025 data). Independent of wages-source.json's
// own numbers -- do not derive these from the source file. The OOH page for
// this occupation gives no 10th/90th percentile breakout, so percentiles is
// deliberately {} (same pattern as the other entries noted above).
test('spot check: Radiation Therapists (29-1124) matches BLS OOH page', () => {
	const occ = occupations['29-1124'];
	assert.equal(occ.medianAnnual, 105310);
	assert.equal(occ.medianHourly, 50.63);
	assert.deepEqual(occ.percentiles, {});
	assert.equal(occ.employment, 17400);
	assert.equal(occ.jobOutlookPct, 3);
	assert.equal(occ.employmentChange, 500);
	assert.equal(occ.entryEducation, "Associate's degree");
	assert.equal(occ.industryWages.length, 3);
	assert.equal(occ.industryWages[0].industry, 'Outpatient care centers');
	assert.equal(occ.industryWages[0].annualWage, 127680);
	assert.equal(occ.industryWages[2].industry, 'Hospitals; state, local, and private');
	assert.equal(occ.industryWages[2].annualWage, 104260);
});
