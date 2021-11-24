---
title: Linux(26)—Linux 网络配置
date: 2021-11-22
author: LM
---

## 1.启动网卡

```sh
vim /etc/sysconfig/network-scripts/ifcfg-ens33
```
在文件夹`/etc/sysconfig/network-scripts/`中`ifcfg-lo`是回环网卡，`ifcfg-ens33`就是`eth0`。

编辑`ifcfg-ens33`，将`ONBOOT`改为`yes`，重新启动网卡，检查网络

```
service network restart
ping 114.114.114.114
```

## 2.安装 net-tools，使用 ifconfig

```
yum install net-tools
ifconfig
```

## 3.启动 SSH

```
service sshd start
```

