---
title: Python(5)——Pyautogui
date: 2020-09-23
author: LM
---

## 1.什么是 Pyautogui

PyAutoGUI 是 Python 编写的一个实现自动化鼠标和键盘操作的库。

## 2.使用

```python
import pyautogui

screenWidth, screenHeight = pyautogui.size() # 返回屏幕分辨率
print(screenWidth,screenHeight)
currentMouseX, currentMouseY = pyautogui.position() # 返回鼠标的所在位置
print(currentMouseX,currentMouseY)
#pyautogui.moveTo(327, 382) #移动鼠标到指定位置
#pyautogui.click() # 单击
#pyautogui.doubleClick() # 双击鼠标
```

