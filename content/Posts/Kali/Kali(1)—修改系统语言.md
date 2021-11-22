---
title: Kali(1)——修改系统语言
date: 2021-06-07
author: LM
---

## 1.配置

在终端输入以下命令，打开系统配置页

```
dpkg-reconfigure locales
```

找到 `en_US.UTF-8 UTF-8`选项空格取消，继续下拉，找到`[ ]zh_CN.GBK_GBK` 和`[ ] zh-CN.UTF-8.UTF-8`两个选项选中，Enter确认，下一界面选择`zh_CN.UTF-8`确认系统本地编码，`reboot`重启

