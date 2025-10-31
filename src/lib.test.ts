import { weekdays } from './lib.js';
import { expect, describe, it, vi } from 'vitest';

describe('weekdays', () => {
  it('returns long weekdays in the current locale starting from Sunday by default', () => {
    const { format } = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
    const localeWeek: string[] = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(2025, 9, 19 + day); // start from a Sunday
      expect(date.getDay()).toBe(day);
      localeWeek.push(format(date));
    }

    const result = weekdays();
    expect(result).toEqual(localeWeek);

    const { locale } = Intl.DateTimeFormat().resolvedOptions();
    const explicitLocaleResult = weekdays({ locales: locale });
    expect(explicitLocaleResult).toEqual(localeWeek);
  });

  it('returns short weekdays in the current locale starting from Sunday', () => {
    const { format } = new Intl.DateTimeFormat(undefined, { weekday: 'short' });
    const localeWeek: string[] = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(2025, 9, 19 + day); // start from a Sunday
      expect(date.getDay()).toBe(day);
      localeWeek.push(format(date));
    }

    const result = weekdays({ style: 'short' });
    expect(result).toEqual(localeWeek);
  });

  it('returns long weekdays in Arabic starting from Saturday', () => {
    const expected = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];
    const result = weekdays({ locales: 'ar', first: 6 });
    expect(result).toEqual(expected);
  });

  it('returns short weekdays in German starting from Monday', () => {
    const expected = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    const result = weekdays({ locales: 'de-De', style: 'short', first: 1 });
    expect(result).toEqual(expected);
  });

  it('returns long capitalized weekdays in Spanish starting from Sunday', () => {
    const expected = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const result = weekdays({ locales: 'es-ES', case: 'capital' });
    expect(result).toEqual(expected);
  });

  it('returns narrow uppercase weekdays in Russian', () => {
    const expected = ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'];
    const result = weekdays({ locales: 'ru', case: 'upper', style: 'narrow' });
    expect(result).toEqual(expected);
  });

  it('returns lowercase weekdays in English starting from Monday', () => {
    const expected = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const result = weekdays({ locales: 'en-GB', case: 'lower', style: 'short', first: 1 });
    expect(result).toEqual(expected);
  });

  it('returns lowercase narrow weekdays in Afrikans starting from Sunday', () => {
    const expected = ['s', 'm', 'd', 'w', 'd', 'v', 's'];
    const result = weekdays({ locales: 'af', case: 'lower', style: 'narrow', first: 0 });
    expect(result).toEqual(expected);
  });

  it("returns long capitalized weekdays in French starting from Saturday if it's the first known locale", () => {
    const expected = ['Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    const result = weekdays({ locales: ['xx-XX', 'qq-QQ', 'fr-CH'], case: 'capital', first: 6 });
    expect(result).toEqual(expected);
  });

  it('returns long uppercase weekdays in Turkish', () => {
    const expected = ['PAZAR', 'PAZARTESİ', 'SALI', 'ÇARŞAMBA', 'PERŞEMBE', 'CUMA', 'CUMARTESİ'];
    const result = weekdays({ locales: 'tr', case: 'upper' });
    expect(result).toEqual(expected);
  });

  it('returns weekdays in Chinese starting from today when startFrom is "today"', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2025, 9, 20)); // Monday
    expect(new Date().getDay()).toBe(1);

    const expected = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    const result = weekdays({ locales: 'zh-CN', first: 'current' });
    expect(result).toEqual(expected);

    vi.useRealTimers();
  });
});
