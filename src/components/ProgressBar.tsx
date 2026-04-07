"use client";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  const pct = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-sm mb-2">
        <span style={{ color: "rgba(255,255,255,0.7)" }}>
          Step {currentStep} of {totalSteps}
        </span>
        <span style={{ color: "#fbb6ce", fontWeight: 600 }}>{pct}%</span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: 4, backgroundColor: "rgba(255,255,255,0.15)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            backgroundColor: "#F687B3",
            transition: "width 300ms ease",
          }}
        />
      </div>
    </div>
  );
}
