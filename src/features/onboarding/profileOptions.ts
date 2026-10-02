export type AgeRangeId = "under30" | "30to45" | "46to60" | "over60";

export type AgeRange = {
  id: AgeRangeId;
  label: string;
  /** Used in the plan summary: "Hecho para tus ...". */
  planLabel: string;
};

export const AGE_RANGES: readonly AgeRange[] = [
  { id: "under30", label: "< 30", planLabel: "menos de 30 años" },
  { id: "30to45", label: "30–45", planLabel: "30–45 años" },
  { id: "46to60", label: "46–60", planLabel: "46–60 años" },
  { id: "over60", label: "60+", planLabel: "más de 60 años" },
];

export type MovementStyleId = "chair" | "standing" | "dynamic";

export type MovementStyle = {
  id: MovementStyleId;
  title: string;
  description: string;
};

export const MOVEMENT_STYLES: readonly MovementStyle[] = [
  { id: "chair", title: "En silla", description: "Suave, sin levantarme" },
  {
    id: "standing",
    title: "De pie",
    description: "Moderado, junto a mi escritorio",
  },
  {
    id: "dynamic",
    title: "Dinámica",
    description: "Activación completa de 3 a 5 min",
  },
];

export const REMINDER_INTERVALS = [30, 45, 60] as const;

export type ReminderInterval = (typeof REMINDER_INTERVALS)[number];
