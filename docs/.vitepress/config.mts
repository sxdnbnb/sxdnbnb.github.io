import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// 如果使用 GitHub/Gitee Pages 等公共平台部署
// 通常需要修改 base 路径，通常为“/仓库名/”
// const base = process.env.GITHUB_ACTIONS === 'true'
//   ? '/vitepress-blog-sugar-template/'
//   : '/'
// const base = '/sxdnbnb.github.io/'
// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // base,
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  // base,
  lang: 'zh-cn',
  title: '@暮冬浅夏',
  description: '暮冬浅夏的博客',
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'script',
      { charset: 'UTF-8', id: 'LA_COLLECT', src: '//sdk.51.la/js-sdk-pro.min.js' }
    ],
    [
      'script',
      {},
      `LA.init({id:"3IdmiCNCA52rjASE",ck:"3IdmiCNCA52rjASE",hashMode:true})`
    ],
    [
      'script',
      {
        id: 'LA-DATA-WIDGET',
        crossorigin: 'anonymous',
        charset: 'UTF-8',
        src: 'https://v6-widget.51.la/v6/3IdmiCNCA52rjASE/quote.js?theme=0&f=12&display=0,0,1,1,0,0,0,1'
      }
    ]
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录'
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdatedText: '上次更新于',

    // 设置logo
    logo: '/logo.png',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      { text: '首页', link: '/' },
      { text: 'Java基础', link: 'https://sxdnbnb.github.io/?tag=Java&type=info' },
      { text: 'Java项目', link: 'https://sxdnbnb.github.io/?tag=%E9%A1%B9%E7%9B%AE&type=success' },
      { text: '开发工具', link: 'https://sxdnbnb.github.io/?tag=%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7&type=success' },
      { text: '数据库', link: 'https://sxdnbnb.github.io/?tag=%E6%95%B0%E6%8D%AE%E5%BA%93&type=warning' },
      { text: '408', link: 'https://sxdnbnb.github.io/?tag=408&type=' },
      { text: '关于博客', link: '/about' },
      { text: '关于作者', link: 'https://github.com/sxdnbnb' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/sxdnbnb'
      }
    ]
  }
})
