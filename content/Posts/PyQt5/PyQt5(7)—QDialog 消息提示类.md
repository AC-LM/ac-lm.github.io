---
title: PyQt5(7)—QDialog 消息提示类
date: 2020-12-19
author: LM
---

## 1.QDialog的子类

QMessageBox，QFileDialog，QColorDialog，QFontDialog，QInputDialog等

## 2.QDialog类中的常用方法

```python
setWindowTitle()  # 设置对话框标题
setWindowModality()  # 设置窗口模态
#-值-----------------------------------------------
Qt.NonModal：非模态，可以和程序的其他窗口进行交互
Qt.WindowModal:窗口模态，程序在未处理玩当前对话框时，将阻止和对话框的父窗口进行交互
Qt.ApplicationModal：应用程序模态，阻止和任何其他窗口进行交互
```

