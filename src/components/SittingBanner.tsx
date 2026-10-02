import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, type, radius } from '../theme';

export function SittingBanner({ minutes }: { minutes: number }) {
  const c = minutes > 60 ? colors.sitting.over : minutes > 45 ? colors.sitting.warn : colors.sitting.ok;
  const hint = minutes > 60 ? 'Pasaste el límite de 60 min. Muévete ya.' : minutes > 45 ? 'Superaste los 45 min recomendados.' : 'Vas bien. Pausa recomendada a los 45 min.';
  const label = minutes >= 60 ? Math.floor(minutes / 60) + 'h ' + (minutes % 60) + 'm' : minutes + 'm';
  return (
    <View style={[s.box, { backgroundColor: c.bg }]}>
      <Text style={[type.h2, { color: c.ink, fontSize: 16 }]}>Llevas {label} sentada</Text>
      <View style={s.track}><View style={{ height: 6, width: `${Math.min(100, (minutes / 60) * 100)}%`, backgroundColor: c.bar, borderRadius: 3 }} /></View>
      <Text style={[type.caption, { color: colors.inkSoft }]}>{hint}</Text>
    </View>
  );
}
const s = StyleSheet.create({
  box: { borderRadius: 18, paddingVertical: 10, paddingHorizontal: 14, gap: 6 },
  track: { height: 6, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.1)', overflow: 'hidden' },
});
