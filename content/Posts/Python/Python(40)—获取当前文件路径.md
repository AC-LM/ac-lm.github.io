---
title: Python(40)——获取当前文件路径
date: 2021-11-21
author: LM
---

## 1.`sys.path[0]`

获取文件当前工作目录路径（绝对路径）

## 2.`__file__`

获得文件所在的路径（由系统决定是否是全名）

## 3.`os.path.abspath(__ file __)`

获得文件所在的路径（绝对路径）

## 4.`os.path.split(os.path.realpath(__ file __))`

将文件路径名称分成头和尾一对，生成二元元组（文件目录，文件名）
