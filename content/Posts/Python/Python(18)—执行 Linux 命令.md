---
title: Python(18)—执行 Linux 命令
date: 2021-01-14
author: LM
tags: ["Python"]
---

## 1.subprocess 模块

根据 Python 官方文档说明，subprocess模块用于取代下面这些模块。推荐使用

```python
>>> from subprocess import call  
>>> call(["ls", "-l"])
```

## 2.os 模块的 system 方法

system方法会创建子进程运行外部程序，方法只返回外部程序的运行结果。这个方法比较适用于外部程序没有输出结果的情况。

```python
>>> import os  
>>> os.system("echo \"Hello World\"")   # 直接使用os.system调用一个echo命令  
Hello World         ——————> 打印命令结果  
0                   ——————> What's this ? 返回值？  
>>> val = os.system("ls -al | grep \"log\" ")   # 使用val接收返回值  
-rw-r--r--  1 root       root       6030829 Dec 31 15:14 log    ——————> 此时只打印了命令结果  
>>> print val             
0                   ——————> 注意，此时命令正常运行时，返回值是0  
>>> val = os.system("ls -al | grep \"log1\" ")  
>>> print val         
256                 ——————> 使用os.system调用一个没有返回结果的命令，返回值为256～  
>>>   
```

## 3.os 模块的 popen 方法

当需要得到外部程序的输出结果时，本方法非常有用，返回一个类文件对象，调用该对象的read()或readlines()方法可以读取输出内容。比如使用urllib调用Web API时，需要对得到的数据进行处理。os.popen(cmd) 要得到命令的输出内容，只需再调用下read()或readlines()等 如a=os.popen(cmd).read()

```python
>>> os.popen('ls -lt')                  # 调用os.popen（cmd）并不能得到我们想要的结果  
<open file 'ls -lt ', mode 'r' at 0xb7585ee8>  
>>> print os.popen('ls -lt').read()     # 调用read()方法可以得到命令的结果  
total 6064  
-rwxr-xr-x 1 long       long            23 Jan  5 21:00 hello.sh  
-rw-r--r-- 1 long       long           147 Jan  5 20:26 Makefile  
drwxr-xr-x 3 long       long          4096 Jan  2 19:37 test  
-rw-r--r-- 1 root       root       6030829 Dec 31 15:14 log  
drwxr-xr-x 2 long       long          4096 Dec 28 09:36 pip_build_long  
drwx------ 2 Debian-gdm Debian-gdm    4096 Dec 23 19:08 pulse-gylJ5EL24GU9  
drwx------ 2 long       long          4096 Jan  1  1970 orbit-long  
>>> val = os.popen('ls -lt').read()     # 使用变量可以接收命令返回值  
>>> if "log" in val:                    # 我们可以使用in来判断返回值中有木有一个字符串  
...     print "Haha,there is the log"  
... else:  
...     print "No,not happy"  
...  
Haha,there is the log  
```

