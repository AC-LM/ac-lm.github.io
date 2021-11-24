---
title: BUG(23)—Linux 报错 no C compiler found in $PATH
date: 2021-11-17
author: LM
---

## BUG 描述

在 Linux 编译某些程序时，出现报错

`configure: error: no acceptable C compiler found in $PATH`

## Resolution

Linux 缺少合适的编译器

```shell
yum install gcc-c++
```

gcc 为 GNU Compiler Collection 的缩写，可以编译 C 和 C++ 源代码等，它是 GNU 开发的 C 和 C++ 以及其他很多种语言的编译器（最早的时候只能编译 C，后来很快进化成一个编译多种语言的集合，如 Fortran、Pascal、Objective-C、Java、Ada、 Go 等。）

gcc 在编译 C++ 源代码的阶段，只能编译 C++ 源文件，而不能自动和 C++ 程序使用的库链接（编译过程分为编译、链接两个阶段，源程序文件被编译成目标文件，多个目标文件连同库被链接成一个最终的可执行文件，可执行文件被加载到内存中运行）。因此，通常使用 g++ 命令来完成 C++ 程序的编译和连接，该程序会自动调用 gcc 实现编译。

g++ 也能编译 C 源代码，只不过把会把它当成 C++ 源代码。后缀为 .c 的源文件，gcc 把它当作是 C 程序，而 g++ 把它当作是 c++ 程序，后缀为 .cpp 的，两者都会认为是 c++ 程序。注意，虽然 c++ 是 c 的超集，但是两者对语法的要求是有区别的。