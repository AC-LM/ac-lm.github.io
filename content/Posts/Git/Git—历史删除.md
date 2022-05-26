---
title: Git—历史删除
date: 2022-05-18
author: LM
tags: ["Git"]
---

## 1.删除特定文件的上传历史

### a.重写提交记录，将历史中的所有指定文件删除

```shell
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch 目标的文件' --prune-empty --tag-name-filter cat -- --all
git filter-branch --force --index-filter 'git rm --cached -r --ignore-unmatch 目标的文件夹' --prune-empty --tag-name-filter cat -- --all
```

### b.删除历史记录

```shell
rm -rf .git/refs/original/ 
```

### c.将历史记录的过期时间设置为此刻，放弃所有历史的找回功能

```shell
git reflog expire --expire=now --all
```

### d.垃圾回收

```shell
git gc --aggressive --prune=now 
```

### e.强制更新（需要注意的是，远端仓库需要移除保护限制）

```shell
git push origin --force --all
```

