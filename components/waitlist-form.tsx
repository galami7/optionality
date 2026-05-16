"use client";

export default function WaitlistForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-3 rounded-xl bg-[#0F1729] border border-white/[0.12] text-[#F8FAFC] placeholder-[#475569] text-sm focus:outline-none focus:border-[#22C55E]/50 focus:ring-1 focus:ring-[#22C55E]/30"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-[#22C55E] text-[#080D1A] font-semibold text-sm hover:bg-[#4ADE80] transition-colors whitespace-nowrap"
      >
        Join waitlist →
      </button>
    </form>
  );
}
