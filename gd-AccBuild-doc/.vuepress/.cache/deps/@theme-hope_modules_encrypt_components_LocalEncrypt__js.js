import {
  PasswordModal_default,
  usePathEncrypt
} from "./chunk-OPOS2QWR.js";
import "./chunk-RSMUNGK2.js";
import "./chunk-JYLXXKFF.js";
import "./chunk-WNMRIWOF.js";
import "./chunk-7NPEV2WA.js";
import "./chunk-ARMJJN7F.js";
import "./chunk-WHPXXF4L.js";
import "./chunk-E7KEG4JQ.js";
import {
  defineComponent,
  h
} from "./chunk-WLOKLJVF.js";
import "./chunk-BQOD6VY2.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.97/node_modules/vuepress-theme-hope/lib/client/modules/encrypt/components/LocalEncrypt.js
var LocalEncrypt_default = defineComponent({
  name: "LocalEncrypt",
  setup(_props, { slots }) {
    const { isEncrypted, validateToken } = usePathEncrypt();
    return () => {
      var _a;
      return isEncrypted.value ? h(PasswordModal_default, { full: true, onVerify: validateToken }) : ((_a = slots["default"]) == null ? void 0 : _a.call(slots)) || null;
    };
  }
});

// dep:@theme-hope_modules_encrypt_components_LocalEncrypt__js
var theme_hope_modules_encrypt_components_LocalEncrypt_js_default = LocalEncrypt_default;
export {
  theme_hope_modules_encrypt_components_LocalEncrypt_js_default as default
};
//# sourceMappingURL=@theme-hope_modules_encrypt_components_LocalEncrypt__js.js.map
