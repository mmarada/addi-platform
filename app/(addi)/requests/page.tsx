"use client";
import { useState } from "react";

interface Request {
  id: string;
  type: "Dataset" | "Workspace";
  name: string;
  created: string;
  status: "Waiting for Approval" | "Approved" | "Denied";
}

const MOCK_REQUESTS: Request[] = [
  {
    id: "1",
    type: "Dataset",
    name: "WashU Knight ADRC phenotypic, proteomic and multi-omic data",
    created: "Friday, June 12, 2026",
    status: "Waiting for Approval",
  },
];

export default function RequestsPage() {
  const [requests] = useState<Request[]>(MOCK_REQUESTS);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Requests</h1>
      <p className="text-sm text-gray-600 mb-8">
        Your requests require approval from the respective owner. You will be notified once access is granted.
      </p>

      <table className="addi-table">
        <thead>
          <tr>
            <th style={{ width: 120 }}>Type</th>
            <th>Name</th>
            <th style={{ width: 200 }}>Created</th>
            <th style={{ width: 200 }}>Status</th>
            <th style={{ width: 120 }}></th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-400 py-12">No requests yet.</td>
            </tr>
          ) : (
            requests.map((r) => (
              <tr key={r.id}>
                <td>{r.type}</td>
                <td>
                  <a href="#" className="text-blue-600 hover:underline">{r.name}</a>
                </td>
                <td className="text-gray-500">{r.created}</td>
                <td>
                  <StatusBadge status={r.status} />
                </td>
                <td>
                  <button className="text-blue-600 text-sm hover:underline">View Request</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-end mt-4 text-sm text-gray-500 items-center gap-2">
        Items per page:
        <select className="addi-select py-1 text-sm">
          <option>20</option>
          <option>50</option>
        </select>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Request["status"] }) {
  if (status === "Waiting for Approval") {
    return (
      <span className="flex items-center gap-1.5 text-sm text-gray-600">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6b7280" strokeWidth="1.2">
          <circle cx="8" cy="8" r="7"/>
          <path d="M8 5v3.5l2 2" strokeLinecap="round"/>
        </svg>
        Waiting for Approval
      </span>
    );
  }
  if (status === "Approved") {
    return <span className="text-green-600 text-sm font-medium">✓ Approved</span>;
  }
  return <span className="text-red-500 text-sm font-medium">✕ Denied</span>;
}
