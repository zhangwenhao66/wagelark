import { BLS_WAGES } from './bls-wages';

export type GuideCategory = 'Salary Guide' | 'Career Guide' | 'How to Become';

export interface SectionImage {
	/** Path under public/, e.g. '/images/actuary-salary-chart.svg'. */
	src: string;
	/** Describes what the image shows. */
	alt: string;
	/** Attribution + license, supports markdown links. Omit for self-made diagrams. */
	credit?: string;
}

export interface GuideSection {
	heading: string;
	body: string[];
	/** Optional in-body image, rendered after this section's paragraphs. */
	image?: SectionImage;
}

export interface FaqItem {
	question: string;
	answer: string;
}

export interface Source {
	label: string;
	url: string;
}

export interface Guide {
	slug: string;
	category: GuideCategory;
	title: string;
	description: string;
	/** Original publication date. Falls back to `updated` when unset. */
	published?: string;
	updated: string;
	/** One or two sentences summarizing the core finding, surfaced above the fold for GEO/AI-search extraction. */
	coreSummary: string;
	/** SOC code key into BLS_WAGES (src/data/bls-wages.ts) -- present whenever the page cites a wage figure. */
	socCode?: string;
	sections: GuideSection[];
	faq?: FaqItem[];
	sources?: Source[];
	/** Path under public/, e.g. '/images/slug.jpg' or a self-made SVG. Falls back to /favicon.svg when unset. */
	image?: string;
	imageAlt?: string;
	imageCredit?: string;
}

/** Convenience accessor -- throws if a guide references a SOC code with no wage entry, so a typo fails the build instead of silently rendering blank data. */
export function wageDataFor(guide: Guide) {
	if (!guide.socCode) return undefined;
	const entry = BLS_WAGES[guide.socCode];
	if (!entry) throw new Error(`Guide "${guide.slug}" references unknown SOC code ${guide.socCode}`);
	return entry;
}

export const guides: Guide[] = [
	{
		slug: 'dental-hygienist-salary',
		category: 'Salary Guide',
		title: 'Dental Hygienist Salary: What BLS Data Actually Shows (2026)',
		description: 'BLS puts the median dental hygienist salary at $94,260 a year. Here is the full wage range by percentile, by industry, and what drives the gap.',
		published: '2026-08-03',
		updated: '2026-08-03',
		socCode: '29-1292',
		coreSummary: 'The median annual wage for dental hygienists was $94,260 in May 2024, according to the U.S. Bureau of Labor Statistics. The bottom 10% of earners made less than $66,470, while the top 10% made more than $120,060, a range driven mainly by geography, hours worked, and whether the role is in a private dental office versus a physician\'s office or government setting.',
		sections: [
			{
				heading: 'What dental hygienists actually earn, by percentile',
				body: [
					'The Bureau of Labor Statistics tracks dental hygienist pay through its Occupational Employment and Wage Statistics (OEWS) program, which surveys employers directly rather than relying on self-reported figures. The most recent published data, from May 2024, put median annual pay at $94,260, or $45.32 an hour, for a role that is very often scheduled hourly rather than salaried.',
					'That median sits in the middle of a fairly wide spread. The lowest-earning 10% of dental hygienists made less than $66,470 a year, while the highest-earning 10% made more than $120,060. A nearly $54,000 gap between the bottom and top deciles reflects real differences in setting, schedule, and region rather than random variation. A hygienist working four days a week in a rural practice and one working full-time in a high-cost metro area are functionally in different pay markets.',
					'One structural note worth understanding before comparing this figure to a job posting: dental hygiene is one of the more common healthcare roles paid by the hour or by the day rather than a fixed annual salary, and many hygienists work fewer than five days a week by choice. BLS converts reported hourly wages to an annual figure by assuming full-time, full-year work (2,080 hours), so a hygienist working three or four days a week should expect actual annual earnings below the published median even if their hourly rate is at or above it.',
				],
			},
			{
				heading: 'Why the setting you work in changes the number',
				body: [
					'BLS breaks out wages by industry, and the differences are large enough to matter when comparing job offers. Offices of dentists, the setting where the large majority of hygienists work, paid a median of $94,570 a year in May 2024, essentially matching the overall median. Offices of physicians paid less, at $84,720. Government employers (excluding hospitals and state/local education) paid the least of the three, at $77,940.',
					'That pattern is fairly typical across allied dental and medical roles. Private-practice settings that bill patients or insurers directly tend to pay more per hour than institutional or government settings, which usually offer more predictable schedules and benefits in exchange for lower direct pay. Neither setting is objectively better; the tradeoff is between hourly rate and schedule stability, and a private office does not automatically pay more once benefits are factored in.',
				],
			},
			{
				heading: 'What the job outlook says about future pay',
				body: [
					'BLS projects employment of dental hygienists to grow 7% from 2024 to 2034, which the agency classifies as much faster than the average for all occupations, translating to roughly 15,500 additional jobs over the decade. Faster-than-average growth in a licensed, credential-gated field tends to support wage growth over time, since employers compete for a labor pool that cannot be expanded quickly: becoming a hygienist requires completing an accredited program and passing licensing exams, not just being hired and trained on the job.',
					'None of this is a guarantee about any individual\'s future earnings, and BLS data describes national averages rather than predictions for a specific person, employer, or year. It is a description of where the market has been and where employment is headed in aggregate, which is useful context for evaluating a specific job offer but should not be read as a promise about what any one hygienist will earn.',
				],
			},
		],
		faq: [
			{
				question: 'What is the average dental hygienist salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for dental hygienists was $94,260 in May 2024 ($45.32 per hour). "Median" means half of hygienists earned more and half earned less. It is generally a more useful figure than a simple average for wage data, since a small number of very high earners can skew an average upward.',
			},
			{
				question: 'What is the highest-paying setting for a dental hygienist?',
				answer: 'Among the industry categories BLS tracks, offices of dentists paid the highest median wage at $94,570 a year in May 2024, just above offices of physicians ($84,720) and government employers ($77,940). BLS does not publish a state-by-state breakdown on this page; per-state figures require the BLS OEWS state wage tables directly.',
			},
			{
				question: 'How much do the lowest- and highest-paid dental hygienists make?',
				answer: 'BLS reports that the bottom 10% of dental hygienists earned less than $66,470 a year in May 2024, while the top 10% earned more than $120,060. The gap mostly reflects hours worked (many hygienists work part-time by choice) and regional cost-of-living differences rather than a single factor.',
			},
			{
				question: 'Is dental hygiene a growing field?',
				answer: 'Yes. BLS projects 7% employment growth for dental hygienists from 2024 to 2034, which it classifies as much faster than the average for all occupations, about 15,500 additional positions over the decade.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Dental Hygienists (accessed 2026-08-03, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/dental-hygienists.htm' },
		],
		image: '/images/dental-hygienist-salary-chart.svg',
		imageAlt: 'Bar chart showing dental hygienist annual wage by percentile: 10th percentile $66,470, median $94,260, 90th percentile $120,060, based on BLS May 2024 data.',
	},
	{
		slug: 'actuary-salary',
		category: 'Salary Guide',
		title: 'Actuary Salary: BLS Wage Data by Percentile (2026)',
		description: 'The median actuary salary is $125,770 a year per BLS. Top earners clear $206,430. Here is the full wage breakdown, by industry, and what drives it.',
		published: '2026-08-03',
		updated: '2026-08-03',
		socCode: '15-2011',
		coreSummary: 'The median annual wage for actuaries was $125,770 in May 2024, per the U.S. Bureau of Labor Statistics. The spread is unusually wide for a single occupation: the bottom 10% earned less than $75,240 while the top 10% earned more than $206,430, a gap that mostly reflects the multi-year, exam-based credentialing system that separates entry-level actuarial analysts from credentialed Fellows.',
		sections: [
			{
				heading: 'A wide range, driven by credentials rather than just experience',
				body: [
					'BLS data for May 2024 shows a median annual actuary salary of $125,770, or $60.47 an hour. What stands out in this occupation more than most is the size of the gap between the 10th and 90th percentile: $75,240 at the low end versus $206,430 at the high end, a difference of more than $131,000. That is a wider percentile spread than most professional occupations BLS tracks.',
					'The reason has less to do with geography or employer than with the profession\'s credentialing structure. Actuaries advance through a series of rigorous exams administered by the Society of Actuaries or the Casualty Actuarial Society, moving from uncredentialed trainee to Associate (ASA/ACAS) and eventually Fellow (FSA/FCAS) status. The Occupational Outlook Handbook notes it can take up to seven years to earn just the associate-level credential, and fellowship requires additional years beyond that. Pay tends to rise sharply at each credentialing milestone, which is the main driver of the wide percentile spread rather than simple years-on-the-job seniority.',
				],
			},
			{
				heading: 'Pay by industry',
				body: [
					'BLS breaks out May 2024 actuary wages by industry: management of companies and enterprises paid the highest median at $133,030, followed by finance and insurance, the industry most people associate with actuarial work, at $126,830. Government employers (excluding state and local education) paid a median of $118,910, and professional, scientific, and technical services paid $111,640.',
					'This breakdown covers wages only, not headcount by industry; BLS publishes actuarial employment counts by industry separately, in its OEWS industry tables rather than the Occupational Outlook Handbook page cited here. What this wage breakdown does show clearly is that the highest-paying category, management of companies and enterprises, is not the same as "finance and insurance," the industry most people associate with actuarial work by default.',
				],
			},
			{
				heading: 'Job outlook and what it means for future pay',
				body: [
					'BLS projects 22% employment growth for actuaries from 2024 to 2034, classified as much faster than average, adding roughly 7,300 jobs over the decade. That is one of the stronger growth projections among BLS-tracked professional occupations, driven in large part by insurers\' and financial firms\' growing use of predictive analytics and enterprise risk management, areas where actuarial training applies directly.',
					'Combined with the credential-gated pay structure described above, strong projected demand for a licensed, exam-qualified labor pool tends to support continued wage growth for actuaries who complete the certification track, though BLS data describes historical and projected aggregates rather than a guarantee for any individual.',
				],
			},
		],
		faq: [
			{
				question: 'What is the median actuary salary?',
				answer: 'The U.S. Bureau of Labor Statistics reports a median annual wage of $125,770 for actuaries in May 2024 ($60.47 per hour).',
			},
			{
				question: 'Why is the pay range for actuaries so wide?',
				answer: 'BLS data shows the bottom 10% of actuaries earned under $75,240 while the top 10% earned over $206,430 in May 2024. The main driver is the profession\'s exam-based credentialing system: pay rises substantially as actuaries pass Society of Actuaries or Casualty Actuarial Society exams and advance from uncredentialed analyst to Associate to Fellow status, a process that can take seven or more years.',
			},
			{
				question: 'What industry pays actuaries the most?',
				answer: 'Among the industry categories BLS tracks for May 2024, management of companies and enterprises paid the highest median actuary wage at $133,030, ahead of finance and insurance ($126,830), government ($118,910), and professional/scientific/technical services ($111,640).',
			},
			{
				question: 'Is actuarial science a growing field?',
				answer: 'BLS projects 22% employment growth for actuaries from 2024 to 2034, which it classifies as much faster than the average for all occupations, adding about 7,300 jobs over the decade.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Actuaries (accessed 2026-08-03, data from May 2024)', url: 'https://www.bls.gov/ooh/math/actuaries.htm' },
		],
		image: '/images/actuary-salary-chart.svg',
		imageAlt: 'Bar chart showing actuary annual wage by percentile: 10th percentile $75,240, median $125,770, 90th percentile $206,430, based on BLS May 2024 data.',
	},
	{
		slug: 'pharmacist-salary',
		category: 'Salary Guide',
		title: 'Pharmacist Salary: BLS Wage Data by Percentile (2026)',
		description: 'BLS reports a $137,480 median pharmacist salary. See the full wage range by percentile and by industry, from retail pharmacy to hospitals.',
		published: '2026-08-03',
		updated: '2026-08-03',
		socCode: '29-1051',
		coreSummary: 'The median annual wage for pharmacists was $137,480 in May 2024, according to the Bureau of Labor Statistics. The bottom 10% earned less than $86,930 and the top 10% earned more than $172,040. Pay varies meaningfully by setting: ambulatory healthcare services paid the highest industry median at $152,980, well above the $131,640 median at pharmacies and drug retailers, the setting where most pharmacists actually work.',
		sections: [
			{
				heading: 'The national numbers',
				body: [
					'BLS puts the May 2024 median pharmacist salary at $137,480 a year, or $66.10 an hour. Since pharmacists require a Doctor of Pharmacy (PharmD) degree (a professional doctorate that typically takes four years after at least two years of prerequisite coursework), this is one of the higher-paying occupations that does not require a residency or additional post-graduate licensing exam beyond the North American Pharmacist Licensure Examination (NAPLEX) and a jurisprudence exam.',
					'The percentile spread is narrower than in occupations like actuarial science: the bottom 10% of pharmacists earned less than $86,930, and the top 10% earned more than $172,040 in May 2024. A roughly $85,000 gap between deciles in a single-credential profession suggests the spread is driven mainly by setting and geography rather than large differences in required qualifications.',
				],
			},
			{
				heading: 'Retail pharmacy vs. clinical and hospital settings',
				body: [
					'The industry breakdown clarifies where the money actually is. Ambulatory healthcare services (a category that includes outpatient clinics and specialty infusion centers) paid the highest median in May 2024 at $152,980. Hospitals paid close behind at $149,240. General merchandise retailers, meaning big-box stores with in-house pharmacies, paid $145,210.',
					'Pharmacies and drug retailers, the traditional chain and independent retail pharmacy setting most people picture when they hear "pharmacist," paid a median of $131,640, noticeably below the other four categories despite employing a large share of all pharmacists.',
				],
			},
			{
				heading: 'Job outlook',
				body: [
					'BLS projects 5% employment growth for pharmacists from 2024 to 2034, classified as faster than average, adding about 15,400 jobs over the decade. That is a more moderate growth rate than several other healthcare occupations on this site, in part because retail pharmacy chains have been consolidating locations in some regions even as demand for clinical pharmacist roles in hospitals and specialty care has grown.',
				],
			},
		],
		faq: [
			{
				question: 'What is the median pharmacist salary?',
				answer: 'The Bureau of Labor Statistics reports a median annual pharmacist salary of $137,480 in May 2024 ($66.10 per hour).',
			},
			{
				question: 'Do hospital pharmacists make more than retail pharmacists?',
				answer: 'BLS industry data for May 2024 shows hospitals paid a median of $149,240, compared with $131,640 at pharmacies and drug retailers, the typical retail chain setting. Ambulatory healthcare services paid the highest of the tracked categories, at $152,980.',
			},
			{
				question: 'What is the pay range for pharmacists?',
				answer: 'BLS reports the bottom 10% of pharmacists earned less than $86,930 in May 2024, while the top 10% earned more than $172,040.',
			},
			{
				question: 'Is pharmacy a growing field?',
				answer: 'BLS projects 5% employment growth for pharmacists from 2024 to 2034, faster than the average for all occupations, adding roughly 15,400 jobs over the decade.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Pharmacists (accessed 2026-08-03, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/pharmacists.htm' },
		],
		image: '/images/pharmacist-salary-chart.svg',
		imageAlt: 'Bar chart showing pharmacist annual wage by percentile: 10th percentile $86,930, median $137,480, 90th percentile $172,040, based on BLS May 2024 data.',
	},
	{
		slug: 'physical-therapist-salary',
		category: 'Salary Guide',
		title: 'Physical Therapist Salary: BLS Wage Data by Percentile (2026)',
		description: 'BLS puts the median physical therapist salary at $101,020 a year. Full percentile breakdown, industry comparison, and what a DPT degree buys you.',
		published: '2026-08-03',
		updated: '2026-08-03',
		socCode: '29-1123',
		coreSummary: 'The median annual wage for physical therapists was $101,020 in May 2024, according to the Bureau of Labor Statistics. The bottom 10% earned less than $74,420 and the top 10% earned more than $132,500. Home healthcare services paid the highest industry median ($108,110), while private outpatient therapy offices paid the lowest of the tracked categories ($94,860).',
		sections: [
			{
				heading: 'What a DPT degree translates to in pay',
				body: [
					'Physical therapy became a doctoral-entry profession in the United States over the 2000s and 2010s; nearly all practicing PTs today hold a Doctor of Physical Therapy (DPT) degree, typically a three-year program after a bachelor\'s degree, followed by a national licensing exam. BLS data from May 2024 puts the median annual salary at $101,020, or $48.57 an hour, for that credential.',
					'The percentile range is moderate compared to some other occupations on this site: the bottom 10% of PTs earned less than $74,420, and the top 10% earned more than $132,500 in May 2024, roughly a $58,000 gap. That is consistent with a single-credential profession where pay differences come mainly from setting, geography, and years of experience rather than large differences in required qualifications.',
				],
			},
			{
				heading: 'Setting matters more than most people expect',
				body: [
					'BLS breaks out May 2024 wages by industry, and the pattern is somewhat counterintuitive: home healthcare services paid the highest median at $108,110, ahead of nursing and residential care facilities ($105,330) and hospitals ($105,140). Private outpatient physical therapy offices, the setting many people associate with PT work and where a large share of PTs are employed, paid the lowest of these four categories, at $94,860.',
					'The gap likely reflects staffing economics: home health and skilled nursing settings often pay a premium to attract PTs willing to travel between patient locations or work in facility settings with higher patient acuity, while private outpatient practices compete more on schedule flexibility and caseload variety than on base pay.',
				],
			},
			{
				heading: 'Job outlook',
				body: [
					'BLS projects 11% employment growth for physical therapists from 2024 to 2034, classified as much faster than average, adding about 29,300 jobs over the decade, one of the stronger growth projections among the healthcare occupations tracked on this site. An aging population with rising rates of chronic conditions that benefit from physical therapy (orthopedic injuries, stroke recovery, mobility-related conditions) is the primary driver BLS cites for continued demand.',
				],
			},
		],
		faq: [
			{
				question: 'What is the median physical therapist salary?',
				answer: 'The Bureau of Labor Statistics reports a median annual physical therapist salary of $101,020 in May 2024 ($48.57 per hour).',
			},
			{
				question: 'Do physical therapists need a doctoral degree?',
				answer: 'Yes. Since the physical therapy profession transitioned to doctoral-level entry education, practicing PTs need a Doctor of Physical Therapy (DPT) degree plus a passing score on the National Physical Therapy Examination and state licensure.',
			},
			{
				question: 'What setting pays physical therapists the most?',
				answer: 'Among the industry categories BLS tracked for May 2024, home healthcare services paid the highest median at $108,110, followed by nursing and residential care facilities ($105,330) and hospitals ($105,140). Private outpatient PT offices paid the lowest of these categories, at $94,860.',
			},
			{
				question: 'Is physical therapy a growing field?',
				answer: 'BLS projects 11% employment growth for physical therapists from 2024 to 2034, classified as much faster than the average for all occupations, adding roughly 29,300 jobs over the decade.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Physical Therapists (accessed 2026-08-03, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/physical-therapists.htm' },
		],
		image: '/images/physical-therapist-salary-chart.svg',
		imageAlt: 'Bar chart showing physical therapist annual wage by percentile: 10th percentile $74,420, median $101,020, 90th percentile $132,500, based on BLS May 2024 data.',
	},
	{
		slug: 'what-does-a-physician-assistant-do',
		category: 'Career Guide',
		title: 'What Does a Physician Assistant Do? Duties, Setting, and Pay',
		description: 'A physician assistant examines, diagnoses, and treats patients under physician supervision. Here is what the job actually involves, day to day, plus BLS pay data.',
		published: '2026-08-03',
		updated: '2026-08-03',
		socCode: '29-1071',
		coreSummary: 'Physician assistants (PAs) examine, diagnose, and treat patients under a supervising physician\'s oversight: ordering and interpreting tests, prescribing medication, and performing minor procedures across specialties from primary care to surgery. The role requires a master\'s degree from an accredited PA program and state licensure; BLS reports a median annual salary of $133,260 in May 2024.',
		sections: [
			{
				heading: 'The core of the job',
				body: [
					'According to the Bureau of Labor Statistics, physician assistants "examine, diagnose, and treat patients under the supervision of a physician." In practice that covers a broad set of clinical tasks: taking medical histories, performing physical exams, ordering and interpreting diagnostic tests like bloodwork and imaging, diagnosing illnesses and injuries, developing treatment plans, prescribing medication, and performing minor procedures such as wound closure or joint injections.',
					'PAs also spend a meaningful share of time on tasks that look less clinical but are core to the job: documenting visits, coordinating with other members of a care team, and patient education, walking someone through a diagnosis, medication instructions, or a treatment plan in plain language. That last part is often underestimated by people outside healthcare.',
					'The specific scope of what a PA is allowed to do varies by state law and by the supervising physician\'s practice agreement. Some states grant PAs broader independent authority than others, and scope of practice has been an active area of state-level legislative change in recent years, so the exact autonomy a PA has in one state may differ from another.',
				],
			},
			{
				heading: 'Where PAs work',
				body: [
					'PAs work across nearly every medical specialty rather than one fixed setting. BLS names primary care and family medicine, emergency medicine, and psychiatry as common placements, and separately notes that PAs also work in specialties such as surgery and pediatrics. This is one of the appeals of the role for many who choose it over becoming a physician or nurse practitioner: a PA\'s generalist training makes it possible to move between specialties over a career without going back for an entirely new credential, something that is much harder for a physician who has completed specialty-specific residency training.',
					'The industry wage breakdown reflects that range of settings. BLS reports a May 2024 median PA salary of $133,260 nationally, with government employers paying the highest median among tracked categories at $151,470, followed by outpatient care centers ($147,650), hospitals ($136,630), and physician offices ($129,640).',
				],
			},
			{
				heading: 'Education and licensing path',
				body: [
					'Becoming a PA requires a master\'s degree from an accredited physician assistant program, which typically takes at least two years beyond a bachelor\'s degree and combines classroom instruction with supervised clinical rotations across multiple specialties. Most programs expect applicants to already hold a bachelor\'s degree with substantial science coursework and hands-on patient-care experience (commonly as a medical assistant, EMT, paramedic, or in a similar clinical support role) before admission.',
					'After completing a program, candidates must pass the Physician Assistant National Certifying Examination (PANCE) to earn the PA-C (Physician Assistant-Certified) credential, and every state requires PA licensure on top of that national certification. Maintaining certification requires ongoing continuing medical education and periodic recertification exams.',
				],
			},
		],
		faq: [
			{
				question: 'What is the difference between a physician assistant and a doctor?',
				answer: 'Physician assistants practice medicine under the supervision of a licensed physician and complete a master\'s-level program (typically 2+ years post-bachelor\'s), while physicians complete medical school (4 years) plus residency (3-7+ years depending on specialty) and are independently licensed to practice. The scope of what a PA can do without direct physician sign-off varies by state.',
			},
			{
				question: 'How much do physician assistants make?',
				answer: 'The Bureau of Labor Statistics reports a median annual physician assistant salary of $133,260 in May 2024 ($64.07 per hour), with government employers paying the highest industry median tracked ($151,470).',
			},
			{
				question: 'What degree do you need to become a physician assistant?',
				answer: 'A master\'s degree from an accredited PA program, plus passing the Physician Assistant National Certifying Examination (PANCE) and obtaining state licensure. Most programs require a bachelor\'s degree with science prerequisites and prior clinical experience for admission.',
			},
			{
				question: 'Do physician assistants work in specific specialties?',
				answer: 'PAs work across most medical specialties rather than being limited to one. BLS names primary care and family medicine, emergency medicine, and psychiatry as common placements, and notes PAs also work in specialties like surgery and pediatrics. Generalist training makes it possible for a PA to move between specialties during a career.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Physician Assistants (accessed 2026-08-03, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/physician-assistants.htm' },
		],
		image: '/images/physician-assistant-duties.svg',
		imageAlt: 'Diagram showing a physician assistant\'s core duties: patient exams, ordering tests, diagnosis, prescribing, and minor procedures, under physician supervision.',
	},
	{
		slug: 'what-does-an-actuary-do',
		category: 'Career Guide',
		title: 'What Does an Actuary Do? Duties, Specialties, and Pay',
		description: 'Actuaries use math and statistics to price risk for insurers, pension funds, and corporations. Here is what the job actually involves, plus BLS pay data.',
		published: '2026-08-03',
		updated: '2026-08-03',
		socCode: '15-2011',
		coreSummary: 'Actuaries use mathematics, statistics, and financial theory to estimate the probability and economic cost of future events (death, illness, accidents, natural disasters) and design insurance policies, pension plans, and risk strategies around those estimates. The role requires passing a multi-year series of professional exams; BLS reports a median annual salary of $125,770 in May 2024.',
		sections: [
			{
				heading: 'What the work actually looks like',
				body: [
					'The Bureau of Labor Statistics describes actuaries as professionals who "use mathematics, statistics, and financial theory to analyze the economic costs of risk and uncertainty." Concretely, that means compiling and analyzing large statistical datasets, estimating the probability and likely cost of events like death, sickness, accidents, or natural disasters, and using those estimates to design insurance policies and corporate risk strategies that price that uncertainty appropriately.',
					'Day to day, an actuary spends time building and refining statistical models, producing charts, tables, and written reports that translate that modeling into recommendations, and presenting those findings to executives, regulators, or clients who are not statisticians themselves. Communication and the ability to explain a model\'s assumptions in plain terms is a real, non-optional part of the job, not a side skill.',
				],
			},
			{
				heading: 'The five main specialty tracks',
				body: [
					'Actuarial work splits into a handful of recognized specialties, each with its own professional exam track. Health insurance actuaries estimate the cost of long-term care and health policies based on factors like family medical history and occupation. Life insurance actuaries build life-expectancy estimates for annuities and life policies, incorporating factors like age and tobacco use. Property and casualty actuaries price policies covering property loss and accident or disaster liability. Pension and retirement benefits actuaries evaluate pension plans and help design retirement benefit structures like 401(k) plans; this track additionally requires licensing through the U.S. Department of Labor and Treasury. Enterprise risk management actuaries take a broader view, identifying financial and economic risks to a company\'s overall objectives rather than pricing a single product line.',
					'Which track an actuary ends up in is usually determined by which exams they choose to sit for as they progress through certification, more than by their initial job placement. It is common to specialize a few years into a career rather than from day one.',
				],
			},
			{
				heading: 'The exam-based path to qualification',
				body: [
					'Entry typically requires a bachelor\'s degree in mathematics, actuarial science, statistics, or a related quantitative field, with coursework in economics, applied statistics, and corporate finance. What sets actuarial credentialing apart from most professions is the exam sequence administered by the Society of Actuaries (SOA) or Casualty Actuarial Society (CAS): candidates must pass a series of rigorous, difficult exams plus professionalism seminars to earn Associate-level certification, a process the Occupational Outlook Handbook notes can take up to seven years. Reaching Fellow-level certification, the terminal credential, takes additional years beyond that.',
					'Most employers expect candidates to have already passed one or two exams before graduating college, and new hires typically start as trainees under an experienced actuary\'s supervision, working on basic data compilation before progressing to independent modeling and report writing as they clear more exams.',
				],
			},
		],
		faq: [
			{
				question: 'What does an actuary do on a typical day?',
				answer: 'Actuaries compile and analyze statistical data, build models estimating the probability and cost of future events (death, illness, accidents, disasters), and translate those models into reports and recommendations presented to executives or clients. The specific focus depends on specialty: health, life, property/casualty, pension, or enterprise risk.',
			},
			{
				question: 'How long does it take to become a fully qualified actuary?',
				answer: 'The BLS Occupational Outlook Handbook states that reaching associate-level certification can take up to seven years, with fellowship (the terminal credential) requiring additional years beyond that. In the U.S., that exam-based certification is administered by the Society of Actuaries or the Casualty Actuarial Society depending on specialty, though BLS itself does not name these organizations by name.',
			},
			{
				question: 'How much do actuaries make?',
				answer: 'BLS reports a median annual actuary salary of $125,770 in May 2024, with a wide range by credential level: the bottom 10% earned under $75,240 and the top 10% earned over $206,430.',
			},
			{
				question: 'What are the main actuarial specialties?',
				answer: 'Five main tracks: health insurance, life insurance, property and casualty insurance, pension and retirement benefits, and enterprise risk management. Actuaries typically specialize based on which professional exams they sit for as they progress through certification.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Actuaries (accessed 2026-08-03, data from May 2024)', url: 'https://www.bls.gov/ooh/math/actuaries.htm' },
		],
		image: '/images/actuary-specialties.svg',
		imageAlt: 'Diagram showing the five actuarial specialty tracks: health, life, property and casualty, pension and retirement benefits, and enterprise risk management.',
	},
	{
		slug: 'what-does-a-paralegal-do',
		category: 'Career Guide',
		title: 'What Does a Paralegal Do? Duties, Setting, and Pay',
		description: 'Paralegals research law, draft documents, and organize case files to support lawyers, without being licensed to practice law themselves. BLS pay and outlook data included.',
		published: '2026-08-03',
		updated: '2026-08-03',
		socCode: '23-2011',
		coreSummary: 'Paralegals and legal assistants support lawyers by researching law, drafting documents and correspondence, organizing and maintaining case files, and preparing materials for trials and hearings, without being licensed to practice law themselves. BLS reports a median annual salary of $61,010 in May 2024, with pay varying substantially by employer type; federal government roles paid the most among tracked industries.',
		sections: [
			{
				heading: 'What the role actually covers',
				body: [
					'The Bureau of Labor Statistics describes paralegals and legal assistants as professionals who support lawyers through "maintaining and organizing files, conducting legal research, and drafting documents." That covers a fairly wide range of concrete tasks: investigating the facts of a case, researching relevant statutes and case law, drafting correspondence, contracts, and legal filings for an attorney\'s review, obtaining sworn statements (affidavits), assisting during trial preparation and proceedings, filing documents with courts, and scheduling client interviews and depositions.',
					'A key distinction from the attorney role: paralegals cannot give legal advice, represent clients in court, or set legal fees. The work is substantive but always performed under an attorney\'s supervision and final authority. What varies most is scope: at a small firm, a paralegal might handle nearly every non-courtroom aspect of a case from intake to filing; at a large firm, paralegals are more often assigned to a specific phase of a case (discovery, document review, trial prep) within a particular practice area like litigation, intellectual property, or bankruptcy.',
				],
			},
			{
				heading: 'Where the pay actually is',
				body: [
					'BLS industry data for May 2024 shows a wider-than-expected gap by employer type. Federal government roles paid the highest median at $77,940, followed by finance and insurance at $76,960, both well above the $61,010 national median. Local government paid $60,990, close to the median. Legal services (meaning law firms themselves, the setting most people picture) paid $59,800, and state government paid the least of the tracked categories at $56,280.',
					'The pattern suggests that paralegals working inside a company\'s in-house legal or compliance function (finance and insurance) or for a federal agency often out-earn paralegals working at a traditional law firm, likely reflecting both the specific complexity of federal regulatory and financial-sector work and broader public-versus-private pay structures within government tiers.',
				],
			},
			{
				heading: 'Education path and job outlook',
				body: [
					'Most paralegal positions require an associate degree in paralegal studies, or a bachelor\'s degree in another field combined with a paralegal certificate program. Separately, BLS notes some employers will hire candidates with no formal paralegal education or experience (typically just a high school diploma) and train them on the job, particularly for specialized practice areas; this on-the-job route is a distinct path from the bachelor\'s-degree-plus-certificate route, not an extension of it, and a paralegal certificate is increasingly treated as close to a baseline expectation regardless of which path a candidate starts from.',
					'BLS projects essentially flat employment for paralegals from 2024 to 2034: 0% growth, described as "little or no change," adding only about 600 net jobs over the decade. That is a noticeably weaker outlook than most other occupations covered on this site, and is worth weighing seriously against the relatively low barrier to entry: demand growth in this field is not expected to be a strong tailwind over the next decade the way it is in several healthcare roles.',
				],
			},
		],
		faq: [
			{
				question: 'What is the difference between a paralegal and a lawyer?',
				answer: 'A paralegal supports an attorney by researching law, drafting documents, and organizing case materials, but cannot give legal advice, represent clients in court, or practice law independently. Becoming a lawyer requires a Juris Doctor (JD) degree and passing a state bar exam; a paralegal typically needs an associate degree or a certificate program, not a law degree.',
			},
			{
				question: 'How much do paralegals make?',
				answer: 'BLS reports a median annual paralegal salary of $61,010 in May 2024, with federal government roles paying the highest industry median tracked at $77,940 and state government the lowest at $56,280.',
			},
			{
				question: 'Is paralegal a growing career?',
				answer: 'BLS projects essentially flat employment growth for paralegals from 2024 to 2034 (0%, described as "little or no change"), adding only about 600 net jobs nationally over the decade, a notably weaker outlook than many other occupations.',
			},
			{
				question: 'What education do you need to become a paralegal?',
				answer: 'Most positions require an associate degree in paralegal studies, or a bachelor\'s degree in another field plus a paralegal certificate program. Some employers will train a bachelor\'s-degree hire on the job for specific practice areas.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Paralegals and Legal Assistants (accessed 2026-08-03, data from May 2024)', url: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm' },
		],
		image: '/images/paralegal-duties.svg',
		imageAlt: 'Diagram showing core paralegal duties: legal research, drafting documents, organizing case files, and trial preparation support.',
	},
	{
		slug: 'how-to-become-an-ultrasound-tech',
		category: 'How to Become',
		title: 'How to Become an Ultrasound Tech: Education, Certification, Pay',
		description: 'Becoming a diagnostic medical sonographer typically takes an associate degree plus certification. Here is the real path, timeline, and BLS pay data.',
		published: '2026-08-03',
		updated: '2026-08-03',
		socCode: '29-2032',
		coreSummary: 'Diagnostic medical sonographers ("ultrasound techs") typically need at least an associate degree or postsecondary certificate from an accredited program, plus professional certification most employers expect even where not legally required. BLS reports a median annual salary of $89,340 in May 2024 and projects 13% employment growth through 2034.',
		sections: [
			{
				heading: 'The typical education path',
				body: [
					'The Bureau of Labor Statistics states that diagnostic medical sonographers typically need "at least an associate\'s degree or a postsecondary certificate." In practice, most entrants complete a two-year associate degree program in diagnostic medical sonography, though postsecondary certificate programs (often for people who already hold a healthcare credential, such as a nursing degree or radiologic technology background) can be shorter.',
					'These programs combine classroom instruction in anatomy, medical terminology, and applied physics of ultrasound imaging with a substantial clinical component, where students perform supervised scans in a hospital or clinic setting before graduating. Choosing a program accredited by the Commission on Accreditation of Allied Health Education Programs (CAAHEP) matters in practice: many employers and certifying bodies require or strongly prefer a CAAHEP-accredited program, and skipping that step can limit job options later even if the coursework itself was comparable.',
				],
			},
			{
				heading: 'Certification and licensing',
				body: [
					'BLS notes that some states require sonographers to hold a state license, and that employers commonly prefer candidates with professional certification even in states where it is not legally mandated. The most widely recognized certifying body is the American Registry for Diagnostic Medical Sonography (ARDMS), which offers credentials across specialty areas (abdominal, OB/GYN, vascular, cardiac, and others) via a combination of education/experience requirements and a certification exam.',
					'Most programs and employers also expect sonographers to hold current Basic Life Support (BLS/CPR) certification, since the role involves direct patient contact and occasional emergency situations during scans.',
				],
			},
			{
				heading: 'What the job pays once you get there',
				body: [
					'According to BLS, the median annual salary for diagnostic medical sonographers was $89,340 in May 2024 ($42.95 an hour). Pay varies by setting: outpatient care centers paid the highest industry median tracked, at $123,610, notably higher than hospitals ($90,070), physician offices ($89,450), or medical and diagnostic laboratories ($83,200). That gap is worth factoring into a job search once certified, since it is large enough to be a meaningful factor beyond just location.',
					'BLS projects 13% employment growth for the occupation from 2024 to 2034, classified as much faster than average, adding an estimated 11,700 jobs over the decade, a relatively strong outlook among the healthcare occupations covered on this site, especially given the comparatively short (roughly two-year) training timeline relative to the pay level.',
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become an ultrasound tech?',
				answer: 'Most people complete a two-year associate degree program in diagnostic medical sonography. Postsecondary certificate programs can be shorter, typically for candidates who already hold a related healthcare credential.',
			},
			{
				question: 'Do you need certification to work as an ultrasound tech?',
				answer: 'Requirements vary by state, and BLS notes some states require licensure. Even where not legally required, most employers strongly prefer or require professional certification, most commonly through the American Registry for Diagnostic Medical Sonography (ARDMS).',
			},
			{
				question: 'How much do ultrasound techs make?',
				answer: 'BLS reports a median annual salary of $89,340 for diagnostic medical sonographers in May 2024, with outpatient care centers paying the highest industry median tracked at $123,610.',
			},
			{
				question: 'Is ultrasound tech a good career to get into?',
				answer: 'BLS projects 13% employment growth from 2024 to 2034, much faster than average, for a role that typically requires about two years of postsecondary training rather than a four-year degree. Whether it is the right choice depends on individual circumstances such as location, tolerance for direct patient care, and interest in the clinical subject matter; BLS data describes the aggregate labor market, not a recommendation for any specific person.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Diagnostic Medical Sonographers (accessed 2026-08-03, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/diagnostic-medical-sonographers.htm' },
		],
		image: '/images/ultrasound-tech-path.svg',
		imageAlt: 'Timeline diagram showing the path to becoming a diagnostic medical sonographer: associate degree or certificate program, clinical training, ARDMS certification.',
	},
	{
		slug: 'how-to-become-a-phlebotomist',
		category: 'How to Become',
		title: 'How to Become a Phlebotomist: Training, Certification, Pay',
		description: 'Becoming a phlebotomist usually takes under a year of training. Here is the real path (formal program vs. on-the-job route) plus BLS pay data.',
		published: '2026-08-03',
		updated: '2026-08-03',
		socCode: '31-9097',
		coreSummary: 'Phlebotomists typically enter the field through a postsecondary certificate program lasting less than a year, or through employer-provided on-the-job training after a high school diploma. BLS reports a median annual salary of $43,660 in May 2024 and projects 6% employment growth through 2034, making it one of the fastest, lowest-cost entry points into clinical healthcare work.',
		sections: [
			{
				heading: 'Two real paths in, not one',
				body: [
					'Unlike most healthcare roles on this site, phlebotomy does not have a single standard education requirement. The Bureau of Labor Statistics describes two distinct routes: a formal postsecondary certificate program (typically less than a year, offered through community colleges or vocational schools) covering anatomy, physiology, medical terminology, and hands-on blood-draw practice; or an alternative route starting with just a high school diploma, where the employer provides on-the-job training directly.',
					'Which route makes more sense depends mostly on the local job market and state requirements. Some states legally require phlebotomists to hold a state certification or license regardless of which training path was used, which effectively forces the formal-program route in those states. In states without that requirement, the on-the-job route can be genuinely faster, though it may limit which employers are willing to hire without prior credentials; larger hospital systems and labs often prefer certified candidates even where not legally mandated.',
				],
			},
			{
				heading: 'Certification, even where not required',
				body: [
					'BLS notes that some employers prefer to hire phlebotomists who have earned professional certification from a recognized professional organization, and that requirements for that certification vary by certifying organization. Separately, some states impose their own requirement that phlebotomists complete an accredited training program or hold a license or certification. Certification exams generally require completion of a set number of supervised blood draws in addition to passing a written exam. Certification is usually the more employable path even where not legally required, since it signals a verified, standardized skill level to an employer who has no other easy way to assess a new hire\'s technique.',
				],
			},
			{
				heading: 'Pay and outlook once you are in',
				body: [
					'According to BLS, the median annual phlebotomist salary was $43,660 in May 2024 ($20.99 an hour), one of the lower-paying roles covered on this site, consistent with its position as one of the fastest and lowest-cost entry points into clinical healthcare work. Pay varies by setting: outpatient care centers paid the highest industry median tracked, at $48,450, ahead of medical and diagnostic laboratories ($45,700), hospitals ($41,490), physician offices ($40,480), and other ambulatory healthcare services ($39,180).',
					'BLS projects 6% employment growth from 2024 to 2034, classified as faster than average, adding roughly 7,900 jobs over the decade. For many people, phlebotomy functions less as a long-term destination and more as an entry point into healthcare: a relatively fast, low-cost way to gain direct patient-contact experience before pursuing a higher-paying credential such as a medical assistant, nursing, or diagnostic imaging program, several of which explicitly value prior phlebotomy experience in admissions.',
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a phlebotomist?',
				answer: 'A formal certificate program typically takes less than a year. Some people instead enter with just a high school diploma through employer-provided on-the-job training, though this route is not available everywhere and some states legally require certification regardless.',
			},
			{
				question: 'Do you need certification to be a phlebotomist?',
				answer: 'It depends on the state: some legally require certification or licensure. Even where not required by law, BLS notes most employers prefer candidates with professional certification, since it is often the more reliable path to being hired at larger hospital systems and labs.',
			},
			{
				question: 'How much do phlebotomists make?',
				answer: 'BLS reports a median annual phlebotomist salary of $43,660 in May 2024 ($20.99 per hour), with outpatient care centers paying the highest industry median tracked at $48,450.',
			},
			{
				question: 'Is phlebotomy a good first job in healthcare?',
				answer: 'Many people use it that way. The training is comparatively short (often under a year) and low-cost, and the direct patient-contact experience is valued by admissions programs for some higher-paying credentials like medical assisting, nursing, or diagnostic imaging. BLS projects 6% employment growth for the role itself through 2034, but BLS data describes the aggregate labor market, not a recommendation for any specific person.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Phlebotomists (accessed 2026-08-03, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/phlebotomists.htm' },
		],
		image: '/images/phlebotomist-path.svg',
		imageAlt: 'Diagram comparing two paths to becoming a phlebotomist: formal certificate program vs. high school diploma plus on-the-job training, both leading to optional certification.',
	},
	{
		slug: 'how-much-do-flight-attendants-make',
		category: 'Salary Guide',
		title: 'How Much Do Flight Attendants Make? BLS Data by Percentile',
		description: 'The median flight attendant salary is $67,130 a year per BLS, but the range is enormous, from $34,030 to $138,040. Here is why, and what drives it.',
		published: '2026-08-03',
		updated: '2026-08-03',
		socCode: '53-2031',
		coreSummary: 'The median annual wage for flight attendants was $67,130 in May 2024, according to the Bureau of Labor Statistics. The range is unusually wide for the required entry education: the bottom 10% earned less than $34,030 while the top 10% earned more than $138,040, a roughly $104,000 gap driven mainly by seniority-based pay scales and route/aircraft assignments under airline union contracts.',
		sections: [
			{
				heading: 'Why the range is so wide for an entry-level-education job',
				body: [
					'Flight attendant is one of the few well-paying occupations that typically requires only a high school diploma or equivalent to enter, per BLS. That makes the size of its pay range notable: the bottom 10% of flight attendants earned less than $34,030 in May 2024, while the top 10% earned more than $138,040, over a $100,000 spread within a single occupation that has a low formal education barrier to entry.',
					'The explanation is seniority. Nearly all major U.S. airlines pay flight attendants under union contracts with seniority-based pay scales, where hourly rates increase substantially with years of service, and senior flight attendants get priority for the most desirable (and often highest-paying, due to international or long-haul premiums) routes and aircraft. A first-year flight attendant at a regional carrier and a 20-year flight attendant at a major international carrier are, in effect, in very different pay tiers despite sharing a job title.',
				],
			},
			{
				heading: 'How airline type changes the number',
				body: [
					'BLS breaks out May 2024 wages by two industry categories: nonscheduled air transportation (largely charter and private-jet operations) paid a higher median at $77,060, compared with $67,620 at scheduled air transportation, the major and regional passenger airlines most flight attendants work for. That gap partly reflects the different pay structures and passenger mix of charter versus scheduled commercial flying.',
					'It is also worth noting what published median pay figures do not fully capture for this occupation: flight attendants are traditionally paid only for scheduled flight time (wheels-up to wheels-down), not for time spent on the ground during boarding, delays, or layovers, though airline contract terms on this have shifted somewhat in recent years following industry-wide labor negotiations. BLS wage data reflects reported total compensation, but the hourly structure underlying it differs meaningfully from a typical hourly job.',
				],
			},
			{
				heading: 'Job outlook',
				body: [
					'BLS projects 9% employment growth for flight attendants from 2024 to 2034, classified as much faster than average, adding roughly 12,100 jobs over the decade. Growth in air travel demand, plus regulatory minimum staffing requirements tied to aircraft passenger capacity, are the main drivers BLS cites. Airlines cannot simply run more flights without proportionally more crew, which links growth directly to industry capacity expansion in a way that is less true for some other service occupations.',
				],
			},
		],
		faq: [
			{
				question: 'How much do flight attendants make?',
				answer: 'The Bureau of Labor Statistics reports a median annual flight attendant salary of $67,130 in May 2024, with a very wide range: the bottom 10% earned under $34,030 and the top 10% earned over $138,040.',
			},
			{
				question: 'Why do some flight attendants make so much more than others?',
				answer: 'Mainly seniority. Most U.S. airlines pay flight attendants on union-negotiated, seniority-based pay scales where hourly rates rise substantially with years of service, and senior flight attendants also get priority access to higher-paying international and long-haul routes.',
			},
			{
				question: 'Do flight attendants need a college degree?',
				answer: 'No. BLS lists a high school diploma or equivalent as the typical entry-level education requirement, along with airline-provided initial training (moderate-term on-the-job training) and FAA certification, which is required by law before working as a flight attendant.',
			},
			{
				question: 'Is flight attendant a growing career?',
				answer: 'BLS projects 9% employment growth for flight attendants from 2024 to 2034, classified as much faster than the average for all occupations, adding roughly 12,100 jobs over the decade.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Flight Attendants (accessed 2026-08-03, data from May 2024)', url: 'https://www.bls.gov/ooh/transportation-and-material-moving/flight-attendants.htm' },
		],
		image: '/images/flight-attendant-salary-chart.svg',
		imageAlt: 'Bar chart showing flight attendant annual wage by percentile: 10th percentile $34,030, median $67,130, 90th percentile $138,040, based on BLS May 2024 data.',
	},
	{
		slug: 'radiology-tech-salary',
		category: 'Salary Guide',
		title: 'Radiology Tech Salary: BLS Wage Data by Percentile (2026)',
		description: 'BLS puts the median radiology tech salary at $77,660 a year. See the full wage range by percentile, by industry, and how the role differs from MRI techs.',
		published: '2026-08-04',
		updated: '2026-08-04',
		socCode: '29-2034',
		coreSummary: 'The median annual wage for radiologic technologists and technicians was $77,660 in May 2024, according to the U.S. Bureau of Labor Statistics. The bottom 10% earned less than $52,360 while the top 10% earned more than $106,990, and the highest-paying employer category was the federal government, at a median of $93,970.',
		sections: [
			{
				heading: 'What "radiology tech" actually means, and what the role pays',
				body: [
					'The Bureau of Labor Statistics tracks this job under the title "Radiologic Technologists and Technicians," SOC code 29-2034, which is the role most people mean when they search "radiology tech": the person who positions patients and operates x-ray and CT equipment. It is a distinct occupation from Magnetic Resonance Imaging (MRI) technologists, who work with different equipment and are tracked separately by BLS (median annual wage $88,180 in May 2024), and from radiologists, who are physicians who interpret the images rather than technicians who capture them. Job postings sometimes use these titles loosely, so the wage figure that applies depends on which specific role is being described.',
					'For radiologic technologists and technicians specifically, BLS reported a median annual wage of $77,660 in May 2024. The bottom 10% of earners made less than $52,360 a year, while the top 10% made more than $106,990, a spread of roughly $54,600. That range reflects a mix of experience, credential level (a base radiography certification versus additional specialty certifications in CT or mammography), employer type, and region, rather than any single factor. This page\'s Quick Facts box lists a combined hourly figure of $37.97 for the broader "Radiologic and MRI Technologists" grouping (which blends this occupation with the higher-paying MRI technologist role), not a figure specific to radiologic technologists and technicians alone, so it is left out of the numbers above to avoid overstating typical hourly pay for this occupation.',
					'BLS figures are national medians drawn from its Occupational Employment and Wage Statistics survey, which collects data directly from employers rather than relying on self-reported salary submissions the way some job-search sites do. That distinction matters when comparing this page to other sources: a site built on self-reported figures can skew toward workers motivated to report unusually high or low pay, while employer-reported OEWS data reflects actual payroll records across a much larger, more representative sample. BLS does not publish a state-by-state breakdown on this specific page; readers who need per-state or per-metro figures would need the BLS OEWS state wage tables directly, which break the same occupation down by geography.',
				],
			},
			{
				heading: 'Why the employer you work for changes the number',
				body: [
					'BLS breaks out May 2024 wages by industry, and the differences are large enough to matter when comparing job offers. Federal government employment (excluding the postal service) paid the highest median at $93,970, followed by outpatient care centers at $81,000 and hospitals at $78,560. Medical and diagnostic laboratories paid a median of $76,770, and offices of physicians, often smaller practices with less imaging volume, paid the least of the five categories BLS reports, at $66,060.',
					'The roughly $28,000 gap between the top and bottom industry categories is wider than the typical spread for allied health roles, and it runs somewhat counter to the assumption that hospital settings pay the most. BLS does not explain why federal employment ranks highest for this specific role; it publishes the wage-by-industry figures without an accompanying explanation. One plausible, unverified factor is that federal employers such as the VA and military treatment facilities generally use standardized General Schedule pay scales rather than the market-rate-by-metro pricing common in private hospitals and physician offices, but that is this article\'s inference, not a claim BLS itself makes.',
					'These five categories are the industries BLS separately tracks wages for in this occupation on the Occupational Outlook Handbook page; they do not cover every possible employer type, and this page reports wages by industry without also breaking out how many radiologic technologists work in each one. Readers who want a headcount-by-industry breakdown, rather than a wage-by-industry breakdown, would need the BLS OEWS industry tables directly, which is a separate data product from the Handbook page cited here.',
				],
			},
			{
				heading: 'Licensing and how techs enter the field',
				body: [
					'Entry-level education for this role is an associate\'s degree, per BLS, typically from an accredited radiography program that combines classroom instruction with supervised clinical hours. BLS states that most states require radiologic technologists to be licensed or certified, with requirements varying by state, and that the standard path is completing an accredited program and then either passing a state exam or earning certification from a credentialing organization. BLS does not name a specific credentialing body on this page; the American Registry of Radiologic Technologists (ARRT), which administers the field\'s primary Radiography (R) credential, is a separately confirmed, real credentialing organization, not a BLS-sourced detail.',
					'This credential-gated structure is part of why pay does not simply track years of experience: a tech who adds a specialty certification in computed tomography (CT) or mammography on top of a base radiography credential typically qualifies for higher-paying assignments, since additional certifications expand which equipment and procedures the tech is authorized to operate, though BLS itself does not quantify this effect. For readers comparing adjacent diagnostic-imaging careers, [ultrasound technologists](/how-to-become-an-ultrasound-tech) follow a similarly structured associate-degree-plus-certification path, though sonography uses different equipment and is credentialed through a separate, independently confirmed organization, the American Registry for Diagnostic Medical Sonography (ARDMS).',
					'Accredited radiography programs generally run about two years at the associate-degree level, combining classroom coursework in anatomy, patient positioning, radiation physics, and safety with supervised clinical hours in an imaging department. That two-year timeframe reflects the standard length of an associate degree generally, not a figure stated on the BLS page or documented in a specific program-duration source; the Joint Review Committee on Education in Radiologic Technology (JRCERT), the field\'s program-accreditation body, publishes accreditation award terms (how long a program\'s accreditation itself stays valid), which is a different thing from how long the program takes a student to complete. This is a formally licensed or certified occupation in most states, not a role someone can be trained into purely on the job, which is why BLS lists "none" for additional on-the-job training beyond the associate degree and clinical training already built into an accredited program.',
				],
			},
			{
				heading: 'Job outlook and how this compares to other allied health pay',
				body: [
					'BLS projects 4% employment growth for radiologic technologists and technicians from 2024 to 2034, faster than the roughly 3% average projected across all occupations, adding an estimated 9,800 jobs over the decade. The broader category that includes MRI technologists is projected to grow faster still, at 5%, with about 15,400 combined openings expected each year on average, reflecting continued demand for diagnostic imaging tied to an aging population and rising rates of chronic disease.',
					'For context on where this occupation sits within allied health pay generally, another growing licensed field, [physical therapy](/physical-therapist-salary), carries a median annual wage of $101,020, roughly $23,000 above radiologic technology. The gap largely tracks entry education: physical therapy requires a doctoral degree (DPT), while radiologic technology requires only an associate\'s degree and a shorter, less expensive path to a first paycheck. Neither figure predicts what a specific person will earn; both describe national medians for occupations with real variation by state, employer, and specialty certification.',
					'BLS attributes projected growth in this occupation mainly to demographic trends: an aging population that needs more diagnostic imaging for conditions like falls, fractures, and chronic disease, combined with continued reliance on x-ray and CT imaging as a first-line diagnostic tool across emergency medicine, orthopedics, and primary care. That is a demand-side projection about the healthcare system as a whole, not a forecast about any individual technologist\'s job security, employer, or pay trajectory, and readers evaluating a specific offer should weigh it alongside local job market conditions rather than as a standalone guarantee.',
				],
			},
		],
		faq: [
			{
				question: 'What is the average radiology tech salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for radiologic technologists and technicians was $77,660 in May 2024. "Median" means half of workers in the role earned more and half earned less. BLS does not publish a separate median hourly wage for this specific occupation on this page; the $37.97 hourly figure shown in the page\'s Quick Facts box covers a broader, combined "Radiologic and MRI Technologists" grouping, not radiologic technologists alone.',
			},
			{
				question: 'What is the highest-paying setting for a radiology tech?',
				answer: 'Among the industry categories BLS tracks for May 2024, federal government employment (excluding the postal service) paid the highest median at $93,970, ahead of outpatient care centers ($81,000), hospitals ($78,560), medical and diagnostic laboratories ($76,770), and offices of physicians ($66,060).',
			},
			{
				question: 'How much do the lowest- and highest-paid radiology techs make?',
				answer: 'BLS reports that the bottom 10% of radiologic technologists and technicians earned less than $52,360 a year in May 2024, while the top 10% earned more than $106,990. Additional specialty certifications, such as CT or mammography on top of a base radiography credential, are one plausible factor separating higher earners within the field, though BLS itself does not quantify this.',
			},
			{
				question: 'Do radiology techs need to be certified?',
				answer: 'BLS states that most states require radiologic technologists to be licensed or certified, though requirements vary by state, via completing an accredited program and then passing a state exam or earning certification from a credentialing organization. The American Registry of Radiologic Technologists (ARRT) is the field\'s primary credentialing body in practice, confirmed independently of the BLS page (see Sources).',
			},
			{
				question: 'Is radiologic technology a growing field?',
				answer: 'BLS projects 4% employment growth for radiologic technologists and technicians from 2024 to 2034, faster than the roughly 3% average projected across all occupations, adding an estimated 9,800 jobs over the decade.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Radiologic and MRI Technologists (accessed 2026-08-04, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/radiologic-technologists.htm' },
			{ label: 'American Registry of Radiologic Technologists (ARRT): Radiography credential', url: 'https://www.arrt.org/pages/earn-arrt-credentials/credential-options/radiography' },
			{ label: 'American Registry for Diagnostic Medical Sonography (ARDMS), operated by Inteleos', url: 'https://www.ardms.org/' },
			{ label: 'Joint Review Committee on Education in Radiologic Technology (JRCERT): program accreditation standards', url: 'https://www.jrcert.org/accreditation-for-students/' },
		],
		image: '/images/radiology-tech-salary-chart.svg',
		imageAlt: 'Bar chart showing radiologic technologist annual wage by percentile: 10th percentile $52,360, median $77,660, 90th percentile $106,990, based on BLS May 2024 data.',
	},
	{
		slug: 'crna-salary',
		category: 'Salary Guide',
		title: 'CRNA Salary: BLS Wage Data for Nurse Anesthetists (2026)',
		description: 'The median CRNA salary is $223,210 a year, the highest of any nursing role BLS tracks. Here is what drives the pay, and why entry now requires a doctorate.',
		published: '2026-08-04',
		updated: '2026-08-04',
		socCode: '29-1151',
		coreSummary: 'The median annual wage for Certified Registered Nurse Anesthetists (CRNAs) was $223,210 in May 2024, according to the Bureau of Labor Statistics, well above the $129,210 median for nurse practitioners and $128,790 for nurse midwives, the two other advanced practice nursing roles BLS tracks on the same page. Employment is projected to grow 9% from 2024 to 2034, adding roughly 4,600 jobs, and as of 2025 every accredited entry program now awards a doctoral degree rather than the master\'s degree BLS still lists as the typical entry-level education.',
		sections: [
			{
				heading: 'What CRNAs earn, and why this page needs some unpacking',
				body: [
					"BLS tracks Certified Registered Nurse Anesthetists (CRNAs) under SOC code 29-1151, and reports a median annual wage of $223,210 for May 2024, the highest of any occupation on this site so far. That figure sits on a BLS page titled \"Nurse Anesthetists, Nurse Midwives, and Nurse Practitioners,\" which covers all three advanced practice registered nurse (APRN) roles together. The page does break out a separate median wage for each: nurse practitioners at $129,210 and nurse midwives at $128,790, both well below the CRNA figure, which reflects the more extensive additional training and the surgical/procedural setting CRNAs typically work in.",
					"That combined-page structure matters for what this page can and cannot report precisely. BLS publishes 10th and 90th percentile pay figures for the three roles as a single group (the bottom 10% earned less than $98,520 and the top 10% earned more than $217,270), not broken out for CRNAs alone, and it does not publish an industry-specific wage table (hospital vs. outpatient vs. office-based) specific to nurse anesthetists either. Rather than present that combined-group range as if it described CRNA pay specifically, this page leaves those two data points out. The median wage and the employment and job-growth figures below, by contrast, are broken out by BLS at the individual-occupation level and can be attributed to CRNAs specifically.",
					"For context on how CRNA pay compares with other clinical roles that require graduate-level training beyond a bachelor's degree, see this site's guides to [pharmacist salary](/pharmacist-salary/) and [physical therapist salary](/physical-therapist-salary/), both licensed clinical professions with their own BLS-reported wage data.",
				],
			},
			{
				heading: 'What the job involves, and the path to get there',
				body: [
					'Per BLS, nurse anesthetists administer anesthesia and provide care before, during, and after surgical, therapeutic, diagnostic, and obstetrical procedures, monitoring a patient\'s vital signs and adjusting anesthesia as needed throughout. The role also involves pain management and some emergency services. Entry requires a registered nursing license, a bachelor\'s degree, and, per BLS, "1 year of experience working as [a] registered nurse in a critical care setting" before admission to an accredited nurse anesthetist program is even possible.',
					'BLS\'s quick-facts summary for this page still lists "master\'s degree" as the typical entry-level education, and that number is what this site reports as the BLS-published figure. Independently of BLS, the field\'s accrediting body, the Council on Accreditation of Nurse Anesthesia Educational Programs (COA), confirms that as of 2025 every accredited nurse anesthesia program in the country awards a doctoral degree (either a Doctor of Nursing Practice or Doctor of Nurse Anesthesia Practice) rather than a master\'s, with a minimum 36-month full-time program length. That shift happened gradually: COA required all newly matriculating students to be enrolled in a doctoral track starting in 2022, so the transition is now complete for anyone entering the field today, even though BLS\'s summary table has not yet caught up to reflect it.',
					'After finishing an accredited doctoral program, candidates sit for a national certification exam administered by the National Board of Certification and Recertification for Nurse Anesthetists (NBCRNA, an independent credentialing body, not a BLS-named source) before they can practice as a CRNA and, in most states, use that title to bill for services.',
					'One question this page deliberately does not answer with a single national figure is whether a CRNA can administer anesthesia without a supervising physician present. That depends on state law, and in some states on the specific hospital or facility\'s own policy layered on top of state law, and it has changed more than once over the past two decades as both federal Medicare rules and individual state legislatures have revisited the question. Reporting a specific count of "independent practice states" here risks going stale within a single legislative session, and different secondary sources currently report noticeably different counts for that reason. Anyone evaluating this for a specific state should confirm the current rule directly with that state\'s board of nursing rather than relying on any one article, including this one.',
				],
			},
			{
				heading: 'Job outlook, and where CRNA sits within its own occupational family',
				body: [
					'BLS projects 9% employment growth for nurse anesthetists specifically from 2024 to 2034, adding roughly 4,600 jobs (from 53,800 to about 58,500). That is a much faster than average pace by BLS\'s own definition for this projection cycle, which classifies 7% growth or higher as "much faster than the average" against an all-occupation average of about 3%. It is worth noting, though, that CRNA growth is the slowest of the three related roles on this BLS page: nurse practitioners are projected to grow 40% (adding roughly 128,400 jobs) and nurse midwives 11% (adding about 900 jobs) over the same decade, even though CRNA pay is the highest of the three. Higher pay and faster growth do not automatically move together within the same occupational family.',
					'BLS attributes overall APRN employment growth to rising demand for healthcare services tied to an aging population and the growing prevalence of chronic disease, plus a broader shift toward team-based care models in hospitals, physician offices, and ambulatory settings, along with state-level changes expanding what services APRNs are legally permitted to perform. BLS does not publish demand drivers specific to nurse anesthetists alone beyond that general APRN-wide explanation, so this page reports it as such rather than implying it is CRNA-specific reasoning.',
				],
			},
			{
				heading: 'Reading pay figures for this occupation elsewhere',
				body: [
					'Readers comparing this $223,210 median against numbers on other sites should check what each figure actually measures. BLS wage data comes from its Occupational Employment and Wage Statistics survey, which collects reports directly from employer payroll records across a large national sample. Job-search and salary-aggregator sites often rely instead on self-reported figures from a smaller, self-selected pool of users, a collection method that tends to skew toward whoever chooses to submit a number, and that can run noticeably higher or lower than the employer-reported BLS median depending on the site and time period.',
					'The $223,210 figure is also a single national number, not a state or metro-area figure. BLS does publish more granular state and metropolitan-area wage tables for individual occupations through its separate Occupational Employment and Wage Statistics program, outside the Occupational Outlook Handbook page this article draws from, and pay for this role varies by region for the same general reasons pay varies for most occupations: local cost of living, hospital system density, and regional supply of doctorally trained anesthesia providers relative to surgical volume.',
				],
			},
		],
		faq: [
			{
				question: 'How much do CRNAs make?',
				answer: 'The Bureau of Labor Statistics reports a median annual wage of $223,210 for nurse anesthetists in May 2024, the highest median of any of the three advanced practice nursing roles (nurse anesthetists, nurse practitioners, nurse midwives) BLS tracks on the same data page.',
			},
			{
				question: 'Do CRNAs need a doctorate degree?',
				answer: 'BLS\'s own summary table still lists a master\'s degree as the typical entry-level education for this occupation. Independently of BLS, the field\'s accrediting body (COA) confirms that as of 2025 every accredited nurse anesthesia program awards a doctoral degree (DNP or DNAP) rather than a master\'s, a shift that has been phasing in since 2022.',
			},
			{
				question: 'Is CRNA a growing career?',
				answer: 'BLS projects 9% employment growth for nurse anesthetists from 2024 to 2034, classified as much faster than average, adding roughly 4,600 jobs. That is slower than the 40% growth BLS projects for nurse practitioners over the same period, even though CRNA pay is higher.',
			},
			{
				question: 'How does CRNA pay compare to nurse practitioner or nurse midwife pay?',
				answer: 'BLS reports a May 2024 median annual wage of $223,210 for nurse anesthetists, compared with $129,210 for nurse practitioners and $128,790 for nurse midwives, the two other roles covered on the same BLS occupational page.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Nurse Anesthetists, Nurse Midwives, and Nurse Practitioners (accessed 2026-08-04, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners.htm' },
			{ label: 'Council on Accreditation of Nurse Anesthesia Educational Programs (COA): doctoral entry-to-practice requirement', url: 'https://www.coacrna.org/about-coa/requirements-to-practice-as-a-nurse-anesthetist-in-the-united-states/' },
			{ label: 'National Board of Certification and Recertification for Nurse Anesthetists (NBCRNA)', url: 'https://www.nbcrna.com/about-us/history' },
		],
		image: '/images/crna-salary-chart.svg',
		imageAlt: 'Bar chart comparing May 2024 median annual wage across three related APRN roles: Nurse Anesthetists (CRNA) $223,210, Nurse Practitioners $129,210, Nurse Midwives $128,790, based on BLS data.',
	},
	{
		slug: 'nurse-practitioner-salary',
		category: 'Salary Guide',
		title: 'Nurse Practitioner Salary: BLS Wage Data and Job Outlook (2026)',
		description: 'BLS puts the median nurse practitioner salary at $129,210 a year, with 40% projected job growth through 2034, the fastest of any advanced practice nursing role it tracks.',
		published: '2026-08-04',
		updated: '2026-08-04',
		socCode: '29-1171',
		coreSummary: 'The median annual wage for nurse practitioners was $129,210 in May 2024, according to the U.S. Bureau of Labor Statistics. Employment is projected to grow 40% from 2024 to 2034, adding roughly 128,400 jobs, the fastest projected growth of any of the three advanced practice nursing roles BLS tracks on the same data page, and well above the roughly 3% average projected across all occupations.',
		sections: [
			{
				heading: 'What nurse practitioners earn nationally',
				body: [
					'BLS tracks nurse practitioners under SOC code 29-1171 and reported a median annual wage of $129,210 for May 2024. That figure sits on the same BLS Occupational Outlook Handbook page as [Certified Registered Nurse Anesthetists (CRNAs)](/crna-salary/) and nurse midwives, titled "Nurse Anesthetists, Nurse Midwives, and Nurse Practitioners." The page does break out a separate median wage for each of the three roles: CRNAs at $223,210 and nurse midwives at $128,790, so the nurse practitioner figure above is specific to this occupation, not a blended average across all three.',
					'Where the shared page stops being occupation-specific is percentiles and industry breakdowns. BLS publishes 10th and 90th percentile pay for the three roles only as a combined group (the bottom 10% earned less than $98,520 and the top 10% earned more than $217,270), not broken out for nurse practitioners alone, and it does not publish a nurse-practitioner-specific industry wage table either. Presenting that combined-group range as if it described nurse practitioner pay specifically would overstate what the page actually supports, so this page leaves those two figures out rather than mislabel them.',
					'BLS wage data comes from its Occupational Employment and Wage Statistics survey, which collects figures directly from employer payroll records across a large national sample, not from self-reported submissions the way many salary-aggregator sites operate. That distinction is worth keeping in mind when this $129,210 median is compared against numbers elsewhere, including the specialty-specific figures discussed further down this page. The $129,210 figure is also a single national number, not a state or metro-area one; BLS publishes more granular state and metropolitan-area wage tables for this occupation through its separate Occupational Employment and Wage Statistics program, outside the Occupational Outlook Handbook page cited here, and actual pay varies by region for the usual reasons: local cost of living, the mix of employer types in an area, and how tight the local labor market for advanced practice nurses happens to be.',
				],
			},
			{
				heading: 'What the job involves, and how someone becomes one',
				body: [
					'Per BLS, nurse practitioners coordinate patient care and may provide primary and specialty care, which can include ordering, performing, and interpreting diagnostic tests; diagnosing and treating acute and chronic conditions; and, depending on the state, prescribing medications. Entry requires an active registered nursing license plus a graduate degree from an accredited nurse practitioner program, followed by national certification in a chosen population focus, such as family, adult-gerontology, psychiatric-mental health, or pediatric care.',
					'BLS lists "master\'s degree" as the typical entry-level education for this role, and unlike nurse anesthetists, that has not changed: the National Organization of Nurse Practitioner Faculties (NONPF) set a target in 2018, reaffirmed in 2023, to shift all entry-level NP education to the Doctor of Nursing Practice (DNP) level by 2025, but no state licensing board has adopted that as a licensure requirement, and the great majority of nurse practitioner programs nationally remain master\'s-level as of 2026. A separate, earlier push toward doctoral-level nursing education dates back to a 2004 position statement from the American Association of Colleges of Nursing (AACN), which targeted 2015 and also went unenforced. A DNP is available today and some employers may prefer it, but for actually becoming licensed as a nurse practitioner, it remains additional rather than required.',
					'After finishing a graduate program, candidates sit for a national certification exam. Two independent, non-BLS-named certifying bodies operate in this space: the American Academy of Nurse Practitioners Certification Board (AANPCB) and the American Nurses Credentialing Center (ANCC), and which one a candidate uses generally depends on the population focus of their graduate program. Certification, together with state licensure as an advanced practice registered nurse, is what allows someone to practice and use the "nurse practitioner" title.',
				],
			},
			{
				heading: 'Job outlook, and how much scope of practice varies by state',
				body: [
					'BLS projects 40% employment growth for nurse practitioners specifically from 2024 to 2034, adding roughly 128,400 jobs (from 320,400 to about 448,800). That is the fastest growth of the three related roles on this BLS page, well ahead of the 9% projected for CRNAs and 11% for nurse midwives, and far above the roughly 3% average BLS projects across all occupations for the same period. BLS attributes overall demand for advanced practice registered nurses to an aging population, rising rates of chronic disease, and a broader shift toward team-based primary and specialty care, without breaking that explanation out separately by role.',
					'One thing this national wage and growth data cannot capture is how much a nurse practitioner\'s day-to-day scope of practice depends on the state they work in. The American Association of Nurse Practitioners (AANP), an independent membership organization rather than a BLS-affiliated source, classifies roughly 30 states plus Washington, D.C. as granting nurse practitioners "full practice authority," meaning they can evaluate, diagnose, and prescribe under the exclusive authority of the state board of nursing without a mandated physician agreement, up from 22 states in 2020. The remaining states fall under "reduced" or "restricted" practice categories that require some form of physician collaboration or supervision. This changes through state legislation fairly often, so a specific state\'s current classification is worth confirming directly through AANP\'s state practice environment map rather than any single article, including this one.',
					'BLS does not attribute nurse practitioner demand growth to the practice-authority trend directly, but the two are widely discussed together in health policy circles: as more states expand what nurse practitioners are legally permitted to do without a supervising physician, rural and underserved areas facing physician shortages have leaned more heavily on nurse practitioners to fill primary-care gaps. That is a structural, system-level explanation for the projection, not a guarantee about any individual practitioner\'s job security, pay trajectory, or employer, and it should be weighed alongside local job-market conditions rather than treated as a standalone forecast for one person\'s career.',
				],
			},
			{
				heading: 'Why specialty and setting move pay more than the national median suggests',
				body: [
					'The $129,210 BLS median is a single national figure across every nurse practitioner population focus and setting combined. Several nursing-industry and job-board sites report meaningfully higher pay for specific specialties, psychiatric-mental health nurse practitioners and acute-care nurse practitioners are commonly cited as being among the higher-paid tracks, for instance, but those figures come from self-reported salary surveys and aggregator estimates rather than from BLS\'s employer-reported OEWS survey, and different sites report different dollar amounts for the same specialty. This page reports that specialty is a real factor in pay without adopting any single site\'s specific numbers as fact, since BLS itself does not publish a specialty-level wage breakdown for this occupation.',
					'For comparison with an adjacent advanced-practice clinical role that also diagnoses and treats patients under a graduate-level credential, see this site\'s guide to [what a physician assistant does](/what-does-a-physician-assistant-do/), a role with its own separate BLS wage data and a different, physician-collaborative supervision model in most states. Neither this page nor that one predicts what a specific person will earn; both describe national medians for occupations with real variation by state, employer, specialty, and years of experience.',
				],
			},
		],
		faq: [
			{
				question: 'How much do nurse practitioners make?',
				answer: 'The U.S. Bureau of Labor Statistics reports a median annual wage of $129,210 for nurse practitioners in May 2024. BLS does not publish a 10th/90th percentile range specific to nurse practitioners alone on this page; the percentile figures it does publish cover a combined group of nurse anesthetists, nurse midwives, and nurse practitioners together.',
			},
			{
				question: 'Do nurse practitioners need a doctorate?',
				answer: 'No. BLS lists a master\'s degree as the typical entry-level education, and as of 2026 no state licensing board requires a Doctor of Nursing Practice (DNP) for NP licensure, even though the National Organization of Nurse Practitioner Faculties set an unenforced 2018 target (reaffirmed 2023) to move all entry-level NP education to the doctoral level by 2025. Most nurse practitioner programs remain master\'s-level.',
			},
			{
				question: 'Is nurse practitioner a growing career?',
				answer: 'BLS projects 40% employment growth for nurse practitioners from 2024 to 2034, adding roughly 128,400 jobs. That is the fastest projected growth of the three advanced practice nursing roles (nurse anesthetists, nurse midwives, nurse practitioners) BLS tracks on the same data page, and well above the roughly 3% average projected across all occupations.',
			},
			{
				question: 'Can nurse practitioners practice without a supervising physician?',
				answer: 'It depends entirely on the state. The American Association of Nurse Practitioners classifies roughly 30 states plus Washington, D.C. as granting "full practice authority," while the rest require some form of physician collaboration or supervision. State rules change through legislation fairly regularly, so a specific state\'s current status is best confirmed through AANP\'s state practice environment map rather than a fixed count in any one article.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Nurse Anesthetists, Nurse Midwives, and Nurse Practitioners (accessed 2026-08-04, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners.htm' },
			{ label: 'American Association of Nurse Practitioners (AANP): State Practice Environment', url: 'https://www.aanp.org/advocacy/state/state-practice-environment' },
			{ label: 'American Academy of Nurse Practitioners Certification Board (AANPCB)', url: 'https://www.aanpcert.org/' },
			{ label: 'National Organization of Nurse Practitioner Faculties (NONPF): DNP-by-2025 position statement', url: 'https://www.nonpf.org/' },
		],
		image: '/images/nurse-practitioner-salary-chart.svg',
		imageAlt: 'Bar chart comparing projected employment growth 2024-34: all occupations average 3%, Nurse Anesthetists (CRNA) 9%, Nurse Midwives 11%, Nurse Practitioners 40%, based on BLS data.',
	},
];
