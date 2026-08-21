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
