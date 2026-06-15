"use client";
import { useState } from "react";

export default function WorkspacesPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "", location: "WestEurope", description: "", planData: "", vmOs: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Workspace request submitted! Your Tenant Admin will review within 2–3 business days.");
    setShowModal(false);
    setForm({ name: "", location: "WestEurope", description: "", planData: "", vmOs: "" });
  }

  return (
    <div className="p-8 flex gap-6">
      {/* Main */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-5">Workspaces</h1>

        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <svg className="absolute left-2.5 top-2.5 text-gray-400" width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
            </svg>
            <input placeholder="Search..." className="addi-input pl-8 w-52 py-1.5" />
          </div>
          <select className="addi-select py-1.5">
            <option>Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Denied</option>
          </select>
          <select className="addi-select py-1.5">
            <option>Name</option>
            <option>Created</option>
          </select>
        </div>

        <div className="text-sm text-gray-400 py-12 text-center border border-dashed border-gray-200 rounded">
          No workspaces have been requested yet.
        </div>
      </div>

      {/* Right panel */}
      <div className="w-60 shrink-0">
        <div className="border border-gray-200 rounded p-4 bg-white">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">Request a new workspace</h2>
          <button onClick={() => setShowModal(true)} className="btn-primary w-full justify-center py-2.5">
            Request New Workspace
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Workspace Request</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <p className="text-sm text-gray-600">
                Please complete the form below and submit your request. Your Tenant Admin will review the request and approve or deny within the next 2-3 business days.
              </p>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Workspace Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Workspace Name"
                  className="addi-input"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="addi-select w-full"
                >
                  <option>WestEurope</option>
                  <option>EastUS</option>
                  <option>WestUS</option>
                  <option>AustraliaEast</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Describe how you will use this workspace to advance your research goals (200–400 words){" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value.slice(0, 4000) })}
                  placeholder="Please include your primary question, data, methods, and intended outcomes."
                  className="addi-input resize-none"
                />
                <div className="text-right text-xs text-gray-400 mt-0.5">{form.description.length} / 4000</div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  I am requesting this workspace because I plan to request data from the catalog.{" "}
                  <span className="text-red-500">*</span>
                </p>
                <div className="flex gap-5">
                  {["Yes", "No"].map((v) => (
                    <label key={v} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name="planData"
                        value={v}
                        checked={form.planData === v}
                        onChange={() => setForm({ ...form, planData: v })}
                        className="accent-blue-600"
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800 mb-1">Virtual Machine Details</p>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Virtual Machine Operating System. <span className="text-red-500">*</span>
                </p>
                <div className="flex gap-5">
                  {["No VM Required", "Windows", "Linux"].map((v) => (
                    <label key={v} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="radio"
                        name="vmOs"
                        value={v}
                        checked={form.vmOs === v}
                        onChange={() => setForm({ ...form, vmOs: v })}
                        className="accent-blue-600"
                      />
                      {v}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline flex-1 justify-center">
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1 justify-center">
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
