---
title: Android(1)——Android SDK的配置
date: 2020-12-28
author: LM
---

> 参考文档：[ sdkmanager @Android Studio用户指南 ](https://developer.android.google.cn/studio/command-line/sdkmanager)

## 1.配置Android SDK

下载 Android CMD 工具 sdkmanager [Command line tools only](https://developer.android.google.cn/studio)

将 Android\cmdline-tools\latest\bin\sdkmanager.bat 添加到环境变量中 

```cmd
# 执行命令，安装最新的平台工具（包括 `adb` 和 `fastboot`）以及适用于 API 级别 28 的 SDK 工具
# 请确保环境变量 ANDROID_SDK_ROOT 已被设置
sdkmanager "platform-tools" "platforms;android-28"
# 若要卸载软件包，只需添加 `--uninstall` 标记
sdkmanager --uninstall packages [options]
sdkmanager --uninstall --package_file=package_file [options]
# 以下命令列出已安装和可用的软件包
sdkmanager --list [options] \
           [--channel=channel_id] // Channels: 0 (stable), 1 (beta), 2 (dev), or 3 (canary)
```
