"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { datasets } from "@/data/datasets";
import { Suspense } from "react";

function RequestForm() {
  const params = useSearchParams();
  const router = useRouter();
  const datasetId = params.get("dataset");
  const dataset = datasets.find((d) => d.id === datasetId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600 text-sm">
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span className="font-semibold text-gray-800">ADDI Workbench — Dataset Request</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full px-6 py-10">
        {dataset && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4 mb-8">
            <p className="text-xs text-indigo-500 font-medium mb-1">Requesting access to</p>
            <p className="font-bold text-indigo-900">{dataset.fullName}</p>
            <p className="text-sm text-indigo-700 mt-1">
              n = {dataset.n.toLocaleString()} · {dataset.modalities.join(", ")} · ~{dataset.approvalDays} day approval
            </p>
          </div>
        )}

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dataset Access Request</h1>
        <p className="text-gray-500 text-sm mb-8">
          Complete this form to request access. Requests are reviewed within {dataset?.approvalDays ?? 5} business days.
        </p>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Request submitted! You will hear back within " + (dataset?.approvalDays ?? 5) + " business days."); }}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institutional Email</label>
            <input required type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Institution / Organization</label>
            <input required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Research Purpose</label>
            <textarea
              required
              rows={4}
              placeholder="Describe your research question, hypothesis, and how you plan to use this dataset..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Analysis Methods</label>
            <textarea
              rows={3}
              placeholder="e.g. Survival analysis, GWAS, deep learning on imaging data..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 resize-none"
            />
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input required type="checkbox" className="mt-0.5" />
              <span className="text-sm text-gray-600">
                I agree to the Data Use Agreement (DUA) terms. I will not attempt to re-identify participants,
                share data outside approved collaborators, or export row-level data from the workbench environment.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Submit Access Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default function RequestPage() {
  return (
    <Suspense>
      <RequestForm />
    </Suspense>
  );
}
