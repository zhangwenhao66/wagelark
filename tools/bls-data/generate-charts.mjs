/**
 * Generates self-made SVG percentile bar charts for public/images/, one per
 * occupation, from tools/bls-data/wages-source.json -- so chart values can
 * never drift from the same verified source the article text and Dataset
 * schema use. No AI-generated or stock imagery; see CLAUDE.md image policy.
 *
 * Usage: node tools/bls-data/generate-charts.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = JSON.parse(readFileSync(path.join(__dirname, 'wages-source.json'), 'utf-8'));
const occupations = source.occupations;

// slug (matches guides.ts `image` field) -> SOC code
const CHARTS = {
	'dental-hygienist-salary-chart': '29-1292',
	'actuary-salary-chart': '15-2011',
	'pharmacist-salary-chart': '29-1051',
	'physical-therapist-salary-chart': '29-1123',
	'flight-attendant-salary-chart': '53-2031',
	'radiology-tech-salary-chart': '29-2034',
	'physician-assistant-salary-chart': '29-1071',
	'pharmacy-technician-salary-chart': '29-2052',
	'dental-assistant-salary-chart': '31-9091',
	'medical-assistant-salary-chart': '31-9092',
	'air-traffic-controller-salary-chart': '53-2021',
	'respiratory-therapist-salary-chart': '29-1126',
	'electrician-salary-chart': '47-2111',
	'firefighter-salary-chart': '33-2011',
};

const NAVY = '#14273f';
const TEAL = '#0f8b7f';
const INK = '#14212e';
const RULE = '#dcdad2';

const usd = (n) => `$${n.toLocaleString('en-US')}`;

function buildChart(occ) {
	const rows = [
		['10th percentile', occ.percentiles.p10],
		['Median', occ.medianAnnual],
		['90th percentile', occ.percentiles.p90],
	].filter(([, v]) => typeof v === 'number');

	const width = 640;
	const height = 260;
	const padLeft = 150;
	const padRight = 110;
	const barHeight = 34;
	const gap = 26;
	const top = 56;
	const maxVal = Math.max(...rows.map(([, v]) => v));
	const barMaxWidth = width - padLeft - padRight;

	const bars = rows
		.map(([label, val], i) => {
			const y = top + i * (barHeight + gap);
			const w = Math.max(6, (val / maxVal) * barMaxWidth);
			return `
	<text x="${padLeft - 12}" y="${y + barHeight / 2 + 5}" text-anchor="end" font-size="15" fill="${INK}" font-family="Arial, sans-serif">${label}</text>
	<rect x="${padLeft}" y="${y}" width="${barMaxWidth}" height="${barHeight}" fill="${RULE}" />
	<rect x="${padLeft}" y="${y}" width="${w}" height="${barHeight}" fill="${TEAL}" />
	<text x="${padLeft + w + 10}" y="${y + barHeight / 2 + 5}" font-size="15" font-weight="700" fill="${NAVY}" font-family="Arial, sans-serif">${usd(val)}</text>`;
		})
		.join('');

	const chartBottom = top + rows.length * (barHeight + gap) - gap + 30;

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${chartBottom}" font-family="Arial, sans-serif">
	<rect x="0" y="0" width="${width}" height="${chartBottom}" fill="white" />
	<text x="${padLeft}" y="30" font-size="16" font-weight="700" fill="${NAVY}">${occ.title} — Annual Wage by Percentile</text>${bars}
	<text x="${padLeft}" y="${chartBottom - 8}" font-size="12" fill="${INK}" opacity="0.55">Source: U.S. Bureau of Labor Statistics, ${occ.dataYear} (national)</text>
</svg>
`;
}

const outDir = path.join(__dirname, '../../public/images');

for (const [slug, soc] of Object.entries(CHARTS)) {
	const occ = occupations[soc];
	if (!occ) throw new Error(`Unknown SOC ${soc} for chart ${slug}`);
	const svg = buildChart(occ);
	writeFileSync(path.join(outDir, `${slug}.svg`), svg);
	console.log(`Wrote public/images/${slug}.svg`);
}
