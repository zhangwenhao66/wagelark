# WageLark 内容质量审计日志

由定时任务`trafficsite-content-quality-audit`维护，记录已发布内容的回头复核（区别于发布前的五重检查）。每篇文章一条记录，选取顺序按`last_audited`最早/未审计优先。

```json
{
  "url_slug": "pharmacist-salary",
  "last_audited": "2026-08-03",
  "published_date": "2026-08-03",
  "note": "本站首次审计，本条即基线；文章为建站当天发布，已过独立审核（见内容发布日志.md，本篇当时被查出一处未标注来源的事实性论断并已修复）",
  "diagnosed_checkpoints": [
    "median/percentile薪资数字（$137,480 / $86,930 / $172,040）是否与BLS当前公开数据逐字一致",
    "数据年份（May 2024）标注是否准确、是否已过时（BLS OES每年更新一次）",
    "5%就业增长/15,400新增岗位的口径是否可溯源到BLS，而非编造的因果解释",
    "免责声明页脚是否存在，是否混入收入承诺/培训机构推荐等YMYL红线语言",
    "对标竞品（salary.com/careerexplorer等）时，本文是否有真正的增量价值而非同质化"
  ],
  "findings": [
    {
      "dimension": "事实准确性",
      "status": "未发现问题",
      "detail": "直接WebFetch https://www.bls.gov/ooh/healthcare/pharmacists.htm 逐条核对：median annual $137,480/$66.10每小时、10th percentile低于$86,930、90th percentile高于$172,040、5%增长(2024-2034)、新增15,400个岗位，全部与文章正文/FAQ/schema逐字一致。行业细分工资（ambulatory $152,980/hospitals $149,240/general merchandise $145,210/pharmacies and drug retailers $131,640）同样核对一致。Job Outlook段落里'零售药房整合+临床药师需求增长'的解释性文字经核对确系BLS原文段落的准确转述（原文：'the industry consolidates and more people fill their prescriptions online or by mail' / 'demand is projected to increase for pharmacists in...hospitals and clinics'），非编造因果。"
    },
    {
      "dimension": "时效性",
      "status": "确认发现但独立复核认定不构成问题",
      "detail": "核查发现BLS已于2026-05-15发布May 2025 OEWS新数据（bls.gov/news.release/ocwage.t01.htm实测：药师就业人数约321,970、平均年薪$140,920、时薪中位数$67.75，均与本文引用的May 2024数字不同），距本文发布仅隔约11周。但本文实际引用来源（BLS OOH页面）本身尚未同步更新——WebFetch该页面实测仍显示May 2024数据、last modified仍为2025-08-28。独立复核agent结论：这是BLS自己'原始OEWS数据5月发布、OOH摘要页次年8月才刷新'的正常年度节奏（上一次OOH刷新正好是2025-08-28，下一次预计2026年8月前后），不是本文的编辑失误；且新旧数据结构不兼容（新数据只有mean而非median、无完整百分位），无法做routine数字替换，贸然拼接反而有风险。结论：NOT CONFIRMED，不构成需要修复的问题，建议BLS下次OOH刷新后（约2026年8月）复查一次。"
    },
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "全篇具名引用BLS并标注数据年份（'according to the Bureau of Labor Statistics'反复出现），非泛泛而谈；sources字段有明确URL+访问日期+数据年份标注。"
    },
    {
      "dimension": "竞品差异化",
      "status": "确认发现问题，独立复核确认为真实但决定本次不做不安全的修复",
      "detail": "实地打开两个'pharmacist salary'头部竞品页（salary.com、indeed.com）：两者都提供50州逐州数据、上百个城市数据、公司规模/经验年限细分，均基于'job postings/proprietary data'而非政府数据；本文只有全国中位数+10/90百分位+4个行业中位数，无任何州/城市细分。独立复核agent确认这是真实的内容广度差距（BLS OEWS确实发布州级数据，本文'差异化=用政府数据'的定位没有被用足）。但本次审计未执行修复：BLS州级职业工资数据只以XLSX/JS查询工具形式发布，当前工具集（WebFetch/Browser）无法可靠、逐条核实提取50个州的具体数字，在'薪资数字绝不能靠猜测'的硬规则下，勉强插入无法逐条核验的州级数字风险高于收益，尤其是本站已有'编造引语+未标注事实'的历史教训。已如实记录为待办：本站建站计划本就规划了'州组合页'（Q2起分批放量，每页要求4项该州独有内容），这正是解决这个差异化缺口的正确架构位置，而不是往这篇全国性参考页硬塞一张验证不了的表。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题",
      "detail": "Skill(seo-audit)+live curl实测：title 67字符含品牌后缀、meta description约141字符（区间内）、单一h1含关键词、4个h2结构清晰、canonical自引用正确、图片alt文本描述性强。schema实测（curl静态HTML，Astro服务端渲染非JS注入）：FAQPage/Article/BreadcrumbList/Dataset四种结构化数据均正确渲染。"
    },
    {
      "dimension": "GEO审计",
      "status": "未发现问题，达标",
      "detail": "按项目99分制11维度（权威原文引语16/统计数据完整性14/可引用性13/结构规范性12/表达流畅度10/语义密度8/权威信号8/专业术语6/鲁棒性5/跨域连接4/易懂表达3）逐项核算：权威原文引语14、统计数据完整性13、可引用性12、结构规范性11、表达流畅度9、语义密度7、权威信号7、专业术语6、鲁棒性4、跨域连接3、易懂表达3，合计约89/99，高于80分及格线。较弱项集中在'权威原文引语'（无逐字引用BLS原句，仅转述+标注）与'跨域连接'（正文无手动锚文本内链，仅侧栏自动轮转）。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "不适用",
      "detail": "本文published=2026-08-03即建站当天，humanizer规则从建站第一天起就已强制执行（内容发布日志.md记录：全站em dash审核+改写已在首发前完成，grep -c '—\\|–' src/data/guides.ts实测为0），不存在'早于humanizer强制化'的情形，无需回填。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "sources仅1条外部引用（BLS OOH页面），WebFetch实测200可访问，内容与本文引用一致。"
    },
    {
      "dimension": "内链健康度",
      "status": "未发现问题",
      "detail": "Salary Guide分类下共5篇文章（dental-hygienist-salary/actuary-salary/pharmacist-salary/physical-therapist-salary/how-much-do-flight-attendants-make），[slug].astro的轮转窗口阈值是≤6篇全部展示，实测live页面'More in Salary Guide'侧栏确实展示了全部4篇同类文章的链接，本文并非孤儿页。注意：全站10篇文章正文里均无手写锚文本内链（grep guides.ts确认0处markdown链接），完全依赖自动轮转——这是站级模式而非本文独有问题，本次未作为本文的targeted fix处理。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "不适用",
      "detail": "本次审计未对文章内容做任何编辑，schema字段（datePublished/dateModified/Dataset等）均对应未改动的原始数据，无需检查一致性漂移。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "Live页面实测免责声明页脚存在（'This page reports government wage statistics for informational purposes. It is not personalized career, financial, or legal advice, and does not endorse or recommend any specific employer, school, or training program.'）。正文/FAQ通读未发现收入承诺式表述（如'you will earn'），未发现具体培训机构推荐，未发现个性化职业建议。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题",
      "detail": "配图为站内脚本(tools/bls-data/generate-charts.mjs)从同一份wages-source.json自动生成的SVG柱状图（非第三方图片，无版权问题），public/images/pharmacist-salary-chart.svg文件存在，live页面实测正常渲染，图表数字与正文数字来自同一数据源，天然一致。"
    }
  ],
  "actions_taken": [
    "本次未对文章做任何编辑——两条real finding中，'时效性'经独立复核判定不构成问题，'竞品差异化'经独立复核确认为真实缺口但因数据源工具限制（BLS州级数据仅提供XLSX/JS查询工具，当前工具集无法逐条核验）未做不安全的数字编辑，已如实记录为架构层面待办（对应本站规划中的'州组合页'）",
    "未触及build/commit/deploy/IndexNow/内容发布日志.md——无内容变更，无需重新部署"
  ],
  "seo_score": "未重新打分具体分值，技术SEO抽查（title/meta/h1/schema/canonical/alt）无问题",
  "geo_score": "约89/99（按11维度逐项核算），高于80分及格线，未修改",
  "escalation": null
}
```
