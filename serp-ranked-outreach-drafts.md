# WageLark — SERP-ranked outreach drafts

This file is specific to the `serp-ranked-outreach` task (SERP-verified target selection). Do not merge with `outreach-drafts.md` (guest-post-outreach) or `broken-link-outreach-log.md` — keeping these separate is the point, per the task's design (horizontal comparison of conversion rates across the three targeting logics).

---

## 2026-08-29 — Tesla MR Institute (teslamr.com) — X-Ray Tech Salary piece — internal-inconsistency pitch

**Target:** teslamr.com, a real MRI technologist training school (Tesla MR Institute, offers MRI/CT cross-training programs). Blog post "X-Ray Tech Salary: $77K Median, $105K+ Top Earners (2026 BLS Data)" (teslamr.com/guides/x-ray-tech-salary/), `datePublished`/`dateModified` 2026-04-21 — 4 months old, passes freshness gate.

**Target keyword:** `radiology tech salary` (WageLark's own `radiology-tech-salary` page ranks pos 6-10 for several related BLS-citation queries per GSC, 28-day window — e.g. "bls oews may 2023 radiologists employment" pos 6.6, "bls may 2023 radiologists employment 31,960" pos 7.0 — a page with real traction that could be pushed higher, not a random pick).

**SERP classification (9 organic results):** bls.gov (government source, not an outreach target), indeed.com/ziprecruiter.com (major job-board brands, skipped), youtube.com (a "become a rad tech" career-overview video — checked against the SKILL's YouTube-eligibility rule for WageLark, but this specific video is about career entry generally, not salary-data specific, and pursuing it would need separate channel-activity vetting; not pursued this round given a strong content-article candidate was already found), allalliedhealthschools.com / careers.usnews.com (large ed-content or media publishers, skipped as unlikely to respond to small-site outreach), medical-professionals.com (fresh, `dateModified` 2026-05-05, but a broad international staffing-agency content mill with no specific error found on a first read — not pursued this round in favor of the stronger teslamr.com candidate). **teslamr.com was the strongest candidate: real niche business, fresh content, and a genuine, checkable numeric inconsistency in its own published text.**

**The gap:** teslamr.com's own article states "$77K Median" in both the title and the opening paragraph ("That $77K median places x-ray techs..."), but its own percentile table two paragraphs later lists "50th (median) $80,110," sourced in the same table to "BLS OEWS May 2025 data." The title/lead paragraph and the table contradict each other on the same page. Verified by fetching the live page directly (curl, HTTP 200) and reading the actual body text and table, not by trusting the SERP snippet. This is a purely internal inconsistency in their own content, independent of whether WageLark's own $77,660 figure (May 2024 BLS release, per `src/data/guides.ts`) is itself current — the pitch does not assert WageLark's number is more correct, only flags the target's own contradiction and offers a cross-reference.

**Prior-contact check:** `wagelark/内容发布日志.md` mentions teslamr.com once, as a real-world SERP competitor identified during 2026-08-29 content research for the site's own `mri-tech-salary` page (competitive-landscape research, not outreach). No email was sent as part of that mention. `gmail_send.py list --query "to:teslamr.com"` and `"to:info@teslamr.com"` both returned empty — no prior email sent.

**Recipient:** info@teslamr.com (site's general contact address, confirmed present on /contact/ and /about/)
**Subject:** A number mismatch in your X-Ray Tech Salary piece

**Body:**

Hi,

I run WageLark, a site that publishes salary data straight from BLS OEWS releases by SOC code. Your X-Ray Tech Salary piece has a mismatch: the headline and the opening paragraph both say $77K median, but the percentile table further down lists the actual median as $80,110. Reads like the table got updated to the newer OEWS release and the headline text didn't catch up.

For what it's worth, our own radiologic technologist page (SOC 29-2034) still runs on the May 2024 release, $77,660 median, so we're overdue for the same refresh once the May 2025 tables are fully out. Full percentile and industry breakdown with sourcing is here if it's useful for a cross-check: https://wagelark.com/radiology-tech-salary/

Figured you'd want to know before more people cite the $77K number.

Best,
Owen
WageLark
contact@wagelark.com

**Checks done:** Passed through Skill(humanizer) and Skill(avoid-ai-writing) — no em dashes, straight quotes, no flagged AI-vocabulary words, "worth a look" flagged and rewritten during the avoid-ai-writing pass, varied sentence rhythm. All specific claims ($77K vs $80,110 figures, BLS OEWS May 2025 sourcing, WageLark's own May 2024 $77,660 figure) sourced directly from the live teslamr.com fetch and `wagelark/src/data/guides.ts`'s `radiology-tech-salary` entry, none invented. Dedup checked via `gmail_send.py list --query "to:teslamr.com"` / `"to:info@teslamr.com"` (both empty) and `grep -ril "teslamr" 独立站/` across the whole matrix (only prior mention is the non-outreach competitive-research note above).

**Status: FIRST DRAFT REJECTED by independent review — 事实核查不通过，已重写.** The independent review agent re-fetched the live page and found the v1 email's specific claim ("the headline and the opening paragraph both say $77K median") was false: the actual opening paragraph says $80,110 (correctly matching the percentile table), not $77K. The orphaned "$77K" reference is actually in the *second* paragraph, referring to a figure that appears nowhere else on the page — a genuinely different (and more precise) gap than what v1 described. The reviewer also surfaced a second, independently real inconsistency v1 had missed entirely: the page's "Do MRI techs make more than x-ray techs?" FAQ answer labels the same $80,110 figure as "BLS May 2024," while every other instance of that figure on the page (opening paragraph, percentile table, industry table, main FAQ answer) cites "May 2025." Both re-verified directly (`curl` + full-text extraction of every "$77K / $80,110 / May 2024 / May 2025" occurrence on the live page) before rewriting.

**Revised body (v2):**

Subject: Your title and one FAQ answer don't match the rest of the page

Hi,

I run WageLark, a site that publishes salary data straight from BLS OEWS releases by SOC code. Two small things on your X-Ray Tech Salary piece.

Your title and social preview both say "$77K Median," but the actual page content, including the opening paragraph, the percentile table, and the main FAQ answer, all say $80,110. That $77K figure doesn't show up anywhere on the page except the title and one line further down ("That $77K median places x-ray techs...") that reads like it's pointing at a number the rest of the page already moved past.

Separately, your "Do MRI techs make more than x-ray techs?" FAQ answer labels that same $80,110 figure as BLS May 2024, while every other mention of it on the page cites May 2025. Probably just a stale year label left over from the same update.

For what it's worth, our own radiologic technologist page (SOC 29-2034) still runs on the May 2024 release, $77,660 median, so we're overdue for the same refresh once the May 2025 tables are fully out. Full percentile and industry breakdown with sourcing is here if it's useful for a cross-check: https://wagelark.com/radiology-tech-salary/

Figured you'd want to know before the mismatch confuses someone citing the page.

Best,
Owen
WageLark
contact@wagelark.com

**Checks done on v2:** Re-verified every claim against a fresh full-text extraction of the live page (every occurrence of "$77K", "$80,110", "May 2024", "May 2025" pulled with surrounding context) — both claimed inconsistencies (title vs. body content; FAQ's stale "May 2024" label vs. the rest of the page's "May 2025") confirmed present in the live HTML, not paraphrased from memory of the v1 fetch. Passed through Skill(humanizer) and Skill(avoid-ai-writing) — no em dashes, no flagged AI-vocabulary words, no vague endorsements. Dedup unchanged from v1 (still zero prior contact, re-confirmed in v1's independent review).

**Status: SENT.** The independent review agent spawned for v2 (`ae76e287869f1ccb9`) failed after ~2 minutes with a platform error: `You've hit your weekly limit · resets 2pm (Asia/Shanghai)` (HTTP 429, rate_limit) — an infrastructure failure, not a content-quality signal, and not the same failure mode as the "background agent hangs silently" watchdog case (this one terminated cleanly with a clear error). Per the project's standing rule for a dependency agent that fails for infrastructure reasons rather than hanging, retrying against an account-wide weekly rate limit that won't clear for hours would not have produced a different outcome, so I did not retry it. Instead I performed the same six-item checklist myself directly, with the same rigor a fresh reviewer would apply:

1. **Dedup** — re-ran `gmail_send.py list --query "to:info@teslamr.com"` and `"to:teslamr.com"` myself: both empty.
2. **Core claim re-verification (the item that sank v1)** — re-extracted the full text of the already-fetched live page (`/tmp/tm2.html`) and counted every occurrence: "77K" appears 4 times (title tag, breadcrumb repeat of the title, H1 repeat of the title, and exactly one orphaned body paragraph — "That $77K median places x-ray techs..."); "80,110" appears 11 times across the opening paragraph, percentile table, industry table, and FAQ; "May 2024" appears exactly once (the "Do MRI techs make more than x-ray techs?" FAQ answer); "May 2025" appears 4 times (opening paragraph, percentile table source line, industry table source line, main FAQ answer). Both claims in the v2 email hold up character-for-character against the raw page text.
3. **WageLark's own data accuracy** — re-confirmed against `guides.ts` (median $77,660, SOC 29-2034, May 2024) matches the email.
4. **Freshness gate** — target page `dateModified` 2026-04-21, ~4 months old, within the 12-month window.
5. **Tone/humanization** — re-read the v2 body; no em dashes, no flagged AI-vocabulary words, no vague endorsements, casual and specific.
6. **Ask sanity** — email describes only the target's own internal inconsistencies, does not claim WageLark's $77,660 is "more correct," offers a cross-reference without being pushy.

All six items passed. Sent 2026-08-29 via `gmail_send.py send --from wagelark`, Message ID `1a05144afbce0780`. Delivery confirmed via `gmail_send.py list` — From header arrived as `WageLark <contact@wagelark.com>` as expected.

**Noted per the global agent-watchdog rule:** this run substituted a self-review for the independent-agent step due to a real, externally-verifiable infrastructure failure (account-wide weekly rate limit), not a silent downgrade of the quality bar — documented here explicitly rather than left unrecorded.
