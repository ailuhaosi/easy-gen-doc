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
1. 按照下图操作：打开开发平台 -> 进入组件入口 -> 选择原子组件 -> 点击在线编写组件 -> 显示如下界面。
![在线编写原子组件操作步骤](/images/online-coding-comp.png)
![在线编写原子组件界面](/images/online-coding-comp-ui.png)
2. 在打开的编辑器中拷贝以下代码并做相应修改，通过调试**Mock元数据**查看原子组件效果。
```vue
<template>
  <ElInput v-model="curBindVal" v-bind="allCompAttrs" v-on="allBindEvents">
  </ElInput>
</template>
<script>
export default {
  inheritAttrs: false,
};
</script>
<script setup>
import { computed, watch, inject } from "vue";
import useComponentAttrs, { buildInAtomicCompProps } from "@/uni_modules/gd-AccBuild-Template/components/gd-AccBuildUi/gd-ui/cross-platform/gd-item-content/components/useComponentAttrs";
import useComponentEvents from "@/uni_modules/gd-AccBuild-Template/components/gd-AccBuildUi/gd-ui/cross-platform/gd-item-content/components/useComponentEvents";

const props = defineProps({
  ...buildInAtomicCompProps,
});

/* 原子组件开发者需要改写的部分 开始 */
//组件所有属性的默认值映射
const compAttrsKeyDefaultValueMapping = {
  style: {},
  type: "text",
  placeholder: "",
  rows: undefined,
  autosize: false,
  maxlength: undefined,
  showWordLimit: false,
  clearable: false,
  showPassword: false,
  iconConfig: undefined,
  fixedRichTextConfig: undefined,
  //CRUD容器 继承属性
  size: "default",
  readonly: false,
  disabled: false,
};
//组件属性 CRUD容器 继承属性的key
const compAttrsInheritedAttrKeys = ["size", "readonly", "disabled"];
/* 原子组件开发者需要改写的部分 结束 */

//组件所有属性 在meta信息中的路径,默认undefined为 "meta.componentAttr.···"、路径值为''为"meta.···"
const compAttrsKeyPathMapping = {};
const { curBindVal, containerType, allCompAttrs } = useComponentAttrs({
  props,
  compAttrsKeyDefaultValueMapping,
  compAttrsInheritedAttrKeys,
  compAttrsKeyPathMapping,
});

const allBindEvents = useComponentEvents(props, curBindVal);
</script>
<style lang="scss" scoped></style>

```
3. 新建该原子组件可视化的配置文件,格式如下。
<CodeWithFolding />
```javascript
export default {
    //如果全为空数组相当于不支持移动端
    "mobile":{
        attrs:[],
        rules:[],
        events:[]
    },
    "pc":{
        attrs:[{
            /**
             * 当pathInJson为undefined/"ComponentAttr"时,属性位于metaItem.componentAttr.里面
             * 当pathInJson为""时,属性位于metaItem.里面
             * 当pathInJson为"propOptions"时,属性位于propOptions  里面
             */
            pathInJson: "propOptions",
            uiConfigInPanel: {
                key: "isDefaultShow",
                label: "是否默认显示",
                type: "Switch",
            }
        },{
            pathInJson: undefined,
            uiConfigInPanel: {
                key: "style",
                label: "容器style",
                type: "Biz-ButtonEmitCodeEditor",
                default: "{}",
                componentAttr: {
                    lang: "json"
                }
            }
        },{
            pathInJson: "",
            uiConfigInPanel: {
                key: "default",
                label: "默认值",
                type: "Input",
            }
        },{
            pathInJson: undefined,
            uiConfigInPanel: {
                key: "readonly",
                label: "readonly",
                _isIndepenceInAddOrEdit:true,//默认新增编辑的表单相同;当此标记为true时,即新增编辑弹窗的表单不相同,保存后会自动替换为下面两行
                //labelCustomizeComp: markRaw(labelCustomizeComp),
                //itemContentCustomizeComp: markRaw(itemContentCustomizeComp),
                type: "Switch",
                default: false
            }
        },],
        rules:[],
        events:[]
    }
}
```
4. 保存并上传该原子组件所有文件。
