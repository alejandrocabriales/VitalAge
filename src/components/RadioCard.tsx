import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, type } from "../theme";

type Props = {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

export function RadioCard({ title, description, selected, onPress }: Props) {
  const textColor = selected ? colors.onPrimary : colors.ink;
  const descriptionColor = selected ? colors.onPrimary : colors.inkMuted;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.card, selected && styles.cardSelected]}
    >
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <Text style={[styles.description, { color: descriptionColor }]}>
        {description}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderWidth: 2,
    borderRadius: radius.xl,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  title: {
    ...type.h2,
  },
  description: {
    ...type.small,
  },
});
