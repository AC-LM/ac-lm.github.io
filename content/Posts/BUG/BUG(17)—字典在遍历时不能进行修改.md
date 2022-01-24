---
title: BUG(17)—字典在遍历时不能进行修改
date: 2021-03-31
author: LM
tags: ["Bug"]
---

## BUG 描述

```python
a={'a':1, 'b':0, 'c':1, 'd':0}
for key in a.keys():
	del a[key]
```

执行上述代码时会出现报错

## Resolution

字典在遍历时不能被修改，需要将字典转成列表或集合再进行遍历。

```python
a={'a':1, 'b':0, 'c':1, 'd':0}
for key in list(a.keys()):
	del a[key]
```

