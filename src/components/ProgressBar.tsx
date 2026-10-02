import { StyleSheet, View } from "react-native";
import { colors, radius } from "../theme";

type Props = {
  /** Completed fraction, from 0 to 1. */
  progress: number;
};

export function ProgressBar({ progress }: Props) {
  const percent = Math.min(1, Math.max(0, progress)) * 100;

  return (
    <View
      style={styles.track}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(percent) }}
    >
      <View style={[styles.fill, { width: `${percent}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flex: 1,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
});
