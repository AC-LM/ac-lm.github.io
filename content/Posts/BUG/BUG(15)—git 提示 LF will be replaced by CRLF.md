---
title: BUG(15)—git 提示 LF will be replaced by CRLF
date: 2021-01-15
author: LM
tags: ["Bug"]
---

## BUG 描述

在 windows 平台下使用 git add，git deploy 文件时经常出现`warning: LF will be replaced by CRLF`的提示

## Resolution

这是因为在文本处理中，CR（CarriageReturn）/ LF（LineFeed）是不同操作系统上使用的换行符，当我们在 Windows 上的编辑器打开文件时，编辑器会把行尾的换行（LF）字符转换成回车（CR）和换行（LF），或在用户按下 Enter 键时，插入回车（CR）和换行（LF）两个字符。

在 Linux 下，命令 `unix2dos` 可以把 Linux 文件格式转换成 Windows 文件格式，命令 `dos2unix` 可以把 Windows 格式转换成 Linux 文件格式。

- Dos 和 Windows 平台： 使用回车（CR）和换行（LF）两个字符来结束一行，回车+换行(CR+LF)，即（\r\n）
- Mac 和 Linux 平台：只使用换行（LF）一个字符来结束一行，即(\n)
- 回车符就是回到一行的开头，用符号 r 表示，十进制 ASCII 代码是 13，十六进制代码为 0x0D
- 换行符就是另起一行，用 n 符号表示，ASCII 代码是 10，十六制为 0x0A
- 我们平时编写文件的回车符应该确切来说叫做回车换行符

Git 可以在你提交时自动地把回车（CR）和换行（LF）转换成换行（LF），而在检出（检查出入）代码时把换行（LF）转换成回车（CR）和换行（LF）。如果是在 Windows 系统上，把它设置成 true，这样在检出代码时，换行会被转换成回车和换行。

```bash
# 提交时转换为LF，检出时转换为CRLF
git config --global core.autocrlf true
```

如果使用以换行（LF）作为行结束符的 Linux 或 Mac，你不需要 Git 在检出文件时进行自动的转换。然而当一个以回车（CR）和换行（LF）作为行结束符的文件不小心被引入时，你肯定想让 Git 修正。 所以，你可以把 core.autocrlf 设置成 input 来告诉 Git 在提交时把回车和换行转换成换行，检出时不转换：（这样在 Windows 上的检出文件中会保留回车和换行，而在 Mac 和 Linux 上，以及版本库中会保留换行。）

```bash
# 提交时转换为LF，检出时不转换
git config --global core.autocrlf input
```

如果你是 Windows 程序员，且正在开发仅运行在 Windows 上的项目，可以设置 false 取消此功能，把回车保留在版本库中。

```bash
# 提交检出均不转换
git config --global core.autocrlf false
```

你也可以在文件提交时进行safecrlf检查

```bash
# 拒绝提交包含混合换行符的文件
git config --global core.safecrlf true   

# 允许提交包含混合换行符的文件
git config --global core.safecrlf false   

# 提交包含混合换行符的文件时给出警告
git config --global core.safecrlf warn
```

