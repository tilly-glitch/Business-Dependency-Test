"use client";

interface CheckGridProps {
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export default function CheckGrid({
  options,
  selected,
  onChange,
}: CheckGridProps) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggle(option)}
            className="text-left px-4 py-3 rounded-xl border-2 transition-all text-sm"
            style={{
              minHeight: 44,
              borderColor: isSelected ? "#F687B3" : "#d1d5db",
              backgroundColor: isSelected
                ? "rgba(246,135,179,0.08)"
                : "#ffffff",
              color: "#11114E",
            }}
          >
            {isSelected ? "✓ " : ""}
            {option}
          </button>
        );
      })}
    </div>
  );
}
