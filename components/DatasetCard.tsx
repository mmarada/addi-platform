"use client";
import { Dataset } from "@/data/datasets";

interface Props {
  dataset: Dataset;
  reasoning?: string;
  onClick: (dataset: Dataset) => void;
}

const accessBadge: Record<string, { label: string; color: string }> = {
  open: { label: "Open", color: "bg-green-100 text-green-700" },
  registered: { label: "Registered", color: "bg-blue-100 text-blue-700" },
  dua_required: { label: "DUA Required", color: "bg-amber-100 text-amber-700" },
};

export default function DatasetCard({ dataset, reasoning, onClick }: Props) {
  const badge = accessBadge[dataset.accessLevel];

  return (
    <button
      onClick={() => onClick(dataset)}
      className="text-left w-full bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-400 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <span className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
            {dataset.name}
          </span>
          <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-medium ${badge.color}`}>
            {badge.label}
          </span>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          ★ {dataset.rating}
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{dataset.description}</p>

      {reasoning && (
        <p className="text-xs text-indigo-600 bg-indigo-50 rounded-lg px-3 py-2 mb-3 italic">
          {reasoning}
        </p>
      )}

      <div className="flex flex-wrap gap-1 mb-3">
        {dataset.modalities.slice(0, 4).map((m) => (
          <span key={m} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {m}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>n = {dataset.n.toLocaleString()}</span>
        <span>{dataset.followUp}</span>
        <span>{dataset.publishedStudies} papers</span>
      </div>
    </button>
  );
}
