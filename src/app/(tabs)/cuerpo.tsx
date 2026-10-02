import { StyleSheet, Text, View } from "react-native";
import { Card } from "../../components/Card";
import { TabScreen } from "../../components/TabScreen";
import { useAppStore, XP_PER_LEVEL } from "../../store/AppStore";
import { colors, fontFamily, radius, spacing, type } from "../../theme";

// Mock history until sitting time is tracked and persisted.
const WEEK: readonly { day: string; sittingHours: number }[] = [
  { day: "L", sittingHours: 3.2 },
  { day: "M", sittingHours: 2.6 },
  { day: "X", sittingHours: 2.9 },
  { day: "J", sittingHours: 2.2 },
  { day: "V", sittingHours: 1.8 },
  { day: "S", sittingHours: 0.5 },
  { day: "D", sittingHours: 1.4 },
];
const TODAY_INDEX = 4;
const CHART_MAX_HOURS = 3.5;
const HIGH_SITTING_HOURS = 2;

export default function MiCuerpo() {
  const { streak, relieved, xp, breaksThisWeek } = useAppStore();
  const level = Math.floor(xp / XP_PER_LEVEL);

  return (
    <TabScreen>
      <Text style={styles.title}>Mi cuerpo</Text>

      <View style={styles.streak}>
        <Text style={styles.streakLabel}>RACHA ACTUAL</Text>
        <Text style={styles.streakValue}>{streak} días</Text>
        <Text style={styles.streakHint}>Una pausa hoy la protege</Text>
        <View style={styles.days}>
          {WEEK.map(({ day }, index) => {
            const done =
              index < TODAY_INDEX || (index === TODAY_INDEX && relieved);
            return (
              <View key={day} style={styles.day}>
                <View
                  style={[
                    styles.dayBox,
                    {
                      backgroundColor: done
                        ? colors.onPrimary
                        : colors.ringTrack,
                    },
                  ]}
                >
                  {done && <Text style={styles.dayCheck}>✓</Text>}
                </View>
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.chart}>
        <Text style={styles.cardTitle}>Tiempo sentado continuo (h)</Text>
        <View style={styles.bars}>
          {WEEK.map(({ day, sittingHours }) => (
            <View key={day} style={styles.barColumn}>
              <Text style={styles.barText}>{sittingHours}</Text>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${(sittingHours / CHART_MAX_HOURS) * 80}%`,
                    backgroundColor:
                      sittingHours > HIGH_SITTING_HOURS
                        ? colors.posture.tension
                        : colors.posture.active,
                  },
                ]}
              />
              <Text style={styles.barText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.stats}>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{xp}</Text>
          <Text style={styles.statCaption}>
            XP · {(level + 1) * XP_PER_LEVEL - xp} para nivel {level + 1}
          </Text>
        </Card>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{breaksThisWeek}</Text>
          <Text style={styles.statCaption}>pausas esta semana</Text>
        </Card>
      </View>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    ...type.title,
    color: colors.ink,
  },
  streak: {
    padding: 18,
    borderRadius: 26,
    backgroundColor: colors.primary,
  },
  streakLabel: {
    ...type.label,
    color: colors.onPrimary,
  },
  streakValue: {
    ...type.stat,
    color: colors.onPrimary,
  },
  streakHint: {
    ...type.label,
    fontFamily: fontFamily.regular,
    color: colors.onPrimary,
  },
  days: {
    flexDirection: "row",
    gap: 6,
    marginTop: spacing.md,
  },
  day: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  dayBox: {
    height: 30,
    alignSelf: "stretch",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCheck: {
    ...type.h3,
    color: colors.primary,
  },
  dayLabel: {
    ...type.micro,
    color: colors.onPrimary,
  },
  chart: {
    padding: spacing.lg,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceAlt,
    gap: 10,
  },
  cardTitle: {
    ...type.bodyBold,
    color: colors.ink,
  },
  bars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
    height: 110,
  },
  barColumn: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: spacing.xs,
  },
  bar: {
    width: "100%",
    borderRadius: 8,
  },
  barText: {
    ...type.micro,
    color: colors.ink,
  },
  stats: {
    flexDirection: "row",
    gap: 10,
  },
  stat: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 18,
  },
  statValue: {
    ...type.hero,
    color: colors.ink,
  },
  statCaption: {
    ...type.caption,
    color: colors.inkMuted,
  },
});
