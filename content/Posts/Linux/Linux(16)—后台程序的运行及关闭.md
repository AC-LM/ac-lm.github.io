---
title: Linux(16)—后台程序的运行及关闭
date: 2021-05-13
author: LM
tags: ["Linux"]
---

## 1.实现后台执行程序

```python
#后台执行程序
nohup python test.py > run.log 2>&1 &
#查看后台程序
ps aux |grep "test.sh"  
# a:显示所有程序  u:以用户为主的格式来显示   x:显示所有程序，不以终端机来区分
ps -ef |grep "test.sh"  
# -e显示所有进程。-f全格式。
# 关闭后台程序kill 1001
kill -9 1001 #-9表示强制关闭
# 根据名称删除
pkill -f Chrome
# kill 对应的是 PID
# pkill 对应的是COMMAND
```

## 2.linux后台运行命令nohup和&的区别

- **&**：表示程序在后台运行，当执行./a.out & 的时候，即使你使用ctrl+C，a.out照样运行（因为对SIGINT信号免疫）。但是要注意，如果你直接关掉shell，那么，a.out进程会停止关闭。可见，&的后台并不硬（因为对SIGHUP信号不免疫）。
- **nohup**：表示的是忽略SIGHUP信号，所以当运行nohup ./a.out时，关闭shell，a.out还是在运行（对SIGHUP信号免疫）。但是，如果直接在shell中使用Ctrl+C，那么，a.out进程会停止关闭（因为对SIGINT信号不免疫）

所以， &和nohup两者并没有直接关系， 要让进程真正不受shell中Ctrl+C和shell关闭的影响，最好是使用命令 nohua ./a.out & 