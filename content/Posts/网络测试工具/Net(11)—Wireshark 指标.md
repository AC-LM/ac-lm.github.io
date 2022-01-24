---
title: Net(11)—Wireshark 指标
date: 2021-11-23
author: LM
tags: ["网络测试"]
---

## 1.WireShark 出现的常见提示

### a.TCP Out_of_Order

一般来说是网络拥塞，导致顺序包抵达时间不同，延时太长，或者包丢失，需要重新组合数据单元，因为他们可能是由不同的路径到达你的电脑上面。

### b.TCP Retransmission

超时引发的数据重传。

### c.TCP dup ack XXX#X

重复应答 # 前的报文，表示报文到哪个序号丢失，# 后面的是表示第几次丢失。

### d.tcp previous segment not captured

报文没有捕捉到，出现报文的丢失。

### e.SYN

同步比特，建立连接。

### f.ACK

确认比特，置1表示这是一个确认的TCP包，0则不是。

### g.PSH

推送比特，当发送端PSH=1时，接收端应尽快交付给应用进程。

