import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Routine } from "../features/breaks/routines";
import { useOnboardingStatus } from "../features/onboarding/OnboardingStatus";
import { loadOnboardingResult } from "../features/onboarding/onboardingStorage";
import {
  AgeRangeId,
  MovementStyleId,
} from "../features/onboarding/profileOptions";

export const WATER_GOAL = 8;
export const XP_PER_LEVEL = 50;

export type MovementFilter = "all" | MovementStyleId;

type Alerts = { posture: boolean; sitting: boolean };

type AppState = {
  name: string;
  ageRange: AgeRangeId;
  movementFilter: MovementFilter;
  alerts: Alerts;
  /** Minutes of continuous sitting. */
  sittingMinutes: number;
  /** True once a break was completed today. */
  relieved: boolean;
  water: number;
  xp: number;
  streak: number;
  breaksThisWeek: number;
};

type AppStoreValue = AppState & {
  update: (changes: Partial<AppState>) => void;
  addWater: () => void;
  completeBreak: (routine: Routine) => void;
};

// Mock values until each feature gets real, persisted state.
const INITIAL_STATE: AppState = {
  name: "",
  ageRange: "30to45",
  movementFilter: "all",
  alerts: { posture: true, sitting: true },
  sittingMinutes: 80,
  relieved: false,
  water: 4,
  xp: 340,
  streak: 12,
  breaksThisWeek: 9,
};

const AppStoreContext = createContext<AppStoreValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const { isCompleted } = useOnboardingStatus();
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!isCompleted) return;
    loadOnboardingResult()
      .then((result) => {
        if (result === null) return;
        setState((current) => ({
          ...current,
          name: result.name.split(" ")[0],
          ageRange: result.answers.ageRange ?? current.ageRange,
        }));
      })
      // Profile fields keep their defaults if the store is unreadable.
      .catch(() => {});
  }, [isCompleted]);

  const value = useMemo<AppStoreValue>(
    () => ({
      ...state,
      update: (changes) => setState((current) => ({ ...current, ...changes })),
      addWater: () =>
        setState((current) => ({
          ...current,
          water: Math.min(WATER_GOAL, current.water + 1),
        })),
      completeBreak: (routine) =>
        setState((current) => ({
          ...current,
          xp: current.xp + routine.xp,
          streak: current.streak + (current.relieved ? 0 : 1),
          breaksThisWeek: current.breaksThisWeek + 1,
          sittingMinutes: 0,
          relieved: true,
        })),
    }),
    [state],
  );

  return <AppStoreContext value={value}>{children}</AppStoreContext>;
}

export function useAppStore(): AppStoreValue {
  const value = useContext(AppStoreContext);
  if (value === null) {
    throw new Error("useAppStore must be used inside AppStoreProvider");
  }
  return value;
}
