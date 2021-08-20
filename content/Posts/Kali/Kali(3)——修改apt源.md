---
title: Kali(3)——修改apt源
date: 2021-06-09
author: LM
---

## 备份源

```
cd /etc/apt
cp sources.list sources.list.bak
```

## 编辑文件

模仿 deb http://............... main contrib nin-free 修改

```
#中科大
deb http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib

#阿里云
deb http://mirrors.aliyun.com/kali kali-rolling main non-free contrib

#清华大学
#deb http://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free

#浙大
#deb http://mirrors.zju.edu.cn/kali kali-rolling main contrib non-free

#东软大学
#deb http://mirrors.neusoft.edu.cn/kali kali-rolling/main non-free contrib

#官方源
#deb http://http.kali.org/kali kali-rolling main non-free contrib

#重庆大学
#deb http://http.kali.org/kali kali-rolling main non-free contrib
```

