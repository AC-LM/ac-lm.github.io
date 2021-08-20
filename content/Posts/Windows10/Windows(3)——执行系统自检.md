---
title: Windows(3)——执行系统自检
date: 2021-03-30
author: LM
---

## 1.如何实现

```cmd
# 系统自检命令
sfc /SCANNOW
# 扫描系统文件并和官方服务器上文件进行对比，查找是否存在系统文件和官方不一致的情况
Dism /Online /Cleanup-Image /ScanHealth
# 联网下载与官方不同的系统文件进行替换
Dism /Online /Cleanup-Image /CheckHealth
# 将系统中和官方不同的系统文件直接还原成源文件
DISM /Online /Cleanup-image /RestoreHealth
```

