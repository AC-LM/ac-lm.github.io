---
title: Python(16)——ddt 模块
date: 2021-01-06
author: LM
---

## 1.简介

DDT(Data Driven Testing)，数据驱动，简单来说就是测试数据的参数化，在python中DDT以装饰器的形式，结合单元测试一起来使用，用来装饰测试类，为测试用例传递参数

```python
pip install ddt
```

## 2.ddt 的两个方法装饰器

data：包含多个你想要传给测试用例的参数，适用动态参数，把传进来的数组组成元组，再对元组进行用例的遍历，根据索引取值相当于对每个参数进行遍历

file_data：会从json或yaml中加载数据

## 3.ddt 的方法

unpanck：通常data中包含的每一个值都会作为一个单独的参数传给测试方法，如果这些值是用元组或者列表传进来的，可以用unpack方法将其自动分解成多个参数 

```python
@data(a,b)         
# a和b各运行一次用例
@data([a,d],[c,d])
# 如果没有unpack，那么[a,b]当成一个参数传入用例运行
# 如果有unpack，那么[a,b]被分解开，按照用例中的两个参数传递
```

## 4.ddt 的类装饰器 

ddt.ddt：对类使用

## 5.举例

```python
import unittest
import ddt  #第三方库
 
data=[[1,2],[3,4],[5,6]]

@ddt.ddt
class MyTestCase(unittest.TestCase):
    # 只有一个参数时
    @ddt.data(1,2,3)
    def test_01(self,a):
        print(a)
    
    #表示可变参数取值为data([1,2],[3,4],[5,6])，若传参是data,则后面的取值 data([[1,2],[3,4],[5,6]])
    @ddt.data(*data)
    @ddt.unpack
    def test_02(self,a,b):
        print(a,'----',b)
    
    @ddt.data([1,2],[3,4])#和上面的相似，这里未使用变量
    @ddt.unpack
    def test_03(self,a,b):
        print(a, '----', b)
```