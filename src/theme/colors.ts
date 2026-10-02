export const colors = {
  // Surfaces
  page: '#E9DCBC',        // outer background
  background: '#F6EFDD',  // screen background
  surface: '#FBF3DF',     // cards, inputs, widgets
  surfaceAlt: '#EADDBF',  // large panels, inactive chips
  border: '#E6D8B5',

  // Text
  ink: '#3A2A1A',
  inkSoft: '#5A4A37',
  inkMuted: '#6B5A45',
  inkWarm: '#8A4A22',     // XP / streak hint under the hero CTA
  onPrimary: '#FFFFFF',

  // Translucent whites over the primary color
  glass: 'rgba(255,255,255,0.2)',
  ringTrack: 'rgba(255,255,255,0.25)',

  // Brand
  primary: '#E5531B',     // hero CTA, active tab, selected chips
  primaryTint: '#FBE3D6', // selected card background
  primaryShadow: 'rgba(229,83,27,0.35)',
  gold: '#F2B134',        // level badge
  mint: '#BFE5CC',        // streak badge, hydration "+"
  mintInk: '#2F6B47',

  // Postural traffic light
  posture: {
    active: '#86C9A0',    activeInk: '#1F4D33',
    tension: '#F28A3A',   tensionInk: '#3A2A1A',
    overload: '#D93A1E',  overloadInk: '#FFFFFF',
  },
  // Sitting-time banner by state
  sitting: {
    ok:   { bg: '#CDEBD6', ink: '#2F6B47', bar: '#4FA876' },
    warn: { bg: '#F9D9A8', ink: '#7A3E00', bar: '#F28A3A' },
    over: { bg: '#F6B9A8', ink: '#8A1F0C', bar: '#D93A1E' },
  },
  // Routine card icon tints
  tint: { mint: '#BFE5CC', gold: '#F2B134', coral: '#F4A988' },

  // States
  disabledBg: '#D9CCAE',
  disabledInk: '#8A7A62',
  toggleOff: '#CFC3A6',
  tabInactive: '#6B5A45',
  tabActive: '#E5531B',
} as const;
