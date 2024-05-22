import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我的第一个项目",
  description: "测试",
  themeConfig: { // 主题相关配置
    // https://vitepress.dev/reference/default-theme-config
    //logo: '/logo.svg'
    nav: [  // 导航菜单项的配置
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [ // 侧边栏菜单项的配置
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [ // 在导航栏中展示带有图标的社交帐户链接
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
