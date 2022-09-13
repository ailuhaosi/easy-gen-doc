<template><div><h2 id="原子组件前言" tabindex="-1"><a class="header-anchor" href="#原子组件前言" aria-hidden="true">#</a> 原子组件前言</h2>
<p>每一个<strong>CRUD容器</strong>都默认有以下接口：<code v-pre>getList</code>、<code v-pre>getOne</code>、<code v-pre>save</code>(传数组即为批量)、<code v-pre>update</code>(传数组即为批量)、<code v-pre>deleteBatch</code>。
<code v-pre>getMetaList</code> 用来获取原子组件的元数据。从接口获取的元数据 或 在页面代码注入的元数据 为 <strong>设计时元数据</strong>，在CRUD组件内部会合并成 <strong>运行时元数据</strong>。如果用户需要在事件中修改组件元数据时，需要去修改对应的运行时元数据即可。</p>
<h3 id="为什么要区分-设计时-与-运行时" tabindex="-1"><a class="header-anchor" href="#为什么要区分-设计时-与-运行时" aria-hidden="true">#</a> 为什么要区分 设计时 与 运行时</h3>
<p>因为组件属性并不一定完全是静态数据，如Select组件的options可能来自接口，那这种情况就需要运行时去生成options了。</p>
<h2 id="原子组件元数据字段规范" tabindex="-1"><a class="header-anchor" href="#原子组件元数据字段规范" aria-hidden="true">#</a> 原子组件元数据字段规范</h2>
<h3 id="设计时-元数据规范-动静属性合并前" tabindex="-1"><a class="header-anchor" href="#设计时-元数据规范-动静属性合并前" aria-hidden="true">#</a> &quot;设计时&quot;元数据规范(动静属性合并前)</h3>
<AtomicMetaSpecific type="DesigntimeMeta" /><h3 id="运行时-元数据规范-动静属性合并后" tabindex="-1"><a class="header-anchor" href="#运行时-元数据规范-动静属性合并后" aria-hidden="true">#</a> &quot;运行时&quot;元数据规范(动静属性合并后)</h3>
<AtomicMetaSpecific /><h3 id="不同原子组件的元数据详述-设计时" tabindex="-1"><a class="header-anchor" href="#不同原子组件的元数据详述-设计时" aria-hidden="true">#</a> 不同原子组件的元数据详述(设计时)</h3>
<AtomicMetaSpecific v-model:type="detailCompType" is-detail-comp /></div></template>


<script setup>
import { ref } from 'vue';

const detailCompType = ref("ComposeCompMeta")
</script>