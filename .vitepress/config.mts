import { defineConfig } from 'vitepress'
import nav from './nav.mts'
import sidebar from './sidebar.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  // Set base for GitHub Pages project site: https://<user>.github.io/DT_docs/
  // If you use a custom domain, remove or change this accordingly.
  base: '/DT_docs/',
  
  title: "DT Docs",
  description: "My notes",

  themeConfig: {
    nav,
    sidebar,
    search: { provider: 'local' },
    socialLinks: [
          { icon: 'github', link: 'https://github.com/DingxinTao0417' }
    ]
  }
})
