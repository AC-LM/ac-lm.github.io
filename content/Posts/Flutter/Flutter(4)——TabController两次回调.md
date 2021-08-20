---
title: Flutter(4)——TabController两次回调
date: 2021-04-29
author: LM
---

## Q

TabController监听在点击切换tab的时候会回调两次，左右滑动切换tab正常调用一次。

## A

点击切换tab的时候会执行一个动画效果，滑动切换的时候是没有的，在这个过程中多触发了一次Listener。

