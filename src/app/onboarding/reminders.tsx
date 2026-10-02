import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Chip } from "../../components/Chip";
import { SectionLabel } from "../../components/SectionLabel";
import { TimeField } from "../../components/TimeField";
import { ToggleCard } from "../../components/ToggleCard";
import { useOnboarding } from "../../features/onboarding/OnboardingContext";
import { OnboardingStepLayout } from "../../features/onboarding/OnboardingStepLayout";
import { REMINDER_INTERVALS } from "../../features/onboarding/profileOptions";
import { colors, spacing, type } from "../../theme";

export default function OnboardingReminders() {
  const { answers, updateAnswers } = useOnboarding();

  const goToPlan = () => router.push("/onboarding/plan");

  const handleSkip = () => {
    updateAnswers({ notificationsEnabled: false });
    goToPlan();
  };

  return (
    <OnboardingStepLayout
      step={3}
      title="¿Cuándo te avisamos?"
      subtitle="Solo en tu horario de trabajo."
      canContinue
      onContinue={goToPlan}
      secondaryAction={{ label: "Omitir por ahora", onPress: handleSkip }}
    >
      <View style={styles.row}>
        <TimeField
          label="Entro"
          minutes={answers.workStart}
          onChange={(workStart) => updateAnswers({ workStart })}
        />
        <TimeField
          label="Salgo"
          minutes={answers.workEnd}
          onChange={(workEnd) => updateAnswers({ workEnd })}
        />
      </View>
      <View style={styles.section}>
        <SectionLabel>Recordarme cada</SectionLabel>
        <View style={styles.row}>
          {REMINDER_INTERVALS.map((interval) => (
            <Chip
              key={interval}
              label={`${interval} min`}
              selected={answers.reminderInterval === interval}
              onPress={() => updateAnswers({ reminderInterval: interval })}
            />
          ))}
        </View>
        <Text style={styles.hint}>
          Ergonomía recomienda moverse cada 45 a 60 min.
        </Text>
      </View>
      <ToggleCard
        title="Activar notificaciones"
        description="Sin avisos, la mayoría olvida pausar."
        value={answers.notificationsEnabled}
        onValueChange={(notificationsEnabled) =>
          updateAnswers({ notificationsEnabled })
        }
      />
    </OnboardingStepLayout>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  section: {
    gap: spacing.md,
    marginVertical: spacing.xxl,
  },
  hint: {
    ...type.small,
    color: colors.inkMuted,
  },
});
