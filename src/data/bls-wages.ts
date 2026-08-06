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
}

export const BLS_WAGES: Record<string, BlsWageEntry> = {
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
		percentiles: {},
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
	}
};
