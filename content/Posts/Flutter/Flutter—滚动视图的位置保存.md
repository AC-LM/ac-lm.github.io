---
title: Flutter—滚动视图的位置保存
date: 2021-05-15
author: LM
tags: ["Flutter"]
---

> 参考原文：[ how-to-get-flutter-scrollcontroller-to-save @stackoverflow ](https://stackoverflow.com/questions/60292911/how-to-get-flutter-scrollcontroller-to-save-position-of-listview-builder-when)

## 使用 AutomaticKeepAliveClientMixin 保存状态

```java
class GetListView extends StatefulWidget{
  @override
  State<StatefulWidget> createState() =>_GetListViewState();

}

class _GetListViewState extends State<GetListView> with AutomaticKeepAliveClientMixin<GetListView>{

  @override
  Widget build(BuildContext context){
    return ListView.builder(

                itemCount: 2000,
                itemBuilder: (context, i) {
                  return ListTile(
                      title: Text(
                    i.toString(),
                    textScaleFactor: 1.5,
                    style: TextStyle(color: Colors.blue),
                  ));
                });
  }

  @override
  bool get wantKeepAlive => true;

} 
```

## 使用 PageStorageKey 保存偏移

```java
ListView.builder(
                key: PageStorageKey<String>("controllerA"),
                controller: ScrollController(keepScrollOffset: true),
                itemCount: 2000,
                itemBuilder: (context, i) {
                  print("Rebuilded 1");
                  return ListTile(
                      title: Text(
                    i.toString(),
                    textScaleFactor: 1.5,
                    style: TextStyle(color: Colors.blue),
                  ));
                }),
```