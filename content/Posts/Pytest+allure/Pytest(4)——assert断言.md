---
title: Pytest(4)——assert断言
date: 2021-01-31
author: LM
---

> 参考原文：[  assert断言详细使用  @小菠萝测试笔记 ](https://www.cnblogs.com/poloyy/p/12641778.html)

## 1.前言

- 与unittest不同，pytest使用的是python自带的assert关键字来进行断言
- assert关键字后面可以接一个表达式，只要表达式的最终结果为True，那么断言通过，用例执行成功，否则用例执行失败

##  2.实例

```python
# 异常信息
def f():
    return 3
def test_function():
    a = f()
    assert a % 2 == 0, "判断 a 为偶数，当前 a 的值为：%s" % a
```

![](https://gitee.com/LM-J/drawingbed/raw/master/img/36.png)

## 3.常用断言

- assert xx ：判断 xx 为真
- assert not xx ：判断 xx 不为真
- assert a in b ：判断 b 包含 a
- assert a == b ：判断 a 等于 b
- assert a != b ：判断 a 不等于 b

## 4.异常断言 pytest.raises

在断言一些代码块或者函数时会引发意料之中的异常或者其他失败的异常，导致程序无法运行时，使用 raises 可以捕获匹配到的异常，继续让代码正常运行。

### raises 可以捕获异常，并继续后续断言代码

```python
import pytest


def test_raises():
    with pytest.raises(ZeroDivisionError):
        2 / 0
    assert eval("1 + 2") == 3
```

### 可以使用 match 和 raise 进行自定义异常

```python
import pytest

def exc(x):
    if x == 0:
        raise ValueError("value not 0 or None")
    return 2 / x

def test_raises():
    # match 允许正则
    with pytest.raises(ValueError, match="value not 0 or None"):
        exc(0)
    assert eval("1 + 2") == 3
```

### 注意

raise 的异常应该是当前代码块最后一行，如果在其后面还有代码，那么将不会被执行。