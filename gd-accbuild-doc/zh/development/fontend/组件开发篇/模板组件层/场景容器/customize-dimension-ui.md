---
# 这是文章的标题
title: 动手写一个场景容器
# 这是页面的图标
icon: page
# 这是侧边栏的顺序
order: 2
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
1. <router-link :to="'/zh/guide/intro.html#概念设计'">场景容器(scene-container)(点我看概念设计理念)</router-link>，场景容器不是凭空创造的概念，场景容器是维度组件的具体应用。不同使用场景使用的组件可能不太一样，平台内置有 表单、表格等容器。场景容器分为 一维型:**对象型容器**(表单)、二维型:**数组型容器**(表格、循环的卡片等)、复合容器(表格+搜索表单+按钮事件表单)。表单中的每一项 与 其它项的联动;表格中每行每列与其它行列的联动。都可以通过在事件回调中修改对应的meta数据来实现。
2. 为什么叫场景容器？场景容器内部使用维度组件进而解决组件之间联动交互问题，而在不同**场景容器**里面，需要支持的联动维度不同，对象型容器(表单)是一维联动，(表格、循环的卡片等)需要支持二维联动。

## 场景容器与设计器属性面板
目前市面上大多数的设计器是基于开源的[form-generator](https://mrhj.gitee.io/form-generator/#/)等产品构建;但真实体验过后会发现此类设计器的局限性很大，通常只适用于表格表单，通用性不够，属性面板属性太多没有整理分类用户操作起来繁琐。因此我们经过大量实践总结出以下的属性面板
<div><img :src="$withBase('/images/development/scene/attr-panel-block.png')" alt="属性面板" style="width:500px;" /></div>

我的属性面板是针对场景容器设计的，每个场景容器属性面板结构都相同。<br/>
分为3个区块：**主数据**、**搜索数据**、**按钮及其事件流**<br/>
每个区块又有各自的三个子配置区：**容器属性**、**数据及其组件配置**、**容器事件**<br/>

## 动手写一个场景容器
### 场景容器源码文件夹结构介绍
* 官方内置的维度组件源码文件夹路径 `/src/uni_modules/gd-accbuild-template/components/gd-accbuild-ui/scene-container`

示例:
```
scene-container 场景容器文件夹
|----scene-container-form 表单
|----scene-container-search-form 搜索表单
|----scene-container-table-form 表格+搜索表单+按钮事件表单
|----scene-container-tree 树+按钮事件表单
```
