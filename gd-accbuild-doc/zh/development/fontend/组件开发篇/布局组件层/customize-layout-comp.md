---
# 这是文章的标题
title: 动手写一个布局组件
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
<router-link :to="'/zh/guide/intro.html#概念设计'">布局组件(layout-ui)(点我看概念设计理念)</router-link>，是一个页面的最外层组件,用于控制内层组件的布局样式，内部可以承载多个biz组件或原子组件。目前支持栅格布局、固定布局+flex布局。
