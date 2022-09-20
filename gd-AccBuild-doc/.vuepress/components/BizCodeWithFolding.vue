<template>
  <CodeWithFolding
    :key="type"
    :desc="allInfo[type].desc"
    :language="allInfo[type].language"
    :code="allInfo[type].code"
  />
</template>
<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});
const allInfo = {
  /**
   * 原子组件模板Vue代码
   */
  AtomicCompTemplateVue: {
    desc: "原子组件模板Vue代码",
    language: "vue",
    code: `
    \<template\>
      <ElInput v-model="curBindVal" v-bind="allCompAttrs" v-on="allBindEvents">
      </ElInput>
    \<\/template\>
    \<script\>
    export default {
      inheritAttrs: false,
    };
    \<\/script\>
    \<script setup\>
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
    \<\/script\>
    \<style lang="scss" scoped\>\<\/style\>
    `,
  },
  /**
   * 新建该原子组件可视化的配置文件格式
   */
  NewAtomicCompVisualConf: {
    desc: "新建该原子组件可视化的配置文件格式",
    language: "javascript",
    code: `
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
    `,
  },
};
</script>
