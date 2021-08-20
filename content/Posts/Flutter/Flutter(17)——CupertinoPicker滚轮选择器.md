---
title: Flutter(17)——CupertinoPicker滚轮选择器
date: 2021-04-29
author: LM
---

## 组件使用

```dart
Container(
           height: 120,
           width: 100,
           child: CupertinoPicker(
                    itemExtent: 27,
                    onSelectedItemChanged: (position) {},
                    children: [ Text("192") ]
         ),),
```

