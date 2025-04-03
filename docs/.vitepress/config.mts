import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";
import timeline from "vitepress-markdown-timeline"; // 导入时间线插件
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"; // 导入代码组图标插件

const description = ["技术文档", "生活感悟"].toString();

const tkConfig = defineTeekConfig({
  author: { name: "sxdnbnb", link: "https://github.com/sxdnbnb" },
  blogger: {
    // 博主信息，显示在首页侧边栏
    avatar: "/img/logo.png",
    avatarStyle: "radius",
    name: "暮冬浅夏",
    slogan: "纵使命运天注定，我命由我不由天！",
  },

  docAnalysis: {
    createTime: "2025-04-01",
    statistics: {
      provider: "busuanzi",
    },
    wordCount: true,
    readingTime: true,
    overrideInfo: [
      { key: "lastActiveTime", value: (_, currentValue) => `${currentValue}` },
      { key: "totalPosts", label: "文章总数目" },
    ],
    // appendInfo: [{ key: "index", label: "序号", value: "One" }],
  },

  banner: {
    mask: false,
    enabled: true,
    bgStyle: "fullImg",
    imgInterval: 8000,
    imgShuffle: true,  // 当多张大图时（imgSrc 为数组），设置切换时间，单位：毫秒   
    imgSrc: [
      "/img/12.jpg",
      "/img/13.jpg",
      "/img/1.jpg",
      "/img/2.jpg",
      "/img/3.jpg",
      "/img/4.jpg",
      "/img/5.jpg",
      "/img/6.jpg",
      "/img/7.jpg",
      "/img/8.jpg",
      "/img/9.jpg",
      "/img/10.jpg",
      "/img/11.jpg"
    ],
    descStyle: "types",
    maskBg: "rgba(0, 0, 0, 0.4)", // Banner 大图遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色
    textColor: "#ffffff", // Banner 字体颜色，bgStyle 为 default 时为 '#000000'，其他为 '#ffffff'
    titleFontSize: "3.2rem", // 标题字体大小
    descFontSize: "1.4rem", // 描述字体大小
    // descStyle: "types", // 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
    description: [
      //lonely
      "初闻不知曲中意，再听已是曲中人",

      // 原有内容保留
      "万般努力只为出人头地，低头弯腰只为爬的更高",

      // 动漫经典语录
      "无论你在哪里，我一定会找到你 —— 星际牛仔",
      "重要的不是你长得漂亮与否，而是你的心灵是否美丽 —— 千与千寻",
      "我们仰望着同一片天空，却看着不同的地方 —— 秒速五厘米",
      "比自己的生命更重要的东西永远存在着 —— fate",
      "正因为生来什么都没有，因此我们能拥有一切 —— 游戏人生",

      // 爱情感悟
      "喜欢一个人就是在对方的一切都合理化",
      "爱，其实很简单，困难的是接受这份简单",
      "最好的爱情是互相成就，而不是互相禁锢",
      "缘分就是，遇见了可以让你笑的人",
      "爱情不是占有，而是彼此成就",

      // 人生哲理
      "生命中最困难的时刻，恰是转机的开始",
      "没有人可以回到过去，但每个人都可以从现在开始",
      "与其等待机会，不如创造机会",
      "生活不会因为你的懦弱而停止脚步",
      "成长的过程总是孤独的，但结果是美好的",

      // 更多动漫台词
      "即使是在最深的黑暗里，也要保持希望 —— 进击的巨人",
      "不要为了别人而活，要为了自己而活 —— 火影忍者",
      "比起悲伤，无法分享快乐才是真的寂寞 —— 四月是你的谎言",
      "梦想是不会结束的，只要还活着就要继续追逐 —— 海贼王",

      // ... 继续添加更多句子直到100个
      "生命的意义不在于活了多久，而在于经历了什么",
      "最珍贵的不是拥有的回忆，而是正在创造的回忆",
      "不要因为走得太远，而忘记了为什么出发",
      "有时候，坚持了你最不想干的事情，却等来了你最想要的结果",
      "与其用泪水悔恨昨天，不如用汗水拼搏今天",

      // 添加更多正能量句子...
      "每个人都是自己人生的主角",
      "不要被周围的声音干扰，坚持自己认定的道路",
      "成功不是终点，失败也不是终结",
      "时间会证明一切，耐心是最好的答案",
      "活在当下，珍惜现在，期待未来",
    ], // 描述信息
    switchTime: 4000, // 描述信息切换间隔时间，单位：毫秒。descStyle 为 switch 时生效
    switchShuffle: false, // 描述信息是否随机切换，为 false 时按顺序切换。descStyle 为 switch 时生效
    typesInTime: 200, // 输出一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesOutTime: 100, // 删除一个文字的时间，单位：毫秒。descStyle 为 types 时生效
    typesNextTime: 800, // 打字与删字的间隔时间，单位：毫秒。descStyle 为 types 时生效
    typesShuffle: false, // 描述信息是否随机打字，为 false 时按顺序打字，descStyle 为 types 时生效
  },
  // bodyBgImg: {
  //   imgSrc: ["/img/bg1.jpg", "/img/bg2.png"],
  //   bannerStyle: "full",
  // },

  // 首页顶部按 F11 开启壁纸模式
  wallpaper: {
    enabled: true,
  },

  post: {
    coverImgMode: "full", // 封面大图
  },


  // 文章
  article: {
    showIcon: true, // 作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息的图标是否显示
    // dateFormat: "yyyy-MM-dd hh:mm:ss", // 文章日期格式，首页和文章页解析日期时使用
    dateFormat: "yyyy-MM-dd", // 文章日期格式，首页和文章页解析日期时使用
    showInfo: true, // 是否展示作者、日期、分类、标签、字数、阅读时长、浏览量等文章信息，分别作用于首页和文章页
    showAuthor: true, // 是否展示作者
    showCreateDate: true, // 是否展示创建日期
    showUpdateDate: true, // 是否展示更新日期，是否展示更新时间，仅在文章页显示
    showCategory: true, // 是否展示分类
    showTag: true, // 是否展示标签
    topTip: frontmatter => {
      const tip: Record<string, string> = {
        type: "warning",
        title: "注意",
        text: "文章发布较早，内容可能过时，阅读注意甄别。",
      };

      // frontmatter.long 为 true，则添加提示
      if (frontmatter.long) return tip;

      // frontmatter.date 大于半年，则添加提示
      const longTime = 6 * 30 * 24 * 60 * 60 * 1000;
      if (frontmatter.date && Date.now() - new Date(frontmatter.date).getTime() > longTime) return tip;
    },
  },
  // 设置主题尺寸
  // themeSetting: {
  //   themeSize: "large",
  // },





  // 友链信息
  friendLink: {
    list: [
      { avatar: "/img/teek-logo-large.png", name: "Young Kbt blog", desc: "Teeker作者", link: "https://notes.youngkbt.cn/" },
    ],
  },




  footerInfo: {
    // topMessage: ["初闻不知曲中意，再听已是曲中人"],
    bottomMessage: ["初闻不知曲中意，再听已是曲中人"],

    // 主题版权配置
    theme: {
      show: false, // 是否显示主题版权，建议显示
      // name: "Theme By teek@1.0.0-alpha.4-2025.3.31", // 自定义名称
      // link: "https://github.com/Kele-Bingtang/vitepress-theme-teek", // 自定义链接
    },

    // 博客版权配置    
    copyright: {
      show: true, // 是否显示博客版权
      createYear: 2024,
      suffix: "暮冬浅夏",
    },
    icpRecord: {
      name: "桂ICP备20240156994号",
      link: "http://beian.miit.gov.cn/",
    },

    // 网络安全备案信息配置
    // securityRecord: {
    //   name: "甘公网安备62102702000211号",
    //   link: "https://beian.mps.gov.cn/",
    // },    


    customHtml: `<p>小破站已运行了 <span id="footer-runtime"></span></p>`,
  },



  // 社交链接
  social: [
    {
      icon: "icon-github",
      iconType: "iconfont",
      name: "GitHub",
      link: "https://github.com/sxdnbnb",
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
      link: "/img/qq.png",
    },
    {
      icon: "icon-weixin",
      iconType: "iconfont",
      name: "联系我",
      link: "/img/weixin.png",
    },
  ],


  comment: {
    // provider: "giscus",
    provider: "twikoo",
    options: {
      // twikoo 配置，官网：https://twikoo.js.org/
      envId: "https://sxdnbnb.github.io/",
      link: "https://cdn.jsdelivr.net/npm/twikoo@1.6.41/dist/twikoo.min.js",

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
    },
  },


  notice: {
    enabled: true,
    position: "center",
  },

  vitePlugins: {
    autoFrontmatter: true, //添加自动格式formatter插件
    sidebarOption: {
      // initItems: false, //这条命令注释后，才会让文档和目录的样式保持一致
      collapsed: true, //打开侧边栏自动收缩功能
    },
  },


  markdown: {
    config: md => {
      md.use(timeline);
      md.use(groupIconMdPlugin);
    },
  },

});



// https://vitepress.dev/reference/site-config
export default defineConfig({
  // ignoreDeadLinks: true,
  extends: tkConfig,
  base: "/",
  title: "暮冬浅夏のBlog",
  description: description,
  cleanUrls: true,
  lastUpdated: true,
  lang: "zh-CN",
  head: [
    ["meta", { name: "author", content: "Tianke" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
      },
    ],
    [
      "meta",
      {
        name: "description",
        description,
      },
    ],
    ["meta", { name: "keywords", description }],
    ["link", { rel: "icon", href: "/favicon.ico", type: "image/png" }],
    ["link", { rel: "stylesheet", href: "//at.alicdn.com/t/font_2989306_w303erbip9.css" }], // 阿里在线矢量库

    //添加看板娘
    [
      "script",
      {
        src: "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js",
      },
    ],
    //免费的音乐播放器
    [
      "script",
      {
        type: "text/javascript",
        src: "https://myhkw.cn/player/js/jquery.min.js",
      },
    ], // 插入自定义脚本
    [
      "script",
      {
        type: "text/javascript",
        id: "myhk",
        src: "https://myhkw.cn/api/player/174271691795",
        key: "174271691795",
        m: "1",
        defer: "defer",  // 添加defer属性，确保脚本在DOM加载完成后执行
      },
    ],
  ],
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/favicon.ico",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },


    nav: [
      { text: "🏡首页", link: "/" },
      {
        text: "🗃️笔记",
        items: [
          { text: "Java基础", link: "/java" },
          { text: "Java项目", link: "/project" },
          { text: "开发工具", link: "/develop" },
          { text: '数据库', link: '/database' },
          { text: '408', link: '/408' },
          { text: '算法', link: '/algorithm' },
        ],
      },
      {
        text: "💖小屋",
        items: [
          { text: "相册", link: "/photo" },
          { text: "随笔", link: "/essay" },
          { text: "感悟", link: "/Perception" },
        ],
      },
      {
        text: "👏索引",
        items: [
          { text: "分类", link: "/@pages/categoriesPage.md" },
          { text: "标签", link: "/@pages/tagsPage.md" },
          { text: "归档", link: "/@pages/archivesPage.md" }
        ],
      },
      { text: "资源😍", link: "https://sxdwdwd.github.io/" },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/sxdnbnb" }],

    search: {
      provider: "local",
    },

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
      groupIconVitePlugin(), //代码组图标
    ],
    //其他配置项 
    build: {
      chunkSizeWarningLimit: 35000, // 限制警告的块大小
    },
  },
});
