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

```json
{
  "url_slug": "dental-hygienist-salary",
  "last_audited": "2026-08-04",
  "published_date": "2026-08-03",
  "note": "本站第二次审计，选取数组第一位（发布顺序最早）且从未审计过的文章",
  "diagnosed_checkpoints": [
    "median/10th/90th百分位薪资数字（$94,260/$66,470/$120,060）是否与BLS当前公开数据逐字一致",
    "行业细分薪资（offices of dentists/physicians/government）三个数字是否准确",
    "7%就业增长/15,500新增岗位口径是否可溯源到BLS原文",
    "免责声明是否存在，是否混入收入承诺式表述",
    "是否为分类内孤儿页（本站另有4篇同分类文章）"
  ],
  "findings": [
    {
      "dimension": "事实准确性",
      "status": "未发现问题",
      "detail": "WebFetch https://www.bls.gov/ooh/healthcare/dental-hygienists.htm 逐条核对：median annual $94,260（$45.32/小时）、10th percentile $66,470、90th percentile $120,060、行业细分offices of dentists $94,570/offices of physicians $84,720/government $77,940、7%就业增长(2024-2034)、约15,500个新增岗位，全部与正文/FAQ/schema逐字一致，无编造或误传。"
    },
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "全篇具名引用BLS OEWS/OOH项目并标注数据年份(May 2024)，非泛泛而谈；额外解释了'时薪转年薪假设2080工时'这一容易被误解的细节，属于真实的专业增量信息。"
    },
    {
      "dimension": "时效性",
      "status": "未发现问题",
      "detail": "published=updated=2026-08-03，发布仅1天，数据为BLS最新公开的May 2024批次，未过时。"
    },
    {
      "dimension": "竞品差异化",
      "status": "未发现问题",
      "detail": "get_serp_results实测'dental hygienist salary'：竞品含BLS官方页、Indeed、Coursera、ADHA、DentalPost、USNews、CareerExplorer等，多数只给薪资区间或按州罗列，未解释'时薪岗位换算年薪'的方法论细节，也未清楚拆解三个行业设置的权衡（私人诊所时薪高但福利/排班稳定性权衡）。本文的这两处解释构成真实增量，非同质化。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题",
      "detail": "live页面实测：title/meta description/canonical/单一h1均正常；schema含Article/FAQPage/BreadcrumbList/Dataset/Person，结构化数据完整；图片alt文本描述性强（含具体百分位数字）。"
    },
    {
      "dimension": "GEO审计",
      "status": "粗估达标",
      "detail": "coreSummary+FAQ+具体数字构成良好的可引用性和统计数据完整性，与本站pharmacist-salary此前审计的约89/99水平一致（同模板、同数据管线），未发现薄弱维度需要补强。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "未发现问题",
      "detail": "grep确认正文0处破折号，无需处理。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "唯一外部来源（BLS OOH页面）WebFetch实测200可访问，内容与引用一致。"
    },
    {
      "dimension": "内链健康度",
      "status": "未发现问题",
      "detail": "Salary Guide分类下现有dental-hygienist-salary/actuary-salary/pharmacist-salary/physical-therapist-salary/how-much-do-flight-attendants-make/radiology-tech-salary/crna-salary共7篇（已超过6篇轮转窗口阈值），[slug].astro的轮转窗口逻辑会按位置差动态选6篇，非固定slice，本文非孤儿页。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "不适用",
      "detail": "本次审计未对文章做任何编辑，无需检查一致性漂移。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "live页面实测免责声明存在；grep正文未发现'you will earn'/'guaranteed'/培训机构推荐等YMYL红线表述。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题",
      "detail": "配图为站内脚本自动生成的SVG柱状图（tools/bls-data/generate-charts.mjs同源数据），非第三方图片，无版权问题，public/images/dental-hygienist-salary-chart.svg存在。"
    }
  ],
  "actions_taken": [
    "本次未对文章做任何编辑——十二维度审计均未发现问题",
    "未触及build/commit/deploy/IndexNow/内容发布日志.md——无内容变更，无需重新部署"
  ],
  "seo_score": "未重新打分具体分值，技术SEO抽查（title/meta/h1/schema/canonical/alt）无问题",
  "geo_score": "粗估约89/99（与同模板pharmacist-salary一致水平），未修改",
  "escalation": null
}
```

```json
{
  "url_slug": "actuary-salary",
  "last_audited": "2026-08-05",
  "published_date": "2026-08-03",
  "note": "本站第三次审计，选取数组第二位（发布顺序第二早）且从未审计过的文章",
  "diagnosed_checkpoints": [
    "median/10th/90th百分位薪资数字（$125,770/$75,240/$206,430）是否与BLS当前公开数据逐字一致",
    "四个行业细分薪资（management of companies $133,030/finance and insurance $126,830/government $118,910/professional-scientific-technical $111,640）是否准确",
    "22%就业增长/7,300新增岗位口径是否可溯源到BLS原文",
    "正文归因给'Occupational Outlook Handbook'的具体事实性论断——'associate级认证最长需7年，fellowship还需额外数年'——是否真的是OOH原文内容而非编造/夸大细节",
    "对标竞品（salary.com/acturhire.com/actuary.info等）时，本文（仅有全国百分位+4个宽口径行业中位数）是否存在真正的内容深度差距"
  ],
  "findings": [
    {
      "dimension": "事实准确性",
      "status": "未发现问题",
      "detail": "用Browser pane实地打开https://www.bls.gov/ooh/math/actuaries.htm（curl直连被BLS 403拦截，改用真实浏览器渲染），逐条核对Summary/Pay/How to Become One三个tab的原始DOM文本：median annual $125,770（$60.47/小时）、10th percentile低于$75,240、90th percentile高于$206,430，四个行业中位数management of companies $133,030/finance and insurance $126,830/government(excl. state/local education/hospitals) $118,910/professional, scientific, and technical services $111,640，22%就业增长(2024-2034)/7,300新增岗位，全部与正文/FAQ/schema逐字一致。特别核查了'The Occupational Outlook Handbook notes it can take up to seven years to earn just the associate-level credential'这条具体归因论断——OOH的How to Become One tab原文写'It may take up to 7 years for an actuary to earn the associate-level certification because of the lengthy preparation required. After becoming associates, actuaries typically take several more years to earn fellowship status.'，与文章表述逐字对应，非编造或夸大。"
    },
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "全篇具名引用BLS并标注数据年份，sources字段有明确URL+访问日期+数据年份；站内还配了'查看自己薪资对应百分位'的客户端小工具，属于真实的实用性增量而非泛泛而谈。"
    },
    {
      "dimension": "时效性",
      "status": "未发现问题",
      "detail": "BLS OOH该页面当前实测last modified仍为2025-08-28、数据仍为May 2024，与本文引用一致，未过时；与pharmacist-salary审计确认的'OOH次年8月刷新'节奏一致，预计下次刷新约在2026年8月前后。"
    },
    {
      "dimension": "竞品差异化",
      "status": "确认发现问题，独立复核确认为真实但决定本次不做不安全的修复",
      "detail": "WebSearch+实地打开acturhire.com（actuary专属招聘站的竞品文章）：该页基于DW Simpson年度调研数据，提供按0/2/4/6/8年经验+P&C/Health/Pensions三个执业方向+student/associate/fellow三个认证等级交叉细分的薪资表，颗粒度远超本文（本文只有全国百分位+4个BLS宽口径行业中位数）。独立复核agent（真正启动的后台agent，独立WebSearch核实了竞品页面内容真实性）给出结论CONFIRMED-BUT-NO-SAFE-FIX：内容深度差距真实存在，但DW Simpson是私营招聘调研机构自报数据，不是BLS官方数据，属于本站'只用可独立核实的政府数据'政策明确排除的第三方调研数据类别；本站已有一次'编造/未标注事实'的历史教训，把无法逐条核验的第三方数字拼进这篇100% BLS溯源的页面会重新引入同一类风险，且会模糊'本页=纯政府数据'的读者信任定位。结论与2026-08-03 pharmacist-salary审计得出的同类结论一致：记录为架构层面待办（如需覆盖经验/认证等级细分，应做成单独、明确标注来源为DW Simpson一类第三方调研并附完整归因的新页面，不修改这篇BLS专属页面）。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题",
      "detail": "Skill(seo-audit)指引下实测：title 61字符、meta description 147字符（均在建议区间内）、canonical自引用正确（https://wagelark.com/actuary-salary/）、单一h1、5个h2结构清晰；JS实测JSON-LD含FAQPage/Article/BreadcrumbList/Dataset四种结构化数据；robots.txt正确allow全部AI爬虫（GPTBot/ChatGPT-User/ClaudeBot/Claude-Web/PerplexityBot/Google-Extended）并声明sitemap；dist/sitemap-0.xml包含本文URL；正文图片、about页、隐私政策页、本文页面均curl实测200。"
    },
    {
      "dimension": "GEO审计",
      "status": "未发现问题，达标",
      "detail": "按项目99分制11维度人工核算：权威原文引语14、统计数据完整性13、可引用性12、结构规范性11、表达流畅度9、语义密度7、权威信号7、专业术语6、鲁棒性4、跨域连接3、易懂表达3，合计约89/99，与pharmacist-salary/dental-hygienist-salary同模板同数据管线得分一致，高于80分及格线。较弱项同样集中在'权威原文引语'（转述+标注而非逐字引用）与'跨域连接'（无手写正文锚文本内链，仅侧栏自动轮转）。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "不适用",
      "detail": "published=2026-08-03，humanizer规则已在建站第一天强制执行，无需回填。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "sources仅1条外部引用（BLS OOH actuaries页面），Browser pane实地访问200可达，内容与本文引用一致（含Pay tab和How to Become One tab两个子页面均核实）。"
    },
    {
      "dimension": "内链健康度",
      "status": "未发现问题",
      "detail": "Salary Guide分类现有10篇文章（超过6篇轮转窗口阈值），本文位于数组第2位，实测live页面'More in Salary Guide'侧栏正常展示轮转后的同类文章链接（pharmacist-salary/physical-therapist-salary/how-much-do-flight-attendants-make等），非孤儿页。全站仍无正文手写锚文本内链（站级已知模式，非本文独有）。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "不适用",
      "detail": "本次审计未对文章内容做任何编辑，schema字段无需检查一致性漂移。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "live页面实测免责声明存在（'This page reports government wage statistics for informational purposes...'）；正文/FAQ通读未发现收入承诺式表述、培训机构推荐或个性化职业建议。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题",
      "detail": "配图为站内脚本从同一份BLS数据自动生成的SVG柱状图（非第三方图片，无版权问题），curl实测public/images/actuary-salary-chart.svg返回200，且SVG内嵌数字（75,240/125,770/206,430）与正文数字逐字一致。"
    },
    {
      "dimension": "AdSense政策合规",
      "status": "未发现问题",
      "detail": "public/ads.txt实测内容为'google.com, pub-5245502795720653, DIRECT, f08c47fec0942fa0'，账号ID正确；隐私政策页(/privacy/)、关于页(/about/)均curl实测200可访问；标题'Actuary Salary: BLS Wage Data by Percentile (2026)'非标题党，无诱导误点；正文无隐含金融/收入承诺表述。"
    }
  ],
  "actions_taken": [
    "本次未对文章做任何编辑——十三维度中仅'竞品差异化'一项为真实发现，经独立后台agent复核确认为CONFIRMED-BUT-NO-SAFE-FIX（与pharmacist-salary 2026-08-03审计的同类结论一致），未做不安全的数字编辑，已如实记录为架构层面待办",
    "独立复核agent（general-purpose，后台异步）正常运行完成，全程约30秒完成WebSearch验证+给出结论，未出现卡死，无需启动看门狗降级流程",
    "未触及build/commit/deploy/IndexNow/内容发布日志.md——无内容变更，无需重新部署"
  ],
  "seo_score": "未重新打分具体分值，技术SEO抽查（title/meta/h1/schema/canonical/alt/robots.txt/sitemap）无问题",
  "geo_score": "约89/99（按11维度逐项核算），高于80分及格线，未修改",
  "escalation": null
}
```

```json
{
  "url_slug": "physical-therapist-salary",
  "last_audited": "2026-08-06",
  "published_date": "2026-08-03",
  "note": "guides.ts数组第4位、与pharmacist-salary/dental-hygienist-salary/actuary-salary同为2026-08-03首批发布，从未被本任务审计过，按站内既有数组位置优先惯例选取",
  "article_specific_checklist": [
    "median/p10/p90（$101,020/$74,420/$132,500）及四类行业细分中位数是否与BLS当前公开数据逐字一致",
    "11%就业增长/29,300新增岗位口径是否可溯源到BLS原文",
    "DPT三年学制+需学士学位+national licensing exam这条从业资格论断是否准确",
    "正文'private outpatient physical therapy offices...where a large share of PTs are employed'这句未标注具体数字的定性论断，是否有真实数据支撑而非模糊归因"
  ],
  "findings": [
    {
      "dimension": "事实准确性",
      "status": "未发现问题",
      "detail": "Browser pane实地渲染bls.gov/ooh/healthcare/physical-therapists.htm（curl直连被Akamai拦截，与本站历次审计经验一致）逐条核对Pay/Job Outlook/How to Become三个tab：median $101,020/$48.57时薪、p10<$74,420、p90>$132,500、四类行业中位数、11%增长(2024-34)/+29,300岗位，全部与正文/FAQ/schema逐字一致。'DPT programs typically last 3 years'及'typically require a bachelor's degree'均逐字匹配BLS原文。'a large share of PTs are employed'这句额外核实：Work Environment tab明确给出'Offices of physical, occupational and speech therapists, and audiologists 34%（最大类别）'，证实为真实可验证的最大雇主类别而非模糊归因，唯一可选优化是正文没写出具体34%数字（GEO权威原文引语维度弱化，非事实错误）。"
    },
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "全篇具名引用BLS并标注数据年份(May 2024)，sources字段有URL+访问日期。"
    },
    {
      "dimension": "时效性",
      "status": "未发现问题",
      "detail": "发布仅3天，BLS OOH该页Last modified仍为2025-08-28，数据是当前BLS公开最新批次，未过时。"
    },
    {
      "dimension": "竞品差异化",
      "status": "未发现问题（沿用既有站级决策）",
      "detail": "WebSearch头部结果含Indeed/USC DPT项目页/ZipRecruiter/Glassdoor等，均有州/城市细分数据，本文无。与pharmacist-salary 2026-08-03审计发现的同类差距一致——BLS州级数据只以XLSX/查询工具形式发布，已有'州组合页'规划架构解决，不在单篇文章硬塞无法逐条核验的数字，不视为本文独有待办。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题",
      "detail": "seo-audit通过：title 61字符（guides.ts原始值，含后缀72字符属全站Layout统一行为）/description 145字符/单一H1+规范H2结构/canonical自引用正确/图片alt含具体数字/robots.txt对AI爬虫均Allow。"
    },
    {
      "dimension": "GEO审计",
      "status": "未发现问题",
      "detail": "约84/99（阈值80，达标）。权威原文引语10/16为最弱项（正文均转述BLS数据无逐字引语）、统计数据完整性13/14、权威信号6/8（单一来源BLS）、跨域连接3/4（无正文手动锚文本内链，仅侧栏自动轮转）。未低于及格线，未触发修复。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "不适用",
      "detail": "published=2026-08-03已在humanizer全站强制化之后，grep确认正文0处破折号。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "唯一外部来源BLS OOH页面，Browser pane实测可正常访问。"
    },
    {
      "dimension": "内链健康度",
      "status": "未发现问题",
      "detail": "live页面'More in Salary Guide'侧栏展示6篇同类文章链接，非孤儿页，使用site-toolkit轮转窗口算法。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "未发现问题",
      "detail": "curl实测live页面FAQPage/Article/BreadcrumbList/Dataset四种JSON-LD均正确渲染，字段与正文数字逐一吻合。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "免责声明页脚存在，未发现收入承诺式表述或培训机构推荐。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题",
      "detail": "配图为站内脚本从wages-source.json自动生成的SVG柱状图，非第三方图片，无版权问题。"
    },
    {
      "dimension": "AdSense政策合规",
      "status": "未发现问题",
      "detail": "ads.txt正确指向pub-5245502795720653；正文为百科式薪资统计记述；无标题党/诱导误点布局；privacy/about页面均200可访问。"
    }
  ],
  "actions_taken": [
    "十三维度深挖零确认问题——全部数字经BLS原始页面逐字核对无误，包括容易触发'模糊归因'疑虑的'a large share of PTs'论断也用BLS Work Environment tab的34%雇主占比数据独立证实为真，未产生任何需要独立复核agent的候选发现",
    "未对文章正文/元数据做任何编辑，未触发build/commit/push/部署/IndexNow流程"
  ],
  "seo_score": "seo-audit通过，未发现需修复项",
  "geo_score": "约84/99（阈值80，达标）",
  "escalation": null
}
```

```json
{
  "url_slug": "what-does-a-physician-assistant-do",
  "last_audited": "2026-08-10",
  "published_date": "2026-08-03",
  "note": "全站last_audited最早的两个站之一（WageLark 08-06 20:06 < LingoGrove 08-06 20:15，其余8站均08-09），本次跨站排序里排第一；站内该文从未被本任务审计过，按guides.ts数组位置（4篇已审计之后的第一篇未审计条目）选取",
  "article_specific_checklist": [
    "median $133,260 + 四类行业细分中位数（government $151,470/outpatient care $147,650/hospitals $136,630/physician offices $129,640）+ p10/p90（$95,240/$182,200）是否与BLS当前公开数据逐字一致",
    "'examine, diagnose, and treat patients under the supervision of a physician'这句直接打引号的BLS引语是否逐字准确",
    "20%就业增长(2024-34)/162,700现有岗位数是否可溯源到BLS原文",
    "PANCE全称+PA-C credential+州执照要求这条从业资格论断是否准确",
    "FAQ里'医生4年医学院+3-7+年住院医'这个跟本站主题（PA）相邻但不是PA数据的比较性论断是否有真实依据"
  ],
  "findings": [
    {
      "dimension": "事实准确性",
      "status": "未发现问题",
      "detail": "WebSearch多次交叉核实（BLS页面curl直连403，与本站历次审计经验一致，改用WebSearch核对）：median annual $133,260/hourly $64.07、p10 $95,240/p90 $182,200、四类行业中位数（government $151,470/outpatient care centers $147,650/hospitals $136,630/offices of physicians $129,640）、20%job outlook 2024-34、直接引语'examine, diagnose, and treat patients under the supervision of a physician'，全部逐字匹配BLS OOH原文（同时核对了guides.ts与同文件bls-wages.ts里'29-1071'条目的内部数据一致性，两处完全吻合）。PANCE全称'Physician Assistant National Certifying Examination'+NCCPA主管机构+PA-C credential命名均核实准确。FAQ里医生'医学院4年+住院医3-7+年'的表述经核实与真实住院医年限分布（3年家庭医学到7-8年神经外科/整形外科）一致，'7+'的加号覆盖了超过7年的长学制情况，未发现夸大或编造。"
    },
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "唯一来源BLS OOH具名标注URL+访问日期+数据年份，schema里author字段为具名Person（Owen Zhang）+about页链接。"
    },
    {
      "dimension": "时效性",
      "status": "未发现问题",
      "detail": "发布仅7天，BLS数据仍为May 2024最新批次，无需刷新，published字段已存在（2026-08-03），本次审计未触碰updated字段，不涉及L-0809-1回填风险。"
    },
    {
      "dimension": "竞品差异化",
      "status": "未发现问题",
      "detail": "get_serp_results实测'what does a physician assistant do'：本文尚未进入前20（符合发布7天的预期），头部竞品为Mayo Clinic/AAPA/医学院官网/BLS本身，均是纯职责描述页或纯薪资页，没有一篇像本文一样把'工作内容叙事'与'BLS四类行业薪资细分'整合在同一页并配套站内salary guide互链，属真实增量而非同质化。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题",
      "detail": "curl实测live页面：title 68字符、description 163字符（略超常见155-160建议但不严重）、单一H1匹配title（不含站名后缀）、5个H2结构清晰、canonical自引用正确、图片alt含具体数字描述、robots.txt对GPTBot/ChatGPT-User/ClaudeBot/Claude-Web/PerplexityBot/Google-Extended均Allow（2026-08-05复查记录）。"
    },
    {
      "dimension": "GEO审计",
      "status": "未发现问题",
      "detail": "Content Extractability Check逐项核对：coreSummary定义块✓/FAQ自包含问答✓/统计数据带来源✓/schema含Article+FAQPage+Dataset+BreadcrumbList四种✓/作者具名✓/7天内更新✓/H2结构匹配查询模式✓/AI爬虫未被robots.txt拦截✓，未发现薄弱维度，达标。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "未发现问题",
      "detail": "手动逐句核对+脚本核实：正文0处em/en dash、0处curly quote、0处AI高频词（crucial/pivotal/delve/tapestry/testament/underscore/boasts/vibrant/nestled/moreover/furthermore/landscape等均为0命中）、无inline-header列表、无'Despite challenges'式收尾段、无chatbot残留用语，判定为早于avoid-ai-writing强制化（08-07）但内容本身已干净，无需重写。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "唯一外部来源BLS OOH页面，WebSearch交叉验证内容仍真实存在且可检索（curl直连403为BLS对自动化抓取的常规拦截，非链接失效）。"
    },
    {
      "dimension": "内链健康度",
      "status": "未发现问题",
      "detail": "grep确认站内至少4处（physical-therapist-salary/nurse-practitioner-salary等）正文手动锚文本桥接句真实链接到本文，且桥接句描述（'duties, specialties, and the education path'）与本文实际三个小节内容一致，非孤儿页；侧栏另有site-toolkit轮转窗口算法生成的'More in Career Guide'相关文章区块。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "未发现问题",
      "detail": "curl实测live页面Article/FAQPage/BreadcrumbList/Dataset四种JSON-LD均正确渲染，datePublished/dateModified均为2026-08-03，与guides.ts的published/updated字段一致。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "正文为百科式职责/薪资/从业路径记述，无渲染成猎奇/煽动性的暴力伤亡描写（本文与暴力主题无关），无武器/毒品/赌博类目内容，无标题党或诱导误点布局；privacy/about页面均200可访问，ads.txt正确指向pub-5245502795720653。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题",
      "detail": "配图/images/physician-assistant-duties.svg为站内自制职责流程示意图（非第三方图片），无版权问题，alt文本描述准确。"
    }
  ],
  "actions_taken": [
    "十三维度深挖零确认问题——所有BLS数字（median/percentile/四类行业细分/job outlook/直接引语）经WebSearch原始来源逐字核对无误，内链/schema/robots.txt/AdSense基础设施均健康，humanizer+avoid-ai-writing脚本级核查零命中，未产生任何需要独立复核agent的候选发现",
    "未对文章正文/元数据做任何编辑，未触发build/commit/push/部署/IndexNow流程"
  ],
  "seo_score": "技术SEO抽查（title/meta/h1/h2/schema/canonical/alt/robots.txt）无问题",
  "geo_score": "Content Extractability Check 10/10项达标，未量化打分（沿用既有审计惯例，仅在发现薄弱维度时给出具体分值）",
  "escalation": null
}
```

```json
{
  "url_slug": "how-much-do-flight-attendants-make",
  "last_audited": "2026-08-12",
  "published_date": "2026-08-03",
  "note": "全站last_audited最早/次早站点之一（wagelark 08-10 20:06为全站最旧之一），本次跨站排序里排入本轮；站内该文2026-08-03发布、Salary Guide分类、从未被本任务审计过，按'从未审计过里发布最早的一批之一'选取",
  "article_specific_checklist": [
    "median $67,130 + p10/p90（$34,030/$138,040）+ 两个行业细分中位数（Nonscheduled $77,060/Scheduled $67,620）是否与BLS当前公开数据逐字一致，且这些数字是否真的能在sources字段引用的那个BLS OOH URL里找到（不是引用了别处的数字却挂错来源）",
    "'wheels-up to wheels-down'只按飞行时段计薪、地面时间不计薪的表述，是否准确且没有忽略2022-2025年多家航空公司工会合同已引入boarding pay这一重大变化",
    "9%就业增长(2024-34)/12,100新增岗位/130,800现有岗位口径是否可溯源到BLS原文",
    "entryEducation'High school diploma or equivalent'是否准确，是否有被忽略的work experience/on-the-job training前提条件",
    "竞品颗粒度对比：本文只有10th/90th两个百分位，头部竞品（US News/SoFi）是否有更细颗粒度（25th/75th或分年资）数据构成真实差异化缺口"
  ],
  "findings": [
    {
      "dimension": "事实准确性",
      "status": "未发现问题（含一次L-0804-4型误判的自我纠正）",
      "detail": "Browser pane实地渲染bls.gov/ooh/transportation-and-material-moving/flight-attendants.htm（curl直连Akamai 403，一贯如此）。get_page_text/innerText对该页面只返回约1900字符（Summary标签的Quick Facts摘要框内容：median $67,130/entryEducation高中文凭/work experience<5年/moderate-term OJT/130,800 jobs/9%/12,100），若仅凭这个结果就断定'该页不含percentile breakdown和行业细分数字、sources字段引用不完整'，会是新一次的全称否定误判（同L-0804-4）——改用javascript_tool取document.documentElement.innerHTML（约120K字符，含全部tab内容）后确认Pay标签原文逐字写着'The lowest 10 percent earned less than $34,030, and the highest 10 percent earned more than $138,040'，以及行业表格Nonscheduled air transportation $77,060/Scheduled air transportation $67,620，与正文/FAQ/schema/sources引用完全一致，非误引。Job Outlook标签原文'Federal regulations require a minimum number of attendants per flight'与正文'regulatory minimum staffing requirements tied to aircraft passenger capacity'表述相符（非直接引语，是准确的转述）。'wheels-up to wheels-down'及2022-2025年工会合同引入boarding pay的表述经WebSearch交叉核实（Delta/American APFA/Southwest TWU 2024年合同、United AFA-CWA 2025年合同均确认新增boarding pay，约为flight pay的50%），与文章'has shifted somewhat in recent years following industry-wide labor negotiations'的措辞准确且没有夸大（未声称已全行业统一改为全额计薪）。"
    },
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "全篇具名引用BLS并标注数据年份，sources字段URL+访问日期+数据年份齐全；本文额外提供了'为什么entry education门槛低但薪资区间极宽'的因果解释（资历制+工会合同+机型/航线分配）以及'公开中位数没完全反映的东西'（计薪时段结构）两处真实的专业增量分析，深度略高于同批姊妹文章。"
    },
    {
      "dimension": "时效性",
      "status": "未发现问题",
      "detail": "BLS OOH该页面last modified仍为2025-08-28、数据仍为May 2024，与pharmacist-salary/actuary-salary审计确认的'OOH次年8月刷新'节奏一致（下次预计2026年8月前后，即将到期但尚未刷新），未过时。"
    },
    {
      "dimension": "竞品差异化",
      "status": "确认发现问题，独立复核确认为真、已修复",
      "detail": "get_serp_results实测'how much do flight attendants make'：本文未进入前20（符合发布9天的预期）。头部竞品US News（careers.usnews.com/best-jobs/flight-attendant/salary，Browser pane直接核实live内容）明确给出25th percentile $52,280/75th percentile $98,160，其median $67,130与BLS完全一致，强烈佐证其数字确系取自同一份BLS OEWS调查（而非独立方法论）。独立复核agent确认这是真实的内容颗粒度缺口，建议优先尝试从bls.gov一手XLSX核实精确数字。本次亲自尝试：curl直连bls.gov/oes/special-requests/oesm24nat.zip返回403，Browser pane navigate同一URL同样被拒绝——与本站历次审计对bls.gov的access经验一致（Akamai对非HTML/直接文件请求的机器人防护）。在无法拿到一手BLS原始表格数字的情况下，采用独立复核agent认可的备选方案：不冒充'BLS数据'，如实注明数字来自US News（并说明其引用同一BLS调查、median完全吻合作为佐证），且明确注明未能独立核对BLS一手XLSX。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题（修复前后均已核实）",
      "detail": "curl实测：title 69字符（含站点后缀）、meta description 147字符、单一H1、3个H2结构清晰（'Why the range is so wide...'/'How airline type changes the number'/'Job outlook'）、canonical自引用正确、JSON-LD含Article/FAQPage/BreadcrumbList/Dataset/WebPage/Organization/Person六种类型、alt文本含具体百分位数字、robots.txt对GPTBot/ChatGPT-User/ClaudeBot/Claude-Web/PerplexityBot/Google-Extended均Allow、'More in Salary Guide'侧栏正常展示6篇同类文章（本分类现有17篇，超过轮转窗口阈值，非孤儿页）。修复后本地build产物dist/how-much-do-flight-attendants-make/index.html重新核实：4个JSON-LD块全部parse成功（FAQPage含新增答案文本），无结构性问题。"
    },
    {
      "dimension": "GEO审计",
      "status": "未发现问题，修复后分数提升",
      "detail": "按11维度人工核算：修复前约85/99（权威原文引语11/16、统计数据完整性13/14、可引用性12/13、结构规范性11/12、表达流畅度9/10、语义密度7/8、权威信号7/8、专业术语5/6、鲁棒性4/5、跨域连接3/4、易懂表达3/3）。修复后新增的25th/75th百分位数据+具体来源引用直接补强'统计数据完整性'和'可引用性'两项，估算提升至约87/99，仍远高于80分及格线。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "适用，检查通过（含修复新增文本）",
      "detail": "published=2026-08-03早于avoid-ai-writing强制化(08-07)，属早期文章，需要全量重过。grep确认全文（含修复前后）0处em/en dash、0处curly quote、0处高频AI词（crucial/pivotal/delve/tapestry/testament/underscore/vibrant等）。Skill(humanizer)对全文33类模式逐条人工核对（含33种风格模式检查）：PASS，无rule-of-three滥用、无promotional language、无vague attribution、无-ing式伪深度分析。修复新增的两段文本（Section 1新段落+FAQ扩写）单独复核：PASS，无新引入AI味。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题（新增来源同步核实）",
      "detail": "原有唯一来源BLS OOH页面，Browser pane实测200可访问、内容与引用逐字一致。修复新增的第二条来源（US News flight attendant salary页面）同样经Browser pane直接live核实可访问，页面文本与sources字段描述一致。"
    },
    {
      "dimension": "内链健康度",
      "status": "未发现问题",
      "detail": "Salary Guide分类现有17篇文章（远超6篇轮转窗口阈值），live页面'More in Salary Guide'侧栏正常展示6篇同类文章链接，非孤儿页。全站仍无正文手写锚文本内链（站级已知模式，非本文独有，未作为本文targeted fix处理）。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "已同步更新",
      "detail": "本次编辑了updated字段（2026-08-03→2026-08-12，published字段已存在无需回填，符合改updated前置检查）。build产物dist/.../index.html核实dateModified已同步更新为2026-08-12T00:00:00+00:00，FAQPage schema的对应answer文本已包含新增的25th/75th百分位内容，无不一致。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "live页面免责声明存在；正文/FAQ通读（含新增文本）未发现收入承诺式表述（未使用'you will earn'等）、无培训机构推荐、无个性化职业建议。新增文本使用'puts the middle half of flight attendants between about...'这类中性统计表述，非承诺式语言。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题",
      "detail": "配图为站内脚本(tools/bls-data/generate-charts.mjs)自动生成的SVG柱状图，非第三方图片，无版权问题，curl实测public/images/flight-attendant-salary-chart.svg返回200。本次未修改图表（新增的25th/75th数据以文字形式加入正文/FAQ，未改动图表管线，避免大范围改动）。"
    },
    {
      "dimension": "AdSense政策合规",
      "status": "未发现问题",
      "detail": "public/ads.txt实测'google.com, pub-5245502795720653, DIRECT, f08c47fec0942fa0'正确；隐私政策页(/privacy/)、关于页(/about/)均curl实测200；标题'How Much Do Flight Attendants Make? BLS Data by Percentile'非标题党、无诱导误点；正文全篇为百科式薪资数据记述，无收入承诺式表述。"
    }
  ],
  "actions_taken": [
    "独立复核agent（general-purpose，后台异步，spawn后约7分钟返回，期间用文件大小/mtime增长做进度监控，未卡死无需触发看门狗）确认'竞品颗粒度缺口'真实存在，建议优先尝试拿bls.gov一手数据；本次亲自复测bls.gov OEWS national XLSX（curl + Browser pane navigate 两种方式）均被403拒绝，与本站历次审计经验一致，无法拿到一手数字",
    "采用独立复核agent认可的诚实归因方案：在Section 1新增一段，在FAQ第一条追加一句，补充25th/75th百分位数据（$52,280/$98,160），明确归因为U.S. News（而非冒充BLS一手数据），并注明其median与BLS完全吻合作为可信度佐证、以及未能独立核对BLS原始XLSX这一限制；sources数组新增第二条来源",
    "修复前后均过Skill(humanizer)+Skill(avoid-ai-writing)人工核查（PASS，新增文本无AI味）、Skill(seo-audit)（PASS，schema结构未受影响）、Skill(ai-seo)（约85→87/99，估算提升）",
    "改updated字段前确认published字段已存在（2026-08-03），无需git log回填，直接改updated为2026-08-12，顺序合规",
    "npm run build（32页全部生成成功）+ npm test（37项全绿）验证通过",
    "commit+push（guides.ts单独提交，未带入并发的sourcebottle-callout-log.md改动）；触发wagelark Cloudflare deploy hook；轮询线上URL确认200且正文含'52,280'新增内容；node tools/submit-indexnow.mjs提交索引",
    "内容发布日志.md追加本次审计更新记录"
  ],
  "seo_score": "技术SEO抽查（title/meta/h1/h2/canonical/alt/robots.txt/内链）无问题，schema在build产物中4块全部parse成功",
  "geo_score": "修复前约85/99，修复后估算约87/99（11维度加权，统计数据完整性+可引用性两项提升），均高于80分及格线",
  "escalation": null
}
```

```json
{
  "url_slug": "what-does-an-actuary-do",
  "last_audited": "2026-08-16",
  "published_date": "2026-08-03",
  "article_specific_priorities": "选择依据：站点优先级排序（跨站last_audited最大值第二早的站点）+ 站内首次被完整审计（此前6篇审计过的文章不含本篇）。本文核心价值主张是'精算师用数学/统计给风险定价，需要多年考试认证才能上岗，BLS给出的中位数薪资是$125,770'，最关键论断：(1) BLS median $125,770 / p10 $75,240 / p90 $206,430（May 2024, SOC 15-2011）是否与BLS OOH当前公开数据一致；(2) '拿到Associate级认证最多需七年'这一时长断言是否可溯源到BLS OOH原文；(3) 养老金/退休福利精算师'额外需要通过美国劳工部与财政部联合委员会取得执照'这一具体监管细节是否准确；(4) 五大专精赛道的划分与描述是否与行业惯例一致。",
  "findings": [
    {
      "dimension": "事实准确性（BLS薪资数字）",
      "status": "核实无误，未发现问题",
      "detail": "WebSearch核实BLS OOH当前公开数据：median annual wage $125,770（May 2024），bottom 10% under $75,240，top 10% over $206,430，与正文/FAQ完全一致；进一步核对站内src/data/bls-wages.ts的15-2011条目（medianAnnual: 125770, p10: 75240, p90: 206430）与正文数字逐一吻合，数据管线内部一致。bls.gov本身对curl返回Access Denied（已知的机器人拦截，非链接失效），改用WebSearch核实为唯一可行路径。"
    },
    {
      "dimension": "事实准确性（认证时长）",
      "status": "核实无误，未发现问题",
      "detail": "WebSearch核实BLS OOH原文确实指出Associate级认证可能需要长达七年（'seven years'），与正文'a process the Occupational Outlook Handbook notes can take up to seven years'完全一致，非编造。"
    },
    {
      "dimension": "事实准确性（养老金精算师执照监管细节）",
      "status": "核实无误，未发现问题",
      "detail": "WebSearch核实：养老金精算师需要通过Joint Board for the Enrollment of Actuaries取得Enrolled Actuary执照，该委员会由财政部长任命3席、劳工部长任命2席组成，源于ERISA 1974法定要求；与正文'this track additionally requires licensing through the U.S. Department of Labor and Treasury'表述一致，属于准确的监管细节转述，非泛泛而谈。"
    },
    {
      "dimension": "时效性",
      "status": "未发现问题",
      "detail": "published/updated均为2026-08-03（13天前），线上schema datePublished/dateModified与之一致无漂移。BLS OOH引用的May 2024数据是当前最新可用年份，未过时。"
    },
    {
      "dimension": "竞品差异化",
      "status": "未发现问题",
      "detail": "dataforseo-query查询'what does an actuary do'真实SERP：前列为bls.gov本身、actuaries.org.uk、beanactuary.org（官方精算学会站）、执业者博客等，多为泛泛描述职责，未见头部结果像本文一样把BLS精确百分位薪资数字（$75,240/$125,770/$206,430）直接编入职业介绍类页面，构成真实增量而非同质化。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题",
      "detail": "curl实测线上页面：title 53字符（源标题）/含品牌后缀；meta description 153字符；单一H1；H2层级无跳级（3个章节+FAQ）；canonical自引用正确；JSON-LD含Article/FAQPage/BreadcrumbList/WebPage/Dataset/Organization/Person，均有效渲染在静态HTML中（Dataset schema对应BLS wage数据标注，是本站专属结构）；1张自制SVG配图alt文本具体描述五大赛道；ads.txt正确指向pub-5245502795720653。"
    },
    {
      "dimension": "GEO审计",
      "status": "达标（≥80），未触发修复",
      "detail": "人工复核估分约86-88/99：coreSummary置顶提供可提取直接答案；正文含多处带来源的具体数字（$125,770/七年/Joint Board监管细节）；FAQPage schema覆盖4个自然语言问题；来源明确标注BLS OOH URL+访问日期+数据年份。未发现薄弱维度需要修复。"
    },
    {
      "dimension": "内链健康度",
      "status": "发现轻度问题（非阻塞）：暂无同站其他文章正文手动锚文本链接到本文",
      "detail": "grep guides.ts确认全站暂无其他文章正文手动链接到/what-does-an-actuary-do/。非真正孤儿页——该文章可通过/career-guides/分类枢纽页与站内轮转related-guides侧栏（site-toolkit共享算法，同Career Guide分类内自动轮转互链）触达，footer导航也含入口。判定为'尚未获得正文层面的自然锚文本'这一轻度观察，不构成需要立即修复的孤儿页问题，不通过编辑其他文章正文来强行插入链接（避免大范围改动其他文章造成范围蔓延），留待后续内链专项或新文章自然提及时补上。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "已检查，未触发重写",
      "detail": "published 2026-08-03，早于avoid-ai-writing 2026-08-07接入，属早期文章范畴。抽读全文未发现明显AI写作特征，行文有具体考试流程/监管细节支撑，判定不需要重写。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "唯一来源为BLS OOH URL（bls.gov/ooh/math/actuaries.htm），curl对bls.gov返回Access Denied（已知机器人拦截），WebSearch多次交叉核实确认该页面仍在线且内容与正文引用一致，非真实链接失效。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "未发现问题",
      "detail": "本文自发布以来未被编辑过（published=updated=2026-08-03），schema字段与guides.ts/bls-wages.ts数据一致。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "全文为职业介绍类百科式内容，无YMYL收入承诺/培训机构推荐等红线语言，footer全站统一免责声明（'not affiliated with the BLS and does not provide personalized career, financial, or legal advice'）存在且覆盖本文。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题",
      "detail": "唯一配图为自制SVG（/images/actuary-specialties.svg，2.7KB，非0字节，本地文件存在），无外部版权依赖。"
    },
    {
      "dimension": "AdSense政策合规风险",
      "status": "未发现问题",
      "detail": "全文为职业/薪资数据类百科式记述，无暴力/武器/毒品/赌博类目内容，无标题党或诱导误点广告布局。curl实测ads.txt正确指向pub-5245502795720653；/about/、/privacy/、/terms/等必备页面均存在。"
    }
  ],
  "independent_verification": "十三维度深挖后仅发现1项非阻塞的轻度观察（内链健康度：暂无正文手动锚文本，但非孤儿页），未发现任何需要修复的真实问题，因此本次未触发SKILL.md第3步独立复核agent流程。第2步核实过程本身已采用同等证据标准：BLS薪资数字/认证时长/监管细节均WebSearch多源交叉核实并与站内bls-wages.ts数据管线逐项比对，非采信单一摘要；SERP差异化用dataforseo-query真实查询而非凭印象判断。未启动独立agent，无卡死情况。",
  "actions_taken": [],
  "seo_score": "seo-audit未发现问题：title 53字符/description 153字符/单一H1/无标题跳级/JSON-LD(Article/FAQPage/BreadcrumbList/Dataset)均有效/canonical正确/自制SVG配图alt具描述性",
  "geo_score": "人工复核估分约86-88/99，达标（≥80），未发现薄弱维度，未触发修复",
  "escalation": null
}
```

```json
{
  "url_slug": "what-does-a-paralegal-do",
  "last_audited": "2026-08-17",
  "published_date": "2026-08-03",
  "article_specific_priorities": "选择依据：与how-to-become-an-ultrasound-tech/how-to-become-a-phlebotomist同为2026-08-03建站首发批次最早日期三方并列，git log确认三者出自同一commit(8ceaabae)同一时间戳，改用文件内数组顺序作二级排序，选中位置最靠前者。本文核心价值主张是'paralegal在律师监督下做研究/起草/整理案卷，不能独立执业，BLS给出median $61,010'，最关键4条具体论断：(1) median $61,010/p10 $39,710/p90 $98,990(May 2024, SOC 23-2011)是否与BLS当前公开数据逐字一致；(2) 五档行业中位数薪资(联邦政府$77,940/金融保险$76,960/地方政府$60,990/律所$59,800/州政府$56,280)是否准确；(3) 0%就业增长/600净新增岗位口径是否可溯源BLS原文；(4) 加引号的BLS直接引语'maintaining and organizing files, conducting legal research, and drafting documents'是否逐字准确。",
  "findings": [
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "全篇具名引用BLS并标注数据年份(May 2024)，正文/FAQ反复出现'according to the U.S. Bureau of Labor Statistics'/'BLS reports'，非泛泛而谈；sources字段有明确URL+访问日期+数据年份标注；含一句加引号的BLS原文直接引语并逐字核实准确。"
    },
    {
      "dimension": "事实准确性",
      "status": "核实无误，未发现问题（但发现1处未经查证的因果归因，见下方独立复核）",
      "detail": "用Browser pane对bls.gov/ooh/legal/paralegals-and-legal-assistants.htm逐个标签页(Summary/How to Become/Pay/Job Outlook)取innerText核对：median annual $61,010/$29.33每小时、p10低于$39,710、p90高于$98,990、employment 376,200(2024)、job outlook 0%/employmentChange 600，与正文/FAQ/schema逐字一致；五档行业中位数薪资(联邦政府$77,940/金融保险$76,960/地方政府$60,990/律所$59,800/州政府$56,280)在Pay标签页原文逐字核对无误；'What They Do'标签页原文'maintaining and organizing files, conducting legal research, and drafting documents'与正文加引号引语逐字吻合。src/data/bls-wages.ts的23-2011条目与正文数字完全一致，数据管线内部无漂移。"
    },
    {
      "dimension": "时效性",
      "status": "未发现问题",
      "detail": "BLS页面'Last modified date: August 28, 2025'，距本次审计约11个半月，本文引用的May 2024数据仍是BLS OOH当前发布的最新版本，未过时，无需更新。"
    },
    {
      "dimension": "竞品差异化",
      "status": "未发现问题",
      "detail": "dataforseo-query真实查询'what does a paralegal do'的SERP：apu.apus.edu/reddit/paralegalonline.bu.edu/nala.org/bls.gov本身/uprovidence.edu/indeed.com/rev.com/youtube等，多为纯职责描述或纯BLS原始数据，未见头部结果像本文一样把BLS精确五档行业薪资中位数直接编入职责介绍类页面，构成真实增量。GSC实测本文28天15次曝光、0点击、站内排名均值36.8，与全站冷启动整体模式一致(sitewide 28天0点击/平均排名16.0)，非本文独有问题，不作为targeted fix。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "发现1项低优先级问题，已修复",
      "detail": "curl+静态HTML解析实测：title 61字符(含品牌后缀)正常；description 171字符，超出150-160推荐区间，SERP展示可能被截断；单一H1；5个H2层级清晰无跳级；canonical自引用正确；JSON-LD含FAQPage/Article/BreadcrumbList/Dataset四块均有效解析；1张自制SVG配图alt文本描述性强；robots.txt/sitemap-index.xml均正常收录本文URL，无索引阻塞。已将description收紧至159字符。"
    },
    {
      "dimension": "GEO审计",
      "status": "达标(≥80)，修复后小幅提升",
      "detail": "按11维度人工核算，修复前约82/99(权威原文引语13/16、统计数据完整性11/14——缺p10/p90叙述+缺annual openings上下文、可引用性11/13、结构规范性11/12、表达流畅度9/10、语义密度6/8、权威信号6/8、专业术语5/6、鲁棒性4/5——含1处未证实因果论断、跨域连接3/4、易懂表达3/3)。修复后(移除未证实因果论断+补充39,300 openings上下文)估算约84/99：鲁棒性提升至5/5(不再有未证实机制声称)，统计数据完整性提升至12/14(补充openings但仍不含百分位，属分类内正常变体非缺陷)。仍高于80及格线。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "适用，检查通过（含修复新增/改写文本）",
      "detail": "published=2026-08-03早于avoid-ai-writing强制化(08-07)，属早期文章，过Skill(humanizer)+Skill(avoid-ai-writing)全文人工核对：grep确认全文(含修复前后)0处em/en dash、0处curly quote、0处高频AI词(crucial/pivotal/delve/tapestry/testament/underscore/vibrant/robust/landscape/leverage/seamless等)。人工逐段核对33类模式：未发现rule-of-three滥用、promotional language、vague attribution、-ing式伪深度分析、copula avoidance等。修复涉及的4处改写文本(移除因果归因句/改写OJT排他性措辞/新增openings clause×2/收紧description)单独复核：PASS，无新引入AI味，且'BLS does not break down why the gap exists by industry'这类如实承认数据局限的表述本身就是humanizer框架鼓励的诚实写法。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "sources仅1条外部引用(BLS OOH页面)，Browser pane实测200可访问，逐标签页内容与本文引用逐字一致，非链接失效。"
    },
    {
      "dimension": "内链健康度",
      "status": "未发现问题",
      "detail": "grep guides.ts确认本文非孤儿页：how-to-become-a-paralegal正文第1797行已有手写锚文本'[what does a paralegal do](/what-does-a-paralegal-do/)'链回本文。Career Guide分类现有3篇文章(what-does-a-paralegal-do/what-does-a-physician-assistant-do/what-does-an-actuary-do)，均≤6篇轮转窗口阈值，live页面侧栏正常展示同类文章链接。本文正文/FAQ无手写锚文本链出(0处markdown链接)，是全站已知模式(此前审计已多次确认为站级模式非本文独有)，未作为本文targeted fix处理。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "已同步更新",
      "detail": "本次编辑了updated字段(2026-08-03→2026-08-17)，published字段已存在(2026-08-03)无需git回填，符合改updated前置检查顺序。build产物dist/what-does-a-paralegal-do/index.html核实dateModified已同步更新为2026-08-17T00:00:00+00:00、datePublished保持2026-08-03T00:00:00+00:00；FAQPage schema第3条answer已包含新增的39,300 openings文本，与正文修改同步，无不一致。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题（已额外核实AI对该职业冲击的现状，判定现有表述已足够保守，无需改写）",
      "detail": "live页面免责声明存在(footer统一版本)；正文/FAQ通读未发现收入承诺式表述、培训机构推荐、个性化职业建议。额外WebSearch核实2026年AI对paralegal行业冲击的现状(约69%的billable hours暴露于AI自动化、约30%职能预计2028年前被自动化，但net demand仍稳定/失业率约1.9%)，判定本文现有的'0%净增长、弱于其他职业'框架本身已经是保守、不过度乐观的表述，与观察到的AI自动化趋势不矛盾，无需额外改写；姊妹文how-to-become-a-paralegal已有专门章节明确引用BLS对AI自动化的归因表述，本文作为更简明的总览页不强行重复。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题",
      "detail": "配图为自制SVG(/images/paralegal-duties.svg，1938字节，非0字节)，file命令确认为有效SVG文件，无外部版权依赖，live页面实测正常渲染。"
    },
    {
      "dimension": "AdSense政策合规风险",
      "status": "未发现问题",
      "detail": "curl实测ads.txt正确指向'google.com, pub-5245502795720653, DIRECT, f08c47fec0942fa0'；/about/、/privacy/、/terms/等必备页面均curl实测200；全文为职业职责/薪资数据类百科式记述，无收入承诺式表述(未使用'you will earn'等)、无培训机构推荐、无标题党或诱导误点。"
    }
  ],
  "independent_verification": "十三维度深挖后发现5项候选问题，全部交给一个全新独立agent复核（只给发现+支撑证据，不透露诊断过程），未卡死，约3分20秒完成：①'Where the pay actually is'一节未经查证的因果归因机制——CONFIRMED（命中教训库L-0806-14已知模式，本站medical-assistant-salary 2026-08-06首次发现同款问题）；②正文/FAQ关于on-the-job training对象的表述矛盾——CONFIRMED但重新定位真正错误方：核实BLS原文后发现FAQ表述准确，正文的排他性措辞才是问题所在（命中教训库L-0805-5但方向与此前两次相反，新增说明性教训）；③缺失39,300 openings/年上下文——CONFIRMED（BLS Job Outlook原文核实存在，姊妹文how-to-become-a-paralegal已单独成节处理，证明站内已认定其值得呈现）；④缺失p10/p90百分位叙述——NOT CONFIRMED（核对同分类另外2篇Career Guide文章后发现并非统一标准，属分类内正常变体）；⑤meta description超长——CONFIRMED，低优先级。仅处理①②③⑤，④未处理。",
  "actions_taken": [
    "移除'Where the pay actually is'一节末尾未经查证的具体因果机制解释('likely reflecting...complexity of federal regulatory and financial-sector work...')，改写为只陈述薪资模式本身，并补一句'BLS does not break down why the gap exists by industry'如实说明数据局限",
    "改写'Education path and job outlook'一节的排他性措辞，去掉'this on-the-job route is a distinct path from the bachelor's-degree-plus-certificate route, not an extension of it'，改为承认两类候选人(持学士学位但无法律相关课程者/仅高中学历者)都可能被安排在职培训，与FAQ第4条(未改动)不再矛盾",
    "正文Job Outlook段落+FAQ第3条均补充BLS的'约39,300 paralegal openings/年'数据及其主要来自岗位替换而非新增职位的说明",
    "description从171字符收紧至159字符，避免SERP截断",
    "改updated字段前确认published字段已存在(2026-08-03)，无需git回填，直接改updated为2026-08-17",
    "修复前后均过Skill(humanizer)+Skill(avoid-ai-writing)人工核查(PASS，改动文本无AI味)、Skill(seo-audit)(PASS)、Skill(ai-seo)按11维度人工核算(约82→约84/99，估算提升)",
    "npm run build(38页全部生成成功)+npm test(40项全绿)验证通过",
    "git add仅暂存src/data/guides.ts(工作区另有6个并发任务文件未纳入)；commit 93ff050；push成功；Cloudflare Pages自动部署(本仓库无deploy hook)；轮询线上URL约45秒后返回200且正文含'39,300 paralegal openings'新增内容，确认真实生效",
    "node tools/submit-indexnow.mjs /what-does-a-paralegal-do/ 提交，Bing 200 / Yandex 200，indexnow-submit-log.json由脚本自动更新",
    "内容通用教训库.md回写：L-0806-14追加复发行(第3次)，L-0805-5追加复发行(第3次，方向首次反转，新增说明性教训'不能默认FAQ是需要修改的一方')",
    "内容发布日志.md追加本次审计更新记录，明确标注为content-quality-audit审计更新非新发布"
  ],
  "seo_score": "修复前title 61字符/description 171字符(超标)/单一H1/5个H2/JSON-LD四块均有效/canonical正确；修复后description收紧至159字符，其余不变",
  "geo_score": "修复前约82/99，修复后估算约84/99(11维度加权，鲁棒性+统计数据完整性两项提升)，均高于80及格线",
  "escalation": null
}
```

```json
{
  "url_slug": "how-to-become-a-phlebotomist",
  "last_audited": "2026-08-18",
  "published_date": "2026-08-03",
  "note": "本站mtime排序（17:42，与warcrumbs并列全矩阵最早）本次一并处理。站内选文用全量slug对比content-audit-log.md历史记录，how-to-become-a-phlebotomist(published 2026-08-03)是全站33篇中25篇从未审计过的文章里published日期最早的一篇。",
  "article_specific_checklist": [
    "BLS median $43,660（2024年5月）与6%增长率(2024-2034)准确性",
    "行业细分薪资排序（outpatient最高$48,450→labs$45,700→hospitals$41,490→physician offices$40,480→ambulatory$39,180）",
    "'两条真实入行路径'（formal certificate程序 vs HS diploma+OJT）表述准确性——本站YMYL-adjacent专属风险点：不能暗示培训机构推荐或收入承诺",
    "跨文章一致性：其他文章提到phlebotomist入行门槛时是否与本文自身表述矛盾"
  ],
  "findings": [
    {
      "dimension": "事实准确性（median/增长率）",
      "status": "未发现问题",
      "detail": "WebSearch多信源（stepful.com/medicalaid.org/BLS OOH页标题结果）交叉确认median $43,660、6%增长率(2024-2034，faster than average)均准确，与本文一致。"
    },
    {
      "dimension": "事实准确性（行业细分薪资）",
      "status": "间接核实，未发现矛盾证据",
      "detail": "bls.gov直连curl返回403(该站已知bot拦截模式，与flight-attendant等既有条目判例一致)。WebSearch第三方聚合站(phlebotomistsalary.com等)给出的具体数字口径不同(mean vs median、2025年数据)，但方向一致(outpatient最高→labs→hospitals→physician offices)，无直接矛盾证据，未发现需要修复的问题。"
    },
    {
      "dimension": "内链健康度 / 跨文章一致性（核心发现）",
      "status": "确认1处问题，已修复",
      "detail": "grep全站确认surgical-tech-salary/pharmacy-technician-salary/nursing-assistant-salary共3处对本文有真实inbound锚文本链接，非孤儿页。但检查这些桥接句时发现pharmacy-technician-salary一文声称phlebotomist'unlike pharmacy technicians, typically requires completing a postsecondary certificate program rather than qualifying with a high school diploma alone'，与本文自身'两条真实路径'的核心论点矛盾（本文明确写明HS diploma+OJT是真实存在的路径，非certificate的附属/例外情况）。独立agent复核CONFIRMED，已改写pharmacy-technician-salary该句为准确表述，详见wagelark`内容发布日志.md`当日记录。"
    },
    {
      "dimension": "YMYL-adjacent合规风险（本站专属）",
      "status": "未发现问题",
      "detail": "全文/FAQ通读未发现收入承诺式表述、培训机构推荐；FAQ第4条明确写'BLS data describes the aggregate labor market, not a recommendation for any specific person'的免责措辞，与本站既有模式一致。"
    },
    {
      "dimension": "EEAT / 竞品差异化",
      "status": "未发现问题",
      "detail": "sources含BLS OOH官方页面，正文'两条真实路径+州法差异+职业跳板价值'的组合呈现构成真实增量，非泛泛而谈。"
    },
    {
      "dimension": "时效性",
      "status": "未发现问题",
      "detail": "BLS 2024年5月数据为该站最新可用数据，published距今15天，无需触发刷新。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "未发现问题，无需重写",
      "detail": "published=2026-08-03，早于08-07全站avoid-ai-writing强制化节点，触发重新扫描。人工通读：无em/en dash、无rule-of-three排比、无套路化收尾/模糊归因，判断已过关。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "sources仅1条BLS OOH页面链接，curl返回403，与本站既有bls.gov判例一致（已知bot拦截，非真实腐烂），未替换。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "未发现问题",
      "detail": "线上JSON-LD实测Article/BreadcrumbList/Dataset/FAQPage/Organization/Person/WebPage均可解析，datePublished/dateModified均为2026-08-03T00:00:00+00:00，与guides.ts的published/updated字段一致（本文自身未修改，未触发updated变更）。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题",
      "detail": "本地/images/phlebotomist-path.svg存在（1,771字节，非0字节），自制SVG无外部版权依赖。"
    },
    {
      "dimension": "合规/AdSense政策风险",
      "status": "未发现问题",
      "detail": "curl实测ads.txt正确指向pub-5245502795720653；/about/、/privacy/均200；全文为百科式职业介绍，无诱导性标题党或暗示性布局。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题",
      "detail": "curl实测：title 68字符/description约130字符均在建议区间内，单一h1，schema丰富，canonical/ads.txt均正常。"
    },
    {
      "dimension": "GEO审计",
      "status": "定性评估达标，未产出量化分数",
      "detail": "仓库内无量化评分脚本（与既有判例一致）。coreSummary前置✓、FAQ独立自包含且配FAQPage schema✓、具名BLS官方信源✓，判定达标（≥80分档）。"
    }
  ],
  "actions_taken": [
    "pharmacy-technician-salary.md正文桥接句改写为准确表述phlebotomist的HS-diploma+OJT路径（本文自身内容未改动，updated字段也未变，因为问题在别的文章里）",
    "pharmacy-technician-salary的updated字段2026-08-05→2026-08-18（published字段已存在，无需回填），改动详情/build/部署/IndexNow均记入wagelark`内容发布日志.md`当日条目"
  ],
  "independent_verification": "1条发现spawn了全新独立复核agent（只给两段原文摘录+问题，不透露诊断过程），约10秒完成，CONFIRMED，无卡死。",
  "seo_score": "本文（how-to-become-a-phlebotomist）未变动，技术项全部通过；pharmacy-technician-salary的seo技术项未受影响（仅改了1句正文+updated字段）",
  "geo_score": "定性评估达标（≥80分档），仓库内无量化评分脚本",
  "escalation": null
}
```

```json
{
  "url_slug": "how-to-become-an-ultrasound-tech",
  "last_audited": "2026-08-19",
  "published_date": "2026-08-03",
  "note": "跨站排序：wagelark为10站中此任务last_audited次早的站之一（本轮跨站排序第二个处理，lingogrove为第一个）；站内按'从未审计过'最高优先级+最早published日期选中本文（本站首日发布最早的一批文章之一，34篇文章中25篇从未被本任务审计过）",
  "diagnosed_checkpoints": [
    "BLS median annual salary $89,340（2024年5月）及四类行业细分薪资（outpatient/hospitals/physician offices/labs）是否逐字准确，非编造或过时",
    "13%就业增长率+11,700个新增岗位（2024-2034）预测数字是否准确",
    "CAAHEP认证机构、ARDMS认证机构名称是否准确（YMYL-adjacent站点，机构名称错误会误导读者）",
    "SOC code 29-2032是否对应Diagnostic Medical Sonographers"
  ],
  "findings": [
    { "dimension": "事实准确性", "status": "未发现问题，全部核实通过", "detail": "直接curl实时抓取bls.gov/ooh/healthcare/diagnostic-medical-sonographers.htm官方原页面（非WebSearch摘要）逐字核对：median annual wage $89,340（2024年5月）、Job Outlook 13%（2024-34, much faster than average）、Employment Change 11,700，四项行业细分薪资Outpatient care centers $123,610/Hospitals $90,070/Offices of physicians $89,450/Medical and diagnostic laboratories $83,200，均与官方页面逐字完全一致，无编造无过时。WebSearch交叉核实SOC code 29-2032对应Diagnostic Medical Sonographers准确；CAAHEP（Commission on Accreditation of Allied Health Education Programs）与ARDMS（American Registry for Diagnostic Medical Sonography）机构全称与常见职能描述准确。" },
    { "dimension": "EEAT", "status": "未发现问题", "detail": "全篇薪资/前景数字均标注来源为BLS并附访问日期，无泛泛而谈的表述。" },
    { "dimension": "时效性", "status": "未发现问题，与实时主源一致", "detail": "BLS官网OOH页面截至本次审计（2026-08-19）仍展示2024年5月OEWS数据（尚未更新为更新周期的数据），文章published/updated均为2026-08-03且引用同一批2024年5月数据，与实时主源完全同步，无需更新。第三方聚合站（非BLS官方）搜到的$96,590/11%等数字未经BLS官方页面证实，判定不采信第三方聚合数据、以官方主源实时抓取结果为准。" },
    { "dimension": "竞品差异化", "status": "未做SERP重新抽查", "detail": "受限于本次运行时间，未跑get_serp_results做竞品实测；文章结构（教育路径+认证+分行业薪资细分+FAQ）具备可验证的具体数据支撑，判定风险较低，留待后续轮次视排名信号决定是否需要专项核查。" },
    { "dimension": "SEO技术审计", "status": "未发现问题", "detail": "实测live页面：title/canonical自引用/schema(Article+FAQPage+BreadcrumbList+Dataset+Organization+Person+WebPage)均正确渲染，配图ultrasound-tech-path.svg（2218字节）200可访问。" },
    { "dimension": "GEO审计", "status": "未做逐项打分，结构完整", "detail": "coreSummary定义块+FAQ schema+具体BLS数字与来源标注，结构符合本站已知GEO达标模式，本次未重新逐项打分。" },
    { "dimension": "早期内容AI味补漏", "status": "未发现问题", "detail": "本文published 2026-08-03早于avoid-ai-writing技能2026-08-07接入，属应检范围；programmatic grep确认全文0处em dash，逐句人工过一遍Tier1/Tier2 AI高频词清单（delve/landscape/robust/leverage/seamless/harness/foster/myriad等）0命中，未发现'not just X'翻案句式或rule-of-three堆砌，文风与本站established基线一致，判定无需改写。" },
    { "dimension": "外部引用链接腐烂", "status": "未发现问题", "detail": "BLS来源链接200可访问，内容与文中引用完全匹配。" },
    { "dimension": "内链健康度", "status": "发现轻度问题（非阻塞）：暂无同站其他文章正文手动锚文本链接到本文", "detail": "grep guides.ts确认全站暂无其他文章正文手动链接到/how-to-become-an-ultrasound-tech/。对照8/16对what-does-an-actuary-do的同类审计结论：非真正孤儿页，可通过分类枢纽页+related-guides侧栏轮转+footer导航触达，判定为轻度观察不构成阻塞项，不通过编辑其他文章正文强行插入链接以避免范围蔓延，留待后续内链专项或新文章自然提及时补上。" },
    { "dimension": "Schema数据一致性", "status": "已确认一致", "detail": "本次未做任何编辑，schema字段与正文/BLS数据保持原有一致状态。" },
    { "dimension": "合规/敏感度漂移", "status": "未发现问题", "detail": "纯职业教育信息，无人物/事件/群体敏感表述；结尾FAQ已含'BLS数据描述整体劳动力市场，非针对特定个人的建议'式免责措辞，符合本站YMYL-adjacent固定页脚免责声明纪律。" },
    { "dimension": "配图可用性与版权", "status": "未发现问题", "detail": "public/images/ultrasound-tech-path.svg站内自制SVG（非第三方图片），文件存在，live页面200可访问。" },
    { "dimension": "AdSense政策合规风险", "status": "未发现问题", "detail": "内容无暴力/武器/毒品/赌博等限制类目；ads.txt正确指向pub-5245502795720653；privacy/terms均200可访问；robots.txt对6个AI爬虫UA均Allow。" }
  ],
  "actions_taken": [
    "无需修复：十三维度审查均未发现需要处理的确认问题（内链健康度为轻度非阻塞观察，按站内既有precedent不强行插入链接）",
    "未修改代码，未触发build/deploy/IndexNow"
  ],
  "seo_score": "技术SEO抽查（title/canonical/schema/图片）无问题，未重新打分具体分值",
  "geo_score": "结构完整（定义块+FAQ schema+数据来源标注），未重新逐项打分",
  "escalation": null
}
```

```json
{
  "url_slug": "radiology-tech-salary",
  "last_audited": "2026-08-21",
  "published_date": "2026-08-04",
  "note": "跨站排序：wagelark本轮last_audited最旧（08-19 17:29，四站并列08-19中最早的mtime）；站内按'从未审计过'最高优先级+guides.ts数组顺序选中本文（29/39篇从未被本任务审计过，本文是第一篇从未审计的文章，位于pharmacist-salary/dental-hygienist-salary/actuary-salary/physical-therapist-salary四篇已审计文章之后）",
  "diagnosed_checkpoints": [
    "BLS median annual salary $77,660（2024年5月）及五类行业细分薪资（federal government/outpatient/hospitals/labs/physician offices）是否逐字准确",
    "4%就业增长率+9,800个新增岗位（2024-2034）预测数字，以及combined类目5%/15,400 openings数字是否准确",
    "$37.97小时薪资是'Radiologic and MRI Technologists'合并类目而非本occupation专属这一区分表述是否站得住（文章自己特别强调了这点，容易被误判为编造）",
    "ARRT/ARDMS/JRCERT三个认证机构名称、职能描述及官网链接是否准确可访问（YMYL-adjacent站点，机构信息错误会误导读者）",
    "MRI技师中位薪资$88,180、物理治疗师中位薪资$101,020两处跨职业对比数字是否准确"
  ],
  "findings": [
    { "dimension": "事实准确性", "status": "未发现问题，全部核实通过", "detail": "直接curl实时抓取bls.gov/ooh/healthcare/radiologic-technologists.htm官方原页面（非WebSearch摘要）逐字核对：median $77,660、bottom 10% $52,360、top 10% $106,990、federal government $93,970、outpatient care centers $81,000、hospitals $78,560、labs $76,770、physician offices $66,060、MRI技师$88,180、combined类目Quick Facts $78,980/年+$37.97/小时、4%增长(228,000→237,800)+9,800新增岗位、combined类目5%增长+15,400 openings/年，均与官方页面逐字完全一致，无一处编造或过时。另curl核对bls.gov/ooh/healthcare/physical-therapists.htm确认物理治疗师中位薪资$101,020准确。$37.97小时薪资的'合并类目非本occupation专属'区分表述经核实是文章的准确澄清，不是编造。" },
    { "dimension": "EEAT", "status": "未发现问题", "detail": "全篇数字均标注BLS来源，对无法从BLS页面直接得出的推论（如联邦雇主薪资最高的原因）明确标注'this article's inference, not a claim BLS itself makes'，未见泛泛而谈。" },
    { "dimension": "时效性", "status": "未发现问题，与实时主源一致", "detail": "BLS官网截至本次审计（2026-08-21）仍展示2024年5月OEWS数据，文章published/updated原为2026-08-04且引用同一批数据，无需更新事实内容；updated字段本次仅因外链修复而非时效性问题被推进。" },
    { "dimension": "竞品差异化", "status": "未发现问题", "detail": "WebSearch核实头部SERP竞品为ZipRecruiter/Indeed/TrustedHealth等自报薪资聚合站，本文明确区分BLS雇主报告数据与自报数据的样本代表性差异、逐职业对比框架（MRI技师/物理治疗师/外科技师/呼吸治疗师）、认证路径细节，非维基百科式同质化内容，判定具备真实增量价值。" },
    { "dimension": "SEO技术审计", "status": "未发现问题", "detail": "title 57字符/description 153字符均在建议区间内；4个H2分节+6项FAQ+4条具名信源；2条已确认的站内正文手动锚文本入链（来自surgical-tech-salary、respiratory-therapist-salary），非孤儿页；正文2条出链锚文本自然多样（'ultrasound technologists'/'physical therapy'）。" },
    { "dimension": "GEO审计", "status": "定性评估达标（≥80分档），未产出量化分数", "detail": "coreSummary前置定义块✓、FAQ独立自包含且配FAQPage schema✓、4条具名权威信源附URL✓、不确定性显式标注（'BLS does not quantify this'等）✓、跨文章可比数据点✓；唯一结构性弱项是全站通用的'无具名作者署名'（非本文独有，属既有站级缺口，不在本次修复范围）。" },
    { "dimension": "早期内容AI味补漏", "status": "未发现问题", "detail": "本文published 2026-08-04早于avoid-ai-writing技能2026-08-07接入，属应检范围；programmatic grep确认全文0处em/en dash、0处弯引号；人工逐句核对未见AI高频词（delve/landscape/testament/underscore/vibrant等）、无copula avoidance（大量直接用is/are）、无rule-of-three堆砌、无'not just X'翻案句式、无泛泛而谈的结尾升华，判定无需改写。" },
    { "dimension": "外部引用链接腐烂", "status": "发现1处确认问题，已修复", "detail": "ARRT（200）、JRCERT（200）访问正常；ARDMS官网ardms.org已改版为301跳转inteleos.org/about/councils/ardms/，该跳转目标返回404（curl -sL -D -复核确认）。独立复核agent（18秒完成，未卡死）二次验证：ardms.org确认404，替换链接inteleos.org/about/community/ardms/确认200且页面内容（title 'Councils - ARDMS - Inteleos'）确实是ARDMS机构介绍页，CONFIRMED。" },
    { "dimension": "内链健康度", "status": "未发现问题", "detail": "grep guides.ts确认已有2篇站内文章（surgical-tech-salary、respiratory-therapist-salary）正文手动锚文本链接到本文，非孤儿页；本文自身也有2条出链，双向内链结构健康。" },
    { "dimension": "Schema数据一致性", "status": "已修复后保持一致", "detail": "仅source URL字段变更，其余可见内容/schema字段无改动，无不一致风险。" },
    { "dimension": "合规/敏感度漂移", "status": "未发现问题", "detail": "纯职业教育/薪资数据信息，无人物/事件/群体敏感表述。" },
    { "dimension": "配图可用性与版权", "status": "未发现问题", "detail": "public/images/radiology-tech-salary-chart.svg站内自制SVG柱状图（非第三方图片），dist构建产物中存在，live页面200可访问。" },
    { "dimension": "AdSense政策合规风险", "status": "未发现问题", "detail": "内容为百科式职业薪资介绍，无暴力/武器/毒品/赌博等限制类目描写，无标题党或诱导布局；ads.txt正确指向pub-5245502795720653；/privacy/、/about/均200可访问。" }
  ],
  "actions_taken": [
    "修复第4条外部信源链接：ARDMS引用URL从已失效的https://www.ardms.org/（301跳转至inteleos.org后404）改为https://www.inteleos.org/about/community/ardms/（实测200，内容确认为ARDMS机构介绍页）",
    "updated字段2026-08-04→2026-08-21（published字段已存在'2026-08-04'，直接推进updated，未触发第4步的git历史回填流程）",
    "npm run build验证通过，dist产物grep确认0处ardms.org残留、1处inteleos.org新链接",
    "commit+push+触发Cloudflare deploy hook，轮询确认线上URL 200后跑node tools/submit-indexnow.mjs提交索引，并在内容发布日志.md追加本次审计更新记录"
  ],
  "independent_verification": "1条发现（ARDMS外链失效）spawn了全新独立复核agent，只给URL+claim不透露诊断过程，约18秒完成，CONFIRMED（含独立curl复核+跳转链追踪+替换链接内容核对），无卡死。",
  "seo_score": "技术项全部通过，无变化",
  "geo_score": "定性评估达标（≥80分档），仓库内无量化评分脚本，与既有判例一致",
  "escalation": null
}
```

```json
{
  "url_slug": "crna-salary",
  "last_audited": "2026-08-22",
  "published_date": "2026-08-04",
  "note": "站内按'从未审计过优先+guides.ts数组顺序'选中本文，本站首篇从未被本任务审计过的文章",
  "diagnosed_checkpoints": [
    "CRNA中位年薪$223,210（2024年5月）是否逐字准确，非编造或过时",
    "与同页另两个APRN角色对比数字（nurse practitioner $129,210、nurse midwife $128,790）及combined 10th/90th百分位数字（$98,520/$217,270）是否准确",
    "9%就业增长率+4,600个新增岗位（2024-2034）预测数字，以及与NP（40%/128,400）、助产士（11%/900）的对比数字是否准确",
    "'COA自2022年起要求所有新入学学生进入博士轨道，2025年起全部认证项目授予博士学位'这一表述是否站得住——文章特别强调BLS官方仍列master's degree为typical entry education、与COA现状矛盾，容易被误判为编造",
    "'1 year of experience working as [a] registered nurse in a critical care setting'这条打引号的BLS原文引语是否逐字准确"
  ],
  "findings": [
    { "dimension": "事实准确性", "status": "未发现问题，全部核实通过", "detail": "直接curl实时抓取bls.gov/ooh/healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners.htm官方原页面（非WebSearch摘要，用带联系方式的UA绕过Akamai默认UA拦截）逐字核对：median annual wage CRNA $223,210/NP $129,210/助产士$128,790、combined 10th/90th percentile $98,520/$217,270、三职业SOC码29-1151/29-1161/29-1171各自employment 53,800→58,500（+4,600，9%）/8,600→9,500（+900，11%）/320,400→448,800（+128,400，40%）、Quick Facts Typical Entry-Level Education 'Master's degree'，均与官方页面数字逐字完全一致，无一处编造或过时。'1 year of experience working as registered nurse in a critical care setting'引语逐字核对BLS原文完全一致（文章加[a]属常规语法补全，未改变原意）。另直接curl coacrna.org官方页面核实：Doctoral degree level、minimum 36 months、需bachelor's degree入学，均属实；'2022年起要求新生进入博士轨道'这一具体年份未在COA该页面直接出现，改用WebSearch交叉核实多个独立信源（AMN Healthcare行业文章、AllNursingSchools）均确认'2022年1月1日或之后入学学生须进入COA认证的博士项目'这一具体日期准确，判定非编造。" },
    { "dimension": "EEAT", "status": "未发现问题", "detail": "全篇数字均标注BLS来源并说明combined-page结构限制（明确区分哪些数字是CRNA专属、哪些是三职业合并数字，主动排除了合并的百分位/行业细分数字而非误用），对无法回答的问题（各州是否要求医师监督）明确说明'this page deliberately does not answer with a single national figure'并给出理由，属真实的方法论透明度而非泛泛而谈。" },
    { "dimension": "时效性", "status": "未发现问题，与实时主源一致", "detail": "BLS官网截至本次审计（2026-08-22）仍展示2024年5月OEWS数据（下一轮更新通常在次年4月前后），文章published/updated均为2026-08-04且引用同一批数据，无需更新事实内容；published字段已存在，本次未触碰updated字段。" },
    { "dimension": "竞品差异化", "status": "未发现问题", "detail": "WebSearch核实头部SERP竞品（Barton Associates、Nurse.org、PayScale、CRNAsalary.com、TheCRNAClub等）多为直接罗列数字或聚合站自报薪资，部分聚合摘要甚至把BLS的'median'误标成'mean'（本次WebSearch结果自身就出现这个错误，反而印证了本文'警惕聚合站数字来源'这一论点的实际价值）；本文的方法论透明度（区分combined-page限制、区分BLS官方entry education与COA现状的实际分歧）在同类页面中少见，判定具备真实增量价值，非同质化内容。" },
    { "dimension": "SEO技术审计", "status": "未发现问题", "detail": "实测live页面：title 56字符/description 155字符均在合理区间；heading结构完整（1个H1+6个H2+1个H3，无跳级）；Article/FAQPage/BreadcrumbList schema均正确渲染，datePublished/dateModified均为2026-08-04T00:00:00+00:00；FAQPage含4个Question条目与正文faq数组一致；配图crna-salary-chart.svg（1600字节）200可访问，alt文本中三个数字均与BLS核实数字一致。" },
    { "dimension": "GEO审计", "status": "定性评估达标（≥80分档），未产出量化分数", "detail": "coreSummary前置定义块✓（首段即给出核心数字+对比+关键结论）；4个FAQ独立自包含且配FAQPage schema✓；3条具名权威信源（BLS/COA/NBCRNA）附URL✓；大量具体统计数字+方法论说明（Princeton GEO研究强调的'引用来源+统计数字+权威语气'三项高权重信号均具备）；不确定性显式标注（'independent practice states'数字'risks going stale...different secondary sources currently report noticeably different counts'）✓；robots.txt对6个AI爬虫UA均Allow✓。唯一非本文独有的弱项：小标题偏叙事性（如'What CRNAs earn, and why this page needs some unpacking'）而非严格query-matching句式，属全站统一风格选择，不在本次修复范围。" },
    { "dimension": "早期内容AI味补漏", "status": "未发现问题", "detail": "本文published 2026-08-04早于avoid-ai-writing技能2026-08-07接入，属应检范围；完整过一遍humanizer+avoid-ai-writing两个技能：0处em/en dash、0处弯引号、0处emoji/加粗滥用、无copula avoidance（全篇大量直接用is/are/reports/requires）、无rule-of-three堆砌、无'not just X'翻案句式、无AI高频词（delve/landscape/testament/underscore/vibrant/robust/leverage/seamless/harness等）命中、无信号性收尾升华。仅发现1处极轻微'It is worth noting, though, that CRNA growth is the slowest'（confidence calibration phrase），全文约1,400词中出现1次，密度远低于技能自身'一篇2,000词内3次以上才算堆砌'的判定阈值，且属技术/参考文体的正常语气而非AI腔调堆砌信号，判定不构成需要改写的问题。" },
    { "dimension": "外部引用链接腐烂", "status": "未发现问题", "detail": "3条sources[]链接逐条curl：BLS页面用默认UA返回403（Akamai对通用UA的反爬拦截，非真实死链），改用带联系方式的UA后200，响应头server: AkamaiGHost印证是bot防护而非页面失效；COA（coacrna.org）200；NBCRNA（nbcrna.com）200。三条均确认存活。" },
    { "dimension": "内链健康度", "status": "未发现问题", "detail": "grep guides.ts确认全站已有5处其他文章正文手动锚文本链接到/crna-salary/（nurse-practitioner-salary、physician-assistant-salary、how-to-become-a-registered-nurse相关对比段、how-long-does-it-take-to-become-a-dentist、librarian相关薪资对比段），远非孤儿页；本文自身也有2条出链（pharmacist-salary、physical-therapist-salary），均grep确认真实存在，双向内链结构健康。" },
    { "dimension": "Schema数据一致性", "status": "已确认一致", "detail": "src/data/bls-wages.ts中SOC 29-1151条目（medianAnnual 223210、employment 53800、jobOutlookPct 9、employmentChange 4600、entryEducation 'Master's degree'）与正文数字逐项核对完全一致；percentiles/industryWages刻意留空，与正文'BLS未按CRNA单独发布这两类数字，仅发布三职业合并数字'的说明一致，非遗漏而是有意为之。" },
    { "dimension": "合规/敏感度漂移", "status": "未发现问题", "detail": "纯职业教育/薪资数据信息，无个性化职业建议；对'能否无医师监督执业'这类因州而异的问题明确建议读者向该州护理委员会核实而非本文给结论，符合YMYL-adjacent站点的免责纪律。" },
    { "dimension": "配图可用性与版权", "status": "未发现问题", "detail": "public/images/crna-salary-chart.svg站内自制SVG柱状图（非第三方图片），文件存在（1600字节），live页面200可访问，图内三个数字与BLS核实数字完全一致。" },
    { "dimension": "AdSense政策合规风险", "status": "未发现问题", "detail": "内容为百科式职业薪资介绍，无暴力/武器/毒品/赌博等限制类目描写；ads.txt正确指向pub-5245502795720653；/privacy/、/about/均200可访问；robots.txt对GPTBot/ChatGPT-User/ClaudeBot/Claude-Web/PerplexityBot/Google-Extended均显式Allow。" }
  ],
  "actions_taken": [
    "未发现需要处理的确认问题，十三维度审查全部通过",
    "未触发第3步独立复核agent（无待复核的具体发现），未修改代码，未触发build/deploy/IndexNow"
  ],
  "independent_verification": "本轮十三维度审查未发现任何需要独立复核的具体问题（最接近的边界项——'worth noting'措辞密度、BLS默认UA返回403——均在本次审计过程中已用直接证据自行排除，不构成需要移交独立agent复核的'确认问题'），故未spawn独立复核agent，符合任务说明'如果这篇文章完全没问题...不需要为了有产出硬找问题'的指引。",
  "seo_score": "技术项全部通过，无变化",
  "geo_score": "定性评估达标（≥80分档），仓库内无量化评分脚本，与既有判例一致",
  "escalation": null
}
```

```json
{
  "url_slug": "nurse-practitioner-salary",
  "last_audited": "2026-08-23",
  "published_date": "2026-08-04",
  "note": "站内按'从未审计过优先+guides.ts数组顺序'选中本文，本站第13篇被本任务审计的文章（crna-salary之后第一篇从未被本任务审计过的文章）",
  "diagnosed_checkpoints": [
    "NP中位年薪$129,210（2024年5月）、employment 320,400→448,800、40%增长率/128,400新增岗位是否逐字准确，非编造或过时",
    "文章刻意不给NP专属10th/90th百分位数字（只给三职业合并数字$98,520/$217,270并说明为何不单列）这一方法论表述是否站得住，与实际数据结构(percentiles: {})是否一致",
    "NONPF 'DNP by 2025'目标未被任何州采纳、2026年仍以master's为主流入职学历，这一表述是否为当前事实",
    "AANP 'roughly 30 states plus DC'具备full practice authority、'up from 22 states in 2020'，这一具体州数是否准确、是否已过时",
    "Dataset JSON-LD schema对本文数据完整性的描述是否与percentiles字段实际内容一致"
  ],
  "findings": [
    { "dimension": "事实准确性", "status": "未发现问题", "detail": "直接curl抓取BLS OOH官方页面bls.gov/ooh/healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners.htm（带联系方式UA，200）逐字核对：NP median $129,210、combined 10th/90th percentile $98,520/$217,270、三职业各自employment/growth/change（NP 320,400→448,800/40%/128,400；CRNA 53,800→58,500/9%/4,600；助产士8,600→9,500/11%/900；三者合计382,700→516,700/35%/134,000）、entry education 'Master's degree'，均与文章数字逐字完全一致。全站overall growth 'roughly 3%'核实为BLS当前公开数字3.1%（2024-2034，170.0M→175.2M）。NONPF DNP-by-2025目标核实：WebSearch多个独立信源确认2025年deadline已过、无任何州要求DNP执照、多数NP项目仍为master's级别，与文章表述一致，非编造。" },
    { "dimension": "EEAT", "status": "未发现问题", "detail": "全篇具名标注BLS/AANP/AANPCB/NONPF来源，明确区分BLS官方数字与AANP（非BLS关联组织）数字的不同权威边界，对无法回答的问题（NP专属百分位、各州执业权限现状）主动说明为何不给出，属真实方法论透明度。" },
    { "dimension": "时效性", "status": "未发现问题，与实时主源一致", "detail": "BLS官网截至本次审计（2026-08-23）仍显示'Last modified date: August 28, 2025'、数据仍为May 2024，与文章published/updated（均2026-08-04）引用的同一批数据一致，暂无需更新事实内容；下一轮OOH年度刷新预计约2026年8月前后，临近但尚未发生。published字段已存在，本次仅在确认无需回退的前提下保留updated不变。" },
    { "dimension": "竞品差异化", "status": "确认发现问题（与pharmacist-salary/crna-salary相同的已知架构缺口），维持既有判例不做不安全修复", "detail": "WebSearch核实当前'nurse practitioner salary'头部结果（salary.com、nurse.org、beckershospitalreview等）普遍提供50州细分+cost-of-living调整数字，本文仅有全国中位数。与此前pharmacist-salary审计（2026-08-03）判例一致：BLS州级数据仅以XLSX/查询工具形式发布，当前工具集无法逐条核验提取，贸然插入风险高于收益；本站已规划'州组合页'架构解决此缺口，非本文范围内的安全修复项。" },
    { "dimension": "SEO技术审计", "status": "未发现问题", "detail": "live curl实测：title 63字符/description 170字符（站内description字符数分布138-170，本文与站内已有6篇并列站内最长但未超出既有分布上限，非新异常）；canonical自引用正确；1个H1+6个H2；Article/FAQPage/BreadcrumbList/Dataset四种schema均正确渲染，datePublished/dateModified均2026-08-04T00:00:00+00:00；FAQPage含4个Question与正文faq数组一致；配图nurse-practitioner-salary-chart.svg（1994字节）200可访问，alt文本4个百分比数字（3%/9%/11%/40%）与正文/图表内数字逐一核对一致。" },
    { "dimension": "GEO审计", "status": "达标（约87/99，高于80及格线）", "detail": "按站内既有11维度99分制核算：权威原文引语13、统计数据完整性13、可引用性12、结构规范性11、表达流畅度8、语义密度7、权威信号7、专业术语6、鲁棒性4（因AANP州数问题扣分，修复后未重新量化）、跨域连接3、易懂表达3，合计约87/99。较弱项与pharmacist-salary判例一致：无逐字BLS原句引用（仅转述+标注）。" },
    { "dimension": "早期内容AI味补漏", "status": "未发现问题（含本次新增文本的复查）", "detail": "本文published 2026-08-04早于avoid-ai-writing技能2026-08-07接入，属应检范围。过Skill(avoid-ai-writing)detect模式+programmatic grep核对全文（含本次修复新增的两段文本）：0处em/en dash、0处弯引号、0处AI高频词（delve/landscape/testament/robust/leverage/seamless/harness/myriad等）命中、无copula avoidance（全篇直接用is/reports/requires/projects）、无rule-of-three堆砌、无'not just X'翻案句式、无vague attribution（凡引用均具名标注BLS/AANP/NONPF）。修复后新增文本'Reporting a specific current count here risks going stale...different secondary sources currently report noticeably different totals'延续与crna-salary（已过审）相同的措辞模式，非新引入AI味。" },
    { "dimension": "外部引用链接腐烂", "status": "未发现问题（1处bot拦截误判已排除）", "detail": "4条sources[]链接逐条实测：BLS OOH页200（带联系方式UA）；AANP州执业环境页200（但为JS渲染交互地图，无法通过curl提取实际州列表/计数，属已知工具盲区，仅确认页面本身存活，不代表能核实其内容具体数字）；AANPCB（aanpcert.org）200；NONPF（nonpf.org）默认UA与带联系方式UA均返回403，响应头显示cf-mitigated: challenge（Cloudflare bot挑战），非真实死链，判定为反爬拦截误判排除。" },
    { "dimension": "内链健康度", "status": "未发现问题，非孤儿页", "detail": "grep guides.ts确认全站已有4处其他文章正文手动锚文本链接到/nurse-practitioner-salary/（physician-assistant-salary、how-to-become-a-physical-therapist、how-long-is-nursing-school、how-to-become-a-librarian，各自锚文本上下文不同非机械重复）；本文自身2条出链（crna-salary、what-does-a-physician-assistant-do）均grep确认真实存在；所属Salary Guide分类20篇文章，超过6篇触发轮转窗口，pickRelatedGuides()算法（含coverage验证工具）已排除固定slice(0,N)风险。" },
    { "dimension": "Schema数据一致性", "status": "确认发现问题，独立复核agent确认为真，已修复", "detail": "src/pages/[slug].astro第85行Dataset JSON-LD的description字段此前无条件写死'National wage percentiles and employment data for ${wage.title}'，但src/data/bls-wages.ts中SOC 29-1171（本文）的percentiles字段实际为空对象{}（BLS该占用页仅发布三职业合并百分位数字，未按NP单独列出），与文章正文'this page leaves those two figures out rather than mislabel them'的谨慎表述直接矛盾——结构化数据向爬虫/AI系统声称的数据完整性超出了页面实际提供的数据。核对src/data/bls-wages.ts确认全站37个职业条目中6个（35-3011/29-2032/31-9097/29-1151/29-2055/29-1171）percentiles为空，此问题理论上影响这6篇文章的Dataset schema，但本次审计仅对本文（29-1171）做出确认与修复。" },
    { "dimension": "合规/敏感度漂移", "status": "确认发现问题，独立复核agent确认为真，已修复", "detail": "AANP 'full practice authority'州数表述'roughly 30 states plus Washington, D.C.'经独立复核agent用当日WebSearch重新核实，与2026年8月多个独立信源（含一条与本文调研完全无关、因查NP执业权限政策争议话题而独立命中的信源）收敛的'AANP自己官方地图约27州+DC'现状不一致，且该差距（30 vs 27，约10%）不是简单的'发布后自然过时'，而是文章发布时归因就已偏高（把其他tracker更激进的数字安在了AANP自己头上）。已有的hedge语言（'confirm via AANP's map'）只覆盖'未来会变'，不覆盖'当下就偏高'这层问题。已确认属实。" },
    { "dimension": "配图可用性与版权", "status": "未发现问题", "detail": "public/images/nurse-practitioner-salary-chart.svg站内自制SVG柱状图（非第三方图片，无版权问题），文件存在，live页面200可访问渲染正常，图内4个百分比数字（3%/9%/11%/40%）与bls-wages.ts/正文数字来源一致。" },
    { "dimension": "AdSense政策合规风险", "status": "未发现问题", "detail": "纯BLS官方薪资/职业教育信息，无限制类目内容；页脚免责声明存在且完整（'not personalized career, financial, or legal advice...does not endorse or recommend any specific employer, school, or training program'）；ads.txt正确指向pub-5245502795720653；/privacy/、/about/均200可访问；robots.txt对GPTBot/ChatGPT-User/ClaudeBot/Claude-Web/PerplexityBot/Google-Extended均显式Allow。" }
  ],
  "actions_taken": [
    "修复1（Schema数据一致性）：src/pages/[slug].astro第85行Dataset description改为按wage.percentiles是否非空条件渲染'wage percentiles and employment'或'median wage and employment'，一次性修复本文及全站其余5个percentiles为空的职业条目的同类overclaim，未触及有真实percentiles数据的条目（build后核对pharmacist-salary的Dataset description未受影响，仍为原文案）",
    "修复2（合规/敏感度漂移-事实准确性交叉）：src/data/guides.ts正文段落与FAQ答案均将'roughly 30 states plus Washington, D.C.'改为'a majority of states'，并补充'Reporting a specific current count here risks going stale...different secondary sources currently report noticeably different totals...some trackers count states with newly passed laws before AANP's own map has caught up'——采用本站crna-salary文章（2026-08-04发布、2026-08-22审计通过）已验证过的'不给具体州数、只解释为何不给'表述模式，非本次新发明的写法",
    "两处修复均为针对性最小改动（各2行代码/文案），未触及文章其余内容；build验证51个页面全部生成无报错；build产物dist/nurse-practitioner-salary/index.html核对Dataset description已生效为'National median wage and employment data...'，'majority of states'文案已生效3处、'roughly 30 states'0处残留",
    "git commit d03d8c5并push到main，CF Pages自动部署完成（无deploy hook，靠push触发），线上curl核对'majority of states'文案已生效，随后跑IndexNow提交"
  ],
  "independent_verification": "本轮十三维度审查发现2条具体问题，均已spawn独立、全新的Agent做复核（未给它们本次审计的其余上下文，仅给对应发现+支撑证据）：(1) Dataset schema percentiles overclaim——独立agent自行重新读取三处源码文件核实后回复CONFIRMED；(2) AANP州数表述——独立agent自行重新跑WebSearch（未复用本次审计已有的搜索结果）后回复CONFIRMED，并指出'文章把更激进的第三方数字安在了AANP自己头上'这一归因层面的问题比单纯'过时'更严重。两个独立agent均在合理时间内正常返回完成通知，无卡死迹象，未触发看门狗超时兜底流程。",
  "seo_score": "技术项全部通过，无变化",
  "geo_score": "约87/99（按站内既有11维度框架核算），高于80及格线；修复涉及的'鲁棒性'维度扣分项已随文案修复解决，未重新量化打分",
  "escalation": null
}
```

```json
{
  "url_slug": "physician-assistant-salary",
  "last_audited": "2026-08-24",
  "published_date": "2026-08-04",
  "note": "站内'从未审计过优先'排序选中——全站33篇从未被本任务审计过的文章里published日期最早的一篇（2026-08-04），且按10站跨站排序（各站content-audit-log.md最后一次git commit时间升序）WageLark当前排名最靠前，本次运行只处理了WageLark，其余9站未轮到，留待下次运行",
  "diagnosed_checkpoints": [
    "PA中位年薪$133,260、10th/90th百分位$95,240/$182,200、$64.07时薪（2024年5月）是否仍是BLS当前发布的最新数据，还是已有更新的May 2025数据未跟进",
    "五档行业中位数（政府$151,470/门诊中心$147,650/医院$136,630/诊所$129,640/教育服务$127,900）排序与数字是否准确，'政府和门诊中心付得比私人诊所多'这一反直觉论断是否为BLS原始数据支持",
    "与NP($129,210)/药剂师($137,480)/CRNA($223,210)三个职业的中位数对比是否与这几篇文章各自的数据源（bls-wages.ts）一致，避免跨文章数字不一致",
    "20%就业增长率/33,200新增岗位/162,700基数，以及与NP(40%)/药剂师(5%)/CRNA(9%)的增速对比是否准确",
    "本文published日期(2026-08-04)早于avoid-ai-writing技能强制化(2026-08-07)，需补做一次AI味排查"
  ],
  "findings": [
    { "dimension": "事实准确性", "status": "未发现问题", "detail": "WebSearch核实BLS OOH物理助理页当前仍显示May 2024数据（中位数$133,260、10th $95,240、90th $182,200），未发现更新的May 2025数据发布，文章数据仍是BLS当前最新版本。curl直接请求bls.gov/ooh/healthcare/physician-assistants.htm返回200。行业五档数字逐一核对src/data/bls-wages.ts的\"29-1071\"记录，与正文/FAQ完全一致（无内部矛盾）。" },
    { "dimension": "跨文章数据一致性（本文专属核查重点）", "status": "未发现问题", "detail": "核对bls-wages.ts里\"29-1171\"(Nurse Practitioners, $129,210)、\"29-1051\"(Pharmacists, $137,480)、\"29-1151\"(Nurse Anesthetists, $223,210)三条记录及其jobOutlookPct(40/5/9)，与本文引用的对比数字逐一精确匹配，非编造或过时引用；WebSearch确认这几个数字来自BLS OEWS按SOC代码拆分的细分表，而非WebSearch摘要优先返回的'Nurse Anesthetists, Nurse Midwives, and Nurse Practitioners'合并页（$132,050），后者是三个职业合并的另一种BLS口径，本文用更精细的细分口径不构成错误。" },
    { "dimension": "时效性", "status": "未发现问题", "detail": "同上，BLS尚未发布更新版本，无需改published/updated字段，未触发'改updated前须先查published字段'的前置检查。" },
    { "dimension": "内链健康度", "status": "未发现问题", "detail": "grep guides.ts确认本文出链4处（what-does-a-physician-assistant-do、nurse-practitioner-salary、pharmacist-salary、crna-salary）均为真实存在的slug；入链4处来自medical-assistant-salary、how-to-become-a-physical-therapist、how-to-become-a-librarian、how-to-become-a-psychologist的正文手动锚文本，非孤儿页。" },
    { "dimension": "外部引用链接腐烂", "status": "未发现问题", "detail": "sources数组唯一外链bls.gov/ooh/healthcare/physician-assistants.htm，curl -I返回HTTP 200。" },
    { "dimension": "配图可用性", "status": "未发现问题", "detail": "public/images/physician-assistant-salary-chart.svg文件存在，alt文本具体描述图表内容（含三个百分位数字），非泛泛而谈。" },
    { "dimension": "SEO技术审计", "status": "未发现问题（一项轻微/非本文专属，未处理）", "detail": "Skill(seo-audit)+curl实测线上页面：title/meta description/canonical/H1/schema(Article+FAQPage+BreadcrumbList+Dataset+Organization+WebPage)均正常；heading层级合理(1个H1+6个H2)；内链16个站内链接，锚文本描述性强。title标签73字符，略超推荐的50-60字符区间，但这是全站'标题 | WageLark'模板的统一写法（其余已审计文章同样如此），非本文独有问题，不单独修复。" },
    { "dimension": "GEO审计（99分制11维度）", "status": "未发现问题，达标", "detail": "人工按站内标准逐维度评估（未使用独立工具量化）：权威原文引语~14/16（BLS方法论说明具体扎实，非泛泛引用）、统计数据完整性14/14（百分位/行业/增速数字齐全且均标注年份）、可引用性~12/13（FAQ五问均为40-60词自包含答案块）、结构规范性~11/12（schema+标题层级完整）、表达流畅度~9/10、语义密度~7/8、权威信号~7/8（明确对比BLS雇主记录法vs第三方自报法的方法论差异，属真实权威信号）、专业术语~5/6（SOC code/OEWS/PharmD等术语使用准确）、鲁棒性~4/5（多处'this article's inference, not a claim BLS itself makes'类型的适当限定表述，不过度断言）、跨域连接4/4（4条有效内链）、易懂表达~2/3，合计约90/99，高于80及格线，未重新触发修复流程。" },
    { "dimension": "早期内容AI味补漏", "status": "未发现问题", "detail": "本文published 2026-08-04，早于avoid-ai-writing技能强制化(2026-08-07)，按规则需补查。提取全文正文+FAQ约1370词过Skill(avoid-ai-writing) detect模式：未发现em dash、Tier1/2/3违禁词表命中、模板短语、'It's not X it's Y'结构、copula avoidance(serves as/features/boasts)、空泛第三方权威('Experts believe')等P0/P1级问题；文中多处'this is this article's inference, not a claim BLS itself makes'/'readers should treat this comparison as descriptive rather than a mechanism BLS has confirmed'属恰当的认知谦逊表述而非空洞对冲。句长偏一致（多为25-45词的复杂句），判断为站内该类BLS数据文章的既定风格（其余已审计的同类文章同样如此），非AI生成特征，不需重写。" },
    { "dimension": "竞品差异化", "status": "未发现问题", "detail": "dataforseo-query实测SERP（'physician assistant salary'，74,000/月），头部结果为bls.gov/nccpa.net/indeed.com/careers.usnews.com/thepalife.com等聚合站，WageLark本文暂未进入前10。内容层面判断有真实增量：(1)明确点出BLS雇主记录方法论vs第三方自报聚合站的差异，这是同类聚合页少见的角度；(2)跨四个相邻职业(NP/药剂师/CRNA)的中位数对比，非单一职业孤立呈现；(3)行业间中位数差异给出限定为'本文推断、非BLS结论'的合理解释。非维基百科式同质化内容。" },
    { "dimension": "Schema数据一致性", "status": "未发现问题", "detail": "本文自建站以来未被编辑过（published=updated=2026-08-04），schema由数据文件构建时自动生成，无手动编辑导致的不同步风险。" },
    { "dimension": "合规/敏感度漂移", "status": "未发现问题", "detail": "BLS薪资数据类内容，无人物/事件/群体敏感表述，无近期争议信号需要重新审视。" },
    { "dimension": "AdSense政策合规", "status": "未发现问题", "detail": "内容为百科式薪资数据陈述，无暴力/武器/毒品/赌博类内容，无标题党或诱导点击布局。curl实测ads.txt仍正确指向pub-5245502795720653，返回200。" }
  ],
  "actions_taken": ["无，13个维度均未发现需要修复的问题，未做任何编辑，未部署，未提交IndexNow，未追加内容发布日志.md（无实际改动内容）"],
  "seo_score": "技术项全部通过，无变化",
  "geo_score": "约90/99（按站内既有11维度框架人工核算），高于80及格线，未触发重新打分",
  "escalation": null
}
```

```json
{
  "url_slug": "surgical-tech-salary",
  "last_audited": "2026-08-25",
  "published_date": "2026-08-05",
  "note": "站内选文按'从未审计过'最高优先级+最早published日期选中：全站49篇中35篇从未被本任务审计过，其中pharmacy-technician-salary与surgical-tech-salary并列published最早(2026-08-05)，用git log --reverse -G'slug:'比对guides.ts条目真正新增的commit时间戳(pharmacy-technician-salary 22:04:24 vs surgical-tech-salary 12:07:48当日更早)，选中surgical-tech-salary。",
  "diagnosed_checkpoints": [
    "median薪资数字（surgical technologists $62,830 / surgical assistants $60,290 / 合并类目$62,480，May 2024）与两个SOC code(29-2055/29-9093)是否逐字准确",
    "4.5%就业增长率/5,200新增岗位/115,600在职人数/约7,000年均空缺——这几个数字precision看似与BLS OOH叙事页嵌入表格里显示的整数'4'不一致，需要查清楚是文章编造了小数精度还是BLS另一数据产品(Table 1.2)本就有更精确口径",
    "CST认证维护要求（30学分含4个live学分/两年周期，或60学分/四年周期，或重考）是否是NBSTSA当前真实有效的选项，还是包含了已过时/停用的续证路径",
    "ZipRecruiter纽约市$107,000/约高出BLS全国中位数70%这一具体可核查数字是否真实存在，不是编造的对比锚点",
    "surgical technologist与surgical assistant两个relate岗位的职责区分表述（Mayo Clinic来源）是否准确"
  ],
  "findings": [
    {
      "dimension": "事实准确性（核心薪资/就业数字）",
      "status": "未发现问题，全部核实通过",
      "detail": "curl直连bls.gov/ooh/healthcare/surgical-technologists.htm（本次未被403拦截）逐字核对：surgical technologists median $62,830、surgical assistants median $60,290、合并类目Quick Facts $62,480/年/$30.04小时/141,000人，SOC 29-2055(115,600人)与29-9093(25,300人)，均与正文/coreSummary/FAQ/schema逐字一致。"
    },
    {
      "dimension": "事实准确性（4.5%增长率精度疑点，本次唯一深挖项）",
      "status": "核实后确认文章准确，非编造",
      "detail": "BLS OOH叙事页内嵌的'Employment projections data'表格对surgical technologists只显示整数'4'（Percent列，非小数）。但文章明确标注引用来源是另一个独立数据产品——BLS Employment Projections National Employment Matrix Table 1.2（sources[]第2条已列出该URL），直接curl该表格（occupational-projections-and-characteristics.htm）核实：SOC 29-2055一行原始列值为115.6/120.8/0.1/0.1/5.2/4.5/0.1/7.0/62,830（对应表头Employment2024/2034/占比2024/2034/变动人数/变动百分比/自雇占比/年均空缺/中位年薪），4.5和7.0（=7,000）与文章逐字一致。两个BLS数据产品对同一职业分别发布整数与一位小数精度是BLS自身的正常现象，非文章编造更高精度，判定不构成问题。"
    },
    {
      "dimension": "事实准确性（CST认证维护要求，本次唯一确认修复项）",
      "status": "确认发现问题，独立复核agent确认CONFIRMED，已修复",
      "detail": "文章原文声称CST维护可选'30学分/两年周期，或60学分/四年周期，或重考'。直接curl nbstsa.org/renewals-recertification官方页面，续证选项表格仅列CST一行：2年周期/30学分/4个live学分，无任何4年/60学分选项；WebSearch交叉核实多个第三方信源（gettrustapp.com、cstexam.com等）明确指出'4年60学分周期已停用，目前全员统一2年30学分周期，网上仍流传的60学分/4年说法是过时信息'。独立复核agent（约51秒完成，未卡死）重新独立fetch官方页面+WebSearch二次验证，结论NOT CONFIRMED as a currently valid pathway（即确认文章这一条描述过时/不准确）。"
    },
    {
      "dimension": "事实准确性（coreSummary与正文教育层级表述内部一致性，独立复核后判定非问题）",
      "status": "疑似发现但独立复核认定不构成问题",
      "detail": "coreSummary写'entry typically requires a certificate or associate's degree'，正文'Certification'节写'a certificate program rather than a full associate degree'，措辞乍看有张力。spawn独立复核agent（未见前序诊断过程，仅给两段原文，约6秒完成）判定NOT CONFIRMED：coreSummary是面向读者的粗略概括（对比四年制学位这个大类），正文是对BLS官方分类的精确复述，二者是'概括vs精确'的正常搭配而非矛盾，不需要修改。"
    },
    {
      "dimension": "事实准确性（ZipRecruiter纽约数字/竞品差异化）",
      "status": "未发现问题，核实为真实数字",
      "detail": "WebSearch直接核实ZipRecruiter当前（2026年8月）纽约市surgical tech页面显示年薪均值约$107,084、时薪$51.48，与文章'roughly $107,000...roughly 70% above the BLS national median'吻合（107,084/62,830=+70.4%，四舍五入'roughly 70%'准确）。判定非编造对比锚点，是真实、可核实的自报薪资网站数字，且文章明确标注了samples偏向高成本大都市这一方法论差异，未误导读者。"
    },
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "全篇具名引用BLS OOH+BLS Employment Projections Table 1.2+NBSTSA+Mayo Clinic College of Medicine四个具名信源，对无法从来源直接得出的推论（如surgical assistant中位薪资反而更低的原因）明确标注'this article's inference, not a BLS-stated explanation'，非泛泛而谈。"
    },
    {
      "dimension": "时效性",
      "status": "未发现问题",
      "detail": "BLS官网截至本次审计（2026-08-25）仍展示May 2024 OEWS数据，文章published/updated原引用同一批数据，无需刷新事实内容；updated字段本次因CST认证信息修复而推进。"
    },
    {
      "dimension": "竞品差异化",
      "status": "未发现问题",
      "detail": "文章明确区分BLS雇主报告数据与ZipRecruiter/Indeed等自报数据的方法论差异，自陈'This particular Handbook page does not publish a 10th/90th percentile wage split'的诚实局限说明，并与站内姊妹文章（phlebotomist/radiologic technologist）做真实数据对比，构成真实增量而非同质化内容。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题",
      "detail": "live页面实测：title/meta description/canonical自引用/单一h1均正常；schema含Article/FAQPage/BreadcrumbList/Dataset/Organization/Person/WebPage均正确渲染；图片200可访问。"
    },
    {
      "dimension": "GEO审计",
      "status": "定性评估达标，未产出量化分数",
      "detail": "coreSummary前置定义块✓、FAQ独立自包含且配FAQPage schema✓、4条具名权威信源附URL✓、不确定性显式标注（'that is this article's inference, not a BLS-stated explanation'等）✓、跨文章可比数据点（phlebotomist/radiologic technologist）✓，结构完整度与站内已有判例一致，判定≥80分档。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "确认发现1处em dash，已修复（含1处站级共享模板em dash一并修复）",
      "detail": "本文published 2026-08-05，早于avoid-ai-writing技能2026-08-07接入，属应检范围。grep guides.ts该条目原文发现1处Unicode em dash（'workers directly — requirements vary by state'），已随CST修复一并改写为句号分句。另外在核对本文line渲染的dist产物时发现src/pages/[slug].astro第120行wage图表标题模板本身硬编码了em dash分隔符（`{wage.title} — Annual Wage by Percentile...`），这是全站共享组件、影响所有带wage数据的文章页面，非本文专属问题，已一并改为冒号分隔符（属于模板/markup层面的一行改动，非某篇文章内容重写，判定在'针对性修复'范围内）。修复后本文humanizer+avoid-ai-writing人工复核零命中其他AI写作特征。grep全站dist产物发现另有7个页面（about/privacy/career-guides/salary-guides/how-to-become等hub页面meta描述 + how-to-become-a-cna/how-to-become-a-physical-therapist的sources[]标签）仍残留em dash，超出本次单篇审计范围，已用spawn_task登记为独立后续任务（task_d9140824），未在本次顺手修复。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "sources共4条：BLS OOH surgical-technologists.htm（200）、BLS Employment Projections Table 1.2页面（200）、NBSTSA cst-certification页面（本次未重新curl，续证页面renewals-recertification已实测200且内容与本文引用一致）、Mayo Clinic surgical-first-assistant页面（200，内容核对与文章描述一致）。"
    },
    {
      "dimension": "内链健康度",
      "status": "轻度观察，非阻塞",
      "detail": "本文出站2条手动锚文本链接到/how-to-become-a-phlebotomist/和/radiology-tech-salary/（均确认目标slug真实存在）。grep全站guides.ts确认暂无其他文章正文手动锚文本入链到本文——本文是链接来源而非目标。Salary Guide分类现有20篇（远超6篇轮转窗口阈值），依赖[slug].astro的related-guides轮转+分类枢纽页+footer导航触达，参照站内既有precedent（ultrasound-tech/radiology-tech同类审计结论）判定为轻度观察不构成阻塞项，未强行编辑其他文章插入反向链接。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "已修复后保持一致",
      "detail": "仅正文一段文字+updated字段变更，schema的datePublished/dateModified/Dataset字段均由guides.ts的published/updated自动生成，随updated字段同步推进，无不一致风险。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "live页面实测免责声明页脚存在；正文/FAQ通读未发现收入承诺式表述、培训机构推荐、个性化职业建议；手术相关描述为百科式职责记述，非猎奇/煽动性呈现。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题",
      "detail": "public/images/surgical-tech-salary-chart.svg站内自制SVG（tools/bls-data同源数据生成），非第三方图片，live页面200可访问。"
    },
    {
      "dimension": "AdSense政策合规风险",
      "status": "未发现问题",
      "detail": "内容为手术室职业介绍，无暴力/武器/毒品/赌博等限制类目渲染；ads.txt正确指向pub-5245502795720653；robots.txt对6个AI爬虫UA均Allow；/privacy/等必备页面200可访问。"
    }
  ],
  "actions_taken": [
    "修复CST认证维护要求描述：删除已过时的'60学分/四年周期'选项，改为准确描述当前唯一有效路径（30学分/两年周期含4个live学分，或重考），并简要说明旧的4年周期已被合并进2年周期（src/data/guides.ts surgical-tech-salary条目）",
    "顺带修复同一段落里1处Unicode em dash（改写为独立句子）",
    "顺带修复src/pages/[slug].astro第120行全站共享wage图表标题模板里的1处em dash（改为冒号），影响所有带wage数据的文章页面渲染",
    "updated字段2026-08-05→2026-08-25（published字段已存在，无需git历史回填）",
    "npm run build验证57页全部构建成功，dist产物grep确认0处'60 credits'残留、0处em dash（本页及模板层面）",
    "spawn_task登记全站其余7处em dash（hub页面meta描述+2篇其他文章的sources标签）为独立后续任务（task_d9140824），未在本次超范围修复"
  ],
  "independent_verification": "2条发现各spawn了全新独立复核agent（互不知晓对方结论，也未见我的诊断推理过程）：(1)CST认证'60学分/4年周期'——约51秒完成，直接curl官方页面+WebSearch交叉验证，结论CONFIRMED为过时信息；(2)coreSummary与正文教育层级表述张力——约6秒完成，仅给两段原文判断，结论NOT CONFIRMED不构成矛盾。两个agent均在预期时间内正常完成，无需触发后台agent看门狗停止流程。",
  "seo_score": "技术项全部通过，无变化",
  "geo_score": "定性评估达标（≥80分档），仓库内无量化评分脚本，与既有判例一致",
  "escalation": null
}
```

```json
{
  "url_slug": "pharmacy-technician-salary",
  "last_audited": "2026-08-26",
  "published_date": "2026-08-05",
  "note": "站点选取规则：本站content-audit-log内最早/未审计slug（前15篇按发布顺序均已审过，本篇为guides.ts数组中下一条从未审计的条目）。跨站选取规则：读全部10个流量站content-audit-log，按最近一次审计commit时间升序排，wagelark（2026-08-25 13:29:44首次运行）与calcbadger（同日13:30:51）并列最早，wagelark提交时间更早1分钟，故本次优先处理wagelark。",
  "diagnosed_checkpoints": [
    "median/percentile薪资数字（$43,460 / $35,100 / $59,450）及时薪$20.90是否与BLS当前公开数据逐字一致",
    "5个行业细分中位数（ambulatory $49,920/hospitals $49,310/general merchandise $46,180/grocery $38,810/pharmacies and drug retailers $37,900）是否可溯源",
    "6%就业增长（490,400→521,800）+31,500净增+约49,000年均空缺岗位的口径是否可溯源到BLS而非编造因果",
    "SOC 29-2052对应的BLS OOH页面是否为'Pharmacy Technicians'独立页面而非与其他职称合并的组合页（L-0823-9关注点）",
    "正文里与pharmacist-salary（$137,480中位数）和how-to-become-a-phlebotomist（'仅需高中文凭'路径）两处跨文章引用是否与对应文章当前实际内容一致"
  ],
  "findings": [
    {
      "dimension": "事实准确性",
      "status": "未发现问题",
      "detail": "curl直连BLS OOH https://www.bls.gov/ooh/healthcare/pharmacy-technicians.htm（该页面为Pharmacy Technicians独立页面，非组合职衔，不适用L-0823-9场景）逐字核对：$43,460中位数、$20.90时薪、10th percentile $35,100/90th percentile $59,450、5个行业中位数(ambulatory $49,920/hospitals $49,310/general merchandise $46,180/grocery and specialty food $38,810/pharmacies and drug retailers $37,900)、6%增长490,400→521,800、净增31,500、约49,000年均空缺，全部与文章正文/FAQ/coreSummary逐字一致，页面SOC码29-2052出现3次核对一致。WebSearch交叉验证同一组数字（含独立第三方站点转述）结论一致。"
    },
    {
      "dimension": "时效性",
      "status": "确认发现但不构成需修复的问题",
      "detail": "WebSearch发现BLS已发布May 2025 OEWS新数据（median hourly $22.00/mean $22.41/mean annual $46,620），但直连BLS OOH该页面实测last modified date为2026-04-24、数据仍完整保留May 2024口径，与本文引用来源逐字一致——跟pharmacist-salary此前审计认定的'BLS OOH年度刷新节奏尚未同步OEWS新数据'是同一模式，非本文编辑失误。BLS若在后续OOH刷新中换成May 2025数据，届时需要跟进复查，暂不构成本次问题。"
    },
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "全篇具名反复引用'the U.S. Bureau of Labor Statistics'/'BLS'，数据年份显式标注(May 2024)，sources字段URL+accessed日期+数据年份三项齐全。"
    },
    {
      "dimension": "竞品差异化",
      "status": "确认发现问题，判定为已知架构性缺口，本次不修复",
      "detail": "WebSearch实测头部竞品(ziprecruiter/wagebystate/pharmacytechpay等)普遍提供50州逐州工资数据(如Hawaii $79,000/Mississippi $31,450/California $54,150等)，本文仅有全国中位数+5个行业细分，无州级数据——与pharmacist-salary此前审计发现的差异化缺口结构完全相同(该次审计已判定：BLS州级职业工资数据仅以XLSX/JS查询工具形式发布，当前工具集无法逐条核实提取50州数字，'薪资数字绝不能靠猜测'硬规则下不安全修复，正确架构位置是本站已规划的州组合页而非硬塞进全国性参考页)。本文遵循同一判例，不重复修复。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题",
      "detail": "live页面实测(curl绕缓存)：title 68字符含品牌后缀、meta description约141字符、单一h1、6个h2层级清晰(见where-your-salary-stands→4个正文小节→FAQ)无跳级、canonical自引用正确、schema含Article/FAQPage(4问答)/BreadcrumbList/Dataset/Organization/Person/WebPage均正确渲染、robots meta未见noindex、配图chart.svg 200可访问。"
    },
    {
      "dimension": "GEO审计",
      "status": "定性评估达标（≥80分档）",
      "detail": "按项目99分制11维度逐项核算（参照近期同类同结构文章pharmacist-salary的评分先例，该文89/99）：权威原文引语约13/16（同样缺逐字引用BLS原句，仅转述+标注，跟同站其他文章一致的通病）、统计数据完整性13/14、可引用性12/13（coreSummary前置定义块+FAQ均自包含）、结构规范性11/12、表达流畅度9/10、语义密度7/8、权威信号7/8（BLS具名引用充分）、专业术语6/6(OEWS/SOC码使用得当)、鲁棒性4/5、跨域连接4/4（正文实际有手动锚文本双向链接到pharmacist-salary和how-to-become-a-phlebotomist，且被dental-assistant-salary手动锚文本反向链接，优于部分姊妹文章'仅依赖轮转无手动内链'的情况）、易懂表达3/3，合计约89/99，高于80分及格线，未执行修复。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "未发现问题",
      "detail": "本文published 2026-08-05，早于avoid-ai-writing技能2026-08-07接入日期，属应检范围。对guides.ts该条目原文机械核查：0处Unicode em dash、0处ASCII双连字符(' -- ')替代腔调；人工通读未发现促销性语言/模糊归因/虚假三段式排比/填充短语等AI写作特征，判定无需重写。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "sources仅1条：BLS OOH pharmacy-technicians.htm，curl直连200且内容与引用一致（已在事实核实步骤一并验证）。"
    },
    {
      "dimension": "内链健康度",
      "status": "未发现问题",
      "detail": "本文正文含2条手动锚文本出站链接(/pharmacist-salary/、/how-to-become-a-phlebotomist/，均确认目标slug真实存在且当前内容与本文引用描述一致)；同时被dental-assistant-salary条目正文手动锚文本反向链接('this site's pharmacy technician salary guide')。既是内链来源也是内链目标，非孤儿页。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "未发现问题",
      "detail": "本次未做任何编辑，无需检查一致性变化；live页面JSON-LD datePublished(2026-08-05)/dateModified(2026-08-18)与guides.ts published/updated字段完全一致。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "live页面实测免责声明页脚存在('for informational purposes...not personalized career, financial, or legal advice')；正文/FAQ通读未发现收入承诺式表述、培训机构推荐、个性化职业建议；无暴力/武器/毒品/赌博相关内容。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题",
      "detail": "/images/pharmacy-technician-salary-chart.svg为站内自制SVG（与surgical-tech-salary同源tools/bls-data生成模式），非第三方图片，live页面200可访问，alt文本与图表数据一致。"
    },
    {
      "dimension": "AdSense政策合规风险",
      "status": "未发现问题",
      "detail": "内容为药房技术员职业介绍，无限制类目内容；curl直连ads.txt确认正确指向pub-5245502795720653；/privacy/与/terms/均200可访问。"
    }
  ],
  "actions_taken": [
    "无——13个维度逐一核查后未发现任何构成'需要修复'的问题，'竞品差异化'与'时效性'两条确认发现的缺口均属已有同类判例覆盖的已知架构性限制（州级数据无法安全核实提取/BLS自身年度刷新节奏未到），不做修复"
  ],
  "independent_verification": "本次13个维度均未产出需要独立复核确认的具体问题（'竞品差异化'与'时效性'两条属于沿用pharmacist-salary既有判例的已知限制，非本文新发现，未触发独立复核流程；其余11个维度均为'未发现问题'）。因此本次未spawn独立复核agent，不适用后台agent看门狗流程。",
  "seo_score": "技术项全部通过，无变化",
  "geo_score": "定性评估约89/99，达标（≥80分档），未执行修复故无变化",
  "escalation": null
}
```

```json
{
  "url_slug": "dental-assistant-salary",
  "last_audited": "2026-08-27",
  "published_date": "2026-08-06",
  "note": "guides.ts数组第17位（第1076行），56篇文章中数组顺序上第一篇从未被本任务审计过的文章，按'未审计优先'规则选中",
  "diagnosed_checkpoints": [
    "median/p10/p90（$47,300/$36,190/$61,780）及3项行业细分中位数是否与BLS当前公开数据逐字一致",
    "6%就业增长/24,400新增岗位/52,900年均岗位口径是否可溯源到BLS原文，'大多数岗位来自替代而非新增'这条解释是否准确",
    "coronal polishing等扩展职责需要执照/注册/认证这条论断，以及CareerOneStop信源引用是否准确",
    "与dental-hygienist-salary($94,260)、pharmacy-technician-salary($43,460)两篇姊妹文章的交叉数字引用是否与各自guides.ts条目一致",
    "本文published=2026-08-06，早于avoid-ai-writing技能2026-08-07接入1天，需要补跑早期内容AI味复检"
  ],
  "findings": [
    {
      "dimension": "事实准确性",
      "status": "未发现问题",
      "detail": "curl直连https://www.bls.gov/ooh/healthcare/dental-assistants.htm（返回200，未复现同日wagelark-content-publishing场次记录的全域403限流）逐条核对：median annual $47,300/$22.74时薪、10th percentile $36,190、90th percentile $61,780、3项行业中位数(government $53,660/offices of dentists $47,250/offices of physicians $46,170)、employment 381,900→406,300(+24,400,6%,2024-34)、年均52,900个岗位（且'多数来自替代离职者而非新增职位'的解释与BLS原文一致）、coronal polishing扩展职责需licensure/registration/certification、CareerOneStop信源引用，全部与正文/FAQ/schema逐字一致，无编造。交叉核对dental-hygienist-salary($94,260)与pharmacy-technician-salary($43,460)两篇姊妹文章的引用数字，均与各自guides.ts条目完全一致。"
    },
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "全篇具名引用BLS OEWS/OOH并标注数据年份(May 2024)；'时薪转年薪假设2080工时'等专业细节属真实增量信息，非泛泛而谈。"
    },
    {
      "dimension": "时效性",
      "status": "确认发现但独立判定不构成需要修复的问题",
      "detail": "curl直连BLS新闻稿news.release/ocwage.t01.htm确认已发布May 2025 OEWS数据(dental assistants employment 387,790/mean hourly $24.13/mean annual $50,200/median hourly $23.11)，但该表仅含均值与时薪中位数，不含年薪中位数与百分位，无法做routine数字替换；本文实际信源(OOH页面)last modified仍为2025-08-28，尚未刷新，与站内pharmacist-salary/actuary-salary两次审计已确立的'OOH次年8月刷新'节奏一致（当前刚好处在预期刷新窗口边缘）。判定：NOT CONFIRMED，建议下次OOH刷新后复查。"
    },
    {
      "dimension": "竞品差异化",
      "status": "未发现新问题（沿用既有站级决策）",
      "detail": "dataforseo_query.py serp实测'dental assistant salary'真实排名：danb.org/indeed.com/dentalpost.net/州定向培训学校页/allalliedhealthschools.com等，未见salary.com/careerexplorer进入前10。头部竞品多提供州/城市细分，本文仅全国数据，与pharmacist-salary 2026-08-03审计发现的同类缺口一致——BLS州级数据仅以XLSX/查询工具形式发布，当前工具集无法逐条核验提取，站内已有'州组合页'架构规划解决此缺口，不视为本文独有待办。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题",
      "detail": "curl实测：title 70字符含品牌后缀、meta description 157字符、canonical自引用正确、单一h1、6个h2结构清晰（4正文小节+1工具小节+1FAQ）；schema含Article/FAQPage/BreadcrumbList/Dataset等类型完整；robots.txt正确allow全部AI爬虫；sitemap-0.xml包含本文URL。"
    },
    {
      "dimension": "GEO审计",
      "status": "未发现问题，达标",
      "detail": "按项目99分制11维度定性核算，因本文有3处真实站内正文手写锚文本内链入链（medical-assistant-salary/what-does-a-dental-hygienist-do/veterinary-technician-salary，跨域连接维度强于此前多数同模板文章的0处），预估与pharmacist-salary/actuary-salary同类模板的约89/99基线持平或略高，高于80分及格线；早期内容AI味问题修复后表达流畅度维度提升。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "确认发现问题，已修复",
      "detail": "本文published=2026-08-06，早于avoid-ai-writing 2026-08-07接入1天，触发本维度全量复检。grep发现'rather than'对比框架在约850词正文+FAQ内命中6次（约每140字一次），命中`独立站/内容通用教训库.md`条目L-0820-2（已知复发5次的跨站AI写作节奏问题：同一对比语法模板反复出现，逐词检测工具查不出但整体读起来机械）。spawn独立agent复核（未卡死，约40秒完成）：CONFIRMED，超出该条目已确立的3-4次阈值，建议改写2-3处；同时核实'reflecting how concentrated the role is in a single type of employer'这处-ing结尾表述，独立agent判定NOT CONFIRMED（有具体数据支撑的合理编辑性表述，非空洞AI尾缀）。已修复：改写4处'rather than'为不同句式（拆句/'not X'结构），保留2处自然表述，降至2次。em dash计数为0，`Skill(avoid-ai-writing)`复扫零命中其余Tier1/Tier2词表。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "sources仅1条外部引用（BLS OOH dental-assistants页面），curl实测200可访问，内容与引用逐字一致。"
    },
    {
      "dimension": "内链健康度",
      "status": "未发现问题",
      "detail": "本文非孤儿页：被medical-assistant-salary/what-does-a-dental-hygienist-do/veterinary-technician-salary三篇文章正文手动锚文本链接（grep guides.ts确认），自身也有2处出链(dental-hygienist-salary/pharmacy-technician-salary)；live页面'More in Salary Guide'侧栏轮转正常展示同类文章。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "已同步",
      "detail": "本次编辑改动了正文文案与updated字段，schema的dateModified随之更新为2026-08-27，与guides.ts updated字段一致（数据源统一，非独立维护）。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "live页面实测免责声明页脚存在；正文/FAQ通读未发现收入承诺式表述、培训机构推荐（CareerOneStop为政府关联资源非私营机构广告）、个性化职业建议；无限制类目内容。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题",
      "detail": "/images/dental-assistant-salary-chart.svg为站内tools/bls-data脚本自动生成的SVG，非第三方图片，curl实测200可访问，图表数字与正文数字同源一致。"
    },
    {
      "dimension": "AdSense政策合规风险",
      "status": "未发现问题",
      "detail": "内容为牙医助理职业介绍，无限制类目内容；curl直连ads.txt确认正确指向pub-5245502795720653；/privacy/与/about/均200可访问；标题非标题党。"
    }
  ],
  "actions_taken": [
    "改写正文4处'rather than'对比结构（保留2处），修复L-0820-2早期内容AI味问题：①首段拆句改写②行业段'not in'替换③④job outlook正文与FAQ对应句均拆句改写",
    "published字段本已存在（2026-08-06），确认存在后将updated字段从2026-08-06改为2026-08-27",
    "python3 seo_drift.py baseline/compare：修改前存档，部署后对比仅报WARNING级'schema内容变化'（dateModified更新+正文改写导致的预期内变化），无CRITICAL发现",
    "npm test（wages-source.test.mjs）47/47全绿；npm run build 63页全部生成无报错",
    "commit a5e70e4 push成功，Cloudflare Pages Git自动部署（本仓库无deploy hook），绕缓存轮询4次后确认200且正文含改写后文案",
    "node tools/submit-indexnow.mjs /dental-assistant-salary/ 提交，Bing 200 / Yandex 200",
    "内容发布日志.md已追加本次审计记录；内容通用教训库.md L-0820-2条目已追加本次'复发'行"
  ],
  "independent_verification": "spawn全新独立agent（general-purpose，后台异步，约40秒完成，未卡死，无需启动看门狗降级流程）复核'早期内容AI味补漏'维度下的两处疑似发现：'rather than'重复6次判定CONFIRMED，'-ing结尾表述'判定NOT CONFIRMED。仅对CONFIRMED的一条采取修复行动。",
  "seo_score": "技术项全部通过，无变化",
  "geo_score": "定性评估约89/99（含3处真实内链的加分），达标（≥80分档），本次因AI味修复表达流畅度维度略有提升",
  "escalation": null
}
```

```json
{
  "url_slug": "medical-assistant-salary",
  "last_audited": "2026-08-28",
  "published_date": "2026-08-06",
  "note": "读content-audit-log.md确认17条已记录审计，56篇文章里39篇从未审计过，按'未审计优先'规则取数组顺序第一篇medical-assistant-salary（第1143行）",
  "diagnosed_checkpoints": [
    "median/10th/90th百分位薪资数字（$44,200/$35,020/$57,830）是否与BLS当前公开数据一致，数据年份是否已过时",
    "4项行业细分薪资数字",
    "就业增长率/净增岗位数/年均开缺数字口径",
    "与physician-assistant-salary/dental-assistant-salary的交叉比较数字（含'全站最大净增'这类站内排名式表述）",
    "'多数州无需执照'这条执照类断言是否有独立信源支持（唯一sources[]的BLS OOH页面不讨论执照）"
  ],
  "findings": [
    {
      "dimension": "事实准确性/时效性",
      "status": "确认发现问题，已修复",
      "detail": "curl直连（带声明联系方式UA）bls.gov/ooh/healthcare/medical-assistants.htm返回200（未被限流），发现BLS该职业页面已从May 2024刷新为May 2025数据（2025-35就业预测周期）：median $44,200→$45,690、hourly $21.25→$21.97、10th $35,020→$36,050、90th $57,830→$59,310、4项行业中位数(outpatient care centers $47,560→$48,560/hospitals $45,930→$46,910/offices of physicians $43,880→$45,520/offices of other health practitioners $37,510→$38,400)、employment 811,000→833,900、增长率12%→13%、净增101,200→107,600、年均开缺112,300→109,700。全部旧数字与当前BLS公开数据不一致。"
    },
    {
      "dimension": "事实准确性（站内排名式最高级断言）",
      "status": "确认发现问题，已修复",
      "detail": "正文'a larger absolute gain than any other occupation currently covered on this site'（净增jobs数为全站之最）经独立agent枚举guides.ts全部56篇文章引用的SOC码、在wages-source.json核对employmentChange字段后判定为假：Software Developers(267,600)/Registered Nurses(166,100)/Financial Managers(128,800)/Nurse Practitioners(128,400，被两篇文章引用)均高于本文数字（不论新旧），本文实际排全站第6位。该断言从publish即存在，从未被真正核实过。"
    },
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "全篇具名引用BLS并标注数据年份，sources字段有明确URL+访问方式+数据年份标注。"
    },
    {
      "dimension": "竞品差异化",
      "status": "未发现新问题（沿用站级既有结论）",
      "detail": "本文medical assistant vs. physician assistant/dental assistant交叉比较构成真实增量价值，与本站其余salary guide同模板页面已确立的'BLS州级数据仅提供XLSX/JS查询工具、当前工具集无法逐条核验'结论一致，未做不安全的州级数字补充。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题",
      "detail": "title 71字符含品牌后缀、meta description 156字符（区间内）、canonical自引用、单一h1、schema含Article/FAQPage/BreadcrumbList/Dataset/WebPage/Organization/ImageObject、sitemap-0.xml含本文URL、lastmod正确更新。"
    },
    {
      "dimension": "GEO审计",
      "status": "粗估达标",
      "detail": "与同模板pharmacist-salary/dental-hygienist-salary/actuary-salary历次审计约89/99水平一致，未发现新的薄弱维度，未重新逐项打分。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "确认发现问题，已修复",
      "detail": "published=2026-08-06，早于avoid-ai-writing 2026-08-07接入1天，触发本维度。'rather than'命中4次，命中L-0820-2已知复发模式（第8次复发）。Skill(humanizer)/Skill(avoid-ai-writing) detect模式复扫全文，除'rather than'密度外未发现其他P0/P1级AI写作特征（无em dash、无AI高频词、无chatbot artifact、无copula avoidance问题）。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "sources仅1条外部引用（BLS OOH页面），curl直连200可访问，内容与本文引用（更新后）一致。"
    },
    {
      "dimension": "内链健康度",
      "status": "未发现问题",
      "detail": "Salary Guide分类24篇文章，live页面'More in Salary Guide'侧栏正常轮转展示同类文章链接，非孤儿页。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "未发现问题（修复后）",
      "detail": "wages-source.json更新后node build-wage-data.mjs重新生成bls-wages.ts，[slug].astro的Dataset schema/统计卡片/图表均从同一数据源渲染，built HTML grep确认新数字全部正确渲染、旧数字完全消失，无字段级不一致。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "live页面实测免责声明存在，正文/FAQ通读未发现收入承诺式表述、培训机构推荐或个性化职业建议。'多数州无需执照，部分州对扩展职责单独要求认证'这条断言经独立agent WebSearch核实（WA州DOH/AAMA/research.com等独立信源）判定CONFIRMED，含WA州要求州注册这一次要caveat但整体判断成立，未改动。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "确认发现问题，已修复",
      "detail": "generate-charts.mjs重新生成全部46张图表（仅medical-assistant-salary-chart.svg实际因数据变化而改变），新图表数字（36,050/45,690/59,310）与正文数字逐字一致，em dash计数0。"
    },
    {
      "dimension": "AdSense政策合规",
      "status": "未发现问题",
      "detail": "ads.txt实测'google.com, pub-5245502795720653, DIRECT, f08c47fec0942fa0'账号ID正确；正文无收入承诺/误导性框架；robots.txt正确allow全部AI爬虫。"
    }
  ],
  "actions_taken": [
    "wages-source.json更新31-9092全部字段为May 2025数据；node build-wage-data.mjs重新生成bls-wages.ts；wages-source.test.mjs同步更新该条目独立硬编码spot-check断言（注释同步说明改为直连curl，本次未被403）",
    "generate-charts.mjs重新生成图表（仅medical-assistant-salary-chart.svg实际变化）",
    "guides.ts更新description/coreSummary/4个section/5条FAQ/sources访问日期/imageAlt的全部数字；dental-assistant-salary交叉比较句差额同步调整（$3,100→$1,610）并注明两站数据来自不同刷新周期",
    "删除未经验证的'全站最大净增'超级claim句，改为只陈述净增数字，未替换为新的未验证排名表述",
    "'rather than'改写2处降至2次（复用dental-assistant-salary审计已验证过的改写句式）",
    "npm test（wages-source.test.mjs）62/62全绿；npm run build 64页全部生成无报错",
    "python3 seo_drift.py baseline/compare：修改前存档，部署后对比仅报2条WARNING（schema内容变化+meta description数字变化），均为预期内编辑，无CRITICAL",
    "commit 8048b97 push成功，Cloudflare Pages Git自动部署（本仓库无deploy hook），绕缓存轮询2次（间隔20秒）后确认200且新数字全部渲染",
    "node tools/submit-indexnow.mjs /medical-assistant-salary/ 提交，Bing 200 / Yandex 200",
    "内容发布日志.md已追加本次审计记录；内容通用教训库.md L-0820-2条目已追加'复发'行，并新增L-0828-2条目记录'站内排名式最高级断言'这一新的可泛化教训"
  ],
  "independent_verification": "spawn 3个全新独立agent（均后台异步，30-77秒完成，均未卡死，无需启动看门狗降级流程）：①BLS数据刷新——CONFIRMED，独立curl重新核对新数字逐字一致；②'全站最大净增'超级claim——CONFIRMED，独立解析guides.ts+wages-source.json列出5篇反例；③执照类断言——CONFIRMED（WA州次要caveat，整体判断成立）。仅对①②两条CONFIRMED的发现采取修复行动。",
  "seo_score": "技术项全部通过，无变化",
  "geo_score": "粗估约89/99（与同模板页面一致水平），未重新逐项打分",
  "escalation": null
}
```

## 2026-08-28 CTR抢救审计（top15页面标题优化，Owen批准的一次性专项）
依据：8/28 全矩阵体检——本站 7 个页面排名 8-12 但四周点击近零，且 5 页共用同一标题骨架"X Salary: BLS Wage Data by Percentile (2026)"（无数字钩子+轻度模板指纹）。本次把各页 BLS 中位数（取自页面自身已核实数据，非新增数字）放进 title 并差异化句式：flight-attendants/radiology-tech/electrician/welder/pharmacist/nurse-practitioner/actuary 共 7 页，正文与 description 未动。观察点：2-4 周后 site-search-opportunity-refresh 复查这批页的 CTR 与排名（若排名下滑>5位需回滚该页标题）。⚠️ 标题含 (2026)：2027 年年度刷新时需同步更新。

```json
{
  "url_slug": "air-traffic-controller-salary",
  "last_audited": "2026-08-30",
  "published_date": "2026-08-09",
  "note": "guides.ts数组位置第19（18篇已审计条目之后第一篇从未审计过的文章），按既定'从未审计优先，按数组位置'规则选取",
  "diagnosed_checkpoints": [
    "median/percentile薪资数字（$144,580/$76,090/$210,410）是否与BLS当前公开数据逐字一致",
    "两项行业细分工资（federal government $154,000/support activities for air transportation $82,510）是否准确",
    "1%就业增长/300净增/2,200年均开缺口径是否可溯源到BLS原文",
    "entry age cutoff（31岁，军属/FAA合同经验放宽至35岁）+mandatory retirement age 56这条FAA政策断言是否仍是2026年现行政策",
    "与dental-hygienist-salary/how-much-do-flight-attendants-make两处跨文章比较数字是否仍与对方文章当前数据一致"
  ],
  "findings": [
    {
      "dimension": "事实准确性/时效性",
      "status": "确认发现问题，已修复",
      "detail": "curl直连（带声明联系方式UA）bls.gov/ooh/transportation-and-material-moving/air-traffic-controllers.htm返回200，页面已从May 2024刷新为May 2025数据：median $144,580→$148,080（$69.51→$71.19/小时）、p10 $76,090→$78,420、p90 $210,410→$215,610、federal government $154,000→$156,250、support activities for air transportation $82,510→$83,890、employment(基准年) 24,100(2024)→24,000(2025)、job outlook 1%(2024-34)→2%(2025-35)、净增300→400、年均开缺2,200→2,100、全站中位数对照$49,500→$50,980。独立复核agent二次curl核实9项里8项逐字一致，仅90th percentile因该agent误读相邻图表数值未能独立复核，改由本次会话此前的直接curl结果（highest 10 percent earned more than $215,610）独立确认。5 U.S.C. §8335外部链接因本机对uscode.house.gov的TLS握手超时无法直接curl核实，WebSearch交叉核实该URL结构（req=granuleid:USC-prelim-title5-section8335）与5 U.S.C. §8335条文内容真实存在，判定为沙箱网络限制而非真实链接腐烂，未改动该引用。FAA年龄门槛（31岁/放宽35岁/强制56岁退休）经WebSearch独立信源（多个ATC招聘/法律解读站点）核实2026年现行政策未变；BLS新版页面文本本身已简化为'apply before the FAA's age cutoff'不再写具体数字，但文章原始引用来源是FAA hiring policy非BLS本身，不受BLS页面文本简化影响，未改动。"
    },
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "全篇具名引用BLS并标注数据年份，sources字段含BLS OOH+5 U.S.C. §8335两条来源（较同批姊妹文章的单一来源更丰富）；正文含'为什么联邦雇主薪资显著高于承包塔台'的因果解释（含明确'BLS未解释此差距，此为本文推断'的免责措辞）以及与dental-hygienist-salary/flight-attendants两处真实手写跨文章比较，属于真实的专业增量分析。"
    },
    {
      "dimension": "竞品差异化",
      "status": "确认发现问题，独立复核确认为真实但决定本次不做不安全的修复",
      "detail": "dataforseo serp实测'air traffic controller salary'：本文未进入前12（符合发布3周的预期），头部竞品含bls.gov本身/reddit/indeed/allcriminaljusticeschools/careers.usnews.com/joinhandshake/123atc.com。WebSearch核实Glassdoor（25th $72,078/75th $134,143）、CareerExplorer（25th $73,919/75th $137,483）、ZipRecruiter（25th $73,000/75th $135,000）均提供25th/75th百分位及部分提供州级细分，颗粒度超过本文（仅10th/90th+全国两行业）。但三者均为私营招聘平台自报数据，非BLS官方口径，延续本站pharmacist-salary(2026-08-03)/actuary-salary(2026-08-05)两次审计已确立的CONFIRMED-BUT-NO-SAFE-FIX判例（未能像how-much-do-flight-attendants-make审计那样找到median与BLS逐字吻合、可作为'确系同源数据'佐证的第三方来源），未强行拼入无法逐条核验的数字。仍待州组合页架构规划解决。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题（滞后于数据刷新的meta description已随本次修复同步更新）",
      "detail": "curl实测live页面：title 68字符含品牌后缀正常、单一H1匹配title、6个H2结构清晰、canonical自引用正确（https://wagelark.com/air-traffic-controller-salary/）；schema含Article/FAQPage/BreadcrumbList/Dataset/Organization/WebPage/ImageObject七种类型，均服务端渲染非JS注入；robots.txt对全部AI爬虫（GPTBot/ChatGPT-User/ClaudeBot/Claude-Web/PerplexityBot/Google-Extended）Allow。meta description修复前含旧数字$144,580，随数据刷新一并更新为$148,080。"
    },
    {
      "dimension": "GEO审计",
      "status": "未发现问题，达标（估计高于同批姊妹文章）",
      "detail": "按站内11维度99分制估算：本文相比pharmacist-salary/actuary-salary/physical-therapist-salary等同模板姊妹文章多出两项差异化优势——sources字段有2条来源（BLS+法律条文）而非1条，且正文对dental-hygienist-salary和flight-attendants各有一处真实手写跨域锚文本连接（多数姊妹文章'跨域连接'维度较弱正是因为缺少这类正文内手写内链，仅靠侧栏轮转），预估约90/99，高于80分及格线，未做进一步GEO专项修复。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "不适用",
      "detail": "published=2026-08-09，晚于avoid-ai-writing技能2026-08-07接入日期，无需回填检查。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题（一条因沙箱网络限制无法直接验证，已用替代方式核实）",
      "detail": "BLS OOH来源curl直连200可访问。5 U.S.C. §8335来源本机TLS握手对uscode.house.gov超时（非403，是连接层超时，判断为本次会话所在网络环境对该域名的限制），改用WebSearch确认该URL结构（含精确的granuleid查询参数）与条文内容真实存在、可被搜索引擎正常索引，非死链。"
    },
    {
      "dimension": "内链健康度",
      "status": "未发现问题，双向健康",
      "detail": "grep确认：本文正文对/dental-hygienist-salary/和/how-much-do-flight-attendants-make/各有一处真实手写锚文本链接（非仅侧栏轮转）；反向核实发现2026-08-29新发布的highest-paying-jobs-without-a-degree文章正文对本文有一处真实手写锚文本链接（'BLS lists an associate's degree as the typical entry path for [air traffic controllers](/air-traffic-controller-salary/)...'），本文非孤儿页，且是本站少数被专门外部文章手写引用（而非仅靠轮转算法）的页面之一。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "已随数据刷新同步更新",
      "detail": "curl实测live页面Article/FAQPage/BreadcrumbList/Dataset等JSON-LD字段与guides.ts更新后的新数字（148,080/78,420/215,610等）逐一吻合，dateModified随updated字段同步为2026-08-30。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "live页面实测免责声明存在；正文/FAQ通读未发现收入承诺式表述、培训机构推荐或个性化职业建议；FAA年龄限制/强制退休等表述为客观转述联邦法律条文，非煽动性或歧视性内容。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "未发现问题，已随数据刷新重新生成",
      "detail": "配图为站内脚本(tools/bls-data/generate-charts.mjs)从同一份wages-source.json自动生成的SVG柱状图，非第三方图片，无版权问题；本次数据刷新后已用node generate-charts.mjs重新生成，图表数字与正文数字来自同一数据源天然一致。"
    },
    {
      "dimension": "AdSense政策合规",
      "status": "未发现问题",
      "detail": "ads.txt实测正确指向pub-5245502795720653；privacy/about页面均curl实测200；标题非标题党，正文为百科式政府薪资数据记述，无收入承诺/培训机构推荐/个性化职业建议等YMYL红线表述。"
    },
    {
      "dimension": "跨文章数据漂移（本次新增维度，非原13维度但审计中发现）",
      "status": "确认发现问题，独立复核确认，已修复",
      "detail": "独立复核agent grep guides.ts全文确认：2026-08-29新发布的highest-paying-jobs-without-a-degree（榜单类文章）独立硬编码本文旧median $144,580达7处（coreSummary、排名表格第1行、正文散文'from air traffic controllers at $144,580 down to bartenders...'、两条FAQ答案、description、imageAlt），若只更新本文（源头文章）会导致站内两篇文章对同一BLS职业展示两个不同的'权威'薪资数字，损害可信度。已在同一次修复中一并更新全部7处，并重算依赖旧数字的差值句（'$144,580 down to $33,530, a nearly $111,000 gap'→'$148,080 down to $33,530, a nearly $115,000 gap'）。该榜单文章依赖的no-degree排名图表SVG（highest-paying-jobs-without-a-degree-chart.svg）已用node generate-no-degree-ranking-chart.mjs从同一更新后的wages-source.json重新生成，与新数字保持一致（该职业entryEducation为Associate's degree，落在NO_DEGREE_TIERS集合内，图表逻辑自动纳入更新）。"
    }
  ],
  "actions_taken": [
    "更新tools/bls-data/wages-source.json的53-2021条目全部字段为May 2025数据",
    "node build-wage-data.mjs重新生成src/data/bls-wages.ts",
    "更新tools/bls-data/wages-source.test.mjs该条目的独立硬编码spot-check断言及注释",
    "node generate-charts.mjs重新生成air-traffic-controller-salary-chart.svg；node generate-no-degree-ranking-chart.mjs重新生成highest-paying-jobs-without-a-degree-chart.svg",
    "更新guides.ts本文description/coreSummary/2个section正文/3条FAQ/sources访问日期/imageAlt的全部数字，重算2处依赖旧数字的差值句",
    "更新guides.ts的highest-paying-jobs-without-a-degree条目共7处（description/coreSummary/排名表格/正文散文/2条FAQ/imageAlt），重算1处差值句",
    "撰写过程中发现并发会话（veterinarian-salary新文章）同时改动同一批共享文件，改用git archive+脚本重放编辑+git hash-object/update-index的blob级暂存提交（未碰工作树）；中途因干净副本构建时机early于并发会话commit落地，第一次commit意外把对方已提交内容清零，已用git reset --soft撤销并基于正确HEAD重新构建重新提交，未推送过错误版本",
    "commit 5c6662a，push成功（含一次LibreSSL网络重试）；不适用Cloudflare deploy hook流程（本仓库无hook，Git自动部署）",
    "seo_drift.py compare：2条WARNING（schema内容变化+meta description数字变化），均为预期编辑，无CRITICAL",
    "node tools/submit-indexnow.mjs /air-traffic-controller-salary/ /highest-paying-jobs-without-a-degree/，Bing/Yandex均200",
    "独立站/内容通用教训库.md新增条目：跨文章数据漂移（更新数据源头文章后必须检查全站汇总/榜单类文章是否复制引用了同一数字）"
  ],
  "seo_score": "技术SEO抽查（title/meta/h1/h2/schema/canonical/robots.txt/ads.txt）无问题，meta description随数据刷新同步更新",
  "geo_score": "估计约90/99（含2处正文手写跨域锚文本连接，优于同批姊妹文章的约84-89/99），高于80分及格线，未修改结构",
  "escalation": null
}
```

```json
{
  "url_slug": "how-to-become-a-cna",
  "last_audited": "2026-08-31",
  "published_date": "2026-08-10",
  "note": "读content-audit-log.md确认19条已记录审计，guides.ts共60篇文章中41篇从未审计过；按'未审计优先，同为未审计时取published日期最早'规则，how-to-become-a-cna与respiratory-therapist-salary同为2026-08-10发布、并列最早，按guides.ts数组顺序取排在前面的how-to-become-a-cna",
  "diagnosed_checkpoints": [
    "median/10th/90th百分位薪资数字（$39,530/$31,390/$50,140）及数据年份（May 2024）是否仍与BLS当前公开数据一致",
    "5项行业细分薪资排序是否准确",
    "3处引用的CFR法规条文（§483.152 75小时门槛/§483.35(d) 4个月上限/§483.154(e)(2) 30天注册时限）是否逐字准确、非编造",
    "PHI'过半数州要求超过联邦最低小时数、最高达180小时'这一断言是否有独立信源支持",
    "与站内medical-assistant-salary/how-to-become-a-phlebotomist两篇姊妹文章的交叉比较数字是否与对方页面当前数据一致"
  ],
  "findings": [
    {
      "dimension": "事实准确性/时效性",
      "status": "确认发现问题，已修复",
      "detail": "curl直连（带声明联系方式UA）bls.gov/ooh/healthcare/nursing-assistants.htm返回200，独立agent复核确认BLS该职业页面已从May 2024刷新为May 2025数据：median annual $39,530→$42,260、10th percentile $31,390→$33,940、90th percentile $50,140→$51,980、5项行业中位数整体上调且排序变化（nursing care facilities skilled nursing反超hospitals，government/CCRC-assisted living/home healthcare排名不变，数值分别45,760→47,050/43,000/42,310/39,490/38,040）、就业增长率2%→3%（定性表述从'slower than average'变为'about as fast as average'，2024-34→2025-35周期）、年均开缺211,800→203,300、orderlies中位数$37,700→$38,290（同一BLS页面数据）。全部旧数字与当前BLS公开数据不一致。"
    },
    {
      "dimension": "事实准确性（跨文章比较句过期，L-0830-2非榜单变体）",
      "status": "确认发现问题，已修复",
      "detail": "正文'CNA pay next to other quick-entry healthcare roles'一节引用'medical assistants...BLS median annual wage of $44,200'，独立agent对比读取medical-assistant-salary页面原文（该页2026-08-28审计已刷新为May 2025数据）确认其当前median为$45,690，本文引用数字过期$1,490。判定为独立站/内容通用教训库.md L-0830-2的非榜单变体（普通跨文章比较句而非汇总/排行文章），已按规则在该条目追加复发记录。phlebotomists比较句引用的$43,660经核对与该姊妹页面当前数字一致（该页尚未刷新到BLS最新的May 2025数据$45,230，但本次审计范围不含该页，保留现状不产生新的站内不一致）。"
    },
    {
      "dimension": "法规引用准确性（CFR citations）",
      "status": "未发现问题",
      "detail": "curl直连eCFR原文逐条核对3处引用：§483.152'no less than 75 clock hours of training...at least 16 hours of supervised practical training'与正文表述一致；§483.35(d)'A facility must not use any individual working in the facility as a nurse aide for more than 4 months...unless...competent'与正文'4个月上限'表述一致；§483.154(e)(2)'A record of successful completion of the competency evaluation must be included in the nurse aide registry...within 30 days'与正文'30天注册时限'表述一致。3处法规引用均为准确转述，非编造或夸大。"
    },
    {
      "dimension": "EEAT",
      "status": "未发现问题",
      "detail": "全篇具名引用BLS并标注数据年份，另有PHI（国家级政策研究组织）作为培训时长断言的独立信源，sources字段有明确URL+访问方式+数据年份标注，非泛泛而谈。"
    },
    {
      "dimension": "第三方信源断言核实（PHI培训时长断言）",
      "status": "未发现问题",
      "detail": "WebSearch独立核实PHI（phinational.org）关于'30个州+DC超过联邦75小时最低标准，最高达180小时'的报告，多个二手信源（如nursinghome411.org）交叉印证方向一致，未发现编造或夸大。该断言未列入sources[]（仅在正文提及），审计范围内判定为准确但引用完整度可进一步提升，本次未作为强制修复项处理。"
    },
    {
      "dimension": "竞品差异化",
      "status": "未发现问题",
      "detail": "WebSearch实测'how to become a CNA'SERP：竞品（Indeed/AllNursingSchools/Nurse.org/Forbes Advisor/RegisteredNursing.org）多聚焦项目周数/学费区间/逐州排名，较少像本文一样精确到具体CFR法规条文号（§483.152/§483.35(d)/§483.154(e)(2)）与四个quick-entry健康职业的量化横向对比，构成真实差异化而非同质化内容。"
    },
    {
      "dimension": "SEO技术审计",
      "status": "未发现问题",
      "detail": "live页面实测：title 62字符含品牌后缀、meta description约152字符（区间内）、canonical自引用、单一h1、schema含Article/FAQPage/BreadcrumbList/Dataset/WebPage/Organization/ImageObject。check_seo_field_stats.py：title长度z-score=-1.60（偏短而非超标，不构成问题），description z-score=-0.92（正常范围）。"
    },
    {
      "dimension": "GEO审计",
      "status": "未发现问题，达标",
      "detail": "按11维度粗估约86/99：权威原文引语12/16（较弱，无逐字引用BLS/CFR原句，仅转述+精确citation）、统计数据完整性13/14、可引用性12/13、结构规范性11/12、表达流畅度9/10、语义密度7/8、权威信号7/8（BLS+CFR+PHI三方政府/权威信源）、专业术语5/6、鲁棒性4/5、跨域连接3/4（2处正文手写锚文本链接姊妹文章）、易懂表达3/3，高于80分及格线，数据刷新未改变结构，评分维持不变。"
    },
    {
      "dimension": "早期内容AI味补漏",
      "status": "不适用",
      "detail": "published=2026-08-10，晚于avoid-ai-writing/humanizer 2026-08-07强制化生效日期，无需回填。本次编辑后重新grep确认0处em/en dash、0处AI高频词汇。"
    },
    {
      "dimension": "外部引用链接腐烂",
      "status": "未发现问题",
      "detail": "sources 3条外部引用（BLS OOH页面+2处eCFR条文）curl直连全部200可访问，内容与本文引用（更新后）一致。"
    },
    {
      "dimension": "内链健康度",
      "status": "未发现问题",
      "detail": "How to Become分类21篇文章，[slug].astro轮转窗口逻辑正常覆盖，live页面'More in How to Become'侧栏实测展示6篇同类文章链接，非孤儿页。"
    },
    {
      "dimension": "Schema数据一致性",
      "status": "确认发现问题，已修复",
      "detail": "修复前live页面Dataset schema的name/temporalCoverage均显示'May 2024'，与guides.ts prose更新后的'May 2025'不一致；根因是Dataset schema从bls-wages.ts（经wages-source.json生成）读取dataYear字段，而guides.ts的prose是独立手写文本，两处数据源不同步。修复：更新wages-source.json的31-1131条目后运行node build-wage-data.mjs重新生成bls-wages.ts，构建后built HTML grep确认Dataset schema的temporalCoverage/name均已变为'May 2025'，与prose数字一致。"
    },
    {
      "dimension": "合规/敏感度漂移",
      "status": "未发现问题",
      "detail": "live页面实测免责声明存在；正文/FAQ通读未发现收入承诺式表述、培训机构推荐或个性化职业建议，BLS数据描述为'aggregate labor market'而非个人建议的措辞保留。"
    },
    {
      "dimension": "配图可用性与版权",
      "status": "确认发现问题，已修复",
      "detail": "public/images/cna-certification-path.svg为手写时间线图表（非脚本批量生成），非第三方图片无版权问题，但图中'Certified nurse aide (CNA): median $39,530/yr'文字硬编码了旧数字，与正文更新后的$42,260不一致；已手动更新SVG文字为$42,260，构建后grep确认新数字正确渲染。"
    },
    {
      "dimension": "AdSense政策合规",
      "status": "未发现问题",
      "detail": "ads.txt实测'google.com, pub-5245502795720653, DIRECT, f08c47fec0942fa0'账号ID正确；正文无收入承诺/误导性框架；robots.txt正确allow全部AI爬虫。"
    },
    {
      "dimension": "机械检查(check_prose_patterns.py)",
      "status": "确认发现问题，已修复",
      "detail": "首次运行发现L-0819-9命中：5条FAQ answer与正文各有一处≥20连续字符逐字重合（原因是FAQ本就大量转述正文同一事实，且薪资数字/CFR条文措辞高度受限）。独立复核agent确认底层问题真实（并指出我最初审计报告对FAQ#1/#3的具体重合字符串引用有误，已在复核中更正），5次迭代改写全部FAQ answer（同步刷新新数字）后，最终check_prose_patterns.py四项机械检查全部通过，退出码0。"
    }
  ],
  "independent_verification": "spawn 3个全新独立agent（均后台异步完成，17-81秒，均未卡死，无需启动看门狗降级流程）：①BLS数据刷新——CONFIRMED，独立curl重新核对全部新数字逐字一致（median/percentiles/行业细分/增长率/openings/orderlies）；②medical-assistant-salary交叉引用过期——CONFIRMED，独立读取两处guides.ts原文核对，判定为L-0830-2非榜单变体；③FAQ与正文≥20字符逐字重合——CONFIRMED（agent指出我最初报告中FAQ#1/#3引用的具体重合字符串有误，重新核实后确认底层问题真实存在，5条FAQ均有真实重合）。三条均采取修复行动。",
  "actions_taken": [
    "tools/bls-data/wages-source.json的31-1131条目全字段更新为May 2025数据（medianAnnual/percentiles/employment/employmentYear/jobOutlookPct/jobOutlookLabel/employmentChange/projectionPeriod/industryWages重排序/dataYear/publishedDate）",
    "node tools/bls-data/build-wage-data.mjs重新生成src/data/bls-wages.ts",
    "tools/bls-data/wages-source.test.mjs的31-1131 spot-check改为2026-08-31直连curl结果（原2026-08-10记录标注为Akamai 403改用Wayback快照，本次直连未被拦截，注释同步说明）",
    "guides.ts更新：updated字段2026-08-10→2026-08-31（published字段保持不变）；coreSummary/4个section全部数字刷新；CNA pay对比section重算orderlies差值（$1,830→$3,970）与medical assistants/phlebotomists差值百分比（12%→8%/10%→3%）；全部5条FAQ answer改写以消除与正文的逐字重合，同时更新数字；sources[0]访问方式与日期更新为'2026-08-31直连curl 200'",
    "public/images/cna-certification-path.svg时间线图表内嵌薪资数字$39,530→$42,260",
    "npm test 65/65全绿；npm run build 68页无报错；check_prose_patterns.py四项机械检查退出码0",
    "python3 seo_drift.py baseline/compare：修改前存档，部署后对比仅报1条WARNING（Dataset schema的temporalCoverage/name变化，为预期内编辑），无CRITICAL",
    "commit c1c46da（内容/数据/图表主改动）+3589df3（indexnow日志，blob级暂存单独提交避免覆盖同时段radiation-therapist-salary发布任务的未提交改动）+12f012d（内容发布日志.md，同样blob级暂存），全部push成功，Cloudflare Pages自动部署（本仓库无deploy hook条目），绕缓存轮询3次（间隔20秒）后确认200且新数字命中真实新内容",
    "node tools/submit-indexnow.mjs /how-to-become-a-cna/ 提交，Bing 200 / Yandex 200",
    "内容发布日志.md已追加本次审计记录（标注为content-quality-audit审计更新非新发布）；内容通用教训库.md L-0830-2条目已追加复发记录，说明该教训不能只检查榜单类文章，普通跨文章比较句同样适用"
  ],
  "seo_score": "技术项全部通过，title/description z-score均在正常范围，无变化",
  "geo_score": "约86/99（按11维度逐项核算），高于80分及格线，数据刷新未改变结构，评分维持不变",
  "escalation": null
}
```
