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
];
