---
date: 2024-07-14 20:52:35
description: 基于Springboot实现的图书管理系统，总结了Lombok 常用注解、MyBatis-Plus实体类注解、Mybatis-Plus CRUD 操作。
title: 图书管理系统Demo
tags:
  - 项目
permalink: /project/library
coverImg:
  - https://www.yotu.net/i/67f4fa40bc739.png
categories:
  - Springboot项目
---

## [![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sxdnbnb/picture/libraryDemo)
## 项目目录结构
```Bash
├─java
│  └─com
│      └─library
│          │  libraryApplication.java  // SpringApplication.run文件
│          │  
│          ├─config // 各种配置
│          │      
│          ├─controller // 前端接控制器
│          │      
│          ├─dto //Data Transfer Object，重构类，仅保留需要的属性
│          │      
│          ├─entity // 实体类
│          │      
│          ├─mapper // mybatis需求
│          │      
│          ├─service // 服务端接口
│          │  │  
│          │  └─impl // 服务端接口的实现类
│          │          
│          └─utils // 工具类
│                  
└─resources
    └─application.yaml // Springboot的配置
```
> Windows生成项目目录结构
>1. 用powershell打开需要生成项目结构的目录
>2. 输入`tree /f >project.txt`然后回车即可生成项目目录结构（project.txt为指定生成的项目结构文件）

## 数据库设计
```sql
-- 创建数据库
CREATE DATABASE IF NOT EXISTS book_management;
USE book_management;

-- 创建books表
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL, -- 书名
    author VARCHAR(255) NOT NULL, -- 作者
    price DECIMAL(10, 2) NOT NULL, -- 价格
    category VARCHAR(255) -- 类别
);

-- 插入数据
INSERT INTO books (title, author, price, category) VALUES 
('杀死一只知更鸟', '哈珀·李', 10.99, '小说'),
('1984', '乔治·奥威尔', 9.99, '小说'),
('魔戒', 'J.R.R. 托尔金', 20.99, '奇幻'),
('麦田里的守望者', 'J.D. 塞林格', 15.99, '小说'),
('了不起的盖茨比', 'F. 斯科特·菲茨杰拉德', 14.99, '小说'),
('傲慢与偏见', '简·奥斯汀', 12.99, '浪漫'),
('年轻女孩的日记', '安妮·弗兰克', 11.99, '传记'),
('哈利·波特与魔法石', 'J.K. 罗琳', 10.99, '奇幻'),
('霍比特人', 'J.R.R. 托尔金', 10.99, '奇幻'),
('动物农场', '乔治·奥威尔', 8.99, '小说');
```
![Alt text](/picture/library/image-4.png)
## 项目创建
1. 创建Springboot项目
![Alt text](/picture/library/image.png)
2. 添加Maven依赖
![Alt text](/picture/library/image-1.png)

```xml
<!--pom.xml文件内容 -->
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.0</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.example</groupId>
    <artifactId>libraryDemo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>libraryDemo</name>
    <description>libraryDemo</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.5.5</version>
            <!--这个版本的mybatis-plus中的mybatis-spring版本太老，需要排除依赖-->
            <exclusions>
                <exclusion>
                    <artifactId>mybatis-spring</artifactId>
                    <groupId>org.mybatis</groupId>
                </exclusion>
            </exclusions>
        </dependency>
        <!--导入高版本的mybatis-spring依赖-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>3.0.3</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>

```
3. 删除多余的文件，完善目录结构
![Alt text](/picture/library/image-2.png)
4. 编写Springboot的配置文件application.yaml
```yaml
server:
  port: 8081
spring:
  application:
    name: library
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/book_management?useSSL=false&serverTimezone=UTC
    username: "root"
    password: "6446530"
  jackson:
    default-property-inclusion: non_null # JSON处理时忽略非空字段
mybatis-plus:
  type-aliases-package: com.example.librarydemo.entity # 别名扫描包
logging:
  level:
    com.example.librarydemo: debug

```
5. entity中创建实体类
```java
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("books") // mybatis-plus的注解，表名
public class Book implements Serializable {
    private static final long serialVersionUID = 1L; // 定义一个常量，用于实现序列化
    // 主键
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    // 书名
    private String title;
    // 作者
    private String author;
    // 价格
    private Long price;
    // 类型
    private String category;
}
```
6. config中创建 MybatisConfig 和 WebExceptionAdvice类
```java
@Configuration
public class MybatisConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
```
```java
@Slf4j
@RestControllerAdvice
public class WebExceptionAdvice {

    @ExceptionHandler(RuntimeException.class)
    public Result handleRuntimeException(RuntimeException e) {
        log.error(e.toString(), e);
        return Result.fail("服务器异常");
    }
}
```
7. dto中创建服务器响应结果类
```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    private Boolean success;
    private String errorMsg;
    private Object data;
    private Long total;

    public static Result ok(){
        return new Result(true, null, null, null);
    }
    public static Result ok(Object data){
        return new Result(true, null, data, null);
    }
    public static Result ok(List<?> data, Long total){
        return new Result(true, null, data, total);
    }
    public static Result fail(String errorMsg){
        return new Result(false, errorMsg, null, null);
    }
}
```
8. mapper中创建操作实体类的BookMapper接口，继承mybatisplus提供的BaseMapper接口, 然后启动类`LibraryDemoApplication.class`上加注解`@MapperScan("com.example.librarydemo.mapper")`扫描 Mapper 类
```java
public interface BookMapper extends BaseMapper<Book> {
    
}
```

9. service中定义功能接口
```java
public interface IBookService extends IService<Book> {
    Result queryBookById(Long id); // 根据id查询
    Result queryBookByTitle(String title); // 根据名字查询
    Result queryBookByAuthor(String author); // 根据作者查询
    Result queryBookByCategory(String category); // 根据类型查询

    Result updateBook(Book book); // 更新图书

    Result addBook(Book book); // 添加图书

    Result deleteById(Book book); // 删除图书
}
```
10. impl中创建实现功能接口的实现类，继承mybatisplus的ServiceImpl类
```java
// @Slf4j
@Service
public class BookServiceImpl extends ServiceImpl<BookMapper, Book> implements IBookService {

    @Override
    public Result queryBookById(Long id) {
        Book book = getById(id);
        if (book == null){
            return Result.fail("图书不存在");
        }
        // log.debug("图书id为：{}", id);
        return Result.ok(book);
    }

    @Override
    public Result queryBookByTitle(String title) {
        List<Book> books = query().eq("title", title).list();
        if (books == null){
            return Result.fail("图书不存在");
        }
        return Result.ok(books);
    }

    @Override
    public Result queryBookByAuthor(String author) {
        List<Book> books = query().eq("author", author).list();
        if (books == null){
            return Result.fail("图书不存在");
        }
        return Result.ok(books);
    }

    @Override
    public Result queryBookByCategory(String category) {
        List<Book> books = query().eq("category", category).list();
        if (books == null){
            return Result.fail("图书不存在");
        }
        return Result.ok(books);
    }

    @Override
    @Transactional   // 开启事务
    public Result updateBook(Book book) {
        Long id = book.getId();
        if (id == null) {
            return Result.fail("图书id不能为空！");
        }
        // 更新数据库
        updateById(book);
        return Result.ok();
    }

    @Override
    @Transactional   // 开启事务
    public Result addBook(Book book) {
        if (book.getAuthor() == null || book.getTitle() == null || book.getPrice() == null || book.getCategory() == null) {
            return Result.fail("图书信息输入有误");
        }
        // 添加到数据库
        save(book);
        // 返回图书id
        return Result.ok(book.getId());
    }

    @Override
    @Transactional   // 开启事务
    public Result deleteById(Book book) {
        Long id = book.getId();
        if (id == null) {
            return Result.fail("图书不存在");
        }
        // 删除数据库
        removeById(book);
        return Result.ok();
    }
}
```

11. controller中创建BookController类
```java
@RestController
@RequestMapping("/book")
public class BookController {
    @Resource
    public IBookService bookService;

    // 根据id查询
    @GetMapping("/{id}")
    public Result queryBookById(@PathVariable("id") Long id) {
        return bookService.queryBookById(id);
    }

    // 根据名字查询
    @GetMapping("/title")
    public Result queryBookByTitle(@RequestParam("title") String title) {
        return bookService.queryBookByTitle(title);
    }

    // 根据作者查询
    @GetMapping("/author")
    public Result queryBookByAuthor(@RequestParam("author") String author) {
        return bookService.queryBookByAuthor(author);
    }

    // 根据类型查询
    @GetMapping("/category")
    public Result queryBookByCategory(@RequestParam("category") String category) {
        return bookService.queryBookByCategory(category);
    }

    // 更新图书
    @PutMapping
    public Result updateBook(@RequestBody Book book){
        return bookService.updateBook(book);
    }

    // 添加图书
    @PostMapping
    public Result addBook(@RequestBody Book book){
        return bookService.addBook(book);
    }

    // 删除图书
    @DeleteMapping
    public Result deleteByTitle(@RequestBody Book book){
        return bookService.deleteById(book);
    }

}
```
12. Postman进行接口测试
![Alt text](/picture/library/image-5.png)
![Alt text](/picture/library/image-6.png)
![Alt text](/picture/library/image-7.png)
![Alt text](/picture/library/image-8.png)
![Alt text](/picture/library/image-9.png)
![Alt text](/picture/library/image-10.png)
![Alt text](/picture/library/image-11.png)

## 引入redis做缓存
1. maven添加依赖
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.7.17</version>
</dependency>
```

2. 配置文件添加
```yaml
  data:
    redis:
      host: 172.31.177.123
      port: 6379
      #  password: 
      database: 1
      lettuce:
        pool:
          max-active: 10
          max-idle: 10
          min-idle: 1
          time-between-eviction-runs: 10s
```

3. utils中添加RedisConstants类
```java
public class RedisConstants {
    public static final Long CACHE_Book_TTL = 30L;
    public static final String CACHE_Book_KEY = "cache:book:";

    public static final Long CACHE_NULL_TTL = 2L;
}
```

4. 改造BookServiceImpl.class，增加redis缓存
```java
public class BookServiceImpl extends ServiceImpl<BookMapper, Book> implements IBookService {
    @Resource
    private StringRedisTemplate stringRedisTemplate;

    // 使用redis缓存
    @Override
    public Result queryBookById(Long id) {
        String key = CACHE_Book_KEY + id;
        // 1.从redis查询书籍缓存
        String bookJson = stringRedisTemplate.opsForValue().get(key);
        // 2.判断是否存在
        if (StrUtil.isNotBlank(bookJson)) {
            // 3.存在，直接返回
            Book book = JSONUtil.toBean(bookJson, Book.class);
            return Result.ok(book);
        }
        // 判断命中的是否是空值
        if (bookJson != null) {
            // 返回一个错误信息
            return Result.fail("图书信息不存在！");
        }

        // 4.不存在，根据id查询数据库
        Book book = getById(id);
        // 5.不存在，返回错误
        if (book == null) {
            // 将空值写入redis
            stringRedisTemplate.opsForValue().set(key, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
            // 返回错误信息
            return Result.fail("图书不存在！");
        }
        // 6.存在，写入redis
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(book), CACHE_Book_TTL, TimeUnit.MINUTES);
        // 7.返回
        return Result.ok(book);
    }
    
    @Override
    @Transactional   // 开启事务
    public Result updateBook(Book book) {
        Long id = book.getId();
        if (id == null) {
            return Result.fail("图书id不能为空！");
        }
        // 1.更新数据库
        updateById(book);
        // 2.删除缓存
        stringRedisTemplate.delete(CACHE_Book_KEY + id);
        return Result.ok();
    }

    @Override
    @Transactional   // 开启事务
    public Result deleteById(Book book) {
        Long id = book.getId();
        if (id == null) {
            return Result.fail("图书不存在");
        }
        // 1.删除数据库
        removeById(book);
        // 2.删除缓存
        stringRedisTemplate.delete(CACHE_Book_KEY + id);
        return Result.ok();
    }
}
```

5. Postman进行接口测试

查询时，redis中成功写入缓存，再查询时直接从缓存中得到结果。
![Alt text](/picture/library/image-14.png)
![Alt text](/picture/library/image-15.png)

更新时，数据库被更改，redis中的缓存被删除。
![Alt text](/picture/library/image-16.png)
![Alt text](/picture/library/image-17.png)

