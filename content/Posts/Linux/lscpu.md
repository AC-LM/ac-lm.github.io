

[lscpu中的 socket、core、thread的意义 | Whosemario的家](http://whosemario.github.io/2016/05/20/lscpu-cmd/#:~:text=Thread (s) per core%3A 2 Core (s) per,什么是Socket. Socket就是主板上插CPU的槽的数量. 什么是Core. Core就是平时说的核，双核、四核等，就是每个CPU上的核数. 什么是Thread. thread就是每个core上的硬件线程数，即超线程. 对操作系统来说，其逻辑CPU的数量就是Socket*Core*Thread. 参考资料.)

Linux上如下指令可以查看CPU的信息

```
> lscpu
```

在我们线上机器上的结果如下：

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

上面的信息，有几个比较有意思：

```
Thread(s) per core:    2
Core(s) per socket:    8
Socket(s):             2
```

##### 什么是Socket

Socket就是主板上插CPU的槽的数量

##### 什么是Core

Core就是平时说的核，双核、四核等，就是每个CPU上的核数

##### 什么是Thread

thread就是每个core上的硬件线程数，即超线程

对操作系统来说，其逻辑CPU的数量就是Socket*Core*Thread

### 参考资料

[1] [Getting CPU architecture information with lscpu](http://diego.assencio.com/?index=614d73283d49e939ebfb648cfb86819d)
[2] [处理器三个概念理解及延伸（socket，core，thread，SMT，CMP，SMP）](http://blog.chinaunix.net/uid-20940095-id-3596134.html)