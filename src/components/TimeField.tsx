import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, type } from "../theme";
import { dateToMinutes, formatMinutes, minutesToDate } from "../utils/time";

type Props = {
  label: string;
  /** Minutes since midnight. */
  minutes: number;
  onChange: (minutes: number) => void;
};

export function TimeField({ label, minutes, onChange }: Props) {
  const [iosPickerOpen, setIosPickerOpen] = useState(false);
  const value = minutesToDate(minutes);
  const handleValueChange = (_event: unknown, date: Date) =>
    onChange(dateToMinutes(date));

  // Android shows its own dialog; iOS needs the picker rendered in a sheet.
  const handlePress = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value,
        mode: "time",
        is24Hour: true,
        onValueChange: handleValueChange,
      });
      return;
    }
    setIosPickerOpen(true);
  };

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label} ${formatMinutes(minutes)}`}
        onPress={handlePress}
        style={styles.card}
      >
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.time}>{formatMinutes(minutes)}</Text>
      </Pressable>
      <Modal
        visible={iosPickerOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIosPickerOpen(false)}
      >
        <View style={styles.backdrop}>
          <View style={styles.sheet}>
            <DateTimePicker
              value={value}
              mode="time"
              display="spinner"
              themeVariant="light"
              onValueChange={handleValueChange}
            />
            <Pressable
              accessibilityRole="button"
              onPress={() => setIosPickerOpen(false)}
              style={styles.done}
            >
              <Text style={styles.doneLabel}>Listo</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: spacing.lg,
    borderWidth: 1,
    borderRadius: radius.xl,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  label: {
    ...type.small,
    color: colors.inkMuted,
  },
  time: {
    ...type.title,
    color: colors.ink,
  },
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  sheet: {
    padding: spacing.xxl,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    backgroundColor: colors.background,
  },
  done: {
    alignItems: "center",
    padding: spacing.md,
  },
  doneLabel: {
    ...type.h2,
    color: colors.primary,
  },
});
