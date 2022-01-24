---
title: Web开发(1)—War 文件
date: 2020-10-30
author: LM
tags: ["Web", "服务器"]
---

## 1.War 文件

War包一般是在进行Web开发时，一个网站Project下的所有源码的集合，里面包含前台HTML/CSS/JS/JSP等的代码，也包含编译Java的代码。当开发人员在自己的开发机器上调试所有代码并通过后，为了交给测试人员测试和未来进行产品发布，都需要将开发人员的源码打包成War进行发布。

War包可以放在Tomcat下的webapps或者word目录下，随着tomcat服务器的启动，它可以自动被解压。

## 2.扩展 | Jar、war、EAR 的区别

Jar、war、EAR、在文件结构上，三者并没有什么不同，它们都采用zip或jar档案文件压缩格式。但是它们的使用目的有所区别：    

- **Jar文件**（扩展名为. Jar，Java Application Archive）包含Java类的普通库、资源（resources）、辅助文件（auxiliary files）等。通常是开发时要引用的通用类，打成包便于存放管理。简单来说，jar包就是别人已经写好的一些类，然后对这些类进行打包。可以将这些jar包引入到你的项目中，可以直接使用这些jar包中的类和属性，这些jar包一般放在lib目录下。
- **War文件**（扩展名为.War,Web Application Archive）包含全部Web应用程序。在这种情形下，一个Web应用程序被定义为单独的一组文件、类和资源，用户可以对jar文件进行封装，并把它作为小型服务程序（servlet）来访问。 war包是一个可以直接运行的web模块，通常用于网站，打成包部署到容器中。以Tomcat来说，将war包放置在其\webapps\目录下,然后启动Tomcat，这个包就会自动解压，就相当于发布了。war包是Sun提出的一种web应用程序格式，与jar类似，是很多文件的压缩包。war包中的文件按照一定目录结构来组织。根据其根目录下包含有html和jsp文件，或者包含有这两种文件的目录，另外还有WEB-INF目录。通常在WEB-INF目录下含有一个web.xml文件和一个classes目录，web.xml是这个应用的配置文件，而classes目录下则包含编译好的servlet类和jsp，或者servlet所依赖的其他类（如JavaBean）。通常这些所依赖的类也可以打包成jar包放在WEB-INF下的lib目录下。
- **Ear文件**（扩展名为.Ear,Enterprise Application Archive）包含全部企业应用程序。在这种情形下，一个企业应用程序被定义为多个jar文件、资源、类和Web应用程序的集合。
