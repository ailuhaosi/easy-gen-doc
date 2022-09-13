import {
  useScrollPromise
} from "./chunk-JYLXXKFF.js";
import "./chunk-WNMRIWOF.js";
import "./chunk-7NPEV2WA.js";
import "./chunk-ARMJJN7F.js";
import "./chunk-WHPXXF4L.js";
import "./chunk-E7KEG4JQ.js";
import {
  Transition,
  defineComponent,
  h
} from "./chunk-WLOKLJVF.js";
import "./chunk-BQOD6VY2.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.97/node_modules/vuepress-theme-hope/lib/client/components/transitions/FadeSlideY.js
import "F:/MyWorkSpace_program/lowcode-nocode/\u6587\u6863/gd-AccBuild-doc/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.97/node_modules/vuepress-theme-hope/lib/client/styles/fade-slide-y.scss";
var FadeSlideY_default = defineComponent({
  name: "FadeSlideY",
  setup(_props, { slots }) {
    const scrollPromise = useScrollPromise();
    const onBeforeEnter = scrollPromise.resolve;
    const onBeforeLeave = scrollPromise.pending;
    return () => h(Transition, {
      name: "fade-slide-y",
      mode: "out-in",
      onBeforeEnter,
      onBeforeLeave
    }, () => {
      var _a;
      return (_a = slots["default"]) == null ? void 0 : _a.call(slots);
    });
  }
});

// dep:@theme-hope_components_transitions_FadeSlideY__js
var theme_hope_components_transitions_FadeSlideY_js_default = FadeSlideY_default;
export {
  theme_hope_components_transitions_FadeSlideY_js_default as default
};
//# sourceMappingURL=@theme-hope_components_transitions_FadeSlideY__js.js.map
