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
		updated: '2026-08-19',
		socCode: '29-1051',
		coreSummary: 'The median annual wage for pharmacists was $137,480 in May 2024, according to the Bureau of Labor Statistics. The bottom 10% earned less than $86,930 and the top 10% earned more than $172,040. Pay varies meaningfully by setting: ambulatory healthcare services paid the highest industry median at $152,980, well above the $131,640 median at pharmacies and drug retailers, the setting where most pharmacists actually work. Reaching that pay typically requires six to eight years of school: at least two years of prerequisite coursework followed by a four-year Doctor of Pharmacy program.',
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
				heading: 'How long it takes to become a licensed pharmacist',
				body: [
					'BLS lists at least two years of prerequisite undergraduate coursework (subjects such as anatomy and physiology, physics, and statistics) as the typical entry point for a Pharm.D. program, though many applicants complete a full four-year bachelor\'s degree before applying, since some schools prefer or require one. The Pharm.D. program itself usually runs four years, so most students spend six to eight years in school total before graduating. The American Association of Colleges of Pharmacy confirms this same structure and notes that a smaller number of programs admit students directly out of high school into six-year combined tracks that fold the prerequisite years and the professional years into one continuous sequence.',
					'Graduating does not mean practicing yet. Every state requires a license, which means passing the NAPLEX plus a state-specific law exam (commonly the MPJE) and logging a state-set number of supervised intern hours, work most students complete during school rather than after. BLS notes this licensing step typically adds a few more months, not years, to the timeline. Pharmacists aiming for a clinical or hospital specialty often add a one- to two-year residency after the Pharm.D., though it is not required to practice in most general pharmacy roles.',
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
				question: 'How long does it take to become a pharmacist?',
				answer: 'Most pharmacists spend six to eight years in school: at least two years of prerequisite coursework, or a full four-year bachelor\'s degree at schools that require one, followed by a four-year Doctor of Pharmacy program, per BLS and the American Association of Colleges of Pharmacy. A smaller number of schools offer six-year programs that admit students straight out of high school. After graduating, candidates still need to pass licensing exams and log state-required intern hours, which typically adds a few months, and those heading into clinical specialties often add a one- to two-year residency.',
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
			{ label: 'BLS Occupational Outlook Handbook: Pharmacists (accessed 2026-08-19, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/pharmacists.htm' },
			{ label: 'AACP: Pharm.D. Program Structures (accessed 2026-08-19)', url: 'https://www.aacp.org/resource/pharmd-program-structures' },
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
		description: 'Paralegals research law, draft documents, and organize case files to support lawyers without being licensed to practice law. Includes BLS pay and outlook data.',
		published: '2026-08-03',
		updated: '2026-08-17',
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
					'The pattern suggests that paralegals working inside a company\'s in-house legal or compliance function (finance and insurance) or for a federal agency often out-earn paralegals working at a traditional law firm. BLS does not break down why the gap exists by industry, so the figures above are the most specific picture available.',
				],
			},
			{
				heading: 'Education path and job outlook',
				body: [
					'Most paralegal positions require an associate degree in paralegal studies, or a bachelor\'s degree in another field combined with a paralegal certificate program. Separately, BLS notes that employers will also train candidates on the job with little formal paralegal preparation, whether that means a bachelor\'s-degree hire without legal-specific coursework or a candidate with only a high school diploma, particularly for specialized practice areas; a paralegal certificate is increasingly treated as close to a baseline expectation regardless of which path a candidate starts from.',
					'BLS projects essentially flat employment for paralegals from 2024 to 2034: 0% growth, described as "little or no change," adding only about 600 net jobs over the decade. Flat growth is not the same as few job openings, though: BLS separately projects about 39,300 paralegal openings a year on average over the decade, with most coming from the need to replace workers who transfer to other occupations or leave the labor force, such as to retire, rather than from newly created positions. Even accounting for that, this is a noticeably weaker net-growth outlook than most other occupations covered on this site, worth weighing against the relatively low barrier to entry: demand growth in this field is not expected to be a strong tailwind over the next decade the way it is in several healthcare roles.',
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
				answer: 'BLS projects essentially flat employment growth for paralegals from 2024 to 2034 (0%, described as "little or no change"), adding only about 600 net jobs nationally over the decade, a notably weaker net-growth outlook than many other occupations. BLS separately projects about 39,300 paralegal openings a year on average, though most of those come from replacing workers who leave the occupation rather than from newly created positions.',
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
		updated: '2026-08-12',
		socCode: '53-2031',
		coreSummary: 'The median annual wage for flight attendants was $67,130 in May 2024, according to the Bureau of Labor Statistics. The range is unusually wide for the required entry education: the bottom 10% earned less than $34,030 while the top 10% earned more than $138,040, a roughly $104,000 gap driven mainly by seniority-based pay scales and route/aircraft assignments under airline union contracts.',
		sections: [
			{
				heading: 'Why the range is so wide for an entry-level-education job',
				body: [
					'Flight attendant is one of the few well-paying occupations that typically requires only a high school diploma or equivalent to enter, per BLS. That makes the size of its pay range notable: the bottom 10% of flight attendants earned less than $34,030 in May 2024, while the top 10% earned more than $138,040, over a $100,000 spread within a single occupation that has a low formal education barrier to entry.',
					'The explanation is seniority. Nearly all major U.S. airlines pay flight attendants under union contracts with seniority-based pay scales, where hourly rates increase substantially with years of service, and senior flight attendants get priority for the most desirable (and often highest-paying, due to international or long-haul premiums) routes and aircraft. A first-year flight attendant at a regional carrier and a 20-year flight attendant at a major international carrier are, in effect, in very different pay tiers despite sharing a job title.',
					"BLS itself only publishes the 10th and 90th percentile split for this occupation, not a 25th or 75th percentile figure. U.S. News's flight attendant salary page, which draws on the same BLS survey (its reported 2024 median of $67,130 matches the BLS figure exactly), puts the 25th percentile at $52,280 and the 75th at $98,160. That narrower middle-half range is a useful check on the extremes: most flight attendants land well inside the full 10th-to-90th spread, and the largest jumps in pay tend to arrive later in a career, once seniority pushes someone past the 75th percentile mark.",
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
				answer: 'The Bureau of Labor Statistics reports a median annual flight attendant salary of $67,130 in May 2024, with a very wide range: the bottom 10% earned under $34,030 and the top 10% earned over $138,040. BLS does not break out a 25th or 75th percentile for this occupation, but U.S. News, citing the same BLS survey, puts the middle half of flight attendants between about $52,280 and $98,160.',
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
			{ label: 'U.S. News Best Jobs: Flight Attendant Salary (25th/75th percentile figures citing the same BLS OEWS survey; not independently verified against BLS raw tables due to bls.gov bot-protection blocking direct XLSX access; accessed 2026-08-12)', url: 'https://careers.usnews.com/best-jobs/flight-attendant/salary' },
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
		updated: '2026-08-21',
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
			{ label: 'American Registry for Diagnostic Medical Sonography (ARDMS), operated by Inteleos', url: 'https://www.inteleos.org/about/community/ardms/' },
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
					'One thing this national wage and growth data cannot capture is how much a nurse practitioner\'s day-to-day scope of practice depends on the state they work in. The American Association of Nurse Practitioners (AANP), an independent membership organization rather than a BLS-affiliated source, classifies a majority of states as granting nurse practitioners "full practice authority," meaning they can evaluate, diagnose, and prescribe under the exclusive authority of the state board of nursing without a mandated physician agreement, up from 22 states in 2020. The remaining states fall under "reduced" or "restricted" practice categories that require some form of physician collaboration or supervision. Reporting a specific current count here risks going stale within a single legislative session, and different secondary sources currently report noticeably different totals for that reason, partly because some trackers count states with newly passed laws before AANP\'s own map has caught up. A specific state\'s current classification is worth confirming directly through AANP\'s state practice environment map rather than any single article, including this one.',
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
				answer: 'It depends entirely on the state. The American Association of Nurse Practitioners classifies a majority of states as granting "full practice authority," while the rest require some form of physician collaboration or supervision. Reported counts vary by source and change through legislation fairly regularly, so a specific state\'s current status is best confirmed through AANP\'s state practice environment map rather than a fixed count in any one article.',
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
		updated: '2026-08-25',
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
					'That credential is the Certified Surgical Technologist (CST), administered by the National Board of Surgical Technology and Surgical Assisting (NBSTSA) and described by NBSTSA as the most nationally recognized surgical technology credential in the U.S. Maintaining it requires earning 30 continuing education credits (including 4 defined as live) within a two-year renewal cycle, or retaking the exam. NBSTSA\'s current renewal system runs on that single two-year cycle; an older four-year, 60-credit option some other sites still mention has since been consolidated into it. BLS states that employers may require or prefer certification and that some states regulate these workers directly. Requirements vary by state, and this page does not claim a single national licensing standard.',
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
		updated: '2026-08-18',
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
					'That low barrier to entry is also what separates a pharmacy technician\'s pay from a pharmacist\'s. Pharmacists require a Doctor of Pharmacy (PharmD), a professional doctorate that typically takes four years after at least two years of prerequisite coursework, plus passing a national licensure exam. This site\'s [pharmacist salary guide](/pharmacist-salary/) reports a May 2024 median of $137,480, more than three times the pharmacy technician median in this article, reflecting that multi-year credentialing gap rather than a difference in day-to-day workload. For a comparison at a similarly accessible entry point, this site\'s [guide to becoming a phlebotomist](/how-to-become-a-phlebotomist/) covers another allied health role with the same kind of low bar to entry: like pharmacy technicians, phlebotomists can qualify with just a high school diploma plus employer-provided on-the-job training in many states, though phlebotomists also have a formal postsecondary-certificate route that some states require.',
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
			{ label: '42 CFR Part 483, Subpart D: Nurse Aide Training and Competency Evaluation (eCFR)', url: 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-G/part-483/subpart-D' },
			{ label: '42 CFR § 483.35(d): Requirements for facility hiring and use of nurse aides (eCFR)', url: 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-G/part-483/subpart-B/section-483.35' },
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
		updated: '2026-08-21',
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
				question: 'How long does it take to become an electrician?',
				answer: 'BLS says most electricians train through a 4- or 5-year apprenticeship that combines paid on-the-job work, roughly 2,000 hours per year, with technical classroom instruction covering electrical theory, blueprint reading, and code requirements. Some workers attend a technical school first and can earn credit toward the apprenticeship, and those with prior electrical experience in the military or construction may qualify for a shortened program based on testing.',
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
	{
		slug: 'firefighter-salary',
		category: 'Salary Guide',
		title: 'Firefighter Salary: BLS Wage Data by Percentile (2026)',
		description: 'BLS puts the median firefighter salary at $59,530 a year, with 3% growth projected through 2034. Here is the full wage range by percentile and by employer type.',
		published: '2026-08-11',
		updated: '2026-08-11',
		socCode: '33-2011',
		coreSummary: 'The median annual wage for firefighters was $59,530 in May 2024, according to the U.S. Bureau of Labor Statistics, or $28.62 an hour. The bottom 10% earned less than $34,490 while the top 10% earned more than $101,330. BLS projects 3% employment growth from 2024 to 2034, about as fast as the roughly 3% average across all occupations, adding an estimated 11,800 jobs and about 27,100 openings a year on average.',
		sections: [
			{
				heading: 'What firefighters earn, and how that compares to the broader labor market',
				body: [
					'The Bureau of Labor Statistics tracks this role under SOC code 33-2011. For May 2024, BLS reported a median annual wage of $59,530, or $28.62 an hour, for the roughly 344,900 people employed as firefighters nationwide. On the same page, BLS lists the median across all occupations in the economy as $49,500, putting firefighters above that broader benchmark. The bottom 10% of firefighters earned less than $34,490 a year, while the top 10% earned more than $101,330, a spread of roughly $67,000 that BLS attributes to differences in department size, rank, region, and years of service rather than any single factor.',
					'These figures cover paid, career firefighters only. BLS is explicit that its employment and wage numbers "exclude volunteer firefighters, who share the same duties as paid firefighters," and notes separately that volunteers "account for the largest share of firefighters nationwide, especially in communities of fewer than 25,000." That means the $59,530 median describes the career workforce BLS surveys for pay, not the full population of people who do firefighting work in the United States.',
					'BLS also groups firefighters under a broader "firefighting and prevention workers" category, which also includes fire inspectors and investigators and had a slightly higher median of $59,870 for May 2024. The firefighter-specific figure used throughout this page, $59,530, is the narrower number for the occupation itself.',
				],
			},
			{
				heading: 'Pay by government level, and where career firefighters actually work',
				body: [
					'BLS breaks out May 2024 median wages for firefighters by the three employer categories it tracks: federal government, excluding postal service, at $62,690; state government, excluding education and hospitals, at $61,850; and local government, excluding education and hospitals, at $60,360. The spread between the highest- and lowest-paying tier is about $2,300, a much narrower gap than some other public-facing occupations this site has covered, where the difference between the best- and worst-paying industry can run into the tens of thousands of dollars.',
					'Despite paying the least of the three tiers, local government is where the large majority of career firefighters actually work: BLS puts local government at 88% of firefighter employment, versus 3% for state government and 2% for federal government (excluding postal service). BLS does not publish a combined percentage that accounts for the remaining employers, and it does not explain why federal and state positions pay modestly more than local ones on this page; it presents the industry breakdown descriptively rather than attributing the gap to a specific cause such as unionization, cost-of-living adjustments, or department budgets.',
					"Firefighters typically work long, irregular shifts. BLS describes shift patterns such as 24 hours on duty followed by 48 or 72 hours off, and notes that wildland firefighters combating forest fires may work extended stretches and stay at temporary fire camps for days or weeks when a fire breaks out. Wildland firefighting work can also be seasonal, meaning hours and pay may vary by time of year for firefighters in that specialty in ways the annual median wage figure does not capture.",
				],
			},
			{
				heading: 'How people become firefighters, and how that compares to other entry paths on this site',
				body: [
					'BLS states that firefighters typically need a high school diploma and training in emergency medical services to enter the occupation, with no college degree required to start. Most receive their initial training at a fire academy run by a local fire department or the state, covering firefighting and fire-prevention techniques, local building codes, and emergency medical procedures, followed by a probationary period on the job. Despite that high-school-diploma hiring bar, BLS classifies the occupation\'s "typical entry-level education" as a postsecondary nondegree award; the firefighters page itself does not spell out why, but BLS elsewhere uses that same category label for occupations built around a standalone certification earned after high school, such as EMTs, which lines up with the postsecondary EMT certification training most departments require alongside the fire academy itself.',
					"Beyond initial hiring, BLS notes that licensing and certification requirements, such as EMT or paramedic status, vary by state or locality, and that some jurisdictions also require a commercial driver's license or a driver's license with a firefighter endorsement to operate a firetruck. Continuing education is required to maintain these credentials. Wildland firefighters specifically may go through apprenticeship programs lasting up to four years that combine instruction with supervised on-the-job training. For advancement, BLS describes a promotion track from firefighter to engineer, then lieutenant, captain, battalion chief, assistant chief, deputy chief, and chief, and notes that many departments require a bachelor's degree, often in fire science or public administration, for promotion beyond battalion chief.",
					"Firefighters out-earn some, but not all, of the other entry paths this site has covered that skip a bachelor's degree. [Electricians](/electrician-salary/) sit a bit higher at the median, at $62,350 versus $59,530 for firefighters, and BLS lists the same nominal hiring bar of a high school diploma for both, though electricians train through a 4- to 5-year, mostly on-the-job apprenticeship rather than a fire academy plus EMT certification. [CNAs](/how-to-become-a-cna/), by contrast, need a much shorter training bar, a state-approved program with a federal floor of 75 hours under 42 CFR § 483.152, and BLS puts the nursing assistant median at $39,530, well below both firefighters and electricians. BLS does not quantify how much of these gaps owes to training length, licensing requirements, physical risk, or other factors it does not isolate on any of these pages.",
				],
			},
			{
				heading: 'Job outlook, and why growth trails some other trades on this site',
				body: [
					'BLS projects 3% employment growth for firefighters from 2024 to 2034, which it classifies as "about as fast as average," matching the roughly 3% growth rate it projects across all occupations combined. That is a slower projected rate than some other occupations this site has covered; electricians, for comparison, carry a 9% "much faster than average" projection over the same period. BLS attributes the more modest firefighter outlook partly to a long-term decline in structure fires and fire fatalities tied to improved building materials and building codes, while noting that wildland firefighters will still be needed to combat active fires and manage fire risk, and that firefighters generally will continue responding to medical emergencies, which BLS says make up most calls firefighters answer, not just fires.',
					'BLS estimates about 27,100 openings for firefighters each year on average over the decade, adding up to a projected employment change of 11,800 jobs by 2034. As with most occupations BLS tracks, it attributes many of those annual openings to the need to replace workers who transfer to other occupations or leave the labor force, such as to retire, rather than to newly created positions alone.',
					"This projection describes national demand for the occupation as a whole; it is not a forecast for any specific fire department, city, or individual's hiring odds or job security. A slower national growth rate also does not by itself indicate anything about pay trends, since BLS publishes wage and employment-growth figures as separate, independently derived statistics on this page.",
				],
			},
		],
		faq: [
			{
				question: 'What is the average firefighter salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for firefighters was $59,530 in May 2024, equivalent to $28.62 an hour. "Median" means half of workers in the occupation earned more and half earned less. This figure covers paid, career firefighters; BLS excludes volunteer firefighters from its employment and wage counts.',
			},
			{
				question: 'What is the highest-paying employer type for firefighters?',
				answer: 'Among the three government employer categories BLS tracks for May 2024, federal government (excluding postal service) paid the highest median at $62,690, ahead of state government ($61,850) and local government ($60,360). Local government employs the large majority of career firefighters, about 88% per BLS, despite paying the least of the three tiers.',
			},
			{
				question: 'How much do the lowest- and highest-paid firefighters make?',
				answer: 'BLS reports that the bottom 10% of firefighters earned less than $34,490 a year in May 2024, while the top 10% earned more than $101,330. BLS attributes this range to factors such as department, rank, region, and years of service rather than any single cause.',
			},
			{
				question: 'What education do you need to become a firefighter?',
				answer: 'BLS states that firefighters typically need a high school diploma and training in emergency medical services, with initial instruction usually completed at a fire academy. No college degree is required to start, though BLS classifies the typical entry-level education as a postsecondary nondegree award, a label that lines up with the postsecondary EMT certification training most departments also require.',
			},
			{
				question: 'Is firefighting a growing occupation?',
				answer: 'BLS projects 3% employment growth for firefighters from 2024 to 2034, which it classifies as about as fast as the average for all occupations. That works out to an estimated 11,800 additional jobs and about 27,100 openings a year on average, with most openings driven by workers leaving the occupation rather than newly created positions.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Firefighters (accessed 2026-08-11 via r.jina.ai reader proxy, direct fetch blocked by Akamai bot detection, data from May 2024)', url: 'https://www.bls.gov/ooh/protective-service/firefighters.htm' },
			{ label: 'CareerOneStop: Find Certifications (U.S. Department of Labor)', url: 'https://www.careeronestop.org/Toolkit/Training/find-certifications.aspx' },
		],
		image: '/images/firefighter-salary-chart.svg',
		imageAlt: 'Bar chart showing firefighter annual wage by percentile: 10th percentile $34,490, median $59,530, 90th percentile $101,330, based on BLS May 2024 data.',
	},
	{
		slug: 'plumbing-apprenticeship',
		category: 'How to Become',
		title: 'Plumbing Apprenticeship: Length, Pay, and How to Become a Plumber',
		description: 'A plumbing apprenticeship runs 4 to 5 years with roughly 2,000 paid hours a year. Here is BLS pay data for apprentices through journey-level to master plumber.',
		published: '2026-08-12',
		updated: '2026-08-12',
		socCode: '47-2152',
		coreSummary: 'A plumbing apprenticeship typically runs 4 to 5 years, combining about 2,000 hours of paid on-the-job training per year with technical instruction in codes, blueprint reading, and math. The U.S. Bureau of Labor Statistics reports a median annual wage of $62,970 for plumbers, pipefitters, and steamfitters in May 2024, with the bottom 10% earning less than $40,670 and the top 10% earning more than $105,150.',
		sections: [
			{
				heading: 'What a plumbing apprenticeship actually involves',
				body: [
					'Per the Bureau of Labor Statistics, most plumbers, pipefitters, and steamfitters learn the trade through a 4- or 5-year apprenticeship, though some attend a vocational-technical school first. Apprentices typically receive about 2,000 hours of paid on-the-job training each year of the program, alongside technical instruction covering safety, local plumbing codes and regulations, and blueprint reading. BLS also notes that apprentices study mathematics, applied physics, and chemistry as part of that classroom component. Apprenticeship programs are sponsored by unions, trade associations, and businesses rather than run as a single national program, which is why the specific application process and waitlist can vary a great deal by local union hall or contractor. Most apprentices enter a program directly, though BLS notes some start out as helpers or complete a pre-apprenticeship training program in plumbing or another trade first.',
					'BLS tracks plumbers, pipefitters, and steamfitters together under one SOC code, 47-2152, and one shared Occupational Outlook Handbook page, rather than publishing three separate profiles, so every pay and employment figure on this page covers the combined group, not plumbers alone. The three job titles share the same core skills, connecting pipes and testing pressure so a system is airtight and watertight, but differ in setting and material. Plumbers install and repair water, gas, and other piping systems in homes, businesses, and factories, including fixtures such as bathtubs and toilets and appliances such as water heaters. Pipefitters and steamfitters, sometimes called fitters, install and maintain pipes that carry chemicals, acids, and gases, mostly in manufacturing, commercial, and industrial settings, with steamfitters specializing in systems built for high-pressure liquids or gases.',
					],
				image: {
					src: '/images/plumbing-apprenticeship-path.svg',
					alt: 'Timeline diagram showing the path through a plumbing apprenticeship: high school diploma, 4-5 year apprenticeship with paid on-the-job training, state licensing exam, then journey-level status with optional advancement to master plumber.',
				},
			},
			{
				heading: 'What the apprenticeship pays, before and after journey level',
				body: [
					'BLS states directly that apprentices earn less than fully trained plumbers, pipefitters, and steamfitters, and that their pay rises as they take on more responsibility during the program, but the Occupational Outlook Handbook page does not publish a separate apprentice wage figure distinct from the fully qualified median. The number BLS does publish is the occupation-wide median for May 2024, $62,970 a year, or $30.27 an hour. The lowest 10% earned less than $40,670, and the highest 10% earned more than $105,150, a spread of more than $64,000 that reflects where a given worker falls across the apprentice-to-master progression, license status, industry, and region, not any single factor.',
					'BLS places this occupation against two broader groupings on the same page. Construction trades workers as a whole had a median of $56,490, and the median across all occupations in the economy was $49,500. Plumbers, pipefitters, and steamfitters sit above both comparison figures.',
					'BLS breaks out May 2024 wages by industry into four categories. Government employers, excluding state and local education and hospitals, paid the highest median at $69,160. Heavy and civil engineering construction followed at $62,770, close to the occupation-wide figure, and plumbing, heating, and air-conditioning contractors, the industry that employs the largest share of workers in this occupation, paid a median of $62,670. Manufacturing paid the lowest of the four tracked categories, at $61,620.',
					],
				},
			{
				heading: 'How to go from apprentice to licensed plumber',
				body: [
					"BLS lists the typical entry-level education for this occupation as a high school diploma or equivalent, with no prior work experience required and on-the-job training delivered through an apprenticeship. After completing an apprenticeship and passing the required licensing exam, workers become journey-level plumbers, pipefitters, or steamfitters, qualified to perform tasks independently rather than under direct supervision. Most states, and some localities, require plumbers to be licensed. Although the specifics vary by jurisdiction, BLS notes that states and localities often require 2 to 5 years of experience plus a passing score on an exam testing trade knowledge before allowing a plumber to work independently. BLS directs readers to their state's licensing board for the exact requirements rather than listing every state's rules on its own page, and this article does the same rather than guessing at any one state's process, since a reader in one state cannot rely on another state's rules.",
					'BLS breaks out where these workers are employed. Plumbing, heating, and air-conditioning contractors employ the largest share, 66%. Self-employed workers make up 8%, and BLS notes self-employed plumbers may be able to set their own schedules. Heavy and civil engineering construction accounts for 4%, government employers, excluding state and local education and hospitals, for 3%, and manufacturing for another 3%. After reaching journey level, plumbers with several years of experience can pass a further exam to earn master status, and BLS notes some states require master plumber status specifically to obtain a plumbing contractor\'s license.',
					"For readers comparing this apprenticeship route against other paths that skip a bachelor's degree, [electricians](/electrician-salary/) follow a similarly structured 4- or 5-year apprenticeship starting from the same high school diploma entry bar, and BLS puts their median annual wage at $62,350, within about $600 of the plumbing figure above. [Becoming a CNA](/how-to-become-a-cna/) sits at the other end of the training-length spectrum, a federal minimum of 75 hours rather than a multi-year apprenticeship, and BLS puts the median nursing assistant wage at $39,530, well below either trade. BLS data describes the aggregate labor market for each occupation; it is not a claim that any one of these paths is the better choice for a given person.",
				],
			},
			{
				heading: "Job outlook, and what the growth number does and doesn't mean",
				body: [
					'BLS projects 4% employment growth for plumbers, pipefitters, and steamfitters from 2024 to 2034, which it classifies as about as fast as the average for all occupations. That works out to an estimated 22,700 additional jobs and about 44,000 openings a year on average over the decade. As with most occupations BLS tracks, it attributes many of those annual openings to the need to replace workers who transfer to other occupations or leave the labor force entirely, such as to retire, rather than to newly created positions alone.',
					'BLS attributes underlying demand to new construction as well as the ongoing need to maintain and repair plumbing systems in existing homes and other buildings. It also specifically calls out sprinklerfitters, one of the specialties within this combined occupation, as an area where employment is expected to increase because building codes in all states now require fire suppression systems.',
					"That 4% figure trails both the 6% BLS projects for construction trades workers as a whole and the 9% it projects for electricians, a similarly structured apprenticeship trade covered elsewhere on this site, though electricians and plumbers land within a few hundred dollars of each other on median pay. BLS does not explain, on this page, why one licensed apprenticeship trade is projected to grow faster than another; the projection describes national demand for the occupation as a whole. It is not a forecast for any specific employer, local union, apprenticeship program, or individual's job security or earnings trajectory, and someone weighing a specific program should look at that program's own placement data and local job market conditions alongside the national figures here.",
				],
			},
		],
		faq: [
			{
				question: 'How long is a plumbing apprenticeship?',
				answer: 'Per the Bureau of Labor Statistics, most plumbers, pipefitters, and steamfitters complete a 4- or 5-year apprenticeship, with apprentices receiving about 2,000 hours of paid on-the-job training per year alongside technical instruction in safety, local plumbing codes, and blueprint reading.',
			},
			{
				question: 'How much do plumbing apprentices get paid?',
				answer: 'BLS states that apprentices earn less than fully trained plumbers, pipefitters, and steamfitters and that pay rises as they take on more responsibility, but it does not publish a separate apprentice wage figure. The occupation-wide median for fully qualified workers was $62,970 a year in May 2024, equivalent to $30.27 an hour.',
			},
			{
				question: 'What is the difference between a plumber, a pipefitter, and a steamfitter?',
				answer: 'BLS tracks all three under one occupation. Plumbers install and repair water, gas, and other piping systems and fixtures in homes, businesses, and factories. Pipefitters and steamfitters install and maintain pipes carrying chemicals, acids, and gases, mostly in manufacturing and industrial settings, with steamfitters specializing in high-pressure liquid or gas systems.',
			},
			{
				question: 'How do you become a licensed plumber?',
				answer: 'After completing an apprenticeship, a candidate must pass a state licensing exam to reach journey level, which qualifies them to work independently. Most states and some localities require this license, and BLS notes requirements often include 2 to 5 years of experience plus a trade-knowledge exam that varies by state. Workers with several years of journey-level experience can pass a further exam to earn master status.',
			},
			{
				question: 'Is plumbing a growing field?',
				answer: 'BLS projects 4% employment growth for plumbers, pipefitters, and steamfitters from 2024 to 2034, about as fast as the average for all occupations, adding an estimated 22,700 jobs and about 44,000 openings a year on average, mostly from workers leaving the occupation rather than newly created positions. BLS separately notes rising demand for sprinklerfitters tied to fire-suppression building codes.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Plumbers, Pipefitters, and Steamfitters (accessed 2026-08-12 via r.jina.ai reader proxy, direct fetch blocked by Akamai bot detection, data from May 2024)', url: 'https://www.bls.gov/ooh/construction-and-extraction/plumbers-pipefitters-and-steamfitters.htm' },
			{ label: 'Apprenticeship.gov (U.S. Department of Labor)', url: 'https://www.apprenticeship.gov/' },
		],
		image: '/images/plumbing-apprenticeship-path.svg',
		imageAlt: 'Timeline diagram showing the path through a plumbing apprenticeship: high school diploma, 4-5 year apprenticeship with paid on-the-job training, state licensing exam, then journey-level status with optional advancement to master plumber.',
	},
	{
		slug: 'truck-driver-salary',
		category: 'Salary Guide',
		title: 'Truck Driver Salary: BLS Wage Data by Percentile (2026)',
		description: 'BLS puts the median truck driver salary at $57,440 a year, with 4% growth projected through 2034. Here is the full wage range by percentile and by industry.',
		published: '2026-08-12',
		updated: '2026-08-12',
		socCode: '53-3032',
		coreSummary: 'The median annual wage for heavy and tractor-trailer truck drivers was $57,440 in May 2024, according to the U.S. Bureau of Labor Statistics. The bottom 10% earned less than $38,640 while the top 10% earned more than $78,800. BLS projects 4% employment growth from 2024 to 2034, about as fast as the roughly 3% average across all occupations, adding an estimated 89,300 jobs.',
		sections: [
			{
				heading: 'What truck drivers earn, and how wide the pay spread runs',
				body: [
					'BLS tracks this role under SOC code 53-3032, which covers drivers who operate a tractor-trailer combination or a truck with a total weight of at least 26,000 pounds, most often on long-haul routes that can span several states. For May 2024, BLS reported a median annual wage of $57,440, or $27.62 an hour, across the roughly 2,235,100 people employed as heavy and tractor-trailer truck drivers nationwide. The bottom 10% earned less than $38,640 a year, while the top 10% earned more than $78,800, a spread of about $40,000. BLS attributes that range broadly to factors such as employer type, route length, cargo type, and years of experience, without assigning a specific weight to any one factor.',
					"BLS also places truck drivers against two broader groupings on the same page. The median across all motor vehicle operators was $48,660, and the median across all occupations in the economy was $49,500. Truck drivers sit above both figures at the median, though BLS does not explain how much of that gap owes to the physical demands of long-haul work versus the commercial license requirement or other factors.",
					'On growth, BLS projects 4% employment growth for truck drivers from 2024 to 2034, compared with 5% for motor vehicle operators as a group and roughly 3% for all occupations combined. BLS classifies the outlook as "about as fast as average," a middle-of-the-pack projection compared with the stronger growth BLS reports for some of the skilled trades this site has covered.',
				],
			},
			{
				heading: 'Industry pay differences, and how drivers are actually paid',
				body: [
					'BLS breaks out May 2024 wages by industry for truck drivers into four categories. Truck transportation, the industry BLS says employs 40% of drivers (the largest single share by far), paid the highest median at $59,570. Wholesale trade followed at $57,260, then manufacturing at $54,860 and construction at $54,170. BLS does not explain the ranking beyond publishing the figures, so readers should treat it as descriptive rather than a guarantee that switching industries alone would raise a given driver\'s pay, since route type, employer size, and region were not isolated in this survey.',
					"Unlike most occupations on this site, BLS describes truck driver pay as structured around miles driven rather than a flat hourly or salaried rate. Drivers are typically paid by the mile, plus bonuses, and the per-mile rate varies by employer and can depend on the type of cargo hauled and the driver's experience, according to BLS. Some long-distance drivers, particularly owner-operators who buy or lease their own trucks and run an independent business, are instead paid a share of the revenue from a shipment. BLS does not publish a separate wage line for owner-operators, so the percentile figures above describe the broader employed workforce rather than self-employed drivers running their own operation.",
					'On who employs these drivers, BLS lists truck transportation at 40%, wholesale trade at 12%, manufacturing at 7%, self-employed workers at 7%, and construction at 6%, with the remainder spread across smaller categories the Handbook page does not break out individually.',
				],
			},
			{
				heading: 'Getting a CDL, and how the entry path compares to other trades on this site',
				body: [
					"BLS Quick Facts list the typical entry-level education for truck drivers as a postsecondary nondegree award, though the Handbook's narrative description says most companies simply require a high school diploma or equivalent, plus completion of a professional truck driving school. BLS says these training programs run 3 to 6 months at either a private driving school or a community college, and cover both vehicle handling and the federal laws governing interstate trucking; graduates receive a certificate of completion rather than a degree.",
					'All long-haul drivers must hold a commercial driver\'s license (CDL). Qualifications vary by state but generally include a knowledge test and a driving test, per BLS, and a state can refuse to issue a CDL to someone whose license was suspended by another state. Drivers who haul hazardous materials need an additional H endorsement, which BLS says requires passing a further knowledge test and a background check. After finishing driving school and getting hired, BLS says new drivers typically spend several weeks in on-the-job training, riding with an experienced mentor-driver before driving solo.',
					"For readers comparing entry paths that skip a bachelor's degree, truck drivers sit below some of the other trades this site has covered. [Electricians](/electrician-salary/) require a 4- or 5-year apprenticeship and post a higher median of $62,350, while [firefighters](/firefighter-salary/) share the same postsecondary-nondegree-award classification from BLS and post a similar median of $59,530, just above truck drivers. BLS does not track how apprenticeship length, licensing requirements, or industry mix account for the differences between these three occupations.",
				],
			},
			{
				heading: 'Job outlook, and the federal rules that govern the job',
				body: [
					'BLS projects 4% employment growth for truck drivers from 2024 to 2034, adding an estimated 89,300 jobs and about 237,600 openings a year on average. As with most occupations BLS tracks, it attributes many of those annual openings to the need to replace workers who transfer to other occupations or leave the labor force entirely, such as to retire, rather than to newly created positions alone. BLS ties underlying demand to growth in household and business spending, since trucks move most of the freight in the United States.',
					'BLS also flags that heavy and tractor-trailer truck drivers have one of the highest rates of injuries and illnesses of all occupations, along with one of the highest rates of occupational fatalities, tied to the risk of traffic accidents. Federal Motor Carrier Safety Administration rules, which BLS cites directly, limit drivers to 14 hours on duty per day, of which up to 11 can be actual driving, and require at least 10 hours off duty between shifts. Drivers are also capped at 60 hours of driving within 7 days or 70 hours within 8 days, after which federal rules require a 34-hour break before another multi-day run can begin.',
					"These are national figures, and BLS does not break them down by specific carrier, freight lane, or region. A driver comparing training programs would need to weigh the placement record and freight demand of that specific school or carrier separately, since the 4% outlook describes the occupation nationwide rather than any one route or employer.",
				],
			},
		],
		faq: [
			{
				question: 'What is the average truck driver salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for heavy and tractor-trailer truck drivers was $57,440 in May 2024, equivalent to $27.62 an hour. "Median" means half of workers in the occupation earned more and half earned less.',
			},
			{
				question: 'What is the highest-paying industry for truck drivers?',
				answer: 'Among the four industry categories BLS tracks for May 2024, truck transportation paid the highest median at $59,570, ahead of wholesale trade ($57,260), manufacturing ($54,860), and construction ($54,170).',
			},
			{
				question: 'How much do the lowest- and highest-paid truck drivers make?',
				answer: 'BLS reports that the bottom 10% of heavy and tractor-trailer truck drivers earned less than $38,640 a year in May 2024, while the top 10% earned more than $78,800. BLS attributes the spread broadly to factors such as employer type, route length, and experience, without isolating any single cause.',
			},
			{
				question: 'Do truck drivers need a CDL?',
				answer: 'Yes. BLS states that all long-haul heavy and tractor-trailer truck drivers must hold a commercial driver\'s license (CDL), which generally requires passing a knowledge test and a driving test, with specific requirements varying by state. Drivers hauling hazardous materials need an additional H endorsement.',
			},
			{
				question: 'Is truck driving a growing occupation?',
				answer: 'BLS projects 4% employment growth for truck drivers from 2024 to 2034, about as fast as the roughly 3% average across all occupations, adding an estimated 89,300 jobs and about 237,600 openings a year on average, mostly from workers leaving the occupation rather than newly created positions.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Heavy and Tractor-trailer Truck Drivers (accessed 2026-08-12 via r.jina.ai reader proxy, direct fetch blocked by Akamai bot detection, data from May 2024)', url: 'https://www.bls.gov/ooh/transportation-and-material-moving/heavy-and-tractor-trailer-truck-drivers.htm' },
			{ label: 'Federal Motor Carrier Safety Administration (U.S. Department of Transportation)', url: 'https://www.fmcsa.dot.gov/' },
		],
		image: '/images/truck-driver-salary-chart.svg',
		imageAlt: 'Bar chart showing heavy and tractor-trailer truck driver annual wage by percentile: 10th percentile $38,640, median $57,440, 90th percentile $78,800, based on BLS May 2024 data.',
	},
	{
		slug: 'welder-salary',
		category: 'Salary Guide',
		title: 'Welder Salary: BLS Wage Data by Percentile (2026)',
		description: 'BLS puts the median welder salary at $51,000 a year, with 2% growth projected through 2034. Here is the full wage range by percentile and by industry.',
		published: '2026-08-13',
		updated: '2026-08-13',
		socCode: '51-4121',
		coreSummary: 'The median annual wage for welders, cutters, solderers, and brazers was $51,000 in May 2024, according to the U.S. Bureau of Labor Statistics. The bottom 10% earned less than $38,130 while the top 10% earned more than $75,850. BLS projects 2% employment growth from 2024 to 2034, slower than the roughly 3% average across all occupations, though about 45,600 openings are still projected each year.',
		sections: [
			{
				heading: 'What welders earn, and how wide the pay spread runs',
				body: [
					"SOC code 51-4121 is BLS's catch-all for welders, cutters, solderers, and brazers, defined as workers who use hand-held or remotely controlled equipment to join, repair, or cut metal parts and products. Roughly 457,300 people held these jobs in 2024, and BLS put the median annual wage at $51,000 that May, or $24.52 an hour. Pay ran from less than $38,130 at the 10th percentile to more than $75,850 at the 90th, a gap of roughly $37,700. That single wage figure covers all four job titles under the SOC code; BLS does not break out percentiles separately by specialty.",
					'BLS distinguishes the four roles inside that single SOC code by technique rather than by pay. Welders join metals using processes such as arc welding, where machinery produces an electrical current that generates heat to bond pieces together, with the specific process chosen based on factors like the metals involved. Cutters use heat from an electric arc, plasma, or burning gases to cut and trim metal to a specific size, including dismantling large structures such as ships or railroad cars. Solderers and brazers both heat molten filler metal to join two or more objects, but BLS notes soldering uses a lower temperature and is common on small, precisely positioned pieces such as computer chips, while brazing joins dissimilar metals and can add a protective coating against wear and corrosion. BLS does not publish separate wage data for any of these four specialties individually.',
					'BLS also places the occupation against two broader comparison points on the same page: a $48,660 median across "metal workers and plastic workers" as a group, and a $49,500 median across all occupations in the economy. Welders and related workers sit above both. BLS publishes the three figures side by side without breaking down what accounts for the difference, whether that\'s skill level, certification, or the physical demands of the work.',
					'On growth, BLS projects 2% employment growth for welders, cutters, solderers, and brazers from 2024 to 2034, which it classifies as slower than average against the roughly 3% figure for all occupations combined. That said, the occupation still outpaces the broader metal workers and plastic workers group, which BLS projects will shrink 4% over the same period on the same comparison chart.',
				],
			},
			{
				heading: 'Industry pay, and where the jobs actually are',
				body: [
					'BLS breaks out May 2024 wages by industry into three categories for this occupation. Specialty trade contractors paid the highest median at $57,310, followed by repair and maintenance at $53,300, then manufacturing at $49,740, the lowest of the three even though manufacturing is by far the largest employer.',
					"On who actually employs welders, BLS lists manufacturing at 61% of all jobs, specialty trade contractors at 8%, self-employed workers at 6%, and repair and maintenance at 4%, with the remainder spread across smaller industries the Handbook page does not break out individually. That means most welders work in the lowest-paying of the three tracked industries by median wage. BLS does not explain the gap on this page, so a reader can't tell from the Handbook alone whether it reflects company size, union coverage, or some other factor not captured in a single median figure.",
					'BLS also notes that welders may work outdoors in all types of weather or indoors in a confined area designed to contain sparks and glare, and that many manufacturing firms run two or three shifts a day, so evening and weekend work is common. Wages vary with the worker\'s experience, skill level, industry, and the size of the company, per BLS, though the Handbook page does not quantify how much any single factor moves pay.',
				],
			},
			{
				heading: 'How to become a welder, and how the entry path compares to other trades on this site',
				body: [
					'Per BLS, welders typically need a high school diploma or equivalent combined with technical and on-the-job training to enter the occupation, with no postsecondary degree required. That training is available through high school technical education classes, vocational-technical institutes, community colleges, private welding schools, or the U.S. Armed Forces. BLS also lists coursework in blueprint reading, shop mathematics, and mechanical drawing as useful preparation, along with a general understanding of electricity.',
					'Workers can also enter through an employer-based apprenticeship. BLS notes some apprenticeships accept entry-level workers with no prior experience, while others are aimed at people who have already completed a vocational-technical welding program. Employers who hire inexperienced workers directly still typically provide several months of additional on-the-job training, even for those who arrive with formal technical education, according to BLS.',
					"On credentials, BLS states that welders must be licensed in some states and localities, though requirements vary, and it directs readers to their state or local licensing agency for specifics rather than listing every jurisdiction's rules. Separately, BLS says professional organizations offer courses leading to general certification, some employers require certification for particular jobs, and employers may cover the training and testing cost themselves; CareerOneStop publishes more detail on which certifications are available. OSHA also requires welders to complete training on electrical safety specifically, per BLS, with other OSHA training available but not generally required.",
					"Compared with other no-bachelor's-degree trades on this site, welding's entry path is less standardized. [Electricians](/electrician-salary/) typically complete a structured 4- or 5-year apprenticeship and post a higher median of $62,350, about $11,350 above the welder figure. [Plumbers, pipefitters, and steamfitters](/plumbing-apprenticeship/) follow a similarly formal apprenticeship model and post an even higher median of $62,970. Welding, by contrast, has several viable entry routes that BLS describes side by side (vocational school, employer apprenticeship, military training, or direct hire with on-the-job training), and BLS does not attribute the pay gap between welding and these other two trades to any one of these training-structure differences.",
				],
			},
			{
				heading: 'Job outlook, and how welding compares to similar occupations',
				body: [
					'BLS projects 2% employment growth for welders, cutters, solderers, and brazers from 2024 to 2034, adding an estimated 9,900 jobs. Despite that limited growth, BLS still projects about 45,600 openings a year on average over the decade, attributing most of them to the need to replace workers who transfer to other occupations or leave the labor force, such as to retire, rather than to newly created positions.',
					'BLS ties underlying demand to the nation\'s aging infrastructure, noting welders will be needed to help rebuild bridges, highways, and buildings, as well as in manufacturing plants that produce metal products and machinery. It also flags automation in manufacturing as a factor that may limit overall demand for these workers going forward.',
					'BLS lists eight occupations with similar job duties on the same page, with 2024 median pay ranging from $43,570 for assemblers and fabricators up to $73,340 for boilermakers. Machinists and tool and die makers ($57,700), sheet metal workers ($60,850), and industrial machinery mechanics ($63,510) all post higher medians than welding, while jewelers and precious stone and metal workers ($49,140) and metal and plastic machine workers ($46,800) post lower ones. BLS does not explain what accounts for the spread across this list beyond publishing the figures side by side.',
				],
			},
		],
		faq: [
			{
				question: 'What is the average welder salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for welders, cutters, solderers, and brazers was $51,000 in May 2024, equivalent to $24.52 an hour. "Median" means half of workers in the occupation earned more and half earned less.',
			},
			{
				question: 'What is the highest-paying industry for welders?',
				answer: 'Among the three industry categories BLS tracks for May 2024, specialty trade contractors paid the highest median at $57,310, ahead of repair and maintenance ($53,300) and manufacturing ($49,740), even though manufacturing employs the largest share of welders at 61%.',
			},
			{
				question: 'How much do the lowest- and highest-paid welders make?',
				answer: 'BLS reports that the bottom 10% of welders, cutters, solderers, and brazers earned less than $38,130 a year in May 2024, while the top 10% earned more than $75,850, a spread of roughly $37,700.',
			},
			{
				question: 'Do welders need a license or certification?',
				answer: 'BLS states that welders must be licensed in some states and localities, with requirements varying by jurisdiction. Certification is separate: professional organizations offer general certification courses, and some employers require it for specific jobs. CareerOneStop lists available certifications in more detail.',
			},
			{
				question: 'Is welding a growing occupation?',
				answer: 'BLS projects 2% employment growth for welders, cutters, solderers, and brazers from 2024 to 2034, slower than the roughly 3% average across all occupations, adding an estimated 9,900 jobs. Despite the limited growth, BLS still projects about 45,600 openings a year on average, mostly from workers leaving the occupation rather than newly created positions.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Welders, Cutters, Solderers, and Brazers (accessed 2026-08-13 via r.jina.ai reader proxy, direct fetch blocked by Akamai bot detection, data from May 2024)', url: 'https://www.bls.gov/ooh/production/welders-cutters-solderers-and-brazers.htm' },
			{ label: 'CareerOneStop (U.S. Department of Labor)', url: 'https://www.careeronestop.org/Toolkit/Training/find-certifications.aspx?newsearch=true' },
		],
		image: '/images/welder-salary-chart.svg',
		imageAlt: 'Bar chart showing welder, cutter, solderer, and brazer annual wage by percentile: 10th percentile $38,130, median $51,000, 90th percentile $75,850, based on BLS May 2024 data.',
	},
	{
		slug: 'how-to-become-a-paralegal',
		category: 'How to Become',
		title: 'How to Become a Paralegal: Education, Certification, and Pay',
		description: "BLS data on the education path most paralegals take, what NALA and NFPA certification exams require, and median pay of $61,010 a year broken out by industry.",
		published: '2026-08-13',
		updated: '2026-08-13',
		socCode: '23-2011',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, most paralegals and legal assistants enter the field through an associate's degree or certificate in paralegal studies. BLS reports a median annual wage of $61,010 in May 2024, with the bottom 10% earning less than $39,710 and the top 10% earning more than $98,990. No U.S. state currently licenses the paralegal occupation, though voluntary certification is available through NALA and NFPA.",
		sections: [
			{
				heading: 'How most paralegals get in the door',
				body: [
					"Per BLS, paralegals and legal assistants typically need an associate's degree or a certificate in paralegal studies to enter the occupation. The most common route is a dedicated associate's degree program at a community college or similar institution, which BLS says usually includes courses in legal research, legal writing, and an introduction to law and the legal system, along with coursework in a specific practice area such as criminal, family, or contract law.",
					"BLS describes two other entry paths on the same page. Some employers prefer or require a bachelor's degree, and candidates who already hold one in an unrelated field, commonly social science or business, can add a shorter paralegal studies certificate rather than pursue a second full degree. A third, less common path skips formal paralegal education altogether: BLS notes some employers hire candidates with no legal experience or education, often just a high school diploma, and train them on the job, particularly for specialized practice areas.",
					"BLS says paralegal studies programs are typically accredited by professional organizations rather than one single national body. One recognized standard is approval by the American Bar Association: NFPA's advanced certification exam, covered below, explicitly accepts degrees from an institutionally accredited and/or ABA-approved paralegal program as one path to eligibility. ABA approval is voluntary for a school and is not required to enter the occupation.",
				],
				image: {
					src: '/images/paralegal-career-path.svg',
					alt: "Diagram showing the path to becoming a paralegal: associate's degree or certificate in paralegal studies (or a bachelor's degree plus certificate, or on-the-job training), leading to an entry-level paralegal position at a median of $61,010 a year, with optional voluntary certification through NALA or NFPA. No U.S. state currently licenses the occupation.",
				},
			},
			{
				heading: 'Certification is voluntary, not a state license',
				body: [
					"Unlike some other occupations covered on this site, where a state license is required to work independently, no U.S. state currently licenses the paralegal profession, according to NFPA, the National Federation of Paralegal Associations. NFPA notes several states are working on regulatory frameworks, but as things stand, using the title \"paralegal\" does not require a government-issued license anywhere in the country.",
					"That does not mean credentials are absent from the field, only that they are voluntary and issued by professional associations rather than a government body. The National Association of Legal Assistants (NALA) offers the Certified Paralegal (CP) credential through one of three eligibility routes: completing an ABA-approved or otherwise institutionally accredited paralegal studies program (associate's, bachelor's, or post-baccalaureate certificate, or a program of at least 60 semester hours including 15 hours of substantive legal coursework), holding a bachelor's degree in any field plus at least one year of paralegal experience, or holding a high school diploma plus at least five years of paralegal experience and 20 hours of continuing legal education completed in the two years before applying. Candidates who qualify must pass a three-hour, multiple-choice Knowledge Exam before they are eligible to sit for a separate two-hour, written Skills Exam; passing both is required to earn the CP designation.",
					"NFPA runs a separate pair of exams. The Paralegal CORE Competency Exam (PCCE) is an entry-level credential that leads to the CRP designation, aimed at candidates whose education, rather than years of on-the-job experience, demonstrates readiness. The Paralegal Advanced Competency Exam (PACE) is aimed at paralegals with a comprehensive education plus substantial practical experience, generally two to six years depending on degree level, and leads to the RP designation. BLS confirms the general pattern without naming a specific organization: certification typically requires passing an exam, and maintaining it typically requires a set number of continuing-education hours, which for both NALA's and NFPA's credentials takes the form of continuing legal education (CLE).",
				],
			},
			{
				heading: 'What the job pays, once you get there',
				body: [
					"BLS reports a median annual wage of $61,010 for paralegals and legal assistants in May 2024, or $29.33 an hour. The bottom 10% earned less than $39,710, and the top 10% earned more than $98,990, a spread of roughly $59,000. Pay also varies substantially by industry, with federal government roles paying the highest median tracked and state government the lowest; for the full industry-by-industry breakdown and a closer look at what the day-to-day work involves, see [what does a paralegal do](/what-does-a-paralegal-do/).",
					"Against the shortest entry path this site has covered, [becoming a CNA](/how-to-become-a-cna/) requires a federal minimum of just 75 hours of training rather than a multi-year degree, and BLS puts the median nursing assistant wage at $39,530, about $21,480 below the paralegal figure above. Whether the extra years of schooling are worth that gap depends on a reader's own finances and goals, a call this site's national wage figures are not built to make.",
				],
			},
			{
				heading: "What flat growth doesn't tell you: 39,300 openings a year, and why",
				body: [
					'BLS projects essentially flat employment for paralegals and legal assistants from 2024 to 2034, describing the outlook as "little or no change." Flat growth is not the same as few job openings, though: BLS still projects about 39,300 openings a year on average over the decade, attributing most of them to the need to replace workers who transfer to other occupations or leave the labor force entirely, such as to retire, rather than to newly created positions.',
					"BLS attributes part of the limited growth specifically to technology, stating that advances including artificial intelligence are expected to make paralegals and legal assistants more efficient at tasks such as conducting research and preparing documents, which may reduce demand for these workers going forward. That is a more specific, technology-driven explanation than BLS gives for most occupations on this site.",
					"On its \"Similar Occupations\" table, BLS lists lawyers at a 2024 median of $151,160, which requires a doctoral or professional degree, and secretaries and administrative assistants at $47,460, which requires only a high school diploma. The paralegal role sits between those two entry-education tiers on both pay and required schooling, a middle position that lines up with the mix of entry paths described above.",
				],
			},
		],
		faq: [
			{
				question: 'How do you become a paralegal?',
				answer: "Per BLS, most paralegals and legal assistants enter the field with an associate's degree or a certificate in paralegal studies. Alternate paths include a bachelor's degree in any field plus a shorter paralegal certificate, or, less commonly, a high school diploma with employer-provided on-the-job training.",
			},
			{
				question: 'Do paralegals need to be licensed or certified?',
				answer: "No U.S. state currently licenses the paralegal occupation, according to NFPA. Certification is voluntary and comes from professional associations: NALA's Certified Paralegal (CP) credential and NFPA's PCCE and PACE exams are the two most recognized, and both require passing an exam plus ongoing continuing legal education to maintain.",
			},
			{
				question: "What's the difference between NALA's CP credential and NFPA's PACE or PCCE exams?",
				answer: "Both are voluntary, not government licenses. NALA's Certified Paralegal (CP) credential requires passing a Knowledge Exam followed by a Skills Exam. NFPA offers two separate exams: the entry-level PCCE, aimed at candidates whose education demonstrates readiness rather than years on the job, leading to the CRP designation, and the more advanced PACE, which requires several years of paralegal experience on top of a degree and leads to the RP designation.",
			},
			{
				question: 'Does flat job growth mean paralegal openings are scarce?',
				answer: 'No. Even with a 2024-to-2034 employment forecast BLS itself describes as "little or no change," it still projects roughly 39,300 openings a year on average, mostly from workers leaving the occupation rather than newly created positions. BLS separately notes that advances including AI may further limit growth by making paralegals more efficient at research and document tasks, a more specific explanation than it gives for most occupations.',
			},
			{
				question: "What is the difference between a paralegal certificate and a paralegal degree?",
				answer: "An associate's degree in paralegal studies is a standalone two-year credential and the most common entry path, per BLS. A paralegal certificate is shorter and typically aimed at candidates who already hold a bachelor's degree in an unrelated field and want to add paralegal-specific coursework, such as legal research and writing, without pursuing a second full degree.",
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Paralegals and Legal Assistants (accessed 2026-08-13 via r.jina.ai reader proxy, direct fetch blocked by Akamai bot detection, data from May 2024)', url: 'https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm' },
			{ label: 'NALA (National Association of Legal Assistants): Eligibility Requirements for Certification, Category 1 and Category 3', url: 'https://nala.org/eligibility-requirements-for-certification/' },
			{ label: 'NFPA (National Federation of Paralegal Associations): Paralegal Certification and PACE/PCCE Eligibility', url: 'https://www.paralegals.org/page/paralegal-certification' },
		],
		image: '/images/paralegal-career-path.svg',
		imageAlt: "Diagram showing the path to becoming a paralegal: associate's degree or certificate in paralegal studies (or a bachelor's degree plus certificate, or on-the-job training), leading to an entry-level paralegal position at a median of $61,010 a year, with optional voluntary certification through NALA or NFPA. No U.S. state currently licenses the occupation.",
	},
	{
		slug: 'how-to-become-an-electrician',
		category: 'How to Become',
		title: 'How to Become an Electrician: Apprenticeship, Licensing, and Pay',
		description: 'Two apprenticeship routes lead to a license: union through IBEW/NECA, or non-union through IEC/ABC. Both run about 8,000 paid training hours. Here is the process.',
		published: '2026-08-16',
		updated: '2026-08-16',
		socCode: '47-2111',
		coreSummary: 'Most electricians enter the trade through a registered apprenticeship rather than a college degree, following either a union path through a local IBEW/NECA Joint Apprenticeship and Training Committee or a non-union path through an Independent Electrical Contractors (IEC) or Associated Builders and Contractors (ABC) chapter. BLS describes the typical apprenticeship as 4 to 5 years; IEC publishes its own program as a 4-year structure totaling roughly 8,000 hours of paid on-the-job training and 576 hours of classroom instruction. Most states then require passing a licensing exam. BLS puts the median electrician wage at $62,350 a year as of May 2024.',
		sections: [
			{
				heading: 'Two apprenticeship routes into the trade',
				body: [
					'Per BLS, the entry-level education for electricians is a high school diploma or equivalent, with the trade itself learned through a paid apprenticeship rather than a postsecondary degree. Applicants generally choose between two structurally different routes to get there: a union path or a non-union path, and the choice mostly determines who runs the training and where a person ends up working, not how many hours the program eventually requires.',
					'The union route runs through the International Brotherhood of Electrical Workers (IBEW) and the National Electrical Contractors Association (NECA), which jointly operate roughly 300 local Joint Apprenticeship and Training Committees (JATCs) under a shared training arm called the Electrical Training Alliance, formerly known as the National Joint Apprenticeship and Training Committee. Getting in usually requires passing the Electrical Training Alliance Aptitude Test, a proctored exam covering algebra and functions plus reading comprehension across 69 questions in about 97 minutes, scored on a 1-to-9 stanine scale. Most locals require at least a 4 to move on to a separate, also-scored interview, and the two scores together decide who is offered a spot.',
					'The non-union route runs through Independent Electrical Contractors (IEC), a nonprofit trade association for merit-shop contractors with more than 50 local chapters, and through similar programs run by Associated Builders and Contractors (ABC) chapters. Entry requirements are set locally rather than through one national exam, and typically include a high school diploma and proof of basic algebra coursework; some chapters use their own placement screening, but not the centralized aptitude test IBEW/NECA locals share. Both the union and non-union tracks register with the U.S. Department of Labor\'s Office of Apprenticeship under the same electrician occupation code, 47-2111.00, so from a federal standpoint they carry the same underlying credential even though the application process differs.',
				],
				image: {
					src: '/images/electrician-apprenticeship-path.svg',
					alt: 'Diagram showing two paths to becoming a licensed electrician: a union path through IBEW/NECA JATC apprenticeships (aptitude test plus interview) or a non-union path through IEC/ABC chapters (locally set entry requirements). Both converge on a roughly 4- to 5-year apprenticeship (IEC publishes its own program as totaling about 8,000 hours over 4 years), then a state licensing exam, leading to a licensed journey worker earning a median of $62,350 a year per BLS, with optional advancement to master electrician.',
				},
			},
			{
				heading: "What IEC's roughly 8,000 hours actually cover",
				body: [
					"IEC publishes its apprenticeship structure as 144 hours of classroom instruction per year, 576 hours total, alongside 2,000 hours of documented, paid on-the-job training per year, 8,000 hours total, spread across a four-year program; the figure is repeated consistently across more than half a dozen independent local IEC chapter sites. BLS describes JATC programs in similar terms, noting about 2,000 hours of paid on-the-job training per year alongside technical instruction covering electrical theory, blueprint reading, and code requirements, without publishing IBEW/NECA's own classroom-hour total on the same page.",
					'BLS notes that workers who already have electrical experience from the military or from construction work, or who complete a technical school program first, may qualify for a shortened apprenticeship after testing into the program at an advanced level. Neither BLS nor the trade associations describe this as a fast track available to everyone; it depends on documented prior experience being accepted by the specific program.',
					"On pay during the apprenticeship, BLS states only that apprentices earn less than fully trained electricians and that pay rises as they take on more responsibility over the course of the program; the Occupational Outlook Handbook does not publish a specific apprentice wage schedule separate from the fully qualified median covered below, and this article does not estimate one where BLS itself does not.",
				],
			},
			{
				heading: 'Getting licensed after the apprenticeship',
				body: [
					'Completing an apprenticeship makes someone a journey worker, per BLS, who may perform electrical work independently, subject to state or local licensing requirements. Most states require passing a licensing exam before a journey worker can operate on their own, and the exams generally test knowledge of the National Electrical Code alongside state and local building codes.',
					'PSI Services LLC administers the electrical licensing exam for a number of state boards, including Texas, North Carolina, Washington, Virginia, and Nebraska, though each state sets its own exam format rather than sharing one national test. Virginia, for example, requires a 70-question, 210-minute journeyman exam and a 70% score (49 correct answers) to pass, per the state\'s Department of Professional and Occupational Regulation; that specific format is Virginia\'s own published requirement and should not be assumed to carry over to other states. Texas, by contrast, split its journeyman exam into two separately timed sections in March 2025, an NEC-knowledge portion and a calculations portion, each requiring its own 70% score.',
					"BLS directs readers to CareerOneStop for state-by-state licensing board information rather than listing every state's requirements on its own page, and this article follows the same approach rather than guessing at rules for a specific state. In states that recognize a master electrician tier, reaching it typically requires several more years of experience as a licensed journey worker plus a separate exam, a pattern that mirrors what BLS describes for [plumbers, pipefitters, and steamfitters](/plumbing-apprenticeship/) on this site.",
				],
			},
			{
				heading: 'What the work pays once you are licensed',
				body: [
					"BLS reported a median annual wage of $62,350 for electricians in May 2024, or $29.98 an hour, with the bottom 10% of earners making less than $39,430 and the top 10% making more than $106,030. Government employers, excluding state and local education and hospitals, paid the highest median at $77,080, while electrical contractors, the industry employing 65% of electricians, paid closer to the occupation-wide median at $61,290. BLS projects 9% employment growth from 2024 to 2034, which it classifies as much faster than average, for a full percentile and industry breakdown, see [electrician salary](/electrician-salary/).",
					"Against other no-bachelor's-degree apprenticeship trades this site has covered, electricians land close to the top. [Plumbers, pipefitters, and steamfitters](/plumbing-apprenticeship/) post a similar median of $62,970 after a comparably structured 4- to 5-year apprenticeship, while [welders](/welder-salary/) have a lower median and multiple non-apprenticeship entry routes BLS describes side by side. [Becoming a CNA](/how-to-become-a-cna/) sits at the opposite end of the training-length spectrum, a federal minimum of 75 hours rather than a multi-year apprenticeship, with a median of $39,530, well below any of the trades above.",
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become an electrician?',
				answer: 'BLS describes the typical electrician apprenticeship as running 4 to 5 years. IEC, the trade association behind one of the non-union routes, publishes its own program as a 4-year structure: 2,000 hours of paid on-the-job training and 144 hours of classroom instruction per year, 8,000 and 576 hours total. Workers with prior military or construction electrical experience may qualify for a shortened program after testing.',
			},
			{
				question: 'Do you need a college degree to become an electrician?',
				answer: 'No. BLS lists a high school diploma or equivalent as the typical entry-level education for electricians, with the trade learned through a paid apprenticeship rather than a postsecondary degree.',
			},
			{
				question: "What's the difference between an IBEW/NECA apprenticeship and an IEC or ABC apprenticeship?",
				answer: 'IBEW/NECA is the union path, run through roughly 300 local Joint Apprenticeship and Training Committees under the Electrical Training Alliance, and requires passing a standardized 69-question aptitude test plus an interview. IEC and ABC run non-union, merit-shop apprenticeships through local chapters, with entry requirements set locally rather than through one national test. Both register with the U.S. Department of Labor under the same electrician occupation code.',
			},
			{
				question: 'Do electricians need a state license?',
				answer: "Per BLS, most states require electricians to be licensed before they can work independently, typically after completing an apprenticeship and passing an exam covering the National Electrical Code and local rules. Requirements vary by state, and BLS directs readers to CareerOneStop for state-specific licensing board information rather than publishing every state's rules itself.",
			},
			{
				question: 'How much do electrician apprentices get paid?',
				answer: 'BLS states that apprentices earn less than fully trained electricians and that pay rises as they take on more responsibility over the course of the apprenticeship, but it does not publish a separate apprentice wage schedule. The fully qualified median, once someone becomes a licensed journey worker, was $62,350 a year as of May 2024.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Electricians (data from May 2024)', url: 'https://www.bls.gov/ooh/construction-and-extraction/electricians.htm' },
			{ label: 'IEC (Independent Electrical Contractors): Electrical Apprenticeships', url: 'https://ieci.org/apprenticeship/' },
			{ label: 'IBEW Local 81: Aptitude Test (Electrical Training Alliance test structure and scoring)', url: 'https://ibew81.org/content/aptitude-test' },
			{ label: 'Apprenticeship.gov: Occupation Finder, Electricians (47-2111.00)', url: 'https://www.apprenticeship.gov/apprenticeship-occupations/listings?occupationCode=47-2111.00' },
			{ label: 'Virginia Department of Professional and Occupational Regulation: Tradesmen Program (state-specific exam format example)', url: 'https://www.dpor.virginia.gov/Boards/Tradesmen' },
			{ label: 'Texas Department of Licensing and Regulation: Electricians Program (two-part exam format example)', url: 'https://www.tdlr.texas.gov/electricians/elecexam.htm' },
		],
		image: '/images/electrician-apprenticeship-path.svg',
		imageAlt: 'Diagram showing two paths to becoming a licensed electrician: a union path through IBEW/NECA JATC apprenticeships (aptitude test plus interview) or a non-union path through IEC/ABC chapters (locally set entry requirements). Both converge on a roughly 4- to 5-year apprenticeship (IEC publishes its own program as totaling about 8,000 hours over 4 years), then a state licensing exam, leading to a licensed journey worker earning a median of $62,350 a year per BLS, with optional advancement to master electrician.',
	},
	{
		slug: 'how-to-become-a-physical-therapist',
		category: 'How to Become',
		title: 'How to Become a Physical Therapist: DPT, NPTE, and Licensing',
		description: 'A CAPTE-accredited DPT degree and a passing NPTE score are required in every state. The admission path, the 225-question exam, and what licensed PTs earn.',
		published: '2026-08-16',
		updated: '2026-08-16',
		socCode: '29-1123',
		coreSummary: 'Physical therapists need a Doctor of Physical Therapy (DPT) degree from a program accredited by the Commission on Accreditation in Physical Therapy Education (CAPTE), typically three years of coursework and supervised clinical work after a bachelor\'s degree, and a passing score on the National Physical Therapy Examination (NPTE) in every state. The NPTE, administered by the Federation of State Boards of Physical Therapy (FSBPT), is a 225-question exam given over five hours at Prometric testing centers four times a year; a scaled score of 600 out of a possible 800 is required to pass. BLS reports a median annual wage of $101,020 for physical therapists in May 2024.',
		sections: [
			{
				heading: 'The DPT is the only path in',
				body: [
					"Per the Bureau of Labor Statistics, the typical entry-level education for a physical therapist is a doctoral or professional degree, specifically a Doctor of Physical Therapy (DPT). There is no bachelor's-level or master's-level track left in the United States; anyone entering the occupation today needs the doctorate. BLS does not require a specific undergraduate major to apply to a DPT program, though it notes applicants typically hold a bachelor's degree in a field such as recreation and fitness or a healthcare-related area, along with prerequisite coursework in subjects including anatomy, chemistry, and physics.",
					'The doctoral program itself must be accredited by the Commission on Accreditation in Physical Therapy Education (CAPTE) to qualify a graduate for licensure, according to the American Physical Therapy Association (APTA); APTA does not rank or endorse individual programs, only CAPTE evaluates and accredits them. BLS describes DPT programs as typically running three years and including coursework in biomechanics, neuroscience, and pharmacology, alongside supervised clinical work in settings such as acute care and orthopedic care. Combined with a four-year bachelor\'s degree, the typical timeline from starting college to finishing the DPT runs around seven years, before a graduate is even eligible to sit for the licensing exam.',
				],
			},
			{
				heading: 'Passing the NPTE',
				body: [
					'Every state requires physical therapists to hold a license, and passing the National Physical Therapy Examination (NPTE) is the exam component of that requirement everywhere. The NPTE is developed and administered by the Federation of State Boards of Physical Therapy (FSBPT), the umbrella body for state licensing boards, not by APTA or by any individual school. Per FSBPT\'s own Candidate Handbook, the physical therapist version of the exam runs five sections of 45 multiple-choice questions each, 225 questions total, with five hours of testing time (five hours and thirty minutes of total appointment time including a scheduled break). It is computer-based, given at Prometric testing centers, and offered on fixed dates four times a year: January, April, July, and October.',
					'FSBPT converts each candidate\'s raw score, the number of questions answered correctly, into a scaled score ranging from 200 to 800 so that scores are comparable across different exam forms of varying difficulty. Every state licensing board uses the same passing standard: a scaled score of 600 or higher passes, and the exam is reported as pass/fail rather than as a percentile ranking against other candidates. Beyond the NPTE itself, state requirements vary: per BLS, some states also require a jurisprudence or law exam and a criminal background check before issuing a license, and continuing education is typically required to keep the license active. BLS directs candidates to CareerOneStop for state-specific licensing board requirements rather than publishing a state-by-state list itself, and this article follows the same approach rather than guessing at any one state\'s rules.',
				],
			},
			{
				heading: 'After licensure: residency, fellowship, and board certification',
				body: [
					'Passing the NPTE and obtaining a state license is what makes someone a practicing physical therapist; everything past that point is optional. Per BLS, some physical therapists apply to a clinical residency program after graduation, typically lasting about a year, for additional training in a specialty area of care, and a smaller number go on to a fellowship in an advanced clinical area after completing a residency.',
					'Separately, physical therapists with sufficient clinical practice hours in a specialty can pursue board certification through the American Board of Physical Therapy Specialties (ABPTS), which APTA describes as the body governing specialist certification and recertification for the profession. Per APTA\'s specialization program, ABPTS certifies across ten specialty areas, including orthopedics, sports, geriatrics, neurology, and pediatrics, and requires both documented clinical practice in the specialty and a passing score on a written exam. None of this, residency, fellowship, or board certification, is required to work as a licensed physical therapist; it is additional credentialing some practitioners pursue after they are already practicing.',
				],
			},
			{
				heading: 'What licensed PTs earn, and how the DPT compares to other advanced-credential health roles',
				body: [
					'BLS reported a median annual wage of $101,020 for physical therapists in May 2024, with the bottom 10% earning less than $74,420 and the top 10% earning more than $132,500; industry pay also varies, with home healthcare services paying the highest tracked median at $108,110. For the full percentile and industry breakdown, see [physical therapist salary](/physical-therapist-salary/).',
					'The DPT puts physical therapy in the same doctoral-entry tier BLS uses for [pharmacists](/pharmacist-salary/), whose Doctor of Pharmacy (PharmD) is likewise a professional doctorate. BLS puts the pharmacist median at $137,480, about $36,460 (roughly 36%) above the physical therapist median, despite a broadly similar total years of postsecondary training. By contrast, [physician assistants](/physician-assistant-salary/) and [nurse practitioners](/nurse-practitioner-salary/) typically enter with a master\'s degree, one credential level below a DPT or PharmD, yet BLS reports higher medians for both roles: $133,260 for physician assistants and $129,210 for nurse practitioners, each above the physical therapist figure. None of this is a claim that a shorter credential path pays better, or that any one of these roles suits a given person more than another; it is simply what BLS reports for each occupation\'s aggregate labor market. At the opposite end of the training-length spectrum, [becoming a CNA](/how-to-become-a-cna/) requires a federal minimum of 75 hours of training rather than a doctoral degree, with a BLS median of $39,530, under 40% of the physical therapist figure.',
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a physical therapist?',
				answer: "A typical four-year bachelor's degree with prerequisite coursework, followed by a CAPTE-accredited Doctor of Physical Therapy (DPT) program that BLS describes as running about three years, adds up to roughly seven years before a graduate is eligible to sit for the licensing exam. Some physical therapists add an optional one-year clinical residency after that.",
			},
			{
				question: 'Do you need a specific undergraduate major to become a physical therapist?',
				answer: 'BLS does not require a specific major. Applicants typically complete a bachelor\'s degree, often in a field like recreation and fitness or a healthcare-related area, plus prerequisite coursework such as anatomy, chemistry, and physics before applying to a DPT program.',
			},
			{
				question: 'What is the NPTE and how is it scored?',
				answer: 'The National Physical Therapy Examination is a 225-question, five-hour, computer-based exam administered by the Federation of State Boards of Physical Therapy (FSBPT) at Prometric centers, offered four times a year. Raw scores are converted to a scaled score from 200 to 800, and a scaled score of 600 or higher is required to pass in every state.',
			},
			{
				question: 'Do physical therapists need board certification to practice?',
				answer: 'No. A DPT degree, a passing NPTE score, and a state license are what is required to practice. Board certification through the American Board of Physical Therapy Specialties (ABPTS), in specialty areas such as orthopedics, sports, and geriatrics, is optional credentialing some physical therapists pursue after they are already licensed and working.',
			},
			{
				question: 'How much do physical therapists make?',
				answer: 'BLS reports a median annual wage of $101,020 for physical therapists in May 2024, with the bottom 10% earning less than $74,420 and the top 10% earning more than $132,500. See [physical therapist salary](/physical-therapist-salary/) for the full percentile and industry breakdown.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Physical Therapists, How to Become One (data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/physical-therapists.htm' },
			{ label: 'APTA: Becoming a Physical Therapist', url: 'https://www.apta.org/your-career/careers-in-physical-therapy/becoming-a-pt' },
			{ label: 'FSBPT: Understanding the NPTE (Candidate Handbook)', url: 'https://www.fsbpt.org/Free-Resources/NPTE-Candidate-Handbook/Understanding-the-NPTE' },
			{ label: 'APTA Specialist Certification (governed by ABPTS): About', url: 'https://specialization.apta.org/about-abpts' },
		],
		image: '/images/physical-therapist-career-path.svg',
		imageAlt: 'Timeline diagram showing the path to becoming a physical therapist: bachelor\'s degree with prerequisite coursework, then a CAPTE-accredited Doctor of Physical Therapy (DPT) program of about three years, then passing the NPTE licensing exam, leading to a licensed physical therapist earning a median of $101,020 a year per BLS, with optional residency, fellowship, or board certification.',
	},
	{
		slug: 'how-long-is-nursing-school',
		category: 'How to Become',
		title: 'How Long Is Nursing School? RN Paths, NCLEX-RN, and Pay',
		description: 'BLS lists an associate degree in nursing at about 4 years, not 2, the same as a BSN. Here is why, plus the NCLEX-RN licensing exam and what RNs earn.',
		published: '2026-08-17',
		updated: '2026-08-17',
		socCode: '29-1141',
		coreSummary: 'Registered nurses usually take one of three education paths, a bachelor\'s degree (BSN), an associate\'s degree (ADN or ASN), or a hospital diploma program, and the Bureau of Labor Statistics lists both the BSN and the ADN/ASN as typically taking about 4 years to complete, not the 2 years commonly assumed for an associate\'s degree. Every path still ends the same way: graduates must pass the NCLEX-RN licensing exam and hold a state license before they can practice. BLS reports a median annual wage of $93,600 for registered nurses in May 2024.',
		sections: [
			{
				heading: 'The "2-year" associate degree is usually a 4-year timeline',
				body: [
					'Per the Bureau of Labor Statistics Occupational Outlook Handbook, registered nurses usually take one of three education paths: a bachelor of science in nursing (BSN), an associate\'s degree in nursing (ADN) or associate of science in nursing (ASN), or a diploma from a hospital-based program. All three include supervised clinical experience alongside classroom coursework in subjects such as anatomy, physiology, microbiology, and social and behavioral sciences.',
					'The part that surprises a lot of people planning this out: BLS describes the ADN and ASN, credentials most people think of as a 2-year degree, as typically taking about 4 years to complete, the same figure BLS gives for a BSN. The reason is prerequisites. Community college nursing programs generally require a set of science courses, such as anatomy and microbiology, completed before a student is even eligible to start the core nursing curriculum, and BLS folds that prerequisite time into its 4-year estimate rather than counting only the nursing-specific coursework. A diploma program, offered by hospitals or medical centers rather than colleges, typically runs 2 to 3 years, but BLS notes there are far fewer diploma programs left than there are BSN, ADN, or ASN programs.',
				],
			},
			{
				heading: 'Same license at the end, different hiring odds along the way',
				body: [
					'BLS is explicit that graduates of any of the three paths, bachelor\'s, associate\'s, or diploma, qualify for entry-level positions as a staff nurse once licensed. The credential level does not gate the base RN license itself. What it does affect is who is willing to hire a given candidate: BLS notes that employers, particularly hospitals, may require a bachelor\'s degree specifically, even though an ADN or diploma graduate holds the identical state license.',
					'For someone who starts with an ADN, ASN, or diploma and later wants the BSN a hospital is asking for, BLS points to RN-to-BSN bridge programs built for exactly that situation, letting a working RN add the bachelor\'s credential without repeating the associate-level coursework. Separately, BLS lists accelerated programs for career changers who already hold a bachelor\'s degree in an unrelated field, and combined bachelor\'s-and-master\'s tracks for students who know from the start they want to go past entry-level RN.',
				],
			},
			{
				heading: 'Passing the NCLEX-RN, and what state licensing actually adds',
				body: [
					'Finishing an education program is not the last step. Every state requires registered nurses to hold a nursing license, and per BLS, becoming licensed requires graduating from an approved nursing program and passing "a qualifying exam," the NCLEX-RN. The exam itself is developed and administered by the National Council of State Boards of Nursing (NCSBN), the body that represents state nursing boards, not by any individual school or program. Per NCSBN\'s own published exam details, the NCLEX-RN is a computer-adaptive test that runs a minimum of 85 and a maximum of 150 scored and experimental items combined, with a total appointment time, including the introductory screen and any breaks, capped at 5 hours.',
					'Passing the NCLEX-RN is not the entire licensing requirement on its own. BLS notes that other requirements, such as a criminal background check, vary by state, and directs candidates to each state\'s board of nursing, or to CareerOneStop\'s licensing lookup tool, for the specific rules where they plan to work. Separately, BLS notes that many registered nursing positions require CPR, basic life support (BLS certification, not the agency), or advanced cardiac life support certification as a condition of employment, on top of the state license itself, and that further voluntary certification through professional associations, in areas such as ambulatory care, gerontology, or pediatrics, is available and sometimes required by individual employers even though it is not part of state licensure.',
				],
			},
			{
				heading: 'What the license is worth, and where it can lead',
				body: [
					'BLS reports a median annual wage of $93,600 for registered nurses in May 2024 ($66,030 at the 10th percentile and $135,320 at the 90th). Pay varies by setting: government employers outside state/local education and hospitals paid the highest median BLS tracked, at $106,480, ahead of hospitals ($97,260), ambulatory healthcare services ($83,780), nursing and residential care facilities ($81,820), and educational services ($74,360), the lowest of the industries BLS breaks out for this role. BLS projects 5% employment growth for registered nurses from 2024 to 2034, faster than the average for all occupations, and separately projects about 189,100 openings a year on average, with most of those openings coming from the need to replace nurses who transfer to other occupations or leave the labor force, such as to retire, rather than from newly created positions.',
					'Against a much shorter training path, [becoming a CNA](/how-to-become-a-cna/) requires a federal minimum of just 75 hours of training rather than a multi-year degree, and BLS puts the CNA median at $39,530, about 42% of the RN figure. Against a similarly long associate-level path, [dental hygienists](/dental-hygienist-salary/), an occupation BLS itself lists among registered nurses\' similar occupations, had a slightly higher May 2024 median of $94,260 despite BLS listing an associate\'s degree, not a bachelor\'s, as dental hygienists\' typical entry-level education. None of these figures account for a given reader\'s own location, hours, or specialty, and a higher aggregate median for one occupation is not evidence that its path is the right one for any specific person weighing the options. For registered nurses who go on to graduate-level advanced practice training, BLS reports considerably higher medians: $129,210 for [nurse practitioners](/nurse-practitioner-salary/) and $223,210 for [certified registered nurse anesthetists](/crna-salary/), both of which require a master\'s degree at minimum, with CRNA programs now requiring a doctorate, on top of prior RN experience, well beyond what the base nursing license alone requires.',
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a registered nurse?',
				answer: 'It depends on the path. BLS describes both a bachelor of science in nursing (BSN) and an associate\'s degree in nursing (ADN or ASN) as typically taking about 4 years to complete, largely because of required science prerequisites completed before the core nursing coursework begins. A hospital-based diploma program, a much less common option today, typically runs 2 to 3 years. Every path still requires passing the NCLEX-RN licensing exam afterward before someone can practice.',
			},
			{
				question: 'Is an associate degree in nursing really only 2 years?',
				answer: 'Not according to BLS. The Bureau of Labor Statistics Occupational Outlook Handbook lists the ADN and ASN as typically taking about 4 years to complete, the same figure it gives for a BSN, because most programs require prerequisite science coursework, such as anatomy and microbiology, before a student can start the core nursing curriculum. The "2-year degree" framing usually refers only to the nursing-specific coursework, not the full timeline BLS reports.',
			},
			{
				question: 'What is the NCLEX-RN and how many questions does it have?',
				answer: 'The NCLEX-RN is the licensing exam every state requires registered nurses to pass, developed and administered by the National Council of State Boards of Nursing (NCSBN). Per NCSBN, it is a computer-adaptive test with a minimum of 85 and a maximum of 150 items, and a total appointment time, including the introductory screen and any breaks, capped at 5 hours.',
			},
			{
				question: 'Does it matter whether an RN has a BSN or an associate degree?',
				answer: 'For the state license itself, no; BLS states that graduates of a BSN, ADN, ASN, or diploma program all qualify for entry-level staff nurse positions once licensed. For hiring, it can matter: BLS notes that employers, particularly hospitals, may require a bachelor\'s degree specifically. RNs who start with an associate degree or diploma can add a BSN later through an RN-to-BSN bridge program without repeating their earlier coursework.',
			},
			{
				question: 'How much do registered nurses make?',
				answer: 'BLS reports a median annual wage of $93,600 for registered nurses in May 2024, with the bottom 10% earning less than $66,030 and the top 10% earning more than $135,320. The highest-paying industry BLS tracks for this role is government employment outside state/local education and hospitals, at a median of $106,480.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Registered Nurses, How to Become One (data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/registered-nurses.htm' },
			{ label: 'NCSBN: How long is the NCLEX?', url: 'https://ncsbn.zendesk.com/hc/en-us/articles/15247056118935-How-long-is-the-NCLEX' },
			{ label: 'NCSBN: What is the current format and item types for the NCLEX?', url: 'https://ncsbn.zendesk.com/hc/en-us/articles/14689546992023-What-is-the-current-format-and-item-types-for-the-NCLEX' },
			{ label: 'NCSBN: What is Computer Adaptive Testing (CAT)?', url: 'https://ncsbn.zendesk.com/hc/en-us/articles/16488590296599-What-is-Computer-Adaptive-Testing-CAT' },
		],
		image: '/images/rn-education-path.svg',
		imageAlt: 'Diagram showing three education paths to becoming a registered nurse (associate degree, bachelor of science in nursing, or hospital diploma program), converging on the NCLEX-RN licensing exam and a licensed registered nurse earning a median of $93,600 a year per BLS.',
	},
	{
		slug: 'how-long-does-it-take-to-become-a-lawyer',
		category: 'How to Become',
		title: 'How Long Does It Take to Become a Lawyer? Degree, LSAT, Bar Exam',
		description: 'BLS puts the typical path at 7 years: 4 years of undergraduate study plus 3 years of law school, then a state bar exam. Median pay is $151,160 a year.',
		published: '2026-08-17',
		updated: '2026-08-17',
		socCode: '23-1011',
		coreSummary: 'Per the U.S. Bureau of Labor Statistics, becoming a lawyer usually takes 7 years of full-time study after high school: 4 years of undergraduate study followed by 3 years of law school for a Juris Doctor (J.D.). That degree alone does not permit anyone to practice; every state also requires passing a bar exam and being admitted to the bar. BLS reports a median annual lawyer salary of $151,160 in May 2024, with the bottom 10% earning less than $72,780 and the top 10% earning more than $239,200.',
		sections: [
			{
				heading: 'The 7-year timeline BLS actually gives',
				body: [
					"Per BLS, becoming a lawyer usually takes 7 years of full-time study after high school: 4 years of undergraduate study followed by 3 years of law school. Most law schools do not require a specific bachelor's major for admission, though BLS notes that applicants commonly come in having studied law and legal studies, history, or social science.",
					"That 7-year figure covers the degree itself, not the ability to practice. Most states require the J.D. to come from a law school accredited by the American Bar Association (ABA); a J.D. from an ABA-accredited school has been treated as sufficient by every U.S. jurisdiction. California is the most notable exception: per the State Bar of California, applicants can also qualify for the California bar exam through four years of study at a state-registered but not ABA-accredited fixed-facility law school (a minimum of 270 classroom hours a year), or through a registered correspondence or distance-learning law school (a minimum of 864 study hours a year). Students at those unaccredited schools must additionally pass the First-Year Law Students' Examination, informally called the \"baby bar,\" after their first year. Per the State Bar of California, passing it within three consecutive administrations credits all law study completed up to that point; passing on a later attempt credits only one year of study toward the degree requirement.",
				],
				image: {
					src: '/images/lawyer-education-path.svg',
					alt: "Diagram showing the path to becoming a lawyer: a 4-year bachelor's degree, a 3-year Juris Doctor at an accredited law school, and a state bar exam, leading to a licensed lawyer earning a median of $151,160 a year per BLS.",
				},
			},
			{
				heading: 'Before law school: an admissions test that is starting to loosen',
				body: [
					'Most law schools still require the LSAT, administered by the Law School Admission Council (LSAC) and scored on a 120-to-180 scale, or, at a growing number of schools, the GRE, as part of the admissions file alongside transcripts and letters of recommendation. That has been the near-universal norm for decades under ABA accreditation rules.',
					'It is starting to change at the margins. In late 2024, the ABA Council of the Section of Legal Education and Admissions to the Bar agreed to let individual law schools apply for a variance from the standardized-test requirement, permitting up to 100% of an entering class to be admitted without an LSAT or GRE score, for a period of up to five years. Schools that use the variance must report outcome data back to the ABA, including first-year grades, attrition, and eventual bar passage rates. Fourteen law schools had been granted this variance as of 2025. That remains a small minority of the roughly 200 ABA-accredited law schools nationwide; the LSAT or GRE is still the norm for most applicants.',
				],
			},
			{
				heading: 'The J.D. does not let anyone practice on its own',
				body: [
					'BLS states plainly that all states require lawyers to be licensed, and that requirements vary by state. Candidates must graduate from an accredited law school and then pass a bar exam before they can practice, a step separate from and after finishing the degree itself. Bar exams are coordinated at the national level by the National Conference of Bar Examiners (NCBE), which develops the (legacy) Uniform Bar Examination (UBE): the Multistate Essay Examination, two Multistate Performance Test tasks, and the Multistate Bar Examination, combined into a single scaled score.',
					"Not every state uses the same exam. Per NCBE's own current jurisdiction list, checked directly on 2026-08-17, 35 of the 51 U.S. jurisdictions it tracks (34 states plus the District of Columbia) have adopted the legacy UBE; the rest, including California, Florida, and several others, administer their own state-specific bar exam instead. A UBE score is portable: it can be transferred to seek admission in any other UBE jurisdiction without retaking the exam, though some UBE jurisdictions still require passing a separate, shorter local-law component first. NCBE is also phasing in a redesigned NextGen UBE, with the legacy exam scheduled to stop being administered after February 2028, so the specific exam format a given state uses is likely to keep shifting over the next few years.",
					'Passing the bar and being "admitted to the bar" is not the final step either. Per BLS, states may require lawyers to participate in continuing legal education (CLE) to maintain their license, on top of the one-time licensing exam.',
				],
			},
			{
				heading: 'What the extra years buy, against other long-training paths on this site',
				body: [
					'BLS reports a median annual wage of $151,160 for lawyers in May 2024, or $72.67 an hour. The bottom 10% earned less than $72,780, and the top 10% earned more than $239,200, the ceiling BLS publishes for this figure rather than an exact top value; that data excludes self-employed lawyers and law-firm owners or partners. By industry, BLS lists federal government roles at the highest median it tracks, $174,680, ahead of legal services (the largest employer segment) at $143,470, local government excluding education and hospitals at $125,180, and state government excluding education and hospitals at $111,280, the lowest of the four. BLS projects 4% employment growth for lawyers from 2024 to 2034, which it classifies as about as fast as average, adding roughly 31,500 openings a year, most from the need to replace workers who transfer to other occupations or leave the labor force rather than from newly created positions.',
					"Against other occupations on this site that require a doctoral or professional degree, the lawyer figure sits at the top of the group: [pharmacists](/pharmacist-salary/), who need a Doctor of Pharmacy (PharmD), post a lower BLS median of $137,480, and [physical therapists](/how-to-become-a-physical-therapist/), who need a three-year Doctor of Physical Therapy after a bachelor's degree plus a licensing exam, post $101,020. [Paralegals](/how-to-become-a-paralegal/), whose BLS page lists lawyers as a comparison point precisely because paralegals support them without being licensed to practice law, post a considerably lower median of $61,010 on an associate's-degree or certificate entry path. None of these comparisons account for a reader's own state, practice area, or years of experience, and BLS's national medians are not built to say which path is the better financial bet for any one person.",
				],
			},
		],
		faq: [
			{
				question: 'How many years does it take to become a lawyer?',
				answer: "Per BLS, the typical path is 7 years of full-time study after high school: 4 years of undergraduate study followed by 3 years of law school for a J.D. Finishing the degree is not the last step, though; every state also requires passing a bar exam before someone can practice law.",
			},
			{
				question: 'Do you need the LSAT to get into law school?',
				answer: 'Most law schools still require the LSAT, administered by LSAC and scored 120 to 180, or the GRE at a growing number of schools. A 2024 ABA policy change lets individual law schools apply for a variance to admit up to 100% of an entering class without a standardized test score; 14 schools had that variance as of 2025, out of roughly 200 ABA-accredited schools nationwide, so it remains the exception rather than the norm.',
			},
			{
				question: 'Does finishing law school let you practice right away?',
				answer: 'No. BLS states that all states require lawyers to be licensed, and requirements vary by state. Candidates must graduate from an accredited law school and pass a state bar exam, coordinated in most states through NCBE\'s Uniform Bar Examination, before they can practice. Per BLS, states may also require ongoing continuing legal education to maintain the license afterward.',
			},
			{
				question: 'What is the highest-paying industry for lawyers?',
				answer: 'Per BLS May 2024 data, federal government roles post the highest median lawyer pay tracked, at $174,680, ahead of legal services (the largest employer segment for the occupation) at $143,470, local government at $125,180, and state government at $111,280.',
			},
			{
				question: 'Is being a lawyer a growing career?',
				answer: 'BLS projects 4% employment growth for lawyers from 2024 to 2034, which it classifies as about as fast as average across all occupations, adding an estimated 35,900 jobs and roughly 31,500 openings a year on average. Most of those openings come from the need to replace lawyers who transfer to other work or leave the labor force, such as to retire, rather than from newly created positions.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Lawyers (accessed 2026-08-17 via r.jina.ai reader proxy, direct fetch blocked by Akamai bot detection, data from May 2024)', url: 'https://www.bls.gov/ooh/legal/lawyers.htm' },
			{ label: 'NCBE (National Conference of Bar Examiners): UBE Jurisdictions (checked 2026-08-17)', url: 'https://www.ncbex.org/exams/ube' },
			{ label: 'LSAC (Law School Admission Council): LSAT Scoring', url: 'https://www.lsac.org/lsat/lsat-scoring' },
			{ label: 'State Bar of California: Legal Education at a Fixed-Facility Law School', url: 'https://www.calbar.ca.gov/admissions/requirements/education/legal-education/fixed-facility' },
		],
		image: '/images/lawyer-education-path.svg',
		imageAlt: "Diagram showing the path to becoming a lawyer: a 4-year bachelor's degree, a 3-year Juris Doctor at an accredited law school, and a state bar exam, leading to a licensed lawyer earning a median of $151,160 a year per BLS.",
	},
	{
		slug: 'hvac-certification',
		category: 'How to Become',
		title: 'HVAC Certification: EPA 608 Requirements, Training, and Pay',
		description: 'Federal law requires HVAC technicians to pass an EPA Section 608 exam before touching refrigerant. Here is what it covers, plus BLS training and pay data.',
		published: '2026-08-18',
		updated: '2026-08-18',
		socCode: '49-9021',
		coreSummary: "Federal law requires nearly all HVAC technicians to pass an EPA Section 608 exam before working with refrigerant, on top of whatever postsecondary training or apprenticeship gets them there. The exam has four types (Core plus Type I, II, III, or Universal), and the credential does not expire once earned. The U.S. Bureau of Labor Statistics reports a median annual wage of $59,810 for heating, air conditioning, and refrigeration mechanics and installers in May 2024, with the bottom 10% earning less than $39,130 and the top 10% earning more than $91,020.",
		sections: [
			{
				heading: 'EPA Section 608: the certification federal law actually requires',
				body: [
					"Every HVAC technician needs one federal credential before touching refrigerant: EPA Section 608 Technician Certification. Under 40 CFR Part 82, Subpart F, the U.S. Environmental Protection Agency requires anyone who attaches or detaches hoses and gauges to measure refrigerant pressure, or who adds or removes refrigerant from an appliance, to hold that certification before doing the work. The EPA defines four types of certification: Type I for servicing small appliances, Type II for high- and very-high-pressure appliances (most residential and light-commercial air conditioning falls here), Type III for low-pressure appliances, and Universal, which covers all three and requires passing every underlying test.",
					"Each certification type requires passing a Core exam plus the type-specific test, both administered by an EPA-approved certifying organization; the tests are typically bundled into the postsecondary HVACR programs described below. One detail trips people up: the EPA specifies that Core exams taken open-book cannot be used toward a Universal certification. A candidate aiming for Universal has to sit the Core section as a proctored exam. Once earned, Section 608 Technician Certification does not expire, unlike many state trade licenses that require periodic renewal. The EPA also carves out an exemption for apprentices, who can perform the same refrigerant-handling tasks without holding the certification themselves as long as a certified technician closely and continually supervises them.",
				],
				image: {
					src: '/images/hvac-certification-path.svg',
					alt: 'Diagram showing the path to HVAC certification: a postsecondary program or apprenticeship, the EPA Section 608 exam (Core plus Type I, II, III, or Universal), an optional state or local license, and optional NATE or manufacturer certification, leading to an HVAC technician earning a median of $59,810 a year per BLS.',
				},
			},
			{
				heading: 'The training that comes before the exam',
				body: [
					"Per BLS, HVAC technicians typically need a postsecondary nondegree award, though some enter with less education. Most get there through technical or trade schools and community colleges offering programs in heating, air conditioning, and refrigeration; BLS describes these programs as running 6 months to 2 years and leading to either a certificate or an associate's degree. Some employers will consider a candidate whose highest credential is a high school diploma, and BLS specifically recommends vocational education, math, and physics coursework for high schoolers weighing this path.",
					'A smaller share of technicians train through an apprenticeship instead, which BLS describes as usually running several years and combining paid on-the-job training with technical instruction each year, covering topics such as safety practices, blueprint reading, and heating and cooling systems. Either route, newly hired technicians start on basic tasks like insulating refrigerant lines or cleaning furnaces before moving on to harder work such as cutting and soldering pipes or checking electrical circuits, per BLS.',
					"Beyond the federally required EPA exam, some states and localities layer on their own licensing requirements; BLS directs readers to CareerOneStop's licensing tool rather than listing every jurisdiction's rules on one page, and this article does the same rather than guessing at a specific state's process. Manufacturer and industry certifications, such as those from North American Technician Excellence (NATE) or HVAC Excellence, are optional under federal and most state law, though BLS notes some employers prefer or require specific ones. A driver's license is also typically needed, since most technicians travel between jobsites.",
				],
			},
			{
				heading: 'What HVAC technicians earn once certified',
				body: [
					'BLS reported a median annual wage of $59,810 for heating, air conditioning, and refrigeration mechanics and installers in May 2024, or $28.75 an hour. The bottom 10% earned less than $39,130, and the top 10% earned more than $91,020, a roughly $52,000 spread that reflects differences in experience, certification level, region, and employer, not any single factor BLS isolates. For comparison, BLS puts the broader installation, maintenance, and repair occupational group at a median of $58,230, and the median across all occupations in the economy at $49,500; HVAC technicians sit modestly above both.',
					'BLS breaks out May 2024 wages by industry into four tracked categories. Wholesale trade paid the highest median at $65,760, followed by educational services (state, local, and private) at $60,960 and retail trade at $60,730. Plumbing, heating, and air-conditioning contractors, the industry that employs 70% of technicians in this occupation, paid the lowest of the four tracked categories, $58,750, close to but below the occupation-wide median.',
				],
			},
			{
				heading: "Job outlook, and how it compares to other trades",
				body: [
					'BLS projects 8% employment growth for heating, air conditioning, and refrigeration mechanics and installers from 2024 to 2034, which it classifies as much faster than average, adding an estimated 34,500 jobs and about 40,100 openings a year on average over the decade. As with most occupations BLS tracks, many of those annual openings are expected to come from workers who transfer to other occupations or leave the labor force, such as to retire, rather than from newly created positions alone. BLS attributes underlying demand to commercial and residential building construction plus a growing number of sophisticated climate-control systems that need installing and servicing, along with rising emphasis on energy efficiency driving retrofits and replacements.',
					"Against other no-bachelor's-degree trades this site has covered, HVAC's 8% growth rate trails the 9% BLS projects for [electricians](/how-to-become-an-electrician/), but comfortably outpaces the 4% BLS projects for [plumbers, pipefitters, and steamfitters](/plumbing-apprenticeship/). On pay, HVAC's $59,810 median trails both of those trades, whose medians run in the low $62,000s after a comparably structured multi-year apprenticeship. [Becoming a CNA](/how-to-become-a-cna/) sits at the far end of the training-length spectrum, a federal minimum of 75 hours rather than a postsecondary program or apprenticeship, with a median of $39,530, well below any of the trades above. BLS data describes the aggregate labor market for each occupation; it is not a claim that any one path pays better for a specific person once local demand, certification level, and years of experience are factored in.",
				],
			},
		],
		faq: [
			{
				question: 'Do I need EPA certification to work on HVAC systems?',
				answer: "Yes, if the work involves refrigerant. Federal law (40 CFR Part 82, Subpart F) requires anyone who measures refrigerant pressure or adds or removes refrigerant from an appliance to hold EPA Section 608 Technician Certification. Apprentices are exempt as long as a certified technician closely and continually supervises them.",
			},
			{
				question: "What's the difference between EPA 608 Type I, II, III, and Universal?",
				answer: 'Type I covers small appliances. Type II covers high- and very-high-pressure appliances, which includes most residential and light-commercial air conditioning. Type III covers low-pressure appliances. Universal certification means passing the Core exam plus all three type-specific tests; the Core section must be taken proctored, not open-book, to count toward Universal.',
			},
			{
				question: 'How long does it take to become HVAC certified?',
				answer: 'BLS describes two main routes: a postsecondary program at a trade school or community college, running 6 months to 2 years and leading to a certificate or associate\'s degree, or an apprenticeship that usually runs several years and combines paid on-the-job training with technical instruction. The EPA Section 608 exam itself is typically bundled into these programs rather than requiring separate additional time.',
			},
			{
				question: 'Does EPA HVAC certification expire?',
				answer: 'No. Per the EPA, Section 608 Technician Certification credentials do not expire once earned, unlike many state trade licenses that require periodic renewal.',
			},
			{
				question: 'How much do HVAC technicians make?',
				answer: 'BLS reports a median annual wage of $59,810 for heating, air conditioning, and refrigeration mechanics and installers in May 2024, with the bottom 10% earning less than $39,130 and the top 10% earning more than $91,020. Wholesale trade paid the highest industry median tracked, at $65,760.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Heating, Air Conditioning, and Refrigeration Mechanics and Installers (accessed 2026-08-18 via r.jina.ai reader proxy, direct fetch blocked by Akamai bot detection, data from May 2024)', url: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/heating-air-conditioning-and-refrigeration-mechanics-and-installers.htm' },
			{ label: 'U.S. EPA: Section 608 Technician Certification Requirements (accessed 2026-08-18 via r.jina.ai reader proxy)', url: 'https://www.epa.gov/section608/section-608-technician-certification-requirements' },
		],
		image: '/images/hvac-certification-path.svg',
		imageAlt: 'Diagram showing the path to HVAC certification: a postsecondary program or apprenticeship, the EPA Section 608 exam (Core plus Type I, II, III, or Universal), an optional state or local license, and optional NATE or manufacturer certification, leading to an HVAC technician earning a median of $59,810 a year per BLS.',
	},
	{
		slug: 'how-long-does-it-take-to-become-a-dentist',
		category: 'How to Become',
		title: 'How Long Does It Take to Become a Dentist? DAT, Degree, Exams',
		description: 'BLS puts the typical path at 8 years: 4 years of undergraduate study plus 4 years of dental school, then licensing exams. Median pay is $179,210 a year.',
		published: '2026-08-18',
		updated: '2026-08-18',
		socCode: '29-1020',
		coreSummary: 'Per the U.S. Bureau of Labor Statistics, becoming a dentist usually takes 8 years of full-time study after high school: 4 years of undergraduate study followed by 4 years of dental school for a DDS or DMD degree. That degree alone does not permit anyone to practice; nearly every state also requires passing the INBDE and a separate state or regional clinical exam. BLS reports a median annual dentist salary of $179,210 in May 2024, with the bottom 10% earning less than $84,740 and the top 10% earning more than $239,200.',
		sections: [
			{
				heading: 'The 8-year timeline BLS actually gives',
				body: [
					"Per BLS, becoming a dentist usually takes 8 years of full-time study after high school: 4 years of undergraduate study followed by 4 years of dental school. Most dental programs require applicants to hold at least a bachelor's degree and to have completed certain science coursework, such as biology or chemistry, though BLS notes no specific undergraduate major is required. Programs award either a Doctor of Dental Surgery (DDS) or a Doctor of Medicine in Dentistry/Doctor of Dental Medicine (DMD). Per the American Dental Association, the two are the same degree under different names, tracing back to how individual universities chose to translate the degree into Latin when dental schools were first founded; both follow the same CODA curriculum standards.",
					"That 8-year figure covers general dentistry only. Dentists who want to practice a specialty, such as orthodontics or periodontics, need additional postdoctoral training after dental school; per BLS, this is usually a 2- to 4-year residency that often ends in a postdoctoral certificate or master's degree. Oral and maxillofacial surgery runs longer still, typically 4 to 6 years, and BLS notes candidates in that specialty may also earn a joint Doctor of Medicine (M.D.) degree along the way. Dental schools themselves must be accredited by the Commission on Dental Accreditation (CODA), a specialized accrediting agency recognized by the U.S. Department of Education; per the American Dental Association, graduating from a CODA-accredited program is what state boards generally require before a candidate can sit for licensing exams.",
				],
				image: {
					src: '/images/dentist-education-path.svg',
					alt: "Diagram showing the path to becoming a dentist: a 4-year bachelor's degree, 4 years earning a DDS or DMD at a CODA-accredited dental school, the INBDE plus a state or regional clinical exam, leading to a licensed dentist earning a median of $179,210 a year per BLS.",
				},
			},
			{
				heading: 'Before dental school: an admissions test that just changed its scale',
				body: [
					'Nearly every U.S. dental school requires the Dental Admission Test (DAT), a computer-based exam administered by the American Dental Association that covers Biology, General Chemistry, Organic Chemistry, Perceptual Ability, Reading Comprehension, and Quantitative Reasoning. Admissions committees weigh DAT scores alongside GPA, letters of recommendation, and interviews rather than using the score as a standalone cutoff.',
					'The scoring scale itself changed recently. Per the ADA, starting March 1, 2025, DAT score reporting moved from a 1-to-30 scale to a new 200-to-600 scale in 10-point increments, with 400 representing roughly average performance among test-takers that year. Candidates can sit for the DAT up to three times without needing special authorization for further retakes, and score validity typically runs 2 to 3 years depending on the dental school.',
				],
			},
			{
				heading: 'The DDS or DMD does not let anyone practice on its own',
				body: [
					'BLS states plainly that dentists must be licensed in the state in which they work, and that requirements vary by state. Most states require a DDS or DMD from an accredited dental program, a passing score on a written exam, and a passing score on a state or regional clinical examination, three separate hurdles rather than one.',
					"The written component is the Integrated National Board Dental Examination (INBDE), administered by the Joint Commission on National Dental Examinations. It is a two-day digital exam totaling about 12 hours and 30 minutes of administration time, including breaks; per the Joint Commission, it is accepted in all U.S. states and territories as fulfilling all or part of the written exam requirement for licensure. Eligibility is built around graduating from a CODA-accredited program, though the Joint Commission's own candidate guide also documents a separate route for graduates of non-CODA-accredited programs, who qualify through a credential evaluation instead.",
					"For the separate clinical component, most states rely on a regional testing agency rather than running their own exam. Per the American Board of Dental Examiners, checked directly on 2026-08-18, its ADEX clinical exam is accepted for initial licensure by 48 states plus Washington, D.C. and Puerto Rico. Delaware is the one state that instead runs its own state-administered practical exam. New York does not use a standalone clinical exam at all: per New York Education Law and the state's Office of the Professions, the state eliminated the clinical-exam pathway in 2007 and instead requires a 1-year postgraduate residency program with a built-in competency evaluation before initial licensure.",
				],
			},
			{
				heading: 'Dentist pay, and where it lands among the other advanced-degree fields on this site',
				body: [
					'BLS reports a median annual wage of $179,210 for dentists in May 2024, or $86.16 an hour, a figure covering general dentists together with the smaller population of dental specialists. The bottom 10% earned less than $84,740, and the top 10% earned more than $239,200, the ceiling BLS publishes for this figure rather than an exact top value. By industry, BLS lists government roles, excluding state and local education and hospitals, at the highest median it tracks, $213,210, ahead of offices of physicians at $180,120, outpatient care centers at $179,460, and offices of dentists, the industry employing the largest share of the occupation, at $178,300, the lowest of the four. BLS projects 4% employment growth for dentists from 2024 to 2034, about as fast as average, adding roughly 4,500 openings a year, mostly from workers who transfer to other occupations or leave the labor force rather than from newly created positions.',
					"Dentists post the highest BLS median among the fields this site has covered so far that BLS itself classifies as requiring a doctoral or professional degree, ahead of [lawyers](/how-long-does-it-take-to-become-a-lawyer/) at $151,160, [pharmacists](/pharmacist-salary/) at $137,480, and [physical therapists](/how-to-become-a-physical-therapist/) at $101,020. One exception worth naming: this site's [CRNA salary guide](/crna-salary/) reports a higher median, $223,210, for nurse anesthetists. BLS's own entry-education table for that occupation still says master's degree, but the field's accrediting body has required a doctoral degree for every newly enrolled student since 2022, so the comparison depends on whether a reader goes by BLS's label or by current practice. Time in school varies too: dentists and physical therapists both run roughly 7 to 8 years past high school combining undergraduate and professional study, lawyers commonly run around 7, and pharmacists can finish in as few as 6 years, since PharmD programs can admit candidates after just two years of prerequisite coursework rather than a full bachelor's degree. A national median folds together every state, specialty, and experience level BLS tracks; it says nothing about what a specific reader would earn, or which of these fields is the sounder financial choice for them individually.",
				],
			},
		],
		faq: [
			{
				question: 'How many years does it take to become a dentist?',
				answer: "BLS puts the typical timeline at 8 years past high school: a 4-year bachelor's degree, then 4 years of dental school to earn a DDS or DMD. That degree does not put someone in practice on its own; nearly every state also requires passing the INBDE and satisfying a state clinical requirement first.",
			},
			{
				question: 'Do you need the DAT to get into dental school?',
				answer: 'Nearly every U.S. dental school requires the DAT, administered by the American Dental Association. Per the ADA, the scoring scale changed on March 1, 2025, moving from a 1-to-30 scale to a 200-to-600 scale in 10-point increments, with 400 representing roughly average performance.',
			},
			{
				question: 'Does finishing dental school let you practice right away?',
				answer: "It does not. Per BLS, every state requires dentists to be licensed, with requirements that vary by state. Candidates need a CODA-accredited dental degree (or a credential-evaluation route for non-CODA-accredited programs), a passing INBDE score, and a state clinical requirement. Most states satisfy that last piece with the ADEX clinical exam; Delaware runs its own practical exam instead, and New York replaced the clinical-exam requirement entirely in 2007 with a 1-year postgraduate residency.",
			},
			{
				question: 'What is the highest-paying industry for dentists?',
				answer: 'Per BLS May 2024 data, government roles (excluding state and local education and hospitals) post the highest median dentist pay tracked, at $213,210, ahead of offices of physicians at $180,120, outpatient care centers at $179,460, and offices of dentists, the largest employer segment for the occupation, at $178,300.',
			},
			{
				question: 'Is being a dentist a growing career?',
				answer: 'Yes, at a modest pace. BLS classifies the projected 4% growth for dentists between 2024 and 2034 as about as fast as average, translating to an estimated 5,900 additional jobs and roughly 4,500 openings a year. BLS attributes most of those yearly openings to dentists leaving the occupation, whether by retiring or moving into other work, rather than to newly created positions.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Dentists (accessed 2026-08-18 via r.jina.ai reader proxy, direct fetch blocked by Akamai bot detection, data from May 2024)', url: 'https://www.bls.gov/ooh/healthcare/dentists.htm' },
			{ label: 'American Dental Association: Understanding the New DAT Score Reporting Scale', url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/education/dat_scorereportingscale.pdf' },
			{ label: 'ADEA (American Dental Education Association): ADA DAT FAQ', url: 'https://www.adea.org/godental/Apply/admissions-process/ada-dat-faq' },
			{ label: 'ADA MouthHealthy: DDS and DMD', url: 'https://www.mouthhealthy.org/all-topics-a-z/dds-and-dmd' },
			{ label: 'Joint Commission on National Dental Examinations: INBDE', url: 'https://jcnde.ada.org/inbde' },
			{ label: 'American Board of Dental Examiners: ADEX Acceptance Map (checked 2026-08-18)', url: 'https://adextesting.org/adex-acceptance-map/' },
			{ label: 'New York State Office of the Professions: Dentistry License Requirements', url: 'https://www.op.nysed.gov/professions/dentists/license-requirements' },
		],
		image: '/images/dentist-education-path.svg',
		imageAlt: "Diagram showing the path to becoming a dentist: a 4-year bachelor's degree, 4 years earning a DDS or DMD at a CODA-accredited dental school, the INBDE plus a state or regional clinical exam, leading to a licensed dentist earning a median of $179,210 a year per BLS.",
	},
	{
		slug: 'how-to-become-a-librarian',
		category: 'How to Become',
		title: 'How to Become a Librarian: Degree, Certification, and Pay',
		description: "BLS says most librarians need a master's degree in library science, usually from an ALA-accredited program after a bachelor's. Median pay is $64,320 a year.",
		published: '2026-08-19',
		updated: '2026-08-19',
		socCode: '25-4022',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, most librarians need a master's degree in library science (an MLS or MLIS), which comes after a bachelor's degree in any field and typically takes 1 to 2 years; the American Library Association notes that most librarian positions call for a program it has accredited. School librarians additionally need state teaching certification, and requirements vary by state. BLS reports a median annual wage of $64,320 in May 2024, with the bottom 10% earning less than $38,920 and the top 10% earning more than $100,880.",
		sections: [
			{
				heading: 'The graduate degree BLS says you need',
				body: [
					"Per BLS, librarians typically need a master's degree in library science, generally shortened to MLS; some schools use other names for the same credential, such as Master of Information Studies or Master of Library and Information Studies (MLIS). A bachelor's degree in any major is the entry requirement for these graduate programs, which BLS says usually take 1 to 2 years to complete. Coursework typically covers research methods and strategies, online reference systems, and internet search techniques.",
					"BLS's occupational profile does not name a specific accrediting body for these graduate programs. The American Library Association, in its own guidance for prospective librarians, states that \"a master's degree in library science (MLS), preferably from an American Library Association (ALA) accredited program, is necessary for most librarian positions in most public, academic, and special libraries,\" and it maintains a directory of the programs it has accredited. School librarians are the exception BLS calls out directly: they may not need an MLS, but typically need a bachelor's or master's degree in a related field along with a teaching certificate, and requirements vary by state.",
				],
				image: {
					src: '/images/librarian-education-path.svg',
					alt: "Diagram showing the path to becoming a librarian: a 4-year bachelor's degree, a 1-to-2-year master's in library science (MLS or MLIS), state licensing where the job requires it, leading to a librarian earning a median of $64,320 a year per BLS.",
				},
			},
			{
				heading: 'Licensing depends on where the job is',
				body: [
					"Requirements split by setting. For public, academic, and special libraries, BLS says some states also require certification for librarians in public libraries specifically, and directs candidates to check with their state's licensing board rather than assuming a single national rule.",
					'School librarians, sometimes called school library media specialists, face the most consistent added step: most states require a teaching certificate on top of the library-science coursework, and BLS notes some states require passing a standardized test, which it names as the \"PRAXIS II Library Media Specialist test.\" That naming has since moved on at the test publisher: ETS, which administers the Praxis series, currently lists the relevant assessment as the Praxis School Librarian test, test code 5312, built around the ALA/AASL/CAEP National School Librarian Standards. A state education department may still refer to an older test name or code in its own regulations, so checking directly with the specific state board is the reliable way to confirm which version currently applies.',
				],
			},
			{
				heading: 'What librarians actually do, and where',
				body: [
					"Per BLS, librarians and library media specialists help people find information and conduct research for personal and professional use, with day-to-day duties that include organizing library materials and databases, helping patrons evaluate research and reference materials, reviewing new books and materials for purchase, planning programs such as children's story time, teaching classes on information resources, and supervising library technicians, assistants, and volunteers. In small libraries, one person often handles most of these tasks; in large libraries, staff tend to specialize in one area, such as user services, technical services, or administration.",
					'BLS groups the work into several types. Public librarians serve their communities broadly, from readers\' advisory to program planning. School librarians work in K-12 settings, teaching students to use library resources and helping teachers find classroom materials. Academic librarians support students, faculty, and staff at colleges and universities, sometimes specializing by subject area. Special librarians work outside school and public systems, inside businesses, law firms, hospitals, and museums, and BLS notes they may need an additional degree in the subject they specialize in; examples include corporate, law, and medical librarians. Most librarians work full time, though part-time work is common, and BLS says the largest employers are local government (32% of jobs) and local elementary and secondary schools (31%).',
				],
			},
			{
				heading: "Pay, industry mix, and outlook, against other master's-level jobs on this site",
				body: [
					'BLS reports a median annual wage of $64,320 for librarians and media collections specialists in May 2024, or $30.92 an hour, above the $49,500 median for all workers that same year. The bottom 10% earned less than $38,920, and the top 10% earned more than $100,880, the boundary figures BLS publishes rather than exact percentile values. By industry, local elementary and secondary schools paid the highest tracked median at $69,880, followed by state colleges and universities at $68,570, private colleges and universities at $66,260, and local government outside of education and hospitals at $60,510.',
					'BLS projects 2% employment growth for librarians and media collections specialists from 2024 to 2034, which it classifies as slower than average, adding an estimated 2,400 jobs. Despite that limited growth, BLS still projects about 13,500 openings a year on average, since most come from replacing workers who transfer to other occupations or leave the labor force rather than from newly created positions.',
					"Against other occupations on this site that also require a master's degree to enter, librarians post a noticeably lower median: [physician assistants](/physician-assistant-salary/) report $133,260, [nurse practitioners](/nurse-practitioner-salary/) report $129,210, and [certified registered nurse anesthetists](/crna-salary/) report $223,210, more than triple the librarian figure. BLS does not break down why the gap exists; the comparison describes what BLS's entry-education categories group together, not a claim that any one master's degree is the better investment for a given reader.",
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a librarian?',
				answer: "Per BLS, the typical path is about 6 years of full-time study after high school: a 4-year bachelor's degree in any major, followed by a master's degree in library science (MLS or MLIS) that usually takes 1 to 2 years. School librarians may follow a different timeline if their state requires a teaching certificate on top of that coursework.",
			},
			{
				question: 'Do you need a master\'s degree to become a librarian?',
				answer: "Usually, yes. BLS says librarians typically need a master's degree in library science, and the American Library Association states that most librarian positions require a program it has accredited. The exception is school librarians, who BLS says may not need an MLS but typically need a bachelor's or master's degree in a related field plus a state teaching certificate instead.",
			},
			{
				question: 'What test do school librarians have to pass?',
				answer: 'It depends on the state. BLS references the "PRAXIS II Library Media Specialist test" as an example some states require. The test publisher, ETS, currently administers this assessment under the name Praxis School Librarian, test code 5312. A specific state\'s licensing rule may still cite an older name or code, so checking with that state\'s education department directly is the reliable way to confirm.',
			},
			{
				question: 'How much do librarians make?',
				answer: 'BLS reports a median annual wage of $64,320 for librarians and media collections specialists in May 2024 ($30.92 an hour), with the bottom 10% earning less than $38,920 and the top 10% earning more than $100,880. Pay is highest, per BLS industry data, in local elementary and secondary schools ($69,880) and lowest among the tracked industries in web search portals, libraries, archives, and other information services ($59,810).',
			},
			{
				question: 'Is librarian a growing career?',
				answer: 'Not by much, per BLS. It projects 2% employment growth from 2024 to 2034, slower than the average across all occupations, adding an estimated 2,400 jobs. BLS still projects about 13,500 openings a year on average over that period, mostly from the need to replace librarians who transfer to other work or leave the labor force, such as to retire.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Librarians and Library Media Specialists (accessed 2026-08-19 via direct fetch -- a UA string with a declared contact URL returned 200 consistently, a plain browser UA returned 403 in the same window, data from May 2024)', url: 'https://www.bls.gov/ooh/education-training-and-library/librarians.htm' },
			{ label: 'American Library Association: Become a Librarian', url: 'https://www.ala.org/educationcareers/libcareers/become' },
			{ label: 'American Association of Law Libraries: Education requirements for law librarians (independent corroboration of the ALA-accreditation norm)', url: 'https://www.aallnet.org/careers/about-the-profession/education/' },
			{ label: 'ETS Praxis: School Librarian (5312)', url: 'https://praxis.ets.org/test/school-librarian-5312.html' },
			{ label: 'East Tennessee State University: School Librarianship Praxis Requirement (independent corroboration of the 5312 test name and code)', url: 'https://www.etsu.edu/coe/cuai/graduate/mediatech/slmpraxisreq.php' },
			{ label: 'O*NET OnLine: 25-4022.00 Librarians and Media Collections Specialists', url: 'https://www.onetonline.org/link/summary/25-4022.00' },
		],
		image: '/images/librarian-education-path.svg',
		imageAlt: "Diagram showing the path to becoming a librarian: a 4-year bachelor's degree, a 1-to-2-year master's in library science (MLS or MLIS), state licensing where the job requires it, leading to a librarian earning a median of $64,320 a year per BLS.",
	},
	{
		slug: 'how-to-become-a-bartender',
		category: 'How to Become',
		title: 'How to Become a Bartender: Training, Licensing, and Pay',
		description: "BLS says bartenders typically need no formal education, just a few weeks of on-the-job training and a state responsible-server course. Median pay is $33,530 a year.",
		published: '2026-08-19',
		updated: '2026-08-19',
		socCode: '35-3011',
		coreSummary: 'Per the U.S. Bureau of Labor Statistics, bartenders typically need no formal education credential, just a few weeks of on-the-job training in recipes, bar setup, and customer service, plus experience in a related occupation such as serving food. Most states also require a responsible-server course before someone can pour alcohol for pay, though the specific program and its name vary by state. BLS reports a median annual wage of $33,530 in May 2024, or $16.12 an hour including tips, with 6% employment growth projected through 2034.',
		sections: [
			{
				heading: 'What BLS says it actually takes to start',
				body: [
					"Per BLS, bartenders typically need no formal education credential to enter the occupation, though some employers prefer or require a high school diploma. There is no related-work-experience requirement either, but BLS notes that many employers prefer candidates who already have food-service experience, in roles such as waiter, waitress, or bartender helper. Some aspiring bartenders instead attend a bartending school or take a course at a community college first; these programs typically cover mixing cocktails, serving customers, and setting up a bar, and BLS notes some schools help graduates find jobs, though attending one is optional rather than a BLS-stated requirement.",
					'On-the-job training is the part BLS describes as the norm: a few weeks under an experienced bartender learning cocktail recipes, bar-setup procedures, and customer service, including how to handle unruly customers. Where bartenders also serve food, BLS says training can extend to teamwork and food-handling procedures. Some employers instead use self-study materials, such as videos and instructional booklets, to teach the same skills. Most states require anyone serving alcoholic beverages to be at least 18 years old, and BLS notes bartenders must know the state and local laws governing alcohol sales in whichever jurisdiction they work.',
				],
				image: {
					src: '/images/bartender-path.svg',
					alt: 'Diagram showing the path to becoming a bartender: no formal education required, an optional entry role or bartending course, a few weeks of on-the-job training, then a working bartender earning a median of $33,530 a year per BLS, once any state-required server training is complete.',
				},
			},
			{
				heading: 'The step that varies by state: responsible-server training',
				body: [
					'BLS states that many states and localities require bartenders to complete a responsible-server course, typically covering the laws around selling alcohol, responsible serving practices, and conflict management, and that professional certification, while optional, may demonstrate basic competency to an employer; BLS points readers to CareerOneStop, a U.S. Department of Labor resource, for information on available certifications. What BLS does not spell out is how much this varies by state, so this section checks that pattern against a second, independent source rather than assuming BLS\'s general description applies uniformly everywhere.',
					"Some states run their own named program: Texas ties its TABC seller/server certification to a \"Safe Harbor\" liability defense for the employer under state alcohol law, so a business that wants that protection must certify every alcohol-handling employee within 30 days of hire, which in practice means nearly every Texas bartender ends up TABC-certified even though the certification itself is not a direct criminal mandate on the individual server; California requires Responsible Beverage Service (RBS) training and a passing exam directly of the server, typically within 60 days of the first day of work, with the credential valid for three years; Washington requires a Mandatory Alcohol Server Training (MAST) permit, typically within 60 days of hire; and Illinois requires certification under its Beverage Alcohol Sellers and Servers Education and Training (BASSET) program, typically within 120 days of hire. Other states have no statewide mandate at all, though a city or county within that state may still require training on its own. Because the rule, the program name, and the compliance window differ by state, and in some cases by city, a bartender needs to confirm the specific requirement with their own state's alcohol control agency rather than assume a single national standard, the same caveat BLS gives for state licensing throughout its occupational profiles.",
				],
			},
			{
				heading: 'Pay: what the numbers cover, and what they leave out',
				body: [
					'BLS reports a median hourly wage of $16.12 for bartenders in May 2024, equivalent to $33,530 a year, below the $23.80 median hourly wage across all occupations in the economy. These figures include tips: tipped employees earn at least the federal minimum wage, paid as some combination of direct wages and tips depending on the state, and the U.S. Department of Labor\'s Wage and Hour Division maintains a state-by-state list of minimum wages for tipped employees. The 10th percentile earned less than $9.58 an hour, and the 90th percentile earned more than $34.58, a spread of more than 3.5 times between the bottom and top of the range.',
					"BLS does not publish an annual figure for those percentile boundaries or for its industry breakdown on this occupation, only hourly ones, which this page reports as BLS gives them rather than converting to an assumed full-time annual number. That gap reflects a real feature of the job: BLS separately notes that bartenders often work late evenings, weekends, and holidays, and that part-time work is common with schedules that vary, so a straight hourly-times-2080 conversion would imply a full-time year that many bartenders do not actually work. By industry, BLS reports the highest hourly median in traveler accommodation ($17.18), followed by full-service restaurants ($16.87), drinking places that serve alcoholic beverages ($15.00), amusement, gambling, and recreation industries ($14.77), and civic and social organizations ($13.18).",
				],
			},
			{
				heading: 'Outlook, and how the training bar compares to other no-degree paths on this site',
				body: [
					'BLS projects 6% employment growth for bartenders from 2024 to 2034, faster than the roughly 3% average across all occupations, adding an estimated 44,800 jobs to the 756,700 already employed in 2024. About 129,600 openings are projected each year on average, and BLS attributes most of that to population and income growth increasing demand for food, drinks, and entertainment, particularly at full-service restaurants and breweries, plus continued need to replace workers who transfer to other occupations or leave the labor force.',
					"Bartending sits at the short end of the training-length spectrum among no-degree occupations covered on this site. BLS lists no formal education requirement and a few weeks of on-the-job training for bartenders, compared with [becoming a CNA](/how-to-become-a-cna/), which requires a federal minimum of 75 hours of state-approved training, and the structured, multi-year apprenticeship model behind a [plumbing apprenticeship](/plumbing-apprenticeship/), which typically runs 4 to 5 years. [Welding](/welder-salary/) lands in between: BLS describes several viable entry routes rather than one standard path, from a few months of employer on-the-job training to a longer vocational program. That shorter training time comes with a lower median: BLS puts the bartender median at $33,530 a year, below the $39,530 BLS reports for nursing assistants and further below the $51,000 median for welders, cutters, solderers, and brazers. BLS data describes national training requirements and pay levels for each occupation; it is not a claim that any one path is the better choice for a given reader.",
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a bartender?',
				answer: 'Per BLS, there is no formal education requirement, and on-the-job training typically runs a few weeks. Add time for a state-required responsible-server course where one applies, which in states like Texas and California must be completed within 30 to 60 days of starting the job, and someone can realistically become a working bartender within a couple of months of entering the field.',
			},
			{
				question: 'Do you need a license or certification to be a bartender?',
				answer: 'It depends on the state. Many states and localities require a responsible-server course before someone can serve alcohol for pay, such as California\'s RBS training, Washington\'s MAST permit, or Illinois\'s BASSET certification, all completed directly by the server. Texas works a bit differently: its TABC certification is tied to a Safe Harbor liability defense for the employer rather than a direct mandate on the server, but because employers rely on that protection, nearly every Texas bartender ends up certified within 30 days of hire anyway. The specific program and compliance window vary by state, and some states have no statewide mandate at all. Professional bartending certification beyond that is optional, per BLS, though it may help demonstrate competency to an employer.',
			},
			{
				question: 'How old do you have to be to bartend?',
				answer: 'Per BLS, most states require workers who serve alcoholic beverages to be at least 18 years old, though the exact minimum age and any additional restrictions depend on the specific state.',
			},
			{
				question: 'How much do bartenders make?',
				answer: 'BLS reports a median hourly wage of $16.12 for bartenders in May 2024, equivalent to $33,530 a year, including tips. The bottom 10% earned less than $9.58 an hour, and the top 10% earned more than $34.58. Pay is highest, per BLS industry data, in traveler accommodation ($17.18/hour) and lowest among the tracked industries in civic and social organizations ($13.18/hour).',
			},
			{
				question: 'Is bartending a growing career?',
				answer: 'Yes, per BLS. It projects 6% employment growth for bartenders from 2024 to 2034, faster than the roughly 3% average across all occupations, adding an estimated 44,800 jobs and about 129,600 openings a year on average, driven mostly by population and income growth increasing demand for food, drinks, and entertainment.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Bartenders (accessed 2026-08-19 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024)', url: 'https://www.bls.gov/ooh/food-preparation-and-serving/bartenders.htm' },
			{ label: 'Texas Alcoholic Beverage Commission: TABC Certification (independent corroboration of state-by-state responsible-server training variation)', url: 'https://www.tabc.texas.gov/services/tabc-certification/' },
			{ label: 'California Department of Alcoholic Beverage Control: Responsible Beverage Service (RBS) Training Program', url: 'https://www.abc.ca.gov/licensing/responsible-beverage-service' },
			{ label: 'Washington State Liquor and Cannabis Board: Get an Alcohol Server Permit (MAST) (independent corroboration of the Washington claim)', url: 'https://lcb.wa.gov/mastrvp/mandatory_alcohol_server_training' },
			{ label: 'Illinois Liquor Control Commission: BASSET Program (independent corroboration of the Illinois claim)', url: 'https://ilcc.illinois.gov/divisions/education/programs/basset.html' },
			{ label: 'U.S. Department of Labor, Wage and Hour Division: Minimum Wages for Tipped Employees', url: 'https://www.dol.gov/agencies/whd/state/minimum-wage/tipped' },
			{ label: 'CareerOneStop (U.S. Department of Labor): Certification Finder', url: 'https://www.careeronestop.org/Toolkit/Training/find-certifications.aspx' },
			{ label: 'O*NET OnLine: 35-3011.00 Bartenders', url: 'https://www.onetonline.org/link/summary/35-3011.00' },
		],
		image: '/images/bartender-path.svg',
		imageAlt: 'Diagram showing the path to becoming a bartender: no formal education required, an optional entry role or bartending course, a few weeks of on-the-job training, then a working bartender earning a median of $33,530 a year per BLS, once any state-required server training is complete.',
	},
	{
		slug: 'how-to-become-a-psychologist',
		category: 'How to Become',
		title: 'How to Become a Psychologist: Degree, Licensing, and Pay',
		description: "BLS says psychologists typically need a master's or doctoral degree, plus state licensing that includes passing an exam. Median pay is $94,310 a year in May 2024.",
		published: '2026-08-20',
		updated: '2026-08-20',
		socCode: '19-3030',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, psychologists typically need an advanced degree, either a master's or a doctoral degree in psychology, and licensure is required in every state for those who practice independently. Clinical and counseling psychologists, the field's largest single group, typically need a Ph.D. or Psy.D.; industrial-organizational and school psychologists can typically enter with a master's degree. Per the Association of State and Provincial Psychology Boards (ASPPB), which develops and administers the field's licensing exam, all 66 of the U.S. and Canadian jurisdictions it represents require passing the Examination for Professional Practice in Psychology (EPPP) before licensure; Florida's own licensing board independently confirms the EPPP requirement for that state. BLS reports a median annual wage of $94,310 in May 2024, with the bottom 10% earning less than $54,860 and the top 10% earning more than $157,330.",
		sections: [
			{
				heading: 'The degree BLS says you need depends on the track',
				body: [
					"Per BLS, psychologists typically need an advanced degree, either a master's or a doctoral degree, in psychology to enter the occupation. Applicants to graduate-level psychology programs typically come in with a bachelor's degree in a field such as psychology, education, or social science.",
					"Which graduate degree depends on the specialty. Clinical and counseling psychologists, the largest of the four detailed occupations BLS tracks, typically need a Doctor of Philosophy (Ph.D.) or a Doctor of Psychology (Psy.D.). Per BLS, Ph.D. programs usually emphasize research that culminates in a dissertation, while Psy.D. programs focus on applying psychological principles to working with clients or patients, and both typically require students to complete an internship. Industrial-organizational psychologists typically need only a master's degree, with coursework in statistics, research design, and the relationships between people and workplaces. School psychologists also typically need at least a master's degree in school psychology, though some pursue an education specialist (Ed.S.) or a doctoral degree instead; their programs mix education and psychology coursework and, per BLS, usually require an internship too.",
				],
				image: {
					src: '/images/psychologist-education-path.svg',
					alt: "Diagram showing the path to becoming a psychologist: a 4-year bachelor's degree, a master's or doctoral graduate degree depending on the track, supervised experience, and the EPPP licensing exam, leading to a working psychologist earning a median of $94,310 a year per BLS.",
				},
			},
			{
				heading: 'Supervised experience, the EPPP, and what license you actually need',
				body: [
					"Per BLS, most psychologists need supervised experience to qualify for licensure, which may include an internship during the graduate program or postdoctoral training afterward; the required number of hours varies by state. Licensure itself is close to universal: BLS states that all states and the District of Columbia require psychologists who practice independently to be licensed, and that clinical and counseling psychologists specifically are licensed in every state. School psychologists instead typically need a credential from their state's board of education, such as a license or certification, alongside or in place of a standard psychology license. Licensing laws vary by state and by type of position, and BLS directs candidates to their state's licensing board, or to CareerOneStop, a U.S. Department of Labor resource, for the specific requirements.",
					"BLS notes that psychologists must generally pass an exam to be licensed, without naming the exam. Per the Association of State and Provincial Psychology Boards (ASPPB), the organization that develops it, the relevant exam is the Examination for Professional Practice in Psychology (EPPP): all 66 of the U.S. and Canadian jurisdictions ASPPB represents require a passing score on the EPPP (Part 1, Knowledge) before licensure, with a recommended passing score of 500, and some jurisdictions additionally require passing the EPPP (Part 2, Skills). That scope claim comes from ASPPB itself, the exam's own developer; independently, Florida's licensing board confirms on its own site that it requires the EPPP, consistent with ASPPB's account. Which jurisdictions require Part 2, and what other state-specific requirements apply, such as a jurisprudence exam covering state psychology law and ethics, is something ASPPB directs candidates to confirm with the specific licensing board where they intend to practice. All states also require psychologists to complete continuing education to maintain their license, per BLS.",
				],
			},
			{
				heading: 'What psychologists actually do, and where the jobs are',
				body: [
					'Psychologists held about 204,300 jobs in 2024, per BLS, split unevenly across the four detailed occupations: clinical and counseling psychologists accounted for 76,300 of those jobs, school psychologists for 67,200, "psychologists, all other" for 55,300, and industrial-organizational psychologists for just 5,600, the smallest of the four despite posting the second-highest median pay of the four (see below). Clinical and counseling psychologists assess, diagnose, and treat mental, emotional, and behavioral disorders, typically interviewing clients, administering diagnostic tests, and providing psychotherapy to individuals, families, or groups; some states permit them to prescribe medication. Industrial-organizational psychologists apply psychological research to workplace issues such as productivity, employee testing and selection, and organizational dynamics. School psychologists address educational, behavioral, or developmental problems affecting students\' learning, designing and evaluating performance plans and consulting with teachers, administrators, and families. The "all other" category covers specialties BLS groups separately, including forensic psychologists, who work with judges and attorneys on the psychological aspects of legal cases, and neuropsychologists, who study how brain, spine, or nerve dysfunction affects behavior and cognition.',
					'Per BLS, the largest employers of psychologists were local elementary and secondary schools (24% of jobs) and ambulatory healthcare services (24%), followed by self-employed workers (23%), government excluding state and local education and hospitals (8%), and hospitals (5%). BLS lists self-employed workers as one of the largest single categories among the occupation\'s employers, which is consistent with a separate line elsewhere on the same BLS page noting that counseling psychologists often have their own practices.',
				],
			},
			{
				heading: 'Pay, by specialty and industry, against other advanced-degree paths on this site',
				body: [
					'BLS reports a median annual wage of $94,310 for psychologists overall in May 2024, or $45.34 an hour, well above the $49,500 median for all workers that year. The bottom 10% earned less than $54,860, and the top 10% earned more than $157,330, the boundary figures BLS publishes rather than exact percentile values. That overall median blends four detailed occupations with different typical degree requirements and different pay: "psychologists, all other" post the highest tracked median at $117,580, followed by industrial-organizational psychologists at $109,840, clinical and counseling psychologists (the largest single group by headcount) at $95,830, and school psychologists at $86,930, the lowest of the four.',
					'By industry, BLS reports the highest median pay for psychologists in government roles excluding state and local education and hospitals, at $126,990, ahead of ambulatory healthcare services at $96,960, hospitals at $96,060, and local elementary and secondary schools at $85,920, the lowest of the tracked industries despite tying ambulatory healthcare services for the largest employer share, 24% each. BLS projects 6% employment growth for psychologists from 2024 to 2034, faster than the roughly 3% average across all occupations, adding an estimated 11,800 jobs to the 204,300 already employed, with about 12,900 openings projected each year on average, mostly from the need to replace psychologists who transfer to other work or leave the labor force.',
					"Against other advanced-degree occupations this site tracks, the psychologist median trails [physician assistants](/physician-assistant-salary/) at $133,260, [pharmacists](/pharmacist-salary/) at $137,480, and [lawyers](/how-long-does-it-take-to-become-a-lawyer/) at $151,160, occupations whose entry requirements range from a master's degree (PA) to two different professional doctorates (PharmD, J.D.). BLS does not break down why these gaps exist across a mix of master's and doctoral entry paths; the comparison describes what BLS's entry-education categories group together, not a claim that any one degree path is the better investment for a given reader.",
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a psychologist?',
				answer: "BLS doesn't give a single total-year figure for psychologists the way it does for some other occupations on this site. The timeline depends on the track: industrial-organizational and school psychologists typically need a master's degree, following a 4-year bachelor's degree, while clinical and counseling psychologists, the field's largest group by employment, typically need a Ph.D. or Psy.D. that includes a required internship and generally takes longer than a master's to complete. Every track then requires supervised experience and passing a licensing exam before someone can practice independently, adding more time on top of the degree itself.",
			},
			{
				question: 'Do you need a doctorate to become a psychologist?',
				answer: "Not always. Per BLS, industrial-organizational psychologists and school psychologists can typically enter the field with a master's degree. Clinical and counseling psychologists, BLS's largest single group by employment, typically need a doctoral degree, either a Ph.D. or a Psy.D. Some school psychologists also pursue an education specialist (Ed.S.) or doctoral degree instead of a master's.",
			},
			{
				question: 'What exam do you need to pass to become a licensed psychologist?',
				answer: "Per the Association of State and Provincial Psychology Boards (ASPPB), which develops the exam, all 66 of the U.S. and Canadian jurisdictions it represents require passing the Examination for Professional Practice in Psychology (EPPP), Part 1 (Knowledge), before licensure, with a recommended passing score of 500. Some jurisdictions also require the EPPP Part 2 (Skills). Florida's licensing board independently confirms the EPPP requirement on its own site, consistent with ASPPB's account. Requirements beyond the EPPP, such as a state jurisprudence exam, vary by state, so confirming with the specific licensing board where someone intends to practice is the reliable way to check.",
			},
			{
				question: 'How much do psychologists make?',
				answer: "BLS reports a median annual wage of $94,310 for psychologists in May 2024 ($45.34 an hour), with the bottom 10% earning less than $54,860 and the top 10% earning more than $157,330. Pay varies by specialty: industrial-organizational psychologists and the \"all other\" category, which includes forensic and neuropsychologists, post the highest tracked medians, while school psychologists, the field's second-largest group by employment, post the lowest at $86,930.",
			},
			{
				question: 'Is psychology a growing career?',
				answer: 'Yes, per BLS. It projects 6% employment growth for psychologists from 2024 to 2034, faster than the roughly 3% average across all occupations, adding an estimated 11,800 jobs to the 204,300 already employed. BLS projects about 12,900 openings a year on average, mostly from the need to replace psychologists who transfer to other work or leave the labor force, such as to retire.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Psychologists (accessed 2026-08-20 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024)', url: 'https://www.bls.gov/ooh/life-physical-and-social-science/psychologists.htm' },
			{ label: 'ASPPB (Association of State and Provincial Psychology Boards): Examination for Professional Practice in Psychology (EPPP)', url: 'https://asppb.net/exams/asppb-examination-for-professional-psychology-eppp/' },
			{ label: 'Florida Board of Psychology: Psychologist Licensure by Examination (independent corroboration of the EPPP requirement for one specific jurisdiction)', url: 'https://floridaspsychology.gov/licensing/psychologist-licensure-by-examination/' },
			{ label: 'CareerOneStop (U.S. Department of Labor): Certification Finder', url: 'https://www.careeronestop.org/Toolkit/Training/find-certifications.aspx' },
			{ label: 'O*NET OnLine: 19-3033.00 Clinical and Counseling Psychologists (independent corroboration of the SOC family)', url: 'https://www.onetonline.org/link/summary/19-3033.00' },
		],
		image: '/images/psychologist-education-path.svg',
		imageAlt: "Diagram showing the path to becoming a psychologist: a 4-year bachelor's degree, a master's or doctoral graduate degree depending on the track, supervised experience, and the EPPP licensing exam, leading to a working psychologist earning a median of $94,310 a year per BLS.",
	},
	{
		slug: 'how-to-become-a-social-worker',
		category: 'How to Become',
		title: 'How to Become a Social Worker: Degree, Licensing, and Pay',
		description: "BLS says social workers typically need a bachelor's degree for entry roles or a master's for clinical work, plus licensing. Median pay is $61,330 a year.",
		published: '2026-08-20',
		updated: '2026-08-20',
		socCode: '21-1020',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, social workers typically need a bachelor's degree in social work (BSW) for entry-level, nonclinical roles, or a master's degree (MSW) for clinical practice; a bachelor's in social work is not required to enter an MSW program. Per the Association of Social Work Boards (ASWB), which administers the field's licensing exams, candidates sit for one of four exam tiers, Bachelors, Masters, Advanced Generalist, or Clinical, matched to their degree and intended scope of practice. California's Board of Behavioral Sciences lists, as requirements for its LCSW credential, an MSW from a CSWE-accredited program, a minimum of 104 weeks and 3,000 hours of supervised experience, and a passing score on the ASWB Clinical Exam, independently confirming what BLS describes in general terms. BLS reports a median annual wage of $61,330 in May 2024, with the bottom 10% earning less than $41,580 and the top 10% earning more than $99,500.",
		sections: [
			{
				heading: 'Bachelor\'s or master\'s: the degree split BLS describes',
				body: [
					"Per BLS, most social workers need either a bachelor's or a master's degree in social work. A Bachelor of Social Work (BSW) is the most common requirement for entry-level, nonclinical positions, and BSW programs cover diverse populations, human behavior, social welfare policy, and ethics, with every program requiring supervised fieldwork or an internship.",
					"Clinical social workers typically need a Master of Social Work (MSW) instead, which BLS says generally takes about 2 years and includes a supervised practicum or internship, building clinical assessment and diagnostic skills for a chosen specialty. A bachelor's degree in social work is not a prerequisite for entering an MSW program; BLS notes a bachelor's in almost any field is acceptable, though common majors include public policy, psychology, and social science, with coursework in sociology, economics, and political science recommended. Some programs let graduates who already hold a BSW finish their MSW in under 2 years. The Council on Social Work Education (CSWE) is the field's own accrediting body for both BSW and MSW programs, maintaining a directory of programs it has accredited, a distinction BLS's occupational profile references only as \"an accredited program\" without naming CSWE directly.",
				],
				image: {
					src: '/images/social-worker-path.svg',
					alt: "Diagram showing the path to becoming a social worker: a 4-year bachelor's degree, an optional CSWE-accredited master's degree for clinical practice, supervised experience, and an ASWB licensing exam, leading to a working social worker earning a median of $61,330 a year per BLS.",
				},
			},
			{
				heading: 'What licensing actually requires: supervised hours and an exam',
				body: [
					"Per BLS, all states require clinical social workers to be licensed, and some states also require nonclinical social workers to hold a license or credential. Becoming a licensed clinical social worker requires an MSW from an accredited program, supervised clinical experience after graduation, and passing a clinical exam; because licensing requirements vary by state, BLS directs candidates to their state's licensure board. ASWB, the organization that develops and administers the exams named in state law, describes licensing itself as a near-universal fact of professional life in the field, though on its own site it frames the specifics more cautiously than a single national rule: in most jurisdictions the title \"social worker\" is legally protected, and requirements, while substantially similar across states and provinces, are set individually by each jurisdiction's own social work board.",
					'ASWB administers four exam categories tied to degree and license level: Bachelors and Masters exams (each $230 as of the current fee schedule) for BSW- and MSW-level licensure, and Advanced Generalist and Clinical exams (each $260) for non-clinical and clinical advanced practice. Each exam covers the same three content domains regardless of tier, with 122 total questions, 110 of them scored. The California Board of Behavioral Sciences (BBS), the state agency that actually issues the license, lays out a matching set of requirements for its own Licensed Clinical Social Worker (LCSW) credential, independently of ASWB: an MSW from a CSWE-accredited program, a minimum of 104 weeks (2 years) and 3,000 hours of post-degree supervised experience, a passing score on the ASWB Clinical Exam, and a separate state law and ethics exam BBS runs on its own. That independent state-agency confirmation matches BLS\'s general description of what a clinical license requires; Texas\'s own licensing board, the Texas State Board of Social Worker Examiners, likewise directs its applicants to ASWB for the required exam, corroborating the same pattern in a second state. Requirements still vary: each state sets its own supervised-hour minimums and may add its own state-specific exam, so confirming with the specific board where someone intends to practice remains the reliable step BLS and ASWB both point to.',
				],
			},
			{
				heading: 'What social workers actually do, and where the jobs are',
				body: [
					'Social workers held about 810,900 jobs in 2024, per BLS, split across four detailed occupations: child, family, and school social workers accounted for 399,900 of those jobs, the largest group by a wide margin, followed by healthcare social workers at 193,200, mental health and substance abuse social workers at 136,800, and "social workers, all other" at 81,000. Child, family, and school social workers help protect vulnerable children and support families, working in settings that include child welfare agencies, schools, and courts; some investigate reports of abuse or neglect, others help arrange adoption or foster care. Healthcare social workers help patients and their families understand and cope with illnesses or disabilities, often coordinating discharge planning and connecting patients to community resources from within hospitals and other medical settings. Mental health and substance abuse social workers assess and treat individuals with mental illness or substance use disorders, providing therapy and case management, sometimes alongside psychologists and counselors. The "all other" category groups specialties BLS tracks separately from those three, including social workers in policy, research, and administrative roles.',
					'Per BLS, the largest employers of social workers were individual and family services (17% of jobs), followed by local government excluding education and hospitals (14%), state government excluding education and hospitals (12%), educational services (9%), and community food and housing, emergency, and other relief services, including vocational rehabilitation services (3%). Most social workers work in an office setting but also spend time visiting clients and meeting with colleagues and community specialists; some, particularly in child welfare, carry large caseloads that BLS notes can make the work stressful.',
				],
			},
			{
				heading: "Pay, by specialty and industry, against similar-pay and similar-degree paths on this site",
				body: [
					'BLS reports a median annual wage of $61,330 for social workers overall in May 2024, or $29.49 an hour, above the $49,500 median for all workers that year. The bottom 10% earned less than $41,580, and the top 10% earned more than $99,500, the boundary figures BLS publishes rather than exact percentile values. That overall median blends specialties with different typical entry paths: "social workers, all other" post the highest tracked median at $69,480, followed by healthcare social workers at $68,090 and mental health and substance abuse social workers at $60,060, while child, family, and school social workers, the largest group by employment at 399,900 jobs, post the lowest specialty median of the four at $58,570.',
					'By industry, BLS reports the highest median pay for social workers in educational services at $67,620, ahead of local government at $65,920, state government at $59,630, and individual and family services at $51,430, the lowest of the tracked industries despite employing the largest single share of social workers, 17%. BLS projects 6% employment growth for social workers from 2024 to 2034, faster than the roughly 3% average across all occupations, adding an estimated 44,700 jobs to the 810,900 already employed, with about 74,000 openings projected each year on average, mostly from the need to replace social workers who transfer to other occupations or leave the labor force.',
					"Against other occupations this site tracks, the social worker median sits close to [paralegals](/how-to-become-a-paralegal/) at $61,010, an occupation with no state licensing requirement at all, and below [librarians](/how-to-become-a-librarian/) at $64,320 and [psychologists](/how-to-become-a-psychologist/) at $94,310, both of which typically require a master's degree or higher. The near-identical pay next to paralegals, despite social work's heavier licensing burden in most states, illustrates that BLS's median wage reflects what employers actually pay for a role, not a return on the credentialing or supervised-hours investment a particular license requires.",
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a social worker?',
				answer: "It depends on the track. Per BLS, entry-level, nonclinical roles typically need a 4-year Bachelor of Social Work (BSW). Clinical practice typically needs a Master of Social Work (MSW), generally another 2 years after a bachelor's degree in any field, plus supervised clinical experience after graduation before independent licensure; California, for example, requires a minimum of 104 weeks (2 years) and 3,000 hours of that supervised experience, per its Board of Behavioral Sciences.",
			},
			{
				question: 'Do you need a master\'s degree to become a social worker?',
				answer: "Not always. Per BLS, a Bachelor of Social Work (BSW) is the most common requirement for entry-level, nonclinical positions. A Master of Social Work (MSW) is typically required for clinical social work, which involves diagnosing and treating mental, emotional, and behavioral issues. A BSW is not a prerequisite for entering an MSW program; BLS says a bachelor's in almost any field is acceptable.",
			},
			{
				question: 'What exam do you need to pass to become a licensed social worker?',
				answer: "Per the Association of Social Work Boards (ASWB), which develops and administers the exams, candidates take one of four categories, Bachelors, Masters, Advanced Generalist, or Clinical, matched to their degree and the license they're pursuing. Clinical practice requires the Clinical exam. California's LCSW credential is one documented example: its Board of Behavioral Sciences requires the ASWB Clinical Exam plus a separate state law and ethics exam of its own. Other states set their own requirements, so confirming with the specific licensing board where someone intends to practice is the reliable way to check.",
			},
			{
				question: 'How much do social workers make?',
				answer: "BLS reports a median annual wage of $61,330 for social workers in May 2024 ($29.49 an hour), with the bottom 10% earning less than $41,580 and the top 10% earning more than $99,500. Pay varies by specialty: \"social workers, all other\" and healthcare social workers post the highest tracked medians, $69,480 and $68,090, while child, family, and school social workers, the field's largest group by employment, post the lowest at $58,570.",
			},
			{
				question: 'Is social work a growing career?',
				answer: "Yes. BLS projects the field will add about 44,700 jobs between 2024 and 2034, a 6% increase that outpaces the roughly 3% average projected across all occupations, bringing total employment to roughly 855,600. Most of the 74,000 openings BLS expects each year, though, will come from replacing social workers who leave the field or retire rather than from newly created positions.",
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Social Workers (accessed 2026-08-20 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024)', url: 'https://www.bls.gov/ooh/community-and-social-service/social-workers.htm' },
			{ label: 'ASWB (Association of Social Work Boards): Social Work Licensing Exam', url: 'https://www.aswb.org/exam/' },
			{ label: 'ASWB: Becoming a Licensed Social Worker', url: 'https://www.aswb.org/students/' },
			{ label: 'California Board of Behavioral Sciences: Licensed Clinical Social Worker requirements (independent corroboration of the ASWB Clinical Exam and supervised-experience minimum, for one specific jurisdiction)', url: 'https://www.bbs.ca.gov/applicants/lcsw.html' },
			{ label: 'CSWE (Council on Social Work Education): Accreditation', url: 'https://www.cswe.org/accreditation/' },
			{ label: 'Texas Behavioral Health Executive Council: ASWB Licensure Examinations (independent corroboration of the ASWB exam requirement, for a second jurisdiction)', url: 'https://bhec.texas.gov/texas-state-board-of-social-worker-examiners/aswb-licensure-examinations/' },
		],
		image: '/images/social-worker-path.svg',
		imageAlt: "Diagram showing the path to becoming a social worker: a 4-year bachelor's degree, an optional CSWE-accredited master's degree for clinical practice, supervised experience, and an ASWB licensing exam, leading to a working social worker earning a median of $61,330 a year per BLS.",
	},
	{
		slug: 'how-to-become-a-lineman',
		category: 'How to Become',
		title: 'How to Become a Lineman: Apprenticeship, CDL, and Pay',
		description: 'BLS says linemen need only a high school diploma, then apprenticeship training and usually a CDL. Median pay is $92,560 a year, well above other no-degree trades.',
		published: '2026-08-20',
		updated: '2026-08-20',
		socCode: '49-9051',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, electrical power-line installers and repairers (SOC 49-9051) typically need only a high school diploma or equivalent to enter the occupation, building skills through long-term on-the-job training; apprenticeships are common. Two independently reviewed regional apprenticeship sponsors, Southwest Line Constructors and IBEW Local 1186's Hawaii training fund, both describe apprenticeship terms of roughly 7,000 hours of on-the-job training, spanning about three to four years depending on the sponsor, plus related classroom instruction; Southwest Line Constructors also requires a Class A commercial driver's license (CDL) to apply. BLS reports a median annual wage of $92,560 in May 2024, with the bottom 10% earning less than $50,020 and the top 10% earning more than $126,610.",
		sections: [
			{
				heading: "What BLS says about entry, and what two apprenticeship sponsors actually require",
				body: [
					"Per BLS, electrical power-line installers and repairers typically need a high school diploma or equivalent to enter the occupation. Workers become proficient through technical instruction and on-the-job training, and BLS notes apprenticeships are common, but its Occupational Outlook Handbook page for this occupation does not publish a specific apprenticeship length or hour requirement the way it does for some other trades. Confirming what an apprenticeship actually looks like requires going to the organizations that run them.",
					"Apprenticeships in this trade are sponsored by individual unions, utilities, and contractor associations rather than run as a single national program, so the specific numbers vary by sponsor. Two regional programs reviewed directly for this page, Southwest Line Constructors, which serves apprentices in Arizona, New Mexico, Kansas, Oklahoma, and parts of Texas, and the IBEW Local 1186 training fund in Hawaii, both describe a term of about 7,000 hours of on-the-job training. Southwest Line Constructors states this term \"may require more than three and one half years to complete in view of possible employment lapses,\" plus three years of related classroom instruction away from the job. The Hawaii program describes essentially the same 7,000-hour on-the-job total as running \"approximately 3 years,\" supplemented by 480 hours of related classroom instruction. The two sponsors land on similar on-the-job hour totals but different stated timelines and classroom-hour figures, a real difference in how each program structures and counts the work rather than an error in either one.",
					"Southwest Line Constructors' published apprenticeship requirements include being at least 18 years old, holding a Class A commercial driver's license, passing an aptitude test, passing a medical exam, and paying an application fee. The Hawaii program's listed requirements include a valid driver's license and passing a CDL physical, without specifying a CDL class in the page reviewed for this article. Both point to the same practical reality BLS hints at with \"apprenticeships are common\": entry into this trade runs through a sponsor's apprenticeship program, not a single standardized credential, so the specific requirements to confirm are whichever sponsor's program someone intends to apply to.",
				],
				image: {
					src: '/images/lineman-apprenticeship-path.svg',
					alt: 'Diagram showing the path to becoming a lineman: a high school diploma, meeting apprenticeship requirements including a commercial driver\'s license, roughly 7,000 hours of paid on-the-job apprenticeship training, and journeyman status, with a median pay of $92,560 a year per BLS.',
				},
			},
			{
				heading: 'The work itself: what BLS lists as the core hazards and required qualities',
				body: [
					"BLS's own Work Environment summary for this occupation is blunt about the risks: electrical power-line installers and repairers \"encounter serious hazards on the job, including working with high-voltage electricity, often at great heights,\" and the work \"also can be physically demanding.\" Most work full time, and some work more than 40 hours a week; BLS also notes that in emergencies or after storms and other natural disasters, workers may have to travel to affected areas and work long hours for several days in a row.",
					"BLS lists a specific set of qualities important for the job: the ability to work at heights from ladders or bucket lifts while climbing utility poles, color vision to distinguish color-coded wires and cables, interpersonal skills because crew members rely on each other for safety, physical stamina to climb poles carrying heavy tools, physical strength to lift heavy cables and equipment, problem-solving skills to diagnose faults in electrical systems, and technical skills to operate diagnostic equipment on circuits. None of this is a substitute for an employer's own physical or medical requirements, which BLS's occupational profile does not itemize beyond these general categories.",
				],
			},
			{
				heading: 'What linemen actually earn, by percentile and industry',
				body: [
					"BLS reports a median annual wage of $92,560 for electrical power-line installers and repairers in May 2024, or $44.50 an hour, well above the $49,500 median across all occupations that year. The bottom 10% earned less than $50,020, and the top 10% earned more than $126,610, a spread of more than $76,000, or more than 2.5 times, between the boundary figures BLS publishes.",
					"By industry, BLS breaks out May 2024 wages into five categories. Federal government employers paid the highest median at $104,540, followed by utilities at $102,050, local government excluding education and hospitals at $87,550, specialty trade contractors at $76,290, and utility system construction, the lowest of the five tracked categories, at $74,550. BLS does not explain what drives that industry ordering, though a federal or utility employer directly operating the grid, rather than a contractor building or maintaining it under contract, is one plausible distinction worth checking against a specific job offer rather than assuming.",
				],
			},
			{
				heading: 'Job outlook, and how this pay compares with other no-degree trades on this site',
				body: [
					"BLS projects employment of electrical power-line installers and repairers to grow 7% from 2024 to 2034, a rate it classifies as much faster than the average for all occupations, adding an estimated 8,400 jobs to the 127,400 already employed in 2024. About 10,700 openings are projected each year on average over the decade, though BLS attributes many of those to the need to replace workers who transfer to other occupations or exit the labor force, such as to retire, rather than to newly created positions alone.",
					"Against other no-degree, apprenticeship-based trades this site tracks, all of which BLS also lists as requiring only a high school diploma or equivalent to enter, the lineman median sits well above [electricians](/electrician-salary/) at $62,350, [plumbers, pipefitters, and steamfitters](/plumbing-apprenticeship/) at $62,970, and [welders, cutters, solderers, and brazers](/welder-salary/) at $51,000, a gap of more than $29,000 in every comparison and above $41,000 against welders specifically. BLS does not state why line work pays more within this cluster of similarly credentialed occupations, and the page's Similar Occupations table lists power plant operators, distributors, and dispatchers, another high school diploma occupation, at a comparably high $103,600 median, while electricians on the same table sit far closer to welders and plumbers than to either line work or power plant operations. That comparison table is consistent with the two occupations that carry the clearest physical exposure to high-voltage electricity commanding the highest pay in the group, but BLS's data describes what employers pay rather than why, and this page reports the pattern rather than asserting a specific cause.",
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a lineman?',
				answer: "Only a high school diploma or equivalent is required to enter the occupation, per BLS. The apprenticeship itself, where most people build the skills to work independently, runs on a sponsor-by-sponsor basis; two regional programs reviewed for this page, Southwest Line Constructors and IBEW Local 1186's Hawaii training fund, both describe roughly 7,000 hours of on-the-job training, with one citing about three and a half years and the other about three years, plus additional classroom instruction hours that also differ by sponsor.",
			},
			{
				question: 'Do you need a CDL to become a lineman?',
				answer: "Usually, though the exact requirement is set by the apprenticeship sponsor rather than by BLS or one national rule. Southwest Line Constructors requires a Class A commercial driver's license to apply. The IBEW Local 1186 training fund in Hawaii requires a valid driver's license and a passed CDL physical, without specifying a CDL class in the page reviewed for this article. Confirming the specific requirement with the sponsor someone intends to apply to is the reliable step.",
			},
			{
				question: 'How much do linemen make?',
				answer: 'BLS reports a median annual wage of $92,560 for electrical power-line installers and repairers in May 2024 ($44.50 an hour), with the bottom 10% earning less than $50,020 and the top 10% earning more than $126,610. By industry, federal government employers and utilities paid the highest median wages, $104,540 and $102,050 respectively, while utility system construction paid the least of the five, at $74,550.',
			},
			{
				question: 'Is lineman a growing career?',
				answer: 'Yes. BLS projects 7% employment growth for electrical power-line installers and repairers from 2024 to 2034, which it classifies as much faster than the average for all occupations, adding about 8,400 jobs to the 127,400 already employed. About 10,700 openings are projected each year on average, though BLS attributes many of those to workers transferring out of the occupation or retiring rather than to newly created positions.',
			},
			{
				question: "What's the difference between a lineman and an electrician?",
				answer: "BLS tracks them as separate occupations with separate SOC codes, 49-9051 for electrical power-line installers and repairers and 47-2111 for electricians, and lists electricians as a similar occupation on the lineman's BLS page. Both typically require only a high school diploma to enter, but linemen work on outdoor, high-voltage power-distribution lines, often at height, while electricians more often install and repair wiring and lower-voltage systems inside buildings. BLS's median pay for the two differs by about $30,000 a year, $92,560 for linemen versus $62,350 for electricians in May 2024, a gap the data does not explain beyond the setting and voltage differences it describes.",
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Electrical Power-Line Installers and Repairers (accessed 2026-08-20 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024)', url: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/line-installers-and-repairers.htm' },
			{ label: "Southwest Line Constructors: Lineman apprenticeship requirements (one of two independently reviewed regional apprenticeship sponsors)", url: 'https://www.swlcat.org/apprenticeship2.html' },
			{ label: "IBEW Local 1186 (Hawaii) Electricians Training Fund: Lineman Apprenticeship (independent corroboration of the ~7,000-hour on-the-job training term, for a second regional sponsor)", url: 'https://www.hetf1186.org/lineman-apprenticeship' },
			{ label: 'O*NET OnLine: Electrical Power-Line Installers and Repairers (49-9051.00), SOC title cross-check', url: 'https://www.onetonline.org/link/summary/49-9051.00' },
		],
		image: '/images/lineman-apprenticeship-path.svg',
		imageAlt: 'Diagram showing the path to becoming a lineman: a high school diploma, meeting apprenticeship requirements including a commercial driver\'s license, roughly 7,000 hours of paid on-the-job apprenticeship training, and journeyman status, with a median pay of $92,560 a year per BLS.',
	},
	{
		slug: 'how-to-become-an-accountant',
		category: 'How to Become',
		title: 'How to Become an Accountant: Degree, CPA Path, and Pay',
		description: "BLS says accountants need a bachelor's degree. CPA licensure adds 150 credit hours, but a new bachelor's-only pathway launches in Texas in 2026.",
		published: '2026-08-21',
		updated: '2026-08-21',
		socCode: '13-2011',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, accountants and auditors (SOC 13-2011) typically need a bachelor's degree in accounting or a related field to enter the occupation; certification such as becoming a licensed Certified Public Accountant (CPA) may improve job prospects but is not described by BLS as universally required. The traditional CPA path, per the model rules the National Association of State Boards of Accountancy (NASBA) and the American Institute of CPAs (AICPA) publish and the Texas State Board of Public Accountancy (TSBPA) independently confirms for its own state, requires 150 total semester hours of college credit, 30 more than a typical bachelor's degree, plus roughly a year of supervised experience under a licensed CPA and passing the Uniform CPA Examination. AICPA and NASBA approved model legislation in May 2025 for an additional pathway that drops the extra 30 credit hours in favor of two years of supervised experience; Texas's Governor signed this into state law as Senate Bill 262 the same month, TSBPA adopted implementing rules that September, and per TSBPA the new pathway opens to candidates on August 1, 2026, making Texas the first large state to offer it. BLS reports a median annual wage of $81,680 in May 2024, with the bottom 10% earning less than $52,780 and the top 10% earning more than $141,420.",
		sections: [
			{
				heading: 'What accountants do, and the degree BLS says you need to start',
				body: [
					"Per BLS, a bachelor's degree in accounting or a related field is typically required to become an accountant or auditor, with certification in a specific field, such as becoming a licensed CPA, listed as something that may improve job prospects rather than a blanket requirement. BLS groups the work into a consistent set of duties: examining financial statements for accuracy and legal compliance, computing taxes owed and preparing tax returns, inspecting account books and accounting systems for fraud risk, and organizing, analyzing, and maintaining financial records.",
					"BLS also describes several distinct tracks within the occupation. Public accountants, many of whom are CPAs, handle a broad range of accounting, auditing, tax, and consulting work for corporations, governments, individuals, and nonprofits, and some specialize in forensic accounting, investigating financial crimes such as fraud or embezzlement and sometimes testifying as expert witnesses. Management accountants work inside a single organization, helping plan the cost of doing business and analyzing financial information for internal decision-makers. Government accountants examine the records of government agencies or audit private entities subject to government regulation or taxation. External auditors work for an outside firm reviewing another organization's funds, revenue sources, and internal controls, including cybersecurity and supply-chain risk, distinguishing them from internal auditors who do similar work as employees of the organization being reviewed. Only public accountants who work with publicly traded companies face a hard CPA requirement in BLS's description: the SEC requires a CPA's signature on the annual and quarterly reports those companies file.",
				],
				image: {
					src: '/images/accountant-education-path.svg',
					alt: "Diagram showing the path to becoming an accountant: a 4-year bachelor's degree, the traditional 150-semester-hour CPA education requirement or a new bachelor's-only pathway taking effect in Texas in August 2026, supervised experience under a licensed CPA, and the Uniform CPA Examination, leading to a working accountant earning a median of $81,680 a year per BLS.",
				},
			},
			{
				heading: "The CPA path: the 150-hour rule, and a new pathway that skips it",
				body: [
					"BLS's occupational profile does not spell out CPA licensing mechanics beyond naming the credential, so confirming the actual requirements means going to the organizations that set and enforce them. NASBA and AICPA jointly maintain the Uniform Accountancy Act, the model law most states base their CPA rules on, which calls for 150 total semester hours of college credit before licensure, 30 more than the roughly 120 hours a typical bachelor's degree provides. The Texas State Board of Public Accountancy (TSBPA), the state agency that actually issues the license, independently confirms this pattern for one specific jurisdiction: Texas requires a bachelor's degree plus 150 semester hours total, including at least 27 semester hours of upper-level accounting coursework for certification, a three-semester-hour ethics course approved by the board, one year (2,000 hours) of full-time, non-routine accounting work under the direct supervision of a licensed CPA, and passing both the Uniform CPA Examination and a separate exam on the Rules of Professional Conduct. Most states, including Texas, let candidates sit for the CPA exam before finishing all 150 hours, but the license itself isn't issued until every requirement, including the supervised experience, is complete.",
					"That 150-hour rule is no longer the only route, at least in one state so far. AICPA and NASBA's boards of directors jointly approved model legislation in May 2025 adding an alternative CPA pathway: a bachelor's degree with an accounting concentration, two years of supervised experience instead of one, and passing the same Uniform CPA Examination, without the extra 30 credit hours. Individual states still have to enact this themselves rather than adopting it automatically, since state legislatures and boards of accountancy, not AICPA or NASBA, control who can actually be licensed in that state. Texas was the first large state to act: Governor Greg Abbott signed Senate Bill 262 into law in May 2025, TSBPA adopted implementing rules that September, and per TSBPA the new pathway opens to candidates on August 1, 2026. Both paths lead to the same CPA license and the same exam; the difference is 30 extra credit hours plus one fewer year of supervised work, which candidates outside a state that has adopted the new pathway won't yet be able to choose.",
				],
			},
			{
				heading: 'Where the jobs are, and when the overtime hits',
				body: [
					'Accountants and auditors held about 1,579,800 jobs in 2024, per BLS. The largest share, 23% of jobs, worked in accounting, tax preparation, bookkeeping, and payroll services, the industry built specifically around this work; government agencies excluding state and local education and hospitals and finance and insurance each accounted for 8%, management of companies and enterprises for 6%, and self-employed workers for 5% of the total.',
					'BLS is specific about the work pattern that makes this occupation different from a typical 9-to-5 role: most accountants and auditors work full time, and overtime hours are typical at certain periods of the year, such as for quarterly audits or during tax season. That seasonal overtime pattern, tied to fixed external deadlines like corporate quarter-ends and the April tax filing deadline, is a structural feature of the industry rather than something that varies mainly by employer, the way it might in many other office occupations.',
				],
			},
			{
				heading: "Pay, by industry, against other bachelor's-entry paths on this site",
				body: [
					'BLS reports a median annual wage of $81,680 for accountants and auditors in May 2024, or $39.27 an hour, well above the $49,500 median across all occupations that year. The bottom 10% earned less than $52,780, and the top 10% earned more than $141,420, the boundary figures BLS publishes rather than exact percentile values.',
					"By industry, BLS breaks out May 2024 wages into four categories: finance and insurance paid the highest median at $87,980, followed by management of companies and enterprises at $86,010, government excluding state and local education and hospitals at $81,120, and accounting, tax preparation, bookkeeping, and payroll services, the industry employing the largest single share of accountants (23%), at $80,510, the lowest of the four tracked industries. BLS projects 5% employment growth for accountants and auditors from 2024 to 2034, faster than the roughly 3% average across all occupations, adding an estimated 72,800 jobs to the 1,579,800 already employed, with about 124,200 openings projected each year on average, mostly from the need to replace workers who transfer to other occupations or leave the labor force.",
					"Against other bachelor's-entry occupations this site tracks, the accountant median sits well below [actuaries](/actuary-salary/) at $125,770, an occupation that also runs on a bachelor's degree plus a multi-exam professional credential rather than an advanced degree, and above [paralegals](/how-to-become-a-paralegal/) at $61,010, an occupation BLS lists with no state licensing requirement at all. BLS's data describes what each occupation pays, not why the gap between a CPA-track accountant and an actuary runs to more than $44,000 a year despite both requiring a bachelor's degree and a demanding professional exam; this page reports the pattern rather than asserting a specific cause.",
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become an accountant?',
				answer: "Entering the occupation itself typically takes the 4 years of a bachelor's degree in accounting or a related field, per BLS. Becoming a licensed CPA takes longer: under the traditional 150-hour rule most states still use, candidates need 30 credit hours beyond a bachelor's degree plus about a year of supervised experience under a licensed CPA. A new alternative, approved by AICPA and NASBA in May 2025 and set to open in Texas on August 1, 2026 under Senate Bill 262, instead requires only a bachelor's degree with an accounting concentration plus two years of supervised experience, skipping the extra 30 hours.",
			},
			{
				question: 'Do you need to be a CPA to work as an accountant?',
				answer: "Not for every role. BLS describes CPA certification as something that \"may improve job prospects\" rather than a universal requirement, and lists management accountants, government accountants, and internal auditors as tracks within the occupation that don't all require it. The clearest hard requirement is for public accountants who work with publicly traded companies: the SEC requires a CPA's signature on the annual and quarterly reports those companies file.",
			},
			{
				question: "What's the new alternative pathway to CPA licensure?",
				answer: "In May 2025, AICPA and NASBA's boards of directors approved model legislation adding a pathway that requires a bachelor's degree with an accounting concentration and two years of supervised experience, instead of the traditional 150 total credit hours (30 beyond a typical bachelor's degree) and one year of experience. Each state has to adopt this itself, and Texas was the first large state to do so: its governor signed Senate Bill 262 in May 2025, the Texas State Board of Public Accountancy adopted implementing rules that September, and the new pathway opens to candidates on August 1, 2026.",
			},
			{
				question: 'How much do accountants make?',
				answer: 'BLS reports a median annual wage of $81,680 for accountants and auditors in May 2024 ($39.27 an hour), with the bottom 10% earning less than $52,780 and the top 10% earning more than $141,420. By industry, finance and insurance paid the highest median, $87,980, while accounting, tax preparation, bookkeeping, and payroll services, the industry employing the largest single share of accountants, paid the least of the four tracked industries, $80,510.',
			},
			{
				question: 'Is accounting a growing career?',
				answer: 'Yes, per BLS. It projects 5% employment growth for accountants and auditors from 2024 to 2034, faster than the roughly 3% average across all occupations, adding an estimated 72,800 jobs to the 1,579,800 already employed. BLS projects about 124,200 openings a year on average, mostly from the need to replace accountants who transfer to other occupations or leave the labor force, such as to retire.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Accountants and Auditors (accessed 2026-08-21 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024)', url: 'https://www.bls.gov/ooh/business-and-financial/accountants-and-auditors.htm' },
			{ label: 'Texas State Board of Public Accountancy (TSBPA): Education Requirements (independent corroboration of the CPA education and experience rules for one specific jurisdiction)', url: 'https://www.tsbpa.texas.gov/applicants/education/' },
			{ label: 'TSBPA: New Pathway for CPA Exam and Certification (Senate Bill 262 implementing rules, effective August 1, 2026)', url: 'https://www.tsbpa.texas.gov/news/new-pathway-for-cpa-exam-and-certification/' },
			{ label: 'AICPA & CIMA: AICPA and NASBA Approve Model Legislation for New CPA Licensure Path', url: 'https://www.aicpa-cima.com/news/article/aicpa-and-nasba-approve-model-legislation-for-new-cpa-licensure-path' },
			{ label: "NASBA: AICPA and NASBA Approve Model Legislation for New CPA Licensure Path (independent corroboration of the same May 2025 approval, from the exam's other co-sponsor)", url: 'https://nasba.org/blog/2025/05/13/aicpa-and-nasba-approve-model-legislation-for-new-cpa-licensure-path/' },
			{ label: 'O*NET OnLine: 13-2011.00 Accountants and Auditors, SOC title cross-check', url: 'https://www.onetonline.org/link/summary/13-2011.00' },
		],
		image: '/images/accountant-education-path.svg',
		imageAlt: "Diagram showing the path to becoming an accountant: a 4-year bachelor's degree, the traditional 150-semester-hour CPA education requirement or a new bachelor's-only pathway taking effect in Texas in August 2026, supervised experience under a licensed CPA, and the Uniform CPA Examination, leading to a working accountant earning a median of $81,680 a year per BLS.",
	},
	{
		slug: 'chef-salary',
		category: 'Salary Guide',
		title: 'Chef and Head Cook Salary: BLS Wage Data by Percentile (2026)',
		description: "BLS reports a $60,990 median chef salary. No degree is required, but the typical entry path runs on five years of related work experience instead.",
		published: '2026-08-21',
		updated: '2026-08-21',
		socCode: '35-1011',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, chefs and head cooks (SOC 35-1011) earned a median annual wage of $60,990 in May 2024, or $29.32 an hour, above the $49,500 median for all occupations combined. BLS lists a high school diploma or its equivalent as the typical entry-level education, but unlike most occupations at that education tier, it also lists five years or more of work experience in a related occupation as typical, with no additional formal on-the-job training required once that experience is in place. BLS projects 7% employment growth from 2024 to 2034, much faster than the roughly 3% average across all occupations, adding an estimated 14,000 jobs to the 197,300 chefs and head cooks already working in 2024.",
		sections: [
			{
				heading: 'The median chef salary, and the range around it',
				body: [
					'BLS tracks this occupation under the combined title "Chefs and Head Cooks," SOC code 35-1011, describing the work as overseeing the daily food preparation at restaurants and other places where food is served. The median annual wage was $60,990 in May 2024 ($29.32 an hour), above the $49,500 median across all occupations in the U.S. economy that year. The bottom 10% of chefs and head cooks earned less than $36,000, and the top 10% earned more than $96,030, a spread of well over two and a half times between the lower and upper bound BLS reports.',
					"That $60,990 median sits above the $44,140 BLS reports for supervisors of food preparation and serving workers, a related but more junior role, and it is worth separating from figures that circulate on general salary-aggregator sites, which BLS does not publish or verify. This page reports only the U.S. Bureau of Labor Statistics figures, sourced directly from BLS's own Occupational Employment and Wage Statistics survey of employer payroll data rather than self-reported submissions.",
				],
				image: {
					src: '/images/chef-salary-chart.svg',
					alt: 'Bar chart showing chef and head cook annual wage by percentile: 10th percentile $36,000, median $60,990, 90th percentile $96,030, based on BLS May 2024 data.',
				},
			},
			{
				heading: 'The entry path: little formal education, years of experience instead',
				body: [
					"BLS lists a high school diploma or equivalent as the typical entry-level education for chefs and head cooks, the same tier as several other occupations this site covers. What sets this occupation apart is the second line in BLS's Quick Facts box: work experience in a related occupation of five years or more, also listed as typical. BLS lists no additional on-the-job training beyond that, meaning the five years of prior experience is effectively doing the training. That combination, a low formal-education bar paired with a long experience requirement, is unusual; most high-school-diploma occupations BLS tracks list either no experience requirement or a much shorter one.",
					"BLS describes two routes into that experience. Some chefs and head cooks attend a culinary program at a community college, technical school, culinary arts school, or four-year college before entering the field; others learn entirely through apprenticeship programs or by working their way up through food-service jobs. BLS does not describe either route as required, only as common paths people take toward the five years of related experience the occupation typically expects. That is a different model from [bartending](/how-to-become-a-bartender/), a similarly education-light food-service occupation on this site where BLS lists no related-experience requirement at all, just a few weeks of on-the-job training after hire.",
				],
			},
			{
				heading: 'Where chef pay sits on the food-service ladder',
				body: [
					"BLS's Occupational Outlook Handbook page for chefs and head cooks lists two adjacent food-service occupations for direct comparison, both drawn from the same May 2024 wage survey. Food preparation workers, who BLS describes as performing tasks other than cooking, such as slicing meat and brewing coffee, require no formal educational credential and earned a median of $34,220, about $26,770 below the chef and head cook median. Food service managers, who oversee the daily operation of a restaurant or similar establishment, need only the same high school diploma BLS lists for chefs, yet earned a higher median of $65,310, about $4,320 above chefs and head cooks.",
					"That places chefs and head cooks in the middle of a three-step ladder inside the same broad food-service field: a no-credential prep role below, a supervisory management role above, and the chef and head cook role itself sitting on five years of related experience rather than either a lower or a higher formal-education requirement. Measured against a different vocational field entirely, chefs and head cooks also out-earn [welders, cutters, solderers, and brazers](/welder-salary/), who BLS lists at the same high-school-diploma entry tier but a median of $51,000, roughly $9,990 below chefs. BLS's data describes the pay at each tier; it does not explain why five years of food-service experience commands a premium over a shorter vocational-training route in a different industry, and this page does not assert a cause beyond what BLS itself reports.",
				],
			},
			{
				heading: 'Industry breakdown and job outlook',
				body: [
					"BLS breaks out May 2024 median pay for chefs and head cooks across four industry categories. Traveler accommodation, hotels and similar lodging that run their own kitchens, paid the highest median at $73,110. Amusement, gambling, and recreation industries followed at $69,430. Food services and drinking places, the industry employing the largest share of chefs and head cooks in traditional restaurants, paid $59,450, close to but below the national median. Healthcare and social assistance, covering institutional kitchens in hospitals and care facilities, paid the lowest of the four tracked industries at $57,350.",
					'BLS projects 7% employment growth for chefs and head cooks from 2024 to 2034, classified as much faster than the roughly 3% average projected across all occupations, adding an estimated 14,000 jobs to the 197,300 already employed in 2024. About 24,400 openings are projected each year on average over the decade, which BLS attributes mainly to the need to replace workers who transfer to other occupations or leave the labor force, rather than to net new job creation alone. BLS does not publish a stated explanation for the growth rate itself on this occupation\'s Handbook page the way it sometimes does for other roles.',
				],
			},
		],
		faq: [
			{
				question: 'What is the average chef salary?',
				answer: 'According to the U.S. Bureau of Labor Statistics, the median annual wage for chefs and head cooks was $60,990 in May 2024 ($29.32 an hour). The bottom 10% earned less than $36,000, and the top 10% earned more than $96,030.',
			},
			{
				question: 'Do you need a culinary degree to become a chef?',
				answer: "No. BLS lists a high school diploma or equivalent as the typical entry-level education for chefs and head cooks, with no on-the-job training listed beyond it. What BLS does list as typical is five years or more of work experience in a related occupation. Some chefs get there through a culinary program at a community college, technical school, culinary arts school, or four-year college; others work their way up through food-service jobs or an apprenticeship. Neither path is described as a formal requirement, only as common routes toward the experience the occupation typically expects.",
			},
			{
				question: 'What is the pay range for chefs and head cooks?',
				answer: 'BLS reports a median annual wage of $60,990 for May 2024, with the lowest-paid 10% earning less than $36,000 and the highest-paid 10% earning more than $96,030, a range of well over two and a half times between the bottom and top BLS reports.',
			},
			{
				question: 'Which industry pays chefs the most?',
				answer: 'Among the four industries BLS tracks for this occupation, traveler accommodation (hotels and similar lodging) paid the highest May 2024 median at $73,110, followed by amusement, gambling, and recreation industries at $69,430. Food services and drinking places, where most chefs work, paid $59,450, and healthcare and social assistance paid the lowest of the four at $57,350.',
			},
			{
				question: 'Is chef a growing career?',
				answer: 'Yes, per BLS. It projects 7% employment growth for chefs and head cooks from 2024 to 2034, much faster than the roughly 3% average projected across all occupations, adding an estimated 14,000 jobs to the 197,300 already employed in 2024, with about 24,400 openings projected each year on average.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Chefs and Head Cooks (accessed 2026-08-21 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024)', url: 'https://www.bls.gov/ooh/food-preparation-and-serving/chefs-and-head-cooks.htm' },
		],
		image: '/images/chef-salary-chart.svg',
		imageAlt: 'Bar chart showing chef and head cook annual wage by percentile: 10th percentile $36,000, median $60,990, 90th percentile $96,030, based on BLS May 2024 data.',
	},
	{
		slug: 'how-to-become-a-software-engineer',
		category: 'How to Become',
		title: 'How to Become a Software Engineer: Degree, Path, and Pay',
		description: 'BLS calls the job "software developer" and typically requires a bachelor\'s degree, no license. Median pay is $133,080 a year, per May 2024 data.',
		published: '2026-08-22',
		updated: '2026-08-22',
		socCode: '15-1252',
		coreSummary: 'Per the U.S. Bureau of Labor Statistics, software developers (SOC 15-1252), the occupation code covering most jobs titled "software engineer," typically need a bachelor\'s degree in computer and information technology or a related field, and some employers prefer a master\'s degree. BLS names no state license or standardized certification exam for the role. BLS reports a median annual wage of $133,080 in May 2024, with the bottom 10% earning less than $79,850 and the top 10% earning more than $211,450.',
		sections: [
			{
				heading: 'What BLS calls the job, and the degree it says you need',
				body: [
					'BLS tracks this work under the title "software developers," SOC code 15-1252, inside a Handbook page that bundles the narrative with a second, related occupation, software quality assurance analysts and testers, SOC 15-1253. The two are distinct codes with separate pay and growth figures, covered separately below. O*NET, the Department of Labor database that maps job titles to SOC codes, lists the sample reported job titles for 15-1252.00 as including Software Engineer, Software Architect, Application Developer, DevOps Engineer, and Systems Engineer alongside Software Developer itself, so a posting titled "software engineer" and one titled "software developer" are typically the same BLS occupation, not two different ones.',
					"Per BLS, software developers typically need a bachelor's degree in computer and information technology or a related field, such as engineering or mathematics, and some employers prefer a master's degree specifically for developer roles. Students often gain experience through an internship, such as at a software company, while still in school. Beyond that degree, BLS names no required license, no standardized entry exam, and no certification, a different entry model from several licensed or exam-gated fields this site covers, such as [accountants](/how-to-become-an-accountant/), where a CPA license involves a state board and a separate professional exam, or [actuaries](/actuary-salary/), where advancement runs on a multi-year, multi-exam credentialing system.",
					"BLS names six qualities it considers important for this line of work: analytical skills, to evaluate what users need and design software that meets it; communication skills, to explain both problems and solutions to teammates and to nontechnical users such as customers; creativity, to design and improve software in ways that solve new problems; detail orientation, since developers often track many parts of an application at once while watching for user-error risks; interpersonal skills, to work well with the other people involved in designing, programming, and testing a piece of software; and problem-solving skills, since developers see a project through from start to finish rather than handing off a narrow piece of it. On advancement, BLS states that software developers can move into project management or into computer and information systems management, roles where they oversee the software development process rather than write code directly, a path BLS describes without naming any additional credential required to make that move.",
				],
				image: {
					src: '/images/software-developer-education-path.svg',
					alt: "Diagram showing the path to becoming a software developer: a 4-year bachelor's degree in computer and information technology or a related field, internship or portfolio work during school, no state license or standardized exam, and ongoing skill upkeep, leading to a working software developer earning a median of $133,080 a year per BLS.",
				},
			},
			{
				heading: 'The median pay, and which BLS number actually applies',
				body: [
					'This occupation\'s Handbook page has two different headline pay figures, and only one belongs to software developers specifically. The page\'s Quick Facts box lists "$131,450 per year, $63.20 per hour" as the 2024 median pay, but that figure covers the combined group of software developers and software quality assurance analysts and testers together. The Pay section further down breaks the median out by occupation: $133,080 for software developers in May 2024, and separately $102,610 for software quality assurance analysts and testers, the paired occupation this page does not otherwise track.',
					"BLS also breaks the percentile range out by occupation rather than only for the combined group. For software developers, the bottom 10% earned less than $79,850 and the top 10% earned more than $211,450 in May 2024, a spread of more than $131,000 between the two ends BLS publishes. For comparison, software quality assurance analysts and testers ran from under $60,690 to over $166,960 in the same survey, a lower band across the board. BLS does not publish an hourly wage specific to software developers alone; the $63.20 figure in the Quick Facts box is the combined-group number, so this page reports only the annual figures BLS actually breaks out by occupation.",
				],
			},
			{
				heading: 'Where the highest-paying industries are',
				body: [
					'BLS breaks out May 2024 median pay for software developers across five industry categories. Software publishers, companies that develop and sell software as their core product, paid the highest median at $149,990. Manufacturing followed at $134,910, then management of companies and enterprises at $133,650, and finance and insurance at $132,880. Computer systems design and related services, the industry BLS names first among where software developers typically work and generally the largest single employer of the occupation, paid the lowest of the five tracked industries at $129,890.',
					"That pattern, the largest employing industry sitting at the bottom of its own pay ladder rather than the top, shows up elsewhere on this site too: chefs and head cooks follow the same shape, with food services and drinking places, their largest employer, paying less than smaller segments like traveler accommodation. BLS's industry breakdown describes where the pay is higher or lower; it does not explain why the biggest employer in a field is rarely also the highest payer, and this page does not assert a cause beyond what BLS itself reports.",
				],
			},
			{
				heading: 'Job outlook, and how it splits from the paired QA role',
				body: [
					"BLS's Occupational Outlook Handbook narrative quotes a single combined growth rate, 15% from 2024 to 2034, for software developers and software quality assurance analysts and testers together, with about 129,200 combined openings projected each year. The BLS Employment Projections program's National Employment Matrix, the underlying data table the Handbook narrative draws from, breaks that combined figure out by SOC code: software developers specifically are projected to grow 15.8%, from about 1,693,800 workers in 2024 to about 1,961,400 by 2034, an increase of roughly 267,700 jobs. Software quality assurance analysts and testers, the smaller paired occupation, are projected to grow more slowly, 10%, adding about 20,200 jobs to a much smaller 2024 base of roughly 201,700. A BLS Economics Daily article on AI and technology employment independently reports the same 15.8% and roughly 267,700-job figures for software developers, citing continued demand for software applications, cybersecurity, and AI-related tools as drivers.",
					"Measured against other bachelor's-entry occupations this site tracks, the software developer median of $133,080 sits above [actuaries](/actuary-salary/) at $125,770, an occupation that also runs on a bachelor's degree plus a multi-year professional exam system rather than an advanced degree, and further above [accountants](/how-to-become-an-accountant/) at $81,680, where a bachelor's degree is the entry point but a separate CPA license, involving a state board and 150 total semester hours in most states, can follow. Software developers sit at the top of that specific comparison while being the only one of the three BLS describes with no state license or standardized professional exam named anywhere in its occupational profile. BLS's data describes what each occupation pays and what it typically requires; it does not explain why the field with the fewest formal gatekeeping requirements among these three also pays the most, and this page reports the pattern rather than asserting a cause.",
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a software developer?',
				answer: "Per BLS, the typical entry path runs on a 4-year bachelor's degree in computer and information technology or a related field, the same timeline as most bachelor's-entry occupations. Unlike several other fields this site covers, BLS names no additional licensing step, standardized exam, or certification period after the degree, so there is no extra multi-year credentialing stage built into the typical path the way there is for, say, a CPA license or an actuarial exam series.",
			},
			{
				question: 'Do you need a coding bootcamp or certification to become a software developer?',
				answer: "BLS's occupational profile for this role names only a bachelor's degree, with a master's degree preferred by some employers for developer roles specifically. It does not list a bootcamp, certification, or any other credential as a requirement. This page reports what BLS states as the typical path; it does not evaluate whether a bootcamp or certification helps in practice; that is outside the scope of the data this site tracks.",
			},
			{
				question: 'Is a software engineer the same thing as a software developer?',
				answer: 'Per O\'Net, the Department of Labor database that maps job titles to BLS occupation codes, "Software Engineer" is one of the sample reported job titles filed under SOC 15-1252.00, the same code BLS uses for "software developers," alongside titles like Software Architect and DevOps Engineer. The two titles describe the same underlying occupation in BLS and O*NET\'s own classification, not two separate ones.',
			},
			{
				question: 'How much do software developers make?',
				answer: 'BLS reports a median annual wage of $133,080 for software developers in May 2024, with the bottom 10% earning less than $79,850 and the top 10% earning more than $211,450. By industry, software publishers paid the highest median, $149,990, while computer systems design and related services, the industry employing the largest share of software developers, paid the lowest of the five industries BLS tracks, $129,890.',
			},
			{
				question: 'Is software development a growing career?',
				answer: "Yes, per the BLS Employment Projections program's National Employment Matrix, which breaks the Handbook's combined 15% growth figure out by occupation. Software developers specifically are projected to grow 15.8% from 2024 to 2034, adding an estimated 267,700 jobs to the roughly 1,693,800 already working in 2024, both figures BLS itself classifies as much faster than the roughly 3% average projected across all occupations.",
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Software Developers, Quality Assurance Analysts, and Testers (accessed 2026-08-22 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024)', url: 'https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm' },
			{ label: 'BLS Employment Projections: National Employment Matrix, Table 1.2, Occupational Projections 2024-2034 (occupation.xlsx, breaks the combined Handbook growth figure out by SOC code)', url: 'https://www.bls.gov/emp/tables/occupational-projections-and-characteristics.htm' },
			{ label: 'BLS The Economics Daily: Artificial intelligence, information technology, and employment, 2024-34 (independent corroboration of the 15.8% growth and 267,700-job figures for software developers)', url: 'https://www.bls.gov/opub/ted/2026/artificial-intelligence-information-technology-and-employment-2024-34.htm' },
			{ label: 'O*NET OnLine: 15-1252.00 Software Developers, sample reported job titles including Software Engineer (title cross-check)', url: 'https://www.onetonline.org/link/summary/15-1252.00' },
		],
		image: '/images/software-developer-education-path.svg',
		imageAlt: "Diagram showing the path to becoming a software developer: a 4-year bachelor's degree in computer and information technology or a related field, internship or portfolio work during school, no state license or standardized exam, and ongoing skill upkeep, leading to a working software developer earning a median of $133,080 a year per BLS.",
	},
	{
		slug: 'what-does-a-controller-do',
		category: 'Career Guide',
		title: 'What Does a Controller Do? Duties, Path, and BLS Pay Data',
		description: "Controllers direct financial reporting and oversee accounting teams. BLS tracks the role under Financial Managers, a group with a $161,700 median wage.",
		published: '2026-08-22',
		updated: '2026-08-22',
		socCode: '11-3031',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, controllers direct the preparation of an organization's financial reports, oversee its accounting, audit, and budget departments, and prepare the filings required by government regulatory agencies. BLS does not track controllers as their own occupation; it groups them with treasurers, credit managers, cash managers, risk managers, and insurance managers under a single SOC code, Financial Managers (11-3031), and publishes one combined median wage and job-growth figure for the whole group rather than a controller-specific number. That combined group reported a median annual wage of $161,700 in May 2024, and BLS projects 15% employment growth for it from 2024 to 2034, much faster than the average for all occupations.",
		sections: [
			{
				heading: 'What controllers actually do, per BLS',
				body: [
					"BLS describes controllers as one of six specific job types it lists under the broader Financial Managers occupation. Per BLS, controllers \"direct the preparation of financial reports that summarize and forecast an organization's financial position,\" including income statements, balance sheets, and analyses of future earnings or expenses. Controllers are also in charge of preparing the reports required by government agencies that regulate businesses, and they typically oversee the accounting, audit, and budget departments within their organization. That combination, financial reporting plus managing the staff who produce it, is what separates a controller from a bookkeeper or a single accountant: the controller is the one accountable for the accuracy and timeliness of the numbers a company reports externally.",
					"BLS lists the other five financial manager titles for contrast. Treasurers and finance officers direct an organization's budgets, oversee investments and plans to raise capital such as issuing stocks or bonds, and develop financial plans for mergers and acquisitions, a forward-looking, capital-strategy role rather than the backward-looking reporting focus of a controller. Credit managers set credit-rating standards, determine credit limits, and monitor collections of past-due accounts. Cash managers monitor and control the flow of money into and out of an organization, projecting shortages or surpluses. Risk managers use strategies to limit or offset an organization's exposure to financial loss, including risks from currency or commodity price changes. Insurance managers decide how to limit an organization's losses by protecting against risks such as disability payments or lawsuit costs. All six titles report into the same broader Financial Managers occupation in BLS's data, and O*NET, the U.S. Department of Labor's occupational database, now redirects its more detailed \"Treasurers and Controllers\" code (11-3031.02) to the parent Financial Managers code (11-3031.00), independent confirmation that neither BLS's wage survey nor O*NET's own taxonomy tracks controllers as a separate line item from the rest of the group.",
				],
				image: {
					src: '/images/financial-managers-roles.svg',
					alt: 'Diagram showing the six job titles BLS tracks under the Financial Managers occupation: Controller, Treasurer, Credit Manager, Cash Manager, Risk Manager, and Insurance Manager, all sharing one combined median wage.',
				},
			},
			{
				heading: "The entry path: a bachelor's degree, then five years in a related role",
				body: [
					"Per BLS, financial managers, the group that includes controllers, typically need a bachelor's degree and 5 years or more of experience in another business or financial occupation before moving into the role. BLS names five specific feeder occupations in its How to Become One section: loan officer, accountant, auditor, securities sales agent, and financial analyst. The degree itself is typically in business, economics, or a related field, coursework BLS says helps build the analytical skills the job requires. On-the-job training for the financial manager role itself is not typically required, per BLS's Quick Facts, because the required experience is expected to have already built those skills in the feeder occupation.",
					"Professional certification is not required to work as a controller, per BLS, though it can indicate competence to employers. BLS points to CareerOneStop, a U.S. Department of Labor resource, for details on specific certifications available to financial managers with government-focused work; separately, some controllers hold a Certified Public Accountant (CPA) license, which BLS notes is issued by state boards of accountancy after a candidate passes an exam. From there, BLS lists a specific advancement path: experienced financial managers, controllers included, may advance to become chief financial officers (CFOs), the executives BLS describes as responsible for the accuracy of an organization's overall financial reporting, a level above the department-specific reporting a controller oversees.",
				],
			},
			{
				heading: "Pay: what BLS reports for the group, and why it isn't controller-specific",
				body: [
					"BLS reports a median annual wage of $161,700 for financial managers in May 2024, or $77.74 an hour, well above the $49,500 median across all occupations that year. The bottom 10% earned less than $86,490, and the top 10% earned more than $239,200, a top-to-bottom spread of nearly 2.8 times between the two boundary figures BLS publishes. Because this is one combined figure for controllers, treasurers, credit managers, cash managers, risk managers, and insurance managers together, it does not isolate what controllers specifically earn; a controller's actual pay could sit anywhere in that range depending on the employer, industry, and how large a reporting operation they oversee.",
					"By industry, BLS breaks out May 2024 wages into five categories for the group: professional, scientific, and technical services paid the highest median, $171,580, followed by management of companies and enterprises at $169,340, finance and insurance at $164,940, manufacturing at $160,660, and government excluding state and local education and hospitals, the lowest of the five tracked industries, at $134,790. Separately, BLS reports where the largest share of financial managers actually work: finance and insurance employed 31% of the group in 2024, the largest single share, followed by professional, scientific, and technical services at 14% and management of companies and enterprises at 10%, meaning the highest-paying industry by median wage is not the one that employs the most people in the role.",
				],
			},
			{
				heading: 'Job outlook, and how this group compares to the roles that typically lead into it',
				body: [
					"BLS projects employment of financial managers to grow 15% from 2024 to 2034, much faster than the roughly 3% average across all occupations, adding an estimated 128,800 jobs to the 868,600 already employed in 2024. About 74,600 openings are projected each year on average over the decade; BLS attributes many of those to the need to replace workers who transfer to other occupations or exit the labor force, such as to retire, rather than to newly created positions alone. BLS attributes the growth itself partly to an increased emphasis on risk management within the financial industry, which it expects to continue, and specifically calls out cash management and risk management as specialties likely to be in high demand over the decade.",
					"Against the feeder occupations BLS itself names for this role, the financial manager median sits well above [accountants](/how-to-become-an-accountant/) at $81,680, nearly double that figure, and above [actuaries](/actuary-salary/) at $125,770, a gap of $35,930. That ordering lines up with BLS's own description of the career path: accountant and financial analyst are named as roles someone typically works in before becoming a financial manager, not as competing end points, so the pay gap partly reflects that a financial manager's 5-plus years of prior experience is layered on top of, not instead of, the bachelor's degree those feeder roles also require. BLS's data describes what each occupation pays; it does not break out how much of that gap is attributable to the added years of experience alone versus the added management responsibility, and this page reports the pattern rather than asserting a specific cause.",
				],
			},
		],
		faq: [
			{
				question: 'What does a controller do?',
				answer: "Per BLS, controllers direct the preparation of financial reports that summarize and forecast an organization's financial position, including income statements, balance sheets, and analyses of future earnings or expenses. They also prepare the reports required by government regulatory agencies and typically oversee their organization's accounting, audit, and budget departments.",
			},
			{
				question: 'How much do controllers make?',
				answer: "BLS does not publish a controller-specific wage. It reports one combined figure for the broader Financial Managers occupation, which includes controllers, treasurers, credit managers, cash managers, risk managers, and insurance managers: a median annual wage of $161,700 in May 2024 ($77.74 an hour), with the bottom 10% earning less than $86,490 and the top 10% earning more than $239,200.",
			},
			{
				question: "What's the difference between a controller and a treasurer?",
				answer: "Both are financial manager titles BLS tracks under the same SOC code, but the focus differs. Per BLS, controllers direct financial reporting, oversee the accounting, audit, and budget departments, and prepare filings for regulators, a largely backward-looking record-keeping role. Treasurers direct an organization's budgets, oversee investments, and raise capital through means such as issuing stocks or bonds, and develop financial plans for mergers and acquisitions, a forward-looking capital-strategy role.",
			},
			{
				question: 'How do you become a controller?',
				answer: "Per BLS, the path runs through a bachelor's degree, typically in business, economics, or a related field, followed by 5 years or more of experience in another business or financial occupation such as loan officer, accountant, auditor, securities sales agent, or financial analyst. BLS does not list a specific license or certification as required to work as a controller, though some controllers hold a CPA license issued by a state board of accountancy. From there, BLS notes experienced financial managers, controllers included, may advance to chief financial officer (CFO).",
			},
			{
				question: 'Is financial management a growing career?',
				answer: 'Yes, per BLS. It projects 15% employment growth for financial managers, the group that includes controllers, from 2024 to 2034, much faster than the roughly 3% average across all occupations, adding an estimated 128,800 jobs to the 868,600 already employed in 2024. About 74,600 openings are projected each year on average, mostly from the need to replace workers who transfer to other occupations or leave the labor force.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Financial Managers (accessed 2026-08-22 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024)', url: 'https://www.bls.gov/ooh/management/financial-managers.htm' },
			{ label: 'O*NET OnLine: 11-3031.00 Financial Managers (the more detailed 11-3031.02 "Treasurers and Controllers" code now redirects here, independent confirmation controllers are not tracked as a separate BLS/O*NET occupation)', url: 'https://www.onetonline.org/link/summary/11-3031.00' },
		],
		image: '/images/financial-managers-roles.svg',
		imageAlt: 'Diagram showing the six job titles BLS tracks under the Financial Managers occupation: Controller, Treasurer, Credit Manager, Cash Manager, Risk Manager, and Insurance Manager, all sharing one combined median wage.',
	},
	{
		slug: 'how-to-become-a-court-reporter',
		category: 'How to Become',
		title: 'How to Become a Court Reporter: Certification, Path, and Pay',
		description: 'BLS says most court reporters train 2-3 years for a certificate or associate degree. State licensing rules vary, and BLS projects flat 0% job growth through 2034.',
		published: '2026-08-22',
		updated: '2026-08-22',
		socCode: '27-3092',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, court reporters and simultaneous captioners (SOC 27-3092) typically complete a postsecondary certificate or associate's degree at a community college or technical institute, a program that usually takes 2 to 3 years. Many states require a license or certification from a professional association to work in a legal setting, though BLS notes these requirements vary by state and by reporting method. BLS reports a median annual wage of $67,310 in May 2024 ($32.36 an hour), with the bottom 10% earning less than $39,100 and the top 10% earning more than $127,020. Unlike most occupations this site tracks, BLS projects 0% employment growth for court reporters and simultaneous captioners from 2024 to 2034, attributing the roughly 1,700 annual openings entirely to the need to replace workers who leave the occupation.",
		sections: [
			{
				heading: 'What the job involves, and the training path BLS lists',
				body: [
					'BLS tracks this occupation under the combined title "Court Reporters and Simultaneous Captioners," SOC code 27-3092, describing court reporters as workers who create word-for-word transcriptions at trials, depositions, administrative hearings, and other legal proceedings, using stenotype machines, digital recording devices, or steno masks. Simultaneous captioners do similar work in a different setting: they caption live or prerecorded broadcasts, or provide real-time transcription of presentations such as press conferences and business meetings, for viewers or attendees who are deaf or hard of hearing.',
					"The typical entry-level education BLS lists is a postsecondary nondegree award, most often earned through a certificate or associate's degree program at a community college or technical institute. BLS states that completing a court reporting program typically takes 2 or 3 years, with coursework in English grammar and phonetics, legal procedures, and legal terminology, plus supervised practice preparing transcripts to build speed and accuracy. BLS lists no minimum work experience in a related occupation as typical for entry, and describes the on-the-job training that follows as short-term, though it notes the exact length varies by the type of reporting or captioning a worker does.",
					'BLS lists four qualities as important for this work, each tied directly to the accuracy the job demands. Concentration: court reporters and simultaneous captioners must be able to focus for long periods so they remain attentive to the dialogue they are recording. Detail orientation: BLS notes these workers must produce error-free work, since the transcripts they create serve as legal records. Listening skills: they must give full attention to speakers and capture every word said, including names and technical terminology that get reviewed for spelling after the fact. Writing skills: BLS specifies a good command of grammar, vocabulary, and punctuation, since the finished transcript stands as the official record of what occurred.',
				],
				image: {
					src: '/images/court-reporter-education-path.svg',
					alt: "Diagram showing the path to becoming a court reporter or simultaneous captioner: a 2-3 year postsecondary certificate or associate's degree, choosing a reporting method such as stenotype, voice-writing, or digital recording, a state license or professional certification exam, and on-the-job training, leading to a median pay of $67,310 a year per BLS.",
				},
			},
			{
				heading: 'Licensing varies by state, and the reporting method you pick changes the training',
				body: [
					"BLS is explicit that licensing is not standardized across the country: many states require court reporters and simultaneous captioners working in legal settings to hold a state license or a certification from a professional association, but the specific requirements vary by state and by method of reporting or captioning. Certification typically requires passing a written test plus a skills test, in which applicants must type, record, or transcribe a minimum number of words per minute at a set accuracy level. Professional associations often add continuing education credits as a condition of renewing that certification once it's issued.",
					'The method a court reporter trains in also shapes the path. O*NET lists several sample job titles under this same SOC code, including Court Stenographer, Realtime Court Reporter, Digital Court Reporter, and Stenographer, reflecting that some programs teach traditional stenotype-machine shorthand, others teach voice-writing into a steno mask paired with speech-recognition software, and others focus on operating digital or electronic recording equipment. Employers and state licensing boards, not BLS, decide which method or methods a given credential covers.',
					"That licensing landscape puts court reporting at the opposite end of the spectrum from [paralegals](/how-to-become-a-paralegal/), an occupation this site tracks that starts from a similar postsecondary certificate or associate's degree, but where BLS states no U.S. state currently licenses the occupation at all. Court reporters, by contrast, typically do need a state credential to work in the legal settings BLS describes as their primary work environment.",
				],
			},
			{
				heading: 'Pay, by percentile and by industry',
				body: [
					'BLS reports a median annual wage of $67,310 for court reporters and simultaneous captioners in May 2024, or $32.36 an hour, above the $49,500 median across all occupations that year. The bottom 10% earned less than $39,100, and the top 10% earned more than $127,020, the boundary figures BLS publishes rather than exact percentile values, a spread of well over three times between the lower and upper bound.',
					'By industry, BLS breaks out May 2024 median pay into three categories: local government, excluding education and hospitals, paid the highest median at $75,150, followed closely by state government, excluding education and hospitals, at $74,660, while business support services, the industry covering firms that supply reporting or captioning services to courts and other clients on contract, paid a lower median of $51,290. BLS separately notes that freelance court reporters and simultaneous captioners typically charge an hourly rate and may also sell additional transcript copies at a set price per page, a pay structure that doesn\'t map directly onto the industry-median figures it tracks for salaried positions.',
					"Against another postsecondary-certificate occupation this site tracks, the court reporter median sits well below [ultrasound techs](/how-to-become-an-ultrasound-tech/) at $89,340, even though both typically train 2 to 3 years at a similar credential tier. BLS's data describes what each occupation pays; it does not explain the roughly $22,000 gap between two occupations built on a comparable length and level of postsecondary training.",
				],
			},
			{
				heading: 'Job outlook: BLS projects no growth, but stable openings from replacement need',
				body: [
					'BLS projects 0% employment growth for court reporters and simultaneous captioners from 2024 to 2034, a rate it labels "little or no change," compared with a roughly 3% average across all occupations and the double-digit growth rates BLS projects for several other occupations this site tracks. Employment is projected to hold at 17,700 jobs, per BLS, with the increase over the decade rounding to zero.',
					"Flat growth doesn't mean no openings, though. BLS projects about 1,700 openings a year on average over the decade, attributing most of them to the need to replace workers who transfer to a different occupation or exit the labor force, such as to retire, rather than to any net increase in positions. BLS lists several specific forces behind the flat headline number: technology may make transcription work more efficient, but BLS states court reporters will continue to be needed to review and edit digitally produced documentation; state and local government budgets, which fund many court reporter positions, are contingent on available funds; and federal regulations requiring closed captioning for television, the internet, and other technologies, along with a growing share of older people who experience hearing loss, are cited by BLS as forces that should support demand specifically for simultaneous captioners. BLS names movie theaters and sports stadiums adding closed captioning for attendees who are deaf or hard of hearing as another driver on the captioning side of the occupation specifically, separate from the courtroom-budget dynamics that shape demand for court reporters.",
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a court reporter?',
				answer: 'Per BLS, completing a postsecondary certificate or associate\'s degree program in court reporting typically takes 2 to 3 years at a community college or technical institute. After that, most states require passing a licensing or certification exam, a written test plus a skills test measuring typing, recording, or transcription speed and accuracy, before a graduate can work in a legal setting. BLS lists no additional related work experience as typical for entry, though on-the-job training follows and its length varies by the type of reporting or captioning.',
			},
			{
				question: 'Do you need a license to be a court reporter?',
				answer: "Often, yes. BLS states that many states require court reporters and simultaneous captioners who work in legal settings to hold a state license or a certification from a professional association, though the exact requirements vary by state and by reporting method. That's a different rule than [paralegals](/how-to-become-a-paralegal/) face, a similar postsecondary-certificate occupation BLS tracks where no U.S. state currently licenses the role at all.",
			},
			{
				question: 'How much do court reporters make?',
				answer: 'BLS reports a median annual wage of $67,310 for court reporters and simultaneous captioners in May 2024 ($32.36 an hour), with the bottom 10% earning less than $39,100 and the top 10% earning more than $127,020. By industry, local government paid the highest median, $75,150, followed by state government at $74,660, while business support services, the contract-reporting-firm industry, paid a lower median of $51,290.',
			},
			{
				question: 'Is court reporting a growing career?',
				answer: 'Not by BLS\'s growth measure. BLS projects 0% employment growth for court reporters and simultaneous captioners from 2024 to 2034, which it labels "little or no change." That doesn\'t mean no hiring: BLS projects about 1,700 openings a year on average over the decade, almost entirely from the need to replace workers who transfer to other occupations or leave the labor force, such as to retire, rather than from net new positions.',
			},
			{
				question: "What's the difference between a court reporter and a simultaneous captioner?",
				answer: 'BLS tracks both under the same occupation and SOC code, 27-3092, because they share a core skill: capturing spoken words into an accurate, verbatim written record in real time. The settings differ. Court reporters, per BLS, work mainly in courts or legislatures, creating transcripts of trials, depositions, and hearings. Simultaneous captioners caption television broadcasts or provide real-time transcription at presentations such as press conferences and business meetings, work BLS says can be done from home or a central office, for viewers or attendees who are deaf or hard of hearing.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Court Reporters and Simultaneous Captioners (accessed 2026-08-22 via direct fetch with a UA string carrying a declared contact URL, returned 200 via the canonical short URL after the long-form URL returned 403, data from May 2024)', url: 'https://www.bls.gov/ooh/legal/court-reporters.htm' },
			{ label: 'O*NET OnLine: 27-3092.00 Court Reporters and Simultaneous Captioners, sample job titles cross-check', url: 'https://www.onetonline.org/link/summary/27-3092.00' },
		],
		image: '/images/court-reporter-education-path.svg',
		imageAlt: "Diagram showing the path to becoming a court reporter or simultaneous captioner: a 2-3 year postsecondary certificate or associate's degree, choosing a reporting method such as stenotype, voice-writing, or digital recording, a state license or professional certification exam, and on-the-job training, leading to a median pay of $67,310 a year per BLS.",
	},
	{
		slug: 'what-does-a-millwright-do',
		category: 'Career Guide',
		title: 'What Does a Millwright Do? Duties, Path, and BLS Pay Data',
		description: 'Millwrights install, dismantle, and move industrial machinery. BLS puts their median pay at $65,170 and projects flat, 0% job growth through 2034.',
		published: '2026-08-23',
		updated: '2026-08-23',
		socCode: '49-9044',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, millwrights install, dismantle, repair, reassemble, and move industrial machinery in factories, power plants, and construction sites. BLS tracks the role inside a combined occupation, Industrial Machinery Mechanics, Machinery Maintenance Workers, and Millwrights, but unlike some combined-title occupations this site covers, it does publish a millwright-specific median wage: $65,170 a year in May 2024, above the $63,760 median for industrial machinery mechanics and the $60,500 median for machinery maintenance workers in the same group. Most millwrights enter through a 3- to 4-year apprenticeship rather than a college degree. BLS projects flat, 0% employment growth for millwrights specifically from 2024 to 2034, a rate that falls into the \"little or no change\" band on BLS's own growth-rate classification scale, even though the broader group they're tracked alongside is projected to grow 13%.",
		sections: [
			{
				heading: 'What millwrights actually do, per BLS',
				body: [
					'BLS groups millwrights with industrial machinery mechanics and machinery maintenance workers under one occupation, Industrial Machinery Mechanics, Machinery Maintenance Workers, and Millwrights (the millwright-specific SOC code is 49-9044), but it describes each of the three titles separately in its What They Do section. Per BLS, "millwrights install, maintain, and disassemble industrial machines." Putting together a single machine can take a few days or several weeks. Millwrights carry out repairs by replacing worn or defective parts, and they\'re also the ones called in when a manufacturing plant needs to clear floor space for new equipment: BLS says millwrights disassemble the entire machine, then "carefully disassemble, categorize, and package each part."',
					'BLS draws a clear line between millwrights and the other two titles in the group. Industrial machinery mechanics, per BLS, use technical manuals and computerized diagnostic tools to figure out why a machine already running has failed, for example tracing a vibration to worn belts or weak motor bearings, then take it apart to repair or replace the failed component. Machinery maintenance workers handle lighter, routine work: cleaning, lubricating, and running basic diagnostic tests, leaving major repairs to the mechanics. Millwrights differ from both in scope. They\'re the ones who install a new machine in the first place, and when a machine needs to be relocated or taken apart entirely, they use tools that scale to the job, from cranes, forklifts, hoists, and winches on large projects down to hand tools such as hammers and levels, plus precision-measuring devices like micrometers and lasers for smaller work.',
				],
				image: {
					src: '/images/millwright-duties.svg',
					alt: 'Diagram showing four things millwrights do per BLS: install new machines, disassemble and sort parts, repair worn components, and move equipment with forklifts, hoists, and cranes.',
				},
			},
			{
				heading: 'The entry path: an apprenticeship, not a degree',
				body: [
					'BLS states that industrial machinery mechanics, machinery maintenance workers, and millwrights typically need only a high school diploma or equivalent to enter the occupation, but the training path splits from there. Machinery maintenance workers usually receive a few months to a year of on-the-job training. Industrial machinery mechanics typically get more than a year of on-the-job training. BLS notes that some mechanics and millwrights alike complete a 2-year associate\'s degree program in industrial maintenance first, covering courses such as welding, math, hydraulics, and pneumatics, though it isn\'t a requirement for either. The standard path for millwrights specifically, per BLS, is that they "learn their trade through a 3- or 4-year apprenticeship." Each year of that program requires at least 144 hours of related technical instruction plus up to 2,000 hours of paid on-the-job training, split between classroom subjects such as welding, blueprint reading, math, and machinery troubleshooting, and supervised work setting up, cleaning, lubricating, repairing, and starting machinery. BLS lists the basic qualifications for entering an apprenticeship as a minimum age of 18, a high school diploma or equivalent, and being physically able to do the work, with employers, local unions, contractor associations, and state labor departments typically sponsoring the programs. Once a millwright completes the apprenticeship, BLS says they are considered fully qualified and can perform tasks with less supervision.',
					"That apprenticeship structure puts millwrights in the middle of the no-degree trades this site tracks. It runs a year shorter than the [plumbing apprenticeship](/plumbing-apprenticeship/), which this site's BLS-sourced data puts at 4 to 5 years with roughly 2,000 paid hours a year, and shorter than the 4- or 5-year apprenticeship BLS describes for [electricians](/electrician-salary/), which likewise runs about 2,000 paid hours per year. It's also more structured than the path into [welding](/welder-salary/), where BLS describes several viable entry routes side by side (vocational school, employer apprenticeship, military training, or direct hire with on-the-job training) rather than one standard apprenticeship length.",
				],
			},
			{
				heading: 'Pay: a millwright-specific figure inside a combined BLS page',
				body: [
					'BLS reports a median annual wage of $63,510 for the combined group, Industrial Machinery Mechanics, Machinery Maintenance Workers, and Millwrights, in May 2024. Inside that combined figure, BLS breaks median pay out by the three individual titles: millwrights earned a median of $65,170, above industrial machinery mechanics at $63,760 and machinery maintenance workers at $60,500. What BLS does not break out by title is the 10th and 90th percentile range or the industry-by-industry wage table. For the combined group as a whole, the bottom 10% earned less than $44,430 and the top 10% earned more than $91,620, a spread of roughly 2 times between the two boundary figures, but that range describes all three titles together, not millwrights specifically. The same caveat applies to the industry breakdown: manufacturing paid the highest median for the combined group at $64,360, followed by construction at $62,920, wholesale trade at $61,940, and the repair-and-maintenance services industry at $60,490, again without a millwright-only figure inside each industry.',
					'Against other no-degree apprenticeship trades this site tracks, the millwright median lands above [electricians](/electrician-salary/) at $62,350 and [plumbers, pipefitters, and steamfitters](/plumbing-apprenticeship/) at $62,970, and well above [welders, cutters, solderers, and brazers](/welder-salary/) at $51,000, a gap of more than $14,000. BLS\'s data describes what each occupation pays; it does not explain why the shorter millwright apprenticeship pairs with pay above two trades that require a longer one, and this page reports the pattern rather than asserting a specific cause.',
				],
			},
			{
				heading: 'Job outlook: flat for millwrights, even as the wider group grows',
				body: [
					'BLS projects overall employment for the combined group, industrial machinery mechanics, machinery maintenance workers, and millwrights, to grow 13% from 2024 to 2034, much faster than the roughly 3% average across all occupations, with about 54,200 openings projected each year on average across the whole group. Millwrights specifically do not share in that growth. BLS\'s own projections table shows millwright employment holding flat at 41,300 jobs in both 2024 and 2034, a 0% change that falls into the "little or no change" band on BLS\'s growth-rate classification scale (an increase of less than 1% to a decrease of less than 1%), out of 41,300 millwrights within the larger 538,300-person combined workforce. Industrial machinery mechanics, the largest of the three titles at 439,600 workers, account for nearly all of the group\'s projected growth, up 16% to 510,300; machinery maintenance workers are projected to shrink 3%, to 55,900.',
					'BLS attributes the flat millwright number to the specific industries that employ them. Millwrights\' employment, per BLS, "is affected by the slower growth of the industries in which they are employed, such as paper mills." BLS also points to slower expected job growth in nonresidential construction, since the facilities built there are less likely to require a millwright, as a second drag on the number. That combined-group total of 54,200 annual openings is not broken out by title either, so this page does not attribute a specific annual-openings figure to millwrights alone. For context on what drives growth elsewhere in the group, BLS credits continued adoption of automated manufacturing machinery and expanded use of automated conveyors, both of which need regular upkeep, with creating jobs for industrial machinery mechanics specifically.',
				],
			},
		],
		faq: [
			{
				question: 'What does a millwright do?',
				answer: 'Per BLS, millwrights install, maintain, and disassemble industrial machines in factories, power plants, and construction sites. Putting together a single machine can take a few days or several weeks. Millwrights also handle repairs by replacing worn or defective parts, and when a plant needs to clear floor space for new equipment, they disassemble the entire machine and carefully categorize and package each part.',
			},
			{
				question: 'How much do millwrights make?',
				answer: "BLS reports a median annual wage of $65,170 for millwrights in May 2024, a figure it breaks out specifically for the title within the combined Industrial Machinery Mechanics, Machinery Maintenance Workers, and Millwrights group. That's above the $63,760 median for industrial machinery mechanics and the $60,500 median for machinery maintenance workers in the same group. BLS does not publish 10th and 90th percentile wages or an industry-by-industry breakdown specific to millwrights; those figures, $44,430 to $91,620 by percentile and $60,490 to $64,360 by industry, cover all three titles combined.",
			},
			{
				question: 'How long does it take to become a millwright?',
				answer: 'Per BLS, most millwrights learn the trade through a 3- or 4-year apprenticeship. Each year requires at least 144 hours of related technical instruction plus up to 2,000 hours of paid on-the-job training. Entry qualifications are a minimum age of 18, a high school diploma or equivalent, and being physically able to do the work; employers, local unions, contractor associations, and state labor departments typically sponsor the programs.',
			},
			{
				question: 'Is millwright a growing career?',
				answer: 'Not by BLS\'s growth measure. While the broader group millwrights are tracked within, industrial machinery mechanics, machinery maintenance workers, and millwrights, is projected to grow 13% from 2024 to 2034, BLS\'s own projections table shows millwright employment specifically holding flat at 41,300 jobs across that same decade, a 0% change that falls into the "little or no change" band on BLS\'s growth-rate classification scale. BLS attributes the flat number to slower growth in the industries that employ millwrights, such as paper mills, and to slower expected job growth in nonresidential construction.',
			},
			{
				question: "What's the difference between a millwright and an industrial machinery mechanic?",
				answer: 'Both are tracked under the same combined BLS occupation, but the work differs. Per BLS, millwrights install new machines, and disassemble, move, and reassemble them, often using cranes, forklifts, and precision-measuring tools on large projects. Industrial machinery mechanics instead diagnose and repair machines that are already running, using technical manuals and computerized diagnostic tools to trace a problem, such as a vibration, back to a specific cause before taking the machine apart to fix it. Millwrights typically train through a 3- to 4-year apprenticeship, while industrial machinery mechanics typically receive more than a year of on-the-job training, sometimes alongside a 2-year associate\'s degree.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Industrial Machinery Mechanics, Machinery Maintenance Workers, and Millwrights (accessed 2026-08-23 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024, last modified August 28, 2025)', url: 'https://www.bls.gov/ooh/installation-maintenance-and-repair/industrial-machinery-mechanics-and-maintenance-workers-and-millwrights.htm' },
			{ label: 'BLS Occupational Outlook Handbook: About This Handbook, Glossary (defines the growth-rate classification scale; "little or no change" covers an increase of less than 1% to a decrease of less than 1%, the band the millwright-specific 0% figure falls into)', url: 'https://www.bls.gov/ooh/about/glossary.htm' },
		],
		image: '/images/millwright-duties.svg',
		imageAlt: 'Diagram showing four things millwrights do per BLS: install new machines, disassemble and sort parts, repair worn components, and move equipment with forklifts, hoists, and cranes.',
	},
	{
		slug: 'how-to-become-a-paramedic',
		category: 'How to Become',
		title: 'How to Become a Paramedic: Certification, Licensing, and Pay',
		description: 'BLS breaks the path into three certification tiers: EMT-Basic, EMT-Intermediate, then a paramedic program. Median pay is $58,410 a year, well above the EMT median.',
		published: '2026-08-23',
		updated: '2026-08-23',
		socCode: '29-2043',
		coreSummary: 'Per the U.S. Bureau of Labor Statistics, becoming a paramedic runs through three certification tiers rather than a single credential: EMT-Basic, EMT-Intermediate, then a paramedic postsecondary program that requires EMT-Intermediate certification just to enter. BLS tracks paramedics under SOC code 29-2043, a distinct code from EMTs (29-2042) within the combined "EMTs and Paramedics" occupation group, and reports a paramedic-specific median annual wage of $58,410 for May 2024, well above the $41,340 median for EMTs on the same BLS page. State licensing requirements vary, and BLS projects 5% employment growth for the combined EMT and paramedic group from 2024 to 2034, with most of the roughly 19,000 annual openings coming from the need to replace workers who leave the occupation.',
		sections: [
			{
				heading: 'Three certification tiers, each built on the one before it',
				body: [
					'BLS covers EMTs and paramedics together in its Occupational Outlook Handbook, under the combined title "EMTs and Paramedics," but its How to Become One tab lays out a tiered structure rather than one flat entry path. EMT-Basic is the first level: programs typically take less than a year and cover assessing a patient\'s condition, handling emergencies, and using field equipment. EMT-Intermediate comes next, adding instruction in advanced skills such as complex airway devices, intravenous fluids, and some medications, in a program BLS says can run up to 2 years. A paramedic program is the third tier, and BLS is explicit that applicants need EMT-Intermediate certification just to enroll.',
					'Paramedic programs themselves cover anatomy and physiology, EKG interpretation, and maintaining airflow, along with supervised field experience alongside working crews. Most run through community colleges and lead to a nondegree award or an associate\'s degree, though BLS notes some 4-year universities offer bachelor\'s-degree paramedic programs. Beyond the coursework, BLS states that paramedics typically need work experience as an EMT before entering a paramedic education program in the first place, and that working as a volunteer EMT or paramedic can help build that experience.',
					'All states require EMTs and paramedics to be licensed, though BLS says the specific requirements vary by state: most require candidates to pass a certification exam, while others require passing an equivalent state exam instead. States can add their own conditions on top of that, such as a minimum age or a background check, and BLS points to CareerOneStop as a source for state-by-state licensing board requirements. Employers typically also require a driver\'s license, and BLS notes some prefer candidates to hold ambulance driver certification as well.',
				],
				image: {
					src: '/images/paramedic-education-path.svg',
					alt: 'Diagram showing the path to becoming a paramedic: EMT-Basic certification, EMT-Intermediate certification, a paramedic postsecondary program requiring EMT-Intermediate status to enter, then a state licensing exam, leading to a median pay of $58,410 a year per BLS.',
				},
			},
			{
				heading: 'EMT and paramedic are tracked as separate BLS occupations, not just job titles',
				body: [
					'BLS narrates EMTs and paramedics on one Occupational Outlook Handbook page, but the two carry distinct 6-digit SOC codes underneath: EMTs sit under 29-2042 and paramedics under 29-2043, both inside the broader 29-2040 group. That distinction matters for the pay data, because BLS\'s Pay tab breaks out separate median wages and separate industry tables for each title rather than publishing one blended figure, the same kind of title-specific split this site has found on a handful of other combined-occupation BLS pages.',
					'Per BLS, the qualities that matter for both EMTs and paramedics center on the pace and stakes of the work: communication skills, to listen to patients and dispatchers and give clear instructions; compassion, to support patients in life-threatening or highly stressful situations; interpersonal skills, to coordinate with a team and a wide range of people on scene; physical strength, for bending, lifting, and kneeling over a shift; and problem-solving skills, to evaluate symptoms and determine appropriate treatment on the spot.',
					'BLS does not publish 10th and 90th percentile wages anywhere on this page, for EMTs, for paramedics, or for the combined group. That is a gap from most other occupations this site tracks, where BLS at least reports a percentile range even when it doesn\'t break wages out by job title.',
				],
			},
			{
				heading: 'Pay: a paramedic-specific median, and how it compares',
				body: [
					'BLS reports a median annual wage of $58,410 for paramedics in May 2024, above the $41,340 median for EMTs and the $46,350 median for the combined EMT-and-paramedic group on the same page, and also above the $49,500 median across all occupations that year. By industry, BLS\'s top-5 table for paramedics specifically shows local government (excluding education and hospitals) paying the highest median, $59,840, followed by offices of physicians at $59,370, private general medical and surgical hospitals at $58,780, ambulance services at $57,720, and local-government general medical and surgical hospitals at $52,990. Ambulance services, the setting most people probably picture first for this occupation, is not the top-paying industry BLS tracks for paramedics; local government and physician offices both pay more at the median.',
					'BLS\'s industry table for EMTs, by contrast, shows outpatient care centers paying a median of $67,990, higher than any single industry BLS lists for paramedics. BLS does not explain that gap beyond publishing the figures, and it does not change the overall picture: EMTs\' median annual wage across all industries is still well below paramedics\', so one high-paying EMT industry segment does not mean EMTs typically out-earn paramedics.',
					'Against other BLS occupations this site has covered that share the same "postsecondary nondegree award" entry-level classification, paramedic pay sits close to [firefighters](/firefighter-salary/), whose $59,530 median is about $1,120 above the paramedic figure, and well above [CNAs](/how-to-become-a-cna/), whose $39,530 median is roughly 48% lower despite CNA training running a federal floor of just 75 hours rather than a multi-tier certification path. BLS does not weigh how much of these gaps traces to training length, scope of practice, or the settings each occupation typically works in.',
				],
			},
			{
				heading: 'Job outlook, and an advancement path BLS names specifically',
				body: [
					'BLS projects 5% employment growth for the combined EMT-and-paramedic occupation from 2024 to 2034, a rate it classifies as faster than the roughly 3% average across all occupations, with about 19,000 openings projected each year on average over the decade. As with most occupations BLS tracks, it attributes many of those annual openings to the need to replace workers who transfer to a different occupation or exit the labor force, such as to retire, rather than to newly created positions alone. That 5% figure and the 19,000-opening estimate cover EMTs and paramedics together; BLS does not publish a paramedic-specific growth rate or opening count on this page.',
					'BLS names one specific advancement route out of the occupation: with additional education, paramedics can move into other healthcare roles, and it points to paramedic-to-RN programs as an accelerated pathway into becoming a registered nurse. This site\'s [registered nurse pay guide](/how-long-is-nursing-school/) reports a median annual wage of $93,600 for RNs in May 2024, $35,190 above the paramedic median, though BLS does not quantify how much of that gap a paramedic entering through a bridge program would actually see, since bridge-program graduates still need to pass the NCLEX-RN and complete whatever program length their specific bridge track requires.',
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a paramedic?',
				answer: 'Per BLS, the path runs through three tiers: EMT-Basic certification (typically under a year), EMT-Intermediate certification (up to 2 years), then a paramedic program, which requires EMT-Intermediate status to enter and can lead to a nondegree award, an associate\'s degree, or in some cases a bachelor\'s degree. BLS also states that paramedics typically need work experience as an EMT before entering a paramedic education program, on top of the coursework itself.',
			},
			{
				question: 'How much do paramedics make?',
				answer: 'BLS reports a median annual wage of $58,410 for paramedics in May 2024, compared with $41,340 for EMTs and $46,350 for the combined EMT-and-paramedic group. By industry, local government (excluding education and hospitals) pays the highest median for paramedics specifically, $59,840, followed by offices of physicians at $59,370. BLS does not publish 10th or 90th percentile wages for this occupation at any level of detail.',
			},
			{
				question: "What's the difference between an EMT and a paramedic?",
				answer: 'BLS tracks them as separate occupations, EMTs under SOC code 29-2042 and paramedics under 29-2043, though both fall under the same "EMTs and Paramedics" umbrella page. Paramedics complete additional certification beyond EMT-Intermediate, including a dedicated postsecondary program covering EKG interpretation and airway management, and BLS reports a meaningfully higher median wage for paramedics: $58,410 versus $41,340 for EMTs in May 2024.',
			},
			{
				question: 'Do paramedics need a license?',
				answer: 'Yes. BLS states that all states require EMTs and paramedics to be licensed, though the exact process varies: most states require passing a certification exam, while others require an equivalent state exam. States can layer on additional requirements, such as a minimum age or a background check, and CareerOneStop is the source BLS points to for state-specific licensing board details.',
			},
			{
				question: 'Is paramedic a growing career?',
				answer: 'By BLS\'s growth measure, yes, though the figure covers EMTs and paramedics together rather than paramedics alone. BLS projects 5% employment growth for the combined group from 2024 to 2034, faster than the roughly 3% average across all occupations, with about 19,000 openings projected each year, most of them from the need to replace workers who leave the occupation rather than from newly created positions.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: EMTs and Paramedics (accessed 2026-08-23 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024, last modified August 28, 2025)', url: 'https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm' },
			{ label: 'O*NET OnLine: 29-2043.00 Paramedics (independent confirmation paramedics carry a distinct SOC code from EMTs, 29-2042, within the combined 29-2040 group)', url: 'https://www.onetonline.org/link/summary/29-2043.00' },
		],
		image: '/images/paramedic-education-path.svg',
		imageAlt: 'Diagram showing the path to becoming a paramedic: EMT-Basic certification, EMT-Intermediate certification, a paramedic postsecondary program requiring EMT-Intermediate status to enter, then a state licensing exam, leading to a median pay of $58,410 a year per BLS.',
	},
	{
		slug: 'what-does-a-dental-hygienist-do',
		category: 'Career Guide',
		title: 'What Does a Dental Hygienist Do? Duties, Setting, and Pay',
		description: "Dental hygienists clean teeth, take x-rays, and screen for gum disease, usually under a dentist's oversight. Here's what BLS says the job involves, plus pay data.",
		published: '2026-08-24',
		updated: '2026-08-24',
		socCode: '29-1292',
		coreSummary: 'Per the U.S. Bureau of Labor Statistics, dental hygienists examine patients for signs of oral disease, remove tartar and plaque, apply preventive treatments such as fluoride and sealants, take dental x-rays, and educate patients on oral hygiene, typically working alongside a supervising dentist. The role requires an associate\'s degree from an accredited dental hygiene program, usually a 3-year course of study, plus state licensure. BLS reports a median annual salary of $94,260 in May 2024, and nearly all hygienists, 94% of the occupation, work in dentists\' offices.',
		sections: [
			{
				heading: 'What the job actually involves',
				body: [
					'Per BLS, "dental hygienists examine patients for signs of oral diseases, such as gingivitis, and provide preventive care, including oral hygiene." In its longer duties list, BLS breaks that down into a specific set of tasks: removing tartar, stains, and plaque from teeth; applying sealants and fluoride to help protect teeth; taking and developing dental x-rays; assessing a patient\'s oral health and reporting findings to the dentist; documenting patient care and treatment plans; and teaching patients proper brushing and flossing technique.',
					'BLS also describes the tools involved. Hygienists use hand, power, and ultrasonic instruments, and in some cases lasers, to do the cleaning itself. An air-polishing device, which sprays a mix of air, water, and baking soda, removes stains, while a power tool that works like an automatic toothbrush polishes teeth afterward. X-ray machines are used separately to check for tooth or jaw problems that aren\'t visible during a routine exam.',
					'How much of that a hygienist can do without a dentist standing over their shoulder, and how far their duties extend, is not the same everywhere. BLS states plainly that "the tasks hygienists may perform, and the extent to which they must be supervised by a dentist, vary by state and by the setting in which the dental hygienist works," and that a few states allow hygienists with additional training, sometimes called dental therapists, to provide limited restorative services such as extracting primary teeth or placing temporary crowns. There is no single national answer to how independently a hygienist practices; it depends on the state\'s dental practice act.',
				],
			},
			{
				heading: 'Where the job happens, and on what schedule',
				body: [
					'BLS reports that dental hygienists held about 221,600 jobs in 2024, and the setting is heavily concentrated: 94% worked in offices of dentists, with offices of physicians and government employers (excluding state and local education and hospitals) each accounting for roughly 1 percentage point of the total, and the remaining categories BLS doesn\'t break out individually. Pay tracks that same split closely. BLS\'s May 2024 industry wage data puts the median at $94,570 in offices of dentists, $84,720 in offices of physicians, and $77,940 in government settings, figures this site\'s [dental hygienist salary guide](/dental-hygienist-salary/) covers in more detail alongside the full 10th-to-90th-percentile wage range.',
					'BLS also flags that many hygienists work part time, since dentists often hire a hygienist for only a few days a week rather than a full schedule, and it\'s common for one hygienist to split their time across more than one dental office. That matters for reading the pay figures above: BLS\'s OEWS wage survey, the same annual survey behind the median figures on this page, assumes a full-time, year-round schedule of 2,080 hours when it converts an hourly wage into an annual one, so a hygienist working three or four days a week should expect real annual earnings below the published median even if their hourly rate matches it.',
				],
				image: {
					src: '/images/dental-hygienist-duties.svg',
					alt: 'Diagram showing four things dental hygienists do per BLS: assess oral health and report to the dentist, clean teeth and apply preventive treatments, take dental x-rays, and educate patients on oral hygiene.',
				},
			},
			{
				heading: 'Job outlook: mostly replacement demand, not new positions',
				body: [
					'BLS projects employment of dental hygienists to grow 7% from 2024 to 2034, a rate it classifies as much faster than the average for all occupations, adding roughly 15,500 jobs to the current base of 221,600 over the decade. Separately, BLS projects about 15,300 openings for the occupation each year, on average, once the decade is averaged out, a larger number than the net growth figure because most of those yearly openings come from replacing hygienists who transfer to a different occupation or leave the labor force, such as to retire, rather than from newly created positions.',
					'A licensed, degree-gated field growing faster than average tends to keep demand for qualified hygienists high, since the supply of new hygienists is capped by how many people accredited programs can graduate and license each year rather than by how quickly an employer can hire and train someone. That said, BLS\'s growth projection describes the national labor market in aggregate; it is not a prediction about hiring conditions in any specific city, practice, or year, and a faster-than-average national growth rate does not guarantee an opening exists in a given hygienist\'s area at a given time.',
				],
			},
			{
				heading: 'The path: an associate\'s degree, then a state license',
				body: [
					'BLS states that dental hygienists typically need an associate\'s degree in dental hygiene, with programs usually taking 3 years to complete and combining classroom instruction with laboratory and clinical work. Coursework covers subjects such as anatomy, medical ethics, and periodontics, the study of gum disease. A bachelor\'s degree is also an option, and BLS notes it, along with a master\'s, is usually expected for hygienists who go into research, teaching, or clinical practice in public or school health programs, though master\'s programs in the field remain relatively uncommon. High school students considering the field are pointed toward biology, chemistry, and math coursework, since most dental hygiene programs also require applicants to complete college-level prerequisites before admission, with the specifics varying by school.',
					'Every state requires dental hygienists to be licensed, though the exact requirements vary by state. In most states, that means graduating from an accredited program and passing written and clinical licensing exams, with continuing education required afterward to keep the license active. BLS points readers with state-specific questions to their state\'s Board of Dental Examiners, or to CareerOneStop for a general overview of state licensing board requirements. Many employers separately require CPR certification on top of the state dental license.',
					'BLS reports a May 2024 median [dental assistant](/dental-assistant-salary/) wage of $47,300, essentially half the $94,260 hygienist median, and dental assistants can typically enter the occupation through a certificate program of about a year or through employer training alone, without the fixed multi-year, licensing-exam-gated path hygienists go through. BLS\'s data describes what each occupation pays; it does not break out how much of that roughly two-to-one gap traces to the added years of schooling and the licensing exam specifically versus other factors, such as scope of duties or supervision requirements, and this page reports the pattern rather than asserting a specific cause.',
				],
			},
		],
		faq: [
			{
				question: 'What does a dental hygienist do on a typical day?',
				answer: 'Per BLS, dental hygienists remove tartar, stains, and plaque from teeth; apply preventive treatments such as sealants and fluoride; take and develop dental x-rays; assess a patient\'s oral health and report findings to the supervising dentist; document care and treatment plans; and teach patients proper brushing and flossing technique.',
			},
			{
				question: 'How long does it take to become a dental hygienist?',
				answer: 'BLS states that dental hygienists typically need an associate\'s degree in dental hygiene, with programs usually taking 3 years to complete. Every state also requires passing written and clinical licensing exams after graduation before a hygienist can practice.',
			},
			{
				question: 'Do dental hygienists need a license?',
				answer: 'Yes. BLS states every state requires dental hygienists to be licensed, though the specific requirements vary by state. Most states require graduating from an accredited program and passing written and clinical exams, plus completing continuing education to keep the license active. BLS points readers to their state\'s Board of Dental Examiners or to CareerOneStop for state-specific details.',
			},
			{
				question: 'How much do dental hygienists make?',
				answer: 'BLS reports a median annual dental hygienist salary of $94,260 in May 2024 ($45.32 an hour). Pay varies by setting: offices of dentists paid the highest tracked median at $94,570, followed by offices of physicians at $84,720 and government employers at $77,940.',
			},
			{
				question: 'Can a dental hygienist work without a dentist present?',
				answer: 'It depends on the state. BLS states that the tasks a hygienist may perform, and how closely a dentist must supervise them, vary by state and by practice setting, and that a few states allow hygienists with extra training, sometimes called dental therapists, to provide limited restorative services. There is no single national scope-of-practice rule; it is set state by state.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Dental Hygienists (accessed 2026-08-24 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024, last modified August 28, 2025)', url: 'https://www.bls.gov/ooh/healthcare/dental-hygienists.htm' },
			{ label: 'BLS OEWS Frequently Asked Questions (confirms the 2,080-hour full-time, year-round assumption behind the annual wage conversion used across this page)', url: 'https://www.bls.gov/oes/oes_ques.htm' },
		],
		image: '/images/dental-hygienist-duties.svg',
		imageAlt: 'Diagram showing four things dental hygienists do per BLS: assess oral health and report to the dentist, clean teeth and apply preventive treatments, take dental x-rays, and educate patients on oral hygiene.',
	},
	{
		slug: 'what-does-an-insurance-underwriter-do',
		category: 'Career Guide',
		title: 'What Does an Insurance Underwriter Do? Duties, Pay, and Outlook',
		description: 'Insurance underwriters evaluate applications and decide whether to approve coverage. BLS also projects the role to shrink, not grow. Here is what the job involves.',
		published: '2026-08-24',
		updated: '2026-08-24',
		socCode: '13-2053',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, insurance underwriters evaluate insurance applications, weigh the risk of insuring an applicant with the help of automated underwriting software, and decide whether to approve coverage and at what premium. BLS reports a median annual salary of $79,880 in May 2024 for a role that typically requires a bachelor's degree and no state license. It's also one of the few occupations covered on this site where BLS projects employment to shrink rather than grow, down 3% from 2024 to 2034 as automated underwriting software takes on more of the decision-making underwriters used to do by hand.",
		sections: [
			{
				heading: 'What the job actually involves',
				body: [
					'Per BLS, "insurance underwriters evaluate insurance applications and decide whether to approve them." For approved applications, underwriters also determine the coverage amount and the premium the applicant will pay. BLS breaks the role down into a fuller list of tasks: analyzing the information stated on an application, determining the risk of insuring that particular applicant, screening applicants against set criteria, using automated software to help gauge risk, reviewing what that software recommends, contacting field representatives or medical personnel for additional information when needed, deciding whether to offer coverage, and setting the premium and coverage amount once a policy is approved.',
					'Software already does a lot of the first pass. Underwriters enter an applicant\'s details into a program that returns a recommendation on coverage and pricing, and for common, simple policies such as auto insurance, BLS says underwriters typically rely on that automated recommendation directly. For more complex or unusual coverage, such as workers\' compensation, BLS says underwriters lean more on their own analytical judgment; a previous bankruptcy on an application, for instance, might matter a great deal or barely at all depending on how long ago it happened and how the applicant\'s finances have changed since. Either way, BLS describes the underlying tension underwriters have to manage: approve too much risk and the insurer pays out too many claims, but reject too many applications and it doesn\'t collect enough in premiums to stay profitable.',
					'Most underwriters specialize in one of three broad fields, per BLS: health, life, or property and casualty insurance. The criteria differ by specialty even though the underlying job duties are similar. A life insurance underwriter weighs an applicant\'s age and financial history; a property and casualty underwriter evaluating an auto policy weighs the applicant\'s driving record instead. Within property and casualty specifically, BLS notes underwriters may further specialize by commercial versus personal insurance, or by the type of policy, such as homes, autos, or pets.',
				],
				image: {
					src: '/images/insurance-underwriter-duties.svg',
					alt: 'Diagram showing four things insurance underwriters do per BLS: analyze application information, assess risk using software, decide whether to approve coverage, and set premiums and coverage amounts.',
				},
			},
			{
				heading: 'Where underwriters work, and what they get paid',
				body: [
					'BLS reports insurance underwriters held about 127,000 jobs in 2024, almost all of it concentrated in insurance-adjacent industries. Direct insurers other than life, health, and medical carriers employed 52% of underwriters, insurance agencies and brokerages employed 25%, other insurance-related activities employed 5%, direct health and medical insurance carriers employed 4%, and credit intermediation employed 1%. Those five categories BLS breaks out by name account for 87% of the total; BLS doesn\'t itemize the remaining employers individually. Most underwriters work full time, in an office, and BLS doesn\'t flag any notable part-time pattern for the occupation the way it does for some other roles on this site.',
					'BLS reports a median annual wage of $79,880 in May 2024, or $38.40 an hour. The spread around that median is wide: the lowest-paid 10% of underwriters earned under $51,640, while the highest-paid 10% earned over $138,020, roughly a 2.7-to-1 gap between the bottom and top of the range. Pay by industry doesn\'t track employer size the way it does in some other occupations on this site. Credit intermediation, the industry employing the fewest underwriters at just 1%, paid the highest median at $90,000, while direct insurance carriers, the industry employing more than half of all underwriters, paid closer to the middle of the range at $79,350. Other insurance-related activities ($81,870) and direct health and medical insurance carriers ($81,240) both paid above the occupation-wide median as well, with insurance agencies and brokerages at $79,200 rounding out the tracked industries.',
				],
			},
			{
				heading: 'Job outlook: one of the rare BLS pages projecting a decline',
				body: [
					'Most occupations covered on this site show BLS projecting flat-to-positive job growth. Insurance underwriting is an exception. BLS projects employment of insurance underwriters to decline 3% from 2024 to 2034, a loss of about 3,300 positions off the current base of 127,000. BLS attributes the decline directly to automation: "automated underwriting software allows workers to process applications quickly, reducing the need for underwriters," and it expects that software to keep improving and see wider adoption across the insurance industry over the coming decade, which would reduce underwriter headcount further.',
					'Despite the shrinking headcount, BLS still projects about 8,200 openings for insurance underwriters each year, on average, over the decade. BLS is explicit about where those openings come from: every one of them is expected to result from replacing underwriters who transfer to a different occupation or leave the labor force entirely, such as to retire, rather than from newly created positions. That\'s a different growth story than an occupation like [actuary](/actuary-salary/) on this site, where BLS projects 22% growth, much faster than average, alongside its own set of replacement-driven openings.',
				],
			},
			{
				heading: 'The path in: a degree, but usually no license',
				body: [
					"BLS states most firms prefer to hire underwriters with a bachelor's degree, commonly in business, with coursework in finance, economics, and mathematics considered helpful. Candidates with only an associate's degree or a high school diploma sometimes qualify if they have relevant insurance work experience, though BLS frames that as an exception rather than the typical path. New hires typically work under a senior underwriter's supervision for up to 12 months, starting on basic applications and moving to more complex ones as they gain experience.",
					"Unlike some licensed occupations on this site, BLS does not describe a state licensing requirement for insurance underwriters. Certification isn't mandatory either, but BLS says employers may expect it, since coursework tied to certification helps underwriters keep up with new insurance products and changes in state and federal regulation. BLS points readers toward CareerOneStop for the range of available certification and specialty-designation options, noting that requirements vary and some credentials require a set number of years of experience before a candidate can pursue them. Advancement follows a similar pattern: experienced underwriters can move up to senior underwriter or underwriter manager, and BLS says certification may be needed to make that move.",
					"BLS's own similar-occupations table puts underwriters next to [actuaries](/what-does-an-actuary-do/), whose $125,770 median pay in May 2024 runs well above the $79,880 underwriter median. The gap tracks a difference in how each field gates entry. Actuaries go through a multi-year professional exam sequence administered by the Society of Actuaries or Casualty Actuarial Society before reaching full certification, a process BLS says can take up to seven years, while underwriters typically clear a bachelor's degree and an employer-run training period with no equivalent exam ladder. BLS's pay data doesn't break out exactly how much of that roughly $46,000 gap owes to the exam-based credentialing itself versus other factors, such as differences in specialization or industry, and this page reports the pay difference rather than asserting a specific cause.",
				],
			},
		],
		faq: [
			{
				question: 'What does an insurance underwriter do on a typical day?',
				answer: 'Per BLS, underwriters analyze the information on insurance applications, run applicant details through underwriting software to help gauge risk, review what that software recommends, and decide whether to approve the application. For approved applications, they also set the premium and coverage amount.',
			},
			{
				question: 'How much do insurance underwriters make?',
				answer: 'BLS reports a median annual insurance underwriter salary of $79,880 in May 2024 ($38.40 an hour). Pay varies widely: the bottom 10% earned under $51,640 and the top 10% earned over $138,020. By industry, credit intermediation paid the highest tracked median at $90,000, despite employing only 1% of underwriters.',
			},
			{
				question: 'Is insurance underwriting a growing field?',
				answer: "No. BLS projects employment of insurance underwriters to decline 3% from 2024 to 2034, a loss of about 3,300 positions, which it attributes to automated underwriting software reducing the need for human underwriters. BLS still projects about 8,200 openings a year on average, but all of them are expected to come from replacing underwriters who leave the occupation, not from newly created roles.",
			},
			{
				question: 'Do you need a license to become an insurance underwriter?',
				answer: "BLS does not describe a state licensing requirement for insurance underwriters, unlike some other occupations covered on this site. Most firms prefer a bachelor's degree, and certification, while not mandatory, is often expected by employers and can factor into advancement to senior underwriter or underwriter manager roles.",
			},
			{
				question: 'What is the difference between an insurance underwriter and an actuary?',
				answer: "Both evaluate insurance risk, but their roles differ. Underwriters apply that risk assessment to individual applications, deciding whether to approve coverage and at what price. Actuaries build the statistical models and pricing assumptions underwriters work from, typically after a multi-year professional exam sequence BLS says can take up to seven years to complete. BLS reports a May 2024 median pay of $125,770 for actuaries versus $79,880 for underwriters.",
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Insurance Underwriters (accessed 2026-08-24 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024, last modified August 28, 2025)', url: 'https://www.bls.gov/ooh/business-and-financial/insurance-underwriters.htm' },
		],
		image: '/images/insurance-underwriter-duties.svg',
		imageAlt: 'Diagram showing four things insurance underwriters do per BLS: analyze application information, assess risk using software, decide whether to approve coverage, and set premiums and coverage amounts.',
	},
	{
		slug: 'what-does-a-bookkeeper-do',
		category: 'Career Guide',
		title: 'What Does a Bookkeeper Do? Duties, Path, and BLS Pay Data',
		description: 'Bookkeepers post transactions and reconcile accounts, but software has automated much of the work. BLS projects a 6% employment decline and $49,210 median pay.',
		published: '2026-08-24',
		updated: '2026-08-24',
		socCode: '43-3031',
		coreSummary: 'Per the U.S. Bureau of Labor Statistics, bookkeeping, accounting, and auditing clerks compute, classify, and record data to help organizations keep complete and accurate financial records, using bookkeeping software to post transactions, reconcile accounts, and produce reports such as balance sheets and income statements. BLS reports a median annual wage of $49,210 in May 2024, and the role typically requires only some college coursework rather than a degree. It is also one of just two occupations covered on this site where BLS projects employment to shrink rather than grow: bookkeeper employment is projected to decline 6% from 2024 to 2034, a loss BLS attributes directly to accounting software automating tasks the role used to require by hand.',
		sections: [
			{
				heading: 'What bookkeepers actually do, per BLS',
				body: [
					'Per BLS, bookkeeping, accounting, and auditing clerks "compute, classify, and record data to help organizations keep complete and accurate financial records." BLS lists a specific set of tasks under that description: using bookkeeping software, spreadsheets, and databases; entering financial transactions into the appropriate software; receiving and recording cash, checks, and vouchers; entering costs and income into the books; producing reports such as balance sheets, income statements, and totals by account; checking figures, postings, and reports for accuracy; and reconciling records, noting and reporting any differences they find.',
					'BLS covers three related titles under this one occupation, and it distinguishes them by scope rather than by employer. Bookkeeping clerks handle the full financial record for small and medium-size businesses. Accounting clerks tend to work for larger organizations and specialize in one area, such as accounts payable, accounts receivable, or payroll. Auditing clerks check the figures other financial workers have already produced, verifying calculations and correcting entries. All three fall under the same SOC code, 43-3031, and BLS does not break out separate wage figures for the three titles the way it does for some other combined-title occupations this site tracks.',
				],
				image: {
					src: '/images/bookkeeper-duties.svg',
					alt: 'Diagram showing four things bookkeepers do per BLS: post transactions into software, reconcile accounts against bank and account totals, produce reports such as balance sheets, and verify figures for accuracy.',
				},
			},
			{
				heading: 'Software is shrinking the field, and BLS says so directly',
				body: [
					'BLS projects bookkeeper employment to decline 6% from 2024 to 2034, a loss of about 94,300 positions from a 2024 base of 1,613,400. That is a steeper drop than any other decline this site has found on a BLS occupational page so far. BLS states the cause plainly rather than leaving it to inference: "Software innovations have automated many of the tasks performed by bookkeeping, accounting, and auditing clerks. As a result, the same amount of work can be done with fewer employees."',
					"Despite the shrinking headcount, BLS still projects about 170,000 openings a year on average over the decade, a number that runs well above the roughly 94,300 total jobs projected to disappear. BLS attributes nearly all of that gap to replacement demand: with more than 1.6 million people currently working in the occupation, most annual openings come from workers who transfer to a different occupation or leave the labor force entirely, such as to retire, not from newly created positions. A shrinking occupation and a large number of yearly openings aren't a contradiction in BLS's data; they describe two different things, the size of the workforce and the churn within it.",
					"Bookkeepers aren't alone in this pattern among the occupations this site covers. [Insurance underwriters](/what-does-an-insurance-underwriter-do/) are the only other occupation here with a projected employment decline, down 3% over the same decade, and BLS attributes that drop to the same underlying force: automated underwriting software reducing the need for people to do the work by hand. The bookkeeper decline is twice as steep, which tracks with how much more of the underlying work, routine data entry and reconciliation, is the kind of task accounting software already handles well.",
				],
			},
			{
				heading: 'Pay: no degree required, and a wide gap from the roles above it',
				body: [
					'BLS reports a median annual wage of $49,210 for bookkeeping, accounting, and auditing clerks in May 2024, or $23.66 an hour, below the $49,500 median across all occupations that year. The bottom 10% earned less than $34,600, and the top 10% earned more than $72,660, a range of roughly $38,000 between the two boundary figures BLS publishes. Unlike several other occupations this site tracks, entry does not require a bachelor\'s degree. BLS classifies the entry-level education as "some college, no degree," and describes employers as generally preferring candidates with a high school diploma who have also completed college coursework in a related subject, such as accounting, with most of the actual skill built through on-the-job training rather than a degree program.',
					"By industry, BLS's May 2024 wage table shows construction paying the highest median for the occupation at $51,670, followed by professional, scientific, and technical services at $50,180, then healthcare and social assistance tied with wholesale trade at $48,810, and retail trade at $45,030, the lowest of the five industries BLS tracks. That ranking does not line up with where most bookkeepers actually work: professional, scientific, and technical services employs the largest share of the occupation at 13%, even though it pays the second-highest of the five tracked industries, while construction employs a smaller 8% share despite paying the most. BLS does not explain the mismatch between where bookkeepers are concentrated and where the job pays best; this page reports the pattern rather than asserting a specific cause.",
					"Against other BLS-tracked occupations this site covers in the same broad field, the bookkeeper median sits well below [accountants and auditors](/how-to-become-an-accountant/) at $81,680, an occupation that typically requires a bachelor's degree, and further still below the $161,700 median BLS reports for [financial managers](/what-does-a-controller-do/), the group that covers controllers and typically requires a bachelor's degree plus years of related experience. Each step up that ladder pairs a longer, more credentialed entry path with a meaningfully higher median wage, though BLS's data describes the pay gap without attributing a specific share of it to credentials alone versus other factors, such as scope of responsibility or industry.",
				],
			},
		],
		faq: [
			{
				question: 'What does a bookkeeper do on a typical day?',
				answer: 'Per BLS, bookkeepers use bookkeeping software, spreadsheets, and databases to enter financial transactions, record cash, checks, and vouchers, and post costs and income into the books. They also produce reports such as balance sheets and income statements, check figures and postings for accuracy, and reconcile records, noting and reporting any differences they find.',
			},
			{
				question: 'How much do bookkeepers make?',
				answer: 'BLS reports a median annual wage of $49,210 for bookkeeping, accounting, and auditing clerks in May 2024 ($23.66 an hour). Pay ranges from under $34,600 for the bottom 10% to over $72,660 for the top 10%. By industry, construction pays the highest tracked median at $51,670, while retail trade pays the lowest at $45,030.',
			},
			{
				question: 'Is bookkeeping a growing career?',
				answer: 'No. BLS projects bookkeeper employment to decline 6% from 2024 to 2034, a loss of about 94,300 positions, which it attributes to accounting software automating tasks the role used to require by hand. BLS still projects about 170,000 openings a year on average, almost all from replacing workers who transfer to other occupations or leave the labor force rather than from newly created positions.',
			},
			{
				question: 'Do you need a degree to become a bookkeeper?',
				answer: 'No. BLS classifies the entry-level education for the occupation as some college, no degree. Employers generally prefer candidates with a high school diploma who have completed college coursework in a related subject, such as accounting, with most of the job-specific skill built through on-the-job training rather than a formal degree program.',
			},
			{
				question: "What's the difference between a bookkeeper and an accountant?",
				answer: "BLS tracks them as separate occupations with different entry requirements and pay. Bookkeepers typically need some college coursework but no degree, and BLS reports a $49,210 median wage. Accountants typically need a bachelor's degree and BLS reports an $81,680 median, a gap of more than $32,000. BLS describes bookkeepers as recording and organizing financial data, while accountants additionally examine financial statements for compliance, compute taxes, and inspect accounting systems for fraud risk.",
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Bookkeeping, Accounting, and Auditing Clerks (accessed 2026-08-24 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024, last modified August 28, 2025)', url: 'https://www.bls.gov/ooh/office-and-administrative-support/bookkeeping-accounting-and-auditing-clerks.htm' },
			{ label: 'O*NET OnLine: 43-3031.00 Bookkeeping, Accounting, and Auditing Clerks (independent corroboration of the SOC code and occupation title)', url: 'https://www.onetonline.org/link/details/43-3031.00' },
		],
		image: '/images/bookkeeper-duties.svg',
		imageAlt: 'Diagram showing four things bookkeepers do per BLS: post transactions into software, reconcile accounts against bank and account totals, produce reports such as balance sheets, and verify figures for accuracy.',
	},
	{
		slug: 'what-does-a-ceo-do',
		category: 'Career Guide',
		title: 'What Does a CEO Do? Duties, Pay, and Job Outlook (BLS Data)',
		description: 'Chief executives set strategy and report to the board. BLS puts median CEO pay at $206,420, second-highest on this site, with 4% projected job growth.',
		published: '2026-08-25',
		updated: '2026-08-25',
		socCode: '11-1011',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, chief executive officers provide overall direction for companies and organizations, formulating and implementing policy, directing the work of other top executives, and typically reporting to a board of directors. BLS tracks chief executives under SOC code 11-1011 and reports a median annual wage of $206,420 in May 2024, the second-highest median of any occupation on this site, behind only nurse anesthetists. BLS projects the occupation to grow 4% from 2024 to 2034, about as fast as the average for all occupations, adding roughly 13,300 positions to a 2024 base of 309,400.",
		sections: [
			{
				heading: 'What CEOs actually do, per BLS',
				body: [
					'Per BLS, top executives, the broader category that includes chief executives, "typically do the following": establish and carry out organizational goals, policies, and procedures; direct and oversee an organization\'s financial and budgetary activities; manage the general activities related to producing goods or providing services; consult with other executives, staff, and board members about operations; negotiate or approve contracts and agreements; appoint department heads and managers; analyze financial statements, sales reports, and other performance indicators; and identify places to cut costs or improve performance. BLS specifically describes chief executive officers, also known by titles such as executive director, managing director, or president, as providing "overall direction for companies and organizations," managing operations, and typically reporting to a board of directors.',
					"BLS's coverage of chief executives is broader than the corporate sense of \"CEO.\" The same occupation code covers mayors, city managers, county administrators, and governors, all of whom BLS classifies as chief executives of governments, along with school superintendents and college or university presidents, who serve as chief executives of school districts and postsecondary institutions. Mayors and governors reach the role through election rather than promotion, a meaningfully different path from a corporate chief executive's typical route. BLS distinguishes chief executives from other C-suite titles, such as chief operating officers, chief financial officers, or chief human resources officers, who manage one specific part of an organization rather than the whole of it.",
					"How much of this work a chief executive personally handles depends heavily on the size of the organization. In a small business, an owner or manager acting as chief executive is often also responsible for hiring, training, quality control, and day-to-day supervision directly. In a large corporation, the chief executive typically focuses on formulating policy and setting strategy, while general and operations managers, a separate BLS occupation that shares the same \"Top Executives\" page, direct day-to-day operations instead.",
				],
				image: {
					src: '/images/ceo-duties.svg',
					alt: 'Diagram showing four things CEOs do per BLS: set organizational strategy and policy, direct financial and budgetary activities, report to and consult with the board, and appoint department heads and other managers.',
				},
			},
			{
				heading: 'Pay: $206,420 median, second-highest on this site',
				body: [
					"BLS reports a median annual wage of $206,420 for chief executives in May 2024, or $99.24 an hour under BLS's convention of assuming a full-time, 2,080-hour work year. The lowest-paid 10% of chief executives earned less than $73,710, while the highest-paid 10% earned more than $239,200. That $239,200 figure is a data ceiling, not a coincidence: BLS's wage survey top-codes annual estimates at that same amount across occupations, so it also appears as the reported 90th percentile for [financial managers](/what-does-a-controller-do/) on this site. The true top of the CEO pay range runs higher than $239,200; BLS's public wage tables simply stop reporting a more precise figure past that point.",
					'By industry, BLS reports the highest median pay for chief executives at organizations classified under management of companies and enterprises, at the same $239,200 top-coded ceiling, followed by professional, scientific, and technical services at $208,870, healthcare and social assistance at $194,360, and government, excluding state and local education and hospitals, at $137,310. Chief executives rank second among the occupations this site has covered so far, behind only [CRNAs](/crna-salary/) at $223,210 and well above the $161,700 median BLS reports for financial managers, the group that includes controllers.',
					"BLS also notes that salary is not the full compensation picture for corporate chief executives. In addition to base pay, total compensation often includes stock options and other performance bonuses, along with benefits such as expense allowances, use of company-owned aircraft and cars, and membership to exclusive clubs. BLS specifically flags that nonprofit and government executives usually receive fewer of these additional benefits than their corporate counterparts.",
				],
			},
			{
				heading: 'Job outlook: headcount is projected to grow, not just replace departures',
				body: [
					'BLS projects employment of chief executives to grow 4% from 2024 to 2034, close to the roughly 3% average projected across all occupations, and a departure from the pattern on two other occupations this site tracks. [Bookkeepers](/what-does-a-bookkeeper-do/) and [insurance underwriters](/what-does-an-insurance-underwriter-do/) are both projected to shrink over the same decade; chief executive headcount is projected to grow instead, from about 309,400 in 2024 to about 322,700 in 2034, an increase of roughly 13,300 positions.',
					"BLS also publishes an annual-openings estimate of about 331,000 for the combined \"Top Executives\" category, but that figure covers chief executives and general and operations managers together rather than chief executives alone. General and operations managers make up the much larger share of that combined group, holding about 3.7 million jobs in 2024 against roughly 309,400 for chief executives specifically, so most of the combined 331,000 annual openings likely land in the larger occupation. BLS does not publish a chief-executive-specific annual-openings number the way it does for employment, pay, and the growth rate, so this page reports the combined figure with that caveat rather than attributing all of it to chief executives.",
					'Among employers of chief executives specifically, BLS reports the largest share, 26%, as self-employed workers, ahead of professional, scientific, and technical services at 13%, government excluding state and local education and hospitals at 9%, healthcare and social assistance at 6%, and management of companies and enterprises at 5%. Those five categories BLS names individually account for 59% of chief executives; BLS does not itemize the remaining 41% by industry. The large self-employed share reflects how broadly BLS defines the occupation: it counts the owner-operator of a small business alongside the chief executive of a large public corporation.',
				],
			},
			{
				heading: 'How people reach the role, per BLS',
				body: [
					"BLS lists a bachelor's degree as the typical entry-level education for the page's combined Top Executives category, which covers chief executives together with general and operations managers; unlike pay and employment, BLS does not break the entry-education figure out separately for chief executives alone. Within that combined guidance, BLS notes the degree is most often in a field related to the organization's line of work, such as business or engineering, that chief executives of large corporations often instead hold a master's degree in business administration, and that public-sector executives may have a degree in business administration, public administration, law, or the liberal arts. College presidents and school superintendents typically need a master's degree, and a doctorate is often preferred for those roles.",
					"On top of formal education, BLS says chief executives typically need extensive managerial experience, and specifically notes that experience is expected to be in the organization's area of specialty, rather than general management experience from an unrelated field. Many chief executives are promoted from within their own organization, moving up from lower-level management or supervisory roles, though some employers hire from outside instead. BLS also gives a specific licensing example: some employers require their chief executive officer to hold a Certified Public Accountant credential, though this depends on the individual employer rather than being a universal requirement BLS applies to the whole occupation.",
					"The paths BLS groups under this one occupation code vary widely by sector. A corporate chief executive typically advances through internal promotion or an external hire process. A mayor or governor reaches the equivalent chief-executive role through winning an election instead. BLS's data combines all of these paths into one set of pay, employment, and outlook figures, so the wage and growth numbers above describe the occupation as a whole rather than any single one of these routes into it.",
				],
			},
		],
		faq: [
			{
				question: 'What does a CEO do on a typical day?',
				answer: 'Per BLS, chief executives establish organizational goals and policies, direct financial and budgetary activities, consult with other executives and board members, negotiate or approve contracts, appoint department heads and managers, and review financial statements and performance indicators to identify where to cut costs or improve results. How much of this a CEO handles personally depends on the size of the organization.',
			},
			{
				question: 'How much do CEOs make?',
				answer: "BLS reports a median annual wage of $206,420 for chief executives in May 2024 ($99.24 an hour). The bottom 10% earned less than $73,710, and the top 10% earned more than $239,200, which is a top-coded ceiling in BLS's data rather than the true maximum. By industry, management of companies and enterprises and professional, scientific, and technical services report the highest medians.",
			},
			{
				question: 'Is CEO a growing career?',
				answer: 'Yes. BLS projects chief executive employment to grow 4% from 2024 to 2034, about as fast as the roughly 3% average across all occupations, adding an estimated 13,300 positions to a 2024 base of 309,400. That is a different trend from two other occupations this site tracks, bookkeepers and insurance underwriters, both of which BLS projects to shrink over the same period.',
			},
			{
				question: 'Do you need an MBA to become a CEO?',
				answer: "Not according to BLS's baseline requirement. BLS lists a bachelor's degree as the typical entry-level education for its combined Top Executives category (chief executives and general and operations managers together; BLS does not break this figure out for chief executives alone), and notes that chief executives of large corporations often additionally hold a master's degree in business administration. BLS also says chief executives typically need extensive managerial experience in the organization's specific area of specialty, on top of whatever degree they hold.",
			},
			{
				question: "What's the difference between a CEO and a COO or CFO?",
				answer: 'BLS classifies all three as top executives, but chief executive officers provide overall direction for the entire organization and typically report to a board of directors, while chief operating officers, chief financial officers, and similar titles manage one specific part of the organization, such as day-to-day operations or finance, rather than the whole of it.',
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Top Executives (accessed 2026-08-25 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024, last modified August 28, 2025)', url: 'https://www.bls.gov/ooh/management/top-executives.htm' },
			{ label: 'O*NET OnLine: 11-1011.00 Chief Executives (independent corroboration of the SOC code and occupation title)', url: 'https://www.onetonline.org/link/summary/11-1011.00' },
		],
		image: '/images/ceo-duties.svg',
		imageAlt: 'Diagram showing four things CEOs do per BLS: set organizational strategy and policy, direct financial and budgetary activities, report to and consult with the board, and appoint department heads and other managers.',
	},
	{
		slug: 'what-does-a-welder-do',
		category: 'Career Guide',
		title: 'What Does a Welder Do? Duties, Safety, and BLS Pay Data',
		description: "Welders read blueprints, then join or cut metal by hand under intense heat and light. BLS's median pay for the role is $51,000, with real burn and injury risk.",
		published: '2026-08-25',
		updated: '2026-08-25',
		socCode: '51-4121',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, welders, cutters, solderers, and brazers use hand-held or remotely controlled equipment to join, repair, or cut metal parts, reading blueprints, measuring dimensions, and monitoring heat as they work. BLS tracks the four roles under one SOC code, 51-4121, and reports a median annual wage of $51,000 in May 2024. The work carries real physical risk: BLS specifically flags fumes, very hot materials, and intense arc light among the job's hazards, and most workers need only a high school diploma plus technical and on-the-job training to enter.",
		sections: [
			{
				heading: 'What welders actually do, per BLS',
				body: [
					'Per BLS, welders, cutters, solderers, and brazers "typically do the following": read and interpret blueprints, sketches, and specifications; calculate and measure the dimensions of parts to be welded; inspect structures or materials to be welded; weld materials according to blueprint specifications; monitor the welding process and adjust heat as necessary; and maintain equipment and machinery. BLS describes the core of the work as using hand-held or remotely controlled equipment to join or cut metal parts, and notes workers in this occupation also fill holes, indentations, or seams in metal products.',
					"Some workers specialize in a single technique; others perform several. BLS also notes that welders usually choose which process to use based on a number of factors, such as the types of metals being joined, which means the same worker's daily tasks can shift from job to job even within one specialty.",
				],
				image: {
					src: '/images/welder-duties.svg',
					alt: 'Diagram showing four things welders do per BLS: read blueprints and specifications, measure and inspect materials, weld or cut according to spec while monitoring heat, and maintain their equipment.',
				},
			},
			{
				heading: 'Four roles, one SOC code: how the techniques differ',
				body: [
					'BLS groups four distinct job titles under the same 51-4121 classification, and distinguishes them by technique rather than by pay. Welders join metals using processes such as arc welding, in which machinery produces an electrical current that generates heat to bond pieces together. Cutters use heat from an electric arc, a stream of ionized gas called plasma, or burning gases to cut and trim metal objects to specific dimensions, a role that also covers dismantling large structures such as ships, railroad cars, and buildings.',
					"Solderers and brazers both heat molten filler metal to join two or more metal objects, but the two differ by temperature and application. Soldering uses a lower melting temperature and is common on small, precisely positioned pieces, such as computer chips. Brazing connects dissimilar metals through a filler material, which BLS says creates strong joints in products built from multiple metal types, and brazers may also apply protective coatings to parts to reduce wear and guard against corrosion. BLS does not publish separate wage data for any of the four titles individually; the $51,000 median below covers all four combined.",
				],
			},
			{
				heading: 'Where and how they work: heat, heights, and hazards',
				body: [
					'BLS describes welders and cutters as wearing protective clothing and welding helmets for safety, a detail it flags directly on the occupational summary rather than burying in a footnote. Work may happen outdoors in all types of weather or indoors, sometimes in a confined area designed to contain sparks and glare, and some jobs require working on a scaffold or platform high off the ground. BLS also notes workers may need to lift heavy objects and work in awkward positions, including overhead, while bending, stooping, or standing.',
					'Under a section BLS titles "Injuries and Illnesses," the agency states plainly that welders, cutters, solderers, and brazers risk injury on the job, citing exposure to fumes, very hot materials, and the intense light created by the arc as specific hazards. BLS says workers avoid injuries by following safety procedures and using personal protective equipment, including welding helmets, hearing protection, and heat-resistant gloves. Separately, [this site\'s welder salary guide](/welder-salary/) reports that OSHA requires welders to complete training on electrical safety specifically, on top of whatever general safety procedures an individual employer follows.',
					'Most welders, cutters, solderers, and brazers work full time, and some work more than 40 hours a week, per BLS. Many manufacturing firms run two or three shifts a day, each 8 to 12 hours, to keep production going around the clock, which means evening and weekend work is common in this occupation even outside of overtime.',
				],
			},
			{
				heading: 'Pay and outlook at a glance',
				body: [
					"BLS reports a median annual wage of $51,000 for welders, cutters, solderers, and brazers in May 2024 ($24.52 an hour), with the bottom 10% earning less than $38,130 and the top 10% earning more than $75,850. Manufacturing employs the largest share of the occupation at 61%, though it pays the lowest of the three industry medians BLS tracks, behind specialty trade contractors and repair and maintenance. BLS projects 2% employment growth from 2024 to 2034, slower than the roughly 3% average across all occupations, though about 45,600 openings are still projected each year, mostly from workers leaving the occupation rather than newly created positions. For [the full percentile breakdown](/welder-salary/), covering the industry pay table and an entry-path comparison against other no-degree trades such as [electricians](/electrician-salary/) and [plumbers, pipefitters, and steamfitters](/plumbing-apprenticeship/), see this site's welder pay page.",
					'Per BLS, welders typically need only a high school diploma or equivalent, combined with technical and on-the-job training, to enter the occupation, with no postsecondary degree required. That distinguishes the entry path from several other skilled trades this site tracks, which more often run through a multi-year formal apprenticeship before a worker reaches full pay.',
				],
			},
		],
		faq: [
			{
				question: 'What does a welder do on a typical day?',
				answer: 'Per BLS, welders read blueprints and specifications, measure and inspect the materials to be joined, weld according to spec while monitoring and adjusting heat, and maintain their equipment. The specific technique used, such as arc welding, is usually chosen based on factors like the types of metals involved.',
			},
			{
				question: "What's the difference between a welder, cutter, solderer, and brazer?",
				answer: 'BLS groups all four under one SOC code but distinguishes them by technique. Welders bond metal using processes such as arc welding. Cutters use heat from an electric arc, plasma, or burning gases to cut and trim metal, including dismantling large structures. Solderers and brazers both heat molten filler metal to join objects; soldering uses a lower temperature for small, precise work, while brazing joins dissimilar metals and can add protective coatings.',
			},
			{
				question: 'Is welding a dangerous job?',
				answer: 'BLS states directly that welders, cutters, solderers, and brazers risk injury on the job, citing fumes, very hot materials, and intense arc light as specific hazards. Workers reduce that risk by following safety procedures and using personal protective equipment such as welding helmets, hearing protection, and heat-resistant gloves. Some jobs also involve working on a scaffold or platform, lifting heavy objects, or working in awkward positions.',
			},
			{
				question: 'How much do welders make?',
				answer: "BLS reports a median annual wage of $51,000 for welders, cutters, solderers, and brazers in May 2024 ($24.52 an hour), with pay ranging from under $38,130 at the 10th percentile to over $75,850 at the 90th. This site's welder salary guide breaks out the full percentile and industry pay data.",
			},
			{
				question: 'Do welders work regular hours?',
				answer: "Most work full time, and some work more than 40 hours a week, per BLS. Many manufacturing firms run two or three 8- to 12-hour shifts a day to keep production continuous, so evening and weekend work is common even outside of scheduled overtime.",
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Welders, Cutters, Solderers, and Brazers (accessed 2026-08-25 via direct fetch with a UA string carrying a declared contact URL, returned 200 on retry after an initial TLS handshake failure, data from May 2024, last modified August 28, 2025)', url: 'https://www.bls.gov/ooh/production/welders-cutters-solderers-and-brazers.htm' },
			{ label: 'O*NET OnLine: 51-4121.00 Welders, Cutters, Solderers, and Brazers (independent corroboration of the SOC code and occupation title)', url: 'https://www.onetonline.org/link/summary/51-4121.00' },
		],
		image: '/images/welder-duties.svg',
		imageAlt: 'Diagram showing four things welders do per BLS: read blueprints and specifications, measure and inspect materials, weld or cut according to spec while monitoring heat, and maintain their equipment.',
	},
	{
		slug: 'how-to-become-a-flight-attendant',
		category: 'How to Become',
		title: 'How to Become a Flight Attendant: Training & FAA Certification',
		description: "BLS says flight attendants need a high school diploma, service experience, and FAA-required training. Median pay is $67,130 a year, per BLS data.",
		published: '2026-08-25',
		updated: '2026-08-25',
		socCode: '53-2031',
		coreSummary: "Per the Bureau of Labor Statistics, flight attendants typically need a high school diploma or the equivalent, one to two years of prior customer-service experience, and several weeks to a few months of employer-provided training before they can work. That training exists to meet a federal requirement: the FAA's Certificate of Demonstrated Proficiency, mandatory under 14 CFR parts 121 and 135 for anyone working aircraft with 20 or more passenger seats. BLS reports a median annual wage of $67,130 in May 2024, with 9% employment growth projected through 2034.",
		sections: [
			{
				heading: 'Eligibility: what airlines screen for before training even starts',
				body: [
					"Per BLS, a high school diploma or the equivalent is the typical entry-level education for flight attendants, though some airlines prefer applicants with college coursework or a degree. BLS also lists one to two years of work experience in a service occupation as typical groundwork, usually from restaurants, hotels, resorts, or sales roles that involve close, sustained contact with the public.",
					"Beyond education and experience, BLS describes a distinct set of airline screening requirements: applicants typically must meet a minimum age, usually 18 or 21 depending on the airline; be eligible to work in the United States; hold a valid passport; and pass a background check, a drug test, and a medical evaluation. BLS also notes that vision correctable to at least 20/40 is typical, that airlines often set their own height requirements, and that flights on international routes may call for fluency in a foreign language. These screening items are the airline's own hiring bar, separate from the FAA certification that comes later, once training starts.",
				],
				image: {
					src: '/images/flight-attendant-path.svg',
					alt: 'Diagram showing the path to becoming a flight attendant: meet eligibility requirements, get hired by an airline, complete several weeks to a few months of initial training, earn the FAA Certificate of Demonstrated Proficiency, then work as a flight attendant earning a median of $67,130 a year per BLS.',
				},
			},
			{
				heading: 'Training: what happens once an airline hires you',
				body: [
					'Per BLS, initial training after hire typically lasts several weeks to a few months and takes place at the airline\'s own flight training center. Trainees learn emergency procedures such as evacuating an aircraft, operating emergency equipment, and administering first aid, alongside instruction on flight regulations, company operations, and day-to-day job duties. Training ends with practice flights, and BLS is explicit that completing the program is required to keep the job, not merely to start it.',
					"The federal certification requirement gets fulfilled during this training, not before it. A flight attendant cannot walk in already FAA-certified; the certificate is issued only after an airline's training program and its own exam are completed.",
				],
			},
			{
				heading: "The FAA requirement behind the training, verified independently of BLS",
				body: [
					'BLS states that flight attendants "must be certified by the Federal Aviation Administration (FAA)," but does not spell out the legal basis or the exact aircraft threshold. Checking the FAA\'s own published guidance fills that in: under 14 CFR parts 121 and 135, no one may serve as a flight attendant aboard an aircraft with 20 or more passenger seats without holding a Certificate of Demonstrated Proficiency issued by the FAA. Congress created this requirement in 2003 under the Vision 100-Century of Aviation Reauthorization Act, and it took effect for flight attendants on December 11, 2004.',
					"In practice, the airline's director of operations submits proof that a flight attendant completed an FAA-approved training program through the agency's Flight Attendant Certification System, and the FAA mails a wallet-sized certificate within 10 to 14 days. Per BLS, certification is specific to aircraft type, so a flight attendant who switches to a different plane needs additional training for that type, and every certified flight attendant completes recurrent training each year to keep the certificate current.",
				],
			},
			{
				heading: 'Pay and advancement once the certification is in hand',
				body: [
					"BLS reports a median annual wage of $67,130 for flight attendants in May 2024, but that single figure hides an unusually wide range driven mainly by airline seniority systems. [This site's flight attendant salary guide](/how-much-do-flight-attendants-make/) breaks out the full 10th-to-90th percentile spread and the pay gap between charter and scheduled airlines in detail.",
					'BLS describes advancement as seniority-based rather than tied to additional certification: on international flights, senior flight attendants frequently oversee the work of newer colleagues, and some are promoted into management roles handling recruiting, instructing, or scheduling. BLS projects 9% employment growth for the occupation from 2024 to 2034, much faster than the roughly 3% average across all occupations, with about 19,800 openings projected each year, most from the need to replace workers who transfer out or leave the labor force.',
				],
			},
		],
		faq: [
			{
				question: 'How long does it take to become a flight attendant?',
				answer: "There's no fixed timeline BLS publishes, but the sequence is: meet an airline's eligibility screening (education, experience, background check), get hired, then complete several weeks to a few months of employer-provided initial training before earning the FAA Certificate of Demonstrated Proficiency required to work.",
			},
			{
				question: 'Do you need a college degree to be a flight attendant?',
				answer: 'No. Per BLS, a high school diploma or the equivalent is the typical entry-level education, though some airlines prefer applicants with college coursework or a degree, and international routes may require foreign-language fluency.',
			},
			{
				question: 'What is the minimum age to become a flight attendant?',
				answer: 'Per BLS, airlines typically set a minimum age of 18 or 21, though the exact requirement varies by airline.',
			},
			{
				question: 'Is FAA certification required to be a flight attendant?',
				answer: "Yes, for most commercial flights. Under 14 CFR parts 121 and 135, anyone working as a flight attendant on an aircraft with 20 or more passenger seats must hold an FAA Certificate of Demonstrated Proficiency, a requirement that took effect December 11, 2004 under the Vision 100-Century of Aviation Reauthorization Act. The certificate is issued only after completing an airline's own FAA-approved training program.",
			},
			{
				question: 'How much do flight attendants make?',
				answer: "BLS reports a median annual wage of $67,130 in May 2024, with pay ranging from under $34,030 at the 10th percentile to over $138,040 at the 90th, driven largely by seniority. See [flight attendant salary](/how-much-do-flight-attendants-make/) for the full percentile and industry breakdown.",
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Flight Attendants, How to Become One (accessed 2026-08-25 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024, last modified August 28, 2025)', url: 'https://www.bls.gov/ooh/transportation-and-material-moving/flight-attendants.htm' },
			{ label: 'Federal Aviation Administration: Flight Attendant Certificate of Demonstrated Proficiency (independent corroboration of the certification requirement, its legal basis, and effective date)', url: 'https://www.faa.gov/Flight_Attendant_Certificate_Demonstrated_Proficiency_Information' },
			{ label: 'O*NET OnLine: 53-2031.00 Flight Attendants (independent corroboration of the SOC code and occupation title)', url: 'https://www.onetonline.org/link/summary/53-2031.00' },
		],
		image: '/images/flight-attendant-path.svg',
		imageAlt: 'Diagram showing the path to becoming a flight attendant: meet eligibility requirements, get hired by an airline, complete several weeks to a few months of initial training, earn the FAA Certificate of Demonstrated Proficiency, then work as a flight attendant earning a median of $67,130 a year per BLS.',
	},
	{
		slug: 'what-does-a-nurse-practitioner-do',
		category: 'Career Guide',
		title: 'What Does a Nurse Practitioner Do? Duties, Setting, and Pay',
		description: 'Nurse practitioners assess, diagnose, and treat patients, and in most states can prescribe independently. Here is what the BLS says the job actually covers.',
		published: '2026-08-26',
		updated: '2026-08-26',
		socCode: '29-1171',
		coreSummary: "Per the U.S. Bureau of Labor Statistics, nurse practitioners (SOC 29-1171) are advanced practice registered nurses who take patient histories, perform physical exams, order and interpret diagnostic tests, diagnose health problems, and prescribe medication, typically focused on a specific patient population such as adult-gerontology, pediatric, or psychiatric-mental health care. BLS groups nurse practitioners with nurse anesthetists and nurse midwives on a single occupational profile page and reports a nurse-practitioner-specific median annual wage of $129,210 in May 2024, with 40% employment growth projected through 2034.",
		sections: [
			{
				heading: 'The core of the job',
				body: [
					"BLS tracks nurse practitioners on a combined occupational profile page shared with nurse anesthetists and nurse midwives, grouping all three together as advanced practice registered nurses (APRNs). Per BLS, APRNs typically take and record patients' medical histories and symptoms, perform physical exams, create or contribute to patient care plans, order and perform diagnostic tests, operate and monitor medical equipment, diagnose health problems, analyze test results and adjust treatment plans as needed, give patients medicines and treatments, evaluate how a patient responds to that treatment, consult with physicians and other healthcare professionals as needed, counsel and teach patients and their families, and, for some, conduct research.",
					"Within that shared duty list, BLS describes nurse practitioners specifically as serving \"as primary and specialty care providers, delivering advanced nursing services to patients and their families.\" NPs assess patients, decide how to improve or manage a patient's health, and work with patients on integrating health-promotion strategies into daily life. Per BLS, nurse practitioners typically focus on a specific patient population, such as adult and geriatric health, pediatric health, or psychiatric and mental health, a specialization that shapes which patients and conditions an individual NP actually sees day to day.",
					"BLS also draws a specific line between this role and registered nursing: nurse practitioners share some duties with RNs, including gathering information about a patient's condition and taking action to manage it, but are trained for tasks RNs are not, including ordering and evaluating test results, referring patients to specialists, and diagnosing and treating health problems.",
					"How much of this an individual nurse practitioner can do without a supervising or collaborating physician depends entirely on the state where they practice. BLS notes broadly that scope of practice for this occupational group varies from state to state; this site's [nurse practitioner salary guide](/nurse-practitioner-salary/) covers the state-by-state practice-authority rules in more depth and where to check a specific state's current status.",
				],
				image: {
					src: '/images/nurse-practitioner-duties.svg',
					alt: "Diagram showing four core nurse practitioner duties: assessing patients (history, exam, tests), diagnosing health problems, treating with medication and care plans, and counseling patients while consulting with physicians.",
				},
			},
			{
				heading: 'Where nurse practitioners work, and what the schedule looks like',
				body: [
					"BLS reports employer data for the combined group of nurse anesthetists, nurse midwives, and nurse practitioners rather than for nurse practitioners alone: offices of physicians employed the largest share at 46%, followed by hospitals at 25%, outpatient care centers at 9%, offices of other health practitioners at 5%, and educational services at 3%. Nurse practitioners made up the largest slice of the underlying 382,700 combined jobs in 2024, at 320,400, so the employer mix likely tracks fairly closely with where NPs specifically work, even though BLS does not publish an NP-only version of this table.",
					"Per BLS, some APRNs provide care in patients' homes, and some may travel long distances to reach patients in areas with a shortage of healthcare workers. This site's [nurse practitioner salary guide](/nurse-practitioner-salary/) discusses how that pattern connects to rural and underserved-area demand for NPs in more depth.",
					"Most APRNs work full time, per BLS. Those in physicians' offices typically work standard business hours, while those in hospitals and other healthcare facilities may work shifts, including nights, weekends, and holidays, to cover round-the-clock patient care; some, especially those in critical care settings, are also expected to be on call.",
				],
			},
			{
				heading: "The physical and emotional demands, in BLS's own description",
				body: [
					"BLS describes this work as both physically and emotionally demanding. Some APRNs spend much of the day on their feet, and lifting and moving patients puts them at risk of back injury. BLS names the emotional weight of the role directly, too: APRNs make critical decisions that affect a patient's health, and that responsibility is itself a source of job stress. Because of the settings they work in, APRNs may also come into close contact with infectious disease and must follow strict guidelines against risks such as accidental needle sticks or a patient outburst.",
					"Physician assistants do similar clinical work (assessing, diagnosing, treating) but under a supervising physician in nearly every state, rather than independently in a majority of them the way many nurse practitioners can. This site's guide to [what a physician assistant does](/what-does-a-physician-assistant-do/) covers that role's own duties and setting.",
				],
			},
		],
		faq: [
			{
				question: 'What does a nurse practitioner do on a typical day?',
				answer: "Per BLS, nurse practitioners take patient histories, perform physical exams, order and interpret diagnostic tests, diagnose health problems, and prescribe medication or other treatment, usually focused on a specific patient population such as adult-gerontology, pediatric, or psychiatric-mental health care. They also counsel patients and families and consult with physicians and other healthcare professionals as needed.",
			},
			{
				question: "What's the difference between a nurse practitioner and a registered nurse?",
				answer: "BLS describes nurse practitioners as sharing some duties with registered nurses, such as gathering information about a patient's condition and taking action to manage it, but nurse practitioners are additionally trained to order and evaluate test results, refer patients to specialists, and diagnose and treat health problems, tasks outside a registered nurse's scope.",
			},
			{
				question: 'Can nurse practitioners practice without a supervising physician?',
				answer: "It depends entirely on the state. BLS notes broadly that scope of practice for this occupational group varies from state to state; see this site's [nurse practitioner salary guide](/nurse-practitioner-salary/) for how state practice-authority categories work and where to check a specific state's current rules.",
			},
			{
				question: 'Do nurse practitioners specialize?',
				answer: 'Yes. Per BLS, nurse practitioners typically focus on a specific patient population, such as adult and geriatric health, pediatric health, or psychiatric and mental health, which shapes the conditions and patients an individual NP sees.',
			},
			{
				question: 'How much do nurse practitioners make?',
				answer: "BLS reports a median annual wage of $129,210 for nurse practitioners in May 2024. See [nurse practitioner salary](/nurse-practitioner-salary/) for the full wage and job-outlook breakdown.",
			},
		],
		sources: [
			{ label: 'BLS Occupational Outlook Handbook: Nurse Anesthetists, Nurse Midwives, and Nurse Practitioners (accessed 2026-08-26 via direct fetch with a UA string carrying a declared contact URL, returned 200, data from May 2024, last modified August 28, 2025)', url: 'https://www.bls.gov/ooh/healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners.htm' },
			{ label: 'O*NET OnLine: 29-1171.00 Nurse Practitioners (independent corroboration of the SOC code and occupation title)', url: 'https://www.onetonline.org/link/summary/29-1171.00' },
		],
		image: '/images/nurse-practitioner-duties.svg',
		imageAlt: "Diagram showing four core nurse practitioner duties: assessing patients (history, exam, tests), diagnosing health problems, treating with medication and care plans, and counseling patients while consulting with physicians.",
	},
];
