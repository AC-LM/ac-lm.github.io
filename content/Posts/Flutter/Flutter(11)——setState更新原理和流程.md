---
title: Flutter(11)——setState更新原理和流程
date: 2021-04-29
author: LM
---

> 参考原文：[ Flutter的setState更新原理和流程 @flutter开发精选 ](https://zhuanlan.zhihu.com/p/271803637)

## Flutter的状态类

- StatelessWidget：无状态类，没有状态更新，界面一经创建无法更改
- StatefulWidget：有状态类，当状态改变，调用setState()方法会触发StatefulWidget的UI状态更新，自定义继承StatefulWidget的子类须重写createState()方法

只有当我们的类是有状态类的时候才能进行状态刷新，setState也是在State（有状态类）类里。

## mounted

调用 setState() 必须是没有调用过 dispose() 方法，不然出错，可通过mounted属性来判断调用此方法是否合法。

```
if (mounted) {
  setState(() {});
}
```

## 流程

### 条件判断

- 1.生命周期判断
- 2.是否可以进行刷新：mounted

### 添加脏链表 _dirty = true

- 1.“脏”链表是待更新的链表
- 2.更新过后就不“脏”了
- 3._active=false 的时候直接返回

### 管理类

- 告诉管理类方法自己需要被重新构建
- owner.scheduleBuildFor(this)

### 调用 window.scheduleFrame() =>native 方法

- RegisterNatives()完成native方法的注册
- 最终会注册Vsync回调。 等待下一次vsync信号的到来，
- 然后再经过层层调用最终会调用到 Window::BeginFrame()
- UI 的绘制逻辑是在 Render 树中实现的

### 更新帧信号来临从而刷新需要重构的界面

- 在 drawFrame 中调用 buildOwner.buildScope(renderViewElement)更新 elements