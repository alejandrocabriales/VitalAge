import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "../../components/ProgressBar";
import { colors, layout, spacing, type } from "../../theme";
import { TOTAL_STEPS } from "./steps";

type Props = {
  step: number;
  onBack: () => void;
};

export function OnboardingHeader({ step, onBack }: Props) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Volver"
        hitSlop={spacing.md}
        onPress={onBack}
        style={styles.back}
      >
        <Ionicons name="arrow-back" size={24} color={colors.ink} />
      </Pressable>
      <ProgressBar progress={step / TOTAL_STEPS} />
      <Text style={styles.counter}>
        {step}/{TOTAL_STEPS}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: layout.minTouch,
  },
  back: {
    justifyContent: "center",
  },
  counter: {
    ...type.label,
    color: colors.inkMuted,
  },
});
