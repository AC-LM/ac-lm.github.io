---
title: PyQt5(12)——消息对话框类QMessageBox
date: 2020-12-15
author: LM
---

## 1.QMessageBox

```python
information(QWdiget parent,title,text,buttons,defaultButton) #| 弹出消息对话框                    
question（QWidget parent,title,text,buttons,defaultButton）  #| 弹出问答对话框
warning（QWidget parent,title,text,buttons,defaultButton）   #| 弹出警告对话框                       
critical（QWidget parent,title,text,buttons,defaultButton）  #| 弹出严重错误对话框                     
about（QWidget parent,title,text）                           #| 弹出关于对话框   
# 参数------------------------------------------------------------------------------
parent：指定的父窗口控件
title：对话框标题
text：对话框文本
buttons：标准按钮，默认为ok按钮，可以有多个，用 | 进行分隔
defaultButton：关闭对话框默认返回的按钮
# 方法------------------------------------------------------------------------------
setTitle()  # 设置标题
setText()   # 设置正文消息
setIcon()   # 设置弹出对话框的图片                                            
```

## 2.QMessageBox的标准按钮类型

```python
QMessage.Ok     #| 同意操作 |
QMessage.Cancel #| 取消操作 |
QMessage.Yes    #| 同意操作 |
QMessage.No     #| 取消操作 |
QMessage.Abort  #| 终止操作 |
QMessage.Retry  #| 重试操作 |
QMessage.Ignore #| 忽略操作 |
```

## 3.使用实例

```python
#弹出消息对话框
reply = QMessageBox.information(self, '标题','消息对话框正文',QMessageBox.Yes | QMessageBox.No,QMessageBox.Yes)
reply1 = QMessageBox.question(self, "标题", "提问框消息正文", QMessageBox.Yes | QMessageBox.No, QMessageBox.Yes)
reply2 = QMessageBox.warning(self, "标题", "警告框消息正文", QMessageBox.Yes | QMessageBox.No, QMessageBox.Yes)
reply3 = QMessageBox.critical(self, "标题", "严重错误对话框消息正文", QMessageBox.Yes | QMessageBox.No, QMessageBox.Yes)
reply4 = QMessageBox.about(self, "标题", "关于对话框消息正文")
reply?.exec_()
```
