---
title: Python(41)——pyinstaller 打包
date: 2021-11-22
author: LM
---

> [ PyInstaller Manual @PyInstaller 4.6 documentation ](https://pyinstaller.readthedocs.io/en/stable/)

## pyinstaller

pyinstaller 是 Python 的一个打包可执行文件的打包工具。其会根据平台不同进行打包，在 Windows 上打包 Windows 应用，在 Linux 上打包 Linux 的，不能交叉打包

```python
# pyinstaller -F (单个可执行文件) 程序源 -n 程序名 -w(去掉控制台窗口，这在GUI界面时非常有用) -i 图标.ico”
pyinstaller -F test1/Demo_Test1_Python.py
```

