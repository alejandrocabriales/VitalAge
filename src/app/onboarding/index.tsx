import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { colors, radius, spacing, type } from "../../theme";

const avatar = require("../../../assets/avatar.png");

export default function OnboardingWelcome() {
  const handleStart = () => router.push("/onboarding/tension");

  return (
    <ScreenContainer
      footer={<PrimaryButton label="Empezar" onPress={handleStart} />}
    >
      <View style={styles.body}>
        <View style={styles.illustration}>
          <Image
            source={avatar}
            style={styles.avatar}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
        </View>
        <Text style={styles.title}>
          Tu cuerpo no fue hecho para estar sentado.
        </Text>
        <Text style={styles.subtitle}>
          Pausas de 2 minutos que alivian cuello y espalda. Sin gimnasio, sin
          cambiarte de ropa.
        </Text>
      </View>
      <StatusBar style="dark" />
    </ScreenContainer>
  );
}

const ILLUSTRATION_HEIGHT = 300;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.md,
  },
  illustration: {
    height: ILLUSTRATION_HEIGHT,
    marginBottom: spacing.xl,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: colors.surfaceAlt,
    borderTopLeftRadius: ILLUSTRATION_HEIGHT / 2,
    borderTopRightRadius: ILLUSTRATION_HEIGHT / 2,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    overflow: "hidden",
  },
  avatar: {
    height: ILLUSTRATION_HEIGHT - spacing.sm,
    aspectRatio: 174 / 296,
  },
  title: {
    ...type.display,
    color: colors.ink,
  },
  subtitle: {
    ...type.body,
    color: colors.inkMuted,
  },
});
