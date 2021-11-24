---
title: 随记(17)——Linux最多支持多少TCP连接
date: 2020-12-08
author: LM
---

> 参考原文：[ 一台Linux服务器最多能支撑多少个TCP连接？ @PHP饭米粒 ](https://mp.weixin.qq.com/s/J0Abwz20IO9N0NxooSEKXQ)

## 1.并发问题

在网络开发中，有这样一个基础问题始终没有彻底搞明白。那就是一台服务器最大究竟能支持多少个网络连接？

很多同学看到这个问题的第一反应是65535。原因是：“听说端口号最多有65535个，那长连接就最多保持65535个了”。是这样的吗？还有的人说：“应该受TCP连接里四元组的空间大小限制，算起来是200多万亿个！”

## 2.一次关于服务器端并发的聊天

![](https://gitee.com/LM-J/drawingbed/raw/master/img/996.png)

"TCP连接四元组是源IP地址、源端口、目的IP地址和目的端口。任意一个元素发生了改变，那么就代表的是一条完全不同的连接了。拿我的Nginx举例，它的端口是固定使用80。另外我的IP也是固定的，这样目的IP地址、目的端口都是固定的。剩下源IP地址、源端口是可变的。所以理论上我的Nginx上最多可以建立2的32次方（ip数）×2的16次方（port数）个连接。这是两百多万亿的一个大数字！！"

![](https://gitee.com/LM-J/drawingbed/raw/master/img/997.png)

"进程每打开一个文件（linux下一切皆文件，包括socket），都会消耗一定的内存资源。如果有不怀好心的人启动一个进程来无限的创建和打开新的文件，会让服务器崩溃。所以linux系统出于安全角度的考虑，在多个位置都限制了可打开的文件描述符的数量，包括系统级、用户级、进程级。这三个限制的含义和修改方式如下："

- 系统级：当前系统可打开的最大数量，通过fs.file-max参数可修改
- 用户级：指定用户可打开的最大数量，修改/etc/security/limits.conf
- 进程级：单个进程可打开的最大数量，通过fs.nr_open参数可修改

![](https://gitee.com/LM-J/drawingbed/raw/master/img/998.png)

"我的接收缓存区大小是可以配置的，通过sysctl命令就可以查看。"

```
$ sysctl -a | grep rmem
net.ipv4.tcp_rmem = 4096 87380 8388608
net.core.rmem_default = 212992
net.core.rmem_max = 8388608
```

"其中在tcp_rmem"中的第一个值是为你们的TCP连接所需分配的最少字节数。该值默认是4K，最大的话8MB之多。也就是说你们有数据发送的时候我需要至少为对应的socket再分配4K内存，甚至可能更大。"

![](https://gitee.com/LM-J/drawingbed/raw/master/img/999.png)

"TCP分配发送缓存区的大小受参数net.ipv4.tcp_wmem配置影响。"

```
$ sysctl -a | grep wmem
net.ipv4.tcp_wmem = 4096 65536 8388608
net.core.wmem_default = 212992
net.core.wmem_max = 8388608
```

"在net.ipv4.tcp_wmem"中的第一个值是发送缓存区的最小值，默认也是4K。当然了如果数据很大的话，该缓存区实际分配的也会比默认值大。"

![](https://gitee.com/LM-J/drawingbed/raw/master/img/995.png)

## 3.服务器百万连接达成记

![](https://gitee.com/LM-J/drawingbed/raw/master/img/994.png)

“准备啥呢，还记得前面说过Linux对最大文件对象数量有限制，所以要想完成这个实验，得在用户级、系统级、进程级等位置把这个上限加大。我们实验目的是100W，这里都设置成110W，这个很重要！因为得保证做实验的时候其它基础命令例如ps，vi等是可用的。“

![](https://gitee.com/LM-J/drawingbed/raw/master/img/993.png)

![](https://gitee.com/LM-J/drawingbed/raw/master/img/990.png)

活动连接数量确实达到了100W：

```
$ ss -n | grep ESTAB | wc -l  
1000024
```

当前机器内存总共是3.9GB，其中内核Slab占用了3.2GB之多。MemFree和Buffers加起来也只剩下100多MB了：

```
$ cat /proc/meminfo
MemTotal:        3922956 kB
MemFree:           96652 kB
MemAvailable:       6448 kB
Buffers:           44396 kB
......
Slab:          3241244KB kB
```

通过slabtop命令可以查看到densty、flip、sock_inode_cache、TCP四个内核对象都分别有100W个：

![](https://gitee.com/LM-J/drawingbed/raw/master/img/991.png)

![](https://gitee.com/LM-J/drawingbed/raw/master/img/20210622173837.png)

