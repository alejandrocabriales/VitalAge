import { router } from "expo-router";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, layout, spacing, type } from "../../theme";
import { OnboardingHeader } from "./OnboardingHeader";

type SecondaryAction = {
  label: string;
  onPress: () => void;
};

type Props = {
  step: number;
  title: string;
  subtitle: string;
  continueLabel?: string;
  canContinue: boolean;
  onContinue: () => void;
  secondaryAction?: SecondaryAction;
  children: ReactNode;
};

export function OnboardingStepLayout({
  step,
  title,
  subtitle,
  continueLabel = "Continuar",
  canContinue,
  onContinue,
  secondaryAction,
  children,
}: Props) {
  return (
    <ScreenContainer
      footer={
        <View style={styles.footer}>
          <PrimaryButton
            label={continueLabel}
            onPress={onContinue}
            disabled={!canContinue}
          />
          {secondaryAction && (
            <Pressable
              accessibilityRole="button"
              onPress={secondaryAction.onPress}
              style={styles.secondary}
            >
              <Text style={styles.secondaryLabel}>{secondaryAction.label}</Text>
            </Pressable>
          )}
        </View>
      }
    >
      <OnboardingHeader step={step} onBack={router.back} />
      <View style={styles.heading}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {children}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  footer: {
    gap: spacing.sm,
  },
  secondary: {
    minHeight: layout.minTouch,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryLabel: {
    ...type.bodyBold,
    color: colors.inkMuted,
  },
  heading: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  title: {
    ...type.title,
    color: colors.ink,
  },
  subtitle: {
    ...type.body,
    color: colors.inkMuted,
  },
});
