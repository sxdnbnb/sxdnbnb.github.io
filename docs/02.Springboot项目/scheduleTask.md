---
date: 2024-08-15 20:52:35
description: 定时任务的3种实现方法
title: 定时任务
tags:
  - 工具
permalink: /project/schedule
coverImg:
  - https://www.yotu.net/i/67f4f78bd05d1.png
categories:
  - 开发工具
---

## 定时任务的3种实现方法
### Timer
Timer 是 JDK 自带的定时任务执行类，无论任何项目都可以直接使用 Timer 来实现定时任务，所以 Timer 的优点就是使用方便，它的实现代码如下：
```java
public class MyTimerTask {
    public static void main(String[] args) {
        // 定义一个任务
        TimerTask timerTask = new TimerTask() {
            @Override
            public void run() {
                System.out.println("Run timerTask：" + new Date());
            }
        };
        // 计时器
        Timer timer = new Timer();
        // 添加执行任务（延迟 1s 执行，每 3s 执行一次）
        timer.schedule(timerTask, 1000, 3000);
    }
}
```

#### Timer 缺点分析
Timer 类实现定时任务虽然方便，但在使用时需要注意以下问题。

- 问题 1：任务执行时间长影响其他任务
    当一个任务的执行时间过长时，会影响其他任务的调度。
- 问题 2：任务异常影响其他任务
    使用 Timer 类实现定时任务时，当一个任务抛出异常，其他任务也会终止运行
#### Timer 小结
Timer 类实现定时任务的优点是方便，因为它是 JDK 自定的定时任务，但缺点是任务如果执行时间太长或者是任务执行异常，会影响其他任务调度，所以在生产环境下建议谨慎使用。

### ScheduledExecutorService
ScheduledExecutorService 也是 JDK 1.5 自带的 API，我们可以使用它来实现定时任务的功能，也就是说 ScheduledExecutorService 可以实现 Timer 类具备的所有功能，并且它可以解决了 Timer 类存在的所有问题。

ScheduledExecutorService 实现定时任务的代码示例如下：
```java
public class MyScheduledExecutorService {
    public static void main(String[] args) {
        // 创建任务队列
        ScheduledExecutorService scheduledExecutorService =
                Executors.newScheduledThreadPool(10); // 10 为线程数量
        // 执行任务
        scheduledExecutorService.scheduleAtFixedRate(() -> {
            System.out.println("Run Schedule：" + new Date());
        }, 1, 3, TimeUnit.SECONDS); // 1s 后开始执行，每 3s 执行一次
    }
}
```
#### ScheduledExecutorService 小结
在单机生产环境下建议使用 ScheduledExecutorService 来执行定时任务，它是 JDK 1.5 之后自带的 API，因此使用起来也比较方便，并且使用 ScheduledExecutorService 来执行任务，不会造成任务间的相互影响。

### Spring Task
如果使用的是 Spring 或 Spring Boot 框架，可以直接使用 Spring Framework 自带的定时任务，**使用上面两种定时任务的实现方式，很难实现设定了具体时间的定时任务，比如当我们需要每周五来执行某项任务时**，但如果使用 Spring Task 就可轻松的实现此需求。
以 Spring Boot 为例，实现定时任务只需两步：
1. 开启定时任务；
2. 添加定时任务。
   
具体实现步骤如下。

① 开启定时任务
开启定时任务只需要在 Spring Boot 的启动类上声明 `@EnableScheduling` 即可，实现代码如下：
```java
@SpringBootApplication
@EnableScheduling // 开启定时任务
public class ScheduleTaskApplication {
    public static void main(String[] args) {
        SpringApplication.run(ScheduleTaskApplication.class, args);
    }
}
```
② 添加定时任务
定时任务的添加只需要使用 `@Scheduled` 注解标注即可，如果有多个定时任务可以创建多个 `@Scheduled` 注解标注的方法，示例代码如下：
```java
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component // 把此类托管给 Spring，不能省略
public class TaskUtils {
    // 添加定时任务
    @Scheduled(cron = "59 59 23 0 0 5") // cron 表达式，每周五 23:59:59 执行
    public void doTask(){
        System.out.println("我是定时任务~");
    }
}
```
> 这里有个要注意的细节，就是启动类需要能扫描到定时任务类，否则定时任务启动不起来。不仅需要@Component注解，也需要将启动类位置不能位于定时任务类之下

>定时任务是自动触发的无需手动干预，也就是说 Spring Boot 启动后会自动加载并执行定时任务。
#### Cron 表达式
Spring Task 的实现需要使用 cron 表达式来声明执行的频率和规则，cron 表达式是由 6 位或者 7 位组成的（最后一位可以省略），每位之间以空格分隔，每位从左到右代表的含义如下：
![Alt text](/picture/schedule/image.png)
其中 * 和 ? 号都表示匹配所有的时间。
![Alt text](/picture/schedule/image-1.png)
cron 表达式在线生成地址：https://cron.qqe2.com/

