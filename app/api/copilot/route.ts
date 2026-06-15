import { NextRequest } from "next/server";
import { datasets, Dataset } from "@/data/datasets";

// ── Smart mock — scores each dataset against the query ──────────────────────

const KEYWORD_MAP: Record<string, string[]> = {
  "adni-3":    ["adni", "neuroimaging", "multi-site", "mri", "pet", "amyloid", "tau", "csf", "longitudinal", "imaging"],
  "adni-4":    ["adni-4", "adni4", "blood", "plasma", "ptau217", "plasma p-tau", "diversity", "newest", "latest"],
  "rosmap":    ["rosmap", "post-mortem", "autopsy", "rna", "multi-omic", "omic", "pathology", "neuropathology", "expression", "proteomics", "rush"],
  "ukbiobank-ad": ["uk biobank", "biobank", "gwas", "population", "large", "ehr", "electronic health", "genetics", "genome-wide"],
  "aibl":      ["aibl", "australia", "lifestyle", "diet", "prevention", "amyloid positive"],
  "nacc":      ["nacc", "clinical", "ftd", "frontotemporal", "largest", "federated", "uniform data", "als", "multi-disease"],
  "a4-study":  ["a4", "preclinical", "asymptomatic", "prevention trial", "trial", "cognitively normal", "early", "pre-symptomatic"],
  "banner":    ["banner", "rapid autopsy", "tissue", "proteomics", "metabolomics", "brain donation", "post-mortem interval"],
};

const MODALITY_MAP: Record<string, string[]> = {
  "adni-3":    ["mri", "pet", "csf", "genetics", "cognitive"],
  "adni-4":    ["mri", "pet", "csf", "genetics", "cognitive", "proteomics"],
  "rosmap":    ["genetics", "rna-seq", "cognitive", "proteomics", "ehr"],
  "ukbiobank-ad": ["mri", "genetics", "ehr", "cognitive"],
  "aibl":      ["mri", "pet", "genetics", "cognitive"],
  "nacc":      ["cognitive", "ehr", "genetics"],
  "a4-study":  ["pet", "genetics", "cognitive", "csf"],
  "banner":    ["proteomics", "rna-seq", "genetics"],
};

function scoreDatasets(query: string): { id: string; score: number }[] {
  const q = query.toLowerCase();
  return datasets.map((d) => {
    let score = 0;
    const keywords = KEYWORD_MAP[d.id] ?? [];
    const modalities = MODALITY_MAP[d.id] ?? [];
    keywords.forEach((kw) => { if (q.includes(kw)) score += 3; });
    modalities.forEach((m) => { if (q.includes(m.toLowerCase())) score += 2; });
    // bonus for size queries
    if ((q.includes("large") || q.includes("biggest") || q.includes("most participants")) && d.n > 5000) score += 2;
    if ((q.includes("longitudinal") || q.includes("follow-up")) && d.followUp.includes("Longitudinal")) score += 2;
    if ((q.includes("open") || q.includes("no dua") || q.includes("easy access")) && d.accessLevel !== "dua_required") score += 2;
    return { id: d.id, score };
  }).sort((a, b) => b.score - a.score);
}

function buildMockResponse(query: string): string {
  const q = query.toLowerCase();
  const scored = scoreDatasets(q);
  const top = scored.filter((s) => s.score > 0).slice(0, 3);
  const ids = top.length > 0 ? top.map((s) => s.id) : scored.slice(0, 2).map((s) => s.id);

  const matched = ids.map((id) => datasets.find((d) => d.id === id)!).filter(Boolean);

  // Generate a contextual answer
  let answer = "";
  if (q.includes("amyloid") || q.includes("pet")) {
    answer = `For amyloid PET research, ADNI-3 and AIBL are the gold-standard choices — both have high-quality florbetapir/PiB PET alongside longitudinal cognitive assessments. ADNI-3's 47-site scale (n=2,400) gives you statistical power for subgroup analyses, while AIBL adds valuable lifestyle covariates.`;
  } else if (q.includes("gwas") || q.includes("genome") || q.includes("genetics") || q.includes("population")) {
    answer = `For GWAS-scale genetic analysis, UK Biobank's AD subset is unmatched at n=12,000 with genome-wide array data and EHR linkage. NACC UDS (n=48,000) adds the largest clinical genetics dataset, though its genetic coverage is less complete than UK Biobank.`;
  } else if (q.includes("preclinical") || q.includes("asymptomatic") || q.includes("prevention")) {
    answer = `For preclinical AD research, the A4 Study is purpose-built — it enrolled 4,500 cognitively normal, amyloid-positive adults, making it the richest dataset for studying the pre-symptomatic stage. ADNI-4 also includes cognitively normal participants with blood-based biomarkers for a more recent cohort.`;
  } else if (q.includes("post-mortem") || q.includes("autopsy") || q.includes("neuropathology") || q.includes("rna")) {
    answer = `For post-mortem and multi-omic research, ROSMAP and Banner are complementary choices. ROSMAP offers the longest follow-up (20+ years) with confirmed neuropathology and RNA-seq, while Banner's rapid autopsy protocol minimizes post-mortem interval — critical for proteomics and metabolomics quality.`;
  } else if (q.includes("blood") || q.includes("plasma") || q.includes("p-tau")) {
    answer = `For blood-based biomarker research, ADNI-4 is your best option — it's the first major AD cohort with plasma p-tau217 as a primary measure alongside PET confirmation. It's newer (n=800 and growing) but uniquely positioned for validation studies of blood-based AD diagnostics.`;
  } else if (q.includes("clinical") || q.includes("largest") || q.includes("ftd") || q.includes("multi-disease")) {
    answer = `For large-scale clinical research spanning multiple dementia subtypes, NACC UDS is unrivaled at n=48,000 across 43 Alzheimer's Disease Research Centers. It covers AD, MCI, FTD, and ALS with standardized protocols — ideal for epidemiological and comparative studies.`;
  } else {
    answer = `Based on your research question, I've identified the most relevant datasets from the ADDI catalog. ${matched[0]?.name ?? "ADNI-3"} is a strong starting point given its breadth of modalities and large longitudinal sample. Consider your key variables and access timeline when choosing between options.`;
  }

  // Build reasoning for each matched dataset
  const reasoning: Record<string, string> = {};
  matched.forEach((d) => {
    if (d.id === "adni-3") reasoning[d.id] = `Gold-standard longitudinal cohort with MRI, PET, CSF, and cognitive data across 47 sites — broad coverage for most AD research questions.`;
    else if (d.id === "adni-4") reasoning[d.id] = `Newest ADNI wave with plasma p-tau217 and expanded diversity recruitment — best for blood biomarker validation.`;
    else if (d.id === "rosmap") reasoning[d.id] = `20+ year follow-up with neuropathology confirmation and RNA-seq — uniquely links clinical trajectory to molecular data.`;
    else if (d.id === "ukbiobank-ad") reasoning[d.id] = `Population-scale (n=12,000) with EHR linkage — highest statistical power for genetic and epidemiological analyses.`;
    else if (d.id === "aibl") reasoning[d.id] = `Strong amyloid PET coverage with lifestyle variables — registered access makes it faster to obtain than DUA-required datasets.`;
    else if (d.id === "nacc") reasoning[d.id] = `Largest clinical dataset (n=48,000) with standardized assessments across all NIA-funded centers — best for multi-site clinical research.`;
    else if (d.id === "a4-study") reasoning[d.id] = `Purpose-built for preclinical AD — only dataset with amyloid-positive cognitively normal adults at scale (n=4,500).`;
    else if (d.id === "banner") reasoning[d.id] = `Rapid autopsy program with minimal post-mortem interval — highest quality tissue for proteomics and metabolomics.`;
  });

  // Caveats
  let caveats = "";
  if (ids.includes("adni-3") && (q.includes("pet") || q.includes("csf"))) {
    caveats = "Note: Amyloid PET is 40% missing and CSF is 35% missing in ADNI-3 — plan your sample size accordingly for biomarker-complete subanalyses.";
  } else if (ids.includes("ukbiobank-ad")) {
    caveats = "UK Biobank DUA approval typically takes 3 weeks and requires institutional sign-off — factor this into your timeline.";
  } else if (ids.includes("a4-study") && q.includes("csf")) {
    caveats = "CSF data is 70% missing in the A4 Study — not suitable as a primary endpoint; use PET amyloid composite instead.";
  }

  return JSON.stringify({ answer, datasetIds: ids, reasoning, caveats });
}

// ── Stream helper — simulate token-by-token output ───────────────────────────

function streamText(text: string): ReadableStream {
  const encoder = new TextEncoder();
  const words = text.split("");
  let i = 0;
  return new ReadableStream({
    async pull(controller) {
      if (i >= words.length) { controller.close(); return; }
      // send chunks of ~8 chars with small delay to simulate streaming
      const chunk = words.slice(i, i + 8).join("");
      controller.enqueue(encoder.encode(chunk));
      i += 8;
      await new Promise((r) => setTimeout(r, 12));
    },
  });
}

export async function POST(req: NextRequest) {
  const { query } = await req.json();
  const response = buildMockResponse(query ?? "");
  return new Response(streamText(response), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
