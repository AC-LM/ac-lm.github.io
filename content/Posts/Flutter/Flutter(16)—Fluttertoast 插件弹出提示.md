---
title: Flutter(16)—Fluttertoast 插件弹出提示
date: 2021-05-17
author: LM
---

## 1.引入插件

在 pubspec.yaml 中添加依赖:

```yaml
fluttertoast: ^4.0.1
```

## 2.使用

```dart
import 'package:fluttertoast/fluttertoast.dart';

RaisedButton(
  child: Text("弹出toast"),
  onPressed: () {
    Fluttertoast.showToast(
                    msg: "你今天真好看",
                    toastLength: Toast.LENGTH_SHORT,
                    gravity: ToastGravity.BOTTOM,
                    timeInSecForIosWeb: 1,
                    backgroundColor: Colors.black45,
                    textColor: Colors.white,
                    fontSize: 16.0);
  },
)
```

