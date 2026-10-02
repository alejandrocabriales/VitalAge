export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 } as const;

export const radius = { sm: 12, md: 16, lg: 20, xl: 24, xxl: 28, pill: 999 } as const;

// Hit target minimum (44pt) and scroll-end padding that clears the fixed tab bar.
export const layout = { minTouch: 44, tabBarHeight: 72, scrollBottomPad: 128 } as const;
