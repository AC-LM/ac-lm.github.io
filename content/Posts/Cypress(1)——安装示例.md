---
title: Cypress(1)——安装示例
date: 2021-09-10
author: LM
---

```shell
cd /your/project/path
npm install cypress --save-dev
# 将cypress工程依赖安装在工程目录下
./node_modules/.bin/cypress.cmd version
# Windows下执行该命令
./node_modules/.bin/cypress version
# Linux执行该命令
./node_modules/.bin/cypress.cmd install
# 安装cypress二进程应用程序，程序将会被安装在  C:\Users\13126\AppData\Local\Cypress\Cache\8.3.1\Cypress 以供全局使用
./node_modules/.bin/cypress.cmd open
npx cypress open
# 启动项目
```



```javascript
describe('My Test', () => {
    it('finds the content', () => {
        cy.visit('http://192.168.1.243')
        var keyword = '测试直播'
        cy.get('.el-input__inner')
          .type(keyword)
          .should('have.value', keyword)
        cy.get('.search-btn')
          .click()
        cy.url()
          .should('include', '/search?keyword')
        cy.get('.logo')
          .click()
        cy.get('.search-btn')
          .click()
        cy.get('.el-message--warning')
          .should('have.text', '搜索内容不能为空')
    }); 
  })
```

