# Guest post pitch drafts — wagelark.com

This file collects humanized, ready-to-send (or already-sent) guest-post pitches for WageLark, following the same pattern used on sister sites (e.g. `lingogrove/guest-post-pitch-drafts.md`). Each pitch is grounded in an actual published WageLark guide (see `src/data/guides.ts`); every BLS figure cited is quoted verbatim from those pages, sourced from the BLS Occupational Outlook Handbook, May 2024 data.

Background: 2026-08-04 is the first run under the new policy — guest-post pitches now go through humanizer + an independent review agent that decides "can send," and get sent automatically rather than waiting for Owen's sign-off, matching `trafficsite-broken-link-building`/`trafficsite-podcast-pitch`. These three channels were researched and confirmed viable in an earlier run the same day (see `guest-post-outreach.json`, entry dated 2026-08-04); the full pitch text below was written and humanized in this run, which also verified via WebSearch that all three write-for-us pages are still live before sending.

---

## 2026-08-04 — Draft 1: CareerEnlightenment.com

- URL: https://careerenlightenment.com/about/write-for-us
- Contact: no direct email published on the guidelines page; the page directs pitches to be submitted through their contact process with three title ideas plus a short excerpt for each (their stated preference). Sent via `gmail_send.py` to the site's general contact channel is not available, so this pitch is queued as a drafted-and-reviewed item pending a submission channel check — see status note below.
- Guest fit: long-running, actively updated career/job-search blog (2026 articles on resume writing, remote jobs, salary negotiation). Requires 600+ word original articles with a job-search or career angle they haven't already covered.

**Draft email (humanized via Skill(humanizer)):**

Subject: Guest post pitch: 3 title ideas on why BLS salary medians can overstate take-home pay

Hi,

I run wagelark.com, a reference site built entirely on BLS Occupational Employment and Wage Statistics data: median pay, percentile ranges, and industry breakdowns for individual occupations, sourced directly from the BLS Occupational Outlook Handbook rather than self-reported salary surveys. Your guidelines ask for job-search or career content with a fresh angle, and I think I have one your readers haven't seen covered directly: the assumption buried inside every BLS annual salary figure.

BLS converts hourly wage data to an annual number by assuming full-time, full-year work, 2,080 hours a year. That assumption holds up fine for most salaried roles, but it quietly breaks down for occupations that are commonly paid by the hour and worked part-time by choice. Dental hygienists are the clearest example I've found: BLS reports a median annual salary of $94,260 (May 2024 data), but a large share of hygienists work three or four days a week rather than five. Someone earning at or above the median hourly rate can still land well below that annual figure in actual take-home pay, which matters when someone compares a job offer's hourly rate to a number they saw online and assumes it translates directly.

Three title ideas, each with a short excerpt:

1. "Why Your Salary Offer Might Beat the BLS Hourly Rate but Miss the Annual Number"
   Excerpt: The median salary you see for an hourly job assumes you're working 2,080 hours a year. If you're not, here's how to do the math yourself before comparing offers.

2. "The Assumption Behind Every BLS Salary Figure That No One Points Out"
   Excerpt: BLS wage data is accurate and government-sourced, but the annual number for hourly occupations rests on one assumption most job seekers never see spelled out.

3. "How to Read a Salary Number When Your Job Is Paid by the Hour, Not Salaried"
   Excerpt: A step-by-step way to translate a published median salary into what a specific schedule (three days a week, four days a week) actually pays.

I'm happy to write whichever angle fits best, at whatever length works for you (600+ words per your guidelines). Let me know if this is useful.

Owen Zhang
wagelark.com
contact@wagelark.com

### 处理结果：跳过，未发送

本次运行核实渠道时（curl 抓取 `about/write-for-us` 页面全文，绕开此前只看摘要的问题）发现两点此前调研（记在 `guest-post-outreach.json`）遗漏的信息：

1. **实为付费发布模式**：页面原文写明"We do charge for this service so please only contact us if you have some marketing budget"，以及"Based on your submission, we may ask that you pay for posting with us"，定价与站点 Domain Rank 挂钩。这跟同一批调研里已经因为"付费发布"被否决的 Debut Careers 是同一类模式，但此前误判成了"viable"——本次核实予以纠正。
2. **投稿渠道是网页表单，不是邮箱**：页面底部是"Write for Us"表单（Name / Email / Google Doc 链接 / 题目与问题），页面全文没有出现任何可投稿邮箱，`gmail_send.py` 无法投递到表单。

按项目规则，涉及付费的商务决策（是否愿意为这个placement付费）不在本次自动化流程授权范围内，且提交表单本身也需要 Owen 在聊天里明确许可（"Explicit permission required" 类别）。因此本条**跳过，未发送**，未生成待发送邮件，也未提交表单。已同步更新 `guest-post-outreach.json` 该条状态。

---

## 2026-08-04 — Draft 2: Good Professions

- URL: https://goodprofessions.com/write-for-us/
- Contact: editor@goodprofessions.com
- Guest fit: actively updated editorial site (2024-2026 articles), Career Tips/Employment category, wants original, well-researched, in-depth writing.

**Draft email (humanized via Skill(humanizer)):**

Subject: Guest post pitch: allied health careers that skip the four-year degree

Hi,

I run wagelark.com, a reference site that publishes BLS occupational wage and outlook data for specific jobs: median pay, percentile ranges, entry education requirements, and projected growth, sourced from the BLS Occupational Outlook Handbook. I'd like to pitch a piece for your Career Tips / Employment section.

The angle: a handful of allied health occupations offer strong pay and growth without requiring a bachelor's degree, and BLS tracks the entry-path details closely enough to lay this out with real numbers instead of generalities. Diagnostic medical sonographers (ultrasound techs) typically need only an associate degree or postsecondary certificate, roughly two years of training, and BLS reports a median annual salary of $89,340 (May 2024) with 13% projected employment growth through 2034, one of the stronger outlooks among the healthcare roles BLS tracks. Phlebotomists go further in the other direction: some enter through a postsecondary certificate program under a year long, others start with just a high school diploma plus employer-provided on-the-job training (state rules vary on which route is available), with a median annual salary of $43,660 and 6% projected growth.

I'd frame the piece around what the real entry path looks like for each: training length, whether certification is required or just preferred, and what the BLS numbers say about pay by setting. Not a generic "jobs without a degree" listicle. An original piece, written for your audience, not adapted from anything already published on my site.

Let me know if this fits what you're looking for and I'll get started.

Owen Zhang
wagelark.com
contact@wagelark.com

### 独立复核结果：**可以发送** —— 已发送

全新独立复核agent（未接触本次运行任何上下文）逐项核实：guest-post-outreach.json/broken-link-outreach-log.md/podcast-pitch-log.md/外链执行日志.md 均无14天内联系goodprofessions.com的记录（无法核实Gmail发信历史本身，已注明局限性）；两个BLS数字（ultrasound tech $89,340中位数/13%增长、phlebotomist $43,660中位数/6%增长）逐一对照`src/data/guides.ts`核实完全一致；WebSearch确认goodprofessions.com是真实运营的WordPress职业博客，editor@goodprofessions.com为正确投稿地址，免费投稿无付费要求，主题匹配度合理（略偏学生/毕业生方向但Employment分类可覆盖）；文本无AI味（无破折号/AI高频词/排比凑数/模糊归因）；YMYL检查通过（无个性化建议、无收入承诺、所有数字均标注BLS出处）。

**发送记录**：2026-08-04 由 `gmail_send.py send --from wagelark` 发出，收件人 editor@goodprofessions.com，Message ID `19fcb798e67ea0de`。

---

## 2026-08-04 — Draft 3: CareerBands

- URL: https://careerbands.com/contribute-and-submit-a-guest-post/
- Contact: info@careerbands.com
- Guest fit: 10-year-old resume/interview coaching blog, Career Development category, wants topic pitch + 5-8 lines before full draft.

**Draft email (humanized via Skill(humanizer)):**

Subject: Guest post pitch: same job title, different employer, very different pay

Hi,

I run wagelark.com, a reference site built on BLS wage data by occupation, and wanted to pitch a topic idea per your submission guidelines before writing anything.

Topic: how much the employer type changes pay for the exact same job title, using BLS's industry-level wage breakdowns instead of anecdote. Physical therapists are a clean example: BLS reports home healthcare services paying a median of $108,110 a year (May 2024), ahead of hospitals ($105,140), while private outpatient PT offices, the setting most people picture, pay the least of the tracked categories at $94,860. Pharmacists show a similar pattern in reverse: hospitals pay a median of $149,240, well above the $131,640 median at pharmacies and drug retailers, the traditional chain-pharmacy setting most people associate with the job. It's the same license and the same title, but a real pay gap based on where you work, not what you're qualified to do.

I'd write it as a practical piece for job seekers comparing offers across settings, not just a data dump: five or six occupations, what the BLS numbers show by industry, and what's actually driving each gap (staffing economics, patient volume, geography). Let me know if this fits your Career Development section and I'll put together the full draft.

Owen Zhang
wagelark.com
contact@wagelark.com

### 独立复核结果：**可以发送** —— 已发送

全新独立复核agent（未接触本次运行任何上下文）逐项核实：guest-post-outreach.json/broken-link-outreach-log.md/podcast-pitch-log.md/外链执行日志.md 均无14天内联系careerbands.com的记录（无法核实Gmail发信历史本身，已注明局限性）；六个BLS数字（PT: home healthcare $108,110/hospitals $105,140/private outpatient $94,860；pharmacist: hospitals $149,240/pharmacies&drug retailers $131,640，均May 2024）逐一对照`src/data/guides.ts`核实完全一致；WebSearch确认careerbands.com/contribute-and-submit-a-guest-post/真实活跃，info@careerbands.com为正确投稿地址，免费投稿（站方明确不付稿费但也不收费），主题符合Career development/Job Searching分类，pitch格式（一段密集文字 vs 站方要求的5-8行）略有出入但篇幅相当，不构成障碍；文本无AI味；YMYL检查通过。

**发送记录**：2026-08-04 由 `gmail_send.py send --from wagelark` 发出，收件人 info@careerbands.com，Message ID `19fcb79ada898999`。
