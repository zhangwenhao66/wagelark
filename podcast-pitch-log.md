# WageLark 播客嘉宾 pitch 日志

`trafficsite-podcast-pitch` 定时任务的执行记录。

---

## 2026-08-04（首次运行）

### 站内角度

读了 `src/data/guides.ts`（693 行，10 个 BLS 数据来源的职业页面）及 `tools/bls-data/` 数据管线（含 `wages-source.test.mjs` 人工核对官网的独立单测）。角度：入行学历高低不能预测职业内部薪资分布的宽窄——flight attendant（高中学历）价差超 $10 万（工会资历制驱动）、actuary（学士学历+多年考证）价差更宽（约 $13.1 万）、physical therapist（博士学历）价差反而窄（约 $5.8 万）；另有同职位不同雇主类型薪资差异（dental hygienist 私人诊所>政府、radiology tech 联邦雇主最高）。全部为真实数据发现，不隐含个性化职业/薪资建议（本站 YMYL-adjacent 纪律）。

### 检查过的播客（共 9 档）

| 播客 | 结论 |
|---|---|
| HR Data Labs（David Turetsky） | 活跃（RSS 确认每周更新，最近一期 2026-07-30），明确邀请外部嘉宾（如 Paul Reiman/Novo Insights），联系邮箱 david.turetsky@hrdatalabs.com | **通过，撰写并发送** |
| HR Empowerment（Wendy Sellers, Aurora Training Advantage） | 活跃（约每周，Ep.515 2026-06-01），近期请过独立薪酬数据工具创始人 Cary Sparrow/WageScape，与本站定位类似 | **通过，撰写并发送** |
| Cornering the Job Market | （site-agent 研究阶段跳过，理由见 outreach-drafts.md 附注：未在活跃度/嘉宾定位双重门槛间胜出） | **跳过** |
| Comp and Coffee（Payscale） | 供应商自办，嘉宾多为 Payscale 自身客户/员工 | **跳过——供应商自办冲突** |
| Data Neighbor | 未能确认稳定近 3 个月更新节奏 | **跳过——活跃度不确定** |
| Find Your Dream Job | 求职辅导类节目，嘉宾门槛/受众与 BLS 数据站不匹配 | **跳过——定位不匹配** |
| People Data Insights | 嘉宾定位与独立薪资数据站运营者不契合 | **跳过——定位不匹配** |
| HigherEdJobs | 高教招聘细分领域，受众/主题与本站不符 | **跳过——定位不匹配** |
| The Labor Market Podcast（Fexingo） | 未通过活跃度或嘉宾定位门槛 | **跳过** |

### 独立复核 + 发送

两份 pitch 均过 humanizer，随后由全新独立复核 agent 逐项核实（14 天查重、数据点对照线上页面、播客活跃度/嘉宾定位、AI 味、YMYL 个性化建议规避），均判定「can send」。核实与发送详情见 `outreach-drafts.md`。

**发送记录**：
- HR Data Labs（david.turetsky@hrdatalabs.com）：Message ID `19fc9402507f7480`
- HR Empowerment（wendy@thehrlady.com）：Message ID `19fc94029b79df57`

两封均未加 `--from wagelark`（该站 Gmail Send-As 别名尚未配置，contact@wagelark.com 目前只能收信不能发信），走的是主账号 0009888@gmail.com。

### 流程说明

负责本站的 site-agent 完成研究、撰写、humanizer、发起两个独立复核 agent 后提前结束了自己的任务轮次——两份复核结果均已判定「can send」，但没有被 site-agent 取回去执行发送和写日志。这不是复核卡死（复核本身在合理时间内正常完成），是执行 agent 过早认为任务已完成。发现后由主协调会话直接核实两份复核结论、完成实际发送、补写本条记录；复核标准和判定过程本身未受影响。本次运行里 Hollowvane、WarCrumbs、UmberLore 三站也出现同一模式（WarCrumbs 收到提醒后自行恢复完成，其余由主协调会话代为完成）。

### 本次运行小结

查 9 档，2 档通过双重门槛，2 封 pitch 撰写+humanizer+独立复核通过+已发送，0 封因问题/卡死留待处理。

---

## 2026-08-16（第二次运行）

### 站内角度（与8/4两条角度不重叠）

8/4首次运行时站内约10个职业页面，本次运行时`src/data/guides.ts`已扩展到1919行，新增了electrician-salary、firefighter-salary、plumbing-apprenticeship等技术工种页面。8/4两条角度分别是"入行学历高低不能预测职业内部薪资分布宽窄"（同职业内价差）和"同职位不同雇主类型薪资差异"，本次采用不同维度：**跨职业比较——不要求大专以上学历的技术工种反而比要求正式大专学历/认证的医疗辅助岗位挣得多**。electrician median $62,350（仅需高中文凭+多年学徒制，无需大专学历）、firefighter median $59,530（仅需高中文凭+消防学院培训），均高于CNA median $39,530（联邦75小时培训下限）和medical assistant median $44,200（通常需大专证书）。四个数字逐一核对`guides.ts`源文件（electrician-salary约1400-1430行、firefighter-salary约1472-1502行、how-to-become-a-cna约1259-1293行、medical-assistant-salary约1124-1157行），electrician-salary和firefighter-salary页面正文本身已做过同类跨职业对比，本次pitch角度是站内已有内容的真实延伸，非临时编造。全部为真实BLS数据发现，不含个性化职业/薪资建议（YMYL纪律）。

### 检查过的播客（本次新查，不重复8/4已排除的9档）

| 播客 | 结论 |
|---|---|
| Workology Podcast（Jessica Miller-Merrell） | 独立HR分析师/顾问主播（非薪酬软件供应商），350+期since 2014，episode 450于2026-08-13发布（发信前3天）、录制于WorldatWork Total Rewards Conference，嘉宾为Equinix Head of Global Benefits，确认持续邀请外部嘉宾讨论total rewards/comp话题，联系邮箱jessica@workology.com为创始人本人邮箱 | **通过，撰写并发送** |
| The Trades Podcast（Jeff Mudd/Danny Torres，thetradespodcast.com） | 活跃（episode #200于2026-05-07），但guest定位为"business owners, tradespeople, educators, trade organization reps"而非数据分析类嘉宾，且联系渠道仅有表单（CleanTalk反垃圾+grecaptcha，无公开邮箱），无法核实是否真能触达 | **跳过——嘉宾定位存疑+无可靠联系渠道** |
| Comp Chat, a Compensation Management Series（Bob Laurenzo） | 主播为Decusoft（薪酬管理软件公司）CEO，播客即公司自办节目 | **跳过——供应商自办冲突（同8/4 Comp and Coffee/Payscale同类问题）** |
| Transform Your Workplace（Brandon Laws，Xenium HR赞助） | 550+期活跃，但由PEO/HR外包公司Xenium HR赞助制作，主题偏broad workplace culture/leadership而非comp/labor market数据，未找到明确邀请独立数据站运营者的先例 | **跳过——供应商赞助+主题定位不够贴合** |
| JobGuppy（Chris Hodges） | 实测最新一期为2025年3月，超过17个月未更新 | **跳过——活跃度不达标** |
| The Labor Market Podcast with Fexingo | 本次WebSearch再次出现，与8/4已排除条目为同一档 | **跳过（沿用8/4已排除结论，非重复调研）** |

### 独立复核 + 发送

独立复核agent（run_in_background，无本会话上下文，仅给邮件正文+复核清单）用时约111秒完成，14天查重（`to:jessica@workology.com`与`to:workology.com`均返回空）、四个数据点逐一对照`guides.ts`源文件核实一致、YMYL检查通过、独立WebSearch复核episode 450真实性与主播身份（确认无供应商冲突）、判定非模板套用、humanizer扫描零命中，判定「can send」。复核过程中协调会话曾用bash脚本主动轮询复核agent进度（检查jsonl transcript增长情况），避免"起了独立agent就默认它会自己收尾"的失败模式；本次复核agent本身运行顺畅、未卡死，轮询脚本在收到完成通知后已停止。完整复核记录见`outreach-drafts.md` 2026-08-16 Draft 3条目。

**发送记录**：2026-08-16 由 `gmail_send.py send --from wagelark` 发出，收件人 jessica@workology.com，From头确认为`WageLark <contact@wagelark.com>`（wagelark别名2026-08-04已验证可用，本次实测确认正常工作，未再静默回退主账号），Message ID `1a0097e61055d549`。

### 本次运行小结

新查6档（不含8/4已排除的9档），1档通过双重门槛，1封pitch撰写+humanizer+avoid-ai-writing双重检查+独立复核通过+已发送，0封因问题/卡死留待处理。无需Owen人工处理事项（发信前已重新读取`独立站/待Owen处理事项.md`，未发现与本站相关的待处理阻塞项）。
