# WageLark 断链置换外链日志

`trafficsite-broken-link-building` 定时任务的执行记录。

---

## 2026-08-04（首次运行）

### 检查过的资源页

| 资源页 | 外链数 | 真实失效 |
|---|---|---|
| https://libguides.phsc.edu/c.php?g=252147&p=1674753 （Pasco-Hernando State College, Nursing Career Resources） | 27 | **3** |
| https://angelo.libguides.com/nursing/career （Angelo State University, Nursing Career） | 35 | **1** |
| https://researchguides.uic.edu/c.php?g=252186&p=1684837 （UIC, Nursing Career Resources） | 90 | **3** |
| https://library.nwosu.edu/nursing/associations （Northwestern Oklahoma State University, Nursing Associations） | 60 | **1** |
| https://susla.libguides.com/alliedhealth/mlt （Southern University, Medical Laboratory Technician） | 12 | 0 |
| https://libguides.midlandstech.edu/radtech （Midlands Technical College, Radiologic Technology） | 12 | 0 |
| https://goldenwestcollege.libguides.com/counseling104/careerresearch （Golden West College, Career Research） | 20 | 0 |
| https://redwoods.libguides.com/c.php?g=1000313&p=7242562 （College of the Redwoods, Career Exploration Websites） | 13 | 1 |
| https://sjcd.libguides.com/c.php?g=122071&p=796584 （San Jacinto College, Career Exploration Websites） | 28 | 2 |
| https://www.collegesuccess1.com/links9career.htm （College Success, Career Links） | 41 | **2 + 1 域名出售** |

合计核查 338 条外链，本轮全矩阵核查量最大的站。

### 发现的真实失效链接（逐条判定能否置换）

**机构自身页面 / 图书馆基础设施，非内容资源，不可置换：**
- `phsc.smartcatalogiq.com/...College-Calendar` 与 `...Catalog-and-Student-Handbook`（学校课程目录）
- `library.uic.edu/services/corporate/`（UIC 图书馆企业会员页）
- `i-share.carli.illinois.edu/vf-uic/`（图书馆书目检索系统）
- `sanjac.edu/student-services/.../libraries`（学校图书馆页）
- `guides.lib.purdue.edu/content.php?pid=258728`（普渡的"评估信息源"指南）
- `humanesources.com/capp/login.php?url=sjcd`（第三方测评系统登录页）

**内容型失效链接，但主题不对应：**
- `education-portal.com/requirements_to_be_a_nurse.html` → 404（现为 Study.com）。内容是**护士入行要求**。WageLark 目前 12 篇里有 how-to-become-an-ultrasound-tech / how-to-become-a-phlebotomist 两篇入行路径文，但**没有护士相关内容**，职业不对应
- `nsna.org/about-nsna.html` 与 `nsna.org/career-center.html` → 404。全国护理学生协会的组织介绍页与招聘中心，是**组织页/招聘平台**，不是薪资参考内容
- `careerawareness.mayoclinic.org/hubcap/nursing/` → 404。梅奥诊所的护理职业认知项目，同样是护士主题 + 机构项目页
- `affordablecollegesonline.org/.../student-employment/` → 404。内容是**大学生找兼职**，不是职业薪资数据
- `bestcolleges.com/resources/women-in-stem/` → 脚本标疑似 soft-404，人工复核确认是正常页面，**不是失效链接**
- `jobnexus.com/cv-templates` → 跳转到 Porkbun 域名出售页（`The domain jobnexus.com is for sale`），是真实的域名失效。但内容是**简历模板**，WageLark 不做简历工具，不对应

### 处理结果

**本站本次跳过，未发出任何邮件。**

原因：10 个资源页共查出 13 条真实失效链接（本轮全矩阵最多），但没有一条能跟 WageLark 已发布内容形成真实主题对应。最接近的一批全部集中在**护理**职业上（education-portal 护士入行要求、NSNA、梅奥护理项目），而 WageLark 首日 10 篇刻意选的是牙科卫生士、精算师、药剂师、理疗师、PA、律师助理、超声技师、静脉采血员、空乘、放射技师——**唯独没有护士**。护理是薪资类内容竞争最激烈的赛道，首批避开是合理的选品决策，但代价就是护理向的资源页断链一条都接不住。

按硬性原则 2（替换内容必须真实主题对应，不能硬凑）如实放弃。

### 排除的误报

`403`（大量，机构 WAF）、`0`、`429`、`400`、`502` 一律不计为失效，只认干净 404 与"200 但落地是域名出售/占位页"。

### 遗留待办

1. **护理是本站在断链渠道上的最大缺口**：资源页生态里护理职业页的密度远高于其他医疗职业。如果之后决定补护理薪资内容（`registered-nurse-salary` / `how-to-become-a-nurse`），本轮记录的 4 条护理向断链可以直接回头复用（届时需重新核实是否仍失效）
2. 下次换方向：找**具体职业**的爱好者/从业者社区资源页（如放射技师、静脉采血员的行业论坛"useful links"），而不是大学图书馆的综合职业指南——后者收的多是 BLS OOH、O*NET、CareerOneStop 这类政府站，几乎不会失效

---

## 2026-08-09（第二次运行，按上次遗留方向调整）

### 方向调整

按上次遗留建议，本轮改找**具体职业的从业者/学生社区资源页**，而非大学图书馆综合职业指南。覆盖的职业方向：放射技师(radiologic technologist)、静脉采血员(phlebotomist)、外科技师(surgical technologist)、律师助理(paralegal)、超声技师(diagnostic medical sonographer)、放射技师州协会、CRNA、牙科卫生士、精算师(actuary)、空乘工会。

### 检查过的资源页

| 资源页 | 类型 | 外链数(排除内部/社媒) | 真实失效 |
|---|---|---|---|
| https://www.phlebotomy.com/phlebotomy-links.html （Center for Phlebotomy Education, Phlebotomy Links） | 行业教育机构的链接页 | 24 | **3**（均无主题对应，见下） |
| https://sciences.ucf.edu/statistics/actuary-club/links/ （UCF Actuarial Science Club, Resources） | 大学学生社团资源页 | 19 | **1**（有对应） |
| http://5y.twu.org/resources/ （TWU FSI Flight Attendants, Resources） | 工会地方分会资源页 | 3（全部为工会内部链接） | 0 |
| https://member.msrt-ma.org/about/resources/useful-links/ （Massachusetts Society of Radiologic Technologists, Useful Links） | 州级行业协会 | 无法核查 | — 站点被 Wordfence 拦截返回 503，未能读取页面内容 |

### 发现的真实失效链接（逐条判定）

**phlebotomy.com/phlebotomy-links.html（3条真实失效，均无主题对应）：**
- `empoweredmanager.phlebotomy.com` — DNS 无 A/NS 记录（`dig` 确认，非仅连接超时）。经 WebSearch 核实原内容是 Center for Phlebotomy Education 自己的管理者培训博客（"The Empowered Healthcare Manager"），主题是医疗团队管理技巧，非薪资/职业数据
- `www.safeincommon.org` — DNS 无 A/NS 记录。核实原内容是 Safe in Common（针剌伤害预防非营利组织）的机构介绍，主题是职业安全倡导，非薪资数据
- `www.thejobfool.com` — DNS 无 A/NS 记录。核实原内容是一个通用招聘信息聚合站（TheJobFool.com，2006年成立），非薪资参考内容
- 另有 `www.ahc.lockton-ins.com` 返回连接失败，但 `dig` 显示该域名有真实 A 记录（指向 Oracle Cloud WAF），判定为本沙箱访问受阻的假阳性，非真实失效，未计入

**UCF Actuarial Science Club（1条真实失效，有真实主题对应）：**
- `riskisopportunity.net`（页面标注"SOA site for College students"）— DNS 无 A/NS 记录（`dig` 确认）。核实原内容是精算师职业认知宣传站（"A Career In Risk"/"Actuarial Organizations"/"Life As An Actuary"，最后更新约2018年）。WageLark 已发布 `actuary-salary` 和 `what-does-an-actuary-do` 两篇文章，`what-does-an-actuary-do` 覆盖职业介绍/五大专精方向/考证路径，与失效链接主题真实对应
- 同一页面另检查了 `riskisopportunity.net` 之外的全部12条外部链接（coachingactuaries.com/actuarial-lookup.com/actuarialjokes.com/anea-asna.ca/theinfiniteactuary.com 等均正常200；actuaries.org/asppa.org/bls.gov/contingencies.org/actuary.org 均403或000但`dig`确认域名有效，判定为WAF/沙箱限制假阳性，非真实失效；jobinterviewquestions.org 302跳转至livecareer.com属正常重定向非失效；vpthemes.com/firmness是WordPress主题版权链接非真实资源链接，不纳入判定）

**TWU FSI Flight Attendants resources 页面：** 仅3条链接且全部指向工会内部页面（twu556.org/twuvx.org/docusign表单），无外部资源链接可核查，跳过

**MSRT Useful Links 页面：** 两次尝试（不同 User-Agent）均被 Wordfence 拦截返回503，无法读取页面内容，未能核查

### 排除的误报

`403`、`0`/连接失败、`429`、`400`、`502` 一律不直接计为失效——本轮新增做法：对 curl 返回 000/403 的域名额外用 `dig` 交叉验证 A/NS 记录，凡是 `dig` 能查到有效记录的（如 ahc.lockton-ins.com、actuaries.org、asppa.org、bls.gov、contingencies.org），一律判定为沙箱访问受阻的假阳性，不计入失效；只有 `dig` A/NS 记录均为空的才计为真实失效（这是比上轮更严格的判定标准，上轮仅用 curl 单一信号）。

### 处理结果

**形成 1 份待发送草稿**，已追加进 `outreach-drafts.md`，标注 PENDING INDEPENDENT REVIEW：

- 收件人：ucf.asc@gmail.com（UCF Actuarial Science Club 官方联系邮箱）
- 主题：Broken link on your resources page (riskisopportunity.net)
- 失效链接：http://riskisopportunity.net/（页面：https://sciences.ucf.edu/statistics/actuary-club/links/）
- 替换内容：https://wagelark.com/what-does-an-actuary-do/
- 查重：全账号 Gmail 历史 + 本站/其余三站外链日志均无与该邮箱或该 URL 的既往联系记录
- 已过 humanizer + avoid-ai-writing 双重检查，无需改动

phlebotomy.com 页面查出的3条失效链接因主题不对应（管理培训博客/职业安全非营利组织/通用招聘站）未形成 pitch，按硬性原则"不能硬凑"如实放弃。

### 遗留待办

1. MSRT Useful Links 页面被 Wordfence 拦截，下次可尝试其他放射技师州协会（如 Georgia SRT、Michigan SRT）的类似页面
2. 本轮验证了"上次遗留方向"确实比大学图书馆综合指南更容易挖到真实失效链接（4个资源页里3个查出真实失效，密度高于上轮10个图书馆页面里6个查出失效但0个主题对应），但样本仍小，可继续沿这个方向找其余职业（外科技师、律师助理、超声技师、CRNA、牙科卫生士、药剂师）的从业者社区资源页
3. `dig` 交叉验证 curl 000/403 结果这个方法本轮证明有效（避免把 ahc.lockton-ins.com/actuaries.org 等假阳性误判为失效），建议后续断链核查都加上这一步

## 2026-08-16（第三次运行）

### 1.5 竞品外链缺口分析

竞品：careerexplorer.com（10,903个引荐域名）、salary.com（31,732个引荐域名），各抽样约100条外链。筛选出2个"资源列表/编辑引用"类可赢候选：NALA（National Association of Legal Assistants）Careers页面（链接salary.com的paralegal薪资数据）、alliedhealthprograms.org加州超声技师页面（链接careerexplorer.com加州薪资范围）。两条链接本身均未失效，按"引用竞品数据的文章"类别处理，不用断链话术。

### 断链方向（延续上轮"从业者社区资源页"建议）

沿上轮"MSRT被拦截后找其他州放射技师协会"的遗留方向，找到 CSRT（California Society of Radiologic Technologists）的 Affiliate Links 页面（44条外部链接，收录全美各州放射技师协会）。curl+dig交叉验证发现4条真实失效（DNS无A/NS记录）：lsrt.org（路易斯安那）、msrtonline.org（马里兰）、tsrtorg.tripod.com（德州，Tripod免费空间已关停，页面上tsrt.org新域名条目仍存活）、wvsrt.org（西弗吉尼亚）。排除4个假阳性（csrt.net/ksrtinc.org/arrt.org/nmsrt.org，dig确认域名均有效）。

### 处理结果

**形成3份草稿**，均过humanizer+avoid-ai-writing检查：
- 草稿A：CSRT断链 → info@csrt.org
- 草稿B：NALA资源补充（竞品缺口） → nalanet@nala.org
- 草稿C：alliedhealthprograms.org资源补充（竞品缺口） → ten27services@gmail.com

**流程异常记录**：负责本站的子agent在spawn三个独立复核agent后自身线程提前结束（未等复核完成就以"completed"状态返回，未执行任何发送），三份草稿一度滞留在outreach-drafts.md为PENDING INDEPENDENT REVIEW。三个独立复核agent随后各自独立完成，全部返回"可以发送"（逐项核实dedup/联系方式真实性/目标页面内容/guides.ts数据一致性/语气/去AI味，详见各自复核报告）。上层编排会话按全局CLAUDE.md"独立agent卡死"看门狗协议接手，确认三份复核结果均为"可以发送"后代为执行发送：

- 草稿A → info@csrt.org，`gmail_send.py send --from wagelark`，Message ID `1a009424327df8bc`
- 草稿B → nalanet@nala.org，`gmail_send.py send --from wagelark`，Message ID `1a009424741c3978`
- 草稿C → ten27services@gmail.com，`gmail_send.py send --from wagelark`，Message ID `1a009424ac7d118e`

三封均已发出，无留待处理草稿。

### 遗留待办

1. 竞品缺口分析这条线本轮只筛出2个候选，样本还小，下轮可以扩大抽样条数或换其他职业类竞品（如teacher.org、nursingprocess.org类）交叉验证候选密度
2. CSRT断链命中后，"从业者州级协会Affiliate/Useful Links页面"这个模式已连续两轮验证有效（UCF精算/CSRT放射技师），下轮可以继续沿其他职业的州级/全国级从业协会资源页找
3. 本轮流程异常（子agent未等复核完成即返回）建议后续同类编排任务加强对子agent自身是否真正执行到"发送"这一步的确认，不能只看子agent汇报文字

## 2026-08-21（第四次运行）

### 第一部分：核实10天前旧pitch

按规则挑10-11之前发出且未验证的最早一条：2026-08-09 UCF Actuarial Science Club断链pitch（收件人ucf.asc@gmail.com，失效链接riskisopportunity.net，替换建议wagelark.com/what-does-an-actuary-do/）。

- curl访问 https://sciences.ucf.edu/statistics/actuary-club/links/：页面仍是原样，`riskisopportunity.net` 死链依旧挂在页面上，未替换为任何wagelark链接（无`wagelark`字样）。
- 额外跑 `dataforseo_query.py backlinks wagelark.com`：外链明细中未找到 sciences.ucf.edu 对应行。
- 判定：`not_replaced`。
- `gmail_send.py list --query "from:ucf.asc@gmail.com"` 返回空，对方从未回复（拒绝也算回复，此处确认零回复）。发出日期2026-08-09，距今12天，落在"10-14天未回复可跟进一次"窗口（2026-08-07至2026-08-11之间发出）内，且目标资源页（UCF统计与数据科学系学生社团维护的资源页）仍具备真实权威度（大学官方院系页面）。
- 已发送简短跟进邮件（2句+提及原邮件，非全文重发），收件人ucf.asc@gmail.com，Message ID `1a024c6ad9dc416a`。标记 `followed_up_once`。跟进邮件同样过了humanizer/avoid-ai-writing自查（无独立复核agent，因规则5本身未要求对1-2句跟进邮件走完整复核流程，仅要求过前两道语言检查）。

**verified_not_replaced_followed_up_once**（原记录：2026-08-09 UCF pitch，见 outreach-drafts.md）

### 第二部分：新断链机会

**1.5 竞品外链缺口分析**：`dataforseo_query.py backlinks careerexplorer.com` 和 `backlinks salary.com` 各抽样50条。多数是一次性PR/博客引用或商业客户案例（sokanu.com遗留链接、field engineer招聘站、CE营销代理等），不符合"资源列表/编辑引用"可赢类别。少数候选（career.umn.edu、www.cmaa.org、nptiflorida.edu、onlineprograms.sacredheart.edu等）因无法定位到抽样数据里给出的具体源页面URL（backlinks数据只给目标URL和引荐域名，不给引荐页面路径），本轮未能验证转化为pitch，留作下轮改进方向：需要额外一步反查引荐域名的具体页面。

**断链方向**：WebSearch围绕本站新覆盖的职业（电工、HVAC、焊工、消防员、图书馆员、社工、心理学家、会计师、卡车司机、水管工、调酒师）找资源/链接列表页，收集32个候选URL（含1.5未落地的部分职业方向），跑 `broken_link_scan.py` 批量扫描。

扫描发现大量DEAD标记，逐条用dig多解析器（本机+8.8.8.8+1.1.1.1）交叉验证后，**多数是假阳性**（本机DNS环境异常，非真实失效）：`code-electrical.com`、`sswlhc.org`、`ssa.gov`、`mentalhealth.org`、`electrical.nebraska.gov`、`idealist.org`、`www.alea.gov`（CDL手册PDF）均确认域名/页面实际存活，排除。`www.agesocialwork.org` 确认已过期并被域名停放服务（bodis.com）接管，但主题（老年学社工专业协会）与WageLark社工页面（通用职业介绍，非老年学细分）不对应，未采用。UNLV社工资源页的执照考试练习题链接（socialworktestpass.com、my.ewebtest.com）虽真实失效，但主题是考试练习题而非薪资数据，判定不够贴题，未采用。

真实确认失效+主题对应+目标页有权威度的机会，共2条：

**机会A：HCC（Houston Community College）图书馆HVAC职业资源页**
- 目标页：https://library.hccs.edu/guides/hvac/careers
- 死链："HCC's Career Coach"（hccs.emsicareercoach.com），页面描述"Find descriptions and employment outlook here"。3个DNS解析器（本机/8.8.8.8/1.1.1.1）均返回空记录，确认真实失效。
- 替换：wagelark.com/hvac-certification/（EPA 608认证+BLS薪资数据，与死链描述直接对应，非硬凑）
- 联系邮箱：library.support@hccs.edu（页面自带"Report a problem"链接）

**机会B：Austin Community College图书馆会计职业资源页**
- 目标页：https://researchguides.austincc.edu/accounting/careers
- 死链2条（同域名）："AICPA Career Center"（aicpa.org/career/jobboards.html）+"AICPA"机构主页链接（aicpa.org/content/aicpa）。curl -L均经aicpa-cima.com（AICPA与CIMA合并后域名）最终404，确认真实失效。
- 替换：wagelark.com/how-to-become-an-accountant/（较软匹配，AICPA链接含求职板块+青年CPA社群，WageLark页面没有，邮件如实声明"not a direct swap...just a useful addition"）
- 联系邮箱：ls-instruction@austincc.edu（页面自带"Report a problem"链接）

两份均过humanizer+avoid-ai-writing检查，存入outreach-drafts.md后各自spawn独立复核agent（无本次会话上下文），均返回**VERDICT: SEND**（六项核查逐条独立复核：跨站14天查重全矩阵grep均为空、死链独立curl+dig复验、主题对应诚实度评估、guides.ts数字逐字核对、语气检查零破折号零AI高频词、站点真实性200确认）。

- 机会A → library.support@hccs.edu，Message ID `1a024dfa33b7c750`
- 机会B → ls-instruction@austincc.edu，Message ID `1a024dfb43b56a68`

两封均已发出，无留待处理草稿。

### 遗留待办

1. 1.5竞品缺口分析这次卡在"backlinks数据只给目标URL不给引荐页面路径"——下轮需要先用WebSearch/curl反查引荐域名具体页面再判断是否资源列表类型，不能只看域名列表
2. 本轮dig三解析器交叉验证法（本机+8.8.8.8+1.1.1.1）新增了"本机解析器单独失败但8.8.8.8/1.1.1.1能查到"的假阳性模式（ssa.gov、mentalhealth.org、electrical.nebraska.gov），比过去只查本机+一个外部解析器更严格，建议后续断链核查都升级为三解析器交叉验证
3. "域名过期后被停放服务接管"（agesocialwork.org → bodis.com）是介于"真dead"和"真alive"之间的第三种状态，本轮按"真实失效"记但因主题不对应未采用，下次遇到主题对应的停放域名案例时可以直接按失效处理（参照历史jobnexus.com先例）
