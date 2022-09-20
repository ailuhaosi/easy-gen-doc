import {
  require_core
} from "./chunk-UYAA5MYW.js";
import {
  computed,
  defineComponent,
  h,
  ref,
  watch
} from "./chunk-WLOKLJVF.js";
import {
  __toESM
} from "./chunk-BQOD6VY2.js";

// node_modules/.pnpm/highlight.js@11.6.0/node_modules/highlight.js/es/core.js
var import_core = __toESM(require_core());
var core_default = import_core.default;

// node_modules/.pnpm/@highlightjs+vue-plugin@2.1.0_uy2ky4dft7hw6q6ksblomniqd4/node_modules/@highlightjs/vue-plugin/dist/highlightjs-vue.esm.min.js
var r = defineComponent({ props: { code: { type: String, required: true }, language: { type: String, default: "" }, autodetect: { type: Boolean, default: true }, ignoreIllegals: { type: Boolean, default: true } }, setup: function(e) {
  var n = ref(e.language);
  watch(function() {
    return e.language;
  }, function(e2) {
    n.value = e2;
  });
  var r2 = computed(function() {
    return e.autodetect || !n.value;
  }), o2 = computed(function() {
    return !r2.value && !core_default.getLanguage(n.value);
  });
  return { className: computed(function() {
    return o2.value ? "" : "hljs " + n.value;
  }), highlightedCode: computed(function() {
    var l;
    if (o2.value)
      return console.warn('The language "' + n.value + '" you specified could not be found.'), e.code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
    if (r2.value) {
      var a = core_default.highlightAuto(e.code);
      return n.value = null !== (l = a.language) && void 0 !== l ? l : "", a.value;
    }
    return (a = core_default.highlight(e.code, { language: n.value, ignoreIllegals: e.ignoreIllegals })).value;
  }) };
}, render: function() {
  return h("pre", {}, [h("code", { class: this.className, innerHTML: this.highlightedCode })]);
} });
var o = { install: function(e) {
  e.component("highlightjs", r);
}, component: r };
var highlightjs_vue_esm_min_default = o;

// dep:@highlightjs_vue-plugin
var highlightjs_vue_plugin_default = highlightjs_vue_esm_min_default;
export {
  highlightjs_vue_plugin_default as default
};
//# sourceMappingURL=@highlightjs_vue-plugin.js.map
