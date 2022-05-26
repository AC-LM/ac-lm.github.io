---
title: 随记—CPU 系统架构
date: 2022-05-18
author: LM
tags: ["随记"]
---

> 参考原文：[ CPU架构详细介绍_@MasterHu88 ](https://blog.csdn.net/qq_34160841/article/details/105744375)

## 1.主流架构

目前市场上的 CPU 主要分为两大阵营，一个是 intel、AMD 为首的复杂指令集 CPU（ 如 X86 ），另一个是以 IBM、ARM 为首的精简指令集 CPU（ 如 PowerPC，ARM ）

## 2.X86

X86 是指美国 Intel 公司为其第一块 16 位 CPU i8086 专门开发的一种计算机语言复杂指令集，其主要应用于个人计算机、服务器的 CPU 设计中。在当前市场中，有如下采用 X86 指令集的 CPU 架构：

### a.IA 系

- IA-32：Intel（英特尔）32 位架构
- IA-64：Intel（英特尔）64 位架构，英特尔安腾架构（Intel Itanium architecture），使用在 Itanium 处理器家族上的 64 位指令集架构，由英特尔公司与惠普公司共同开发。IA 是 Intel Architecture（英特尔架构）的缩写。需要注意的是此架构与 x86 并不相容，操作系统与软件需使用 IA-64 专用版本。

### b.X86 系

- x86-32：X86 的 32 位架构，在 Intel 中也被称为 IA-32
- x86-64：有 AMD64 与 Intel64，其都是 x86 架构的64位拓展，向后兼容于 16 位及 32 位的 x86 架构

## 3.ARM

ARM 架构，也称作进阶精简指令集机器（Advanced RISC Machine，更早称作：Acorn RISC Machine），是一个 32 位精简指令集（RISC）处理器架构，其广泛地使用在许多嵌入式系统设计。由于节能的特点，ARM 处理器非常适用于行动通讯领域，符合其主要设计目标为低耗电的特性。目前 ARM 主要市场是手机端 CPU 和 MCU，手机 CPU 市场，由高通骁龙系列、华为麒麟系列、苹果的 M1 系列以及三星猎户系列和联发科系列，在MCU端主要是 STM32 以及国产的 GD32。

