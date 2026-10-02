import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/Card";
import { HeroButton } from "../../components/HeroButton";
import { SittingBanner } from "../../components/SittingBanner";
import { TabScreen } from "../../components/TabScreen";
import { BodyMap } from "../../features/body/BodyMap";
import {
  BODY_ZONES,
  BodyZoneId,
  sitState,
  ZONE_LEVEL_LABEL,
  zoneLevel,
} from "../../features/body/zones";
import { RoutineRow } from "../../features/breaks/RoutineCard";
import { Routine, ROUTINES } from "../../features/breaks/routines";
import { useAppStore, WATER_GOAL, XP_PER_LEVEL } from "../../store/AppStore";
import { colors, fontFamily, radius, spacing, type } from "../../theme";

const POSTURE_BADGE = {
  ok: { label: "Activo", color: colors.primary },
  warn: { label: "Rígido", color: colors.posture.tension },
  over: { label: "Sobrecarga", color: colors.posture.overload },
} as const;

const RECOMMENDED = ROUTINES.slice(0, 3);

function startBreak(routine: Routine) {
  router.push({ pathname: "/session", params: { id: routine.id } });
}

export default function Hoy() {
  const app = useAppStore();
  const [selectedZone, setSelectedZone] = useState<BodyZoneId>("neck");

  const level = Math.floor(app.xp / XP_PER_LEVEL);
  const badge = POSTURE_BADGE[sitState(app.sittingMinutes)];
  const selectedLevel = zoneLevel(selectedZone, app.sittingMinutes, app.relieved);
  // Mock formula until the vitality model is defined.
  const energy = Math.max(
    40,
    100 - Math.round(app.sittingMinutes / 2) + (app.relieved ? 10 : 0),
  );

  return (
    <TabScreen>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Buenos días</Text>
          <Text style={styles.name}>{app.name}</Text>
        </View>
        <View style={styles.pills}>
          <View style={[styles.pill, { backgroundColor: colors.gold }]}>
            <Text style={[styles.pillText, { color: colors.ink }]}>
              Nivel {level}
            </Text>
          </View>
          <View style={[styles.pill, { backgroundColor: colors.mint }]}>
            <Text style={[styles.pillText, { color: colors.mintInk }]}>
              {app.streak} días de racha
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.diagnosis}>
        <View style={styles.diagnosisHeader}>
          <Text style={styles.cardTitle}>Diagnóstico postural</Text>
          <View style={[styles.badge, { backgroundColor: badge.color }]}>
            <Text style={styles.badgeText}>{badge.label}</Text>
          </View>
        </View>
        <SittingBanner minutes={app.sittingMinutes} />
        <BodyMap
          sittingMinutes={app.sittingMinutes}
          relieved={app.relieved}
          selected={selectedZone}
          onSelect={setSelectedZone}
        />
        <View style={styles.zoneDetail}>
          <Text style={styles.zoneTitle}>
            {BODY_ZONES[selectedZone].name} · {ZONE_LEVEL_LABEL[selectedLevel]}
          </Text>
          <Text style={styles.zoneText}>{BODY_ZONES[selectedZone].detail}</Text>
        </View>
        <View style={styles.legend}>
          <Text style={[styles.legendItem, { color: colors.posture.overload }]}>
            ● Sobrecarga
          </Text>
          <Text style={[styles.legendItem, { color: colors.posture.tension }]}>
            ● Tensión
          </Text>
          <Text style={[styles.legendItem, { color: colors.mintInk }]}>
            ● Activa
          </Text>
        </View>
      </View>

      <View style={styles.cta}>
        <HeroButton
          title="Moverme ahora"
          subtitle="Pausa de 2 min para liberar cuello y lumbar"
          onPress={() => startBreak(ROUTINES[0])}
        />
        <Text style={styles.ctaHint}>
          +{ROUTINES[0].xp} XP · tu racha de {app.streak} días se mantiene hoy
        </Text>
      </View>

      <View style={styles.stats}>
        <Card style={[styles.stat, styles.water]}>
          <View>
            <Text style={styles.cardTitle}>
              {app.water}/{WATER_GOAL} vasos
            </Text>
            <Text style={styles.statCaption}>Hidratación</Text>
          </View>
          <Pressable
            onPress={app.addWater}
            style={styles.waterButton}
            hitSlop={4}
            accessibilityRole="button"
            accessibilityLabel="Registrar un vaso de agua"
          >
            <Text style={styles.waterPlus}>+</Text>
          </Pressable>
        </Card>
        <Card style={styles.stat}>
          <Text style={styles.cardTitle}>{energy}%</Text>
          <Text style={styles.statCaption}>Energía corporal</Text>
        </Card>
      </View>

      <View style={styles.recommended}>
        <View>
          <Text style={styles.sectionTitle}>
            Pausa recomendada para tu jornada
          </Text>
          <Text style={styles.statCaption}>
            Elegida según tu tensión actual
          </Text>
        </View>
        {RECOMMENDED.map((routine) => (
          <RoutineRow
            key={routine.id}
            routine={routine}
            onPress={() => startBreak(routine)}
          />
        ))}
      </View>
      <StatusBar style="dark" />
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  greeting: {
    ...type.small,
    color: colors.inkMuted,
  },
  name: {
    ...type.display,
    color: colors.ink,
  },
  pills: {
    alignItems: "flex-end",
    gap: 6,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
  },
  pillText: {
    ...type.label,
  },
  diagnosis: {
    padding: spacing.lg,
    borderRadius: radius.xxl,
    backgroundColor: colors.surfaceAlt,
    gap: spacing.md,
  },
  diagnosisHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    ...type.bodyBold,
    color: colors.ink,
  },
  badge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  badgeText: {
    ...type.captionBold,
    color: colors.onPrimary,
  },
  zoneDetail: {
    minHeight: 62,
    paddingVertical: spacing.md,
    paddingHorizontal: 14,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  zoneTitle: {
    ...type.bodyBold,
    fontSize: 14,
    color: colors.ink,
  },
  zoneText: {
    ...type.label,
    fontFamily: fontFamily.regular,
    color: colors.inkSoft,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.lg,
  },
  legendItem: {
    ...type.caption,
  },
  cta: {
    gap: spacing.sm,
  },
  ctaHint: {
    ...type.captionBold,
    color: colors.inkWarm,
    textAlign: "center",
  },
  stats: {
    flexDirection: "row",
    gap: 10,
  },
  stat: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
  },
  water: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statCaption: {
    ...type.caption,
    color: colors.inkMuted,
  },
  waterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.mint,
  },
  waterPlus: {
    ...type.h2,
    color: colors.ink,
  },
  recommended: {
    gap: 10,
  },
  sectionTitle: {
    ...type.h2,
    color: colors.ink,
  },
});
