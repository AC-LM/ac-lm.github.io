---
title: Python—yield 生成器的用法
date: 2021-01-17
author: LM
tags: ["Python"]
---

## 1.generator（生成器）

带有 yield 的函数在 Python 中被称之为 generator（生成器），而不是一个函数，这个生成器带有一个next函数，在调用 next 时函数才会执行，执行到 yield 停止，下一次的 next 开始的地方是接着上一次的 next 停止的地方执行。

```python
def foo():
    print("starting...")
    while True:
        yield 5
        res = yield 4
        print("res:",res)
g = foo()
print(next(g))
print(next(g))
print(next(g))
```

## 2.为什么需要 yield

```python
for i in range(1000): pass
```

这个循环在运行中占用的内存会随着 range() 的参数的增大而增大，range() 会生成一个List。如果要控制内存占用，最好不要用 List

```python
for i in xrange(1000): pass
```

在python2中这样写则不会生成一个 1000 个元素的 List，而是在每次迭代中返回下一个数值，内存空间占用很小。因为 xrange 不返回 List，而是返回一个 iterable 对象。【iterable意思为迭代，可以理解为连续的一组数据，可以遍历的数据，包含内置的string、list、dict、tuple、set()】

在 Python3 中则是 yield