---
# 这是文章的标题
title: 动手写一个原子组件
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

## 前置知识:

<router-link :to="'/zh/guide/intro.html#概念设计'">原子组件(atomic-ui)(点我看概念设计理念)</router-link> 是 最基础的组件。可以在 维度组件  内部渲染的。

## 动手写一个原子组件

### 原子组件文件夹结构解析

* xxx-ui文件夹为用户的自定义组件,xxx为命名空间
* gd-ui是优速搭官方提供的原子组件
* 官方内置的原子组件源码文件夹路径 `/src/uni_modules/gd-accbuild-template/components/gd-accbuild-ui/gd-ui`


示例:
```
xxx-ui 自定义的命名空间的原子组件
|----xxx-input  其中一个原子组件的文件夹
        |----xxx-input.vue  具体原子组件逻辑
        |----designer  设计器相关配置文件
                |-----designer-attr-panel.js  设计器的属性面板 当选择该原子组件时的可视化配置项
                |-----designer-comp-picker.json  设计器的左侧组件列表中显示的图标、名称等,以及在级联选择器中的配置
```
### 在线编写原子组件

#### 打开在线Coding界面
按照下图操作：打开开发平台 -> 进入组件入口 -> 选择原子组件 -> 点击在线编写组件 -> 显示如下界面。
<img :src="$withBase('/images/online-coding-comp.png')" alt="在线编写原子组件操作步骤" />
<img :src="$withBase('/images/online-coding-comp-ui.png')" alt="在线编写原子组件界面" />

#### 拷贝模板代码到编辑器并做相应修改
<BizCodeWithFolding type="AtomicCompTemplateVue" />
通过调试**Mock元数据**查看原子组件效果。

#### 新建该原子组件可视化的配置文件
<BizCodeWithFolding type="NewAtomicCompVisualConf" />

#### 保存并上传该原子组件所有文件