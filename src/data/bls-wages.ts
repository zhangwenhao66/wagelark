// GENERATED FILE -- do not hand-edit.
// Source of truth: tools/bls-data/wages-source.json
// Regenerate with: node tools/bls-data/build-wage-data.mjs

export interface WagePercentiles {
	p10?: number;
	p25?: number;
	p75?: number;
	p90?: number;
}

export interface IndustryWage {
	industry: string;
	annualWage: number;
}

export interface BlsWageEntry {
	socCode: string;
	title: string;
	medianAnnual: number;
	medianHourly?: number;
	percentiles: WagePercentiles;
	employment: number;
	employmentYear: string;
	jobOutlookPct: number;
	jobOutlookLabel: string;
	employmentChange: number;
	projectionPeriod: string;
	entryEducation: string;
	industryWages: IndustryWage[];
	dataYear: string;
	sourceLabel: string;
	sourceUrl: string;
	publishedDate: string;
	// True when employment/jobOutlookPct/employmentChange/entryEducation are
	// published by BLS only for a combined occupation group, not broken out
	// for this specific title, even though medianAnnual/industryWages above
	// ARE title-specific. Set this rather than leaving those fields blank,
	// since BLS gives no title-specific alternative at all for this occupation.
	// [slug].astro renders an inline caveat under the stat cards when true.
	employmentIsGroupLevel?: boolean;
}

export const BLS_WAGES: Record<string, BlsWageEntry> = {
	"31-2011": {
		socCode: "31-2011",
		title: "Occupational Therapy Assistants",
		medianAnnual: 72300,
		medianHourly: 34.76,
		percentiles: {
			p10: 51490,
			p90: 89780
		},
		employment: 52200,
		employmentYear: "2025",
		jobOutlookPct: 21,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 11200,
		projectionPeriod: "2025-35",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Home healthcare services",
				annualWage: 77310
			},
			{
				industry: "Nursing care facilities (skilled nursing facilities)",
				annualWage: 76780
			},
			{
				industry: "Offices of physical, occupational and speech therapists, and audiologists",
				annualWage: 70740
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 67020
			},
			{
				industry: "Educational services; state, local, and private",
				annualWage: 60920
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Occupational Therapy Assistants and Aides",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/occupational-therapy-assistants-and-aides.htm",
		publishedDate: "2026-08-27"
	},
	"31-1120": {
		socCode: "31-1120",
		title: "Home Health and Personal Care Aides",
		medianAnnual: 35800,
		medianHourly: 17.21,
		percentiles: {
			p10: 27040,
			p90: 45040
		},
		employment: 4677100,
		employmentYear: "2025",
		jobOutlookPct: 18,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 847300,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Residential intellectual and developmental disability facilities",
				annualWage: 37340
			},
			{
				industry: "Continuing care retirement communities and assisted living facilities for the elderly",
				annualWage: 37060
			},
			{
				industry: "Home healthcare services",
				annualWage: 36230
			},
			{
				industry: "Individual and family services",
				annualWage: 34900
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Home Health and Personal Care Aides",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/home-health-aides-and-personal-care-aides.htm",
		publishedDate: "2026-09-03"
	},
	"29-1041": {
		socCode: "29-1041",
		title: "Optometrists",
		medianAnnual: 136570,
		medianHourly: 65.66,
		percentiles: {
			p10: 74870,
			p90: 202180
		},
		employment: 45100,
		employmentYear: "2025",
		jobOutlookPct: 10,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 4300,
		projectionPeriod: "2025-35",
		entryEducation: "Doctoral or professional degree",
		industryWages: [
			{
				industry: "Outpatient care centers",
				annualWage: 207030
			},
			{
				industry: "Retail trade",
				annualWage: 159250
			},
			{
				industry: "Offices of physicians",
				annualWage: 145630
			},
			{
				industry: "Offices of optometrists",
				annualWage: 129250
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Optometrists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/optometrists.htm",
		publishedDate: "2026-08-31"
	},
	"29-2056": {
		socCode: "29-2056",
		title: "Veterinary Technologists and Technicians",
		medianAnnual: 45980,
		medianHourly: 22.11,
		percentiles: {
			p10: 32120,
			p90: 60880
		},
		employment: 134200,
		employmentYear: "2024",
		jobOutlookPct: 9,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 12200,
		projectionPeriod: "2024-34",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Educational services (state, local, private)",
				annualWage: 51250
			},
			{
				industry: "Veterinary services",
				annualWage: 45740
			},
			{
				industry: "Other personal services",
				annualWage: 43280
			},
			{
				industry: "Social advocacy organizations",
				annualWage: 41640
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Veterinary Technologists and Technicians",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/veterinary-technologists-and-technicians.htm",
		publishedDate: "2025-08-28"
	},
	"29-1122": {
		socCode: "29-1122",
		title: "Occupational Therapists",
		medianAnnual: 98340,
		medianHourly: 47.28,
		percentiles: {
			p10: 67090,
			p90: 129830
		},
		employment: 160000,
		employmentYear: "2024",
		jobOutlookPct: 14,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 22100,
		projectionPeriod: "2024-34",
		entryEducation: "Master's degree",
		industryWages: [
			{
				industry: "Nursing care facilities (skilled nursing facilities)",
				annualWage: 103210
			},
			{
				industry: "Home healthcare services",
				annualWage: 103010
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 100770
			},
			{
				industry: "Offices of physical, occupational and speech therapists, and audiologists",
				annualWage: 96380
			},
			{
				industry: "Educational services; state, local, and private",
				annualWage: 83890
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Occupational Therapists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/occupational-therapists.htm",
		publishedDate: "2025-08-28"
	},
	"11-3031": {
		socCode: "11-3031",
		title: "Financial Managers",
		medianAnnual: 161700,
		medianHourly: 77.74,
		percentiles: {
			p10: 86490,
			p90: 239200
		},
		employment: 868600,
		employmentYear: "2024",
		jobOutlookPct: 15,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 128800,
		projectionPeriod: "2024-34",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Professional, scientific, and technical services",
				annualWage: 171580
			},
			{
				industry: "Management of companies and enterprises",
				annualWage: 169340
			},
			{
				industry: "Finance and insurance",
				annualWage: 164940
			},
			{
				industry: "Manufacturing",
				annualWage: 160660
			},
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 134790
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Financial Managers (covers controllers, treasurers, credit/cash/risk/insurance managers as one SOC group; BLS does not break out a controller-specific wage)",
		sourceUrl: "https://www.bls.gov/ooh/management/financial-managers.htm",
		publishedDate: "2025-08-28"
	},
	"35-3011": {
		socCode: "35-3011",
		title: "Bartenders",
		medianAnnual: 33530,
		medianHourly: 16.12,
		percentiles: {},
		employment: 756700,
		employmentYear: "2024",
		jobOutlookPct: 6,
		jobOutlookLabel: "Faster than average",
		employmentChange: 44800,
		projectionPeriod: "2024-34",
		entryEducation: "No formal educational credential",
		industryWages: [],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Bartenders",
		sourceUrl: "https://www.bls.gov/ooh/food-preparation-and-serving/bartenders.htm",
		publishedDate: "2025-08-28"
	},
	"29-1020": {
		socCode: "29-1020",
		title: "Dentists",
		medianAnnual: 179210,
		medianHourly: 86.16,
		percentiles: {
			p10: 84740,
			p90: 239200
		},
		employment: 149300,
		employmentYear: "2024",
		jobOutlookPct: 4,
		jobOutlookLabel: "As fast as average",
		employmentChange: 5900,
		projectionPeriod: "2024-34",
		entryEducation: "Doctoral or professional degree",
		industryWages: [
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 213210
			},
			{
				industry: "Offices of physicians",
				annualWage: 180120
			},
			{
				industry: "Outpatient care centers",
				annualWage: 179460
			},
			{
				industry: "Offices of dentists",
				annualWage: 178300
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Dentists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/dentists.htm",
		publishedDate: "2025-08-28"
	},
	"23-1011": {
		socCode: "23-1011",
		title: "Lawyers",
		medianAnnual: 151160,
		medianHourly: 72.67,
		percentiles: {
			p10: 72780,
			p90: 239200
		},
		employment: 864800,
		employmentYear: "2024",
		jobOutlookPct: 4,
		jobOutlookLabel: "As fast as average",
		employmentChange: 35900,
		projectionPeriod: "2024-34",
		entryEducation: "Doctoral or professional degree",
		industryWages: [
			{
				industry: "Federal government",
				annualWage: 174680
			},
			{
				industry: "Legal services",
				annualWage: 143470
			},
			{
				industry: "Local government (excl. education, hospitals)",
				annualWage: 125180
			},
			{
				industry: "State government (excl. education, hospitals)",
				annualWage: 111280
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Lawyers",
		sourceUrl: "https://www.bls.gov/ooh/legal/lawyers.htm",
		publishedDate: "2025-08-28"
	},
	"29-1292": {
		socCode: "29-1292",
		title: "Dental Hygienists",
		medianAnnual: 94260,
		medianHourly: 45.32,
		percentiles: {
			p10: 66470,
			p90: 120060
		},
		employment: 221600,
		employmentYear: "2024",
		jobOutlookPct: 7,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 15500,
		projectionPeriod: "2024-34",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Offices of dentists",
				annualWage: 94570
			},
			{
				industry: "Offices of physicians",
				annualWage: 84720
			},
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 77940
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Dental Hygienists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/dental-hygienists.htm",
		publishedDate: "2025-08-28"
	},
	"15-2011": {
		socCode: "15-2011",
		title: "Actuaries",
		medianAnnual: 125770,
		medianHourly: 60.47,
		percentiles: {
			p10: 75240,
			p90: 206430
		},
		employment: 33600,
		employmentYear: "2024",
		jobOutlookPct: 22,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 7300,
		projectionPeriod: "2024-34",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Management of companies and enterprises",
				annualWage: 133030
			},
			{
				industry: "Finance and insurance",
				annualWage: 126830
			},
			{
				industry: "Government (excl. state/local education)",
				annualWage: 118910
			},
			{
				industry: "Professional, scientific, and technical services",
				annualWage: 111640
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Actuaries",
		sourceUrl: "https://www.bls.gov/ooh/math/actuaries.htm",
		publishedDate: "2025-08-28"
	},
	"29-1051": {
		socCode: "29-1051",
		title: "Pharmacists",
		medianAnnual: 137480,
		medianHourly: 66.1,
		percentiles: {
			p10: 86930,
			p90: 172040
		},
		employment: 335100,
		employmentYear: "2024",
		jobOutlookPct: 5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 15400,
		projectionPeriod: "2024-34",
		entryEducation: "Doctoral or professional degree (PharmD)",
		industryWages: [
			{
				industry: "Ambulatory healthcare services",
				annualWage: 152980
			},
			{
				industry: "Hospitals (state, local, private)",
				annualWage: 149240
			},
			{
				industry: "General merchandise retailers",
				annualWage: 145210
			},
			{
				industry: "Pharmacies and drug retailers",
				annualWage: 131640
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Pharmacists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/pharmacists.htm",
		publishedDate: "2025-08-28"
	},
	"29-1123": {
		socCode: "29-1123",
		title: "Physical Therapists",
		medianAnnual: 101020,
		medianHourly: 48.57,
		percentiles: {
			p10: 74420,
			p90: 132500
		},
		employment: 267200,
		employmentYear: "2024",
		jobOutlookPct: 11,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 29300,
		projectionPeriod: "2024-34",
		entryEducation: "Doctoral or professional degree (DPT)",
		industryWages: [
			{
				industry: "Home healthcare services",
				annualWage: 108110
			},
			{
				industry: "Nursing and residential care facilities",
				annualWage: 105330
			},
			{
				industry: "Hospitals (state, local, private)",
				annualWage: 105140
			},
			{
				industry: "Offices of physical, occupational and speech therapists",
				annualWage: 94860
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Physical Therapists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/physical-therapists.htm",
		publishedDate: "2025-08-28"
	},
	"29-1071": {
		socCode: "29-1071",
		title: "Physician Assistants",
		medianAnnual: 133260,
		medianHourly: 64.07,
		percentiles: {
			p10: 95240,
			p90: 182200
		},
		employment: 162700,
		employmentYear: "2024",
		jobOutlookPct: 20,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 33200,
		projectionPeriod: "2024-34",
		entryEducation: "Master's degree",
		industryWages: [
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 151470
			},
			{
				industry: "Outpatient care centers",
				annualWage: 147650
			},
			{
				industry: "Hospitals (state, local, private)",
				annualWage: 136630
			},
			{
				industry: "Offices of physicians",
				annualWage: 129640
			},
			{
				industry: "Educational services (state, local, private)",
				annualWage: 127900
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Physician Assistants",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/physician-assistants.htm",
		publishedDate: "2025-08-28"
	},
	"23-2011": {
		socCode: "23-2011",
		title: "Paralegals and Legal Assistants",
		medianAnnual: 61010,
		medianHourly: 29.33,
		percentiles: {
			p10: 39710,
			p90: 98990
		},
		employment: 376200,
		employmentYear: "2024",
		jobOutlookPct: 0,
		jobOutlookLabel: "Little or no change",
		employmentChange: 600,
		projectionPeriod: "2024-34",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Federal government (excl. postal service)",
				annualWage: 77940
			},
			{
				industry: "Finance and insurance",
				annualWage: 76960
			},
			{
				industry: "Local government (excl. education, hospitals)",
				annualWage: 60990
			},
			{
				industry: "Legal services",
				annualWage: 59800
			},
			{
				industry: "State government (excl. education, hospitals)",
				annualWage: 56280
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Paralegals and Legal Assistants",
		sourceUrl: "https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm",
		publishedDate: "2025-08-28"
	},
	"29-2032": {
		socCode: "29-2032",
		title: "Diagnostic Medical Sonographers",
		medianAnnual: 89340,
		medianHourly: 42.95,
		percentiles: {
			p10: 64760,
			p90: 123170
		},
		employment: 90000,
		employmentYear: "2024",
		jobOutlookPct: 13,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 11700,
		projectionPeriod: "2024-34",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Outpatient care centers",
				annualWage: 123610
			},
			{
				industry: "Hospitals (state, local, private)",
				annualWage: 90070
			},
			{
				industry: "Offices of physicians",
				annualWage: 89450
			},
			{
				industry: "Medical and diagnostic laboratories",
				annualWage: 83200
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Diagnostic Medical Sonographers",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/diagnostic-medical-sonographers.htm",
		publishedDate: "2025-08-28"
	},
	"31-9097": {
		socCode: "31-9097",
		title: "Phlebotomists",
		medianAnnual: 43660,
		medianHourly: 20.99,
		percentiles: {},
		employment: 139700,
		employmentYear: "2024",
		jobOutlookPct: 6,
		jobOutlookLabel: "Faster than average",
		employmentChange: 7900,
		projectionPeriod: "2024-34",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Outpatient care centers",
				annualWage: 48450
			},
			{
				industry: "Medical and diagnostic laboratories",
				annualWage: 45700
			},
			{
				industry: "Hospitals (state, local, private)",
				annualWage: 41490
			},
			{
				industry: "Offices of physicians",
				annualWage: 40480
			},
			{
				industry: "Other ambulatory healthcare services",
				annualWage: 39180
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Phlebotomists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/phlebotomists.htm",
		publishedDate: "2025-08-28"
	},
	"29-2034": {
		socCode: "29-2034",
		title: "Radiologic Technologists and Technicians",
		medianAnnual: 77660,
		percentiles: {
			p10: 52360,
			p90: 106990
		},
		employment: 228000,
		employmentYear: "2024",
		jobOutlookPct: 4,
		jobOutlookLabel: "Faster than average",
		employmentChange: 9800,
		projectionPeriod: "2024-34",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Federal government (excl. postal service)",
				annualWage: 93970
			},
			{
				industry: "Outpatient care centers",
				annualWage: 81000
			},
			{
				industry: "Hospitals (state, local, private)",
				annualWage: 78560
			},
			{
				industry: "Medical and diagnostic laboratories",
				annualWage: 76770
			},
			{
				industry: "Offices of physicians",
				annualWage: 66060
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Radiologic and MRI Technologists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/radiologic-technologists.htm",
		publishedDate: "2025-08-28"
	},
	"53-2031": {
		socCode: "53-2031",
		title: "Flight Attendants",
		medianAnnual: 67130,
		percentiles: {
			p10: 34030,
			p90: 138040
		},
		employment: 130800,
		employmentYear: "2024",
		jobOutlookPct: 9,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 12100,
		projectionPeriod: "2024-34",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Nonscheduled air transportation",
				annualWage: 77060
			},
			{
				industry: "Scheduled air transportation",
				annualWage: 67620
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Flight Attendants",
		sourceUrl: "https://www.bls.gov/ooh/transportation-and-material-moving/flight-attendants.htm",
		publishedDate: "2025-08-28"
	},
	"29-1151": {
		socCode: "29-1151",
		title: "Nurse Anesthetists",
		medianAnnual: 223210,
		percentiles: {},
		employment: 53800,
		employmentYear: "2024",
		jobOutlookPct: 9,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 4600,
		projectionPeriod: "2024-34",
		entryEducation: "Master's degree",
		industryWages: [],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Nurse Anesthetists, Nurse Midwives, and Nurse Practitioners",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners.htm",
		publishedDate: "2025-08-28"
	},
	"35-1011": {
		socCode: "35-1011",
		title: "Chefs and Head Cooks",
		medianAnnual: 60990,
		medianHourly: 29.32,
		percentiles: {
			p10: 36000,
			p90: 96030
		},
		employment: 197300,
		employmentYear: "2024",
		jobOutlookPct: 7,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 14000,
		projectionPeriod: "2024-34",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Traveler accommodation",
				annualWage: 73110
			},
			{
				industry: "Amusement, gambling, and recreation industries",
				annualWage: 69430
			},
			{
				industry: "Food services and drinking places",
				annualWage: 59450
			},
			{
				industry: "Healthcare and social assistance",
				annualWage: 57350
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Chefs and Head Cooks",
		sourceUrl: "https://www.bls.gov/ooh/food-preparation-and-serving/chefs-and-head-cooks.htm",
		publishedDate: "2025-08-28"
	},
	"29-2055": {
		socCode: "29-2055",
		title: "Surgical Technologists",
		medianAnnual: 62830,
		percentiles: {},
		employment: 115600,
		employmentYear: "2024",
		jobOutlookPct: 4.5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 5200,
		projectionPeriod: "2024-34",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Surgical Assistants and Technologists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/surgical-technologists.htm",
		publishedDate: "2025-08-28"
	},
	"29-2052": {
		socCode: "29-2052",
		title: "Pharmacy Technicians",
		medianAnnual: 43460,
		medianHourly: 20.9,
		percentiles: {
			p10: 35100,
			p90: 59450
		},
		employment: 490400,
		employmentYear: "2024",
		jobOutlookPct: 6,
		jobOutlookLabel: "Faster than average",
		employmentChange: 31500,
		projectionPeriod: "2024-34",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Ambulatory healthcare services",
				annualWage: 49920
			},
			{
				industry: "Hospitals (state, local, private)",
				annualWage: 49310
			},
			{
				industry: "General merchandise retailers",
				annualWage: 46180
			},
			{
				industry: "Grocery and specialty food retailers",
				annualWage: 38810
			},
			{
				industry: "Pharmacies and drug retailers",
				annualWage: 37900
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Pharmacy Technicians",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/pharmacy-technicians.htm",
		publishedDate: "2026-04-24"
	},
	"29-1171": {
		socCode: "29-1171",
		title: "Nurse Practitioners",
		medianAnnual: 129210,
		percentiles: {},
		employment: 320400,
		employmentYear: "2024",
		jobOutlookPct: 40,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 128400,
		projectionPeriod: "2024-34",
		entryEducation: "Master's degree",
		industryWages: [],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Nurse Anesthetists, Nurse Midwives, and Nurse Practitioners",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners.htm",
		publishedDate: "2025-08-28"
	},
	"31-9091": {
		socCode: "31-9091",
		title: "Dental Assistants",
		medianAnnual: 47300,
		medianHourly: 22.74,
		percentiles: {
			p10: 36190,
			p90: 61780
		},
		employment: 381900,
		employmentYear: "2024",
		jobOutlookPct: 6,
		jobOutlookLabel: "Faster than average",
		employmentChange: 24400,
		projectionPeriod: "2024-34",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 53660
			},
			{
				industry: "Offices of dentists",
				annualWage: 47250
			},
			{
				industry: "Offices of physicians",
				annualWage: 46170
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Dental Assistants",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/dental-assistants.htm",
		publishedDate: "2025-08-28"
	},
	"31-9092": {
		socCode: "31-9092",
		title: "Medical Assistants",
		medianAnnual: 45690,
		medianHourly: 21.97,
		percentiles: {
			p10: 36050,
			p90: 59310
		},
		employment: 833900,
		employmentYear: "2025",
		jobOutlookPct: 13,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 107600,
		projectionPeriod: "2025-35",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Outpatient care centers",
				annualWage: 48560
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 46910
			},
			{
				industry: "Offices of physicians",
				annualWage: 45520
			},
			{
				industry: "Offices of other health practitioners",
				annualWage: 38400
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Medical Assistants",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/medical-assistants.htm",
		publishedDate: "2026-08-28"
	},
	"31-1131": {
		socCode: "31-1131",
		title: "Nursing Assistants",
		medianAnnual: 42260,
		percentiles: {
			p10: 33940,
			p90: 51980
		},
		employment: 1505900,
		employmentYear: "2025",
		jobOutlookPct: 3,
		jobOutlookLabel: "About as fast as average",
		employmentChange: 39000,
		projectionPeriod: "2025-35",
		entryEducation: "State-approved training program",
		industryWages: [
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 47050
			},
			{
				industry: "Nursing care facilities (skilled nursing facilities)",
				annualWage: 43000
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 42310
			},
			{
				industry: "Continuing care retirement communities & assisted living",
				annualWage: 39490
			},
			{
				industry: "Home healthcare services",
				annualWage: 38040
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Nursing Assistants and Orderlies",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/nursing-assistants.htm",
		publishedDate: "2026-08-31"
	},
	"53-2021": {
		socCode: "53-2021",
		title: "Air Traffic Controllers",
		medianAnnual: 148080,
		medianHourly: 71.19,
		percentiles: {
			p10: 78420,
			p90: 215610
		},
		employment: 24000,
		employmentYear: "2025",
		jobOutlookPct: 2,
		jobOutlookLabel: "Slower than average",
		employmentChange: 400,
		projectionPeriod: "2025-35",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Federal government",
				annualWage: 156250
			},
			{
				industry: "Support activities for air transportation",
				annualWage: 83890
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Air Traffic Controllers",
		sourceUrl: "https://www.bls.gov/ooh/transportation-and-material-moving/air-traffic-controllers.htm",
		publishedDate: "2026-08-30"
	},
	"29-1126": {
		socCode: "29-1126",
		title: "Respiratory Therapists",
		medianAnnual: 80450,
		medianHourly: 38.68,
		percentiles: {
			p10: 61900,
			p90: 108820
		},
		employment: 139600,
		employmentYear: "2024",
		jobOutlookPct: 12,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 16800,
		projectionPeriod: "2024-34",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 80660
			},
			{
				industry: "Nursing care facilities (skilled nursing facilities)",
				annualWage: 75910
			},
			{
				industry: "Offices of physicians",
				annualWage: 75240
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Respiratory Therapists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/respiratory-therapists.htm",
		publishedDate: "2025-08-28"
	},
	"47-2111": {
		socCode: "47-2111",
		title: "Electricians",
		medianAnnual: 63190,
		medianHourly: 30.38,
		percentiles: {
			p10: 42640,
			p90: 108510
		},
		employment: 821000,
		employmentYear: "2025",
		jobOutlookPct: 9,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 75900,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Government, excluding state and local education and hospitals",
				annualWage: 79820
			},
			{
				industry: "Manufacturing",
				annualWage: 74550
			},
			{
				industry: "Electrical contractors and other wiring installation contractors",
				annualWage: 61570
			},
			{
				industry: "Employment services",
				annualWage: 57760
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Electricians",
		sourceUrl: "https://www.bls.gov/ooh/construction-and-extraction/electricians.htm",
		publishedDate: "2026-09-04"
	},
	"33-2011": {
		socCode: "33-2011",
		title: "Firefighters",
		medianAnnual: 59530,
		medianHourly: 28.62,
		percentiles: {
			p10: 34490,
			p90: 101330
		},
		employment: 344900,
		employmentYear: "2024",
		jobOutlookPct: 3,
		jobOutlookLabel: "As fast as average",
		employmentChange: 11800,
		projectionPeriod: "2024-34",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Federal government, excluding postal service",
				annualWage: 62690
			},
			{
				industry: "State government, excluding education and hospitals",
				annualWage: 61850
			},
			{
				industry: "Local government, excluding education and hospitals",
				annualWage: 60360
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Firefighters",
		sourceUrl: "https://www.bls.gov/ooh/protective-service/firefighters.htm",
		publishedDate: "2025-08-28"
	},
	"47-2152": {
		socCode: "47-2152",
		title: "Plumbers, Pipefitters, and Steamfitters",
		medianAnnual: 62970,
		medianHourly: 30.27,
		percentiles: {
			p10: 40670,
			p90: 105150
		},
		employment: 504500,
		employmentYear: "2024",
		jobOutlookPct: 4,
		jobOutlookLabel: "As fast as average",
		employmentChange: 22700,
		projectionPeriod: "2024-34",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Government, excluding state and local education and hospitals",
				annualWage: 69160
			},
			{
				industry: "Heavy and civil engineering construction",
				annualWage: 62770
			},
			{
				industry: "Plumbing, heating, and air-conditioning contractors",
				annualWage: 62670
			},
			{
				industry: "Manufacturing",
				annualWage: 61620
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Plumbers, Pipefitters, and Steamfitters",
		sourceUrl: "https://www.bls.gov/ooh/construction-and-extraction/plumbers-pipefitters-and-steamfitters.htm",
		publishedDate: "2025-08-28"
	},
	"53-3032": {
		socCode: "53-3032",
		title: "Heavy and Tractor-trailer Truck Drivers",
		medianAnnual: 57440,
		medianHourly: 27.62,
		percentiles: {
			p10: 38640,
			p90: 78800
		},
		employment: 2235100,
		employmentYear: "2024",
		jobOutlookPct: 4,
		jobOutlookLabel: "As fast as average",
		employmentChange: 89300,
		projectionPeriod: "2024-34",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Truck transportation",
				annualWage: 59570
			},
			{
				industry: "Wholesale trade",
				annualWage: 57260
			},
			{
				industry: "Manufacturing",
				annualWage: 54860
			},
			{
				industry: "Construction",
				annualWage: 54170
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Heavy and Tractor-trailer Truck Drivers",
		sourceUrl: "https://www.bls.gov/ooh/transportation-and-material-moving/heavy-and-tractor-trailer-truck-drivers.htm",
		publishedDate: "2025-08-28"
	},
	"51-4121": {
		socCode: "51-4121",
		title: "Welders, Cutters, Solderers, and Brazers",
		medianAnnual: 51000,
		medianHourly: 24.52,
		percentiles: {
			p10: 38130,
			p90: 75850
		},
		employment: 457300,
		employmentYear: "2024",
		jobOutlookPct: 2,
		jobOutlookLabel: "Slower than average",
		employmentChange: 9900,
		projectionPeriod: "2024-34",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Specialty trade contractors",
				annualWage: 57310
			},
			{
				industry: "Repair and maintenance",
				annualWage: 53300
			},
			{
				industry: "Manufacturing",
				annualWage: 49740
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Welders, Cutters, Solderers, and Brazers",
		sourceUrl: "https://www.bls.gov/ooh/production/welders-cutters-solderers-and-brazers.htm",
		publishedDate: "2025-08-28"
	},
	"29-1141": {
		socCode: "29-1141",
		title: "Registered Nurses",
		medianAnnual: 93600,
		medianHourly: 45,
		percentiles: {
			p10: 66030,
			p90: 135320
		},
		employment: 3391000,
		employmentYear: "2024",
		jobOutlookPct: 5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 166100,
		projectionPeriod: "2024-34",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 106480
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 97260
			},
			{
				industry: "Ambulatory healthcare services",
				annualWage: 83780
			},
			{
				industry: "Nursing and residential care facilities",
				annualWage: 81820
			},
			{
				industry: "Educational services; state, local, and private",
				annualWage: 74360
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Registered Nurses",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/registered-nurses.htm",
		publishedDate: "2025-08-28"
	},
	"49-9021": {
		socCode: "49-9021",
		title: "Heating, Air Conditioning, and Refrigeration Mechanics and Installers",
		medianAnnual: 59810,
		medianHourly: 28.75,
		percentiles: {
			p10: 39130,
			p90: 91020
		},
		employment: 425200,
		employmentYear: "2024",
		jobOutlookPct: 8,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 34500,
		projectionPeriod: "2024-34",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Wholesale trade",
				annualWage: 65760
			},
			{
				industry: "Educational services; state, local, and private",
				annualWage: 60960
			},
			{
				industry: "Retail trade",
				annualWage: 60730
			},
			{
				industry: "Plumbing, heating, and air-conditioning contractors",
				annualWage: 58750
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Heating, Air Conditioning, and Refrigeration Mechanics and Installers",
		sourceUrl: "https://www.bls.gov/ooh/installation-maintenance-and-repair/heating-air-conditioning-and-refrigeration-mechanics-and-installers.htm",
		publishedDate: "2025-08-28"
	},
	"25-4022": {
		socCode: "25-4022",
		title: "Librarians and Media Collections Specialists",
		medianAnnual: 64320,
		medianHourly: 30.92,
		percentiles: {
			p10: 38920,
			p90: 100880
		},
		employment: 142100,
		employmentYear: "2024",
		jobOutlookPct: 2,
		jobOutlookLabel: "Slower than average",
		employmentChange: 2400,
		projectionPeriod: "2024-34",
		entryEducation: "Master's degree",
		industryWages: [
			{
				industry: "Elementary and secondary schools; local",
				annualWage: 69880
			},
			{
				industry: "Colleges, universities, and professional schools; state",
				annualWage: 68570
			},
			{
				industry: "Colleges, universities, and professional schools; private",
				annualWage: 66260
			},
			{
				industry: "Local government (excl. education, hospitals)",
				annualWage: 60510
			},
			{
				industry: "Web search portals, libraries, archives, and other information services",
				annualWage: 59810
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Librarians and Library Media Specialists",
		sourceUrl: "https://www.bls.gov/ooh/education-training-and-library/librarians.htm",
		publishedDate: "2025-08-28"
	},
	"19-3030": {
		socCode: "19-3030",
		title: "Psychologists",
		medianAnnual: 94310,
		medianHourly: 45.34,
		percentiles: {
			p10: 54860,
			p90: 157330
		},
		employment: 204300,
		employmentYear: "2024",
		jobOutlookPct: 6,
		jobOutlookLabel: "Faster than average",
		employmentChange: 11800,
		projectionPeriod: "2024-34",
		entryEducation: "Master's or doctoral degree",
		industryWages: [
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 126990
			},
			{
				industry: "Ambulatory healthcare services",
				annualWage: 96960
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 96060
			},
			{
				industry: "Elementary and secondary schools; local",
				annualWage: 85920
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Psychologists",
		sourceUrl: "https://www.bls.gov/ooh/life-physical-and-social-science/psychologists.htm",
		publishedDate: "2025-08-28"
	},
	"21-1020": {
		socCode: "21-1020",
		title: "Social Workers",
		medianAnnual: 61330,
		medianHourly: 29.49,
		percentiles: {
			p10: 41580,
			p90: 99500
		},
		employment: 810900,
		employmentYear: "2024",
		jobOutlookPct: 6,
		jobOutlookLabel: "Faster than average",
		employmentChange: 44700,
		projectionPeriod: "2024-34",
		entryEducation: "Bachelor's or master's degree",
		industryWages: [
			{
				industry: "Educational services; state, local, and private",
				annualWage: 67620
			},
			{
				industry: "Local government (excl. education, hospitals)",
				annualWage: 65920
			},
			{
				industry: "State government (excl. education, hospitals)",
				annualWage: 59630
			},
			{
				industry: "Individual and family services",
				annualWage: 51430
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Social Workers",
		sourceUrl: "https://www.bls.gov/ooh/community-and-social-service/social-workers.htm",
		publishedDate: "2025-08-28"
	},
	"49-9051": {
		socCode: "49-9051",
		title: "Electrical Power-Line Installers and Repairers",
		medianAnnual: 92560,
		medianHourly: 44.5,
		percentiles: {
			p10: 50020,
			p90: 126610
		},
		employment: 127400,
		employmentYear: "2024",
		jobOutlookPct: 7,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 8400,
		projectionPeriod: "2024-34",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Federal government, excluding postal service",
				annualWage: 104540
			},
			{
				industry: "Utilities",
				annualWage: 102050
			},
			{
				industry: "Local government, excluding education and hospitals",
				annualWage: 87550
			},
			{
				industry: "Specialty trade contractors",
				annualWage: 76290
			},
			{
				industry: "Utility system construction",
				annualWage: 74550
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Electrical Power-Line Installers and Repairers",
		sourceUrl: "https://www.bls.gov/ooh/installation-maintenance-and-repair/line-installers-and-repairers.htm",
		publishedDate: "2025-08-28"
	},
	"13-2011": {
		socCode: "13-2011",
		title: "Accountants and Auditors",
		medianAnnual: 81680,
		medianHourly: 39.27,
		percentiles: {
			p10: 52780,
			p90: 141420
		},
		employment: 1579800,
		employmentYear: "2024",
		jobOutlookPct: 5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 72800,
		projectionPeriod: "2024-34",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Finance and insurance",
				annualWage: 87980
			},
			{
				industry: "Management of companies and enterprises",
				annualWage: 86010
			},
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 81120
			},
			{
				industry: "Accounting, tax preparation, bookkeeping, and payroll services",
				annualWage: 80510
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Accountants and Auditors",
		sourceUrl: "https://www.bls.gov/ooh/business-and-financial/accountants-and-auditors.htm",
		publishedDate: "2025-08-28"
	},
	"15-1252": {
		socCode: "15-1252",
		title: "Software Developers",
		medianAnnual: 133080,
		percentiles: {
			p10: 79850,
			p90: 211450
		},
		employment: 1693800,
		employmentYear: "2024",
		jobOutlookPct: 15.8,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 267700,
		projectionPeriod: "2024-34",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Software publishers",
				annualWage: 149990
			},
			{
				industry: "Manufacturing",
				annualWage: 134910
			},
			{
				industry: "Management of companies and enterprises",
				annualWage: 133650
			},
			{
				industry: "Finance and insurance",
				annualWage: 132880
			},
			{
				industry: "Computer systems design and related services",
				annualWage: 129890
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Software Developers, Quality Assurance Analysts, and Testers",
		sourceUrl: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
		publishedDate: "2025-08-28"
	},
	"27-3092": {
		socCode: "27-3092",
		title: "Court Reporters and Simultaneous Captioners",
		medianAnnual: 67310,
		medianHourly: 32.36,
		percentiles: {
			p10: 39100,
			p90: 127020
		},
		employment: 17700,
		employmentYear: "2024",
		jobOutlookPct: 0,
		jobOutlookLabel: "Little or no change",
		employmentChange: 0,
		projectionPeriod: "2024-34",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Local government, excluding education and hospitals",
				annualWage: 75150
			},
			{
				industry: "State government, excluding education and hospitals",
				annualWage: 74660
			},
			{
				industry: "Business support services",
				annualWage: 51290
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Court Reporters and Simultaneous Captioners",
		sourceUrl: "https://www.bls.gov/ooh/legal/court-reporters.htm",
		publishedDate: "2025-08-28"
	},
	"49-9044": {
		socCode: "49-9044",
		title: "Millwrights",
		medianAnnual: 65170,
		percentiles: {},
		employment: 41300,
		employmentYear: "2024",
		jobOutlookPct: 0,
		jobOutlookLabel: "Little or no change",
		employmentChange: 0,
		projectionPeriod: "2024-34",
		entryEducation: "High school diploma or equivalent",
		industryWages: [],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Industrial Machinery Mechanics, Machinery Maintenance Workers, and Millwrights (SOC 49-9044 covers millwrights specifically; BLS breaks out a millwright-specific median annual wage ($65,170) and employment figure (41,300, flat 0% growth 2024-34) in its Pay and Job Outlook tables, but publishes 10th/90th percentiles and industry-level wages only for the combined three-title group, not broken out for millwrights alone -- percentiles and industryWages are left empty here rather than populated with the combined-group figures, so the auto-rendered chart/table on this page never mislabels group-level data as millwright-specific; the combined-group percentile and industry figures are still reported, with that caveat, in the article prose)",
		sourceUrl: "https://www.bls.gov/ooh/installation-maintenance-and-repair/industrial-machinery-mechanics-and-maintenance-workers-and-millwrights.htm",
		publishedDate: "2025-08-28"
	},
	"29-2043": {
		socCode: "29-2043",
		title: "Paramedics",
		medianAnnual: 58410,
		percentiles: {},
		employment: 282900,
		employmentYear: "2024",
		jobOutlookPct: 5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 14300,
		projectionPeriod: "2024-34",
		entryEducation: "Postsecondary nondegree award",
		employmentIsGroupLevel: true,
		industryWages: [
			{
				industry: "Local government, excluding education and hospitals",
				annualWage: 59840
			},
			{
				industry: "Offices of physicians",
				annualWage: 59370
			},
			{
				industry: "General medical and surgical hospitals; private",
				annualWage: 58780
			},
			{
				industry: "Ambulance services",
				annualWage: 57720
			},
			{
				industry: "General medical and surgical hospitals; local",
				annualWage: 52990
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: EMTs and Paramedics (SOC 29-2043 covers paramedics specifically, a distinct 6-digit code from EMTs' 29-2042 within the combined 29-2040 group; BLS's Pay tab breaks out a paramedic-specific median annual wage ($58,410) and a paramedic-specific top-5-industry wage table, both used here, but the Quick Facts employment count (282,900), job outlook (5%, 14,300 openings, 2024-34), and typical entry-level education (postsecondary nondegree award) are published only for the combined EMTs-and-Paramedics occupation group, not split out for paramedics alone -- those combined-group figures are still the best available and are used here with that caveat noted in the article prose. BLS does not publish 10th/90th percentile wages anywhere on this page, for EMTs, paramedics, or the combined group, so percentiles is left empty rather than populated with a different granularity)",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm",
		publishedDate: "2025-08-28"
	},
	"29-2035": {
		socCode: "29-2035",
		title: "Magnetic Resonance Imaging Technologists",
		medianAnnual: 95480,
		medianHourly: 45.9,
		percentiles: {
			p10: 68890,
			p90: 127670
		},
		employment: 43900,
		employmentYear: "2025",
		jobOutlookPct: 8,
		jobOutlookLabel: "Faster than average",
		employmentChange: 3400,
		projectionPeriod: "2025-35",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Outpatient care centers",
				annualWage: 140390
			},
			{
				industry: "Hospitals (state, local, private)",
				annualWage: 95920
			},
			{
				industry: "Offices of physicians",
				annualWage: 93880
			},
			{
				industry: "Medical and diagnostic laboratories",
				annualWage: 93540
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Radiologic and MRI Technologists (SOC 29-2035 covers MRI technologists specifically, a distinct 6-digit code from radiologic technologists' 29-2034 within the combined 29-2030 group; BLS's Pay tab breaks out an MRI-technologist-specific median annual wage ($95,480), 10th/90th percentile wages, and a specific top-4-industry wage table, all used here. The Quick Facts box only shows the combined group's employment/outlook, but the Job Outlook tab's separate Employment Projections Data table breaks 29-2035 out individually: 43,900 jobs in 2025, projected to reach 47,300 by 2035, an 8% growth rate (faster than the 5% for the combined group and for 29-2034 alone) adding 3,400 jobs -- that SOC-specific table, not the combined Quick Facts figure, is what's used here. medianHourly is calculated as medianAnnual / 2080 hours, not a BLS-published figure, following this site's existing convention for occupations where BLS's Quick Facts hourly wage is only given at the combined-group level)",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/radiologic-technologists.htm",
		publishedDate: "2026-08-27"
	},
	"13-2053": {
		socCode: "13-2053",
		title: "Insurance Underwriters",
		medianAnnual: 79880,
		medianHourly: 38.4,
		percentiles: {
			p10: 51640,
			p90: 138020
		},
		employment: 127000,
		employmentYear: "2024",
		jobOutlookPct: -3,
		jobOutlookLabel: "Decline",
		employmentChange: -3300,
		projectionPeriod: "2024-34",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Credit intermediation and related activities",
				annualWage: 90000
			},
			{
				industry: "Other insurance related activities",
				annualWage: 81870
			},
			{
				industry: "Direct health and medical insurance carriers",
				annualWage: 81240
			},
			{
				industry: "Direct insurance (except life, health, and medical) carriers",
				annualWage: 79350
			},
			{
				industry: "Insurance agencies and brokerages",
				annualWage: 79200
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Insurance Underwriters",
		sourceUrl: "https://www.bls.gov/ooh/business-and-financial/insurance-underwriters.htm",
		publishedDate: "2025-08-28"
	},
	"43-3031": {
		socCode: "43-3031",
		title: "Bookkeeping, Accounting, and Auditing Clerks",
		medianAnnual: 49210,
		medianHourly: 23.66,
		percentiles: {
			p10: 34600,
			p90: 72660
		},
		employment: 1613400,
		employmentYear: "2024",
		jobOutlookPct: -6,
		jobOutlookLabel: "Decline",
		employmentChange: -94300,
		projectionPeriod: "2024-34",
		entryEducation: "Some college, no degree",
		industryWages: [
			{
				industry: "Construction",
				annualWage: 51670
			},
			{
				industry: "Professional, scientific, and technical services",
				annualWage: 50180
			},
			{
				industry: "Healthcare and social assistance",
				annualWage: 48810
			},
			{
				industry: "Wholesale trade",
				annualWage: 48810
			},
			{
				industry: "Retail trade",
				annualWage: 45030
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Bookkeeping, Accounting, and Auditing Clerks",
		sourceUrl: "https://www.bls.gov/ooh/office-and-administrative-support/bookkeeping-accounting-and-auditing-clerks.htm",
		publishedDate: "2025-08-28"
	},
	"11-1011": {
		socCode: "11-1011",
		title: "Chief Executives",
		medianAnnual: 206420,
		medianHourly: 99.24,
		percentiles: {
			p10: 73710,
			p90: 239200
		},
		employment: 309400,
		employmentYear: "2024",
		jobOutlookPct: 4,
		jobOutlookLabel: "As fast as average",
		employmentChange: 13300,
		projectionPeriod: "2024-34",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Management of companies and enterprises",
				annualWage: 239200
			},
			{
				industry: "Professional, scientific, and technical services",
				annualWage: 208870
			},
			{
				industry: "Healthcare and social assistance",
				annualWage: 194360
			},
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 137310
			}
		],
		dataYear: "May 2024",
		sourceLabel: "BLS Occupational Outlook Handbook: Top Executives (covers Chief Executives and General and Operations Managers as one OOH page; this profile uses the Chief Executives-specific pay, employment, and job outlook figures the BLS Pay and Job Outlook tables break out separately from the blended Top Executives total)",
		sourceUrl: "https://www.bls.gov/ooh/management/top-executives.htm",
		publishedDate: "2025-08-28"
	},
	"39-4031": {
		socCode: "39-4031",
		title: "Morticians, Undertakers, and Funeral Arrangers",
		medianAnnual: 55010,
		medianHourly: 26.45,
		percentiles: {
			p10: 33350,
			p90: 88620
		},
		employment: 26700,
		employmentYear: "2025",
		jobOutlookPct: 3,
		jobOutlookLabel: "As fast as average",
		employmentChange: 800,
		projectionPeriod: "2025-35",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Death care services",
				annualWage: 54530
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Funeral Service Workers (Morticians, Undertakers, and Funeral Arrangers profile)",
		sourceUrl: "https://www.bls.gov/ooh/personal-care-and-service/funeral-service-occupations.htm",
		publishedDate: "2026-08-27"
	},
	"29-1131": {
		socCode: "29-1131",
		title: "Veterinarians",
		medianAnnual: 130100,
		medianHourly: 62.55,
		percentiles: {
			p10: 73920,
			p90: 215700
		},
		employment: 91100,
		employmentYear: "2025",
		jobOutlookPct: 9,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 8600,
		projectionPeriod: "2025-35",
		entryEducation: "Doctoral or professional degree",
		industryWages: [
			{
				industry: "Social advocacy organizations",
				annualWage: 131760
			},
			{
				industry: "Veterinary services",
				annualWage: 129990
			},
			{
				industry: "Educational services (state, local, private)",
				annualWage: 121890
			},
			{
				industry: "Government (excluding state/local education)",
				annualWage: 115210
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Veterinarians",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/veterinarians.htm",
		publishedDate: "2026-08-27"
	},
	"29-1124": {
		socCode: "29-1124",
		title: "Radiation Therapists",
		medianAnnual: 105310,
		medianHourly: 50.63,
		percentiles: {},
		employment: 17400,
		employmentYear: "2025",
		jobOutlookPct: 3,
		jobOutlookLabel: "As fast as average",
		employmentChange: 500,
		projectionPeriod: "2025-35",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Outpatient care centers",
				annualWage: 127680
			},
			{
				industry: "Offices of physicians",
				annualWage: 110610
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 104260
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Radiation Therapists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/radiation-therapists.htm",
		publishedDate: "2026-08-27"
	},
	"29-2033": {
		socCode: "29-2033",
		title: "Nuclear Medicine Technologists",
		medianAnnual: 101370,
		medianHourly: 48.74,
		percentiles: {
			p10: 78080,
			p90: 134500
		},
		employment: 17400,
		employmentYear: "2025",
		jobOutlookPct: 4,
		jobOutlookLabel: "As fast as average",
		employmentChange: 800,
		projectionPeriod: "2025-35",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Outpatient care centers",
				annualWage: 171170
			},
			{
				industry: "Medical and diagnostic laboratories",
				annualWage: 103410
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 101280
			},
			{
				industry: "Offices of physicians",
				annualWage: 98420
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Nuclear Medicine Technologists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/nuclear-medicine-technologists.htm",
		publishedDate: "2026-08-27"
	},
	"21-1012": {
		socCode: "21-1012",
		title: "School and Career Counselors and Advisors",
		medianAnnual: 64330,
		medianHourly: 30.93,
		percentiles: {
			p10: 45020,
			p90: 104770
		},
		employment: 389500,
		employmentYear: "2025",
		jobOutlookPct: 3,
		jobOutlookLabel: "As fast as average",
		employmentChange: 11400,
		projectionPeriod: "2025-35",
		entryEducation: "Master's degree",
		industryWages: [
			{
				industry: "Elementary and secondary schools; local",
				annualWage: 77800
			},
			{
				industry: "Elementary and secondary schools; private",
				annualWage: 62190
			},
			{
				industry: "Colleges, universities, professional schools; state/local",
				annualWage: 58870
			},
			{
				industry: "Colleges, universities, professional schools; private",
				annualWage: 58720
			},
			{
				industry: "Other educational services; private",
				annualWage: 57480
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: School and Career Counselors and Advisors",
		sourceUrl: "https://www.bls.gov/ooh/community-and-social-service/school-and-career-counselors.htm",
		publishedDate: "2026-08-27"
	}
};
