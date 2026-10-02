import React from 'react';
import { View, ViewProps } from 'react-native';
import { colors, radius } from '../theme';

export const Card = ({ style, ...p }: ViewProps) => (
  <View {...p} style={[{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: radius.lg, padding: 14 }, style]} />
);
