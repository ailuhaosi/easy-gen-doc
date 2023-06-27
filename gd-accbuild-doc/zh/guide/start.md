---
title: 快速上手
icon: markdown
order: 4
category:
  - 使用指南
tag:
  - 开始低代码之旅
---

通过学习本页面可以体验 0 基础搭建一个应用

<!-- more -->

## 前置条件

### 必要条件

1. 首先您必须拥有一个 DCloud 开发者中心账号，如果没有请前往注册，[注册地址](https://dev.dcloud.net.cn/#/pages/common/login?uniIdRedirectUrl=%252Fpages%252Findex%252Findex)。

### 可选条件(代码级开发必读)

1. 登录[Dcloud 开发者控制台](https://dev.dcloud.net.cn/#/pages/common/login?uniIdRedirectUrl=%252Fpages%252Findex%252Findex)，并开通 uniCloud 服务并<span style="color:red;">实名认证</span>。
2. 您必须拥有[HBuilderX 编辑器](https://www.dcloud.io/hbuilderx.html)，下载项目[工程代码](https://ext.dcloud.net.cn/plugin?id=13184) 安装优速搭编辑器插件(安装玩插件记得重启编辑器)，<del>并将项目工程代码编译打包上传到 uniCloud 的静态资源服务器中。同时上传云函数、上传 DBSchema 使用`db_init.json`初始化数据库。</del>

## 仅仅想体验一下
[访问官网](http://designer.gd-accbuild.com)<br/>
账号： `2772725741@qq.com`<br/>
密码: `Aa123456`<br/>

::: tip
  具体详细操作步骤请看视频教程，如创建项目遇到问题，请在 gitee 中提问
:::

- **注意点 1**：插件导入到 HBuilderX 后，必须手动进入插件安装目录使用(推荐 node v16.20.0)`npm install`重新生成 node_modules。(这大概是 HBuilderX 的 bug 后续官方会修复的)<br/>
- **注意点2**： 由于本系统使用了serverless，再加上没用任何缓存纯元数据动态拼接jql，第一次访问会比较慢如出现页面加载不出来情况，请您刷新页面重新尝试就可以了。(后面我们会进行针对性的后端优化)<br/>

## 动手创建一个后台管理应用

创建项目有两种入口,一种是编辑器中使用插件创建应用、另一种是在 web 浏览器中[访问官网](http://designer.gd-accbuild.com)。<br/>
两种方式操作界面完全相同：

1. 在编辑器中创建适合程序员使用,可以方便结合插件导出源码实现零代码低代码协调开发。
2. web 浏览器方式更适合零代码开发需求的朋友。<br/>
   当然两种最终效果完全相同，可以在浏览器中创建，后续在编辑器中开发;反之亦可。

### HBuilderX 中创建项目

需要前提您本地安装 npm、yarn、pnpm

1. 打开 HBuilderX、登录 DCloud 账号、导入上面提到的工程源码、双击根目录的"优速搭设计器"文件,即可看到如下界面
<div><img :src="$withBase('/images/guide/start/hbuilderx-start.png')" alt="登录" style="width:500px;" /></div>

2. 点击立即使用、在点击创建项目,即可看到如下界面
<div><img :src="$withBase('/images/guide/start/createProject.png')" alt="创建项目" style="width:500px;" /></div>

3. 填写项目名称、选择私有部署、填写 Dcloud 邮箱与密码、选择支付类型(每个实名用户,Dcloud 都提供一个免费的云空间)、点击一键部署;即可看到如下界面
<div><img :src="$withBase('/images/guide/start/publishTip.png')" alt="一键部署" style="width:500px;" /></div> 
此过程时间比较长,**申请并初始化云空间**,**编译打包项目发布到unicloud云托管中**,**上传云函数**、**初始化云数据库**等,最终会自动填充`spaceId`到表单里面;如过程有失败关掉HBuilderX重新尝试;或者您手动部署,然后把spaceId 拷贝到 表单里面<br/>
最终您看到控制台云数据库初始化完成后;登录[unicloud控制台](https://unicloud.dcloud.net.cn/)
<div><img :src="$withBase('/images/guide/start/publish-ok.png')" alt="部署完成" style="width:500px;" /></div> 
4. 检查(可以跳过)
检查上图中左边四项都以自动部署完,访问云托管默认域名,能正常使用,说明已经部署ok。<br/>
点击保存项目就创建完成了。<br/>
5. 开始体验
点击在线设计,即可开始体验<br/>
<div><img :src="$withBase('/images/guide/start/create-finish.png')" alt="体验" style="width:500px;" /></div>

在编辑器中进入在线开发时，会提示绑定项目地址，第一次需要手动选择,用于后续代码生成的项目地址。

<div><img :src="$withBase('/images/guide/start/project-path.png')" alt="project-path" style="width:500px;" /></div>

END!!!! :) **以上就是项目创建的整个流程**。
::: tip
具体详细操作步骤请看视频教程，~~(视频已过期)[优速搭应用设计器之动手创建一个后台管理应用视频地址](https://www.baidu.com)~~
:::
