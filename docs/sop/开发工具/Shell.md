---
description: Shell的语法
title: Shell
# readingTime: false
tag:
 - 开发工具
top: 9     # 排序
sticky: 80  # 精选文章热度
recommend: 4 # 推荐文章排序
# sidebar: false # 侧边栏
# author: 暮冬浅夏
---
# Shell 笔记

## 变量

### 定义变量

在 Shell 编程中，变量是用于存储数据值的名称。

定义变量时，变量名不加美元符号（$，PHP 语言中变量需要），如：

```bash
your_name="runoob"
```

注意，变量名和等号之间不能有空格，这可能和你熟悉的所有编程语言都不一样。同时，变量名的命名须遵循如下规则：

- **只包含字母、数字和下划线：** 变量名可以包含字母（大小写敏感）、数字和下划线 **_**，不能包含其他特殊字符。
- **不能以数字开头：** 变量名不能以数字开头，但可以包含数字。
- **避免使用 Shell 关键字：** 不要使用 Shell 的关键字（例如 if、then、else、fi、for、while 等）作为变量名，以免引起混淆。
- **使用大写字母表示常量：** 习惯上，常量的变量名通常使用大写字母，例如 **PI=3.14**。
- **避免使用特殊符号：** 尽量避免在变量名中使用特殊符号，因为它们可能与 Shell 的语法产生冲突。
- **避免使用空格：** 变量名中不应该包含空格，因为空格通常用于分隔命令和参数。

### 使用变量

使用一个定义过的变量，只要在变量名前面加美元符号即可，如：

```bash
your_name="qinjx"
**echo** $your_name
**echo** ${your_name}
```

推荐给所有变量加上花括号，这是个好的编程习惯。

### 变量类型

**字符串变量**： 在 Shell 中，变量通常被视为字符串。

你可以使用单引号 ' 或双引号 " 来定义字符串

单引号字符串的限制：

- 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
- 单引号字符串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。

双引号的优点：

- 双引号里可以有变量
- 双引号里可以出现转义字符

**整数变量**： 在一些 Shell 中，你可以使用 **declare** 或 **typeset** 命令来声明整数变量。

这样的变量只包含整数值，例如：

```bash
declare -i my_integer=42
```

### 获取字符串长度

```bash
string="abcd"
echo ${#string}   # 输出 4
```

### 提取子字符串

以下实例从字符串第 2 个字符开始截取 4 个字符：

```bash
string="runoob is a great site"
echo ${string:1:4} # 输出 unoo
```

注意：第一个字符的索引值为 0。

### 查找子字符串

查找字符 i 或 o 的位置(哪个字母先出现就计算哪个)：

```bash
string="runoob is a great site"
echo `expr index "$string" io`  # 输出 4
```

注意： 以上脚本中 ` 是反引号，而不是单引号 '，不要看错了哦。

### **定义数组**

在 Shell 中，用括号来表示数组，数组元素用"空格"符号分割开。定义数组的一般形式为：
```bash
数组名=(值 1 值 2 ... 值 n)
```
```bash
array_name=(value0 value1 value2 value3)
```

### 读取数组

读取数组元素值的一般格式是：
```bash
${数组名[下标]}
```
```bash
valuen=${array_name[n]}
```

使用 @ 符号可以获取数组中的所有元素，例如：

```bash
echo ${array_name[@]}
```

### 获取数组的长度

获取数组长度的方法与获取字符串长度的方法相同，例如：

```bash
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
length=${#array_name[n]}
```

## 传递参数

我们可以在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为 $n，n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数。

例如可以使用 $1、$2 等来引用传递给脚本的参数，其中 $1 表示第一个参数，$2 表示第二个参数，依此类推。

向脚本传递三个参数，并分别输出，其中 $0 为执行的文件名（包含文件路径）：

```bash
#!/bin/bash
echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```

为脚本设置可执行权限，并执行脚本，输出结果如下所示：

```bash
$ chmod +x test.sh 
$ ./test.sh 1 2 3
Shell 传递参数实例！
执行的文件名：./test.sh
第一个参数为：1
第二个参数为：2
第三个参数为：3
```

### 基本运算符

原生 bash 不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。

expr 是一款表达式计算工具，使用它能完成表达式的求值操作。

例如，两个数相加(注意使用的是反引号 ` 而不是单引号 ')：

```bash
#!/bin/bash

val=`expr 2 + 2`
echo "两数之和为 : $val"
```

两点注意：

- 表达式和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。
- 完整的表达式要被 **\` `** 包含，注意这个字符不是常用的单引号，在 Esc 键下边。

### **算术运算符**

**注意：**

1. 条件表达式要放在方括号之间，并且要有空格，例如: **[$a==$b]** 是错误的，必须写成 **[ $a == $b ]**。
2. 乘号 * 前边必须加反斜杠(\)才能实现乘法运算；
3. 代码中的 [] 执行基本的算数运算，如：

```bash
#!/bin/bash
a=5
b=6
result=$[a+b] # 注意等号两边不能有空格
echo "result 为： $result"
结果为:
result 为： 11
```

### **关系运算符**

关系运算符只支持数字，不支持字符串，除非字符串的值是数字。

下表列出了常用的关系运算符，假定变量 a 为 10，变量 b 为 20：

### **布尔运算符**

下表列出了常用的布尔运算符，假定变量 a 为 10，变量 b 为 20：

### **逻辑运算符**

以下介绍 Shell 的逻辑运算符，假定变量 a 为 10，变量 b 为 20:

### **字符串运算符**

下表列出了常用的字符串运算符，假定变量 a 为 "abc"，变量 b 为 "efg"：

## 常用命令

### echo

用于字符串的输出。命令格式：

```bash
echo string
```

### test

test 命令用于检查某个条件是否成立，它可以进行数值、字符和文件三个方面的测试。

```bash
num1=100
num2=100
if test $[num1] -eq $[num2]
then
    echo '两个数相等！'
else
    echo '两个数不相等！'
fi
```

### let

```bash
#!/bin/bash

let a=5+4
let b=9-3 
echo $a $b
```

## 流程控制

### if - else

```bash
if condition
then
    command1 
    command2
    ...
    commandN 
fi
```

```bash
if condition
then
    command1 
    command2
    ...
    commandN
else
    command
fi
```

```bash
if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi
```

if else 的 **[...]** 判断语句中大于使用 **-gt**，小于使用 **-lt**。

```bash
a=10
b=20
if [ $a == $b ]
then
   echo "a 等于 b"
elif [ $a -gt $b ]
then
   echo "a 大于 b"
elif [ $a -lt $b ]
then
   echo "a 小于 b"
else
   echo "没有符合的条件"
fi
```

如果使用 **((...))** 作为判断语句，大于和小于可以直接使用 > 和 **<**。

```bash
a=10
b=20
if (( $a == $b ))
then
   echo "a 等于 b"
elif (( $a > $b ))
then
   echo "a 大于 b"
elif (( $a < $b ))
then
   echo "a 小于 b"
else
   echo "没有符合的条件"
fi
```

if else 语句经常与 test 命令结合使用，如下所示：

```bash
num1=$[2*3]
num2=$[1+5]
if test $[num1] -eq $[num2]
then
    echo '两个数字相等!'
else
    echo '两个数字不相等!'
fi
```

### for 循环

```bash
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done
```

```bash
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done
```

### while 循环

```bash
while condition
do
    command
done
```

```bash
#!/bin/bash
int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done
```

## shell 函数

定义格式

```bash
[ function ] funname [()]

{

    action;

    [return int;]

}
```

说明：

- 可以带 **function fun()** 定义，也可以直接 **fun()** 定义,不带任何参数。
- 参数返回，可以显示加：**return** 返回，如果不加，将以最后一条命令运行结果，作为返回值。 **return** 后跟数值 **n(0-255)**.
- 在 Shell 中，调用函数时可以向其传递参数。在函数体内部，通过 $n 的形式来获取参数的值，例如，$1 表示第一个参数，$2 表示第二个参数...
- 注意，$10 不能获取第十个参数，获取第十个参数需要${10}。当n>=10时，需要使用${n}来获取参数。

```bash
#!/bin/bash
funWithReturn(){
    echo "这个函数会对输入的两个数字进行相加运算..."
    echo "输入第一个数字: "
    read aNum
    echo "输入第二个数字: "
    read anotherNum
    echo "两个数字分别为 $aNum 和 $anotherNum !"
    return $(($aNum+$anotherNum))
}
funWithReturn
echo "输入的两个数字之和为 $? !"
```

函数返回值在调用该函数后通过 **$? **来获得。

**注意：**所有函数在使用前必须定义。这意味着必须将函数放在脚本开始部分，直至 shell 解释器首次发现它时，才可以使用。调用函数仅使用其函数名即可。

**注意：** **return** 语句只能返回一个介于 0 到 255 之间的整数，而两个输入数字的和可能超过这个范围。

要解决这个问题，您可以修改 return 语句，直接使用 echo 输出和而不是使用 return
