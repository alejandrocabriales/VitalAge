import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearOnboardingResult,
  loadOnboardingResult,
  OnboardingResult,
  saveOnboardingResult,
} from "./onboardingStorage";

type OnboardingStatusValue = {
  /** False until the stored result has been read. */
  isLoaded: boolean;
  isCompleted: boolean;
  complete: (result: OnboardingResult) => Promise<void>;
  reset: () => Promise<void>;
};

const OnboardingStatusContext = createContext<OnboardingStatusValue | null>(null);

export function OnboardingStatusProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    loadOnboardingResult()
      .then((result) => setIsCompleted(result !== null))
      // An unreadable store is treated as first launch.
      .catch(() => setIsCompleted(false))
      .finally(() => setIsLoaded(true));
  }, []);

  const value = useMemo<OnboardingStatusValue>(
    () => ({
      isLoaded,
      isCompleted,
      complete: async (result) => {
        await saveOnboardingResult(result);
        setIsCompleted(true);
      },
      reset: async () => {
        await clearOnboardingResult();
        setIsCompleted(false);
      },
    }),
    [isLoaded, isCompleted],
  );

  return (
    <OnboardingStatusContext value={value}>{children}</OnboardingStatusContext>
  );
}

export function useOnboardingStatus(): OnboardingStatusValue {
  const value = useContext(OnboardingStatusContext);
  if (value === null) {
    throw new Error(
      "useOnboardingStatus must be used inside OnboardingStatusProvider",
    );
  }
  return value;
}
