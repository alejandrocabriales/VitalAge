import { StyleSheet, Text } from "react-native";
import { colors, type } from "../theme";

export function SectionLabel({ children }: { children: string }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    ...type.overline,
    color: colors.inkMuted,
    textTransform: "uppercase",
  },
});
