"use client";

import { useEffect, useState } from "react";

interface ScoreCircleProps {
  score: number;
  label: string;
  labelColor: string;
}

export default function ScoreCircle({
  score,
  label,
  labelColor,
}: ScoreCircleProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [score]);

  const pct = (animatedScore / 100) * 360;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 180,
          height: 180,
          background: `conic-gradient(#F687B3 ${pct}deg, #e5e7eb ${pct}deg)`,
        }}
      >
        <div
          className="absolute rounded-full flex flex-col items-center justify-center"
          style={{
            width: 148,
            height: 148,
            backgroundColor: "#ffffff",
          }}
        >
          <span
            className="text-4xl font-bold"
            style={{ color: "#11114E", fontFamily: "Georgia, serif" }}
          >
            {animatedScore}%
          </span>
        </div>
      </div>
      <span
        className="mt-3 text-sm font-bold tracking-wide uppercase"
        style={{ color: labelColor }}
      >
        {label}
      </span>
    </div>
  );
}
