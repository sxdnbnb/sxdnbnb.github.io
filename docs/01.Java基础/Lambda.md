---
date: 2024-06-25 20:51:37
description: Lambda表达式的使用技巧
title: 常用的Lambda表达式应用场景
tags:
  - Java
permalink: /java/lambda
coverImg:
  - https://www.yotu.net/i/67f4f788c391d.png
categories:
  - Java基础
---

## 常用的Lambda表达式应用场景

![Alt text](/lambda/image.png)

自Java 8引入Lambda表达式以来，Java编程变得更加简洁和高效，不仅减少了代码量，还提升了代码的可读性和可维护性。

1. 当在`一个接口中只有一个抽象方法`的时候，那么可以利用Lambda表达式来创建接口对象
`(参数列表) -> {方法体}`，
在定义参数的时候，`参数类型可以省略不写`。
2. 如果`方法体只有一句`，可以省略`{}`和`return`不写，那么`这一句代码的执行结果默认为返回值`。

### 1. 集合遍历 

传统方式：

```java 
import java.util.Arrays;
import java.util.List;

public class TraditionalForEach {
    public static void main(String[] args) {
        // 创建一个包含三个元素的列表
        List<String> list = Arrays.asList("a", "b", "c");
        // 使用传统的for-each循环遍历列表并打印每个元素
        for (String item : list) {
            System.out.println("传统方式遍历元素: " + item);
        }
    }
}
```

Lambda表达式：
```java 
import java.util.Arrays;
import java.util.List;

public class LambdaForEach {
    public static void main(String[] args) {
        // 创建一个包含三个元素的列表
        List<String> list = Arrays.asList("a", "b", "c");
        // 使用Lambda表达式遍历列表并打印每个元素
        list.forEach(item -> System.out.println("Lambda方式遍历元素: " + item));
    }
}
```

输出结果：

```java
传统方式遍历元素: a
传统方式遍历元素: b
传统方式遍历元素: c
Lambda方式遍历元素: a
Lambda方式遍历元素: b
Lambda方式遍历元素: c
```

### 2. 集合排序 

传统方式：

```java
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class TraditionalSort {
    public static void main(String[] args) {
        // 创建一个未排序的列表
        List<String> list = Arrays.asList("b", "a", "c");
        // 使用传统方式进行排序
        Collections.sort(list, new Comparator<String>() {
            @Override
            public int compare(String s1, String s2) {
                return s1.compareTo(s2);
            }
        });
        // 打印排序后的列表
        System.out.println("传统方式排序结果: " + list);
    }
}
```

Lambda表达式：

```java
import java.util.Arrays;
import java.util.List;

public class LambdaSort {
    public static void main(String[] args) {
        // 创建一个未排序的列表
        List<String> list = Arrays.asList("b", "a", "c");
        // 使用Lambda表达式进行排序
        list.sort((s1, s2) -> s1.compareTo(s2));
        // 打印排序后的列表
        System.out.println("Lambda方式排序结果: " + list);
    }
}
```

输出结果：

```java
传统方式排序结果: [a, b, c]
Lambda方式排序结果: [a, b, c]
```

### 3. 集合过滤 

传统方式：

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TraditionalFilter {
    public static void main(String[] args) {
        // 创建一个列表
        List<String> list = Arrays.asList("a", "b", "c", "aa");
        // 创建一个新的列表来存储过滤后的结果
        List<String> filteredList = new ArrayList<>();
        // 使用传统方式进行过滤
        for (String item : list) {
            if (item.startsWith("a")) {
                filteredList.add(item);
            }
        }
        // 打印过滤后的列表
        System.out.println("传统方式过滤结果: " + filteredList);
    }
}
```

Lambda表达式：

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class LambdaFilter {
    public static void main(String[] args) {
        // 创建一个列表
        List<String> list = Arrays.asList("a", "b", "c", "aa");
        // 使用Lambda表达式进行过滤并收集结果
        List<String> filteredList = list.stream()
                                        .filter(item -> item.startsWith("a"))
                                        .collect(Collectors.toList());
        // 打印过滤后的列表
        System.out.println("Lambda方式过滤结果: " + filteredList);
    }
}
```

输出结果：

```java
传统方式过滤结果: [a, aa]
Lambda方式过滤结果: [a, aa]
```

### 4. 映射操作 

传统方式：

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TraditionalMap {
    public static void main(String[] args) {
        // 创建一个包含字符串数字的列表
        List<String> list = Arrays.asList("1", "2", "3");
        // 创建一个新的列表来存储映射后的结果
        List<Integer> mappedList = new ArrayList<>();
        // 使用传统方式进行映射
        for (String item : list) {
            mappedList.add(Integer.parseInt(item));
        }
        // 打印映射后的列表
        System.out.println("传统方式映射结果: " + mappedList);
    }
}
```

Lambda表达式：

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class LambdaMap {
    public static void main(String[] args) {
        // 创建一个包含字符串数字的列表
        List<String> list = Arrays.asList("1", "2", "3");
        // 使用Lambda表达式进行映射并收集结果
        List<Integer> mappedList = list.stream()
                                       .map(Integer::parseInt)
                                       .collect(Collectors.toList());
        // 打印映射后的列表
        System.out.println("Lambda方式映射结果: " + mappedList);
    }
}
```

输出结果：

```java
传统方式映射结果: [1, 2, 3]
Lambda方式映射结果: [1, 2, 3]
```

### 5. 计算操作 

传统方式：

```java
import java.util.Arrays;
import java.util.List;

public class TraditionalReduce {
    public static void main(String[] args) {
        // 创建一个包含数字的列表
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
        // 使用传统方式进行求和
        int sum = 0;
        for (Integer num : list) {
            sum += num;
        }
        // 打印求和结果
        System.out.println("传统方式求和结果: " + sum);
        
        // 计算平均值
        double average = sum / (double) list.size();
        // 打印平均值结果
        System.out.println("传统方式求平均值结果: " + average);
    }
}
```

Lambda表达式：

```java
import java.util.Arrays;
import java.util.List;
import java.util.OptionalDouble;

public class LambdaReduce {
    public static void main(String[] args) {
        // 创建一个包含数字的列表
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
        // 使用Lambda表达式进行求和
        int sum = list.stream()
                      .mapToInt(Integer::intValue)
                      .sum();
        // 打印求和结果
        System.out.println("Lambda方式求和结果: " + sum);
        
        // 使用Lambda表达式计算平均值
        OptionalDouble average = list.stream()
                                     .mapToInt(Integer::intValue)
                                     .average();
        // 打印平均值结果
        System.out.println("Lambda方式求平均值结果: " + average.getAsDouble());
    }
}
```

输出结果：

```java
传统方式求和结果: 15
传统方式求平均值结果: 3.0
Lambda方式求和结果: 15
Lambda方式求平均值结果: 3.0
```

### 6. 分组操作 

传统方式：

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TraditionalGrouping {
    public static void main(String[] args) {
        // 创建一个包含字符串的列表
        List<String> list = Arrays.asList("a", "bb", "ccc", "dd", "eee");
        // 创建一个Map来存储分组结果
        Map<Integer, List<String>> groupedByLength = new HashMap<>();
        // 使用传统方式进行分组
        for (String item : list) {
            int length = item.length();
            if (!groupedByLength.containsKey(length)) {
                groupedByLength.put(length, new ArrayList<>());
            }
            groupedByLength.get(length).add(item);
        }
        // 打印分组结果
        System.out.println("传统方式分组结果: " + groupedByLength);
    }
}
```

Lambda表达式：

```java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class LambdaGrouping {
    public static void main(String[] args) {
        // 创建一个包含字符串的列表
        List<String> list = Arrays.asList("a", "bb", "ccc", "dd", "eee");
        // 使用Lambda表达式进行分组并收集结果
        Map<Integer, List<String>> groupedByLength = list.stream()
                                                         .collect(Collectors.groupingBy(String::length));
        // 打印分组结果
        System.out.println("Lambda方式分组结果: " + groupedByLength);
    }
}
```

输出结果：

```java
传统方式分组结果: {1=[a], 2=[bb, dd], 3=[ccc, eee]}
Lambda方式分组结果: {1=[a], 2=[bb, dd], 3=[ccc, eee]}
```

### 7. 函数式接口 

传统方式：

```java
public class TraditionalFunctionalInterface {
    public static void main(String[] args) {
        // 使用传统方式创建线程
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                System.out.println("传统方式创建线程");
            }
        };
        new Thread(runnable).start();
    }
}
```

Lambda表达式：

```java
public class LambdaFunctionalInterface {
    public static void main(String[] args) {
        // 使用Lambda表达式创建线程
        Runnable runnable = () -> System.out.println("Lambda方式创建线程");
        new Thread(runnable).start();
    }
}
```

### 8. Optional 

传统方式：

```java
import java.util.Optional;

public class TraditionalOptional {
    public static void main(String[] args) {
        // 创建一个Optional对象
        Optional<String> optional = Optional.of("hello");
        // 使用传统方式检查并打印值
        if (optional.isPresent()) {
            System.out.println("传统方式Optional值: " + optional.get());
        }
    }
}
```

Lambda表达式：

```java
import java.util.Optional;

public class LambdaOptional {
    public static void main(String[] args) {
        // 创建一个Optional对象
        Optional<String> optional = Optional.of("hello");
        // 使用Lambda表达式检查并打印值
        optional.ifPresent(value -> System.out.println("Lambda方式Optional值: " + value));
    }
}
```

输出结果：

```java
传统方式Optional值: hello
Lambda方式Optional值: hello
```

### 9. Stream流水操作 

传统方式：

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class TraditionalStream {
    public static void main(String[] args) {
        // 创建一个包含字符串的列表
        List<String> list = Arrays.asList("a", "bb", "ccc", "dd", "eee");
        // 创建一个新的列表来存储过滤和映射后的结果
        List<String> result = new ArrayList<>();
        // 使用传统方式进行过滤和映射
        for (String s : list) {
            if (s.length() > 1) {
                result.add(s.toUpperCase());
            }
        }
        // 使用传统方式进行排序
        Collections.sort(result, new Comparator<String>() {
            @Override
            public int compare(String s1, String s2) {
                return s1.compareTo(s2);
            }
        });
        // 打印最终结果
        System.out.println("传统方式Stream操作结果: " + result);
    }
}
```

Lambda表达式：

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class LambdaStream {
    public static void main(String[] args) {
        // 创建一个包含字符串的列表
        List<String> list = Arrays.asList("a", "bb", "ccc", "dd", "eee");
        // 使用Lambda表达式进行过滤、映射、排序并收集结果
        List<String> result = list.stream()
                                  .filter(s -> s.length() > 1)
                                  .map(String::toUpperCase)
                                  .sorted()
                                  .collect(Collectors.toList());
        // 打印最终结果
        System.out.println("Lambda方式Stream操作结果: " + result);
    }
}
```

输出结果：

```java
传统方式Stream操作结果: [BB, CCC, DD, EEE]
Lambda方式Stream操作结果: [BB, CCC, DD, EEE]
```

### 10. 扩展易读性 

尽管Lambda表达式简洁高效，但有时也会降低代码的可读性。

为了提高可读性，可以适当地为复杂的Lambda表达式提供注释，或者将其提取为`具有描述性名称的方法`。

示例代码：

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class LambdaReadability {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("a", "bb", "ccc", "dd", "eee");
        List<String> result = list.stream()
                                  .filter(this::isLongerThanOne)
                                  .map(this::toUpperCase)
                                  .sorted()
                                  .collect(Collectors.toList());
        System.out.println("提升可读性的Lambda操作结果: " + result);
    }

    // 判断字符串长度是否大于1
    private boolean isLongerThanOne(String s) {
        return s.length() > 1;
    }

    // 将字符串转换为大写
    private String toUpperCase(String s) {
        return s.toUpperCase();
    }
}
```

输出结果：

```java
提升可读性的Lambda操作结果: [BB, CCC, DD, EEE]
```