---
# 这是文章的标题
title: 合格低代码的生态架构
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
copyright: 优速搭出品
---

## 软件开发形态的思考

从 2019 年底低代码还是个<u style="color:red;">新鲜</u>的名词；到 2020 年-2021 年`LowCode-NoCode`平台<u style="color:red;">泛滥</u>各家都忙着圈钱 💰 融资发布自己的平台；到 2022 年<u style="color:red;">冷却期</u>看似美好的低代码并未被广大开发者接受使用，某搭、某道云等并没有普及到软件公司外包公司等；再到 2023 年初`chatGPT`和`AIGC`火遍各行各业，引起各种<u style="color:red;">职业危机论</u>(包括程序员 😱)。各种声音，各种焦虑，什么前端已死等论调甚嚣尘上，可以说卷也可以说是技术发展的繁荣或技术爆炸。<span @click="onClickMoreWorry" class="click-me">点我更多阐述。</span><span v-show="isShowMoreWorry">因此我也会停下来思考自己还算比较早接触低代码，一直在孤独的战斗，花时间花精力的做的这个产品，到底会不会最终只是个自己耍耍的玩具。好在去年(2022 年)我在掘金发表了一篇[关于低代码的文章初版的优速搭介绍](https://juejin.cn/post/7131258179026944013)，没有宣传但收到不错的反响，也有小伙伴加我微信让我催更，因此我觉得我必须坚持下去(`Just Do It!`)。</span>所以我做低代码产品的时候时刻会提醒自己，**不盲目跟风**、**不随意贬低**、**不重复造轮子**且**独立思考提出自己的观点**。多问几句**你解决了什么问题，这个问题别人解决了吗。**<br/>
所以我们来确认软件开发领域的真实需求是什么？

1. **降本增效**永远会存在，特别在经济低迷时期。因此快速开发、程序员与非程序员协同开发，程序员只做特殊场景的定制，这种开发范式将必然会出现。
2. **灵活可扩展**。是针对第一点的补充。这意味着低代码平台必须具备渐进式、既提供新的开发范式也不能限制使用其它的开发范式。
3. **可控性与安全性**的需求永远会存在。在需要**风险承担**、**严格责任分配**的场景 AI 始终不可能替代人类，最多是辅助人类的角色。最好的例子就是自动驾驶发展了那么多年，但滴滴司机等职业依然不受影响，所以无人驾驶应该短期内不可能普及。把 AI 比作无人驾驶，低代码平台就好比辅助驾驶。<span @click="onClickMoreSafe" class="click-me">点我更多阐述</span><br/> <span v-show="isShowMoreSafe">企业开发的软件**不允许不可控**、**不允许黑盒**。确实`chatGPT`的出现具有划时代的意义，就像第一台电子计算机是`ENIAC`,虽然目前仍十分笨重，训练一次要几百万美元，但随着后续的不断更新迭代很可能会像现在的智能手机一样人手一个`个性化AI`。虽然`chatGPT4.0`可以根据草图、根据语言描述生成高质量的代码，但目前还需要人工去合并代码编译运行。但这种没有久经项目考验没有出处来源的`GC`出来的代码真的敢不测试就上线使用吗?就算通过测试上线后续维护重构将是灾难。李开复也提到在容错性领域 AI2.0 将会大量被应用，但代码等工程类开发是不允许容错的。<br/>下图很好阐述了`人类语言 <---> AI <---> 编程语言 <---> 低代码` 四者的关系。<br/>其中<u> AI 解决的是从大范围到小范围，自然存在使用者描述不精确导致最终产出的准确性无法保证。</u><br/><u>低代码解决的是小范围到大范围，在易用性上是最佳的选择。</u><br/>当然易用也意味着丢失了灵活性，但这个问题可以通过，零代码低代码混合编程、平台提供给开发者代码级的控制权限即可。(后面会出具体视频演示如何高效的混合编程)
   </span>

```mermaid
flowchart LR
    x1["."] --- x["模糊性、不可控"]
    a["人类语言(范围最大)"] -->|"AI(直接交互)"| b["编程语言"]
    c["配置化声明式编程(范围最小)"] -->|"低代码工具"| b[编程语言]
    a -->|"AI(协助)"| c
    y1["."] --- y["规范性、可控性"]
%% 定义样式类
classDef nullNode fill: #fff, stroke: #fff, stroke-width: 2px, stroke-dasharray: 5,5;
%% 应用样式类
class x1 nullNode
class y1 nullNode
linkStyle 0 stroke:#fff,stroke-width:0px;
linkStyle 4 stroke:#fff,stroke-width:0px;
style x fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style y fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
```

综上，**基于成熟可信代码库的低代码平台框架之上的可配置化编程 或者 搭配 AI 来辅助配置**，应该是软件开发的**最优平衡方案**。

## 低代码为什么一直不温不火？

### 先问 chatGPT，它给我的答案

- 问题 1. 程序员为什么不愿意使用低代码平台？
  <span @click="picJump('/images/问 chatgpt-程序员为什么不愿意使用低代码平台.jpg')" class="click-me">点我看答案</span>
- 问题 2. 低代码平台如何支持高代码？<span @click="picJump('/images/问 chatgpt-低代码平台如何支持高代码.jpg')" class="click-me">点我看答案</span>

### 其他朋友对低代码的质疑

1. 问题一：低代码就是**旧瓶装新酒**、**换汤不换药**<br/>
   答: 目前市面上大多数的低代码都 重心放在可视化配置 自己搞一套 孤立于业界标准的 联动语法公式，虽然可以实现需求，但对开发者的学习成本又大大增加，并且使用起来相当繁琐。而忽略了架构分层的设计、开发范式的创新,这才是低代码被黑的那么惨的根本原因，**不是没有需求，而是体验一言难尽**。而一款流行的开发框架恰恰**重心在于底层设计，而不是门面功夫**。----- ps. 详见 **优速搭平台的软件架构**、**开发框架的范式创新**
2. 问题二：低代码是**黑盒**,**联动交互复杂**怎么解决,我的页面很特殊怎么自定义,我改代码了你的设计器还能再次编辑使用吗<br/>
   答：作者近 3 年在国内头部工业互联网企业工作，从事了低代码平台的应用与研发，工业界应该是低代码行业重度使用的第一批尝鲜者，因此在此期间使用过程中深有感悟和体验。比如由于低代码核心是 schema 定义，但平台的 schema 很不规范，一个页面一个巨大 json 的 schema。所有的联动均是在线配脚本，导致脚本东一个西一个满天飞，根本不好排查。因此我针对这些种种糟心的经历，设计了**分层 schema**、**元数据驱动 UI**、"**主动触发事件**" + "**被动监听事件**" + "**可视化事件流**(开发中)" 等来解决以上问题。

<script setup>
import { ref,onMounted } from 'vue';
import { withBase } from '@vuepress/client'

const isShowMoreWorry = ref(true)
const onClickMoreWorry = ()=>{
    isShowMoreWorry.value = !isShowMoreWorry.value;
}
const isShowMoreSafe = ref(true)
const onClickMoreSafe = ()=>{
    isShowMoreSafe.value = !isShowMoreSafe.value;
    const dom = document.querySelector(".md-enhance-mermaid")
    dom.style=isShowMoreSafe.value ? "display:block;" : "display:none;"
}
onMounted(()=>{
    onClickMoreWorry()
    onClickMoreSafe()
})
const picJump = (url)=>{
    window.open(withBase(url),"_blank")
}
</script>
<style scoped>
    .click-me{
        cursor:pointer;color:blue;
    }
</style>

### 低代码前两年火过了，现在又不行了？

先说答案：并不是。<br/>
一个技术的发展都遵循技术成熟度曲线(如下图)

<div><img :src="$withBase('/images/preface-技术成熟度曲线.jpg')" alt="技术成熟度曲线" /></div>

能够进入`Gartner`报告的技术,说明低代码的市场需求是存在的。**当前低代码正处于稳步爬升期**。然而我们的社会正处于信息爆炸技术爆炸的时代。还没等低代码发展成熟，`chatGPT`就来截胡了。**而国内的环境总是什么热门就去追逐什么，缺乏踏实务实追逐技术本身的一种坚持**。这也是为什么中美在前沿技术竞争中技术成果或概念提出总是美国先出现(可回收火箭、可控核聚变、云计算、AlphaGo、chatGPT、低代码...)。

### 什么是合格的低代码？

自 2020 年前后，随着数字化转型需求的日益增加，低代码零代码的热度变得越来越高。好像如果公司不开发一个低代码平台就不`fashion`🔥 了。因此近几年各种开源或商业的低代码相关产品不断涌现，但始终没有出现一款现象及的**合格的**低代码产品。<br/>

> **如何定义低代码的合格性**：我认为零代码低代码平台首先具备高度可扩展性，必须兼容开发者生态，以开源社区为驱动的，最重要的是可以**渐进式使用**，不能平台绑定，项目的运行不强制必须使用该平台全家桶(意味着架构层级分明互不耦合)。否则这样的平台只会是一种盲盒，随着项目复杂度的上升而令使用者(开发者)难以控制，不得不依赖平台来更新维护。
>
> 先抛开低代码，来谈谈一款优秀的开源框架都具备哪些特点?<br/>
> 以两个前端的当红炸子鸡 **Vue** 与 **React** 为例:

```mermaid
flowchart TD
    subgraph React架构
        react_org["NPM生态"] <-->|兼容已有生态| react["React"]
        style react fill:#f9f,stroke:#333,stroke-width:4px
        react -->|新范式| react_feature["All In JS、函数式编程"]
        subgraph React框架赋能
            react_feature --> react_jsx["HTML IN JS(JSX)"]
            react_feature --> react_css["CSS IN JS"]
			react_other["..."]
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
			vue_other["..."]
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

来看看**优速搭**的架构，其中五大组件的具体概念<router-link :to="'/zh/guide/intro.html#概念设计'">(点我看概念设计理念)</router-link>

```mermaid
flowchart TD
    subgraph 优速搭架构
        gd_org["NPM生态、vue生态"] -->|兼容已有生态| gd["优速搭"]
        style gd fill:#f9f,stroke:#333,stroke-width:4px
        AIGC["AIGC、chatGPT"] -->|辅助| gd_feature2["元数据配置化UI"]
        subgraph gd-accbuild新范式
            gd --> gd_feature2["元数据配置化UI"]
            gd --> gd_feature3["协同开发混合编程"]
            gd --> gd_feature["渐进式"]
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
style AIGC fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style gd_生态 fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style gd_子生态 fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style gd_uniCloud fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style gd_backend fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style gd_visual fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
style gd_metaSync fill: #ccf, stroke: #f66, stroke-width: 2px, stroke-dasharray: 5,5;
```

## 产品未来

### 与竞品区别、优势在哪里

我在开发过程中也和一些前端后端小伙伴交流过，下面是他们提出的质疑与我的回复：<br/>

1. 问：<span style="color:red;">你与市面上的低代码产品有什么区别？</span><br/>
   答：优速搭提供**库模式使用**，即你可以在不改动原来工程的情况下渐进式的体验**配置驱动 UI 的新范式**、可以先在设计器配置再本地二次开发**体验零代码低代码混合编程**带来的高效。
2. 问：<span style="color:red;">你这个与前端 UI 库有什么区别？</span><br/>
   答：前端 UI 库相当于优速搭<router-link :to="'/zh/guide/intro.html#概念设计'">五大组件中的原子组件</router-link>，他们一般都不会包含 **增删改查**的前端接口与后端功能、**交互联动**的事件增强、**可视化设计**等等。
3. 问：<span style="color:red;">你这个不就是个带有前后端增删改查的页面模板吗，那人家各种项目页面又不一定都长成你这样，需求怎么满足？</span><br/>
   答：诚然，优速搭提供的五大组件中`场景容器(scene-container)`(注：`biz-ui`是通过平台脚本由场景容器自动生成的)确实相当于一种固定模板，因为具体场景下的界面**使用步骤基本已经固化**，比如后台管理项目的表格组件肯定是有搜索框、新增编辑按钮；移动端下拉列表肯定是下拉到底部会触发 getList 请求。这些**固化的体验都会封装在`场景容器`里面**。当然具体样式长成什么样，平台只会提供默认样式或几套皮肤，如果您要特别个性化绚丽的样式这就得您去覆盖样式表了。另外容器里面你是要放置 text 还是 input、select 等等这都是可以通过配置原子组件实现。当然`场景组件`和`原子组件`也是生态的一部分，只要开发者一起共同参与共同完善，使用体验才会越来越好。
4. <span style="color:red;">你这个主要是偏前端低代码吧，后端呢怎么没看到有特别说的详细？后端高并发等等需求你能满足吗？</span><br/>
   答：诚然，**低代码核心就是可视化配置**，**重点是前端组件库的丰富**。至于后端，零代码层面市面上大多数方案基本都是所有前后端交互用一个接口(最少的接口)实现，通过传参等实现具体哪个页面那张表的增删改查。所以平台提供了 js、java(kotlin/js)两种语言的库实现这样功能。但具体是不是高并发取决于您的上层框架，**我们仅提供通过配置的元数据动态生成 sql 直接对数据库的增删改查**，不会存在性能瓶颈。

### 技术众筹

低代码类属于偏应用的基建类产品，一个优秀的基建类软件产品一定是社区驱动，你一行我一行的 `PR` 共同汇聚而成的集体智慧。虽然目前低代码产品已经不少，但大多都是浮于用现成的开源产物的堆砌，很少看到有从更高维度规划架构的。虽然我知道目前优速搭低代码平台尚在襁褓期，还有许多需要改进的地方。不过平台的基础架构我已经修整打磨超过一年，期间重构过好几次，基础架构已基本建立。而且平台部分组件已在内部项目中广泛使用，体验良好，大大提高了开发效率。但一人之力始终有限，因此诚邀网络上各路大牛各位开发者，如有愿意一起完成认领任务的 或 主动推广宣传的，您将享有以下福利政策。
::: tip

1. 凡是 star [优速搭低代码引擎](https://gitee.com/gd771747384/gd-accbuild-template)可以限时免费使用设计器(因为优速搭低代码平台的使用没有其它任何费用，仅对设计器使用会收取部分费用，而且至少 2023 年底之前完全免费,另外后续开发者基本也是免费使用，仅对企业用户收取高级版服务费)
2. 凡是点赞+评论+转发 了博主的优速搭相关技术文章的可以限时免费使用设计器(同上)
3. 凡是贡献了代码的 属于 有效的新功能 或 修复 bug 的，可以免费使用设计器 以您个人名义或您所在公司使用。<strong>贡献高的可以获得优速搭低代码平台未来的收益，共享睡后收入。若公司正常运营盈利后，每年会拿出至少 25%的收入奖励给参与开发的朋友(不是大多数公司一样用期权上市来画大饼)，另外30%预留未来可能资本引入，剩余用于公司储备与营销成本等</strong>相比于公司上班的老板对你的评价通过绩效考核(比较虚)，开源的贡献是社区共同见证的，你的付出每个人都能看到，不用担心付出与回报会不匹配。愿意贡献代码的可加群交流<span @click="picJump('/images/永久-开源参与群 1.png')" style="cursor:pointer;color:red;">点我扫码</span>

:::

### 资金众筹

由于目前作者还未完全离职，无法全心完善低代码产品。如果您认为优速搭还不错的话，愿意支持作者。作者将做出以下承诺：

1. **终身包退服务**，如果在后续(一年以后),使用本低代码产品功能体验上不满意，且有更好的替代产品，则我们将**退还所有**您提供的众筹资金。
   ------ 这应该是大多数低代码产品不敢承诺的，我们敢承诺不是盲目自信，而是对自己产品的执着，是对自己努力打造一个好用易用的产品的一种约束。

2. 凡是给作者众筹的朋友，按金额标准享有对应的使用优速搭设计器及其相关产品的**终身使用权**，包括后续平台升级更新。
   | | 免费 | 5000 元 | 10000 元 |
   | :--- | :----: | :----: | ---: |
   | 前端源码导出 | YES | YES | YES |
   | 后端 java 源码导出 | NO | NO | YES |
   | 规则引擎 | NO | YES | YES |
   | 流程引擎 | NO | NO | YES |
   | chat-to-site | NO | NO | YES |

**众筹总金额：30万**<br/>
众筹金额一方面是用于作者未来一年的养家糊口;另一方面是对赌，因为大家素未蒙面,**终身包退**是对您的一种保障，起码您不亏。<br/>
有意向的朋友发邮件联系作者，`gd-accbuild.qq.com`;主题备注:`资金众筹`

## 关于作者

本人于 17 年电气工程及其自动化专业毕业，第一年从事过嵌入式、医学图像处理等工作岗位。后来离职于 18 年开始自学 web 开发(前端、后端)。同时期间看了大几十本不同类型的编程方面、架构方面的书籍、每天碎片时间刷刷"掘金 app"、"开源中国 app"、看博客了解各种"XX 最佳实践"。学完后做了个创业项目，做题库型组卷类产品。后来也有公司看中 需要 标注过数据的题库，但可惜最终题库我是爬虫获取的因题库版权风险承担问题，还是遗憾放弃了。随后的 2019 年 - 2020 年 期间本人加入了一家远程办公的企业。并使用`renren-fast`、`ruoyi`等后端框架做过大量项目，其中在开发过程中使用代码生成器`codegen`后，启发了开始低代码方面的探索之路。但由于远程与在大厂工作相比提高历练毕竟有限，于是在 2021 年入职某头部工业互联网企业，期间接触很多其它的各类垂直领域的制造业低代码平台，在使用后觉得目前市面上的低代码平台仍有很多改进空间。因此开始了优速搭低代码平台的自研之路。

<Comment-Main />
