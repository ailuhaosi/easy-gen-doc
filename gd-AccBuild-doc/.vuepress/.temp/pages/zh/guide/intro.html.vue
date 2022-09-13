<template><div><h2 id="什么是优速搭" tabindex="-1"><a class="header-anchor" href="#什么是优速搭" aria-hidden="true">#</a> 什么是优速搭？</h2>
<p>优速搭是一款用于搭建web、app、小程序等应用的低代码平台。而且支持二次开发，在不失灵活性的前提下，大大提高您开发应用的效率。<br/>
优速搭包含了 应用设计器、应用市场、模块市场、前端组件库、前端项目框架(uniapp)、后端项目框架(ruoyi-pro)、后端核心包等。<br/>
优速搭低代码平台由多个功能部分组成，且平台是面向零代码、低代码、高代码所有用户开放的，因此不同用户需要了解的功能有所侧重，以下是不同使用者对应需要了解的功能。</p>
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
<td style="text-align:center">可视化的管理数据、配置页面呈现。</td>
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
<p>首次进入应用会调用一次资源接口(<code v-pre>getResourceList</code>)存放在本地，以获取应用需要哪些页面，以及每个页面的配置信息(如页面的<code v-pre>布局信息</code>、由哪些<code v-pre>CRUD组件</code>组成)。每当跳转到一个页面的时候，会根据页面的配置信息渲染出对应的界面。每个页面由多个<code v-pre>CRUD组件</code>构成，<code v-pre>CRUD组件</code>也称为<code v-pre>CRUD容器</code>，内部可以容纳原子组件。在应用设计器中修改<code v-pre>CRUD容器属性</code>、<code v-pre>原子组件的属性</code>实现定制化页面的效果。</p>
<h2 id="关于作者" tabindex="-1"><a class="header-anchor" href="#关于作者" aria-hidden="true">#</a> 关于作者</h2>
<p>本人是于2019年 - 2020年 期间使用<code v-pre>renren-fast</code>做过大量项目，其中在开发过程中使用代码生成器<code v-pre>codegen</code>后，启发了开始低代码方面的探索之路。且在2021年加入目前的公司从事工业互联网方向，且我们公司是国内top3的工业互联网头部企业的地方指定合作伙伴，期间会接触很多其它的各类垂直领域的制造业低代码平台，在使用后觉得目前市面上的低代码平台仍有很多改进空间。因此开始了优速搭低代码平台的自研之路。<br/>
目前优速搭平台部分组件已在内部项目中广泛使用，体验良好，大大提高了开发效率。因此希望开源开放出来，供更多的企业使用，助力企业数字化转型。</p>
</div></template>


