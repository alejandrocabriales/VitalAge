import { StyleSheet, Switch, Text, View } from "react-native";
import { colors, radius, spacing, type } from "../theme";

type Props = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function ToggleCard({ title, description, value, onValueChange }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Switch
        accessibilityLabel={title}
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.toggleOff, true: colors.primary }}
        thumbColor={colors.onPrimary}
        ios_backgroundColor={colors.toggleOff}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderRadius: radius.xl,
    borderColor: colors.border,
    backgroundColor: colors.surface,
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
});
