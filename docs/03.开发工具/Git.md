---
date: 2024-08-28 12:53:24
description: Git的常用操作命令
title: Git
tags:
  - 工具
permalink: /develop/git
top: true
sticky: 5
categories:
  - 开发工具
coverImg: /ikun/ikun00000025.png
---



## 常用命令

### 初始化
![](/picture/git/T40Bb2E9Eo2cukxhpmDc2U2rnMf.png)

![](/picture/git/X4YabtkK5oUuPbxvZkfc2o5pn8c.png)

### 添加和提交

![](/picture/git/Z19DbLPPmoe0BFxG9wgc2cTEnOh.png)

### 查看状态和差异

![](/picture/git/EHaZb55cHofQpbxu1L4cqyVInRb.png)

### 远程仓库
![](/picture/git/WruKba4mro20nPxG8gcc8PaPngc.png)

### 合并分支

![](/picture/git/ARgbbIn1yoKSxrxvjy3cshdMnbT.png)

![](/picture/git/EEW1btyY6ojcL7xVM7Ccnc5KnXc.png)

### 撤销和恢复

![](/picture/git/KLWzb72uQoep7bxXbI4cFtEEn9F.png)

## Git分支管理策略
一种适应于5~10人开发团队的Git分支策略。

### 分支

分支包括固定分支和非固定分支。固定分支用于部署相应的环境，生命周期基本与代码仓库相同。非固定分支仅用于功能、缺陷或其他特定需求（例如安全组件修复）的开发，生命周期较短，与对应的需求缺陷相同。

#### 固定分支

alpha：合并频率较高，因此是不太稳定的分支，拥有最全的功能集。用于部署开发环境。团队内所有人都有管理权限； beta：相对稳定的分支，用于部署测试环境（准生产环境）。团队内所有人都有管理权限； master：最稳定的分支，用于部署生产环境。保护分支，仅部分人拥有管理权限，且分支的合并需要使用web端进行，不能在本地操作。 **固定分支属于公共分支，禁止使用 push -f 等命令。**

#### 非固定分支

以 feature-XXX-YYY-ZZZ 形式命名，其中XXX表示该分支实现的主要功能，YYY表示功能负责人，ZZZ表示时间。示例：feature-userReg-sxd-0622，表示该功能分支实现了用户注册的功能，由sxd负责功能的开发（如果多人协作开发一个功能，则是主要负责人），是0622这一天拉取的分支。 feature还可以替换为其他表示该分支特性的标志，例如

+   hotfix：热修复分支，用于修复生产问题
    
+   security：进行安全组件升级、安全漏洞修复的分支
    

### 功能开发的流程

1.  在最新的master分支上拉取功能分支，假设为feature-XXX-sxd-0622；
    
2.  在feature-XXX-sxd-0622进行开发和自测；
    
3.  将feature-XXX-sxd-0622合入alpha，这里不限制使用merge还是cherry-pick。建议使用cherry-pick。
    
4.  部署alpha分支，在开发环境上进行自测和联调；
    
5.  发现问题，继续在feature-XXX-sxd-0622上进行开发和修复，重复步骤3、4、5；
    
6.  当在alpha分支上进行了足够的测试后，验证功能已经比较完善了，则将**feature-XXX-sxd-0622上的多个commit进行rebase**，合并成一个commit。将新的commit cherry-pick 到beta分支；
    
7.  部署beta分支，在测试环境上继续进行测试，期间如果发现功能缺失或者有问题需要修复，则还是在feature-XXX-sxd-0622进行开发，然后重复步骤3、4、5、6；
    
8.  上线之前，将feature-XXX-sxd-0622分支上的commit进行rebase（保持仅有一个commit的状态），将新的commit cherry-pick到master。这一步操作是在web页面。
    

### 解决冲突

在将功能分支往固定分支合并的过程中，如果发现了代码冲突，那么需要在本地解决冲突之后，才能继续进行合并。 由于对固定分支采用了不同的权限管理模式，因此解决冲突的方式也不太相同。  
对于alpha和beta分支，由于合并的过程在本地，因此合并时即可同时解决冲突，然后再进行push。  
而对于master分支，合并的过程是在web端进行，因此合并时如果发现冲突，则需要按如下方式进行冲突的解决：

+   本地pull最新的master，基于最新的master分支拉取一个同名的feature分支（但最后的时间后缀不同）。假设原始功能分支为feature-XXX-sxd-0622，则可以拉取新的功能分支为feature-XXX-sxd-062215。
    
+   将feature-XXX-sxd-0622在本地cherry-pick到feature-XXX-sxd-062215，合并过程中解决冲突，解决完冲突后，将feature-XXX-sxd-062215 push到远程；
    
+   在web端将feature-XXX-sxd-062215 cherry-pick到master。
    

### 分支清理

对于开发人员本地，可以仅保留alpha、beta、master分支，功能分支在完成上线之后即可进行git branch -D feature-XXX-sxd-062215的操作。  
对于远程的git仓库，则可以设置定期清理策略，例如清理1年前的非活跃功能分支。

### 参考

1.  [Git 工作流程](https://www.ruanyifeng.com/blog/2015/12/picture/git-workflow.html)
    
2.  [Git之GitFlow工作流 | Gitflow Workflow](https://blog.csdn.net/sunyctf/article/details/130587970)


## 注意

### 1.main/master 分支不要动
要把 dev 分支合并到 master 分支的时候：

1. 切换到 master 分支，pull 一下最新的代码，保证本地的 master 分支代码是最新的
2. 切换到 dev 分支，把 master 分支合并到 dev 分支，并处理冲突
3. 切换到 master 分支，pull 一下最新的代码，合并 dev 分支到 master 分支，push 一下

### 2.新建分支需符合命名规范
分支命名规范：`feature / release_版本号`，其中`feature`表示开发版本，`release`则是上线版本，版本号格式为`年月日`，例如新建`feature_20240711`分支，表示该系统20240711开发版本分支。

### 3.合并分支注意Merge和Rebase
![alt text](/picture/git/image.png)
假设在 `master` 分支上的新提交与你正在开发的 `feature` 相关。需要将新提交合并到你的 `feature` 分支中，你可以有两个选择：`merge` 或者 `rebase`。

- `merge`操作会保留`feature`分支的提交记录，另外创建一个合并提交，在`git log`上显示为两条线合并到一个节点，会保留两个分支的独立历史以及它们合并的信息。\
另一方面，这也意味着 `feature` 分支每次需要合并上游更改时，它都将产生一个额外的合并提交。如果`master` 提交非常活跃，这可能会严重污染你的 `feature` 分支历史记录。
![alt text](/picture/git/image-1.png)

- `rebase`会将整个 `feature` 分支移动到 `master` 分支的顶端，从而有效地整合了所有 `master` 分支上的提交。但是，与 `merge` 提交方式不同，`rebase` 通过为原始分支中的每个提交创建全新的 `commits` 来 重写 项目历史记录。
![alt text](/picture/git/image-2.png)

`rebase` 的主要好处是可以获得更清晰的项目历史。首先，它消除了 `git merge` 所需的不必要的合并提交；其次，正如你在上图中所看到的，`rebase` 会产生完美线性的项目历史记录，你可以在 `feature`分支上没有任何分叉的情况下一直追寻到项目的初始提交。这样可以通过命令 `git log，git bisect 和 gitk` 更容易导航查看项目。
但是，`rebase` 会丢失合并提交的上下文，你也就无法看到上游更改是何时合并到 feature 中的。
> `git rebase` 的黄金法则是永远不要在公共分支上使用它。
![alt text](/picture/git/image-3.png)

当与另一个开发人员协作使用相同的功能并且你需要将他们的更改合并到你的 repository 时, 使用`rebase`。
比如你和另一个名为 John 的开发人员添加了对 `feature` 分支的提交，在你 `fetch` (注意 `fetch` 并不会自动 `merge` )来自 John 的远程 `feature`分支后，你的 repository 可能如下所示：
![alt text](/picture/git/image-4.png)

你可以整合上来自上游的分叉：要么用 `john/feature merge 本地 feature` ，要么 `rebase 本地feature 到john/feature` 的顶部。

![alt text](/picture/git/image-5.png)

![alt text](/picture/git/image-6.png)

![alt text](/picture/git/image-7.png)

请注意，此 `rebase` 不违反 `Rebase 黄金规则`，因为只有你的本地 `feature` 提交被移动， 之前的所有内容都不会受到影响。这就像是说 "将我的更改添加到 John 已经完成的工作中"。在大多数情况下，这比通过合并提交与远程分支同步更直观。

默认情况下，使用 `git pull` 命令执行合并，但你可以通过向其传递 `--rebase` 选项来强制它将远程分支 以 `rebase` 方式集成。

>git pull --rebase

总结：
1. 从远程仓库拉取到本地分支选择`Rebase`方式保证提交记录log的简洁性（一条直线）
2. 个人提交代码时，先拉取代码到本地再提交，若有冲突，选择`Merge`方式解决并第一时间联系冲突代码提交者协商
3. 若出现了提交失误，则选中`git log`使用`revert`撤销提交，修改后重新commit、push
4. 若出现合并出错，需立马联系权限管理员删除分支重新拉取（锁分支之前，确保没有其他提交）



