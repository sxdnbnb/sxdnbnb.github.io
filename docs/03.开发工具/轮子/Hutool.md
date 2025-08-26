---
description: Hutool工具类
title: Hutool
tags:
  - 工具
permalink: /project/hutool
---

## **1. 核心工具类（`cn.hutool.core`）**

### **字符串工具**

* `StrUtil`：字符串处理

  * `StrUtil.isEmpty()` / `StrUtil.isBlank()`：判断空或空白
  * `StrUtil.format("Hello, {}", "World")`：格式化字符串
  * `StrUtil.join(",", "a", "b", "c")`：拼接字符串
  * `StrUtil.split("a,b,c", ",")`：分割字符串

### **集合工具**

* `CollUtil`：集合操作

  * `CollUtil.isEmpty(list)`：判断集合是否为空
  * `CollUtil.join(list, ",")`：集合转字符串
  * `CollUtil.newArrayList()`：快速创建列表

### **日期时间工具**

* `DateUtil`：日期操作

  * `DateUtil.now()`：当前时间字符串
  * `DateUtil.format(new Date(), "yyyy-MM-dd")`：格式化日期
  * `DateUtil.parse("2025-08-26")`：字符串转日期
  * `DateUtil.between(date1, date2, DateUnit.DAY)`：计算时间差

### **对象工具**

* `ObjectUtil`：对象判断

  * `ObjectUtil.isNull(obj)`：判断是否为空
  * `ObjectUtil.equal(a, b)`：比较两个对象是否相等



### **2. IO 工具（`cn.hutool.core.io`）**

* `FileUtil`：文件读写、拷贝、删除

  * `FileUtil.readUtf8String("file.txt")`
  * `FileUtil.writeUtf8String("content", "file.txt")`
* `IoUtil`：流处理，支持安全关闭、读写等



## **3. JSON 工具（`cn.hutool.json`）**

* `JSONUtil`：JSON 转换

  * `JSONUtil.toJsonStr(obj)`：对象转 JSON
  * `JSONUtil.parseObj(jsonStr)`：字符串转 JSONObject



## **4. 加密解密（`cn.hutool.crypto`）**

* `SecureUtil`：

  * `SecureUtil.md5("password")`：MD5 加密
  * `SecureUtil.sha1("data")`：SHA-1 摘要
  * `SecureUtil.aes(key)`：AES 加密/解密

* `SmUtil`：国密算法支持

  * `SmUtil.sm2()`：SM2 非对称加密/解密
  * `SmUtil.sm3()`：SM3 摘要算法
  * `SmUtil.sm4()`：SM4 对称加密/解密


## **5. HTTP 工具（`cn.hutool.http`）**

* `HttpUtil`：

  * `HttpUtil.get(url)`：发送 GET 请求
  * `HttpUtil.post(url, paramMap)`：发送 POST 请求



## **6. Excel 工具（`cn.hutool.poi.excel`）**

* `ExcelUtil`：

  * `ExcelUtil.getReader(file)`：读取 Excel
  * `ExcelUtil.getWriter(file)`：写入 Excel



## **7. 其他模块**

* `cn.hutool.extra.qrcode`：二维码生成、解析
* `cn.hutool.extra.mail`：邮件发送
* `cn.hutool.extra.ftp`：FTP 操作
* `cn.hutool.setting`：配置文件读取

