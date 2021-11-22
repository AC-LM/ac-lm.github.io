---
title: Dart(9)——随机数
date: 2021-07-23
author: LM
---

## 1.随机数

```dart
import 'dart:math';
main(){
// 实例化 Random 类并赋值给变量 rng；
    var rng = new Random();
// 打印变量 rng，随机数范围(0-99);
    print(rng.nextInt(100));
}
```

## 2.Random

```dart
// 返回的 0~(max-1) 的随机数
int nextInt(int max);
// 生成 1.0~0.0 的随机数
double nextDouble();
// 生成随机布尔值: true/false
bool nextBool();
```

