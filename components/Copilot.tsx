"use client";
import { useState, useRef, useEffect } from "react";
import { datasets, exampleQueries, Dataset } from "@/data/datasets";
import DatasetCard from "./DatasetCard";
import DatasetModal from "./DatasetModal";

interface CopilotResponse {
  answer: string;
  datasetIds: string[];
  reasoning: Record<string, string>;
  caveats?: string;
}

interface Message {
  role: "user" | "assistant";
  text: string;
  response?: CopilotResponse;
}

interface HistoryItem {
  query: string;
  timestamp: Date;
}

export default function Copilot() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function submit(q: string) {
    if (!q.trim() || loading) return;
    const userQ = q.trim();
    setQuery("");
    setMessages((prev) => [...prev, { role: "user", text: userQ }]);
    setHistory((prev) => [{ query: userQ, timestamp: new Date() }, ...prev.slice(0, 9)]);
    setLoading(true);

    const apiHistory = messages.map((m) => ({
      role: m.role,
      content: m.role === "assistant" ? m.text : m.text,
    }));

    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQ, history: apiHistory }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let raw = "";

      setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        raw += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", text: raw };
          return updated;
        });
      }

      // Parse JSON from streamed response
      try {
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed: CopilotResponse = JSON.parse(jsonMatch[0]);
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              text: parsed.answer,
              response: parsed,
            };
            return updated;
          });
        }
      } catch {
        // keep raw text if JSON parse fails
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function startNewTopic() {
    setMessages([]);
    setQuery("");
    inputRef.current?.focus();
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Panel */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col p-4 shrink-0">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span className="font-bold text-gray-900">ADDI Workbench</span>
        </div>

        <button
          onClick={startNewTopic}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg mb-6 transition-colors"
        >
          + New Research Query
        </button>

        {history.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Recent
            </p>
            <div className="space-y-1">
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => submit(h.query)}
                  className="w-full text-left text-sm text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg line-clamp-2 transition-colors"
                >
                  {h.query}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-2">Browse all datasets</p>
          <div className="space-y-1">
            {datasets.slice(0, 5).map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDataset(d)}
                className="w-full text-left text-xs text-gray-500 hover:text-indigo-600 px-2 py-1 rounded transition-colors"
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-indigo-600 text-lg">✦</span>
            <span className="font-semibold text-gray-800">Research Copilot</span>
          </div>
          <div className="flex gap-4 text-sm text-gray-500">
            <button className="hover:text-gray-800 transition-colors">Datasets</button>
            <button className="hover:text-gray-800 transition-colors">My Studies</button>
            <button className="hover:text-gray-800 transition-colors">Published</button>
          </div>
        </div>

        {/* Messages / Empty State */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {isEmpty ? (
            <div className="max-w-2xl mx-auto mt-12">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="text-indigo-600 text-2xl">✦</span>
                  <h1 className="text-2xl font-bold text-gray-900">ADDI Research Copilot</h1>
                </div>
                <p className="text-gray-500">
                  Ask research questions. Discover datasets. Explore Alzheimer's data.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {exampleQueries.map((q) => (
                  <button
                    key={q}
                    onClick={() => submit(q)}
                    className="text-left bg-white border border-gray-200 hover:border-indigo-400 rounded-xl px-4 py-3 text-sm text-gray-600 hover:text-indigo-700 transition-all group"
                  >
                    <span className="group-hover:mr-1 transition-all">→</span> {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg, i) => (
                <div key={i}>
                  {msg.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-lg text-sm">
                        {msg.text}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Answer text */}
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-5 py-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-indigo-600 text-sm">✦</span>
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Research Copilot
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {msg.response?.answer ?? msg.text}
                        </p>
                        {msg.response?.caveats && (
                          <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-700">
                            ⚠ {msg.response.caveats}
                          </div>
                        )}
                      </div>

                      {/* Dataset cards */}
                      {msg.response?.datasetIds && msg.response.datasetIds.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-400 font-medium mb-2 ml-1">
                            Relevant datasets ({msg.response.datasetIds.length})
                          </p>
                          <div className="grid grid-cols-2 gap-3">
                            {msg.response.datasetIds.map((id) => {
                              const ds = datasets.find((d) => d.id === id);
                              if (!ds) return null;
                              return (
                                <DatasetCard
                                  key={id}
                                  dataset={ds}
                                  reasoning={msg.response?.reasoning?.[id]}
                                  onClick={setSelectedDataset}
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-600 text-sm">✦</span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 px-8 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-indigo-400 focus-within:bg-white transition-all">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit(query)}
                placeholder="Ask about datasets, variables, cohorts, or study designs..."
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
              />
              <button
                id="ask-btn"
                onClick={() => submit(query)}
                disabled={!query.trim() || loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-lg px-4 py-1.5 text-sm font-medium transition-colors"
              >
                Ask
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              AI-generated responses. Verify dataset details before submitting a request.
            </p>
          </div>
        </div>
      </div>

      <DatasetModal dataset={selectedDataset} onClose={() => setSelectedDataset(null)} />
    </div>
  );
}
