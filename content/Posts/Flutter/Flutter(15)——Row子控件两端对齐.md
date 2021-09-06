---
title: Flutter(15)——Row子控件两端对齐
date: 2021-05-16
author: LM
---

## 1.使用spaceBetween对齐方式

```dart
new Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  children: [
    new Text("left"),
    new Text("right")
  ]
);
```

## 2.中间使用Expanded自动扩展

```dart
Row(
  children: <Widget>[
    FlutterLogo(),//左对齐
    Expanded(child: SizedBox()),//自动扩展挤压
    FlutterLogo(),//右对齐
  ],
);
```

## 3.使用Spacer自动填充

```dart
Row(
  children: <Widget>[
    FlutterLogo(),
    Spacer(),
    FlutterLogo(),
  ],
);
```

## 4.使用Flexible

```dart
Row(
  children: <Widget>[
    FlutterLogo(),
    Flexible(fit: FlexFit.tight, child: SizedBox()),
    FlutterLogo(),
  ],
);
```

