// docs/.vitepress/config.mts
import { defineConfig } from "file:///D:/%E6%A1%8C%E9%9D%A2/%E5%8D%9A%E5%AE%A2/sxdnbnb.github.io/node_modules/.pnpm/vitepress@1.6.3_@algolia+client-search@5.23.0_async-validator@4.2.5_postcss@8.5.3_sass-embedd_dsncb5tsfj2ma5nq4bq57pxu6a/node_modules/vitepress/dist/node/index.js";
import { defineTeekConfig } from "file:///D:/%E6%A1%8C%E9%9D%A2/%E5%8D%9A%E5%AE%A2/sxdnbnb.github.io/node_modules/.pnpm/vitepress-theme-teek@1.0.0-alpha.9_element-plus@2.9.7_vue@3.5.13__vitepress@1.6.3_@algolia+cl_idajhcuoxtxgwbyhfrw4hlxbru/node_modules/vitepress-theme-teek/es/config/index.mjs";
import timeline from "file:///D:/%E6%A1%8C%E9%9D%A2/%E5%8D%9A%E5%AE%A2/sxdnbnb.github.io/node_modules/.pnpm/vitepress-markdown-timeline@1.2.2/node_modules/vitepress-markdown-timeline/dist/cjs/index.cjs.js";
import { groupIconMdPlugin, groupIconVitePlugin } from "file:///D:/%E6%A1%8C%E9%9D%A2/%E5%8D%9A%E5%AE%A2/sxdnbnb.github.io/node_modules/.pnpm/vitepress-plugin-group-icons@1.3.8/node_modules/vitepress-plugin-group-icons/dist/index.mjs";
var description = ["\u6280\u672F\u6587\u6863", "\u751F\u6D3B\u611F\u609F"].toString();
var tkConfig = defineTeekConfig({
  author: { name: "sxdnbnb", link: "https://github.com/sxdnbnb" },
  blogger: {
    // 博主信息，显示在首页侧边栏
    avatar: "/img/logo.png",
    shape: "circle-rotate",
    name: "\u66AE\u51AC\u6D45\u590F",
    slogan: "\u7EB5\u4F7F\u547D\u8FD0\u5929\u6CE8\u5B9A\uFF0C\u6211\u547D\u7531\u6211\u4E0D\u7531\u5929\uFF01"
  },
  docAnalysis: {
    createTime: "2025-04-01",
    statistics: {
      provider: "busuanzi"
    },
    wordCount: true,
    readingTime: true,
    overrideInfo: [
      { key: "lastActiveTime", value: (_, currentValue) => `${currentValue}` },
      { key: "totalPosts", label: "\u6587\u7AE0\u603B\u6570\u76EE" }
    ]
    // appendInfo: [{ key: "index", label: "序号", value: "One" }],
  },
  // 赞赏在文章下方
  appreciation: {
    position: "doc-after",
    options: {
      icon: "weChatPay",
      // 赞赏图标，内置 weChatPay 和 alipay
      expandTitle: "\u6253\u8D4F\u652F\u6301",
      // 展开标题，支持 HTML
      collapseTitle: "\u4E0B\u6B21\u4E00\u5B9A",
      // 折叠标题，支持 HTML
      content: `<img src='/img/zhifu.png'>`,
      // 赞赏内容，支持 HTML
      expand: false
      // 是否默认展开，默认 false
    }
  },
  banner: {
    mask: false,
    enabled: true,
    bgStyle: "fullImg",
    imgInterval: 8e3,
    imgShuffle: true,
    // 当多张大图时（imgSrc 为数组），设置切换时间，单位：毫秒   
    imgSrc: [
      // "https://www.yotu.net/i/67f4f0f0b4f99.jpg",
      // "https://www.yotu.net/i/67f4f0f0bf887.jpg",
      // "https://www.yotu.net/i/67f4f0f0bb8b8.jpg",
      // "https://www.yotu.net/i/67f4f0f0ceba8.jpg",
      // "https://www.yotu.net/i/67f4f0f0cf7ea.jpg",
      // "https://www.yotu.net/i/67f4f0f527b17.jpg",
      // "https://www.yotu.net/i/67f4f0f26359f.jpg",
      // "https://www.yotu.net/i/67f4f0f57b42a.jpg",
      // "https://www.yotu.net/i/67f4f0f67480d.jpg",
      // "https://www.yotu.net/i/67f4f0f4efc8f.jpg",
      // "https://www.yotu.net/i/67f4f0f5a1d55.jpg",
      // "https://www.yotu.net/i/67f4f0f647073.jpg",
      "/img/12.jpg",
      "/img/13.jpg",
      "/img/1.jpg",
      "/img/2.jpg",
      "/img/3.jpg",
      "/img/4.jpg",
      "/img/5.jpg",
      "/img/7.jpg",
      "/img/8.jpg",
      "/img/9.jpg",
      "/img/10.jpg",
      "/img/11.jpg"
    ],
    descStyle: "types",
    maskBg: "rgba(0, 0, 0, 0.4)",
    // Banner 大图遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色
    textColor: "#ffffff",
    // Banner 字体颜色，bgStyle 为 default 时为 '#000000'，其他为 '#ffffff'
    titleFontSize: "3.2rem",
    // 标题字体大小
    descFontSize: "1.4rem",
    // 描述字体大小
    // descStyle: "types", // 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
    description: [
      //lonely
      "\u521D\u95FB\u4E0D\u77E5\u66F2\u4E2D\u610F\uFF0C\u518D\u542C\u5DF2\u662F\u66F2\u4E2D\u4EBA",
      // 原有内容保留
      "\u4E07\u822C\u52AA\u529B\u53EA\u4E3A\u51FA\u4EBA\u5934\u5730\uFF0C\u4F4E\u5934\u5F2F\u8170\u53EA\u4E3A\u722C\u7684\u66F4\u9AD8",
      // 动漫经典语录
      "\u91CD\u8981\u7684\u4E0D\u662F\u4F60\u957F\u5F97\u6F02\u4EAE\u4E0E\u5426\uFF0C\u800C\u662F\u4F60\u7684\u5FC3\u7075\u662F\u5426\u7F8E\u4E3D \u2014\u2014 \u5343\u4E0E\u5343\u5BFB",
      "\u6211\u4EEC\u4EF0\u671B\u7740\u540C\u4E00\u7247\u5929\u7A7A\uFF0C\u5374\u770B\u7740\u4E0D\u540C\u7684\u5730\u65B9 \u2014\u2014 \u79D2\u901F\u4E94\u5398\u7C73",
      "\u6BD4\u81EA\u5DF1\u7684\u751F\u547D\u66F4\u91CD\u8981\u7684\u4E1C\u897F\u6C38\u8FDC\u5B58\u5728\u7740 \u2014\u2014 fate",
      "\u6B63\u56E0\u4E3A\u751F\u6765\u4EC0\u4E48\u90FD\u6CA1\u6709\uFF0C\u56E0\u6B64\u6211\u4EEC\u80FD\u62E5\u6709\u4E00\u5207 \u2014\u2014 \u6E38\u620F\u4EBA\u751F",
      // 爱情感悟
      "\u559C\u6B22\u4E00\u4E2A\u4EBA\u5C31\u662F\u5728\u5BF9\u65B9\u7684\u4E00\u5207\u90FD\u5408\u7406\u5316",
      "\u7231\uFF0C\u5176\u5B9E\u5F88\u7B80\u5355\uFF0C\u56F0\u96BE\u7684\u662F\u63A5\u53D7\u8FD9\u4EFD\u7B80\u5355",
      "\u6700\u597D\u7684\u7231\u60C5\u662F\u4E92\u76F8\u6210\u5C31\uFF0C\u800C\u4E0D\u662F\u4E92\u76F8\u7981\u9522",
      "\u7F18\u5206\u5C31\u662F\uFF0C\u9047\u89C1\u4E86\u53EF\u4EE5\u8BA9\u4F60\u7B11\u7684\u4EBA",
      "\u7231\u60C5\u4E0D\u662F\u5360\u6709\uFF0C\u800C\u662F\u5F7C\u6B64\u6210\u5C31",
      // 人生哲理
      "\u751F\u547D\u4E2D\u6700\u56F0\u96BE\u7684\u65F6\u523B\uFF0C\u6070\u662F\u8F6C\u673A\u7684\u5F00\u59CB",
      "\u6CA1\u6709\u4EBA\u53EF\u4EE5\u56DE\u5230\u8FC7\u53BB\uFF0C\u4F46\u6BCF\u4E2A\u4EBA\u90FD\u53EF\u4EE5\u4ECE\u73B0\u5728\u5F00\u59CB",
      "\u4E0E\u5176\u7B49\u5F85\u673A\u4F1A\uFF0C\u4E0D\u5982\u521B\u9020\u673A\u4F1A",
      "\u751F\u6D3B\u4E0D\u4F1A\u56E0\u4E3A\u4F60\u7684\u61E6\u5F31\u800C\u505C\u6B62\u811A\u6B65",
      "\u6210\u957F\u7684\u8FC7\u7A0B\u603B\u662F\u5B64\u72EC\u7684\uFF0C\u4F46\u7ED3\u679C\u662F\u7F8E\u597D\u7684",
      // 更多动漫台词
      "\u5373\u4F7F\u662F\u5728\u6700\u6DF1\u7684\u9ED1\u6697\u91CC\uFF0C\u4E5F\u8981\u4FDD\u6301\u5E0C\u671B \u2014\u2014 \u8FDB\u51FB\u7684\u5DE8\u4EBA",
      "\u4E0D\u8981\u4E3A\u4E86\u522B\u4EBA\u800C\u6D3B\uFF0C\u8981\u4E3A\u4E86\u81EA\u5DF1\u800C\u6D3B \u2014\u2014 \u706B\u5F71\u5FCD\u8005",
      "\u6BD4\u8D77\u60B2\u4F24\uFF0C\u65E0\u6CD5\u5206\u4EAB\u5FEB\u4E50\u624D\u662F\u771F\u7684\u5BC2\u5BDE \u2014\u2014 \u56DB\u6708\u662F\u4F60\u7684\u8C0E\u8A00",
      "\u68A6\u60F3\u662F\u4E0D\u4F1A\u7ED3\u675F\u7684\uFF0C\u53EA\u8981\u8FD8\u6D3B\u7740\u5C31\u8981\u7EE7\u7EED\u8FFD\u9010 \u2014\u2014 \u6D77\u8D3C\u738B",
      // ... 继续添加更多句子直到100个
      "\u751F\u547D\u7684\u610F\u4E49\u4E0D\u5728\u4E8E\u6D3B\u4E86\u591A\u4E45\uFF0C\u800C\u5728\u4E8E\u7ECF\u5386\u4E86\u4EC0\u4E48",
      "\u6700\u73CD\u8D35\u7684\u4E0D\u662F\u62E5\u6709\u7684\u56DE\u5FC6\uFF0C\u800C\u662F\u6B63\u5728\u521B\u9020\u7684\u56DE\u5FC6",
      "\u4E0D\u8981\u56E0\u4E3A\u8D70\u5F97\u592A\u8FDC\uFF0C\u800C\u5FD8\u8BB0\u4E86\u4E3A\u4EC0\u4E48\u51FA\u53D1",
      "\u6709\u65F6\u5019\uFF0C\u575A\u6301\u4E86\u4F60\u6700\u4E0D\u60F3\u5E72\u7684\u4E8B\u60C5\uFF0C\u5374\u7B49\u6765\u4E86\u4F60\u6700\u60F3\u8981\u7684\u7ED3\u679C",
      "\u4E0E\u5176\u7528\u6CEA\u6C34\u6094\u6068\u6628\u5929\uFF0C\u4E0D\u5982\u7528\u6C57\u6C34\u62FC\u640F\u4ECA\u5929",
      // 添加更多正能量句子...
      "\u6BCF\u4E2A\u4EBA\u90FD\u662F\u81EA\u5DF1\u4EBA\u751F\u7684\u4E3B\u89D2",
      "\u4E0D\u8981\u88AB\u5468\u56F4\u7684\u58F0\u97F3\u5E72\u6270\uFF0C\u575A\u6301\u81EA\u5DF1\u8BA4\u5B9A\u7684\u9053\u8DEF",
      "\u6210\u529F\u4E0D\u662F\u7EC8\u70B9\uFF0C\u5931\u8D25\u4E5F\u4E0D\u662F\u7EC8\u7ED3",
      "\u65F6\u95F4\u4F1A\u8BC1\u660E\u4E00\u5207\uFF0C\u8010\u5FC3\u662F\u6700\u597D\u7684\u7B54\u6848",
      "\u6D3B\u5728\u5F53\u4E0B\uFF0C\u73CD\u60DC\u73B0\u5728\uFF0C\u671F\u5F85\u672A\u6765"
    ],
    // 描述信息
    switchTime: 4e3,
    // 描述信息切换间隔时间，单位：毫秒。descStyle 为 switch 时生效
    switchShuffle: false,
    // 描述信息是否随机切换，为 false 时按顺序切换。descStyle 为 switch 时生效
    typesInTime: 200,
    // 输出一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesOutTime: 100,
    // 删除一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesNextTime: 800,
    // 打字与删字的间隔时间，单位：毫秒。descStyle 为 types 时生效
    typesShuffle: false
    // 描述信息是否随机打字，为 false 时按顺序打字，descStyle 为 types 时生效
  },
  // bodyBgImg: {
  //   imgSrc: ["/img/bg1.jpg", "/img/bg2.png"],
  //   bannerStyle: "full",
  // },
  // 首页顶部按 F11 开启壁纸模式
  wallpaper: {
    enabled: true
  },
  post: {
    coverImgMode: "full"
    // 封面大图
  },
  // 文章
  article: {
    showIcon: true,
    // 作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息的图标是否显示
    // dateFormat: "yyyy-MM-dd hh:mm:ss", // 文章日期格式，首页和文章页解析日期时使用
    dateFormat: "yyyy-MM-dd",
    // 文章日期格式，首页和文章页解析日期时使用
    showInfo: true,
    // 是否展示作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息，分别作用于首页和文章页
    showAuthor: true,
    // 是否展示作者
    showCreateDate: true,
    // 是否展示创建日期
    showUpdateDate: true,
    // 是否展示更新日期，是否展示更新时间，仅在文章页显示
    showCategory: true,
    // 是否展示分类
    showTag: true,
    // 是否展示标签
    topTip: (frontmatter) => {
      const tip = {
        type: "warning",
        title: "\u6CE8\u610F",
        text: "\u6587\u7AE0\u53D1\u5E03\u8F83\u65E9\uFF0C\u5185\u5BB9\u53EF\u80FD\u8FC7\u65F6\uFF0C\u9605\u8BFB\u6CE8\u610F\u7504\u522B\u3002"
      };
      if (frontmatter.long) return tip;
      const longTime = 24 * 30 * 24 * 60 * 60 * 1e3;
      if (frontmatter.date && Date.now() - new Date(frontmatter.date).getTime() > longTime) return tip;
    }
  },
  // 设置主题尺寸
  // themeSetting: {
  //   themeSize: "large",
  // },
  // 友链信息
  friendLink: {
    list: [
      { avatar: "/img/teek-logo-large.png", name: "Young Kbt blog", desc: "Teeker\u4F5C\u8005", link: "https://notes.youngkbt.cn/" }
    ]
  },
  footerInfo: {
    // topMessage: ["初闻不知曲中意，再听已是曲中人"],
    bottomMessage: ["\u521D\u95FB\u4E0D\u77E5\u66F2\u4E2D\u610F\uFF0C\u518D\u542C\u5DF2\u662F\u66F2\u4E2D\u4EBA"],
    // 主题版权配置
    theme: {
      show: false
      // 是否显示主题版权，建议显示
      // name: "Theme By teek@1.0.0-alpha.4-2025.3.31", // 自定义名称
      // link: "https://github.com/Kele-Bingtang/vitepress-theme-teek", // 自定义链接
    },
    // 博客版权配置    
    copyright: {
      show: true,
      // 是否显示博客版权
      createYear: 2024,
      suffix: "\u66AE\u51AC\u6D45\u590F"
    },
    icpRecord: {
      name: "\u6842ICP\u590720240156994\u53F7",
      link: "http://beian.miit.gov.cn/"
    },
    // 网络安全备案信息配置
    // securityRecord: {
    //   name: "甘公网安备62102702000211号",
    //   link: "https://beian.mps.gov.cn/",
    // },    
    customHtml: `<p>\u5C0F\u7834\u7AD9\u5DF2\u8FD0\u884C\u4E86 <span id="footer-runtime"></span></p>`
  },
  // 社交链接
  social: [
    {
      icon: "icon-github",
      iconType: "iconfont",
      name: "GitHub",
      link: "https://github.com/sxdnbnb"
    },
    // {
    //   icon: "icon-gitee2",
    //   iconType: "iconfont",
    //   name: "Gitee",
    //   link: "https://gitee.com/onlyonexl/",
    // },
    {
      icon: "icon-qq",
      iconType: "iconfont",
      name: "QQ",
      link: "/img/qq.png"
    },
    {
      icon: "icon-weixin",
      iconType: "iconfont",
      name: "\u8054\u7CFB\u6211",
      link: "/img/weixin.png"
    }
  ],
  comment: {
    // provider: "giscus",
    provider: "twikoo",
    options: {
      // twikoo 配置，官网：https://twikoo.js.org/
      envId: "https://sxdnbnb.github.io/",
      link: "https://cdn.jsdelivr.net/npm/twikoo@1.6.41/dist/twikoo.min.js"
      // waline 配置，官网：https://waline.js.org/
      // serverURL: "https://tk.waline.youngkbt.cn/",
      // jsLink: "https://unpkg.com/@waline/client@v3/dist/waline.js",
      // cssLink: "https://unpkg.com/@waline/client@v3/dist/waline.css",
      // giscus 配置，官网：https://giscus.app/zh-CN
      // repo: "Kele-Bingtang/vitepress-theme-kt",
      // repoId: "R_kgDONpVfBA",
      // category: "Announcements",
      // categoryId: "DIC_kwDONpVfBM4Cm3v9",
      // artalk 配置，官网：https://artalk.js.org/
      // server: "",
      // site: "",
    }
  },
  notice: {
    enabled: true,
    position: "center"
  },
  vitePlugins: {
    autoFrontmatter: true,
    //添加自动格式formatter插件
    sidebarOption: {
      // initItems: false, //这条命令注释后，才会让文档和目录的样式保持一致
      collapsed: true
      //打开侧边栏自动收缩功能
    }
  },
  markdown: {
    config: (md) => {
      md.use(timeline);
      md.use(groupIconMdPlugin);
    }
  }
});
var config_default = defineConfig({
  // ignoreDeadLinks: true,
  extends: tkConfig,
  base: "/",
  title: "\u66AE\u51AC\u6D45\u590F\u306EBlog",
  description,
  cleanUrls: true,
  lastUpdated: true,
  lang: "zh-CN",
  head: [
    ["meta", { name: "author", content: "Tianke" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
      }
    ],
    [
      "meta",
      {
        name: "description",
        description
      }
    ],
    ["meta", { name: "keywords", description }],
    ["link", { rel: "icon", href: "/favicon.ico", type: "image/png" }],
    ["link", { rel: "stylesheet", href: "//at.alicdn.com/t/font_2989306_w303erbip9.css" }],
    // 阿里在线矢量库
    //添加看板娘
    [
      "script",
      {
        src: "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"
      }
    ],
    //免费的音乐播放器
    [
      "script",
      {
        type: "text/javascript",
        src: "https://myhkw.cn/player/js/jquery.min.js"
      }
    ],
    // 插入自定义脚本
    [
      "script",
      {
        type: "text/javascript",
        id: "myhk",
        src: "https://myhkw.cn/api/player/174271691795",
        key: "174271691795",
        m: "1",
        defer: "defer"
        // 添加defer属性，确保脚本在DOM加载完成后执行
      }
    ]
  ],
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "\u63D0\u793A",
      warningLabel: "\u8B66\u544A",
      dangerLabel: "\u5371\u9669",
      infoLabel: "\u4FE1\u606F",
      detailsLabel: "\u8BE6\u7EC6\u4FE1\u606F"
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/favicon.ico",
    darkModeSwitchLabel: "\u4E3B\u9898",
    sidebarMenuLabel: "\u83DC\u5355",
    returnToTopLabel: "\u8FD4\u56DE\u9876\u90E8",
    lastUpdatedText: "\u4E0A\u6B21\u66F4\u65B0\u65F6\u95F4",
    outline: {
      level: [2, 4],
      label: "\u672C\u9875\u5BFC\u822A"
    },
    docFooter: {
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875"
    },
    nav: [
      { text: "\u{1F3E1}\u9996\u9875", link: "/" },
      {
        text: "\u{1F5C3}\uFE0F\u7B14\u8BB0",
        items: [
          { text: "Java\u57FA\u7840", link: "/java" },
          { text: "Java\u9879\u76EE", link: "/project" },
          { text: "\u5F00\u53D1\u5DE5\u5177", link: "/develop" },
          { text: "\u6570\u636E\u5E93", link: "/database" },
          { text: "408", link: "/408" },
          { text: "\u7B97\u6CD5", link: "/algorithm" }
        ]
      },
      {
        text: "\u{1F496}\u5C0F\u5C4B",
        items: [
          { text: "\u76F8\u518C", link: "/photo" },
          { text: "\u968F\u7B14", link: "/essay" },
          { text: "\u611F\u609F", link: "/Perception" }
        ]
      },
      {
        text: "\u{1F44F}\u7D22\u5F15",
        items: [
          { text: "\u5206\u7C7B", link: "/@pages/categoriesPage.md" },
          { text: "\u6807\u7B7E", link: "/@pages/tagsPage.md" },
          { text: "\u5F52\u6863", link: "/@pages/archivesPage.md" }
        ]
      },
      { text: "\u8D44\u6E90\u{1F60D}", link: "https://sxdwdwd.github.io/" }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/sxdnbnb" }],
    search: {
      provider: "local"
    }
    // editLink: {
    //   text: "在 GitHub 上编辑此页",
    //   pattern: "https://github.com/Kele-Bingtang/hd-security/edit/master/hd-security-docs/docs/:path",
    // },
  },
  // 运行后自动打开网页
  vite: {
    server: {
      open: true
    },
    plugins: [
      groupIconVitePlugin()
      //代码组图标
    ],
    //其他配置项 
    build: {
      chunkSizeWarningLimit: 35e3
      // 限制警告的块大小
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTY4NENcdTk3NjJcXFxcXHU1MzVBXHU1QkEyXFxcXHN4ZG5ibmIuZ2l0aHViLmlvXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHU2ODRDXHU5NzYyXFxcXFx1NTM1QVx1NUJBMlxcXFxzeGRuYm5iLmdpdGh1Yi5pb1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUU2JUExJThDJUU5JTlEJUEyLyVFNSU4RCU5QSVFNSVBRSVBMi9zeGRuYm5iLmdpdGh1Yi5pby9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlcHJlc3NcIjtcclxuaW1wb3J0IHsgZGVmaW5lVGVla0NvbmZpZyB9IGZyb20gXCJ2aXRlcHJlc3MtdGhlbWUtdGVlay9jb25maWdcIjtcclxuaW1wb3J0IHRpbWVsaW5lIGZyb20gXCJ2aXRlcHJlc3MtbWFya2Rvd24tdGltZWxpbmVcIjsgLy8gXHU1QkZDXHU1MTY1XHU2NUY2XHU5NUY0XHU3RUJGXHU2M0QyXHU0RUY2XHJcbmltcG9ydCB7IGdyb3VwSWNvbk1kUGx1Z2luLCBncm91cEljb25WaXRlUGx1Z2luIH0gZnJvbSBcInZpdGVwcmVzcy1wbHVnaW4tZ3JvdXAtaWNvbnNcIjsgLy8gXHU1QkZDXHU1MTY1XHU0RUUzXHU3ODAxXHU3RUM0XHU1NkZFXHU2ODA3XHU2M0QyXHU0RUY2XHJcblxyXG5jb25zdCBkZXNjcmlwdGlvbiA9IFtcIlx1NjI4MFx1NjcyRlx1NjU4N1x1Njg2M1wiLCBcIlx1NzUxRlx1NkQzQlx1NjExRlx1NjA5RlwiXS50b1N0cmluZygpO1xyXG5cclxuY29uc3QgdGtDb25maWcgPSBkZWZpbmVUZWVrQ29uZmlnKHtcclxuICBhdXRob3I6IHsgbmFtZTogXCJzeGRuYm5iXCIsIGxpbms6IFwiaHR0cHM6Ly9naXRodWIuY29tL3N4ZG5ibmJcIiB9LFxyXG4gIGJsb2dnZXI6IHtcclxuICAgIC8vIFx1NTM1QVx1NEUzQlx1NEZFMVx1NjA2Rlx1RkYwQ1x1NjYzRVx1NzkzQVx1NTcyOFx1OTk5Nlx1OTg3NVx1NEZBN1x1OEZCOVx1NjgwRlxyXG4gICAgYXZhdGFyOiBcIi9pbWcvbG9nby5wbmdcIixcclxuICAgIHNoYXBlOiBcImNpcmNsZS1yb3RhdGVcIixcclxuICAgIG5hbWU6IFwiXHU2NkFFXHU1MUFDXHU2RDQ1XHU1OTBGXCIsXHJcbiAgICBzbG9nYW46IFwiXHU3RUI1XHU0RjdGXHU1NDdEXHU4RkQwXHU1OTI5XHU2Q0U4XHU1QjlBXHVGRjBDXHU2MjExXHU1NDdEXHU3NTMxXHU2MjExXHU0RTBEXHU3NTMxXHU1OTI5XHVGRjAxXCIsXHJcbiAgfSxcclxuXHJcbiAgZG9jQW5hbHlzaXM6IHtcclxuICAgIGNyZWF0ZVRpbWU6IFwiMjAyNS0wNC0wMVwiLFxyXG4gICAgc3RhdGlzdGljczoge1xyXG4gICAgICBwcm92aWRlcjogXCJidXN1YW56aVwiLFxyXG4gICAgfSxcclxuICAgIHdvcmRDb3VudDogdHJ1ZSxcclxuICAgIHJlYWRpbmdUaW1lOiB0cnVlLFxyXG4gICAgb3ZlcnJpZGVJbmZvOiBbXHJcbiAgICAgIHsga2V5OiBcImxhc3RBY3RpdmVUaW1lXCIsIHZhbHVlOiAoXywgY3VycmVudFZhbHVlKSA9PiBgJHtjdXJyZW50VmFsdWV9YCB9LFxyXG4gICAgICB7IGtleTogXCJ0b3RhbFBvc3RzXCIsIGxhYmVsOiBcIlx1NjU4N1x1N0FFMFx1NjAzQlx1NjU3MFx1NzZFRVwiIH0sXHJcbiAgICBdLFxyXG4gICAgLy8gYXBwZW5kSW5mbzogW3sga2V5OiBcImluZGV4XCIsIGxhYmVsOiBcIlx1NUU4Rlx1NTNGN1wiLCB2YWx1ZTogXCJPbmVcIiB9XSxcclxuICB9LFxyXG4gICAgLy8gXHU4RDVFXHU4RDRGXHU1NzI4XHU2NTg3XHU3QUUwXHU0RTBCXHU2NUI5XHJcbiAgICBhcHByZWNpYXRpb246IHtcclxuICAgICAgcG9zaXRpb246IFwiZG9jLWFmdGVyXCIsXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBpY29uOiBcIndlQ2hhdFBheVwiLCAvLyBcdThENUVcdThENEZcdTU2RkVcdTY4MDdcdUZGMENcdTUxODVcdTdGNkUgd2VDaGF0UGF5IFx1NTQ4QyBhbGlwYXlcclxuICAgICAgICBleHBhbmRUaXRsZTogXCJcdTYyNTNcdThENEZcdTY1MkZcdTYzMDFcIiwgLy8gXHU1QzU1XHU1RjAwXHU2ODA3XHU5ODk4XHVGRjBDXHU2NTJGXHU2MzAxIEhUTUxcclxuICAgICAgICBjb2xsYXBzZVRpdGxlOiBcIlx1NEUwQlx1NkIyMVx1NEUwMFx1NUI5QVwiLCAvLyBcdTYyOThcdTUzRTBcdTY4MDdcdTk4OThcdUZGMENcdTY1MkZcdTYzMDEgSFRNTFxyXG4gICAgICAgIGNvbnRlbnQ6IGA8aW1nIHNyYz0nL2ltZy96aGlmdS5wbmcnPmAsIC8vIFx1OEQ1RVx1OEQ0Rlx1NTE4NVx1NUJCOVx1RkYwQ1x1NjUyRlx1NjMwMSBIVE1MXHJcbiAgICAgICAgZXhwYW5kOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU5RUQ4XHU4QkE0XHU1QzU1XHU1RjAwXHVGRjBDXHU5RUQ4XHU4QkE0IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICBiYW5uZXI6IHtcclxuICAgIG1hc2s6IGZhbHNlLFxyXG4gICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgIGJnU3R5bGU6IFwiZnVsbEltZ1wiLFxyXG4gICAgaW1nSW50ZXJ2YWw6IDgwMDAsXHJcbiAgICBpbWdTaHVmZmxlOiB0cnVlLCAgLy8gXHU1RjUzXHU1OTFBXHU1RjIwXHU1OTI3XHU1NkZFXHU2NUY2XHVGRjA4aW1nU3JjIFx1NEUzQVx1NjU3MFx1N0VDNFx1RkYwOVx1RkYwQ1x1OEJCRVx1N0Y2RVx1NTIwN1x1NjM2Mlx1NjVGNlx1OTVGNFx1RkYwQ1x1NTM1NVx1NEY0RFx1RkYxQVx1NkJFQlx1NzlEMiAgIFxyXG4gICAgaW1nU3JjOiBbXHJcbiAgICAgIC8vIFwiaHR0cHM6Ly93d3cueW90dS5uZXQvaS82N2Y0ZjBmMGI0Zjk5LmpwZ1wiLFxyXG4gICAgICAvLyBcImh0dHBzOi8vd3d3LnlvdHUubmV0L2kvNjdmNGYwZjBiZjg4Ny5qcGdcIixcclxuICAgICAgLy8gXCJodHRwczovL3d3dy55b3R1Lm5ldC9pLzY3ZjRmMGYwYmI4YjguanBnXCIsXHJcbiAgICAgIC8vIFwiaHR0cHM6Ly93d3cueW90dS5uZXQvaS82N2Y0ZjBmMGNlYmE4LmpwZ1wiLFxyXG4gICAgICAvLyBcImh0dHBzOi8vd3d3LnlvdHUubmV0L2kvNjdmNGYwZjBjZjdlYS5qcGdcIixcclxuICAgICAgLy8gXCJodHRwczovL3d3dy55b3R1Lm5ldC9pLzY3ZjRmMGY1MjdiMTcuanBnXCIsXHJcbiAgICAgIC8vIFwiaHR0cHM6Ly93d3cueW90dS5uZXQvaS82N2Y0ZjBmMjYzNTlmLmpwZ1wiLFxyXG4gICAgICAvLyBcImh0dHBzOi8vd3d3LnlvdHUubmV0L2kvNjdmNGYwZjU3YjQyYS5qcGdcIixcclxuICAgICAgLy8gXCJodHRwczovL3d3dy55b3R1Lm5ldC9pLzY3ZjRmMGY2NzQ4MGQuanBnXCIsXHJcbiAgICAgIC8vIFwiaHR0cHM6Ly93d3cueW90dS5uZXQvaS82N2Y0ZjBmNGVmYzhmLmpwZ1wiLFxyXG4gICAgICAvLyBcImh0dHBzOi8vd3d3LnlvdHUubmV0L2kvNjdmNGYwZjVhMWQ1NS5qcGdcIixcclxuICAgICAgLy8gXCJodHRwczovL3d3dy55b3R1Lm5ldC9pLzY3ZjRmMGY2NDcwNzMuanBnXCIsXHJcbiAgICAgIFwiL2ltZy8xMi5qcGdcIixcclxuICAgICAgXCIvaW1nLzEzLmpwZ1wiLFxyXG4gICAgICBcIi9pbWcvMS5qcGdcIixcclxuICAgICAgXCIvaW1nLzIuanBnXCIsXHJcbiAgICAgIFwiL2ltZy8zLmpwZ1wiLFxyXG4gICAgICBcIi9pbWcvNC5qcGdcIixcclxuICAgICAgXCIvaW1nLzUuanBnXCIsXHJcbiAgICAgIFwiL2ltZy83LmpwZ1wiLFxyXG4gICAgICBcIi9pbWcvOC5qcGdcIixcclxuICAgICAgXCIvaW1nLzkuanBnXCIsXHJcbiAgICAgIFwiL2ltZy8xMC5qcGdcIixcclxuICAgICAgXCIvaW1nLzExLmpwZ1wiXHJcbiAgICBdLFxyXG4gICAgZGVzY1N0eWxlOiBcInR5cGVzXCIsXHJcbiAgICBtYXNrQmc6IFwicmdiYSgwLCAwLCAwLCAwLjQpXCIsIC8vIEJhbm5lciBcdTU5MjdcdTU2RkVcdTkwNkVcdTdGNjlcdTk4OUNcdTgyNzJcdUZGMENcdTU5ODJcdTY3OUNcdTRFM0FcdTY1NzBcdTVCNTdcdUZGMENcdTUyMTlcdTY2MkYgcmdiYSgwLCAwLCAwLCAke21hc2tCZ30pXHVGRjBDXHU1OTgyXHU2NzlDXHU0RTNBXHU1QjU3XHU3QjI2XHU0RTMyXHVGRjBDXHU1MjE5XHU0RjVDXHU0RTNBXHU4MENDXHU2NjZGXHU4MjcyXHJcbiAgICB0ZXh0Q29sb3I6IFwiI2ZmZmZmZlwiLCAvLyBCYW5uZXIgXHU1QjU3XHU0RjUzXHU5ODlDXHU4MjcyXHVGRjBDYmdTdHlsZSBcdTRFM0EgZGVmYXVsdCBcdTY1RjZcdTRFM0EgJyMwMDAwMDAnXHVGRjBDXHU1MTc2XHU0RUQ2XHU0RTNBICcjZmZmZmZmJ1xyXG4gICAgdGl0bGVGb250U2l6ZTogXCIzLjJyZW1cIiwgLy8gXHU2ODA3XHU5ODk4XHU1QjU3XHU0RjUzXHU1OTI3XHU1QzBGXHJcbiAgICBkZXNjRm9udFNpemU6IFwiMS40cmVtXCIsIC8vIFx1NjNDRlx1OEZGMFx1NUI1N1x1NEY1M1x1NTkyN1x1NUMwRlxyXG4gICAgLy8gZGVzY1N0eWxlOiBcInR5cGVzXCIsIC8vIFx1NjNDRlx1OEZGMFx1NEZFMVx1NjA2Rlx1OThDRVx1NjgzQ1x1RkYxQWRlZmF1bHQgXHU0RTNBXHU3RUFGXHU2NTg3XHU1QjU3XHU2RTMyXHU2N0QzXHU5OENFXHU2ODNDXHVGRjA4XHU1OTgyXHU2NzlDIGRlc2NyaXB0aW9uIFx1NEUzQVx1NjU3MFx1N0VDNFx1RkYwQ1x1NTIxOVx1NTNENlx1N0IyQ1x1NEUwMFx1NEUyQVx1RkYwOVx1RkYwQ3R5cGVzIFx1NEUzQVx1NjU4N1x1NUI1N1x1NjI1M1x1NTM3MFx1OThDRVx1NjgzQ1x1RkYwQ3N3aXRjaCBcdTRFM0FcdTY1ODdcdTVCNTdcdTUyMDdcdTYzNjJcdTk4Q0VcdTY4M0NcclxuICAgIGRlc2NyaXB0aW9uOiBbXHJcbiAgICAgIC8vbG9uZWx5XHJcbiAgICAgIFwiXHU1MjFEXHU5NUZCXHU0RTBEXHU3N0U1XHU2NkYyXHU0RTJEXHU2MTBGXHVGRjBDXHU1MThEXHU1NDJDXHU1REYyXHU2NjJGXHU2NkYyXHU0RTJEXHU0RUJBXCIsXHJcblxyXG4gICAgICAvLyBcdTUzOUZcdTY3MDlcdTUxODVcdTVCQjlcdTRGRERcdTc1NTlcclxuICAgICAgXCJcdTRFMDdcdTgyMkNcdTUyQUFcdTUyOUJcdTUzRUFcdTRFM0FcdTUxRkFcdTRFQkFcdTU5MzRcdTU3MzBcdUZGMENcdTRGNEVcdTU5MzRcdTVGMkZcdTgxNzBcdTUzRUFcdTRFM0FcdTcyMkNcdTc2ODRcdTY2RjRcdTlBRDhcIixcclxuXHJcbiAgICAgIC8vIFx1NTJBOFx1NkYyQlx1N0VDRlx1NTE3OFx1OEJFRFx1NUY1NVxyXG4gICAgICBcIlx1OTFDRFx1ODk4MVx1NzY4NFx1NEUwRFx1NjYyRlx1NEY2MFx1OTU3Rlx1NUY5N1x1NkYwMlx1NEVBRVx1NEUwRVx1NTQyNlx1RkYwQ1x1ODAwQ1x1NjYyRlx1NEY2MFx1NzY4NFx1NUZDM1x1NzA3NVx1NjYyRlx1NTQyNlx1N0Y4RVx1NEUzRCBcdTIwMTRcdTIwMTQgXHU1MzQzXHU0RTBFXHU1MzQzXHU1QkZCXCIsXHJcbiAgICAgIFwiXHU2MjExXHU0RUVDXHU0RUYwXHU2NzFCXHU3NzQwXHU1NDBDXHU0RTAwXHU3MjQ3XHU1OTI5XHU3QTdBXHVGRjBDXHU1Mzc0XHU3NzBCXHU3NzQwXHU0RTBEXHU1NDBDXHU3Njg0XHU1NzMwXHU2NUI5IFx1MjAxNFx1MjAxNCBcdTc5RDJcdTkwMUZcdTRFOTRcdTUzOThcdTdDNzNcIixcclxuICAgICAgXCJcdTZCRDRcdTgxRUFcdTVERjFcdTc2ODRcdTc1MUZcdTU0N0RcdTY2RjRcdTkxQ0RcdTg5ODFcdTc2ODRcdTRFMUNcdTg5N0ZcdTZDMzhcdThGRENcdTVCNThcdTU3MjhcdTc3NDAgXHUyMDE0XHUyMDE0IGZhdGVcIixcclxuICAgICAgXCJcdTZCNjNcdTU2RTBcdTRFM0FcdTc1MUZcdTY3NjVcdTRFQzBcdTRFNDhcdTkwRkRcdTZDQTFcdTY3MDlcdUZGMENcdTU2RTBcdTZCNjRcdTYyMTFcdTRFRUNcdTgwRkRcdTYyRTVcdTY3MDlcdTRFMDBcdTUyMDcgXHUyMDE0XHUyMDE0IFx1NkUzOFx1NjIwRlx1NEVCQVx1NzUxRlwiLFxyXG5cclxuICAgICAgLy8gXHU3MjMxXHU2MEM1XHU2MTFGXHU2MDlGXHJcbiAgICAgIFwiXHU1NTlDXHU2QjIyXHU0RTAwXHU0RTJBXHU0RUJBXHU1QzMxXHU2NjJGXHU1NzI4XHU1QkY5XHU2NUI5XHU3Njg0XHU0RTAwXHU1MjA3XHU5MEZEXHU1NDA4XHU3NDA2XHU1MzE2XCIsXHJcbiAgICAgIFwiXHU3MjMxXHVGRjBDXHU1MTc2XHU1QjlFXHU1Rjg4XHU3QjgwXHU1MzU1XHVGRjBDXHU1NkYwXHU5NkJFXHU3Njg0XHU2NjJGXHU2M0E1XHU1M0Q3XHU4RkQ5XHU0RUZEXHU3QjgwXHU1MzU1XCIsXHJcbiAgICAgIFwiXHU2NzAwXHU1OTdEXHU3Njg0XHU3MjMxXHU2MEM1XHU2NjJGXHU0RTkyXHU3NkY4XHU2MjEwXHU1QzMxXHVGRjBDXHU4MDBDXHU0RTBEXHU2NjJGXHU0RTkyXHU3NkY4XHU3OTgxXHU5NTIyXCIsXHJcbiAgICAgIFwiXHU3RjE4XHU1MjA2XHU1QzMxXHU2NjJGXHVGRjBDXHU5MDQ3XHU4OUMxXHU0RTg2XHU1M0VGXHU0RUU1XHU4QkE5XHU0RjYwXHU3QjExXHU3Njg0XHU0RUJBXCIsXHJcbiAgICAgIFwiXHU3MjMxXHU2MEM1XHU0RTBEXHU2NjJGXHU1MzYwXHU2NzA5XHVGRjBDXHU4MDBDXHU2NjJGXHU1RjdDXHU2QjY0XHU2MjEwXHU1QzMxXCIsXHJcblxyXG4gICAgICAvLyBcdTRFQkFcdTc1MUZcdTU0RjJcdTc0MDZcclxuICAgICAgXCJcdTc1MUZcdTU0N0RcdTRFMkRcdTY3MDBcdTU2RjBcdTk2QkVcdTc2ODRcdTY1RjZcdTUyM0JcdUZGMENcdTYwNzBcdTY2MkZcdThGNkNcdTY3M0FcdTc2ODRcdTVGMDBcdTU5Q0JcIixcclxuICAgICAgXCJcdTZDQTFcdTY3MDlcdTRFQkFcdTUzRUZcdTRFRTVcdTU2REVcdTUyMzBcdThGQzdcdTUzQkJcdUZGMENcdTRGNDZcdTZCQ0ZcdTRFMkFcdTRFQkFcdTkwRkRcdTUzRUZcdTRFRTVcdTRFQ0VcdTczQjBcdTU3MjhcdTVGMDBcdTU5Q0JcIixcclxuICAgICAgXCJcdTRFMEVcdTUxNzZcdTdCNDlcdTVGODVcdTY3M0FcdTRGMUFcdUZGMENcdTRFMERcdTU5ODJcdTUyMUJcdTkwMjBcdTY3M0FcdTRGMUFcIixcclxuICAgICAgXCJcdTc1MUZcdTZEM0JcdTRFMERcdTRGMUFcdTU2RTBcdTRFM0FcdTRGNjBcdTc2ODRcdTYxRTZcdTVGMzFcdTgwMENcdTUwNUNcdTZCNjJcdTgxMUFcdTZCNjVcIixcclxuICAgICAgXCJcdTYyMTBcdTk1N0ZcdTc2ODRcdThGQzdcdTdBMEJcdTYwM0JcdTY2MkZcdTVCNjRcdTcyRUNcdTc2ODRcdUZGMENcdTRGNDZcdTdFRDNcdTY3OUNcdTY2MkZcdTdGOEVcdTU5N0RcdTc2ODRcIixcclxuXHJcbiAgICAgIC8vIFx1NjZGNFx1NTkxQVx1NTJBOFx1NkYyQlx1NTNGMFx1OEJDRFxyXG4gICAgICBcIlx1NTM3M1x1NEY3Rlx1NjYyRlx1NTcyOFx1NjcwMFx1NkRGMVx1NzY4NFx1OUVEMVx1NjY5N1x1OTFDQ1x1RkYwQ1x1NEU1Rlx1ODk4MVx1NEZERFx1NjMwMVx1NUUwQ1x1NjcxQiBcdTIwMTRcdTIwMTQgXHU4RkRCXHU1MUZCXHU3Njg0XHU1REU4XHU0RUJBXCIsXHJcbiAgICAgIFwiXHU0RTBEXHU4OTgxXHU0RTNBXHU0RTg2XHU1MjJCXHU0RUJBXHU4MDBDXHU2RDNCXHVGRjBDXHU4OTgxXHU0RTNBXHU0RTg2XHU4MUVBXHU1REYxXHU4MDBDXHU2RDNCIFx1MjAxNFx1MjAxNCBcdTcwNkJcdTVGNzFcdTVGQ0RcdTgwMDVcIixcclxuICAgICAgXCJcdTZCRDRcdThENzdcdTYwQjJcdTRGMjRcdUZGMENcdTY1RTBcdTZDRDVcdTUyMDZcdTRFQUJcdTVGRUJcdTRFNTBcdTYyNERcdTY2MkZcdTc3MUZcdTc2ODRcdTVCQzJcdTVCREUgXHUyMDE0XHUyMDE0IFx1NTZEQlx1NjcwOFx1NjYyRlx1NEY2MFx1NzY4NFx1OEMwRVx1OEEwMFwiLFxyXG4gICAgICBcIlx1NjhBNlx1NjBGM1x1NjYyRlx1NEUwRFx1NEYxQVx1N0VEM1x1Njc1Rlx1NzY4NFx1RkYwQ1x1NTNFQVx1ODk4MVx1OEZEOFx1NkQzQlx1Nzc0MFx1NUMzMVx1ODk4MVx1N0VFN1x1N0VFRFx1OEZGRFx1OTAxMCBcdTIwMTRcdTIwMTQgXHU2RDc3XHU4RDNDXHU3MzhCXCIsXHJcblxyXG4gICAgICAvLyAuLi4gXHU3RUU3XHU3RUVEXHU2REZCXHU1MkEwXHU2NkY0XHU1OTFBXHU1M0U1XHU1QjUwXHU3NkY0XHU1MjMwMTAwXHU0RTJBXHJcbiAgICAgIFwiXHU3NTFGXHU1NDdEXHU3Njg0XHU2MTBGXHU0RTQ5XHU0RTBEXHU1NzI4XHU0RThFXHU2RDNCXHU0RTg2XHU1OTFBXHU0RTQ1XHVGRjBDXHU4MDBDXHU1NzI4XHU0RThFXHU3RUNGXHU1Mzg2XHU0RTg2XHU0RUMwXHU0RTQ4XCIsXHJcbiAgICAgIFwiXHU2NzAwXHU3M0NEXHU4RDM1XHU3Njg0XHU0RTBEXHU2NjJGXHU2MkU1XHU2NzA5XHU3Njg0XHU1NkRFXHU1RkM2XHVGRjBDXHU4MDBDXHU2NjJGXHU2QjYzXHU1NzI4XHU1MjFCXHU5MDIwXHU3Njg0XHU1NkRFXHU1RkM2XCIsXHJcbiAgICAgIFwiXHU0RTBEXHU4OTgxXHU1NkUwXHU0RTNBXHU4RDcwXHU1Rjk3XHU1OTJBXHU4RkRDXHVGRjBDXHU4MDBDXHU1RkQ4XHU4QkIwXHU0RTg2XHU0RTNBXHU0RUMwXHU0RTQ4XHU1MUZBXHU1M0QxXCIsXHJcbiAgICAgIFwiXHU2NzA5XHU2NUY2XHU1MDE5XHVGRjBDXHU1NzVBXHU2MzAxXHU0RTg2XHU0RjYwXHU2NzAwXHU0RTBEXHU2MEYzXHU1RTcyXHU3Njg0XHU0RThCXHU2MEM1XHVGRjBDXHU1Mzc0XHU3QjQ5XHU2NzY1XHU0RTg2XHU0RjYwXHU2NzAwXHU2MEYzXHU4OTgxXHU3Njg0XHU3RUQzXHU2NzlDXCIsXHJcbiAgICAgIFwiXHU0RTBFXHU1MTc2XHU3NTI4XHU2Q0VBXHU2QzM0XHU2MDk0XHU2MDY4XHU2NjI4XHU1OTI5XHVGRjBDXHU0RTBEXHU1OTgyXHU3NTI4XHU2QzU3XHU2QzM0XHU2MkZDXHU2NDBGXHU0RUNBXHU1OTI5XCIsXHJcblxyXG4gICAgICAvLyBcdTZERkJcdTUyQTBcdTY2RjRcdTU5MUFcdTZCNjNcdTgwRkRcdTkxQ0ZcdTUzRTVcdTVCNTAuLi5cclxuICAgICAgXCJcdTZCQ0ZcdTRFMkFcdTRFQkFcdTkwRkRcdTY2MkZcdTgxRUFcdTVERjFcdTRFQkFcdTc1MUZcdTc2ODRcdTRFM0JcdTg5RDJcIixcclxuICAgICAgXCJcdTRFMERcdTg5ODFcdTg4QUJcdTU0NjhcdTU2RjRcdTc2ODRcdTU4RjBcdTk3RjNcdTVFNzJcdTYyNzBcdUZGMENcdTU3NUFcdTYzMDFcdTgxRUFcdTVERjFcdThCQTRcdTVCOUFcdTc2ODRcdTkwNTNcdThERUZcIixcclxuICAgICAgXCJcdTYyMTBcdTUyOUZcdTRFMERcdTY2MkZcdTdFQzhcdTcwQjlcdUZGMENcdTU5MzFcdThEMjVcdTRFNUZcdTRFMERcdTY2MkZcdTdFQzhcdTdFRDNcIixcclxuICAgICAgXCJcdTY1RjZcdTk1RjRcdTRGMUFcdThCQzFcdTY2MEVcdTRFMDBcdTUyMDdcdUZGMENcdTgwMTBcdTVGQzNcdTY2MkZcdTY3MDBcdTU5N0RcdTc2ODRcdTdCNTRcdTY4NDhcIixcclxuICAgICAgXCJcdTZEM0JcdTU3MjhcdTVGNTNcdTRFMEJcdUZGMENcdTczQ0RcdTYwRENcdTczQjBcdTU3MjhcdUZGMENcdTY3MUZcdTVGODVcdTY3MkFcdTY3NjVcIixcclxuICAgIF0sIC8vIFx1NjNDRlx1OEZGMFx1NEZFMVx1NjA2RlxyXG4gICAgc3dpdGNoVGltZTogNDAwMCwgLy8gXHU2M0NGXHU4RkYwXHU0RkUxXHU2MDZGXHU1MjA3XHU2MzYyXHU5NUY0XHU5Njk0XHU2NUY2XHU5NUY0XHVGRjBDXHU1MzU1XHU0RjREXHVGRjFBXHU2QkVCXHU3OUQyXHUzMDAyZGVzY1N0eWxlIFx1NEUzQSBzd2l0Y2ggXHU2NUY2XHU3NTFGXHU2NTQ4XHJcbiAgICBzd2l0Y2hTaHVmZmxlOiBmYWxzZSwgLy8gXHU2M0NGXHU4RkYwXHU0RkUxXHU2MDZGXHU2NjJGXHU1NDI2XHU5NjhGXHU2NzNBXHU1MjA3XHU2MzYyXHVGRjBDXHU0RTNBIGZhbHNlIFx1NjVGNlx1NjMwOVx1OTg3QVx1NUU4Rlx1NTIwN1x1NjM2Mlx1MzAwMmRlc2NTdHlsZSBcdTRFM0Egc3dpdGNoIFx1NjVGNlx1NzUxRlx1NjU0OFxyXG4gICAgdHlwZXNJblRpbWU6IDIwMCwgLy8gXHU4RjkzXHU1MUZBXHU0RTAwXHU0RTJBXHU2NTg3XHU1QjU3XHU3Njg0XHU2NUY2XHU5NUY0XHVGRjBDXHU1MzU1XHU0RjREXHVGRjFBXHU2QkVCXHU3OUQyXHUzMDAyZGVzY1N0eWxlIFx1NEUzQSB0eXBlcyBcdTY1RjZcdTc1MUZcdTY1NDhcclxuICAgIHR5cGVzT3V0VGltZTogMTAwLCAvLyBcdTUyMjBcdTk2NjRcdTRFMDBcdTRFMkFcdTY1ODdcdTVCNTdcdTc2ODRcdTY1RjZcdTk1RjRcdUZGMENcdTUzNTVcdTRGNERcdUZGMUFcdTZCRUJcdTc5RDJcdTMwMDJkZXNjU3R5bGUgXHU0RTNBIHR5cGVzIFx1NjVGNlx1NzUxRlx1NjU0OFxyXG4gICAgdHlwZXNOZXh0VGltZTogODAwLCAvLyBcdTYyNTNcdTVCNTdcdTRFMEVcdTUyMjBcdTVCNTdcdTc2ODRcdTk1RjRcdTk2OTRcdTY1RjZcdTk1RjRcdUZGMENcdTUzNTVcdTRGNERcdUZGMUFcdTZCRUJcdTc5RDJcdTMwMDJkZXNjU3R5bGUgXHU0RTNBIHR5cGVzIFx1NjVGNlx1NzUxRlx1NjU0OFxyXG4gICAgdHlwZXNTaHVmZmxlOiBmYWxzZSwgLy8gXHU2M0NGXHU4RkYwXHU0RkUxXHU2MDZGXHU2NjJGXHU1NDI2XHU5NjhGXHU2NzNBXHU2MjUzXHU1QjU3XHVGRjBDXHU0RTNBIGZhbHNlIFx1NjVGNlx1NjMwOVx1OTg3QVx1NUU4Rlx1NjI1M1x1NUI1N1x1RkYwQ2Rlc2NTdHlsZSBcdTRFM0EgdHlwZXMgXHU2NUY2XHU3NTFGXHU2NTQ4XHJcbiAgfSxcclxuICAvLyBib2R5QmdJbWc6IHtcclxuICAvLyAgIGltZ1NyYzogW1wiL2ltZy9iZzEuanBnXCIsIFwiL2ltZy9iZzIucG5nXCJdLFxyXG4gIC8vICAgYmFubmVyU3R5bGU6IFwiZnVsbFwiLFxyXG4gIC8vIH0sXHJcblxyXG4gIC8vIFx1OTk5Nlx1OTg3NVx1OTg3Nlx1OTBFOFx1NjMwOSBGMTEgXHU1RjAwXHU1NDJGXHU1OEMxXHU3RUI4XHU2QTIxXHU1RjBGXHJcbiAgd2FsbHBhcGVyOiB7XHJcbiAgICBlbmFibGVkOiB0cnVlLFxyXG4gIH0sXHJcblxyXG4gIHBvc3Q6IHtcclxuICAgIGNvdmVySW1nTW9kZTogXCJmdWxsXCIsIC8vIFx1NUMwMVx1OTc2Mlx1NTkyN1x1NTZGRVxyXG4gIH0sXHJcblxyXG4gIC8vIFx1NjU4N1x1N0FFMFxyXG4gIGFydGljbGU6IHtcclxuICAgIHNob3dJY29uOiB0cnVlLCAvLyBcdTRGNUNcdTgwMDVcdTMwMDFcdTY1RTVcdTY3MUZcdTMwMDFcdTUyMDZcdTdDN0JcdTMwMDFcdTY4MDdcdTdCN0VcdTMwMDFcdTVCNTdcdTY1NzBcdTMwMDFcdTk2MDVcdThCRkJcdTY1RjZcdTk1N0ZcdTMwMDFcdTZENEZcdTg5QzhcdTkxQ0ZcdTdCNDlcdTY1ODdcdTdBRTBcdTRGRTFcdTYwNkZcdTc2ODRcdTU2RkVcdTY4MDdcdTY2MkZcdTU0MjZcdTY2M0VcdTc5M0FcclxuICAgIC8vIGRhdGVGb3JtYXQ6IFwieXl5eS1NTS1kZCBoaDptbTpzc1wiLCAvLyBcdTY1ODdcdTdBRTBcdTY1RTVcdTY3MUZcdTY4M0NcdTVGMEZcdUZGMENcdTk5OTZcdTk4NzVcdTU0OENcdTY1ODdcdTdBRTBcdTk4NzVcdTg5RTNcdTY3OTBcdTY1RTVcdTY3MUZcdTY1RjZcdTRGN0ZcdTc1MjhcclxuICAgIGRhdGVGb3JtYXQ6IFwieXl5eS1NTS1kZFwiLCAvLyBcdTY1ODdcdTdBRTBcdTY1RTVcdTY3MUZcdTY4M0NcdTVGMEZcdUZGMENcdTk5OTZcdTk4NzVcdTU0OENcdTY1ODdcdTdBRTBcdTk4NzVcdTg5RTNcdTY3OTBcdTY1RTVcdTY3MUZcdTY1RjZcdTRGN0ZcdTc1MjhcclxuICAgIHNob3dJbmZvOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTVDNTVcdTc5M0FcdTRGNUNcdTgwMDVcdTMwMDFcdTY1RTVcdTY3MUZcdTMwMDFcdTUyMDZcdTdDN0JcdTMwMDFcdTY4MDdcdTdCN0VcdTMwMDFcdTVCNTdcdTY1NzBcdTMwMDFcdTk2MDVcdThCRkJcdTY1RjZcdTk1N0ZcdTMwMDFcdTZENEZcdTg5QzhcdTkxQ0ZcdTdCNDlcdTY1ODdcdTdBRTBcdTRGRTFcdTYwNkZcdUZGMENcdTUyMDZcdTUyMkJcdTRGNUNcdTc1MjhcdTRFOEVcdTk5OTZcdTk4NzVcdTU0OENcdTY1ODdcdTdBRTBcdTk4NzVcclxuICAgIHNob3dBdXRob3I6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NUM1NVx1NzkzQVx1NEY1Q1x1ODAwNVxyXG4gICAgc2hvd0NyZWF0ZURhdGU6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NUM1NVx1NzkzQVx1NTIxQlx1NUVGQVx1NjVFNVx1NjcxRlxyXG4gICAgc2hvd1VwZGF0ZURhdGU6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NUM1NVx1NzkzQVx1NjZGNFx1NjVCMFx1NjVFNVx1NjcxRlx1RkYwQ1x1NjYyRlx1NTQyNlx1NUM1NVx1NzkzQVx1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNFx1RkYwQ1x1NEVDNVx1NTcyOFx1NjU4N1x1N0FFMFx1OTg3NVx1NjYzRVx1NzkzQVxyXG4gICAgc2hvd0NhdGVnb3J5OiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTVDNTVcdTc5M0FcdTUyMDZcdTdDN0JcclxuICAgIHNob3dUYWc6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NUM1NVx1NzkzQVx1NjgwN1x1N0I3RVxyXG4gICAgXHJcbiAgICB0b3BUaXA6IGZyb250bWF0dGVyID0+IHtcclxuICAgICAgY29uc3QgdGlwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgIHRpdGxlOiBcIlx1NkNFOFx1NjEwRlwiLFxyXG4gICAgICAgIHRleHQ6IFwiXHU2NTg3XHU3QUUwXHU1M0QxXHU1RTAzXHU4RjgzXHU2NUU5XHVGRjBDXHU1MTg1XHU1QkI5XHU1M0VGXHU4MEZEXHU4RkM3XHU2NUY2XHVGRjBDXHU5NjA1XHU4QkZCXHU2Q0U4XHU2MTBGXHU3NTA0XHU1MjJCXHUzMDAyXCIsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBmcm9udG1hdHRlci5sb25nIFx1NEUzQSB0cnVlXHVGRjBDXHU1MjE5XHU2REZCXHU1MkEwXHU2M0QwXHU3OTNBXHJcbiAgICAgIGlmIChmcm9udG1hdHRlci5sb25nKSByZXR1cm4gdGlwO1xyXG5cclxuICAgICAgLy8gZnJvbnRtYXR0ZXIuZGF0ZSBcdTU5MjdcdTRFOEVcdTRFMjRcdTVFNzRcdUZGMENcdTUyMTlcdTZERkJcdTUyQTBcdTYzRDBcdTc5M0FcclxuICAgICAgY29uc3QgbG9uZ1RpbWUgPSAyNCAqIDMwICogMjQgKiA2MCAqIDYwICogMTAwMDtcclxuICAgICAgaWYgKGZyb250bWF0dGVyLmRhdGUgJiYgRGF0ZS5ub3coKSAtIG5ldyBEYXRlKGZyb250bWF0dGVyLmRhdGUpLmdldFRpbWUoKSA+IGxvbmdUaW1lKSByZXR1cm4gdGlwO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIC8vIFx1OEJCRVx1N0Y2RVx1NEUzQlx1OTg5OFx1NUMzQVx1NUJGOFxyXG4gIC8vIHRoZW1lU2V0dGluZzoge1xyXG4gIC8vICAgdGhlbWVTaXplOiBcImxhcmdlXCIsXHJcbiAgLy8gfSxcclxuICBcclxuICAvLyBcdTUzQ0JcdTk0RkVcdTRGRTFcdTYwNkZcclxuICBmcmllbmRMaW5rOiB7XHJcbiAgICBsaXN0OiBbXHJcbiAgICAgIHsgYXZhdGFyOiBcIi9pbWcvdGVlay1sb2dvLWxhcmdlLnBuZ1wiLCBuYW1lOiBcIllvdW5nIEtidCBibG9nXCIsIGRlc2M6IFwiVGVla2VyXHU0RjVDXHU4MDA1XCIsIGxpbms6IFwiaHR0cHM6Ly9ub3Rlcy55b3VuZ2tidC5jbi9cIiB9LFxyXG4gICAgXSxcclxuICB9LFxyXG5cclxuXHJcblxyXG5cclxuICBmb290ZXJJbmZvOiB7XHJcbiAgICAvLyB0b3BNZXNzYWdlOiBbXCJcdTUyMURcdTk1RkJcdTRFMERcdTc3RTVcdTY2RjJcdTRFMkRcdTYxMEZcdUZGMENcdTUxOERcdTU0MkNcdTVERjJcdTY2MkZcdTY2RjJcdTRFMkRcdTRFQkFcIl0sXHJcbiAgICBib3R0b21NZXNzYWdlOiBbXCJcdTUyMURcdTk1RkJcdTRFMERcdTc3RTVcdTY2RjJcdTRFMkRcdTYxMEZcdUZGMENcdTUxOERcdTU0MkNcdTVERjJcdTY2MkZcdTY2RjJcdTRFMkRcdTRFQkFcIl0sXHJcblxyXG4gICAgLy8gXHU0RTNCXHU5ODk4XHU3MjQ4XHU2NzQzXHU5MTREXHU3RjZFXHJcbiAgICB0aGVtZToge1xyXG4gICAgICBzaG93OiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2NjNFXHU3OTNBXHU0RTNCXHU5ODk4XHU3MjQ4XHU2NzQzXHVGRjBDXHU1RUZBXHU4QkFFXHU2NjNFXHU3OTNBXHJcbiAgICAgIC8vIG5hbWU6IFwiVGhlbWUgQnkgdGVla0AxLjAuMC1hbHBoYS40LTIwMjUuMy4zMVwiLCAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTU0MERcdTc5RjBcclxuICAgICAgLy8gbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vS2VsZS1CaW5ndGFuZy92aXRlcHJlc3MtdGhlbWUtdGVla1wiLCAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTk0RkVcdTYzQTVcclxuICAgIH0sXHJcblxyXG4gICAgLy8gXHU1MzVBXHU1QkEyXHU3MjQ4XHU2NzQzXHU5MTREXHU3RjZFICAgIFxyXG4gICAgY29weXJpZ2h0OiB7XHJcbiAgICAgIHNob3c6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1NjYzRVx1NzkzQVx1NTM1QVx1NUJBMlx1NzI0OFx1Njc0M1xyXG4gICAgICBjcmVhdGVZZWFyOiAyMDI0LFxyXG4gICAgICBzdWZmaXg6IFwiXHU2NkFFXHU1MUFDXHU2RDQ1XHU1OTBGXCIsXHJcbiAgICB9LFxyXG4gICAgaWNwUmVjb3JkOiB7XHJcbiAgICAgIG5hbWU6IFwiXHU2ODQySUNQXHU1OTA3MjAyNDAxNTY5OTRcdTUzRjdcIixcclxuICAgICAgbGluazogXCJodHRwOi8vYmVpYW4ubWlpdC5nb3YuY24vXCIsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIFx1N0Y1MVx1N0VEQ1x1NUI4OVx1NTE2OFx1NTkwN1x1Njg0OFx1NEZFMVx1NjA2Rlx1OTE0RFx1N0Y2RVxyXG4gICAgLy8gc2VjdXJpdHlSZWNvcmQ6IHtcclxuICAgIC8vICAgbmFtZTogXCJcdTc1MThcdTUxNkNcdTdGNTFcdTVCODlcdTU5MDc2MjEwMjcwMjAwMDIxMVx1NTNGN1wiLFxyXG4gICAgLy8gICBsaW5rOiBcImh0dHBzOi8vYmVpYW4ubXBzLmdvdi5jbi9cIixcclxuICAgIC8vIH0sICAgIFxyXG5cclxuXHJcbiAgICBjdXN0b21IdG1sOiBgPHA+XHU1QzBGXHU3ODM0XHU3QUQ5XHU1REYyXHU4RkQwXHU4ODRDXHU0RTg2IDxzcGFuIGlkPVwiZm9vdGVyLXJ1bnRpbWVcIj48L3NwYW4+PC9wPmAsXHJcbiAgfSxcclxuXHJcblxyXG5cclxuICAvLyBcdTc5M0VcdTRFQTRcdTk0RkVcdTYzQTVcclxuICBzb2NpYWw6IFtcclxuICAgIHtcclxuICAgICAgaWNvbjogXCJpY29uLWdpdGh1YlwiLFxyXG4gICAgICBpY29uVHlwZTogXCJpY29uZm9udFwiLFxyXG4gICAgICBuYW1lOiBcIkdpdEh1YlwiLFxyXG4gICAgICBsaW5rOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9zeGRuYm5iXCIsXHJcbiAgICB9LFxyXG4gICAgLy8ge1xyXG4gICAgLy8gICBpY29uOiBcImljb24tZ2l0ZWUyXCIsXHJcbiAgICAvLyAgIGljb25UeXBlOiBcImljb25mb250XCIsXHJcbiAgICAvLyAgIG5hbWU6IFwiR2l0ZWVcIixcclxuICAgIC8vICAgbGluazogXCJodHRwczovL2dpdGVlLmNvbS9vbmx5b25leGwvXCIsXHJcbiAgICAvLyB9LFxyXG4gICAge1xyXG4gICAgICBpY29uOiBcImljb24tcXFcIixcclxuICAgICAgaWNvblR5cGU6IFwiaWNvbmZvbnRcIixcclxuICAgICAgbmFtZTogXCJRUVwiLFxyXG4gICAgICBsaW5rOiBcIi9pbWcvcXEucG5nXCIsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpY29uOiBcImljb24td2VpeGluXCIsXHJcbiAgICAgIGljb25UeXBlOiBcImljb25mb250XCIsXHJcbiAgICAgIG5hbWU6IFwiXHU4MDU0XHU3Q0ZCXHU2MjExXCIsXHJcbiAgICAgIGxpbms6IFwiL2ltZy93ZWl4aW4ucG5nXCIsXHJcbiAgICB9LFxyXG4gIF0sXHJcblxyXG5cclxuICBjb21tZW50OiB7XHJcbiAgICAvLyBwcm92aWRlcjogXCJnaXNjdXNcIixcclxuICAgIHByb3ZpZGVyOiBcInR3aWtvb1wiLFxyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICAvLyB0d2lrb28gXHU5MTREXHU3RjZFXHVGRjBDXHU1Qjk4XHU3RjUxXHVGRjFBaHR0cHM6Ly90d2lrb28uanMub3JnL1xyXG4gICAgICBlbnZJZDogXCJodHRwczovL3N4ZG5ibmIuZ2l0aHViLmlvL1wiLFxyXG4gICAgICBsaW5rOiBcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vdHdpa29vQDEuNi40MS9kaXN0L3R3aWtvby5taW4uanNcIixcclxuXHJcbiAgICAgIC8vIHdhbGluZSBcdTkxNERcdTdGNkVcdUZGMENcdTVCOThcdTdGNTFcdUZGMUFodHRwczovL3dhbGluZS5qcy5vcmcvXHJcbiAgICAgIC8vIHNlcnZlclVSTDogXCJodHRwczovL3RrLndhbGluZS55b3VuZ2tidC5jbi9cIixcclxuICAgICAgLy8ganNMaW5rOiBcImh0dHBzOi8vdW5wa2cuY29tL0B3YWxpbmUvY2xpZW50QHYzL2Rpc3Qvd2FsaW5lLmpzXCIsXHJcbiAgICAgIC8vIGNzc0xpbms6IFwiaHR0cHM6Ly91bnBrZy5jb20vQHdhbGluZS9jbGllbnRAdjMvZGlzdC93YWxpbmUuY3NzXCIsXHJcblxyXG4gICAgICAvLyBnaXNjdXMgXHU5MTREXHU3RjZFXHVGRjBDXHU1Qjk4XHU3RjUxXHVGRjFBaHR0cHM6Ly9naXNjdXMuYXBwL3poLUNOXHJcbiAgICAgIC8vIHJlcG86IFwiS2VsZS1CaW5ndGFuZy92aXRlcHJlc3MtdGhlbWUta3RcIixcclxuICAgICAgLy8gcmVwb0lkOiBcIlJfa2dET05wVmZCQVwiLFxyXG4gICAgICAvLyBjYXRlZ29yeTogXCJBbm5vdW5jZW1lbnRzXCIsXHJcbiAgICAgIC8vIGNhdGVnb3J5SWQ6IFwiRElDX2t3RE9OcFZmQk00Q20zdjlcIixcclxuXHJcbiAgICAgIC8vIGFydGFsayBcdTkxNERcdTdGNkVcdUZGMENcdTVCOThcdTdGNTFcdUZGMUFodHRwczovL2FydGFsay5qcy5vcmcvXHJcbiAgICAgIC8vIHNlcnZlcjogXCJcIixcclxuICAgICAgLy8gc2l0ZTogXCJcIixcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcblxyXG4gIG5vdGljZToge1xyXG4gICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgIHBvc2l0aW9uOiBcImNlbnRlclwiLFxyXG4gIH0sXHJcblxyXG4gIHZpdGVQbHVnaW5zOiB7XHJcbiAgICBhdXRvRnJvbnRtYXR0ZXI6IHRydWUsIC8vXHU2REZCXHU1MkEwXHU4MUVBXHU1MkE4XHU2ODNDXHU1RjBGZm9ybWF0dGVyXHU2M0QyXHU0RUY2XHJcbiAgICBzaWRlYmFyT3B0aW9uOiB7XHJcbiAgICAgIC8vIGluaXRJdGVtczogZmFsc2UsIC8vXHU4RkQ5XHU2NzYxXHU1NDdEXHU0RUU0XHU2Q0U4XHU5MUNBXHU1NDBFXHVGRjBDXHU2MjREXHU0RjFBXHU4QkE5XHU2NTg3XHU2ODYzXHU1NDhDXHU3NkVFXHU1RjU1XHU3Njg0XHU2ODM3XHU1RjBGXHU0RkREXHU2MzAxXHU0RTAwXHU4MUY0XHJcbiAgICAgIGNvbGxhcHNlZDogdHJ1ZSwgLy9cdTYyNTNcdTVGMDBcdTRGQTdcdThGQjlcdTY4MEZcdTgxRUFcdTUyQThcdTY1MzZcdTdGMjlcdTUyOUZcdTgwRkRcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcblxyXG4gIG1hcmtkb3duOiB7XHJcbiAgICBjb25maWc6IG1kID0+IHtcclxuICAgICAgbWQudXNlKHRpbWVsaW5lKTtcclxuICAgICAgbWQudXNlKGdyb3VwSWNvbk1kUGx1Z2luKTtcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG4vLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgLy8gaWdub3JlRGVhZExpbmtzOiB0cnVlLFxyXG4gIGV4dGVuZHM6IHRrQ29uZmlnLFxyXG4gIGJhc2U6IFwiL1wiLFxyXG4gIHRpdGxlOiBcIlx1NjZBRVx1NTFBQ1x1NkQ0NVx1NTkwRlx1MzA2RUJsb2dcIixcclxuICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgY2xlYW5VcmxzOiB0cnVlLFxyXG4gIGxhc3RVcGRhdGVkOiB0cnVlLFxyXG4gIGxhbmc6IFwiemgtQ05cIixcclxuICBoZWFkOiBbXHJcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJhdXRob3JcIiwgY29udGVudDogXCJUaWFua2VcIiB9XSxcclxuICAgIFtcclxuICAgICAgXCJtZXRhXCIsXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBcInZpZXdwb3J0XCIsXHJcbiAgICAgICAgY29udGVudDogXCJ3aWR0aD1kZXZpY2Utd2lkdGgsaW5pdGlhbC1zY2FsZT0xLG1pbmltdW0tc2NhbGU9MS4wLG1heGltdW0tc2NhbGU9MS4wLHVzZXItc2NhbGFibGU9bm9cIixcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgIFwibWV0YVwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgbmFtZTogXCJkZXNjcmlwdGlvblwiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcImtleXdvcmRzXCIsIGRlc2NyaXB0aW9uIH1dLFxyXG4gICAgW1wibGlua1wiLCB7IHJlbDogXCJpY29uXCIsIGhyZWY6IFwiL2Zhdmljb24uaWNvXCIsIHR5cGU6IFwiaW1hZ2UvcG5nXCIgfV0sXHJcbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcInN0eWxlc2hlZXRcIiwgaHJlZjogXCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzI5ODkzMDZfdzMwM2VyYmlwOS5jc3NcIiB9XSwgLy8gXHU5NjNGXHU5MUNDXHU1NzI4XHU3RUJGXHU3N0UyXHU5MUNGXHU1RTkzXHJcblxyXG4gICAgLy9cdTZERkJcdTUyQTBcdTc3MEJcdTY3N0ZcdTVBMThcclxuICAgIFtcclxuICAgICAgXCJzY3JpcHRcIixcclxuICAgICAge1xyXG4gICAgICAgIHNyYzogXCJodHRwczovL2Zhc3RseS5qc2RlbGl2ci5uZXQvZ2gvc3RldmVuam9lemhhbmcvbGl2ZTJkLXdpZGdldEBsYXRlc3QvYXV0b2xvYWQuanNcIixcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICAvL1x1NTE0RFx1OEQzOVx1NzY4NFx1OTdGM1x1NEU1MFx1NjRBRFx1NjUzRVx1NTY2OFxyXG4gICAgW1xyXG4gICAgICBcInNjcmlwdFwiLFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogXCJ0ZXh0L2phdmFzY3JpcHRcIixcclxuICAgICAgICBzcmM6IFwiaHR0cHM6Ly9teWhrdy5jbi9wbGF5ZXIvanMvanF1ZXJ5Lm1pbi5qc1wiLFxyXG4gICAgICB9LFxyXG4gICAgXSwgLy8gXHU2M0QyXHU1MTY1XHU4MUVBXHU1QjlBXHU0RTQ5XHU4MTFBXHU2NzJDXHJcbiAgICBbXHJcbiAgICAgIFwic2NyaXB0XCIsXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiBcInRleHQvamF2YXNjcmlwdFwiLFxyXG4gICAgICAgIGlkOiBcIm15aGtcIixcclxuICAgICAgICBzcmM6IFwiaHR0cHM6Ly9teWhrdy5jbi9hcGkvcGxheWVyLzE3NDI3MTY5MTc5NVwiLFxyXG4gICAgICAgIGtleTogXCIxNzQyNzE2OTE3OTVcIixcclxuICAgICAgICBtOiBcIjFcIixcclxuICAgICAgICBkZWZlcjogXCJkZWZlclwiLCAgLy8gXHU2REZCXHU1MkEwZGVmZXJcdTVDNUVcdTYwMjdcdUZGMENcdTc4NkVcdTRGRERcdTgxMUFcdTY3MkNcdTU3MjhET01cdTUyQTBcdThGN0RcdTVCOENcdTYyMTBcdTU0MEVcdTYyNjdcdTg4NENcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgXSxcclxuICBtYXJrZG93bjoge1xyXG4gICAgLy8gXHU1RjAwXHU1NDJGXHU4ODRDXHU1M0Y3XHJcbiAgICBsaW5lTnVtYmVyczogdHJ1ZSxcclxuICAgIGltYWdlOiB7XHJcbiAgICAgIC8vIFx1OUVEOFx1OEJBNFx1Nzk4MVx1NzUyOFx1RkYxQlx1OEJCRVx1N0Y2RVx1NEUzQSB0cnVlIFx1NTNFRlx1NEUzQVx1NjI0MFx1NjcwOVx1NTZGRVx1NzI0N1x1NTQyRlx1NzUyOFx1NjFEMlx1NTJBMFx1OEY3RFx1MzAwMlxyXG4gICAgICBsYXp5TG9hZGluZzogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICAvLyBcdTY2RjRcdTY1MzlcdTVCQjlcdTU2NjhcdTlFRDhcdThCQTRcdTUwM0NcdTY4MDdcdTk4OThcclxuICAgIGNvbnRhaW5lcjoge1xyXG4gICAgICB0aXBMYWJlbDogXCJcdTYzRDBcdTc5M0FcIixcclxuICAgICAgd2FybmluZ0xhYmVsOiBcIlx1OEI2Nlx1NTQ0QVwiLFxyXG4gICAgICBkYW5nZXJMYWJlbDogXCJcdTUzNzFcdTk2NjlcIixcclxuICAgICAgaW5mb0xhYmVsOiBcIlx1NEZFMVx1NjA2RlwiLFxyXG4gICAgICBkZXRhaWxzTGFiZWw6IFwiXHU4QkU2XHU3RUM2XHU0RkUxXHU2MDZGXCIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgdGhlbWVDb25maWc6IHtcclxuICAgIC8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2UvZGVmYXVsdC10aGVtZS1jb25maWdcclxuICAgIGxvZ286IFwiL2Zhdmljb24uaWNvXCIsXHJcbiAgICBkYXJrTW9kZVN3aXRjaExhYmVsOiBcIlx1NEUzQlx1OTg5OFwiLFxyXG4gICAgc2lkZWJhck1lbnVMYWJlbDogXCJcdTgzRENcdTUzNTVcIixcclxuICAgIHJldHVyblRvVG9wTGFiZWw6IFwiXHU4RkQ0XHU1NkRFXHU5ODc2XHU5MEU4XCIsXHJcbiAgICBsYXN0VXBkYXRlZFRleHQ6IFwiXHU0RTBBXHU2QjIxXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0XCIsXHJcbiAgICBvdXRsaW5lOiB7XHJcbiAgICAgIGxldmVsOiBbMiwgNF0sXHJcbiAgICAgIGxhYmVsOiBcIlx1NjcyQ1x1OTg3NVx1NUJGQ1x1ODIyQVwiLFxyXG4gICAgfSxcclxuICAgIGRvY0Zvb3Rlcjoge1xyXG4gICAgICBwcmV2OiBcIlx1NEUwQVx1NEUwMFx1OTg3NVwiLFxyXG4gICAgICBuZXh0OiBcIlx1NEUwQlx1NEUwMFx1OTg3NVwiLFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgbmF2OiBbXHJcbiAgICAgIHsgdGV4dDogXCJcdUQ4M0NcdURGRTFcdTk5OTZcdTk4NzVcIiwgbGluazogXCIvXCIgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHVEODNEXHVEREMzXHVGRTBGXHU3QjE0XHU4QkIwXCIsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogXCJKYXZhXHU1N0ZBXHU3ODQwXCIsIGxpbms6IFwiL2phdmFcIiB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIkphdmFcdTk4NzlcdTc2RUVcIiwgbGluazogXCIvcHJvamVjdFwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU1RjAwXHU1M0QxXHU1REU1XHU1MTc3XCIsIGxpbms6IFwiL2RldmVsb3BcIiB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU2NTcwXHU2MzZFXHU1RTkzJywgbGluazogJy9kYXRhYmFzZScgfSxcclxuICAgICAgICAgIHsgdGV4dDogJzQwOCcsIGxpbms6ICcvNDA4JyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU3Qjk3XHU2Q0Q1JywgbGluazogJy9hbGdvcml0aG0nIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwiXHVEODNEXHVEQzk2XHU1QzBGXHU1QzRCXCIsXHJcbiAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgIHsgdGV4dDogXCJcdTc2RjhcdTUxOENcIiwgbGluazogXCIvcGhvdG9cIiB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiBcIlx1OTY4Rlx1N0IxNFwiLCBsaW5rOiBcIi9lc3NheVwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU2MTFGXHU2MDlGXCIsIGxpbms6IFwiL1BlcmNlcHRpb25cIiB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcIlx1RDgzRFx1REM0Rlx1N0QyMlx1NUYxNVwiLFxyXG4gICAgICAgIGl0ZW1zOiBbXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU1MjA2XHU3QzdCXCIsIGxpbms6IFwiL0BwYWdlcy9jYXRlZ29yaWVzUGFnZS5tZFwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU2ODA3XHU3QjdFXCIsIGxpbms6IFwiL0BwYWdlcy90YWdzUGFnZS5tZFwiIH0sXHJcbiAgICAgICAgICB7IHRleHQ6IFwiXHU1RjUyXHU2ODYzXCIsIGxpbms6IFwiL0BwYWdlcy9hcmNoaXZlc1BhZ2UubWRcIiB9XHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgICAgeyB0ZXh0OiBcIlx1OEQ0NFx1NkU5MFx1RDgzRFx1REUwRFwiLCBsaW5rOiBcImh0dHBzOi8vc3hkd2R3ZC5naXRodWIuaW8vXCIgfSxcclxuICAgIF0sXHJcblxyXG4gICAgc29jaWFsTGlua3M6IFt7IGljb246IFwiZ2l0aHViXCIsIGxpbms6IFwiaHR0cHM6Ly9naXRodWIuY29tL3N4ZG5ibmJcIiB9XSxcclxuXHJcbiAgICBzZWFyY2g6IHtcclxuICAgICAgcHJvdmlkZXI6IFwibG9jYWxcIixcclxuICAgIH0sXHJcblxyXG4gICAgLy8gZWRpdExpbms6IHtcclxuICAgIC8vICAgdGV4dDogXCJcdTU3MjggR2l0SHViIFx1NEUwQVx1N0YxNlx1OEY5MVx1NkI2NFx1OTg3NVwiLFxyXG4gICAgLy8gICBwYXR0ZXJuOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9LZWxlLUJpbmd0YW5nL2hkLXNlY3VyaXR5L2VkaXQvbWFzdGVyL2hkLXNlY3VyaXR5LWRvY3MvZG9jcy86cGF0aFwiLFxyXG4gICAgLy8gfSxcclxuICB9LFxyXG5cclxuXHJcbiAgLy8gXHU4RkQwXHU4ODRDXHU1NDBFXHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU3RjUxXHU5ODc1XHJcbiAgdml0ZToge1xyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIG9wZW46IHRydWVcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIGdyb3VwSWNvblZpdGVQbHVnaW4oKSwgLy9cdTRFRTNcdTc4MDFcdTdFQzRcdTU2RkVcdTY4MDdcclxuICAgIF0sXHJcbiAgICAvL1x1NTE3Nlx1NEVENlx1OTE0RFx1N0Y2RVx1OTg3OSBcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMzUwMDAsIC8vIFx1OTY1MFx1NTIzNlx1OEI2Nlx1NTQ0QVx1NzY4NFx1NTc1N1x1NTkyN1x1NUMwRlxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvVixTQUFTLG9CQUFvQjtBQUNqWCxTQUFTLHdCQUF3QjtBQUNqQyxPQUFPLGNBQWM7QUFDckIsU0FBUyxtQkFBbUIsMkJBQTJCO0FBRXZELElBQU0sY0FBYyxDQUFDLDRCQUFRLDBCQUFNLEVBQUUsU0FBUztBQUU5QyxJQUFNLFdBQVcsaUJBQWlCO0FBQUEsRUFDaEMsUUFBUSxFQUFFLE1BQU0sV0FBVyxNQUFNLDZCQUE2QjtBQUFBLEVBQzlELFNBQVM7QUFBQTtBQUFBLElBRVAsUUFBUTtBQUFBLElBQ1IsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUVBLGFBQWE7QUFBQSxJQUNYLFlBQVk7QUFBQSxJQUNaLFlBQVk7QUFBQSxNQUNWLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUEsSUFDYixjQUFjO0FBQUEsTUFDWixFQUFFLEtBQUssa0JBQWtCLE9BQU8sQ0FBQyxHQUFHLGlCQUFpQixHQUFHLFlBQVksR0FBRztBQUFBLE1BQ3ZFLEVBQUUsS0FBSyxjQUFjLE9BQU8saUNBQVE7QUFBQSxJQUN0QztBQUFBO0FBQUEsRUFFRjtBQUFBO0FBQUEsRUFFRSxjQUFjO0FBQUEsSUFDWixVQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUE7QUFBQSxNQUNOLGFBQWE7QUFBQTtBQUFBLE1BQ2IsZUFBZTtBQUFBO0FBQUEsTUFDZixTQUFTO0FBQUE7QUFBQSxNQUNULFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFFRixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixZQUFZO0FBQUE7QUFBQSxJQUNaLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWFOO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBLElBQ1gsZUFBZTtBQUFBO0FBQUEsSUFDZixjQUFjO0FBQUE7QUFBQTtBQUFBLElBRWQsYUFBYTtBQUFBO0FBQUEsTUFFWDtBQUFBO0FBQUEsTUFHQTtBQUFBO0FBQUEsTUFHQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBO0FBQUEsTUFHQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQTtBQUFBLE1BR0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUdBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUE7QUFBQSxNQUdBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBO0FBQUEsTUFHQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUNBLFlBQVk7QUFBQTtBQUFBLElBQ1osZUFBZTtBQUFBO0FBQUEsSUFDZixhQUFhO0FBQUE7QUFBQSxJQUNiLGNBQWM7QUFBQTtBQUFBLElBQ2Qs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
