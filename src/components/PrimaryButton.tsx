import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, shadows, type } from "../theme";

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({ label, onPress, disabled = false }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled ? styles.disabled : shadows.hero,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.label, disabled && styles.labelDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderRadius: radius.xxl,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    backgroundColor: colors.disabledBg,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    ...type.h2,
    color: colors.onPrimary,
  },
  labelDisabled: {
    color: colors.disabledInk,
  },
});
