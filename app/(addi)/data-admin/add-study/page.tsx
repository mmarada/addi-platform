"use client";
import { useState } from "react";
import Link from "next/link";

const SECTIONS = ["Overview", "Contacts", "Data Summary", "Datasets", "Use Conditions and Restrictions", "Publications", "Personal Data Usage Agreement"];

export default function AddStudyPage() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [form, setForm] = useState({
    website: "", name: "", acronym: "", institution: "", startYear: "",
    status: "", endYear: "", site: "", researchApproach: "",
    countries: "", cities: "", description: "", fundingSources: "", keywords: "",
    piName: "", piEmail: "", piOrg: "",
    ageCoverage: "", racialCoverage: "",
    birthSex: [] as string[],
    subjectTotal: "", cogNormal: "", cogNormalAmyloid: "", mci: "",
    adPreclinical: "", adProdromal: "", adDementia: "", adUnspecified: "",
  });

  function set(key: string, val: string) { setForm((f) => ({ ...f, [key]: val })); }
  function toggleBirthSex(v: string) {
    setForm((f) => ({
      ...f,
      birthSex: f.birthSex.includes(v) ? f.birthSex.filter((x) => x !== v) : [...f.birthSex, v],
    }));
  }

  return (
    <div className="flex h-full">
      {/* Left nav */}
      <aside className="w-64 border-r border-gray-200 bg-white p-4 overflow-y-auto shrink-0">
        <Link href="/data-admin" className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 mb-4">
          ← Back to Catalog
        </Link>

        <div className="border border-gray-200 rounded">
          <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <span>≡</span> Overview
            </div>
            <span className="text-gray-400 text-sm border-l-2 border-blue-500 pl-2">∨</span>
          </div>
          <nav className="py-1">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${
                  activeSection === s ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {s}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-8 min-w-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Add new Study</h1>
        <p className="text-sm text-gray-600 mb-8">Please complete the form below and submit for upload to the Study Catalog.</p>

        {/* Overview */}
        <Section title="Overview">
          <FormRow label="Website"><input value={form.website} onChange={(e) => set("website", e.target.value)} className="addi-input" /></FormRow>
          <FormRow label="Name *"><input required value={form.name} onChange={(e) => set("name", e.target.value)} className="addi-input" /></FormRow>
          <FormRow label="Acronym *"><input required value={form.acronym} onChange={(e) => set("acronym", e.target.value)} className="addi-input" /></FormRow>
          <FormRow label="Institution"><input value={form.institution} onChange={(e) => set("institution", e.target.value)} className="addi-input" /></FormRow>
          <FormRow label="Start Year *"><input required value={form.startYear} onChange={(e) => set("startYear", e.target.value)} className="addi-input" /></FormRow>
          <FormRow label="Status *">
            <div className="flex flex-col gap-1.5">
              {["Ongoing", "Finished"].map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="status" value={v} checked={form.status === v} onChange={() => set("status", v)} className="accent-blue-600" />
                  {v}
                </label>
              ))}
            </div>
          </FormRow>
          <FormRow label="End Year"><input value={form.endYear} onChange={(e) => set("endYear", e.target.value)} className="addi-input" /></FormRow>
          <FormRow label="Site">
            <div className="flex flex-col gap-1.5">
              {["Single-site", "Multi-site"].map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="site" value={v} checked={form.site === v} onChange={() => set("site", v)} className="accent-blue-600" />
                  {v}
                </label>
              ))}
            </div>
          </FormRow>
          <FormRow label="Research Approach">
            <div className="flex flex-col gap-1.5">
              {["Observational", "Interventional", "FINGER-Based"].map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="radio" name="approach" value={v} checked={form.researchApproach === v} onChange={() => set("researchApproach", v)} className="accent-blue-600" />
                  {v}
                </label>
              ))}
            </div>
          </FormRow>
          <FormRow label="Countries *">
            <input value={form.countries} onChange={(e) => set("countries", e.target.value)} placeholder="Click for suggestions" className="addi-input" />
          </FormRow>
          <FormRow label="Cities">
            <input value={form.cities} onChange={(e) => set("cities", e.target.value)} placeholder="Please write your answers separated by comma" className="addi-input" />
          </FormRow>
          <FormRow label="Description *">
            <textarea rows={5} value={form.description} onChange={(e) => set("description", e.target.value)} className="addi-input resize-none" />
          </FormRow>
        </Section>

        <div className="border border-gray-200 rounded p-4 mb-6 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Related Documents</span>
          <button className="btn-primary text-xs py-1.5 px-3">+ Add Files</button>
        </div>

        <FormRow label="Funding Sources">
          <textarea rows={4} value={form.fundingSources} onChange={(e) => set("fundingSources", e.target.value)} className="addi-input resize-none" />
        </FormRow>
        <FormRow label="Keywords *">
          <input value={form.keywords} onChange={(e) => set("keywords", e.target.value)} placeholder="Click for suggestions" className="addi-input" />
        </FormRow>

        {/* Contacts */}
        <Section title="Contacts">
          <div className="border border-gray-200 rounded p-5 mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Principal Investigators *</h3>
            <FormRow label="Name *"><input value={form.piName} onChange={(e) => set("piName", e.target.value)} className="addi-input" /></FormRow>
            <FormRow label="Email *"><input type="email" value={form.piEmail} onChange={(e) => set("piEmail", e.target.value)} className="addi-input" /></FormRow>
            <FormRow label="Organization"><input value={form.piOrg} onChange={(e) => set("piOrg", e.target.value)} className="addi-input" /></FormRow>
            <div className="flex gap-3 mt-4 justify-end">
              <button className="btn-outline text-xs py-1.5 px-4">Cancel</button>
              <button className="btn-primary text-xs py-1.5 px-4">Submit</button>
            </div>
          </div>
          <CollapsibleContact title="Secondary Investigators" />
          <CollapsibleContact title="Data Managers" />
        </Section>

        {/* Data Summary */}
        <Section title="Data Summary">
          <div className="border border-gray-200 rounded p-5 mb-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Summary Statistics</h3>
              <button className="btn-primary text-xs py-1.5 px-3">+ Add statistic</button>
            </div>
            <FormRow label="Age Coverage"><input value={form.ageCoverage} onChange={(e) => set("ageCoverage", e.target.value)} className="addi-input" /></FormRow>
            <FormRow label="Racial Coverage"><input value={form.racialCoverage} onChange={(e) => set("racialCoverage", e.target.value)} className="addi-input" /></FormRow>
            <FormRow label="Birth Sex Coverage">
              <div className="flex flex-col gap-1.5">
                {["Female", "Male", "Not available"].map((v) => (
                  <label key={v} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="checkbox" checked={form.birthSex.includes(v)} onChange={() => toggleBirthSex(v)} className="accent-blue-600" />
                    {v}
                  </label>
                ))}
              </div>
            </FormRow>
          </div>

          <h3 className="text-sm font-semibold text-gray-700 mb-4">Number of Participants Group</h3>
          {[
            ["Subject Count Total", "subjectTotal"],
            ["Cognitively normal", "cogNormal"],
            ["Cognitively normal elevated amyloid", "cogNormalAmyloid"],
            ["Mild Cognitive Impairment (MCI)", "mci"],
            ["Alzheimer's disease (AD) Preclinical", "adPreclinical"],
            ["Alzheimer's disease (AD) Prodromal", "adProdromal"],
            ["Alzheimer's disease (AD) Dementia", "adDementia"],
            ["Alzheimer's disease (AD) Unspecified", "adUnspecified"],
          ].map(([label, key]) => (
            <FormRow key={key} label={label}>
              <input value={(form as Record<string, string>)[key]} onChange={(e) => set(key, e.target.value)} className="addi-input" />
            </FormRow>
          ))}

          <CollapsibleQuestion title="Have you collected biosamples?" />
          <CollapsibleQuestion title="Have you collected imaging data?" />
        </Section>
      </div>

      {/* Right status panel */}
      <aside className="w-52 border-l border-gray-200 bg-white p-4 shrink-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#0066cc">
            <path d="M13.5 1h-11A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0013.5 1zM5 12l-3-3 1-1 2 2 5-5 1 1z"/>
          </svg>
          Adding Study
        </div>
        <button className="btn-primary w-full justify-center mb-2">Save as draft</button>
        <button className="btn-primary w-full justify-center">Submit to catalog</button>
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-5">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-6 mb-4">
      <label className="text-sm text-gray-700 pt-2 w-48 shrink-0">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function CollapsibleContact({ title }: { title: string }) {
  return (
    <div className="border border-gray-200 rounded p-4 mb-3 flex items-center justify-between">
      <span className="text-sm font-semibold text-gray-700">{title}</span>
      <button className="btn-primary text-xs py-1.5 px-3">+ Add contact</button>
    </div>
  );
}

function CollapsibleQuestion({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full flex items-center justify-between border-b border-gray-200 py-3 text-sm text-gray-700 hover:text-gray-900 transition-colors"
    >
      {title}
      <span className="text-gray-400 text-lg">{open ? "−" : "+"}</span>
    </button>
  );
}
