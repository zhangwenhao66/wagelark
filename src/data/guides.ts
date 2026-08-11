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
			{
				question: 'What year is the BLS OEWS data on this page from?',
				answer: "This guide cites the U.S. Bureau of Labor Statistics Occupational Outlook Handbook page for radiologic and MRI technologists, which draws on Occupational Employment and Wage Statistics (OEWS) data from May 2024, the most recent year BLS had published as of this guide's last update. BLS's OEWS program also tracks total nationwide employment for the occupation, but this page reports the median wage, percentile spread, and projected job growth figures above rather than a separate current employment headcount.",
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
	{
		slug: 'physician-assistant-salary',
		category: 'Salary Guide',
		title: 'Physician Assistant Salary: BLS Wage Data by Percentile (2026)',
		description: 'BLS puts the median physician assistant salary at $133,260 a year. See the wage range by percentile and employer type, and how it compares to NP and CRNA pay.',
		published: '2026-08-04',
		updated: '2026-08-04',
		socCode: '29-1071',
		coreSummary: 'The median annual wage for physician assistants was $133,260 in May 2024, according to the U.S. Bureau of Labor Statistics. The bottom 10% earned less than $95,240 while the top 10% earned more than $182,200, and government employers paid the highest industry median, at $151,470. Employment is projected to grow 20% from 2024 to 2034, among the faster projected growth rates of any occupation this site tracks.',
		sections: [
			{
				heading: 'What physician assistants earn, by percentile',
				body: [
					'The Bureau of Labor Statistics tracks physician assistant pay under SOC code 29-1071 through its Occupational Employment and Wage Statistics (OEWS) program, which draws on employer payroll reports rather than self-submitted figures. The most recent published data, from May 2024, put the median annual wage at $133,260, or $64.07 an hour.',
					'That median sits inside a fairly wide range. The bottom 10% of physician assistants earned less than $95,240 a year, while the top 10% earned more than $182,200, a spread of roughly $87,000. Unlike some occupations on this site where BLS only publishes a percentile range for a combined group of related roles, this page reports a range specific to physician assistants alone, since BLS breaks this occupation out individually.',
					'For what the job itself actually involves day to day, rather than what it pays, see this site\'s guide to [what a physician assistant does](/what-does-a-physician-assistant-do/), which covers duties, specialties, and the education path in more detail than this page does.',
				],
			},
			{
				heading: 'Why this figure can look different on other salary sites',
				body: [
					'Readers comparing this $133,260 median against a number seen elsewhere should check what that other figure actually measures. BLS wage data comes from its Occupational Employment and Wage Statistics survey, which collects reports directly from employer payroll records across a large national sample. Job-search and salary-aggregator sites often rely instead on figures self-reported by a smaller, self-selected pool of users, or on internal listings data, a collection method that can run noticeably higher or lower than the employer-reported BLS median depending on the site, the time period, and how recently it was updated.',
					'Neither approach is inherently wrong, but they answer slightly different questions. BLS describes what physician assistants nationally were actually paid, on employer records, as of May 2024. A self-reported aggregator describes what a subset of site visitors chose to report, at whatever moment the site last refreshed its figures, which can shift from month to month. For a figure meant to hold steady as a reference point, this page uses the BLS number specifically because of that employer-record methodology.',
				],
			},
			{
				heading: 'Why the employer you work for changes the number',
				body: [
					'BLS breaks out May 2024 wages by industry, and the gap between the highest- and lowest-paying categories is large enough to matter when comparing offers. Government employment (excluding state and local education and hospitals) paid the highest median, at $151,470, followed by outpatient care centers at $147,650 and hospitals (state, local, and private) at $136,630. Offices of physicians, the setting many people associate most closely with the role, paid a median of $129,640, close to but still below the national median. Educational services paid the least of the five categories BLS tracks, at $127,900.',
					'That ordering runs somewhat counter to a common assumption that private physician practices pay the most. One plausible factor, which BLS does not explain on this page, is that government and outpatient-center employers often serve higher patient volumes or operate under standardized pay scales that set a wage floor above what a smaller private practice can offer per provider. That is this article\'s inference, not a claim BLS itself makes.',
				],
			},
			{
				heading: 'How PA pay compares to nearby advanced-practice and clinical roles',
				body: [
					'Physician assistant pay sits in the middle of a cluster of graduate-trained clinical roles this site tracks. [Nurse practitioners](/nurse-practitioner-salary/), a role BLS reports separately, had a lower May 2024 median of $129,210, despite both occupations typically requiring a master\'s degree for entry. [Pharmacists](/pharmacist-salary/), who require a doctoral degree (PharmD), had a somewhat higher median of $137,480. [Certified Registered Nurse Anesthetists](/crna-salary/), who now require a doctoral degree for new entrants, had a median of $223,210, well above all three of the other roles.',
					'The pattern across these four occupations is not a clean line from "more required education" to "more pay": physician assistants and nurse practitioners both typically enter with a master\'s degree, yet PA pay is meaningfully higher, and pharmacists require a doctorate but earn less than CRNAs by a wide margin. Setting, procedure mix, and the maturity of each field\'s independent-practice authority likely all play a role, though BLS does not publish a study explaining the specific gap between any two of these occupations, so readers should treat this comparison as descriptive rather than a mechanism BLS has confirmed.',
					'How much clinical autonomy a PA has also varies by state, in the same way it does for nurse practitioners. This site\'s [career guide](/what-does-a-physician-assistant-do/) notes that a PA\'s scope of practice depends on both state law and the supervising physician\'s practice agreement, and that this has been an active area of state-level legislative change in recent years. Wage data does not capture that variation directly, but broader autonomy in a given state can plausibly affect what a practice is willing to pay, alongside the setting and industry factors covered above.',
				],
			},
			{
				heading: 'Job outlook and what it means for pay',
				body: [
					'BLS projects 20% employment growth for physician assistants from 2024 to 2034, classified as much faster than average against an all-occupation baseline of roughly 3%, adding an estimated 33,200 jobs to a base of 162,700. That is a faster projected growth rate than pharmacists (5%) or CRNAs (9%), though slower than nurse practitioners (40%), the fastest-growing role in this cluster.',
					'BLS attributes projected PA growth mainly to the broader demand drivers common across advanced-practice clinical roles: an aging population needing more healthcare services, rising rates of chronic disease, and continued expansion of team-based care models that use PAs and nurse practitioners to extend physician capacity. Faster-than-average growth in a licensed, credential-gated occupation tends to support wage growth over time, since programs cannot expand the supply of qualified graduates as quickly as demand can rise, though BLS does not publish a forecast for future wage levels, only employment counts.',
					'Entry to the field requires a master\'s degree from an accredited PA program and passing the national certifying exam; this site\'s [career guide](/what-does-a-physician-assistant-do/) covers that path, along with the day-to-day duties and specialty mix, in full.',
				],
			},
			{
				heading: 'What this national figure does not cover',
				body: [
					'The $133,260 median is a single national number, not a state or metro-area figure. PA pay varies by region for reasons common to most licensed professions: local cost of living, the concentration of hospital systems and outpatient networks, and regional supply of PA-program graduates relative to open positions. BLS publishes more granular state and metropolitan-area wage tables for individual occupations through its separate Occupational Employment and Wage Statistics program, outside the Occupational Outlook Handbook page this article draws from; readers who need a figure for a specific state or city should consult that more detailed data set rather than assume the national median applies evenly everywhere.',
				],
			},
		],
		faq: [
			{
				question: 'What is the average physician assistant salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for physician assistants was $133,260 in May 2024 ($64.07 per hour). "Median" means half of PAs earned more and half earned less; BLS data comes from employer payroll reports rather than self-submitted figures.',
			},
			{
				question: 'What is the highest-paying setting for a physician assistant?',
				answer: 'Among the industry categories BLS tracks for May 2024, government employment (excluding state/local education and hospitals) paid the highest median at $151,470, ahead of outpatient care centers ($147,650), hospitals ($136,630), offices of physicians ($129,640), and educational services ($127,900).',
			},
			{
				question: 'How much do the lowest- and highest-paid physician assistants make?',
				answer: 'BLS reports that the bottom 10% of physician assistants earned less than $95,240 a year in May 2024, while the top 10% earned more than $182,200, a range specific to this occupation rather than a combined group figure.',
			},
			{
				question: 'How does PA pay compare to nurse practitioner pay?',
				answer: 'BLS reports a May 2024 median annual wage of $133,260 for physician assistants, compared with $129,210 for nurse practitioners, even though both roles typically require a master\'s degree for entry. Physician assistant employment is also projected to grow more slowly (20%) than nurse practitioner employment (40%) from 2024 to 2034.',
			},
			{
				question: 'Is physician assistant a growing career?',
				answer: 'BLS projects 20% employment growth for physician assistants from 2024 to 2034, classified as much faster than average, adding an estimated 33,200 jobs.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Physician Assistants (accessed 2026-08-04, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/physician-assistants.htm' },
		],
		image: '/images/physician-assistant-salary-chart.svg',
		imageAlt: 'Bar chart showing physician assistant annual wage by percentile: 10th percentile $95,240, median $133,260, 90th percentile $182,200, based on BLS May 2024 data.',
	},
	{
		slug: 'surgical-tech-salary',
		category: 'Salary Guide',
		title: 'Surgical Tech Salary: BLS Wage Data and Job Outlook (2026)',
		description: 'BLS puts the median surgical tech salary at $62,830, below what self-reported sites show. See the real BLS number and what CST certification requires.',
		published: '2026-08-05',
		updated: '2026-08-05',
		socCode: '29-2055',
		coreSummary: 'The median annual wage for surgical technologists was $62,830 in May 2024, according to the U.S. Bureau of Labor Statistics, compared with $60,290 for the closely related surgical assistant role. BLS projects 4.5% employment growth for surgical technologists from 2024 to 2034, adding about 5,200 jobs on top of a 115,600-person workforce, and entry typically requires a certificate or associate\'s degree rather than a four-year degree.',
		sections: [
			{
				heading: 'What BLS actually reports for surgical tech pay',
				body: [
					'Surgical technologists prepare the operating room, set up the sterile back table, pass instruments and supplies to the surgical team, and maintain the sterile field throughout a procedure. BLS tracks this role under SOC code 29-2055, and its own description on the Occupational Outlook Handbook is brief: "surgical assistants and technologists help with surgical operations." That one-line summary covers a role that is procedural and safety-driven, centered on keeping the right instrument ready and the environment sterile, rather than performing surgical steps directly.',
					'BLS publishes this occupation\'s Occupational Outlook Handbook page under the combined title "Surgical Assistants and Technologists," reporting a combined median annual wage of $62,480 and 141,000 combined jobs for May 2024. The narrative page does break out pay by specific role, though: the median annual wage for surgical technologists was $62,830, while the median for surgical assistants was $60,290, both May 2024. The separate BLS Employment Projections National Employment Matrix (Table 1.2), a different BLS data product from the Handbook narrative, confirms the same $62,830 figure tied specifically to SOC 29-2055 and reports a 2024 workforce of 115,600 surgical technologists, versus 25,300 surgical assistants under SOC 29-9093.',
					'This particular Handbook page does not publish a 10th/90th percentile wage split for either role, unlike some other occupations this site covers. Readers who want that variance would need the BLS Occupational Employment and Wage Statistics (OEWS) tables directly, a separate, more granular data product. It is also worth flagging a real gap between this number and what self-reported salary sites show: search results for "surgical tech salary" surface figures like $107,000 for New York City on ZipRecruiter, roughly 70% above the BLS national median. That gap is not a data error on either side; it reflects self-reported figures skewed toward a specific high-cost metro versus BLS\'s employer-reported, nationally representative survey. Neither number is "wrong" for its own scope, but they answer different questions.',
				],
			},
			{
				heading: 'Surgical technologist and surgical assistant are not the same job',
				body: [
					'Despite the similar pay and BLS\'s combined Handbook page, the two roles have a meaningfully different scope of practice. Surgical technologists focus on instrumentation and the sterile field: setting up the operating room, passing instruments, handling specimens, and supporting the team without performing surgical steps themselves. Surgical assistants (sometimes called surgical first assistants) take on a more hands-on role directly supporting the surgeon, which can include retracting tissue, controlling bleeding, suturing, and, depending on state regulation and the assistant\'s credentials, performing portions of a procedure under the surgeon\'s direct supervision. This distinction is a general industry description confirmed by academic medical sources such as Mayo Clinic College of Medicine and Science, not a claim BLS itself makes on its Handbook page.',
					'That wider scope makes it somewhat notable that the national median pay for surgical assistants ($60,290) is actually lower than for surgical technologists ($62,830), despite the more expansive duties. BLS does not explain this gap; it publishes the two medians without commentary. One plausible, unverified factor is that the surgical assistant workforce is much smaller (25,300 vs. 115,600) and includes a wider range of entry pathways, since some assistants enter through nursing or physician-assistant training rather than a dedicated surgical-assistant program, which could pull the reported median in either direction depending on the underlying credential mix; that is this article\'s inference, not a BLS-stated explanation.',
					'BLS\'s own numbers show that surgical technologist is both the larger job market (about 4.5 times more workers) and the role most surgical-technology training programs are built to enter directly, while surgical assistant credentials are typically layered on after establishing a technologist or nursing background.',
				],
			},
			{
				heading: 'Certification and how people enter the field',
				body: [
					'BLS lists the typical entry-level education for this occupation as a postsecondary nondegree award, meaning a certificate program rather than a full associate degree, with no additional work experience or on-the-job training required beyond that program. In practice, surgical technology programs are accredited either by the Commission on Accreditation of Allied Health Education Programs (CAAHEP) or the Accrediting Bureau of Health Education Schools (ABHES), and graduating from one of those accredited programs (or completing equivalent military surgical-technology training) is the standard eligibility path into the field\'s primary credential.',
					'That credential is the Certified Surgical Technologist (CST), administered by the National Board of Surgical Technology and Surgical Assisting (NBSTSA) and described by NBSTSA as the most nationally recognized surgical technology credential in the U.S. Maintaining it requires earning 30 continuing education credits (including 4 defined as live) within a two-year renewal cycle, or 60 credits across four years, or retaking the exam. BLS states that employers may require or prefer certification and that some states regulate these workers directly — requirements vary by state, and this page does not claim a single national licensing standard.',
					'Within the broader "postsecondary nondegree award" entry tier this site covers, surgical technologist pay sits well above [phlebotomists](/how-to-become-a-phlebotomist), whose median annual wage is $43,660. Both roles share the same typical entry credential level, but the operating-room setting and CST certification requirement appear to carry a real pay premium within that tier, even though BLS itself does not attribute the gap to any single cause.',
				],
			},
			{
				heading: 'Job outlook and where this fits among allied health pay',
				body: [
					'The BLS Employment Projections National Employment Matrix projects 4.5% employment growth for surgical technologists specifically from 2024 to 2034, adding about 5,200 jobs on top of a 2024 base of 115,600, with roughly 7,000 average annual openings once retirements and occupational transfers are included. That is faster than the roughly 3% growth projected across all occupations combined, though BLS does not publish a stated explanation for the growth on this occupation\'s Handbook page the way it sometimes does for other roles; rising surgical volume tied to an aging population is a plausible, unverified factor rather than a claim BLS makes directly.',
					'Compared with [radiologic technologists](/radiology-tech-salary), another associate-degree-or-certificate-level allied health role that supports physicians rather than practicing independently, surgical technologists earn a lower national median ($62,830 vs. $77,660) but face a similar growth rate (4.5% vs. 4%). The gap in pay likely tracks entry credential depth more than growth outlook: radiologic technology typically requires a full associate\'s degree, while surgical technology\'s typical entry point, a postsecondary certificate, is usually a shorter and less expensive path to a first paycheck.',
					'None of these figures predict what a specific person will earn. They describe national medians and projections for occupations with real variation by state, employer setting, and individual certification, and readers comparing a specific job offer against these numbers should weigh local market conditions alongside the national baseline rather than treating either as a guarantee.',
				],
			},
		],
		faq: [
			{
				question: 'What is the average surgical tech salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for surgical technologists (SOC 29-2055) was $62,830 in May 2024. This is BLS\'s employer-reported, nationally representative figure; some self-reported salary sites show much higher numbers because they weight toward specific high-cost metro areas rather than the national median.',
			},
			{
				question: 'Is a surgical technologist the same as a surgical assistant?',
				answer: 'No. Surgical technologists focus on instrumentation and maintaining the sterile field, while surgical assistants take on a more hands-on role directly supporting the surgeon, such as retracting tissue or suturing, depending on state regulation and credentials. BLS reports these as separate SOC codes (29-2055 and 29-9093) with close but distinct median pay: $62,830 versus $60,290 in May 2024.',
			},
			{
				question: 'What is the highest- and lowest-paid range for surgical techs?',
				answer: 'BLS does not publish a 10th/90th percentile wage breakdown for this specific occupation on its Occupational Outlook Handbook page. Readers who need that range would need to consult the BLS Occupational Employment and Wage Statistics (OEWS) tables directly, which report percentile data as a separate, more granular data product.',
			},
			{
				question: 'Do you need certification to be a surgical technologist?',
				answer: 'BLS states that employers may require or prefer certification and that some states regulate these workers, though requirements vary by state. In practice, the Certified Surgical Technologist (CST) credential from the National Board of Surgical Technology and Surgical Assisting (NBSTSA) is the field\'s most nationally recognized certification, and it typically requires graduating from a CAAHEP- or ABHES-accredited program.',
			},
			{
				question: 'Is surgical technology a growing field?',
				answer: 'BLS Employment Projections data shows 4.5% employment growth for surgical technologists specifically from 2024 to 2034, adding about 5,200 jobs on top of a 2024 workforce of 115,600, with roughly 7,000 average annual openings once retirements and career changes are included.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Surgical Assistants and Technologists (accessed 2026-08-05, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/surgical-technologists.htm' },
			{ label: 'BLS Employment Projections: Occupational projections and worker characteristics, Table 1.2 (2024-34 release)', url: 'https://www.bls.gov/emp/tables/occupational-projections-and-characteristics.htm' },
			{ label: 'National Board of Surgical Technology and Surgical Assisting (NBSTSA): CST Certification', url: 'https://www.nbstsa.org/cst-certification' },
			{ label: 'Mayo Clinic College of Medicine and Science: Surgical First Assistant Career Overview', url: 'https://college.mayo.edu/academics/explore-health-care-careers/careers-a-z/surgical-first-assistant/' },
		],
		image: '/images/surgical-tech-salary-chart.svg',
		imageAlt: 'Bar chart comparing median annual wage of surgical technologists ($62,830) and surgical assistants ($60,290), based on BLS May 2024 data.',
	},
	{
		slug: 'pharmacy-technician-salary',
		category: 'Salary Guide',
		title: 'Pharmacy Technician Salary: BLS Wage Data by Percentile (2026)',
		description: 'BLS reports a $43,460 median pharmacy technician salary. See the full wage range by percentile and by industry, from retail pharmacies to hospitals.',
		published: '2026-08-05',
		updated: '2026-08-05',
		socCode: '29-2052',
		coreSummary: 'The median annual wage for pharmacy technicians was $43,460 in May 2024, according to the U.S. Bureau of Labor Statistics. The bottom 10% earned less than $35,100 and the top 10% earned more than $59,450, a comparatively narrow spread for an occupation that typically requires only a high school diploma to enter. Pay depends heavily on setting: ambulatory healthcare services paid the highest industry median at $49,920, about $12,000 above the $37,900 median at pharmacies and drug retailers.',
		sections: [
			{
				heading: 'What pharmacy technicians actually earn, by percentile',
				body: [
					'BLS tracks pharmacy technician pay through its Occupational Employment and Wage Statistics (OEWS) program, which surveys employers directly rather than relying on self-reported figures. The most recent published data, from May 2024, puts the median annual wage at $43,460, or $20.90 an hour. Reporting pay both ways matters here more than for some occupations on this site, since pharmacy technicians are commonly scheduled by the hour rather than paid a fixed annual salary, and hours can vary by employer and by whether the role is full time or part time.',
					'The percentile spread is narrower in dollar terms than most other occupations covered here: the bottom 10% of pharmacy technicians earned less than $35,100 in May 2024, while the top 10% earned more than $59,450, a gap of about $24,350. That is still a meaningful spread relative to the median itself, more than half of it, but it is a smaller absolute range than occupations like pharmacists or actuaries, where pay climbs sharply with additional licensing or credentials. Pharmacy technicians share a much more uniform entry requirement: a high school diploma or equivalent, with most training happening on the job in under a year, or through a postsecondary certificate program at a vocational school or community college.',
				],
			},
			{
				heading: 'Pay by industry setting',
				body: [
					'BLS breaks out May 2024 pharmacy technician wages across five industry categories, and the gap between the highest- and lowest-paying settings is larger than the national percentile spread above. Ambulatory healthcare services, a category that includes outpatient clinics and infusion centers, paid the highest median at $49,920. Hospitals paid close behind at $49,310.',
					'General merchandise retailers, meaning big-box stores that operate an in-house pharmacy counter, paid a median of $46,180. Grocery and specialty food retailers paid $38,810, and pharmacies and drug retailers, the traditional chain and independent retail pharmacy setting most people associate with the job title, paid the least of the five tracked categories, at $37,900. The roughly $12,020 gap between the highest- and lowest-paying settings means the specific type of employer matters more to a pharmacy technician\'s take-home pay than it does in several other occupations this site tracks.',
				],
			},
			{
				heading: 'Job outlook: growth is real, but most annual openings come from turnover',
				body: [
					'BLS projects employment of pharmacy technicians to grow 6% from 2024 to 2034, from 490,400 to 521,800 positions, which the agency classifies as faster than the average for all occupations. That works out to a net increase of 31,500 jobs over the decade. Separately, BLS projects about 49,000 average annual openings for the occupation once the decade is averaged out, a substantially larger number than the net growth figure, because most of those openings come from replacing technicians who transfer to other occupations or leave the labor force, not from newly created positions. Readers comparing job-market numbers across sources should keep that distinction in mind: net employment growth and total annual openings measure different things.',
					'BLS attributes the demand behind both numbers to two forces: a growing and aging population that uses more prescription medication, plus rising rates of chronic conditions such as diabetes and hypertension that require ongoing prescriptions. On top of that structural demand, BLS notes that pharmacists are increasingly shifting toward direct patient-care activities, which is pushing more of the collecting, transferring, and verifying work in a pharmacy down to technicians, a role-mix shift that adds to demand for the occupation beyond population growth alone.',
				],
			},
			{
				heading: 'What it takes to get in, and how the pay compares to a pharmacist',
				body: [
					'Entry-level education for pharmacy technicians is a high school diploma or equivalent, one of the lowest bars among the occupations tracked on this site. Most states regulate pharmacy technicians in some way, and requirements can include a formal education or training program, an exam, fees, continuing education, a criminal background check, or a minimum age, though the exact mix varies significantly by state. Certification is not required everywhere, but BLS notes that some states and employers do require it, and that having it can make finding a job easier even where it is not mandatory. CareerOneStop, the resource BLS itself points readers to for details, is the place to check what a specific state actually requires rather than assuming national rules apply everywhere.',
					'That low barrier to entry is also what separates a pharmacy technician\'s pay from a pharmacist\'s. Pharmacists require a Doctor of Pharmacy (PharmD), a professional doctorate that typically takes four years after at least two years of prerequisite coursework, plus passing a national licensure exam. This site\'s [pharmacist salary guide](/pharmacist-salary/) reports a May 2024 median of $137,480, more than three times the pharmacy technician median in this article, reflecting that multi-year credentialing gap rather than a difference in day-to-day workload. For a comparison at a similarly accessible entry point, this site\'s [guide to becoming a phlebotomist](/how-to-become-a-phlebotomist/) covers another allied health role that, unlike pharmacy technicians, typically requires completing a postsecondary certificate program rather than qualifying with a high school diploma alone.',
				],
			},
		],
		faq: [
			{
				question: 'What does BLS report for the pharmacy technician salary?',
				answer: 'BLS reports a median annual pharmacy technician salary of $43,460 in May 2024, equivalent to $20.90 an hour, based on the U.S. Bureau of Labor Statistics Occupational Employment and Wage Statistics survey. Because pharmacy technicians are often scheduled hourly rather than paid a fixed salary, actual annual earnings can differ from this figure depending on how many hours a technician actually works in a given year.',
			},
			{
				question: 'Do pharmacy technicians need to be certified?',
				answer: 'It depends on the state. BLS reports that most states regulate pharmacy technicians in some way, and requirements can include a formal training program, an exam, a background check, or continuing education, though the specific mix varies by state. Certification is not universally required, but some states and employers do require it, and BLS notes it can make finding a job easier even where it isn\'t mandatory.',
			},
			{
				question: 'Which industry pays pharmacy technicians the most?',
				answer: 'Among the industry categories BLS tracks for May 2024, ambulatory healthcare services paid the highest median at $49,920, followed closely by hospitals at $49,310. Pharmacies and drug retailers, the traditional retail chain setting, paid the least of the five tracked categories, at $37,900.',
			},
			{
				question: 'Is pharmacy technician a growing occupation?',
				answer: 'BLS projects 6% employment growth for pharmacy technicians from 2024 to 2034, faster than the average for all occupations, adding a net 31,500 jobs. BLS separately projects about 49,000 average annual job openings once the decade is averaged out, though most of those openings come from replacing technicians who leave the occupation rather than from new positions.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Pharmacy Technicians (accessed 2026-08-05, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/pharmacy-technicians.htm' },
		],
		image: '/images/pharmacy-technician-salary-chart.svg',
		imageAlt: 'Bar chart showing pharmacy technician annual wage by percentile: 10th percentile $35,100, median $43,460, 90th percentile $59,450, based on BLS May 2024 data.',
	},
	{
		slug: 'dental-assistant-salary',
		category: 'Salary Guide',
		title: 'Dental Assistant Salary: BLS Wage Data by Percentile (2026)',
		description: 'BLS puts the median dental assistant salary at $47,300 a year. See the full wage range by percentile, by industry, and how it compares to a dental hygienist.',
		published: '2026-08-06',
		updated: '2026-08-06',
		socCode: '31-9091',
		coreSummary: 'The median annual wage for dental assistants was $47,300 in May 2024, according to the U.S. Bureau of Labor Statistics, close to the $49,500 median for all U.S. occupations that year. The bottom 10% earned less than $36,190, and the top 10% earned more than $61,780. Government employers paid the highest industry median at $53,660, while the large majority of dental assistants, who work in dentists\' offices, earned close to the occupation-wide median at $47,250.',
		sections: [
			{
				heading: 'What dental assistants actually earn, by percentile',
				body: [
					'BLS tracks dental assistant pay through its Occupational Employment and Wage Statistics (OEWS) program, which surveys employers directly rather than relying on self-reported figures. The most recent published data, from May 2024, put median annual pay at $47,300, or $22.74 an hour. For context, BLS reports the median across all U.S. occupations that year at $49,500, so dental assistants earn close to, though slightly below, the broader labor-market median rather than sitting notably above or below it.',
					'The bottom 10% of dental assistants earned less than $36,190 in May 2024, while the top 10% earned more than $61,780, a spread of roughly $25,590. That is a narrower dollar gap than several other occupations tracked on this site, including dental hygienists, whose 10th-to-90th-percentile spread runs from $66,470 to $120,060, more than double the assistant spread in dollar terms. Part of that difference traces to credentialing: dental assistants generally enter through one widely available path, either a certificate program of about a year or on-the-job training, so pay does not stretch as far based on additional formal education the way it can in fields with a licensed, degree-gated ceiling.',
				],
			},
			{
				heading: 'Pay by industry and practice setting',
				body: [
					'BLS breaks out May 2024 dental assistant wages across three industry categories, fewer than it tracks for some other occupations on this site, reflecting how concentrated the role is in a single type of employer. Government employers, excluding state and local education and hospitals, paid the highest median at $53,660. Offices of dentists, the setting where BLS notes almost all dental assistants work, paid $47,250, essentially matching the occupation-wide median. Offices of physicians paid the least of the three tracked categories, at $46,170.',
					'The gap between the highest- and lowest-paying tracked industries, about $7,490, is notably narrower than the roughly $12,020 industry gap this site\'s pharmacy technician salary guide reports for that occupation. Since the large majority of dental assistants work in dentists\' offices rather than government or physician settings, the industry breakdown matters less to a typical dental assistant\'s actual pay than it does for occupations spread more evenly across employer types.',
				],
			},
			{
				heading: 'Job outlook: growth is real, but most openings come from turnover',
				body: [
					'BLS projects employment of dental assistants to grow 6% from 2024 to 2034, from 381,900 to 406,300 positions, which the agency classifies as faster than the average for all occupations. That is a net increase of 24,400 jobs over the decade. Separately, BLS projects about 52,900 average annual openings for the occupation once the decade is averaged out, a substantially larger number than the net growth figure, because most of those openings come from replacing assistants who transfer to other occupations or leave the labor force rather than from newly created positions.',
					'BLS attributes demand for the occupation to a few converging factors: ongoing research linking oral health to general health is increasing demand for preventive dental services, and dentists continue hiring assistants to handle routine tasks so practices can run more efficiently as they grow. An aging population, combined with more people keeping their natural teeth into later life than in previous generations, is also expected to keep demand for dental care, and the assistants who support it, elevated over the projection period.',
				],
			},
			{
				heading: 'How to become one, and how the pay compares to a dental hygienist',
				body: [
					'There are several paths into the occupation, and the requirements depend heavily on the state. Some states require dental assistants to graduate from an accredited program, most commonly offered by community colleges or vocational and technical schools, and pass an exam; most of these programs take about a year and lead to a certificate or diploma, while two-year programs leading to an associate\'s degree are less common. Other states have no formal education requirement at all, and assistants learn the job through on-the-job training under a supervising dentist, hygienist, or experienced assistant. Entry-level licensing generally is not required, but states that allow assistants to perform expanded duties, such as coronal polishing, do require licensure, registration, or certification for those specific tasks. Information on those certification requirements is available from CareerOneStop, the resource BLS itself points readers to.',
					'That comparatively low and flexible barrier to entry is also what separates a dental assistant\'s pay from a dental hygienist\'s. This site\'s [dental hygienist salary guide](/dental-hygienist-salary/) reports a May 2024 median of $94,260, essentially double the dental assistant median in this article. That gap tracks a real credential difference rather than a difference in the underlying work: dental hygienists must complete an accredited associate\'s degree program, a fixed multi-year path with a licensing exam at the end, while dental assistants can typically enter through a certificate program closer to a year in length or through employer training alone. For a comparison at a similarly accessible entry point, this site\'s [pharmacy technician salary guide](/pharmacy-technician-salary/) covers another allied health role with a comparable median wage, $43,460, and an even shorter formal-education requirement of just a high school diploma or equivalent.',
				],
			},
		],
		faq: [
			{
				question: 'What is the median dental assistant salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for dental assistants was $47,300 in May 2024, equivalent to $22.74 an hour. That is close to, though slightly below, the $49,500 median BLS reports across all U.S. occupations for the same year.',
			},
			{
				question: 'Do dental assistants need a degree?',
				answer: 'It depends on the state. BLS reports that some states require graduating from an accredited program, typically a certificate or diploma program of about a year (two-year associate\'s degree programs are less common), and passing an exam. Other states have no formal education requirement, and dental assistants learn the job through on-the-job training. States that allow assistants to perform expanded duties, such as coronal polishing, do require licensure, registration, or certification for those specific tasks.',
			},
			{
				question: 'Which industry pays dental assistants the most?',
				answer: 'Among the industry categories BLS tracks for May 2024, government employers, excluding state and local education and hospitals, paid the highest median at $53,660. Offices of dentists, where almost all dental assistants work, paid $47,250. Offices of physicians paid the least of the three tracked categories, at $46,170.',
			},
			{
				question: 'How does dental assistant pay compare to dental hygienist pay?',
				answer: 'BLS reports a May 2024 median of $94,260 for dental hygienists, essentially double the $47,300 median for dental assistants. The gap tracks a real credentialing difference: hygienists must complete an accredited associate\'s degree program and pass a licensing exam, while dental assistants can typically enter through a shorter certificate program or on-the-job training.',
			},
			{
				question: 'Is dental assisting a growing occupation?',
				answer: 'BLS projects 6% employment growth for dental assistants from 2024 to 2034, faster than the average for all occupations, adding a net 24,400 jobs. BLS separately projects about 52,900 average annual job openings once the decade is averaged out, though most of those openings come from replacing assistants who leave the occupation rather than from new positions.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Dental Assistants (accessed 2026-08-06, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/dental-assistants.htm' },
		],
		image: '/images/dental-assistant-salary-chart.svg',
		imageAlt: 'Bar chart showing dental assistant annual wage by percentile: 10th percentile $36,190, median $47,300, 90th percentile $61,780, based on BLS May 2024 data.',
	},
	{
		slug: 'medical-assistant-salary',
		category: 'Salary Guide',
		title: 'Medical Assistant Salary: BLS Wage Data by Percentile (2026)',
		description: 'BLS puts the median medical assistant salary at $44,200 a year. See the wage range by percentile, by industry, and how it compares to a physician assistant.',
		published: '2026-08-06',
		updated: '2026-08-06',
		socCode: '31-9092',
		coreSummary: 'The median annual wage for medical assistants was $44,200 in May 2024, according to the U.S. Bureau of Labor Statistics, or $21.25 an hour. The bottom 10% earned less than $35,020, and the top 10% earned more than $57,830. Outpatient care centers paid the highest industry median at $47,560, while offices of other health practitioners paid the least, at $37,510. BLS projects 12% employment growth through 2034, much faster than average, with about 112,300 openings projected each year.',
		sections: [
			{
				heading: 'What medical assistants actually earn, by percentile',
				body: [
					'BLS tracks medical assistant pay through its Occupational Employment and Wage Statistics (OEWS) program, which surveys employers directly rather than relying on self-reported figures. The most recent published data, from May 2024, put median annual pay at $44,200, or $21.25 an hour, for a role that is nearly always paid hourly rather than salaried.',
					'The bottom 10% of medical assistants earned less than $35,020 in May 2024, while the top 10% earned more than $57,830, a spread of about $22,810. That is a somewhat narrower dollar range than this site\'s dental assistant salary guide reports for a comparably credentialed role ($36,190 to $61,780, a roughly $25,590 spread), though the two spreads are close enough, within a few thousand dollars of each other, that neither occupation stands out as having a meaningfully wider pay ceiling than the other.',
				],
			},
			{
				heading: 'Pay by industry and practice setting',
				body: [
					'BLS breaks out May 2024 medical assistant wages across four industry categories. Outpatient care centers paid the highest median at $47,560. Hospitals (state, local, and private) paid $45,930. Offices of physicians, the setting where BLS notes the largest share of medical assistants work, paid $43,880, close to the occupation-wide median. Offices of other health practitioners, such as chiropractors or optometrists, paid the least of the four tracked categories, at $37,510.',
					'The roughly $10,050 gap between the highest- and lowest-paying tracked industries means the specific setting a medical assistant works in moves the needle more than it does for some other allied health roles on this site. Outpatient care centers, which include facilities like urgent care clinics and ambulatory surgical centers, paid noticeably more than the smaller physician or specialist offices where a large share of the occupation is actually employed.',
				],
			},
			{
				heading: 'Job outlook: one of the fastest-growing healthcare support roles',
				body: [
					'BLS projects employment of medical assistants to grow 12% from 2024 to 2034, from 811,000 to roughly 912,200 positions, which the agency classifies as much faster than the average for all occupations. That is a net increase of 101,200 jobs over the decade, a larger absolute gain than any other occupation currently covered on this site. Separately, BLS projects about 112,300 average annual openings once the decade is averaged out, since most openings come from replacing assistants who transfer to other occupations or exit the labor force rather than from newly created positions alone.',
					'BLS attributes the growth to the expanding role of outpatient care as more medical services move out of hospitals and into physicians\' offices, outpatient care centers, and other ambulatory settings, along with continued demand from an aging population that requires more routine medical care. Because medical assistants handle both administrative and clinical tasks in these growing outpatient settings, BLS expects demand for the role to track that broader shift in where care is delivered.',
				],
			},
			{
				heading: 'Medical assistant vs. physician assistant: same name pattern, very different role',
				body: [
					'The similar-sounding job title is one of the most common points of confusion in healthcare hiring, and the pay gap between the two makes the distinction worth spelling out. A medical assistant typically needs a postsecondary certificate, and some enter the field with just a high school diploma plus on-the-job training, no state license is required in most states, and BLS reports a May 2024 median of $44,200. This site\'s [physician assistant salary guide](/physician-assistant-salary/) covers a role that shares a shortened name but almost nothing else: PAs must complete a master\'s-level program of roughly two to three years after a bachelor\'s degree, pass a national certifying exam, and hold a state license to diagnose patients and prescribe medication, and BLS reports their May 2024 median at $133,260, about three times the medical assistant figure.',
					'For a closer comparison at a similar entry point, this site\'s [dental assistant salary guide](/dental-assistant-salary/) covers another role BLS classifies under the same "postsecondary nondegree award" entry-education category, with a May 2024 median of $47,300, about $3,100 above the medical assistant median. Both roles typically take under a year to enter through a certificate program or employer training, and neither requires a state license to practice in most states, though some states require certification for specific expanded duties in each field.',
				],
			},
		],
		faq: [
			{
				question: 'What is the median medical assistant salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for medical assistants was $44,200 in May 2024, equivalent to $21.25 an hour. The bottom 10% earned less than $35,020, and the top 10% earned more than $57,830.',
			},
			{
				question: 'Do medical assistants need a degree?',
				answer: 'No degree is typically required. BLS lists the typical entry-level education as a postsecondary nondegree award, such as a certificate program, and notes that some medical assistants enter the occupation with only a high school diploma and learn through on-the-job training. Most states do not require a license to work as a medical assistant, though certain expanded duties may require state-specific certification.',
			},
			{
				question: 'Which industry pays medical assistants the most?',
				answer: 'Among the industry categories BLS tracks for May 2024, outpatient care centers paid the highest median at $47,560, followed by hospitals (state, local, and private) at $45,930 and offices of physicians at $43,880. Offices of other health practitioners paid the least of the four tracked categories, at $37,510.',
			},
			{
				question: 'Is a medical assistant the same as a physician assistant?',
				answer: 'No, despite the similar name, the two are very different roles. A medical assistant typically needs a postsecondary certificate and earns a May 2024 median of $44,200. A physician assistant must complete a master\'s-level program, pass a national exam, and hold a state license to diagnose and prescribe, and earns a May 2024 median of $133,260, about three times as much.',
			},
			{
				question: 'Is medical assisting a growing occupation?',
				answer: 'Yes. BLS projects 12% employment growth for medical assistants from 2024 to 2034, much faster than the average for all occupations, adding a net 101,200 jobs. BLS separately projects about 112,300 average annual job openings once the decade is averaged out, with most coming from workers transferring out of the occupation or leaving the labor force rather than from newly created positions.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Medical Assistants (accessed 2026-08-06 via Wayback Machine snapshot of 2026-06-29, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/medical-assistants.htm' },
		],
		image: '/images/medical-assistant-salary-chart.svg',
		imageAlt: 'Bar chart showing medical assistant annual wage by percentile: 10th percentile $35,020, median $44,200, 90th percentile $57,830, based on BLS May 2024 data.',
	},
	{
		slug: 'air-traffic-controller-salary',
		category: 'Salary Guide',
		title: 'Air Traffic Controller Salary: BLS Pay by Percentile (2026)',
		description: 'BLS puts the median air traffic controller salary at $144,580 a year. See the full wage range by percentile, by employer, and the FAA age rules that shape it.',
		published: '2026-08-09',
		updated: '2026-08-09',
		socCode: '53-2021',
		coreSummary: 'The median annual wage for air traffic controllers was $144,580 in May 2024, according to the U.S. Bureau of Labor Statistics, nearly three times the $49,500 median across all U.S. occupations that year. The bottom 10% earned less than $76,090, and the top 10% earned more than $210,410. Federal government employers, who employ the large majority of controllers, paid a median of $154,000, well above the $82,510 median for controllers working in air traffic support activities.',
		sections: [
			{
				heading: 'What air traffic controllers actually earn, by percentile',
				body: [
					'BLS tracks air traffic controller pay through its Occupational Employment and Wage Statistics (OEWS) program, which surveys employers directly rather than relying on self-reported figures. The most recent published data, from May 2024, put median annual pay at $144,580, or $69.51 an hour. That is nearly three times the $49,500 median BLS reports across all U.S. occupations for the same year, making air traffic control one of the highest-paying occupations tracked on this site.',
					'The bottom 10% of air traffic controllers earned less than $76,090 in May 2024, while the top 10% earned more than $210,410. Even the bottom of that range sits above the median for most occupations on this site, including registered-nurse-adjacent and technologist roles that themselves require years of postsecondary training. The gap between the 10th percentile and the median, about $68,490, is close in dollar terms to the gap between the median and the 90th percentile, about $65,830, which is a comparatively even split. On this site\'s flight attendant salary guide, by contrast, the top half of the range stretches more than twice as far in dollar terms as the bottom half, a difference traceable to how each occupation\'s pay actually gets set.',
				],
			},
			{
				heading: 'Why the government pays so much more than everyone else',
				body: [
					'BLS breaks out May 2024 wages for air traffic controllers across two industry categories, fewer than it tracks for most occupations on this site, because the role is unusually concentrated in a single type of employer. Federal government employers, who run essentially all of the country\'s en route centers, terminal radar approach control facilities, and major airport towers, paid a median of $154,000. Controllers working in support activities for air transportation, a category that includes contract towers at smaller airports operated by FAA-approved private companies rather than the FAA itself, earned a median of $82,510, roughly half as much.',
					'BLS does not explain the gap between the two categories on this page; it publishes the two medians without commentary. One plausible, unverified factor is that most air traffic controllers are federal employees paid under the FAA\'s own air traffic controller pay plan, a system separate from the General Schedule used by most federal civilian jobs, in which pay is tied to a facility\'s traffic complexity and to certification milestones a controller clears as they train up to full performance level, rather than to years of service alone. Contract-tower controllers, employed by private firms under FAA oversight rather than by the FAA directly, are not covered by that federal pay plan, which could account for some of the gap, but that is this article\'s inference, not a claim BLS itself makes.',
				],
			},
			{
				heading: 'Job outlook: growth is essentially flat',
				body: [
					'BLS projects employment of air traffic controllers to grow just 1% from 2024 to 2034, from 24,100 to 24,400 positions, a category BLS classifies as slower than the average for all occupations. That is a net increase of only 300 jobs over the entire decade. Despite that limited growth, BLS separately projects about 2,200 average annual openings for the occupation, because most openings come from replacing controllers who leave the role rather than from newly created positions.',
					'The flat growth figure reflects how tightly the FAA controls hiring relative to a mostly fixed set of towers, centers, and approach facilities, rather than declining demand for air travel. Almost all of the projected openings trace back to controllers reaching the FAA\'s mandatory retirement age, a structural feature unique to this occupation among the roles covered on this site.',
				],
			},
			{
				heading: 'Getting in: a narrower window than most careers, and how the pay compares',
				body: [
					'BLS lists an associate\'s degree as the typical entry-level education, but describes several paths in: an associate\'s or bachelor\'s degree completed through an FAA-approved Air Traffic Collegiate Training Initiative (AT-CTI) program, several years of progressively responsible work experience, or a combination of the two. Candidates must also be U.S. citizens and pass a medical evaluation, background check, and FAA preemployment testing, then complete training at the FAA Academy in Oklahoma City before being assigned to a facility as a developmental controller.',
					'The entry window itself is unusually narrow. Under federal law (5 U.S.C. § 8335), operational controllers must generally separate from service by the end of the month in which they turn 56, and FAA hiring policy generally requires candidates to be appointed before their 31st birthday, with that cutoff extended to 35 for applicants with qualifying prior military or FAA-contract air traffic control experience. No other occupation covered on this site has both an age-based entry cutoff and a mandatory retirement age. This site\'s dental hygienist salary guide covers another associate\'s-degree occupation for comparison: dental hygienists earn a May 2024 median of $94,260, well below the controller median, with no equivalent age restriction on either end of a career. This site\'s flight attendant salary guide covers the other FAA-regulated occupation in this dataset; flight attendants need only a high school diploma to start, versus a controller\'s associate\'s degree and FAA Academy training, yet the top 10% of flight attendants still earn more than $138,040, above the $76,090 floor for the bottom 10% of controllers, since flight attendant pay keeps climbing with seniority for as long as the person keeps flying, with no age-based ceiling on the career itself.',
				],
			},
		],
		faq: [
			{
				question: 'What is the median air traffic controller salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for air traffic controllers was $144,580 in May 2024, equivalent to $69.51 an hour. That is nearly three times the $49,500 median BLS reports across all U.S. occupations for the same year.',
			},
			{
				question: 'Do air traffic controllers need a college degree?',
				answer: 'BLS lists an associate\'s degree as the typical entry-level education. Candidates generally complete an FAA-approved Air Traffic Collegiate Training Initiative (AT-CTI) program at the associate\'s or bachelor\'s level, or qualify through several years of progressively responsible work experience, then pass FAA preemployment testing and complete training at the FAA Academy.',
			},
			{
				question: 'Why do federal air traffic controllers earn so much more than others in the field?',
				answer: 'BLS reports a May 2024 median of $154,000 for controllers employed by the federal government, versus $82,510 for those working in air transportation support activities such as FAA-approved contract towers. BLS does not explain the gap on this page. One plausible, unverified factor is that federal controllers are paid under the FAA\'s own air traffic controller pay plan, tied to facility complexity and certification milestones, which contract-tower employees working for private firms are not covered by, but that is this article\'s inference, not a claim BLS itself makes.',
			},
			{
				question: 'Is there an age limit to become an air traffic controller?',
				answer: 'Yes. FAA hiring policy generally requires candidates to be appointed before their 31st birthday, extended to 35 for applicants with qualifying prior military or FAA-contract air traffic control experience. Federal law (5 U.S.C. § 8335) separately requires operational controllers to generally retire by the end of the month they turn 56.',
			},
			{
				question: 'Is air traffic control a growing occupation?',
				answer: 'No, not by much. BLS projects only 1% employment growth for air traffic controllers from 2024 to 2034, slower than the average for all occupations, adding a net 300 jobs. BLS separately projects about 2,200 average annual openings once the decade is averaged out, with almost all of them coming from controllers reaching mandatory retirement rather than from newly created positions.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Air Traffic Controllers (accessed 2026-08-09 via Wayback Machine snapshot of 2026-06-13, data from May 2024)', url: 'https://www.bls.gov/ooh/transportation-and-material-moving/air-traffic-controllers.htm' },
			{ label: '5 U.S.C. § 8335, Mandatory separation', url: 'https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title5-section8335' },
		],
		image: '/images/air-traffic-controller-salary-chart.svg',
		imageAlt: 'Bar chart showing air traffic controller annual wage by percentile: 10th percentile $76,090, median $144,580, 90th percentile $210,410, based on BLS May 2024 data.',
	},
	{
		slug: 'how-to-become-a-cna',
		category: 'How to Become',
		title: 'How to Become a CNA: Certification, Training, and Pay',
		description: 'The federal minimum for CNA training is 75 hours, not a degree. Here is the real certification path, the state exam and registry, plus BLS pay data.',
		published: '2026-08-10',
		updated: '2026-08-10',
		socCode: '31-1131',
		coreSummary: 'Federal regulation sets a 75-hour minimum for nurse aide training programs, including at least 16 hours of supervised practical training, well short of the multi-month or multi-year programs required for most other healthcare roles. The Bureau of Labor Statistics reports a median annual wage of $39,530 for nursing assistants in May 2024, with the bottom 10% earning less than $31,390 and the top 10% earning more than $50,140.',
		sections: [
			{
				heading: 'The federal floor: 75 hours, not a degree',
				body: [
					'Nurse aide training in the United States has a federal floor set by 42 CFR § 483.152: a state-approved program must run at least 75 clock hours, including a minimum of 16 hours of supervised practical training in which the trainee performs hands-on tasks on a person under the direct supervision of a registered nurse or a licensed practical nurse. That 75-hour figure is a national minimum, not a target. According to PHI, a national policy organization that tracks state nurse aide training rules, more than half the states set a higher bar than the federal floor, with some states requiring as much as 180 hours of instruction and clinical practice before a candidate is eligible to test.',
					'The Bureau of Labor Statistics lists these programs as available through high schools, community colleges, vocational and technical schools, hospitals, and nursing homes themselves, meaning a candidate rarely has to enroll in a standalone college program the way a diagnostic medical sonographer or dental hygienist would. There is no associate or bachelor\'s degree requirement anywhere in the federal rule. That short, low-cost training window is the main structural difference between becoming a CNA and becoming most of the other entry-level healthcare roles covered on this site.',
				],
			},
			{
				heading: 'The exam, the registry, and what counts as working legally',
				body: [
					'Finishing the training hours is not the last step. Federal rule 42 CFR § 483.35(d) caps how long someone can actually work as a nurse aide in a Medicare- or Medicaid-certified nursing home while still completing training and the competency evaluation: 4 months, after which the individual must have demonstrated competency to keep working in that role. The competency evaluation itself has two parts, a written or oral knowledge test and a hands-on skills demonstration.',
					'Once a candidate passes, federal rule 42 CFR § 483.154(e)(2) requires the state to add the record to its nurse aide registry, the one set up under § 483.156, within 30 days. Being listed on that state registry, not just holding a training certificate, is what BLS describes as the actual requirement to work in a nursing home. Titles vary by state even though the underlying federal training and testing rules are the same nationally: BLS notes that some states use the title "Certified Nursing Assistant," or CNA, while others use different state-specific titles for the same credential. Some states also offer a further credential, Certified Medication Assistant, which lets a CNA who completes additional training dispense medications, a task outside the base nurse aide scope.',
				],
			},
			{
				heading: 'What the job pays once certified',
				body: [
					'BLS reports a median annual wage of $39,530 for nursing assistants in May 2024 ($31,390 at the 10th percentile and $50,140 at the 90th). Pay varies meaningfully by setting: government employers outside state/local education and hospitals paid the highest median tracked, at $45,760, ahead of hospitals ($40,170), nursing care facilities, meaning skilled nursing facilities ($39,170), continuing care retirement communities and assisted living facilities ($38,500), and home healthcare services, the lowest of the industries BLS tracks for this role at $36,910.',
					'BLS projects only 2% employment growth for nursing assistants and orderlies combined from 2024 to 2034, slower than the average for all occupations, yet still projects about 211,800 openings each year on average across the decade. BLS attributes the gap directly: most of those openings are expected to come from the need to replace workers who transfer to different occupations or exit the labor force, such as to retire, rather than from newly created positions.',
				],
			},
			{
				heading: 'CNA pay next to other quick-entry healthcare roles',
				body: [
					'Within the same BLS occupational family, nursing assistants and orderlies are two different jobs with two different entry bars and two different median wages. Orderlies, who transport patients and clean treatment areas rather than provide direct patient care, typically need only a high school diploma or equivalent plus a short period of on-the-job training, and do not need a state license or registry listing. BLS puts their median annual wage at $37,700, about $1,830 below the $39,530 nursing assistants earn for taking on the state-approved training, competency exam, and registry requirement that orderlies do not.',
					'Against roles that require more formal postsecondary training, the CNA path still trails on pay but not by as much as the training-length gap might suggest. [Medical assistants](/medical-assistant-salary/), who typically complete a postsecondary certificate or degree program, have a BLS median annual wage of $44,200, about $4,670 (roughly 12%) above nursing assistants. [Phlebotomists](/how-to-become-a-phlebotomist/), whose entry path runs through either a sub-year certificate program or, in some states, direct on-the-job training, have a BLS median of $43,660, about $4,130 (roughly 10%) above nursing assistants. BLS data describes the aggregate labor market for each occupation; it is not a claim that any one of these paths is the better choice for a given person.',
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a CNA?',
				answer: 'Federal rule (42 CFR § 483.152) sets a 75-hour minimum for state-approved nurse aide training programs, including at least 16 hours of supervised practical training. More than half the states require more than the federal minimum, up to 180 hours in the most demanding states, according to PHI, a national policy organization that tracks state training rules.',
			},
			{
				question: 'What happens after CNA training is finished?',
				answer: 'A candidate must pass a state competency evaluation, which includes a knowledge test and a hands-on skills demonstration. Federal rule (42 CFR § 483.35(d)) caps how long someone can work as a nurse aide in a Medicare- or Medicaid-certified nursing home while still completing training and testing at 4 months. Once a candidate passes, federal rule requires the state to add them to its nurse aide registry within 30 days.',
			},
			{
				question: 'How much do CNAs make?',
				answer: 'BLS reports a median annual wage of $39,530 for nursing assistants in May 2024, with the bottom 10% earning less than $31,390 and the top 10% earning more than $50,140. Government employers outside state/local education and hospitals paid the highest industry median tracked, at $45,760.',
			},
			{
				question: 'What is the difference between a CNA and an orderly?',
				answer: 'Both fall under the same BLS occupational family, but the entry requirements and pay differ. Nursing assistants (the CNA credential) typically need a state-approved training program, a competency exam, and a spot on the state nurse aide registry; BLS puts their median annual wage at $39,530. Orderlies typically need only a high school diploma plus short on-the-job training, with no license or registry requirement, and BLS puts their median at $37,700.',
			},
			{
				question: 'Is becoming a CNA a good way into healthcare?',
				answer: 'BLS projects 2% employment growth for nursing assistants and orderlies combined from 2024 to 2034, slower than average, but still about 211,800 openings a year on average, mostly from workers leaving the occupation rather than from new positions. Whether that makes it the right entry point depends on individual circumstances; BLS data describes the aggregate labor market, not a recommendation for any specific person.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Nursing Assistants and Orderlies (accessed 2026-08-10 via Wayback Machine snapshot of 2026-07-31, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/nursing-assistants.htm' },
			{ label: '42 CFR Part 483, Subpart D — Nurse Aide Training and Competency Evaluation (eCFR)', url: 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-G/part-483/subpart-D' },
			{ label: '42 CFR § 483.35(d) — Requirements for facility hiring and use of nurse aides (eCFR)', url: 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-G/part-483/subpart-B/section-483.35' },
		],
		image: '/images/cna-certification-path.svg',
		imageAlt: 'Timeline diagram showing the path to CNA certification: 75-hour minimum state-approved training program, competency exam, then placement on the state nurse aide registry within 30 days.',
	},
	{
		slug: 'respiratory-therapist-salary',
		category: 'Salary Guide',
		title: 'Respiratory Therapist Salary: BLS Wage Data by Percentile (2026)',
		description: 'BLS puts the median respiratory therapist salary at $80,450 a year, with 12% growth projected through 2034. Here is the full wage range by percentile and by employer.',
		published: '2026-08-10',
		updated: '2026-08-10',
		socCode: '29-1126',
		coreSummary: 'The median annual wage for respiratory therapists was $80,450 in May 2024, according to the U.S. Bureau of Labor Statistics. The bottom 10% earned less than $61,900 while the top 10% earned more than $108,820. BLS projects 12% employment growth from 2024 to 2034, well above the roughly 3% average across all occupations, adding an estimated 16,800 jobs.',
		sections: [
			{
				heading: 'What respiratory therapists earn, and what the growth rate actually means',
				body: [
					'The Bureau of Labor Statistics tracks this role under SOC code 29-1126, on a page dedicated to respiratory therapists alone rather than a page shared with a related occupation, so every figure below is specific to this job title. For May 2024, BLS reported a median annual wage of $80,450, or $38.68 an hour. The bottom 10% of earners made less than $61,900 a year, while the top 10% made more than $108,820, a spread of roughly $47,000 that reflects differences in experience, credential level, employer type, and region rather than any single factor.',
					'BLS figures come from its Occupational Employment and Wage Statistics survey, which collects data directly from employer payroll records rather than relying on workers to self-report their own pay the way some job-search sites do. That distinction matters here specifically: BLS does not publish a state-by-state wage breakdown on this page, so readers comparing this figure against a self-reported regional number from another site should expect some divergence in methodology, not necessarily an error in either source.',
					'BLS also publishes, on the same page, how this occupation\'s projected growth stacks up against two broader groupings it tracks: respiratory therapists at 12%, the broader "healthcare diagnosing or treating practitioners" category at 8%, and the total for all occupations in the economy at roughly 3%. That 12% figure, covered in more detail further down this page, is one of the faster growth rates BLS projects for any allied health occupation, though it is not the fastest on this site (nurse practitioners, a role requiring graduate-level training, is projected at 40%).',
				],
			},
			{
				heading: 'Why the setting you work in changes the number',
				body: [
					'BLS breaks out May 2024 wages by industry for this occupation, though for respiratory therapists specifically it reports only three categories, fewer than the four or five categories it publishes for some other occupations on this site. Hospitals (state, local, and private) paid the highest median at $80,660, just above the national median for the occupation overall. Nursing care facilities (skilled nursing facilities) paid a median of $75,910, and offices of physicians paid the least of the three, at $75,240.',
					'The gap between the highest- and lowest-paying settings BLS tracks here, about $5,400, is narrower than the industry spread reported for some other allied health roles on this site, where the difference between top- and bottom-paying settings can run into the tens of thousands of dollars. BLS does not explain why hospital settings pay the most for this specific role; it publishes the wage-by-industry figures without an accompanying explanation. One plausible, unverified factor is that hospitals are more likely to require overnight, weekend, and holiday coverage given that patients with acute breathing problems do not arrive on a schedule, and shift differentials tied to that coverage could account for some of the gap, but that is this article\'s inference, not a claim BLS itself makes.',
					'These three categories are the only industries BLS separately reports wages for on this occupation\'s Handbook page; they do not represent every setting where respiratory therapists work, only the ones BLS has enough survey data to break out individually. Readers who want a more granular, metro-level, or additional-industry breakdown would need the BLS Occupational Employment and Wage Statistics tables directly, a separate data product from the Handbook page cited here.',
				],
			},
			{
				heading: 'Licensing and how people enter the field',
				body: [
					"Per BLS, respiratory therapists typically need an associate's degree in respiratory therapy from an accredited program, and some employers prefer candidates with a bachelor's degree. Accredited programs, offered by colleges, vocational-technical institutes, and the Armed Forces, combine coursework in human anatomy and physiology with clinical hours that give students supervised, hands-on experience treating patients. BLS notes that high school students interested in the field should take biology, algebra, chemistry, and physics, since some programs list those as prerequisites.",
					"BLS states that respiratory therapists must be licensed in all states except Alaska, where national certification is recommended instead of state licensure, and that requirements vary by state. Independently of BLS, the field's credentialing body, the National Board for Respiratory Care (NBRC), confirms it administers two main credential levels: Certified Respiratory Therapist (CRT), the entry-level credential most candidates sit for first, and Registered Respiratory Therapist (RRT), an additional exam some employers require before hiring or within a set window after starting the job. NBRC's own materials state that all 49 states that regulate the practice of respiratory care use the CRT or RRT credential as the basis for state licensure, a detail BLS itself does not spell out on this page.",
					"For readers comparing this against other associate-degree-entry diagnostic and therapeutic roles, [becoming an ultrasound tech](/how-to-become-an-ultrasound-tech/) follows a similarly structured path, an accredited associate-degree program plus a certification exam, though sonography is credentialed through a separate organization (ARDMS) rather than NBRC, and the two fields work with different equipment and patient populations entirely.",
				],
			},
			{
				heading: 'Job outlook, and how this compares to other roles with the same entry requirement',
				body: [
					'BLS projects 12% employment growth for respiratory therapists from 2024 to 2034, adding an estimated 16,800 jobs and about 8,800 openings a year on average. Many of those annual openings, per BLS, are expected to come from workers transferring to other occupations or leaving the labor force, such as to retire, rather than from newly created positions alone. BLS attributes the underlying growth mainly to an aging population, which it expects to increase the prevalence of respiratory conditions such as pneumonia, chronic obstructive pulmonary disease (COPD), and other disorders that restrict lung function, in turn raising demand for respiratory therapy services.',
					"That 12% figure is worth putting next to other roles on this site that share the same typical entry-level education, an associate's degree, since the growth rates for that group vary widely despite the similar training bar. [Dental hygienists](/dental-hygienist-salary/), who carry a higher median wage of $94,260, are projected to grow 7%. [Radiologic technologists](/radiology-tech-salary/), with a median of $77,660 close to this occupation's figure, are projected to grow just 4%, the slowest of the three. Respiratory therapists sit well above both, though the reasons a demand-side BLS projection differs across occupations with the same entry credential are not something BLS itself explains on any of these pages.",
					"BLS's growth projection describes the healthcare system's aggregate demand for this occupation nationally; it is not a forecast about any specific hospital, region, or individual's job security, employer, or pay trajectory. Someone evaluating a specific offer or program should weigh this figure alongside local job market conditions and program-specific placement data rather than as a standalone guarantee.",
				],
			},
		],
		faq: [
			{
				question: 'What is the average respiratory therapist salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for respiratory therapists was $80,450 in May 2024, equivalent to $38.68 an hour. "Median" means half of workers in the role earned more and half earned less.',
			},
			{
				question: 'What is the highest-paying setting for a respiratory therapist?',
				answer: 'Among the three industry categories BLS tracks for May 2024, hospitals (state, local, and private) paid the highest median at $80,660, ahead of nursing care facilities ($75,910) and offices of physicians ($75,240).',
			},
			{
				question: 'How much do the lowest- and highest-paid respiratory therapists make?',
				answer: 'BLS reports that the bottom 10% of respiratory therapists earned less than $61,900 a year in May 2024, while the top 10% earned more than $108,820. BLS does not break down what separates the highest earners within the occupation on this page.',
			},
			{
				question: 'Do respiratory therapists need to be certified?',
				answer: "BLS states that respiratory therapists must be licensed in all states except Alaska, where national certification is recommended instead. Independently of BLS, the National Board for Respiratory Care (NBRC) confirms it administers the field's two main credentials, Certified Respiratory Therapist (CRT) and Registered Respiratory Therapist (RRT), which all 49 states that regulate the profession use as the basis for licensure.",
			},
			{
				question: 'Is respiratory therapy a growing field?',
				answer: 'BLS projects 12% employment growth for respiratory therapists from 2024 to 2034, well above the roughly 3% average across all occupations, adding an estimated 16,800 jobs and about 8,800 openings a year on average, mostly from workers leaving the occupation rather than newly created positions.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Respiratory Therapists (accessed 2026-08-10 via Wayback Machine snapshot of 2026-07-18, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/respiratory-therapists.htm' },
			{ label: 'National Board for Respiratory Care (NBRC): CRT and RRT examinations', url: 'https://www.nbrc.org/examinations/' },
		],
		image: '/images/respiratory-therapist-salary-chart.svg',
		imageAlt: 'Bar chart showing respiratory therapist annual wage by percentile: 10th percentile $61,900, median $80,450, 90th percentile $108,820, based on BLS May 2024 data.',
	},
	{
		slug: 'electrician-salary',
		category: 'Salary Guide',
		title: 'Electrician Salary: BLS Wage Data by Percentile (2026)',
		description: 'BLS puts the median electrician salary at $62,350 a year, with 9% growth projected through 2034. Here is the full wage range by percentile and by employer.',
		published: '2026-08-11',
		updated: '2026-08-11',
		socCode: '47-2111',
		coreSummary: 'The median annual wage for electricians was $62,350 in May 2024, according to the U.S. Bureau of Labor Statistics. The bottom 10% earned less than $39,430 while the top 10% earned more than $106,030. BLS projects 9% employment growth from 2024 to 2034, much faster than the roughly 3% average across all occupations, adding an estimated 77,400 jobs.',
		sections: [
			{
				heading: 'What electricians earn, and what the growth rate means',
				body: [
					'The Bureau of Labor Statistics tracks this role under SOC code 47-2111. For May 2024, BLS reported a median annual wage of $62,350, or $29.98 an hour, for the roughly 818,700 people employed as electricians nationwide. The bottom 10% of earners made less than $39,430 a year, while the top 10% made more than $106,030, a spread of more than $66,000 that reflects differences in experience, license level, employer type, and region rather than any single factor. BLS describes the job itself as physically demanding work, noting that electricians need enough strength to move components that can weigh up to 50 pounds and must be able to identify wires by color, on top of the troubleshooting skills the role requires day to day.',
					"BLS also places electricians against two broader groupings on the same page. The median for construction trades workers as a whole was $56,490, and the median across all occupations in the economy was $49,500. Electricians sit above both comparison figures, though BLS does not break out how much of that gap owes to the trade's licensing requirements versus other factors like union coverage or regional demand.",
					'On growth, BLS projects 9% employment growth for electricians from 2024 to 2034, compared with 6% for construction trades workers as a whole and roughly 3% for all occupations combined. BLS classifies that as "much faster than average," one of the stronger outlooks among the skilled trades this site has covered so far.',
				],
			},
			{
				heading: 'Industry breakdown, and where apprentices fit in',
				body: [
					'BLS breaks out May 2024 wages by industry for electricians into four categories. Government employers, excluding state and local education and hospitals, paid the highest median at $77,080. Manufacturing followed at $71,820. Electrical contractors and other wiring installation contractors, the industry BLS says employs 65% of electricians (the largest single share by far), paid a median of $61,290, close to the occupation-wide figure. Employment services, which covers staffing agencies, paid the lowest of the four tracked categories at $57,490.',
					"About 8% of electricians are self-employed, per BLS, most often in residential construction, where BLS notes they may be able to set their own schedule. BLS also states that apprentices earn less than fully trained electricians and that their pay rises as they take on more responsibility during the multi-year apprenticeship, though the Handbook page does not publish a separate apprentice wage figure distinct from the fully qualified median above.",
					"BLS does not explain why government and manufacturing settings pay more than contracting work specifically; it publishes the industry breakdown without an accompanying explanation. Readers should treat the ranking as descriptive rather than as a guarantee that switching industries alone would produce the same pay outcome for any individual electrician, since local demand, union coverage, and years of experience all vary by region and were not isolated in this survey.",
				],
			},
			{
				heading: "How people become electricians, and how that path compares to other trades on this site",
				body: [
					'Per BLS, the typical entry-level education for electricians is a high school diploma or equivalent, with no postsecondary degree required to start training. Most electricians learn the trade through a 4- or 5-year apprenticeship, and BLS specifies that apprentices typically receive about 2,000 hours of paid on-the-job training per year of the program, alongside technical instruction covering electrical theory, blueprint reading, and code requirements. Some workers start out by attending a technical school first, which BLS notes can earn credit toward the apprenticeship, and workers with prior electrical experience in the military or construction may qualify for a shortened program based on testing.',
					'BLS states that after completing an apprenticeship, electricians are considered journey workers who may perform duties on their own, subject to state or local licensing requirements. Most states require passing a test and obtaining a license, and the specific requirements, such as hours of supervised experience, exam content, and renewal cycles, vary by state. BLS directs readers to CareerOneStop for state-by-state licensing board information rather than listing every state\'s rules on its own page, and this article does not attempt to summarize them either, since a reader in one state cannot rely on another state\'s requirements. BLS also notes that licensed electricians may need continuing education to maintain that license, and that journey workers who meet additional requirements can advance to master electrician or move into supervisory or project-management roles.',
					"For readers comparing entry paths that skip a bachelor's degree, electricians sit at the higher-paying end of the occupations covered on this site so far. [Becoming a CNA](/how-to-become-a-cna/) requires a 75-hour minimum training program rather than a multi-year apprenticeship, and BLS puts the median nursing assistant wage at $39,530, well below the electrician median. [Medical assistants](/medical-assistant-salary/), whose typical entry credential BLS lists as a postsecondary nondegree award rather than an apprenticeship, have a median of $44,200. Electricians, despite requiring no postsecondary credential at all beyond a high school diploma, out-earn both at the median, though BLS does not track how apprenticeship length, licensing requirements, or industry mix account for that gap.",
				],
			},
			{
				heading: 'Job outlook, and what BLS says is driving demand',
				body: [
					'BLS projects 9% employment growth for electricians from 2024 to 2034, adding an estimated 77,400 jobs and about 81,000 openings a year on average. As with most occupations BLS tracks, it attributes many of those annual openings to the need to replace workers who transfer to other occupations or leave the labor force entirely, such as to retire, rather than to newly created positions alone.',
					'BLS attributes underlying growth partly to the expansion of alternative power generation, such as solar and wind installations, which require electricians to connect new systems to homes and the broader power grid. It also notes, without assigning a specific probability, that growth tied to these alternative sources may depend on government provisions such as tax credits and net metering policies that affect consumer demand, meaning the 9% figure carries some sensitivity to policy that BLS itself cannot forecast with precision.',
					"This growth projection describes national demand for the occupation as a whole; it is not a forecast for any specific employer, region, or individual's job security or earnings trajectory. Someone weighing a particular apprenticeship program should look at that program's own placement data and local job market conditions alongside the national figures here.",
				],
			},
		],
		faq: [
			{
				question: 'What is the average electrician salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for electricians was $62,350 in May 2024, equivalent to $29.98 an hour. "Median" means half of workers in the occupation earned more and half earned less.',
			},
			{
				question: 'What is the highest-paying industry for electricians?',
				answer: 'Among the four industry categories BLS tracks for May 2024, government employers (excluding state and local education and hospitals) paid the highest median at $77,080, ahead of manufacturing ($71,820), electrical contractors and wiring installation contractors ($61,290), and employment services ($57,490).',
			},
			{
				question: 'How much do the lowest- and highest-paid electricians make?',
				answer: 'BLS reports that the bottom 10% of electricians earned less than $39,430 a year in May 2024, while the top 10% earned more than $106,030. BLS does not break down what separates the highest earners within the occupation on this page.',
			},
			{
				question: 'Do electricians need a license?',
				answer: "BLS states that most states require electricians to be licensed, though the specific requirements vary by state. BLS directs readers to CareerOneStop for state-by-state licensing board information rather than publishing every state's rules directly.",
			},
			{
				question: 'Is electrician a growing occupation?',
				answer: 'BLS projects 9% employment growth for electricians from 2024 to 2034, well above the roughly 3% average across all occupations, adding an estimated 77,400 jobs and about 81,000 openings a year on average, mostly from workers leaving the occupation rather than newly created positions.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Electricians (accessed 2026-08-11 via r.jina.ai reader proxy, direct fetch blocked by Akamai bot detection, data from May 2024)', url: 'https://www.bls.gov/ooh/construction-and-extraction/electricians.htm' },
			{ label: 'CareerOneStop: Find Licenses (U.S. Department of Labor)', url: 'https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx' },
		],
		image: '/images/electrician-salary-chart.svg',
		imageAlt: 'Bar chart showing electrician annual wage by percentile: 10th percentile $39,430, median $62,350, 90th percentile $106,030, based on BLS May 2024 data.',
	},
];
