import { OnboardingAnswers } from "./OnboardingContext";
import { AGE_RANGES } from "./profileOptions";
import { TENSION_AREAS } from "./tensionAreas";

export type OnboardingPlan = {
  summary: string;
  firstBreakTitle: string;
};

/** Derives the plan shown on the last step from the collected answers. */
export function buildPlan(answers: OnboardingAnswers): OnboardingPlan {
  const [mainAreaId] = answers.tensionAreas;
  const mainArea =
    TENSION_AREAS.find((area) => area.id === mainAreaId) ?? TENSION_AREAS[0];
  const ageRange = AGE_RANGES.find((range) => range.id === answers.ageRange);

  const audience = ageRange ? `Hecho para tus ${ageRange.planLabel}` : "Hecho para ti";

  return {
    summary: `${audience}, con foco en ${mainArea.focusLabel}.`,
    firstBreakTitle: mainArea.firstBreakTitle,
  };
}
