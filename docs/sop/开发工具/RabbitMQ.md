---
description: RabbitMQ的基础知识
title: RabbitMQ
# readingTime: false
tag:
 - 开发工具
top: 10     # 排序
sticky: 40  # 精选文章热度
# recommend: 1 # 推荐文章排序
# sidebar: false # 侧边栏
# author: 暮冬浅夏
---
# 消息队列

## 为什么要使用消息队列呢？

消息队列主要有三大用途，我们拿一个电商系统的下单举例：

- 解耦：用户下单后可以把订单完成的消息丢进队列里，这样就完成了用户下单和记录到数据库的解耦。
- 异步：下单之后，我们要扣减库存、增加积分、发送消息等等，这样一来这个链路就长了，链路一长，响应时间就变长了。引入消息队列，除了 `更新订单状态`，其它的都可以异步去做，这样一来就来，就能降低响应时间。
- 削峰：消息队列可以用来削峰，例如秒杀系统，平时流量很低，但是要做秒杀活动，秒杀的时候流量疯狂怼进来，我们的服务器，Redis，MySQL 各自的承受能力都不一样，直接全部流量照单全收肯定有问题啊，严重点可能直接打挂了。我们可以把请求扔到队列里面，这样就能抗住短时间的大流量了。

解耦、异步、削峰，是消息队列最主要的三大作用

## 什么是消息队列

消息队列是一个存放消息的容器，当我们需要使用消息的时候，直接从容器中取出消息供自己使用即可。由于队列 Queue 是一种先进先出的数据结构，所以消费消息时也是按照顺序来消费的。

参与消息传递的双方称为 生产者 和 消费者 ，生产者负责发送消息，消费者负责处理消息。

RabbitMQ 的整体模型架构如下：

![](rabbitmq/UYY8b5WQPo0D7Ex0LutcOgegnke.png)

RabbitMQ 的整体模型架构

**多个消费者可以订阅同一个队列**，这时队列中的消息会被平均分摊（Round-Robin，即轮询）给多个消费者进行处理，而不是每个消费者都收到所有的消息并处理，这样**避免消息被重复消费**。

## **说说生产者 Producer 和消费者 Consumer?**

**生产者** :

- 消息生产者，就是投递消息的一方。
- 消息一般包含两个部分：消息体（`payload`)和标签(`Label`)。

**消费者**：

- 消费消息，也就是接收消息的一方。
- 消费者连接到 RabbitMQ 服务器，并订阅到队列上。消费消息时只消费消息体，丢弃标签。

## **说说 Broker 服务节点、Queue 队列、Exchange 交换器？**

- **Broker**：可以看做 RabbitMQ 的服务节点。一般情况下一个 Broker 可以看做一个 RabbitMQ 服务器。
- **Queue**：RabbitMQ 的内部对象，用于存储消息。多个消费者可以订阅同一队列，这时队列中的消息会被平摊（轮询）给多个消费者进行处理。
- **Exchange**：生产者将消息发送到交换器，由交换器将消息路由到一个或者多个队列中。当路由不到时，或返回给生产者或直接丢弃。

## **RabbitMQ 消息怎么传输？**

由于 TCP 链接的创建和销毁开销较大，且并发数受系统资源限制，会造成性能瓶颈

RabbitMQ 使用信道的方式来传输数据。信道（Channel）是生产者、消费者与 RabbitMQ 通信的渠道，信道是建立在 TCP 链接上的虚拟链接，且每条 TCP 链接上的信道数量没有限制。就是说 RabbitMQ 在**一条 TCP 链接上建立成百上千个信道来达到多个线程处理**，这个 TCP 被多个线程共享，每个信道在 RabbitMQ 都有唯一的 ID，保证了信道私有性，每个信道对应一个线程使用。

## **如何保证消息的可靠性？**

1. 生产者到 RabbitMQ：事务机制和 Confirm 机制。
   1. confirm 消息确认机制：生产端投递的消息一旦投递到 RabbitMQ 后，RabbitMQ 就会发送一个确认消息给生产端，让生产端知道我已经收到消息了，否则这条消息就可能已经丢失了，需要生产端重新发送消息。

```yaml
    spring:
    rabbitmq:
    _##开启 confirm 确认机制_
    publisher-confirms: true
```
![](rabbitmq/WkDDbTKd1ozerVxruhacVOfQn1e.png)

2. RabbitMQ 自身：持久化、集群（普通模式、镜像模式）

消息持久化：相关的数据都持久化到硬盘中。在Spring Boot中消息默认就是持久化的。

![](rabbitmq/OOlLbLRuIoSNEAx6hSCcVmLFn69.png)

3. RabbitMQ 到消费者：
	1. ACK机制改为手动

（RabbitMQ的自动ack机制默认在消息发出后就立即将这条消息删除，而不管消费端是否接收到，是否处理完。）

我们需要改为手动消费，当消息消费失败时，消费端回复n ack，消息重新入队。

SpringBoot 给我们提供了一种重试机制，当消费者执行的业务方法报错时会重试执行消费者业务方法。

![](rabbitmq/AcvHbdgpgoUTrIx1g2pcdFcDn2f.png)



### **镜像集群模式**

RabbitMQ 的高可用模式。跟普通集群模式不一样的是，在镜像集群模式下，创建的 queue，无论元数据还是 queue 里的消息都会存在于多个实例上，就是说，每个 RabbitMQ 节点都有这个 queue 的一个完整镜像，包含 queue 的全部数据的意思。然后每次写消息到 queue 的时候，都会自动把消息同步到多个实例的 queue 上。

## 消息重复消费怎么处理？

消息重复的原因有两个：

1. 生产时消息重复

生产者发送消息给MQ，在MQ确认的时候出现了网络波动，生产者没有收到确认，这时候生产者就会重新发送这条消息，导致MQ会接收到重复消息。

2. 消费时消息重复。

消费者消费成功后，给MQ确认的时候出现了网络波动，MQ没有接收到确认，为了保证消息不丢失，MQ就会继续给消费者投递之前的消息。这时候消费者就接收到了两条一样的消息。

由于重复消息是由于网络原因造成的，无法避免。

解决方法：发送消息时让每个消息携带一个全局的唯一ID，在消费消息时先判断消息是否已经被消费过，保证**消息消费逻辑的幂等性**。具体消费过程为：

1. 消费者获取到消息后先根据id去查询redis/db是否存在该消息

2. 如果不存在，则正常消费，消费完毕后写入redis/db

3. 如果存在，则证明消息被消费过，直接丢弃

## **如何保证 RabbitMQ 消息的顺序性？**

- 拆分多个 queue(消息队列)，每个 queue(消息队列) 一个 consumer(消费者)

- 或者就一个 queue (消息队列)但是对应一个 consumer(消费者)，然后这个 consumer(消费者)内部用内存队列做排队，然后分发给底层不同的 worker 来处理

## 什么是死信队列？

消费失败的消息存放的队列。

消息消费失败的原因：

- 消息被拒绝并且消息没有重新入队（requeue=false）

- 消息超时未消费

- 达到最大队列长度


## 导致的死信的几种原因？ 

1. 消息被拒（Basic.Reject /Basic.Nack） 且 requeue = false。

2. 消息TTL过期。

3. 队列满了，无法再添加。


## RabbitMQ
RabbitMQ是基于Erlang语言开发的开源消息通信中间件，官网地址：
[Messaging that just works — RabbitMQ](https://www.rabbitmq.com/)

### 安装
我们同样基于Docker来安装RabbitMQ，使用下面的命令即可：
```shell
docker run \
 -e RABBITMQ_DEFAULT_USER=itheima \
 -e RABBITMQ_DEFAULT_PASS=123321 \
 -v mq-plugins:/plugins \
 --name mq \
 --hostname mq \
 -p 15672:15672 \
 -p 5672:5672 \
 --network hmall \
 -d \
 rabbitmq:3.8-management
```


可以看到在安装命令中有两个映射的端口：

- 15672：RabbitMQ提供的管理控制台的端口
- 5672：RabbitMQ的消息发送处理接口

安装完成后，我们访问 http://192.168.150.101:15672即可看到管理控制台。首次访问需要登录，默认的用户名和密码在配置文件中已经指定了。
登录后即可看到管理控制台总览页面：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687137883587-56417f79-a649-43a5-be88-2ff777d3cd25.png#averageHue=%23f7f6f6&clientId=u6a529863-cf4b-4&from=paste&height=707&id=u7d848ee1&originHeight=876&originWidth=1572&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=83168&status=done&style=none&taskId=ub505f8cf-075f-462b-bce3-e0df935715d&title=&width=1268.168026574142)


RabbitMQ对应的架构如图：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687136827222-52374724-79c9-4738-b53f-653cc0805d22.png#averageHue=%23e8d7b3&clientId=u6a529863-cf4b-4&from=paste&height=495&id=ub8dd8df6&originHeight=614&originWidth=1458&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=104273&status=done&style=none&taskId=uc0c132a5-73a3-4024-819f-61241da2511&title=&width=1176.2016429676203)
其中包含几个概念：

- `**publisher**`：生产者，也就是发送消息的一方
- `**consumer**`：消费者，也就是消费消息的一方
- `**queue**`：队列，存储消息。生产者投递的消息会暂存在消息队列中，等待消费者处理
- `**exchange**`：交换机，负责消息路由。生产者发送的消息由交换机决定投递到哪个队列。
- `**virtual host**`：虚拟主机，起到数据隔离的作用。每个虚拟主机相互独立，有各自的exchange、queue

上述这些东西都可以在RabbitMQ的管理控制台来管理，下一节我们就一起来学习控制台的使用。

### 收发消息
#### 交换机
我们打开Exchanges选项卡，可以看到已经存在很多交换机：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687137953880-08aa9694-6a1e-4337-8bde-5757ec3c33f8.png#averageHue=%23f7f6f6&clientId=u6a529863-cf4b-4&from=paste&height=605&id=u413741e2&originHeight=750&originWidth=1264&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=60217&status=done&style=none&taskId=u8611b86c-aa50-46d9-855f-8307a318079&title=&width=1019.6974463038903)
我们点击任意交换机，即可进入交换机详情页面。仍然会利用控制台中的publish message 发送一条消息：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687138031622-ccce4612-954f-42c0-9291-73cf19915e39.png#averageHue=%23f9f8f7&clientId=u6a529863-cf4b-4&from=paste&height=487&id=u9d211d96&originHeight=604&originWidth=947&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=38263&status=done&style=none&taskId=ue134ec0e-ad83-465f-a1b2-97cb7667d75&title=&width=763.9663620647026)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687138163403-839087fe-66f7-4710-a866-210aa0282be8.png#averageHue=%23f9f6f6&clientId=u6a529863-cf4b-4&from=paste&height=616&id=ubca84480&originHeight=763&originWidth=1092&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=46085&status=done&style=none&taskId=u5f176fff-eda8-457c-94cd-bb7d6bbd997&title=&width=880.9411482308925)
这里是由控制台模拟了生产者发送的消息。由于没有消费者存在，最终消息丢失了，这样说明交换机没有存储消息的能力。

#### 队列
我们打开`Queues`选项卡，新建一个队列：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687138308409-be6e1649-af03-4ee7-bee3-8518fd0dca03.png#averageHue=%23f9f8f7&clientId=u6a529863-cf4b-4&from=paste&height=417&id=u398bfe43&originHeight=517&originWidth=1157&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=35084&status=done&style=none&taskId=u3b2b568c-e113-4abf-971c-2aea7bfaa4b&title=&width=933.3781213398743)
命名为`hello.queue1`：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687255044231-4b0e0339-c1ab-468a-8a72-9ae1b184594c.png#averageHue=%23f9f6f6&clientId=u1711eaf3-9387-4&from=paste&height=548&id=uf3cb4af4&originHeight=679&originWidth=1163&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=51428&status=done&style=none&taskId=u71f9590b-0cc5-4727-bd4c-65b353c4df7&title=&width=938.2184573191648)
再以相同的方式，创建一个队列，密码为`hello.queue2`，最终队列列表如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687255204405-523f8053-e414-45f3-99c3-b66de152f79e.png#averageHue=%23f6f5f4&clientId=u1711eaf3-9387-4&from=paste&height=359&id=u956d1947&originHeight=445&originWidth=1074&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=39049&status=done&style=none&taskId=u1eb8bf9f-f74b-4238-a33e-796c4280e78&title=&width=866.4201402930207)
此时，我们再次向`amq.fanout`交换机发送一条消息。会发现消息依然没有到达队列！！
怎么回事呢？
发送到交换机的消息，只会路由到与其绑定的队列，因此仅仅创建队列是不够的，我们还需要将其与交换机绑定。

#### 绑定关系
点击`Exchanges`选项卡，点击`amq.fanout`交换机，进入交换机详情页，然后点击`Bindings`菜单，在表单中填写要绑定的队列名称：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687255547460-d87943cd-4309-4778-8e9e-374167a97e45.png#averageHue=%23f9f7f7&clientId=u1711eaf3-9387-4&from=paste&height=481&id=u04a61731&originHeight=596&originWidth=1022&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=34676&status=done&style=none&taskId=u0ce69958-400b-4c37-89ea-adf0b369080&title=&width=824.4705618058354)
相同的方式，将hello.queue2也绑定到改交换机。
最终，绑定结果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687255624712-7bd850b1-95fd-4d98-8243-57d1779de935.png#averageHue=%23f7f4f4&clientId=u1711eaf3-9387-4&from=paste&height=385&id=u82198db4&originHeight=477&originWidth=978&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=28098&status=done&style=none&taskId=u1394f18f-c109-4688-9eb1-effec6a43fb&title=&width=788.9747646243708)

#### 发送消息
再次回到exchange页面，找到刚刚绑定的`amq.fanout`，点击进入详情页，再次发送一条消息：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687138163403-839087fe-66f7-4710-a866-210aa0282be8.png#averageHue=%23f9f6f6&clientId=u6a529863-cf4b-4&from=paste&height=616&id=GyhjT&originHeight=763&originWidth=1092&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=46085&status=done&style=none&taskId=u5f176fff-eda8-457c-94cd-bb7d6bbd997&title=&width=880.9411482308925)
回到`Queues`页面，可以发现`hello.queue`中已经有一条消息了：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687255725782-fd5e2550-3572-48c0-9ec0-60786e33a3b1.png#averageHue=%23f5f4f3&clientId=u1711eaf3-9387-4&from=paste&height=319&id=u97a4707c&originHeight=395&originWidth=1051&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=38484&status=done&style=none&taskId=u4d68c013-3032-4d2b-83a0-571c3335780&title=&width=847.8655190390733)
点击队列名称，进入详情页，查看队列详情，这次我们点击get message：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687255765034-69e67460-1535-48b3-8537-da383c498141.png#averageHue=%23f8f7f7&clientId=u1711eaf3-9387-4&from=paste&height=473&id=ua850c29b&originHeight=586&originWidth=974&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=35281&status=done&style=none&taskId=u668d2c9f-54a9-4427-adc4-e121a960025&title=&width=785.7478739715103)
可以看到消息到达队列了：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687255798153-dda9b729-a3a0-415c-9167-48c525c75800.png#averageHue=%23f9f7f7&clientId=u1711eaf3-9387-4&from=paste&height=466&id=u66fa5450&originHeight=578&originWidth=762&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=33500&status=done&style=none&taskId=u665361c6-23b2-4fc4-b1a9-fdf6c880545&title=&width=614.7226693699085)
这个时候如果有消费者监听了MQ的`hello.queue1`或`hello.queue2`队列，自然就能接收到消息了。
### 数据隔离
#### 用户管理
点击`Admin`选项卡，首先会看到RabbitMQ控制台的用户管理界面：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687151143347-f7e2aaff-0a14-4022-8d50-582ee75e2998.png#averageHue=%23f7f5f5&clientId=uc5430584-57f9-4&from=paste&height=450&id=u2a51a990&originHeight=558&originWidth=1580&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=55212&status=done&style=none&taskId=u18a12c4e-be8d-4ccb-a14a-415a21db44a&title=&width=1274.621807879863)
这里的用户都是RabbitMQ的管理或运维人员。目前只有安装RabbitMQ时添加的`itheima`这个用户。仔细观察用户表格中的字段，如下：

- `Name`：`itheima`，也就是用户名
- `Tags`：`administrator`，说明`itheima`用户是超级管理员，拥有所有权限
- `Can access virtual host`： `/`，可以访问的`virtual host`，这里的`/`是默认的`virtual host`

我们通常只会搭建一套MQ集群，公司内的多个不同项目同时使用。这个时候为了避免互相干扰， 我们会利用`virtual host`的隔离特性，将不同项目隔离。一般会做两件事情：

- 给每个项目创建独立的运维账号，将管理权限分离。
- 给每个项目创建不同的`virtual host`，将每个项目的数据隔离。

比如，我们创建一个新的用户，命名为`hmall`：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687151725993-05fe9bd1-8f8b-468d-8456-eac36278bea2.png#averageHue=%23f7f5f5&clientId=uc5430584-57f9-4&from=paste&height=609&id=ua32ca0ae&originHeight=755&originWidth=1569&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=70298&status=done&style=none&taskId=u4f4ed00c-b8dd-4ffd-8a83-75d03c11fb5&title=&width=1265.7478585844967)
你会发现此时hmall用户没有任何`virtual host`的访问权限：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687151853554-e671a696-e9c0-4ff5-9caf-31b39e1a17f5.png#averageHue=%23f7f5f4&clientId=uc5430584-57f9-4&from=paste&height=353&id=ueeaf90c6&originHeight=437&originWidth=927&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=31497&status=done&style=none&taskId=u74d79385-5602-447d-8beb-ed20ec36022&title=&width=747.8319088004005)
接下来我们授权。


#### virtual host
我们先退出登录：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687152245922-8438490f-d094-4db1-88fa-a2d916d46a97.png#averageHue=%23f6f5f5&clientId=uc5430584-57f9-4&from=paste&height=374&id=u12c0492e&originHeight=463&originWidth=1571&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=50699&status=done&style=none&taskId=u830f1745-a0ed-4202-9849-7653ebae4c2&title=&width=1267.3613039109268)
切换到刚刚创建的hmall用户登录，然后点击`Virtual Hosts`菜单，进入`virtual host`管理页：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687152310566-2531b1c8-b362-47c7-ba81-1b7c1880c18b.png#averageHue=%23f5f4f3&clientId=uc5430584-57f9-4&from=paste&height=409&id=uf51820c2&originHeight=507&originWidth=1565&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=60462&status=done&style=none&taskId=ud7655191-c9d5-4801-9669-55b47348861&title=&width=1262.5209679316363)
可以看到目前只有一个默认的`virtual host`，名字为 `/`。
 我们可以给项目创建一个单独的`virtual host`，而不是使用默认的`/`。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687152363999-edb47263-f303-4ee8-a80d-be55d6b0ed37.png#averageHue=%23f6f5f4&clientId=uc5430584-57f9-4&from=paste&height=553&id=ufc5bd4a7&originHeight=685&originWidth=1555&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=67199&status=done&style=none&taskId=u38a5fe38-fcb5-4163-bee4-ddffaba416b&title=&width=1254.4537412994853)
创建完成后如图：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687152448758-d0a05827-10ac-459b-a92f-495304dddf89.png#averageHue=%23f5f5f4&clientId=uc5430584-57f9-4&from=paste&height=232&id=ue38b9ba4&originHeight=287&originWidth=990&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=24622&status=done&style=none&taskId=ue5f326dc-340c-46e0-83d5-84a19fef1d9&title=&width=798.655436582952)
由于我们是登录`hmall`账户后创建的`virtual host`，因此回到`users`菜单，你会发现当前用户已经具备了对`/hmall`这个`virtual host`的访问权限了：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687152695194-6c2dda94-43c4-4ee9-b95c-ca9d8504cd0c.png#averageHue=%23f7f4f4&clientId=ud5bd9b1f-141b-4&from=paste&height=349&id=u0cf22cf3&originHeight=432&originWidth=890&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=30925&status=done&style=none&taskId=u1b04bdb9-ab59-41d9-b2bb-e5f5a0cca59&title=&width=717.9831702614417)

此时，点击页面右上角的`virtual host`下拉菜单，切换`virtual host`为 `/hmall`：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687153236457-ca138f25-b351-4095-8855-aa0df42fae65.png#averageHue=%23f7f5f4&clientId=ud5bd9b1f-141b-4&from=paste&height=223&id=u0989d284&originHeight=277&originWidth=1448&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=35060&status=done&style=none&taskId=u6ab4f38a-ad0d-48bd-ace7-7f0281755d1&title=&width=1168.1344163354693)
然后再次查看queues选项卡，会发现之前的队列已经看不到了：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687153307085-0157ac47-2d89-4f32-ab9a-d513b0e19f25.png#averageHue=%23f9f6f6&clientId=ud5bd9b1f-141b-4&from=paste&height=431&id=u151b88b9&originHeight=534&originWidth=1443&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=48526&status=done&style=none&taskId=u7ef6af14-7e3c-4988-8721-80965a310f6&title=&width=1164.1008030193937)
这就是基于`virtual host `的隔离效果。

# SpringAMQP
将来我们开发业务功能的时候，肯定不会在控制台收发消息，而是应该基于编程的方式。由于`RabbitMQ`采用了AMQP协议，因此它具备跨语言的特性。任何语言只要遵循AMQP协议收发消息，都可以与`RabbitMQ`交互。并且`RabbitMQ`官方也提供了各种不同语言的客户端。
但是，RabbitMQ官方提供的Java客户端编码相对复杂，一般生产环境下我们更多会结合Spring来使用。而Spring的官方刚好基于RabbitMQ提供了这样一套消息收发的模板工具：SpringAMQP。并且还基于SpringBoot对其实现了自动装配，使用起来非常方便。

SpringAmqp的官方地址：
[Spring AMQP](https://spring.io/projects/spring-amqp)
SpringAMQP提供了三个功能：

- 自动声明队列、交换机及其绑定关系
- 基于注解的监听器模式，异步接收消息
- 封装了RabbitTemplate工具，用于发送消息
- 
### 利用SpringAMQP实现对RabbitMQ的消息收发Demo
包括三部分：
- mq-demo：父工程，管理项目依赖
- publisher：消息的发送者
- consumer：消息的消费者

在mq-demo这个父工程中，已经配置好SpringAMQP相关的依赖：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>cn.itcast.demo</groupId>
    <artifactId>mq-demo</artifactId>
    <version>1.0-SNAPSHOT</version>
    <modules>
        <module>publisher</module>
        <module>consumer</module>
    </modules>
    <packaging>pom</packaging>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.12</version>
        <relativePath/>
    </parent>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <!--AMQP依赖，包含RabbitMQ-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-amqp</artifactId>
        </dependency>
        <!--单元测试-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
        </dependency>
    </dependencies>
</project>
```

因此，子工程中就可以直接使用SpringAMQP了。
### 快速入门
在之前的案例中，我们都是经过交换机发送消息到队列，不过有时候为了测试方便，我们也可以直接向队列发送消息，跳过交换机。
在入门案例中，我们就演示这样的简单模型，如图：
![](https://cdn.nlark.com/yuque/0/2023/jpeg/27967491/1687261777988-23fff732-dcfa-499a-a8a1-a66328fe05e7.jpeg)
也就是：

- publisher直接发送消息到队列
- 消费者监听并处理队列中的消息

:::warning
**注意**：这种模式一般测试使用，很少在生产中使用。
:::



为了方便测试，我们现在控制台新建一个队列：simple.queue
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687171932026-33eace5d-c0f2-4070-8742-fe8b34c6c749.png#averageHue=%23f9f8f8&clientId=u0fe93ba5-a0ba-4&from=paste&height=602&id=uec08e673&originHeight=746&originWidth=1219&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=53932&status=done&style=none&taskId=ubdce29f2-6d3c-45cc-8b7f-64627bcf68c&title=&width=983.3949264592106)
添加成功：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687172012283-e19d8da6-8944-4f51-a40b-a15f0814b015.png#averageHue=%23f7f6f6&clientId=u0fe93ba5-a0ba-4&from=paste&height=405&id=u61761e6f&originHeight=502&originWidth=1187&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=40787&status=done&style=none&taskId=uaf3c44d8-727d-4f46-8ae6-46245932d99&title=&width=957.5798012363273)
接下来，我们就可以利用Java代码收发消息了。
#### 消息发送
首先配置MQ地址，在`publisher`服务的`application.yml`中添加配置：
```yaml
logging:
  pattern:
    dateformat: MM-dd HH:mm:ss:SSS
spring:
  rabbitmq:
    host: 172.31.177.123 # 你的虚拟机IP
    port: 5672 # 端口
    virtual-host: / # 虚拟主机
    username: sunshine # 用户名
    password: 123456 # 密码
```

然后在`publisher`服务中编写测试类`SpringAmqpTest`，并利用`RabbitTemplate`实现消息发送：
```java
package com.test.publisher;

import org.junit.jupiter.api.Test;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

/**
 * @version 1.0
 * @description: TODO
 * @author: 12041
 * @date: 2024/6/12 18:04
 */
@SpringBootTest
public class SpringAmqpTest {
    @Resource
    private RabbitTemplate rabbitTemplate;
    @Test
    public void testSimpleQueue() {
        // 队列名称
        String queueName = "simple.queue";
        // 消息
        String message = "hello, spring amqp!";
        // 发送消息
        rabbitTemplate.convertAndSend(queueName, message);
        System.out.println("发送成功");
    }
}

```

打开控制台，可以看到消息已经发送到队列中：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687173164620-51a78ccb-b2a1-474b-8147-076f4b8cee12.png#averageHue=%23f8f7f6&clientId=u0fe93ba5-a0ba-4&from=paste&height=431&id=u34a6c895&originHeight=534&originWidth=1267&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=43690&status=done&style=none&taskId=u6fd3cf33-b6c0-42a6-91f3-e263e176174&title=&width=1022.1176142935356)
接下来，我们再来实现消息接收。
#### 消息接收
首先配置MQ地址，在`consumer`服务的`application.yml`中添加配置：
```yaml
logging:
  pattern:
    dateformat: MM-dd HH:mm:ss:SSS
spring:
  rabbitmq:
    host: 172.31.177.123 # 你的虚拟机IP
    port: 5672 # 端口
    virtual-host: / # 虚拟主机
    username: sunshine # 用户名
    password: 123456 # 密码
```

然后在`consumer`服务的`com.itheima.consumer.listener`包中新建一个类`SpringRabbitListener`，代码如下：
```java
package com.test.consumer.listeners;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
 * @version 1.0
 * @description: TODO
 * @author: 12041
 * @date: 2024/6/12 17:34
 */

@Component
public class MqListener {
	// 利用RabbitListener来声明要监听的队列信息
    // 将来一旦监听的队列中有了消息，就会推送给当前服务，调用当前方法，处理消息。
    // 可以看到方法体中接收的就是消息体的内容
    @RabbitListener(queues = "simple.queue")
    public void listenSimpleQueue(String msg){
        System.out.println("消费者收到simple.queue的消息：" + msg);
    }
}
```

#### 测试
启动consumer服务，然后在publisher服务中运行测试代码，发送MQ消息。最终consumer收到消息：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687173574481-792b9a3c-bcab-4f96-9d09-206cccdd1456.png#averageHue=%23f7f9f5&clientId=u0fe93ba5-a0ba-4&from=paste&height=405&id=ua133b5cf&originHeight=502&originWidth=1805&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=226083&status=done&style=none&taskId=u72073b8f-ef3f-4ec4-af3e-4187138ca2a&title=&width=1456.134407103261)

### WorkQueues模型（解决消息堆积）
Work queues，任务模型。简单来说就是**让多个消费者绑定到一个队列，共同消费队列中的消息**。
![](https://cdn.nlark.com/yuque/0/2023/jpeg/27967491/1687261956699-4b3c9999-ee86-4dda-a795-1ea5f4f9eef3.jpeg)

当消息处理比较耗时的时候，可能生产消息的速度会远远大于消息的消费速度。长此以往，消息就会堆积越来越多，无法及时处理。
此时就可以使用work 模型，**多个消费者共同处理消息处理，消息处理的速度就能大大提高**了。

接下来，我们就来模拟这样的场景。
首先，我们在控制台创建一个新的队列，命名为`work.queue`：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687179664222-3e226588-63e3-4275-a9e2-cce5c8e93d4c.png#averageHue=%23f5f2f1&clientId=u0fe93ba5-a0ba-4&from=paste&height=321&id=u96998af1&originHeight=398&originWidth=1180&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=41883&status=done&style=none&taskId=ubcca08d6-3211-435a-ae7c-10fcf4daafe&title=&width=951.9327425938216)
#### 消息发送
这次我们循环发送，模拟大量消息堆积现象。
在publisher服务中的SpringAmqpTest类中添加一个测试方法：
```java
/**
     * workQueue
     * 向队列中不停发送消息，模拟消息堆积。
     */
@Test
public void testWorkQueue() throws InterruptedException {
    // 队列名称
    String queueName = "simple.queue";
    // 消息
    String message = "hello, message_";
    for (int i = 0; i < 50; i++) {
        // 发送消息，每20毫秒发送一次，相当于每秒发送50条消息
        rabbitTemplate.convertAndSend(queueName, message + i);
        Thread.sleep(20);
    }
}
```

#### 消息接收
要模拟多个消费者绑定同一个队列，我们在consumer服务的SpringRabbitListener中添加2个新的方法：
```java
@RabbitListener(queues = "work.queue")
public void listenWorkQueue1(String msg) throws InterruptedException {
    System.out.println("消费者1接收到消息：【" + msg + "】" + LocalTime.now());
    Thread.sleep(20);
}

@RabbitListener(queues = "work.queue")
public void listenWorkQueue2(String msg) throws InterruptedException {
    System.err.println("消费者2........接收到消息：【" + msg + "】" + LocalTime.now());
    Thread.sleep(200);
}
```

注意到这两消费者，都设置了`Thead.sleep`，模拟任务耗时：

- 消费者1 sleep了20毫秒，相当于每秒钟处理50个消息（速度快）
- 消费者2 sleep了200毫秒，相当于每秒处理5个消息（速度慢）

#### 测试
启动ConsumerApplication后，在执行publisher服务中刚刚编写的发送测试方法testWorkQueue。
最终结果如下：
```java
消费者1接收到消息：【hello, message_0】21:06:00.869555300
消费者2........接收到消息：【hello, message_1】21:06:00.884518
消费者1接收到消息：【hello, message_2】21:06:00.907454400
消费者1接收到消息：【hello, message_4】21:06:00.953332100
消费者1接收到消息：【hello, message_6】21:06:00.997867300
消费者1接收到消息：【hello, message_8】21:06:01.042178700
消费者2........接收到消息：【hello, message_3】21:06:01.086478800
消费者1接收到消息：【hello, message_10】21:06:01.087476600
消费者1接收到消息：【hello, message_12】21:06:01.132578300
消费者1接收到消息：【hello, message_14】21:06:01.175851200
消费者1接收到消息：【hello, message_16】21:06:01.218533400
消费者1接收到消息：【hello, message_18】21:06:01.261322900
消费者2........接收到消息：【hello, message_5】21:06:01.287003700
消费者1接收到消息：【hello, message_20】21:06:01.304412400
消费者1接收到消息：【hello, message_22】21:06:01.349950100
消费者1接收到消息：【hello, message_24】21:06:01.394533900
消费者1接收到消息：【hello, message_26】21:06:01.439876500
消费者1接收到消息：【hello, message_28】21:06:01.482937800
消费者2........接收到消息：【hello, message_7】21:06:01.488977100
消费者1接收到消息：【hello, message_30】21:06:01.526409300
消费者1接收到消息：【hello, message_32】21:06:01.572148
消费者1接收到消息：【hello, message_34】21:06:01.618264800
消费者1接收到消息：【hello, message_36】21:06:01.660780600
消费者2........接收到消息：【hello, message_9】21:06:01.689189300
消费者1接收到消息：【hello, message_38】21:06:01.705261
消费者1接收到消息：【hello, message_40】21:06:01.746927300
消费者1接收到消息：【hello, message_42】21:06:01.789835
消费者1接收到消息：【hello, message_44】21:06:01.834393100
消费者1接收到消息：【hello, message_46】21:06:01.875312100
消费者2........接收到消息：【hello, message_11】21:06:01.889969500
消费者1接收到消息：【hello, message_48】21:06:01.920702500
消费者2........接收到消息：【hello, message_13】21:06:02.090725900
消费者2........接收到消息：【hello, message_15】21:06:02.293060600
消费者2........接收到消息：【hello, message_17】21:06:02.493748
消费者2........接收到消息：【hello, message_19】21:06:02.696635100
消费者2........接收到消息：【hello, message_21】21:06:02.896809700
消费者2........接收到消息：【hello, message_23】21:06:03.099533400
消费者2........接收到消息：【hello, message_25】21:06:03.301446400
消费者2........接收到消息：【hello, message_27】21:06:03.504999100
消费者2........接收到消息：【hello, message_29】21:06:03.705702500
消费者2........接收到消息：【hello, message_31】21:06:03.906601200
消费者2........接收到消息：【hello, message_33】21:06:04.108118500
消费者2........接收到消息：【hello, message_35】21:06:04.308945400
消费者2........接收到消息：【hello, message_37】21:06:04.511547700
消费者2........接收到消息：【hello, message_39】21:06:04.714038400
消费者2........接收到消息：【hello, message_41】21:06:04.916192700
消费者2........接收到消息：【hello, message_43】21:06:05.116286400
消费者2........接收到消息：【hello, message_45】21:06:05.318055100
消费者2........接收到消息：【hello, message_47】21:06:05.520656400
消费者2........接收到消息：【hello, message_49】21:06:05.723106700

```

可以看到消费者1和消费者2竟然每人消费了25条消息：

- 消费者1很快完成了自己的25条消息
- 消费者2却在缓慢的处理自己的25条消息。

也就是说消息是平均分配给每个消费者，并没有考虑到消费者的处理能力。导致1个消费者空闲，另一个消费者忙的不可开交。没有充分利用每一个消费者的能力，最终消息处理的耗时远远超过了1秒。这样显然是有问题的。
#### 能者多劳
在spring中有一个简单的配置，可以解决这个问题。我们修改consumer服务的application.yml文件，添加配置：
```yaml
spring:
  rabbitmq:
    listener:
      simple:
        prefetch: 1 # 每次只能获取一条消息，处理完成才能获取下一个消息
```

再次测试，发现结果如下：
```java
消费者1接收到消息：【hello, message_0】21:12:51.659664200
消费者2........接收到消息：【hello, message_1】21:12:51.680610
消费者1接收到消息：【hello, message_2】21:12:51.703625
消费者1接收到消息：【hello, message_3】21:12:51.724330100
消费者1接收到消息：【hello, message_4】21:12:51.746651100
消费者1接收到消息：【hello, message_5】21:12:51.768401400
消费者1接收到消息：【hello, message_6】21:12:51.790511400
消费者1接收到消息：【hello, message_7】21:12:51.812559800
消费者1接收到消息：【hello, message_8】21:12:51.834500600
消费者1接收到消息：【hello, message_9】21:12:51.857438800
消费者1接收到消息：【hello, message_10】21:12:51.880379600
消费者2........接收到消息：【hello, message_11】21:12:51.899327100
消费者1接收到消息：【hello, message_12】21:12:51.922828400
消费者1接收到消息：【hello, message_13】21:12:51.945617400
消费者1接收到消息：【hello, message_14】21:12:51.968942500
消费者1接收到消息：【hello, message_15】21:12:51.992215400
消费者1接收到消息：【hello, message_16】21:12:52.013325600
消费者1接收到消息：【hello, message_17】21:12:52.035687100
消费者1接收到消息：【hello, message_18】21:12:52.058188
消费者1接收到消息：【hello, message_19】21:12:52.081208400
消费者2........接收到消息：【hello, message_20】21:12:52.103406200
消费者1接收到消息：【hello, message_21】21:12:52.123827300
消费者1接收到消息：【hello, message_22】21:12:52.146165100
消费者1接收到消息：【hello, message_23】21:12:52.168828300
消费者1接收到消息：【hello, message_24】21:12:52.191769500
消费者1接收到消息：【hello, message_25】21:12:52.214839100
消费者1接收到消息：【hello, message_26】21:12:52.238998700
消费者1接收到消息：【hello, message_27】21:12:52.259772600
消费者1接收到消息：【hello, message_28】21:12:52.284131800
消费者2........接收到消息：【hello, message_29】21:12:52.306190600
消费者1接收到消息：【hello, message_30】21:12:52.325315800
消费者1接收到消息：【hello, message_31】21:12:52.347012500
消费者1接收到消息：【hello, message_32】21:12:52.368508600
消费者1接收到消息：【hello, message_33】21:12:52.391785100
消费者1接收到消息：【hello, message_34】21:12:52.416383800
消费者1接收到消息：【hello, message_35】21:12:52.439019
消费者1接收到消息：【hello, message_36】21:12:52.461733900
消费者1接收到消息：【hello, message_37】21:12:52.485990
消费者1接收到消息：【hello, message_38】21:12:52.509219900
消费者2........接收到消息：【hello, message_39】21:12:52.523683400
消费者1接收到消息：【hello, message_40】21:12:52.547412100
消费者1接收到消息：【hello, message_41】21:12:52.571191800
消费者1接收到消息：【hello, message_42】21:12:52.593024600
消费者1接收到消息：【hello, message_43】21:12:52.616731800
消费者1接收到消息：【hello, message_44】21:12:52.640317
消费者1接收到消息：【hello, message_45】21:12:52.663111100
消费者1接收到消息：【hello, message_46】21:12:52.686727
消费者1接收到消息：【hello, message_47】21:12:52.709266500
消费者2........接收到消息：【hello, message_48】21:12:52.725884900
消费者1接收到消息：【hello, message_49】21:12:52.746299900

```

可以发现，由于消费者1处理速度较快，所以处理了更多的消息；消费者2处理速度较慢，只处理了6条消息。而最终总的执行耗时也在1秒左右，大大提升。
**正所谓能者多劳，这样充分利用了每一个消费者的处理能力，可以有效避免消息积压问题。**

### 总结
Work模型的使用：

- 多个消费者绑定到一个队列，同一条消息只会被一个消费者处理
- 通过设置prefetch来控制消费者预取的消息数量

### 交换机类型
在之前的两个测试案例中，都没有交换机，生产者直接发送消息到队列。而一旦引入交换机，消息发送的模式会有很大变化：
![](https://cdn.nlark.com/yuque/0/2023/jpeg/27967491/1687264784359-de7cbc4a-ec60-461d-a6a4-3474ba52e0d0.jpeg)
可以看到，在订阅模型中，多了一个exchange角色，而且过程略有变化：

- **Publisher**：生产者，不再发送消息到队列中，而是发给交换机
- **Exchange**：交换机，一方面，接收生产者发送的消息。另一方面，知道如何处理消息，例如递交给某个特别队列、递交给所有队列、或是将消息丢弃。到底如何操作，取决于Exchange的类型。
- **Queue**：消息队列也与以前一样，接收消息、缓存消息。不过队列一定要与交换机绑定。
- **Consumer**：消费者，与以前一样，订阅队列，没有变化

**Exchange（交换机）只负责转发消息，不具备存储消息的能力**，因此如果没有任何队列与Exchange绑定，或者没有符合路由规则的队列，那么消息会丢失！

交换机的类型有四种：

- **Fanout**：广播，将消息交给所有绑定到交换机的队列。我们最早在控制台使用的正是Fanout交换机
- **Direct**：订阅，基于RoutingKey（路由key）发送给订阅了消息的队列
- **Topic**：通配符订阅，与Direct类似，只不过RoutingKey可以使用通配符
- **Headers**：头匹配，基于MQ的消息头匹配，用的较少。

课堂中，我们讲解前面的三种交换机模式。

### Fanout交换机（广播）
Fanout，英文翻译是扇出，我觉得在MQ中叫广播更合适。
在广播模式下，消息发送流程是这样的：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687181415478-ea4bb17b-48bf-4303-9242-27703efb39d8.png#averageHue=%23fbf6f6&clientId=u0fe93ba5-a0ba-4&from=paste&height=389&id=u41b3ec34&originHeight=482&originWidth=1598&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=84491&status=done&style=none&taskId=u0db849d5-c734-41f3-87c2-d1fe9ec7575&title=&width=1289.1428158177346)

- 1）  可以有多个队列
- 2）  每个队列都要绑定到Exchange（交换机）
- 3）  生产者发送的消息，只能发送到交换机
- 4）  交换机把消息发送给绑定过的所有队列
- 5）  订阅队列的消费者都能拿到消息（多个实例多个消费者）

我们的计划是这样的：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687182474076-2b479229-56a6-4163-93c4-a6a7187f3dbe.png#averageHue=%23f9f4f4&clientId=u0fe93ba5-a0ba-4&from=paste&height=248&id=ue59e0d8c&originHeight=308&originWidth=1314&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=48827&status=done&style=none&taskId=u7d52896e-f59b-494d-bb25-b376c96414e&title=&width=1060.0335794646453)

- 创建一个名为` hmall.fanout`的交换机，类型是`Fanout`
- 创建两个队列`fanout.queue1`和`fanout.queue2`，绑定到交换机`hmall.fanout`

#### 声明队列和交换机
在控制台创建队列`fanout.queue1`:
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689946886137-0bcb8641-faf1-4bea-b553-4b3bb96d224c.png#averageHue=%23f8f7f7&clientId=uf6195e90-5366-4&from=paste&height=380&id=ub435a220&originHeight=424&originWidth=1117&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=31069&status=done&style=none&taskId=uf02d05dd-b916-4d37-b2f4-dba06eff8a9&title=&width=1001.2324716000069)
在创建一个队列`fanout.queue2`：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689946949922-c4e442c3-568b-4164-a327-74e30aa9b9d0.png#averageHue=%23f8f6f5&clientId=uf6195e90-5366-4&from=paste&height=380&id=u452ddf31&originHeight=424&originWidth=916&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=29357&status=done&style=none&taskId=u657c70e9-017c-4339-98e0-2d408950262&title=&width=821.0644082234613)
然后再创建一个交换机：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689948003779-ea99bac6-6b84-48f3-9760-a719ba5f0c2e.png#averageHue=%23f8f6f6&clientId=uf6195e90-5366-4&from=paste&height=359&id=ud456637e&originHeight=401&originWidth=886&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=22862&status=done&style=none&taskId=uba3f2a17-5520-43f0-abd4-2eec22a7c3a&title=&width=794.1736524956187)
然后绑定两个队列到交换机：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689947064113-23e123ec-a601-4af4-a44f-70f7b4ef4063.png#averageHue=%23f8f7f7&clientId=uf6195e90-5366-4&from=paste&height=527&id=u2d63999d&originHeight=588&originWidth=978&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=34267&status=done&style=none&taskId=uc512438d-9693-44f1-9c35-33917ddbced&title=&width=876.6386367276695)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689947695506-5346b816-61c7-4bfe-a28d-db261b3598c5.png#averageHue=%23f8f7f7&clientId=uf6195e90-5366-4&from=paste&height=537&id=u17bcbe41&originHeight=599&originWidth=985&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=34532&status=done&style=none&taskId=u17b49cc4-004f-4e31-bd46-bdef7fe19a1&title=&width=882.9131463974993)


#### 消息发送
在publisher服务的SpringAmqpTest类中添加测试方法：
```java
@Test
public void testFanoutExchange() {
    // 交换机名称
    String exchangeName = "hmall.fanout";
    // 消息
    String message = "hello, everyone!";
    rabbitTemplate.convertAndSend(exchangeName, "", message);
}
```

#### 消息接收
在consumer服务的SpringRabbitListener中添加两个方法，作为消费者：
```java
@RabbitListener(queues = "fanout.queue1")
public void listenFanoutQueue1(String msg) {
    System.out.println("消费者1接收到Fanout消息：【" + msg + "】");
}

@RabbitListener(queues = "fanout.queue2")
public void listenFanoutQueue2(String msg) {
    System.out.println("消费者2接收到Fanout消息：【" + msg + "】");
}
```

#### 总结
交换机的作用是什么？

- 接收publisher发送的消息
- 将消息按照规则路由到与之绑定的队列
- 不能缓存消息，路由失败，消息丢失
- FanoutExchange的会将消息路由到每个绑定的队列


### Direct交换机（根据路由key定向）
在Fanout模式中，一条消息，会被所有订阅的队列都消费。但是，在某些场景下，我们希望不同的消息被不同的队列消费。这时就要用到Direct类型的Exchange。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687182404437-027a5191-b037-4033-baab-6bafd998161d.png#averageHue=%23fbf5f5&clientId=u0fe93ba5-a0ba-4&from=paste&height=430&id=uf5b6a678&originHeight=533&originWidth=1686&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=93278&status=done&style=none&taskId=ud6ffb209-4207-40a6-a7ab-4977cab3b5d&title=&width=1360.1344101806637)
在Direct模型下：

- 队列与交换机的绑定，不能是任意绑定了，而是要指定一个`RoutingKey`（路由key）
- 消息的发送方在 向 Exchange发送消息时，也必须指定消息的 `RoutingKey`。
- Exchange不再把消息交给每一个绑定的队列，而是根据消息的`Routing Key`进行判断，只有队列的`Routingkey`与消息的 `Routing key`完全一致，才会接收到消息

**案例需求如图**：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687182519270-885589ec-7f4a-492a-ab78-cddf109121cc.png#averageHue=%23fbf6f6&clientId=u0fe93ba5-a0ba-4&from=paste&height=430&id=u4dde4f59&originHeight=533&originWidth=1362&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=64401&status=done&style=none&taskId=u62c673b4-a71b-40bf-af49-a8c1a4df0de&title=&width=1098.7562672989704)

1.  声明一个名为`hmall.direct`的交换机
2. 声明队列`direct.queue1`，绑定`hmall.direct`，`bindingKey`为`blud`和`red`
3. 声明队列`direct.queue2`，绑定`hmall.direct`，`bindingKey`为`yellow`和`red`
4.  在`consumer`服务中，编写两个消费者方法，分别监听direct.queue1和direct.queue2 
5.  在publisher中编写测试方法，向`hmall.direct`发送消息 


#### 声明队列和交换机
首先在控制台声明两个队列`direct.queue1`和`direct.queue2`，这里不再展示过程：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689947864231-5ace5d74-fdac-4a2a-9f92-180df06fe4ad.png#averageHue=%23f2f0ef&clientId=uf6195e90-5366-4&from=paste&height=403&id=u292b8851&originHeight=450&originWidth=1157&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=56948&status=done&style=none&taskId=uf110e543-1005-4b1a-b23e-d8529df3c0c&title=&width=1037.0868125704637)
然后声明一个direct类型的交换机，命名为`hmall.direct`:
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689948033525-e6ea1134-c2ef-4b80-86b2-b364c1301335.png#averageHue=%23f8f6f6&clientId=uf6195e90-5366-4&from=paste&height=367&id=u0964090b&originHeight=409&originWidth=871&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=22938&status=done&style=none&taskId=u127085fa-3898-488f-afef-52a7cbf9e2d&title=&width=780.7282746316974)
然后使用`red`和`blue`作为key，绑定`direct.queue1`到`hmall.direct`：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689948151280-bed1019d-7d60-455b-95b8-754e266edf50.png#averageHue=%23f8f6f6&clientId=uf6195e90-5366-4&from=paste&height=523&id=uf5aa7079&originHeight=583&originWidth=942&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=35339&status=done&style=none&taskId=u31d3c033-0a9a-446f-9ebc-a90405ba47d&title=&width=844.3697298542583)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689948181033-6b1e6556-0110-4ed8-a2cb-8bc2dd388903.png#averageHue=%23f8f6f6&clientId=uf6195e90-5366-4&from=paste&height=522&id=u4e6a2147&originHeight=582&originWidth=874&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=34608&status=done&style=none&taskId=u274e41ea-73f2-4da5-bc23-fed091d234d&title=&width=783.4173502044816)

同理，使用`red`和`yellow`作为key，绑定`direct.queue2`到`hmall.direct`，步骤略，最终结果：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689948243879-c97a0e6f-807a-4bc3-ad53-032c378008f3.png#averageHue=%23f4f4f3&clientId=uf6195e90-5366-4&from=paste&height=515&id=ufb0f0d5d&originHeight=575&originWidth=834&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=37957&status=done&style=none&taskId=uaae894e6-bc07-4e01-bf1f-53561ffd05a&title=&width=747.5630092340249)
#### 消息接收
在consumer服务的SpringRabbitListener中添加方法：
```java
@RabbitListener(queues = "direct.queue1")
public void listenDirectQueue1(String msg) {
    System.out.println("消费者1接收到direct.queue1的消息：【" + msg + "】");
}

@RabbitListener(queues = "direct.queue2")
public void listenDirectQueue2(String msg) {
    System.out.println("消费者2接收到direct.queue2的消息：【" + msg + "】");
}
```


#### 消息发送
在publisher服务的SpringAmqpTest类中添加测试方法：
```java
@Test
public void testSendDirectExchange() {
    // 交换机名称
    String exchangeName = "hmall.direct";
    // 消息
    String message = "红色警报！日本乱排核废水，导致海洋生物变异，惊现哥斯拉！";
    // 发送消息
    rabbitTemplate.convertAndSend(exchangeName, "red", message);
}
```
由于使用的red这个key，所以两个消费者都收到了消息：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687182883516-906024ce-6ade-4dcd-8b4e-2b0cfc1bd03a.png#averageHue=%23f7f9f3&clientId=u0fe93ba5-a0ba-4&from=paste&height=136&id=uc0e2efee&originHeight=168&originWidth=1410&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=85796&status=done&style=none&taskId=u4ab862c3-bb61-4a97-87d8-ac463218ab2&title=&width=1137.4789551332954)
我们再切换为blue这个key：
```java
@Test
public void testSendDirectExchange() {
    // 交换机名称
    String exchangeName = "hmall.direct";
    // 消息
    String message = "最新报道，哥斯拉是居民自治巨型气球，虚惊一场！";
    // 发送消息
    rabbitTemplate.convertAndSend(exchangeName, "blue", message);
}
```
你会发现，只有消费者1收到了消息：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687182898732-afba28a8-c57e-4ccb-a330-9e3315879b31.png#averageHue=%23f7f9f4&clientId=u0fe93ba5-a0ba-4&from=paste&height=175&id=udcac360f&originHeight=217&originWidth=1237&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=99781&status=done&style=none&taskId=ua85a2eca-9806-4a15-997d-ee3c73528b6&title=&width=997.9159343970824)

#### 总结
描述下Direct交换机与Fanout交换机的差异？

- Fanout交换机将消息路由给每一个与之绑定的队列
- Direct交换机根据RoutingKey判断路由给哪个队列
- 如果多个队列具有相同的RoutingKey，则与Fanout功能类似


### Topic交换机（RoutingKey可以是多个单词的列表，以`.`分割）
#### 说明
`Topic`类型的`Exchange`与`Direct`相比，都是可以根据`RoutingKey`把消息路由到不同的队列。

只不过`BindingKey` 一般都是有一个或多个单词组成，多个单词之间以`.`分割，例如： `item.insert`

`Topic`类型`Exchange`可以让队列在绑定`BindingKey` 的时候使用通配符！

通配符规则：

- `#`：匹配0个或多个词
- `*`：匹配不多不少恰好1个词

举例：

- `item.#`：能够匹配`item.spu.insert` 或者 `item.spu`
- `item.*`：只能匹配`item.spu`

图示：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687183148068-ad50ba76-0024-460b-9b24-3cf7a0fe172e.png#averageHue=%23f9f4f3&clientId=u0fe93ba5-a0ba-4&from=paste&height=305&id=u74a65bd0&originHeight=378&originWidth=1337&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=57084&status=done&style=none&taskId=u90f6bfb4-4f10-4ebe-8edb-70856565f27&title=&width=1078.5882007185928)
假如此时publisher发送的消息使用的`RoutingKey`共有四种：

- `china.news `代表有中国的新闻消息；
- `china.weather` 代表中国的天气消息；
- `japan.news` 则代表日本新闻
- `japan.weather` 代表日本的天气消息；

解释：

- `topic.queue1`：绑定的是`china.#` ，凡是以 `china.`开头的`routing key` 都会被匹配到，包括：
   - `china.news`
   - `china.weather`
- `topic.queue2`：绑定的是`#.news` ，凡是以 `.news`结尾的 `routing key` 都会被匹配。包括:
   - `china.news`
   - `japan.news`

接下来，我们就按照上图所示，来演示一下Topic交换机的用法。
首先，在控制台按照图示例子创建队列、交换机，并利用通配符绑定队列和交换机。此处步骤略。最终结果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689948475987-05bab459-43b6-47ad-bbfc-faf9f50d776e.png#averageHue=%23f5f5f4&clientId=uf6195e90-5366-4&from=paste&height=419&id=u3d545ee6&originHeight=468&originWidth=879&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=32637&status=done&style=none&taskId=u1bf5deb0-6b33-48e6-9d9d-d273a1be805&title=&width=787.8991428257888)

#### 消息发送
在publisher服务的SpringAmqpTest类中添加测试方法：
```java
/**
 * topicExchange
 */
@Test消息发送
public void testSendTopicExchange() {
    // 交换机名称
    String exchangeName = "hmall.topic";
    // 消息
    String message = "喜报！孙悟空大战哥斯拉，胜!";
    // 发送消息
    rabbitTemplate.convertAndSend(exchangeName, "china.news", message);
}
```

#### 消息接收
在consumer服务的SpringRabbitListener中添加方法：
```java
@RabbitListener(queues = "topic.queue1")
public void listenTopicQueue1(String msg){
    System.out.println("消费者1接收到topic.queue1的消息：【" + msg + "】");
}

@RabbitListener(queues = "topic.queue2")
public void listenTopicQueue2(String msg){
    System.out.println("消费者2接收到topic.queue2的消息：【" + msg + "】");
}
```

#### 总结

描述下Direct交换机与Topic交换机的差异？

- Topic交换机接收的消息RoutingKey必须是多个单词，以 **`.`** 分割
- Topic交换机与队列绑定时的bindingKey可以指定通配符
- `#`：代表0个或多个词
- `*`：代表1个词

### 声明队列和交换机
在之前我们都是基于RabbitMQ控制台来创建队列、交换机。但是在实际开发时，队列和交换机是程序员定义的，将来项目上线，又要交给运维去创建。那么程序员就需要把程序中运行的所有队列和交换机都写下来，交给运维。在这个过程中是很容易出现错误的。
因此推荐的做法是由程序启动时检查队列和交换机是否存在，如果不存在自动创建。
#### 基本API
#### 1. Queue类
SpringAMQP提供了一个Queue类，用来创建队列：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689945200636-5f4a823f-6f36-4088-9b67-7b9b3ae48079.png#averageHue=%23f9fcf7&clientId=uf6195e90-5366-4&from=paste&height=241&id=u2a7bba30&originHeight=269&originWidth=930&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=42392&status=done&style=none&taskId=uf1b5d62e-4e09-4ba8-a011-f8345dac005&title=&width=833.6134275631213)

#### 2. Exchange接口
SpringAMQP还提供了一个Exchange接口，来表示所有不同类型的交换机：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687181804385-c500bc13-9f81-4071-ad8a-598fa5f57d97.png#averageHue=%23f8f8f7&clientId=u0fe93ba5-a0ba-4&from=paste&height=379&id=Qewqz&originHeight=470&originWidth=1469&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=23466&status=done&style=none&taskId=u357861af-c5aa-43c4-aafd-97dadaf8714&title=&width=1185.0755922629864)
我们可以自己创建队列和交换机。

不过SpringAMQP还提供了**ExchangeBuilder**来简化这个过程：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689945421476-fe44bf9a-d6eb-4f51-af02-374359c8e70b.png#averageHue=%23f8f7f5&clientId=uf6195e90-5366-4&from=paste&height=278&id=uae4334fe&originHeight=310&originWidth=781&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=34426&status=done&style=none&taskId=uc1b7bc5b-68b9-4ce9-afe5-9eb733e8f4b&title=&width=700.0560074481696)
而在绑定队列和交换机时，则需要使用**BindingBuilder**来创建Binding对象：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1689945503733-13d2179c-f586-4de5-b18c-d3b5749f1f96.png#averageHue=%23dcab6a&clientId=uf6195e90-5366-4&from=paste&height=145&id=u91096ccd&originHeight=162&originWidth=659&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=16128&status=done&style=none&taskId=u1da153f0-6e86-45b2-900b-8f83e489358&title=&width=590.7002674882763)

#### fanout示例
在`consumer`中创建一个类，声明队列和交换机：
```java
package com.itheima.consumer.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.FanoutExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FanoutConfig {
    /**
     * 声明交换机
     * @return Fanout类型交换机
     */
    @Bean
    public FanoutExchange fanoutExchange(){
        // return ExchangeBuilder.fanoutExchange("").build();
        return new FanoutExchange("hmall.fanout");
    }

    /**
     * 第1个队列
     */
    @Bean
    public Queue fanoutQueue1(){
        // return QueueBuilder.durable( "fanout.queue1").build();
        return new Queue("fanout.queue1"); // 默认持久
    } 

    /**
     * 绑定队列和交换机
     */
    @Bean
    public Binding bindingQueue1(Queue fanoutQueue1, FanoutExchange fanoutExchange){
        return BindingBuilder.bind(fanoutQueue1).to(fanoutExchange);
    }

    /**
     * 第2个队列
     */
    @Bean
    public Queue fanoutQueue2(){
        return new Queue("fanout.queue2");
    }

    /**
     * 绑定队列和交换机
     */
    @Bean
    public Binding bindingQueue2(){
        return BindingBuilder.bind(fanoutQueue2()).to(fanoutExchange); // 优雅
    }
}
```

#### direct示例
direct模式由于要绑定多个KEY，会非常麻烦，每一个Key都要编写一个binding：
```java
package com.itheima.consumer.config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DirectConfig {

    /**
     * 声明交换机
     * @return Direct类型交换机
     */
    @Bean
    public DirectExchange directExchange(){
        return ExchangeBuilder.directExchange("hmall.direct").build();
    }

    /**
     * 第1个队列
     */
    @Bean
    public Queue directQueue1(){
        return new Queue("direct.queue1");
    }

    /**
     * 绑定队列和交换机
     */
    @Bean
    public Binding bindingQueue1WithRed(Queue directQueue1, DirectExchange directExchange){
        return BindingBuilder.bind(directQueue1).to(directExchange).with("red");
    }
    /**
     * 绑定队列和交换机
     */
    @Bean
    public Binding bindingQueue1WithBlue(Queue directQueue1, DirectExchange directExchange){
        return BindingBuilder.bind(directQueue1).to(directExchange).with("blue");
    }

    /**
     * 第2个队列
     */
    @Bean
    public Queue directQueue2(){
        return new Queue("direct.queue2");
    }

    /**
     * 绑定队列和交换机
     */
    @Bean
    public Binding bindingQueue2WithRed(Queue directQueue2, DirectExchange directExchange){
        return BindingBuilder.bind(directQueue2).to(directExchange).with("red");
    }
    /**
     * 绑定队列和交换机
     */
    @Bean
    public Binding bindingQueue2WithYellow(Queue directQueue2, DirectExchange directExchange){
        return BindingBuilder.bind(directQueue2).to(directExchange).with("yellow");
    }
}

```

#### 基于@RabbitListener注解声明
基于@Bean的方式声明队列和交换机比较麻烦，Spring还提供了基于注解方式来声明。

例如，我们同样声明Direct模式的交换机和队列：
```java
@RabbitListener(bindings = @QueueBinding(
    value = @Queue(name = "direct.queue1", durable = "true"),
    exchange = @Exchange(name = "hmall.direct", type = ExchangeTypes.DIRECT),
    key = {"red", "blue"}
))
public void listenDirectQueue1(String msg){
    System.out.println("消费者1接收到direct.queue1的消息：【" + msg + "】");
}

@RabbitListener(bindings = @QueueBinding(
    value = @Queue(name = "direct.queue2"),
    exchange = @Exchange(name = "hmall.direct", type = ExchangeTypes.DIRECT),
    key = {"red", "yellow"}
))
public void listenDirectQueue2(String msg){
    System.out.println("消费者2接收到direct.queue2的消息：【" + msg + "】");
}
```

是不是简单多了。
再试试Topic模式：
```java
@RabbitListener(bindings = @QueueBinding(
    value = @Queue(name = "topic.queue1"),
    exchange = @Exchange(name = "hmall.topic", type = ExchangeTypes.TOPIC),
    key = "china.#"
))
public void listenTopicQueue1(String msg){
    System.out.println("消费者1接收到topic.queue1的消息：【" + msg + "】");
}

@RabbitListener(bindings = @QueueBinding(
    value = @Queue(name = "topic.queue2"),
    exchange = @Exchange(name = "hmall.topic", type = ExchangeTypes.TOPIC),
    key = "#.news"
))
public void listenTopicQueue2(String msg){
    System.out.println("消费者2接收到topic.queue2的消息：【" + msg + "】");
}
```


### 消息转换器
Spring的消息发送代码接收的消息体是一个Object：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687183652317-82b0319b-03aa-46ed-afbc-373e7a6fa0f1.png#averageHue=%23f6f9f5&clientId=u0fe93ba5-a0ba-4&from=paste&height=394&id=u2c63fbb1&originHeight=488&originWidth=1448&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=122291&status=done&style=none&taskId=u0da81780-720e-4c27-9c2f-c24d7dc0123&title=&width=1168.1344163354693)
而在数据传输时，它会把你发送的消息序列化为字节发送给MQ，接收消息的时候，还会把字节反序列化为Java对象。
只不过，默认情况下Spring采用的序列化方式是JDK序列化。众所周知，JDK序列化存在下列问题：

- 数据体积过大
- 有安全漏洞
- 可读性差

我们来测试一下。

#### 测试默认转换器
1）创建测试队列
首先，我们在consumer服务中声明一个新的配置类：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687183868403-242aa812-a07f-4748-8863-dc5d1e161dc1.png#averageHue=%23f9fbf8&clientId=u0fe93ba5-a0ba-4&from=paste&height=351&id=u77b665f4&originHeight=435&originWidth=1053&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=48481&status=done&style=none&taskId=uf6d36991-ec76-497c-93d3-3e96d9d6590&title=&width=849.4789643655035)
利用@Bean的方式创建一个队列，具体代码：
```java
package com.itheima.consumer.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageConfig {

    @Bean
    public Queue objectQueue() {
        return new Queue("object.queue");
    }
}
```

注意，这里我们先不要给这个队列添加消费者，我们要查看消息体的格式。

重启consumer服务以后，该队列就会被自动创建出来了：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687184033157-c4c8e59e-a2b3-4b2b-9c20-ca3c597e556c.png#averageHue=%23f3f0ef&clientId=u0fe93ba5-a0ba-4&from=paste&height=456&id=u7c3fdb16&originHeight=565&originWidth=1196&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=72445&status=done&style=none&taskId=u03cddb0f-41a3-483d-83c7-d53a5ecb269&title=&width=964.8403052052632)

2）发送消息
我们在publisher模块的SpringAmqpTest中新增一个消息发送的代码，发送一个Map对象：
```java
@Test
public void testSendMap() throws InterruptedException {
    // 准备消息
    Map<String,Object> msg = new HashMap<>();
    msg.put("name", "柳岩");
    msg.put("age", 21);
    // 发送消息
    rabbitTemplate.convertAndSend("object.queue", msg);
}
```

发送消息后查看控制台：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687184206574-69117533-5b4e-4172-b254-23130023f711.png#averageHue=%23f9f7f7&clientId=u0fe93ba5-a0ba-4&from=paste&height=528&id=u038b25c3&originHeight=654&originWidth=1244&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=46749&status=done&style=none&taskId=u8bea522c-fa98-48f1-bd84-1acfb50fff8&title=&width=1003.5629930395882)
可以看到消息格式非常不友好。

#### 配置JSON转换器
显然，JDK序列化方式并不合适。我们希望消息体的体积更小、可读性更高，因此可以使用JSON方式来做序列化和反序列化。

在`publisher`和`consumer`两个服务中都引入依赖：
```xml
<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-xml</artifactId>
    <version>2.9.10</version>
</dependency>
```
注意，**如果项目中引入了`spring-boot-starter-web`依赖，则无需再次引入`Jackson`依赖**。


配置消息转换器，在`publisher`和`consumer`两个服务的启动类中添加一个Bean即可：
```java
@Bean
public MessageConverter messageConverter(){
    // 1.定义消息转换器
    Jackson2JsonMessageConverter jackson2JsonMessageConverter = new Jackson2JsonMessageConverter();
    // 2.配置自动创建消息id，用于识别不同消息，也可以在业务中基于ID判断是否是重复消息
    jackson2JsonMessageConverter.setCreateMessageIds(true);
    return jackson2JsonMessageConverter;
}
```
消息转换器中添加的messageId可以便于我们将来做幂等性判断。


此时，我们到MQ控制台**删除**`object.queue`中的旧的消息。然后再次执行刚才的消息发送的代码，到MQ的控制台查看消息结构：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687245684217-8b401cc5-29e6-4d08-9a9b-4fbe0dffd486.png#averageHue=%23f9f7f7&clientId=ucdd993b6-34bc-4&from=paste&height=432&id=ue5acc96b&originHeight=535&originWidth=990&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=41352&status=done&style=none&taskId=u158a691b-c3b3-4103-993a-3064dc7139b&title=&width=798.655436582952)
#### 消费者接收Object
我们在consumer服务中定义一个新的消费者，publisher是用Map发送，那么消费者也一定要用Map接收，格式如下：
```java
@RabbitListener(queues = "object.queue")
public void listenSimpleQueueMessage(Map<String, Object> msg) throws InterruptedException {
    System.out.println("消费者接收到object.queue消息：【" + msg + "】");
}
```

# 支付功能
案例需求：支付成功后基于RabbitMQ的异步通知更新订单状态。
如图：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1690336853591-c874697b-688c-464e-8797-8162a02701e8.png#averageHue=%23faf3f3&clientId=u2c434c61-ffda-4&from=paste&height=396&id=ud83a0c53&originHeight=442&originWidth=1282&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=66835&status=done&style=none&taskId=uac12f07b-6953-4628-933f-82655332fb7&title=&width=1149.1316281031413)
说明，我们只关注交易服务，步骤如下：

- 定义topic类型交换机，命名为`pay.topic`
- 定义消息队列，命名为`mark.order.pay.queue`
- 将`mark.order.pay.queue`与`pay.topic`绑定，`BindingKey`为`pay.success`
- 支付成功时不再调用交易服务更新订单状态的接口，而是发送一条消息到`pay.topic`，发送消息的`RoutingKey`  为`pay.success`，消息内容是订单id
- 交易服务监听`mark.order.pay.queue`队列，接收到消息后更新订单状态为已支付

### 配置MQ
不管是生产者还是消费者，都需要配置MQ的基本信息。分为两步：
1）添加依赖：
```xml
  <!--消息发送-->
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-amqp</artifactId>
  </dependency>
```

2）配置MQ地址：
```yaml
spring:
  rabbitmq:
    host: 192.168.150.101 # 你的虚拟机IP
    port: 5672 # 端口
    virtual-host: /hmall # 虚拟主机
    username: hmall # 用户名
    password: 123 # 密码
```

### 接收消息
在trade-service服务中定义一个消息监听类：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1690339169409-cf6a9ad7-c364-4a26-992d-dd678f53e910.png#averageHue=%23f9fbf8&clientId=u2c434c61-ffda-4&from=paste&height=362&id=uc197e23b&originHeight=404&originWidth=899&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=38311&status=done&style=none&taskId=u11e78c89-237d-4689-a03a-1caed96b8fe&title=&width=805.8263133110172)
其代码如下：
```java
package com.hmall.trade.listener;

import com.hmall.trade.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PayStatusListener {

    private final IOrderService orderService;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "mark.order.pay.queue", durable = "true"),
            exchange = @Exchange(name = "pay.topic", type = ExchangeTypes.TOPIC),
            key = "pay.success"
    ))
    public void listenPaySuccess(Long orderId){
        orderService.markOrderPaySuccess(orderId);
    }
}
```

### 发送消息
修改`pay-service`服务下的`com.hmall.pay.service.impl.PayOrderServiceImpl`类中的`tryPayOrderByBalance`方法：
```java
private final RabbitTemplate rabbitTemplate;

@Override
@Transactional
public void tryPayOrderByBalance(PayOrderDTO payOrderDTO) {
    // 1.查询支付单
    PayOrder po = getById(payOrderDTO.getId());
    // 2.判断状态
    if(!PayStatus.WAIT_BUYER_PAY.equalsValue(po.getStatus())){
        // 订单不是未支付，状态异常
        throw new BizIllegalException("交易已支付或关闭！");
    }
    // 3.尝试扣减余额
    userClient.deductMoney(payOrderDTO.getPw(), po.getAmount());
    // 4.修改支付单状态
    boolean success = markPayOrderSuccess(payOrderDTO.getId(), LocalDateTime.now());
    if (!success) {
        throw new BizIllegalException("交易已支付或关闭！");
    }
    // 5.修改订单状态
    // tradeClient.markOrderPaySuccess(po.getBizOrderNo());
    try {
        rabbitTemplate.convertAndSend("pay.topic", "pay.success", po.getBizOrderNo());
    } catch (Exception e) {
        log.error("支付成功的消息发送失败，支付单id：{}， 交易单id：{}", po.getId(), po.getBizOrderNo(), e);
    }
}
```

参考资料：
[Spring AMQP](https://docs.spring.io/spring-amqp/docs/2.4.14/reference/html/#amqp)


# 高可用
- **我们该如何确保MQ消息的可靠性？**
- **如果真的发送失败，有没有其它的兜底方案？**
## 1.发送者的可靠性
首先，我们一起分析一下消息丢失的可能性有哪些。
消息从发送者发送消息，到消费者处理消息，需要经过的流程是这样的：
![](https://cdn.nlark.com/yuque/0/2023/jpeg/27967491/1687334552247-cab38ab5-ae63-4f06-9ece-e9f244e3c170.jpeg)
消息从生产者到消费者的每一步都可能导致消息丢失：

- 发送消息时丢失：
   - 生产者发送消息时连接MQ失败
   - 生产者发送消息到达MQ后未找到`Exchange`
   - 生产者发送消息到达MQ的`Exchange`后，未找到合适的`Queue`
   - 消息到达MQ后，处理消息的进程发生异常
- MQ导致消息丢失：
   - 消息到达MQ，保存到队列后，尚未消费就突然宕机
- 消费者处理消息时：
   - 消息接收后尚未处理突然宕机
   - 消息接收后处理过程中抛出异常

综上，我们要解决消息丢失问题，保证MQ的可靠性，就必须从3个方面入手：

- 确保生产者一定把消息发送到MQ
- 确保MQ不会将消息弄丢
- 确保消费者一定要处理消息

这一章我们先来看如何确保生产者一定能把消息发送到MQ。

### 1.1.生产者重试机制
首先第一种情况，就是生产者发送消息时，出现了网络故障，导致与MQ的连接中断。

为了解决这个问题，SpringAMQP提供的消息发送时的重试机制。即：当`RabbitTemplate`与MQ连接超时后，多次重试。

修改`publisher`模块的`application.yaml`文件，添加下面的内容：
```yaml
spring:
  rabbitmq:
    connection-timeout: 1s # 设置MQ的连接超时时间
    template:
      retry:
        enabled: true # 开启超时重试机制
        initial-interval: 1000ms # 失败后的初始等待时间
        multiplier: 1 # 失败后下次的等待时长倍数，下次等待时长 = initial-interval * multiplier
        max-attempts: 3 # 最大重试次数
```

我们利用命令停掉RabbitMQ服务：
```shell
docker stop mq
```
然后测试发送一条消息，会发现会每隔1秒重试1次，总共重试了3次。消息发送的超时重试机制配置成功了！

:::warning
**注意**：当网络不稳定的时候，利用重试机制可以有效提高消息发送的成功率。不过SpringAMQP提供的重试机制是**阻塞式**的重试，也就是说多次重试等待的过程中，当前线程是被阻塞的（后边的程序会等待）。
如果对于业务性能有要求，建议禁用重试机制。如果一定要使用，请合理配置等待时长和重试次数，当然也可以考虑使用异步线程来执行发送消息的代码。
:::

### 1.2.生产者确认机制（会增大网络开销，很少用）
一般情况下，只要生产者与MQ之间的网路连接顺畅，基本不会出现发送消息丢失的情况，因此大多数情况下我们无需考虑这种问题。
不过，在少数情况下，也会出现消息发送到MQ之后丢失的现象，比如：

- MQ内部处理消息的进程发生了异常
- 生产者发送消息到达MQ后未找到`Exchange`
- 生产者发送消息到达MQ的`Exchange`后，未找到合适的`Queue`，因此无法路由

针对上述情况，RabbitMQ提供了生产者消息确认机制，包括`Publisher Confirm`和`Publisher Return`两种。在开启确认机制的情况下，当生产者发送消息给MQ后，MQ会根据消息处理的情况返回不同的**回执**。
具体如图所示：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1690366611659-d5c7f355-7ab1-4eb8-8488-13e1d98843ce.png#averageHue=%23faf7f7&clientId=ucb403171-cc9e-4&from=paste&height=376&id=ue3c6e070&originHeight=466&originWidth=1434&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=81765&status=done&style=none&taskId=ue6af669a-1775-4a0f-ad77-cd9bc059880&title=&width=1156.8402990504578)
总结如下：

- 当消息投递到MQ，但是路由失败时，通过**Publisher Return**返回异常信息，同时返回ack的确认信息，代表投递成功
- 临时消息投递到了MQ，并且入队成功，返回ACK，告知投递成功
- 持久消息投递到了MQ，并且入队完成持久化，返回ACK ，告知投递成功
- 其它情况都会返回NACK，告知投递失败


其中`ack`和`nack`属于**Publisher Confirm**机制，`ack`是投递成功；`nack`是投递失败。而`return`则属于**Publisher Return**机制。
默认两种机制都是关闭状态，需要通过配置文件来开启。

### 1.3.实现生产者确认
#### 1.3.1.开启生产者确认
在publisher模块的`application.yaml`中添加配置：
```yaml
spring:
  rabbitmq:
    publisher-confirm-type: correlated # 开启publisher confirm机制，并设置confirm类型
    publisher-returns: true # 开启publisher return机制
```
这里`publisher-confirm-type`有三种模式可选：

- `none`：关闭confirm机制
- `simple`：同步阻塞等待MQ的回执
- `correlated`：MQ异步回调返回回执

一般我们推荐使用`correlated`，回调机制。

#### 1.3.2.定义ReturnCallback
每个`RabbitTemplate`只能配置一个`ReturnCallback`，因此我们可以在配置类中统一设置。我们在publisher模块定义一个配置类：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687341529298-150b401d-67f9-4958-acdb-0d3147b0532b.png#averageHue=%23f9fbf8&clientId=ue4302575-73b6-4&from=paste&height=278&id=u6d09b8df&originHeight=345&originWidth=808&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=33987&status=done&style=none&taskId=uf816a0ec-4ff4-4c09-bffc-766884fb5e7&title=&width=651.8319118778032)
内容如下：
```java
package com.itheima.publisher.config;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ReturnedMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Slf4j
@AllArgsConstructor
@Configuration
public class MqConfig {
    private final RabbitTemplate rabbitTemplate;

    @PostConstruct
    public void init(){
        rabbitTemplate.setReturnsCallback(new RabbitTemplate.ReturnsCallback() {
            @Override
            public void returnedMessage(ReturnedMessage returned) {
                log.error("触发return callback,");
                log.debug("exchange: {}", returned.getExchange());
                log.debug("routingKey: {}", returned.getRoutingKey());
                log.debug("message: {}", returned.getMessage());
                log.debug("replyCode: {}", returned.getReplyCode());
                log.debug("replyText: {}", returned.getReplyText());
            }
        });
    }
}
```

#### 1.3.3.定义ConfirmCallback
由于每个消息发送时的处理逻辑不一定相同，因此ConfirmCallback需要在每次发消息时定义。具体来说，是在调用RabbitTemplate中的convertAndSend方法时，多传递一个参数：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687348187394-21a3698a-277a-478b-8cb8-2ee5bc79207f.png#averageHue=%23f1efed&clientId=ue4302575-73b6-4&from=paste&height=167&id=ubbb0d508&originHeight=207&originWidth=939&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=26725&status=done&style=none&taskId=u0ffba104-eb55-4f79-be54-f249333680d&title=&width=757.5125807589818)

这里的CorrelationData中包含两个核心的东西：
- `id`：消息的唯一标示，MQ对不同的消息的回执以此做判断，避免混淆
- `SettableListenableFuture`：回执结果的Future对象

将来MQ的回执就会通过这个`Future`来返回，我们可以提前给`CorrelationData`中的`Future`添加回调函数来处理消息回执：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687348449866-dee08277-6bc9-4463-9cb8-95013e05a6a2.png#averageHue=%23f3f2f0&clientId=ue4302575-73b6-4&from=paste&height=194&id=u536cb2c1&originHeight=241&originWidth=940&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=26129&status=done&style=none&taskId=u1d347aea-f7e9-43e2-875e-773b69e1bdf&title=&width=758.3193034221969)

我们新建一个测试，向系统自带的交换机发送消息，并且添加`ConfirmCallback`：
```java
@Test
void testPublisherConfirm() {
    // 1.创建CorrelationData
    CorrelationData cd = new CorrelationData();
    // 2.给Future添加ConfirmCallback
    cd.getFuture().addCallback(new ListenableFutureCallback<CorrelationData.Confirm>() {
        @Override
        public void onFailure(Throwable ex) {
            // 2.1.Future发生异常时的处理逻辑，基本不会触发
            log.error("send message fail", ex);
        }
        @Override
        public void onSuccess(CorrelationData.Confirm result) {
            // 2.2.Future接收到回执的处理逻辑，参数中的result就是回执内容
            if(result.isAck()){ // result.isAck()，boolean类型，true代表ack回执，false 代表 nack回执
                log.debug("发送消息成功，收到 ack!");
            }else{ // result.getReason()，String类型，返回nack时的异常描述
                log.error("发送消息失败，收到 nack, reason : {}", result.getReason());
            }
        }
    });
    // 3.发送消息
    rabbitTemplate.convertAndSend("hmall.direct", "q", "hello", cd);
}
```
执行结果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687351726363-c27337c1-cd6e-497e-96ad-ac55fe4cb9e4.png#averageHue=%23f9f6df&clientId=ue4302575-73b6-4&from=paste&height=321&id=u37548b33&originHeight=398&originWidth=1657&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=224878&status=done&style=none&taskId=u5b86f40b-a7f8-4c5f-8fae-4edb9ab2cee&title=&width=1336.7394529474257)
可以看到，由于传递的`RoutingKey`是错误的，路由失败后，触发了`return callback`，同时也收到了ack。
当我们修改为正确的`RoutingKey`以后，就不会触发`return callback`了，只收到ack。
而如果连交换机都是错误的，则只会收到nack。

:::warning
**注意**：
开启生产者确认比较消耗MQ性能，一般不建议开启。而且大家思考一下触发确认的几种情况：

- 路由失败：一般是因为RoutingKey错误导致，往往是编程导致
- 交换机名称错误：同样是编程错误导致
- MQ内部故障：这种需要处理，但概率往往较低。因此只有对消息可靠性要求非常高的业务才需要开启，而且仅仅需要开启ConfirmCallback处理nack就可以了。
:::

## 2.MQ的可靠性
消息到达MQ以后，如果MQ不能及时保存，也会导致消息丢失，所以MQ的可靠性也非常重要。
### 2.1.数据持久化
为了提升性能，默认情况下MQ的数据都是在内存存储的临时数据，重启后就会消失。为了保证数据的可靠性，必须配置数据持久化，包括：

- 交换机持久化
- 队列持久化
- 消息持久化

我们以控制台界面为例来说明。
### 2.1.1.交换机持久化（Spring默认）
在控制台的`Exchanges`页面，添加交换机时可以配置交换机的`Durability`参数：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687353601905-9b09c0df-1b03-49e1-95c8-437ef9f3cd81.png#averageHue=%23f9f8f8&clientId=ue4302575-73b6-4&from=paste&height=281&id=Kve5K&originHeight=348&originWidth=922&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=22552&status=done&style=none&taskId=u9ff1f541-056b-4c91-a4e3-ce6890f4d00&title=&width=743.798295484325)
设置为`Durable`就是持久化模式，`Transient`就是临时模式。

### 2.1.2.队列持久化（Spring默认）
在控制台的Queues页面，添加队列时，同样可以配置队列的`Durability`参数：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687353771968-5c560b86-a1ae-4649-8597-c7ebfeffa9a5.png#averageHue=%23f8f7f6&clientId=ue4302575-73b6-4&from=paste&height=295&id=I03Rh&originHeight=366&originWidth=1130&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=30872&status=done&style=none&taskId=u7425f64c-6c68-4b86-a558-9c10f825f3f&title=&width=911.5966094330664)
除了持久化以外，你可以看到队列还有很多其它参数，有一些我们会在后期学习。

### 2.1.3.消息持久化
在控制台发送消息的时候，可以添加很多参数，而消息的持久化是要配置一个`properties`：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687354083723-84971642-712d-42bc-ba65-6e3b3b33758c.png#averageHue=%23faf8f8&clientId=ue4302575-73b6-4&from=paste&height=423&id=T4xqJ&originHeight=524&originWidth=995&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=17663&status=done&style=none&taskId=u75d6c2e2-1770-43f8-9a9f-9bc5f480099&title=&width=802.6890498990275)

:::warning
**说明**：在开启持久化机制以后，如果同时还开启了生产者确认，那么MQ会在消息持久化以后才发送ACK回执，进一步确保消息的可靠性。
不过出于性能考虑，为了减少IO次数，发送到MQ的消息并不是逐条持久化到数据库的，而是每隔一段时间批量持久化。一般间隔在100毫秒左右，这就会导致ACK有一定的延迟，因此建议生产者确认全部采用异步方式。
:::

## 2.2.LazyQueue（默认格式）
在默认情况下，RabbitMQ会将接收到的信息保存在内存中以降低消息收发的延迟。但在某些特殊情况下，这会导致消息积压，比如：

- 消费者宕机或出现网络故障
- 消息发送量激增，超过了消费者处理速度
- 消费者处理业务发生阻塞

一旦出现消息堆积问题，RabbitMQ的内存占用就会越来越高，直到触发内存预警上限。此时RabbitMQ会将内存消息刷到磁盘上，这个行为成为`PageOut`. `PageOut`会耗费一段时间，并且会阻塞队列进程。因此在这个过程中RabbitMQ不会再处理新的消息，生产者的所有请求都会被阻塞。

为了解决这个问题，从RabbitMQ的3.6.0版本开始，就增加了Lazy Queues的模式，也就是惰性队列。惰性队列的特征如下：

- 接收到消息后直接存入磁盘而非内存（内存中只保留最近的消息，默认2048条）
- 消费者要消费消息时才会从磁盘中读取并加载到内存（也就是懒加载）
- 支持数百万条的消息存储

而在3.12版本之后，LazyQueue已经成为所有队列的默认格式。因此官方推荐升级MQ为3.12版本或者所有队列都设置为LazyQueue模式。

### 2.2.1.控制台配置Lazy模式
在添加队列的时候，添加`x-queue-mod=lazy`参数即可设置队列为Lazy模式：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687421366634-1dfca4a6-2407-43c2-8e65-fd7ba9e660dc.png#averageHue=%23f8f6f5&clientId=ud69cf815-2833-4&from=paste&height=361&id=auTfj&originHeight=447&originWidth=1127&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=34943&status=done&style=none&taskId=ue22630f9-97c2-47c9-989b-e1963580eb6&title=&width=909.1764414434211)

### 2.2.2.代码配置Lazy模式
在利用SpringAMQP声明队列的时候，添加`x-queue-mod=lazy`参数也可设置队列为Lazy模式：
```java
@Bean
public Queue lazyQueue(){
    return QueueBuilder
            .durable("lazy.queue")
            .lazy() // 开启Lazy模式
            .build();
}
```
这里是通过`QueueBuilder`的`lazy()`函数配置Lazy模式，底层源码如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687421880071-2a21369f-00b3-481d-a9bb-ce69a346ccc3.png#averageHue=%23f4f6ed&clientId=ud69cf815-2833-4&from=paste&height=192&id=dCe61&originHeight=238&originWidth=908&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=32577&status=done&style=none&taskId=u17fb9e40-01c9-4605-bc5a-eb906237b36&title=&width=732.5041781993135)

当然，我们也可以基于注解来声明队列并设置为Lazy模式：
```java
@RabbitListener(queuesToDeclare = @Queue(
        name = "lazy.queue",
        durable = "true",
        arguments = @Argument(name = "x-queue-mode", value = "lazy")
))
public void listenLazyQueue(String msg){
    log.info("接收到 lazy.queue的消息：{}", msg);
}
```

### 2.2.3.更新已有队列为lazy模式
对于已经存在的队列，也可以配置为lazy模式，但是要通过设置policy实现。
可以基于命令行设置policy：
```shell
rabbitmqctl set_policy Lazy "^lazy-queue$" '{"queue-mode":"lazy"}' --apply-to queues  
```
命令解读：

- `rabbitmqctl` ：RabbitMQ的命令行工具
- `set_policy` ：添加一个策略
- `Lazy` ：策略名称，可以自定义
- `"^lazy-queue$"` ：用正则表达式匹配队列的名字
- `'{"queue-mode":"lazy"}'` ：设置队列模式为lazy模式
- `--apply-to queues`：策略的作用对象，是所有的队列

当然，也可以在控制台配置policy，进入在控制台的`Admin`页面，点击`Policies`，即可添加配置：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687422619364-b0e414b9-55fc-49f2-b7b5-de52b72a9f56.png#averageHue=%23f7f6f5&clientId=ud69cf815-2833-4&from=paste&height=682&id=pcraA&originHeight=846&originWidth=1365&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=83823&status=done&style=none&taskId=u10b50f65-9311-4fb6-9f0b-ac0bbe2c3c9&title=&width=1101.1764352886157)

# 3.消费者的可靠性
当RabbitMQ向消费者投递消息以后，需要知道消费者的处理状态如何。因为消息投递给消费者并不代表就一定被正确消费了，可能出现的故障有很多，比如：

- 消息投递的过程中出现了网络故障
- 消费者接收到消息后突然宕机
- 消费者接收到消息后，因处理不当导致异常
- ...

一旦发生上述情况，消息也会丢失。因此，RabbitMQ必须知道消费者的处理状态，一旦消息处理失败才能重新投递消息。

## 2.1.消费者确认机制
为了确认消费者是否成功处理消息，RabbitMQ提供了消费者确认机制（**Consumer Acknowledgement**）。即：当消费者处理消息结束后，应该向RabbitMQ发送一个回执，告知RabbitMQ自己消息处理状态。回执有三种可选值：

- ack：成功处理消息，RabbitMQ从队列中删除该消息
- nack：消息处理失败，RabbitMQ需要再次投递消息
- reject：消息处理失败并拒绝该消息，RabbitMQ从队列中删除该消息

![Alt text](rabbitmq/image.png)

一般reject方式用的较少，除非是消息格式有问题，那就是开发问题了。因此大多数情况下我们需要将消息处理的代码通过`try catch`机制捕获，消息处理成功时返回ack，处理失败时返回nack.

由于消息回执的处理代码比较统一，因此SpringAMQP帮我们实现了消息确认。并允许我们通过配置文件设置ACK处理方式，有三种模式：

- `**none**`：不处理。即消息投递给消费者后立刻ack，消息会立刻从MQ删除。非常不安全，不建议使用
- `**manual**`：手动模式。需要自己在业务代码中调用api，发送`ack`或`reject`，存在业务入侵，但更灵活
- `**auto**`：自动模式。SpringAMQP利用AOP对我们的消息处理逻辑做了环绕增强，当业务正常执行时则自动返回`ack`.  当业务出现异常时，根据异常判断返回不同结果：
   - 如果是**业务异常**，会自动返回`nack`；
   - 如果是**消息处理或校验异常**，自动返回`reject`;

通过下面的配置可以修改SpringAMQP的ACK处理方式：
```yaml
spring:
  rabbitmq:
    listener:
      simple:
        acknowledge-mode: none # 不做处理
```

修改consumer服务的SpringRabbitListener类中的方法，模拟一个消息处理的异常：
```java
@RabbitListener(queues = "simple.queue")
public void listenSimpleQueueMessage(String msg) throws InterruptedException {
    log.info("spring 消费者接收到消息：【" + msg + "】");
    if (true) {
        throw new MessageConversionException("故意的");
    }
    log.info("消息处理完成");
}
```

测试可以发现：当消息处理发生异常时，消息依然被RabbitMQ删除了。


我们再次把确认机制修改为auto：
```yaml
spring:
  rabbitmq:
    listener:
      simple:
        acknowledge-mode: auto # 自动ack
```

在异常位置打断点，再次发送消息，程序卡在断点时，可以发现此时消息状态为`unacked`（未确定状态）：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687489262801-36725872-cc98-470a-ab6b-85cfd9c1b0ce.png#averageHue=%23f5f3f3&clientId=uaa251f98-ecdc-4&from=paste&height=194&id=u0edc5b71&originHeight=241&originWidth=1100&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=24869&status=done&style=none&taskId=ufc5a8f88-61f6-4518-ad83-77d7037cd6b&title=&width=887.3949295366134)
放行以后，由于抛出的是**消息转换异常**，因此Spring会自动返回`reject`，所以消息依然会被删除：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687490335196-66d14c99-45c2-4113-8a36-94e33c3ce7d5.png#averageHue=%23f3f3f2&clientId=uaa251f98-ecdc-4&from=paste&height=231&id=u0977f925&originHeight=286&originWidth=1099&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=28753&status=done&style=none&taskId=u60974200-bef2-4eca-a9e8-1b91ce70eb9&title=&width=886.5882068733982)

我们将异常改为RuntimeException类型：
```java
@RabbitListener(queues = "simple.queue")
public void listenSimpleQueueMessage(String msg) throws InterruptedException {
    log.info("spring 消费者接收到消息：【" + msg + "】");
    if (true) {
        throw new RuntimeException("故意的");
    }
    log.info("消息处理完成");
}
```
在异常位置打断点，然后再次发送消息测试，程序卡在断点时，可以发现此时消息状态为`unacked`（未确定状态）：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687489262801-36725872-cc98-470a-ab6b-85cfd9c1b0ce.png#averageHue=%23f5f3f3&clientId=uaa251f98-ecdc-4&from=paste&height=194&id=WusVn&originHeight=241&originWidth=1100&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=24869&status=done&style=none&taskId=ufc5a8f88-61f6-4518-ad83-77d7037cd6b&title=&width=887.3949295366134)放行以后，由于抛出的是业务异常，所以Spring返回`ack`，最终消息恢复至`Ready`状态，并且没有被RabbitMQ删除：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687490819965-f638194b-f956-4ad3-8cd4-2e03f5e43674.png#averageHue=%23f4f3f2&clientId=uaa251f98-ecdc-4&from=paste&height=237&id=u0f1b8e0c&originHeight=294&originWidth=1110&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=29088&status=done&style=none&taskId=ue0e6353b-c435-43f2-9520-32a58e71098&title=&width=895.4621561687644)
当我们把配置改为`auto`时，消息处理失败后，会回到RabbitMQ，并重新投递到消费者。

## 2.2.失败重试机制
当消费者出现异常后，消息会不断requeue（重入队）到队列，再重新发送给消费者。如果消费者再次执行依然出错，消息会再次requeue到队列，再次投递，直到消息处理成功为止。
极端情况就是消费者一直无法执行成功，那么消息requeue就会无限循环，导致mq的消息处理飙升，带来不必要的压力：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687490923673-6eca30c4-4cd0-4a92-b6d4-2766c0ad1746.png#averageHue=%23f2f1f1&clientId=uaa251f98-ecdc-4&from=paste&height=131&id=ue26e64ed&originHeight=162&originWidth=988&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=56569&status=done&style=none&taskId=u63e3277a-cb8f-4fd8-bdff-fc1dcc685e9&title=&width=797.0419912565218)

当然，上述极端情况发生的概率还是非常低的，不过不怕一万就怕万一。为了应对上述情况Spring又提供了消费者失败重试机制：在消费者出现异常时利用本地重试，而不是无限制的requeue到mq队列。

修改consumer服务的application.yml文件，添加内容：
```yaml
spring:
  rabbitmq:
    listener:
      simple:
        retry:
          enabled: true # 开启消费者失败重试
          initial-interval: 1000ms # 初识的失败等待时长为1秒
          multiplier: 1 # 失败的等待时长倍数，下次等待时长 = multiplier * last-interval
          max-attempts: 3 # 最大重试次数
          stateless: true # true无状态；false有状态。如果业务中包含事务，这里改为false
```

重启consumer服务，重复之前的测试。可以发现：

- 消费者在失败后消息没有重新回到MQ无限重新投递，而是在本地重试了3次
- 本地重试3次以后，抛出了`AmqpRejectAndDontRequeueException`异常。查看RabbitMQ控制台，发现消息被删除了，说明最后SpringAMQP返回的是`reject`

结论：

- 开启本地重试时，消息处理过程中抛出异常，不会requeue到队列，而是在消费者本地重试
- 重试达到最大次数后，Spring会返回reject，消息会被丢弃

## 2.3.失败处理策略
在之前的测试中，本地测试达到最大重试次数后，消息会被丢弃。这在某些对于消息可靠性要求较高的业务场景下，显然不太合适了。
因此Spring允许我们自定义重试次数耗尽后的消息处理策略，这个策略是由`MessageRecovery`接口来定义的，它有3个不同实现：

-  `RejectAndDontRequeueRecoverer`：重试耗尽后，直接`reject`，丢弃消息。默认就是这种方式 
-  `ImmediateRequeueMessageRecoverer`：重试耗尽后，返回`nack`，消息重新入队 
-  `RepublishMessageRecoverer`：重试耗尽后，将失败消息投递到指定的交换机 

比较优雅的一种处理方案是`RepublishMessageRecoverer`，失败后将消息投递到一个指定的，专门存放异常消息的队列，后续由人工集中处理。

![Alt text](rabbitmq/image-1.png)

1）在consumer服务中定义处理失败消息的交换机和队列
```java
@Bean
public DirectExchange errorMessageExchange(){
    return new DirectExchange("error.direct");
}
@Bean
public Queue errorQueue(){
    return new Queue("error.queue", true);
}
@Bean
public Binding errorBinding(Queue errorQueue, DirectExchange errorMessageExchange){
    return BindingBuilder.bind(errorQueue).to(errorMessageExchange).with("error");
}
```

2）定义一个RepublishMessageRecoverer，关联队列和交换机
```java
@Bean
public MessageRecoverer republishMessageRecoverer(RabbitTemplate rabbitTemplate){
    return new RepublishMessageRecoverer(rabbitTemplate, "error.direct", "error");
}
```

完整代码如下：
```java
package com.itheima.consumer.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.retry.MessageRecoverer;
import org.springframework.amqp.rabbit.retry.RepublishMessageRecoverer;
import org.springframework.context.annotation.Bean;

@Configuration
@ConditionalOnProperty(name = "spring.rabbitmq.listener.simple.retry.enabled", havingValue = "true")
public class ErrorMessageConfig {
    @Bean
    public DirectExchange errorMessageExchange(){
        return new DirectExchange("error.direct");
    }
    @Bean
    public Queue errorQueue(){
        return new Queue("error.queue", true);
    }
    @Bean
    public Binding errorBinding(Queue errorQueue, DirectExchange errorMessageExchange){
        return BindingBuilder.bind(errorQueue).to(errorMessageExchange).with("error");
    }

    @Bean
    public MessageRecoverer republishMessageRecoverer(RabbitTemplate rabbitTemplate){
        return new RepublishMessageRecoverer(rabbitTemplate, "error.direct", "error");
    }
}
```

## 2.4.业务幂等性
何为幂等性？
**幂等**是一个数学概念，用函数表达式来描述是这样的：`f(x) = f(f(x))`，例如求绝对值函数。
在程序开发中，则是指同一个业务，执行一次或多次对业务状态的影响是一致的。例如：

- 根据id删除数据
- 查询数据
- 新增数据

但数据的更新往往不是幂等的，如果重复执行可能造成不一样的后果。比如：

- 取消订单，恢复库存的业务。如果多次恢复就会出现库存重复增加的情况
- 退款业务。重复退款对商家而言会有经济损失。

所以，我们要尽可能避免业务被重复执行。
然而在实际业务场景中，由于意外经常会出现业务被重复执行的情况，例如：

- 页面卡顿时频繁刷新导致表单重复提交
- 服务间调用的重试
- MQ消息的重复投递

我们在用户支付成功后会发送MQ消息到交易服务，修改订单状态为已支付，就可能出现消息重复投递的情况。如果消费者不做判断，很有可能导致消息被消费多次，出现业务故障。
举例：

1. 假如用户刚刚支付完成，并且投递消息到交易服务，交易服务更改订单为**已支付**状态。
2. 由于某种原因，例如网络故障导致生产者没有得到确认，隔了一段时间后**重新投递**给交易服务。
3. 但是，在新投递的消息被消费之前，用户选择了退款，将订单状态改为了**已退款**状态。
4. 退款完成后，新投递的消息才被消费，那么订单状态会被再次改为**已支付**。业务异常。

因此，我们必须想办法保证消息处理的幂等性。这里给出两种方案：

- 唯一消息ID
- 业务状态判断

### 2.4.1.唯一消息ID
这个思路非常简单：

1. 每一条消息都生成一个唯一的id，与消息一起投递给消费者。
2. 消费者接收到消息后处理自己的业务，业务处理成功后将消息ID保存到数据库
3. 如果下次又收到相同消息，去数据库查询判断是否存在，存在则为重复消息放弃处理。

我们该如何给消息添加唯一ID呢？
其实很简单，SpringAMQP的MessageConverter自带了MessageID的功能，我们只要开启这个功能即可。
以Jackson的消息转换器为例：
```java
@Bean
public MessageConverter messageConverter(){
    // 1.定义消息转换器
    Jackson2JsonMessageConverter jjmc = new Jackson2JsonMessageConverter();
    // 2.配置自动创建消息id，用于识别不同消息，也可以在业务中基于ID判断是否是重复消息
    jjmc.setCreateMessageIds(true);
    return jjmc;
}
```

### 2.4.2.业务判断
业务判断就是基于业务本身的逻辑或状态来判断是否是重复的请求或消息，不同的业务场景判断的思路也不一样。
例如处理消息的业务逻辑是把订单状态从未支付修改为已支付。因此我们就可以在执行业务时判断订单状态是否是未支付，如果不是则证明订单已经被处理过，无需重复处理。

相比较而言，消息ID的方案需要改造原有的数据库，所以更推荐使用业务判断的方案。

以支付修改订单的业务为例，我们需要修改`OrderServiceImpl`中的`markOrderPaySuccess`方法：
```java
    @Override
    public void markOrderPaySuccess(Long orderId) {
        // 1.查询订单
        Order old = getById(orderId);
        // 2.判断订单状态
        if (old == null || old.getStatus() != 1) {
            // 订单不存在或者订单状态不是1，放弃处理
            return;
        }
        // 3.尝试更新订单
        Order order = new Order();
        order.setId(orderId);
        order.setStatus(2);
        order.setPayTime(LocalDateTime.now());
        updateById(order);
    }
```

上述代码逻辑上符合了幂等判断的需求，但是由于判断和更新是两步动作，因此在极小概率下可能存在线程安全问题。

我们可以合并上述操作为这样：
```java
@Override
public void markOrderPaySuccess(Long orderId) {
    // UPDATE `order` SET status = ? , pay_time = ? WHERE id = ? AND status = 1
    lambdaUpdate()
            .set(Order::getStatus, 2)
            .set(Order::getPayTime, LocalDateTime.now())
            .eq(Order::getId, orderId)
            .eq(Order::getStatus, 1)
            .update();
}
```
注意看，上述代码等同于这样的SQL语句：
```sql
UPDATE `order` SET status = ? , pay_time = ? WHERE id = ? AND status = 1
```
我们在where条件中除了判断id以外，还加上了status必须为1的条件。如果条件不符（说明订单已支付），则SQL匹配不到数据，根本不会执行。

## 2.5.兜底方案
虽然我们利用各种机制尽可能增加了消息的可靠性，但也不好说能保证消息100%的可靠。万一真的MQ通知失败该怎么办呢？
有没有其它兜底方案，能够确保订单的支付状态一致呢？

其实思想很简单：既然MQ通知不一定发送到交易服务，那么交易服务就必须自己**主动去查询**支付状态。这样即便支付服务的MQ通知失败，我们依然能通过主动查询来保证订单状态的一致。
流程如下：
![](https://cdn.nlark.com/yuque/0/2023/jpeg/27967491/1687521150465-25b54b36-b64a-4b2d-90b7-8dff12fb075b.jpeg)

图中黄色线圈起来的部分就是MQ通知失败后的兜底处理方案，由交易服务自己主动去查询支付状态。

不过需要注意的是，交易服务并不知道用户会在什么时候支付，如果查询的时机不正确（比如查询的时候用户正在支付中），可能查询到的支付状态也不正确。
那么问题来了，我们到底该在什么时间主动查询支付状态呢？

这个时间是无法确定的，因此，通常我们采取的措施就是利用**定时任务**定期查询，例如每隔20秒就查询一次，并判断支付状态。如果发现订单已经支付，则立刻更新订单状态为已支付即可。

至此，消息可靠性的问题已经解决了。

### 支付服务与交易服务之间的订单状态一致性是如何保证的？

- 首先，支付服务会正在用户支付成功以后利用MQ消息通知交易服务，完成订单状态同步。
- 其次，为了保证MQ消息的可靠性，我们采用了生产者确认机制、消费者确认、消费者失败重试等策略，确保消息投递的可靠性。我们还在交易服务更新订单状态时做了业务幂等判断，避免因消息重复消费导致订单状态异常。

- 最后，我们还在交易服务设置了定时任务，定期查询订单支付状态。这样即便MQ通知失败，还可以利用定时任务作为兜底方案，确保订单支付状态的最终一致性。

# 4.延迟消息
在电商的支付业务中，对于一些库存有限的商品，为了更好的用户体验，通常都会在用户下单时立刻扣减商品库存。例如电影院购票、高铁购票，下单后就会锁定座位资源，其他人无法重复购买。

但是这样就存在一个问题，假如用户下单后一直不付款，就会一直占有库存资源，导致其他客户无法正常交易，最终导致商户利益受损！

因此，电商中通常的做法就是：**对于超过一定时间未支付的订单，应该立刻取消订单并释放占用的库存**。

例如，订单支付超时时间为30分钟，则我们应该在用户下单后的第30分钟检查订单支付状态，如果发现未支付，应该立刻取消订单，释放库存。

但问题来了：如何才能准确的实现在下单后第30分钟去检查支付状态呢？

像这种在一段时间以后才执行的任务，我们称之为**延迟任务**，而要实现延迟任务，最简单的方案就是利用MQ的延迟消息了。

![Alt text](rabbitmq/image3.png)

在RabbitMQ中实现延迟消息也有两种方案：

- 死信交换机+TTL
- 延迟消息插件

## 4.1.死信交换机和延迟消息

### 4.1.1.死信交换机
什么是死信？

当一个队列中的消息满足下列情况之一时，可以成为死信（dead letter）：

- 消费者使用`basic.reject`或 `basic.nack`声明消费失败，并且消息的`requeue`参数设置为false
- 消息是一个过期消息，超时无人消费
- 要投递的队列消息满了，无法投递

如果一个队列中的消息已经成为死信，并且这个队列通过`**dead-letter-exchange**`属性指定了一个交换机，那么队列中的死信就会投递到这个交换机中，而这个交换机就称为**死信交换机**（Dead Letter Exchange）。而此时加入有队列与死信交换机绑定，则最终死信就会被投递到这个队列中。

死信交换机有什么作用呢？

1. 收集那些因处理失败而被拒绝的消息
2. 收集那些因队列满了而被拒绝的消息
3. 收集因TTL（有效期）到期的消息

### 4.1.2.延迟消息
前面两种作用场景可以看做是把死信交换机当做一种消息处理的最终兜底方案，与消费者重试时讲的`RepublishMessageRecoverer`作用类似。

而最后一种场景，大家设想一下这样的场景：
如图，有一组绑定的交换机（`ttl.fanout`）和队列（`ttl.queue`）。但是`ttl.queue`没有消费者监听，而是设定了死信交换机`hmall.direct`，而队列`direct.queue1`则与死信交换机绑定，RoutingKey是blue：

![Alt](Rabbitmq/image4.png)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687573175803-41a1c870-93bc-4307-974f-891de1b5a42d.png#averageHue=%23faf3f2&clientId=u76b62a19-f8dc-4&from=paste&height=340&id=u380f1403&originHeight=422&originWidth=1301&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=59423&status=done&style=none&taskId=ucbcde27e-d210-43e8-8e35-7557d121729&title=&width=1049.546184842849)

假如我们现在发送一条消息到`ttl.fanout`，RoutingKey为blue，并设置消息的**有效期**为5000毫秒：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687573506181-f0af9da1-0b0b-4cfb-afca-f5febb306cdf.png#averageHue=%23faf4f4&clientId=u76b62a19-f8dc-4&from=paste&height=349&id=u9604efe2&originHeight=432&originWidth=1421&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=60694&status=done&style=none&taskId=u7e667f84-8779-47db-af73-7598ea5759e&title=&width=1146.3529044286615)
:::warning
**注意**：尽管这里的`ttl.fanout`不需要RoutingKey，但是当消息变为死信并投递到死信交换机时，会沿用之前的RoutingKey，这样`hmall.direct`才能正确路由消息。
:::

消息肯定会被投递到`ttl.queue`之后，由于没有消费者，因此消息无人消费。5秒之后，消息的有效期到期，成为死信：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687573747592-4d95dbb1-3f4d-4174-af24-124cb1346a81.png#averageHue=%23faf4f4&clientId=u76b62a19-f8dc-4&from=paste&height=341&id=u616ad2d4&originHeight=423&originWidth=1502&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=71956&status=done&style=none&taskId=uf4c990b8-e00b-42c0-842d-efdd5485d43&title=&width=1211.6974401490847)
死信被再次投递到死信交换机`hmall.direct`，并沿用之前的RoutingKey，也就是`blue`：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687573874094-ebf781c1-6273-474b-b0ed-17243d8370ae.png#averageHue=%23faf4f4&clientId=u76b62a19-f8dc-4&from=paste&height=348&id=u53622578&originHeight=431&originWidth=1421&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=63699&status=done&style=none&taskId=u610a5adf-e615-4fa5-9c50-597a1be139a&title=&width=1146.3529044286615)
由于`direct.queue1`与`hmall.direct`绑定的key是blue，因此最终消息被成功路由到`direct.queue1`，如果此时有消费者与`direct.queue1`绑定， 也就能成功消费消息了。但此时已经是5秒钟以后了：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687574086294-106fe14b-6652-4783-a6c3-3d722d1f5232.png#averageHue=%23fbf5f5&clientId=u76b62a19-f8dc-4&from=paste&height=373&id=ub429262c&originHeight=462&originWidth=1633&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=81718&status=done&style=none&taskId=u244f2a30-7d51-48a2-969b-b880a7f2442&title=&width=1317.3781090302632)
也就是说，publisher发送了一条消息，但最终consumer在5秒后才收到消息。我们成功实现了**延迟消息**。

### 4.1.3.总结
:::warning
**注意：**
RabbitMQ的消息过期是基于追溯方式来实现的，也就是说当一个消息的TTL到期以后不一定会被移除或投递到死信交换机，而是在消息恰好处于队首时才会被处理。
当队列中消息堆积很多的时候，过期消息可能不会被按时处理，因此你设置的TTL时间不一定准确。
:::

## 4.2.DelayExchange插件
基于死信队列虽然可以实现延迟消息，但是太麻烦了。因此RabbitMQ社区提供了一个延迟消息插件来实现相同的效果。
官方文档说明：
[Scheduling Messages with RabbitMQ | RabbitMQ - Blog](https://blog.rabbitmq.com/posts/2015/04/scheduling-messages-with-rabbitmq)

### 4.2.1.下载
插件下载地址：
[GitHub - rabbitmq/rabbitmq-delayed-message-exchange: Delayed Messaging for RabbitMQ](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases)

### 4.2.2.安装
因为我们是基于Docker安装，所以需要先查看RabbitMQ的插件目录对应的数据卷。
```shell
docker volume inspect mq-plugins
```
结果如下：
```shell
[
    {
        "CreatedAt": "2024-06-19T09:22:59+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/mq-plugins/_data",
        "Name": "mq-plugins",
        "Options": null,
        "Scope": "local"
    }
]

```
插件目录被挂载到了`/var/lib/docker/volumes/mq-plugins/_data`这个目录，我们上传插件到该目录下。

接下来执行命令，安装插件：
```shell
docker exec -it [容器名] rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```
运行结果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687576988700-43b5d4ad-a77c-4463-bea4-4f3c0888ebe5.png#averageHue=%23031f33&clientId=u76b62a19-f8dc-4&from=paste&height=428&id=u46bbc0d8&originHeight=530&originWidth=1456&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=64423&status=done&style=none&taskId=uecc0751f-db71-4d55-86a5-c859569b939&title=&width=1174.58819764119)
### 4.2.3.声明延迟交换机
基于注解方式：
```java
@RabbitListener(bindings = @QueueBinding(
        value = @Queue(name = "delay.queue", durable = "true"),
        exchange = @Exchange(name = "delay.direct", delayed = "true"),
        key = "delay"
))
public void listenDelayMessage(String msg){
    log.info("接收到delay.queue的延迟消息：{}", msg);
}
```
基于`@Bean`的方式：
```java
package com.itheima.consumer.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class DelayExchangeConfig {

    @Bean
    public DirectExchange delayExchange(){
        return ExchangeBuilder
                .directExchange("delay.direct") // 指定交换机类型和名称
                .delayed() // 设置delay的属性为true
                .durable(true) // 持久化
                .build();
    }

    @Bean
    public Queue delayedQueue(){
        return new Queue("delay.queue");
    }
    
    @Bean
    public Binding delayQueueBinding(){
        return BindingBuilder.bind(delayedQueue()).to(delayExchange()).with("delay");
    }
}

```

### 4.2.4.发送延迟消息
发送消息时，必须通过`.setDelay`设定延迟时间：
```java
@Test
void testPublisherDelayMessage() {
    // 1.创建消息
    String message = "hello, delayed message";
    // 2.发送消息，利用消息后置处理器添加消息头
    rabbitTemplate.convertAndSend("delay.direct", "delay", message, new MessagePostProcessor() {
        @Override
        public Message postProcessMessage(Message message) throws AmqpException {
            // 添加延迟消息属性
            message.getMessageProperties().setDelay(5000);
            return message;
        }
    });
}
```


:::warning
**注意：**
延迟消息插件内部会维护一个本地数据库表，同时使用Elang Timers功能实现计时。如果消息的延迟时间设置较长，可能会导致堆积的延迟消息非常多，会带来较大的CPU开销，同时延迟消息的时间会存在误差。
因此，**不建议设置延迟时间过长的延迟消息**。
:::


## 4.5.订单状态同步问题
接下来，我们就在交易服务中利用延迟消息实现订单支付状态的同步。其大概思路如下：
![](https://cdn.nlark.com/yuque/0/2023/jpeg/27967491/1690343275577-b0f99b4a-40e2-40cf-8da2-11f0dfbd7d7c.jpeg)

假如订单超时支付时间为30分钟，理论上说我们应该在下单时发送一条延迟消息，延迟时间为30分钟。这样就可以在接收到消息时检验订单支付状态，关闭未支付订单。
但是大多数情况下用户支付都会在1分钟内完成，我们发送的消息却要在MQ中停留30分钟，额外消耗了MQ的资源。因此，我们最好多检测几次订单支付状态，而不是在最后第30分钟才检测。
例如：我们在用户下单后的第10秒、20秒、30秒、45秒、60秒、1分30秒、2分、...30分分别设置延迟消息，如果提前发现订单已经支付，则后续的检测取消即可。
这样就可以有效避免对MQ资源的浪费了。

优化后的实现思路如下：
![](https://cdn.nlark.com/yuque/0/2023/jpeg/27967491/1687593452790-58e296b7-0761-40f6-b4be-9c19bff9cd3e.jpeg)

由于我们要多次发送延迟消息，因此需要先定义一个记录消息延迟时间的消息体，处于通用性考虑，我们将其定义到`hm-common`模块下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687593306116-2a41b7c0-064c-463f-b109-fa05db8609e8.png#averageHue=%23f9fbf8&clientId=u76b62a19-f8dc-4&from=paste&height=402&id=ueaa6d986&originHeight=498&originWidth=944&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=48824&status=done&style=none&taskId=u025bcf5a-23cc-4146-8ecc-1f6a7126c60&title=&width=761.5461940750573)
代码如下：
```java
package com.hmall.common.domain;

import com.hmall.common.utils.CollUtils;
import lombok.Data;

import java.util.List;

@Data
public class MultiDelayMessage<T> {
    /**
     * 消息体
     */
    private T data;
    /**
     * 记录延迟时间的集合
     */
    private List<Long> delayMillis;

    public MultiDelayMessage(T data, List<Long> delayMillis) {
        this.data = data;
        this.delayMillis = delayMillis;
    }
    public static <T> MultiDelayMessage<T> of(T data, Long ... delayMillis){
        return new MultiDelayMessage<>(data, CollUtils.newArrayList(delayMillis));
    }

    /**
     * 获取并移除下一个延迟时间
     * @return 队列中的第一个延迟时间
     */
    public Long removeNextDelay(){
        return delayMillis.remove(0);
    }

    /**
     * 是否还有下一个延迟时间
     */
    public boolean hasNextDelay(){
        return !delayMillis.isEmpty();
    }
}

```


### 4.5.1.定义常量
无论是消息发送还是接收都是在交易服务完成，因此我们在`trade-service`中定义一个常量类，用于记录交换机、队列、RoutingKey等常量：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687593919687-52eb9aa6-6f80-4b49-ba32-bb608018e333.png#averageHue=%23f9fbf8&clientId=u76b62a19-f8dc-4&from=paste&height=328&id=ufb3e5a13&originHeight=406&originWidth=913&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=38538&status=done&style=none&taskId=u54275307-b948-433e-b531-bdf3fc84fac&title=&width=736.5377915153891)
内容如下：
```java
package com.hmall.trade.constants;

public interface MqConstants {
    String DELAY_EXCHANGE = "trade.delay.topic";
    String DELAY_ORDER_QUEUE = "trade.order.delay.queue";
    String DELAY_ORDER_ROUTING_KEY = "order.query";
}
```

### 4.5.2.抽取共享mq配置
我们将mq的配置抽取到nacos中，方便各个微服务共享配置。
在nacos中定义一个名为`shared-mq.xml`的配置文件，内容如下：
```yaml
spring:
  rabbitmq:
    host: ${hm.mq.host:192.168.150.101} # 主机名
    port: ${hm.mq.port:5672} # 端口
    virtual-host: ${hm.mq.vhost:/hmall} # 虚拟主机
    username: ${hm.mq.un:hmall} # 用户名
    password: ${hm.mq.pw:123} # 密码
    listener:
      simple:
        prefetch: 1 # 每次只能获取一条消息，处理完成才能获取下一个消息
```
这里只添加一些基础配置，至于生产者确认，消费者确认配置则由微服务根据业务自己决定。

在`trade-service`模块添加共享配置：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687595291593-378450c1-ef00-4cbf-9be8-235d1eea8e7c.png#averageHue=%23f6f9f5&clientId=u76b62a19-f8dc-4&from=paste&height=515&id=uc4ebf7e5&originHeight=638&originWidth=952&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=129257&status=done&style=none&taskId=uc6221e28-aa92-49da-bc73-1ff8258fda5&title=&width=767.9999753807781)

### 4.5.3.改造下单业务
接下来，我们改造下单业务，在下单完成后，发送延迟消息，查询支付状态。

1）引入依赖
在`trade-service`模块的`pom.xml`中引入amqp的依赖：
```xml
  <!--amqp-->
  <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-amqp</artifactId>
  </dependency>
```

2）改造下单业务
修改`trade-service`模块的`com.hmall.trade.service.impl.OrderServiceImpl`类的`createOrder`方法，添加消息发送的代码：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1687595921876-005c46d9-4278-411b-bfc1-c5e545949cd5.png#averageHue=%23f6f8f4&clientId=u76b62a19-f8dc-4&from=paste&height=496&id=u29260a5b&originHeight=615&originWidth=1668&originalType=binary&ratio=1.2395833730697632&rotation=0&showTitle=false&size=182037&status=done&style=none&taskId=udb3ccb23-163c-406d-9d8c-bc7087da8f1&title=&width=1345.6134022427918)

### 4.5.4.编写查询支付状态接口
由于MQ消息处理时需要查询支付状态，因此我们要在pay-service模块定义一个这样的接口，并提供对应的FeignClient.
首先，在hm-api模块定义三个类：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1690352506454-23b445b7-3a34-458e-bba2-47528a06ea65.png#averageHue=%23f9fbf7&clientId=u835b609d-4d58-4&from=paste&height=562&id=ud6c48d2c&originHeight=627&originWidth=875&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=63061&status=done&style=none&taskId=u8487842b-c38a-48a4-9a27-3ed9692d7d8&title=&width=784.3137087287431)
说明：

- PayOrderDTO：支付单的数据传输实体
- PayClient：支付系统的Feign客户端
- PayClientFallback：支付系统的fallback逻辑

PayOrderDTO代码如下：
```java
package com.hmall.api.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 支付订单
 */
@Data
@ApiModel(description = "支付单数据传输实体")
public class PayOrderDTO {
    @ApiModelProperty("id")
    private Long id;
    @ApiModelProperty("业务订单号")
    private Long bizOrderNo;
    @ApiModelProperty("支付单号")
    private Long payOrderNo;
    @ApiModelProperty("支付用户id")
    private Long bizUserId;
    @ApiModelProperty("支付渠道编码")
    private String payChannelCode;
    @ApiModelProperty("支付金额，单位分")
    private Integer amount;
    @ApiModelProperty("付类型，1：h5,2:小程序，3：公众号，4：扫码，5：余额支付")
    private Integer payType;
    @ApiModelProperty("付状态，0：待提交，1:待支付，2：支付超时或取消，3：支付成功")
    private Integer status;
    @ApiModelProperty("拓展字段，用于传递不同渠道单独处理的字段")
    private String expandJson;
    @ApiModelProperty("第三方返回业务码")
    private String resultCode;
    @ApiModelProperty("第三方返回提示信息")
    private String resultMsg;
    @ApiModelProperty("支付成功时间")
    private LocalDateTime paySuccessTime;
    @ApiModelProperty("支付超时时间")
    private LocalDateTime payOverTime;
    @ApiModelProperty("支付二维码链接")
    private String qrCodeUrl;
    @ApiModelProperty("创建时间")
    private LocalDateTime createTime;
    @ApiModelProperty("更新时间")
    private LocalDateTime updateTime;
}

```
PayClient代码如下：
```java
package com.hmall.api.client;

import com.hmall.api.client.fallback.PayClientFallback;
import com.hmall.api.dto.PayOrderDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = "pay-service", fallbackFactory = PayClientFallback.class)
public interface PayClient {
    /**
     * 根据交易订单id查询支付单
     * @param id 业务订单id
     * @return 支付单信息
     */
    @GetMapping("/pay-orders/biz/{id}")
    PayOrderDTO queryPayOrderByBizOrderNo(@PathVariable("id") Long id);
}
```
PayClientFallback代码如下：
```java
package com.hmall.api.client.fallback;

import com.hmall.api.client.PayClient;
import com.hmall.api.dto.PayOrderDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FallbackFactory;

@Slf4j
public class PayClientFallback implements FallbackFactory<PayClient> {
    @Override
    public PayClient create(Throwable cause) {
        return new PayClient() {
            @Override
            public PayOrderDTO queryPayOrderByBizOrderNo(Long id) {
                return null;
            }
        };
    }
}

```

最后，在pay-service模块的PayController中实现该接口：
```java
@ApiOperation("根据id查询支付单")
@GetMapping("/biz/{id}")
public PayOrderDTO queryPayOrderByBizOrderNo(@PathVariable("id") Long id){
    PayOrder payOrder = payOrderService.lambdaQuery().eq(PayOrder::getBizOrderNo, id).one();
    return BeanUtils.copyBean(payOrder, PayOrderDTO.class);
}
```

### 4.5.5.消息监听
接下来，我们在trader-service编写一个监听器，监听延迟消息，查询订单支付状态：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/27967491/1690343618777-60200e66-3734-439b-91fe-db8ea3eba148.png#averageHue=%23f9fbf8&clientId=u8e4bad19-60cd-4&from=paste&height=473&id=u1b34de9f&originHeight=528&originWidth=775&originalType=binary&ratio=1.115625023841858&rotation=0&showTitle=false&size=50673&status=done&style=none&taskId=u3f7707e8-1cb4-4f00-9175-570265974eb&title=&width=694.677856302601)
代码如下：
```java
package com.hmall.trade.listener;

import com.hmall.api.client.PayClient;
import com.hmall.api.dto.PayOrderDTO;
import com.hmall.common.domain.MultiDelayMessage;
import com.hmall.trade.constants.MqConstants;
import com.hmall.trade.domain.po.Order;
import com.hmall.trade.service.IOrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class OrderStatusListener {

    private final IOrderService orderService;

    private final PayClient payClient;

    private final RabbitTemplate rabbitTemplate;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = MqConstants.DELAY_ORDER_QUEUE, durable = "true"),
            exchange = @Exchange(name = MqConstants.DELAY_EXCHANGE, type = ExchangeTypes.TOPIC),
            key = MqConstants.DELAY_ORDER_ROUTING_KEY
    ))
    public void listenOrderCheckDelayMessage(MultiDelayMessage<Long> msg) {
        // 1.获取消息中的订单id
        Long orderId = msg.getData();
        // 2.查询订单，判断状态：1是未支付，大于1则是已支付或已关闭
        Order order = orderService.getById(orderId);
        if (order == null || order.getStatus() > 1) {
            // 订单不存在或交易已经结束，放弃处理
            return;
        }
        // 3.可能是未支付，查询支付服务
        PayOrderDTO payOrder = payClient.queryPayOrderByBizOrderNo(orderId);
        if (payOrder != null && payOrder.getStatus() == 3) {
            // 支付成功，更新订单状态
            orderService.markOrderPaySuccess(orderId);
            return;
        }
        // 4.确定未支付，判断是否还有剩余延迟时间
        if (msg.hasNextDelay()) {
            // 4.1.有延迟时间，需要重发延迟消息，先获取延迟时间的int值
            int delayVal = msg.removeNextDelay().intValue();
            // 4.2.发送延迟消息
            rabbitTemplate.convertAndSend(MqConstants.DELAY_EXCHANGE, MqConstants.DELAY_ORDER_ROUTING_KEY, msg,
                    message -> {
                        message.getMessageProperties().setDelay(delayVal);
                        return message;
                    });
            return;
        }
        // 5.没有剩余延迟时间了，说明订单超时未支付，需要取消订单
        orderService.cancelOrder(orderId);
    }
}

```
注意，这里要在OrderServiceImpl中实现cancelOrder方法，留作作业大家自行实现。

## 5.1.取消订单
在处理超时未支付订单时，如果发现订单确实超时未支付，最终需要关闭该订单。
关闭订单需要完成两件事情：

- 将订单状态修改为已关闭
- 恢复订单中已经扣除的库存

在`IOrderService`接口中定义`cancelOrder`方法：
```java
void cancelOrder(Long orderId);
```
并且在`OrderServiceImpl`中实现该方法。实现过程中要注意业务幂等性判断。

## 5.2.抽取MQ工具
MQ在企业开发中的常见应用我们就学习完毕了，除了收发消息以外，消息可靠性的处理、生产者确认、消费者确认、延迟消息等等编码还是相对比较复杂的。
因此，我们需要将这些常用的操作封装为工具，方便在项目中使用。要求如下：

- 在`commom`模块下编写发送消息的工具类`RabbitMqHelper`
- 定义一个自动配置类`MqConsumeErrorAutoConfiguration`，内容包括：
   - 声明一个交换机，名为`error.direct`，类型为`direct`
   - 声明一个队列，名为：`微服务名 + error.queue`，也就是说要动态获取
   - 将队列与交换机绑定，绑定时的`RoutingKey`就是`微服务名`
   - 声明`RepublishMessageRecoverer`，消费失败消息投递到上述交换机
   - 给配置类添加条件，当`spring.rabbitmq.listener.simple.retry.enabled`为`true`时触发


RabbitMqHelper的结构如下：
```java
public class RabbitMqHelper {

    private final RabbitTemplate rabbitTemplate;

    public void sendMessage(String exchange, String routingKey, Object msg){

    }

    public void sendDelayMessage(String exchange, String routingKey, Object msg, int delay){

    }

    public void sendMessageWithConfirm(String exchange, String routingKey, Object msg, int maxRetries){
        
    }
}
```



