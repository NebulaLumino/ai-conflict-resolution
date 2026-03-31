"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ConflictResolutionPage() {
  const [form, setForm] = useState({
    conflictType: "",
    partiesInvolved: "",
    disputeDescription: "",
    relationshipHistory: "",
    yourWantsNeeds: "",
    theirWantsNeeds: "",
    powerDynamics: "",
    previousAttempts: "",
  });
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: `**Conflict Type:** ${form.conflictType || "Not specified"}
**Parties Involved:** ${form.partiesInvolved || "Not specified"}
**What the Dispute Is About:** ${form.disputeDescription || "Not specified"}
**Relationship History:** ${form.relationshipHistory || "Not specified"}
**What You Want / Need:** ${form.yourWantsNeeds || "Not specified"}
**What They Want / Need:** ${form.theirWantsNeeds || "Not specified"}
**Power Dynamics:** ${form.powerDynamics || "Not specified"}
**Previous Resolution Attempts:** ${form.previousAttempts || "None"}`,
          options: {},
        }),
      });
      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();
      setOutput(data.output || "");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)" }}>
      <header className="border-b px-6 py-5" style={{ borderColor: "hsl(90, 70%, 50%, 0.3)", backgroundColor: "rgba(0,0,0,0.3)" }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold" style={{ color: "hsl(90, 70%, 50%)" }}>⚖️ Conflict Resolution &amp; Mediation Framework</h1>
          <p className="text-gray-400 text-sm mt-1">Generate a structured mediation framework for your conflict</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-5 p-6 rounded-2xl border" style={{ backgroundColor: "rgba(15,15,15,0.8)", borderColor: "rgba(255,255,255,0.08)" }}>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(90, 70%, 50%)" }}>Conflict Type *</label>
                <select name="conflictType" value={form.conflictType} onChange={handleChange} required className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-lime-500/60">
                  <option value="">Select conflict type</option>
                  <option value="interpersonal">Interpersonal</option>
                  <option value="team">Team / Workgroup</option>
                  <option value="organizational">Organizational</option>
                  <option value="partnership">Partnership / Business</option>
                  <option value="family">Family</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(90, 70%, 50%)" }}>Parties Involved *</label>
                <input type="text" name="partiesInvolved" value={form.partiesInvolved} onChange={handleChange} required placeholder="e.g., Manager and 2 team members" className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-lime-500/60" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(90, 70%, 50%)" }}>What the Dispute Is About *</label>
                <textarea name="disputeDescription" value={form.disputeDescription} onChange={handleChange} required rows={3} placeholder="Describe the core issue in detail..." className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-lime-500/60 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(90, 70%, 50%)" }}>Relationship History</label>
                <textarea name="relationshipHistory" value={form.relationshipHistory} onChange={handleChange} rows={2} placeholder="How long have these parties known each other? Any prior conflicts?" className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-lime-500/60 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(90, 70%, 50%)" }}>What You Want / Need</label>
                <textarea name="yourWantsNeeds" value={form.yourWantsNeeds} onChange={handleChange} rows={2} placeholder="Your interests and needs in this situation..." className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-lime-500/60 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(90, 70%, 50%)" }}>What They Want / Need</label>
                <textarea name="theirWantsNeeds" value={form.theirWantsNeeds} onChange={handleChange} rows={2} placeholder="What you believe the other party&apos;s interests are..." className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-lime-500/60 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(90, 70%, 50%)" }}>Power Dynamics</label>
                <input type="text" name="powerDynamics" value={form.powerDynamics} onChange={handleChange} placeholder="e.g., Manager has authority, one party has more expertise" className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-lime-500/60" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(90, 70%, 50%)" }}>Previous Resolution Attempts</label>
                <textarea name="previousAttempts" value={form.previousAttempts} onChange={handleChange} rows={2} placeholder="Have you tried to resolve this before? What happened?" className="w-full bg-gray-900/70 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-lime-500/60 resize-none" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 px-6 rounded-lg font-semibold text-black transition-all disabled:opacity-50 text-sm" style={{ backgroundColor: loading ? "hsl(90, 70%, 40%)" : "hsl(90, 70%, 50%)" }}>
                {loading ? "Generating Framework..." : "Generate Conflict Resolution Framework"}
              </button>
            </form>
          </div>
          <div>
            {error && <div className="mb-6 p-4 bg-red-900/20 border border-red-500/40 rounded-xl text-red-300 text-sm">{error}</div>}
            {output ? (
              <div className="p-6 rounded-2xl border" style={{ backgroundColor: "rgba(15,15,15,0.8)", borderColor: "rgba(255,255,255,0.08)" }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: "hsl(90, 70%, 50%)" }}>Your Mediation Framework</h2>
                <div className="prose prose-invert prose-sm max-w-none text-gray-200"><ReactMarkdown>{output}</ReactMarkdown></div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center rounded-2xl border border-dashed border-white/10 p-12" style={{ backgroundColor: "rgba(15,15,15,0.4)" }}>
                <div className="text-center text-gray-500"><div className="text-4xl mb-4">⚖️</div><p className="text-sm">Your framework will appear here</p></div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
