---
title: 随记—Grafana + Loki 搭建日志监控系统
date: 2022-06-22
author: LM
tags: ["随记"]
---

> 参考原文：[ PLG日志平台搭建: Promtail + Loki + Grafana 全步骤_@dxccccccccccc ](https://blog.csdn.net/fwzzzzz/article/details/119003585)

## 1.监控系统组成

### 1.Grafana

Grafana 是由 Grafana Labs 公司开源的一个监控仪表系统。它可以帮助用户简化监控的复杂度，用户只需提供数据，便可以生成各种可视化仪表。同时还支持报警功能，可以在系统出现问题时通知用户。

### 2.Loki 

Loki 是 Grafana Lab 公司开源的一个水平可扩展、高可用性、多租户的日志聚合系统。提供对日志的收集，建立标签索引的功能，实现对日志的监控。Loki 不主动的监控日志，它仅做收集功能。

### 3.Promtail

为了能够监控日志，需要在被监控机上使用 Promtail。Loki 周期性的从 Promtail 暴露的 HTTP 服务地址中拉取监控样本数据。

### 4.工作原理

![](/drawingbed/img/202206221443693.png)

## 2.Grafana，Loki 安装

Grafana，Loki 使用 docker 安装，以避免环境配置的麻烦。注意：需要映射 loki-config.yaml，/var/lib/grafana 目录到宿主机，以便于后续配置（ 映射目录需要赋予权限，不然容器无法读取写入 ）

```shell
wget https://raw.githubusercontent.com/grafana/loki/v2.5.0/cmd/loki/loki-local-config.yaml -O loki-config.yaml
docker run --name loki -d -v $(pwd):/mnt/config -p 3100:3100 grafana/loki:2.5.0 -config.file=/mnt/config/loki-config.yaml
mkdir /root/grafana
chmod 777 /root/grafana
docker run -d -p 3000:3000 --net=grafana --name=grafana --privileged=true -v /root/grafana:/var/lib/grafana grafana/grafana-oss
```

容器正常启动后，访问 IP:9090，IP:3100/metrics，IP/ready，Grafana 默认账号密码 admin-admin，

## 3.Promtail 安装

Promtail 的安装可以前往：[https://github.com/grafana/loki/releases](https://github.com/grafana/loki/releases)，下载对应的二进制文件，解压并执行。注意：需要将配置文件下载至对应文件夹，并指定需要监控的日志文件地址。

```shell
wget https://raw.githubusercontent.com/grafana/loki/v2.5.0/clients/cmd/promtail/promtail-docker-config.yaml -O promtail-config.yaml
```

## 4.Grafana 配置

在 Grafana 中选择 Loki 数据源，进行 Explore 即可对日志进行查找