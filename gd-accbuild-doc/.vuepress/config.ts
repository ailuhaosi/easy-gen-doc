import { defineUserConfig } from "vuepress";
import DefineOptions from "unplugin-vue-define-options/vite";
import theme from "./theme.js";

import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { path } from "@vuepress/utils";
export default defineUserConfig({
  base: "/gd-accbuild-doc/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Theme Demo",
      description: "A demo for vuepress-theme-hope",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "优速搭",
      description: "vuepress-theme-hope 的演示",
    },
  },
  /* enhance: ({ app, router, siteData }) => {
        app.use(ElementPlus, { locale })
        for (const icon in Icons) {
            app.component(`ElIcon${icon}`, Icons[icon])
        }
    }, */
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
    DefineOptions()
  ],
  markdown: {
    headers: {
      level: [2, 4],
    },
  },
  theme,
});
