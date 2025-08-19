---
date: 2025-04-18 19:41:28
description: Spring的基础知识
title: Spring
tags:
  - 工具
permalink: /develop/Spring
top: true
sticky: 11
categories:
  - 开发工具
coverImg: /ikun/ikun00000087.png
---



## 基础

### Spring 特性

![](/picture/Spring/ZRmgboKw1oYE7axogCecsoTwn6b.png)

Spring特性

1. IoC 和 DI 的支持

Spring 的核心就是一个大的工厂容器，可以维护所有对象的创建和依赖关系，Spring 工厂用于生成 Bean，并且管理 Bean 的生命周期，实现高内聚低耦合的设计理念。

* AOP 编程的支持

Spring 提供了面向切面编程，可以方便的实现对程序进行权限拦截、运行监控等切面功能。

* 声明式事务的支持

支持通过配置就来完成对事务的管理，以前重复的一些事务提交、回滚的 JDBC 代码，都可以不用自己写了。

* 快捷测试的支持

Spring 对 Junit 提供支持，可以通过注解快捷地测试 Spring 程序。

* 快速集成功能

方便集成各种框架

* 复杂 API 模板封装

Spring 对 JavaEE 开发中非常难用的一些 API（JDBC、JavaMail、远程调用等）都提供了模板化的封装



### Spring常用注解

![](/picture/Spring/image-3.png)

容器相关：

* `@Component`：标识一个类为 Spring 组件，使其能够被 Spring 容器自动扫描和管理（作用于类）。

* `@Bean`：注解在方法上，声明当前方法的返回值为一个 Bean。

  （返回的 Bean 对应的类中可以定义 init()方法和 destroy()方法，然后在`@Bean(initMethod=”init”,destroyMethod=”destroy”)`定义，在构造之后执行 init，在销毁之前执行 destroy。）

* `@Controller`：标识一个Spring MVC控制层。

* `@Service`：标识一个业务逻辑组件（服务层）。比如 `@Service("userService")`，这里的 userService 就是 Bean 的名称。

* `@Repository`：标识一个数据访问组件（持久层）。

> [!NOTE]
> 一个简单的Spring Web应用分为三层
> 
> Controller层：控制层，负责请求转发，接受页面过来的参数，传给Service处理，接到返回值，再传给页面。即`用于接口暴露`。
>
> Service层：服务层、业务逻辑层，对一个或多个DAO进行的再次封装，封装成一个服务。专注`业务逻辑`，真正执行业务的操作。
>
> DAO层：数据访问层，全称为`Data Access Object`。负责数据`持久化`，与数据库打交道。主要实现对数据的增、删、改、查。将存储在数据库中的数据提交给业务层，同时将业务层处理的数据保存到数据库。

* `@Autowired`：Spring 提供的自动装配的工具（**优先按类型匹配**）
* `@Qualifier(value="")`：显示指定名称进行装配

* `@Resource`: JDK内置的自动装配的工具（**优先按名称匹配**）

* `@Configuration`：声明当前类是一个配置类（相当于一个 Spring 配置的 xml 文件）

* `@Value`：可用在字段，构造器参数跟方法参数，指定一个默认值，支持 `#{} 跟 ${}` 两个方式，`#{}`读取注入bean的属性，`${}`读取配置文件。
（一般将 SpringbBoot 中的 application.properties 配置的属性值赋值给变量）

AOP相关：

* `@Scope`：定义我们采用什么模式去创建 Bean（方法上，得有@Bean） 其设置类型包括：Singleton 、Prototype、Request 、 Session、GlobalSession
* `@Aspect`：指定增强类
* `@Before()` `@After()` `@Around()` `@AfterReturning()`：括号里填入**切入点表达式**，语法结构：`execution([权限修饰符][返回类型][类全路径名][方法名称]([参数列表]))`，例：`execution(* com.at.dao.BookDao.* (..))`
* `@Pointcut("execution(...)")`：定义切入点别名，一般注解在一个private标识方法上，即没有实际作用的方法，后边相同的切点可以使用`"pointCut()"`作为切入点，如`@Before("pointCut()")`
> [!NOTE]
> 开发中往往采用自定义注解实现AOP，通过注解来确定哪个方法需要增强，更自由。
> 
> 步骤1：自定义注解
> 
> 步骤2：编写增强类，类上加注解`@Aspect`,类中方法加`@Pointcut("@annotation(com.at.A)")`,后边用到的加`@Around(value="pointCut()")`
> 
>  步骤3：在增强方法上加自定义的注解，使用切面

* `@Transactional`：开启事务

### Spring 中应用了哪些设计模式呢？

1. 工厂模式 : Spring 容器本质是一个大工厂，使用工厂模式通过 BeanFactory、ApplicationContext 创建 bean 对象。

2. 代理模式 : Spring AOP 功能功能就是通过代理模式来实现的，分为动态代理和静态代理。

3. 单例模式 : Spring 中的 Bean 默认都是单例的，这样有利于容器对 Bean 的管理。

4. 模板模式 : Spring 中 JdbcTemplate、RestTemplate 等以 Template 结尾的对数据库、网络等等进行操作的模板类，就使用到了模板模式。

5. 观察者模式: Spring 事件驱动模型就是观察者模式很经典的一个应用。

6. 适配器模式 :Spring AOP 的增强或通知 (Advice) 使用到了适配器模式、Spring MVC 中也是用到了适配器模式适配 Controller。

7. 策略模式：Spring 中有一个 Resource 接口，它的不同实现类，会根据不同的策略去访问资源。



### `@Transactional`失效

Spring框架中的 `@Transactional`对事务进行管理的时候，有一些特殊情况会导致事务注解失效。以下列出一些常见的场景：

1. 在 protected、private 方法上使用`@Transactional`

如果在 protected、private 方法上使用`@Transactional`，这些事务注解将不会生效，原因：Spring 默认使用基于 JDK 的动态代理（当接口存在时）或基于 CGLIB 的代理（当只有类时）来实现事务。这两种代理机制都只能代理公开的方法。

* **自调用问题**：如果在同一个类中，一个没有加@Transactional注解的方法内部调用了 加了@Transactional的另一个方法，那么事务是不会起作用的。这是因为 @Transactional是基于AOP的，而Spring 的 AOP 事务管理默认是通过动态代理实现的，而自调用是直接通过`this`来调用方法。因为此时是同一对象调用自身的方法，并没有通过Spring的代理对象，因此Spring的事务管理器并未介入，所以事务不会被启动。

解决：可以考虑使用AopContext来手动获取代理对象；

![](/picture/Spring/image-2.png)

* **数据库引擎不支持事务**：如果你的数据库引擎（比如MySQL的MyISAM引擎）不支持事务，那么@Transactional也无法起作用。

解决：切换到支持事务的引擎，比如InnoDB；

* **异常处理不当**：默认情况下，Spring 只有在抛出的是运行时异常（也就是非检查异常，比如NullPointerException，IndexOutOfBoundsException等 RuntimeException 及其子类）或者 Error 时，才会回滚事务，而在遇到编译时异常（即需要被显式地捕获处理的异常 IOException、SQLException）时，是不会回滚事务的。

解决：可以在 `@Transactional` 注解中添加 rollbackFor 属性，使得在特定的 Exception 抛出时，也触发事务回滚。

## IoC

### 什么是 IoC

IoC（Inversion of Control，控制反转）是 Spring 框架的核心概念之一，在传统的编程模式中，对象之间的创建、和管理都是由开发人员手动完成的，而在 IoC 模式下，就都委托给一个容器来管理。

在 IoC 模式中，对象之间的依赖关系被反转了，即由开发人员手动控制对象之间的依赖关系变为由容器自动注入依赖。这种反转的控制使得应用程序的各个模块之间解耦，提高了代码的灵活性、可维护性和可测试性。

IoC 容器负责创建和管理对象，以及解决对象之间的依赖关系。开发人员只需在配置文件（如 XML 配置文件）或使用注解方式中指定对象的依赖关系和其他配置细节，容器就会根据这些配置信息动态地实例化对象、注入依赖并管理对象的生命周期。



**为什么要使用 IoC 呢？**

在平时的 Java 开发中，如果我们要实现某一个功能，可能至少需要两个以上的对象来协助完成，在没有 Spring 之前，需要自己 new 一个，比如说 A 要使用 B，A 就对 B 产生了依赖，也就是 A 和 B 之间存在了一种耦合关系。

有了 Spring 之后，创建 B 的工作交给了 Spring 来完成，Spring 创建好了 B 对象后就放到容器中，A 告诉 Spring 我需要 B，Spring 就从容器中取出 B 交给 A 来使用。

这就是 IoC 的好处，它降低了对象之间的耦合度，使得程序更加灵活，更加易于维护。



IoC 容器通过以下两种主要的方式来实现控制反转：

1. 依赖注入（Dependency Injection，DI）：依赖注入是 IoC 的一种具体实现方式，通过将依赖关系注入到对象中，实现了对象之间的解耦。容器负责查找依赖对象，并将其自动注入到相应的对象中。依赖注入可以通过构造函数、Setter 方法或接口注入来完成。

2. 依赖查找（Dependency Lookup）：依赖查找是另一种 IoC 的实现方式，它通过容器提供的 API，开发人员手动查找和获取所需的依赖对象。开发人员在代码中通过容器提供的接口来获取所需的对象实例，从而实现了对象之间的解耦。&#x20;

   依赖查找的优点是可以更加精细地控制对象之间的依赖关系，但是它也会增加对象之间的耦合度。在 Spring 框架中，依赖查找通过 ApplicationContext 接口的 getBean() 方法来实现。

依赖注入和依赖查找的区别在于，依赖注入是将依赖关系委托给容器，由容器来管理对象之间的依赖关系；而依赖查找是由对象自己来查找它所依赖的对象，容器只负责管理对象的生命周期



**IoC（Inverse of Control，控制反转）**：它是一种思想，主要解决程序设计中的对象依赖关系管理问题。在 IoC 思想中，对象的创建权反转给第三方容器，由容器进行对象的创建及依赖关系的管理。

**DI（Dependency Injection，依赖注入）**：它是 IoC 思想的具体实现方式之一，用于实现 IoC。在 Spring 中，依赖注入是指:在对象创建时，由容器自动将依赖对象注入到需要依赖的对象中。



### Spring IoC 的实现步骤：

1. **配置文件加载**：首先，Spring IoC 容器通过读取配置信息（可以是 XML 文件、Java 配置类或者注解等），得到需要管理的 Bean 对象以及它们之间的依赖关系。

2. **Bean的实例化**：根据配置信息，IoC 容器会创建这些对象。这个过程可能通过反射来完成，也可能通过 FactoryBean 来完成。

3. **依赖注入**：Spring IoC 容器会查看 Bean 对象之间的依赖关系，如果 A 对象依赖于 B 对象，那么 Spring IoC 容器会把已创建的 B 对象注入到 A 对象中。

4. **Bean对象的使用**：最后，当需要使用某个 Bean 对象时，你可以直接从 Spring IoC 容器中获取。如果配置的是单例模式，每次获取的都是同一个对象，如果是原型模式，每次获取的会是一个新的对象。

### 依赖注入（DI）的方法

Spring 支持构造方法注入、属性注入、工厂方法注入,其中工厂方法注入，又可以分为静态工厂方法注入和非静态工厂方法注入。

![](/picture/Spring/Ymemb3cJHo2u1DxkEIFccaK2nMX.png)

Spring依赖注入方法

### DI 实现原理

DI 的实现原理是通过反射机制实现的，通过 Java 反射机制可以知道实现类的结构信息，如构造方法的结构、属性等信息。在 Spring 框架中，当容器创建一个对象时，它会检查该对象的依赖关系，并使用反射机制查找依赖对象。然后，容器将依赖对象注入到该对象中。

具体来说，当使用 @Autowired 注释时，Spring 容器会自动查找与该类型匹配的 bean，并将其注入到该字段中。如果有多个匹配的 bean，则可以使用 @Qualifier 注释来指定要注入的 bean 的名称。

当使用 @Value 注释时，Spring 容器会将属性值注入到该字段中。属性值可以从配置文件中读取，也可以是硬编码的值。

优点分析

DI 的优点是可以减少对象之间的耦合，使代码更加灵活和可维护。通过将依赖关系委托给容器，对象之间的依赖关系变得更加松散，从而使代码更加模块化。

> Spring 提供了哪几种装配类型？

* @Autowired：Spring 提供的工具（**优先按类型匹配**）

* @Resource: JDK内置的（**优先按名称匹配**）

![](/picture/Spring/AaDCblVNGoNQcBxXFRTcGVVqnjc.png)

Spring四种自动装配类型



### BeanFactory 和 FactoryBean 的区别

BeanFactory 是 Spring 的基本容器，用于创建和管理 Bean 实例，而 FactoryBean 是一个特殊的 Bean，用于创建其他 Bean 实例。

下面是 BeanFactory 和 FactoryBean 之间的一些关键区别：

1. **功能**：BeanFactory 是一个容器，负责管理和创建 Bean 实例，处理依赖关系和属性注入等操作。FactoryBean 是一个接口，定义了创建 Bean 的规范和逻辑，它负责创建其他 Bean 实例。

2. **使用方式**：BeanFactory 使用配置文件或注解来定义 Bean 和它们之间的关系，它使用延迟初始化策略，即只有在需要时才创建 Bean 实例。FactoryBean 通常在 Spring 配置文件中配置，并由 BeanFactory 负责实例化和管理。

3. **创建的对象**：BeanFactory 创建和管理普通的 Bean 实例，而 FactoryBean 创建其他 Bean 实例。

4. **灵活性**：FactoryBean 具有更高的灵活性，因为它允许自定义的逻辑来创建和配置 Bean 实例。FactoryBean 的实现类可以根据特定的条件选择性地创建不同的 Bean 实例，或者在创建 Bean 之前进行一些初始化操作。这使得 FactoryBean 在某些情况下比 BeanFactory 更加强大和可扩展。

5. **返回类型**：BeanFactory 返回的是 Bean 实例本身，而 FactoryBean 返回的是由 FactoryBean 创建的 Bean 实例。因此，当使用 FactoryBean 时，需要通过调用 getObject() 方法来获取创建的 Bean 实例。

### Spring Bean 生命周期

Spring 中 Bean 的生命周期大致分为四个阶段：实例化（Instantiation）、属性赋值（Populate）、初始化（Initialization）、销毁（Destruction）。

![](/picture/Spring/RA78b7reCo81Pzx0jptcyBLTn7c.png)

Bean生命周期四个阶段

1. 实例化

在 Spring 容器启动时，会根据配置文件或注解等方式创建 Bean 的实例，**也就是说实例化就是为 Bean 对象分配内存空间**。根据 Bean 的作用域不同，实例化的方式也不同。例如，singleton 类型的 Bean 在容器启动时就会被实例化，而 prototype 类型的 Bean 则是在每次请求时才会被实例化。

* 属性赋值

在 Bean 实例化后，Spring 容器会自动将配置文件或注解中指定的属性值注入到 Bean 中。属性注入可以通过构造函数注入、Setter 方法注入、注解注入等方式实现。

* 初始化

在属性注入完成后，Spring 容器会调用 Bean 的初始化方法。Bean 的初始化方法可以通过实现 InitializingBean 接口、@PostConstruct 注解等方式实现。在初始化方法中，可以进行一些初始化操作，例如建立数据库连接、加载配置文件等。

* 使用

在 Bean 初始化完成后，Bean 就可以被应用程序使用了。在应用程序中，可以通过 Spring 容器获取 Bean 的实例，并调用 Bean 的方法。

* 销毁

在应用程序关闭时，Spring 容器会自动销毁所有的 Bean 实例。Bean 的销毁方法可以通过实现 DisposableBean 接口、@PreDestroy 注解等方式实现。在销毁方法中，可以进行一些清理操作，例如释放资源、关闭数据库连接等。

### Spring 中的 Bean 的作用域

Spring 的 Bean 主要支持五种作用域：

![](/picture/Spring/GFsFbXNxlom2Qxx2lkOc0GoPnqh.png)

Spring Bean支持作用域

* singleton : 在 Spring 容器仅存在一个 Bean 实例，Bean 以单实例的方式存在，是 Bean 默认的作用域。

* prototype : 每次从容器中调用 Bean 时，都会返回一个新的实例。

以下三个作用域于只在 Web 应用中适用：

* request : 每一次 HTTP 请求都会产生一个新的 Bean，该 Bean 仅在当前 HTTP Request 内有效。

* session : 同一个 HTTP Session 共享一个 Bean，不同的 HTTP Session 使用不同的 Bean。

### Spring 中的单例 Bean 线程安全问题

首先结论在这：Spring 中的单例 Bean不是线程安全的。

因为单例 Bean，是全局只有一个 Bean，所有线程共享。

假如会对 Bean 中的成员变量进行写操作，那么可能就存在线程安全的问题。



> 单例 Bean 线程安全问题怎么解决呢？

常见的有这么些解决办法：

将 Bean 中的成员变量保存在 ThreadLocal 中

ThredLocal 能保证多线程下变量的隔离，可以在类中定义一个 ThreadLocal 成员变量，将需要的可变成员变量保存在 ThreadLocal 里，这是推荐的一种方式。

## 反射

### 什么是反射

创建一个对象通常是通过 new 关键字来实现的，比如：

Person 类的信息在编译时就确定了，那假如在编译期无法确定类的信息，但又想在运行时获取类的信息、创建类的实例、调用类的方法，这时候就要用到反射。

反射允许程序在运行时动态地获取类的完整信息，并且能够在运行时操作类、方法、属性等。通过反射，程序可以在运行时检查类的结构，调用对象的方法，甚至修改对象的属性，而无需在编译时知道这些类的具体信息。

反射的主要功能依赖于 `java.lang.reflect` 包中的类，如 `Class`、`Method`、`Field`、`Constructor` 等。通过这些类，程序可以在运行时访问和操作类的结构。

### 反射的原理是什么？

我们都知道 Java 程序的执行分为编译 和 运行两步，编译之后会生成字节码(.class)文件，JVM 进行类加载的时候，会加载字节码文件，将类型相关的所有信息加载进方法区，反射就是去获取这些信息，然后进行各种操作。

### 反射有哪些应用场景？

①、Spring 框架就大量使用了反射来动态加载和管理 Bean。

②、Java 的动态代理（Dynamic Proxy）机制就使用了反射来创建代理类。代理类可以在运行时动态处理方法调用，这在实现 AOP 和拦截器时非常有用。

③、JUnit 和 TestNG 等测试框架使用反射机制来发现和执行测试方法。反射允许框架扫描类，查找带有特定注解（如 `@Test`）的方法，并在运行时调用它们。

## AOP

### 什么是AOP

AOP，也就是 Aspect-oriented Programming，译为面向切面编程。

就是把跨越多个模块的、一些业务逻辑相同的代码抽取到一个独立的模块中，以简化代码结构和提高可维护性和复用性。

比如说可以将日志记录、事务管理等分离出来，形成一个切面，然后在业务代码中引入这个切面，业务代码不再关心这些通用逻辑，只需要关心自己的业务实现，这样就实现了业务逻辑和通用逻辑的分离，提高代码的可重用性。

![](/picture/Spring/ShyEbpGNboCnHpxViv4coYXunSQ.png)

AOP应用示例

优点

通过使用 AOP，可以将通用的功能（如日志记录、性能统计、事务管理等）封装成切面，然后在需要的地方进行重用，从而提高代码的可维护性和可重用性。



AOP 的核心其实就是动态代理，可以使用 JDK 的动态代理，也可以使用 CGLIB 代理，主要应用于一些系统级服务，如日志收集、事务管理、安全检查、缓存、对象池管理等。

* **JDK动态代理**：JDK原生的实现方式，需要被代理的目标类必须实现接口，使用反射机制来代理接口方法。

* **cglib动态代理**：通过**继承被代理的目标类**实现代理，所以不需要目标类实现接口。(**CGLIB 通过动态生成一个需要被代理类的子类（即被代理类作为父类），该子类重写被代理类的所有不是 final 修饰的方法，并在子类中采用方法拦截的技术拦截父类所有的方法调用，进而织入横切逻辑。**)



> 可以继续追问：AOP 有哪些核心概念？
>
> &#x20;把切点和通知合在一起就是切面了，一个切面指定了在何时何地执行何种方法

* 切面（Aspect）：类是对物体特征的抽象，切面就是对横切关注点的抽象，它将通知和切点组合在一起，描述了在何处、何时和如何应用横切关注点。

* 连接点（Join Point）：被拦截到的点，因为 Spring 只支持方法类型的连接点，所以在 Spring 中，连接点指的是被拦截到的方法，实际上连接点还可以是字段或者构造方法

* 切点（Pointcut）：对连接点进行拦截的定位

* 通知（Advice）：指拦截到连接点之后要执行的代码，也可以称作增强

* 目标对象 （Target）：代理的目标对象

* 织入（Weabing）：织入是将增强添加到目标类的具体连接点上的过程。



> 继续追问：AOP 有哪些环绕方式？

AOP 一般有 5 种环绕方式：

* 前置通知 (@Before)

* 返回通知 (@AfterReturning)

* 异常通知 (@AfterThrowing)

* 后置通知 (@After)

* 环绕通知 (@Around)

![](/picture/Spring/IprKbqVf0oeGGaxxIpmch1u1ngb.png)

### 用到AOP

1. 在我的项目中，我使用 AOP 来实现统一的日志管理。具体实现方式是通过定义切面以及在切面中定义前置、后置、环绕等通知来记录需要的日志信息。

首先，我创建一个切面类，注解为@Aspect，并在类上添加 @Component 让Spring容器管理该类。

定义切点 @Pointcut("execution(\* com.example.controller..\*(..))")

然后，我定义一个前置通知，使用@Before注解。在此通知中，我获取了请求的相关信息，如请求URL、请求参数等，并写入日志。

接着，我定义一个后置通知，使用@AfterReturning注解。在此通知中，我记录方法的返回值，并将其写入日志。

通过上述方式，我可以非常方便地在所有Controller层的方法执行前后切入自己的代码，从而实现日志的统一管理。这样既保证了代码的可维护性，又减少了重复代码，使得代码更加简洁。此外，借助Spring框架的力量，可以方便地定制日志信息，例如按照不同的级别（info、debug、warn、error）、不同的类或者方法等记录日志

具体： 把切点和通知合在一起就是切面了，一个切面指定了在何时何地执行何种方法

* 像 `@Transactional` 注解，就是一个典型的 AOP 应用，它就是通过 AOP 来实现事务管理的。我们只需要在方法上添加 `@Transactional` 注解，Spring 就会在方法执行前后添加事务管理的逻辑。

  (其本质是通过 AOP 功能，对方法前后进行拦截，将事务处理的功能编织到拦截的方法中，也就是在目标方法开始之前启动一个事务，在目标方法执行完之后根据执行情况提交或者回滚事务。)

* 使用 AOP 实现统一的异常处理逻辑，在捕获到异常时，记录异常信息到日志，返回错误消息。

CGLIB 动态代理实现：

它通过继承方式实现代理，不需要接口，被广泛应用于 Spring AOP 中，用于提供方法拦截操作。

CGLib 实现步骤

1. 创建一个实现接口 MethodInterceptor 的代理类，重写 intercept 方法；

2. 创建获取被代理类的方法 getInstance(Object target);

3. 获取代理类，通过代理调用方法。



### AOP失效的场景

1. **同类方法内部调用**

   * **场景**：当类内部的方法相互调用时，AOP 失效。

   * **原因**：Spring AOP 是基于代理的，只有外部通过代理对象调用方法时，切面才能生效。而在同一个类中，方法内部调用不会经过代理对象，因此 AOP 失效。

2. **非公共（非 `public`）方法**

   * **场景**：AOP 只会拦截 `public` 方法，不能拦截 `private`、`protected` 或 `default`（包级私有）方法。

   * **原因**：Spring AOP 基于动态代理，只能代理 `public` 方法。如果方法是 `private`、`protected` 或包级私有，它们不会被代理，因此切面失效。

3. **`final` 修饰的方法或类**

   * **场景**：AOP 不会拦截被 `final` 修饰的类或方法。

   * **原因**：Spring AOP 依赖于代理类继承目标类或者实现接口。如果类或方法被标记为 `final`，则无法生成代理类，AOP 失效。

4. **没有通过 Spring 容器获取的对象**

   * **场景**：如果对象不是由 Spring 容器管理的，而是通过 `new` 关键字手动创建的实例，AOP 不会生效。

   * **原因**：Spring AOP 依赖 Spring 容器来管理代理对象。如果对象没有被 Spring 容器管理，代理无法注入。

### Spring 的事务隔离级别

Spring 的接口 TransactionDefinition 中定义了表示隔离级别的常量，当然其实主要还是对应数据库的事务隔离级别：

1. ISOLATION\_DEFAULT：使用后端数据库默认的隔离界别，MySQL 默认可重复读，Oracle 默认读已提交。

2. ISOLATION\_READ\_UNCOMMITTED：读未提交

3. ISOLATION\_READ\_COMMITTED：读已提交

4. ISOLATION\_REPEATABLE\_READ：可重复读

5. ISOLATION\_SERIALIZABLE：串行化



## &#x20;Spring 容器启动阶段会干什么

Spring 的 IoC 容器工作的过程，其实可以划分为两个阶段：容器启动阶段和Bean 实例化阶段。

其中容器启动阶段主要做的工作是加载和解析配置文件，保存到对应的 Bean 定义中。

![](/picture/Spring/SDkKb3tfGoBMQixjBHJcnHYinrc.png)

## Spring MVC 的工作流程

Spring MVC 是基于模型-视图-控制器的 Web 框架，它的工作流程也主要是围绕着 Model、View、Controller 这三个组件展开的。

![](/picture/Spring/Tp8ObwtZco0hwWx12nWcY5cWnLh.png)

Spring MVC的工作流程

①、发起请求：客户端通过 HTTP 协议向服务器发起请求。

②、前端控制器：这个请求会先到前端控制器，它是整个流程的入口点，负责接收请求并将其分发给相应的处理器。

③、处理器映射器：前端控制器调用 处理器映射器 来确定哪个 Controller 应该处理这个请求。通常会根据请求的 URL 来确定。

④、处理器适配器：一旦找到目标 Controller，前端控制器会使用 处理器适配器 来调用 Controller 的处理方法。

⑤、执行处理器：Controller 处理请求，处理完后返回一个 ModelAndView 对象，其中包含模型数据和逻辑视图名。

⑥、视图解析器：前端控制器 接收到 ModelAndView 后，会使用 视图解析器 来解析视图名称，找到具体的视图页面。

⑦、渲染视图：视图使用模型数据渲染页面，生成最终的页面内容。

⑧、响应结果：前端控制器 将视图结果返回给客户端。



## SpringBoot

Spring Boot 本质上是 Spring 框架的延伸和扩展，它的诞生是为了简化 Spring 框架初始搭建以及开发的过程，使用它可以不再依赖 Spring 应用程序中的 XML 配置，为更快、更高效的开发 Spring 提供更加有力的支持。 Spring Boot 也提供了很多特性，包括简化配置、内嵌服务器、自动装配、起步依赖等。开发人员可以通过使用 Spring Boot Starter 来快速集成常用的第三方库和框架，比如 Spring Data、Spring Security、MyBatis、Redis 等

## Spring Boot 启动原理

Spring Boot 应用通常有一个带有 main 方法的主类，这个类上标注了 `@SpringBootApplication` 注解，它是整个应用启动的入口。这个注解组合了` @SpringBootConfiguration、@EnableAutoConfiguration 和 @ComponentScan`，这些注解共同支持配置和类路径扫描。

当执行 main 方法时，首先创建一个` SpringApplication` 的实例。这个实例负责管理 Spring 应用的启动和初始化。

`SpringApplication.run()` 方法负责准备和启动 Spring 应用上下文（ApplicationContext）环境，包括：

* 扫描配置文件，添加依赖项

* 初始化和加载 Bean 定义

* 启动内嵌的 Web 服务器

##

## SpringBoot 自动配置

Spring Boot 的自动装配（Auto-configuration）是 Spring Boot 框架的核心特性之一。 Spring Boot 的自动装配通过约定大于配置的原则，根据项目的依赖和配置信息，自动进行配置，使得开发人员无需进行大量的手动配置。

原理：

在 Spring Boot 中，开启自动装配的注解是`@EnableAutoConfiguration`。它相当于告诉 Spring Boot 根据 pom.xml 中添加的依赖 自动配置项目。例如，如果 spring-boot-starter-web 依赖被添加到项目中，Spring Boot 会自动配置 Tomcat 和 Spring MVC。

`@EnableAutoConfiguration`注解的核心是`AutoConfigurationImportSelector` 类。这个类实现了`ImportSelector`接口，这个接口的作用就是收集需要导入的配置类，配合`@Import(）`就将相应的类导入到 Spring 容器中。

画张图来总结下：

![](/picture/Spring/Qsh1bGuBQoPekkxPNfPc3v1WnWb.png)



## 了解@SpringBootApplication 注解吗？

`@SpringBootApplication`是 Spring Boot 的核心注解，经常用于主类上，作为项目启动入口的标识。它是一个组合注解：

* `@SpringBootConfiguration`：继承自 `@Configuration`，标注该类是一个配置类，相当于一个 Spring 配置文件。

* `@EnableAutoConfiguration`：告诉 Spring Boot 根据 pom.xml 中添加的依赖自动配置项目。例如，如果 spring-boot-starter-web 依赖被添加到项目中，Spring Boot 会自动配置 Tomcat 和 Spring MVC。

* `@ComponentScan`：扫描当前包及其子包下被`@Component`、`@Service`、`@Controller`、`@Repository` 注解标记的类，并注册为 Spring Bean。

## 过滤器和拦截器

1. 区别

   1. **出身不同**：过滤器来自于 Servlet，而拦截器来自于 Spring 框架；

   2. **触发时机不同**：请求的执行顺序是：请求进入容器 > 进入过滤器 > 进入 Servlet > 进入拦截器 > 执行控制器（Controller）。所以过滤器和拦截器的执行时机，是过滤器会先执行，然后才会执行拦截器，最后才会进入真正的要调用的方法；

   ![](/picture/Spring/image.png)

   * **底层实现不同**：过滤器是基于方法回调实现的，拦截器是基于动态代理（底层是反射）实现的；

   ![](/picture/Spring/image-1.png)

   * **支持的项目类型不同**：过滤器是 Servlet 规范中定义的，所以过滤器要依赖 Servlet 容器，它只能用在 Web 项目中；而拦截器是 Spring 中的一个组件，因此拦截器既可以用在 Web 项目中，同时还可以用在 Application程序中；

   * **使用的场景不同**：因为拦截器更接近业务系统，所以拦截器主要用来实现项目中的业务判断的，比如：登录判断、权限判断、日志记录等业务；而过滤器通常是用来实现通用功能过滤的，比如：敏感词过滤、字符集编码设置、响应数据压缩等功能。

2. 实现过滤器

过滤器可以使用 Servlet 提供的 @WebFilter 注解，配置过滤的 URL 规则，然后再实现 Filter 接口，重写接口中的 doFilter 方法

其中：

* &#x20;void init(FilterConfig filterConfig)：[容器](https://cloud.tencent.com/product/tke?from_column=20065\&from=20065)启动（初始化 Filter）时会被调用，整个程序运行期只会被调用一次。用于实现 Filter 对象的初始化。

* &#x20;void doFilter(ServletRequest request, ServletResponse response,FilterChain chain)：具体的过滤功能实现代码，通过此方法对请求进行过滤处理，**其中 FilterChain 参数是用来调用下一个过滤器或执行下一个流程**。

* &#x20;void destroy()：用于 Filter 销毁前完成相关资源的回收工作。



* 实现拦截器

拦截器的实现分为两步，第一步，创建一个普通的拦截器，实现 HandlerInterceptor 接口，并重写接口中的相关方法；第二步，将上一步创建的拦截器加入到 Spring Boot 的配置文件中。

其中：

* boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handle)：在请求方法执行前被调用，也就是调用目标方法之前被调用。比如我们在操作数据之前先要验证用户的登录信息，就可以在此方法中实现，如果验证成功则返回 true，继续执行数据操作业务；否则就返回 false，后续操作数据的业务就不会被执行了。

* void postHandle(HttpServletRequest request, HttpServletResponse response, Object handle, ModelAndView modelAndView)：调用请求方法之后执行，但它会在 DispatcherServlet 进行渲染视图之前被执行。

* void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handle, Exception ex)：会在整个请求结束之后再执行，也就是在 DispatcherServlet 渲染了对应的视图之后再执行。

最后，我们再将上面的拦截器注入到项目配置文件中，并设置相应拦截规则，具体实现代码如下：

