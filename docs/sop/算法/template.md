---
description: 常用算法模板
title: 算法模板
# readingTime: false
tag:
 - 算法
top: 12     # 排序
sticky: 90  # 精选文章热度
# recommend: 1 # 推荐文章排序
# sidebar: false # 侧边栏
# author: 暮冬浅夏
---
# 算法模板
## 1.map计数
```java
for (int num : nums){
    map.put(num, map.getOrDefault(num, 0) + 1);
}
```
## 2.快速排序
```java
// 调用：quick_sort(a, 0, n - 1)
void quick_sort(int[] q, int l, int r){
    if (l >= r)
        return;
    // i从左往右扫描找比x大的，j从右往左扫描找比x小的
    int i = l - 1, j = r + 1, x = q[l + r >> 1];
    while (i < j){
        while (q[++i] < x);
        while (q[--j] > x);
        if (i < j){
            int temp = q[i];
            q[i] = q[j];
            q[j] = temp;
        }
    }
    // 从上到下分治
    quick_sort(q, l, j);
    quick_sort(q, j + 1, r);
}
```
## 3.归并排序
```java
    int[] temp = new int[n]; // 辅助数组
    // 将[l, r]排好序
    void merge_sort(int[] q, int l, int r){
        if (l >= r)
            return;
        int mid = l + r >> 1;
        // 从下到上
        // 分
        merge_sort(q, l, mid);
        merge_sort(q, mid + 1, r);
        // 治
        // k:辅助数组的索引, i:左数组索引, j:右数组索引
        int k = 0, i = l, j = mid + 1;
        while (i <= mid && j <= r){
            if (q[i] <= q[j])
                temp[k++] = q[i++];
            else
                temp[k++] = q[j++];
        }
        // 左数组不为空
        while (i <= mid)
            temp[k++] = q[i++];
        // 右数组不为空
        while (j <= r)
            temp[k++] = q[j++];
        // 复制到原数组
        for (i = l, k = 0; i <= r; i++, k++){
            q[i] = temp[k];
        }
    }
```
## 4.二分
```java
    // 是否满足条件
    boolean check(int x){/*....*/}
    // 找左边界(满足条件的最小的那个)
    int bsearch(int l, int r){
        while (l < r){
            int mid = l + r >> 1;
            if (check(mid))
                r = mid;
            else
                l = mid + 1;
        }
        return r;
    }
    // 找右边界(满足条件的最大的那个)
    int bsearch(int l, int r){
        while (l < r){
            int mid = l + r + 1 >> 1;
            if (check(mid))
                l = mid;
            else
                r = mid - 1;
        }
        return l;
    }
```
## 5.一维前缀和
```java
    //S(i+1) = S(i) + a(i)
    // a(l)+a(l+1)+...+a(r) = S(r+1)-S(l)
    for (int i = 0; i < n; i++){
        s[i + 1] = s[i] + a[i];
    }
```
## 6.一维差分
```java
    // 给区间[l, r]中的每个数加上c
    void insert(int l, int r, int c){
        B[l] += c;
        B[r + 1] -= c;
    }
    // 初始化差分数组
    for (int i = 0; i < n; i++) {
        insert(i, i, a[i]);
    }
    // 输出前缀和数组
    for (int i = 0; i < n; i++){
        B[i + 1] += B[i];
    }
```
## 7.双指针
```java
    // i从头到尾，j不回头
    for (int i = 0, j = 0; i < n; i++){
        while (j < i && check(i, j))
            j++;
    }
```

## 8.位运算
1. 求n的右数第k位二进制数
```java
n >> k & 1;
```
2. 返回n的最后一位1
```java
// 101100返回100
int lowbit(int x){
    return x & -x; // -x是x的反码加1
}
```
3. 清除最右边的1
```java
// 101100变为101000
n % (n - 1);
```
4. 统计一个数的二进制有多少个1
```java
Integer.bitCount(int x);
```
## 9.最大公约数
```java
int gcd(int a, int b){
    return b != 0 ? gcd(b, a % b) : a;
}
```

## 10.区间合并
```java
public int[][] merge(int[][] intervals) {
    // L指向区间开头，R指向区间尾
    // 有覆盖的就更新ed
    // 没有覆盖的就放入ans, 并更新st和ed
    List<int[]> ans = new ArrayList<>();
    // 先按区间头排序
    Arrays.sort(intervals, Comparator.comparingInt(arr -> arr[0]));
    for (int[] interval : intervals){
        int L = interval[0], R = interval[1];
        if (ans.size() == 0 || ans.getLast()[1] < L){
            // 发现新区间
            ans.add(new int[]{L, R});
        }else{
            // 发现重叠区间
            ans.getLast()[1] = Math.max(ans.getLast()[1], R);
        }
    }
    return ans.toArray(new int[ans.size()][2]);
}
```
## 11.单调栈
应用：为数组中每个数找出它左边距离最近的比它小（大）的数

思想：当a(x)<=a(y)，且y>x时，删掉a(x) 

操作：把大于a(i)的数全部出栈后，a(i)再入栈
```java
for (int i = 0; i < n; i++){
    // 栈不空并且栈顶元素大于输入元素
    while (!stack.isEmpty() && stack.peek() > nums[i])
        stack.pop();
    stack.push(nums[i]);
}
```

## 12.单调队列（双端队列）
应用：找出滑动窗口中的最值（滑动窗口头部坐标：i-k+1, k是窗口长度）

操作：队列中存窗口元素的下标，如果a(i)比队尾下标对应的元素小，则队尾下标出队，再入a(i)下标
```java
Deque<Integer> q = new LinkedList<>();
for (int i = 0; i < n; i++){
    // 队不空并且队头已经滑出了窗口
    while (!q.isEmpty() && i - k + 1 > q.getFirst())
        q.removeFirst();
    // 把队尾下标出队
    while (!q.isEmpty() && check(q.getLast(), i))
        q.removeLast();
    // 坐标入队
    q.addLast(i);
    // 对头元素就是最值
    if (i - k + 1 >= 0)
        print(q.getFirst());
}
```
## 13.长度为`k`的滑动窗口维护窗口中的元素之和
```java
for (int i = 0; i < n; i++){ // 遍历窗口尾部
    int head = i - k + 1; // 窗口头部
    // 窗口头部没滑到数组头部
    if (head < 0)｛
        sum += nums[i];
        continue;
    ｝
    // 划入
    sum += nums[i];
    // 操作
    ...
    // 划出
    sum -= nums[head];
}
```

更一般的，
```java
// 窗口从数组的start开始, 每次滑动m
for (int i = start; i < n; i += m){ // 遍历窗口尾部
    int head = i - k + 1; // 窗口头部
    // 窗口头部没滑到数组头部
    if (head < start)｛
        ...
        continue;
    ｝
    // 划入
    ...
    // 操作
    ...
    // 划出
    ...
}
```
## 14.不定长的滑动窗口
遍历右端点，左端点找满足条件的
```java
for (int r = 0; r < n; r++){
    sum += nums[r];
    while (sum > target){
        sum -= nums[l];
        l++;
    }
}
```
## 15.二叉树
- 不要思考整体，聚焦局部，考虑单独抽出一个二叉树节点需要做什么
- 明确递归函数定义，并利用定义
1. 遍历
不用返回值，利用全局变量更新结果

```java
void traverse(TreeNode root) {
    if (root == null) {
        return;
    }
    // 前序位置
    traverse(root.left);
    // 中序位置
    traverse(root.right);
    // 后序位置
}
```
2. 分解问题
通过子树推导，利用函数定义和返回（只有后序位置才能通过返回值获取子树的信息）

一旦发现题目和子树有关，那大概率要给函数设置合理的定义和返回值，在后序位置写代码了。

```java
// 定义：输入一棵二叉树，返回这棵二叉树的节点总数
int count(TreeNode root) {
    if (root == null) {
        return 0;
    }
    int leftCount = count(root.left);
    int rightCount = count(root.right);
    // 后序位置
    printf("节点 %s 的左子树有 %d 个节点，右子树有 %d 个节点",
            root, leftCount, rightCount);

    return leftCount + rightCount + 1;
}
```
## 16.DP动态规划（输入分解问题，关注子树）
- 假设dp[0,...,i-1]被计算出来了，考虑怎么求dp[i]

- 遍历过程中，所需的状态必须是已经被计算出来

- 两个字符串的DP，一般用两个指针指向最后，再往前移动，缩小问题规模

需要明确：
```java
    // 定义dp[i]：
    // base case:
    // 状态：
    // 选择：
    // 转移方程：
```
```python
# 自顶向下递归的动态规划
# 可以利用备忘录
# dp体现在函数参数
def dp(状态1, 状态2, ...):
    for 选择 in 所有可能的选择:
        # 此时的状态已经因为做了选择而改变
        result = 求最值(result, dp(状态1, 状态2, ...))
    return result
```
```python
# 自底向上迭代的动态规划
# dp体现在数组索引
# 初始化 base case
dp[0][0][...] = base case # DP table
# 进行状态转移
for 状态1 in 状态1的所有取值：
    for 状态2 in 状态2的所有取值：
        for 选择 in 所有可能的选择:
            dp[状态1][状态2][...] = 求最值(选择1，选择2...)
```

## 17.回溯（属于遍历问题，关注树枝）
时间复杂度: O(n!)

抽象地说，解决一个回溯问题，实际上就是遍历一棵决策树的过程，树的每个叶子节点存放着一个合法答案。你把整棵树遍历一遍，把叶子节点上的答案都收集起来，就能得到所有的合法答案。

站在回溯树的一个节点上，只需要思考 3 个问题：

1、路径：也就是已经做出的选择。

2、选择列表：也就是你当前可以做的选择。

3、结束条件：也就是到达决策树底层，无法再做选择的条件。
```java
// 只找一个答案：boolean find; if (find) return;
// 找方案数：int res = 0; if (找到)｛res++; return;｝
void backtrack(路径, 选择列表)
    if 满足结束条件｛
        result.add(路径)
        return
    ｝
    for 选择 in 选择列表{
        做选择
        backtrack(路径, 选择列表)
        撤销选择
    }  
```

### 18.排列/组合/子集问题
![alt text](template\image.png)
![alt text](template\image-1.png)
1. 元素无重不可复选，即 nums 中的元素都是唯一的，每个元素最多只能被使用一次，backtrack 核心代码如下：
```java
// 组合/子集问题回溯算法框架
void backtrack(int[] nums, int start) {
    // 回溯算法标准框架
    for (int i = start; i < nums.length; i++) {
        // 做选择
        track.addLast(nums[i]);
        // 注意参数
        backtrack(nums, i + 1);
        // 撤销选择
        track.removeLast();
    }
}

// 排列问题回溯算法框架
void backtrack(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
        // 剪枝逻辑
        if (used[i]) {
            continue;
        }
        // 做选择
        used[i] = true;
        track.addLast(nums[i]);

        backtrack(nums);
        // 撤销选择
        track.removeLast();
        used[i] = false;
    }
}
```
2. 元素可重不可复选，即 nums 中的元素可以存在重复，每个元素最多只能被使用一次，其关键在于排序和剪枝，backtrack 核心代码如下：
```java
Arrays.sort(nums);
// 组合/子集问题回溯算法框架
void backtrack(int[] nums, int start) {
    // 回溯算法标准框架
    for (int i = start; i < nums.length; i++) {
        // 剪枝逻辑，跳过值相同的相邻树枝
        if (i > start && nums[i] == nums[i - 1]) {
            continue;
        }
        // 做选择
        track.addLast(nums[i]);
        // 注意参数
        backtrack(nums, i + 1);
        // 撤销选择
        track.removeLast();
    }
}


Arrays.sort(nums);
// 排列问题回溯算法框架
void backtrack(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
        // 剪枝逻辑
        if (used[i]) {
            continue;
        }
        // 剪枝逻辑，固定相同的元素在排列中的相对位置
        if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
            continue;
        }
        // 做选择
        used[i] = true;
        track.addLast(nums[i]);

        backtrack(nums);
        // 撤销选择
        track.removeLast();
        used[i] = false;
    }
}
```
3. 元素无重可复选，即 nums 中的元素都是唯一的，每个元素可以被使用若干次，只要删掉去重逻辑即可，backtrack 核心代码如下：
```java
// 组合/子集问题回溯算法框架
void backtrack(int[] nums, int start) {
    // 回溯算法标准框架
    for (int i = start; i < nums.length; i++) {
        // 做选择
        track.addLast(nums[i]);
        // 注意参数
        backtrack(nums, i);
        // 撤销选择
        track.removeLast();
    }
}


// 排列问题回溯算法框架
void backtrack(int[] nums) {
    for (int i = 0; i < nums.length; i++) {
        // 做选择
        track.addLast(nums[i]);
        backtrack(nums);
        // 撤销选择
        track.removeLast();
    }
}
```
## 19.DFS（属于遍历问题，关注单个节点）
```java
void backtrack(...) {
    if (到达叶子节点) {
        return;
    }

    做选择
    ...
    for (int i = 0, i < n; i++) {
        backtrack(...)
    }
    撤销选择
    ...
}
```
### 20.DFS和回溯
```java
// 回溯
void backtrack(Node root) {
    if (root == null) {
        return;
    }

    for (Node child : root.children) {
        做选择
        printf("我在 %s 和 %s 中间的树枝上做选择", root, child);

        backtrack(child);

        撤销选择
        printf("我在 %s 和 %s 中间的树枝上撤销选择", root, child);
    }
}
```
```java
// DFS
void dfs(Node root) {
    if (root == null) {
        return;
    }

    做选择

    printf("我在 %s 节点上做选择", root);

    for (Node child : root.children) {
        dfs(child);
    }

    撤销选择
    printf("我在 %s 节点上撤销选择", root);
}
```
## 21.BFS
应用场景：问题的本质是在一幅「图」中找到从起点 start 到终点 target 的最近距离
```java
// 计算从起点 start 到终点 target 的最近距离
int BFS(Node start, Node target) {
    Queue<Node> q; // 核心数据结构
    Set<Node> visited; // 避免走回头路
    
    q.offer(start); // 将起点加入队列
    visited.add(start);

    while (q not empty) {
        int sz = q.size();
        /* 将当前队列中的所有节点向四周扩散 */
        for (int i = 0; i < sz; i++) {
            Node cur = q.poll();
            /* 划重点：这里判断是否到达终点 */
            if (cur is target)
                return step;
            /* 将 cur 的相邻节点加入队列 */
            for (Node x : cur.adj()) {
                if (x not in visited) {
                    q.offer(x);
                    visited.add(x);
                }
            }
        }
    }
    // 如果走到这里，说明在图中没有找到目标节点
}
```
### 22.字典树
```java
    int N = 300010;
    int[][] son = new int[N][26]; // 儿子的位置 = son[父亲的位置][儿子的名字];
    int idx = 0; // 全局编号
    int[] cnt = new int[N]; // 记录字符串个数

    // 插入
    public void insert(String word) {
        int p = 0; // 节点指针
        for (int i = 0; i < word.length(); i++){
            int u = word.charAt(i) - 'a';
            if (son[p][u] == 0)
                son[p][u] = ++idx;
            p = son[p][u];
        }
        cnt[p]++; // 个数增加
    }
    // 查找是否存在
    public boolean search(String word) {
        int p = 0;
        for (int i = 0; i < word.length(); i++){
            int u = word.charAt(i) - 'a';
            if (son[p][u] == 0)
                return false; 
            p = son[p][u];
        }
        return cnt[p] != 0;
    }
    
    // 查找是否是前缀
    public boolean startsWith(String prefix) {
        int p = 0;
        for (int i = 0; i < prefix.length(); i++){
            int u = prefix.charAt(i) - 'a';
            if (son[p][u] == 0)
                return false; 
            p = son[p][u];
        }
        return true;
    }
```