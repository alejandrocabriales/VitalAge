import AsyncStorage from "@react-native-async-storage/async-storage";
import { OnboardingAnswers } from "./OnboardingContext";

const STORAGE_KEY = "onboarding.result";

export type OnboardingResult = {
  answers: OnboardingAnswers;
  name: string;
  email: string;
};

export async function loadOnboardingResult(): Promise<OnboardingResult | null> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored === null ? null : (JSON.parse(stored) as OnboardingResult);
}

export function saveOnboardingResult(result: OnboardingResult): Promise<void> {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(result));
}

export function clearOnboardingResult(): Promise<void> {
  return AsyncStorage.removeItem(STORAGE_KEY);
}
