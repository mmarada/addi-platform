export type AccessLevel = "open" | "registered" | "dua_required";
export type Modality = "MRI" | "PET" | "CSF" | "Genetics" | "Cognitive" | "EHR" | "RNA-seq" | "Proteomics";
export type DiseaseArea = "MCI" | "AD" | "FTD" | "Parkinson's" | "Normal Aging" | "ALS";

export interface Dataset {
  id: string;
  name: string;
  fullName: string;
  contributor: string;
  description: string;
  n: number;
  followUp: string;
  sites: number;
  lastUpdated: string;
  modalities: Modality[];
  diseaseAreas: DiseaseArea[];
  accessLevel: AccessLevel;
  approvalDays: number;
  missingness: { variable: string; pct: number }[];
  publishedStudies: number;
  activeStudies: number;
  rating: number;
  tags: string[];
  keyVariables: string[];
  yearRange: string;
}

export const datasets: Dataset[] = [
  {
    id: "adni-3",
    name: "ADNI-3",
    fullName: "Alzheimer's Disease Neuroimaging Initiative (Wave 3)",
    contributor: "ADNI Consortium",
    description:
      "Landmark multi-site longitudinal study tracking biomarkers across the AD spectrum. Includes structural MRI, amyloid/tau PET, CSF, genetics, and comprehensive cognitive batteries.",
    n: 2400,
    followUp: "Longitudinal (5yr+)",
    sites: 47,
    lastUpdated: "2024-09",
    modalities: ["MRI", "PET", "CSF", "Genetics", "Cognitive"],
    diseaseAreas: ["MCI", "AD", "Normal Aging"],
    accessLevel: "dua_required",
    approvalDays: 5,
    missingness: [
      { variable: "Amyloid PET", pct: 40 },
      { variable: "Tau PET", pct: 55 },
      { variable: "CSF", pct: 35 },
      { variable: "Cognitive", pct: 8 },
    ],
    publishedStudies: 1420,
    activeStudies: 89,
    rating: 4.9,
    tags: ["imaging", "longitudinal", "multi-site", "gold-standard"],
    keyVariables: ["MMSE", "CDR", "AV45_SUVR", "ABETA", "PTAU", "APOE4"],
    yearRange: "2016–present",
  },
  {
    id: "adni-4",
    name: "ADNI-4",
    fullName: "Alzheimer's Disease Neuroimaging Initiative (Wave 4)",
    contributor: "ADNI Consortium",
    description:
      "Latest wave with expanded diversity recruitment, blood-based biomarkers (plasma p-tau217), and digital cognitive assessments. Emphasis on underrepresented populations.",
    n: 800,
    followUp: "Longitudinal (ongoing)",
    sites: 59,
    lastUpdated: "2025-11",
    modalities: ["MRI", "PET", "CSF", "Genetics", "Cognitive", "Proteomics"],
    diseaseAreas: ["MCI", "AD", "Normal Aging"],
    accessLevel: "dua_required",
    approvalDays: 7,
    missingness: [
      { variable: "Plasma p-tau217", pct: 15 },
      { variable: "PET", pct: 30 },
      { variable: "Cognitive", pct: 5 },
    ],
    publishedStudies: 42,
    activeStudies: 34,
    rating: 4.7,
    tags: ["blood-biomarkers", "diversity", "newest", "plasma-ptau"],
    keyVariables: ["plasma_ptau217", "digital_cognition", "APOE4", "AV1451_SUVR"],
    yearRange: "2023–present",
  },
  {
    id: "rosmap",
    name: "ROSMAP",
    fullName: "Religious Orders Study and Memory and Aging Project",
    contributor: "Rush Alzheimer's Disease Center",
    description:
      "Deeply phenotyped longitudinal cohort with post-mortem pathology data. Unique for linking clinical trajectory with neuropathological confirmation. Rich multi-omic data.",
    n: 3500,
    followUp: "Longitudinal (20yr+)",
    sites: 2,
    lastUpdated: "2024-06",
    modalities: ["Genetics", "RNA-seq", "Cognitive", "Proteomics", "EHR"],
    diseaseAreas: ["AD", "MCI", "Normal Aging"],
    accessLevel: "dua_required",
    approvalDays: 10,
    missingness: [
      { variable: "RNA-seq", pct: 25 },
      { variable: "Proteomics", pct: 40 },
      { variable: "Cognitive", pct: 12 },
    ],
    publishedStudies: 890,
    activeStudies: 61,
    rating: 4.8,
    tags: ["post-mortem", "multi-omic", "long-term", "pathology-confirmed"],
    keyVariables: ["global_cog", "tau_tangles", "amyloid_plaques", "RNA_expression"],
    yearRange: "1994–present",
  },
  {
    id: "ukbiobank-ad",
    name: "UK Biobank (AD)",
    fullName: "UK Biobank — Alzheimer's & Dementia Subset",
    contributor: "UK Biobank",
    description:
      "Population-scale biobank with 500k participants. AD subset includes imaging, genetics, EHR linkage, and lifestyle data. Unmatched statistical power for GWAS.",
    n: 12000,
    followUp: "Longitudinal (10yr+)",
    sites: 22,
    lastUpdated: "2025-01",
    modalities: ["MRI", "Genetics", "EHR", "Cognitive"],
    diseaseAreas: ["AD", "Normal Aging"],
    accessLevel: "dua_required",
    approvalDays: 21,
    missingness: [
      { variable: "MRI", pct: 60 },
      { variable: "Cognitive", pct: 20 },
      { variable: "Genetics", pct: 5 },
    ],
    publishedStudies: 340,
    activeStudies: 28,
    rating: 4.6,
    tags: ["population-scale", "GWAS", "EHR-linked", "large-n"],
    keyVariables: ["hippocampal_volume", "WMH", "APOE", "ICD10_dementia"],
    yearRange: "2006–present",
  },
  {
    id: "aibl",
    name: "AIBL",
    fullName: "Australian Imaging, Biomarker & Lifestyle Study",
    contributor: "CSIRO & Austin Health",
    description:
      "Australian longitudinal cohort focusing on lifestyle factors, amyloid PET, and early AD detection. Strong lifestyle and diet variable coverage.",
    n: 1100,
    followUp: "Longitudinal (5yr)",
    sites: 3,
    lastUpdated: "2023-12",
    modalities: ["MRI", "PET", "Genetics", "Cognitive"],
    diseaseAreas: ["AD", "MCI", "Normal Aging"],
    accessLevel: "registered",
    approvalDays: 3,
    missingness: [
      { variable: "PET", pct: 35 },
      { variable: "MRI", pct: 10 },
      { variable: "Cognitive", pct: 6 },
    ],
    publishedStudies: 210,
    activeStudies: 18,
    rating: 4.4,
    tags: ["lifestyle", "diet", "amyloid", "Australia"],
    keyVariables: ["PiB_DVR", "lifestyle_score", "diet_quality", "MMSE"],
    yearRange: "2006–2021",
  },
  {
    id: "nacc",
    name: "NACC UDS",
    fullName: "National Alzheimer's Coordinating Center — Uniform Data Set",
    contributor: "NIA / NACC",
    description:
      "Federated dataset from 40+ NIA-funded Alzheimer's Disease Research Centers. Largest standardized clinical dataset with uniform assessment protocols across all sites.",
    n: 48000,
    followUp: "Longitudinal (ongoing)",
    sites: 43,
    lastUpdated: "2025-06",
    modalities: ["Cognitive", "EHR", "Genetics"],
    diseaseAreas: ["AD", "MCI", "FTD", "Normal Aging", "ALS"],
    accessLevel: "registered",
    approvalDays: 2,
    missingness: [
      { variable: "Genetics", pct: 55 },
      { variable: "Cognitive", pct: 7 },
    ],
    publishedStudies: 1800,
    activeStudies: 112,
    rating: 4.5,
    tags: ["largest", "clinical", "multi-disease", "federated"],
    keyVariables: ["UDS_cog_composite", "CDR_SB", "diagnosis", "medications"],
    yearRange: "2005–present",
  },
  {
    id: "a4-study",
    name: "A4 Study",
    fullName: "Anti-Amyloid Treatment in Asymptomatic Alzheimer's",
    contributor: "Eli Lilly / Alzheimer's Association",
    description:
      "Prevention trial dataset with preclinical AD participants. Amyloid-positive cognitively normal adults — ideal for studying the earliest pre-symptomatic stage.",
    n: 4500,
    followUp: "Longitudinal (4yr, trial)",
    sites: 67,
    lastUpdated: "2024-03",
    modalities: ["PET", "Genetics", "Cognitive", "CSF"],
    diseaseAreas: ["Normal Aging", "MCI"],
    accessLevel: "dua_required",
    approvalDays: 14,
    missingness: [
      { variable: "CSF", pct: 70 },
      { variable: "Cognitive", pct: 4 },
      { variable: "PET", pct: 8 },
    ],
    publishedStudies: 95,
    activeStudies: 22,
    rating: 4.6,
    tags: ["preclinical", "prevention", "trial", "amyloid-positive"],
    keyVariables: ["amyloid_composite", "PACC", "solanezumab_arm", "florbetapir"],
    yearRange: "2014–2022",
  },
  {
    id: "banner",
    name: "Banner Brain & Body",
    fullName: "Banner Sun Health Research Institute Brain & Body Donation Program",
    contributor: "Banner Health",
    description:
      "Rapid autopsy program with same-day tissue collection. Gold standard for neuropathology, proteomics, and metabolomics with minimal post-mortem interval.",
    n: 900,
    followUp: "Cross-sectional (post-mortem)",
    sites: 1,
    lastUpdated: "2024-11",
    modalities: ["Proteomics", "RNA-seq", "Genetics"],
    diseaseAreas: ["AD", "Parkinson's", "Normal Aging"],
    accessLevel: "dua_required",
    approvalDays: 8,
    missingness: [
      { variable: "Metabolomics", pct: 45 },
      { variable: "RNA-seq", pct: 20 },
    ],
    publishedStudies: 180,
    activeStudies: 15,
    rating: 4.7,
    tags: ["autopsy", "rapid-autopsy", "proteomics", "tissue"],
    keyVariables: ["Braak_stage", "CERAD_score", "protein_expression", "PMI"],
    yearRange: "1987–present",
  },
];

export const exampleQueries = [
  "Find datasets with amyloid PET and longitudinal cognitive decline data",
  "Which datasets have the largest sample size for GWAS analysis?",
  "Show me datasets suitable for studying preclinical Alzheimer's",
  "What datasets include post-mortem neuropathology with RNA-seq?",
  "Find datasets with blood-based biomarkers like plasma p-tau",
];
