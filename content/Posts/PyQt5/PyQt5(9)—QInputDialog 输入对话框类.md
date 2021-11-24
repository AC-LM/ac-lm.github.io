---
title: PyQt5(9)—QInputDialog 输入对话框类
date: 2020-12-21
author: LM
---

## 1.简介

QInputDialog 继承自 QDialog 提供了一种简单的对话框来获得用户的单个输入信息

```python
class QInputDialog(QDialog)
| QInputDialog(QWidget parent=None, Qt.WindowFlags flags=0)
```

常用以下方法获取对话框的信息

- 字符串型   QInputDialog.getText
- Int类型数据    QInputDialog.getInt
- double类型数据    QInputDialog.getDouble 
- 下拉列表框的条目   QInputDialog.getItem 

## 2.QInputDialog.getText

```python
QString getText( QWidget * parent, #标准输入对话框的父窗口

const QString & title, #输入对话框的标题名

const QString & label,#标准输入对话框的标签提示

const QString & text = QString(), #标准字符串输入对话框弹出时QLineEdit控件中默认出现的文字

bool * ok = 0, #用于指示标准输入对话框的哪个按钮被触发，若ok为true，则表示用户单击了OK（确定）按钮，若ok为false，则表示用户单击了Cancel（取消）按钮

Qt::WindowFlags flags = 0, #知名标准输入对话框的窗体标识

Qt::InputMethodHints inputMethodHints = Qt::ImhNone ); [static]
```

## 3.QInputDialog.getItem

```python
QString getItem( QWidget * parent, #标准输入对话框的父窗口

const QString & title, #标准输入对话框的标题名

const QString & label, #标准输入对话框的标签提示

const QStringList & list, #指定标准输入对话框中QComboBox控件显示的可选条目，为一个QStringList对象

int current = 0, #指定标准输入对话框中QComboBox控件显示的可选条目，为一个QStringList对象

bool editable = true, #指定QComboBox控件中显示的文字是否可编辑；

bool * ok = 0, #用于指定标准输入对话框的哪个那妞被触发，若ok为false，则表示用户单击了Cancel（取消）按钮；

Qt::WindowFlags f = 0 ) ; [static]  #用于指定标准输入对话框的哪个那妞被触发，若ok为false，则表示用户单击了Cancel（取消）按钮；
```

## 4.QInputDialog.getInt

```python

int getInteger( QWidget * parent, #父窗口

const QString & title,  #标题名

const QString & label, #标签提示

int value = 0,  #指定标准输入对话框中QSpinBox控件默认显示值

int minValue = -2147483647,

int maxValue = 2147483647, #指定QSpinBoxBox控件的数值范围，最小和最大值

int step = 1, #step指定QSpinBox控件的步进值（即步长）

bool * ok = 0,

Qt::WindowFlags f = 0 ) ;
```

## 5.QInputDialog.getDouble 

```python
double getDouble( QWidget * parent,

const QString & title,

const QString & label, #标签提示

double value = 0,  #指定标准输入对话框中QSpinBox控件默认显示值

double minValue = -2147483647,

double maxValue 2147483647,

int decimals = 1,  #指定QSpinBox控件的浮动数的小数点位数

bool * ok = 0,

Qt::WindowFlags f = 0 ) ;
```

## 6.简单使用

```python
def getInteger(self):
    i, okPressed = QInputDialog.getInt(self, "Get integer","Percentage:", 28, 0, 100, 1)
    if okPressed:
        print(i)
 
def getDouble(self):
    d, okPressed = QInputDialog.getDouble(self, "Get double","Value:", 10.50, 0, 100, 10)
    if okPressed:
        print( d)
 
def getChoice(self):
    items = ("Red","Blue","Green")
    item, okPressed = QInputDialog.getItem(self, "Get item","Color:", items, 0, False)
    if ok and item:
        print(item)
 
def getText(self):
    text, okPressed = QInputDialog.getText(self, "Get text","Your name:", QLineEdit.Normal, "")
    if okPressed and text != '':
        print(text)
```

