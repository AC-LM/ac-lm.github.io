---
title: Zabbix(3)—监控模式
date: 2022-01-20
author: LM
tags: ["Zabbix"]
---

## 1.Zabbix 的主动监控和被动监控

zabbix 默认采用的是被动监控，zabbix 的主动和被动都是对被监控端主机而言的！

### a.被动监控

Server 向 Agent 发起连接，发送监控 key，Agent 接受请求，响应监控数据。

### b.主动监控

Agent 向 Server 发起连接，Agent 请求需要检测的监控项目列表，Server 响应 Agent 发送一个 items 列表，Agent 确认收到监控列表，TCP 连接完成，会话关闭，Agent 开始周期性地收集数据
这样 Server 不用每次需要数据都连接 Agent，Agent 会自己收集数据并处理数据，Server 仅需要保存数据即可。

