---
title: VSCode—底部状态栏
date: 2021-08-27
author: LM
tags: ["VSCode"]
---

## 1.改变颜色

1. 在设置中搜索`workbench.colorCustomizations`
2. 点击编辑`setting.json`进行修改

```json
{
    "workbench.colorCustomizations": {
        "statusBar.background" : "#008cff",
        "statusBar.noFolderBackground" : "#008cff",
        "statusBar.debuggingBackground": "#008cff",
    },
}
```

