"use client";

import { useState } from "react";
import {
  TASKS,
  REVENUE_OPTIONS,
  CATCHUP_OPTIONS,
  LOST_CLIENT_OPTIONS,
  type Task,
} from "@/lib/constants";
import { calculate, type CalcResults } from "@/lib/scoring";
import { submitToWebhook } from "@/lib/webhook";
import ProgressBar from "./ProgressBar";
import Slider from "./Slider";
import CheckGrid from "./CheckGrid";
import OptionButtons from "./OptionButtons";
import ResultsPage from "./ResultsPage";

const GOOD_DAY_TEXT: Record<string, string> = {
  "2-4": "That's a tight window. Every hour counts.",
  "5-7": "Solid. But there's no margin for error.",
  "8-12": "Big output — when your body allows it.",
};

const BAD_DAY_TEXT: Record<string, string> = {
  "0-0": "Zero. And there's nothing wrong with that.",
  "1-2": "Enough to keep the lights on — if the right things are automated.",
  "3-6": "You're still pushing. The question is what it's costing you.",
};

const BAD_DAYS_TEXT: Record<string, string> = {
  "1-4": "A few days. Manageable with the right system.",
  "5-10": "That's 1-2 weeks of reduced capacity every month.",
  "11-20": "More bad days than good. Your business needs a backup plan, not more willpower.",
};

export default function Calculator() {
  const [step, setStep] = useState(0);

  // Step 0: Capture
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  // Step 1-3: Sliders
  const [goodDayHours, setGoodDayHours] = useState(6);
  const [badDayHours, setBadDayHours] = useState(2);
  const [badDaysPerMonth, setBadDaysPerMonth] = useState(5);

  // Step 4-5: Multi/single select
  const [stopsWhenCrash, setStopsWhenCrash] = useState<Task[]>([]);
  const [automated, setAutomated] = useState<Task[]>([]);

  // Step 6: Revenue
  const [revenueValue, setRevenueValue] = useState<number | null>(null);

  // Step 7: Catch-up + lost client
  const [catchUpValue, setCatchUpValue] = useState<number | null>(null);
  const [lostClient, setLostClient] = useState<string | null>(null);

  // Results
  const [results, setResults] = useState<CalcResults | null>(null);

  function canProceed(): boolean {
    switch (step) {
      case 0:
        return firstName.trim().length > 0 && email.trim().includes("@");
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return stopsWhenCrash.length > 0;
      case 5:
        return true; // automated can be empty
      case 6:
        return catchUpValue !== null;
      case 7:
        return revenueValue !== null && lostClient !== null;
      default:
        return false;
    }
  }

  function next() {
    if (!canProceed()) return;
    if (step < 7) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Calculate and show results
      const r = calculate({
        goodDayHours,
        badDayHours,
        badDaysPerMonth,
        stopsWhenCrash,
        automated,
        catchUpDays: catchUpValue!,
        revenueValue: revenueValue!,
      });
      setResults(r);

      const catchUpOption = CATCHUP_OPTIONS.find(
        (o) => o.value === catchUpValue
      );

      submitToWebhook({
        firstName,
        email,
        goodDayHours,
        badDayHours,
        badDaysPerMonth,
        stopsWhenCrash,
        automated,
        revenueValue,
        catchUpDays: catchUpValue,
        catchUpLabel: catchUpOption?.label ?? "",
        lostClient,
        dependencyScore: r.dependencyScore,
        monthlyHoursLost: r.monthlyHoursLost,
        monthlyCostLost: r.monthlyCostLost,
        annualCost: r.annualCost,
        hourlyRate: r.hourlyRate,
        gaps: r.gaps,
        gapPriority1: r.gapPriority1,
        gapPriority2: r.gapPriority2,
      });

      // Fire Meta pixel Lead event (client-side)
      try {
        const w = window as unknown as { fbq?: (...args: unknown[]) => void };
        w.fbq?.("track", "Lead", {
          currency: "USD",
          value: r.annualCost,
          content_name: "BDT Completed",
        });
      } catch {}

      // Fire server-side CAPI Lead event (deduped via event_id)
      try {
        const cookies =
          typeof document !== "undefined" ? document.cookie : "";
        const fbp = cookies.match(/_fbp=([^;]+)/)?.[1] ?? "";
        const fbc = cookies.match(/_fbc=([^;]+)/)?.[1] ?? "";
        fetch("/api/track-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            email,
            annualCost: r.annualCost,
            dependencyScore: r.dependencyScore,
            pageUrl:
              typeof window !== "undefined" ? window.location.href : "",
            fbp,
            fbc,
          }),
        }).catch(() => {});
      } catch {}

      setStep(8);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function back() {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Results screen
  if (step === 8 && results) {
    const catchUpOption = CATCHUP_OPTIONS.find(
      (o) => o.value === catchUpValue
    );
    return (
      <ResultsPage
        firstName={firstName}
        email={email}
        results={results}
        goodDayHours={goodDayHours}
        badDayHours={badDayHours}
        badDaysPerMonth={badDaysPerMonth}
        catchUpLabel={catchUpOption?.label ?? ""}
        catchUpDays={catchUpValue!}
        lostClient={lostClient!}
        stopsWhenCrash={stopsWhenCrash}
      />
    );
  }

  return (
    <div>
      {/* Step 0: Capture (hero style) */}
      {step === 0 && (
        <div className="fade-in">
          <div className="text-center mb-10 pt-8">
            <p className="text-base font-bold tracking-wider mb-8">
              <span className="text-white">Efficiency</span>
              <span style={{ color: "#fbb6ce" }}> Integration</span>
            </p>
            <h1
              className="font-black text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(28px, 7vw, 44px)" }}
            >
              Your business can&apos;t depend on
              <span className="block mt-2" style={{ color: "#fbb6ce" }}>
                your good days.
              </span>
            </h1>
            <p className="text-base text-white/85 leading-relaxed max-w-md mx-auto">
              In 90 seconds, see how dependent your business is on your good
              days, what your crashes are really costing you, and what to fix
              first.
            </p>
          </div>

          {/* Results preview mockup (what she'll see after submitting) */}
          <div
            className="rounded-2xl p-5 mb-4 relative overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px dashed rgba(251, 182, 206, 0.35)",
            }}
          >
            <p
              className="text-[10px] uppercase tracking-widest text-white/50 text-center mb-3 font-bold"
              style={{ letterSpacing: "0.15em" }}
            >
              Your results will look like this
            </p>
            <div className="flex items-center gap-4">
              {/* Mock score circle */}
              <div
                className="shrink-0 rounded-full flex items-center justify-center relative"
                style={{
                  width: 72,
                  height: 72,
                  background:
                    "conic-gradient(#F687B3 0% 72%, rgba(255,255,255,0.12) 72% 100%)",
                }}
              >
                <div
                  className="rounded-full flex flex-col items-center justify-center"
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: "#11114e",
                  }}
                >
                  <span
                    className="font-bold text-white leading-none"
                    style={{ fontSize: 18 }}
                  >
                    72%
                  </span>
                  <span
                    className="text-white/60 leading-none mt-0.5"
                    style={{ fontSize: 7 }}
                  >
                    AT RISK
                  </span>
                </div>
              </div>

              {/* Mock cost */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase text-pink-300/80 font-bold tracking-wider mb-0.5">
                  Monthly cost of crashes
                </p>
                <p
                  className="font-bold text-white leading-tight"
                  style={{ fontFamily: "Georgia, serif", fontSize: 24 }}
                >
                  $2,400/mo
                </p>
                <p className="text-[11px] text-white/60 leading-snug mt-1">
                  #1 to fix: Lead follow-up
                </p>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div
            className="rounded-xl p-4 mb-4 text-center"
            style={{
              backgroundColor: "rgba(251, 182, 206, 0.1)",
              border: "1px solid rgba(251, 182, 206, 0.3)",
            }}
          >
            <p className="text-sm leading-relaxed text-white/90 italic">
              Built by a former PT who burned out and got Hashimoto&apos;s.
              I use these systems to run my own business on bad days — so you
              can too.
            </p>
          </div>

          <div
            className="rounded-2xl p-6 mb-4"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div className="space-y-4 mb-5">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border-2 text-base outline-none transition-colors"
                style={{
                  borderColor: "#e5e7eb",
                  color: "#11114E",
                  minHeight: 44,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "#f687b3")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "#e5e7eb")
                }
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border-2 text-base outline-none transition-colors"
                style={{
                  borderColor: "#e5e7eb",
                  color: "#11114E",
                  minHeight: 44,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "#f687b3")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "#e5e7eb")
                }
              />
            </div>

            <button
              onClick={next}
              disabled={!canProceed()}
              className={`w-full py-4 rounded-xl font-black text-base transition-all hover:-translate-y-0.5 active:scale-[0.98] ${
                canProceed() ? "pulse-glow" : ""
              }`}
              style={{
                background: "linear-gradient(135deg, #fbb6ce 0%, #f687b3 100%)",
                color: "#11114e",
                opacity: canProceed() ? 1 : 0.55,
                cursor: canProceed() ? "pointer" : "not-allowed",
                minHeight: 56,
              }}
            >
              Show Me →
            </button>
          </div>

          <p className="text-center text-xs text-white/60">
            Free. No spam. Takes 90 seconds — be honest with yourself.
          </p>
        </div>
      )}

      {/* Steps 1-7 */}
      {step >= 1 && step <= 7 && (
        <div className="fade-in" key={step}>
          <ProgressBar currentStep={step} totalSteps={7} />

          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            }}
          >
            {/* Step 1: Good day hours */}
            {step === 1 && (
              <>
                <h2
                  className="text-lg mb-2"
                  style={{ fontFamily: "Georgia, serif", color: "#11114E" }}
                >
                  On a GOOD day...
                </h2>
                <p className="text-sm mb-6" style={{ color: "#888" }}>
                  When your body cooperates and you&apos;ve got energy — how many hours can you actually work?
                </p>
                <Slider
                  min={2}
                  max={12}
                  value={goodDayHours}
                  onChange={setGoodDayHours}
                  dynamicText={GOOD_DAY_TEXT}
                />
              </>
            )}

            {/* Step 2: Bad day hours */}
            {step === 2 && (
              <>
                <h2
                  className="text-lg mb-2"
                  style={{ fontFamily: "Georgia, serif", color: "#11114E" }}
                >
                  On a BAD day...
                </h2>
                <p className="text-sm mb-6" style={{ color: "#888" }}>
                  When the flare hits, the fatigue is heavy, or your body says no — how many hours can you realistically work?
                </p>
                <Slider
                  min={0}
                  max={6}
                  value={badDayHours}
                  onChange={setBadDayHours}
                  dynamicText={BAD_DAY_TEXT}
                />
              </>
            )}

            {/* Step 3: Bad days per month */}
            {step === 3 && (
              <>
                <h2
                  className="text-lg mb-2"
                  style={{ fontFamily: "Georgia, serif", color: "#11114E" }}
                >
                  How many bad days per month?
                </h2>
                <p className="text-sm mb-6" style={{ color: "#888" }}>
                  Flare days, crash days, days you&apos;re on the couch, brain fog days, period days. All of them.
                </p>
                <Slider
                  min={1}
                  max={20}
                  value={badDaysPerMonth}
                  onChange={setBadDaysPerMonth}
                  dynamicText={BAD_DAYS_TEXT}
                />
              </>
            )}

            {/* Step 4: What stops */}
            {step === 4 && (
              <>
                <h2
                  className="text-lg mb-2"
                  style={{ fontFamily: "Georgia, serif", color: "#11114E" }}
                >
                  When you crash, what stops?
                </h2>
                <p className="text-sm mb-6" style={{ color: "#888" }}>
                  Tick everything that pauses or falls behind when you can&apos;t show up.
                </p>
                <CheckGrid
                  options={TASKS}
                  selected={stopsWhenCrash}
                  onChange={(s) => setStopsWhenCrash(s as Task[])}
                />
              </>
            )}

            {/* Step 5: What's automated */}
            {step === 5 && (
              <>
                <h2
                  className="text-lg mb-2"
                  style={{ fontFamily: "Georgia, serif", color: "#11114E" }}
                >
                  Which of these could run WITHOUT you right now?
                </h2>
                <p className="text-sm mb-6" style={{ color: "#888" }}>
                  Be honest. Tick only what&apos;s actually automated or handled by someone else.
                </p>
                <CheckGrid
                  options={TASKS}
                  selected={automated}
                  onChange={(s) => setAutomated(s as Task[])}
                />
                {automated.length === 0 && (
                  <p className="text-xs mt-3 text-center" style={{ color: "#999" }}>
                    That&apos;s okay. That&apos;s exactly why this exists.
                  </p>
                )}
              </>
            )}

            {/* Step 6: Catch-up time */}
            {step === 6 && (
              <>
                <h2
                  className="text-lg mb-2"
                  style={{ fontFamily: "Georgia, serif", color: "#11114E" }}
                >
                  After a crash, how long to catch up?
                </h2>
                <p className="text-sm mb-6" style={{ color: "#888" }}>
                  When you come back online, how long before you&apos;re level again?
                </p>
                <OptionButtons
                  options={CATCHUP_OPTIONS.map((o) => ({
                    label: o.label,
                    subtext: o.subtext,
                    value: o.value,
                  }))}
                  selected={catchUpValue}
                  onChange={(v) => setCatchUpValue(v as number)}
                />
              </>
            )}

            {/* Step 7: Revenue + lost client */}
            {step === 7 && (
              <>
                <h2
                  className="text-lg mb-2"
                  style={{ fontFamily: "Georgia, serif", color: "#11114E" }}
                >
                  Almost done. Two quick ones.
                </h2>
                <p className="text-sm mb-4" style={{ color: "#888" }}>
                  What&apos;s your monthly revenue?
                </p>
                <OptionButtons
                  options={REVENUE_OPTIONS.map((o) => ({
                    label: o.label,
                    value: o.value,
                  }))}
                  selected={revenueValue}
                  onChange={(v) => setRevenueValue(v as number)}
                />

                <div className="mt-8">
                  <p className="text-sm mb-4" style={{ color: "#888" }}>
                    Have you ever lost a client or lead because you couldn&apos;t show up?
                  </p>
                  <div className="flex gap-3">
                    {LOST_CLIENT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setLostClient(opt)}
                        className="flex-1 text-center px-3 py-3 rounded-xl border-2 transition-all text-sm"
                        style={{
                          minHeight: 44,
                          borderColor:
                            lostClient === opt ? "#F687B3" : "#d1d5db",
                          backgroundColor:
                            lostClient === opt
                              ? "rgba(246,135,179,0.08)"
                              : "#ffffff",
                          color: "#11114E",
                        }}
                      >
                        {lostClient === opt && (
                          <span style={{ color: "#F687B3" }}>✓ </span>
                        )}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Navigation outside the card */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={back}
              className="text-sm font-medium text-white/60 hover:text-white/90 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={next}
              disabled={!canProceed()}
              className={`px-8 py-4 rounded-xl font-black text-base transition-all hover:-translate-y-0.5 active:scale-[0.98] ${
                canProceed() ? "pulse-glow" : ""
              }`}
              style={{
                background: canProceed()
                  ? "linear-gradient(135deg, #fbb6ce 0%, #f687b3 100%)"
                  : "rgba(255,255,255,0.1)",
                color: canProceed() ? "#11114e" : "rgba(255,255,255,0.4)",
                minHeight: 52,
              }}
            >
              {step === 7 ? "See My Results →" : "Next →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
