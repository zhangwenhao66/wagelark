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
