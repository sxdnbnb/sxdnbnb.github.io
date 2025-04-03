---
date: 2024-06-05 20:51:37
description: 常用的Java集合的必会知识
title: Java集合
permalink: /java/collection
coverImg:
  - /img/ikun/k1.gif
categories:
  - Java基础
tags:
  - Java
---

# 集合

## 常用的集合类有哪些？

Map 接口的实现类主要有：HashMap、TreeMap、Hashtable、ConcurrentHashMap 以及 Properties 等

Set 接口的实现类主要有：HashSet、TreeSet、LinkedHashSet 等

List 接口的实现类主要有：ArrayList、LinkedList、Stack 以及 Vector 等

## List，Set，Map 三者的区别？

![](/collection/G78sbsEucowjqZxdUSrczstRnLg.png)

## 哪些集合类是线程安全的？

- Vector：就比 Arraylist 多了个 synchronized （线程安全），因为效率较低，现在已经不太建议使用。
- hashTable：就比 hashMap 多了个 synchronized (线程安全)，不建议使用。
- ConcurrentHashMap：是 Java5 中支持高并发、高吞吐量的线程安全 HashMap 实现。它由 Segment 数组结构和 HashEntry 数组结构组成。Segment 数组在 ConcurrentHashMap 里扮演锁的角色，HashEntry 则用于存储键-值对数据。一个 ConcurrentHashMap 里包含一个 Segment 数组， Segment 的结构和 HashMap 类似，是一种数组和链表结构；一个 Segment 里包含一个 HashEntry 数组，每个 HashEntry 是一个链表结构的元素；每个 Segment 守护着一个 HashEntry 数组里的元素，当对 HashEntry 数组的数据进行修改时，必须首先获得它对应的 Segment 锁。（推荐使用）

## 遍历一个 List 有哪些不同的方式？每种方法的实现原理是什么？Java 中 List 遍历的最佳实践是什么？

遍历方式有以下几种：

1. for 循环遍历，基于计数器。在集合外部维护一个计数器，然后依次读取每一个位置的元素，读取到最后一个元素后停止。
2. 迭代器遍历，Iterator。Iterator 是面向对象的一个设计模式，目的是屏蔽不同数据集合的特点，统一遍历集合的接口。Java 在 Collections 中支持了 Iterator 模式。
3. foreach 循环遍历。foreach 内部也是采用了 Iterator 的方式实现，使用时不需要显式声明 Iterator 或计数器。优点是代码简洁，不易出错；缺点是只能做简单的遍历，不能在遍历过程中操作数据集合，例如删除、替换。

## HashMap 和 HashSet 区别？

HashSet 其实是由 HashMap 实现的，只不过值是由一个固定的 Object 对象填充，而键用于操作。

HashSet 会自动去重，因为它是用 HashMap 实现的，HashMap 的键是唯一的（哈希值），相同键的值会覆盖掉原来的值

HashSet 主要用于去重，比如，我们需要统计一篇文章中有多少个不重复的单词，就可以使用 HashSet 来实现。

## HashMap 的底层实现原理？

JDK 8 中 HashMap 的数据结构是 `数组`+`链表`+`红黑树`。

![](/collection/BN2DbtqWooeZxBx6XrBcSaIcnFc.png)

JDK 8 HashMap 数据结构示意图

HashMap 的核心是一个动态数组（`Node[] table`），用于存储键值对。这个数组的每个元素称为一个“桶”（Bucket），每个桶的索引是通过对键的哈希值进行哈希函数处理得到的。

当多个键经哈希处理后得到相同的索引时，会发生哈希冲突。HashMap 通过链表来解决哈希冲突——即将具有相同索引的键值对通过链表连接起来。

不过，链表过长时，查询效率会比较低，于是当链表的长度超过 8 时（且数组的长度大于 64），链表就会转换为红黑树。红黑树的查询效率是 O(logn)，比链表的 O(n) 要快。数组的查询效率是 O(1)。

当向 HashMap 中添加一个键值对时，会使用哈希函数计算键的哈希码，确定其在数组中的位置，哈希函数的目标是尽量减少哈希冲突，保证元素能够均匀地分布在数组的每个位置上。

当向 HashMap 中添加元素时，如果该位置已有元素（发生哈希冲突），则新元素将被添加到链表的末尾或红黑树中。如果键已经存在，其对应的值将被新值覆盖。

当从 HashMap 中获取元素时，也会使用哈希函数计算键的位置，然后根据位置在数组、链表或者红黑树中查找元素。

总的来说，HashMap 是一种通过哈希表实现的键值对集合，它通过将键哈希化成数组索引，并在冲突时使用链表或红黑树来存储元素，从而实现快速的查找、插入和删除操作。

## 扩容在什么时候呢？

HashMap 的初始容量是 16，随着元素的不断添加，HashMap 的容量（也就是数组大小）可能不足，于是就需要进行扩容，HashMap 会在存储的键值对数量超过阈值（即容量 * 加载因子）时进行扩容，默认的加载因子是 0.75，这意味着当 HashMap 填满了大约 75% 的容量时，就会进行扩容，默认的初始容量是 16，那就是大于 16x0.75=12 时，就会触发第一次扩容操作。

## 扩容机制了解吗？

扩容时，HashMap 会创建一个新的数组，其容量是原数组容量的两倍。

然后将键值对放到新计算出的索引位置上。一部分索引不变，另一部分索引为“原索引 + 旧容量”。

## 如果初始化 HashMap，传一个 17 的值 `new HashMap<>`，它会怎么处理？

简单来说，就是初始化时，传的不是 2 的倍数时，HashMap 会向上寻找 `离得最近的2的倍数`，所以传入 17，但 HashMap 的实际容量是 32。

## 为什么 HashMap 的长度是 2 的整数次幂？

为了加快哈希计算以及减少哈希冲突。

- 加快计算：

为了找到 KEY 的位置在哈希表的哪个槽里面，需要计算 hash(KEY) % 数组长度

但是 % 计算比 & 慢很多，所以用 & 代替 %。

为了保证 & 的计算结果等于 % 的结果需要把 length 减 1。也就是 hash(KEY) & (length - 1)

- 减少冲突

length 为偶数时，length-1 为奇数，奇数的二进制最后一位是 1，这样便保证了 hash &(length-1) 的最后一位可能为 0，也可能为 1（这取决于 hash 的值），即 & 运算后的结果可能为偶数，也可能为奇数，这样便可以保证元素在哈希表中均匀地散列。

而如果 length 为奇数的话，很明显 length-1 为偶数，它的最后一位是 0，这样 hash & (length-1) 的最后一位肯定为 0，即只能为偶数，这样任何 hash 值都只会被散列到数组的偶数下标位置上，这便浪费了近一半的空间

## HashMap 是线程安全的吗？为什么？

HashMap 之所以不是线程安全的，主要有以下几个问题：

1. 多线程的 put 可能会导致元素的丢失。因为计算出来的位置可能会被其他线程的 put 覆盖。

![](/collection/JEgpbbxuiovscmxWqhFcwliCnXe.png)

1. put 和 get 并发时，可能导致 get 为 null。线程 1 执行 put 时，因为元素个数超出阈值而导致出现扩容，线程 2 此时执行 get，就有可能出现这个问题，因为元素还没有转移。

## HashMap 和 Hashtable 的区别

![](/collection/Vkgcb2B3joWeMQxVDuJc2sIVnNd.png)

## ConcurrentHashMap 与 Hashtable 的异同？

ConcurrentHashMap 和 Hashtable 都是线程安全的，但是 ConcurrentHashMap 提供了更高的并发性和性能。

1. HashTable 是直接在方法上加 synchronized 关键字。
2. ConcurrentHashMap 使用了 CAS + synchronized，性能得到进一步提升。
3. Hashtable 在任何时刻只允许一个线程访问整个 Map，通过对整个 Map 加锁来实现线程安全。而 ConcurrentHashMap（尤其是在 JDK 8 及之后版本）通过锁分离和 CAS 操作实现更细粒度的锁定策略，允许更高的并发。
4. ConcurrentHashMap 允许多个读操作并发进行而不加锁，因为它通过 volatile 变量来保证读取操作的内存可见性。相比之下，Hashtable 对读操作也加锁，增加了开销。

CAS 操作是一种乐观锁，它不会阻塞线程，而是在更新时检查是否有其他线程已经修改了数据，如果没有就更新，如果有就重试。

## ConcurrentHashMap 的底层实现原理？

采用 `Node + CAS + synchronized` 来保证并发安全

它的数据结构和 HashMap 是一样的，数组 + 链表 + 红黑树。它实现线程安全的关键点在于 put 流程。

put 流程

1. 首先计算 hash，遍历 node 数组，如果 node 是空的话，就通过 CAS 的方式初始化
2. 如果当前数组位置是空则直接通过 CAS 写入数据
3. 如果 hash==MOVED，说明需要扩容，执行扩容
4. 如果都不满足，就使用 synchronized 写入数据

get 查询

get 很简单，和 HashMap 基本相同，通过 key 计算位置，table 该位置 key 相同就返回，如果是红黑树按照红黑树获取，否则就遍历链表获取。

## key 和 value 不能为 null

`ConcurrentHashMap` 的 key 和 value 不能为 null 主要是为了避免二义性。null 是一个特殊的值，表示没有对象或没有引用。如果你用 null 作为键，那么你就无法区分这个键是否存在于 `ConcurrentHashMap` 中，还是根本没有这个键。同样，如果你用 null 作为值，那么你就无法区分这个值是否是真正存储在 `ConcurrentHashMap` 中的，还是因为找不到对应的键而返回的。

拿 get 方法取值来说，返回的结果为 null 存在两种情况：

- 值没有在集合中 ；
- 值本身就是 null。

这也就是二义性的由来
