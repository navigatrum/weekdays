# weekekdays

Get an array of weekday names in any language, order, format (long, short, narrow; capitalized, uppercase, lowercase).

## Examples

```jscript
// get and array with the weekday names starting from Sunday in the current locale using its own format case
weekdays();
// ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// get and array with the Arabic weekday names starting from Saturday
weekdays("ar", { startFrom: 6 })
// ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']

// Spanish weekday names starting from Sunday in capital case
// weekdays("es-Es", { startFrom: 1, formatCase: "capital" } )
// ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

weekdays("zh-CN", { startFrom: 1, dayStyle: "short" } )
// ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
```
