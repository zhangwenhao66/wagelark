import type { APIRoute } from 'astro';
import { SITE_DESCRIPTION, SITE_ORIGIN, SITE_TITLE } from '../consts';
import { guides as entries } from '../data/guides';

// Full-text companion to llms.txt. llms.txt is an index (title + one-line
// description per page, for a model deciding what's worth fetching);
// llms-full.txt is the concatenated body text itself, for a model that
// wants the actual data in one request instead of crawling 77 pages.
//
// This is 100% derived from guides.ts -- no new prose is written here, so
// there's nothing to fabricate or drift out of sync: whatever a page says
// on wagelark.com is exactly what shows up here, generated at build time
// from the same source of truth. Sources[] are included per guide so a
// model quoting a number can cite the original BLS page, not this file.
// A few guide sections embed a raw HTML <table> for data too tabular for
// prose (e.g. per-state or per-occupation rankings). guides.ts renders that
// via set:html on the live page; here we want plain text, so table rows are
// converted to " | "-joined lines and every other tag is stripped. This
// only reformats markup, it does not touch or paraphrase any figure.
function tableToText(html: string): string {
	const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) => {
		const cells = [...m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) =>
			c[1].replace(/<[^>]+>/g, '').trim(),
		);
		return cells.join(' | ');
	});
	return rows.join('\n');
}

function stripMarkup(text: string): string {
	if (text.includes('<table')) return tableToText(text);
	return text.replace(/<[^>]+>/g, '').trim();
}

export const GET: APIRoute = () => {
	const sorted = [...entries].sort(
		(a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title),
	);

	const blocks = sorted.map((e) => {
		const lines: string[] = [
			`## ${e.title}`,
			'',
			`URL: ${SITE_ORIGIN}/${e.slug}/`,
			`Category: ${e.category}`,
			`Updated: ${e.updated}`,
			'',
			stripMarkup(e.coreSummary),
			'',
		];
		for (const section of e.sections) {
			lines.push(`### ${section.heading}`, '');
			for (const para of section.body) {
				lines.push(stripMarkup(para), '');
			}
		}
		if (e.faq && e.faq.length > 0) {
			lines.push('### FAQ', '');
			for (const item of e.faq) {
				lines.push(`Q: ${stripMarkup(item.question)}`, `A: ${stripMarkup(item.answer)}`, '');
			}
		}
		if (e.sources && e.sources.length > 0) {
			lines.push(
				'Sources:',
				...e.sources.map((s) => `- ${s.label}: ${s.url}`),
				'',
			);
		}
		return lines.join('\n');
	});

	const out = [
		`# ${SITE_TITLE} — full text`,
		'',
		`> ${SITE_DESCRIPTION}`,
		'',
		'This file is the complete body text of every page on wagelark.com, generated at build',
		'time from the same data used to render the live pages. All wage figures are U.S. Bureau',
		'of Labor Statistics data (Occupational Employment and Wage Statistics / Occupational',
		'Outlook Handbook), not self-reported or crowdsourced numbers; each guide below cites the',
		'specific BLS source page it pulled from under "Sources". This content is not personalized',
		'financial, career, or tax advice.',
		'',
		'---',
		'',
		blocks.join('\n---\n\n'),
	];

	return new Response(out.join('\n') + '\n', {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
