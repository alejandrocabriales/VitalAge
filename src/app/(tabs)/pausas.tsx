import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { TabScreen } from "../../components/TabScreen";
import { RoutineFull } from "../../features/breaks/RoutineCard";
import { ROUTINES } from "../../features/breaks/routines";
import { ProfileFilters } from "../../features/profile/ProfileFilters";
import { useAppStore } from "../../store/AppStore";
import { colors, fontFamily, spacing, type } from "../../theme";

export default function Pausas() {
  const { movementFilter, ageRange } = useAppStore();

  const routines = ROUTINES.filter(
    (routine) =>
      movementFilter === "all" || routine.movementStyle === movementFilter,
  ).filter((routine) => ageRange !== "over60" || routine.level !== "Intenso");

  return (
    <TabScreen>
      <View>
        <Text style={styles.title}>Pausas</Text>
        <Text style={styles.subtitle}>Biblioteca de ejercicios ergonómicos</Text>
      </View>
      <ProfileFilters ageLabel="INTENSIDAD / EDAD" />
      <View style={styles.list}>
        {routines.map((routine) => (
          <RoutineFull
            key={routine.id}
            routine={routine}
            onStart={() =>
              router.push({ pathname: "/session", params: { id: routine.id } })
            }
          />
        ))}
        {routines.length === 0 && (
          <Text style={styles.empty}>Sin rutinas para este filtro.</Text>
        )}
      </View>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...type.title,
    color: colors.ink,
  },
  subtitle: {
    ...type.label,
    fontFamily: fontFamily.regular,
    color: colors.inkMuted,
  },
  list: {
    gap: spacing.md,
  },
  empty: {
    ...type.small,
    color: colors.inkMuted,
    textAlign: "center",
    marginTop: spacing.xxl,
  },
});
