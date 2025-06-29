import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";
import timeline from "vitepress-markdown-timeline"; // 导入时间线插件
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"; // 导入代码组图标插件
import { TkMessage } from "vitepress-theme-teek";

const description = ["技术文档", "生活感悟"].toString();

// 随机获取 coverImg
const coverImgList = [
  // 狗
  "https://www.yotu.net/i/67f4f78876346.png",
  "https://www.yotu.net/i/67f4f788c391d.png",
  "https://www.yotu.net/i/67f4f788c7720.png",
  "https://www.yotu.net/i/67f4f788da205.png",
  "https://www.yotu.net/i/67f4f789ca3f5.png",
  "https://www.yotu.net/i/67f4f78a3231e.png",
  "https://www.yotu.net/i/67f4f78a71848.png",
  "https://www.yotu.net/i/67f4f78b2aaa0.png",
  "https://www.yotu.net/i/67f4f78bad671.png",
  "https://www.yotu.net/i/67f4f78bd05d1.png",
  "https://www.yotu.net/i/67f4f78c61194.png",
  "https://www.yotu.net/i/67f4f78c63997.png",
  "https://www.yotu.net/i/67f4f78d15c86.png",
  "https://www.yotu.net/i/67f4f78dad91f.png",
  "https://www.yotu.net/i/67f4f78e177ba.png",
  "https://www.yotu.net/i/67f4f78e82dff.png",
  "https://www.yotu.net/i/67f4f78eb26a5.png",
  "https://www.yotu.net/i/67f4f78ed2d10.png",
  "https://www.yotu.net/i/67f4f790225f6.png",
  "https://www.yotu.net/i/67f4f7902310e.png",
  // 小熊猫
  "https://www.yotu.net/i/67f4f7de90338.png",
  "https://www.yotu.net/i/67f4f7dea3b55.png",
  "https://www.yotu.net/i/67f4f7dea492a.png",
  "https://www.yotu.net/i/67f4f7de9bfb6.png",
  "https://www.yotu.net/i/67f4f7e0acfe7.png",
  "https://www.yotu.net/i/67f4f7de93301.png",
  // 风景
  "https://www.yotu.net/i/67f51fdb522aa.png",
  "https://www.yotu.net/i/67f51fdb3bc5f.png",
  "https://www.yotu.net/i/67f51fdb546e5.png",
  "https://www.yotu.net/i/67f51fdb5025d.png",
  "https://www.yotu.net/i/67f51fdb4fc5a.png",
  "https://www.yotu.net/i/67f51fde2ecf5.png",
  "https://www.yotu.net/i/67f51fdfbee78.png",
  // 公鸡
  "https://www.yotu.net/i/67f4f7e0e18fe.png",
  "https://www.yotu.net/i/67f4f7e12a339.png",
  "https://www.yotu.net/i/67f4f7e154a98.png",
  "https://www.yotu.net/i/67f4f7e1a313e.png",
  "https://www.yotu.net/i/67f4f7e2c9362.png",
  "https://www.yotu.net/i/67f4f7e3552cd.png",
  "https://www.yotu.net/i/67f4f7e327117.png",
  "https://www.yotu.net/i/67f4f7e390baa.png",
  "https://www.yotu.net/i/67f4f7e3e0539.png",
  "https://www.yotu.net/i/67f4f7e4cf52a.png",
  "https://www.yotu.net/i/67f4f7e548edc.png",
  "https://www.yotu.net/i/67f4f7e586a4c.png",
  "https://www.yotu.net/i/67f4f7e5d53fa.png",
  "https://www.yotu.net/i/67f4f7e62373e.png",
  // 鼠
  "https://www.yotu.net/i/67f4f9f19bba0.png",
  "https://www.yotu.net/i/67f4f9f1b656d.png",
  "https://www.yotu.net/i/67f4f9f1cc9e4.png",
  "https://www.yotu.net/i/67f4f9f3755d1.png",
  "https://www.yotu.net/i/67f4f9f3cbd2d.png",
  "https://www.yotu.net/i/67f4f9f3ee60c.png",
  "https://www.yotu.net/i/67f4f9f43762d.png",
  "https://www.yotu.net/i/67f4f9f48357c.png",
  "https://www.yotu.net/i/67f4f9f56f670.png",
  "https://www.yotu.net/i/67f4f9f5cbeef.png",
  "https://www.yotu.net/i/67f4f9f5dc419.png",
  "https://www.yotu.net/i/67f4f9f665039.png",
  "https://www.yotu.net/i/67f4f9f698758.png",
  "https://www.yotu.net/i/67f4f9f7a982f.png",
  "https://www.yotu.net/i/67f4f9f7de68f.png",
  "https://www.yotu.net/i/67f4f9f84633a.png",
  "https://www.yotu.net/i/67f4f9f847253.png",
  "https://www.yotu.net/i/67f4f9f895fca.png",
  "https://www.yotu.net/i/67f4f9f9b9a6d.png",
  // 雷电
  "https://www.yotu.net/i/67f4f9f9d9e38.png",
  "https://www.yotu.net/i/67f4f9fa4a97e.png",
  "https://www.yotu.net/i/67f4f9fa8a021.png",
  "https://www.yotu.net/i/67f4fa3b051ec.png",
  "https://www.yotu.net/i/67f4fa3ae7fe7.png",
  "https://www.yotu.net/i/67f4fa3ae9ce0.png",
  "https://www.yotu.net/i/67f4fa3cea25f.png",
  "https://www.yotu.net/i/67f4fa3d44d10.png",
  "https://www.yotu.net/i/67f4fa3d19e61.png",
  "https://www.yotu.net/i/67f4fa3d55e83.png",
  "https://www.yotu.net/i/67f4fa3e218f8.png",
  "https://www.yotu.net/i/67f4fa3eea743.png",
  "https://www.yotu.net/i/67f4fa3f2670b.png",
  "https://www.yotu.net/i/67f4fa3f41a39.png",
  "https://www.yotu.net/i/67f4f79086dd3.png",
  // 小鸡
  "https://www.yotu.net/i/67f4fa3f7d3f7.png",
  "https://www.yotu.net/i/67f4fa4025fab.png",
  "https://www.yotu.net/i/67f4fa40bc739.png",
  "https://www.yotu.net/i/67f4fa412fed4.png",
  "https://www.yotu.net/i/67f4fa41576ec.png",
  "https://www.yotu.net/i/67f4fa41a0484.png",
  "https://www.yotu.net/i/67f4fa4237b28.png",
  "https://www.yotu.net/i/67f4fa4295e31.png",
  "https://www.yotu.net/i/67f4fa4336801.png",
  "https://www.yotu.net/i/67f4fa4371abe.png",
  "https://www.yotu.net/i/67f4fa43af6e1.png",
  "https://www.yotu.net/i/67f4fa8cd0d74.jpg",
  "https://www.yotu.net/i/67f4fa8d22996.png",
  "https://www.yotu.net/i/67f4fa8d2d38d.png",
  "https://www.yotu.net/i/67f50e95844c0.jpg",
  // 街景
  "https://www.yotu.net/i/6804ea49a53f7.jpg",
  "https://www.yotu.net/i/6804ea49b0d18.jpg",
  "https://www.yotu.net/i/6804ea49acb45.jpg",
  "https://www.yotu.net/i/6804ea4aa4fd9.jpg",
  "https://www.yotu.net/i/6804ea4b09a4b.jpg",
  "https://www.yotu.net/i/6804ea4b88326.jpg",
  "https://www.yotu.net/i/6804ea4bf3525.jpg",
  "https://www.yotu.net/i/6804ea49a276e.jpg",
  "https://www.yotu.net/i/6804ea4991d9e.jpg",
  "https://www.yotu.net/i/6804ea4bc5095.jpg",
  "https://www.yotu.net/i/6804ea4c72f90.jpg",
  "https://www.yotu.net/i/6804ea4cd8f2c.jpg",
];


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
  articleShare: { enabled: true },
  // 赞赏在文章下方
  appreciation: {
    position: "doc-after",
    options: {
      icon: "weChatPay", // 赞赏图标，内置 weChatPay 和 alipay
      expandTitle: "请作者喝可乐🥤", // 展开标题，支持 HTML
      collapseTitle: "你必成功👍", // 折叠标题，支持 HTML
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
      "/img/1.webp",
      // "/img/2.webp",
      // "/img/3.webp",
      // "/img/4.webp",
      // "/img/5.webp",
      // "/img/6.webp",
      // "/img/7.webp",
      "/img/8.webp",
      "/img/9.webp",
      // "/img/10.webp",
      // "/img/11.webp",
      // "/img/12.webp",
      "/img/13.webp",
      "/img/14.webp",
      // "/img/15.webp",
      "/img/16.webp",
      // "/img/17.webp",
      // "/img/18.webp",
      "/img/19.webp",
      // "/img/20.webp",
      "/img/21.webp",

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
      { avatar: "/img/teek-logo-large.png", name: "vitepress-theme-teek", desc: "Teek官网", link: "https://vp.teek.top/" },
      // { avatar: "/img/one.webp", name: "One ", desc: "明心静性，爱自己", link: "https://onedayxyy.cn/" },
    ],
  },

  footerInfo: {
    // topMessage: ["初闻不知曲中意，再听已是曲中人"],
    bottomMessage: ['<script id="LA-DATA-WIDGET" crossorigin="anonymous" charset="UTF-8" src="https://v6-widget.51.la/v6/3IdmiCNCA52rjASE/quote.js?theme=#1690FF,#333333,#999999,#1690FF,#FFFFFF,#1690FF,14&f=14&display=0,0,1,1,1,1,1,1"></script>'],

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
    securityRecord: {
      name: "甘公网安备62102702000211号",
      link: "https://beian.mps.gov.cn/",
    },


    customHtml: `
                <p>💞在一起的第 <span id="footer-runtime"></span></p>
                `,

  },



  // 社交链接
  social: [
    {
      icon: '<svg t="1744688098066" class="icon" viewBox="0 0 1049 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1471" width="200" height="200"><path d="M524.979332 0C234.676191 0 0 234.676191 0 524.979332c0 232.068678 150.366597 428.501342 358.967656 498.035028 26.075132 5.215026 35.636014-11.299224 35.636014-25.205961 0-12.168395-0.869171-53.888607-0.869171-97.347161-146.020741 31.290159-176.441729-62.580318-176.441729-62.580318-23.467619-60.841976-58.234462-76.487055-58.234463-76.487055-47.804409-32.15933 3.476684-32.15933 3.476685-32.15933 53.019436 3.476684 80.83291 53.888607 80.83291 53.888607 46.935238 79.963739 122.553122 57.365291 152.97411 43.458554 4.345855-33.897672 18.252593-57.365291 33.028501-70.402857-116.468925-12.168395-239.022047-57.365291-239.022047-259.012982 0-57.365291 20.860106-104.300529 53.888607-140.805715-5.215026-13.037566-23.467619-66.926173 5.215027-139.067372 0 0 44.327725-13.906737 144.282399 53.888607 41.720212-11.299224 86.917108-17.383422 131.244833-17.383422s89.524621 6.084198 131.244833 17.383422C756.178839 203.386032 800.506564 217.29277 800.506564 217.29277c28.682646 72.1412 10.430053 126.029806 5.215026 139.067372 33.897672 36.505185 53.888607 83.440424 53.888607 140.805715 0 201.64769-122.553122 245.975415-239.891218 259.012982 19.121764 16.514251 35.636014 47.804409 35.636015 97.347161 0 70.402857-0.869171 126.898978-0.869172 144.282399 0 13.906737 9.560882 30.420988 35.636015 25.205961 208.601059-69.533686 358.967656-265.96635 358.967655-498.035028C1049.958663 234.676191 814.413301 0 524.979332 0z" fill="#191717" p-id="1472"></path><path d="M199.040177 753.571326c-0.869171 2.607513-5.215026 3.476684-8.691711 1.738342s-6.084198-5.215026-4.345855-7.82254c0.869171-2.607513 5.215026-3.476684 8.691711-1.738342s5.215026 5.215026 4.345855 7.82254z m-6.953369-4.345856M219.900283 777.038945c-2.607513 2.607513-7.82254 0.869171-10.430053-2.607514-3.476684-3.476684-4.345855-8.691711-1.738342-11.299224 2.607513-2.607513 6.953369-0.869171 10.430053 2.607514 3.476684 4.345855 4.345855 9.560882 1.738342 11.299224z m-5.215026-5.215027M240.760389 807.459932c-3.476684 2.607513-8.691711 0-11.299224-4.345855-3.476684-4.345855-3.476684-10.430053 0-12.168395 3.476684-2.607513 8.691711 0 11.299224 4.345855 3.476684 4.345855 3.476684 9.560882 0 12.168395z m0 0M269.443034 837.011749c-2.607513 3.476684-8.691711 2.607513-13.906737-1.738342-4.345855-4.345855-6.084198-10.430053-2.607513-13.037566 2.607513-3.476684 8.691711-2.607513 13.906737 1.738342 4.345855 3.476684 5.215026 9.560882 2.607513 13.037566z m0 0M308.555733 853.526c-0.869171 4.345855-6.953369 6.084198-13.037566 4.345855-6.084198-1.738342-9.560882-6.953369-8.691711-10.430053 0.869171-4.345855 6.953369-6.084198 13.037566-4.345855 6.084198 1.738342 9.560882 6.084198 8.691711 10.430053z m0 0M351.145116 857.002684c0 4.345855-5.215026 7.82254-11.299224 7.82254-6.084198 0-11.299224-3.476684-11.299224-7.82254s5.215026-7.82254 11.299224-7.82254c6.084198 0 11.299224 3.476684 11.299224 7.82254z m0 0M391.126986 850.049315c0.869171 4.345855-3.476684 8.691711-9.560882 9.560882-6.084198 0.869171-11.299224-1.738342-12.168395-6.084197-0.869171-4.345855 3.476684-8.691711 9.560881-9.560882 6.084198-0.869171 11.299224 1.738342 12.168396 6.084197z m0 0" fill="#191717" p-id="1473"></path></svg>',
      iconType: "svg",
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
      icon: '<svg t="1744687850249" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8493" width="200" height="200"><path d="M68.399765 590.615655c-37.073602 90.765025-43.465533 176.418105-14.062849 191.757941 20.45478 11.505876 53.692423-14.061849 84.374094-60.084355 11.504876 51.135451 42.186547 95.87897 84.373094 132.952572-44.743519 16.619821-74.146204 44.743519-74.146204 75.42519 0 51.135451 79.259149 93.321998 176.418105 93.321997 88.208052 0 161.07627-33.237643 175.138119-77.982162h20.45478C535.009753 990.751357 607.87897 1023.989 696.087023 1023.989c98.436943 0 176.418105-40.908561 176.418104-93.321997 0-30.68167-29.402684-58.806368-74.146203-75.42519 42.186547-37.073602 72.868217-81.817121 84.374094-132.952572 30.68067 46.022506 62.640327 71.589231 84.373093 60.084355 30.68167-15.339835 24.289739-102.270901-14.061849-191.757941-29.403684-70.311245-69.033258-122.725682-99.714929-134.230558 0-3.835959 1.278986-8.949904 1.278987-14.062849 0-26.845712-7.669918-52.413437-20.454781-72.868217v-5.112945c0-12.783863-2.555973-24.289739-7.669917-34.516629C818.813704 145.736434 701.200968 0 510.722014 0 320.24206 0 202.630323 145.736434 194.959406 329.824457c-5.112945 10.22689-7.669918 21.732767-7.669918 34.516629v5.112945c-12.783863 20.45478-20.45478 46.022506-20.45478 72.869217v14.061849c-28.123698 11.504876-69.032258 62.640327-98.434943 134.230558z" fill="#4CAFE9" p-id="8494"></path></svg>',
      iconType: "svg",
      name: "QQ",
      link: "https://qm.qq.com/cgi-bin/qm/qr?k=GhJ2EO8JuVLiLARVEFe3MnhT4-piHUFP&s=1",
    },
    {
      icon: '<svg t="1744688062947" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10884" width="200" height="200"><path d="M683.058 364.695c11 0 22 1.016 32.943 1.976C686.564 230.064 538.896 128 370.681 128c-188.104 0.66-342.237 127.793-342.237 289.226 0 93.068 51.379 169.827 136.725 229.256L130.72 748.43l119.796-59.368c42.918 8.395 77.37 16.79 119.742 16.79 11 0 21.46-0.48 31.914-1.442a259.168 259.168 0 0 1-10.455-71.358c0.485-148.002 128.744-268.297 291.403-268.297l-0.06-0.06z m-184.113-91.992c25.99 0 42.913 16.79 42.913 42.575 0 25.188-16.923 42.579-42.913 42.579-25.45 0-51.38-16.85-51.38-42.58 0-25.784 25.93-42.574 51.38-42.574z m-239.544 85.154c-25.384 0-51.374-16.85-51.374-42.58 0-25.784 25.99-42.574 51.374-42.574 25.45 0 42.918 16.79 42.918 42.575 0 25.188-16.924 42.579-42.918 42.579z m736.155 271.655c0-135.647-136.725-246.527-290.983-246.527-162.655 0-290.918 110.88-290.918 246.527 0 136.128 128.263 246.587 290.918 246.587 33.972 0 68.423-8.395 102.818-16.85l93.809 50.973-25.93-84.677c68.907-51.93 120.286-119.815 120.286-196.033z m-385.275-42.58c-16.923 0-34.452-16.79-34.452-34.179 0-16.79 17.529-34.18 34.452-34.18 25.99 0 42.918 16.85 42.918 34.18 0 17.39-16.928 34.18-42.918 34.18z m188.165 0c-16.984 0-33.972-16.79-33.972-34.179 0-16.79 16.927-34.18 33.972-34.18 25.93 0 42.913 16.85 42.913 34.18 0 17.39-16.983 34.18-42.913 34.18z" fill="#09BB07" p-id="10885"></path></svg>',
      iconType: "svg",
      name: "微信",
      link: "/img/weixin.png",
    },
    {
      icon: '<svg t="1744689305785" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3367" width="200" height="200"><path d="M679.424 746.862l84.005-395.996c7.424-34.852-12.581-48.567-35.438-40.009L234.277 501.138c-33.72 13.13-33.134 32-5.706 40.558l126.282 39.424 293.156-184.576c13.714-9.143 26.295-3.986 16.018 5.157L426.898 615.973l-9.143 130.304c13.13 0 18.871-5.706 25.71-12.581l61.696-59.429 128 94.282c23.442 13.129 40.01 6.29 46.3-21.724zM1024 512c0 282.843-229.157 512-512 512S0 794.843 0 512 229.157 0 512 0s512 229.157 512 512z" fill="#1296DB" p-id="3368"></path></svg>',
      iconType: "svg",
      name: "Telegram",
      link: "https://t.me/sxdnbnb",
    },
  ],

  // 添加评论
  // comment: {
  // provider: "giscus",
  // provider: "twikoo",
  // options: {
  // twikoo 配置，官网：https://twikoo.js.org/
  // envId: "https://sxdnbnb.github.io/",
  // link: "https://cdn.jsdelivr.net/npm/twikoo@1.6.41/dist/twikoo.min.js",

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
  // },
  // },

  // 公告栏
  notice: {
    enabled: true,
    position: "center",
  },

  vitePlugins: {
    autoFrontmatter: true, //添加自动格式formatter插件
    permalinkOption: {
      notFoundDelayLoad: 1000, //404 页面延迟加载
    },

    sidebarOption: {
      // initItems: false, //这条命令注释后，才会让文档和目录的样式保持一致
      collapsed: true, //打开侧边栏自动收缩功能
    },

    autoFrontmatterOption: {
      transform: frontmatter => {
        // 如果文件本身存在了 coverImg，则不生成
        if (frontmatter.coverImg) return;

        const coverImg = coverImgList[Math.floor(Math.random() * coverImgList.length)];
        const transformResult = { ...frontmatter, coverImg };

        return Object.keys(transformResult).length ? transformResult : undefined;
      },
    }
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
          { text: '面试题', link: '/interview' },
          { text: '算法模板', link: '/algorithm' },
        ],
      },
      {
        text: "💖小屋",
        items: [
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
      { text: "🌄相册", link: "https://wxwx.i234.me/pichome/" },
      { text: "😍资源", link: "https://sun666.zone.id/" },
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
        link: "https://sxdnb.zone.id/"
      },
      {
        icon: {
          svg: '<svg t="1744342974706" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1512" width="200" height="200"><path d="M422.158764 938.671665L209.079297 724.114714a425.09105 425.09105 0 0 1 0-599.638915A415.860434 415.860434 0 0 1 506.887329 0.001463c112.815382 0 218.623688 43.885652 297.983574 124.503593a425.120307 425.120307 0 0 1 0 599.638915L591.791436 938.671665h304.273851a42.671482 42.671482 0 0 1 0 85.328335h-767.998903a42.671482 42.671482 0 0 1 0-85.328335z" fill="#1afa29" p-id="1513" data-spm-anchor-id="a313x.search_index.0.i4.620c3a81Vgvo8Q" class="selected"></path><path d="M313.176063 469.680335s-17.05689 22.527968-17.05689 33.016638 27.135961 9.654843 27.135961 9.654844l156.408462 0.848456-53.58438 181.496426s-5.295535 16.223063 7.314275 20.831056 22.601111-5.119993 22.601111-5.119993L703.831505 414.72087s18.007746-18.256431 13.165695-26.960418-25.599963-7.314275-25.599963-7.314275l-156.33532 2.735538 23.727509-201.873997s1.696912-8.952673-6.05622-11.775983-12.726839 4.183765-12.726839 4.183765z" fill="#FFFFFF" p-id="1514"></path></svg>'
        },
        link: "https://iikun.zone.id/"
      },
      {
        icon: {
          svg: '<svg t="1744859152070" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1462" width="200" height="200"><path d="M422.158764 938.671665L209.079297 724.114714a425.09105 425.09105 0 0 1 0-599.638915A415.860434 415.860434 0 0 1 506.887329 0.001463c112.815382 0 218.623688 43.885652 297.983574 124.503593a425.120307 425.120307 0 0 1 0 599.638915L591.791436 938.671665h304.273851a42.671482 42.671482 0 0 1 0 85.328335h-767.998903a42.671482 42.671482 0 0 1 0-85.328335z" fill="#d81e06" p-id="1463" data-spm-anchor-id="a313x.search_index.0.i4.620c3a81gbefHC" class="selected"></path><path d="M313.176063 469.680335s-17.05689 22.527968-17.05689 33.016638 27.135961 9.654843 27.135961 9.654844l156.408462 0.848456-53.58438 181.496426s-5.295535 16.223063 7.314275 20.831056 22.601111-5.119993 22.601111-5.119993L703.831505 414.72087s18.007746-18.256431 13.165695-26.960418-25.599963-7.314275-25.599963-7.314275l-156.33532 2.735538 23.727509-201.873997s1.696912-8.952673-6.05622-11.775983-12.726839 4.183765-12.726839 4.183765z" fill="#FFFFFF" p-id="1464"></path></svg>'
        },
        link: "https://sun66.zone.id/"
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
