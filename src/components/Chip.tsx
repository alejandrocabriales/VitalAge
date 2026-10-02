import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, type, radius } from '../theme';

export function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[s.chip, { backgroundColor: selected ? colors.primary : colors.surfaceAlt }]}>
      <Text style={[type.label, { color: selected ? colors.onPrimary : colors.ink }]}>{label}</Text>
    </Pressable>
  );
}
const s = StyleSheet.create({ chip: { minHeight: 44, paddingHorizontal: 16, borderRadius: radius.pill, justifyContent: 'center' } });
