---
title: BUG(19)——Django分页报错
date: 2021-07-23
author: LM
---

## BUG描述

`Django`分页时报错

```python
UnorderedObjectListWarning: Pagination may yield inconsistent results with an unordered object_list: <class 'sign.models.Guest'> QuerySet.paginator = Paginator(guest_list,5)
```

## 解决

这是因为`Django`分页是依照排序进行的，而未排序时进行分页便会发生该报错。定位分页依据的数据，对该数据进行排序

```python
paginator = Paginator(gList, 5)
gList = G.objects.all().order_by('id')
```

