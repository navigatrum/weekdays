export type WeekdaysOptions = {
  /**
   * Format style for weekday names.
   * Corresponds to Intl.DateTimeFormatOptions["weekday"].
   * Default: "long"
   */
  style?: Intl.DateTimeFormatOptions['weekday'];

  /**
   * Case transformation for weekday labels.
   * - "capital": Capitalize first letter
   * - "upper": Uppercase all letters
   * - "lower": Lowercase all letters
   * Default: language's native casing
   */
  case?: 'capital' | 'upper' | 'lower';

  /**
   * First day of the week.
   * - 0 = Sunday, 1 = Monday, ..., 6 = Saturday
   * - "current" = start from current day
   * Default: 0 (Sunday)
   */
  first?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 'current';

 /**
 * Language(s) used for localization.
 * Default: system/browser locale
 */
  locales?: string | string[];
};

/**
 * Returns an array of weekday names.
 * @param options Configuration for weekday formatting.
 * - `style` defaults to `"long"`
 * - `case` defaults to native casing
 * - `first` defaults to `0` (Sunday)
 * - `locales` defaults to current locale
 */
export function weekdays(options?: WeekdaysOptions): string[] {
  const { first = 0, style = 'long', locales, case: formatCase } = { ...options };

  const startDay = new Date();
  if (first !== 'current') {
    // sets the start day as last sunday + first day
    startDay.setDate(startDay.getDate() - startDay.getDay() + first);
  }

  const time = startDay.getTime();
  const { format } = new Intl.DateTimeFormat(locales, { weekday: style });
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
}
