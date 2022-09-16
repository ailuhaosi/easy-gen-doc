<template><div><h2 id="前置知识" tabindex="-1"><a class="header-anchor" href="#前置知识" aria-hidden="true">#</a> 前置知识</h2>
<p>原子组件：一种可以在<strong>CRUD容器</strong>内渲染的基础组件，且由于<strong>CRUD容器</strong>分为 数组型容器(表格、循环的卡片等)、对象型容器(表单)，所以原子组件也必须兼容数组型和对象型。</p>
<h2 id="动手写一个原子组件" tabindex="-1"><a class="header-anchor" href="#动手写一个原子组件" aria-hidden="true">#</a> 动手写一个原子组件</h2>
<h3 id="在线编写原子组件" tabindex="-1"><a class="header-anchor" href="#在线编写原子组件" aria-hidden="true">#</a> 在线编写原子组件</h3>
<ol>
<li>按照下图操作：打开开发平台 -&gt; 进入组件入口 -&gt; 选择原子组件 -&gt; 点击在线编写组件 -&gt; 显示如下界面。
<img src="/images/online-coding-comp.png" alt="在线编写原子组件操作步骤" loading="lazy">
<img src="/images/online-coding-comp-ui.png" alt="在线编写原子组件界面" loading="lazy"></li>
<li>在打开的编辑器中拷贝以下代码并做相应修改，通过调试<strong>Mock元数据</strong>查看原子组件效果。</li>
</ol>
<div class="language-vue ext-vue line-numbers-mode"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ElInput</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>curBindVal<span class="token punctuation">"</span></span> <span class="token attr-name">v-bind</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>allCompAttrs<span class="token punctuation">"</span></span> <span class="token attr-name">v-on</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>allBindEvents<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ElInput</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">inheritAttrs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> computed<span class="token punctuation">,</span> watch<span class="token punctuation">,</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"vue"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> useComponentAttrs<span class="token punctuation">,</span> <span class="token punctuation">{</span> buildInAtomicCompProps <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@/uni_modules/gd-AccBuild-Template/components/gd-AccBuildUi/gd-ui/cross-platform/gd-item-content/components/useComponentAttrs"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> useComponentEvents <span class="token keyword">from</span> <span class="token string">"@/uni_modules/gd-AccBuild-Template/components/gd-AccBuildUi/gd-ui/cross-platform/gd-item-content/components/useComponentEvents"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token operator">...</span>buildInAtomicCompProps<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">/* 原子组件开发者需要改写的部分 开始 */</span>
<span class="token comment">//组件所有属性的默认值映射</span>
<span class="token keyword">const</span> compAttrsKeyDefaultValueMapping <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">style</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"text"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">placeholder</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rows</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  <span class="token literal-property property">autosize</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">maxlength</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  <span class="token literal-property property">showWordLimit</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">clearable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">showPassword</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">iconConfig</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  <span class="token literal-property property">fixedRichTextConfig</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  <span class="token comment">//CRUD容器 继承属性</span>
  <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">readonly</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">disabled</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">//组件属性 CRUD容器 继承属性的key</span>
<span class="token keyword">const</span> compAttrsInheritedAttrKeys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"size"</span><span class="token punctuation">,</span> <span class="token string">"readonly"</span><span class="token punctuation">,</span> <span class="token string">"disabled"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">/* 原子组件开发者需要改写的部分 结束 */</span>

<span class="token comment">//组件所有属性 在meta信息中的路径,默认undefined为 "meta.componentAttr.···"、路径值为''为"meta.···"</span>
<span class="token keyword">const</span> compAttrsKeyPathMapping <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> curBindVal<span class="token punctuation">,</span> containerType<span class="token punctuation">,</span> allCompAttrs <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useComponentAttrs</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  props<span class="token punctuation">,</span>
  compAttrsKeyDefaultValueMapping<span class="token punctuation">,</span>
  compAttrsInheritedAttrKeys<span class="token punctuation">,</span>
  compAttrsKeyPathMapping<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> allBindEvents <span class="token operator">=</span> <span class="token function">useComponentEvents</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> curBindVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>scss<span class="token punctuation">"</span></span> <span class="token attr-name">scoped</span><span class="token punctuation">></span></span><span class="token style"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>新建该原子组件可视化的配置文件,格式如下。</li>
</ol>
<CodeWithFolding /><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token comment">//如果全为空数组相当于不支持移动端</span>
    <span class="token string-property property">"mobile"</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">attrs</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">rules</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">events</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string-property property">"pc"</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">attrs</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span>
            <span class="token doc-comment comment">/**
             * 当pathInJson为undefined/"ComponentAttr"时,属性位于metaItem.componentAttr.里面
             * 当pathInJson为""时,属性位于metaItem.里面
             * 当pathInJson为"propOptions"时,属性位于propOptions  里面
             */</span>
            <span class="token literal-property property">pathInJson</span><span class="token operator">:</span> <span class="token string">"propOptions"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">uiConfigInPanel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">"isDefaultShow"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">"是否默认显示"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"Switch"</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
            <span class="token literal-property property">pathInJson</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
            <span class="token literal-property property">uiConfigInPanel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">"style"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">"容器style"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"Biz-ButtonEmitCodeEditor"</span><span class="token punctuation">,</span>
                <span class="token keyword">default</span><span class="token operator">:</span> <span class="token string">"{}"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">componentAttr</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">lang</span><span class="token operator">:</span> <span class="token string">"json"</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
            <span class="token literal-property property">pathInJson</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
            <span class="token literal-property property">uiConfigInPanel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">"默认值"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"Input"</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>
            <span class="token literal-property property">pathInJson</span><span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
            <span class="token literal-property property">uiConfigInPanel</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">"readonly"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">label</span><span class="token operator">:</span> <span class="token string">"readonly"</span><span class="token punctuation">,</span>
                <span class="token literal-property property">_isIndepenceInAddOrEdit</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">//默认新增编辑的表单相同;当此标记为true时,即新增编辑弹窗的表单不相同,保存后会自动替换为下面两行</span>
                <span class="token comment">//labelCustomizeComp: markRaw(labelCustomizeComp),</span>
                <span class="token comment">//itemContentCustomizeComp: markRaw(itemContentCustomizeComp),</span>
                <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"Switch"</span><span class="token punctuation">,</span>
                <span class="token keyword">default</span><span class="token operator">:</span> <span class="token boolean">false</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">rules</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token literal-property property">events</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>保存并上传该原子组件所有文件。</li>
</ol>
</div></template>


