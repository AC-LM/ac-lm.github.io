---
title: Flutter(18)——内置对话框
date: 2021-04-29
author: LM
---

> 参考原文：[ Flutter内置show @老孟Flutter ](https://www.imooc.com/article/302188)

## showDialog

showDialog 用于弹出普通Material风格的对话框，用法如下：

```dart
showDialog(
    context: context,
    builder: (context) {
      return AlertDialog(
        ...
      );
    }
);
```

## showCupertinoDialog

showCupertinoDialog 用于弹出ios风格对话框，基本用法如下：

```dart
showCupertinoDialog(
    context: context,
    builder: (context) {
      return CupertinoAlertDialog(
       ...
      );
    });
```

## showAboutDialog

AboutDialog用于描述当前App信息，底部提供2个按钮：查看许可按钮和关闭按钮。AboutDialog需要和showAboutDialog配合使用，用法如下：

```dart
showAboutDialog(
  context: context,
  applicationIcon: Image.asset(
    'images/bird.png',
    height: 100,
    width: 100,
  ),
  applicationName: '应用程序',
  applicationVersion: '1.0.0',
  applicationLegalese: 'copyright 老孟，一枚有态度的程序员',
  children: <Widget>[
    Container(
      height: 30,
      color: Colors.red,
    ),
    Container(
      height: 30,
      color: Colors.blue,
    ),
    Container(
      height: 30,
      color: Colors.green,
    )
  ],
);
```

## showModalBottomSheet

从底部弹出，通常和BottomSheet配合使用，用法如下：

```dart
showModalBottomSheet(
        context: context,
        builder: (BuildContext context) {
          return BottomSheet(...);
        });
```

## showCupertinoModalPopup

showCupertinoModalPopup 展示ios的风格弹出框，通常情况下和CupertinoActionSheet配合使用，用法如下：

```dart
showCupertinoModalPopup(
    context: context,
    builder: (BuildContext context) {
      return CupertinoActionSheet(
        title: Text('提示'),
        message: Text('是否要删除当前项？'),
        actions: <Widget>[
          CupertinoActionSheetAction(
            child: Text('删除'),
            onPressed: () {},
            isDefaultAction: true,
          ),
          CupertinoActionSheetAction(
            child: Text('暂时不删'),
            onPressed: () {},
            isDestructiveAction: true,
          ),
        ],
      );
    }
);
```

## 其他

```dart
showMenu()
showSearch()
```