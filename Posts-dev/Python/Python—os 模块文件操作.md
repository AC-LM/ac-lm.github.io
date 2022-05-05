---
title: Python—os 模块文件操作
date: 2021-03-25
author: LM
tags: ["Python"]
---

> 参考文档：[ os文档  @Python文档  ](https://docs.python.org/zh-cn/3/library/os.html)

## 1.os.listdir() 

os.listdir() 方法用于返回指定的文件夹包含的文件或文件夹的名字的列表。它不包括隐藏文件如（. 或 .. 开头的文件）

```python
import os, sys

path = "/var/www/html/"
dirs = os.listdir(path)
# path -- 需要列出的目录路径
# 返回指定路径下的文件和文件夹列表

for file in dirs:
    print(file)
```

## 2.os.path.exists()

os.path.exists() 方法用于判断文件夹是否存在

```python
import os

path = "/var/www/html/"
# path -- 需要列出的目录路径

if os.path.exists(path):
    pass
```

## 3.os.path.abspath()

```python
# 获取当前文件的绝对路径
path1 = os.path.abspath(__file__)
print("path1:{}".format(path1))
```

## 4.os.path.dirname()

```python
# 获取当前文件的目录
path2 = os.path.dirname(__file__)
print("path2:{}".format(path2))
```

## 5.os.mkdir()

os.mkdir() 方法用于创建文件夹

```python
import os

path="/var/www/html/ABC"
isExists=os.path.exists(path)

if not isExists:
    os.mkdir(path)
    print('创建成功')
else:
    print('目录已存在')
```

