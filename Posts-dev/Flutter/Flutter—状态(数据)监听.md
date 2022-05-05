---
title: Flutter—状态(数据)监听
date: 2021-07-23
author: LM
tags: ["Flutter"]
---

## 1.ValueListenableBuilder

该`Widget`配合`ValueNotifier`可以实现对数据的监听

```dart
/// 定义 ValueNotifier 这里传递的数据类型为 String
ValueNotifier<String> _testValueNotifier = ValueNotifier<String>('');
/// 定义数据变化后监听的 Widget
Widget buildValueListenableBuilder() {
  return ValueListenableBuilder(
    /// 数据发生变化时回调,变化的布局
    builder: (context, value, child) {
        if(value == ''){
          return Text('空');
        }else{
          return Text(value);
        }
    },
    /// 监听的数据
    valueListenable: _testValueNotifier,
  );
}
/// 数据变化
 void testFunction() {
   /// 赋值更新
   _testValueNotifier.value = '传递的测试数据';
 }
```

