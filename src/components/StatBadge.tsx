import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, type } from "../theme";

const TONES = {
  mint: { background: colors.mint, title: colors.mintInk, caption: colors.mintInk },
  gold: { background: colors.gold, title: colors.ink, caption: colors.ink },
} as const;

type Props = {
  title: string;
  caption: string;
  tone: keyof typeof TONES;
};

export function StatBadge({ title, caption, tone }: Props) {
  const palette = TONES[tone];

  return (
    <View style={[styles.badge, { backgroundColor: palette.background }]}>
      <Text style={[styles.title, { color: palette.title }]}>{title}</Text>
      <Text style={[styles.caption, { color: palette.caption }]}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.lg,
  },
  title: {
    ...type.h2,
  },
  caption: {
    ...type.caption,
  },
});
