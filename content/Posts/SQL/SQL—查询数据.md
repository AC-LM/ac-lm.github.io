---
title: SQL—查询数据
date: 2020-09-28
author: LM
tags: ["Mysql"]
---

> 参考原文：[ SQL教程 @廖雪峰 ](https://www.liaoxuefeng.com/wiki/1177760294764384)

## 1.基本查询

要查询数据库表的数据，我们使用如下的SQL语句：

```sql
SELECT * FROM <表名>;
```

使用SELECT * FROM students时，SELECT是关键字，表示将要执行一个查询，*表示“所有列”，FROM表示将要从哪个表查询，该SQL将查询出students表的所有数据。注意：查询结果也是一个二维表，它包含列名和每一行的数据。

SELECT语句其实并不要求一定要有FROM子句：

```sql
SELECT 100+200;
```

上述查询会直接计算出表达式的结果。虽然SELECT可以用作计算，但它并不是SQL的强项。此外，不带FROM子句的SELECT语句有一个有用的用途，就是用来判断当前到数据库的连接是否有效。许多检测工具会执行一条SELECT 1;来测试数据库连接。

## 2.条件查询

SELECT语句可以通过WHERE条件来设定查询条件，查询结果是满足查询条件的记录。例如，要指定条件“分数在80分或以上的学生”，写成WHERE条件就是：

```sql
SELECT * FROM students WHERE score >= 80;
SELECT * FROM students WHERE score BETWEEN 60 AND 90
```

条件表达式可以用<条件1> AND <条件2>表达满足条件1并且满足条件2。例如，符合条件“分数在80分或以上”，并且还符合条件“男生”，把这两个条件写出来：

```sql
SELECT * FROM students WHERE score >= 80 AND gender = 'M';
```

第二种条件是<条件1> OR <条件2>，表示满足条件1或者满足条件2。例如，把上述AND查询的两个条件改为OR，查询结果就是“分数在80分或以上”或者“男生”，满足任意之一的条件即选出该记录：

```sql
SELECT * FROM students WHERE score >= 80 OR gender = 'M';
```

第三种条件是NOT <条件>，表示“不符合该条件”的记录。例如，写一个“不是2班的学生”这个条件:

```sql
SELECT * FROM students WHERE NOT class_id = 2;
SELECT * FROM students WHERE class_id <> 2;
```

要组合三个或者更多的条件，就需要用小括号()表示如何进行条件运算。例如，编写一个复杂的条件：分数在80以下或者90以上，并且是男生：

```sql
SELECT * FROM students WHERE (score < 80 OR score > 90) AND gender = 'M';
```

如果不加括号，条件运算按照NOT、AND、OR的优先级进行，即NOT优先级最高，其次是AND，最后是OR。加上括号可以改变优先级。

### 常用的条件表达式

| 条件                 | 表达式举例1     | 表达式举例2      | 说明                                              |
| :------------------- | :-------------- | :--------------- | :------------------------------------------------ |
| 使用=判断相等        | score = 80      | name = 'abc'     | 字符串需要用单引号括起来                          |
| 使用>判断大于        | score > 80      | name > 'abc'     | 字符串比较根据ASCII码，中文字符比较根据数据库设置 |
| 使用>=判断大于或相等 | score >= 80     | name >= 'abc'    |                                                   |
| 使用<判断小于        | score < 80      | name <= 'abc'    |                                                   |
| 使用<=判断小于或相等 | score <= 80     | name <= 'abc'    |                                                   |
| 使用<>判断不相等     | score <> 80     | name <> 'abc'    |                                                   |
| 使用LIKE判断相似     | name LIKE 'ab%' | name LIKE '%bc%' | %表示任意字符，例如'ab%'将匹配'ab'，'abc'，'abcd' |

## 3.投影查询

如果我们只希望返回某些列的数据，而不是所有列的数据，我们可以用SELECT 列1, 列2, 列3 FROM ...，让结果集仅包含指定列。这种操作称为投影查询

```sql
SELECT id, score, name FROM students;
```

使用SELECT 列1, 列2, 列3 FROM ...时，还可以给每一列起个别名，这样，结果集的列名就可以与原表的列名不同。它的语法是SELECT 列1 别名1, 列2 别名2, 列3 别名3 FROM ...

```sql
SELECT id, score points, name FROM students;
```

投影查询同样可以接WHERE条件，实现复杂的查询：

```sql
SELECT id, score points, name FROM students WHERE gender = 'M';
```

## 4.聚合查询

对于统计总数、平均数这类计算，SQL提供了专门的聚合函数，使用聚合函数进行查询，就是聚合查询，它可以快速获得结果。

COUNT(*)表示查询所有列的行数，要注意聚合的计算结果虽然是一个数字，但查询的结果仍然是一个二维表，只是这个二维表只有一行一列，并且列名是COUNT(*)。通常，使用聚合查询时，我们应该给列名设置一个别名，便于处理结果：

```sql
SELECT COUNT(*) num FROM students;
//num 10
```

COUNT(*)和COUNT(id)实际上是一样的效果。另外注意，聚合查询同样可以使用WHERE条件，因此我们可以方便地统计出有多少男生、多少女生、多少80分以上的学生等。此外要特别注意：如果聚合查询的WHERE条件没有匹配到任何行，COUNT()会返回0，而SUM()、AVG()、MAX()和MIN()会返回NULL

```sql
SELECT COUNT(*) boys FROM students WHERE gender = 'M';
```

### 聚合函数

| 函数 | 说明                                   |
| :--- | :------------------------------------- |
| SUM  | 计算某一列的合计值，该列必须为数值类型 |
| AVG  | 计算某一列的平均值，该列必须为数值类型 |
| MAX  | 计算某一列的最大值                     |
| MIN  | 计算某一列的最小值                     |

### 分组聚合

对于聚合查询，SQL还提供了“分组聚合”的功能。例如，执行以下这个查询，COUNT()的结果不再是一个，而是3个，这是因为，GROUP BY子句指定了按class_id分组，因此，执行该SELECT语句时，会把class_id相同的列先分组，再分别计算，最终得到3行结果。

```sql
SELECT class_id, COUNT(*) num FROM students GROUP BY class_id;
```

## 5.多表查询

SELECT查询不但可以从一张表查询数据，还可以从多张表同时查询数据。查询多张表的语法是：

```sql
SELECT * FROM <表1> <表2>
SELECT * FROM students, classes;
```

这种一次查询两个表的数据，查询的结果也是一个二维表，它是students表和classes表的“乘积”，即students表的每一行与classes表的每一行都两两拼在一起返回。结果集的列数是students表和classes表的列数之和，行数是students表和classes表的行数之积。

这种多表查询又称笛卡尔查询，使用笛卡尔查询时要非常小心，由于结果集是目标表的行数乘积，对两个各自有100行记录的表进行笛卡尔查询将返回1万条记录，对两个各自有1万行记录的表进行笛卡尔查询将返回1亿条记录。

注意，多表查询时，要使用表名.列名这样的方式来引用列和设置别名，这样就避免了结果集的列名重复问题。但是，用表名.列名这种方式列举两个表的所有列实在是很麻烦，所以SQL还允许给表设置一个别名，让我们在投影查询中引用起来稍微简洁一点。

```sql
SELECT
    s.id sid,
    s.name,
    s.gender,
    s.score,
    c.id cid,
    c.name cname
FROM students s, classes c
WHERE s.gender = 'M' AND c.id = 1;
```

## 6.连接查询

连接查询是另一种类型的多表查询。连接查询对多个表进行JOIN运算，简单地说，就是先确定一个主表作为结果集，然后，把其他表的行有选择性地“连接”在主表结果集上。例如，我们想要选出students表的所有学生信息，可以用一条简单的SELECT语句完成（从主表提取元素组成新表）

```sql
SELECT s.id, s.name, s.class_id, s.gender, s.score FROM students s;
```

但是，假设我们希望结果集同时包含所在班级的名称，上面的结果集只有class_id列，缺少对应班级的name列。

现在问题来了，存放班级名称的name列存储在classes表中，只有根据students表的class_id，找到classes表对应的行，再取出name列，就可以获得班级名称。

这时，连接查询就派上了用场。我们先使用最常用的一种内连接——INNER JOIN来实现：

```sql
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
FROM students s
INNER JOIN classes c
ON s.class_id = c.id;
```

注意INNER JOIN查询的写法是：

- 先确定主表，仍然使用FROM <表1>的语法；
- 再确定需要连接的表，使用INNER JOIN <表2>的语法；
- 然后确定连接条件，使用ON <条件...>，这里的条件是s.class_id = c.id，表示students表的class_id列与classes表的id列相同的行需要连接；
- 可选：加上WHERE子句、ORDER BY等子句。

### 连接方式

- INNER JOIN只返回同时存在于两张表的行数据，由于students表的class_id包含1，2，3，classes表的id包含1，2，3，4，所以，INNER JOIN根据条件s.class_id = c.id返回的结果集仅包含1，2，3。
- RIGHT OUTER JOIN返回右表都存在的行。如果某一行仅在右表存在，那么结果集就会以NULL填充剩下的字段。
- LEFT OUTER JOIN则返回左表都存在的行。如果我们给students表增加一行，并添加class_id=5，由于classes表并不存在id=5的行，所以，LEFT OUTER JOIN的结果会增加一行，对应的class_name是NULL：
- FULL OUTER JOIN，它会把两张表的所有记录全部选择出来，并且，自动把对方不存在的列填充为NULL

## 7.排序

我们使用ORDER BY语句进行排序

```sql
SELECT id, name, gender, score FROM students ORDER BY score;
```

我们可以加上DESC表示“倒序”

```sql
SELECT id, name, gender, score FROM students ORDER BY score DESC;
```

如果score列有相同的数据，要进一步排序，可以继续添加列名。例如，使用ORDER BY score DESC, gender表示先按score列倒序，如果有相同分数的，再按gender列排序：

```sql
SELECT id, name, gender, score FROM students ORDER BY score DESC, gender;
```

默认的排序规则是ASC：“升序”，即从小到大。ASC可以省略，即ORDER BY score ASC和ORDER BY score效果一样。

如果有WHERE子句，那么ORDER BY子句要放到WHERE子句后面。例如，查询一班的学生成绩，并按照倒序排序：

```sql
SELECT id, name, gender, score
FROM students
WHERE class_id = 1
ORDER BY score DESC;
```

## 8.分页

分页实际上就是从结果集中“截取”出第M~N条记录。这个查询可以通过LIMIT M OFFSET N子句实现

```sql
SELECT id, name, gender, score
FROM students
ORDER BY score DESC
LIMIT 3 OFFSET 0;
```

上述查询LIMIT 3 OFFSET 0表示，对结果集从0号记录开始，最多取3条。注意SQL记录集的索引从0开始

如果要查询第2页，那么我们只需要“跳过”头3条记录，也就是对结果集从3号记录开始查询，把OFFSET设定为3：

```sql
SELECT id, name, gender, score
FROM students
ORDER BY score DESC
LIMIT 3 OFFSET 3;
```

注意

- OFFSET超过了查询的最大数量并不会报错，而是得到一个空的结果集。
- OFFSET是可选的，如果只写LIMIT 15，那么相当于LIMIT 15 OFFSET 0。
- 在MySQL中，LIMIT 15 OFFSET 30还可以简写成LIMIT 30, 15。
- 使用LIMIT M OFFSET N 分页时，随着N越来越大，查询效率也会越来越低。