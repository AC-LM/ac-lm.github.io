---
title: 随记(36)—Electron应用程序框架
date: 2021-09-17
author: LM
---

> 参考文档
> [Electron：PC 端多端融合方案 ](http://www.cocoachina.com/articles/897764)
> [Electron 应用调试指南  ](https://zhuanlan.zhihu.com/p/91259973)

## Electron

Electron 是一个基于 Node.js 和 Chromium 的开源框架，常用于构建桌面应用，开发者可以使用 web 技术（HTML，JavaScript 和 CSS）完成整个应用的开发。许多知名桌面应用基于 Electron 实现，如 VSCode，Slack 和 GitHub Desktop 等。

Electron 应用进程分为**主进程和渲染进程**，其底层实现分别对应于 Node.js 和 Chromium，和 Native 中的概念不一样的是 Electron 中主进程只有一个，而渲染进程（也就是 UI 进程） 可以有多个。主进程在后台运行，每次打开一个界面，会新开一个新的渲染进程。

- 渲染进程： 用户看到的 web 界面就是由渲染进程绘制出来的，包括 html、css、js。
- 主进程：Electron 运行 package.json 中的 main.js 脚本的进程被称为主进程。在主进程中运行的脚本通过创建 web 页面来展示用户界面。一个 Electron 应用程序总是只有一个主进程。

## Chromium 架构

浏览器分为单进程和多进程架构。下面先讲讲 Chrome 为代表的浏览器过去和未来。

###  单进程浏览器

单进程浏览器指的是浏览器的所有功能模块都是运行在同一个进程里的，这些模块包括网络、插件、Javascript 运行环境、渲染引擎和页面等。如此复杂的功能都在一个进程内运行，所以容易导致浏览器的不稳定、不安全、不流畅。

![单进程浏览器架构示意图](https://raw.githubusercontent.com/FantasticLBP/knowledge-kit/master/assets/2020-05-07-BrowserSingleThread.png)

#### 问题1: 不稳定

早期浏览器需要借助插件来实现类似 Web 视频、Web 游戏等各种强大的功能。但插件往往是最容易出现问题的模块。此外因为运行在浏览器进程中，所以一个插件的意外崩溃会导致整个浏览器的崩溃。除了插件之外，渲染引擎模块也是不稳定的。通常一些复杂的 Javascript 代码就有可能导致渲染引擎模块的崩溃。

#### 问题2: 不流畅

从单进程浏览器架构图看出，所有页面的渲染模块、Javascript 执行环境、插件都是在一个线程中执行的。这意味着同一时刻只有一个模块可以执行，表现为整个浏览器失去响应，也就是卡顿。

脚本、插件会让单进程浏览器变卡顿外，页面的内存泄露也会导致浏览器卡顿。通常浏览器内核是非常复杂的，运行一个复杂的页面再关闭页面，会存在内存不能完全回收的情况，这样导致的问题是随着使用时间的变长，内存泄漏问题越严重，内存占用越高，可用内存越来越少，浏览器会变得越来越慢。

#### 问题3: 不安全

一般浏览器插件都是用 C/C++ 编写的，通过插件就可以获取到较多的操作系统资源，当你在页面上运行一个插件的时候，也就意味着这个插件能完全控制你的电脑。如果是恶意插件，那它就可以做一些窃取账号密码等操作，引发安全问题。

### 早期多进程架构浏览器

![早期 Chrome 进程架构图](https://raw.githubusercontent.com/FantasticLBP/knowledge-kit/master/assets/2020-05-07-ChromEarlyArch.png)

上图2008年 Chrome 发布时的进程架构图。可以看出 Chrome 的页面是运行在单独的渲染进程中，同时页面的插件也是运行在单独的插件进行中的，进程之间通过 IPC 进行通信。

**解决了不稳定问题。**由于进程之间是彼此隔离的，所以当一个页面或者插件崩溃时，受影响的仅仅是当前的页面或者插件进程，并不会影响到浏览器和其他的页面。也就是说解决了早期浏览器某个页面或者插件崩溃导致整个浏览器的崩溃，从而解决了不稳定的问题。

**解决了不流畅问题。** 同样，Javascript 进行也是运行在渲染进程中的，所以即使当前 Javascript 阻塞了渲染进程，影响到的也只是当前的渲染页面，并不会影响到浏览器和其他页面或者插件进程（其他的页面的脚本是运行在自己的渲染进程中的）。

对于**内存泄漏的解决办法更加简单**。当关闭某个页面的时候，整个渲染进程就会被关闭，所以该进程所占用的内存都会被系统回收，于是轻松解决了浏览器页面的内存泄漏问题。

**解决了安全问题。**采用多进程架构可以使用**安全沙箱技术**。沙箱可以看成是操作系统给浏览器一个小黑盒，黑盒内部可以执行程序，但是不能访问操作系统资源、不能访问硬盘数据，也不能在敏感位置读取任何数据，例如你的文档和桌面。Chrome 把插件进程和渲染进程使用沙箱隔离起来，这样即使在渲染进程或者浏览器进程中执行了恶意代码，恶意代码也无法突破沙箱限制去获取系统权限。

沙箱隔离起来的进程必须使用 IPC 通道才可以与浏览器内核进程通信，通信进程就会进行安全的检查。

沙箱设计的目的是为了让不可信的代码运行在一定的环境中，从而限制这些代码访问隔离区之外的资源。如果因为某种原因，确实需要访问隔离区外的资源，那么就必须通过的指定的通道，这些通道会进行严格的安全检查，来判断请求的合法性。通道会采取默认拒绝的策略，一般采用封装 API 的方式来实现。

### 目前多进程架构浏览器

Chrome 团队不断发展，目前架构有了较新变化，最新 Chrome 架构图如下所示

![最新 Chrome 进程架构图](https://raw.githubusercontent.com/FantasticLBP/knowledge-kit/master/assets/2020-05-07-ChromeMordernArch.png)

最新 Chrome 浏览器包括：1个网络进程、1个浏览器进程、1个 GPU 进程、多个渲染进程、多个插件进程。

- 浏览器进程：主要负责界面显示、用户交互、子进程管理，同时提供存储功能。
- 渲染进程：核心任务是将 HTML、CSS、Javascript 转换为用户可以与之的网页，排版引擎 Blink 和 Javascript 引擎 V8 都是运行在该进程中。默认情况下，Chrome 为每个 tab 标签页创建一个新的渲染进程。出于安全考虑，渲染进程都是运行在沙箱机制下的。
- GPU 进程：最早 Chrome 刚发布的时候是没有 GPU 进程的，而 GPU 的使用初衷是实现 css 3D 效果。随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍需求。最后 Chrome 多进程架构中也引入了 GPU 进程。
- 网络进程：主要负责页面的网络资源请求加载。早期是作为一个模块运行在浏览器进程里面的，最近才独立出来作为一个单独的进程。
- 插件进程：主要负责插件的运行。因插件代码由普通开发者书写，所以在 QA 方面可能不是那么完善，代码质量参差不齐，插件容易奔溃，所以需要通过插件进程来隔离，以保证插件进程的奔溃不会对浏览器和页面造成影响。

所以，你会发现打开一个页面，查看进程发现有4个进程。凡事具有两面性，上面说了多进程架构带来浏览器稳定性、安全性、流畅性，但是也带来一些问题：

- 更高资源占用：每个进程都会包含公共基础结构的副本（如 Javascript 运行环境），这意味着浏览器将会消耗更多的资源
- 更复杂的体系结构：浏览器各模块之间耦合度高、拓展性差，会导致现在的架构很难适应新需求。

### 未来面向服务的架构

2016年 Chrome 官方团队使用 “**面向服务的架构**”（Services Oriented Architecture，简称 SOA）的思想设计了最新的 Chrome 架构。Chrome 整体架构会向现代操作系统所采用的“面向服务的架构”方向发展。

之前的各种模块会被重构成为单独的服务（Services），每个服务都可以运行在独立的进程中，访问服务必须使用定义好的接口，通过 IPC 进行通信。从而构建一个更内聚、低耦合、易于维护和拓展的系统。

Chrome 最终把 UI、数据库、文件、设备、网络等模块重构为基础服务。下图是 “Chrome 面向服务的架构”的进程模型图

![Chrome ”面向服务架构“的进程模型图](https://raw.githubusercontent.com/FantasticLBP/knowledge-kit/master/assets/2020-05-08-ChromeMltipleProcessArch.png)

Chrome 提供灵活的弹性架构，在强大性能设备上会以多进程的方式运行基础服务，但是在设备资源受限的情况下，Chrome 会将很多服务整合到一个进程中，从而节省内存占用。

![Chrome弹性架构](https://raw.githubusercontent.com/FantasticLBP/knowledge-kit/master/assets/2020-05-08-FlexiableChromeMltipleProcessArch.png)

### 特殊情况

我们在使用 Chrome 时，有时会出现由于单个页面卡死崩溃最终导致所有页面崩溃的情况，通常情况下如果是一个页面使用一个进程，是不会出现这个问题的，但是，有一种特殊情况，称为`同一站点(same-site)`，定义是根域名（例如：github.com）包括协议（例如：Http，Https）下的所有子域名和不同的端口，比如下面这三个：[https://developer.github.com](https://developer.github.com/) 、[https://www.github.com](https://www.github.com/) 、[https://www.github.com:8080](https://www.github.com:8080/) 都是属于同一站点，因为它们的协议都是 https，而根域名也都是 github.com。

Chrome 的默认策略是，每个标签对应一个渲染进程。但是如果从一个页面打开了新页面，而新页面和当前页面属于同一站点时，那么新页面会复用父页面的渲染进程。官方把这个默认策略叫 `process-per-site-instance`。直白的讲，就是如果几个页面符合同一站点，那么他们将被分配到一个渲染进程里面去。这种情况下，一个页面崩溃了，必然导致同一站点的页面同时崩溃，因为他们使用了同一个渲染进程。

PS：同一站点共享JS的执行环境，也就是说A页面可以直接在B页面中执行脚本。

## Electron 架构

![img](https://raw.githubusercontent.com/FantasticLBP/knowledge-kit/master/assets/2020-05-03-ElectronArch.png)

Electron 架构和 Chromium 架构类似，也是具有1个主进程和多个渲染进程。但是也有区别

- 在各个进行中暴露了 Native API ，提供了 Native 能力。
- 引入了 Node.js，所以可以使用 Node 的能力

Electron 的技术难点在于，由于 Electron 内部整合了 Chromium 和 Node.js，主线程在某个时刻只可以执行一个事件循环，但是2者的事件循环机制不一样，Node.js 的事件循环基于 [libuv](https://github.com/libuv/libuv)，但是 Chromium 基于 [message bump](https://chromium.googlesource.com/chromium/chromium/+/master/base/message_pump.h)。

所以 Electron 原理的重点就是「如何整合事件循环」。

- Chromium 集成到 Node.js 中：用 libuv 实现 messagebump（Node-Webkit 就是这么干的，缺点挺多）
- Node.js 集成到 Chromium 中（Electron 所采用的方式）

Electron 采取的做法就是将 Node.js 集成到 Chromium 中，通过轮询 backend_fd 获取 libuv 的新事件。

![Node.js与Chromium通信](https://raw.githubusercontent.com/FantasticLBP/knowledge-kit/master/assets/2020-05-03-ChromiumCommunicateWithNode.png)

上图描述了 Node.js 如何融入到 Chromium 中。描述下原理

- Electron 新起一个安全线程去轮询 backend_fd
- 当检测到一个新的 backend_fd，也就是一个新的 Node.js 事件之后，通过 PostTask 转发到 Chromium 的事件循环中

上述2个步骤完成了 Electron 的事件循环。

## 生产环境调试

生产环境的情况比开发环境要复杂一些。一般来说，我们希望有一个入口可以打开 devtools，以便在出现问题的时候能够方便调试；而另一方面，这个入口与产品本身无关，我们希望它对用户隐藏。一个比较常见的方案是：指定一套私有的快捷键，监听对应事件并在回调中调用 JavaScript API 来打开 devtools，并将快捷键设置为复杂的组合，以降低用户误触的概率。

快捷键方案确实有一定可行性，不过并没有从根本上解决这个问题。所以这里推荐使用 [Debugtron](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbytedance%2Fdebugtron) 进行调试。Debugtron 是一个调试生产环境 Electron 应用的工具，无需在客户端集成任何代码。它本身也基于 Electron 构建，支持多个平台。

[下载最新版本](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fbytedance%2Fdebugtron%2Freleases) 安装并打开 Debugtron 后，会自动检测并展示所有已安装的 Electron 应用：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/11/16e59039a2ca94f0~tplv-t2oaga2asx-watermark.awebp)点击图标后会进入调试环节。以 Electron Fiddle 为例，点击图标启动后，面板左侧会显示可调试的会话列表，包括主进程和渲染进程，可以根据标签来区分。右侧会显示主进程启动的日志：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/11/16e5903ce9eb16bf~tplv-t2oaga2asx-watermark.awebp)

在左侧的会话列表中选择一项，点击后会弹出对应的 devtools，可以在其中看到错误日志并定位问题，和开发环境完全一致。同时也支持调试多个应用，启动多个应用后可以在 tab 区切换。

