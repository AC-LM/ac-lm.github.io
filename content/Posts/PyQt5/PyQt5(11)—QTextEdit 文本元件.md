---
title: PyQt5(11)—QTextEdit 文本元件
date: 2020-12-23
author: LM
tags: ["PyQt5"]
---

## 1.占位文本的使用

```python
setPlaceholderText()  #| 设置占位文本
placeholderText()     #| 获取占位文本
```

## 2. 设置文本格式

```python
setPlainText(str)    #| 设置普通文本
insertPlainText(str) #| 插入普通文本
toPlainText()        #| -> str 返回普通文本
setHtml(str)         #| 设置Html文本
insertHtml(str)      #| 插入Html文本
toHtml()             #| -> str 返回Html 文本
setText(str)         #| 设置文本（自动识别）
append(str)          #| 追加文本
clear()              #| 清空文本
```


## 3.设置字体和大小

```python
setFontPointSize(float)  # 设置字体大小
setFontFamily(str)       # 设置字体
```
