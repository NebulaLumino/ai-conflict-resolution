"use client";

import { useState } from "react";
import { generateText } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";

function getDeepSeekClient() {
  return createDeepSeek({
    apiKey: "sk-48987c1a1dc246ecb1b52a01647e8b16",
  });
}

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
      const { text } = await generateText({
        model: getDeepSeekClient()("deepseek-chat"),
        system: `You are an expert conflict resolution mediator and organizational psychologist. You specialize in generating comprehensive, structured mediation frameworks and communication strategies tailored to each unique conflict situation. You draw from interest-based negotiation (Fisher & Ury), the Dual Process Model, BATNA analysis, and established mediation frameworks. Be thorough, empathetic, and practical in your advice. Format your output with clear markdown headers, bullet points, and structured sections.`,
        prompt: `Generate a comprehensive conflict resolution and mediation framework based on the following situation:

**Conflict Type:** ${form.conflictType || "Not specified"}
**Parties Involved:** ${form.partiesInvolved || "Not specified"}
**What the Dispute Is About:** ${form.disputeDescription || "Not specified"}
**Relationship History:** ${form.relationshipHistory || "Not specified"}
**What You Want/Need:** ${form.yourWantsNeeds || "Not specified"}
**What They Want/Need:** ${form.theirWantsNeeds || "Not specified"}
**Power Dynamics:** ${form.powerDynamics || "Not specified"}
**Previous Resolution Attempts:** ${form.previousAttempts || "None"}

Please generate a complete conflict resolution package including:

# Conflict Resolution & Mediation Framework

## 1. Conflict Type Assessment
Classify this conflict (interest-based, rights-based, or power-based) and explain why.

## 2. Interest Mapping
- Shared interests between parties
- Compatible interests
- Conflicting interests
- Underlying needs behind positions

## 3. BATNA Analysis
- Your BATNA (Best Alternative to Negotiated Agreement)
- Their BATNA
- How this affects negotiating position

## 4. Recommended Approach & Strategy
What mediation approach best fits this conflict type and why?

## 5. Facilitated Conversation Agenda
A step-by-step agenda for a facilitated dialogue between the parties.

## 6. Key Messages for Each Party
What should each party hear, and how should it be framed?

## 7. Draft Agreement Framework
A template for a formal or informal agreement that addresses the core issues.

## 8. Follow-Up & Monitoring Plan
How to ensure the agreement holds and the relationship heals.

## 9. Quick Wins & Early Victories
What small, achievable steps can be taken immediately to de-escalate?
`,
      });
      setOutput(text);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)",
      }}
    >
      {/* Header */}
      <header className="border-b border-purple-500/20 px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-purple-300">
            ⚖️ Conflict Resolution & Mediation Framework
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Generate a structured mediation framework for your conflict
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Conflict Type *
              </label>
              <select
                name="conflictType"
                value={form.conflictType}
                onChange={handleChange}
                required
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="">Select conflict type</option>
                <option value="interpersonal">Interpersonal</option>
                <option value="team">Team / Workgroup</option>
                <option value="organizational">Organizational</option>
                <option value="partnership">Partnership / Business</option>
                <option value="family">Family</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Parties Involved *
              </label>
              <input
                type="text"
                name="partiesInvolved"
                value={form.partiesInvolved}
                onChange={handleChange}
                required
                placeholder="e.g., Manager and 2 team members"
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                What the Dispute Is About *
              </label>
              <textarea
                name="disputeDescription"
                value={form.disputeDescription}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Describe the core issue in detail..."
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Relationship History
              </label>
              <textarea
                name="relationshipHistory"
                value={form.relationshipHistory}
                onChange={handleChange}
                rows={2}
                placeholder="How long have these parties known each other? Any prior conflicts?"
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                What You Want / Need
              </label>
              <textarea
                name="yourWantsNeeds"
                value={form.yourWantsNeeds}
                onChange={handleChange}
                rows={2}
                placeholder="Your interests and needs in this situation..."
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                What They Want / Need
              </label>
              <textarea
                name="theirWantsNeeds"
                value={form.theirWantsNeeds}
                onChange={handleChange}
                rows={2}
                placeholder="What you believe the other party's interests and needs are..."
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Power Dynamics
              </label>
              <input
                type="text"
                name="powerDynamics"
                value={form.powerDynamics}
                onChange={handleChange}
                placeholder="e.g., Manager has authority, one party has more expertise, equal power, etc."
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-purple-300 mb-1.5">
                Previous Resolution Attempts
              </label>
              <textarea
                name="previousAttempts"
                value={form.previousAttempts}
                onChange={handleChange}
                rows={2}
                placeholder="Have you tried to resolve this before? What happened?"
                className="w-full bg-gray-900/60 border border-purple-500/30 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm"
          >
            {loading ? "Generating Framework..." : "Generate Conflict Resolution Framework"}
          </button>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {output && (
          <div className="bg-gray-900/50 border border-purple-500/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-purple-300 mb-4">Generated Framework</h2>
            <div className="prose prose-invert prose-sm max-w-none text-gray-200 whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
