import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/Card";
import { colors, radius, spacing, type } from "../../theme";
import { MOVEMENT_STYLES } from "../onboarding/profileOptions";
import { Routine } from "./routines";

function movementLabel(routine: Routine): string {
  const style = MOVEMENT_STYLES.find((s) => s.id === routine.movementStyle);
  return style?.title ?? "";
}

function DurationBadge({ routine, size }: { routine: Routine; size: number }) {
  return (
    <View
      style={[
        styles.duration,
        { width: size, height: size, backgroundColor: routine.tint },
      ]}
    >
      <Text style={styles.durationText}>{routine.minutes}&apos;</Text>
    </View>
  );
}

type RowProps = { routine: Routine; onPress: () => void };

/** Compact, fully pressable row. Used in the Hoy recommendations. */
export function RoutineRow({ routine, onPress }: RowProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Card style={styles.row}>
        <DurationBadge routine={routine} size={44} />
        <View style={styles.texts}>
          <Text style={styles.title}>{routine.title}</Text>
          <Text style={styles.meta}>
            {routine.zone} · {routine.level}
          </Text>
        </View>
        <Ionicons name="play" size={20} color={colors.primary} />
      </Card>
    </Pressable>
  );
}

type FullProps = { routine: Routine; onStart: () => void };

/** Library card with an explicit start button. Used in Pausas. */
export function RoutineFull({ routine, onStart }: FullProps) {
  return (
    <Card style={styles.full}>
      <View style={styles.row}>
        <DurationBadge routine={routine} size={48} />
        <View style={styles.texts}>
          <Text style={styles.title}>{routine.title}</Text>
          <Text style={styles.meta}>
            {routine.zone} · {movementLabel(routine)} · {routine.level}
          </Text>
        </View>
      </View>
      <Pressable
        onPress={onStart}
        style={styles.start}
        accessibilityRole="button"
      >
        <Text style={styles.startText}>
          Empezar con temporizador · +{routine.xp} XP
        </Text>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  full: {
    borderRadius: radius.xl,
    gap: spacing.md,
  },
  duration: {
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  durationText: {
    ...type.h3,
    color: colors.ink,
  },
  texts: {
    flex: 1,
  },
  title: {
    ...type.bodyBold,
    color: colors.ink,
  },
  meta: {
    ...type.caption,
    color: colors.inkMuted,
  },
  start: {
    minHeight: 44,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  startText: {
    ...type.bodyBold,
    color: colors.onPrimary,
  },
});
