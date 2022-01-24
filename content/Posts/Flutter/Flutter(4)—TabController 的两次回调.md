---
title: Flutter(4)—TabController 的两次回调
date: 2021-04-26
author: LM
tags: ["Flutter"]
---

## 1.TabController 的回调

TabController 监听在点击切换 tab 的时候会回调两次，左右滑动切换 tab 正常调用一次，这是由于在点击切换 tab 的时候会执行一个动画效果，滑动切换的时候是没有的，在这个过程中多触发了一次 Listener。

因此，在设计时需要注意该问题，以避免监听出错。

