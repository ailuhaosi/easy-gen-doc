<template>
  <div class="demo" ref="CodeWithFoldingContainerRef">
    <!-- <h2>创建组件文档模板</h2>
    <p>组件描述</p>
    <h3>组件功能名字</h3>
    <p>组件功能描述</p> -->
    <div class="component-wrapper">
      <div class="component-wrapper-demo">{{ desc }}</div>
      <div class="code-content" v-highlight style="height: 0">
        <div class="code-content-height">
          <!-- <div class="code-user-desc">
              组件描述说明
            </div> -->
          <!-- <pre><code class="language-vue">{{codeStr}}</code></pre> -->
          <!-- <highlightjs
            :autodetect="!language"
            :language="language"
            :code="code"
          ></highlightjs> -->
          <pre><code class="vue">{{code}}</code></pre>
          <!-- <Codemirror
            :value="code"
            :options="cmOptions"
            border
            placeholder="测试 placeholder"
            :height="cmHeight"
          /> -->
        </div>
      </div>
      <div class="lock-code" @click="showCode(0)">
        <!--  ref="xxx" -->
        <ElIconArrowDownBold
          v-if="isShow[0] == false"
          class="icon-folding"
        ></ElIconArrowDownBold>
        <ElIconArrowUpBold v-else class="icon-folding"></ElIconArrowUpBold>
        <span class="lock-code-word">{{
          isShow[0] === false ? "显示代码" : "隐藏代码"
        }}</span>
      </div>
    </div>

    <!-- <h3>attributes</h3>
    <p>组件参数说明后期扩展</p> -->
  </div>
</template>
<script setup>
/* import "highlight.js/styles/vs.css";
import "highlight.js/lib/common";
import * as hljsVuePlugin from "@highlightjs/vue-plugin"; */
import { computed, ref, nextTick, onMounted } from "vue";

/* codemirror导入 */
/* import Codemirror from "codemirror-editor-vue3"; */

// language
/* import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/vue/vue.js"; */
/* 折叠配置 */
//import "codemirror/addon/fold/foldgutter.css";
/* import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold"; */
/* 折叠配置 */
/* codemirror导入 */

const props = defineProps({
  desc: {
    type: String,
    default: "详细描述", //组件展示位置
  },
  code: {
    type: String,
    default: "",
    required: true,
  },
  language: {
    type: [String, undefined],
    default: undefined,
  },
});

const getStrLineNum = (str) => {
  return str.split("\n").length;
};
const cmHeight = computed(() => {
  return 10 * getStrLineNum(props.code);
});
/* codemirror配置 */
const cmOptions = computed(() => ({
  mode: props.language, // 语言模式
  theme: "default", // 主题
  lineNumbers: true, // 显示行号
  smartIndent: true, // 智能缩进
  indentUnit: 2, // 智能缩进单位为4个空格长度
  /* 折叠配置 */
  foldGutter: true, // 启用行槽中的代码折叠
  lineWrapping: true,
  gutters: [
    "CodeMirror-linenumbers",
    "CodeMirror-foldgutter",
    "CodeMirror-lint-markers",
  ],
  /* 折叠配置 */
  matchBrackets: true, //括号匹配
  styleActiveLine: true, // 显示选中行的样式
  readOnly: true,
}));
/* codemirror配置 */

//const highlightjs = hljsVuePlugin.component;

//每一个区域的高度
const codeParent = ref([]);
const codeHeightArr = ref([]);
//每个区域的显示状态
const isShow = ref([]);
//根据子元素的高度 设置代码区域父元素的高度
const showCode = (index) => {
  isShow.value[index] = !isShow.value[index];
  nextTick(() => {
    if (isShow.value[index] === true) {
      codeParent.value[index].style.height =
        +codeHeightArr.value[index] + 25 + "px";
    } else {
      codeParent.value[index].style.height = 0;
    }
  });
};
const CodeWithFoldingContainerRef = ref(null);
//得到所有代码区域的高度
const getCodesHeight = () => {
  const CodeWithFoldingContainerDom = CodeWithFoldingContainerRef.value;
  const arr = CodeWithFoldingContainerDom.getElementsByClassName(
    "code-content-height"
  );
  codeParent.value =
    CodeWithFoldingContainerDom.getElementsByClassName("code-content");
  const arrLength = arr.length;
  for (let i = 0; i < arrLength; i++) {
    codeHeightArr.value.push(arr[i].getBoundingClientRect().height);
    isShow.value.push(false);
  }
};
onMounted(() => {
  nextTick(() => {
    getCodesHeight();
  });
});
</script>
<script>

export default {
  name: "CodeWithFolding",
};
</script>

<style lang="scss" scoped>
.icon-folding {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.component-wrapper {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;

  .component-wrapper-demo {
    padding: 24px 24px 15px 24px;
  }

  h4 {
    margin: 55px 0 20px;
  }

  &:hover {
    .lock-code .lock-code-word {
      font-size: 14px;
      transform: translateX(-40px);
      opacity: 1;
    }

    .lock-code .icon-folding {
      transform: translateX(-40px);
    }

    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }

  .code-content {
    background-color: #fafafa;
    border-top: 1px solid #eaeefb;
    overflow: hidden;
    transition: height 0.2s;

    .code-content-height {
      .code-user-desc {
        background: #ffffff;
        margin: 10px 10px 0 10px;
        padding: 5px 10px;
        font-size: 14px;
        line-height: 26px;
        border: 1px solid #ebebeb;
        border-radius: 3px;
      }

      > pre {
        background: none;

        > code {
          color: #3182bd;
        }
      }
    }
  }

  .lock-code {
    border-top: 1px solid #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
    line-height: 44px;
    color: #d3dce6;

    &:hover {
      background-color: #f9fafc;

      .lock-code-word {
        color: #409eff;
      }

      .icon-folding {
        color: #409eff;
      }
    }

    .icon-folding {
      transform: translateX(0px);
      transition: all 0.1s;
    }

    text-align: center;

    .lock-code-word {
      font-size: 0px;
      margin-left: 15px;
      display: inline-block;
      transition: all 0.1s;
      opacity: 0;
    }
  }
}
</style>
