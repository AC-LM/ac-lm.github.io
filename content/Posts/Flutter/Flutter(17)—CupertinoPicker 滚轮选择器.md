---
title: Flutter(17)—CupertinoPicker 滚轮选择器
date: 2021-05-18
author: LM
tags: ["Flutter"]
---

## 1.组件使用

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

