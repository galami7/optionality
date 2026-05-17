import type { Metadata } from "next";
import TimelineTool from "./timeline-tool";

export const metadata: Metadata = {
  title: "OPT Timeline Calculator — Know Your Exact Deadlines",
  description:
    "Enter your graduation date and degree info to instantly generate a personalized OPT timeline — OIS filing windows, USCIS deadlines, 90-day unemployment clock, and STEM extension dates.",
};

export default function TimelinePage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E] mb-3">Free Tool</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#EDE0CC] mb-4">
            Your OPT timeline,<br className="hidden sm:block" /> to the day.
          </h1>
          <p className="text-[#9E8B71] text-lg max-w-xl mx-auto">
            Enter your graduation details and we&apos;ll generate every critical deadline — color-coded by urgency.
            No login. No email required.
          </p>
        </div>

        <TimelineTool />
      </div>
    </div>
  );
}
