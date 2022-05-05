---
title: Web开发—定位点击位置
date: 2021-06-05
author: LM
tags: ["Web", "Javascript"]
---

## 1.实现代码

```javascript
$('body').click(function(e) { 
    // 在页面任意位置点击而触发此事件
    // e.target表示被点击的目标
    if($(e.target).attr("id") == 'btn_my_mesg'){
       //要隐藏或显示的元素
       $(".myMsgs").css("display","block");
    }else{
       $(".myMsgs").css("display","none");
    }
})
```

