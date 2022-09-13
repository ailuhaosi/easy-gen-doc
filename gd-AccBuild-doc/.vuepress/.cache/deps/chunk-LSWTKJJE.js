import {
  isLinkHttp
} from "./chunk-MOAPKBNV.js";
import {
  client_exports
} from "./chunk-ARMJJN7F.js";
import {
  h,
  resolveComponent
} from "./chunk-WLOKLJVF.js";

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.97/node_modules/vuepress-theme-hope/lib/client/components/Icon.js
var Icon = (props) => {
  const { icon = "" } = props;
  return isLinkHttp(icon) ? h("img", { class: "icon", src: icon }) : icon.startsWith("/") ? h("img", { class: "icon", src: (0, client_exports.withBase)(icon) }) : h(resolveComponent("FontIcon"), props);
};
Icon.displayName = "Icon";
var Icon_default = Icon;

export {
  Icon_default
};
//# sourceMappingURL=chunk-LSWTKJJE.js.map
