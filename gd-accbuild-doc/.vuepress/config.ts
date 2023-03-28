import { defineUserConfig } from "vuepress";
import DefineOptions from "unplugin-vue-define-options/vite";
import theme from "./theme.js";

import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { path } from "@vuepress/utils";
import vssue from "@vssue/vuepress-plugin-vssue"
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
    DefineOptions(),
    vssue({
      // 设置 `platform` 而不是 `api`
      platform: "gitee",

      // 其他的 Vssue 配置
      owner: "OWNER_OF_REPO",
      repo: "NAME_OF_REPO",
      clientId: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
    })
  ],
  markdown: {
    headers: {
      level: [2, 4],
    },
  },
  theme,
});
