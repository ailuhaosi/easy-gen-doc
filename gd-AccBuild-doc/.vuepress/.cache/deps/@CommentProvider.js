import {
  client_exports
} from "./chunk-ARMJJN7F.js";
import {
  useRoute
} from "./chunk-WHPXXF4L.js";
import "./chunk-E7KEG4JQ.js";
import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref
} from "./chunk-WLOKLJVF.js";
import "./chunk-BQOD6VY2.js";

// node_modules/.pnpm/vuepress-plugin-comment2@2.0.0-beta.97/node_modules/vuepress-plugin-comment2/lib/client/components/Giscus.js
import "F:/MyWorkSpace_program/lowcode-nocode/\u6587\u6863/gd-AccBuild-doc/node_modules/.pnpm/vuepress-plugin-comment2@2.0.0-beta.97/node_modules/vuepress-plugin-comment2/lib/client/styles/giscus.scss";
var u = COMMENT_OPTIONS;
var c = Boolean(u.repo && u.repoId && u.category && u.categoryId);
var l = ["de", "gsw", "en", "es", "fr", "id", "it", "ja", "ko", "pl", "ro", "ru", "vi", "zh-CN", "zh-TW"];
var d = defineComponent({ name: "GiscusComment", props: { darkmode: Boolean }, setup(r) {
  const d2 = (0, client_exports.usePageFrontmatter)(), m = useRoute(), g = ref(false), v = computed(() => {
    const e2 = (0, client_exports.usePageLang)().value;
    if (l.includes(e2))
      return e2;
    const o2 = e2.split("-")[0];
    return l.includes(o2) ? o2 : "en";
  }), y = computed(() => {
    if (!c)
      return false;
    const e2 = false !== u.comment, t2 = d2.value.comment;
    return Boolean(t2) || false !== e2 && false !== t2;
  }), f = computed(() => ({ repo: u.repo, repoId: u.repoId, category: u.category, categoryId: u.categoryId, lang: v.value, theme: r.darkmode ? "dark" : "light", mapping: u.mapping || "pathname", term: (0, client_exports.withBase)(m.path), inputPosition: u.inputPosition || "top", reactionsEnabled: false !== u.reactionsEnabled ? "1" : "0", strict: false !== u.strict ? "1" : "0", emitMetadata: "0" }));
  return onMounted(() => {
    import("./giscus-3ZCI4E52.js").then(() => {
      g.value = true;
    });
  }), () => h("div", { class: ["giscus-wrapper", { "input-top": "bottom" !== u.inputPosition }], style: { display: y.value ? "block" : "none" } }, g.value ? h("giscus-widget", f.value) : h("div", { style: "text-align:center" }, "Loading..."));
} });

// dep:@CommentProvider
var CommentProvider_default = d;
export {
  CommentProvider_default as default
};
//# sourceMappingURL=@CommentProvider.js.map
