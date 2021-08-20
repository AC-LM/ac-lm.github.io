---
title: Python(10)——子类的super初始化
date: 2020-12-12
author: LM
---

## 1.使用场景

```python
class mywindow(QtWidgets.QMainWindow, Ui_MainWindow):
    def __init__(self):
        super(mywindow, self).__init__()
        self.setupUi(self)
# 寻找mywindow的父类QtWidgets.QMainWindow中的__init__()，进行对mywindow的初始化
```

## 2.解析

```python
# python中的super(Net, self).__init__() 其执行时
# 首先找到Net的父类（比如是类NNet），然后把类Net的对象self转换为类NNet的对象，然后“被转换”的类NNet对象调用自己的init函数
```

这是对继承自父类的属性进行初始化，使用父类的初始化方法来初始化继承的属性。

