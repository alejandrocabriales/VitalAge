import { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SectionLabel } from "../../components/SectionLabel";
import { StatBadge } from "../../components/StatBadge";
import { TextField } from "../../components/TextField";
import { buildPlan } from "../../features/onboarding/buildPlan";
import { FirstBreakCard } from "../../features/onboarding/FirstBreakCard";
import { useOnboarding } from "../../features/onboarding/OnboardingContext";
import { useOnboardingStatus } from "../../features/onboarding/OnboardingStatus";
import { OnboardingStepLayout } from "../../features/onboarding/OnboardingStepLayout";
import { spacing } from "../../theme";
import { isValidEmail } from "../../utils/isValidEmail";

export default function OnboardingPlan() {
  const { answers } = useOnboarding();
  const { complete } = useOnboardingStatus();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const emailRef = useRef<TextInput>(null);

  const plan = buildPlan(answers);
  const canSubmit = name.trim().length > 0 && isValidEmail(email) && !isSaving;

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      // Completing flips the root guard, which swaps onboarding for the tabs.
      await complete({ answers, name: name.trim(), email: email.trim() });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <OnboardingStepLayout
      step={4}
      title="Tu plan está listo"
      subtitle={plan.summary}
      continueLabel="Crear mi cuenta"
      canContinue={canSubmit}
      onContinue={handleSubmit}
    >
      <FirstBreakCard title={plan.firstBreakTitle} />
      <View style={styles.badges}>
        <StatBadge title="Racha" caption="Empieza en 1 día" tone="mint" />
        <StatBadge title="Nivel 1" caption="Sube con cada pausa" tone="gold" />
      </View>
      <View style={styles.form}>
        <SectionLabel>Guarda tu progreso</SectionLabel>
        <TextField
          placeholder="Tu nombre"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoComplete="name"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <TextField
          ref={emailRef}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="done"
        />
      </View>
    </OnboardingStepLayout>
  );
}

const styles = StyleSheet.create({
  badges: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.md,
  },
  form: {
    gap: spacing.md,
    marginTop: spacing.xxl,
  },
});
