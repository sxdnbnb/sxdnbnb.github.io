import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";
import timeline from "vitepress-markdown-timeline"; // 导入时间线插件
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"; // 导入代码组图标插件
import { TkMessage } from "vitepress-theme-teek";

const description = ["技术文档", "生活感悟"].toString();

const tkConfig = defineTeekConfig({
  author: { name: "sxdnbnb", link: "https://github.com/sxdnbnb" },
  blogger: {
    // 博主信息，显示在首页侧边栏
    avatar: "/img/logo.png",
    shape: "circle-rotate",
    name: "暮冬浅夏",
    slogan: "纵使命运天注定，我命由我不由天！",
  },
  // 不蒜子统计
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
  // 分享文章按钮
  articleShare:{enabled: true},
  // 赞赏在文章下方
  appreciation: {
    position: "doc-after",
    options: {
      icon: "weChatPay", // 赞赏图标，内置 weChatPay 和 alipay
      expandTitle: "打赏支持", // 展开标题，支持 HTML
      collapseTitle: "下次一定", // 折叠标题，支持 HTML
      content: `<img src='/img/zhifu.png'>`, // 赞赏内容，支持 HTML
      expand: false, // 是否默认展开，默认 false
    },
  },

  banner: {
    mask: false,
    enabled: true,
    bgStyle: "fullImg",
    imgInterval: 8000,
    imgShuffle: true,  // 当多张大图时（imgSrc 为数组），设置切换时间，单位：毫秒   
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
      "/img/1.webp",
      "/img/2.webp",
      "/img/3.webp",
      "/img/4.webp",
      "/img/5.webp",
      "/img/6.webp",
      "/img/7.webp",
      "/img/8.webp",
      "/img/9.webp",
      "/img/10.webp",
      "/img/11.webp",
      "/img/13.webp",
      "/img/14.webp",
      "/img/15.webp",
    ],
    descStyle: "types",
    maskBg: "rgba(0, 0, 0, 0.4)", // Banner 大图遮罩颜色，如果为数字，则是 rgba(0, 0, 0, ${maskBg})，如果为字符串，则作为背景色
    textColor: "#ffffff", // Banner 字体颜色，bgStyle 为 default 时为 '#000000'，其他为 '#ffffff'
    titleFontSize: "3.2rem", // 标题字体大小
    descFontSize: "1.4rem", // 描述字体大小
    // descStyle: "types", // 描述信息风格：default 为纯文字渲染风格（如果 description 为数组，则取第一个），types 为文字打印风格，switch 为文字切换风格
    description: [

      // 动漫经典语录
      "重要的不是你长得漂亮与否，而是你的心灵是否美丽 —— 千与千寻",
      "我们仰望着同一片天空，却看着不同的地方 —— 秒速五厘米",
      "比自己的生命更重要的东西永远存在着 —— fate",
      "正因为生来什么都没有，因此我们能拥有一切 —— 游戏人生",

      // 爱情感悟
      // "喜欢一个人就是在对方的一切都合理化",
      // "爱，其实很简单，困难的是接受这份简单",
      // "最好的爱情是互相成就，而不是互相禁锢",
      // "缘分就是，遇见了可以让你笑的人",
      // "爱情不是占有，而是彼此成就",

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
    imageViewer: {
      hideOnClickModal: true, // 点击空白可退出
    },
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

    imageViewer: {
      hideOnClickModal: true, // 点击空白可退出
    },

    topTip: frontmatter => {
      const tip: Record<string, string> = {
        type: "warning",
        title: "注意",
        text: "文章发布较早，内容可能过时，阅读注意甄别。",
      };

      // frontmatter.long 为 true，则添加提示
      if (frontmatter.long) return tip;

      // frontmatter.date 大于两年，则添加提示
      const longTime = 24 * 30 * 24 * 60 * 60 * 1000;
      if (frontmatter.date && Date.now() - new Date(frontmatter.date).getTime() > longTime) return tip;
    },
  },

  // 设置主题尺寸
  themeSetting: {
    themeSize: "default",
    backTopDone: TkMessage => {
      TkMessage.success("返回顶部成功");
    },
  },

  // 友链信息
  friendLink: {
    list: [
      { avatar: "/img/teek-logo-large.png", name: "Young Kbt blog", desc: "Teeker主题", link: "https://notes.youngkbt.cn/" },
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

  // 公告栏
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
    ], 
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
    // 添加51统计
    [
      'script',
      {
        charset: 'UTF-8',
        id: 'LA_COLLECT',
        src: '//sdk.51.la/js-sdk-pro.min.js'
      }
    ],
    [
      'script',
      {},
      'LA.init({id:"3IdmiCNCA52rjASE",ck:"3IdmiCNCA52rjASE"})'
    ]
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

    socialLinks: [
      { 
        icon: {
          svg: '<svg t="1744342794583" class="icon" viewBox="0 0 1049 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8781" width="200" height="200"><path d="M524.712986 0q107.255961 0 203.996632 41.009632 94.637613 39.958103 167.193116 112.513606t112.513606 167.193116q41.009632 96.740671 41.009632 203.996632 0 113.565135-46.267277 216.61498-45.215748 99.895258-126.709248 173.50229t-185.594874 108.30749q-17.875994 3.154587-28.391284-5.257645-7.360703-8.412232-7.360703-19.979052v-144.059477q0-34.700458-10.515291-60.988683-9.463761-23.133639-25.236696-36.803516 69.400916-7.360703 114.616664-27.339755 58.885626-26.288226 89.379967-77.813148 36.803516-58.885626 36.803517-153.523239 0-80.967735-54.67951-140.90489 8.412232-21.030581 10.51529-47.318806 3.154587-45.215748-15.772935-92.534555-18.927523-5.257645-56.782568 8.412232-26.288226 9.463761-59.937154 29.442813-27.339755 15.772935-27.339755 16.824465-64.143271-17.875994-131.441129-17.875994t-131.441129 17.875994l-27.339755-16.824465q-33.648929-19.979052-59.937154-29.442813-36.803516-13.669877-56.782568-8.412232-18.927523 47.318806-15.772935 92.534555 2.103058 26.288226 10.51529 47.318806-54.67951 59.937155-54.67951 140.90489 0 94.637613 36.803516 153.523239 30.494342 50.473393 89.379968 77.813148 45.215748 19.979052 113.565135 27.339755-27.339755 25.236697-33.648929 70.452445-35.751987 16.824464-70.452445 13.669877-51.524922-4.206116-82.019264-56.782568-12.618348-22.08211-33.648929-36.803516-14.721406-9.463761-32.5974-14.721406-9.463761-3.154587-14.721406-3.154587-31.545871 0-19.979052 15.772935 5.257645 8.412232 16.824465 16.824465 22.08211 9.463761 42.061161 44.164219 10.51529 16.824464 15.772935 32.5974 13.669877 41.009632 59.937155 57.834097 32.5974 11.566819 78.864677 8.412232 22.08211-1.051529 38.906574-4.206116l1.051529 97.792199q0 11.566819-8.412232 19.979052-10.51529 8.412232-28.391284 5.257645-104.101374-34.700458-185.594874-108.30749T46.267277 741.327966q-46.267277-103.049845-46.267277-216.61498 0-107.255961 41.009632-203.996632 39.958103-94.637613 112.513606-167.193116t167.193116-112.513606q97.7922-41.009632 203.996632-41.009632z m-325.973999 753.946315q2.103058-5.257645-4.731881-7.886468t-8.937997 1.577293q-2.103058 4.206116 4.206116 7.360704 3.154587 2.103058 5.78341 1.577293t3.680352-2.628822z m21.03058 23.133638q2.103058-2.103058 1.577294-5.257645t-3.154587-5.78341q-2.628823-2.628823-5.78341-3.154587t-5.257645 1.051529q-2.103058 1.577294-1.577294 4.731881t3.154587 5.78341q2.628823 2.628823 5.78341 3.680351t5.257645-1.051529z m21.030581 30.494342q2.103058-2.103058 2.103058-5.78341t-2.103058-7.360703q-2.103058-3.680352-5.78341-4.73188t-6.309174 0.525764q-2.628823 1.577294-2.628823 5.257645t2.628823 7.360703q2.628823 3.680352 6.309174 5.257646t5.78341-0.525765z m28.391284 28.391284q2.103058-1.051529 1.051529-5.257645t-4.206116-7.360704q-3.154587-3.154587-7.360704-3.680351t-6.309174 1.577293q-2.103058 2.103058-1.577293 6.309175t4.206116 7.360703q3.680352 3.154587 7.886468 3.680351t6.309174-2.628822z m38.906574 17.875993q1.051529-3.154587-1.577294-6.309174t-6.834938-4.73188q-4.206116-1.577294-8.412233 0t-5.257645 4.73188q-1.051529 3.154587 1.577294 6.309174t6.834938 4.206116q4.206116 1.051529 8.412233 0t5.257645-4.206116z m43.11269 3.154587q0-3.154587-3.680352-5.783409t-8.412232-2.103058q-4.731881 0.525765-7.886468 2.628822t-3.154587 5.257645q0 3.154587 3.680352 5.78341t8.412232 2.103058q4.731881-0.525765 7.886468-2.628822t3.154587-5.257646z m39.958103-7.360703q-1.051529-2.103058-4.73188-4.206116t-8.412233-1.051529q-4.731881 1.051529-7.360703 3.680352t-2.103058 5.783409q0.525765 3.154587 4.206116 5.257646t8.412232 1.051529q4.731881-1.051529 7.360704-4.206117t2.628822-6.309174z" p-id="8782"></path></svg>'		
        }, 
        link: "https://github.com/sxdnbnb",
      },
      {
        icon: {
          svg: '<svg t="1744342272083" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="965" width="200" height="200"><path d="M422.158764 938.671665L209.079297 724.114714a425.09105 425.09105 0 0 1 0-599.638915A415.860434 415.860434 0 0 1 506.887329 0.001463c112.815382 0 218.623688 43.885652 297.983574 124.503593a425.120307 425.120307 0 0 1 0 599.638915L591.791436 938.671665h304.273851a42.671482 42.671482 0 0 1 0 85.328335h-767.998903a42.671482 42.671482 0 0 1 0-85.328335z" fill="#FFAF04" p-id="966"></path><path d="M313.176063 469.680335s-17.05689 22.527968-17.05689 33.016638 27.135961 9.654843 27.135961 9.654844l156.408462 0.848456-53.58438 181.496426s-5.295535 16.223063 7.314275 20.831056 22.601111-5.119993 22.601111-5.119993L703.831505 414.72087s18.007746-18.256431 13.165695-26.960418-25.599963-7.314275-25.599963-7.314275l-156.33532 2.735538 23.727509-201.873997s1.696912-8.952673-6.05622-11.775983-12.726839 4.183765-12.726839 4.183765z" fill="#FFFFFF" p-id="967"></path></svg>'
        },
        link:"https://sxdnb.zone.id/"
      },
      {
        icon: {
          svg: '<svg t="1744342974706" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1512" width="200" height="200"><path d="M422.158764 938.671665L209.079297 724.114714a425.09105 425.09105 0 0 1 0-599.638915A415.860434 415.860434 0 0 1 506.887329 0.001463c112.815382 0 218.623688 43.885652 297.983574 124.503593a425.120307 425.120307 0 0 1 0 599.638915L591.791436 938.671665h304.273851a42.671482 42.671482 0 0 1 0 85.328335h-767.998903a42.671482 42.671482 0 0 1 0-85.328335z" fill="#1afa29" p-id="1513" data-spm-anchor-id="a313x.search_index.0.i4.620c3a81Vgvo8Q" class="selected"></path><path d="M313.176063 469.680335s-17.05689 22.527968-17.05689 33.016638 27.135961 9.654843 27.135961 9.654844l156.408462 0.848456-53.58438 181.496426s-5.295535 16.223063 7.314275 20.831056 22.601111-5.119993 22.601111-5.119993L703.831505 414.72087s18.007746-18.256431 13.165695-26.960418-25.599963-7.314275-25.599963-7.314275l-156.33532 2.735538 23.727509-201.873997s1.696912-8.952673-6.05622-11.775983-12.726839 4.183765-12.726839 4.183765z" fill="#FFFFFF" p-id="1514"></path></svg>'
        },
        link:"https://iikun.zone.id/"
      }

    ],

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
