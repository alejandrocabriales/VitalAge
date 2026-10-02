import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Chip } from "../../components/Chip";
import { RadioCard } from "../../components/RadioCard";
import { SectionLabel } from "../../components/SectionLabel";
import { useOnboarding } from "../../features/onboarding/OnboardingContext";
import { OnboardingStepLayout } from "../../features/onboarding/OnboardingStepLayout";
import {
  AGE_RANGES,
  MOVEMENT_STYLES,
} from "../../features/onboarding/profileOptions";
import { spacing } from "../../theme";

export default function OnboardingProfile() {
  const { answers, updateAnswers } = useOnboarding();
  const { ageRange, movementStyle } = answers;

  const handleContinue = () => router.push("/onboarding/reminders");

  return (
    <OnboardingStepLayout
      step={2}
      title="Cuéntanos de ti"
      subtitle="Así ajustamos la intensidad de cada pausa."
      canContinue={ageRange !== null && movementStyle !== null}
      onContinue={handleContinue}
    >
      <View style={styles.section}>
        <SectionLabel>Tu edad</SectionLabel>
        <View style={styles.chips}>
          {AGE_RANGES.map((range) => (
            <Chip
              key={range.id}
              label={range.label}
              selected={ageRange === range.id}
              onPress={() => updateAnswers({ ageRange: range.id })}
            />
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <SectionLabel>¿Cómo te mueves mejor?</SectionLabel>
        {MOVEMENT_STYLES.map((style) => (
          <RadioCard
            key={style.id}
            title={style.title}
            description={style.description}
            selected={movementStyle === style.id}
            onPress={() => updateAnswers({ movementStyle: style.id })}
          />
        ))}
      </View>
    </OnboardingStepLayout>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});
