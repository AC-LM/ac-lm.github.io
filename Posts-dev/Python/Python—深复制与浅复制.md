---
title: Python—深复制与浅复制
date: 2021-03-28
author: LM
tags: ["Python"]
---

> 参考原文：[ 图解Python深拷贝和浅拷贝  @田小计划  ](https://www.cnblogs.com/wilber2013/p/4645353.html)

## 1.对象赋值

```python
will = ["Will", 28, ["Python", "C#", "JavaScript"]]
wilber = will
print id(will)
print will
print [id(ele) for ele in will]
print id(wilber)
print wilber
print [id(ele) for ele in wilber]

will[0] = "Wilber"
will[2].append("CSS")
print id(will)
print will
print [id(ele) for ele in will]
print id(wilber)
print wilber
print [id(ele) for ele in wilber]
```

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205051038771.png)

### 代码分析

- 首先，创建了一个名为will的变量，这个变量指向一个list对象，从第一张图中可以看到所有对象的地址（每次运行，结果可能不同）
- 然后，通过will变量对wilber变量进行赋值，那么wilber变量将指向will变量对应的对象（内存地址），也就是说"wilber is will"，"wilber[i] is will[i]"，可以理解为，Python中，对象的赋值都是进行对象引用（内存地址）传递
- 第三张图中，由于will和wilber指向同一个对象，所以对will的任何修改都会体现在wilber上，这里需要注意的一点是，str是不可变类型，所以当修改的时候会替换旧的对象，产生一个新的地址39758496

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205051039148.png)

## 2.浅拷贝

```python
import copy

will = ["Will", 28, ["Python", "C#", "JavaScript"]]
wilber = copy.copy(will)

print id(will)
print will
print [id(ele) for ele in will]
print id(wilber)
print wilber
print [id(ele) for ele in wilber]
will[0] = "Wilber"
will[2].append("CSS")
print id(will)
print will
print [id(ele) for ele in will]
print id(wilber)
print wilber
print [id(ele) for ele in wilber]
```

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205051039522.png)

### 代码分析

- 首先，依然使用一个will变量，指向一个list类型的对象
- 然后，通过copy模块里面的浅拷贝函数copy()，对will指向的对象进行浅拷贝，然后浅拷贝生成的新对象赋值给wilber变量，浅拷贝会创建一个新的对象，这个例子中**"wilber is not will"**，但是，对于对象中的元素，浅拷贝就只会使用原始元素的引用（内存地址），**也就是说"wilber[i] is will[i]"**
- 当对will进行修改的时候，由于list的第一个元素是不可变类型，所以will对应的list的第一个元素会使用一个新的对象39758496，但是list的第三个元素是一个可不类型，修改操作不会产生新的对象，所以will的修改结果会相应的反应到wilber上

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205051039851.png)

### 浅拷贝的操作

- 使用切片[:]操作
- 使用工厂函数（如list/dir/set）
- 使用copy模块中的copy()函数

## 3.深拷贝

```python
import copy
will = ["Will", 28, ["Python", "C#", "JavaScript"]]
wilber = copy.deepcopy(will)

print id(will)
print will
print [id(ele) for ele in will]
print id(wilber)
print wilber
print [id(ele) for ele in wilber]

will[0] = "Wilber"
will[2].append("CSS")
print id(will)
print will
print [id(ele) for ele in will]
print id(wilber)
print wilber
print [id(ele) for ele in wilber]
```

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205051039363.png)

### 代码分析

- 首先，同样使用一个will变量，指向一个list类型的对象
- 然后，通过copy模块里面的深拷贝函数deepcopy()，对will指向的对象进行深拷贝，然后深拷贝生成的新对象赋值给wilber变量，跟浅拷贝类似，深拷贝也会创建一个新的对象，这个例子中**"wilber is not will"**，但是，对于对象中的元素，深拷贝都会重新生成一份（有特殊情况，下面会说明），而不是简单的使用原始元素的引用（内存地址），例子中will的第三个元素指向39737304，而wilber的第三个元素是一个全新的对象39773088，也就是说，**"wilber[2] is not will[2]"**
- 当对will进行修改的时候，由于list的第一个元素是不可变类型，所以will对应的list的第一个元素会使用一个新的对象39758496，但是list的第三个元素是一个可不类型，修改操作不会产生新的对象，但是由于"wilber[2] is not will[2]"，所以will的修改不会影响wilber

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205051039244.png)

## 4.特殊情况

- 对于非容器类型（如数字、字符串、和其他'原子'类型的对象）没有拷贝这一说，也就是说，对于这些类型，"obj is copy.copy(obj)" 、"obj is copy.deepcopy(obj)"
- 如果元祖变量只包含原子类型对象，则不能深拷贝
