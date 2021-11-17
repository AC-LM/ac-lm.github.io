---
title: BUG(7)——Win10 锁屏问题
date: 2020-12-02
author: LM
---

## BUG描述

Windows10 在锁屏时会偶尔出现不是自己设置的图片的问题，锁屏会变为默认图片。怀疑是由于用户的缓存被清理，启动时变为了默认用户。

## Resolution

`Win+R` 打开运行，输入`%ProgramData%\Microsoft\Windows`打开 Win10 配置文件夹，寻找到`SystemData`文件夹，双击打开。

若没有权限，右键->属性->安全->高级->上面栏的所有者更改->输入用户名(登陆账号名如LM)->检查名称->确认用户->确认->替换子容器和对象的所有者->确定->成功获取权限

进入`SystemData`，发现存在形如`S-1-5-18`和`S-1-5-21-`的文件夹(为用户的锁屏配置文件)，`S-1-5-18`为默认配置，打开`S-1-5-21->ReadOnly`，目录下`LockScreen_W，LockScreen_B`即为锁屏图片。LockScreen_B为用户设置，LockScreen_W为默认，即注销后的锁屏，更改文件内容以修改锁屏

