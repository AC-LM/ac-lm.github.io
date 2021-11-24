---
title: 随记(18)—什么是Bash Shell
date: 2020-12-09
author: LM
---

## 1.什么是Bash

Bash是Unix shell的一种，运行于大多数类Unix系统的操作系统之上，Linux与Mac OS都将它作为默认shell。

此外Bash是一个命令处理器，通常运行于文本窗口中，并能执行用户直接输入的命令。Bash还能从文件中读取命令。

## 2.什么是Shell

在计算机科学中，**Shell俗称壳（用来区别于核），是指“为使用者提供操作界面”的软件（命令解析器）**。它接收用户命令，然后调用相应的应用程序。

同时它又是一种程序设计语言。作为命令语言，它交互式解释和执行用户输入的命令或者自动地解释和执行预先设定好的一连串的命令；作为程序设计语言，它定义了各种变量和参数，并提供了许多在高级语言中才具有的控制结构，包括循环和分支。

Shell是操作系统最外面的一层，是文字操作系统与外部最主要的接口，Shell管理你与操作系统之间的交互：等待你输入，向操作系统解释你的输入，并且处理各种各样的操作系统的输出结果。

## 3.Shell的两大类

### 一：图形界面shell（Graphical User Interface shell 即 GUI shell）

例如：应用最为广泛的 Windows Explorer （微软的windows系列操作系统），还有也包括广为人知的 Linux shell，其中linux shell 包括 X window manager (BlackBox和FluxBox），以及功能更强大的CDE、GNOME、KDE、 XFCE。

### 二：命令行式shell（Command Line Interface shell ，即CLI shell）

例如：bash / sh / ksh / csh / zsh（Unix/linux 系统）（MS-DOS系统），cmd.exe / 命令提示字符（Windows NT 系统），Windows PowerShell（支持 .NET Framework 技术的 Windows NT 系统）

### 三：主流的Shell

- **Bourne Shell**：首个重要的标准Unix Shell，是UNIX 最初使用的 shell，并且在每种 UNIX 上都可以使用, 在 shell 编程方面相当优秀，但在处理与用户的交互方面做得不如其他几种Shell
- **C Shell**：首个交互式功能Shell，并把ALGOL风格的语法结构变成了C语言风格
- **Korn Shell**：ksh结合了所有的C shell的交互式特性，并融入了Bourne shell的语法（Bourne shell用来编程，C shell用来交互）
- **Bourne Again Shell (bash)**：替代Bourne shell
- **POSIX Shell**：Korn shell的一个变种，主要为hp(惠普)提供

## 4.交互式shell和非交互式Shell

- **交互式Shell**：就是shell等待你的输入，并且执行你提交的命令。这种模式被称作交互式是因为shell与用户进行交互。这种模式也是大多数用户非常熟悉的：登录、执行一些命令、签退。当你签退后，shell也终止了。
- **非交互式Shell**：在这种模式下，shell不与你进行交互，而是读取存放在文件中的命令，并且执行它们。当它读到文件的结尾，shell也就终止了。

## 5.Linux的Shell

Linux 操作系统**缺省（默认）的Shell 是Bourne Again shell**，它是 Bourne shell 的扩展，简称**Bash**，与 Bourne shell 完全向后兼容，并且在Bourne shell 的基础上增加、增强了很多特性。Bash放在/bin/bash中，它有许多特色，可以提供如命令补全、命令编辑和命令历史表等功能，它还包含了很多 C shell 和 Korn shell 中的优点，有灵活和强大的编程接口，同时又有很友好的用户界面。
