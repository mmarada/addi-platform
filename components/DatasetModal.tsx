"use client";
import { Dataset } from "@/data/datasets";
import { useRouter } from "next/navigation";

interface Props {
  dataset: Dataset | null;
  onClose: () => void;
}

const accessBadge: Record<string, { label: string; color: string }> = {
  open: { label: "Open Access", color: "bg-green-100 text-green-700" },
  registered: { label: "Registration Required", color: "bg-blue-100 text-blue-700" },
  dua_required: { label: "DUA Required", color: "bg-amber-100 text-amber-700" },
};

export default function DatasetModal({ dataset, onClose }: Props) {
  const router = useRouter();
  if (!dataset) return null;
  const badge = accessBadge[dataset.accessLevel];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-start justify-between rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-gray-900">{dataset.name}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.color}`}>
                {badge.label}
              </span>
            </div>
            <p className="text-sm text-gray-500">{dataset.fullName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none mt-1">
            ✕
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">{dataset.description}</p>

          {/* Key Stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Participants", value: dataset.n.toLocaleString() },
              { label: "Sites", value: dataset.sites },
              { label: "Published", value: `${dataset.publishedStudies} papers` },
              { label: "Active Studies", value: dataset.activeStudies },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-lg font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Modalities */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Data Modalities</h3>
            <div className="flex flex-wrap gap-2">
              {dataset.modalities.map((m) => (
                <span key={m} className="text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Key Variables */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Key Variables</h3>
            <div className="flex flex-wrap gap-2">
              {dataset.keyVariables.map((v) => (
                <span key={v} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Missingness */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Data Completeness</h3>
            <div className="space-y-2">
              {dataset.missingness.map((m) => (
                <div key={m.variable}>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{m.variable}</span>
                    <span className={m.pct > 50 ? "text-red-500 font-medium" : m.pct > 25 ? "text-amber-600" : "text-green-600"}>
                      {m.pct}% missing
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${m.pct > 50 ? "bg-red-400" : m.pct > 25 ? "bg-amber-400" : "bg-green-400"}`}
                      style={{ width: `${100 - m.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
            <span>📅 {dataset.yearRange}</span>
            <span>🔄 Updated {dataset.lastUpdated}</span>
            <span>⏱ ~{dataset.approvalDays} day approval</span>
            <span>⭐ {dataset.rating} / 5.0</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {dataset.tags.map((t) => (
              <span key={t} className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">
                #{t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push(`/request?dataset=${dataset.id}`)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Request Access to {dataset.name}
          </button>
        </div>
      </div>
    </div>
  );
}
