import { colors } from "../../theme";
import { MovementStyleId } from "../onboarding/profileOptions";

export type RoutineLevel = "Suave" | "Moderado" | "Intenso";

export type Routine = {
  id: number;
  title: string;
  zone: string;
  movementStyle: MovementStyleId;
  minutes: number;
  xp: number;
  level: RoutineLevel;
  tint: string;
  steps: string[];
};

// Placeholder content: exercises must be validated by a professional before release.
export const ROUTINES: readonly Routine[] = [
  {
    id: 1,
    title: "Alivio cervical frente a pantalla",
    zone: "Cuello",
    movementStyle: "chair",
    minutes: 2,
    xp: 25,
    level: "Suave",
    tint: colors.tint.mint,
    steps: [
      "Baja la barbilla hacia el pecho",
      "Inclina la oreja al hombro derecho",
      "Inclina al hombro izquierdo",
      "Gira lento el cuello a cada lado",
    ],
  },
  {
    id: 2,
    title: "Descompresión lumbar en silla",
    zone: "Lumbar",
    movementStyle: "chair",
    minutes: 3,
    xp: 30,
    level: "Suave",
    tint: colors.tint.gold,
    steps: [
      "Siéntate al borde de la silla",
      "Gira el torso a la derecha",
      "Gira el torso a la izquierda",
      "Arquea y redondea la espalda",
    ],
  },
  {
    id: 3,
    title: "Activación circulatoria de piernas",
    zone: "Piernas",
    movementStyle: "standing",
    minutes: 2,
    xp: 35,
    level: "Moderado",
    tint: colors.tint.coral,
    steps: [
      "Ponte de pie, pies al ancho de caderas",
      "Eleva talones 15 veces",
      "Rodillas al pecho alternadas",
      "Sacude piernas 20 segundos",
    ],
  },
  {
    id: 4,
    title: "Apertura de caderas de pie",
    zone: "Caderas",
    movementStyle: "standing",
    minutes: 4,
    xp: 40,
    level: "Moderado",
    tint: colors.tint.mint,
    steps: [
      "Paso largo adelante",
      "Baja la cadera con espalda recta",
      "Cambia de pierna",
      "Respira profundo 3 veces",
    ],
  },
  {
    id: 5,
    title: "Circuito dinámico de oficina",
    zone: "Cuerpo completo",
    movementStyle: "dynamic",
    minutes: 5,
    xp: 60,
    level: "Intenso",
    tint: colors.tint.coral,
    steps: [
      "Sentadillas sin peso x10",
      "Rotaciones de tronco x10",
      "Trote en sitio 30 s",
      "Estira brazos sobre la cabeza",
    ],
  },
];

export function findRoutine(id: number): Routine | undefined {
  return ROUTINES.find((routine) => routine.id === id);
}
