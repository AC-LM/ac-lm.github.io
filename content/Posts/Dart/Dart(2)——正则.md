---
title: Dart(2)——正则
date: 2021-04-25
author: LM
---

## 1.属性

```dart
RegExp exp = new RegExp(r"(\w+)");
    // 返回正则表达式的哈希码
    print(exp.hashCode);
    // 正则表达式是否区分大小写
    print(exp.isCaseSensitive);
    // 正则表达式是否匹配多行
    print(exp.isMultiLine);
    // 返回源正则表达式字符串
    print(exp.pattern);
    // 返回对象运行时的类型
    print(exp.runtimeType);
```

## 2.常用方法

```dart
RegExp exp = new RegExp(r"(\w+)");
    // 返回正则表达式匹配项的可迭代对象
    match = exp.allMatches("abc def ghi")
    for (Match m in matches) {
      print(m.group(0));
    }
    // 搜索并返回第一个匹配项，没有则返回null
    print(exp.firstMatch(""));
    // 正则表达式是否找到匹配项
    print(exp.hasMatch("as"));
    // 从第几个字符开始匹配正则表达式
    print(exp.matchAsPrefix("ab cd",3));
    // 返回正则表达式的第一个匹配字符串
    print(exp.stringMatch("abc de"));
    // 返回正则表达式的字符串表示
    print(exp.toString());
```