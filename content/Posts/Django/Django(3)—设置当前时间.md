---
title: Django(3)—设置当前时间
date: 2021-06-03
author: LM
tags: ["Django"]
---

## 1.时间字段

在 model 中，有 DateTimeField、DateField 和 TimeField 三种类型可以用来创建日期字段，其值分别对应着 datetime()、date()、time() 三种对象。

## 2.属性

### DateTimeField.auto_now

这个参数的默认值为 false，设置为 true 时，能够在保存该字段时，将其值设置为当前时间，并且每次修改 model，都会自动更新。因此这个参数在需要存储“最后修改时间”的场景下，十分方便。需要注意的是，设置该参数为 true 时，并不简单地意味着字段的默认值为当前时间，而是指字段会被“强制”更新到当前时间，你无法程序中手动为字段赋值；如果使用 django 再带的 admin 管理器，那么该字段在 admin 中是只读的。

### DateTimeField.auto_now_add

这个参数的默认值也为 false，设置为 true 时，会在 model 对象第一次被创建时，将字段的值设置为创建时的时间，以后修改对象时，字段的值不会再更新。该属性通常被用在存储“创建时间”的场景下。与 auto_now 类似，auto_now_add 也具有强制性，一旦被设置为 true，就无法在程序中手动为字段赋值，在 admin 中字段也会成为只读的。

## 3.如何将创建时间设置为“默认当前”并且可修改

那么问题来了。实际场景中，往往既希望在对象的创建时间默认被设置为当前值，又希望能在日后修改它。怎么实现这种需求呢？

django 中所有的 model 字段都拥有一个 default 参数，用来给字段设置默认值。可以用 default=timezone.now 来替换 auto_now=True 或 auto_now_add=True。timezone.now 对应着 django.utils.timezone.now()，因此需要写成类似下面的形式：

```python
from django.db import models
import django.utils.timezone as timezone

class Doc(models.Model):
	add_date = models.DateTimeField('保存日期',default = timezone.now)
	mod_date = models.DateTimeField('最后修改日期', auto_now = True)
```