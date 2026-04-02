"use client";

import { useEffect, useState } from "react";

interface CostCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function CostCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1500,
}: CostCounterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
