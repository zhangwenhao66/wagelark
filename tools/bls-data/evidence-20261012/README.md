# BLS OOH live re-verification — Software Developers (SOC 15-1252)

> **Batches in this directory.** This file covers the first occupation refreshed on
> 2026-10-12 (Software Developers, SOC 15-1252). The first full batch — nine
> healthcare-practitioner occupations — is transcribed in
> [`README-healthcare-practitioners.md`](README-healthcare-practitioners.md); its raw
> page captures are the other `bls-ooh-*-20261012.md` files here.

- Verified on: 2026-10-12 (Asia/Shanghai)
- Source URL: https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
- Page "Last modified date": **August 27, 2026** (quoted from the page footer)
- Data year shown by BLS: **May 2025** (the page has rolled from the May 2024 / 2024–34 cycle)
- Fetch route: `curl` → HTTP 403 (Akamai, as documented); full browser headers → HTTP 403;
  `https://r.jina.ai/<url>` → HTTP 200, 51,974 bytes of the genuine BLS page
  (Title: "Software Developers, Quality Assurance Analysts, and Testers"). Raw copy saved
  alongside as `bls-ooh-software-developers-20261012.md`.
  The shared `browser-ui` resource was NOT used: it is held by a stale Codex claim
  (actor `codex:trafficsite-gsc-index-requests-20261010T150500`, since 2026-10-10T10:30:46Z)
  and the protocol forbids preemption.

## Values transcribed (SOC 15-1252, software developers only)

| Field | Value (May 2025) | Verbatim page text |
|---|---|---|
| Median annual wage | $135,980 | "The median annual wage for software developers was $135,980 in May 2025." |
| 10th percentile | $82,460 | "The lowest 10 percent earned less than $82,460, and the highest 10 percent earned more than $214,670." |
| 90th percentile | $214,670 | (same sentence) |
| Employment, 2025 | 1,717,800 | employment projections table, row `Software developers \| 15-1252` |
| Projected employment, 2035 | 1,892,600 | same row |
| Employment change | +174,700 (10%) | same row |
| Projection period | 2025–35 | "Employment projections data for software developers, quality assurance analysts, and testers, 2025–35" |
| Job outlook | "Much faster than average" | "projected to grow 10 percent from 2025 to 2035, much faster than the average for all occupations" |
| Openings per year | 106,100 | "About 106,100 openings ... projected each year, on average, over the decade." |
| Entry education | Bachelor's degree | "typically need a bachelor's degree in computer and information technology or a related field" |

### Percentile search coverage (hard rule: multiple wordings)

Searched `percentile`, `10 percent`, `lowest 10`, `highest 10` — the page carries no literal
"percentile" wording; the range is written as "lowest 10 percent / highest 10 percent", which
is the wording that was missed on 2026-09-01 for `nuclear-medicine-technologist-salary`.

### Industry wages (software developers, May 2025)

| Industry | Median annual wage |
|---|---|
| Software publishers | $164,550 |
| Manufacturing | $136,330 |
| Management of companies and enterprises | $135,680 |
| Finance and insurance | $135,460 |
| Computer systems design and related services | $132,050 |

### Comparison figures on the same page (NOT used as the 15-1252 row)

- Software developers + QA analysts + testers (combined group): median $134,040/yr, $64.44/hr
- Software quality assurance analysts and testers (SOC 15-1253): median $104,300; p10 $61,440; p90 $167,010
- Computer occupations: $109,470; Total, all occupations: $50,980

## What changed vs the stored entry (was May 2024)

| Field | Stored (May 2024) | Live (May 2025) |
|---|---|---|
| medianAnnual | 133,080 | 135,980 |
| p10 / p90 | 79,850 / 211,450 | 82,460 / 214,670 |
| employment | 1,693,800 | 1,717,800 |
| employmentChange | 267,700 | 174,700 |
| jobOutlookPct | 15.8 | 10 |
| projectionPeriod | 2024-34 | 2025-35 |
| industryWages | 149,990 / 134,910 / 133,650 / 132,880 / 129,890 | 164,550 / 136,330 / 135,680 / 135,460 / 132,050 |
| publishedDate | 2025-08-28 | 2026-08-27 |
