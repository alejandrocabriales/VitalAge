const MINUTES_PER_HOUR = 60;

const pad = (value: number) => String(value).padStart(2, "0");

/** Formats minutes since midnight as "HH:mm". */
export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  return `${pad(hours)}:${pad(minutes % MINUTES_PER_HOUR)}`;
}

export function minutesToDate(minutes: number): Date {
  const date = new Date();
  date.setHours(Math.floor(minutes / MINUTES_PER_HOUR), minutes % MINUTES_PER_HOUR, 0, 0);
  return date;
}

export function dateToMinutes(date: Date): number {
  return date.getHours() * MINUTES_PER_HOUR + date.getMinutes();
}
