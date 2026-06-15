import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-start justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, Mohan</h1>
        <Link href="/catalog" className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1">
          Learn more about the AD Discovery Portal <span className="ml-2">—</span>
        </Link>
      </div>

      <div className="mb-5">
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          The AD Discovery Portal is designed to help researchers explore novel Alzheimer's disease and related dementias data
          through a publicly accessible dataset catalog. It offers a diverse collection of data, including imaging, omics, clinical,
          and multi-modal approaches, and brings together datasets from both industry and academia.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          The Discovery Portal is fully integrated with AD Workbench and enables seamless exploration, dataset access requests,
          and analysis.
        </p>
        <p className="text-sm text-gray-700">
          To learn more, check out Getting Started in the AD Discovery Portal{" "}
          <a href="#" className="text-blue-600 hover:underline">here</a>.
        </p>
      </div>

      <div className="flex gap-4">
        {/* Left */}
        <div className="flex-1 space-y-4">
          {/* Recently added */}
          <div className="border border-gray-200 rounded p-4 bg-gray-50 flex items-center gap-3">
            <span className="text-xl">🔔</span>
            <span className="text-sm font-semibold text-gray-700">Recently Added Datasets:</span>
            <span className="text-sm font-bold text-blue-600">PREVENT</span>
          </div>

          {/* Stats */}
          <div className="bg-blue-50 border border-blue-100 rounded p-10 flex items-center justify-around">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900">345</div>
              <div className="text-sm font-semibold text-gray-600 mt-2">Datasets</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900">5.8M</div>
              <div className="text-sm font-semibold text-gray-600 mt-2">Participants</div>
            </div>
          </div>

          {/* Copilot CTA */}
          <div className="border border-blue-200 bg-blue-50 rounded p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-900">✦ Research Copilot</p>
              <p className="text-xs text-blue-700 mt-0.5">Ask natural language questions to discover relevant datasets</p>
            </div>
            <Link href="/" className="btn-primary text-xs py-2 px-4">
              Open Copilot →
            </Link>
          </div>
        </div>

        {/* Right — Access & Collaboration */}
        <div className="w-64 border border-gray-200 rounded p-5 bg-white shrink-0">
          <h2 className="font-semibold text-gray-900 pb-3 border-b border-gray-200 mb-4">Access &amp; Collaboration</h2>
          <p className="text-xs text-gray-500 mb-3">You have access to:</p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <StatBox value="0" label="Datasets" />
            <StatBox value="0" label={`Biosample\nCollections`} />
          </div>
          <p className="text-xs text-gray-500 mb-3">You collaborate with:</p>
          <div className="grid grid-cols-2 gap-3">
            <StatBox value="149" label="Researchers" />
            <StatBox value="39" label="Institutions" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-gray-200 rounded p-3 text-center">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-[11px] text-gray-500 mt-1 leading-tight whitespace-pre-line">{label}</div>
    </div>
  );
}
