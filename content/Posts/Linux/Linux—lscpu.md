---
title: Linux—lscpu
date: 2021-11-15
author: LM
tags: ["Linux"]
---

> [ lscpu 中 socket、core、thread 的意义 @Whosemario的家](http://whosemario.github.io/2016/05/20/lscpu-cmd)

## 1.lscpu

Linux 上使用 lscpu 可以查看CPU的信息

```
> lscpu
```

执行命令后会输出以下结果

```
Architecture:          x86_64
CPU op-mode(s):        32-bit, 64-bit
Byte Order:            Little Endian
CPU(s):                32
On-line CPU(s) list:   0-31
Thread(s) per core:    2
Core(s) per socket:    8
Socket(s):             2
NUMA node(s):          2
Vendor ID:             GenuineIntel
CPU family:            6
Model:                 62
Model name:            Intel(R) Xeon(R) CPU E5-2640 v2 @ 2.00GHz
Stepping:              4
CPU MHz:               1320.468
CPU max MHz:           2500.0000
CPU min MHz:           1200.0000
BogoMIPS:              4000.99
Virtualization:        VT-x
L1d cache:             32K
L1i cache:             32K
L2 cache:              256K
L3 cache:              20480K
NUMA node0 CPU(s):     0-7,16-23
NUMA node1 CPU(s):     8-15,24-31
```

##### 2.Socket

Socket 就是主板上插 CPU 的槽的数量

##### 3.Core

Core 就是平时说的核，双核、四核等，就是每个 CPU 上的核数

##### 4.Thread

Thread 就是每个 Core 上的硬件线程数，即超线程

对操作系统来说，其逻辑 CPU 的数量就是 Socket*Core*Thread