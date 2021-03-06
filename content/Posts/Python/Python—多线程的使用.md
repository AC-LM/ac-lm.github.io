---
title: Python—多线程的使用
date: 2020-12-13
author: LM
tags: ["Python"]
---

> 参考原文：[ python 多线程  @虫师 ](https://www.cnblogs.com/fnng/p/3670789.html)

## 1.单线程

单线程执行任务时需要进行排序，比如下面代码中的听音乐和看电影两件事。

```python
# coding=utf-8
from time import ctime,sleep

def music(func):
    for i in range(2):
        print(f"I was listening to {func}! {ctime()}")
        sleep(1)

def move(func):
    for i in range(2):
        print(f"I was at the {func}! {ctime()}")
        sleep(5)

if __name__ == '__main__':
    music('爱情买卖')
    move('阿凡达')
    
    print(f"all over {ctime()}")
```

在执行时，先执行听音乐这件事，通过`for`循环来控制音乐播放两次，每首音乐播放需要1秒钟。接着执行看电影，每一场电影需要5秒钟，同样通过`for`循环看两遍。最后输出结束时间。

运行结果：

```shell
>>> ======================== RESTART ================================
>>> 
I was listening to 爱情买卖! Thu Apr 17 11:48:59 2014
I was listening to 爱情买卖! Thu Apr 17 11:49:00 2014
I was at the 阿凡达! Thu Apr 17 11:49:01 2014
I was at the 阿凡达! Thu Apr 17 11:49:06 2014
all over Thu Apr 17 11:49:11 2014
```

## 2.多线程

在多线程中，我们同时执行多个任务！`Python`中可以使用`threading` 来实现多线程，示例代码如下：

```python
#coding=utf-8
import threading
from time import ctime,sleep

def music(func):
    for i in range(2):
        print(f"I was listening to {func}! {ctime()}")
        sleep(1)

def move(func):
    for i in range(2):
        print(f"I was at the {func}! {ctime()}")
        sleep(5)

if __name__ == '__main__':
    threads = []
    t1 = threading.Thread(target=music, args=('爱情买卖',))
    threads.append(t1)
    t2 = threading.Thread(target=move, args=('阿凡达',))
    threads.append(t2)
    for t in threads:
        t.setDaemon(True)
        t.start()

    print(f"all over {ctime()}")
```

------------------------------------------------------------------------------------------------------------------

```python
threads = []
t1 = threading.Thread(target=music, args=('爱情买卖',))
threads.append(t1)

# 创建了 threads 数组，创建线程 t1,使用 threading.Thread() 方法，在这个方法中调用 music 方法 target=music，args 方法对 music 进行传参。把创建好的线程 t1 装到 threads 数组中。
```

------------------------------------------------------------------------------------------------------------------

```python
for t in threads:
    t.setDaemon(True)
    t.start()
# 最后通过 for 循环遍历数组。（数组被装载了t1和t2两个线程）
setDaemon()
# setDaemon(True) 将线程声明为守护线程，必须在 start() 方法调用之前设置，如果不设置为守护线程程序会被无限挂起。子线程启动后，父线程也继续执行下去，当父线程执行完最后一条语句后，没有等待子线程，直接就退出了，同时子线程也一同结束
start()
# 开始线程活动
```

运行结果：

```shell
>>> ========================= RESTART ================================
>>> 
I was listening to 爱情买卖. Thu Apr 17 12:51:45 2014 
I was at the 阿凡达! Thu Apr 17 12:51:45 2014
all over Thu Apr 17 12:51:45 2014
```

从执行结果来看，子线程和主线程都是同一时间启动，但由于主线程执行完结束，所以导致子线程也终止。 

```python
...
if __name__ == '__main__':
    for t in threads:
        t.setDaemon(True)
        t.start()
    for t in threads:
        t.join()

    print(f"all over {ctime()}")
# 我们只对上面的程序加了个 join() 方法，用于等待线程终止。join() 的作用是，在子线程完成运行之前，这个子线程的父线程将一直被阻塞。
# 注意: join() 方法的位置是在 for 循环外的，也就是说必须等待 for 循环里的两个进程都结束后，才去执行主进程。
```
