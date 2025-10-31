# 📆 weekekdays

Get an array of weekday names in any language, order, format.

Supports:

- **Languages**: Any locale supported by `Intl.DateTimeFormat`
- **Order**: Start from any day (Sunday, Monday, or even `"current"`)
- **Format**:
  - Style: `"long"`, `"short"`, `"narrow"`
  - Case: `"capital"`, `"upper"`, `"lower"`

---

[![npm version](https://img.shields.io/npm/v/weekdays.svg)](https://www.npmjs.com/package/weekdays)
[![License](https://img.shields.io/npm/l/weekdays.svg)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/navigatrum/weekdays/ci.yml?branch=main)](https://github.com/navigatrum/weekdays/actions)
[![Coverage](https://img.shields.io/codecov/c/github/navigatrum/weekdays)](https://codecov.io/gh/navigatrum/weekdays)

---

## 📦 Installation

```bash
npm install weekdays
# or
yarn add weekdays
```

## 🚀 Usage

```ts
import { weekdays } from "weekdays";
```

## 📚 Examples

```ts
// Weekdays in the current locale, starting from Sunday, using native casing
weekdays();
// ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Frech weekdays, strating from Sunday, using native casing
weekdays({ locales: "fr" });
// ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

// Arabic weekdays starting from Saturday
weekdays({ first: 6, locales: "ar" });
// ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']

// Spanish weekdays starting from current day (e.g. Friday), capitalized, in short form
weekdays({
  first: "current",
  case: "capital",
  style: "short",
  locales: "es-ES",
});
// ['Vie', 'Sáb', 'Dom', 'Lun', 'Mar', 'Mié', 'Jue']

// Chinese weekdays in short form, starting from Monday
weekdays({ locales: "zh-CN", first: 1, style: "short" });
// ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
```

## 🛠️ Options

```ts
type WeekdaysOptions = {
  locales?: string | string[]; // default: current locale
  style?: "long" | "short" | "narrow"; // default: "long"
  case?: "capital" | "upper" | "lower"; // default: native casing
  first?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | "current"; // default: 0 (Sunday)
};
```
