"use client";
import { useState } from "react";
import Link from "next/link";
import { datasets } from "@/data/datasets";
import DatasetModal from "@/components/DatasetModal";
import type { Dataset } from "@/data/datasets";

const DISEASES = [
  { label: "Alzheimer's Disease", count: 244, key: "AD" },
  { label: "Dementia", count: 35, key: "Dementia" },
  { label: "Mild Cognitive Impairment", count: 23, key: "MCI" },
  { label: "Frontotemporal Dementia", count: 16, key: "FTD" },
  { label: "Lewy Body Dementia", count: 14, key: "LBD" },
];
const STUDY_TYPES = [
  { label: "Genetic", count: 161 },
  { label: "Observational", count: 130 },
  { label: "Longitudinal", count: 49 },
  { label: "Clinical Trial", count: 32 },
  { label: "Neuroimaging", count: 21 },
];
const DATA_TYPES = [
  { label: "Clinical", count: 168 },
  { label: "Omics - Transcriptomics", count: 105 },
  { label: "Omics - Proteomics", count: 48 },
  { label: "Genomics", count: 37 },
  { label: "Omics - Metabolomics", count: 24 },
];

export default function CatalogPage() {
  const [keyword, setKeyword] = useState("");
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  function toggle<T>(arr: T[], val: T, set: (v: T[]) => void) {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  }

  function resetFilters() {
    setKeyword(""); setSelectedDiseases([]); setSelectedStudy([]); setSelectedData([]);
  }

  const hasFilters = keyword || selectedDiseases.length || selectedStudy.length || selectedData.length;

  // Filter our 8 datasets based on keyword
  const filtered = datasets.filter((d) => {
    if (!keyword) return true;
    const kw = keyword.toLowerCase();
    return d.name.toLowerCase().includes(kw) || d.description.toLowerCase().includes(kw) ||
      d.modalities.some((m) => m.toLowerCase().includes(kw)) ||
      d.tags.some((t) => t.toLowerCase().includes(kw));
  });

  return (
    <div className="flex h-full">
      {/* Left filter panel */}
      <aside className="w-72 border-r border-gray-200 bg-white p-5 overflow-y-auto shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Filter</h2>
          {hasFilters && (
            <button onClick={resetFilters} className="text-xs text-blue-600 flex items-center gap-1 hover:underline">
              ↺ Reset Filter
            </button>
          )}
        </div>

        {/* Keyword */}
        <div className="relative mb-2">
          <svg className="absolute left-2.5 top-2.5 text-gray-400" width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
          </svg>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder=""
            className="w-full border border-gray-200 rounded text-sm pl-8 pr-3 py-1.5 outline-none focus:border-blue-500"
          />
        </div>
        <p className="text-[11px] text-gray-400 mb-5">
          Use spaces to combine keywords for more precise results. Example: 'RNA-seq gene expression alzheimer'.
        </p>

        <FilterSection title="Disease Classification">
          <p className="text-xs font-medium text-gray-600 mb-2">Diseases</p>
          {DISEASES.map((d) => (
            <label key={d.key} className="flex items-center gap-2 py-0.5 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedDiseases.includes(d.key)}
                onChange={() => toggle(selectedDiseases, d.key, setSelectedDiseases)}
                className="accent-blue-600"
              />
              {d.label} <span className="text-gray-400">({d.count})</span>
            </label>
          ))}
        </FilterSection>

        <FilterSection title="Dataset Information">
          <p className="text-xs font-medium text-gray-600 mb-2">Study Types</p>
          {STUDY_TYPES.map((s) => (
            <label key={s.label} className="flex items-center gap-2 py-0.5 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedStudy.includes(s.label)}
                onChange={() => toggle(selectedStudy, s.label, setSelectedStudy)}
                className="accent-blue-600"
              />
              {s.label} <span className="text-gray-400">({s.count})</span>
            </label>
          ))}
          <p className="text-xs font-medium text-gray-600 mt-4 mb-2">Data Types</p>
          {DATA_TYPES.map((d) => (
            <label key={d.label} className="flex items-center gap-2 py-0.5 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedData.includes(d.label)}
                onChange={() => toggle(selectedData, d.label, setSelectedData)}
                className="accent-blue-600"
              />
              {d.label} <span className="text-gray-400">({d.count})</span>
            </label>
          ))}
        </FilterSection>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">AD Discovery Portal</h1>
          <Link href="/catalog" className="text-sm text-gray-500 flex items-center gap-1">
            Learn more about the AD Discovery Portal <span className="ml-2">—</span>
          </Link>
        </div>

        <p className="text-sm text-gray-700 mb-3 leading-relaxed max-w-3xl">
          The AD Discovery Portal is designed to help researchers explore novel Alzheimer's disease and related dementias data
          through a publicly accessible dataset catalog. It offers a diverse collection of data, including imaging, omics, clinical,
          and multi-modal approaches, and brings together datasets from both industry and academia.
        </p>
        <p className="text-sm text-gray-700 mb-3 leading-relaxed max-w-3xl">
          The Discovery Portal is fully integrated with AD Workbench and enables seamless exploration, dataset access requests, and analysis.
        </p>
        <p className="text-sm text-gray-700 mb-6">
          To learn more, check out Getting Started in the AD Discovery Portal{" "}
          <a href="#" className="text-blue-600 hover:underline">here</a>.
        </p>

        {/* Applied filters bar */}
        <div className="text-xs text-gray-500 mb-4">
          <span className="font-medium">Applied Filters:</span>{" "}
          {hasFilters ? (
            <span className="text-blue-600">{keyword || [...selectedDiseases, ...selectedStudy, ...selectedData].join(", ")}</span>
          ) : (
            <span>No applied filters</span>
          )}
        </div>

        {/* Summary bar */}
        <div className="border border-gray-200 rounded p-5 mb-5 bg-white">
          <div className="flex items-center justify-between mb-1 text-sm">
            <span className="text-gray-500 text-xs cursor-pointer hover:underline">Collapse to hide data visualization</span>
            <span className="text-gray-400 text-lg leading-none">—</span>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-3">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-700">Datasets</span>
                <span className="text-blue-600 font-semibold">{filtered.length} of {datasets.length}</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(filtered.length / datasets.length) * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-gray-700">Participants</span>
                <span className="text-blue-600 font-semibold">5,886,368 of 5,886,368</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Copilot banner */}
        <div className="border border-blue-200 bg-blue-50 rounded p-3 mb-5 flex items-center justify-between">
          <p className="text-sm text-blue-800">
            <strong>✦ Research Copilot</strong> — Ask natural language questions to find the right dataset faster
          </p>
          <Link href="/" className="btn-primary text-xs py-1.5 px-3 shrink-0 ml-4">
            Open Copilot →
          </Link>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4 cursor-pointer hover:text-gray-700">
          <span>⇅</span> Sort by dataset name A-Z
        </div>

        {/* Dataset list */}
        <div className="space-y-4">
          {filtered.map((d) => (
            <DatasetListCard key={d.id} dataset={d} onClick={() => setSelectedDataset(d)} />
          ))}
        </div>
      </div>

      <DatasetModal dataset={selectedDataset} onClose={() => setSelectedDataset(null)} />
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 mb-3"
      >
        {title}
        <span className="text-gray-400 text-base">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="space-y-1">{children}</div>}
    </div>
  );
}

function DatasetListCard({ dataset, onClick }: { dataset: Dataset; onClick: () => void }) {
  return (
    <div className="border border-gray-200 rounded bg-white p-5 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <button onClick={onClick} className="text-blue-600 font-semibold text-base hover:underline text-left">
          {dataset.fullName}
        </button>
        {dataset.lastUpdated > "2024-06" && (
          <span className="text-xs border border-gray-300 px-2 py-0.5 rounded text-gray-500 shrink-0 ml-3">Recently Updated</span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{dataset.description}</p>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs bg-gray-100 border border-gray-200 text-gray-600 px-3 py-1 rounded-full font-medium">
          {dataset.n.toLocaleString()} Participants
        </span>
        {dataset.modalities.slice(0, 3).map((m) => (
          <span key={m} className="text-xs text-gray-400">{m}</span>
        ))}
        {dataset.accessLevel === "dua_required" && (
          <span className="text-xs text-amber-600 ml-auto">Please contact <a href="mailto:support@alzheimersdata.org" className="underline">support@alzheimersdata.org</a> to request this dataset.</span>
        )}
      </div>
      {dataset.publishedStudies > 100 && (
        <p className="text-xs text-blue-600 mt-3 hover:underline cursor-pointer">
          Published findings now available →
        </p>
      )}
    </div>
  );
}
