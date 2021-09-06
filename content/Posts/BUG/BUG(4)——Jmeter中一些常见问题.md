---
title: BUG(4)——Jmeter中一些常见问题
date: 2020-11-28
author: LM
---

## 运行内存配置修改

```shell
if not defined HEAP (
    rem See the unix startup file for the rationale of the following parameters,
    rem including some tuning recommendations
    set HEAP=-Xms5g -Xmx5g -XX:MaxMetaspaceSize=5120m
)
```

修改bat文件中HEAP值。HEAP=-Xms**5g** -Xmx**5g**，最小与最大运行内存，通常设为同样的值。MaxMetaspaceSize 最大堆栈 。

## 端口被突然关闭 socket closed

原因：发送http 请求时，Jmeter一般默认选择Use KeepAlive，保持连接协议，但其配置JMeter.properties中时间设置默认注销，即不会等待，一旦连接空闲，则断开了，因此导致报错


解决：修改httpclient4.idletimeout=<time in ms> ，一般可设置成10-60s（表示连接空闲10s后才会断开），注意单位ms。

## 地址被占用 address already in use:connect

错误：脚本报错java.net.BindException: Address already in use: connect

原因：windows端口被耗尽（默认1024-5000），而且操作系统要 2~4分钟才会重新释放这些端口，所以可以增加windows的可用端口来解决。windows端口最大数为65534

解决：修改操作系统注册表(cmd-regedit)，找到

```shell
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\TCPIP\Parameters
```

新建两个 DWORD值

```shell
name：MaxUserPort，value：65534（十进制）；
name：TcpTimedWaitDelay，value：30（十进制）；
```

重启系统。

【或设置线程组时，勾选 same user on each iteration】 

【或不勾选Use KeepAlive】

## 每个用户使用一个线程 Same user on each iteration

每个迭代使用相同线程

性能测试时需要设置N个线程数，然后循环M次，以此来模拟真实同时N多个用户使用被测系统。在现实中，这N个用户应该都是相互独立，互不关联的。而我们用jmeter设置N个线程数，循环M次，目的就是想模拟这样N个互不关联的用户使用被测系统，但jmeter做性能测试时，使用多线程循环迭代多次，并不是我们理想中的真实场景，jmeter会使用以创建的旧进程重新发送请求以节省资源。

在jmeter5.2版本的线程组设置中，新增了一个复选配置项：Same user on each iteration（默认为勾选），同时，在cookie管理器、缓存管理器、授权管理器的配置选项中，也都增加了一个复选配置项：Use Thread Group configuration to control clearing：

1、在线程组配置时，要去掉默认的Same user on each iteration 的勾选；

2、在cookie管理器配置中，要勾选Use Thread Group configuration to control cookie clearing

这样配置后，实现更真实的模拟了大量用户访问被测系统的情况。
