---
title: Web开发(11)—异步POST
date: 2021-07-24
author: LM
---

## 1.`$ajax`

```javascript
$.ajax({
     url: 'http://',
     type: 'post',
     dataType: 'json',
     data: {name: "xu", foo: 'bar'},
     cache: false,
     headers: { "Authorization": "Bearer token",
                'Content-Type': 'application/json'
               },                
     success: function(res){},
     error: function(e){},
       });
```

