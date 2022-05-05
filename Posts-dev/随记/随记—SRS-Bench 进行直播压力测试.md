---
title: 随记—SRS-Bench 进行直播压力测试
date: 2022-01-22
author: LM
tags: ["随记"]
---

## 1.安装

**github**：https://github.com/ossrs/srs-bench

```
git clone https://github.com/ossrs/srs-bench.git
cd srs-bench
yum install gcc unzip gcc+ gcc-c++
./configure && make
```

## 2.FLV 压测

```
cd /srs-bench
git checkout master
./configure && make
./objs/sb_http_load -c 200 -r httP://ip/1.flv
```

