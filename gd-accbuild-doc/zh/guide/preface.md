---
# 这是文章的标题
title: 前言
# 这是页面的图标
icon: creative
# 这是侧边栏的顺序
order: 1
# 设置作者
author: gd
# 设置写作时间
date: 2022-09-07
# 一个页面可以有多个分类
category:
  - 使用指南
# 一个页面可以有多个标签
tag:
  - 开始低代码之旅
# 此页面会在文章列表置顶
sticky: true
# 此页面会出现在文章收藏中
star: true
# 你可以自定义页脚
footer: 这是测试显示的页脚
# 你可以自定义版权信息
copyright: 无版权
---

## 低代码为什么一直不温不火？
自2020年前后，随着数字化转型需求的日益增加，低代码零代码的热度变得越来越高。好像如果公司不开发一个低代码平台就不`fashion`🔥了。因此近几年各种开源或商业的低代码相关产品不断涌现，但始终没有出现一款现象及的**合格的**低代码产品。<br/>
> **如何定义低代码的合格性**：我认为零代码低代码平台首先具备高度可扩展性，必须兼容开发者生态，以开源社区为驱动的，最重要的是可以**渐进式使用**，不能平台绑定，项目的运行不强制必须使用该平台全家桶(意味着架构层级分明互不耦合)。否则这样的平台只会是一种盲盒，随着项目复杂度的上升而令使用者(开发者)难以控制，不得不依赖平台来更新维护。
>
先抛开低代码，来谈谈一款优秀的开源框架都具备哪些特点?<br/>
以两个前端的当红炸子鸡 **Vue** 与 **React** 为例:
```mermaid
flowchart TD
    subgraph React架构
        react_org["NPM生态"] <-->|兼容已有生态| react["React"]
        style react fill:#f9f,stroke:#333,stroke-width:4px
        react -->|新范式| react_feature["All In JS、函数式编程"]
        subgraph React框架赋能
            react_feature --> react_jsx["HTML IN JS(JSX)"]
            react_feature --> react_css["CSS IN JS"]
        end
        subgraph React自建生态
            react_jsx --> react_生态["React组件库生态"]
            react_css --> react_生态["React组件库生态"]
            react_生态 --> react_子生态["AntD、taro等等"]
        end
    end

    subgraph Vue架构
        vue_org["NPM生态"] <-->|兼容已有生态| vue["Vue"]
        style vue fill:#f9f,stroke:#333,stroke-width:4px
        vue -->|新范式| vue_feature["渐进式"]
        subgraph Vue框架赋能
            vue_feature --> vue_spc["SPC(单文件组件)"]
            vue_feature --> vue_双向绑定["MVVM(双向绑定)"]
        end
        subgraph Vue自建生态
            vue_spc --> vue_生态["Vue组件库生态"]
            vue_双向绑定 --> vue_生态["Vue组件库生态"]
            vue_生态 --> vue_子生态["element-plus、uniapp等等"]
        end
    end
style react_生态 fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style react_子生态 fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style vue_生态 fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style vue_子生态 fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
```

可以看到一款优秀的开源框架必须向上兼容已有生态 的同时 向下引领一种新的编程范式进而衍生出自己的生态。<br/>
## 一款合格的低代码
来看看**优速搭**的架构，其中五大组件的具体概念[点我看概念设计理念](/zh/guide/intro.html#概念设计)
```mermaid
flowchart TD
    subgraph 优速搭架构
        gd_org["NPM生态、vue生态"] -->|兼容已有生态| gd["优速搭"]
        style gd fill:#f9f,stroke:#333,stroke-width:4px
        subgraph gd-accbuild新范式
            gd --> gd_feature["渐进式"]
            gd --> gd_feature2["元数据配置化UI"]
            gd --> gd_feature3["协同开发混合编程"]
            gd --> gd_feature4["支持serverless"]
        end
        subgraph 五大组件赋能
            gd_feature2 --> gd_scene["场景容器"]
            gd_feature2 --> gd_atomic["原子组件"]
            gd_other["..."]
        end
        subgraph gd-accbuild自建生态
            gd_scene --> gd_生态["优速搭组件库生态"]
            gd_atomic --> gd_生态["优速搭组件库生态"]
            gd_生态 --> gd_子生态["scene-container、gd-ui等等"]
        end
        subgraph IDEA插件
            gd_feature2 --> gd_visual["可视化配置Ui元数据工具"]
            gd_feature3 -->|UI元数据双向转化| gd_metaSync["表结构、Ui元数据同步工具"]
            gd_visual --> gd_metaSync
        end
        subgraph 后端生态
            gd_feature4 --> gd_uniCloud["uniCloud"]
            gd_uniCloud <--> gd_ideaData["表结构双向转化"]
            gd_ideaData <--> gd_backend["spring(若依框架)、expressJs"]
            gd_ideaData <--> gd_metaSync
        end
    end
style gd_生态 fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style gd_子生态 fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style gd_uniCloud fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style gd_backend fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style gd_visual fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style gd_metaSync fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
```

## 产品未来 与 技术众筹
一个优秀的开源产品一定是社区驱动，你一行我一行的pr共同汇聚而成的集体智慧。虽然目前低代码产品已经不少，但大多都是浮于用现成的开源产物的堆砌，几乎没怎么看到有从更高维度规划架构的。虽然我知道目前优速搭低代码平台尚在襁褓期，还有许多需要改进的地方。不过平台的基础架构我已经修整打磨近一年，基础架构已基本建立。而且平台部分组件已在内部项目中广泛使用，体验良好，大大提高了开发效率。但一人之力始终有限，因此诚邀网络上各路大牛各位开发者，如有愿意一起完成认领任务的 或 主动推广宣传的，您将享有以下福利政策。
::: tip
1. 凡是star了项目的可以限时免费使用设计器
2. 凡是贡献了代码的 属于 有效的新功能 或 修复bug的，可以免费使用设计器 以您个人名义或您所在公司使用，贡献高者可以共享优速搭低代码平台收益。
3. 凡是转发点赞评论了博主的优速搭相关技术文章的可以限时免费使用设计器
:::


## 关于作者
本人于17年电气工程及其自动化专业毕业，第一年从事过嵌入式、医学图像处理等工作岗位，但经历下来觉得都不是自己喜爱。后来受学生时代题库智能组卷等网站的启发，觉得自己也能搞一个，就于18年开始在家人支持下(家里经营着药房，应父母要求一边待业在家考执业药师证)自学web开发(前端、后端)。web开发是比较直观的可以见到输出，这更激起我对web开发的热爱。因此因为热爱所以坚持，同时期间看了大几十本编程架构等书籍、每天碎片时间刷刷"掘金app"、"开源中国app"。很快边学边做，第一个产品出来了。而且还不错受到了一家两轮融资的教育直播公司的合伙邀请。不过可惜最终因题库版权风险承担问题，还是遗憾放弃了。随后的 2019 年 - 2020 年 期间本人加入了一家远程办公的企业。并使用`renren-fast`、`ruoyi`等后端框架做过大量项目，其中在开发过程中使用代码生成器`codegen`后，启发了开始低代码方面的探索之路。但由于远程与在大厂工作相比提高历练毕竟有限，于是在 2021 年入职某头部工业互联网企业，期间接触很多其它的各类垂直领域的制造业低代码平台，在使用后觉得目前市面上的低代码平台仍有很多改进空间。因此开始了优速搭低代码平台的自研之路。