import { Ref } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { colors, radius, spacing, type } from "../theme";

type Props = TextInputProps & { ref?: Ref<TextInput> };

export function TextField({ style, ...props }: Props) {
  return (
    <TextInput
      placeholderTextColor={colors.inkMuted}
      {...props}
      style={[styles.input, style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    ...type.body,
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    borderWidth: 2,
    borderRadius: radius.lg,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.ink,
  },
});
