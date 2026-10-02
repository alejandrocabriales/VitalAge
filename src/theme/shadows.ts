import { ViewStyle } from 'react-native';
import { colors } from './colors';

export const shadows = {
  hero: { shadowColor: colors.primary, shadowOpacity: 0.4, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 10 } as ViewStyle,
  chip: { shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3 } as ViewStyle,
};
