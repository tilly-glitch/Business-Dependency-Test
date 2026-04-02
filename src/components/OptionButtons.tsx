"use client";

interface Option {
  label: string;
  subtext?: string;
  value: string | number;
}

interface OptionButtonsProps {
  options: readonly Option[];
  selected: string | number | null;
  onChange: (value: string | number) => void;
}

export default function OptionButtons({
  options,
  selected,
  onChange,
}: OptionButtonsProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            onClick={() => onChange(opt.value)}
            className="w-full text-left px-4 py-3 rounded-xl border-2 transition-all"
            style={{
              minHeight: 44,
              borderColor: isSelected ? "#F687B3" : "#d1d5db",
              backgroundColor: isSelected
                ? "rgba(246,135,179,0.08)"
                : "#ffffff",
            }}
          >
            <div className="flex items-center gap-2">
              {isSelected && (
                <span style={{ color: "#F687B3" }} className="text-lg">
                  ✓
                </span>
              )}
              <div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "#11114E" }}
                >
                  {opt.label}
                </div>
                {opt.subtext && (
                  <div className="text-xs mt-0.5" style={{ color: "#888" }}>
                    {opt.subtext}
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
