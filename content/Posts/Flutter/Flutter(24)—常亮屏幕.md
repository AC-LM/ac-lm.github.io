---
title: Flutter(24)—常亮屏幕
date: 2021-11-22
author: LM
---

> [ 使用 Wakelock 控制屏幕常亮 @简忆博客 ](https://www.tpxhm.com/fdetail/349.html)

## 1.Wakelock

wakelock 是 android 的电源管理系统中一种锁的机制, 只要有 task 拿着这个锁, 系统就无法进入休眠, 可以被用户态进程和内核线程获得。

## 安装使用

### a.添加到 pubspec.yaml

```dart
dependencies:  wakelock: ^0.1.4+1
```

### b.在 Manifest 中添加如下权限

```dart
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

### c.在页面引入和使用：

```dart
import 'package:wakelock/wakelock.dart';
// ... 
// The following line will enable the Android and iOS wakelock.Wakelock.enable(); 
// The next line disables the wakelock again.Wakelock.disable();
```