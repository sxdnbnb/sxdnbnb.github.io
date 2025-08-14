---
date: 2024-07-29 04:53:24
description: IDEA常用的设置和插件
title: IDEA
tags:
  - 工具
permalink: /develop/IDEA
categories:
  - 开发工具
coverImg: /ikun/ikun00000030.png
---


## 自动导包

1. 点击菜单 File -> Preferences / Settings -> Editor -> General -> Auto Import。
2. 勾选上下图中的两个选项，点击应用。

![](/picture/IDEA/VKzlbzTKTolHgRxy5oscB62VnNh.png)

1. IDEA 会帮助你自动导入包（唯一确定时才会生效），以及删除没有被用到的导入包。
2. 快捷键：删除没有被用到的导入包 Ctrl + Alt + O。

## Idea 行注释设置

步骤：File–>Sttings–>Editor–>Code Style （以 Java 和 XML 为例，设置都是相同的）

![](/picture/IDEA/D4zrbsoIUo9TsjxwgM0cONIbnDb.png)

![](/picture/IDEA/HOq6b26W8odu63xQLMacVMX7nwh.png)

## 常用插件

1. **Codota 代码智能提示插件**
只要打出首字母就能联想出一整条语句，这也太智能了，还显示了每条语句使用频率。原因是它学习了我的项目代码，总结出了我的代码偏好。

2. **Key Promoter X 快捷键提示插件**
安装这个插件后，每次都会在右下角弹窗提示，帮助我们快速熟悉快捷键。

3. **CodeGlance 显示代码缩略图插件**
当你的代码写了很长很长的时候，需要快速跳到某个方法时，这款代码缩略图可就太好用了。

4. **Lombok 简化臃肿代码插件**
编程中，往往需要在实体类定义各种字段，那么就需要写 get/set/构造/toString/hashCode 等方法，有了这款插件，就不需要再写这些繁琐的代码了。

5. **Alibaba Java Coding Guidelines 阿里巴巴代码规范检查插件**
这款插件会按照阿里 Java 开发手册中的规范帮我们检查代码，然后对代码做不同颜色展示，鼠标放上去，会看到提示内容，帮助我们写出更规范的代码。

6. **CamelCase 驼峰命名和下划线命名转换插件**
这几种风格的命名方式，用快捷键 _⇧ + ⌥ + U / Shift + Alt + U_ 可以进行快速转换，当我们需要修改大量变量名称的时候很方便。

7. **MybatisX 高效操作 Mybatis 插件**
8. **SonarLint 代码质量检查插件**
插件提示不要用 `System.out` 输出，要用 `logger` 日志类进行输出，诸如此类，帮助我们提升代码质量。

9. **Save Actions 格式化代码插件**
可以帮忙我们优化包导入，自动给没有修改的变量添加 `final` 修饰符，调用方法的时候自动添加 `this` 关键字等，使我们的代码更规范统一。

10.  **CheckStyle 代码风格检查插件**
此插件功能跟上面提到的 _Alibaba Java Coding Guidelines_ 功能类似，你可以分别试用一下，选择一个自己喜欢的。

11. **Grep Console 自定义控制台输出格式插件**
12. **MetricsReloaded 代码复杂度检查插件**
13. **Statistic 代码统计插件**
14. **Translation 翻译插件**
15. **Rainbow Brackets 彩虹括号插件**
成对儿的括号会显示相同的颜色，有了这个插件，可以方便的区分处于同一块的代码。

16. **Git Commit Template** 
用于创建 3 段式的 Commit Message
17. **GitToolBox** 
显示当前行的提交信息
支持 commit message 的正则校验，可以基于此做规划化的消息提交
便捷的分支管理

18.  **String Manipulation** 字符串操作插件
可以转换字符串大小写、驼峰命名转换、去除空格等，默认配置了快捷键 Alt+S，选中字符串连续按快捷键可以转换

19. **Jump to Line** Idea 调试神器
Jump to Line 插件允许您在调试时访问任何一行代码。将黄色箭头拖放到 gutter 中所需的位置，它将在那里放置一个执行点。与单步执行不同，该插件允许您从该点开始运行程序，而无需执行前面的代码（注：相当于前面的代码没有了）。
