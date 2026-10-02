export type TensionAreaId = "neck" | "lowerBack" | "hips" | "shoulders";

export type TensionArea = {
  id: TensionAreaId;
  title: string;
  description: string;
  /** Short name used in the plan summary: "con foco en ...". */
  focusLabel: string;
  firstBreakTitle: string;
};

export const TENSION_AREAS: readonly TensionArea[] = [
  {
    id: "neck",
    title: "Cuello y cervicales",
    description: "Por la pantalla y la cabeza adelantada",
    focusLabel: "cuello",
    firstBreakTitle: "Alivio cervical frente a pantalla",
  },
  {
    id: "lowerBack",
    title: "Espalda baja",
    description: "Por la presión de la silla",
    focusLabel: "espalda baja",
    firstBreakTitle: "Descarga lumbar en tu silla",
  },
  {
    id: "hips",
    title: "Caderas y piernas",
    description: "Rigidez y poca circulación",
    focusLabel: "caderas",
    firstBreakTitle: "Activa caderas y piernas",
  },
  {
    id: "shoulders",
    title: "Hombros",
    description: "Por el mouse y el teclado",
    focusLabel: "hombros",
    firstBreakTitle: "Suelta hombros y trapecios",
  },
];
