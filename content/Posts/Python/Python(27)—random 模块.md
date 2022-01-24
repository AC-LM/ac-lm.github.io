---
title: Python(27)—random 模块
date: 2021-03-29
author: LM
tags: ["Python"]
---

## 1.random.randrange(a, b, c)

返回给定范围 [a, b) 内的随机整数，不包括b，第三个参数为步长，只能返回该范围内特定的数，比如该例子中[1,4,7,…,97]

```
>>> random.randrange(1,100)
68
>>> random.randrange(1,100,3)
16
```

## 2.random.randint(a, b)

返回 [1,100] 范围内的随机数整数，包括100，第三个参数同random.randrange()用法一样

```
>>> random.randint(1,100)
17
```

## 3.random.random()

返回 [0, 1) 范围内随机浮点数，不包括1

```
>>> random.random()
0.41385723239524297
```

## 4.random.choice()

在给定容器中随机选择一个元素

```
rand = ['0', '1', '2', '3', '4']
temp = choice(rand)
```

## 5.random.sample(a)

在给定容器中随记选择特定数量元素

```
>>> random.sample("abcde",2)
['e', 'b']  
```

## 6.random.shuffle()

随机打乱传入的容器(容器必须是可变对象)

```
>>> l = [1,2,3,4]
>>> random.shuffle(l)
>>> l
[1, 3, 2, 4]
```

