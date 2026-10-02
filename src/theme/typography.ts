import { TextStyle } from 'react-native';

export const fontFamily = {
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  bold: 'DMSans_700Bold',
  black: 'DMSans_900Black',
} as const;

const t = (size: number, weight: keyof typeof fontFamily, lh?: number): TextStyle => ({
  fontFamily: fontFamily[weight], fontSize: size, lineHeight: lh ?? Math.round(size * 1.3),
});

export const type = {
  display: t(34, 'black', 38),   // "Marina", onboarding hero
  title: t(30, 'black', 35),     // screen titles
  hero: t(22, 'black'),          // "Moverme ahora"
  session: t(26, 'black', 32),   // routine title in a running break
  h2: t(18, 'black'),            // section headers
  h3: t(16, 'black'),
  body: t(16, 'regular', 22),
  bodyBold: t(15, 'bold'),
  small: t(14, 'regular'),
  label: t(13, 'bold'),
  caption: t(12, 'regular'),
  captionBold: t(12, 'bold'),
  micro: t(11, 'regular'),
  clock: t(54, 'black', 60),     // break countdown
  check: t(80, 'black', 88),     // break completed mark
  overline: { ...t(12, 'bold'), letterSpacing: 0.5 } as TextStyle, // "TU EDAD"
  tab: t(12, 'bold'),
  stat: t(44, 'black', 48),
};
