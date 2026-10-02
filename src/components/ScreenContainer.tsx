import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../theme";

type Props = {
  children: ReactNode;
  /** Stays pinned at the bottom while the content scrolls. */
  footer?: ReactNode;
};

export function ScreenContainer({ children, footer }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      // Android draws edge-to-edge, so the window no longer shrinks for the keyboard:
      // padding shrinks the scroll view and it brings the focused input into view.
      behavior={Platform.OS === "android" ? "padding" : undefined}
      style={[
        styles.screen,
        {
          paddingTop: insets.top + spacing.xl,
          paddingBottom: insets.bottom + spacing.xl,
        },
      ]}
    >
      {/* iOS: the scroll view insets itself by the keyboard and scrolls the focused
          input into view. */}
      <ScrollView
        contentContainerStyle={styles.content}
        automaticallyAdjustKeyboardInsets
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      {footer}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    gap: spacing.lg,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
  },
});
