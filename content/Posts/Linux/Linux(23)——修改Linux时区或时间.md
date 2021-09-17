---
title: Linux(23)——修改Linux时区或时间
date: 2021-09-18
author: LM
---

## 查看和修改Linux的时区

- `date -R`：查看当前时区
- `tzselect`：适用于 RedHat Linux 和 CentOS 的时区设置
- `timeconfig`：适用于 Debian 的时区设置
- `cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime`：复制时区文件，以替换系统时区文件，来设置时间

## 查看和修改Linux的时间

- `date`：查看时间和日期
- `date -s 11/03/2009`：将系统日期设定成2009年11月3日
- `date -s 17:55:55`：将系统时间设定成下午5点55分55秒
- `hwclock -w`：将当前时间和日期写入BIOS，避免重启后失效

