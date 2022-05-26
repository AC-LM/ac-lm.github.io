---
title: Git—.gitignore 文件配置
date: 2022-05-18
author: LM
tags: ["Git"]
---

## 1.文件语法

### a.忽略指定文件/目录

```gitignore
# 忽略指定文件
HelloWrold.class

# 忽略指定文件夹
bin/
bin/gen/
```

### b.通配符忽略规则

```gitignore
# 忽略 .class 的所有文件
*.class

# 忽略名称中末尾为 ignore 的文件夹
*ignore/

# 忽略名称中间包含 ignore 的文件夹
*ignore*/
```

