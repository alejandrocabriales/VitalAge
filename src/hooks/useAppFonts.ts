import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  DMSans_900Black,
  useFonts,
} from "@expo-google-fonts/dm-sans";

// Keys must match the names in theme/typography.ts `fontFamily`.
export function useAppFonts(): boolean {
  const [loaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    DMSans_900Black,
  });

  return loaded || error !== null;
}
