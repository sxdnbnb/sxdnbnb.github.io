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
        instance-id: ${spring.application.name}-${spring.cloud.client.ip-address}-${server.port}
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

## 服务网关（Gateway）

网关是整个微服务API请求的入口，负责拦截所有请求，分发到服务上去。可以实现`日志拦截、权限控制、解决跨域问题、限流、熔断、负载均衡，隐藏服务端的ip，黑名单与白名单拦截、授权`等功能，常用的网关有`spring cloud gateway` 

* 路由（Route）：网关的基本构成块，有一个ID， 一个目标`URI`，一组断言和自定义过滤器定义，如果断言为真，则匹配路由。
* 断言（Predicate）：输入类型为个`ServerWebExchange`，我们可以使用他来匹配来自http请求的任何内容，例如headers。
* 过滤器（filter）：`gateway`中的过滤器默认分为`GatewayFilter`和`GlobalFilter`，过滤器可以对请求和响应进行修改处理。

> `Nginx`先将客户端的请求负载均衡到`SpringGateway`，然后`SpringGateway`再通过服务发现，将请求负载均衡到各个业务微服务上。


### 创建一个gateway服务完成网关的转发

#### 1.引入依赖
```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
```
> [!NOTE]
> `gateway` 中不能引入`starter-web`， 若二者同时引入会产生冲突

#### 2.配置yaml 或者 自定义转发规则

```yaml
# 服务器配置
server:
  port: 8083 # 服务端口设置为8083

# Spring应用配置
spring:
  application:
    name: gateway # 应用名称设置为gateway
  
  # Spring Cloud Gateway配置
  cloud:
    gateway:
      enabled: true # 启用网关功能
      discovery:
        locator:
          lower-case-service-id: true # 服务ID使用小写格式
      
      # 路由配置
      routes:
        # 卡片服务路由
        - id: card_route # 路由ID
          uri: lb://card # 使用负载均衡指向card服务
          order: 0 # 路由优先级为0（数字越小优先级越高）
          predicates:
            - Path=/card/** # 路径匹配规则：所有/card开头的请求
          
        # 用户服务路由
        - id: user_route # 路由ID
          uri: lb://user # 使用负载均衡指向user服务
          predicates:
            - Path=/user/** # 路径匹配规则：所有/user开头的请求
          filters:
            - User # 使用自定义的User网关过滤器（UserGatewayFilter只需要写User）
    
    # Consul服务发现配置
    consul:
      discovery:
        instance-id: ${spring.application.name}-${spring.cloud.client.ip-address}-${server.port} # 实例ID格式：应用名-IP-端口
        prefer-ip-address: true # 注册服务时优先使用IP地址
      host: 127.0.0.1 # Consul服务器地址
      port: 8500 # Consul服务器端口

```

或者自定义转发规则（更灵活）
```java
/**
 * 路由配置类，用于定义Spring Cloud Gateway的路由规则
 */
@Configuration
public class RouteConfig {
    private static final String CARD = "lb://card";
    private static final String USER = "lb://user";

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                // 配置卡服务路由
                .route("card", r -> r.order(0).path("/card/**")
                        .uri(CARD)
                )
                // 配置用户服务路由
                .route("user", r -> r.order(0).path("/user/**")
                        .uri(USER)
                ).build();
    }
}

```

1. 常量定义
```java
private static final String CARD = "lb://card";
private static final String USER = "lb://user";
```
- `lb://` 是Load Balancer的协议前缀，表示使用负载均衡
- `card` 和 `user` 是在服务注册中心（如Consul）中注册的服务名
- 这样配置后，Gateway会自动从服务注册中心发现这些服务的实例

2. 路由配置方法
```java
@Bean
public RouteLocator customRouteLocator(RouteLocatorBuilder builder) 
```
- `@Bean`：将返回值注册为Spring容器中的Bean
- `RouteLocator`：Spring Cloud Gateway的路由定位器接口
- `RouteLocatorBuilder`：用于构建路由的建造者模式工具

3. 具体路由规则

3.1 Card服务路由
```java
.route("card", r -> r.order(0).path("/card/**").uri(CARD))
```
- `"card"`：路由的唯一标识符
- `order(0)`：路由优先级，数字越小优先级越高
- `path("/card/**")`：匹配所有以`/card/`开头的请求路径
- `uri(CARD)`：将匹配的请求转发到card服务

3.2 User服务路由
```java
.route("user", r -> r.order(0).path("/user/**").uri(USER))
```
- 同样的配置模式，匹配`/user/**`的请求转发到user服务

4. 工作原理
当请求到达Gateway时：
1. 如果请求路径是`/card/anything`，会被转发到card服务
2. 如果请求路径是`/user/anything`，会被转发到user服务
3. Gateway会自动进行负载均衡，在多个服务实例间分发请求

5. 实际效果
- 客户端请求：`http://gateway:8080/card/list`
- Gateway转发到：`http://card-service-instance/card/list`
- 客户端请求：`http://gateway:8080/user/profile`  
- Gateway转发到：`http://user-service-instance/user/profile`

这种配置方式实现了统一的API网关入口，客户端只需要知道Gateway的地址，就能访问所有后端微服务。



### 网关层自定义过滤器
>需求：创建自定义过滤器给`指定的路由`添加Header信息

1. 实现`GatewayFilter接口`和`Ordered接口`，编写过滤器处理逻辑
```java
/**
 * 用户自定义网关过滤器，用于处理请求并添加自定义头部信息
 * 实现了GatewayFilter和Ordered接口，可以控制过滤器的执行顺序
 */
@Slf4j
@Component
public class UserFilter implements GatewayFilter, Ordered {
    /**
     * 过滤器核心方法，处理请求并传递给下一个过滤器
     * @param exchange 服务器网络交换对象，包含请求和响应信息
     * @param chain 网关过滤器链，用于继续处理请求
     * @return Mono<Void> 异步处理结果
     */
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 获取当前请求路径
        String path = exchange.getRequest().getURI().getPath();
        
        // 修改请求头，添加sessionId信息
        ServerHttpRequest build = exchange.getRequest().mutate()
                .headers(it -> it.set("sessionId", "766876"))
                .build();
        
        // 构建新的exchange对象
        exchange.mutate().request(build).build();
        
        // 记录请求路径日志
        log.info("自定义拦截器当前请求的path:" + path);
        
        // 继续执行过滤器链
        return chain.filter(exchange);
    }

    /**
     * 获取过滤器执行顺序
     * @return int 过滤器执行顺序，数值越小优先级越高
     */
    @Override
    public int getOrder() {
        return 0;
    }
}

```

2. 路由转发应用`userFilter`
```java
@Autowired
private UserFilter userFilter;

@Bean
public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
    return builder.routes()
            .route("card", r -> r.order(0).path("/card/**")
                    .filters(f -> f.filter(userFilter))
                    .uri(CARD)
            ).route("user", r -> r.order(0).path("/user/**")
                    .uri(USER)
            ).build();
}
```

3. 测试
```java
@RestController
@RequestMapping("/card")
public class CardController {

    @Autowired
    private HttpServletRequest request;

    @GetMapping(value = "/gateway")
    public String getTest() {
        return request.getHeader("sessionId");
    }
}
```

也可以用yaml实现

1. `GatewayFilterFactory` 类（用于 YAML 配置）

```java
@Component
public class UserGatewayFilterFactory extends AbstractGatewayFilterFactory<Object> {

    @Override
    public GatewayFilter apply(Object config) {
        return new UserFilter; 
    }
}
```

> [!NOTE]
> 注意：YAML 中引用的名字是类名去掉 `GatewayFilterFactory` → `User`


2. `application.yml` 示例

```yaml
spring:
  application:
    name: gateway
  cloud:
    gateway:
      routes:
        - id: user_route
          uri: lb://user
          predicates:
            - Path=/user/**
          filters:
            - User  # 这里会匹配 UserGatewayFilterFactory
```

### 网关层全局过滤器
> 需求：创建`自定义全局过滤器`给指定的路由添加Header信息

1. 实现`GlobalFilte接口`和`Ordered接口`，编写过滤器处理逻辑
```java
/**
 * 用户全局过滤器，实现GlobalFilter和Ordered接口
 * 用于对所有经过网关的请求进行统一处理
 */
@Component
@Slf4j
public class UserGlobalFilter implements GlobalFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 在响应头中添加操作密钥
        exchange.getResponse().getHeaders().set("operKey", "766876");
        // 获取当前请求路径
        String path = exchange.getRequest().getURI().getPath();
        // 记录请求路径日志
        log.info("当前请求的path:" + path);
        // 继续执行过滤器链
        return chain.filter(exchange);
    }

    /**
     * 获取过滤器执行顺序
     * @return int 过滤器执行顺序，数值越小优先级越高
     */
    @Override
    public int getOrder() {
        return 0;
    }
}

```

>[!NOTE]
> 当order的数值相同时候：
1. 全局过滤器最后执行
2. 优先出发默认过滤器，然后才是自定义过滤器
3. order相同时，默认过滤器->自定义过略器->全局过滤器

### 网关层修改body体

> 需求：为了保证互联网层数据传输的安全性，需要在网关层对微服务层响应的数据进行加密操作，同样前端请求的数据也是密文，网关在收到请求后需要将数据进行解密，验证数据的合法性，通过后，将对应的请求转发到对应的微服务进行请求处理。


1. 定义加解密服务类
```java
@Service
@Slf4j
public class SecurityService {


    private final SymmetricCrypto sm4 = SmUtil.sm4(Const.EN_KEY.getBytes());

    /**
     * @description: 对请求的数据进行解密操作， 解密使用国密的sm4进行加解密
     * @param: s 入参请求体（解密之前的数据）
    **/
    public Mono<String> modifyRequest(ServerWebExchange exchange, String s) {
        log.info("解密之前的数据是:" + s);
        //获取到加密串
        //{"value": "加密数据"}
        JSONObject entries = JSONUtil.parseObj(s);
        Object value = entries.get("value");
        String s1 = sm4.decryptStr(value.toString(), Charset.defaultCharset());
        exchange.getResponse().getHeaders().set("decrpt", "1");
        log.info("解密之后的数据是:" + s1);
        return Mono.just(s1);
    }

    /**
     * @description: 对响应的数据进行加密 使用hutool的国密加密算法进行导出
     * @param: s 入参， 响应体（未加密前的数据）
    **/
    public Mono<String> modifyResponse(ServerWebExchange exchange, String s) {
        log.info("加密之前的数据是:" + s);
        String s1 = sm4.encryptHex(s.getBytes());
        log.info("加密之后的数据为:" + s1);
        exchange.getResponse().getHeaders().set("decrpt", "1");
        return Mono.just(s1);
    }

}
```

2. 路由添加filter
```java
@Configuration
@RequiredArgsConstructor
public class RouteConfig {
    private static final String CARD = "lb://card";

    private static final String USER = "lb://user";

    private final UserFilter userFilter;

    private final SecurityService securityService;

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("card", r -> r.order(0).path("/card/**")
                        .filters(f -> f.filter(userFilter))
                        .uri(CARD)
                ).route("user", r -> r.order(0).path("/user/**")
                        .filters(f -> f.modifyResponseBody(String.class, String.class,
                                ((exchange, s) -> securityService.modifyResponse(exchange, s))))
                        .uri(USER)
                ).build();
    }
}
```