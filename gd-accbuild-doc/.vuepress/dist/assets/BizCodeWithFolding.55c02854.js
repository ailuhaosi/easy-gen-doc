import{_ as o}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,y as i,r as a}from"./app.85dcf71e.js";const l={__name:"BizCodeWithFolding",props:{type:{type:String,required:!0}},setup(e){const t={AtomicCompTemplateVue:{desc:"\u539F\u5B50\u7EC4\u4EF6\u6A21\u677FVue\u4EE3\u7801",language:"vue",code:`
    <template>
      <ElInput v-model="curBindVal" v-bind="allCompAttrs" v-on="allBindEvents">
      </ElInput>
    </template>
    <script>
    export default {
      inheritAttrs: false,
    };
    <\/script>
    <script setup>
    import { computed, watch, inject } from "vue";
    import useComponentAttrs, { buildInAtomicCompProps } from "@/uni_modules/gd-AccBuild-Template/components/gd-AccBuildUi/gd-ui/cross-platform/gd-item-content/components/useComponentAttrs";
    import useComponentEvents from "@/uni_modules/gd-AccBuild-Template/components/gd-AccBuildUi/gd-ui/cross-platform/gd-item-content/components/useComponentEvents";
    const props = defineProps({
      ...buildInAtomicCompProps,
    });
    /* \u539F\u5B50\u7EC4\u4EF6\u5F00\u53D1\u8005\u9700\u8981\u6539\u5199\u7684\u90E8\u5206 \u5F00\u59CB */
    //\u7EC4\u4EF6\u6240\u6709\u5C5E\u6027\u7684\u9ED8\u8BA4\u503C\u6620\u5C04
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
      //CRUD\u5BB9\u5668 \u7EE7\u627F\u5C5E\u6027
      size: "default",
      readonly: false,
      disabled: false,
    };
    //\u7EC4\u4EF6\u5C5E\u6027 CRUD\u5BB9\u5668 \u7EE7\u627F\u5C5E\u6027\u7684key
    const compAttrsInheritedAttrKeys = ["size", "readonly", "disabled"];
    /* \u539F\u5B50\u7EC4\u4EF6\u5F00\u53D1\u8005\u9700\u8981\u6539\u5199\u7684\u90E8\u5206 \u7ED3\u675F */
    //\u7EC4\u4EF6\u6240\u6709\u5C5E\u6027 \u5728meta\u4FE1\u606F\u4E2D\u7684\u8DEF\u5F84,\u9ED8\u8BA4undefined\u4E3A "meta.componentAttr.\xB7\xB7\xB7"\u3001\u8DEF\u5F84\u503C\u4E3A''\u4E3A"meta.\xB7\xB7\xB7"
    const compAttrsKeyPathMapping = {};
    const { curBindVal, containerType, allCompAttrs } = useComponentAttrs({
      props,
      compAttrsKeyDefaultValueMapping,
      compAttrsInheritedAttrKeys,
      compAttrsKeyPathMapping,
    });
    const allBindEvents = useComponentEvents(props, curBindVal);
    <\/script>
    <style lang="scss" scoped></style>
    `},NewAtomicCompVisualConf:{desc:"\u65B0\u5EFA\u8BE5\u539F\u5B50\u7EC4\u4EF6\u53EF\u89C6\u5316\u7684\u914D\u7F6E\u6587\u4EF6\u683C\u5F0F",language:"javascript",code:`
    export default {
        //\u5982\u679C\u5168\u4E3A\u7A7A\u6570\u7EC4\u76F8\u5F53\u4E8E\u4E0D\u652F\u6301\u79FB\u52A8\u7AEF
        "mobile":{
            attrs:[],
            rules:[],
            events:[]
        },
        "pc":{
            attrs:[{
                /**
                 * \u5F53pathInJson\u4E3Aundefined/"ComponentAttr"\u65F6,\u5C5E\u6027\u4F4D\u4E8EmetaItem.componentAttr.\u91CC\u9762
                 * \u5F53pathInJson\u4E3A""\u65F6,\u5C5E\u6027\u4F4D\u4E8EmetaItem.\u91CC\u9762
                 * \u5F53pathInJson\u4E3A"propOptions"\u65F6,\u5C5E\u6027\u4F4D\u4E8EpropOptions  \u91CC\u9762
                 */
                pathInJson: "propOptions",
                uiConfigInPanel: {
                    key: "isDefaultShow",
                    label: "\u662F\u5426\u9ED8\u8BA4\u663E\u793A",
                    type: "Switch",
                }
            },{
                pathInJson: undefined,
                uiConfigInPanel: {
                    key: "style",
                    label: "\u5BB9\u5668style",
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
                    label: "\u9ED8\u8BA4\u503C",
                    type: "Input",
                }
            },{
                pathInJson: undefined,
                uiConfigInPanel: {
                    key: "readonly",
                    label: "readonly",
                    _isIndepenceInAddOrEdit:true,//\u9ED8\u8BA4\u65B0\u589E\u7F16\u8F91\u7684\u8868\u5355\u76F8\u540C;\u5F53\u6B64\u6807\u8BB0\u4E3Atrue\u65F6,\u5373\u65B0\u589E\u7F16\u8F91\u5F39\u7A97\u7684\u8868\u5355\u4E0D\u76F8\u540C,\u4FDD\u5B58\u540E\u4F1A\u81EA\u52A8\u66FF\u6362\u4E3A\u4E0B\u9762\u4E24\u884C
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
    `}};return(p,d)=>{const n=a("CodeWithFolding");return s(),i(n,{key:e.type,desc:t[e.type].desc,language:t[e.type].language,code:t[e.type].code},null,8,["desc","language","code"])}}},m=o(l,[["__file","BizCodeWithFolding.vue"]]);export{m as default};
