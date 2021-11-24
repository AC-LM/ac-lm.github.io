---
title: Python(10)—子类的 super 初始化
date: 2020-12-12
author: LM
---

## 1.使用场景

```python
class mywindow(QtWidgets.QMainWindow, Ui_MainWindow):
    def __init__(self):
        super(mywindow, self).__init__()
        self.setupUi(self)
# 寻找 mywindow 的父类 QtWidgets.QMainWindow 中的 __init__()，进行对 mywindow 的初始化
```

## 2.解析

```python
# python 中的 super(Net, self).__init__() 其执行时
# 首先找到 Net 的父类（比如是类 NNet），然后把类 Net 的对象 self 转换为类 NNet 的对象，然后“被转换”的类 NNet 对象调用自己的 init函数
```

这是对继承自父类的属性进行初始化，使用父类的初始化方法来初始化继承的属性。

