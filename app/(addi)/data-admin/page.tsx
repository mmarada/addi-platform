"use client";
import { useState } from "react";
import Link from "next/link";

type Tab = "pending" | "published";

export default function DataAdminPage() {
  const [tab, setTab] = useState<Tab>("pending");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [showFilter, setShowFilter] = useState("Show: Submitted");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Data &amp; Studies</h1>

      <div className="flex gap-3 mb-4">
        <Link href="/data-admin/add-study" className="btn-primary">
          Add Study
        </Link>
        <button className="btn-outline">Contact Admin</button>
      </div>

      <p className="text-sm text-gray-600 mb-6 max-w-3xl">
        Here you can view the list of studies you have submitted for publication. Each submission is currently under review by
        the Catalog owners. Please be patient as the review process can take some time. You will be notified once a decision
        has been made. Thank you for your patience.
      </p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-5">
        {([["pending", "Pending Changes"], ["published", "Published Studies, Datasets and Biosample Collections"]] as const).map(
          ([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                tab === key ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          )
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="addi-select py-1.5 min-w-40">
          <option>All Types</option>
          <option>Dataset</option>
          <option>Study</option>
          <option>Biosample Collection</option>
        </select>
        <select value={showFilter} onChange={(e) => setShowFilter(e.target.value)} className="addi-select py-1.5 min-w-44">
          <option>Show: Submitted</option>
          <option>Show: Draft</option>
          <option>Show: All</option>
        </select>
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-2.5 top-2.5 text-gray-400" width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
          </svg>
          <input placeholder="" className="addi-input pl-8 py-1.5" />
        </div>
      </div>

      {/* Table */}
      <table className="addi-table">
        <thead>
          <tr>
            <th>Name</th>
            <th style={{ width: 120 }}>Type</th>
            <th style={{ width: 180 }}>Primary Investigator</th>
            <th style={{ width: 140 }}>Submitted</th>
            <th style={{ width: 140 }}>Submitted by</th>
            <th style={{ width: 120 }}>Status</th>
            <th style={{ width: 140 }}>Automatic Approval</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={7} className="text-center text-gray-400 py-12">
              No Entities yet
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
