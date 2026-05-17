import type { Metadata } from "next";
import AdvisorChat from "./advisor-chat";

export const metadata: Metadata = {
  title: "AI Advisor — Ask OPTionality Anything",
  description:
    "Ask the OPTionality AI Advisor anything about OPT timelines, STEM extensions, self-employment on a visa, and more. When the AI doesn't know, your question goes directly to Guillaume.",
};

export default function AdvisorPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="border-b border-white/[0.08] bg-[#161109] px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C9A96E]/15 border border-[#C9A96E]/30 flex items-center justify-center text-xl flex-shrink-0">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-[#EDE0CC]">OPTionality AI Advisor</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#C9A96E]/10 text-[#C9A96E] text-xs font-medium border border-[#C9A96E]/20">
                  Beta
                </span>
              </div>
              <p className="text-sm text-[#9E8B71]">
                Ask anything about OPT, STEM extensions, self-employment on a visa, employer timelines, and more.
                When the AI doesn&apos;t know, your question goes to Guillaume — and the answer grows the knowledge base.
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            {[
              { step: "01", title: "You ask", body: "Any OPT or founder question — no question is too basic." },
              { step: "02", title: "AI answers", body: "Instant response from the OPTionality knowledge base." },
              { step: "03", title: "If it can't — Guillaume does", body: "Complex or novel questions route to Guillaume within 48h." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex items-start gap-3 p-3 rounded-xl bg-[#0C0A07] border border-white/[0.06]">
                <span className="text-xs font-mono text-[#C9A96E] mt-0.5">{step}</span>
                <div>
                  <p className="text-xs font-semibold text-[#EDE0CC] mb-0.5">{title}</p>
                  <p className="text-xs text-[#6E5E48] leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat UI */}
      <div className="flex-1 flex flex-col">
        <AdvisorChat />
      </div>

      {/* Legal disclaimer */}
      <div className="border-t border-white/[0.08] bg-[#0C0A07] px-4 py-3 text-center">
        <p className="text-xs text-[#504133]">
          Peer navigation only — not legal advice. For individual visa questions, consult a licensed immigration attorney.
        </p>
      </div>
    </div>
  );
}
