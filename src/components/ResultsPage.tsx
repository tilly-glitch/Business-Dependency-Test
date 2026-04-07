"use client";

import { GAP_COPY, type Task } from "@/lib/constants";
import type { CalcResults } from "@/lib/scoring";
import ScoreCircle from "./ScoreCircle";
import CostCounter from "./CostCounter";

interface ResultsPageProps {
  firstName: string;
  results: CalcResults;
  goodDayHours: number;
  badDayHours: number;
  badDaysPerMonth: number;
  catchUpLabel: string;
  catchUpDays: number;
  lostClient: string;
  stopsWhenCrash: Task[];
}

function getScoreLabel(score: number): { label: string; color: string } {
  if (score > 70) return { label: "CRITICAL", color: "#E53E3E" };
  if (score >= 41) return { label: "AT RISK", color: "#DD6B20" };
  return { label: "GETTING THERE", color: "#38A169" };
}

function getHeadlineSubtext(score: number): string {
  if (score > 70) {
    return "That means when your body taps out, your business taps out with it.";
  }
  if (score >= 41) {
    return "You've started building safeguards, but your business still needs you more than it should.";
  }
  return "You're ahead of most. But there are still gaps that could cost you on a bad day.";
}

export default function ResultsPage({
  firstName,
  results,
  goodDayHours,
  badDayHours,
  badDaysPerMonth,
  catchUpLabel,
  catchUpDays,
  lostClient,
  stopsWhenCrash,
}: ResultsPageProps) {
  const { label: scoreLabel, color: scoreColor } = getScoreLabel(
    results.dependencyScore
  );

  return (
    <div
      className="fade-in rounded-2xl p-6"
      style={{
        backgroundColor: "#ffffff",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
      }}
    >
      {/* Section 1: Headline */}
      <div className="text-center mb-8">
        <h1
          className="text-2xl mb-4"
          style={{ fontFamily: "Georgia, serif", color: "#11114E" }}
        >
          {firstName}, your business is{" "}
          <span style={{ color: "#F687B3" }}>{results.dependencyScore}%</span>{" "}
          dependent on you.
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
          {getHeadlineSubtext(results.dependencyScore)}
        </p>
      </div>

      {/* Section 2: Score Circle */}
      <div className="flex justify-center mb-8">
        <ScoreCircle
          score={results.dependencyScore}
          label={scoreLabel}
          labelColor={scoreColor}
        />
      </div>

      {/* Section 3: Cost Box */}
      <div
        className="rounded-2xl p-6 mb-8 text-center"
        style={{ backgroundColor: "#11114E" }}
      >
        <p className="text-sm mb-2" style={{ color: "#FBB6CE" }}>
          Estimated cost of your crashes
        </p>
        <div
          className="text-4xl font-bold mb-1"
          style={{ color: "#ffffff", fontFamily: "Georgia, serif" }}
        >
          <CostCounter value={results.monthlyCostLost} prefix="$" suffix="/mo" />
        </div>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
          That&apos;s{" "}
          <span className="font-semibold" style={{ color: "#F687B3" }}>
            ${results.annualCost.toLocaleString()}/year
          </span>{" "}
          walking out the door while you&apos;re on the couch feeling guilty for resting.
        </p>

        <div
          className="grid grid-cols-2 gap-4 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
        >
          <div>
            <div className="text-2xl font-bold" style={{ color: "#ffffff" }}>
              {results.monthlyHoursLost}
            </div>
            <div
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              hours lost/month
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ color: "#ffffff" }}>
              ${results.hourlyRate}
            </div>
            <div
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              your hourly rate
            </div>
          </div>
        </div>

        {lostClient !== "No" && (
          <div
            className="mt-5 pt-4 text-sm font-semibold leading-relaxed"
            style={{
              color: "#FBB6CE",
              borderTop: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {lostClient === "Yes"
              ? "And you've already lost clients to crashes. That cost isn't in this number."
              : "And you suspect you've lost clients to crashes. That cost isn't in this number either."}
          </div>
        )}
      </div>

      {/* Section 4: Good Day vs Bad Day */}
      <div className="mb-8">
        <h2
          className="text-lg mb-4 text-center"
          style={{ fontFamily: "Georgia, serif", color: "#11114E" }}
        >
          Your good days vs. your bad days
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-xl p-4 text-center"
            style={{
              backgroundColor: "rgba(246,135,179,0.08)",
              border: "1px solid #FBB6CE",
            }}
          >
            <div
              className="text-2xl font-bold"
              style={{ color: "#11114E", fontFamily: "Georgia, serif" }}
            >
              {goodDayHours}h
            </div>
            <div className="text-xs mt-1" style={{ color: "#888" }}>
              Good day
            </div>
          </div>
          <div
            className="rounded-xl p-4 text-center"
            style={{ backgroundColor: "#f3f4f6", border: "1px solid #d1d5db" }}
          >
            <div
              className="text-2xl font-bold"
              style={{ color: "#11114E", fontFamily: "Georgia, serif" }}
            >
              {badDayHours}h
            </div>
            <div className="text-xs mt-1" style={{ color: "#888" }}>
              Bad day
            </div>
          </div>
        </div>

        <p className="text-sm text-center mt-3" style={{ color: "#666" }}>
          {badDaysPerMonth} bad days/month &middot; {catchUpLabel} to catch up
        </p>

        {stopsWhenCrash.length > 0 && (
          <div className="mt-4">
            <p className="text-xs mb-2 font-semibold" style={{ color: "#888" }}>
              Stops when you crash:
            </p>
            <div className="flex flex-wrap gap-2">
              {stopsWhenCrash.map((task) => (
                <span
                  key={task}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: "#fef2f2",
                    color: "#e53e3e",
                    border: "1px solid #fecaca",
                  }}
                >
                  ✗ {task}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section 5: What to fix first */}
      {(results.gapPriority1 || results.gapPriority2) && (
        <div className="mb-8">
          <h2
            className="text-lg mb-4"
            style={{ fontFamily: "Georgia, serif", color: "#11114E" }}
          >
            What to fix first
          </h2>
          <p className="text-sm mb-4" style={{ color: "#666" }}>
            Based on business impact, these are the gaps hurting you most:
          </p>

          {results.gapPriority1 && (
            <div
              className="rounded-xl p-4 mb-3"
              style={{
                backgroundColor: "rgba(246,135,179,0.08)",
                border: "1px solid #FBB6CE",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#F687B3", color: "#ffffff" }}
                >
                  #1
                </span>
                <span
                  className="font-semibold text-sm"
                  style={{ color: "#11114E" }}
                >
                  {results.gapPriority1}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                {GAP_COPY[results.gapPriority1]}
              </p>
            </div>
          )}

          {results.gapPriority2 && (
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#d1d5db", color: "#374151" }}
                >
                  #2
                </span>
                <span
                  className="font-semibold text-sm"
                  style={{ color: "#11114E" }}
                >
                  {results.gapPriority2}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                {GAP_COPY[results.gapPriority2]}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Section 6: CTA */}
      <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: "#11114E" }}>
        <h2
          className="text-lg mb-3 text-center"
          style={{ fontFamily: "Georgia, serif", color: "#ffffff" }}
        >
          You don&apos;t need to work harder.
          <br />
          You need a business that works without you.
        </h2>
        <p
          className="text-sm text-center mb-5 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          I build automation systems for women with autoimmune conditions so
          your business keeps running on your worst days. No hustle culture.
          No 12-hour days. Just systems that run when your body says no.
        </p>
        <p
          className="text-sm text-center mb-5 leading-relaxed font-semibold"
          style={{ color: "#FBB6CE" }}
        >
          If this hit hard — reply to the email you&apos;re about to get and
          tell me what landed hardest.
        </p>
        <p
          className="text-center text-sm"
          style={{ color: "#F687B3", fontFamily: "Georgia, serif" }}
        >
          — Tilly, Efficiency Integration
        </p>
      </div>

      {/* Footer */}
      <p className="text-center text-xs pb-4" style={{ color: "#aaa" }}>
        efficiencyintegration.io
      </p>
    </div>
  );
}
