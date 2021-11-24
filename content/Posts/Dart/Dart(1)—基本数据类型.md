---
title: Dart(1)—基本数据类型
date: 2021-04-24
author: LM
---

## 1.数字与布尔值

### a.属性

```dart
int figureA = -93;
    // figureA 是否为负数
    print(figureA.isNegative);
    // figureA 是否是有限的
    print(figureA.isFinite);
    // figureA 是否正无穷大或负无穷大
    print(figureA.isInfinite);
 
double figureB = 64.742;
    // 返回 figureB 的符号，-1.0:值小于0、+1.0:值大于0、-0.0/0.0/NaN:值是其本身
    print(figureB.sign);
    // 返回 figureB 运行时的类型
    print(figureB.runtimeType);
    // 返回 figureB 的哈希码
    print(figureB.hashCode);
 
int figureC = 13;
    // figureC 是否为奇数
    print(figureC.isOdd);
    // figureC 是否为偶数
    print(figureC.isEven);
    // 返回 figureC 所占存储位
    print(figureC.bitLength);
```

### b.方法

```dart
int figureA = -93;
    // 返回 figureA 的绝对值
    print(figureA.abs());
    // 返回 figureA 的字符串
    print(figureA.toString());
 
double figureB = 64.742;
    // 返回 figureB 的整数值
    print(figureB.toInt());
    // 返回 figureB 的双精度值
    print(figureB.toDouble());
    // 返回大于 figureB 的双精度值
    print(figureB.ceilToDouble());
    // 返回小于 figureB 的双精度值
    print(figureB.floorToDouble());
    // 返回 figureB 四舍五入的双精度值
    print(figureB.roundToDouble());
    // 返回 figureB 保留几位小数的字符串
    print(figureB.toStringAsFixed(2));
    // 返回 figureB 保留几位小数后精确结果的字符串
    print(figureB.toStringAsPrecision(3));
 
int figureC = 31;
    // figureC对比其他整数，0:相同、1:大于、-1:小于
    print(figureC.compareTo(20));
    // 将figureC控制在指定区间的整数
    print(figureC.clamp(20,25));
    // 返回figureC转换成指定基数(进制)的字符串
    print(figureC.toRadixString(16));
 
int figureD = 12;
    // 返回 figureD 与其他整数的最大公约数
    print(figureD.gcd(18));
    // 返回 figureDg 与其他整数的截取余数
    print(figureD.remainder(18));
    // 返回 figureD 几次幂值的字符串
    print(figureD.toStringAsExponential(2));
```

## 2.字符串常量

### a.属性

```dart
String str = "Hello world!";
    // 返回字符串的 UTF-16 代码单元列表
    print(str.codeUnits);
    // 返回根据代码单元生成的哈希码
    print(str.hashCode);
    // 字符串是否为空
    print(str.isEmpty);
    // 字符串是否不为空
    print(str.isNotEmpty);
    // 字符串的长度
    print(str.length);
    // 返回字符串 Unicode 代码的可迭代对象
    print(str.runes);
    // 返回对象运行时的类型
    print(str.runtimeType);
```

### b.方法

```dart
// 返回对象的字符串表示
String str = "Hello world!";
print(str.toString());

// 截取字符串
String str = 'Dart is fun';
String newStr = str.substring(0,4);
print(newStr);

// 在字符串中插入字符串
String name = "XiaoMing";
print("My name is ${name}");

// 输出字符串的Unicode编码
String str = "Dart";
print(str.codeUnitAt(0));
print(str.codeUnits);

// 去掉字符串前后空格
String str = "\tDart is fun\n";
print(str.trimLeft());
print(str.trimRight());
print(str.trim());

// 字符串的大小写转换
String str = "ABCdef";
print(str.toLowerCase());
print(str.toUpperCase());

// 拆分字符串
String strA = "Hello world!";
print(strA.split(" "));
String strB = "abba";
print(strB.split(new RegExp(r"b*")));

// 是否包含其他字符串
String str = 'Dart strings';
print(str.contains('D'));
print(str.contains(new RegExp(r'[A-Z]')));
print(str.contains('D',0));
print(str.contains(new RegExp(r'[A-Z]'),0));

// 在字符串前后补占位符
String str = "86";
print(str.padLeft(4,'0'));
print(str.padRight(4,'0'));

// 获取指定字符出现的位置
String str = 'Dartisans';
print(str.indexOf('art'));
print(str.indexOf(new RegExp(r'[A-Z][a-z]')));
print(str.lastIndexOf('a'));
print(str.lastIndexOf(new RegExp(r'a(r|n)')));

// 替换字符串中所有匹配字符
String str = "resume";
print(str.replaceAll(new RegExp(r'e'),'é'));
```

## 3.字符串变量

### a.属性

```dart
StringBuffer strBuf = new StringBuffer();
    strBuf.write("Sow nothing,reap nothing.");
    // 返回字符串缓冲区的哈希码
    print(strBuf.hashCode);
    // 字符串缓冲区是否为空
    print(strBuf.isEmpty);
    // 字符串缓冲区是否不为空
    print(strBuf.isNotEmpty);
    // 返回字符串缓冲区累积内容的长度
    print(strBuf.length);
    // 返回对象运行时的类型
    print(runtimeType);
```

### b.方法

```dart
StringBuffer strBuf = new StringBuffer();
    // 添加字符串到字符串缓冲区内
    strBuf.write("Do one thing at a time,and do well.");
    // 返回字符串缓冲区的所有内容
    print(strBuf.toString());
    // 清除字符串缓冲区
    strBuf.clear();
```

