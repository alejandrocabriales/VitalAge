import { StyleSheet, Text, View } from "react-native";
import { Chip } from "../../components/Chip";
import { MovementFilter, useAppStore } from "../../store/AppStore";
import { colors, spacing, type } from "../../theme";
import { AGE_RANGES, MOVEMENT_STYLES } from "../onboarding/profileOptions";

const MOVEMENT_FILTERS: readonly { id: MovementFilter; label: string }[] = [
  { id: "all", label: "Todas" },
  ...MOVEMENT_STYLES.map((style) => ({ id: style.id, label: style.title })),
];

type Props = {
  ageLabel: string;
};

/** Mobility and age chips. Shared by Pausas (as filters) and Perfil (as settings). */
export function ProfileFilters({ ageLabel }: Props) {
  const { movementFilter, ageRange, update } = useAppStore();

  return (
    <View style={styles.groups}>
      <View style={styles.group}>
        <Text style={styles.label}>MOVILIDAD</Text>
        <View style={styles.chips}>
          {MOVEMENT_FILTERS.map((filter) => (
            <Chip
              key={filter.id}
              label={filter.label}
              selected={movementFilter === filter.id}
              onPress={() => update({ movementFilter: filter.id })}
            />
          ))}
        </View>
      </View>
      <View style={styles.group}>
        <Text style={styles.label}>{ageLabel}</Text>
        <View style={styles.chips}>
          {AGE_RANGES.map((range) => (
            <Chip
              key={range.id}
              label={range.label}
              selected={ageRange === range.id}
              onPress={() => update({ ageRange: range.id })}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  groups: {
    gap: spacing.lg,
  },
  group: {
    gap: spacing.sm,
  },
  label: {
    ...type.overline,
    color: colors.inkMuted,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});
