---
title: Dart—睡眠
date: 2021-04-27
author: LM
tags: ["Dart"]
---

## In Async Code (异步)

```dart
await Future.delayed(Duration(seconds: 1));
```

## In Sync Code (同步)

```dart
import 'dart:io';
sleep(Duration(seconds:1));
```

