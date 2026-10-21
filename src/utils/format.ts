const TZ = 'Asia/Taipei';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

// 例如：2026 年 12 月 13 日（週日）。固定用台灣時區，避免日期差一天。
export function formatDate(date: Date, withWeekday = true): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const weekdayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const base = `${get('year')} 年 ${get('month')} 月 ${get('day')} 日`;
  return withWeekday ? `${base}（週${WEEKDAYS[weekdayIndex]}）` : base;
}

// 供 <time datetime="..."> 使用，例如 2026-12-13
export function isoDate(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

export const EVENT_STATUS_LABEL: Record<string, string> = {
  registration: '報名中',
  upcoming: '即將舉行',
  ended: '已結束',
  review: '活動回顧',
};
