import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";
import { findRoutine, Routine } from "../features/breaks/routines";
import { useAppStore } from "../store/AppStore";
import { colors, fontFamily, radius, spacing, type } from "../theme";

const RING_SIZE = 220;
const RING_RADIUS = 44;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

function secondsUntil(timestamp: number): number {
  return Math.max(0, Math.ceil((timestamp - Date.now()) / 1000));
}

export default function Session() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const routine = findRoutine(Number(id));

  if (routine === undefined) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Rutina no encontrada</Text>
        <Pressable onPress={router.back} style={styles.exit}>
          <Text style={styles.exitText}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  return <RunningSession routine={routine} />;
}

function RunningSession({ routine }: { routine: Routine }) {
  const insets = useSafeAreaInsets();
  const { completeBreak, streak } = useAppStore();
  const total = routine.minutes * 60;
  // The clock derives from a fixed end time, so it stays right even if ticks are delayed.
  const [endsAt] = useState(() => Date.now() + total * 1000);
  const [left, setLeft] = useState(total);
  const done = left === 0;

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = secondsUntil(endsAt);
      setLeft(remaining);
      if (remaining === 0) {
        clearInterval(interval);
        completeBreak(routine);
      }
    }, 1000);
    return () => clearInterval(interval);
    // completeBreak changes identity on every store update; the timer must not restart.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAt, routine]);

  const padding = {
    paddingTop: insets.top + 40,
    paddingBottom: insets.bottom + spacing.xxl,
  };

  if (done) {
    return (
      <View style={[styles.screen, padding]}>
        <Text style={styles.check}>✓</Text>
        <Text style={styles.title}>¡Pausa completa!</Text>
        <Text style={styles.doneText}>Cuello y lumbar vuelven a verde</Text>
        <View style={styles.rewards}>
          <View style={styles.reward}>
            <Text style={styles.rewardValue}>+{routine.xp}</Text>
            <Text style={styles.rewardLabel}>XP</Text>
          </View>
          <View style={styles.reward}>
            <Text style={styles.rewardValue}>{streak}</Text>
            <Text style={styles.rewardLabel}>días de racha</Text>
          </View>
        </View>
        <View style={styles.spacer} />
        <Pressable
          onPress={router.back}
          style={styles.back}
          accessibilityRole="button"
        >
          <Text style={styles.backText}>Volver a Hoy</Text>
        </Pressable>
        <StatusBar style="light" />
      </View>
    );
  }

  const stepSeconds = total / routine.steps.length;
  const stepIndex = Math.min(
    routine.steps.length - 1,
    Math.floor((total - left) / stepSeconds),
  );
  const clock = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;

  return (
    <View style={[styles.screen, padding]}>
      <Text style={styles.zone}>{routine.zone}</Text>
      <Text style={styles.routineTitle}>{routine.title}</Text>
      <View style={styles.ring}>
        <Svg
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox="0 0 100 100"
          style={styles.ringSvg}
        >
          <Circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke={colors.ringTrack}
            strokeWidth={7}
          />
          <Circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            fill="none"
            stroke={colors.onPrimary}
            strokeWidth={7}
            strokeLinecap="round"
            strokeDasharray={RING_LENGTH}
            strokeDashoffset={RING_LENGTH * (left / total)}
          />
        </Svg>
        <Text style={styles.clock}>{clock}</Text>
      </View>
      <View style={styles.step}>
        <Text style={styles.stepLabel}>
          PASO {stepIndex + 1} DE {routine.steps.length}
        </Text>
        <Text style={styles.stepText}>{routine.steps[stepIndex]}</Text>
      </View>
      <View style={styles.spacer} />
      <Pressable
        onPress={router.back}
        style={styles.exit}
        accessibilityRole="button"
      >
        <Text style={styles.exitText}>Salir (perderás +{routine.xp} XP)</Text>
      </Pressable>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    backgroundColor: colors.primary,
  },
  spacer: {
    flex: 1,
  },
  zone: {
    ...type.label,
    color: colors.onPrimary,
  },
  routineTitle: {
    ...type.session,
    color: colors.onPrimary,
    textAlign: "center",
    marginTop: spacing.xs,
  },
  ring: {
    width: RING_SIZE,
    height: RING_SIZE,
    marginTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  ringSvg: {
    transform: [{ rotate: "-90deg" }],
  },
  clock: {
    ...type.clock,
    position: "absolute",
    color: colors.onPrimary,
  },
  step: {
    alignSelf: "stretch",
    marginTop: spacing.xxxl,
    padding: 18,
    borderRadius: 22,
    backgroundColor: colors.glass,
  },
  stepLabel: {
    ...type.captionBold,
    color: colors.onPrimary,
  },
  stepText: {
    ...type.h2,
    fontFamily: fontFamily.bold,
    lineHeight: 24,
    color: colors.onPrimary,
    marginTop: spacing.xs,
  },
  exit: {
    padding: spacing.md,
  },
  exitText: {
    ...type.label,
    color: colors.onPrimary,
    textDecorationLine: "underline",
  },
  check: {
    ...type.check,
    color: colors.onPrimary,
    marginTop: 40,
  },
  title: {
    ...type.title,
    color: colors.onPrimary,
  },
  doneText: {
    ...type.body,
    color: colors.onPrimary,
    marginTop: 6,
  },
  rewards: {
    flexDirection: "row",
    alignSelf: "stretch",
    gap: 10,
    marginTop: 30,
  },
  reward: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.onPrimary,
  },
  rewardValue: {
    ...type.session,
    color: colors.ink,
  },
  rewardLabel: {
    ...type.caption,
    color: colors.ink,
  },
  back: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.onPrimary,
  },
  backText: {
    ...type.h2,
    color: colors.primary,
  },
});
