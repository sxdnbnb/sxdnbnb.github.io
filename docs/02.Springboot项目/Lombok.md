---
date: 2024-08-15 21:21:38
description: Lombok 常用注解
title: Lombok
tags:
  - 工具
permalink: /project/Lombok
coverImg:
  - https://www.yotu.net/i/67f4f78b2aaa0.png
categories:
  - 开发工具
---

# Lombok
## Lombok 常用注解
>Lombok是一个编译时注释预处理器，有助于在编译时注入一些代码。Lombok提供了一组在开发时处理的注释，以将代码注入到Java应用程序中，注入的代码在开发环境中立即可用。
### @Data 
  注解在类上；提供类**所有属性**的 getting 和 setting 方法，此外还提供了equals、canEqual、hashCode、toString 方法

### @Setter / @Getter 
  注解在**属性或类**上；为属性提供 Setter/Getter 方法

### @Value 
  此注解集@equals()、@hashCode()、@toString()、@Getter()于一身。
  
### @NoArgsConstructor / @AllArgsConstructor
  自动生成无参数构造函数/全参构造函数。

### @ToString
  用于自动生成类的 toString() 方法

### @EqualsAndHashCode
  用于自动生成 equals() 和 hashCode() 方法。

### @SneakyThrows
  用于在方法中抛出受检查异常（checked exception）而无需在方法签名中声明或捕获异常。

### @Builder
  当使用 @Builder 注解时，Lombok 会在编译过程中生成一个新的内部类，该内部类包含所有字段的 setter 方法，以及一个 build() 方法用于创建对象。这个内部类的名称可以根据配置的 builderClassName 属性进行自定义。

### @NonNull 
  修饰方法、构造函数的参数或者类字段，Lombok自动生成一个非空检测语句。

### @Log4j / @Slf4j
  注解在类上；为类提供一个 属性名为log的日志对象

### @Accessors 
  当属性字段在生成 getter 和 setter 方法时，做一些相关的设置。当它可作用于类上时，修饰类中所有字段，当作用于具体字段时，只对该字段有效。
  - fluent 属性\
    不写默认为false，当该值为 true 时，对应字段的 getter 方法前面没有 get，setter 方法前没有 set。
    `s.setName("jack") -> s.name("jack")` , 
    `String name = s.getName() -> String name = s.name()`
  - chain 属性\
    不写默认为false，当该值为 true 时，对应字段的 setter 方法调用后，会返回当前对象。
    `Student stu = s.setName("jack")`
  - prefix 属性\
    该属性是一个字符串数组，当该数组有值时，表示忽略字段中对应的前缀，生成对应的 getter 和 setter 方法。
    ![Alt text](/library/image-3.png)