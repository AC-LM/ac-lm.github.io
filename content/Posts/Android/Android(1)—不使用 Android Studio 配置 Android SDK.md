---
title: Android(1)——不使用 Android Studio 配置 Android SDK
date: 2020-09-21
author: LM
---

## 1.环境

Windows，无 Android Studio

## 2.配置Android SDK

下载 Android CMD 工具 [sdkmanager](https://developer.android.google.cn/studio)

并将 `Android\cmdline-tools\latest\bin\sdkmanager.bat` 添加到环境变量中 

运行 `sdkmanager`

配置SDK `sdkmanager "platform-tools" "platforms;android-28"`

检查环境变量 `ANDROID_SDK_ROOT` 是否存在，指向 SDK 文件夹

## 3.sdkmanager

```cmd
# 若要卸载软件包，只需添加 `--uninstall` 标记
sdkmanager --uninstall packages [options]
sdkmanager --uninstall --package_file=package_file [options]
# 以下命令列出已安装和可用的软件包
sdkmanager --list [options] \
           [--channel=channel_id] // Channels: 0 (stable), 1 (beta), 2 (dev), or 3 (canary)
# 更多请查看参考文档
```

> 参考文档：[ sdkmanager @Android Studio用户指南 ](https://developer.android.google.cn/studio/command-line/sdkmanager)

