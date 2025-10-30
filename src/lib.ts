export type WeekdaysOptions = {
  /**
   * Format style for weekday names.
   * Corresponds to Intl.DateTimeFormatOptions["weekday"].
   * Default: "short"
   */
  dayStyle?: Intl.DateTimeFormatOptions['weekday'];

  /**
   * Case transformation for weekday labels.
   * - "capital": Capitalize first letter
   * - "upper": Uppercase all letters
   * - "lower": Lowercase all letters
   * Default: language's native casing
   */
  formatCase?: 'capital' | 'upper' | 'lower';

  /**
   * Starting day of the week.
   * - 0 = Sunday, 1 = Monday, ..., 6 = Saturday
   * - "today" = start from current day
   * Default: 0 (Sunday)
   */
  startFrom?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 'today';
};

/**
 * Returns an array of weekday names.
 * @param options Configuration for weekday formatting.
 * - `dayStyle` defaults to `"short"`
 * - `formatCase` defaults to native casing
 * - `startFrom` defaults to `0` (Sunday)
 */
export const weekdays = (locales?: string | string[], options?: WeekdaysOptions): string[] => {
  const { startFrom = 0, dayStyle = 'long', formatCase } = { ...options };

  const startDay = new Date();
  if (startFrom !== 'today') {
    // sets the start day as last sunday + first day
    startDay.setDate(startDay.getDate() - startDay.getDay() + startFrom);
  }

  const time = startDay.getTime();
  const { format } = new Intl.DateTimeFormat(locales, { weekday: dayStyle });
  const MS_PER_DAY = 86400000;
  const days: string[] = [];

  for (let i = 0; i < 7; i++) {
    days.push(format(MS_PER_DAY * i + time));
  }

  switch (formatCase) {
    case 'capital':
      return days.map((d) => d.charAt(0).toLocaleUpperCase(locales) + d.slice(1));
    case 'lower':
      return days.map((d) => d.toLocaleLowerCase(locales));
    case 'upper':
      return days.map((d) => d.toLocaleUpperCase(locales));
  }

  return days;
};
