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
