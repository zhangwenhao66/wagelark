/**
 * Generates the self-made SVG ranking bar chart for the "highest-paying jobs
 * without a bachelor's degree" data study, from the same
 * tools/bls-data/wages-source.json used by generate-charts.mjs -- so the
 * chart values can never drift from the article text.
 *
 * Usage: node tools/bls-data/generate-no-degree-ranking-chart.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = JSON.parse(readFileSync(path.join(__dirname, 'wages-source.json'), 'utf-8'));
const occupations = source.occupations;

const NO_DEGREE_TIERS = new Set([
	'No formal educational credential',
	'High school diploma or equivalent',
	'Postsecondary nondegree award',
	'Some college, no degree',
	"Associate's degree",
	'State-approved training program',
]);

const NAVY = '#14273f';
const TEAL = '#0f8b7f';
const INK = '#14212e';
const RULE = '#dcdad2';

const usd = (n) => `$${n.toLocaleString('en-US')}`;

const all = Object.values(occupations);
const noDegree = all
	.filter((o) => NO_DEGREE_TIERS.has(o.entryEducation))
	.sort((a, b) => b.medianAnnual - a.medianAnnual)
	.slice(0, 10);

const width = 700;
const height = 460;
const padLeft = 260;
const padRight = 90;
const barHeight = 22;
const gap = 16;
const top = 46;
const maxVal = Math.max(...noDegree.map((o) => o.medianAnnual));
const barMaxWidth = width - padLeft - padRight;

const bars = noDegree
	.map((occ, i) => {
		const y = top + i * (barHeight + gap);
		const w = Math.max(6, (occ.medianAnnual / maxVal) * barMaxWidth);
		return `
	<text x="${padLeft - 12}" y="${y + barHeight / 2 + 5}" text-anchor="end" font-size="13" fill="${INK}" font-family="Arial, sans-serif">${occ.title}</text>
	<rect x="${padLeft}" y="${y}" width="${barMaxWidth}" height="${barHeight}" fill="${RULE}" />
	<rect x="${padLeft}" y="${y}" width="${w}" height="${barHeight}" fill="${TEAL}" />
	<text x="${padLeft + w + 10}" y="${y + barHeight / 2 + 4}" font-size="13" font-weight="700" fill="${NAVY}" font-family="Arial, sans-serif">${usd(occ.medianAnnual)}</text>`;
	})
	.join('');

const chartBottom = top + noDegree.length * (barHeight + gap) - gap + 34;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${chartBottom}" font-family="Arial, sans-serif">
	<rect x="0" y="0" width="${width}" height="${chartBottom}" fill="white" />
	<text x="${padLeft}" y="26" font-size="16" font-weight="700" fill="${NAVY}">Top 10 No-Degree-Required Occupations by Median Annual Wage</text>${bars}
	<text x="${padLeft}" y="${chartBottom - 8}" font-size="12" fill="${INK}" opacity="0.55">Source: U.S. Bureau of Labor Statistics, May 2024 / May 2025 (national); entry-level education per BLS</text>
</svg>
`;

const outPath = path.join(__dirname, '../../public/images/highest-paying-jobs-without-a-degree-chart.svg');
writeFileSync(outPath, svg);
console.log(`Wrote ${outPath}`);
