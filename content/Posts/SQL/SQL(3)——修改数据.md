---
title: SQL(3)——修改数据
date: 2020-09-29
author: LM
---

> 参考原文：[ SQL教程 @廖雪峰 ](https://www.liaoxuefeng.com/wiki/1177760294764384)

关系数据库的基本操作就是增删改查，即CRUD：Create、Retrieve、Update、Delete。其中，对于查询，我们已经详细讲述了SELECT语句的详细用法。

而对于增、删、改，对应的SQL语句分别是：

- INSERT：插入新记录
- UPDATE：更新已有记录
- DELETE：删除已有记录

## 1.INSERT插入

INSERT语句的基本语法是：

```sql
INSERT INTO <表名> (字段1, 字段2, ...) VALUES (值1, 值2, ...);
INSERT INTO students (class_id, name, gender, score) VALUES (2, '大牛', 'M', 80);
```

注意到我们并没有列出id字段，也没有列出id字段对应的值，这是因为id字段是一个自增主键，它的值可以由数据库自己推算出来。此外，如果一个字段有默认值，那么在INSERT语句中也可以不出现。

要注意，字段顺序不必和数据库表的字段顺序一致，但值的顺序必须和字段顺序一致。也就是说，可以写INSERT INTO students (score, gender, name, class_id) ...，但是对应的VALUES就得变成(80, 'M', '大牛', 2)。

还可以一次性添加多条记录，只需要在VALUES子句中指定多个记录值，每个记录是由(...)包含的一组值：

```sql
INSERT INTO students (class_id, name, gender, score) VALUES
  (1, '大宝', 'M', 87),
  (2, '二宝', 'M', 81);
```

## 2.UPDATE更新

UPDATE语句的基本语法是：

```sql
UPDATE <表名> SET 字段1=值1, 字段2=值2, ... WHERE ...;
UPDATE students SET name='大牛', score=66 WHERE id=1;
```

注意到UPDATE语句的WHERE条件和SELECT语句的WHERE条件其实是一样的，因此完全可以一次更新多条记录：

```sql
UPDATE students SET name='小牛', score=77 WHERE id>=5 AND id<=7;
```

在UPDATE语句中，更新字段时可以使用表达式。例如，把所有80分以下的同学的成绩加10分：

```sql
UPDATE students SET score=score+10 WHERE score<80;
```

其中，SET score=score+10就是给当前行的score字段的值加上了10。如果WHERE条件没有匹配到任何记录，UPDATE语句不会报错，也不会有任何记录被更新。当没有WHERE条件时，整个表的所有记录都会被更新

## 3.DELETE删除

DELETE语句的基本语法是：

```sql
DELETE FROM <表名> WHERE ...;
DELETE FROM students WHERE id=1;
```

注意到DELETE语句的WHERE条件也是用来筛选需要删除的行，因此和UPDATE类似，DELETE语句也可以一次删除多条记录

```sql
DELETE FROM students WHERE id>=5 AND id<=7;
```

同样，要特别小心的是，和UPDATE类似，不带WHERE条件的DELETE语句会删除整个表的数据

```sql
DELETE FROM students;
```

