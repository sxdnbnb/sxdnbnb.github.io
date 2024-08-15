# **定时调度解决方案和对比**

现成的定时调度的解决方案有很多，总结下来有三大类：  
**1\. 使用开源的定时调度框架，如Quartz、XXL-JOB、Elastic-Job。**  
**2\. 使用Java中的定时任务api，比如Timer、ScheduledExecutorService。**  
**3\. 使用Spring提供的@Scheduled注解。**

上述三种方案中：  
1.开源调度框架是最方便使用的，这些框架以其强大的功能和灵活性而著称，通常还配备有可视化的管理面板，使得任务调度的监控和管理变得十分便捷。然而，它们可能需要单独部署和维护，对于业务中调度任务不多的场景，可能会造成资源的浪费，如果业务中调度任务不多的话，没有必要大费周折去部署和维护这么一套系统。  
2.使用jdk自带的Timer，或者 ScheduledThreadPoolExecutor来自己手动实现，这种方式灵活度高，这种方式提供了高度的自定义性，允许开发者根据业务需求进行详细的任务调度实现。但同时，这些API相对较为底层，不支持直接使用cron表达式，如果需要此类功能，则可能需要额外开发cron表达式解析器，增加了开发成本。  
3.使用Spring提供的 @Scheduled 注解，仅需简单配置cron表达式，即可实现定时任务的执行。鉴于当前大多数Java应用都在使用Spring框架，引入@Scheduled 注解的成本相对较低，且易于与现有Spring生态系统整合。

# Spring 实现可动态修改的调度任务

众所周知，Sping中的调度任务仅需简单几步即可实现：

1.  在使用spring的项目中 ，在一个方法上添加一个 **@Scheduled** 注解
    
2.  然后根据业务需要添加需要的cron表达式或利用fixRate等参数
    
3.  最后在启动类上添加 **@EnableScheduling** 即可。
    

那么使用@Scheduled实现的定时任务可以动态修改调度策略吗？  
**其实是不可以的**😊👍  
定时调度策略、定时执行的业务逻辑，是在spring容器启动的时候就设置好的，而且spring并没有提供相关的接口（具体流程可看本文末尾的附录）。所以要想动态修改 定时调度的策略，那么就只能自己使用spring提供的现有工具实现一套简单的小框架。

## 示例：

大体结构如下 ↓  

![alt text](Spring动态定时任务\image.png)

1.  首先新建一个数据库表用于存放定时任务的配置
    

![alt text](Spring动态定时任务\image-1.png)

```sql
INSERT INTO db.TM_SCHEDULED_TASK_CONFIG
(ID, TASK_NAME, MODULE, CRON, EXT_PARAM, IS_REPEATABLE, IS_ENABLE, IS_VISIBLE, CREATED_ID, CREATED_DATETIME, LAST_MODIFIED_ID, LAST_MODIFIED_DATETIME)
VALUES('1', 'demo-task', 'bdrs-service', '5 * * * * ?', '{"groupId":"111"}', 1, 0, 1, 'system', '2024-07-10 10:15:46', 'system', '2024-07-10 11:25:05');
```

1.  新建对应的定时任务类，继承AbstractScheduledTask，@Component处需要显示指定BeanName，与配置中的TaskName保持一致。
    

```java
@Component("demo-task")
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class DemoTask extends AbstractDbScheduledTask<DemoScheduledTaskExtParam> {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void runOneTime(DemoScheduledTaskExtParam extParam) {
        logger.info("【【【【extParam = {}】】】",extParam);
        int time = 30;
        while(time > 0){
            logger.info("【【【现在秒数：{}",time--);
            try{
                Thread.sleep(1000);
            }catch (Exception e){
                logger.info("【【【被中断了可恶！秒数：{}",time);
                return;
            }
        }
        logger.info("倒计时结束了呢。");
    }

    @Override
    protected int getTaskLockId() {
        return TaskLockEnum.DEMO_SCHEDULED_TASK.getCode();
    }

    @Override
    public long getTaskLockIntervalMillSec() {
        return CommonConstant.INTERVAL_MILLSEC;
    }

    @Override
    public Class<DemoScheduledTaskExtParam> getRealGenericType() {
        return DemoScheduledTaskExtParam.class;
    }
}
```

3.  AbstractAutoSchedulingTask
    

自动更新配置定时任务的定时任务，每分钟执行一次

```java
/**
 * 自动更新配置定时任务的定时任务
 */
public abstract class AbstractAutoSchedulingTask {
    /**
     * 任务池，维护每个任务对应的配置，如配置被改为禁用则将移除
     */
    private final Map<String, AbstractGlobalTaskScheduler> taskPool = new HashMap<>();

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Scheduled(cron = "0 * * * * ?")
    public void schedule() {
        logger.info("执行[AutoSchedulingTask:自动更新配置定时任务的定时]任务,begin..");
        List<ScheduledTaskConfigEntity> configs = getConfigs();
        logger.info("当前模块下有{}个任务", configs.size());

        for (ScheduledTaskConfigEntity scheduledTaskConfig : configs) {
            String id = scheduledTaskConfig.getId();
            if (taskPool.containsKey(id)) {
                AbstractGlobalTaskScheduler globalTaskScheduler = taskPool.get(id);
                if (scheduledTaskConfig.getIsEnable() == 1) {
                    ScheduledTaskConfigEntity oldConfig = globalTaskScheduler.getScheduledTaskConfigEntity();
                    if (!StringUtils.equals(scheduledTaskConfig.getCron(), oldConfig.getCron()) || oldConfig.getIsEnable() == 0 ||
                            !scheduledTaskConfig.getIsRepeatable().equals(oldConfig.getIsRepeatable())) {
                        logger.info("任务[{}]原配置为：[{}]，更新为：[{}]，重启任务", scheduledTaskConfig.getTaskName(), oldConfig, scheduledTaskConfig);
                        globalTaskScheduler.stop();
                        globalTaskScheduler.init(scheduledTaskConfig);
                    } else {
                        logger.info("任务[{}]已在计划中：[{}]", scheduledTaskConfig.getTaskName(), scheduledTaskConfig.getCron());
                    }
                } else {
                    logger.info("任务[{}]禁用，现停止任务", scheduledTaskConfig.getTaskName());
                    globalTaskScheduler.stop();
                    taskPool.remove(id);
                }
            } else if (scheduledTaskConfig.getIsEnable() == 1) {
                logger.info("任务[{}]未加入计划，现配置为：{}", scheduledTaskConfig.getTaskName(), scheduledTaskConfig.getCron());
                AbstractGlobalTaskScheduler globalTaskScheduler = getGlobalTaskScheduler();
                if (globalTaskScheduler.init(scheduledTaskConfig)) {
                    taskPool.put(id, globalTaskScheduler);
                } else {
                    logger.info("初始化失败，不加入任务池");
                }
            }
        }
        logger.info("执行[AutoSchedulingTask:自动更新配置定时任务的定时]任务,end..");

    }

    protected abstract AbstractGlobalTaskScheduler getGlobalTaskScheduler();

    /**
     * 获取当前模块下的任务配置
     *
     * @return
     */
    protected abstract List<ScheduledTaskConfigEntity> getConfigs();

    public void clear() {
        taskPool.clear();
    }

}
```

4.  AbstractGlobalTaskScheduler
    

在这个抽象类的实现类中（本文未放），**getScheduledTask**方法的实现是从 Spring 容器中通过 **TaskName** ，利用 **getBean** 方法获得任务的 Bean。

```java
/**
 * 任务调度 管理
 */
public abstract class AbstractGlobalTaskScheduler {

    @Autowired
    @Qualifier("taskScheduler")
    private ThreadPoolTaskScheduler scheduler;

    private AbstractScheduledTask<?> task;

    private ScheduledFuture<?> future;

    private Logger logger = LoggerFactory.getLogger(getClass());

    public boolean init(ScheduledTaskConfigEntity scheduledTaskConfig) {
        logger.info("初始化任务[{}] - [{}]", scheduledTaskConfig.getTaskName(), scheduledTaskConfig.getCron());
        task = getScheduledTask(scheduledTaskConfig.getTaskName());
        if (task != null) {
            task.setScheduledTaskConfig(scheduledTaskConfig);
            future = scheduler.schedule(task, new CronTrigger(scheduledTaskConfig.getCron()));
            return true;
        } else {
            return false;
        }
    }

    protected abstract AbstractScheduledTask getScheduledTask(String taskName);

    public void stop() {
        logger.debug("停止任务");
        Optional.ofNullable(future).ifPresent(f -> f.cancel(true));
        Optional.ofNullable(task).ifPresent(AbstractScheduledTask::stop);
    }

    public ScheduledTaskConfigEntity getScheduledTaskConfigEntity(){
        return task.getScheduledTaskConfig();
    }

}
```

5.  ScheduledTask 接口
    

```java
public interface ScheduledTask<T extends ScheduledTaskExtParam> extends Runnable{
    /**
     * 禁用已执行完成的一次性任务
     *
     * @param scheduledTaskConfig 任务配置
     */
    void disable(ScheduledTaskConfigEntity scheduledTaskConfig);


    /**
     * 所有的定时任务子类只需要实现下面这个方法，实现逻辑就是接收这个统一的业务时间参数，完成相应的任务执行
     */
    void runOneTime(T extParam);

    /**
     * 获得真正的泛型类型（替代反射
     * @return
     */
    Class<T> getRealGenericType();

    /**
     * 任务锁过期时间毫秒数
     *
     * @return
     */
    long getTaskLockIntervalMillSec();
}
```

6.  AbstractScheduledTask
    

```java
/**
 * 定时任务抽象类，所有的定时任务类都要继承这个抽象类，并实现runOneTime方法
 * 具体的定时任务执行的时候是【同步互斥】的（需要获取任务锁）
 */
public abstract class AbstractScheduledTask<T extends ScheduledTaskExtParam> extends SynchronizeGracefulTaskHandler implements ScheduledTask<T> {
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Getter
    @Setter
    private ScheduledTaskConfigEntity scheduledTaskConfig;

    @Getter
    @Resource
    private ThreadPoolTaskExecutor threadPoolTaskExecutor;

    /**
     * 每个定时任务的入口 获取DB配置后，解析时间字段并执行任务，支持多次执行（在做修复或重跑历史数据时有用） 执行结束后，根据是否可重复执行的配置来更新启用状态
     */
    @Override
    public void run() {
        logger.info("开始执行任务：[{} - {}], 当前threadId=[{}], threadName=[{}]", scheduledTaskConfig.getTaskName(), scheduledTaskConfig.getBizTime(),
                Thread.currentThread().getId(), Thread.currentThread().getName());

        if (scheduledTaskConfig.getIsEnable() == 0) {
            logger.info("任务已禁用，取消执行");
            return;
        }

        try {
            ScheduledTaskConfigEntity scheduledTaskConfig = getScheduledTaskConfig();
            //获取扩展参数
            String extParam = scheduledTaskConfig.getExtParam();
            Class<T> realGenericType = getRealGenericType();
            final T typeVariable;
            try {
                if (StringUtil.isNotBlank(extParam)) {
                    typeVariable = JsonUtil.jsonReSerializer(extParam, realGenericType);
                } else {
                    typeVariable = realGenericType.newInstance();
                }
                scheduledTaskConfig.setExtParamObject(typeVariable);
            } catch (Exception e) {
                GeneralLogUtil.warn(logger, WarnLogEnum.WARN_UNEXPECTED_ENUM, "反序列化extParam时出现错误,任务名：{},参数：{}",
                        e, scheduledTaskConfig.getTaskName(), extParam);
                return;
            }

            //执行链： execute --> executeInternal --> synchronizeExecuteInternal --> runOneTime
            execute();
        } catch (Exception e) {
            GeneralLogUtil.warn(logger, WarnLogEnum.WARN_UNEXPECTED_ENUM, scheduledTaskConfig.getTaskName() + "任务失败", e);
        }

        if (scheduledTaskConfig.getIsRepeatable() != 1) {
            scheduledTaskConfig.setIsEnable(0L);
            disable(scheduledTaskConfig);
        }

        logger.info("[{}]任务执行成功！", scheduledTaskConfig.getTaskName());
    }

    @Override
    public void synchronizeExecuteInternal() throws Exception {
        threadPoolTaskExecutor.execute(() -> runOneTime((T) scheduledTaskConfig.getExtParamObject()));
    }

    public void stop() {
        signalToExit();
    }
}
```

# 附：Sping中的调度任务是如何实现的

简单来说：  
1.在使用spring的项目中 ，在一个方法上添加一个 @Scheduled 注解  
2.然后根据业务需要添加需要的cron表达式或利用fixRate等参数  
3.最后在启动类上添加 @EnableScheduling 即可。  

![alt text](Spring动态定时任务\image-2.png)

> 图上绿色部分为Spring的类，浅黄色的为Java 原生的类

## @EnableScheduling 与 自动装配

当在配置类上使用 @EnableScheduling 注解时，Spring会创建一个名为 scheduledAnnotationProcessor 的bean。这个过程是通过 SchedulingConfiguration 类实现的。该类是 @EnableScheduling 注解导入的配置类，它负责创建ScheduledAnnotationBeanPostProcessor实例。

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Import(SchedulingConfiguration.class)
@Documented
public @interface EnableScheduling {

}


@Configuration(proxyBeanMethods = false)
@Role(BeanDefinition.ROLE_INFRASTRUCTURE)
public class SchedulingConfiguration {

    //定义了一个名为scheduledAnnotationProcessor的bean
    //ScheduledAnnotationBeanPostProcessor类主要负责解析@Scheduled注解并创建定时任务
    @Bean(name = TaskManagementConfigUtils.SCHEDULED_ANNOTATION_PROCESSOR_BEAN_NAME)
    @Role(BeanDefinition.ROLE_INFRASTRUCTURE)
    public ScheduledAnnotationBeanPostProcessor scheduledAnnotationProcessor() {
        return new ScheduledAnnotationBeanPostProcessor();
    }
    //@Role(BeanDefinition.ROLE_INFRASTRUCTURE) 注解表示这个bean是基础设施bean，
    //通常不会被应用程序代码直接使用。
}
```

## @Scheduled

以cron任务做介绍，其他任务流程类似

### 1.处理bean

当Spring创建bean时，ScheduledAnnotationBeanPostProcessor 的 postProcessAfterInitialization方法会被调用。这个方法会检查bean中的所有方法，寻找带有@Scheduled注解的方法。

```java
public Object postProcessAfterInitialization(Object bean, String beanName) {
  if (bean instanceof AopInfrastructureBean || bean instanceof TaskScheduler ||
    bean instanceof ScheduledExecutorService) {
   // Ignore AOP infrastructure such as scoped proxies.
   return bean;
  }

  Class<?> targetClass = AopProxyUtils.ultimateTargetClass(bean);
  if (!this.nonAnnotatedClasses.contains(targetClass) &&
    AnnotationUtils.isCandidateClass(targetClass, Arrays.asList(Scheduled.class, Schedules.class))) {
   Map<Method, Set<Scheduled>> annotatedMethods = MethodIntrospector.selectMethods(targetClass,
     (MethodIntrospector.MetadataLookup<Set<Scheduled>>) method -> {
      Set<Scheduled> scheduledAnnotations = AnnotatedElementUtils.getMergedRepeatableAnnotations(
        method, Scheduled.class, Schedules.class);
      return (!scheduledAnnotations.isEmpty() ? scheduledAnnotations : null);
     });
   if (annotatedMethods.isEmpty()) {
    this.nonAnnotatedClasses.add(targetClass);
    if (logger.isTraceEnabled()) {
     logger.trace("No @Scheduled annotations found on bean class: " + targetClass);
    }
   }
   else {
    // Non-empty set of methods
    annotatedMethods.forEach((method, scheduledAnnotations) ->
      scheduledAnnotations.forEach(scheduled -> processScheduled(scheduled, method, bean)));
    if (logger.isTraceEnabled()) {
     logger.trace(annotatedMethods.size() + " @Scheduled methods processed on bean '" + beanName +
       "': " + annotatedMethods);
    }
   }
  }
  return bean;
 }
```

### 2.创建定时任务

对于每个解析到的 @Scheduled 注解，ScheduledAnnotationBeanPostProcessor 会创建一个定时任务。  
它首先获取一个 TaskScheduler 实例（默认为 ThreadPoolTaskScheduler ），然后使用该实例为带有@Scheduled 注解的方法创建一个定时任务，任务的执行策略根据注解中的属性确定。  
这一步是在processScheduled方法的另一个重载版本中完成的。

```java
 protected void processScheduled(Scheduled scheduled, Method method, Object bean) {
  try {
   Runnable runnable = createRunnable(bean, method);
   boolean processedSchedule = false;
   String errorMessage =
     "Exactly one of the 'cron', 'fixedDelay(String)', or 'fixedRate(String)' attributes is required";

   Set<ScheduledTask> tasks = new LinkedHashSet<>(4);

   // Determine initial delay
   long initialDelay = convertToMillis(scheduled.initialDelay(), scheduled.timeUnit());
   String initialDelayString = scheduled.initialDelayString();
   if (StringUtils.hasText(initialDelayString)) {
    Assert.isTrue(initialDelay < 0, "Specify 'initialDelay' or 'initialDelayString', not both");
    if (this.embeddedValueResolver != null) {
     initialDelayString = this.embeddedValueResolver.resolveStringValue(initialDelayString);
    }
    if (StringUtils.hasLength(initialDelayString)) {
     try {
      initialDelay = convertToMillis(initialDelayString, scheduled.timeUnit());
     }
     catch (RuntimeException ex) {
      throw new IllegalArgumentException(
        "Invalid initialDelayString value \"" + initialDelayString + "\" - cannot parse into long");
     }
    }
   }

   // Check cron expression  // cron表达式处理
   String cron = scheduled.cron();
   if (StringUtils.hasText(cron)) {
    String zone = scheduled.zone();
    if (this.embeddedValueResolver != null) {
     cron = this.embeddedValueResolver.resolveStringValue(cron);
     zone = this.embeddedValueResolver.resolveStringValue(zone);
    }
    if (StringUtils.hasLength(cron)) {
     Assert.isTrue(initialDelay == -1, "'initialDelay' not supported for cron triggers");
     processedSchedule = true;
     if (!Scheduled.CRON_DISABLED.equals(cron)) {
      TimeZone timeZone;
      if (StringUtils.hasText(zone)) {
       timeZone = StringUtils.parseTimeZoneString(zone);
      }
      else {
       timeZone = TimeZone.getDefault();
      }
      tasks.add(this.registrar.scheduleCronTask(new CronTask(runnable, new CronTrigger(cron, timeZone))));
     }
    }
   }

   // At this point we don't need to differentiate between initial delay set or not anymore
   if (initialDelay < 0) {
    initialDelay = 0;
   }

   // Check fixed delay// 固定延迟
   ......

   // Check fixed rate// 固定频次
   ......

   // Check whether we had any attribute set
   Assert.isTrue(processedSchedule, errorMessage);

   // Finally register the scheduled tasks
   synchronized (this.scheduledTasks) {
    Set<ScheduledTask> regTasks = this.scheduledTasks.computeIfAbsent(bean, key -> new LinkedHashSet<>(4));
    regTasks.addAll(tasks);
   }
  }
  catch (IllegalArgumentException ex) {
   throw new IllegalStateException(
     "Encountered invalid @Scheduled method '" + method.getName() + "': " + ex.getMessage());
  }
 }
```

### 3.创建Runnable

createRunnable 方法用于创建一个 Runnable 实例，它封装了带有 @Scheduled 注解的方法的调用。这个Runnable 实例将被传递给任务调度器。

```java
protected Runnable createRunnable(Object target, Method method) {
  Assert.isTrue(method.getParameterCount() == 0, "Only no-arg methods may be annotated with @Scheduled");
  Method invocableMethod = AopUtils.selectInvocableMethod(method, target.getClass());
  return new ScheduledMethodRunnable(target, invocableMethod);
 }
```

### 4.创建Trigger

createTrigger 方法根据 @Scheduled 注解的属性创建一个 Trigger 实例。Trigger 实例决定了任务的执行策略，如固定速率、固定延迟或 Cron 表达式。

```java
public CronTrigger(String expression, ZoneId zoneId) {
    Assert.hasLength(expression, "Expression must not be empty");
    Assert.notNull(zoneId, "ZoneId must not be null");

    this.expression = CronExpression.parse(expression);
    this.zoneId = zoneId;
}
```

### 5.配置调度任务

根据cron表达式对业务逻辑进行调度

```java
public ScheduledTask scheduleCronTask(CronTask task) {
ScheduledTask scheduledTask = this.unresolvedTasks.remove(task);
boolean newTask = false;
if (scheduledTask == null) {
    scheduledTask = new ScheduledTask(task);
    newTask = true;
}
if (this.taskScheduler != null) {
    scheduledTask.future = this.taskScheduler.schedule(task.getRunnable(), task.getTrigger());
}
else {
    addCronTask(task);
    this.unresolvedTasks.put(task, scheduledTask);
}
return (newTask ? scheduledTask : null);
}
```

## 为@Scheduled自定义一个线程池

spring在执行调度任务前，会按照好一定的策略，寻找一个可用的线程池来执行调度任务

1.  通过自定义的 SchedulingConfigurer 的实现类，实现对 registrar 中线程池的配置。
    

```java
if (this.beanFactory instanceof ListableBeanFactory) {
 Map<String, SchedulingConfigurer> beans =
   ((ListableBeanFactory) this.beanFactory).getBeansOfType(SchedulingConfigurer.class);
 List<SchedulingConfigurer> configurers = new ArrayList<>(beans.values());
 AnnotationAwareOrderComparator.sort(configurers);
 for (SchedulingConfigurer configurer : configurers) {
  configurer.configureTasks(this.registrar);
 }
}
```

1.  如果第一步没有找到可用的线程池，那么就会从上下文中获取一个类型为 TaskScheduler 的bean作为可用线程池。如果你在上下文中没有定义或者定义了多个 TaskScheduler 的话，那么 spring会抛出一个找不到bean或者bean不唯一的异常，然后输出相关的日志提醒。
    

```java
if (this.registrar.hasTasks() && this.registrar.getScheduler() == null) {
 Assert.state(this.beanFactory != null, "BeanFactory must be set to find scheduler by type");
 try {
  // Search for TaskScheduler bean...
  this.registrar.setTaskScheduler(resolveSchedulerBean(this.beanFactory, TaskScheduler.class, false));
 }
 catch (NoUniqueBeanDefinitionException ex) {
  if (logger.isTraceEnabled()) {
   logger.trace("Could not find unique TaskScheduler bean - attempting to resolve by name: " +
     ex.getMessage());
  }
  try {
   this.registrar.setTaskScheduler(resolveSchedulerBean(this.beanFactory, TaskScheduler.class, true));
  }
  catch (NoSuchBeanDefinitionException ex2) {
   ...
  }
 }
 catch (NoSuchBeanDefinitionException ex) {
  if (logger.isTraceEnabled()) {
   logger.trace("Could not find default TaskScheduler bean - attempting to find ScheduledExecutorService: " +
     ex.getMessage());
  }
  // Search for ScheduledExecutorService bean next...
  try {
   this.registrar.setScheduler(resolveSchedulerBean(this.beanFactory, ScheduledExecutorService.class, false));
  }
  catch (NoUniqueBeanDefinitionException ex2) {
   if (logger.isTraceEnabled()) {
    logger.trace("Could not find unique ScheduledExecutorService bean - attempting to resolve by name: " +
      ex2.getMessage());
   }
   try {
    this.registrar.setScheduler(resolveSchedulerBean(this.beanFactory, ScheduledExecutorService.class, true));
   }
   catch (NoSuchBeanDefinitionException ex3) {
    ....
   }
  }
  catch (NoSuchBeanDefinitionException ex2) {
   ...
  }
 }
}
```

2.  如果第二步也没有找到可用线程池的话，就会创建一个默认的线程池。而默认会创建一个 newSingleThreadScheduledExecutor 作为默认的线程池。这个线程池的 最大线程池个数和队列大小都是Integer.MAX\_VALUE。这种线程池在业务开发中是不推荐，会导致系统资源被过多占用。
    

**总结：所以还是自定义线程池吧，在第一步的时候，定义一个 SchedulingConfigurer 来完成对 register的配置。**

## ScheduledExecutorService

Java的定时调度可以通过**Timer&TimerTask**来实现。由于其实现的方式为单线程，因此从JDK1.3发布之后就一直存在一些问题，大致如下：

+   多个任务之间会相互影响
    
+   多个任务的执行是串行的，性能较低
    

ScheduledExecutorService在设计之初就是为了解决Timer&TimerTask的这些问题。因为天生就是基于**多线程机制**，所以任务之间不会相互影响（只要线程数足够。当线程数不足时，有些任务会复用同一个线程）。  
除此之外，因为其内部使用的**延迟队列**，本身就是基于等待/唤醒机制实现的，所以CPU并不会一直繁忙。同时，多线程带来的CPU资源复用也能极大地提升性能。  
因为ScheduledExecutorService继承于ExecutorService，所以本身支持线程池的所有功能。额外还提供了4种方法

```java
/**
 * 带延迟时间的调度，只执行一次
 * 调度之后可通过Future.get()阻塞直至任务执行完毕
 */
1. public ScheduledFuture<?> schedule(Runnable command,
                                      long delay, TimeUnit unit);


/**
 * 带延迟时间的调度，只执行一次
 * 调度之后可通过Future.get()阻塞直至任务执行完毕，并且可以获取执行结果
 */
2. public <V> ScheduledFuture<V> schedule(Callable<V> callable,
                                          long delay, TimeUnit unit);


/**
 * 带延迟时间的调度，循环执行，固定频率
 */
3. public ScheduledFuture<?> scheduleAtFixedRate(Runnable command,
                                                 long initialDelay,
                                                 long period,
                                                 TimeUnit unit);


/**
 * 带延迟时间的调度，循环执行，固定延迟
 */
4. public ScheduledFuture<?> scheduleWithFixedDelay(Runnable command,
                                                    long initialDelay,
                                                    long delay,
                                                    TimeUnit unit);

//直白地讲，scheduleAtFixedRate()为固定频率，scheduleWithFixedDelay()为固定延迟。
//固定频率是相对于任务执行的开始时间，而固定延迟是相对于任务执行的结束时间，这就是他们最根本的区别
```

**其和普通线程池是不同的地方在于**: 阻塞队列和创建线程的方式。  
在线程池状态正常的情况下，最终会调用**ensurePrestart()**方法来完成线程的创建。主要逻辑有两个：  
当前线程数未达到核心线程数，则创建核心线程；当前线程数已达到核心线程数，则创建非核心线程，不会将任务放到阻塞队列中，这一点是和普通线程池是不相同的。

## ThreadPoolTaskScheduler

**ThreadPoolTaskScheduler** 是 Spring Framework 中的一个类，它实现了 Spring 的 TaskScheduler 接口。  
它是基于 **ScheduledExecutorService** 的，提供了一个易于使用的 API 来处理 Spring 应用程序中的异步任务和定时任务。

### 结构

**继承关系**：ThreadPoolTaskScheduler 继承自 ExecutorConfigurationSupport，这是一个辅助类，提供线程池配置的通用功能。  
**成员变量**：

1.  scheduledExecutor：实际执行定时任务的 ScheduledExecutorService。
    
2.  poolSize：线程池的大小，默认为 1。
    
3.  threadNamePrefix：线程名称的前缀，默认为 "pool-"。
    

**定时任务方法**：  
ThreadPoolTaskScheduler 四个版本定时任务方法：

```java
schedule(Runnable task, Date stateTime);
//在指定时间执行一次定时任务

schedule(Runnable task, Trigger trigger);
//动态创建指定表达式cron的定时任务，threadPoolTaskScheduler.schedule(() -> {}, triggerContext -> newCronTrigger("").nextExecutionTime(triggerContext));

scheduleAtFixedRate(Runnable task, long period);
scheduleAtFixedRate(Runnable task, Date startTime, long period);
//指定间隔时间执行一次任务，间隔时间为前一次执行开始到下次任务开始时间

scheduleWithFixedDelay(Runnable task, Date startTime, long delay);
scheduleWithFixedDelay(Runnable task, long delay);
//指定间隔时间执行一次任务，间隔时间为前一次任务完成到下一次开始时间
```

### 执行 schedule 方法

1.  **参数解析**：schedule 方法接收一个 Runnable 任务和 Trigger 对象。Trigger 定义了任务的执行计划。
    
2.  **任务封装**：将传入的 Runnable 任务封装为 ReschedulingRunnable 对象，该对象内部持有 Runnable 任务和 Trigger。
    
3.  **计算执行时间**：ReschedulingRunnable 的 run 方法首先会根据 Trigger计算下一次执行的时间。
    

```java
//ThreadPoolTaskScheduler.schedule
public ScheduledFuture<?> schedule(Runnable task, Trigger trigger) {
    ScheduledExecutorService executor = getScheduledExecutor();
    try {
       ErrorHandler errorHandler = this.errorHandler;
       if (errorHandler == null) {
          errorHandler = TaskUtils.getDefaultErrorHandler(true);
       }
       return new ReschedulingRunnable(task, trigger, this.clock, executor, errorHandler).schedule();
    }
    catch (RejectedExecutionException ex) {
       throw new TaskRejectedException("Executor [" + executor + "] did not accept task: " + task, ex);
    }
}
```

4.  **提交任务**：使用 ScheduledExecutorService 的 schedule 方法将 ReschedulingRunnable 提交到线程池中，按照计算出的延迟时间执行。
    
5.  **执行任务**：在 ReschedulingRunnable 的 run 方法中，首先执行实际的任务（调用 Runnable 的 run 方法），然后再次调用 schedule 方法进行下一次的调度。
    
6.  **循环调度**：如果任务需要重复执行，ReschedulingRunnable 会在每次执行完毕后重新计算下一次的执行时间，并再次提交到线程池中，形成一个循环。
    

```java
//ReschedulingRunnable.schedule
public ScheduledFuture<?> schedule() {
    synchronized (this.triggerContextMonitor) {
       this.scheduledExecutionTime = this.trigger.nextExecutionTime(this.triggerContext);
       if (this.scheduledExecutionTime == null) {
          return null;
       }
       long delay = this.scheduledExecutionTime.getTime() - this.triggerContext.getClock().millis();
       this.currentFuture = this.executor.schedule(this, delay, TimeUnit.MILLISECONDS);
       return this;
    }
}
```

7.  **错误处理**：如果在任务执行过程中发生异常，会根据设置的错误处理程序进行处理。
    
8.  **取消任务**：如果需要取消任务，可以调用 ScheduledFuture 的 cancel 方法。如果设置了 setRemoveOnCancelPolicy(true)，则任务在取消时会从执行队列中移除。
    
9.  **资源清理**：在应用关闭时，destroy 方法会被调用，它会关闭 ScheduledExecutorService，等待所有任务执行完成或超时。