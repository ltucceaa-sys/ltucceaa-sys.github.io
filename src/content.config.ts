import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 最新消息的分類。新增分類時，只要在這裡加一個名稱即可。
export const NEWS_CATEGORIES = [
  '系友會公告',
  '活動',
  '系友消息',
  '系務消息',
  '徵才',
  '研習',
  '職涯',
  '其他',
] as const;

// 活動狀態：報名中、即將舉行、已結束、活動回顧
export const EVENT_STATUS = ['registration', 'upcoming', 'ended', 'review'] as const;

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(NEWS_CATEGORIES),
    summary: z.string().default(''),
    author: z.string().default('嶺東幼保系友會'),
    // 圖片路徑是相對於 src/assets/images/ 的位置，例如 news/2026/photo.jpg
    cover: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().default(''),
    date: z.coerce.date(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    location: z.string().optional(),
    organizer: z.string().optional(),
    coOrganizer: z.string().optional(),
    registrationUrl: z.string().url().optional(),
    status: z.enum(EVENT_STATUS).default('upcoming'),
    cover: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { news, events };
