---
title: Flutter—apk 瘦身
date: 2021-06-09
author: LM
tags: ["Flutter"]
---

## 1.打包

Flutter 在打包编译时，会根据 CPU 架构（x86_64、arm64-v8a、armeabi-v7a）的不同打出对应的二进制库，体现在 apk 的 lib 文件中。

PS：x86_64 一般是模拟器和平板使用， arm64-v8a 就是 arm 64 位，大部分新手机使用。 armeabi 虽然不是现在主流的 CPU 架构，但是高版本的都会对其进行兼容，所以主流的 App 如果只想发一个版本的上线，可以只使用 armeabi 。

使用命令

```
flutter build apk --release --target-platform android-arm
```

```
flutter build apk --target-platform android-arm,android-arm64,android-x64 --split-per-abi
```

