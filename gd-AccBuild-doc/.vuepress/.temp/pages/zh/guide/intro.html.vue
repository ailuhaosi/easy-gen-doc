<template><div><h2 id="什么是优速搭" tabindex="-1"><a class="header-anchor" href="#什么是优速搭" aria-hidden="true">#</a> 什么是优速搭？</h2>
<p>优速搭是一款用于搭建web、app、小程序等应用的低代码平台。而且支持二次开发，允许二次开发后反向可视化继续配置。在不失灵活性的前提下，大大提高您开发应用的效率。<br/>
优速搭包含了 应用设计器、应用市场、模块市场、前端组件库、前端项目框架(uniapp)、后端项目框架(ruoyi-pro)、后端核心包、业务流程引擎、审批流程引擎等。<br/>
优速搭低代码平台由多个功能部分组成，且平台是面向零代码、低代码、高代码所有用户开放的，因此不同用户需要了解的功能有所侧重，以下是不同使用者对应需要侧重了解的功能。</p>
<table>
<thead>
<tr>
<th style="text-align:center">功能部分</th>
<th style="text-align:center">描述</th>
<th style="text-align:center">使用群体</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">应用设计器</td>
<td style="text-align:center">可视化的管理数据、配置页面呈现。(支持源码导出)</td>
<td style="text-align:center">零代码NoCode</td>
</tr>
<tr>
<td style="text-align:center">应用市场</td>
<td style="text-align:center">由其它用户使用优速搭平台开发的完整应用，能直接复用整个应用，且可在设计器中自己订制。</td>
<td style="text-align:center">零代码NoCode</td>
</tr>
<tr>
<td style="text-align:center">模块市场</td>
<td style="text-align:center">由其它用户使用优速搭平台开发的模块，能直接复用，且可在设计器中引用集成该模块。</td>
<td style="text-align:center">零代码NoCode</td>
</tr>
<tr>
<td style="text-align:center">前端项目框架(uniapp)</td>
<td style="text-align:center">允许用户按一定规范修改前端页面代码，并且不会在与零代码混合开发时发生冲突。</td>
<td style="text-align:center">低代码LowCode</td>
</tr>
<tr>
<td style="text-align:center">后端项目框架(ruoyi-pro)</td>
<td style="text-align:center">允许用户按一定规范修改后端逻辑代码，并且不会在与零代码混合开发时发生冲突。</td>
<td style="text-align:center">低代码LowCode</td>
</tr>
<tr>
<td style="text-align:center">前端组件库</td>
<td style="text-align:center">允许用户以NPM包的方式使用前端组件。</td>
<td style="text-align:center">高代码ProCode</td>
</tr>
<tr>
<td style="text-align:center">后端核心包</td>
<td style="text-align:center">允许用户以Maven包的方式使用后端增删改查逻辑。</td>
<td style="text-align:center">高代码ProCode</td>
</tr>
</tbody>
</table>
<h2 id="应用设计器简介" tabindex="-1"><a class="header-anchor" href="#应用设计器简介" aria-hidden="true">#</a> 应用设计器简介</h2>
<p>通常开发一款应用涉及两部分 前端开发 和 后端开发。前端开发用于搭建页面呈现效果，页面交互逻辑，并把后端提供的数据渲染出来。后端开发用于处理业务上的数据维护(增删改查)、业务流程的调度等。<br/>
因此优速搭应用设计器也分为以下两部分：</p>
<h3 id="数据维护" tabindex="-1"><a class="header-anchor" href="#数据维护" aria-hidden="true">#</a> 数据维护</h3>
<ol>
<li>物理表的基础维护<br/>
<img src="/images/1.1Designer-DataMgr.png" alt="物理表的基础维护" loading="lazy"></li>
<li>字典的基础维护<br/>
<img src="/images/1.2Designer-DictMgr.png" alt="字典的基础维护" loading="lazy"></li>
<li>关联关系的维护(表关联、字典关联)<br/>
<img src="/images/1.3Designer-RelationMgr.png" alt="关联关系的维护" loading="lazy"></li>
</ol>
<h3 id="页面配置" tabindex="-1"><a class="header-anchor" href="#页面配置" aria-hidden="true">#</a> 页面配置</h3>
<p><img src="/images/2.2Designer-SettingPage.png" alt="页面可视化配置" loading="lazy"></p>
<h2 id="优速搭低代码实现原理" tabindex="-1"><a class="header-anchor" href="#优速搭低代码实现原理" aria-hidden="true">#</a> 优速搭低代码实现原理</h2>
<p>首次进入应用会调用一次资源接口(<code v-pre>getResourceList</code>)存放在本地，以获取应用需要哪些页面，以及每个页面的配置信息(如页面的<code v-pre>布局信息</code>、由哪些<code v-pre>biz组件</code>组成)。每当跳转到一个页面的时候，会根据页面的配置信息渲染出对应的界面。每个页面由多个<code v-pre>biz组件</code>构成，<code v-pre>biz组件</code>也称为<code v-pre>biz容器</code>，内部可以容纳维度组件包裹的原子组件。在应用设计器中修改<code v-pre>biz容器属性</code>、<code v-pre>原子组件的属性</code>实现定制化页面的效果。</p>
<h2 id="概念设计" tabindex="-1"><a class="header-anchor" href="#概念设计" aria-hidden="true">#</a> 概念设计</h2>
<ol>
<li>简介: <strong>优速搭</strong>为了解决灵活性可配置性的同时降低用户的二开成本。<strong>首创提出</strong>四种组件：<strong>布局组件(layout-ui)</strong>、<strong>业务组件(biz-ui)</strong>、<strong>维度组件(dimension-ui)</strong>、<strong>原子组件(atomic-ui)</strong>。通常情况下用户有个性话需求只需要上传原子组件即可,当然在线设计完成后可下载源码完全离线继续二次开发。</li>
<li>设计思路: 组件的按此分类设计是经过大量实践沉淀总结出来的。每一层组件都分别对应解决不同的问题，并非凭空创造的概念。首先用户的需求不管怎么变最终都总结为 <strong>UI交互</strong> + <strong>数据的CURD</strong>。优速搭将每个组件都对应成<strong>schema</strong>,<strong>schema</strong>即<strong>UI</strong>。所以最核心的是<strong>业务组件(biz-ui)</strong>,业务组件没有额外功能仅提供注入能力,注入<strong>meta数据</strong>控制UI、注入<strong>data数据</strong>控制内容的变化。<strong>业务组件</strong>处理完后就将注入的<strong>meta数据</strong>和<strong>data数据</strong>交给<strong>维度组件</strong>,维度组件中的<code v-pre>dimension-item-content</code>组件能够把包裹其中的<strong>原子组件</strong>内的属性、事件进行增强，使得组件之间联动交互更方便。</li>
</ol>
<Mermaid id="mermaid-64a56fae" code="graph%20TD%0AX%5B%22%E9%A1%B5%E9%9D%A2%22%5D%20--%3E%20A%5B%22%E5%B8%83%E5%B1%80%E7%BB%84%E4%BB%B6(layout-ui)%22%5D%0AA%20--%3E%7C%E6%8F%90%E4%BE%9B%20%E6%8E%92%E7%89%88%E8%83%BD%E5%8A%9B%7C%20B(%22%E4%B8%9A%E5%8A%A1%E7%BB%84%E4%BB%B6(biz-ui)%22)%0AB%20--%3E%7C%E6%B3%A8%E5%85%A5%20meta%E6%95%B0%E6%8D%AE%E5%92%8Cdata%E6%95%B0%E6%8D%AE%7C%20C%5B%22%E7%BB%B4%E5%BA%A6%E7%BB%84%E4%BB%B6(dimension-ui)%22%5D%0AC%20--%3E%7C%E5%A2%9E%E5%BC%BA%20%E5%B1%9E%E6%80%A7%E5%92%8C%E4%BA%8B%E4%BB%B6%7C%20D%5B%22%E5%8E%9F%E5%AD%90%E7%BB%84%E4%BB%B6(atomic-ui)%22%5D%0AD%20-...-%3E%7C%E9%80%90%E5%B1%82%E7%BB%84%E8%A3%85%7C%20X%0A"></Mermaid><h3 id="四种组件对比" tabindex="-1"><a class="header-anchor" href="#四种组件对比" aria-hidden="true">#</a> 四种组件对比</h3>
<div style="overflow-x:scroll;min-width:100%;">
<table>
<tr style=""><td colspan="10" style="min-width:100%;display:flex;flex-direction: row;justify-content:space-between;"><div>顶层</div><div style="widtn:100px;">----></div><div>底层</div></td></tr>
    <tr>
        <th style="min-width:80px;">组件分类</th>
        <td>布局组件(layout-ui)</td>
        <td>业务组件(biz-ui)</td>  
        <td>维度组件(dimension-ui)</td> 
        <td>原子组件(atomic-ui)</td> 
    </tr>
    <tr>
        <th style="min-width:80px;">简介</th>
        <td style="min-width:220px;">布局组件，是一个页面的最外层组件,用于<strong>控制内层组件的布局样式</strong>，内部可以承载多个业务组件或原子组件。目前支持栅格布局、固定布局+flex布局</td>
        <td style="min-width:220px;">业务组件(biz-ui)，是向<strong>下一层组件</strong>注入 "增删改查能力" + "UI元数据(meta数据)"的组件。</td>
        <td style="min-width:220px;">维度组件，维度组件不是凭空创造的概念，是为了解决低代码平台组件间联动交互等问题。维度组件<strong>包裹</strong>了原子组件，<strong>增强了 内部原子组件的属性和事件</strong>。维度组件分为 一维型:对象型容器(表单)、二维型:数组型容器(表格、循环的卡片等)。表单中的每一项原子组件 与 其它原子组件的联动;表格中每行每列与其它行列的联动。都可以通过在事件回调中修改对应的meta数据来实现。</td>
        <td style="min-width:220px;">原子组件，最基础的组件。用户可以任意写逻辑。如果原子组件编写了<strong>配置文件</strong>，则说明允许暴露给维度组件包裹，则可以通过内部的事件参数来读写其它的meta数据。</td>
    </tr>
</table>
</div>
<h2 id="关于作者" tabindex="-1"><a class="header-anchor" href="#关于作者" aria-hidden="true">#</a> 关于作者</h2>
<p>本人是于2019年 - 2020年 期间使用<code v-pre>renren-fast</code>、<code v-pre>ruoyi</code>等后端框架做过大量项目，其中在开发过程中使用代码生成器<code v-pre>codegen</code>后，启发了开始低代码方面的探索之路。且在2021年加入头部工业互联网企业，期间会接触很多其它的各类垂直领域的制造业低代码平台，在使用后觉得目前市面上的低代码平台仍有很多改进空间。因此开始了优速搭低代码平台的自研之路。<br/>
目前优速搭平台部分组件已在内部项目中广泛使用，体验良好，大大提高了开发效率。因此希望开源开放出来，供更多的企业使用，助力企业数字化转型。</p>
</div></template>


