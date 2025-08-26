---
date: 2025-08-25 15:48:39
title: SpringCloud
tags:
  - 工具
permalink: /develop/springcloud
categories:
  - 开发工具
coverImg: /ikun/ikun00000075.png
---

![alt text](/picture/springboot/image.png)

## 注册中心（Consul）

作用：存放和调度服务

### 1.添加依赖
```xml
<!-- Actuator 监控端点：提供健康检查、指标等信息 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>

<!-- Consul 服务发现：用于注册中心，服务注册与发现 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-consul-discovery</artifactId>
</dependency>
```
### 2.配置application.yaml文件
```yaml
  cloud:
    consul:
      host: 127.0.0.1  # Consul 服务器地址
      port: 8500       # Consul 默认端口
      # 服务发现配置
      discovery:
        # 服务注册
        register: true
        # 使用IP注册而不是主机名（容器化部署推荐）
        prefer-ip-address: true
        # 服务名称
        service-name: ${spring.application.name}
        # 实例ID（确保唯一性）
        instance-id: ${spring.application.name}-${server.port}
        # 健康检查配置
        health-check-path: /actuator/health
        health-check-interval: 15s
        health-check-timeout: 10s
        health-check-critical-timeout: 30s
        # 心跳配置
        heartbeat:
          enabled: true
```

### 3.开启服务发现服务注册开关
`@EnableDiscoveryClient`，从SpringCloud Edgware开始，该注解可以省略。
### 4.启动注册中心Consul
启动应用程序后访问consul的图形化界面，地址`127.0.0.1:8500`

## 服务调用（Feign/OpenFeign）
一个业务场景的应用需要多个服务之间共同写作才能完成整个链路的请求，比如查询客户A的信息以及该客户下面的其他信息。`客户端->网关（服务）->服务A->服务B->客户端`

### 1.引入依赖
```xml
<!-- OpenFeign：声明式 HTTP 客户端，用于微服务间调用 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```
### 2.配置application.yaml文件
和consul配置并列

服务A:
```yaml
server:
  port: 8081 # 应用服务端口号
  servlet:
    context-path: /${spring.application.name}

spring:
  application:
    name: manager-service # 应用名称
  cloud:
    consul:
    openfeign:
        client:
            config:
                default:
                    connect-timeout: 5000   # 连接超时 5s
                    read-timeout: 10000     # 读取超时 10s
```

服务B：
```yaml
server:
  port: 8082 # 应用服务端口号
  servlet:
    context-path: /${spring.application.name}

spring:
  application:
    name: department-service # 应用名称
  cloud:
    consul:
    openfeign:
        client:
            config:
                default:
                    connect-timeout: 5000   # 连接超时 5s
                    read-timeout: 10000     # 读取超时 10s
```

### 3.创建FeignClient
在com.example.work3.feign包下
>[!NOTE]
>注意访问路径：`ip:端口号/服务名称/servlet的path/服务B的拦截路径`

```java
@FeignClient(value = "department-service", path = "/department-service/departments")
public interface DepartFeignClient {
    @GetMapping("/{departNo}")
    Result queryDepartById(@PathVariable String departNo);
}
```

> `@FeignClient`：代表该接口为feign接口\
> `value`：调用对应的服务\
> `path`：拦截路径，类似`Controller`中的`@RequestMapping`，

### 4.Application开启feign接口
```java
@SpringBootApplication
@EnableFeignClients
@MapperScan("com.example.work3.mapper")
public class ManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ManagerApplication.class, args);
    }

}
```

### 5.调用FeignClient
`controller`中调用
```java
@PostMapping("/queryByDepartments")
public Result queryManagersByDepartments(@RequestBody ManagerRequestDTO dto) {
    PageResult<Manager> pageResult = managerService.queryByDepartments(dto);
    Result department = departFeignClient.queryDepartById(dto.getDepartmentId());
    System.out.println(department.getData());
    return Result.ok(pageResult);
}
```