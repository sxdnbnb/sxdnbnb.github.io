---
description: MyBatis中mapper.xml的语法
title: MyBatis
# readingTime: false
tag:
 - 开发工具
top: 11     # 排序
sticky: 90  # 精选文章热度
recommend: 5 # 推荐文章排序
# sidebar: false # 侧边栏
# author: 暮冬浅夏
---
# MyBatis中mapper.xml的语法
## 一、前言
MyBatis是"半自动"的ORM框架，即SQL语句需要开发者自定义，MyBatis的关注点在POJO与SQL之间的映射关系。那么SQL语句在哪里配置自定义呢？就在Mapper.xml中配置。当然了该配置文件可以自定义文件名。文件的样式如下：
```xml
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.scau.demo.mapper.UserMapper">
## ...具体内容...
</mapper>
```
其中，namespace用于绑定Mapper接口。不同mapper接口对应到不同的xml。

## 二、mapper.xml
- **mapper**：指定唯一的namespace，一般设置成mapper类的全路径名。
- **insert**：对应SQL中的insert插入语句。
**id**：为该语句的属性，通常与mapper java 文件的方法名相同。
**parameterType**：参入插入语句的参数类型。
**useGeneratedKeys**：主键使用数据库自增策略，需要数据库底层支持，并返回主键到keyProperty指定的属性名。
**keyProperty**：指示主键映射到实体类的属性名。
```xml
  <mapper namespace="org.mybatis.mapper.UserMapper">
      <!-- useGeneratedKeys:返回主键
           keyProperty:返回的主键对应实体类的属性字段
      -->
      <insert id="saveUser" parameterType="com.mybatis.domain.User" useGeneratedKeys="true" keyProperty="id">
          insert into user values(#{id},#{username},#{birthday},#{sex},#{address})
      </insert>
  </mapper>
```
## 三、sql代码段
这个元素可以被用来定义可重用的 SQL 代码段，可以包含在其他语句中。它可以被静态地(在加载参数) 参数化. 不同的属性值通过包含的实例变化。
```xml
<sql id="userColumns"> ${alias}.id,${alias}.username,${alias}.password </sql>
 
<select id="selectUsers" resultType="map">
  select
    <include refid="userColumns"><property name="alias" value="t1"/></include>,
    <include refid="userColumns"><property name="alias" value="t2"/></include>
  from some_table t1
    cross join some_table t2
</select>
```
## 四、parameterType
如果传递的是简单的参数，是简单的数据类型，参数类型可以省略，原生的类型或简单数据类型（比如整型和字符串）因为没有相关属性，它会完全用参数值来替代。

1. 省略参数
  ```xml
  <select id="selectUsers" resultType="User">
    select * from user  where id = #{id}
  </select>
  ```
2. 传递对象
  参数类型是个User对象，User 类型的参数对象传递到了语句中，id、username 和 password 属性将会被查找，然后将它们的值传入预处理语句的参数中。
  ```xml
  <insert id="insertUser" parameterType="User">
    insert into users (id, username, password) values (#{id}, #{username}, #{password})
  </insert>
  ```

3. 指定参数类型
参数也可以指定一个特殊的数据类型。
`#{property,javaType=int,jdbcType=NUMERIC}`
对于数值类型，还有一个小数保留位数的设置，来确定小数点后保留的位数。
`#{height,javaType=double,jdbcType=NUMERIC,numericScale=2}`
## 五、XML转义字符
少部分特殊字符写入到 XML 文件会被 XML 语法检测报错,XML为这些字符提供了转义

特殊字符| 转义字符|说明
-------|----------|------
\>     |\&lt;     |大于
\<     |\&gt;     |小于
&      |\&amp;    |并
'      |\&apos;   |单引号
"      |\&quot;   |双引号

在 XML 中写 SQL，用到特殊字符的可用转义字符替换。
但使用转义字符比较麻烦，不容易记住，可使用`<![CDATA[ ]]>`标记里面的内容不被 XML 解析器解析，保留为文本。
`<![CDATA[ SELECT * FROM  user WHERE  age  <= 30 AND age >= 18 ]]>`
六、模糊查询
mapper.xml 中写模湖查询需要使用 `concat` 来连接

 `like concat('%', #{param}, '%')`  或者 `like '%${param}%'`  --推荐使用前者，可以避免sql注入。
七、其他
 1. ${ } 和 #{}的区别

`#`可以防止sql注入 而 `$` 不能
```xml
<!--    如果存在表  删除表   #和$的区别  $可以防止sql注入 #不行  $是将传入的值直接显示 不会进行转换
    比如  select * from user where name =#{name}  如果name是jack  翻译成 name ='jack'
         select * from user where name =${name}  如果name是jack  翻译成 name = jack
-->
```
2. if test的语法使用

一般在列表页面,有多个查询条件,并且不确定条件是否使用的时候可以使用 if test语法

Mapper
```xml
//这里需要注意的是,一般持久层中,查询条件多个两个的时候最好创建一PO模型
 List<UserInfoVo> findByKeywords(Map<String,String) param)
 //如果这里使用了@Param("param")注解的时候,在xml映射中,需要使用param.xxx的方式获取参数
```
xxmaper.xml
```xml
<select id ="findByKeywords" parameterType="java.util.Map" resultType="com.example.test.vo.UserInfoVo>
 SELECT * from user where user_type =1 
 <if test="username != null">
    and username like concat('%',#{username},'%)
 </if>
 
 <!-- 如果持久层中使用注解@Param时候,这里获取参数值的方式为 param.idnumber-->
 <if test="idnumber != null">
    and idnumber like concat('%',#{idnumber},'%')
 </if>
</select>
```