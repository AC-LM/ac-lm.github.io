---
title: Python(22)—sys 模块
date: 2021-03-24
author: LM
---

> 参考原文：[ Python sys 模块详解   @轩辕御龙  ](https://zhuanlan.zhihu.com/p/150835014)

## 1.什么是 sys 模块

“sys”即“system”，即“系统”。sys模块为用户提供了一些接口，用于访问 Python 解释器自身使用和维护的变量，同时模块中还提供了一部分函数，可以与解释器进行比较深度的交互。但需要注意的是sys模块针对的是与Python解释器相关的变量和方法，不是主机操作系统。

## 2.sys.argv

“argv”即“argument value”的简写，其是一个列表对象，存储的是在命令行调用 Python 脚本时提供的“命令行参数”。

这个列表中的第一个参数是被调用的脚本名称，也就是说，调用 Python 解释器的“命令”（`python`）本身并没有被加入这个列表当中。这个地方要注意一下，因为这一点跟 C 程序的行为有所不同，C 程序读取命令行参数是从头开始的。

举例来说，在当前目录下新建一个 Python 文件 test.py，其内容为：

```python
import sys
print("The list of command line arguments:\n", sys.argv)
```

在命令行运行该脚本：

```bash
 $ python test.py
 The list of command line arguments:
  ['example.py'] 
```

加上几个参数运行，可以看到参数被获取并输出

```bash
 $ python test.py arg1 arg2 arg3
 The list of command line arguments:
  ['example.py', 'arg1', 'arg2', 'arg3']
```

## 3.sys.path

A list of strings that specifies the search path for modules. Initialized from the environment variable `PYTHONPATH`, plus an installation-dependent default.

该属性是一个由字符串组成的列表，其中各个元素表示的是 Python 搜索模块的路径；在程序启动期间被初始化。

其中第一个元素（也就是path[0]）的值是最初调用 Python 解释器的脚本所在的绝对路径；如果是在交互式环境下查看sys.path的值，就会得到一个空字符串。

命令行运行脚本：

```bash
$ python test.py
The path[0] =  D:\justdopython\sys_example
```

交互式环境查看属性第一个元素：

```bash
>>> sys.path[0]
''
```

## 4.sys.stdin、sys.stdout、sys.stderr

- stdin：用于所有的交互式输入（包括input()函数）。
- stdout：用于print()的打印输出或者input()函数的提示符。
- stderr：用于解释器自己的提示信息和错误信息。

简而言之，这三个属性就是操作系统的标准输入、输出和错误流，它们返回的都是一个“文件类型”对象，支持read()、write()和flush()等操作，就像用open()方法打开的文件对象那样！

```bash
>>> import sys
>>> s = sys.stdin.read()        # 使用ctrl+d结束输入
i like python
end

>>> s
'i like python\nend\n\n\n\n'
>>> sys.stdout.write(s)
i like python
end

21
```

## 5.sys.stdout 与 print()

当我们用input('Please input something！')时，事实上是先输出提示信息，然后捕获输入。 以下两组等价：

```bash
s = input('Please input something！')
----------------------------------------------------------------
print('Please input something！',)  # 逗号表示不换行
s = sys.stdin.readline()[:-1]  # -1 可以抛弃输入流中的'\n' 换行符，自己琢磨一下为什么。
```

## 6.sys.stdin 与 input()

当我们 print(obj) 的时候，事实上是调用了sys.stdout.write(obj+'\n')，将内容打印到控制台（默认是显示器），然后追加一个换行符。以下两行等价：

```bash
sys.stdout.write('hello'+'\n') 
-------------------------------------------------------
print('hello')
```

## 7.从控制台重定向到文件

默认情况下 sys.stdout 指向控制台。如果把文件对象赋值给 sys.stdout，那么 print () 调用的就是文件对象的 write() 方法。

```bash
f_handler = open('out.log', 'w') 
sys.stdout = f_handler 
print('hello')
# 你无法在屏幕上看到“hello”
# 因为它被写到out.log文件里了
```

如果你还想同时在控制台打印的话，最好先将原始的控制台对象引用保存下来，向文件中打印之后再恢复 sys.stdout.

```python
__console__ = sys.stdout    # 保存控制台
# redirection start #       # 去干点别的，比如写到文件里
... 
# redirection end           # 干完别的了，恢复原来的控制台
sys.stdout = __console__
```

## 8.其他指令

```python
sys.argv    #获取命令行参数列表，第一个元素是程序本身
sys.exit(n) #退出Python程序，exit(0)表示正常退出。当参数非0时，会引发一个SystemExit异常，可以在程序中捕获该异常
sys.version #获取Python解释程器的版本信息
sys.maxsize #最大的Int值，64位平台是2**63 - 1
sys.path    #返回模块的搜索路径，初始化时使用PYTHONPATH环境变量的值
sys.platform    #返回操作系统平台名称
sys.stdin   #输入相关
sys.stdout  #输出相关
sys.stderr  #错误相关
sys.exc_info()  #返回异常信息三元元组
sys.getdefaultencoding()    #获取系统当前编码，默认为utf-8
sys.setdefaultencoding()    #设置系统的默认编码
sys.getfilesystemencoding() #获取文件系统使用编码方式，默认是utf-8
sys.modules #以字典的形式返回所有当前Python环境中已经导入的模块
sys.builtin_module_names    #返回一个列表，包含所有已经编译到Python解释器里的模块的名字
sys.copyright   #当前Python的版权信息
sys.flags   #命令行标识状态信息列表。只读。
sys.getrefcount(object) #返回对象的引用数量
sys.getrecursionlimit() #返回Python最大递归深度，默认1000
sys.getsizeof(object[, default])    #返回对象的大小
sys.getswitchinterval() #返回线程切换时间间隔，默认0.005秒
sys.setswitchinterval(interval) #设置线程切换的时间间隔，单位秒
sys.getwindowsversion() #返回当前windwos系统的版本信息
sys.hash_info   #返回Python默认的哈希方法的参数
sys.implementation  #当前正在运行的Python解释器的具体实现，比如CPython
sys.thread_info #当前线程信息
```

