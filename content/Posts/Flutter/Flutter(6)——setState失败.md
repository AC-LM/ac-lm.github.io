---
title: Flutter(6)——setState失败
date: 2021-04-29
author: LM
---

> 参考原文：[ setState() called after dispose() @Songzh](https://www.jianshu.com/p/9e3bd870d292)

## 1.报错

```dart
ERROR:flutter/shell/common/shell.cc(181)] Dart Error: Unhandled exception:
setState() called after dispose(): _ShelfState#5b9c1(lifecycle state: defunct, not mounted)
```

## 2.原因

在 Flutter 构件树被销毁后仍然执行了 setState 方法改变页面状态，当 setState 方法改变页面状态时，需要改变的页面被销毁了。使用场景为，当触发 setState 方法时从当前页面切换到其他页面。

## 3.解决

在 setState 之前加一句判断，判断当前页面是否存在于构件树中。

```dart
// mounted 为 true 表示当前页面挂在到构件树中，为 false 时未挂载当前页面
if (mounted) {
  setState(() {
  // xxxx
  })
}
```

