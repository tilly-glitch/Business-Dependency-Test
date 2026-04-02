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
        <span style={{ color: "#666" }}>
          Step {currentStep} of {totalSteps}
        </span>
        <span style={{ color: "#F687B3", fontWeight: 600 }}>{pct}%</span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: 4, backgroundColor: "#e5e7eb" }}
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
