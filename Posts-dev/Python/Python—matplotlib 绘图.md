---
title: Python—matplotlib 绘图
date: 2021-11-23
author: LM
tags: ["Python"]
---

> [ Python绘图与可视化 @小杜同学的嘚啵嘚 ](https://www.cnblogs.com/dudududu/p/9149762.html)

## 1.使用 Matplotlib 进行绘图

所谓“一图胜千言”，我们很多时候需要通过可视化的方式查看、分析数据，我们可以导入 Matplotlib 包，并通过 Pyplot 对 Matplotlib 进行操作来绘图

安装：pip install matplotlib

```
import matplotlib.pyplot as plt  # 约定俗成的写法 plt
# 首先定义两个函数（正弦&余弦）
import numpy as np

X=np.linspace(-np.pi,np.pi,256,endpoint=True)  # -π，to+π 的 256 个值
C,S=np.cos(X),np.sin(X)
plt.plot(X,C)
plt.plot(X,S)
plt.show()
```

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205051045261.png)

## 2.绘图命令的基本架构及其属性设置

上面的例子我们可以看出，几乎所有的属性和绘图的框架我们都选用默认设置。其作图时先要定义一个画布，此处的画布就是 Figure，然后再把其他素材“画”到该 Figure 上。

### a.在 Figure 上创建子 plot，并设置属性

```python
x=np.linspace(0,10,1000)  # X轴数据
y1=np.sin(x)     # Y轴数据
y2=np.cos(x**2)  # Y轴数据 x^2即x的平方

plt.figure(figsize=(8,4))

plt.plot(x,y1,label="$sin(x)$",color="red",linewidth=2)  # 将$包围的内容渲染为数学公式
plt.plot(x,y2,"b--",label="$cos(x^2)$")
# 指定曲线的颜色和线性，如‘b--’表示蓝色虚线（b：蓝色，-：虚线）

plt.xlabel("Time(s)")
plt.ylabel("Volt")
plt.title("PyPlot First Example")

'''
使用关键字参数可以指定所绘制的曲线的各种属性：
label：给曲线指定一个标签名称，此标签将在图标中显示。如果标签字符串的前后都有字符'$'，则Matplotlib会使用其内嵌的LaTex引擎将其显示为数学公式
color：指定曲线的颜色。颜色可以用如下方法表示
       英文单词
       以‘#’字符开头的3个16进制数，如‘#ff0000’表示红色。
       以0~1的RGB表示，如（1.0,0.0,0.0）也表示红色。
linewidth：指定权限的宽度，可以不是整数，也可以使用缩写形式的参数名lw。
'''

plt.ylim(-1.5,1.5)
plt.legend() # 显示左下角的图例
plt.show()
```

###  b.在 Figure 上创建多个子 plot

如果需要绘制多幅图表的话，可以给 Figure 传递一个整数参数指定图表的序号，如果所指定序号的绘图对象已经存在的话，将不创建新的对象，而只是让它成为当前绘图对象。

```python
fig1=plt.figure(2)
plt.subplot(211)
# subplot(211)把绘图区域等分为2行*1列共两个区域，然后在区域1（上区域）中创建一个轴对象
plt.subplot(212)
# 在区域2（下区域）创建一个轴对象
plt.show()
```

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205051045627.png)

我们还可以通过命令再次拆分这些块（相当于 Word 中拆分单元格操作）

```python
f1=plt.figure(5)# 弹出对话框时的标题，如果显示的形式为弹出对话框的话
plt.subplot(221)
plt.subplot(222)
plt.subplot(212)
plt.subplots_adjust(left=0.08,right=0.95,wspace=0.25,hspace=0.45)
# subplots_adjust的操作时类似于网页css格式化中的边距处理，左边距离多少？
# 右边距离多少？这取决于你需要绘制的大小和各个模块之间的间距
plt.show()
```

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205051045413.png)



### c.通过 Axes 设置当前对象 plot 的属性

以上我们操作的是在 Figure 上绘制图案，但是当我们绘制图案过多，又需要选取不同的小模块进行格式化设置时，Axes 对象就能很好地解决这个问题。

```python
fig,axes=plt.subplots(nrows=2,ncols=2)
plt.show()
```

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205051046698.png)

现在我们需要通过命令来操作每个 plot（subplot），设置它们的 title 并删除横纵坐标值。

```python
fig,axes=plt.subplots(nrows=2,ncols=2)
axes[0,0].set(title='Upper Left')
axes[0,1].set(title='Upper Right')
axes[1,0].set(title='Lower Left')
axes[1,1].set(title='Lower Right')

# 通过Axes的flat属性进行遍历
for ax in axes.flat:
    ax.set(xticks=[],yticks=[])
    # xticks和yticks设置为空置
plt.show()
```

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202205051046875.png)

另外，实际来说，plot 操作的底层操作就是 Axes 对象的操作，只不过如果我们不使用 Axes 而用 plot 操作时，它默认的是 plot.subplot(111)，也就是说 plot 其实是 Axes 的特例。

### d.保存 Figure 对象

最后一项操作就是保存，我们绘图的目的是用在其他研究中，或者希望可以把研究结果保存下来，此时需要的操作时 save。

```python
plt.savefig(r"C:\Users\123\Desktop\save_test.png",dpi=520)
# 默认像素dpi是80
```

很明显保存的像素越高，内存越大。此处只是用了 savefig 属性对 Figure 进行保存。

另外，除了上述的基本操作之外，Matplotlib 还有其他的绘图优势，此处只是简单介绍了它在绘图时所需要注意的事项，更多的属性设置请参考：[https://matplotlib.org/api/](https://matplotlib.org/api/)

