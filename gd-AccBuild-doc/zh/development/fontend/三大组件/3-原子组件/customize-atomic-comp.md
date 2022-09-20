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
  - 二次开发
# 一个页面可以有多个标签
tag:
  - 简介
  - 前端
  - 二次开发
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

原子组件：一种可以在**CRUD容器**内渲染的基础组件，且由于**CRUD容器**分为 数组型容器(表格、循环的卡片等)、对象型容器(表单)，所以原子组件也必须兼容数组型和对象型。

## 动手写一个原子组件

### 在线编写原子组件

#### 打开在线Coding界面
按照下图操作：打开开发平台 -> 进入组件入口 -> 选择原子组件 -> 点击在线编写组件 -> 显示如下界面。
![在线编写原子组件操作步骤](/images/online-coding-comp.png)
![在线编写原子组件界面](/images/online-coding-comp-ui.png)

#### 拷贝模板代码到编辑器并做相应修改
<BizCodeWithFolding type="AtomicCompTemplateVue" />
通过调试**Mock元数据**查看原子组件效果。

#### 新建该原子组件可视化的配置文件
<BizCodeWithFolding type="NewAtomicCompVisualConf" />

#### 保存并上传该原子组件所有文件
