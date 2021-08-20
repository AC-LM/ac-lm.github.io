---
title: Web开发(3)——PHP+MariaDB数据库操作
date: 2020-12-03
author: LM
---

## 1.连接数据库

```php
<?php
  if (extension_loaded('mysqli')){
    echo 'yes';
 }
 else{
    echo 'no';
 }
# mysqli组件是否已经被加载
  $db = new mysqli('localhost', 'root', 'admin', 'test'); #数据库地址，用户名，密码，表单
  if (mysqli_connect_errno()){
    echo '<p>' . 'Connect DB error';
    exit;
  }
#数据库是否连接
?>
```

## 2.一个用户注册和系统登录

### a、创建数据库、表和用户。

```mysql
DROP DATABASE IF EXISTS `test`;
CREATE DATABASE `test`
USE `test`;
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
 `username` varchar(32) NOT NULL default '',
 `password` varchar(32) NOT NULL default '',
 PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;
```

### c、注册的代码：

```php
# register_do.php
<?php
  $username = $_POST['username'];
  $password = $_POST['password'];
  $db = new mysqli('localhost', 'root', 'admin', 'test');
  if (mysqli_connect_errno())
  {
    echo '<p>' . 'Connect DB error';
    exit;
  }
  $query = "select * from tbl_user where username = '" . $username . "'";
  echo '<p>' . $query;
  $result = $db->query($query);
  if ($result)
  {
    echo '<p>' . 'The user '. $username .' exist';
    echo '<p>' . '<a href="register.html" rel="external nofollow" rel="external nofollow" >Back to register</a>';
  }
  else
  {
    $query = "insert into tbl_user values ('". $username ."', '". $password ."')";
    echo '<p>' . $query;
    $result = $db->query($query);
    if ($result)
    {
      echo '<p>' . '<a href="register.html" rel="external nofollow" rel="external nofollow" >Register successful</a>';
    }
  }
?>
```
### d、登录的代码：

```php
# login_do.php
<?php
  $username = $_POST['username'];
  $password = $_POST['password'];
  $db = new mysqli('localhost', 'root', 'admin', 'test');
  if (mysqli_connect_errno())
  {
    echo '<p>' . 'Connect DB error';
    exit;
  }
  $query = "select * from tbl_user where username = '" . $username . "' and password = '" . $password . "'";
  echo '<p>' . $query;
  $result = $db->query($query);
  if ($result->num_rows)
  {
    echo '<p>' . '<a href="login.html" rel="external nofollow" rel="external nofollow" >Login successful</a>';
  }
  else
  {
    echo '<p>' . '<a href="login.html" rel="external nofollow" rel="external nofollow" >Login failed</a>';
  }
?>
```

### e、用户列表的代码：

```php
# userlist.php
<?php
  $db = new mysqli('localhost', 'root', 'admin', 'test');
  if (mysqli_connect_errno())
  {
    echo '<p>' . 'Connect DB error';
    exit;
  }
  echo '<p>' . 'All user as follows:';
  $query = "select * from tbl_user order by username";
  if ($result = $db->query($query))
  {
    while ($row = $result->fetch_assoc())
    {
      echo '<p>' . 'Username : ' . $row['username'] . '  <a href="userdelete.php?username=' . $row['username'] . '" rel="external nofollow" >delete</a>';
    }
  }
?>
```

### e、删除用户的代码：

```php
# userdelete.php
<?php
  $username = $_GET['username'];
  $db = new mysqli('localhost', 'root', 'admin', 'test');
  if (mysqli_connect_errno())
  {
    echo '<p>' . 'Connect DB error';
    exit;
  }
  $query = "delete from tbl_user where username = '" . $username . "'";
  echo $query;
  if ($result = $db->query($query))
  {
    echo '<p>' . 'Delete user ' . $username . ' successful';
  }
  else
  {
    echo '<p>' . 'Delete user ' . $username . ' failed';
  }
  echo '<p>' . '<a href="userlist.php" rel="external nofollow" >Back to user list</a>';
?>
```

## 3.图书管理系统

### 1、图书添加如下页面（bookadd.html）

![](https://gitee.com/LM-J/drawingbed/raw/master/img/29.png)

### 2、建表

```mysql
DROP DATABASE IF EXISTS `test`;
CREATE DATABASE IF NOT EXISTS `test`;
USE `test`;
DROP TABLE IF EXISTS `tbl_book`;
CREATE TABLE IF NOT EXISTS `tbl_book` (
 `isbn` varchar(32) NOT NULL,
 `title` varchar(32) NOT NULL,
 `author` varchar(32) NOT NULL,
 `price` float NOT NULL,
 PRIMARY KEY (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf-8;DROP` `DATABASE` `IF EXISTS `test`;``CREATE` `DATABASE` `IF ``NOT` `EXISTS `test`;``USE `test`;``DROP` `TABLE` `IF EXISTS `tbl_book`;``CREATE` `TABLE` `IF ``NOT` `EXISTS `tbl_book` (`` ```isbn` ``varchar``(32) ``NOT` `NULL``,`` ```title` ``varchar``(32) ``NOT` `NULL``,`` ```author` ``varchar``(32) ``NOT` `NULL``,`` ```price` ``float` `NOT` `NULL``,`` ``PRIMARY` `KEY` `(`isbn`)``) ENGINE=InnoDB ``DEFAULT` `CHARSET=utf-8;
```

### 3、添加的逻辑处理代码（bookadd_do.php）

```PHP
$db->query("set names utf-8")
#注意：向数据库写入数据时，采用utf-8编解码，以防止中文的乱码。
```

```PHP
<?php
  $isbn = $_POST['isbn'];
  $title = $_POST['title'];
  $author = $_POST['author'];
  $price = $_POST['price'];
  $db = new mysqli('localhost', 'root', 'admin', 'test');
  if (mysqli_connect_errno())
  {
    echo '<p>' . 'Connect DB error';
    exit;
  }
  $db->query("set names utf-8"); //特别注意这句话
  $stmt = $db->stmt_init();
  $stmt->prepare("insert into tbl_book values (?,?,?,?)");
  $stmt->bind_param("sssd", $isbn, $title, $author, $price);
  $stmt->execute();
  echo '<p>' . 'Affect rows is ' . $stmt->affected_rows;
  echo '<p>' . '<a href="booklist.php" rel="external nofollow" >Go to book list page</a>';
?>
```

### 4、显示图书信息的逻辑代码

```PHP
<?php
  $db = new mysqli('localhost', 'root', 'admin', 'test');
  if (mysqli_connect_errno())
  {
    echo '<p>' . 'Connect DB error';
    exit;
  }
  $db->query("set names utf-8"); //特别注意这句话
  $stmt = $db->stmt_init();
  $stmt->prepare("select * from tbl_book");
  $stmt->bind_result($isbn, $title, $author, $price);
  $stmt->execute();
  while($stmt->fetch())
  {
    echo 'ISBN : ' . $isbn . '<p>';
    echo 'Title : ' . $title . '<p>';
    echo 'Author : ' . $author . '<p>';
    echo 'Price : ' . $price . '<p>';
    echo '<p>' . '-----------------------------' . '<p>';
  }
?>
```

### 5、结果

![](https://gitee.com/LM-J/drawingbed/raw/master/img/30.png)
