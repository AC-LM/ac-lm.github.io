

网卡

```
vim /etc/sysconfig/network-scripts/ifcfg-ens33 ifcfg-lo
ps: ifcfg-ens33 ifcfg-lo;ifcfg-lo是回环网卡，ifcfg-ens33就是eth0
```

将ONBOOT改为yes；开机自启动

```
service network restart
ping 114.114.114.114
```

### 安装net-tools

```
yum install net-tools
ifconfig
```

## 启动SSH

```
service sshd start
```

