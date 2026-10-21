// @ts-check
import { defineConfig } from 'astro/config';

// 網站網址：repository 名稱為 ltucceaa-sys.github.io（使用者網站），
// 所以 base 是 '/'。若日後改用自訂網域，只需修改 site。
export default defineConfig({
  site: 'https://ltucceaa-sys.github.io',
  base: '/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
