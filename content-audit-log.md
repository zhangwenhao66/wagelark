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
