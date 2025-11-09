import { defineConfig } from 'vitepress'
import nav from './nav.mts'
import sidebar from './sidebar.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/DT-docs",
  srcDir: "docs",
  
  title: "DT Docs",
  description: "My notes",
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {
        // English theme config
        nav,
        search: { provider: 'local' },
        sidebar,
        socialLinks: [
          { icon: 'github', link: 'https://github.com/DingxinTao0417' }
        ]
      }
    },
  }
})
