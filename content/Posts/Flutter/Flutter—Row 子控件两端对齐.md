---
title: Flutter—Row 子控件两端对齐
date: 2021-05-16
author: LM
tags: ["Flutter"]
---

## 1.使用 spaceBetween 对齐方式

```dart
new Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  children: [
    new Text("left"),
    new Text("right")
  ]
);
```

## 2.中间使用 Expanded 自动扩展

```dart
Row(
  children: <Widget>[
    FlutterLogo(),//左对齐
    Expanded(child: SizedBox()),//自动扩展挤压
    FlutterLogo(),//右对齐
  ],
);
```

## 3.使用 Spacer 自动填充

```dart
Row(
  children: <Widget>[
    FlutterLogo(),
    Spacer(),
    FlutterLogo(),
  ],
);
```

## 4.使用 Flexible

```dart
Row(
  children: <Widget>[
    FlutterLogo(),
    Flexible(fit: FlexFit.tight, child: SizedBox()),
    FlutterLogo(),
  ],
);
```

