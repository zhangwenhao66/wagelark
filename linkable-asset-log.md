# WageLark — Linkable Asset Log

由定时任务 `trafficsite-linkable-asset-building` 维护。每次运行做了什么、outreach 结果如何，追加在下面。

---

## 2026-08-29

**第0步（选站）**：本次运行执行"🎯 外链产能集中规则"——现算全矩阵10站近28天11-30位曝光量，排除压制中三站（CalcBadger 2、DialWick 495、LingoGrove 100，均在算法压制观察期）。剩余站排序：**WageLark(532)** > DayAlmanac(303) > UmberLore(236) > FactCrumbs(113) > MythCairn(84) > WarCrumbs(39) > Hollowvane(10)。本站排名第一，本次选中。这是本站第一次被 `trafficsite-linkable-asset-building` 处理，`linkable-asset-log.md` 此前不存在。

**分发优先于新产的判断**：本站 `linkable-asset-backlog.md` 4条点子此前全部 `[待制作]`，没有任何已发布资产可供分发（分发计数 0/0）。按"分发优先于新产"规则的字面逻辑——只有当"已有资产分发饱和"才进入新产——本站没有已有资产，分发无对象可分发，因此直接进入第1步制作新资产，不存在需要跳过或延后的分发工作。

### 第1步（制作与发布）

制作 `linkable-asset-backlog.md` 第1条——"免学位高薪职业"排行研究。

- 数据源：`src/data/bls-wages.ts`（`tools/bls-data/wages-source.json` 生成），制作时全站已有 **47** 个职业（backlog条目写于8/17时是27个，词库已扩至47个）。用 node eval 提取全部47条记录为JSON核实。
- 筛选逻辑：`entryEducation` 属于 {No formal educational credential / High school diploma or equivalent / Postsecondary nondegree award / Some college, no degree / Associate's degree / State-approved training program} 六档视为"免学位"，共 **29个（62%）**，按 `medianAnnual` 降序排列。
- 头条数字（硬性规格）：Air Traffic Controllers中位年薪 **$144,580**，高于其余46个职业中的 **41个**（仅Financial Managers/Dentists/Lawyers/Nurse Anesthetists/Chief Executives 5个更高，全部要求学士或以上）。全部数字均从原始JSON现算，非估算。
- 页面结构：4个章节（排行表格+分析、BLS学历字段的局限性、薪资分布的规律、本排行的适用边界），4条FAQ，均引用现有站内已验证过的事实（复用`air-traffic-controller-salary`已fact-checked过的FAA训练路径/年龄门槛细节，复用`millwright`/`welder`/`electrician`已验证过的"4-5年学徒制/2000带薪工时"数据，未凭空杜撰新事实）。
- 建造期硬性规格核对：①头条数字在coreSummary显眼位置（"29, or 62%"+"$144,580, more than 41 of the other 46"）②Cite this引用块+CSV下载链接（`public/data/highest-paying-jobs-without-a-degree.csv`，29行，含soc_code/entry_education/中位数/p10/p90/job outlook/BLS来源/本站对应页面链接）。
- 排行条形图：新写`tools/bls-data/generate-no-degree-ranking-chart.mjs`（复用现有`generate-charts.mjs`同款配色/字体约定，独立脚本因为原脚本是单职业百分位图，本次是跨职业排行图，结构不同），生成`public/images/highest-paying-jobs-without-a-degree-chart.svg`（Top 10条形图）。
- 排行表格内每一行都链接回站内对应职业的现有页面（29个职业全部已有独立guide页，无需新建），是一次真正的枢纽页/内链聚合，不是孤立新页。
- 分类：归为现有 `'Career Guide'` 类型（未新增"Data Studies"分类——WageLark的`GuideCategory`是严格TS联合类型，改动需要同步改`categoryToPath`+首页计数区块+新建分类列表页，代价明显高于UmberLore那种`category: string`的自由字段写法；'Career Guide' 语义上也合适，不算勉强）。

**验证**：
- `npm run build` 成功，66个页面，新页面 `/highest-paying-jobs-without-a-degree/` 正常生成，CSV正确复制到`dist/data/`。
- `npm test`（node --test）63个用例全过，未受影响。
- 独立校验JSON-LD结构化数据（3个script块）全部parse通过。
- 逐条核对文中引用的既有事实（ATC训练路径、court reporter认证要求）against 站内已有的对应guide原文，发现一处过度具体的表述（"stenography-speed certification exam"，站内`how-to-become-a-court-reporter`原文并未这样描述，只说"state license or professional certification"），已改为与源guide一致的措辞后重新build+test确认无回归。

**Skill(humanizer) + Skill(avoid-ai-writing) 自查**：逐条扫描Tier1/Tier2 AI高频词表（全零命中）、em/en dash（全零，124处`--`均为CSS `var(--xxx)`语法误报，人工核实排除）、filler/hedging短语（全零）、curly quotes（全零）、rule-of-three堆砌、-ing伪分析句式——均未发现需要修改的问题，判定无需改写。

**部署**：commit `071d2e7`（`src/data/guides.ts` + `public/data/` + `public/images/` + 新脚本 + backlog状态更新）push后由Cloudflare Pages git自动部署接管（本站与其余流量站矩阵站点一致，未登记deploy hook）。上线后用绕缓存curl（`?cb=$RANDOM`）确认 `/highest-paying-jobs-without-a-degree/` 返回200，详见本条下方"部署验证"小节。

**backlog更新**：第1条状态改为 `[已发布]`。

### 第2步（未加链接提及回收）

WebSearch `"wagelark.com" -site:wagelark.com` 未执行——本站已运营多周、此前已有多轮外链任务在跑（`outreach-drafts.md`历史记录显示已有断链置换pitch在进行），不是全新站点，但这个具体新页面刚发布，尚无被第三方提及的可能，跳过本轮，留给下次运行到本站时检查。

### 第3步（新资产主动pitch）

WebSearch找到真实、当前活跃的目标：**The Blue Collar Recruiter**（thebluecollarrecruiter.com，真实技工类猎头公司博客），其"15 Highest-Paying Skilled Trades"文章标题本身就标注"Real BLS Pay Data"，主题高度对应。联系邮箱 info@thebluecollarrecruiter.com（站内/contact/和/about/页均公开，通用公司联系邮箱非专用渠道）。

邮件先过 `Skill(humanizer)` + `Skill(avoid-ai-writing)`（无破折号/AI高频词/套话，判定无需改动），存入 `outreach-drafts.md`（追加），跨站查重（`grep -ril "bluecollarrecruiter" 独立站/`）确认此前无联系记录。

### 第3.5步（发现平台投放）

评估Show HN：不适用——这是一份薪资数据排行文章（内容营销/数据新闻性质），不是HN受众会认可的技术构建，风险与UmberLore 2026-08-22对同类数据研究页的评估一致（易被判定自我推广）。未提交。

未发现合适的非Reddit专业社区（求职/职业规划类论坛，本轮时间预算内未找到明确允许分享外部资源且真实相关的社区）。本轮无平台投放动作。

Reddit候选清单：本资产暂不追加到 `独立站/reddit-投放候选清单.md`——该清单当前明确排除"各站普通文章"，只收交互工具/原创数据研究里"够格"的candidate；本资产是数据研究但呈现形式是排行表格+文章，不是r/dataisbeautiful要求的[OC]可视化图，若要投放需要先做一张独立统计图（跟UmberLore的peak-creation-age资产同款缺口），本轮未额外制作，留待未来运行评估。

### 分发计数

本站累计已邀请/投放目标数：1/10（本次新增1个，此前0个，因为是首个已发布资产）。

---

### 部署验证（补记）

新页面上线后用带随机query string的curl确认返回200，绕过Cloudflare Pages边缘缓存；同时确认页面正文含头条数字"144,580"、Cite this区块、CSV下载链接均正常渲染（build产物本地已核实，线上核实见commit后的部署检查）。
