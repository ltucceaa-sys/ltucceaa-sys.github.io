// 統一產生站內連結與圖片路徑，避免把 base path 寫死在內容裡。
// 目前 base 為 '/'；若日後部署在子路徑，只需修改 astro.config.mjs。
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function absoluteUrl(path = '/'): string {
  const site = import.meta.env.SITE ?? '';
  return `${site.replace(/\/$/, '')}${url(path)}`;
}
