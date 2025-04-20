---
date: 2024-06-05 20:53:24
description: Maven的常用操作
title: Maven
tags:
  - 工具
permalink: /develop/Maven
coverImg:
  - https://www.yotu.net/i/67f4f78eb26a5.png
categories:
  - 开发工具
---


## **解决依赖冲突**

我们可以通过 `exclusion`

```xml
<dependency>
    ......
    <exclusions>
      <exclusion>
        <artifactId>x</artifactId>
        <groupId>org.apache.x</groupId>
      </exclusion>
    </exclusions>
</dependency>
```

一般我们在解决依赖冲突的时候，都会优先保留版本较高的。这是因为大部分 jar 在升级的时候都会做到向下兼容。

## Maven 的生命周期

就是为了对所有的构建过程进行抽象和统一，包含了项目的清理；初始化、编译、测试、打包、集成测试、验证；部署和站点生成等构建步骤。

![](/picture/maven/YoU5brR4QopnNQxJMAocaS5Pncb.png)

Maven 定义了 3 个生命周期 `META-INF/plexus/components.xml`：

- `default` 生命周期
- `clean` 生命周期
- `site` 生命周期

Maven 生命周期是由几个不同的构建阶段组成，包括 validate、compile、test、package、verify、install 和 deploy 等，clean 和 site 是其中一个单独的独立生命周期。

这些生命周期是相互独立的，每个生命周期包含多个阶段(phase)。并且，这些阶段是有序的，也就是说，后面的阶段依赖于前面的阶段。当执行某个阶段的时候，会先执行它前面的阶段。

当我们执行 `mvn test` 命令的时候，会执行从 validate 到 test 的所有阶段，这也就解释了为什么执行测试的时候，项目的代码能够自动编译。

`mvn clean` 命令通常用于删除所有生成的文件，如编译的.class 文件和构建的 JAR 文件等。

如果你想在运行测试之前清理构建，你可以组合使用 `mvn clean test` 命令，这样会先执行 clean 生命周期，然后再执行到 test 阶段的任务。

## 创建 Maven 工程

1. 解压部署 Maven 核心程序

   ```
    ① 检查JAVA_HOME环境变量

    ② 解压Maven的核心程序

    ③ 配置环境变量

    ④ 查看Maven版本信息验证安装是否正确
   ```

```bash
mvn -v
```

1. 修改本地仓库
   ① 指定本地仓库位置的配置信息文件：apache-maven\conf\settings.xml

   ```
    ② 在根标签settings下添加如下内容：<localRepository>[本地仓库路径，也就是RepMaven.zip的解压目录]</localRepository>
   ```
2. 第一个 Maven 工程

   ```
    ① 目录结构

            Hello

            |---src

            |---|---main

            |---|---|---java

            |---|---|---resources

            |---|---test

            |---|---|---java

            |---|---|---resources

            |---pom.xml



    ② POM文件内容
   ```

```bash
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>org.example</groupId>
  <artifactId>pro02</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>pom</packaging>

  <name>pro02</name>
  <url>http://maven.apache.org</url>
  <modules>
    <module>pro03</module>
  </modules>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
```

```
    ③编写主程序代码

            在src/main/java/maven目录下新建文件Hello.java，内容如下
```

```bash
public class Hello {
    public void showMessage(){
        System._out_.println("Hello maven!I an in idea now!");
    }
}
```

```
    ④编写测试代码

            在/src/test/java/maven目录下新建测试文件HelloTest.java
```

```bash
import org.junit.Test;

public class HelloTest {

    @Test
    public void testHello(){
        Hello hello = new Hello();
        hello.showMessage();
    }
}
```

```
    ⑤运行几个基本的Maven命令
```

```bash
mvn compile        //编译
```

```bash
mvn clean        //清理
```

```bash
mvn test        //测试
```

```bash
mvn package        //打包
```

※注意：运行 Maven 命令时一定要进入 pom.xml 文件所在的目录！
