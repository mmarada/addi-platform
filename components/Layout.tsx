"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/catalog", label: "Catalog", icon: CatalogIcon },
  { href: "/data-admin", label: "Data Admin", icon: DataAdminIcon },
  { href: "/workspaces", label: "Workspaces", icon: WorkspacesIcon },
  { href: "/requests", label: "Requests", icon: RequestsIcon },
  { href: "https://www.alzheimersdata.org/tech-help/new-to-the-ad-data-initiative-start-here", label: "AD Connect", icon: ConnectIcon, external: true },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Maintenance Banner */}
      {!bannerDismissed && (
        <div className="bg-gray-900 text-white text-xs px-4 py-2 flex items-start gap-3 z-50">
          <span className="text-gray-400 mt-0.5 shrink-0">📢</span>
          <p className="flex-1 leading-relaxed">
            <strong>Scheduled Maintenance Notice</strong><br />
            Some AD Workbench workspaces will be temporarily unavailable from June 11–25, 2026 while we perform maintenance and upgrades.
            Users of affected workspaces have been notified directly. Requests for new workspaces will be processed after the maintenance period.
            Please contact the AD Workbench Support Desk (support@alzheimersdata.org) with any questions.
          </p>
          <button onClick={() => setBannerDismissed(true)} className="text-gray-400 hover:text-white shrink-0 text-sm">
            Dismiss ×
          </button>
        </div>
      )}

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className={`${collapsed ? "w-14" : "w-16"} bg-[#1a2332] flex flex-col shrink-0 transition-all`}>
          {/* Logo */}
          <div className="flex items-center justify-center py-3 border-b border-white/10">
            <ADIcon />
          </div>

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center py-2 text-gray-400 hover:text-white transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d={collapsed ? "M6 4l4 4-4 4" : "M10 4L6 8l4 4"} stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </button>

          {/* Nav items */}
          <nav className="flex flex-col flex-1 py-2">
            {NAV.map(({ href, label, icon: Icon, external }) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href));
              const cls = `flex flex-col items-center justify-center py-3 px-1 gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
                active ? "text-white bg-blue-600/20 border-r-2 border-blue-500" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`;
              if (external) {
                return (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                    <Icon active={active} />
                    <span className="leading-none text-center">{label}</span>
                  </a>
                );
              }
              return (
                <Link key={href} href={href} className={cls}>
                  <Icon active={active} />
                  <span className="leading-none text-center">{label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top header */}
          <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <ADWorkbenchLogo />
            </Link>
            <div className="flex items-center gap-4">
              <a href="#" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="7"/><path d="M8 7v5M8 5h.01"/>
                </svg>
                HELP
              </a>
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">MM</div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

// ── Icons ────────────────────────────────────────────────────
function ADIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <polygon points="16,2 30,9 30,23 16,30 2,23 2,9" stroke="#4a9eff" strokeWidth="1.5" fill="none"/>
      <text x="16" y="21" textAnchor="middle" fill="#4a9eff" fontSize="10" fontWeight="bold">AD</text>
    </svg>
  );
}

function ADWorkbenchLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <polygon points="16,2 30,9 30,23 16,30 2,23 2,9" stroke="#0066cc" strokeWidth="1.5" fill="none"/>
        <text x="16" y="21" textAnchor="middle" fill="#0066cc" fontSize="9" fontWeight="bold">AD</text>
      </svg>
      <span className="text-sm font-semibold text-gray-800"><strong>AD</strong> Workbench</span>
    </div>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#60a5fa" : "currentColor"} strokeWidth="1.5">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}
function CatalogIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#60a5fa" : "currentColor"} strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
    </svg>
  );
}
function DataAdminIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#60a5fa" : "currentColor"} strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
    </svg>
  );
}
function WorkspacesIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#60a5fa" : "currentColor"} strokeWidth="1.5">
      <rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>
    </svg>
  );
}
function RequestsIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#60a5fa" : "currentColor"} strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="12" y2="17"/>
    </svg>
  );
}
function ConnectIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? "#60a5fa" : "currentColor"} strokeWidth="1.5">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}
