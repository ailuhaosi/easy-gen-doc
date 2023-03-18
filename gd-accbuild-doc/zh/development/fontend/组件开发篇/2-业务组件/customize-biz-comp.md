---
# 这是文章的标题
title: 动手写一个业务组件
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 1
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
1. <router-link :to="'/zh/guide/intro.html#概念设计'">业务组件(biz-ui)(点我看概念设计理念)</router-link>，是向内部注入 "增删改查能力的组件" + "UI元数据(meta数据)"。
2. 为什么叫业务组件？首先用户的需求不管怎么变最终都总结为 **UI交互** + **数据的CURD**。这两个功能正是一个产品的**真正业务需求**，而业务组件的能力正是向内注入这两个功能，所以取名**业务组件(biz-ui)**。

## 动手写一个业务组件
### 业务组件源码文件夹结构介绍
* 官方内置的维度组件源码文件夹路径 `/src/uni_modules/gd-accbuild-template/components/gd-accbuild-ui/biz-ui`

示例:
```
biz-ui 业务组件文件夹
```
