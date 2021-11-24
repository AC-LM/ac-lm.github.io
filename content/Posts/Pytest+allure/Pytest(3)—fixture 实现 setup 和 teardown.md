---
title: Pytest(3)—fixture 实现 setup 和 teardown
date: 2021-01-16
author: LM
---

## 1.setup 与 fixture 的启动顺序

fixture 的启动在 setup 之前，在 fixture 执行完之后执行 setup

## 2.setup 和 teardown 的实现

通过使用 yield 关键字实现teardown 操作

```python
@pytest.fixture()
def open():
    print("打开浏览器，并且打开百度")
    yield
    print("执行teardown")
```

- 如果其中一个用例出现异常，不影响 yield 后面的 teardown 执行，并且全部用例执行完之后，yield 呼唤 teardown 操作
- 如果在 setup 就异常了，那么是不会去执行 yield 后面的 teardown 内容了