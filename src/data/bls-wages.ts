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

export interface StateWage {
	state: string;
	stateAbbr: string;
	annualMedian: number;
	annualPct10: number;
	annualPct90: number;
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
	// State-level breakdown from BLS OEWS state estimates (bls.gov/oes/special-requests,
	// NOT the OOH page in sourceUrl -- OOH never publishes state detail). Only present
	// for occupations that have gone through the state-data verification pass; most
	// occupations in this file have none. See stateWagesSourceUrl for provenance.
	stateWages?: StateWage[];
	stateWagesSourceUrl?: string;
	stateWagesDataYear?: string;
}

export const BLS_WAGES: Record<string, BlsWageEntry> = {
	"47-2011": {
		socCode: "47-2011",
		title: "Boilermakers",
		medianAnnual: 76410,
		medianHourly: 36.74,
		percentiles: {
			p10: 50490,
			p90: 110370
		},
		employment: 10200,
		employmentYear: "2025",
		jobOutlookPct: -2,
		jobOutlookLabel: "Decline",
		employmentChange: -200,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Utility system construction",
				annualWage: 80060
			},
			{
				industry: "Other building equipment contractors",
				annualWage: 79110
			},
			{
				industry: "Nonresidential building construction",
				annualWage: 74960
			},
			{
				industry: "Plumbing, heating, and air-conditioning contractors",
				annualWage: 73150
			},
			{
				industry: "Fabricated metal product manufacturing",
				annualWage: 63760
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Boilermakers",
		sourceUrl: "https://www.bls.gov/ooh/construction-and-extraction/boilermakers.htm",
		publishedDate: "2026-08-27"
	},
	"29-2061": {
		socCode: "29-2061",
		title: "Licensed Practical and Licensed Vocational Nurses",
		medianAnnual: 64400,
		medianHourly: 30.96,
		percentiles: {
			p10: 49740,
			p90: 83440
		},
		employment: 666900,
		employmentYear: "2025",
		jobOutlookPct: 3,
		jobOutlookLabel: "As fast as average",
		employmentChange: 19700,
		projectionPeriod: "2025-35",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Government, excluding state and local education and hospitals",
				annualWage: 68970
			},
			{
				industry: "Nursing and residential care facilities",
				annualWage: 68020
			},
			{
				industry: "Home healthcare services",
				annualWage: 63580
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 61160
			},
			{
				industry: "Offices of physicians",
				annualWage: 59520
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Licensed Practical and Licensed Vocational Nurses",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/licensed-practical-and-licensed-vocational-nurses.htm",
		publishedDate: "2026-08-27"
	},
	"19-4092": {
		socCode: "19-4092",
		title: "Forensic Science Technicians",
		medianAnnual: 72060,
		medianHourly: 34.65,
		percentiles: {
			p10: 48250,
			p90: 117250
		},
		employment: 20100,
		employmentYear: "2025",
		jobOutlookPct: 13,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 2700,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "State government, excluding education and hospitals",
				annualWage: 74740
			},
			{
				industry: "Local government, excluding education and hospitals",
				annualWage: 70050
			},
			{
				industry: "Educational services; state, local, and private",
				annualWage: 61680
			},
			{
				industry: "Testing laboratories and services",
				annualWage: 49600
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Forensic Science Technicians",
		sourceUrl: "https://www.bls.gov/ooh/life-physical-and-social-science/forensic-science-technicians.htm",
		publishedDate: "2026-08-27"
	},
	"29-1181": {
		socCode: "29-1181",
		title: "Audiologists",
		medianAnnual: 95780,
		medianHourly: 46.05,
		percentiles: {
			p10: 64610,
			p90: 133120
		},
		employment: 14200,
		employmentYear: "2025",
		jobOutlookPct: 11,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 1600,
		projectionPeriod: "2025-35",
		entryEducation: "Doctoral or professional degree",
		industryWages: [
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 103700
			},
			{
				industry: "Educational services; state, local, and private",
				annualWage: 98110
			},
			{
				industry: "Offices of physicians",
				annualWage: 92620
			},
			{
				industry: "Offices of physical, occupational and speech therapists, and audiologists",
				annualWage: 81730
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Audiologists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/audiologists.htm",
		publishedDate: "2026-08-27"
	},
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
		medianAnnual: 47380,
		medianHourly: 22.78,
		percentiles: {
			p10: 35710,
			p90: 63180
		},
		employment: 131400,
		employmentYear: "2025",
		jobOutlookPct: 9,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 12300,
		projectionPeriod: "2025-35",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Educational services; state, local, and private",
				annualWage: 52200
			},
			{
				industry: "Veterinary services",
				annualWage: 47170
			},
			{
				industry: "Social advocacy organizations",
				annualWage: 45970
			},
			{
				industry: "Other personal services",
				annualWage: 44730
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Veterinary Technologists and Technicians",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/veterinary-technologists-and-technicians.htm",
		publishedDate: "2026-08-27"
	},
	"29-1122": {
		socCode: "29-1122",
		title: "Occupational Therapists",
		medianAnnual: 100330,
		medianHourly: 48.24,
		percentiles: {
			p10: 71690,
			p90: 131950
		},
		employment: 169600,
		employmentYear: "2025",
		jobOutlookPct: 15,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 25200,
		projectionPeriod: "2025-35",
		entryEducation: "Master's degree",
		industryWages: [
			{
				industry: "Home healthcare services",
				annualWage: 106300
			},
			{
				industry: "Nursing care facilities (skilled nursing facilities)",
				annualWage: 105850
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 102820
			},
			{
				industry: "Offices of physical, occupational and speech therapists, and audiologists",
				annualWage: 97940
			},
			{
				industry: "Educational services; state, local, and private",
				annualWage: 87300
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Occupational Therapists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/occupational-therapists.htm",
		publishedDate: "2026-08-27"
	},
	"11-3031": {
		socCode: "11-3031",
		title: "Financial Managers",
		medianAnnual: 166570,
		percentiles: {
			p10: 94310,
			p90: 323270
		},
		employment: 879700,
		employmentYear: "2025",
		jobOutlookPct: 10,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 84900,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Professional, scientific, and technical services",
				annualWage: 174170
			},
			{
				industry: "Management of companies and enterprises",
				annualWage: 172340
			},
			{
				industry: "Finance and insurance",
				annualWage: 169980
			},
			{
				industry: "Manufacturing",
				annualWage: 164400
			},
			{
				industry: "Government, excluding state and local education and hospitals",
				annualWage: 139810
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Financial Managers (covers controllers, treasurers, credit/cash/risk/insurance managers as one SOC group; BLS does not break out a controller-specific wage)",
		sourceUrl: "https://www.bls.gov/ooh/management/financial-managers.htm",
		publishedDate: "2026-08-27",
		medianHourly: 80.08
	},
	"35-3011": {
		socCode: "35-3011",
		title: "Bartenders",
		medianAnnual: 34341,
		medianHourly: 16.51,
		percentiles: {},
		employment: 762600,
		employmentYear: "2025",
		jobOutlookPct: 5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 37900,
		projectionPeriod: "2025-35",
		entryEducation: "No formal educational credential",
		industryWages: [],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Bartenders (BLS reports hourly wages only; medianAnnual is annualized from $16.51/hour using 2,080 hours/year for this site annual-wage schema; BLS percentile wage values remain hourly and are not stored as annual values)",
		sourceUrl: "https://www.bls.gov/ooh/food-preparation-and-serving/bartenders.htm",
		publishedDate: "2026-08-27"
	},
	"29-1020": {
		socCode: "29-1020",
		title: "Dentists",
		medianAnnual: 176110,
		medianHourly: 84.67,
		percentiles: {
			p10: 89100,
			p90: 337210
		},
		employment: 161400,
		employmentYear: "2025",
		jobOutlookPct: 6,
		jobOutlookLabel: "Faster than average",
		employmentChange: 9000,
		projectionPeriod: "2025-35",
		entryEducation: "Doctoral or professional degree",
		industryWages: [
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 219750
			},
			{
				industry: "Outpatient care centers",
				annualWage: 195330
			},
			{
				industry: "Offices of dentists",
				annualWage: 173760
			},
			{
				industry: "Offices of physicians",
				annualWage: 172980
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Dentists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/dentists.htm",
		publishedDate: "2026-08-27"
	},
	"23-1011": {
		socCode: "23-1011",
		title: "Lawyers",
		medianAnnual: 159670,
		percentiles: {
			p10: 78360,
			p90: 351600
		},
		employment: 863700,
		employmentYear: "2025",
		jobOutlookPct: 5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 40600,
		projectionPeriod: "2025-35",
		entryEducation: "Doctoral or professional degree",
		industryWages: [
			{
				industry: "Federal government",
				annualWage: 178380
			},
			{
				industry: "Legal services",
				annualWage: 157870
			},
			{
				industry: "Local government, excluding education and hospitals",
				annualWage: 131390
			},
			{
				industry: "State government, excluding education and hospitals",
				annualWage: 115330
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Lawyers",
		sourceUrl: "https://www.bls.gov/ooh/legal/lawyers.htm",
		publishedDate: "2026-08-27",
		medianHourly: 76.76
	},
	"29-1292": {
		socCode: "29-1292",
		title: "Dental Hygienists",
		medianAnnual: 98100,
		medianHourly: 47.16,
		percentiles: {
			p10: 74880,
			p90: 126050
		},
		employment: 225300,
		employmentYear: "2025",
		jobOutlookPct: 8,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 17900,
		projectionPeriod: "2025-35",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Offices of dentists",
				annualWage: 98280
			},
			{
				industry: "Offices of physicians",
				annualWage: 91160
			},
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 80830
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Dental Hygienists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/dental-hygienists.htm",
		publishedDate: "2026-08-27"
	},
	"15-2011": {
		socCode: "15-2011",
		title: "Actuaries",
		medianAnnual: 130000,
		percentiles: {
			p10: 78570,
			p90: 215100
		},
		employment: 31200,
		employmentYear: "2025",
		jobOutlookPct: 9,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 2900,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Finance and insurance",
				annualWage: 131450
			},
			{
				industry: "Management of companies and enterprises",
				annualWage: 129810
			},
			{
				industry: "Government, excluding state and local education and hospitals",
				annualWage: 129650
			},
			{
				industry: "Professional, scientific, and technical services",
				annualWage: 124130
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Actuaries",
		sourceUrl: "https://www.bls.gov/ooh/math/actuaries.htm",
		publishedDate: "2026-08-27",
		medianHourly: 62.5
	},
	"29-1051": {
		socCode: "29-1051",
		title: "Pharmacists",
		medianAnnual: 140910,
		medianHourly: 67.75,
		percentiles: {
			p10: 99290,
			p90: 174230
		},
		employment: 325200,
		employmentYear: "2025",
		jobOutlookPct: 5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 17100,
		projectionPeriod: "2025-35",
		entryEducation: "Doctoral or professional degree (PharmD)",
		industryWages: [
			{
				industry: "Hospitals (state, local, private)",
				annualWage: 157290
			},
			{
				industry: "Ambulatory healthcare services",
				annualWage: 153920
			},
			{
				industry: "General merchandise retailers",
				annualWage: 151370
			},
			{
				industry: "Pharmacies and drug retailers",
				annualWage: 132940
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Pharmacists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/pharmacists.htm",
		publishedDate: "2026-09-17",
		stateWages: [
			{
				state: "Alaska",
				stateAbbr: "AK",
				annualMedian: 167310,
				annualPct10: 133830,
				annualPct90: 196020
			},
			{
				state: "Oregon",
				stateAbbr: "OR",
				annualMedian: 165960,
				annualPct10: 126040,
				annualPct90: 193860
			},
			{
				state: "California",
				stateAbbr: "CA",
				annualMedian: 164610,
				annualPct10: 90560,
				annualPct90: 213820
			},
			{
				state: "Hawaii",
				stateAbbr: "HI",
				annualMedian: 163220,
				annualPct10: 127410,
				annualPct90: 177290
			},
			{
				state: "Washington",
				stateAbbr: "WA",
				annualMedian: 160610,
				annualPct10: 126230,
				annualPct90: 205210
			},
			{
				state: "Minnesota",
				stateAbbr: "MN",
				annualMedian: 159740,
				annualPct10: 98150,
				annualPct90: 174660
			},
			{
				state: "Colorado",
				stateAbbr: "CO",
				annualMedian: 156030,
				annualPct10: 120410,
				annualPct90: 188430
			},
			{
				state: "District of Columbia",
				stateAbbr: "DC",
				annualMedian: 153400,
				annualPct10: 64870,
				annualPct90: 196080
			},
			{
				state: "Delaware",
				stateAbbr: "DE",
				annualMedian: 152880,
				annualPct10: 103170,
				annualPct90: 178760
			},
			{
				state: "Wisconsin",
				stateAbbr: "WI",
				annualMedian: 148740,
				annualPct10: 112020,
				annualPct90: 178090
			},
			{
				state: "New Mexico",
				stateAbbr: "NM",
				annualMedian: 147000,
				annualPct10: 103500,
				annualPct90: 174200
			},
			{
				state: "Arizona",
				stateAbbr: "AZ",
				annualMedian: 146930,
				annualPct10: 103490,
				annualPct90: 171660
			},
			{
				state: "South Dakota",
				stateAbbr: "SD",
				annualMedian: 146790,
				annualPct10: 112200,
				annualPct90: 166340
			},
			{
				state: "Idaho",
				stateAbbr: "ID",
				annualMedian: 144900,
				annualPct10: 102180,
				annualPct90: 164050
			},
			{
				state: "Indiana",
				stateAbbr: "IN",
				annualMedian: 144290,
				annualPct10: 107050,
				annualPct90: 169360
			},
			{
				state: "Utah",
				stateAbbr: "UT",
				annualMedian: 144240,
				annualPct10: 70260,
				annualPct90: 172440
			},
			{
				state: "Virginia",
				stateAbbr: "VA",
				annualMedian: 144060,
				annualPct10: 106800,
				annualPct90: 173550
			},
			{
				state: "New Hampshire",
				stateAbbr: "NH",
				annualMedian: 143020,
				annualPct10: 98870,
				annualPct90: 170030
			},
			{
				state: "New York",
				stateAbbr: "NY",
				annualMedian: 142090,
				annualPct10: 92910,
				annualPct90: 174550
			},
			{
				state: "Montana",
				stateAbbr: "MT",
				annualMedian: 142080,
				annualPct10: 98660,
				annualPct90: 165260
			},
			{
				state: "North Dakota",
				stateAbbr: "ND",
				annualMedian: 142040,
				annualPct10: 105490,
				annualPct90: 167940
			},
			{
				state: "Connecticut",
				stateAbbr: "CT",
				annualMedian: 141290,
				annualPct10: 106660,
				annualPct90: 165360
			},
			{
				state: "Maine",
				stateAbbr: "ME",
				annualMedian: 140930,
				annualPct10: 101360,
				annualPct90: 166810
			},
			{
				state: "Nevada",
				stateAbbr: "NV",
				annualMedian: 140030,
				annualPct10: 104000,
				annualPct90: 168600
			},
			{
				state: "Wyoming",
				stateAbbr: "WY",
				annualMedian: 139550,
				annualPct10: 115820,
				annualPct90: 168450
			},
			{
				state: "Nebraska",
				stateAbbr: "NE",
				annualMedian: 139330,
				annualPct10: 84990,
				annualPct90: 170090
			},
			{
				state: "Illinois",
				stateAbbr: "IL",
				annualMedian: 139080,
				annualPct10: 98970,
				annualPct90: 169430
			},
			{
				state: "Maryland",
				stateAbbr: "MD",
				annualMedian: 138990,
				annualPct10: 115860,
				annualPct90: 169890
			},
			{
				state: "Iowa",
				stateAbbr: "IA",
				annualMedian: 138860,
				annualPct10: 117450,
				annualPct90: 164520
			},
			{
				state: "North Carolina",
				stateAbbr: "NC",
				annualMedian: 138860,
				annualPct10: 101670,
				annualPct90: 169820
			},
			{
				state: "Texas",
				stateAbbr: "TX",
				annualMedian: 138260,
				annualPct10: 95950,
				annualPct90: 170170
			},
			{
				state: "Massachusetts",
				stateAbbr: "MA",
				annualMedian: 138170,
				annualPct10: 113710,
				annualPct90: 164500
			},
			{
				state: "Pennsylvania",
				stateAbbr: "PA",
				annualMedian: 138160,
				annualPct10: 112750,
				annualPct90: 163570
			},
			{
				state: "Michigan",
				stateAbbr: "MI",
				annualMedian: 137860,
				annualPct10: 101740,
				annualPct90: 168540
			},
			{
				state: "Kansas",
				stateAbbr: "KS",
				annualMedian: 137800,
				annualPct10: 78770,
				annualPct90: 169310
			},
			{
				state: "New Jersey",
				stateAbbr: "NJ",
				annualMedian: 137620,
				annualPct10: 112560,
				annualPct90: 172110
			},
			{
				state: "Missouri",
				stateAbbr: "MO",
				annualMedian: 137610,
				annualPct10: 107530,
				annualPct90: 166840
			},
			{
				state: "Georgia",
				stateAbbr: "GA",
				annualMedian: 137120,
				annualPct10: 100950,
				annualPct90: 170110
			},
			{
				state: "Ohio",
				stateAbbr: "OH",
				annualMedian: 137020,
				annualPct10: 65470,
				annualPct90: 165900
			},
			{
				state: "Kentucky",
				stateAbbr: "KY",
				annualMedian: 136530,
				annualPct10: 84280,
				annualPct90: 168940
			},
			{
				state: "Vermont",
				stateAbbr: "VT",
				annualMedian: 136270,
				annualPct10: 117860,
				annualPct90: 164370
			},
			{
				state: "Arkansas",
				stateAbbr: "AR",
				annualMedian: 136060,
				annualPct10: 105560,
				annualPct90: 164940
			},
			{
				state: "Florida",
				stateAbbr: "FL",
				annualMedian: 135970,
				annualPct10: 56000,
				annualPct90: 166310
			},
			{
				state: "South Carolina",
				stateAbbr: "SC",
				annualMedian: 135700,
				annualPct10: 82430,
				annualPct90: 170270
			},
			{
				state: "Oklahoma",
				stateAbbr: "OK",
				annualMedian: 135140,
				annualPct10: 100320,
				annualPct90: 162070
			},
			{
				state: "Alabama",
				stateAbbr: "AL",
				annualMedian: 134630,
				annualPct10: 90010,
				annualPct90: 161940
			},
			{
				state: "West Virginia",
				stateAbbr: "WV",
				annualMedian: 133430,
				annualPct10: 80900,
				annualPct90: 166020
			},
			{
				state: "Tennessee",
				stateAbbr: "TN",
				annualMedian: 133390,
				annualPct10: 88700,
				annualPct90: 164430
			},
			{
				state: "Mississippi",
				stateAbbr: "MS",
				annualMedian: 133230,
				annualPct10: 97260,
				annualPct90: 158230
			},
			{
				state: "Louisiana",
				stateAbbr: "LA",
				annualMedian: 132410,
				annualPct10: 100920,
				annualPct90: 156740
			},
			{
				state: "Rhode Island",
				stateAbbr: "RI",
				annualMedian: 128180,
				annualPct10: 86650,
				annualPct90: 161090
			}
		],
		stateWagesSourceUrl: "https://www.bls.gov/oes/special-requests/oesm25st.zip",
		stateWagesDataYear: "May 2025"
	},
	"29-1123": {
		socCode: "29-1123",
		title: "Physical Therapists",
		medianAnnual: 102760,
		medianHourly: 49.4,
		percentiles: {
			p10: 77140,
			p90: 135140
		},
		employment: 283700,
		employmentYear: "2025",
		jobOutlookPct: 12,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 33800,
		projectionPeriod: "2025-35",
		entryEducation: "Doctoral or professional degree (DPT)",
		industryWages: [
			{
				industry: "Home healthcare services",
				annualWage: 114740
			},
			{
				industry: "Nursing and residential care facilities",
				annualWage: 110460
			},
			{
				industry: "Hospitals (state, local, private)",
				annualWage: 106800
			},
			{
				industry: "Offices of physical, occupational and speech therapists",
				annualWage: 97160
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Physical Therapists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/physical-therapists.htm",
		publishedDate: "2026-08-27"
	},
	"29-1071": {
		socCode: "29-1071",
		title: "Physician Assistants",
		medianAnnual: 135880,
		medianHourly: 65.33,
		percentiles: {
			p10: 99380,
			p90: 190280
		},
		employment: 168900,
		employmentYear: "2025",
		jobOutlookPct: 21,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 35700,
		projectionPeriod: "2025-35",
		entryEducation: "Master's degree",
		industryWages: [
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 157040
			},
			{
				industry: "Outpatient care centers",
				annualWage: 153500
			},
			{
				industry: "Hospitals (state, local, private)",
				annualWage: 141150
			},
			{
				industry: "Educational services (state, local, private)",
				annualWage: 134770
			},
			{
				industry: "Offices of physicians",
				annualWage: 132000
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Physician Assistants",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/physician-assistants.htm",
		publishedDate: "2026-08-27"
	},
	"23-2011": {
		socCode: "23-2011",
		title: "Paralegals and Legal Assistants",
		medianAnnual: 62890,
		percentiles: {
			p10: 44740,
			p90: 101500
		},
		employment: 404900,
		employmentYear: "2025",
		jobOutlookPct: 0,
		jobOutlookLabel: "Little or no change",
		employmentChange: -1100,
		projectionPeriod: "2025-35",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Federal government, excluding postal service",
				annualWage: 81470
			},
			{
				industry: "Finance and insurance",
				annualWage: 80120
			},
			{
				industry: "Local government, excluding education and hospitals",
				annualWage: 63370
			},
			{
				industry: "Legal services",
				annualWage: 61770
			},
			{
				industry: "State government, excluding education and hospitals",
				annualWage: 59320
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Paralegals and Legal Assistants",
		sourceUrl: "https://www.bls.gov/ooh/legal/paralegals-and-legal-assistants.htm",
		publishedDate: "2026-08-27",
		medianHourly: 30.24
	},
	"29-2032": {
		socCode: "29-2032",
		title: "Diagnostic Medical Sonographers",
		medianAnnual: 96590,
		medianHourly: 46.44,
		percentiles: {
			p10: 67820,
			p90: 129370
		},
		employment: 92200,
		employmentYear: "2025",
		jobOutlookPct: 12,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 12900,
		projectionPeriod: "2025-35",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Outpatient care centers",
				annualWage: 127940
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 97390
			},
			{
				industry: "Offices of physicians",
				annualWage: 95220
			},
			{
				industry: "Medical and diagnostic laboratories",
				annualWage: 87580
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Diagnostic Medical Sonographers",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/diagnostic-medical-sonographers.htm",
		publishedDate: "2026-08-27"
	},
	"31-9097": {
		socCode: "31-9097",
		title: "Phlebotomists",
		medianAnnual: 45230,
		medianHourly: 21.75,
		percentiles: {
			p10: 35780,
			p90: 58780
		},
		employment: 143900,
		employmentYear: "2025",
		jobOutlookPct: 7,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 9800,
		projectionPeriod: "2025-35",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Outpatient care centers",
				annualWage: 48030
			},
			{
				industry: "Medical and diagnostic laboratories",
				annualWage: 46670
			},
			{
				industry: "Offices of physicians",
				annualWage: 44500
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 44220
			},
			{
				industry: "All other ambulatory healthcare services",
				annualWage: 39930
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Phlebotomists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/phlebotomists.htm",
		publishedDate: "2026-08-27"
	},
	"29-2034": {
		socCode: "29-2034",
		title: "Radiologic Technologists and Technicians",
		medianAnnual: 80110,
		percentiles: {
			p10: 55980,
			p90: 118660
		},
		employment: 234200,
		employmentYear: "2025",
		jobOutlookPct: 5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 11800,
		projectionPeriod: "2025-35",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Federal government (excl. postal service)",
				annualWage: 97490
			},
			{
				industry: "Outpatient care centers",
				annualWage: 84720
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 80650
			},
			{
				industry: "Medical and diagnostic laboratories",
				annualWage: 78400
			},
			{
				industry: "Offices of physicians",
				annualWage: 74540
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Radiologic and MRI Technologists (SOC-specific wage and projection figures; combined Quick Facts hourly figure omitted)",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/radiologic-technologists.htm",
		publishedDate: "2026-08-27",
		stateWages: [
			{
				state: "California",
				stateAbbr: "CA",
				annualMedian: 121260,
				annualPct10: 70210,
				annualPct90: 165460
			},
			{
				state: "Massachusetts",
				stateAbbr: "MA",
				annualMedian: 103620,
				annualPct10: 75350,
				annualPct90: 131940
			},
			{
				state: "District of Columbia",
				stateAbbr: "DC",
				annualMedian: 102770,
				annualPct10: 59130,
				annualPct90: 128120
			},
			{
				state: "Oregon",
				stateAbbr: "OR",
				annualMedian: 102290,
				annualPct10: 70760,
				annualPct90: 124810
			},
			{
				state: "Washington",
				stateAbbr: "WA",
				annualMedian: 102090,
				annualPct10: 66570,
				annualPct90: 132060
			},
			{
				state: "Hawaii",
				stateAbbr: "HI",
				annualMedian: 101700,
				annualPct10: 39150,
				annualPct90: 115440
			},
			{
				state: "Alaska",
				stateAbbr: "AK",
				annualMedian: 98920,
				annualPct10: 74210,
				annualPct90: 126860
			},
			{
				state: "New York",
				stateAbbr: "NY",
				annualMedian: 98470,
				annualPct10: 67540,
				annualPct90: 129310
			},
			{
				state: "New Jersey",
				stateAbbr: "NJ",
				annualMedian: 95000,
				annualPct10: 71770,
				annualPct90: 118410
			},
			{
				state: "Vermont",
				stateAbbr: "VT",
				annualMedian: 94540,
				annualPct10: 66960,
				annualPct90: 125230
			},
			{
				state: "Connecticut",
				stateAbbr: "CT",
				annualMedian: 91970,
				annualPct10: 68070,
				annualPct90: 122760
			},
			{
				state: "Arizona",
				stateAbbr: "AZ",
				annualMedian: 89200,
				annualPct10: 61510,
				annualPct90: 123410
			},
			{
				state: "Colorado",
				stateAbbr: "CO",
				annualMedian: 87760,
				annualPct10: 63270,
				annualPct90: 111730
			},
			{
				state: "Maryland",
				stateAbbr: "MD",
				annualMedian: 85890,
				annualPct10: 68140,
				annualPct90: 106260
			},
			{
				state: "Rhode Island",
				stateAbbr: "RI",
				annualMedian: 85330,
				annualPct10: 65840,
				annualPct90: 109640
			},
			{
				state: "New Hampshire",
				stateAbbr: "NH",
				annualMedian: 84910,
				annualPct10: 64620,
				annualPct90: 106370
			},
			{
				state: "Delaware",
				stateAbbr: "DE",
				annualMedian: 84210,
				annualPct10: 61770,
				annualPct90: 108980
			},
			{
				state: "Minnesota",
				stateAbbr: "MN",
				annualMedian: 83400,
				annualPct10: 67080,
				annualPct90: 106100
			},
			{
				state: "Nevada",
				stateAbbr: "NV",
				annualMedian: 82910,
				annualPct10: 65710,
				annualPct90: 121700
			},
			{
				state: "Utah",
				stateAbbr: "UT",
				annualMedian: 81000,
				annualPct10: 48150,
				annualPct90: 108070
			},
			{
				state: "Virginia",
				stateAbbr: "VA",
				annualMedian: 80670,
				annualPct10: 60000,
				annualPct90: 106170
			},
			{
				state: "Idaho",
				stateAbbr: "ID",
				annualMedian: 80080,
				annualPct10: 60540,
				annualPct90: 103580
			},
			{
				state: "Maine",
				stateAbbr: "ME",
				annualMedian: 80080,
				annualPct10: 62210,
				annualPct90: 102640
			},
			{
				state: "New Mexico",
				stateAbbr: "NM",
				annualMedian: 79940,
				annualPct10: 59560,
				annualPct90: 104120
			},
			{
				state: "Illinois",
				stateAbbr: "IL",
				annualMedian: 79930,
				annualPct10: 59350,
				annualPct90: 104210
			},
			{
				state: "Wisconsin",
				stateAbbr: "WI",
				annualMedian: 79140,
				annualPct10: 61870,
				annualPct90: 99420
			},
			{
				state: "Texas",
				stateAbbr: "TX",
				annualMedian: 78630,
				annualPct10: 48550,
				annualPct90: 102630
			},
			{
				state: "Ohio",
				stateAbbr: "OH",
				annualMedian: 78320,
				annualPct10: 60360,
				annualPct90: 98450
			},
			{
				state: "Wyoming",
				stateAbbr: "WY",
				annualMedian: 77860,
				annualPct10: 56750,
				annualPct90: 104790
			},
			{
				state: "Indiana",
				stateAbbr: "IN",
				annualMedian: 77640,
				annualPct10: 51090,
				annualPct90: 99580
			},
			{
				state: "Montana",
				stateAbbr: "MT",
				annualMedian: 77070,
				annualPct10: 55750,
				annualPct90: 91650
			},
			{
				state: "Florida",
				stateAbbr: "FL",
				annualMedian: 76750,
				annualPct10: 51390,
				annualPct90: 99020
			},
			{
				state: "Michigan",
				stateAbbr: "MI",
				annualMedian: 76420,
				annualPct10: 55450,
				annualPct90: 97250
			},
			{
				state: "Kansas",
				stateAbbr: "KS",
				annualMedian: 76070,
				annualPct10: 50940,
				annualPct90: 98320
			},
			{
				state: "Pennsylvania",
				stateAbbr: "PA",
				annualMedian: 76050,
				annualPct10: 56430,
				annualPct90: 97740
			},
			{
				state: "Georgia",
				stateAbbr: "GA",
				annualMedian: 74550,
				annualPct10: 49730,
				annualPct90: 102840
			},
			{
				state: "North Carolina",
				stateAbbr: "NC",
				annualMedian: 74450,
				annualPct10: 52860,
				annualPct90: 99210
			},
			{
				state: "Oklahoma",
				stateAbbr: "OK",
				annualMedian: 74160,
				annualPct10: 49920,
				annualPct90: 96880
			},
			{
				state: "West Virginia",
				stateAbbr: "WV",
				annualMedian: 74150,
				annualPct10: 56270,
				annualPct90: 95510
			},
			{
				state: "Missouri",
				stateAbbr: "MO",
				annualMedian: 73080,
				annualPct10: 50810,
				annualPct90: 97150
			},
			{
				state: "Nebraska",
				stateAbbr: "NE",
				annualMedian: 72860,
				annualPct10: 54410,
				annualPct90: 98300
			},
			{
				state: "Kentucky",
				stateAbbr: "KY",
				annualMedian: 69670,
				annualPct10: 51740,
				annualPct90: 99170
			},
			{
				state: "South Carolina",
				stateAbbr: "SC",
				annualMedian: 69600,
				annualPct10: 51860,
				annualPct90: 96020
			},
			{
				state: "North Dakota",
				stateAbbr: "ND",
				annualMedian: 67790,
				annualPct10: 60600,
				annualPct90: 93870
			},
			{
				state: "Iowa",
				stateAbbr: "IA",
				annualMedian: 65930,
				annualPct10: 54360,
				annualPct90: 86520
			},
			{
				state: "South Dakota",
				stateAbbr: "SD",
				annualMedian: 65240,
				annualPct10: 48730,
				annualPct90: 89710
			},
			{
				state: "Tennessee",
				stateAbbr: "TN",
				annualMedian: 64630,
				annualPct10: 50540,
				annualPct90: 90790
			},
			{
				state: "Louisiana",
				stateAbbr: "LA",
				annualMedian: 63680,
				annualPct10: 50030,
				annualPct90: 82830
			},
			{
				state: "Arkansas",
				stateAbbr: "AR",
				annualMedian: 63640,
				annualPct10: 46810,
				annualPct90: 94180
			},
			{
				state: "Alabama",
				stateAbbr: "AL",
				annualMedian: 60700,
				annualPct10: 41060,
				annualPct90: 80300
			},
			{
				state: "Mississippi",
				stateAbbr: "MS",
				annualMedian: 59300,
				annualPct10: 40740,
				annualPct90: 78090
			}
		],
		stateWagesSourceUrl: "https://www.bls.gov/oes/special-requests/oesm25st.zip",
		stateWagesDataYear: "May 2025"
	},
	"53-2031": {
		socCode: "53-2031",
		title: "Flight Attendants",
		medianAnnual: 63580,
		percentiles: {
			p10: 35110,
			p90: 136430
		},
		employment: 133700,
		employmentYear: "2025",
		jobOutlookPct: 9,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 11800,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Nonscheduled air transportation",
				annualWage: 70700
			},
			{
				industry: "Scheduled air transportation",
				annualWage: 63570
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Flight Attendants",
		sourceUrl: "https://www.bls.gov/ooh/transportation-and-material-moving/flight-attendants.htm",
		publishedDate: "2026-09-13"
	},
	"29-1151": {
		socCode: "29-1151",
		title: "Nurse Anesthetists",
		medianAnnual: 236590,
		percentiles: {},
		employment: 54500,
		employmentYear: "2025",
		jobOutlookPct: 10,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 5300,
		projectionPeriod: "2025-35",
		entryEducation: "Master's degree",
		industryWages: [],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Nurse Anesthetists, Nurse Midwives, and Nurse Practitioners",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners.htm",
		publishedDate: "2026-08-27"
	},
	"35-1011": {
		socCode: "35-1011",
		title: "Chefs and Head Cooks",
		medianAnnual: 62470,
		percentiles: {
			p10: 37900,
			p90: 98560
		},
		employment: 220300,
		employmentYear: "2025",
		jobOutlookPct: 7,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 14400,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Traveler accommodation",
				annualWage: 74380
			},
			{
				industry: "Amusement, gambling, and recreation industries",
				annualWage: 72830
			},
			{
				industry: "Food services and drinking places",
				annualWage: 60580
			},
			{
				industry: "Healthcare and social assistance",
				annualWage: 59550
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Chefs and Head Cooks",
		sourceUrl: "https://www.bls.gov/ooh/food-preparation-and-serving/chefs-and-head-cooks.htm",
		publishedDate: "2026-08-27",
		medianHourly: 30.03
	},
	"29-2055": {
		socCode: "29-2055",
		title: "Surgical Technologists",
		medianAnnual: 64650,
		percentiles: {
			p10: 45940,
			p90: 96940
		},
		employment: 118400,
		employmentYear: "2025",
		jobOutlookPct: 5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 5900,
		projectionPeriod: "2025-35",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 65020
			},
			{
				industry: "Outpatient care centers",
				annualWage: 64670
			},
			{
				industry: "Offices of physicians",
				annualWage: 64590
			},
			{
				industry: "Administrative and support services",
				annualWage: 62400
			},
			{
				industry: "Offices of dentists",
				annualWage: 48190
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Surgical Assistants and Technologists (SOC-specific projection row; combined-page wage percentiles and industry medians omitted)",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/surgical-technologists.htm",
		publishedDate: "2026-08-27"
	},
	"29-2052": {
		socCode: "29-2052",
		title: "Pharmacy Technicians",
		medianAnnual: 45750,
		medianHourly: 22,
		percentiles: {
			p10: 36020,
			p90: 61040
		},
		employment: 471200,
		employmentYear: "2025",
		jobOutlookPct: 6,
		jobOutlookLabel: "Faster than average",
		employmentChange: 30100,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 50760
			},
			{
				industry: "Ambulatory healthcare services",
				annualWage: 48860
			},
			{
				industry: "General merchandise retailers",
				annualWage: 48150
			},
			{
				industry: "Grocery and specialty food retailers",
				annualWage: 41430
			},
			{
				industry: "Pharmacies and drug retailers",
				annualWage: 39240
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Pharmacy Technicians",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/pharmacy-technicians.htm",
		publishedDate: "2026-08-27"
	},
	"29-1171": {
		socCode: "29-1171",
		title: "Nurse Practitioners",
		medianAnnual: 132300,
		percentiles: {},
		employment: 336300,
		employmentYear: "2025",
		jobOutlookPct: 41,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 137800,
		projectionPeriod: "2025-35",
		entryEducation: "Master's degree",
		industryWages: [],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Nurse Anesthetists, Nurse Midwives, and Nurse Practitioners",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners.htm",
		publishedDate: "2026-08-27"
	},
	"31-9091": {
		socCode: "31-9091",
		title: "Dental Assistants",
		medianAnnual: 48070,
		medianHourly: 23.11,
		percentiles: {
			p10: 37130,
			p90: 62250
		},
		employment: 388600,
		employmentYear: "2025",
		jobOutlookPct: 7,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 28800,
		projectionPeriod: "2025-35",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Government, excluding state and local education and hospitals",
				annualWage: 55270
			},
			{
				industry: "Offices of dentists",
				annualWage: 48000
			},
			{
				industry: "Offices of physicians",
				annualWage: 47310
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Dental Assistants",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/dental-assistants.htm",
		publishedDate: "2026-08-27"
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
		medianAnnual: 82280,
		medianHourly: 39.56,
		percentiles: {
			p10: 63660,
			p90: 118050
		},
		employment: 142000,
		employmentYear: "2025",
		jobOutlookPct: 9,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 12100,
		projectionPeriod: "2025-35",
		entryEducation: "Associate's degree",
		industryWages: [
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 82730
			},
			{
				industry: "Nursing care facilities (skilled nursing facilities)",
				annualWage: 79270
			},
			{
				industry: "Offices of physicians",
				annualWage: 77890
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Respiratory Therapists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/respiratory-therapists.htm",
		publishedDate: "2026-08-27"
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
		publishedDate: "2026-09-04",
		stateWages: [
			{
				state: "Oregon",
				stateAbbr: "OR",
				annualMedian: 101310,
				annualPct10: 59550,
				annualPct90: 131530
			},
			{
				state: "Illinois",
				stateAbbr: "IL",
				annualMedian: 99560,
				annualPct10: 49240,
				annualPct90: 123660
			},
			{
				state: "Hawaii",
				stateAbbr: "HI",
				annualMedian: 96460,
				annualPct10: 45730,
				annualPct90: 124590
			},
			{
				state: "Washington",
				stateAbbr: "WA",
				annualMedian: 95220,
				annualPct10: 52170,
				annualPct90: 133950
			},
			{
				state: "Alaska",
				stateAbbr: "AK",
				annualMedian: 89440,
				annualPct10: 58420,
				annualPct90: 123200
			},
			{
				state: "Massachusetts",
				stateAbbr: "MA",
				annualMedian: 79420,
				annualPct10: 46990,
				annualPct90: 128210
			},
			{
				state: "District of Columbia",
				stateAbbr: "DC",
				annualMedian: 78970,
				annualPct10: 51950,
				annualPct90: 125790
			},
			{
				state: "New York",
				stateAbbr: "NY",
				annualMedian: 78750,
				annualPct10: 45740,
				annualPct90: 131640
			},
			{
				state: "Minnesota",
				stateAbbr: "MN",
				annualMedian: 78160,
				annualPct10: 47480,
				annualPct90: 118820
			},
			{
				state: "Connecticut",
				stateAbbr: "CT",
				annualMedian: 77540,
				annualPct10: 47680,
				annualPct90: 104280
			},
			{
				state: "New Jersey",
				stateAbbr: "NJ",
				annualMedian: 77250,
				annualPct10: 48570,
				annualPct90: 130860
			},
			{
				state: "Montana",
				stateAbbr: "MT",
				annualMedian: 76760,
				annualPct10: 49130,
				annualPct90: 89510
			},
			{
				state: "Wisconsin",
				stateAbbr: "WI",
				annualMedian: 76540,
				annualPct10: 44830,
				annualPct90: 101770
			},
			{
				state: "Michigan",
				stateAbbr: "MI",
				annualMedian: 76270,
				annualPct10: 42980,
				annualPct90: 103120
			},
			{
				state: "California",
				stateAbbr: "CA",
				annualMedian: 76160,
				annualPct10: 46800,
				annualPct90: 140340
			},
			{
				state: "Wyoming",
				stateAbbr: "WY",
				annualMedian: 76120,
				annualPct10: 48240,
				annualPct90: 104000
			},
			{
				state: "Maine",
				stateAbbr: "ME",
				annualMedian: 75380,
				annualPct10: 54180,
				annualPct90: 115720
			},
			{
				state: "Rhode Island",
				stateAbbr: "RI",
				annualMedian: 74090,
				annualPct10: 42990,
				annualPct90: 102840
			},
			{
				state: "Nevada",
				stateAbbr: "NV",
				annualMedian: 73570,
				annualPct10: 46110,
				annualPct90: 121200
			},
			{
				state: "Maryland",
				stateAbbr: "MD",
				annualMedian: 73490,
				annualPct10: 46450,
				annualPct90: 118370
			},
			{
				state: "Indiana",
				stateAbbr: "IN",
				annualMedian: 68490,
				annualPct10: 43190,
				annualPct90: 99310
			},
			{
				state: "Pennsylvania",
				stateAbbr: "PA",
				annualMedian: 67600,
				annualPct10: 45600,
				annualPct90: 122620
			},
			{
				state: "Kansas",
				stateAbbr: "KS",
				annualMedian: 65860,
				annualPct10: 42660,
				annualPct90: 96830
			},
			{
				state: "North Dakota",
				stateAbbr: "ND",
				annualMedian: 65710,
				annualPct10: 46440,
				annualPct90: 101020
			},
			{
				state: "Missouri",
				stateAbbr: "MO",
				annualMedian: 65410,
				annualPct10: 43860,
				annualPct90: 104060
			},
			{
				state: "West Virginia",
				stateAbbr: "WV",
				annualMedian: 64810,
				annualPct10: 43620,
				annualPct90: 95140
			},
			{
				state: "Ohio",
				stateAbbr: "OH",
				annualMedian: 64700,
				annualPct10: 40750,
				annualPct90: 99280
			},
			{
				state: "Delaware",
				stateAbbr: "DE",
				annualMedian: 63700,
				annualPct10: 38280,
				annualPct90: 105340
			},
			{
				state: "Vermont",
				stateAbbr: "VT",
				annualMedian: 63430,
				annualPct10: 47470,
				annualPct90: 132080
			},
			{
				state: "Idaho",
				stateAbbr: "ID",
				annualMedian: 63000,
				annualPct10: 38830,
				annualPct90: 95470
			},
			{
				state: "Virginia",
				stateAbbr: "VA",
				annualMedian: 62900,
				annualPct10: 40780,
				annualPct90: 105720
			},
			{
				state: "New Hampshire",
				stateAbbr: "NH",
				annualMedian: 62840,
				annualPct10: 43190,
				annualPct90: 91850
			},
			{
				state: "Colorado",
				stateAbbr: "CO",
				annualMedian: 62230,
				annualPct10: 45520,
				annualPct90: 94160
			},
			{
				state: "Utah",
				stateAbbr: "UT",
				annualMedian: 62000,
				annualPct10: 39940,
				annualPct90: 89110
			},
			{
				state: "Louisiana",
				stateAbbr: "LA",
				annualMedian: 61540,
				annualPct10: 38750,
				annualPct90: 81810
			},
			{
				state: "South Dakota",
				stateAbbr: "SD",
				annualMedian: 61390,
				annualPct10: 44320,
				annualPct90: 80060
			},
			{
				state: "Tennessee",
				stateAbbr: "TN",
				annualMedian: 61090,
				annualPct10: 39600,
				annualPct90: 92160
			},
			{
				state: "Arizona",
				stateAbbr: "AZ",
				annualMedian: 61060,
				annualPct10: 45540,
				annualPct90: 89600
			},
			{
				state: "Oklahoma",
				stateAbbr: "OK",
				annualMedian: 61010,
				annualPct10: 37900,
				annualPct90: 92740
			},
			{
				state: "Iowa",
				stateAbbr: "IA",
				annualMedian: 60860,
				annualPct10: 39770,
				annualPct90: 89480
			},
			{
				state: "Mississippi",
				stateAbbr: "MS",
				annualMedian: 60860,
				annualPct10: 38200,
				annualPct90: 76540
			},
			{
				state: "Nebraska",
				stateAbbr: "NE",
				annualMedian: 60820,
				annualPct10: 40400,
				annualPct90: 94040
			},
			{
				state: "Kentucky",
				stateAbbr: "KY",
				annualMedian: 59720,
				annualPct10: 37110,
				annualPct90: 85260
			},
			{
				state: "South Carolina",
				stateAbbr: "SC",
				annualMedian: 58740,
				annualPct10: 44330,
				annualPct90: 77800
			},
			{
				state: "Texas",
				stateAbbr: "TX",
				annualMedian: 58570,
				annualPct10: 37920,
				annualPct90: 80300
			},
			{
				state: "New Mexico",
				stateAbbr: "NM",
				annualMedian: 58390,
				annualPct10: 36650,
				annualPct90: 86830
			},
			{
				state: "Georgia",
				stateAbbr: "GA",
				annualMedian: 58320,
				annualPct10: 37180,
				annualPct90: 84000
			},
			{
				state: "Florida",
				stateAbbr: "FL",
				annualMedian: 57250,
				annualPct10: 38190,
				annualPct90: 77180
			},
			{
				state: "North Carolina",
				stateAbbr: "NC",
				annualMedian: 56800,
				annualPct10: 40130,
				annualPct90: 75060
			},
			{
				state: "Alabama",
				stateAbbr: "AL",
				annualMedian: 55690,
				annualPct10: 37640,
				annualPct90: 78230
			},
			{
				state: "Arkansas",
				stateAbbr: "AR",
				annualMedian: 49070,
				annualPct10: 34910,
				annualPct90: 74460
			}
		],
		stateWagesSourceUrl: "https://www.bls.gov/oes/special-requests/oesm25st.zip",
		stateWagesDataYear: "May 2025"
	},
	"33-2011": {
		socCode: "33-2011",
		title: "Firefighters",
		medianAnnual: 59280,
		medianHourly: 28.5,
		percentiles: {
			p10: 34910,
			p90: 101040
		},
		employment: 355300,
		employmentYear: "2025",
		jobOutlookPct: 4,
		jobOutlookLabel: "As fast as average",
		employmentChange: 13100,
		projectionPeriod: "2025-35",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "State government, excluding education and hospitals",
				annualWage: 64980
			},
			{
				industry: "Federal government, excluding postal service",
				annualWage: 63270
			},
			{
				industry: "Local government, excluding education and hospitals",
				annualWage: 59850
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Firefighters",
		sourceUrl: "https://www.bls.gov/ooh/protective-service/firefighters.htm",
		publishedDate: "2026-09-14"
	},
	"47-2152": {
		socCode: "47-2152",
		title: "Plumbers, Pipefitters, and Steamfitters",
		medianAnnual: 63800,
		medianHourly: 30.67,
		percentiles: {
			p10: 44150,
			p90: 108420
		},
		employment: 510600,
		employmentYear: "2025",
		jobOutlookPct: 7,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 34500,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Government, excluding state and local education and hospitals",
				annualWage: 71660
			},
			{
				industry: "Manufacturing",
				annualWage: 65770
			},
			{
				industry: "Heavy and civil engineering construction",
				annualWage: 63270
			},
			{
				industry: "Plumbing, heating, and air-conditioning contractors",
				annualWage: 63010
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Plumbers, Pipefitters, and Steamfitters",
		sourceUrl: "https://www.bls.gov/ooh/construction-and-extraction/plumbers-pipefitters-and-steamfitters.htm",
		publishedDate: "2026-09-12"
	},
	"53-3032": {
		socCode: "53-3032",
		title: "Heavy and Tractor-trailer Truck Drivers",
		medianAnnual: 58640,
		percentiles: {
			p10: 40140,
			p90: 79380
		},
		employment: 2221200,
		employmentYear: "2025",
		jobOutlookPct: 4,
		jobOutlookLabel: "As fast as average",
		employmentChange: 83800,
		projectionPeriod: "2025-35",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Truck transportation",
				annualWage: 60320
			},
			{
				industry: "Wholesale trade",
				annualWage: 58550
			},
			{
				industry: "Manufacturing",
				annualWage: 56570
			},
			{
				industry: "Construction",
				annualWage: 56080
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Heavy and Tractor-trailer Truck Drivers",
		sourceUrl: "https://www.bls.gov/ooh/transportation-and-material-moving/heavy-and-tractor-trailer-truck-drivers.htm",
		publishedDate: "2026-08-27",
		medianHourly: 28.19
	},
	"51-4121": {
		socCode: "51-4121",
		title: "Welders, Cutters, Solderers, and Brazers",
		medianAnnual: 53750,
		medianHourly: 25.84,
		percentiles: {
			p10: 39240,
			p90: 77530
		},
		employment: 437700,
		employmentYear: "2025",
		jobOutlookPct: 2,
		jobOutlookLabel: "Slower than average",
		employmentChange: 10300,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Specialty trade contractors",
				annualWage: 59440
			},
			{
				industry: "Repair and maintenance",
				annualWage: 56080
			},
			{
				industry: "Manufacturing",
				annualWage: 51210
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Welders, Cutters, Solderers, and Brazers (data from May 2025, synced 2026-09-23, superseding the May 2024 figures cited when related pages were first published)",
		sourceUrl: "https://www.bls.gov/ooh/production/welders-cutters-solderers-and-brazers.htm",
		publishedDate: "2026-09-23"
	},
	"29-1141": {
		socCode: "29-1141",
		title: "Registered Nurses",
		medianAnnual: 97550,
		medianHourly: 46.9,
		percentiles: {
			p10: 68940,
			p90: 137470
		},
		employment: 3465400,
		employmentYear: "2025",
		jobOutlookPct: 6,
		jobOutlookLabel: "Faster than average",
		employmentChange: 194700,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Government (excl. state/local education, hospitals)",
				annualWage: 110780
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 100220
			},
			{
				industry: "Ambulatory healthcare services",
				annualWage: 91230
			},
			{
				industry: "Nursing and residential care facilities",
				annualWage: 84300
			},
			{
				industry: "Educational services; state, local, and private",
				annualWage: 78620
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Registered Nurses",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/registered-nurses.htm",
		publishedDate: "2026-08-27"
	},
	"49-9021": {
		socCode: "49-9021",
		title: "Heating, Air Conditioning, and Refrigeration Mechanics and Installers",
		medianAnnual: 61010,
		percentiles: {
			p10: 40050,
			p90: 95210
		},
		employment: 440900,
		employmentYear: "2025",
		jobOutlookPct: 11,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 48200,
		projectionPeriod: "2025-35",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Wholesale trade",
				annualWage: 71190
			},
			{
				industry: "Retail trade",
				annualWage: 62830
			},
			{
				industry: "Educational services; state, local, and private",
				annualWage: 62520
			},
			{
				industry: "Plumbing, heating, and air-conditioning contractors",
				annualWage: 60030
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Heating, Air Conditioning, and Refrigeration Mechanics and Installers",
		sourceUrl: "https://www.bls.gov/ooh/installation-maintenance-and-repair/heating-air-conditioning-and-refrigeration-mechanics-and-installers.htm",
		publishedDate: "2026-08-27",
		medianHourly: 29.33
	},
	"25-4022": {
		socCode: "25-4022",
		title: "Librarians and Media Collections Specialists",
		medianAnnual: 68270,
		percentiles: {
			p10: 43660,
			p90: 103990
		},
		employment: 142300,
		employmentYear: "2025",
		jobOutlookPct: 3,
		jobOutlookLabel: "As fast as average",
		employmentChange: 3600,
		projectionPeriod: "2025-35",
		entryEducation: "Master's degree",
		industryWages: [
			{
				industry: "Elementary and secondary schools; local",
				annualWage: 74710
			},
			{
				industry: "Colleges, universities, and professional schools; state",
				annualWage: 74490
			},
			{
				industry: "Colleges, universities, and professional schools; private",
				annualWage: 73700
			},
			{
				industry: "Local government, excluding education and hospitals",
				annualWage: 62860
			},
			{
				industry: "Web search portals, libraries, archives, and other information services",
				annualWage: 60360
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Librarians and Library Media Specialists",
		sourceUrl: "https://www.bls.gov/ooh/education-training-and-library/librarians.htm",
		publishedDate: "2026-08-27",
		medianHourly: 32.82
	},
	"19-3030": {
		socCode: "19-3030",
		title: "Psychologists",
		medianAnnual: 99110,
		percentiles: {
			p10: 59080,
			p90: 163380
		},
		employment: 209400,
		employmentYear: "2025",
		jobOutlookPct: 6,
		jobOutlookLabel: "Faster than average",
		employmentChange: 11600,
		projectionPeriod: "2025-35",
		entryEducation: "Master's or doctoral degree",
		industryWages: [
			{
				industry: "Government, excluding state and local education and hospitals",
				annualWage: 130960
			},
			{
				industry: "Ambulatory healthcare services",
				annualWage: 98590
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 96850
			},
			{
				industry: "Elementary and secondary schools; local",
				annualWage: 95230
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Psychologists",
		sourceUrl: "https://www.bls.gov/ooh/life-physical-and-social-science/psychologists.htm",
		publishedDate: "2026-08-27",
		medianHourly: 47.65
	},
	"21-1020": {
		socCode: "21-1020",
		title: "Social Workers",
		medianAnnual: 61780,
		percentiles: {
			p10: 42790,
			p90: 100090
		},
		employment: 816100,
		employmentYear: "2025",
		jobOutlookPct: 6,
		jobOutlookLabel: "Faster than average",
		employmentChange: 50400,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's or master's degree",
		industryWages: [
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 77440
			},
			{
				industry: "Educational services; state, local, and private",
				annualWage: 68850
			},
			{
				industry: "State and local government, excluding education and hospitals",
				annualWage: 65100
			},
			{
				industry: "Ambulatory healthcare services",
				annualWage: 63710
			},
			{
				industry: "Individual and family services",
				annualWage: 51980
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Social Workers",
		sourceUrl: "https://www.bls.gov/ooh/community-and-social-service/social-workers.htm",
		publishedDate: "2026-08-27",
		medianHourly: 29.7
	},
	"49-9051": {
		socCode: "49-9051",
		title: "Electrical Power-Line Installers and Repairers",
		medianAnnual: 95320,
		medianHourly: 45.83,
		percentiles: {
			p10: 51470,
			p90: 128690
		},
		employment: 131900,
		employmentYear: "2025",
		jobOutlookPct: 10,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 13600,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Federal government",
				annualWage: 111900
			},
			{
				industry: "Utilities",
				annualWage: 103060
			},
			{
				industry: "Local government, excluding education and hospitals",
				annualWage: 90060
			},
			{
				industry: "Specialty trade contractors",
				annualWage: 76980
			},
			{
				industry: "Utility system construction",
				annualWage: 76060
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Electrical Power-Line Installers and Repairers (data from May 2025, synced 2026-09-23, superseding the May 2024 figures cited when related pages were first published)",
		sourceUrl: "https://www.bls.gov/ooh/installation-maintenance-and-repair/line-installers-and-repairers.htm",
		publishedDate: "2026-09-23"
	},
	"13-2011": {
		socCode: "13-2011",
		title: "Accountants and Auditors",
		medianAnnual: 83680,
		percentiles: {
			p10: 56020,
			p90: 144090
		},
		employment: 1595200,
		employmentYear: "2025",
		jobOutlookPct: 5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 79400,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Finance and insurance",
				annualWage: 93290
			},
			{
				industry: "Management of companies and enterprises",
				annualWage: 91940
			},
			{
				industry: "Government, excluding state and local education and hospitals",
				annualWage: 83350
			},
			{
				industry: "Accounting, tax preparation, bookkeeping, and payroll services",
				annualWage: 81490
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Accountants and Auditors",
		sourceUrl: "https://www.bls.gov/ooh/business-and-financial/accountants-and-auditors.htm",
		publishedDate: "2026-08-27",
		medianHourly: 40.23
	},
	"15-1252": {
		socCode: "15-1252",
		title: "Software Developers",
		medianAnnual: 135980,
		percentiles: {
			p10: 82460,
			p90: 214670
		},
		employment: 1717800,
		employmentYear: "2025",
		jobOutlookPct: 10,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 174700,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Software publishers",
				annualWage: 164550
			},
			{
				industry: "Manufacturing",
				annualWage: 136330
			},
			{
				industry: "Management of companies and enterprises",
				annualWage: 135680
			},
			{
				industry: "Finance and insurance",
				annualWage: 135460
			},
			{
				industry: "Computer systems design and related services",
				annualWage: 132050
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Software Developers, Quality Assurance Analysts, and Testers",
		sourceUrl: "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm",
		publishedDate: "2026-08-27"
	},
	"27-3092": {
		socCode: "27-3092",
		title: "Court Reporters and Simultaneous Captioners",
		medianAnnual: 72420,
		percentiles: {
			p10: 42130,
			p90: 130560
		},
		employment: 19900,
		employmentYear: "2025",
		jobOutlookPct: 0,
		jobOutlookLabel: "Little or no change",
		employmentChange: 0,
		projectionPeriod: "2025-35",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Local government, excluding education and hospitals",
				annualWage: 78430
			},
			{
				industry: "State government, excluding education and hospitals",
				annualWage: 78300
			},
			{
				industry: "Business support services",
				annualWage: 58760
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Court Reporters and Simultaneous Captioners",
		sourceUrl: "https://www.bls.gov/ooh/legal/court-reporters.htm",
		publishedDate: "2026-08-27",
		medianHourly: 34.82
	},
	"49-9044": {
		socCode: "49-9044",
		title: "Millwrights",
		medianAnnual: 65700,
		percentiles: {},
		employment: 40700,
		employmentYear: "2025",
		jobOutlookPct: 1,
		jobOutlookLabel: "Little or no change",
		employmentChange: 400,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		industryWages: [],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Industrial Machinery Mechanics, Machinery Maintenance Workers, and Millwrights (SOC 49-9044 covers millwrights specifically; BLS breaks out a millwright-specific median annual wage ($65,700) and employment figure (40,700 in 2025, projected 41,000 in 2035, a 1% / +400 change) in its Pay and Job Outlook tables, but publishes 10th/90th percentiles and industry-level wages only for the combined three-title group ($45,760-$94,530; Manufacturing $65,220 top industry), not broken out for millwrights alone -- percentiles and industryWages are left empty here rather than populated with the combined-group figures, so the auto-rendered chart/table on this page never mislabels group-level data as millwright-specific; the combined-group percentile and industry figures are still reported, with that caveat, in the article prose. Re-verified 2026-09-23 against the live BLS OOH page, superseding the May 2024 figures cited when related pages were first published.)",
		sourceUrl: "https://www.bls.gov/ooh/installation-maintenance-and-repair/industrial-machinery-mechanics-and-maintenance-workers-and-millwrights.htm",
		publishedDate: "2026-09-23"
	},
	"29-2043": {
		socCode: "29-2043",
		title: "Paramedics",
		medianAnnual: 60600,
		percentiles: {
			p10: 44230,
			p90: 84850
		},
		employment: 102200,
		employmentYear: "2025",
		jobOutlookPct: 6,
		jobOutlookLabel: "Faster than average",
		employmentChange: 5800,
		projectionPeriod: "2025-35",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Local government, excluding education and hospitals",
				annualWage: 61980
			},
			{
				industry: "General medical and surgical hospitals; private",
				annualWage: 61370
			},
			{
				industry: "Ambulance services",
				annualWage: 60040
			},
			{
				industry: "General medical and surgical hospitals; local",
				annualWage: 59260
			},
			{
				industry: "Offices of physicians",
				annualWage: 55900
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: EMTs and Paramedics (paramedic-specific median and projection row; Quick Facts outlook openings and entry education remain combined-group figures)",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm",
		publishedDate: "2026-08-27"
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
		medianAnnual: 81370,
		percentiles: {
			p10: 55530,
			p90: 145160
		},
		employment: 125600,
		employmentYear: "2025",
		jobOutlookPct: -4,
		jobOutlookLabel: "Decline",
		employmentChange: -4800,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Direct health and medical insurance carriers",
				annualWage: 91290
			},
			{
				industry: "Credit intermediation and related activities",
				annualWage: 86690
			},
			{
				industry: "Other insurance related activities",
				annualWage: 81340
			},
			{
				industry: "Insurance agencies and brokerages",
				annualWage: 80740
			},
			{
				industry: "Direct insurance (except life, health, and medical) carriers",
				annualWage: 80210
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Insurance Underwriters",
		sourceUrl: "https://www.bls.gov/ooh/business-and-financial/insurance-underwriters.htm",
		publishedDate: "2026-08-27",
		medianHourly: 39.12
	},
	"43-3031": {
		socCode: "43-3031",
		title: "Bookkeeping, Accounting, and Auditing Clerks",
		medianAnnual: 50670,
		percentiles: {
			p10: 36000,
			p90: 74550
		},
		employment: 1532400,
		employmentYear: "2025",
		jobOutlookPct: -6,
		jobOutlookLabel: "Decline",
		employmentChange: -85600,
		projectionPeriod: "2025-35",
		entryEducation: "Some college, no degree",
		industryWages: [
			{
				industry: "Construction",
				annualWage: 54890
			},
			{
				industry: "Professional, scientific, and technical services",
				annualWage: 51880
			},
			{
				industry: "Wholesale trade",
				annualWage: 50660
			},
			{
				industry: "Healthcare and social assistance",
				annualWage: 49860
			},
			{
				industry: "Retail trade",
				annualWage: 45830
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Bookkeeping, Accounting, and Auditing Clerks",
		sourceUrl: "https://www.bls.gov/ooh/office-and-administrative-support/bookkeeping-accounting-and-auditing-clerks.htm",
		publishedDate: "2026-08-27",
		medianHourly: 24.36
	},
	"11-1011": {
		socCode: "11-1011",
		title: "Chief Executives",
		medianAnnual: 213990,
		percentiles: {
			p10: 75700,
			p90: 507730
		},
		employment: 291600,
		employmentYear: "2025",
		jobOutlookPct: 3,
		jobOutlookLabel: "Faster than average",
		employmentChange: 9300,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Management of companies and enterprises",
				annualWage: 358310
			},
			{
				industry: "Professional, scientific, and technical services",
				annualWage: 237180
			},
			{
				industry: "Healthcare and social assistance",
				annualWage: 197090
			},
			{
				industry: "Government, excluding state and local education and hospitals",
				annualWage: 146700
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Top Executives (chief-executive-specific median, industry wage, and SOC projection row)",
		sourceUrl: "https://www.bls.gov/ooh/management/top-executives.htm",
		publishedDate: "2026-08-27",
		medianHourly: 102.88
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
	},
	"29-2011": {
		socCode: "29-2011",
		title: "Clinical Laboratory Technologists and Technicians",
		medianAnnual: 62930,
		medianHourly: 30.26,
		percentiles: {
			p10: 38910,
			p90: 100990
		},
		employment: 343000,
		employmentYear: "2025",
		jobOutlookPct: 3,
		jobOutlookLabel: "As fast as average",
		employmentChange: 9400,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "General medical and surgical hospitals; private",
				annualWage: 69190
			},
			{
				industry: "Educational services; state, local, and private",
				annualWage: 63690
			},
			{
				industry: "Medical and diagnostic laboratories",
				annualWage: 58320
			},
			{
				industry: "Offices of physicians",
				annualWage: 56850
			},
			{
				industry: "Other ambulatory healthcare services",
				annualWage: 48140
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Clinical Laboratory Technologists and Technicians",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/clinical-laboratory-technologists-and-technicians.htm",
		publishedDate: "2026-08-27"
	},
	"29-2036": {
		socCode: "29-2036",
		title: "Medical Dosimetrists",
		medianAnnual: 147470,
		medianHourly: 70.9,
		percentiles: {
			p10: 111670,
			p90: 185450
		},
		employment: 3500,
		employmentYear: "2025",
		jobOutlookPct: 5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 200,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Outpatient care centers",
				annualWage: 174400
			},
			{
				industry: "Offices of physicians",
				annualWage: 148190
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 147010
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Medical Dosimetrists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/medical-dosimetrists.htm",
		publishedDate: "2026-08-27"
	},
	"29-9092": {
		socCode: "29-9092",
		title: "Genetic Counselors",
		medianAnnual: 100040,
		medianHourly: 48.09,
		percentiles: {
			p10: 78270,
			p90: 138760
		},
		employment: 4200,
		employmentYear: "2025",
		jobOutlookPct: 10,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 400,
		projectionPeriod: "2025-35",
		entryEducation: "Master's degree",
		industryWages: [
			{
				industry: "Outpatient care centers",
				annualWage: 143620
			},
			{
				industry: "Medical and diagnostic laboratories",
				annualWage: 108640
			},
			{
				industry: "Colleges, universities, and professional schools; private",
				annualWage: 106710
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 102140
			},
			{
				industry: "Offices of physicians",
				annualWage: 94380
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Genetic Counselors",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/genetic-counselors.htm",
		publishedDate: "2026-08-27"
	},
	"29-1223": {
		socCode: "29-1223",
		title: "Psychiatrists",
		medianAnnual: 281870,
		percentiles: {},
		employment: 30000,
		employmentYear: "2025",
		jobOutlookPct: 7,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 2100,
		projectionPeriod: "2025-35",
		entryEducation: "Doctoral or professional degree",
		industryWages: [],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Physicians and Surgeons (accessed 2026-09-12 via direct fetch with a UA string carrying a declared contact URL, returned 200, last modified August 27, 2026). Psychiatrists (SOC 29-1223) is one of 17 detailed titles BLS tracks within the combined \"Physicians and Surgeons\" page. The employment table gives psychiatrist-specific figures (30,000 jobs in 2025, projected 32,100 by 2035, 7% growth, +2,100 change) and the Pay section gives a psychiatrist-specific median annual wage ($281,870, May 2025) in its by-title breakdown -- both used here. But BLS gives only one blended entry-level-education value (Doctoral or professional degree) and one blended percentile range (10th percentile $76,560, 90th percentile $488,320+) for physicians and surgeons overall, not broken out by specialty; percentiles is left empty rather than populated with the blended figure, and entryEducation uses the blended value since an MD/DO is required for every physician specialty regardless. BLS does not publish an industry-specific wage table for psychiatrists on this page, so industryWages is empty.",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/physicians-and-surgeons.htm",
		publishedDate: "2026-08-27"
	},
	"29-1127": {
		socCode: "29-1127",
		title: "Speech-Language Pathologists",
		medianAnnual: 97870,
		medianHourly: 47.05,
		percentiles: {
			p10: 62900,
			p90: 134160
		},
		employment: 193400,
		employmentYear: "2025",
		jobOutlookPct: 17,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 32100,
		projectionPeriod: "2025-35",
		entryEducation: "Master's degree",
		industryWages: [
			{
				industry: "Nursing and residential care facilities",
				annualWage: 109660
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 103690
			},
			{
				industry: "Offices of physical, occupational and speech therapists, and audiologists",
				annualWage: 98910
			},
			{
				industry: "Educational services; state, local, and private",
				annualWage: 83120
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Speech-Language Pathologists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/speech-language-pathologists.htm",
		publishedDate: "2026-08-27"
	},
	"47-2221": {
		socCode: "47-2221",
		title: "Structural Iron and Steel Workers",
		medianAnnual: 62780,
		percentiles: {
			p10: 44580,
			p90: 108260
		},
		employment: 84800,
		employmentYear: "2025",
		jobOutlookPct: 1,
		jobOutlookLabel: "Slower than average",
		employmentChange: 1300,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		employmentIsGroupLevel: true,
		industryWages: [
			{
				industry: "Heavy and civil engineering construction",
				annualWage: 73470
			},
			{
				industry: "Building equipment contractors",
				annualWage: 68330
			},
			{
				industry: "Foundation, structure, and building exterior contractors",
				annualWage: 63340
			},
			{
				industry: "Nonresidential building construction",
				annualWage: 61930
			},
			{
				industry: "Manufacturing",
				annualWage: 59960
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Ironworkers (SOC 47-2221 covers structural iron and steel workers specifically, a distinct 6-digit code from reinforcing iron and rebar workers' 47-2171 within the combined \"Ironworkers\" group BLS titles this page; BLS's Pay tab breaks out a structural-specific median annual wage ($62,780), 10th/90th percentile range ($44,580/$108,260), a structural-specific top-5-industry wage table, and a structural-specific job outlook rate (3%, 2025-35) -- the percentile and industry figures are used here, but jobOutlookPct/employmentChange/employment above instead use the Quick Facts panel's combined-group figures (1% \"Slower than average\", +1,300 jobs, 84,800 total 2025 employment) since that is the headline stat BLS presents for the page's own title, hence employmentIsGroupLevel is set; the structural-specific 3% outlook and the sister occupation reinforcing iron and rebar workers' declining -5% outlook are reported separately in the article prose, not in this JSON entry)",
		sourceUrl: "https://www.bls.gov/ooh/construction-and-extraction/structural-iron-and-steel-workers.htm",
		publishedDate: "2026-08-27"
	},
	"29-2091": {
		socCode: "29-2091",
		title: "Orthotists and Prosthetists",
		medianAnnual: 81110,
		medianHourly: 38.99,
		percentiles: {
			p10: 46350,
			p90: 119810
		},
		employment: 9500,
		employmentYear: "2025",
		jobOutlookPct: 13,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 1200,
		projectionPeriod: "2025-35",
		entryEducation: "Master's degree",
		industryWages: [
			{
				industry: "Federal government, excluding postal service",
				annualWage: 91170
			},
			{
				industry: "Medical equipment and supplies manufacturing",
				annualWage: 83370
			},
			{
				industry: "Health and personal care retailers",
				annualWage: 78320
			},
			{
				industry: "Ambulatory healthcare services",
				annualWage: 77980
			},
			{
				industry: "Hospitals; state, local, and private",
				annualWage: 76290
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Orthotists and Prosthetists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/orthotists-and-prosthetists.htm",
		publishedDate: "2026-08-27"
	},
	"31-9011": {
		socCode: "31-9011",
		title: "Massage Therapists",
		medianAnnual: 58450,
		medianHourly: 28.1,
		percentiles: {
			p10: 33640,
			p90: 100200
		},
		employment: 155400,
		employmentYear: "2025",
		jobOutlookPct: 15,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 23700,
		projectionPeriod: "2025-35",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Offices of chiropractors",
				annualWage: 72800
			},
			{
				industry: "Offices of all other health practitioners",
				annualWage: 65350
			},
			{
				industry: "Personal care services",
				annualWage: 56230
			},
			{
				industry: "Accommodation",
				annualWage: 43840
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Massage Therapists",
		sourceUrl: "https://www.bls.gov/ooh/healthcare/massage-therapists.htm",
		publishedDate: "2026-08-27"
	},
	"53-2011": {
		socCode: "53-2011",
		title: "Airline Pilots, Copilots, and Flight Engineers",
		medianAnnual: 232140,
		percentiles: {
			p10: 106710,
			p90: 463830
		},
		employment: 104600,
		employmentYear: "2025",
		jobOutlookPct: 8,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 8700,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Couriers and express delivery services",
				annualWage: 334930
			},
			{
				industry: "Scheduled air transportation",
				annualWage: 293240
			},
			{
				industry: "Support activities for transportation",
				annualWage: 202680
			},
			{
				industry: "Federal government, excluding postal service",
				annualWage: 141140
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Airline and Commercial Pilots",
		sourceUrl: "https://www.bls.gov/ooh/transportation-and-material-moving/airline-and-commercial-pilots.htm",
		publishedDate: "2026-08-27"
	},
	"53-2012": {
		socCode: "53-2012",
		title: "Commercial Pilots",
		medianAnnual: 123220,
		percentiles: {
			p10: 58850,
			p90: 266620
		},
		employment: 50400,
		employmentYear: "2025",
		jobOutlookPct: 5,
		jobOutlookLabel: "Faster than average",
		employmentChange: 2600,
		projectionPeriod: "2025-35",
		entryEducation: "Postsecondary nondegree award",
		industryWages: [
			{
				industry: "Nonscheduled air transportation",
				annualWage: 133150
			},
			{
				industry: "Professional, scientific, and technical services",
				annualWage: 129610
			},
			{
				industry: "Support activities for air transportation",
				annualWage: 123090
			},
			{
				industry: "Other ambulatory healthcare services",
				annualWage: 100330
			},
			{
				industry: "Technical and trade schools; private",
				annualWage: 93820
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Airline and Commercial Pilots",
		sourceUrl: "https://www.bls.gov/ooh/transportation-and-material-moving/airline-and-commercial-pilots.htm",
		publishedDate: "2026-08-27"
	},
	"17-1011": {
		socCode: "17-1011",
		title: "Architects",
		medianAnnual: 99280,
		medianHourly: 47.73,
		percentiles: {
			p10: 62300,
			p90: 161420
		},
		employment: 124600,
		employmentYear: "2025",
		jobOutlookPct: 4,
		jobOutlookLabel: "As fast as average",
		employmentChange: 5300,
		projectionPeriod: "2025-35",
		entryEducation: "Bachelor's degree",
		industryWages: [
			{
				industry: "Government, excluding state and local education and hospitals",
				annualWage: 115920
			},
			{
				industry: "Architectural, engineering, and related services",
				annualWage: 98440
			},
			{
				industry: "Construction",
				annualWage: 95760
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Architects",
		sourceUrl: "https://www.bls.gov/ooh/architecture-and-engineering/architects.htm",
		publishedDate: "2026-08-27"
	},
	"41-9022": {
		socCode: "41-9022",
		title: "Real Estate Sales Agents",
		medianAnnual: 52830,
		percentiles: {
			p10: 32970,
			p90: 123590
		},
		employment: 530600,
		employmentYear: "2025",
		employmentIsGroupLevel: true,
		jobOutlookPct: 2,
		jobOutlookLabel: "Slower than average",
		employmentChange: 8300,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		industryWages: [
			{
				industry: "Construction",
				annualWage: 56310
			},
			{
				industry: "Real estate and rental and leasing",
				annualWage: 49850
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Real Estate Brokers and Sales Agents (sales-agent wage, percentile and industry figures; employment, outlook and change are the combined brokers-and-sales-agents Quick Facts figures, hence employmentIsGroupLevel)",
		sourceUrl: "https://www.bls.gov/ooh/sales/real-estate-brokers-and-sales-agents.htm",
		publishedDate: "2026-08-27"
	},
	"25-1000": {
		socCode: "25-1000",
		title: "Postsecondary teachers (all employment arrangements, not adjunct-only)",
		medianAnnual: 85330,
		percentiles: {
			p10: 49540,
			p90: 203580
		},
		employment: 1378200,
		employmentYear: "2025",
		jobOutlookPct: 7,
		jobOutlookLabel: "Much faster than average",
		employmentChange: 98200,
		projectionPeriod: "2025-35",
		entryEducation: "Doctoral or professional degree; requirements vary by subject and institution",
		industryWages: [
			{
				industry: "Colleges, universities, and professional schools; state",
				annualWage: 96120
			},
			{
				industry: "Colleges, universities, and professional schools; private",
				annualWage: 89660
			},
			{
				industry: "Junior colleges; local",
				annualWage: 81640
			},
			{
				industry: "Junior colleges; state",
				annualWage: 68160
			}
		],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Postsecondary Teachers (occupation group)",
		sourceUrl: "https://www.bls.gov/ooh/education-training-and-library/postsecondary-teachers.htm",
		publishedDate: "2026-08-27"
	},
	"11-9013": {
		socCode: "11-9013",
		title: "Farmers, Ranchers, and Other Agricultural Managers",
		medianAnnual: 89900,
		medianHourly: 43.22,
		percentiles: {
			p10: 54320,
			p90: 160020
		},
		employment: 788700,
		employmentYear: "2025",
		jobOutlookPct: -3,
		jobOutlookLabel: "Decline",
		employmentChange: -26500,
		projectionPeriod: "2025-35",
		entryEducation: "High school diploma or equivalent",
		industryWages: [],
		dataYear: "May 2025",
		sourceLabel: "BLS Occupational Outlook Handbook: Farmers, Ranchers, and Other Agricultural Managers",
		sourceUrl: "https://www.bls.gov/ooh/management/farmers-ranchers-and-other-agricultural-managers.htm",
		publishedDate: "2026-08-27"
	}
};
