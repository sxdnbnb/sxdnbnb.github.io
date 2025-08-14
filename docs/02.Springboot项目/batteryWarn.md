---
date: 2024-07-25 04:52:35
description: 基于Springboot实现的汽车电池预警系统，包括数据库设计和前端交互。
title: 汽车电池预警系统
tags:
  - 项目
permalink: /project/battery
categories:
  - Springboot项目
coverImg: /ikun/ikun00000068.png
---


## [![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sxdnbnb/BatteryWarn)

## 背景

BMS 系统是智能化管理及维护各个电池单元，防止电池出现过充电和过放电、延长电池的使用寿命、监控电池状态的系统。在 BMS 系统中存在大量电池各种信号的规则管理以及监控，良好的是处理信号，并且根据规则，生成相关预警信息，能够极大提升用户体验。为此需要大家完成一套支持规则配置、信号预警的系统，来解决电池各种突发情况和提升用户体验。

## 需求

### 整体业务图
![Alt text](/picture/batteryWarn/image2.png)

### 功能模块说明

1. 支持**车辆信息**（vid,车架编号,电池类型,总里程(km),电池健康状态(%)）

    > 车辆信息录入是因为：先有车才有电池，最后才会在车行驶中产生电流信号
    > vid: Vehicle Identification 车辆识别码，每辆车唯一，16 位随机字符串
    > 电池类型：三元电池、铁锂电池
    >
    >![Alt text](/picture/batteryWarn/image3.png)

2. **规则**（包括：序号，规则编号，名称，预警规则，电池类型）
    > 预警规则：包含预警规则描述以及预警等级（0 级最高响应）
    >
    > 电池类型：不同类型电池对应规则不同
    > 信号：Mx（最高电压）,Mi（最小电压）、Ix（最高电流）,Ii（最小电流）
    ># ![Alt text](/picture/batteryWarn/image.png)


### 预警接口

Server 需要提供以下接口。

- 上报接口
  接口名：/api/warn
  接口方法：POST
  Body：格式为数组，数组内的每个元素包含以下字段。
  ![Alt text](/picture/batteryWarn/image4.png)                  |

Body 示例：

```json
[
  {
    "carId": 1,
    "warnId": 1,
    "signal": "{\"Mx\":12.0,\"Mi\":0.6}"
  },
  {
    "carId": 2,
    "warnId": 2,
    "signal": "{\"Ix\":12.0,\"Ii\":11.7}"
  }，
   {
    "carId": 3,
    "signal": "{\"Mx\":11.0,\"Mi\":9.6,\"Ix\":12.0,\"Ii\":11.7}"
  }
]
```

接口返回信息：

![Alt text](/picture/batteryWarn/image5.png)

```json
{
    "status": 200,
    "msg": "ok",
    "data": 
        [
            {
                "车架编号": 1,
                "电池类型": "三元电池",
                "warnName": "电压差报警",
                "warnLevel": 0
            },
            {
                "车架编号": 2,
                "电池类型": "铁锂电池",
                "warnName": "电流差报警",
                "warnLevel": 2
            },
            {
                "车架编号": 3,
                "电池类型": "三元电池",
                "warnName": "电压差报警",
                "warnLevel": 2
            },
            {
                "车架编号": 3,
                "电池类型": "三元电池",
                "warnName": "电流差报警",
                "warnLevel": 2
            }
         ]
}
```



## 一、MiCar-0.0.1-SNAPSHOT.jar 使用文档

1. 在终端运行 `mi_car.sql`，构建数据库，文件位置：`src/main/resources/db/mi_car.sql`
```sql
mysql -u'用户名' -p'密码' < mi_car.sql
```

2. 运行 jar 包，启动项目
```java
java -jar MiCar-0.0.1-SNAPSHOT.jar
```

3. 浏览器输入网址 `http://localhost:8081/index`进入前端界面

![](/picture/batteryWarn/KOHzbF1Lwoqz1yx5wAicgtg5nbg.png)


## 二、开发流程

## 数据库设计

### 创建车辆信息表并插入数据

```sql
CREATE TABLE `car_info` (
  `vid` varchar(16) NOT NULL COMMENT '车辆识别码',
  `carframe_id` int DEFAULT NULL COMMENT '车架编号',
  `battery_type` varchar(255) DEFAULT NULL COMMENT '电池类型：三元电池，铁锂电池',
  `mileage` int DEFAULT NULL COMMENT '总里程（km）',
  `battery_health_status` int DEFAULT NULL COMMENT '电池健康状态(%)',
  PRIMARY KEY (`vid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='车辆信息表';
```

```sql
INSERT INTO `car_info`(`vid`, `carframe_id`, `battery_type`, `mileage`, `battery_health_status`) 
VALUES 
('A293HD2SFA3D9G20', 1, '三元电池', 100, 100),
('G3H2JSF823KLFD45', 3, '三元电池', 300, 98),
('S102YYYY384762BA', 2, '铁锂电池', 600, 95);
```

### 创建系统预警规则表并插入数据

```sql
CREATE TABLE `rule_info` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '序号',
  `rule_id` int DEFAULT NULL COMMENT '规则编号',
  `rule_name` varchar(255) DEFAULT NULL COMMENT '规则名称',
  `battery_type` varchar(255) DEFAULT NULL COMMENT '电池类型',
  `voltage_diff` double DEFAULT NULL COMMENT '最高电压与最小电压之差',
  `current_diff` double DEFAULT NULL COMMENT '最高电流与最小电流之差',
  `alert_level` int DEFAULT NULL COMMENT '报警等级：0-4，0等级最高，5表示不报警', 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统预警规则表';
```

```sql
INSERT INTO `rule_info`(`rule_id`, `rule_name`, `battery_type`, `voltage_diff`, `current_diff`, `alert_level`) 
VALUES 
(1, '电压差报警', '三元电池', 5, NULL, 0),
(1, '电压差报警', '三元电池', 3, NULL, 1),
(1, '电压差报警', '三元电池', 1, NULL, 2),
(1, '电压差报警', '三元电池', 0.6, NULL, 3),
(1, '电压差报警', '三元电池', 0.2, NULL, 4),
(1, '电压差报警', '三元电池', -1, NULL, 5),
(1, '电压差报警', '铁锂电池', 2, NULL, 0),
(1, '电压差报警', '铁锂电池', 1, NULL, 1),
(1, '电压差报警', '铁锂电池', 0.7, NULL, 2),
(1, '电压差报警', '铁锂电池', 0.4, NULL, 3),
(1, '电压差报警', '铁锂电池', 0.2, NULL, 4),
(1, '电压差报警', '铁锂电池', -1, NULL, 5),
(2, '电流差报警', '三元电池', NULL, 3, 0),
(2, '电流差报警', '三元电池', NULL, 1, 1),
(2, '电流差报警', '三元电池', NULL, 0.2, 2),
(2, '电流差报警', '三元电池', NULL, -1, 5),
(2, '电流差报警', '铁锂电池', NULL, 1, 0),
(2, '电流差报警', '铁锂电池', NULL, 0.5, 1),
(2, '电流差报警', '铁锂电池', NULL, 0.2, 2),
(2, '电流差报警', '铁锂电池', NULL, -1, 5);
```

## 项目搭建

### 项目结构

![](/picture/batteryWarn/Nwwzb8i29ogQamxk2GccUBC1nSh.png)

### 主要的实体类和 mapper 接口

1. entity 包下

```java
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("car_info")
public class Car implements Serializable {
    private batteryWarn final long _serialVersionUID _= 1L; // 定义一个常量，用于实现序列化
    // 主键：车辆识别码
    @TableId(value = "vid", type = IdType._NONE_)
    private String vid;

    // 车架编号
    private Long carFrameId;

    // 电池类型
    private String batteryType;

    // 总里程（km）
    private Long mileage;

    // 电池健康状态(%)
    private Integer batteryHealthStatus;
}
```

```java
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("car_info")
public class Rule implements Serializable {
    private batteryWarn final long _serialVersionUID _= 1L; // 定义一个常量，用于实现序列化
    // 主键：序号
    @TableId(value = "id", type = IdType._AUTO_)
    private Long id;

    // 规则编号
    private Long ruleId;

    // 规则名称
    private String ruleName;

    // 电池类型
    private String batteryType;

    // 最高电压与最小电压之差
    private Double voltageDiff;

    // 最高电流与最小电流之差
    private Double currentDiff;

    // 报警等级：0-4，0等级最高, 5等级不报警
    private Integer alertLevel;
}
```

2. dto 包下

```java
@Data
public class Body {
    // 车架编号
    private Long carFrameId;

    // 规则编号
    private Long ruleId;

    // 信号
    private Map<String, Double> signal;
}
```

```java
@Data
public class WarnResult {
    // 车架编号
    private Long carFrameId;

    // 电池类型
    private String batteryType;

    // 规则名称
    private String ruleName;

    // 报警等级：0-4，0等级最高，5等级不报警
    private String alertLevel;
}
```

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    private Boolean success;
    private String errorMsg;
    private Object data;
    private Long total;

    public batteryWarn Result ok(){
        return new Result(true, null, null, null);
    }
    public batteryWarn Result ok(Object data){
        return new Result(true, null, data, null);
    }
    public batteryWarn Result ok(List<?> data, Long total){
        return new Result(true, null, data, total);
    }
    public batteryWarn Result fail(String errorMsg){
        return new Result(false, errorMsg, null, null);
    }
}
```

3. mapper 包下

```java
public interface CarMapper extends BaseMapper<Car> {
    // 根据汽车编号查询电池类型
    @Select("SELECT battery_type FROM car_info WHERE carframe_id = #{carFrameId}")
    String selectBatteryType(@Param("carFrameId") Long carFrameId);
}
```

```java
public interface RuleMapper extends BaseMapper<Rule> {
    // 查询规则名称和报警等级
    // 有坑：mybatis-plus会把tinyint(1)自动转换为Boolean
    @Select("SELECT rule_name, _MIN_(alert_level) as alert_level FROM rule_info " +
            "WHERE rule_id = #{ruleId} " +
            "AND battery_type = #{batteryType} AND (voltage_diff <= #{voltageDiff} OR current_diff <= #{currentDiff})" +
            "GROUP BY rule_name")
    List<WarnInfo> selectRuleInfoById(@Param("ruleId") long ruleId, @Param("batteryType") String batteryType,
                                @Param("voltageDiff") double voltageDiff, @Param("currentDiff") double currentDiff);

    @Select("SELECT rule_name, _MIN_(alert_level) as alert_level FROM rule_info " +
            "WHERE battery_type = #{batteryType} " +
            "AND (voltage_diff <= #{voltageDiff} OR current_diff <= #{currentDiff})" +
            "GROUP BY rule_name")
    List<WarnInfo> selectRuleInfoNoId(@Param("batteryType") String batteryType,
                            @Param("voltageDiff") double voltageDiff, @Param("currentDiff") double currentDiff);
}
```

### 服务类

1. service 包下接口

```java
public interface IWarnService {
    Result queryWarn(Long carFrameId, Long ruleId, Map<String, Double> signal);
}
```

2. service.impl 包下的实现类。

对请求 Body 中的参数进行校验，考虑了多种情况。

```java
@Slf4j
@Service
public class WarnServiceImpl implements IWarnService {
    @Resource
    private CarMapper carMapper;
    @Resource
    private RuleMapper ruleMapper;

    @Override
    /*
     * 参数：车架编号，规则编号，信号
     */
    public Result queryWarn(Long carFrameId, Long ruleId, Map<String, Double> signal) {
        // 1.根据车架编号，查出电池类型
        if (carFrameId == null) {
            return Result._fail_("没有车架编号传入！");
        }
        String batteryType = carMapper.selectBatteryType(carFrameId);
        _log_.debug("该车的电池类型为：" + batteryType);

        // 2.处理传入的信号, 999表示未传入
        if (signal == null) {
            return Result._fail_("没有信号传入！");
        }
        double voltageDiff = signal.containsKey("Mx") && signal.containsKey("Mi") ? signal.get("Mx") - signal.get("Mi") : 999;
        double currentDiff = signal.containsKey("Ix") && signal.containsKey("Ii") ? signal.get("Ix") - signal.get("Ii") : 999;
        if(voltageDiff < 0 || currentDiff < 0){
            return Result._fail_("信号量有误！");
        }
        // 3.如果没有规则编号
        List<WarnInfo> warnInfoList; // 记录查询结果
        if (ruleId == null) {
            // 如果没传入电压信息，用规则2
            if (voltageDiff == 999){
                warnInfoList = ruleMapper.selectRuleInfoById(2, batteryType, voltageDiff, currentDiff);
            }
            // 如果没有传入电流信息，用规则1
            else if (currentDiff == 999){
                warnInfoList = ruleMapper.selectRuleInfoById(1, batteryType, voltageDiff, currentDiff);
            }
            // 电压信息和电流信息都传入了，两个规则都用
            else{
                // 查出多条数据
                warnInfoList = ruleMapper.selectRuleInfoNoId(batteryType, voltageDiff, currentDiff);
            }
            // warnInfoList.forEach(System.out::print);
        }

        // 4.如果指定了规则编号
        else {
            if (ruleId != 1 && ruleId != 2){
                return Result._fail_("规则编号有误！");
            }
            if ((ruleId == 1 && voltageDiff == 999) || (ruleId == 2 && currentDiff == 999)) {
                return Result._fail_("信号量缺失！");
            }
            // 去数据库查询得到ruleName和alertLevel (一条数据)
            warnInfoList = ruleMapper.selectRuleInfoById(ruleId, batteryType, voltageDiff, currentDiff);
            // System.out.println(warnInfo);
        }

        // 5.封装后返回
        List<WarnResult> results = new ArrayList<>();
        for (WarnInfo info : warnInfoList) {
            WarnResult warnResult = new WarnResult();
            warnResult.setCarFrameId(carFrameId);
            warnResult.setBatteryType(batteryType);
            warnResult.setRuleName(info.getRuleName());
            if (info.getAlertLevel() == 5) {
                warnResult.setAlertLevel("不报警");
            } else {
                warnResult.setAlertLevel(info.getAlertLevel().toString());
            }
            results.add(warnResult);
        }
        results.forEach(System._out_::println);
        return Result._ok_(results);
    }
}
```

3. controller 包下

```java
@RestController
@RequestMapping("/api")
public class WarnController {
    @Resource
    public IWarnService warnService;

    // 查询报警等级
    @PostMapping("/warn")
    public Result queryWarn(@RequestBody Body requestBody){
        return warnService.queryWarn(requestBody.getCarFrameId(), requestBody.getRuleId(), requestBody.getSignal());
    }
}
```

## Postman 进行接口测试

Body 字段：

1. 车架编号：carFrameId（必填）
2. 规则编号：ruleId（选填）
3. 信号量：signal（其中包含电压和电流信息）

### 传入规则编号和电压信息

![](/picture/batteryWarn/FGGgbjXnZo9B35xTNSkc9ErInZb.png)

### 传入规则编号和电流信息

![](/picture/batteryWarn/MnXZbZW4eoePrpxscDfcfYBGn7f.png)

### 没有指定规则编号

![](/picture/batteryWarn/S7eUbmcGpo2X77x1HLScPIEGnsd.png)

#### 没有指定规则编号，只传入了 Mx 和 Mi

![](/picture/batteryWarn/DYdDbbpRMoHZbRxk8QXcmYY0nLf.png)

#### 没有指定规则编号，只传入了 Ix 和 Ii

![](/picture/batteryWarn/NztCbOiNiokw6cxFMvYcbhGUnee.png)

### 规则编号有误

![](/picture/batteryWarn/GFdOblIZtoPPDRxR8u2c6Z90nrf.png)

### 没有传入车架编号

![](/picture/batteryWarn/SaBybZtGioIHIkxrLavcNwxxnfe.png)

### 车架编号有误

![](/picture/batteryWarn/Zp4hbeybLoL2JKxJrxxcBtAInag.png)

### 没有传入信号量

![](/picture/batteryWarn/LWM0bIZWQoe8lMxJJUmcXpNqnLg.png)

### 信号量缺失某一字段

![](/picture/batteryWarn/HpNnbPUw7oS2t5xHMfGch3FEnPf.png)

### 信号量数据不合法

![](/picture/batteryWarn/BdsKbXKhyoseE7xsnZgcA7xXnGh.png)

![](/picture/batteryWarn/Zp32buvmqovwSGx6lT7cqv0wnPg.png)

### 不报警的情况

![](/picture/batteryWarn/PqdTb5Pl5olme1xS4CDc0Ddqn8f.png)

## 加入前端

### 设计页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>电池预警</title>
    <style>
        body {
            text-align: center;
        }
        input {
            display: block;
            margin: auto;
        }
        form {
            width: 50%;
            margin: auto;
        }
        #result {
            border: 1px solid #000;
            padding: 20px;
            background-color: #f8f8f8;
            color: #333;
            font-family: Arial, sans-serif;
            font-size: 16px;
        }
    </style>
</head>
<body>
<h1>小米汽车电池预警系统</h1>
<p>请依次输入</p>

<!--导入js文件，js文件放置script中的内容，如要调用的函数-->
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="js/jquery.form.js"></script>
<script src="js/myjs.js"></script>

<form id="from1">
    车架编号（必填）:<br>
    <input type="text" id="carFrameId">
    <br>
    规则编号（选填）:<br>
    <input type="text" id="ruleId">
    <p>Mx，Mi 和 Ix，Ii 需成对输入</p>
    最高电压 Mx:<br>
    <input type="text" id="Mx">
    <br>
    最小电压 Mi:<br>
    <input type="text" id="Mi">
    <br>
    最高电流 Ix:<br>
    <input type="text" id="Ix">
    <br>
    最小电流 Ii:<br>
    <input type="text" id="Ii">
  <br/>
  <button type="button" name="sub" onclick="but_look()">提交</button>

</form>
<div id="result">
    <!-- 这里将显示结果 -->
</div>
</body>
</html>
```

### 前端交互逻辑

```json
function but_look(){
    var signal = {};
    if (from1.Mx.value) signal["Mx"] = parseFloat(from1.Mx.value);
    if (from1.Mi.value) signal["Mi"] = parseFloat(from1.Mi.value);
    if (from1.Ix.value) signal["Ix"] = parseFloat(from1.Ix.value);
    if (from1.Ii.value) signal["Ii"] = parseFloat(from1.Ii.value);

    var params={
        "carFrameId":from1.carFrameId.value,
        "ruleId":from1.ruleId.value,
        "signal": signal
    };
    var settings = {
        "url": "http://localhost:8081/api/warn",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json;charset=UTF-8"
        },
        "data": **JSON**.stringify(params),
    };

    $.ajax(settings).done(function (response) {
        if (response.success) {
            var data = response.data;
            var resultDiv = **document**.getElementById('result');
            resultDiv.innerHTML = ''; // 清空resultDiv

            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var itemDiv = **document**.createElement('div');
                itemDiv.innerHTML =
                    '车架编号: ' + item.carFrameId + '<br>' +
                    '电池类型: ' + item.batteryType + '<br>' +
                    '规则名称: ' + item.ruleName + '<br>' +
                    '警报等级: ' + item.alertLevel + '<br>';
                resultDiv.appendChild(itemDiv);
            }
        } else {
            alert("请求失败：" + response.errorMsg);
        }
    });
    return false; // 阻止表单自动提交事件 return false
}
```

### 前端控制器 WebController

```java
@Controller
public class WebController {
    @GetMapping("/index")
    public String index(){
        return "index";
    }
}
```

### 测试

访问接口：http://localhost:8081/index

#### 页面

![](/picture/batteryWarn/CCc5bGJ8FoX9jjxxKsjcYgspnfd.png)

#### 指定规则编号

![](/picture/batteryWarn/Mo3mbBMd4o0T0kxHbC6ctCB4nsb.png)

#### 不指定规则编号

![](/picture/batteryWarn/KVyGb67XNoAN1px0dZ3czDnunAb.png)

![](/picture/batteryWarn/N0gfbAyxios3CRxGzekcHfAknlg.png)

#### 一些错误的输入

![](/picture/batteryWarn/TInlbDtYPoJGw1xVDtWciaxNnof.png)

![](/picture/batteryWarn/J3mibvzv7oDlj7xxsQvcPysun3d.png)

![](/picture/batteryWarn/GB1UbUin8oeMCUxmkW1cWO14n0g.png)

![](/picture/batteryWarn/Oac6bZ5NGoPHv3xhUDwcFtvgnnh.png)

![](/picture/batteryWarn/TJ4yb6s7ooHNzDx8SdwcuCu4nSg.png)

## 加入 Redis 缓存，减小数据库压力

### maven 添加依赖

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

### 编辑配置文件

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

### 修改 Service，缓存空值，防止缓存穿透

```java
@Slf4j
@Service
public class WarnServiceImpl implements IWarnService {
    @Resource
    private CarMapper carMapper;
    @Resource
    private RuleMapper ruleMapper;
    
    @Resource
    private StringRedisTemplate stringRedisTemplate;
    
    @Override
    /*
     * 参数：车架编号，规则编号，信号
     */
    public Result queryWarn(Long carFrameId, Long ruleId, Map<String, Double> signal) {
        // 1.根据车架编号，查出电池类型
        String key = CACHE_Car_KEY + carFrameId;
        // 1.1.从redis查询车辆信息
        String batteryType = stringRedisTemplate.opsForValue().get(key);
        // 1.2.如果redis中不存在
        if (batteryType == null) {
            // 1.3.查询数据库
            batteryType = carMapper.selectBatteryType(carFrameId);
            // 1.4.数据库中也不存在
            if (batteryType == null){
                // 将空值写入redis，防止缓存穿透
                stringRedisTemplate.opsForValue().set(key, "", CACHE_NULL_TTL, TimeUnit._MINUTES_);
                // 返回错误信息
                return Result._fail_("车架编号有误！");
            }
            // 1.5.数据库中存在，写入redis
            stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(car), CACHE_Car_TTL, TimeUnit._MINUTES_);
        }
       
        // 2.处理传入的信号, 999表示未传入
        if (signal == null) {
            return Result._fail_("没有信号传入！");
        }
        double voltageDiff = signal.containsKey("Mx") && signal.containsKey("Mi") ? signal.get("Mx") - signal.get("Mi") : 999;
        double currentDiff = signal.containsKey("Ix") && signal.containsKey("Ii") ? signal.get("Ix") - signal.get("Ii") : 999;
        if(voltageDiff < 0 || currentDiff < 0){
            return Result._fail_("信号量有误！");
        }
        // 3.如果没有规则编号
        List<WarnInfo> warnInfoList; // 记录查询结果
        if (ruleId == null) {
            // 如果没传入电压信息，用规则2
            if (voltageDiff == 999){
                warnInfoList = ruleMapper.selectRuleInfoById(2, batteryType, voltageDiff, currentDiff);
            }
            // 如果没有传入电流信息，用规则1
            else if (currentDiff == 999){
                warnInfoList = ruleMapper.selectRuleInfoById(1, batteryType, voltageDiff, currentDiff);
            }
            // 电压信息和电流信息都传入了，两个规则都用
            else{
                // 查出多条数据
                warnInfoList = ruleMapper.selectRuleInfoNoId(batteryType, voltageDiff, currentDiff);
            }
            // warnInfoList.forEach(System.out::print);
        }

        // 4.如果指定了规则编号
        else {
            if (ruleId != 1 && ruleId != 2){
                return Result._fail_("规则编号有误！");
            }
            if ((ruleId == 1 && voltageDiff == 999) || (ruleId == 2 && currentDiff == 999)) {
                return Result._fail_("信号量缺失！");
            }
            // 去数据库查询得到ruleName和alertLevel (一条数据)
            warnInfoList = ruleMapper.selectRuleInfoById(ruleId, batteryType, voltageDiff, currentDiff);
            // System.out.println(warnInfo);
        }

        // 5.封装后返回
        List<WarnResult> results = new ArrayList<>();
        for (WarnInfo info : warnInfoList) {
            WarnResult warnResult = new WarnResult();
            warnResult.setCarFrameId(carFrameId);
            warnResult.setBatteryType(batteryType);
            warnResult.setRuleName(info.getRuleName());
            if (info.getAlertLevel() == 5) {
                warnResult.setAlertLevel("不报警");
            } else {
                warnResult.setAlertLevel(info.getAlertLevel().toString());
            }
            results.add(warnResult);
        }
        results.forEach(System._out_::println);
        return Result._ok_(results);
    }
}
```