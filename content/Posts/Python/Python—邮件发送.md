---
title: Python—邮件发送
date: 2020-12-15
author: LM
tags: ["Python"]
---

## 1.发送简单邮件

```python
import smtplib
#发送字符串的邮件
from email.mime.text import MIMEText
#处理多种形态的邮件主体我们需要 MIMEMultipart 类
from email.mime.multipart import MIMEMultipart
#处理图片需要 MIMEImage 类
from email.mime.image import MIMEImage
 
# qq邮箱smtp服务器
host_server = 'smtp.qq.com'
# sender_qq为发件人的qq号码
sender_qq = '13VVVVVVVV@qq.com'
# pwd为qq邮箱的授权码
pwd = 'nzrVVVVVVVV'
# 发件人的邮箱
sender_qq_mail = '13VVVVVVV@qq.com'
# 收件人邮箱
receiver = '13VVVVVVVVV@qq.com'

# 邮件的正文内容
mail_content = '你好，这是使用python登录qq邮箱发邮件的测试'
# 邮件标题
mail_title = 'Max\'s的邮件'

# ssl登录
smtp = SMTP_SSL(host_server)
# set_debuglevel()是用来调试的。参数值为1表示开启调试模式，参数值为0关闭调试模式
smtp.set_debuglevel(0)
smtp.ehlo(host_server)
smtp.login(sender_qq, pwd)

msg = MIMEText(mail_content, "plain", 'utf-8')
msg["Subject"] = Header(mail_title, 'utf-8')
msg["From"] = sender_qq_mail
msg["To"] = receiver
smtp.sendmail(sender_qq_mail, receiver, msg.as_string())
smtp.quit()
```

## 2.发送带附件的邮件

使用MIMEMultipart来标示这个邮件是多个部分组成的，然后attach各个部分。如果是附件，则add_header加入附件的声明。

MIME有很多种类型，这个略麻烦，如果附件是图片格式，我要用MIMEImage，如果是音频，要用MIMEAudio，如果是word、excel，我都不知道该用哪种MIME类型了，得上google去查。最懒的方法就是，**不管什么类型的附件，都用MIMEApplication**，MIMEApplication默认子类型是application/octet-stream。

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication 
 
if __name__ == '__main__':
        fromaddr = '137xxxx@163.com'
        password = 'password'
        toaddrs = ['137xxxx@163.com', '137xxxx@qq.com']
 
        content = 'hello, this is email content.'
        textApart = MIMEText(content)
 
        imageFile = '1.png'
        imageApart = MIMEImage(open(imageFile, 'rb').read(), imageFile.split('.')[-1])
        imageApart.add_header('Content-Disposition', 'attachment', filename=imageFile)
 
        pdfFile = '算法设计与分析基础第3版PDF.pdf'
        pdfApart = MIMEApplication(open(pdfFile, 'rb').read())
        pdfApart.add_header('Content-Disposition', 'attachment', filename=pdfFile)
    
 
        zipFile = '算法设计与分析基础第3版PDF.zip'
        zipApart = MIMEApplication(open(zipFile, 'rb').read())
        zipApart.add_header('Content-Disposition', 'attachment', filename=zipFile)
 
        m = MIMEMultipart()
        m.attach(textApart)
        m.attach(imageApart)
        m.attach(pdfApart)
        m.attach(zipApart)
        m['Subject'] = 'title'
 
        try:
            server = smtplib.SMTP('smtp.163.com')
            server.login(fromaddr,password)
            server.sendmail(fromaddr, toaddrs, m.as_string())
            print('success')
            server.quit()
        except smtplib.SMTPException as e:
            print('error:',e) #打印错误
```

