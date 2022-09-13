import {
  useRoute
} from "./chunk-WHPXXF4L.js";
import "./chunk-E7KEG4JQ.js";
import {
  defineComponent,
  h,
  ref,
  watch
} from "./chunk-WLOKLJVF.js";
import "./chunk-BQOD6VY2.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.97/node_modules/vuepress-theme-hope/lib/client/components/SkipLink.js
import "F:/MyWorkSpace_program/lowcode-nocode/\u6587\u6863/gd-AccBuild-doc/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.97/node_modules/vuepress-theme-hope/lib/client/styles/skip-link.scss";
var SkipLink_default = defineComponent({
  name: "SkipLink",
  props: {
    content: {
      type: String,
      default: "main-content"
    }
  },
  setup(props) {
    const route = useRoute();
    const backToTop = ref();
    watch(() => route.path, () => backToTop.value.focus());
    const focusMainContent = ({ target }) => {
      const el = document.querySelector(target.hash);
      if (el) {
        const removeTabIndex = () => {
          el.removeAttribute("tabindex");
          el.removeEventListener("blur", removeTabIndex);
        };
        el.setAttribute("tabindex", "-1");
        el.addEventListener("blur", removeTabIndex);
        el.focus();
        window.scrollTo(0, 0);
      }
    };
    return () => [
      h("span", {
        ref: backToTop,
        tabindex: "-1"
      }),
      h("a", {
        href: `#${props.content}`,
        class: "skip-link sr-only",
        onClick: focusMainContent
      }, "Skip to content")
    ];
  }
});

// dep:@theme-hope_components_SkipLink__js
var theme_hope_components_SkipLink_js_default = SkipLink_default;
export {
  theme_hope_components_SkipLink_js_default as default
};
//# sourceMappingURL=@theme-hope_components_SkipLink__js.js.map
