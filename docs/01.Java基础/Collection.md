---
date: 2025-04-18 19:45:18
description: 常用的Java集合的必会知识
title: Java集合
permalink: /java/collection
categories:
  - Java基础
tags:
  - Java
coverImg: /ikun/ikun00000097.png
---


## 常用的集合类有哪些？

Map接口的实现类主要有：HashMap、TreeMap、Hashtable、ConcurrentHashMap以及Properties等

Set接口的实现类主要有：HashSet、TreeSet、LinkedHashSet等

List接口的实现类主要有：ArrayList、LinkedList、Stack以及Vector等

## ArrayList的初始容量是多少？

初始容量是0，在第一次添加元素的时候，才会设置容量为10。

## ArrayList的扩容机制

1. 创建新数组，容量是原来的1.5倍。

2. 把旧数组元素拷贝到新数组中

3. 使用新数组覆盖旧数组对象

## 并发修改ArrayList元素会有什么问题

会快速失败，抛出`ConcurrentModificationException`异常。

## 如何快速安全的删除ArrayList中的元素

使用`remove(int index)` 、 `removeIf()` 或者 `removeAll()` 方法。 我们知道ArrayList并不是线程安全的，原因是它的 `add()` 、`remove()` 方法、`扩容`操作都没有加锁，多个线程并发操作ArrayList的时候，会出现数据不一致的情况。 想要线程安全，其中一种方式是初始化ArrayList的时候使用 `Collections.synchronizedCollection()` 修饰。这样ArrayList所有操作都变成同步操作，性能较差。还有一种性能较好，又能保证线程安全的方式是使用 `CopyOnWriteArrayList`

## ArrayList和LinkedList的区别

1. 它们的底层实现不同：ArrayList 是基于动态数组的数据结构，而 LinkedList 是基于链表的数据结构。

2. 随机访问性能不同：ArrayList 优于 LinkedList，因为 ArrayList 可以根据下标以 O(1) 时间复杂度对元素进行随机访问。而 LinkedList 的访问时间复杂度为 O(n)，因为它需要遍历整个链表才能找到指定的元素。

3. 插入和删除性能不同：LinkedList 优于 ArrayList，因为 LinkedList 的插入和删除操作时间复杂度为 O(1)，而 ArrayList 的时间复杂度为 O(n)。

## ArrayList和Vector的区别

1. 线程安全性：Vector 是线程安全的，而 ArrayList 不是。所以在多线程环境下，应该使用 Vector。

2. 性能：由于 Vector 是线程安全的，所以它的性能通常比 ArrayList 差。在单线程环境下，ArrayList 比 Vector 快。

3. 初始容量增长方式：当容量不足时，ArrayList 默认会增加 50% 的容量，而 Vector 会将容量翻倍。这意味着在添加元素时，ArrayList 需要更频繁地进行扩容操作，而 Vector 则更适合于存储大量数据。



## List，Set，Map三者的区别？

![](/picture/collection/G78sbsEucowjqZxdUSrczstRnLg.png)

## 哪些集合类是线程安全的？

* Vector：就比Arraylist多了个 synchronized （线程安全），因为效率较低，现在已经不太建议使用。

* hashTable：就比hashMap多了个synchronized (线程安全)，不建议使用。

* ConcurrentHashMap：是Java5中支持高并发、高吞吐量的线程安全HashMap实现。（推荐使用）



## 遍历一个 List 有哪些不同的方式？每种方法的实现原理是什么？Java 中 List遍历的最佳实践是什么？

遍历方式有以下几种：

1. for 循环遍历，基于计数器。在集合外部维护一个计数器，然后依次读取每一个位置的元素，读取到最后一个元素后停止。

2. 迭代器遍历，Iterator。Iterator 是面向对象的一个设计模式，目的是屏蔽不同数据集合的特点，统一遍历集合的接口。Java 在 Collections 中支持了 Iterator 模式。

3. foreach 循环遍历。foreach 内部也是采用了 Iterator 的方式实现，使用时不需要显式声明Iterator 或计数器。优点是代码简洁，不易出错；缺点是只能做简单的遍历，不能在遍历过程中操作数据集合，例如删除、替换。

# HashMap（初始容量是 16）

## HashMap和HashSet区别？

1. HashSet 实现了 Set 接口，只存储对象；HashMap 实现了 Map 接口，用于存储键值对。

2. HashSet 底层是用 HashMap 存储的，HashSet 封装了一系列 HashMap 的方法，HashSet 将（自己的）值保存到 HashMap 的 Key 里面了。

3. HashSet 不允许集合中有重复的值（如果有重复的值，会插入失败），而 HashMap 键不能重复，值可以重复（如果键重复会覆盖原来的值）。

## HashMap的底层实现原理？

JDK 8 中 HashMap 的数据结构是`数组`+`链表`+`红黑树`。

![](/picture/collection/FltBbFEYWo51VLx7XqvcGdxcnoc.png)

JDK 8 HashMap 数据结构示意图

HashMap 的核心是一个动态数组（`Node[] table`），用于存储键值对。当向 HashMap 中添加一个键值对时，会使用哈希函数计算键的哈希码，确定其在数组中的位置，哈希函数的目标是尽量减少哈希冲突，保证元素能够均匀地分布在数组的每个位置上。

当多个键经哈希处理后得到相同的索引时，会发生哈希冲突。HashMap 通过链表来解决哈希冲突——即将具有相同索引的键值对通过链表连接起来。如果键已经存在，其对应的值将被新值覆盖。

不过，链表过长时，查询效率会比较低，于是当链表的长度超过 8 时 并且 数组的长度大于 64，链表就会转换为红黑树。红黑树的查询效率是 O(logn)，比链表的 O(n) 要快。数组的查询效率是 O(1)。

如果当前数组的长度小于 64，那么会选择先进行数组扩容，而不是转换为红黑树

当进行了删除操作，导致红黑树的节点小于等于 6 时，会发生退化，将红黑树转换为链表。

当从 HashMap 中获取元素时，也会使用哈希函数计算键的位置，然后根据位置在数组、链表或者红黑树中查找元素。

## 红黑树

红黑树是一种自平衡的二叉查找树：

1. 每个节点要么是红色，要么是黑色；

2. 根节点永远是黑色；

3. 所有的叶子节点都是是黑色的（下图中的 NULL 节点）；

4. 红色节点的子节点一定是黑色的；

5. 从任一节点到其每个叶子的所有简单路径都包含相同数目的黑色节点。

![](/picture/collection/image-2.png)



## 解决哈希冲突

在 Java 中，解决哈希冲突的常用方法有以下三种：链地址法、开放地址法和再哈希法。

1. **链地址法（Separate Chaining）**：将哈希表中的每个桶都设置为一个链表，当发生哈希冲突时，将新的元素插入到链表的末尾。这种方法的优点是简单易懂，适用于元素数量较多的情况。缺点是当链表过长时，查询效率会降低。HashMap 采用的正是拉链法。

2. **开放地址法（Open Addressing）**：当发生哈希冲突时，通过一定的探测方法（如线性探测、二次探测、双重哈希等）在哈希表中寻找下一个可用的位置。这种方法的优点是不需要额外的存储空间，适用于元素数量较少的情况。缺点是容易产生聚集现象，即某些桶中的元素过多，而其他桶中的元素很少。

3. **再哈希法（Rehashing）**：当发生哈希冲突时，使用另一个哈希函数计算出一个新的哈希值，然后将元素插入到对应的桶中。这种方法的优点是简单易懂，适用于元素数量较少的情况。缺点是需要额外的哈希函数，且当哈希函数不够随机时，容易产生聚集现象。

## 扩容在什么时候呢？

HashMap 的初始容量是 16，随着元素的不断添加，HashMap 的容量（也就是数组大小）可能不足，于是就需要进行扩容，HashMap 会在存储的键值对数量超过阈值（即容量 \* 加载因子）时进行扩容，默认的加载因子是 0.75，这意味着当 HashMap 填满了大约 75%的容量时，就会进行扩容，默认的初始容量是 16，那就是大于16x0.75=12时，就会触发第一次扩容操作。



## 扩容机制了解吗？

扩容时，HashMap 会创建一个新的数组，其容量是原数组容量的两倍。

然后将键值对放到新计算出的索引位置上。一部分索引不变，另一部分索引为“原索引+旧容量”。



当初始化时，传的不是 2 的倍数时，HashMap 会向上寻找`离得最近的2的倍数`，所以传入 17，但 HashMap 的实际容量是 32。



## 那你说说扩容的时候每个节点都要进行位运算吗

在 JDK 8 的新 hash 算法：`hash & (newCapacity - 1)`，数组扩容后的索引位置，要么就是原来的索引位置，要么就是“原索引+原来的容量”，遵循一定的规律。

扩容后只需检查哈希值高位的变化来决定元素的新位置，要么位置不变（高位为 0），要么就是移动到新位置（高位为 1，原索引位置+原容量）。



扩容后，数组的容量翻倍，二进制的最高位变为 1。而原有的索引通过 `hash & (oldCapacity - 1)` 来计算时，当扩容后，`newCapacity` 加入了一个新的最高位 ，这使得仅通过判断这新增的位是 0 还是 1，就能决定元素的重新分配情况。

具体来说，就是通过 位运算 `hash & oldCapacity` 来快速判断，如果结果为 0，元素保持在原位置；如果为 1，元素迁移到 `oldIndex + oldCapacity`

所以，尽管有几十万条数据，每个数据项的位置决定仅需要一次简单的位运算。位运算的计算速度非常快，因此，尽管扩容操作涉及遍历整个哈希表并对每个节点进行操作，但这部分操作的计算成本是相对较低的。



## 为什么HashMap的长度是2的整数次幂？

”**取余(%)操作中如果除数是 2 的幂次则等价于与其除数减一的与(&)操作**（也就是说 `hash%length==hash&(length-1)` 的前提是 length 是 2 的 n 次方）。” 并且，**采用二进制位操作 & 相对于 % 能够提高运算效率**。

为了加快哈希计算以及减少哈希冲突。

* 加快计算：

为了找到 KEY 的位置在哈希表的哪个槽里面，需要计算 hash(KEY) % 数组长度

但是 % 计算比 & 慢很多，所以用 & 代替 %。

为了保证 & 的计算结果等于 % 的结果需要把 length 减 1。也就是 hash(KEY) & (length - 1)

* 减少冲突

length 为偶数时，length-1 为奇数，奇数的二进制最后一位是 1，这样便保证了 hash &(length-1) 的最后一位可能为 0，也可能为 1（这取决于 hash 的值），即 & 运算后的结果可能为偶数，也可能为奇数，这样便可以保证元素在哈希表中均匀地散列。

而如果 length 为奇数的话，很明显 length-1 为偶数，它的最后一位是 0，这样 hash & (length-1) 的最后一位肯定为 0，即只能为偶数，这样任何 hash 值都只会被散列到数组的偶数下标位置上，这便浪费了近一半的空间



## HashMap是线程安全的吗？为什么？

HashMap 之所以不是线程安全的，主要有以下几个问题：

1. 多线程的 put 可能会导致元素的丢失。因为计算出来的位置可能会被其他线程的 put 覆盖。

![](/picture/collection/image-1.png)

* put 和 get 并发时，可能导致 get 为 null。线程 1 执行 put 时，因为元素个数超出阈值而导致出现扩容，线程 2 此时执行 get，就有可能出现这个问题，因为元素还没有转移。



## HashMap 和 Hashtable 的区别

![](/picture/collection/image.png)



## ConcurrentHashMap与Hashtable的异同？

ConcurrentHashMap和Hashtable 都是线程安全的，但是ConcurrentHashMap 提供了更高的并发性和性能。

1. HashTable 是直接在方法上加 synchronized 关键字。

2. ConcurrentHashMap使用了 CAS + synchronized，性能得到进一步提升。

3. Hashtable 在任何时刻只允许一个线程访问整个 Map，通过对整个 Map 加锁来实现线程安全。而ConcurrentHashMap（尤其是在 JDK 8 及之后版本）通过锁分离和 CAS 操作实现更细粒度的锁定策略，允许更高的并发。

4. ConcurrentHashMap 允许多个读操作并发进行而不加锁，因为它通过 volatile 变量来保证读取操作的内存可见性。相比之下，Hashtable 对读操作也加锁，增加了开销。

CAS 操作是一种乐观锁，它不会阻塞线程，而是在更新时检查是否有其他线程已经修改了数据，如果没有就更新，如果有就重试。



## ConcurrentHashMap的底层实现原理？

采用 `Node + CAS + synchronized` 来保证并发安全

它的数据结构和 HashMap 是一样的，数组+链表+红黑树。它实现线程安全的关键点在于 put 流程。

put 流程

1. 首先计算 hash，遍历 node 数组，如果 node 是空的话，就通过 CAS的方式初始化

2. 如果当前数组位置是空则直接通过 CAS 写入数据

3. 如果 hash==MOVED，说明需要扩容，执行扩容

4. 如果都不满足，就使用 synchronized 写入数据

get 查询

get 很简单，和 HashMap 基本相同，通过 key 计算位置，table 该位置 key 相同就返回，如果是红黑树按照红黑树获取，否则就遍历链表获取。

## &#x20;`ConcurrentHashMap`的key 和 value 不能为 null

HashMap 是允许 key 和 value 值都为 null 的。因为HashMap 的设计是给单线程使用的，而单线程下的二义性问题是能被证明真伪的，所以也就不存在二义性问题了（能被证明的问题就不是二义性问题）。

当我们给 HashMap 的 key 设置为 null 时，我们可以通过 hashMap.containsKey(key) 的方法来区分这个 null 值到底是存入的 null？还是压根不存在的 null？

多线程下：

`ConcurrentHashMap` 的 key 和 value 不能为 null 主要是为了避免二义性。null 是一个特殊的值，表示没有对象或没有引用。

如果你用 null 作为键，那么你就无法区分这个键是否存在于 `ConcurrentHashMap` 中，还是根本没有这个键。

同样，如果你用 null 作为值，那么你就无法区分这个值是否是真正存储在 `ConcurrentHashMap` 中的，还是因为找不到对应的键而返回的。

拿 get 方法取值来说，返回的结果为 null 存在两种情况：

* 值没有在集合中 ；

* 值本身就是 null。

这也就是二义性的由来。

在多线程下 null 的二义性问题是不能被证明真伪的（因为在一个线程执行验证时，可能会有另一个线程改动结果，造成结果不准确），所以 ConcurrentHashMap 为了避免这个二义性问题，所以就在源码中禁用了 null 值作为 key 或 value。
