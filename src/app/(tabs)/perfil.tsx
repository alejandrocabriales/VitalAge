import { StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/Card";
import { TabScreen } from "../../components/TabScreen";
import { ToggleCard } from "../../components/ToggleCard";
import { useOnboardingStatus } from "../../features/onboarding/OnboardingStatus";
import { ProfileFilters } from "../../features/profile/ProfileFilters";
import { useAppStore } from "../../store/AppStore";
import { colors, spacing, type } from "../../theme";

export default function Perfil() {
  const { alerts, update } = useAppStore();
  const { reset } = useOnboardingStatus();

  return (
    <TabScreen>
      <Text style={styles.title}>Perfil</Text>
      <ProfileFilters ageLabel="EDAD" />

      <View style={styles.group}>
        <Text style={styles.label}>ALERTAS</Text>
        <ToggleCard
          title="Alertas de postura"
          description="Aviso si mantienes mala postura"
          value={alerts.posture}
          onValueChange={(posture) => update({ alerts: { ...alerts, posture } })}
        />
        <ToggleCard
          title="Aviso por tiempo sentado"
          description="Pausa sugerida antes del límite"
          value={alerts.sitting}
          onValueChange={(sitting) => update({ alerts: { ...alerts, sitting } })}
        />
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>HORARIO DE TRABAJO</Text>
        <Card style={styles.schedule}>
          <Text style={styles.scheduleText}>09:00 – 18:00 · Lun a Vie</Text>
        </Card>
      </View>

      <Text style={styles.devAction} onPress={reset}>
        Reset onboarding (dev)
      </Text>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...type.title,
    color: colors.ink,
  },
  group: {
    gap: spacing.sm,
  },
  label: {
    ...type.overline,
    color: colors.inkMuted,
  },
  schedule: {
    borderRadius: 18,
  },
  scheduleText: {
    ...type.bodyBold,
    color: colors.ink,
  },
  devAction: {
    ...type.small,
    color: colors.inkMuted,
    textAlign: "center",
    paddingVertical: spacing.md,
  },
});
