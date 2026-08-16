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
