---
title: Python(41)—matplotlib 的 backend
date: 2021-11-24
author: LM
---

> [ matplotlib的backend浅析 @王云峰 ](https://cloud.tencent.com/developer/article/1559466)

## 1.matplotlib 的 backend 浅析

在服务器使用`matplotlib`的时候，可能是因为没有装图形化和显示相关的包的原因，总是会出现`backend`相关的错误。

在 `matplotlib` 中，`frontend` 就是我们写的代码，而 `backend` 就是负责显示我们代码所写图形的底层代码。因为不同使用环境下硬件情况不同，所以后端是跟具体的硬件和显示条件相关的。

## 2.backend 的类别

`backend` 又分为两类，一类是 `interface backend`，又叫做 `interactive backend`，这一类是表示跟显示到屏幕相关的后端；另一类是 `hardcopy backend`，又叫做 `non-interactive backend`，这一类是写入到文件相关的后端。

`non-interactive backend`

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202111051005346.png)

`interactive backend`

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202111051005390.png)

```python
import matplotlib
matplotlib.rcsetup.interactive_bk # 获取 interactive backend
matplotlib.rcsetup.non_interactive_bk # 获取 non-interactive backend
matplotlib.rcsetup.all_backends # 获取 所有 backend
```

## 3.设置 backend

在代码中，有 4 种方式可以来设置 matplotlib 的 backend，而且下列中越后面的设置方式，优先级越高，后面的设置会覆盖前面的设置。  

### a.通过设置 `matplotlibrc` 的配置文件来设置

注意 `matplotlibrc` 文件不一定在你的工程目录下，可以通过如下命令来获取其存放位置:

```python
import matplotlib
matplotlib.get_configdir()
u'/home/yunfeng/.config/matplotlib'
```

得到配置文件路径后，打开这个文件，写入如下一行来设置 backend:

```python
backend : WXAgg   # use wxpython with antigrain (agg) rendering
```

其中的 `WXAgg` 可以换成任意的你的系统支持的 backend 类型。 **注意：backend 不区分大小写**

### b.通过 `MPLBACKEND` 环境变量来设置 backend

```python
# 方式1. 先 export MPLBACKEND 再执行 python 文件
$ export MPLBACKEN='Agg'
$ python works.py

# 方式2. 在 python 命令前加 MPLBACKEND='XXX'
$ MPLBACKEND='Agg' python works.py
```

### c.通过 `-d` 选项来设置

```python
$ python script.py -d backend
```

因为这种方式很容易和脚本内部的参数解析冲突，所以不建议使用这种方式。

### d.通过 `matplotlib.use()` 函数来设置

```python
import matplotlib as mpl
mpl.use('Agg')
```



