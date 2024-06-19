---
description: Git的常用操作命令
title: Git
# readingTime: false
tag:
 - 开发工具
top: 7     # 排序
sticky: 98  # 精选文章热度
recommend: 1 # 推荐文章排序
# sidebar: false # 侧边栏
# author: 暮冬浅夏
---
# Git 笔记

## 常用命令

### 初始化

![](git/T40Bb2E9Eo2cukxhpmDc2U2rnMf.png)

![](git/X4YabtkK5oUuPbxvZkfc2o5pn8c.png)

### 添加和提交

![](git/Z19DbLPPmoe0BFxG9wgc2cTEnOh.png)

### 查看状态和差异

![](git/EHaZb55cHofQpbxu1L4cqyVInRb.png)

### 远程仓库
![](git/WruKba4mro20nPxG8gcc8PaPngc.png)

### 合并分支

![](git/ARgbbIn1yoKSxrxvjy3cshdMnbT.png)

![](git/EEW1btyY6ojcL7xVM7Ccnc5KnXc.png)

### 撤销和恢复

![](git/KLWzb72uQoep7bxXbI4cFtEEn9F.png)

## 注意

**main/master 分支不要动**

要把 dev 分支合并到 master 分支的时候：

1. 切换到 master 分支，pull 一下最新的代码，保证本地的 master 分支代码是最新的
2. 切换到 dev 分支，把 master 分支合并到 dev 分支，并处理冲突
3. 切换到 master 分支，pull 一下最新的代码，合并 dev 分支到 master 分支，push 一下
