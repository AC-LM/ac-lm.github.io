---
title: Dart(3)—文件操作
date: 2021-04-26
author: LM
tags: ["Dart"]
---

## 1.写文件

无需手动关闭文件，文件写入完成后自动关闭

```dart
import 'dart:io';

void main() async{
  // 创建文件
  File file = new File('test.txt');
  String content = 'The easiest way to write text to a file is to create a File';

  try {
    // 向文件写入字符串
    await file.writeAsString(content);
    print('Data written.');
  } catch (e) {
    print(e);
  }
}
————————————————
Future<File> writeAsString(String contents,
      {FileMode mode: FileMode.write,
      Encoding encoding: utf8,
      bool flush: false})
FileMode：read，write，append，writeOnly，writeOnlyAppend
```

需要手动关闭文件

```dart
import 'dart:io';

void main() async{
  // 创建文件
  File file = new File('test.txt');
  // 文件模式设置为追加
  IOSink isk = file.openWrite(mode: FileMode.append);

  // 多次写入
  isk.write('A woman is like a tea bag');
  isk.writeln('you never know how strong it is until it\'s in hot water.');
  isk.writeln('-Eleanor Roosevelt');
  await isk.close();
  print('Done!');
}
```

## 2.读文件

```dart
void main() async{
  File file = new File('test.txt');
  try{
    String content = await file.readAsString();
    print(content);
  }catch(e){
    print(e);
  }
}
————————————————
readAsBytes
readAsBytesSync
readAsString
readAsStringSync
readAsLines
readAsLinesSync
```

## 3.文件存在判断

```dart
import 'dart:io';

void main() async{
  File file = new File('test.txt');

  // 判断文件是否存在
  if(await file.exists()){
    print("文件存在");
  }else{
    print("文件不存在");
  }

  // 复制文件
  await file.copy("test-1.txt");

  // 修改文件名。当传入不同路径时，可用来移动文件
  await file.rename("test-2.txt");
  
  // 获取文件 size
  print(await file.length());
}
```

## 4.目录存在判断

```dart
import 'dart:io';

void main() async{
  String path = 'test.txt';

  // 判断路径是否是文件夹
  if (!await FileSystemEntity.isDirectory(path)) {
    print('$path is not a directory');
  } 

 Directory dir = Directory(r'D:\workspace\dart_space\Tutorial');
 // 目录是否存在
 if(await dir.exists()){
   // 从目录的list方法获取FileSystemEntity对象
   Stream<FileSystemEntity> fse = await dir.list();
   await for (FileSystemEntity entity in fse) {
     if(entity is File){
       print("entity is file");
     }

     // 打印文件信息
     print(await entity.stat());
     // 删除
     await entity.delete();
   }
 }else{
   // 不存在则创建。recursive为true时，创建路径上所有不存在的目录
   await dir.create(recursive: true);
 }
}
```

> 参考原文：[ Dart 语言标准流与文件操作 @血色v残阳 ](https://blog.csdn.net/yingshukun/article/details/100866655)
