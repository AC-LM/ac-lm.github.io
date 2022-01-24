---
title: Web开发(2)—PHP 实例
date: 2020-12-03
author: LM
tags: ["Web", "服务器"]
---

## 1.PHP 信息页

```php
<?php phpinfo();?>
```

## 2.数据库连接实现

```php
<?php
  $db = new mysqli('localhost', 'root', '123456', 'ztest');
  if (mysqli_connect_errno())
  {
    echo '<p>' . 'Connect DB error';
    exit;
  }
  else
  {
    echo '<p>' . 'Connect DB success';
  }
  echo '<p>' . 'Test start';
  $query = "select * from login";
  $result=$db->query($query);
  if ($result->num_rows > 0) {
    // 输出数据
    while($row = $result->fetch_assoc()) {
        echo "<p>" . "username: " . $row["username"]. " - password: " . $row["password"];
    }
   } else {
      echo "0 结果";
   }
   $db->close();
?> 
```

