# matplotlib的backend浅析

> [matplotlib的backend浅析 - 云+社区 - 腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1559466)

在服务器使用`matplotlib`的时候，可能是因为没有装图形化和显示相关的包的原因，总是会出现`backend`相关的错误。所以我调查了下matplotlib中的backend的含义，以及如何处理相关的错误。

### matplotlib中的backend

matplotlib中，frontend就是我们写的python代码，而backend就是负责显示我们代码所写图形的底层代码。因为不同使用环境下硬件情况不同，所以后端是跟具体的硬件和显示条件相关的。

### backend的类别

backend又分为两类，一类是`interface backend`，又叫做`interactive backend`，这一类是表示跟显示到屏幕相关的后端；另一类是`hardcopy backend`，又叫做`non-interactive backend`，这一类是写入到文件相关的后端。下面两图分别是non-interactive backend和interactive backend的具体值：

![](https://gitee.com/LM-J/drawingbed/raw/master/img/202111051005346.png)



![](https://gitee.com/LM-J/drawingbed/raw/master/img/202111051005390.png)



```
import matplotlib
matplotlib.rcsetup.interactive_bk # 获取 interactive backend
matplotlib.rcsetup.non_interactive_bk # 获取 non-interactive backend
matplotlib.rcsetup.all_backends # 获取 所有 backend
```



### 设置backend

有4种方式可以来设置matplotlib的backend，而且下列越后面的设置方式，优先级越高，也就是后面的设置会覆盖前面的设置。  

#### 1. 通过设置`matplotlibrc`的配置文件来设置

注意`matplotlibrc`文件不一定在你的家目录下，可以通过如下命令来获取其存放位置:

```javascript
import matplotlib
matplotlib.get_configdir()
u'/home/yunfeng/.config/matplotlib'
```

得到配置文件路径后，打开这个文件，写入如下一行来设置backend:

```javascript
backend : WXAgg   # use wxpython with antigrain (agg) rendering
```

其中`WXAgg`可以换成任意的你的系统支持的backend类型。 **注意：在backend的名字中是不区分大小写的，所以**`**Qt4Agg**`**和**`**qt4agg**`**是等价的。**

#### 2. 通过`MPLBACKEND`环境变量来设置backend

下面两种方式都可以:

```javascript
## 方式1. 先export MPLBACKEND在执行python文件
$ export MPLBACKEN='Agg'
$ python works.py

## 方式2. 在python命令前加MPLBACKEND='XXX'
$ MPLBACKEND='Agg' python works.py
```

#### 3. 通过`-d`选项来设置

使用方法如下：

```javascript
$ python script.py -dbackend
```

因为这种方式很容易和脚本内部的参数解析冲突，所以不建议使用这种方式，而是通过`MPLBACKEND`参数的方式2来设置。

#### 4. 通过`matplotlib.use()`函数来设置

使用方式如下：

```javascript
import matplotlib as mpl
mpl.use('Agg')
```

**再次提醒下，注意这4种方式的优先级：4>3>2>1，后面的设置会覆盖前面的设置。**



