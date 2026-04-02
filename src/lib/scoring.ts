import { TASK_PRIORITY, type Task } from "./constants";

export interface CalcInput {
  goodDayHours: number;
  badDayHours: number;
  badDaysPerMonth: number;
  stopsWhenCrash: Task[];
  automated: Task[];
  catchUpDays: number;
  revenueValue: number;
}

export interface CalcResults {
  dependencyScore: number;
  monthlyHoursLost: number;
  monthlyCostLost: number;
  annualCost: number;
  hourlyRate: number;
  gaps: Task[];
  gapPriority1: Task | null;
  gapPriority2: Task | null;
}

export function calculate(input: CalcInput): CalcResults {
  const hourlyRate = input.revenueValue / (input.goodDayHours * 20);
  const hoursLostPerFlare =
    (input.goodDayHours - input.badDayHours) * (input.badDaysPerMonth / 4) +
    input.catchUpDays * input.goodDayHours;
  const monthlyHoursLost = Math.round(hoursLostPerFlare);
  const monthlyCostLost = Math.round(monthlyHoursLost * hourlyRate);
  const annualCost = monthlyCostLost * 12;

  const gaps = input.stopsWhenCrash.filter(
    (task) => !input.automated.includes(task)
  );

  const automatedCount = input.automated.length;
  const totalTasks = 8;
  const dependencyScore = Math.round(
    ((totalTasks - automatedCount) / totalTasks) * 100
  );

  // Prioritise gaps by tier
  const sortedGaps = [...gaps].sort(
    (a, b) => TASK_PRIORITY[a] - TASK_PRIORITY[b]
  );

  return {
    dependencyScore,
    monthlyHoursLost,
    monthlyCostLost,
    annualCost,
    hourlyRate: Math.round(hourlyRate),
    gaps,
    gapPriority1: sortedGaps[0] ?? null,
    gapPriority2: sortedGaps[1] ?? null,
  };
}
