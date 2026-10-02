import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, type, radius, shadows } from '../theme';

type Props = { title: string; subtitle: string; onPress: () => void };

export function HeroButton({ title, subtitle, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.btn, shadows.hero, pressed && { transform: [{ scale: 0.97 }] }]}>
      <View style={s.icon}><Ionicons name="footsteps" size={26} color="#fff" /></View>
      <View style={{ flex: 1 }}>
        <Text style={[type.hero, { color: colors.onPrimary }]}>{title}</Text>
        <Text style={[type.small, { color: colors.onPrimary }]}>{subtitle}</Text>
      </View>
      <Ionicons name="play" size={26} color="#fff" />
    </Pressable>
  );
}
const s = StyleSheet.create({
  btn: { backgroundColor: colors.primary, borderRadius: radius.xxl, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 14 },
  icon: { width: 56, height: 56, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
});
