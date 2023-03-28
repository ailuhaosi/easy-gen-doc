import { defineClientConfig } from "@vuepress/client";
import { onBeforeMount, onMounted, ref } from "vue";
import locale from "element-plus/lib/locale/lang/zh-cn";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import * as Icons from "@element-plus/icons-vue";

//代码高亮文件引入
import hljs from "highlight.js";
//样式文件,这里我选的是sublime样式，文件里面还有其他样式可供选择
//import "highlight.js/styles/color-brewer.css";
import "highlight.js/styles/vs.css";
import "highlight.js/lib/common";
let resetPageStyle = () => {};
let inst: any;
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(ElementPlus, { locale });
    for (const icon in Icons) {
      app.component(`ElIcon${icon}`, (Icons as any)[icon]);
    }
    //app.use(Codemirror)
    app.directive("highlight", function (el) {
      let blocks = el.querySelectorAll("pre code");
      blocks.forEach((block) => {
        hljs.highlightBlock(block);
      });
    });
    router.beforeResolve(async (to) => {
      resetPageStyle();
      return true;
    });
    router.afterEach((to, from) => {
      window.CommonRef && window.CommonRef?.getList();
    });
  },
  setup() {
    onBeforeMount(() => {
      resetPageStyle = () => {
        setTimeout(function () {
          const tocEl = document.querySelector("#app .toc-place-holder");
          if (tocEl) {
            document.querySelector("html")?.setAttribute("class", "with-toc");
          } else {
            document.querySelector("html")?.setAttribute("class", "no-toc");
          }
        }, 500);
      };
      resetPageStyle();
    });
    
  },
  //rootComponents: [],
});
