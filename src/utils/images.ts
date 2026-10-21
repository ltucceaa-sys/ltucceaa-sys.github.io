import type { ImageMetadata } from 'astro';

// 所有放在 src/assets/images/ 底下的圖片，build 時會自動壓縮並轉成 webp。
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,avif}',
  { eager: true },
);

const PREFIX = '/src/assets/images/';

// 資料檔裡的 photo 欄位是「相對於 src/assets/images/」的路徑。
// 找不到圖片或沒有填時回傳 undefined，畫面就會改用預設的縮寫圖，不會出現破圖。
export function findImage(path?: string): ImageMetadata | undefined {
  if (!path) return undefined;
  const key = `${PREFIX}${path.replace(/^\/+/, '')}`;
  return modules[key]?.default;
}
