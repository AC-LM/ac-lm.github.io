---
title: Dart(7)——异步
date: 2021-04-30
author: LM
---

> 参考原文：[ Dart异步编程-future  @方田 ](https://www.cnblogs.com/hygblog/p/9078608.html)

## 介绍

Dart是一个单线程编程语言。如果任何代码阻塞线程执行都会导致程序卡死。Dart使用Future对象表示异步操作，防止出现阻塞操作。

```dart
// Synchronous code
printDailyNewsDigest() {
  String news = gatherNewsReports(); // Can take a while.
  print(news);
}

main() {
  printDailyNewsDigest();
  printWinningLotteryNumbers();
  printWeatherForecast();
  printBaseballScore();
}
```

该代码存在一个问题函数 printDailyNewsDigest ，该函数是阻塞的，之后的代码必须等待printDailyNewsDigest 结束才能继续执行。当用户想知道自己是否中彩票，明天的天气和谁赢得比赛，都必须等待 printDailyNewsDigest 读取结束。为了程序及时响应，Dart的作者使用异步编程模型处理可能耗时的函数。这个函数返回一个Future

## 什么是Future

Future表示在将来某时获取一个值的方式。当一个返回Future的函数被调用的时候，做了两件事情：

- 函数把自己放入队列和返回一个未完成的Future对象
- 之后当值可用时，Future带着值变成完成状态。

## Async和await

async 和 await 关键字是 Dart 异步支持的一部分。他们允许你像写同步代码一样写异步代码和不需要使用Future接口。

```dart
import 'dart:async';

printDailyNewsDigest() async {
  String news = await gatherNewsReports();
  print(news);
}

main() {
  printDailyNewsDigest();
  printWinningLotteryNumbers();
  printWeatherForecast();
  printBaseballScore();
}
```

在这时 printDailyNewsDigest 是第一个调用的，但是最后打印的，即使只有一行内容。这是因为代码读取和打印内容是异步执行的。在这个例子中间，printDailyNewsDigest 调用 gatherNewsReports 不是阻塞的。gatherNewsReports 把自己放入队列，不会暂停代码的执行。程序打印中奖号码，天气预报和比赛分数；当 gatherNewsReports 完成收集新闻过后再打印。gatherNewsReports 需要消耗一定时间的执行完成，而不会影响功能。用户在读取新闻之前获得其他消息。

下面的图展示代码的执行流程。每一个数字对应着相应的步骤

![](https://gitee.com/LM-J/drawingbed/raw/master/img/56.png)

- 开始程序执行
- main函数调用printDailyNewsDigest，因为它被标记为async,所有在该函数任何代码被执行之前立即返回一个Future。
- 剩下的打印执行。因为它们是同步的。所有只有当一个打印函数执行完成过后才能执行下一个打印函数。例如：中奖号码在天气预报执行打印。
- 函数printDailyNewsDigest函数体开始执行
- 在到达await之后，调用gatherNewsReports，程序暂停，等待gatherNewsReports返回的Future完成。
- 当Future完成，printDailyNewsDigest继续执行，打印新闻。
- 当printDailyNewsDigest执行完成过后，最开始的Future返回完成，程序退出。
- PS：如果async函数没有明确指定返回值，返回的null值的Future

总结

- await 必须在async方法中使用。
- async方法中在await前面的代码会立即同步执行，直到碰到await。
- await的作用是等待所标记的方法获取返回结果。当代码跑到await时，程序其他部分立即停止，直到标记方法执行完成
- 当代码执行到await，程序会立即返回一个future。

## 错误处理

如果在Future返回函数发生错误，你可能想捕获错误。Async函数可以用try-catch捕获错误。

```dart
printDailyNewsDigest() async {
  try {
    String news = await gatherNewsReports();
    print(news);
  } catch (e) {
    // Handle error...
  }
}
```

## 连续执行

你可以使用多个await表达式，保证一个await执行完成过后再执行下一个

```dart
main() async {
  await expensiveA();
  await expensiveB();
  doSomethingWith(await expensiveC());
}
```

