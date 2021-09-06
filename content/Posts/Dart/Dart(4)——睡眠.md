---
title: Dart(4)——睡眠
date: 2021-04-27
author: LM
---

## In Async Code

```dart
await Future.delayed(Duration(seconds: 1));
```

## In Sync Code

```dart
import 'dart:io';
sleep(Duration(seconds:1));
```

