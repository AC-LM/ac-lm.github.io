---
title: Android—华为设备启动无线调试
date: 2021-08-03
author: LM
tags: ["Android"]
---

华为默认不启动无线调试，用户需要进入生产模式，手动启动

## 1.生产模式的启用

- 拨号界面中输入`*#*#2846579#*#*`，进入工程菜单，将调试模式变更为生产模式
- 计算器界面中输入`()()2846579()()`，进入工程菜单，将调试模式变更为生产模式

## 2.启动无线调试功能

1. 使用 USB 连接手机，将无线端口开启

```
adb tcpip 5555
```

2. 使用同一网络环境的 Wifi 连接

```
adb connect 手机IP:5555
```

3. 成功后断开USB，此时便可以在 adb 中查看到连接手机

```
adb devices
```

