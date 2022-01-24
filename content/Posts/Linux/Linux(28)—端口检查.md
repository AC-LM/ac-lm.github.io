---
title: Linux(28)—端口检查
date: 2022-01-20
author: LM
tags: ["Linux"]
---

## 1.使用 lsof 检查

`lsof(list open files)`是一个列出当前系统打开文件的工具，可以使用它来查看端口占用情况。

```shell
lsof -i:端口号
```

## 2.使用 netstat 检查

`netstat -tunlp` 用于显示 tcp，udp 的端口和进程等相关情况。

```
netstat -tunlp | grep 端口号
```

- -t (tcp) 仅显示tcp相关选项
- -u (udp)仅显示udp相关选项
- -n 拒绝显示别名，能显示数字的全部转化为数字
- -l 仅列出在Listen(监听)的服务状态
- -p 显示建立相关链接的程序名

