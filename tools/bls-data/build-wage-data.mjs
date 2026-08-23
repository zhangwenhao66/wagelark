/**
 * Generates src/data/bls-wages.ts from tools/bls-data/wages-source.json.
 *
 * wages-source.json is the single source of truth for BLS wage figures --
 * every number in it must be hand-verified against the sourceUrl (BLS OOH
 * or OES page) before it lands here. This script just projects that JSON
 * into a typed TS lookup so guides.ts can reference wages by SOC code
 * instead of duplicating numbers inline.
 *
 * Usage: node tools/bls-data/build-wage-data.mjs
 * Run `npm test` (tools/bls-data/*.test.mjs) after editing the source JSON
 * and before using the generated file -- it validates structural sanity
 * (percentile ordering, hourly*2080 vs annual, required fields) and spot
 * checks specific values transcribed by hand from BLS pages.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_PATH = path.join(__dirname, 'wages-source.json');
const OUTPUT_PATH = path.join(__dirname, '../../src/data/bls-wages.ts');

const source = JSON.parse(readFileSync(SOURCE_PATH, 'utf-8'));
const occupations = source.occupations;

const header = `// GENERATED FILE -- do not hand-edit.
// Source of truth: tools/bls-data/wages-source.json
// Regenerate with: node tools/bls-data/build-wage-data.mjs

export interface WagePercentiles {
	p10?: number;
	p25?: number;
	p75?: number;
	p90?: number;
}

export interface IndustryWage {
	industry: string;
	annualWage: number;
}

export interface BlsWageEntry {
	socCode: string;
	title: string;
	medianAnnual: number;
	medianHourly?: number;
	percentiles: WagePercentiles;
	employment: number;
	employmentYear: string;
	jobOutlookPct: number;
	jobOutlookLabel: string;
	employmentChange: number;
	projectionPeriod: string;
	entryEducation: string;
	industryWages: IndustryWage[];
	dataYear: string;
	sourceLabel: string;
	sourceUrl: string;
	publishedDate: string;
	// True when employment/jobOutlookPct/employmentChange/entryEducation are
	// published by BLS only for a combined occupation group, not broken out
	// for this specific title, even though medianAnnual/industryWages above
	// ARE title-specific. Set this rather than leaving those fields blank,
	// since BLS gives no title-specific alternative at all for this occupation.
	// [slug].astro renders an inline caveat under the stat cards when true.
	employmentIsGroupLevel?: boolean;
}

export const BLS_WAGES: Record<string, BlsWageEntry> = `;

const entries = Object.fromEntries(
	Object.entries(occupations).map(([soc, occ]) => [
		soc,
		{ socCode: soc, ...occ },
	]),
);

const body = JSON.stringify(entries, null, '\t')
	// drop quotes around plain identifier keys for readability
	.replace(/^(\t+)"([a-zA-Z_$][a-zA-Z0-9_$]*)":/gm, '$1$2:');

writeFileSync(OUTPUT_PATH, `${header}${body};\n`);

console.log(`Wrote ${Object.keys(entries).length} occupations to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
