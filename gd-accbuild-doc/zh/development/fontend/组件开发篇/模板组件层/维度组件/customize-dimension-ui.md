---
# 这是文章的标题
title: 动手写一个维度组件
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 3
# 设置作者
author: gd
# 设置写作时间
date: 2022-09-07
# 一个页面可以有多个分类
category:
  - 优速搭二次开发
# 一个页面可以有多个标签
tag:
  - 简介
  - 前端
  - 优速搭二次开发
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 这是测试显示的页脚
# 你可以自定义版权信息
copyright: 优速搭 版权所有
---

## 前置知识
1. <router-link :to="'/zh/guide/intro.html#概念设计'">维度组件(dimension-ui)(点我看概念设计理念)</router-link>，维度组件不是凭空创造的概念，是为了解决低代码平台组件间联动等问题。维度组件分为 一维型:**对象型容器**(表单)、二维型:**数组型容器**(表格、循环的卡片等)。表单中的每一项 与 其它项的联动;表格中每行每列与其它行列的联动。都可以通过在事件回调中修改对应的meta数据来实现。
2. 为什么叫维度组件？维度组件是为了解决组件之间联动交互问题，而在不同**场景容器**里面，需要支持的联动维度不同，对象型容器(表单)是一维联动，(表格、循环的卡片等)需要支持二维联动。

## 动手写一个维度组件
### 维度组件源码文件夹结构介绍
* 官方内置的维度组件源码文件夹路径 `/src/uni_modules/gd-accbuild-template/components/gd-accbuild-ui/dimension-ui`

示例:
```
dimension-ui 维度组件文件夹
|----dimension-item-content  包裹原子组件的维度项组件,此文件夹内代码自动生成，禁止手动编写
|----dimension-form 一维容器，表单
|----dimension-search-form 一维容器，搜索表单
|----dimension-table-form  二维容器，表格
```
