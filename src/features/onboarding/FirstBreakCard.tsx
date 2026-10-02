import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, type } from "../../theme";

type Props = {
  title: string;
};

export function FirstBreakCard({ title }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.overline}>TU PRIMERA PAUSA · 2 MIN</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.caption}>
        Pruébala después de crear tu cuenta. +25 XP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.xs,
    padding: spacing.xl,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
  },
  overline: {
    ...type.overline,
    color: colors.onPrimary,
  },
  title: {
    ...type.hero,
    color: colors.onPrimary,
  },
  caption: {
    ...type.small,
    color: colors.onPrimary,
  },
});
