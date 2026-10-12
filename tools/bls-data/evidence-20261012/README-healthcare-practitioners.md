# BLS OOH live re-verification — batch 1: healthcare practitioners (9 occupations)

- Verified on: 2026-10-12 (Asia/Shanghai)
- Batch: healthcare "practising" family — 29-1020, 29-1071, 29-1122, 29-1123, 29-1126,
  29-1141, 29-1151, 29-1171, 29-1292
- Every page's footer read "**Last modified date: August 27, 2026**", and every page
  predates this batch on the **May 2024 / 2024–34** cycle in `wages-source.json`.
- Fetch route: `curl` to bls.gov returns HTTP 403 (Akamai), as documented in
  `README.md` for the software-developers page. Used
  `curl -sL --max-time 40 "https://r.jina.ai/<bls-ooh-url>"` — HTTP 200 for all eight
  pages (two occupations share one page). Raw copies saved alongside as
  `bls-ooh-<occupation>-20261012.md`.
- The shared `browser-ui` resource was not used.

Note on the earlier count: the handover described 34 stale occupations, but
`15-1252` (Software Developers) had already been refreshed on origin/main in
commit `676772c` by the time this batch started, so the live stale count was **33**.
Nine are cleared here; 24 remain (healthcare technologists/technicians, legal,
business/management, and the rest of the long tail).

## Values transcribed by hand from the pages above

Percentile wording: none of these pages carries the literal word "percentile"; the
range is written "The lowest 10 percent earned less than … and the highest 10 percent
earned more than …". Both wordings were searched before concluding a page had none.

| SOC | Occupation | Median | p10 / p90 | Employment → 2035 | Change | Outlook | Entry education |
|---|---|---|---|---|---|---|---|
| 29-1020 | Dentists | $176,110 ($84.67/hr) | $89,100 / $337,210 | 161,400 → 170,400 | +9,000 (6%) | 6% Faster than average | Doctoral or professional degree |
| 29-1071 | Physician Assistants | $135,880 ($65.33/hr) | $99,380 / $190,280 | 168,900 → 204,600 | +35,700 (21%) | 21% Much faster than average | Master's degree |
| 29-1122 | Occupational Therapists | $100,330 ($48.24/hr) | $71,690 / $131,950 | 169,600 → 194,800 | +25,200 (15%) | 15% Much faster than average | Master's degree |
| 29-1123 | Physical Therapists | $102,760 ($49.40/hr) | $77,140 / $135,140 | 283,700 → 317,600 | +33,800 (12%) | 12% Much faster than average | Doctoral or professional degree |
| 29-1126 | Respiratory Therapists | $82,280 ($39.56/hr) | $63,660 / $118,050 | 142,000 → 154,200 | +12,100 (9%) | 9% Much faster than average | Associate's degree |
| 29-1141 | Registered Nurses | $97,550 ($46.90/hr) | $68,940 / $137,470 | 3,465,400 → 3,660,100 | +194,700 (6%) | 6% Faster than average | Bachelor's degree |
| 29-1151 | Nurse Anesthetists | $236,590 | *combined group only* | 54,500 → 59,800 | +5,300 (10%) | 10% | Master's degree (BLS label) |
| 29-1171 | Nurse Practitioners | $132,300 | *combined group only* | 336,300 → 474,100 | +137,800 (41%) | 41% | Master's degree |
| 29-1292 | Dental Hygienists | $98,100 ($47.16/hr) | $74,880 / $126,050 | 225,300 → 243,200 | +17,900 (8%) | 8% Much faster than average | Associate's degree |

`medianHourly` is omitted for 29-1151 and 29-1171: BLS publishes the hourly figure
only for the combined three-role group ($64.87), not per SOC code.

## Industry medians (May 2025), in the order BLS lists them (descending)

| SOC | Industry | Median |
|---|---|---|
| 29-1020 | Government, excluding state and local education and hospitals | $219,750 |
| 29-1020 | Outpatient care centers | $195,330 |
| 29-1020 | Offices of dentists | $173,760 |
| 29-1020 | Offices of physicians | $172,980 |
| 29-1071 | Government, excluding state and local education and hospitals | $157,040 |
| 29-1071 | Outpatient care centers | $153,500 |
| 29-1071 | Hospitals; state, local, and private | $141,150 |
| 29-1071 | Educational services; state, local, and private | $134,770 |
| 29-1071 | Offices of physicians | $132,000 |
| 29-1122 | Home healthcare services | $106,300 |
| 29-1122 | Nursing care facilities (skilled nursing facilities) | $105,850 |
| 29-1122 | Hospitals; state, local, and private | $102,820 |
| 29-1122 | Offices of physical, occupational and speech therapists, and audiologists | $97,940 |
| 29-1122 | Educational services; state, local, and private | $87,300 |
| 29-1123 | Home healthcare services | $114,740 |
| 29-1123 | Nursing and residential care facilities | $110,460 |
| 29-1123 | Hospitals; state, local, and private | $106,800 |
| 29-1123 | Offices of physical, occupational and speech therapists, and audiologists | $97,160 |
| 29-1126 | Hospitals; state, local, and private | $82,730 |
| 29-1126 | Nursing care facilities (skilled nursing facilities) | $79,270 |
| 29-1126 | Offices of physicians | $77,890 |
| 29-1141 | Government, excluding state and local education and hospitals | $110,780 |
| 29-1141 | Hospitals; state, local, and private | $100,220 |
| 29-1141 | Ambulatory healthcare services | $91,230 |
| 29-1141 | Nursing and residential care facilities | $84,300 |
| 29-1141 | Educational services; state, local, and private | $78,620 |
| 29-1292 | Offices of dentists | $98,280 |
| 29-1292 | Offices of physicians | $91,160 |
| 29-1292 | Government, excluding state and local education and hospitals | $80,830 |

Two orderings flipped relative to the May 2024 cycle and the affected prose was
rewritten rather than renumbered in place:

- **Dentists**: offices of physicians fell from second to lowest; offices of dentists
  is still the largest employer but no longer the lowest-paying category.
- **Physician assistants**: educational services moved above offices of physicians,
  so the sentence that called educational services "the least of the five" no longer
  held and now names offices of physicians as the lowest.
- **Occupational therapists**: home healthcare services moved above skilled-nursing
  facilities to the top of the list.

## Combined-page handling (29-1151 / 29-1171)

Both occupations sit on
`healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners.htm`, where BLS
publishes:

- **split by SOC code** — the median (nurse anesthetists $236,590; nurse
  practitioners $132,300), and the projections-table employment / change / percent
  rows (54,500→59,800, +5,300, 10%; 336,300→474,100, +137,800, 41%);
- **combined group only** — the 10th/90th percentile range ($102,190 / $224,490) and
  the five-row industry table.

Following the existing rule for this page, the split fields are stored and the
combined-group fields are left empty (`percentiles: {}`, `industryWages: []`) rather
than mixed into one record. The combined-group median ($134,920) and hourly rate
($64.87) are not used for either record. The page's own Job Outlook narrative gives a
growth sentence only for the three roles together ("36 percent … much faster than the
average"), so the stored `jobOutlookLabel` stays derived from the split percent
change; both derived labels are "Much faster than average", which is also what the
combined-group narrative says, so no disagreement arises either way.

Also transcribed for the CRNA comparison chart, which BLS publishes on the same page:
nurse midwives **$134,040** (SOC 29-1161, 8,200 → 9,100, +900, 11%). That role has no
`wages-source.json` entry of its own; the figure lives only in
`public/images/crna-salary-chart.svg` and in the prose of `crna-salary` and
`nurse-practitioner-salary`.

## What changed in the stored records

`tools/bls-data/wages-source.json` — all nine entries move `dataYear` to "May 2025",
`publishedDate` to "2026-08-27", `employmentYear` to "2025" and `projectionPeriod` to
"2025-35". Summary of the numeric deltas:

| SOC | median | p10 | p90 | employment | change | outlook % |
|---|---|---|---|---|---|---|
| 29-1020 | 179,210 → 176,110 | 84,740 → 89,100 | 239,200 → 337,210 | 149,300 → 161,400 | 5,900 → 9,000 | 4 → 6 |
| 29-1071 | 133,260 → 135,880 | 95,240 → 99,380 | 182,200 → 190,280 | 162,700 → 168,900 | 33,200 → 35,700 | 20 → 21 |
| 29-1122 | 98,340 → 100,330 | 67,090 → 71,690 | 129,830 → 131,950 | 160,000 → 169,600 | 22,100 → 25,200 | 14 → 15 |
| 29-1123 | 101,020 → 102,760 | 74,420 → 77,140 | 132,500 → 135,140 | 267,200 → 283,700 | 29,300 → 33,800 | 11 → 12 |
| 29-1126 | 80,450 → 82,280 | 61,900 → 63,660 | 108,820 → 118,050 | 139,600 → 142,000 | 16,800 → 12,100 | 12 → 9 |
| 29-1141 | 93,600 → 97,550 | 66,030 → 68,940 | 135,320 → 137,470 | 3,391,000 → 3,465,400 | 166,100 → 194,700 | 5 → 6 |
| 29-1151 | 223,210 → 236,590 | — | — | 53,800 → 54,500 | 4,600 → 5,300 | 9 → 10 |
| 29-1171 | 129,210 → 132,300 | — | — | 320,400 → 336,300 | 128,400 → 137,800 | 40 → 41 |
| 29-1292 | 94,260 → 98,100 | 66,470 → 74,880 | 120,060 → 126,050 | 221,600 → 225,300 | 15,500 → 17,900 | 7 → 8 |

Respiratory therapists is the only occupation in this batch whose outlook **fell**
(12% → 9%); it is still "much faster than average" against the 3% all-occupation
baseline, and the prose that compared it with dental hygienists and radiologic
technologists was rewritten to keep that comparison true.

## Downstream edits made in the same change

- `src/data/guides.ts` — the nine own pages plus **36 entries in total** cite these
  figures (as primary salary guides, as `how-to-become` pages, or as comparison
  sentences on unrelated salary guides). Every stale number, every "May 2024"
  attribution that belonged to one of these nine occupations, and every
  "2024 to 2034" projection window was updated. Arithmetic stated in prose
  (percentile spreads, "a $X gap", "roughly N% of") was recomputed, and any sentence
  whose comparative claim stopped being true after the refresh was rewritten rather
  than renumbered. Sources labels were updated to record the re-verification.
- Two further sweeps that the number-grep alone does not catch, both of which turned
  up real leftovers in the first pass:
  - **outlook percentages restated in prose.** Physical therapists' entry said
    "That 11% pace" after the figure moved to 12%, and the respiratory therapists entry
    restated its own 12% twice plus nurse practitioners' 40% inside a comparison
    sentence.
  - **annual-openings figures.** `openings` is not a stored field — it lives only in
    prose — so it drifts silently. BLS rolled it on every page: dental hygienists
    15,300 → 15,000, occupational therapists 10,200 → 10,000, registered nurses
    189,100 → 180,800, respiratory therapists 8,800 → 8,600 (dentists moved 4,500 →
    4,800 and was already fixed with the rest of that entry).
- `tools/bls-data/wages-source.test.mjs` — the nine spot checks were re-transcribed
  from the pages above and the stale provenance comments corrected. `29-1123`
  (Physical Therapists) had no spot check at all; one was added.
- `public/images/*.svg` — five salary charts regenerated with
  `generate-charts.mjs`, the no-degree ranking chart regenerated with
  `generate-no-degree-ranking-chart.mjs` (dental hygienists move from rank 4 to rank 2,
  so the table in `highest-paying-jobs-without-a-degree` was reordered to match), and
  four hand-maintained files edited directly: `crna-salary-chart.svg` (all three APRN
  medians), `dentist-education-path.svg`, `physical-therapist-career-path.svg`,
  `rn-education-path.svg`, and `nurse-practitioner-salary-chart.svg` (growth bars,
  2025-35). Bar geometry was recomputed against the new maximum for each chart.

## Quality chain run

- `npm test` — 108 tests, 108 pass / 0 fail.
- `npm run build` — 94 pages built.
- `run_checks.py --guides src/data/guides.ts --slug <slug>` for all 36 touched slugs:
  41 failing (slug, check) pairs after the change versus 42 before, **zero new**, one
  resolved. The remainder are pre-existing site-wide debt (bridge-sentence candidates
  awaiting independent verification, link-presence candidates, templet reuse).
- `check_prose_patterns.py` — 0 failing slugs (six L-0819-9 FAQ-restates-body
  regressions introduced by the first pass were rewritten and re-run clean).
- `check_seo_field_stats.py` — title 84 (mean 56.5), description 84 (mean 156.8).
- `title_lint.py --all` — output byte-identical to the pre-change file
  (9 PASS / 51 WARN / 24 FAIL, all pre-existing).

## Notes for the next batch

- `47-2221`-style traps: several entries cite these nine occupations as comparison
  points without a `socCode` link, so a token-only sweep is not sufficient. Grepping
  `guides.ts` for the old *numbers* is what finds them; the numbers are the reliable
  key, not the occupation name.
- Four old figures are ambiguous — `$239,200`, `$75,240`, `$77,940`, `$83,890` each
  double as another occupation's own percentile or industry median. Replacement has to
  be scoped per entry; a file-wide substitution corrupts the actuary, lawyer,
  financial-manager, chief-executive, paralegal and air-traffic-controller entries.
- `bls-ooh-*.md` captures are the raw r.jina.ai reader output, including the reader's
  own `Title:`/`URL Source:` header lines.
