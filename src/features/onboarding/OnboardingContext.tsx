import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import {
  AgeRangeId,
  MovementStyleId,
  ReminderInterval,
} from "./profileOptions";
import { TensionAreaId } from "./tensionAreas";

export type OnboardingAnswers = {
  tensionAreas: TensionAreaId[];
  ageRange: AgeRangeId | null;
  movementStyle: MovementStyleId | null;
  /** Work schedule, in minutes since midnight. */
  workStart: number;
  workEnd: number;
  reminderInterval: ReminderInterval;
  notificationsEnabled: boolean;
};

type OnboardingContextValue = {
  answers: OnboardingAnswers;
  updateAnswers: (changes: Partial<OnboardingAnswers>) => void;
};

const INITIAL_ANSWERS: OnboardingAnswers = {
  tensionAreas: [],
  ageRange: null,
  movementStyle: null,
  workStart: 9 * 60,
  workEnd: 18 * 60,
  reminderInterval: 45,
  notificationsEnabled: true,
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      answers,
      updateAnswers: (changes) =>
        setAnswers((current) => ({ ...current, ...changes })),
    }),
    [answers],
  );

  return <OnboardingContext value={value}>{children}</OnboardingContext>;
}

export function useOnboarding(): OnboardingContextValue {
  const value = useContext(OnboardingContext);
  if (value === null) {
    throw new Error("useOnboarding must be used inside OnboardingProvider");
  }
  return value;
}
