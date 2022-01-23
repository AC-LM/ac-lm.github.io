---
title: Zabbix(2)—Agent 部署
date: 2022-01-21
author: LM
---

> 参考：[下载Zabbix](https://www.zabbix.com/cn/download)

## 1.部署（环境 CentOS7）

```shell
rpm -Uvh https://repo.zabbix.com/zabbix/5.4/rhel/7/x86_64/zabbix-release-5.4-1.el7.noarch.rpm
yum clean all
yum install zabbix-agent
systemctl restart zabbix-agent
systemctl enable zabbix-agent
```

## 2.检查

```shell
# 服务监听
netstat -lntup|grep 10050
# 配置文件
vim /etc/zabbix/zabbix_agentd.conf
grep "^[a-Z]" /etc/zabbix/zabbix_agentd.conf
# 日志
tail -f /var/log/zabbix/zabbix_agentd.log
```

## 3.部署（环境 Windows）

```cmd
# 安装
zabbix_agentd.exe -c zabbix_agentd.win.conf -i
# 启动
zabbix_agentd.exe -s
# 卸载
zabbix_agentd.exe -d
```

