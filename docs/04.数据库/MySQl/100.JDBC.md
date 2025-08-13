---
date: 2025-08-13 16:31:47
description: JDBC连接MySQL数据库
title: JDBC连接
tags:
  - 数据库
permalink: /database/JDBC
categories:
  - 数据库
  - MySQl
coverImg: https://www.yotu.net/i/67f4f78b2aaa0.png
---

## Maven Java 项目连接 MySQL 数据库
---

### 1. 添加 MySQL 依赖

在 `pom.xml` 里加 MySQL Connector/J 驱动：

```xml
<dependencies>
    <!-- MySQL JDBC Driver -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
</dependencies>
```

> **注意**：MySQL 8.x 版本建议使用 `com.mysql.cj.jdbc.Driver`，如果是 MySQL 5.x 用 `com.mysql.jdbc.Driver`。

---

### 2. 创建 Java 类连接 MySQL

假设你的数据库信息如下：

* 数据库名：`school`
* 用户名：`root`
* 密码：`123456`
* 地址：`localhost:3306`

新建 `DBTest.java`：

```java
import java.sql.*;

public class DBTest {
    public static void main(String[] args) {
        // JDBC URL，注意 MySQL 8.x 需要加时区参数 serverTimezone
        String url = "jdbc:mysql://localhost:3306/school?useSSL=false&serverTimezone=UTC";
        String user = "root";
        String password = "123456";

        try {
            // 1. 加载驱动（MySQL 8 可以省略这行）
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. 建立连接
            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("✅ 数据库连接成功！");

            // 3. 执行查询
            String sql = "SELECT * FROM t_student";
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);

            // 4. 遍历结果
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                System.out.println(id + " - " + name);
            }

            // 5. 关闭资源
            rs.close();
            stmt.close();
            conn.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

### 3. 运行项目

* 用 `mvn compile` 编译
* 用 `mvn exec:java` 运行，或者直接在 IDE 里运行 `DBTest`

---

### 4. 常见问题

1. **时区错误**

   * MySQL 8.x 需要加 `serverTimezone=UTC` 或 `Asia/Shanghai`
2. **驱动找不到**

   * 确保 `pom.xml` 已添加 MySQL 依赖并执行了 `mvn install`
3. **权限不足**

   * 确保数据库用户有访问权限

---

## 常用的类和方法


### **1. DriverManager**

> 管理数据库驱动，建立数据库连接

| 方法                                                                          | 说明                     |
| --------------------------------------------------------------------------- | ---------------------- |
| `static Connection getConnection(String url, String user, String password)` | 连接数据库                  |
| `static Connection getConnection(String url, Properties info)`              | 使用 `Properties` 连接数据库  |
| `static void registerDriver(Driver driver)`                                 | 注册驱动（一般由 JDBC 驱动类自动完成） |

---

### **2. Connection**

> 表示一个数据库连接对象

| 方法                                               | 说明             |
| ------------------------------------------------ | -------------- |
| `Statement createStatement()`                    | 创建普通 SQL 执行对象  |
| `PreparedStatement prepareStatement(String sql)` | 创建预编译 SQL 执行对象 |
| `CallableStatement prepareCall(String sql)`      | 创建调用存储过程的对象    |
| `void setAutoCommit(boolean autoCommit)`         | 设置是否自动提交事务     |
| `void commit()`                                  | 提交事务           |
| `void rollback()`                                | 回滚事务           |
| `DatabaseMetaData getMetaData()`                 | 获取数据库元数据       |
| `void close()`                                   | 关闭连接           |

---

### **3. Statement**

> 用于执行静态 SQL

| 方法                                   | 说明               |
| ------------------------------------ | ---------------- |
| `ResultSet executeQuery(String sql)` | 执行查询，返回结果集       |
| `int executeUpdate(String sql)`      | 执行增删改，返回影响行数     |
| `boolean execute(String sql)`        | 执行任意 SQL（可查询或更新） |
| `void close()`                       | 关闭 Statement     |

---

### **4. PreparedStatement**（继承 Statement）

> 预编译 SQL，支持占位符 `?`

| 方法                                                      | 说明       |
| ------------------------------------------------------- | -------- |
| `void setString(int parameterIndex, String value)`      | 设置字符串参数  |
| `void setInt(int parameterIndex, int value)`            | 设置整数参数   |
| `void setDouble(int parameterIndex, double value)`      | 设置浮点数参数  |
| `void setDate(int parameterIndex, java.sql.Date value)` | 设置日期参数   |
| `ResultSet executeQuery()`                              | 执行查询     |
| `int executeUpdate()`                                   | 执行增删改    |
| `boolean execute()`                                     | 执行任意 SQL |

---

### **5. CallableStatement**（继承 PreparedStatement）

> 调用存储过程

| 方法                                                           | 说明      |
| ------------------------------------------------------------ | ------- |
| `void registerOutParameter(int parameterIndex, int sqlType)` | 注册输出参数  |
| `Object getObject(int parameterIndex)`                       | 获取输出参数值 |
| 其他方法同 `PreparedStatement`                                    |         |

---

### **6. ResultSet**

> 查询结果集

| 方法                                     | 说明             |
| -------------------------------------- | -------------- |
| `boolean next()`                       | 移动到下一行，返回是否有数据 |
| `String getString(String columnLabel)` | 按列名获取字符串       |
| `int getInt(String columnLabel)`       | 按列名获取整数        |
| `double getDouble(String columnLabel)` | 按列名获取浮点数       |
| `Date getDate(String columnLabel)`     | 获取日期           |
| `Object getObject(String columnLabel)` | 获取任意类型数据       |
| `void close()`                         | 关闭结果集          |

---

### **7. ResultSetMetaData**

> 获取结果集的元数据

| 方法                                     | 说明           |
| -------------------------------------- | ------------ |
| `int getColumnCount()`                 | 获取列数         |
| `String getColumnName(int column)`     | 获取列名         |
| `String getColumnTypeName(int column)` | 获取列的 SQL 类型名 |

---

### **8. DatabaseMetaData**

> 获取数据库信息

| 方法                                   | 说明      |
| ------------------------------------ | ------- |
| `String getDatabaseProductName()`    | 获取数据库名称 |
| `String getDatabaseProductVersion()` | 获取数据库版本 |
| `String getDriverName()`             | 获取驱动名称  |
| `String getDriverVersion()`          | 获取驱动版本  |

---



