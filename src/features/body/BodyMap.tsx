import { Fragment, useEffect, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fontFamily, layout, shadows, type } from "../../theme";
import {
  BODY_ZONES,
  BodyZoneId,
  ZONE_LEVEL_COLORS,
  ZONE_LEVEL_LABEL,
  zoneLevel,
} from "./zones";

const avatar = require("../../../assets/avatar.png");

const MAP_HEIGHT = 310;
const DOT = 18;

// Positions in % of the map, tuned to the avatar image.
const POINTS: readonly {
  zone: BodyZoneId;
  y: number;
  lineLeft: number;
  lineWidth: number;
  labelLeft: number;
}[] = [
  { zone: "neck", y: 21.5, lineLeft: 20, lineWidth: 30, labelLeft: 2 },
  { zone: "lowerBack", y: 41.5, lineLeft: 50, lineWidth: 18, labelLeft: 68 },
  { zone: "hips", y: 49, lineLeft: 39, lineWidth: 11, labelLeft: 2 },
];

function Pulse({ color }: { color: string }) {
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1600,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [progress]);

  return (
    <Animated.View
      style={[
        styles.pulse,
        {
          backgroundColor: color,
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 0],
          }),
          transform: [
            {
              scale: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 3],
              }),
            },
          ],
        },
      ]}
    />
  );
}

type Props = {
  sittingMinutes: number;
  relieved: boolean;
  selected: BodyZoneId;
  onSelect: (zone: BodyZoneId) => void;
};

export function BodyMap({ sittingMinutes, relieved, selected, onSelect }: Props) {
  return (
    <View style={styles.map}>
      <Image
        source={avatar}
        style={styles.avatar}
        resizeMode="stretch"
        accessibilityIgnoresInvertColors
      />
      {POINTS.map((point) => {
        const level = zoneLevel(point.zone, sittingMinutes, relieved);
        const palette = ZONE_LEVEL_COLORS[level];
        const top = `${point.y}%` as const;
        const select = () => onSelect(point.zone);

        return (
          <Fragment key={point.zone}>
            <View
              style={[
                styles.line,
                {
                  top,
                  left: `${point.lineLeft}%`,
                  width: `${point.lineWidth}%`,
                  backgroundColor: palette.bg,
                },
              ]}
            />
            <Pressable onPress={select} style={[styles.dotTarget, { top }]}>
              <Pulse color={palette.bg} />
              <View style={[styles.dot, { backgroundColor: palette.bg }]} />
            </Pressable>
            <Pressable
              onPress={select}
              accessibilityRole="button"
              accessibilityState={{ selected: selected === point.zone }}
              style={[
                styles.label,
                shadows.chip,
                {
                  top,
                  left: `${point.labelLeft}%`,
                  backgroundColor: palette.bg,
                  borderWidth: selected === point.zone ? 2 : 0,
                },
              ]}
            >
              <Text style={[styles.labelTitle, { color: palette.ink }]}>
                {BODY_ZONES[point.zone].label}
              </Text>
              <Text style={[styles.labelLevel, { color: palette.ink }]}>
                {ZONE_LEVEL_LABEL[level]}
              </Text>
            </Pressable>
          </Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: MAP_HEIGHT,
  },
  avatar: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    width: 174,
    height: 296,
  },
  line: {
    position: "absolute",
    height: 2,
  },
  dotTarget: {
    position: "absolute",
    left: "50%",
    width: layout.minTouch,
    height: layout.minTouch,
    marginLeft: -layout.minTouch / 2,
    marginTop: -layout.minTouch / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    borderWidth: 3,
    borderColor: colors.onPrimary,
  },
  pulse: {
    position: "absolute",
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
  },
  label: {
    position: "absolute",
    marginTop: -18,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderColor: colors.onPrimary,
  },
  labelTitle: {
    ...type.captionBold,
  },
  labelLevel: {
    ...type.micro,
    fontFamily: fontFamily.medium,
  },
});
