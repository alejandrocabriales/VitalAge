import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SelectableCard } from "../../components/SelectableCard";
import { useOnboarding } from "../../features/onboarding/OnboardingContext";
import { OnboardingStepLayout } from "../../features/onboarding/OnboardingStepLayout";
import {
  TENSION_AREAS,
  TensionAreaId,
} from "../../features/onboarding/tensionAreas";
import { spacing } from "../../theme";
import { toggleItem } from "../../utils/toggleItem";

export default function OnboardingTension() {
  const { answers, updateAnswers } = useOnboarding();
  const { tensionAreas } = answers;

  const handleToggle = (id: TensionAreaId) =>
    updateAnswers({ tensionAreas: toggleItem(tensionAreas, id) });

  return (
    <OnboardingStepLayout
      step={1}
      title="¿Dónde sientes más tensión?"
      subtitle="Elige todas las que quieras."
      canContinue={tensionAreas.length > 0}
      onContinue={() => router.push("/onboarding/profile")}
    >
      <View style={styles.options}>
        {TENSION_AREAS.map((area) => (
          <SelectableCard
            key={area.id}
            title={area.title}
            description={area.description}
            selected={tensionAreas.includes(area.id)}
            onPress={() => handleToggle(area.id)}
          />
        ))}
      </View>
    </OnboardingStepLayout>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: spacing.md,
  },
});
