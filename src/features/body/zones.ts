import { colors } from "../../theme";

export type BodyZoneId = "neck" | "lowerBack" | "hips";

export type BodyZone = {
  name: string;
  label: string;
  detail: string;
};

// Placeholder copy: physiological claims must be validated by a professional.
export const BODY_ZONES: Record<BodyZoneId, BodyZone> = {
  neck: {
    name: "Cuello y cervicales",
    label: "Cuello",
    detail:
      "Cabeza adelantada frente a la pantalla suma hasta 4 kg de carga al cuello.",
  },
  lowerBack: {
    name: "Zona lumbar",
    label: "Lumbar",
    detail:
      "La presión de la silla comprime los discos. Cambia de postura cada 45 min.",
  },
  hips: {
    name: "Caderas y piernas",
    label: "Caderas y piernas",
    detail: "Sentarse sin parar endurece las caderas y reduce la circulación.",
  },
};

export type SitState = "ok" | "warn" | "over";

// Thresholds in minutes of continuous sitting. Pending professional validation.
const WARN_AFTER = 45;
const OVER_AFTER = 60;

export function sitState(minutes: number): SitState {
  if (minutes > OVER_AFTER) return "over";
  if (minutes > WARN_AFTER) return "warn";
  return "ok";
}

export type ZoneLevel = "active" | "tension" | "overload";

export const ZONE_LEVEL_LABEL: Record<ZoneLevel, string> = {
  active: "Activa",
  tension: "Tensión",
  overload: "Sobrecarga",
};

export const ZONE_LEVEL_COLORS: Record<ZoneLevel, { bg: string; ink: string }> =
  {
    active: { bg: colors.posture.active, ink: colors.posture.activeInk },
    tension: { bg: colors.posture.tension, ink: colors.posture.tensionInk },
    overload: { bg: colors.posture.overload, ink: colors.posture.overloadInk },
  };

/** Zone state from sitting minutes; a completed break relieves neck and lower back. */
export function zoneLevel(
  zone: BodyZoneId,
  sittingMinutes: number,
  relieved: boolean,
): ZoneLevel {
  if (relieved && zone !== "hips") return "active";
  const state = sitState(sittingMinutes);
  if (zone === "neck") return state === "ok" ? "active" : "tension";
  if (zone === "lowerBack") {
    return state === "over" ? "overload" : state === "warn" ? "tension" : "active";
  }
  return state === "over" ? "tension" : "active";
}
