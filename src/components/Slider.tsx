"use client";

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  dynamicText?: Record<string, string>;
}

function getDynamicText(
  value: number,
  map?: Record<string, string>
): string | null {
  if (!map) return null;
  for (const [range, text] of Object.entries(map)) {
    const [lo, hi] = range.split("-").map(Number);
    if (value >= lo && value <= hi) return text;
  }
  return null;
}

export default function Slider({
  min,
  max,
  value,
  onChange,
  dynamicText,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const text = getDynamicText(value, dynamicText);

  return (
    <div className="w-full">
      <div
        className="text-center text-3xl font-bold mb-3"
        style={{ color: "#F687B3" }}
      >
        {value}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-input w-full"
        style={
          {
            "--slider-pct": `${pct}%`,
          } as React.CSSProperties
        }
      />
      {text && (
        <p className="text-center text-sm mt-2" style={{ color: "#888" }}>
          {text}
        </p>
      )}
    </div>
  );
}
