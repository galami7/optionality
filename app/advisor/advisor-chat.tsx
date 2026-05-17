"use client";

import { useState, useRef, useEffect } from "react";

type Role = "user" | "ai" | "system";

type Message = {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
};

const suggestedQuestions = [
  "When should I file for OPT?",
  "Can I start a company on OPT?",
  "How does STEM OPT extension work?",
  "What is the 90-day unemployment rule?",
  "Can I freelance on OPT?",
  "What's the Launch Under Me program?",
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "ai",
    content:
      "Hi! I'm the OPTionality AI Advisor — trained on OPT timelines, STEM extension rules, self-employment structures, and international founder paths.\n\nAsk me anything. If I don't know, your question will go to Guillaume and he'll respond within 48 hours. Every question I can't answer makes the knowledge base better for the next person.",
    timestamp: new Date(),
  },
];

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export default function AdvisorChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSuggest(q: string) {
    setInput(q);
    inputRef.current?.focus();
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI processing — replace with real API call when ready
    await new Promise((r) => setTimeout(r, 1400 + Math.random() * 800));

    // Demo: roughly 1 in 4 questions triggers escalation to Guillaume
    const shouldEscalate = Math.random() < 0.25;

    if (shouldEscalate && !escalated) {
      setEscalated(true);
      const escalationMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "system",
        content:
          "This question is outside my current knowledge base. I've flagged it to Guillaume — he'll respond within 48 hours. In the meantime, your question has been logged to improve future answers for everyone.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, escalationMsg]);
    } else {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: getDemoResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }

    setIsTyping(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex flex-col flex-1 mx-auto w-full max-w-4xl px-4 sm:px-6">
      {/* Messages */}
      <div className="flex-1 py-6 space-y-5 overflow-y-auto">
        {/* Suggested questions — shown before first user message */}
        {messages.length === 1 && (
          <div className="mt-2">
            <p className="text-xs text-[#504133] mb-3 font-medium uppercase tracking-wide">Common questions</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggest(q)}
                  className="px-3 py-2 rounded-lg border border-white/[0.08] bg-[#161109] text-xs text-[#9E8B71] hover:border-[#C9A96E]/30 hover:text-[#EDE0CC] hover:bg-[#C9A96E]/5 transition-all text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30 flex items-center justify-center text-sm flex-shrink-0">
              🤖
            </div>
            <div className="chat-bubble-ai rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-5">
                <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="py-4 border-t border-white/[0.08]">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about OPT, STEM extension, self-employment on a visa…"
            rows={1}
            className="flex-1 resize-none px-4 py-3 rounded-xl bg-[#161109] border border-white/[0.12] text-[#EDE0CC] placeholder-[#504133] text-sm focus:outline-none focus:border-[#C9A96E]/50 focus:ring-1 focus:ring-[#C9A96E]/30 max-h-36 overflow-y-auto"
            style={{ minHeight: "48px" }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-5 py-3 rounded-xl bg-[#C9A96E] text-[#0C0A07] font-semibold text-sm hover:bg-[#D4B882] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 h-12"
          >
            Send
          </button>
        </form>
        <p className="text-xs text-[#504133] mt-2 text-center">
          Press <kbd className="px-1.5 py-0.5 rounded bg-[#161109] border border-white/[0.08] text-[#6E5E48] text-xs">Enter</kbd> to send · <kbd className="px-1.5 py-0.5 rounded bg-[#161109] border border-white/[0.08] text-[#6E5E48] text-xs">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="chat-bubble-system rounded-2xl px-5 py-4 max-w-xl text-sm leading-relaxed">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">⚡</span>
            <span className="font-semibold text-xs uppercase tracking-wide">Routed to Guillaume</span>
          </div>
          <p>{message.content}</p>
          <p className="text-xs mt-2 opacity-60">{formatTime(message.timestamp)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
          isUser
            ? "bg-[#1E1812] border border-white/[0.12] text-[#9E8B71]"
            : "bg-[#C9A96E]/15 border border-[#C9A96E]/30"
        }`}
      >
        {isUser ? "👤" : "🤖"}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "chat-bubble-user rounded-tr-sm font-medium"
              : "chat-bubble-ai rounded-tl-sm"
          }`}
        >
          {message.content}
        </div>
        <span className="text-xs text-[#504133] px-1">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
}

function getDemoResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("when") && q.includes("file")) {
    return "You can file for OPT between 90 and 120 days before your graduation date — but first, your OIS office needs to issue an OPT I-20, which typically takes 1–3 weeks to process internally. So your real timeline is: open a request with your OIS 90 days before graduation, get the updated I-20, then submit your I-765 to USCIS.\n\nCurrent USCIS processing time is ~3–5 months, so filing as early as possible (day 90 before graduation) is critical. Request a start date on your graduation date or up to 60 days after to give yourself flexibility.";
  }

  if (q.includes("company") || q.includes("startup") || q.includes("found") || q.includes("self-employ")) {
    return "Yes — you can start a company on OPT. The key requirement is the \"bona fide employer-employee relationship\" test: your LLC must be a real, registered entity (with an EIN), you must be paid a salary (not just equity or sweat equity), and your role must be in your field of study.\n\nThe cleanest structure:\n• Register an LLC before your OPT start date\n• Set yourself up on payroll (Wave Payroll works well)\n• Document that the company directs your work via board resolutions\n• Keep weekly hours above 20 and document them\n\nHighly recommend one immigration attorney consult (~$300–500) before you start — structuring it right in month one saves a lot of problems in month 12.";
  }

  if (q.includes("stem") || q.includes("extension")) {
    return "STEM OPT adds 24 months to your standard 12-month OPT — bringing your total to 36 months.\n\nTo qualify:\n✓ Your degree must be on the DHS STEM Designated Degree Program List\n✓ Your employer must be enrolled in E-Verify\n✓ You must complete Form I-983 (Training Plan) with your employer\n✓ You must file within 90 days of your standard OPT expiry\n\nIf your STEM application is pending when standard OPT expires, you get a 180-day automatic cap gap — you can keep working legally during that window. Don't stop working.\n\nBig practical tip: if STEM extension is part of your plan, verify your employer is E-Verify enrolled before accepting the offer. Not just registered — actively enrolled.";
  }

  if (q.includes("90") || q.includes("unemployment")) {
    return "The 90-day unemployment limit means you can have no more than 90 cumulative days of unemployment during your standard OPT period — and 150 cumulative days if you also complete a STEM extension.\n\n\"Unemployment\" starts counting the day your OPT EAD is valid (your start date), not the day you get the card. So even if USCIS is still processing your application, your clock may be running.\n\nA day of unemployment = any day you're not employed at least 20 hours/week in a job related to your field of study. If you hit 90 days, your OPT terminates automatically — no notice from USCIS.\n\nKeep a simple log: date, employer, hours/week. If you're ever audited, you want that record.";
  }

  if (q.includes("freelance") || q.includes("contract")) {
    return "Freelancing on OPT is possible but has real constraints. USCIS requires that all OPT employment constitute a genuine employer-employee relationship — which means pure contractor arrangements (you invoice clients, no one employs you) are a gray area.\n\nThe safer approach most attorneys recommend: set up an LLC, employ yourself through it, and treat clients as the LLC's customers. That gives you the employer-employee relationship with your own company, plus flexibility to take on multiple clients.\n\nOne catch: the work must be in your field of study. If you're a CS grad doing software freelance work, that's clean. If you're a marketing grad doing freelance photography, that's risky.\n\nThis is a case where I'd strongly recommend 30 minutes with an immigration attorney before you start invoicing.";
  }

  if (q.includes("launch under me") || q.includes("employer of record")) {
    return "\"Launch Under Me\" is OPTionality's signature program launching in late 2026.\n\nHere's how it works: you join Gruyters Ventures LLC as a W-2 employee. That makes Guillaume your OPT employer of record. You then build your own company underneath that umbrella — your IP stays 100% yours, equity is optional, and you get the brand association and peer support of the OPTionality network.\n\nRequirements:\n• Must be in a field of study that maps to your work at Gruyters Ventures\n• Must be compensated (OPT doesn't allow unpaid employment)\n• 20+ hours/week documented\n• Two documents: an Offer Letter and a Project Addendum\n\nThis is still in development — join the waitlist to be notified when spots open.";
  }

  return "That's a great question — let me give you what I know on this topic.\n\nOPT navigation has a lot of edge cases that depend on your specific degree program, graduation date, school's OIS policies, and the type of work you're looking to do. The general framework is: OPT is 12 months (or 36 with STEM extension), requires employment in your field of study for 20+ hours/week, and has a 90-day unemployment limit.\n\nIf your question is more specific than what I've covered here, I'd recommend:\n1. Checking your school's OIS website for institution-specific rules\n2. Posting in the OPTionality community (joining the waitlist gets you access)\n3. Booking a free 1-on-1 with Guillaume once we launch June 15\n\nWant me to go deeper on any specific part of this?";
}
