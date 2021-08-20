---
title: Python(11)——多线程的使用
date: 2020-12-13
author: LM
---

> 参考原文：[ python 多线程  @虫师 ](https://www.cnblogs.com/fnng/p/3670789.html)

## 1.单线程

在好些年前操作系统处理问题都是单任务的，我想做听音乐和看电影两件事儿，那么一定要先排一下顺序。

```python
#coding=utf-8
import threading
from time import ctime,sleep

def music(func):
    for i in range(2):
        print "I was listening to %s. %s" %(func,ctime())
        sleep(1)

def move(func):
    for i in range(2):
        print "I was at the %s! %s" %(func,ctime())
        sleep(5)

if __name__ == '__main__':
    music(u'爱情买卖')
    move(u'阿凡达')

    print "all over %s" %ctime()
```

我们先听了一首音乐，通过for循环来控制音乐的播放了两次，每首音乐播放需要1秒钟，sleep()来控制音乐播放的时长。接着我们又看了一场电影，每一场电影需要5秒钟，因为太好看了，所以我也通过for循环看两遍。在整个休闲娱乐活动结束后，我通过

```python
print "all over %s" %ctime()
```

看了一下当前时间，差不多该睡觉了

运行结果：

```python
>>> ======================== RESTART ================================
>>> 
I was listening to 爱情买卖. Thu Apr 17 11:48:59 2014
I was listening to 爱情买卖. Thu Apr 17 11:49:00 2014
I was at the 阿凡达! Thu Apr 17 11:49:01 2014
I was at the 阿凡达! Thu Apr 17 11:49:06 2014
all over Thu Apr 17 11:49:11 2014
```

## 2.多线程

科技在发展，时代在进步，我们的CPU也越来越快，能支持同时干多个活；于是，操作系统就进入了多任务时代。我们听着音乐吃着火锅的不在是梦想。

Python提供了两个模块来实现多线程 thread 和 threading ，thread 有一些缺点，在 threading 得到了弥补，所以我们直接学习 threading 就可以了。

引入threadring来同时播放音乐和视频

```python
#coding=utf-8
import threading
from time import ctime,sleep

def music(func):
    for i in range(2):
        print "I was listening to %s. %s" %(func,ctime())
        sleep(1)

def move(func):
    for i in range(2):
        print "I was at the %s! %s" %(func,ctime())
        sleep(5)

threads = []
t1 = threading.Thread(target=music,args=(u'爱情买卖',))
threads.append(t1)
t2 = threading.Thread(target=move,args=(u'阿凡达',))
threads.append(t2)

if __name__ == '__main__':
    for t in threads:
        t.setDaemon(True)
        t.start()

    print "all over %s" %ctime()
```

------------------------------------------------------------------------------------------------------------------

```python
threads = [ ]
t1 = threading.Thread(target=music,args=(u'爱情买卖',))
threads.append(t1)

#创建了threads数组，创建线程t1,使用threading.Thread()方法,在这个方法中调用music方法target=music，args方法对music进行传参。 把创建好的线程t1装到threads数组中。
```

------------------------------------------------------------------------------------------------------------------

```python
for t in threads:
    t.setDaemon(True)
    t.start()
# 最后通过for循环遍历数组。（数组被装载了t1和t2两个线程）
setDaemon()
# setDaemon(True)将线程声明为守护线程，必须在start()方法调用之前设置，如果不设置为守护线程程序会被无限挂起。子线程启动后，父线程也继续执行下去，当父线程执行完最后一条语句print "all over %s" %ctime()后，没有等待子线程，直接就退出了，同时子线程也一同结束
start()
#开始线程活动
```

运行结果：

```python
>>> ========================= RESTART ================================
>>> 
I was listening to 爱情买卖. Thu Apr 17 12:51:45 2014 I was at the 阿凡达! Thu Apr 17 12:51:45 2014  all over Thu Apr 17 12:51:45 2014
```

　　从执行结果来看，子线程（muisc 、move ）和主线程（print "all over %s" %ctime()）都是同一时间启动，但由于主线程执行完结束，所以导致子线程也终止。 

```python
...
if __name__ == '__main__':
    for t in threads:
        t.setDaemon(True)
        t.start()
    
    t.join()

    print "all over %s" %ctime()
# 我们只对上面的程序加了个join()方法，用于等待线程终止。join（）的作用是，在子线程完成运行之前，这个子线程的父线程将一直被阻塞。
# 注意:  join()方法的位置是在for循环外的，也就是说必须等待for循环里的两个进程都结束后，才去执行主进程。
```

运行结果：

```python
>>> ========================= RESTART ================================
>>> 
I was listening to 爱情买卖. Thu Apr 17 13:04:11 2014  I was at the 阿凡达! Thu Apr 17 13:04:11 2014

I was listening to 爱情买卖. Thu Apr 17 13:04:12 2014
I was at the 阿凡达! Thu Apr 17 13:04:16 2014
all over Thu Apr 17 13:04:21 2014
```

从执行结果可看到，music 和move 是同时启动的。开始时间4分11秒，直到调用主进程为4分22秒，总耗时为10秒。从单线程时减少了2秒，我们可以把music的sleep()的时间调整为4秒。

```python
>>> ====================== RESTART ================================
>>> 
I was listening to 爱情买卖. Thu Apr 17 13:11:27 2014I was at the 阿凡达! Thu Apr 17 13:11:27 2014

I was listening to 爱情买卖. Thu Apr 17 13:11:31 2014
I was at the 阿凡达! Thu Apr 17 13:11:32 2014
all over Thu Apr 17 13:11:37 2014
```

子线程启动11分27秒，主线程运行11分37秒。虽然music每首歌曲从1秒延长到了4 ，但通多程线的方式运行脚本，总的时间没变化。
