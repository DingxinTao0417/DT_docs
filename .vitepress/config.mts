import { defineConfig, type DefaultTheme  } from 'vitepress'
import nav from './nav.mts'
import sidebar from './sidebar.mts'
import navZh from './zh/nav-zh.mts'
import sidebarZh from './zh/sidebar-zh.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",
  // Set base for GitHub Pages project site: https://<user>.github.io/DT_docs/
  // If you use a custom domain, remove or change this accordingly.
  base: '/DT_docs/',
  themeConfig: {
    search: { provider: 'local' }
  },
  
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      link: '/',
      title: 'DT Docs',
      description: 'My notes',
      themeConfig: {
        nav: nav as DefaultTheme.NavItem[],
        sidebar: sidebar as DefaultTheme.Sidebar,
        socialLinks: [
              { icon: 'github', link: 'https://github.com/DingxinTao0417' }
        ]
      }
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      title: 'DT 文档',
      description: '我的笔记',
      themeConfig: {
        nav: navZh as DefaultTheme.NavItem[],
        sidebar: sidebarZh as DefaultTheme.Sidebar,
        socialLinks: [
              { icon: 'github', link: 'https://github.com/DingxinTao0417' }
        ]
      }
    }
  }

})
