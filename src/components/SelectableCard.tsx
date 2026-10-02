import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, type } from "../theme";

type Props = {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

export function SelectableCard({ title, description, selected, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={[styles.indicator, selected && styles.indicatorSelected]}>
        {selected && (
          <Ionicons name="checkmark" size={18} color={colors.onPrimary} />
        )}
      </View>
    </Pressable>
  );
}

const INDICATOR_SIZE = 28;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderWidth: 2,
    borderRadius: radius.xl,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryTint,
  },
  texts: {
    flex: 1,
  },
  title: {
    ...type.h2,
    color: colors.ink,
  },
  description: {
    ...type.small,
    color: colors.inkMuted,
  },
  indicator: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceAlt,
  },
  indicatorSelected: {
    backgroundColor: colors.primary,
  },
});
