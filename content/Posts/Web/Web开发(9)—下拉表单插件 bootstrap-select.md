---
title: Web开发(9)—下拉表单插件 bootstrap-select
date: 2021-06-06
author: LM
tags: ["Web", "Javascript"]
---

> 参考文献：[ github.com-bootstrap-select @silviomoreto ](https://github.com/silviomoreto/bootstrap-select)  & [ blogs @懒得安分](https://www.cnblogs.com/landeanfen/p/7457283.html)

## 1.引用

```html
<link href="Content/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
<link href="Content/bootstrap-select/css/bootstrap-select.min.css" rel="stylesheet" />

<script src="Content/jquery-1.9.1.min.js"></script>
<script src="Content/bootstrap/js/bootstrap.min.js"></script>
<script src="Content/bootstrap-select/js/bootstrap-select.min.js"></script>
```

## 2.使用

```html
<select class="selectpicker" multiple>
    <option value="1">广东省</option>
    <option value="2">广西省</option>
    <option value="3">福建省</option>
    <option value="4">湖南省</option>
    <option value="5">山东省</option>                            
</select>
```

## 3.取值

关于组件取值保持原生的jquery方法，比如 `var value = $('#sel').val();` ，需要注意的是，如果是多选，这里得到的value变量是一个数组变量，形如 `['1','2','3']`

## 4.赋值

组件赋值就需要稍微变换一下了，如果你直接 `$('#sel').val('1');` 这样赋值将会无效，正确的赋值方法为：

```javascript
$('.selectpicker').selectpicker('val', '1');
```

注意，赋值的值为option的value属性！！

在一些级联选择的使用场景中，经常需要在赋值的时候顺便触发一下组件的change事件，我们可以这么做。

```javascript
$('.selectpicker').selectpicker('val', '1').trigger("change");
```

如果是多选的赋值，也是一样

```javascript
$('.selectpicker').selectpicker('val', ['1','2','3']).trigger("change");
```

## 恢复原状

```javascript
$('#initializePartyAProject').on('click', function () {
      //回到初始状态
      $('#party_a_project_name').selectpicker('val',['noneSelectedText']) 
      //对party_a_project_name这个下拉框进行重置刷新
      $("#party_a_project_name").selectpicker('refresh');
});
```

