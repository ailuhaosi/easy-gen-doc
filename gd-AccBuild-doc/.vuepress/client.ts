import { defineClientConfig } from "@vuepress/client";
import locale from 'element-plus/lib/locale/lang/zh-cn'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css';
import * as Icons from '@element-plus/icons-vue'

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        app.use(ElementPlus, { locale })
        for (const icon in Icons) {
            app.component(`ElIcon${icon}`, (Icons as any)[icon])
        }
    },
    //setup() { },
    //rootComponents: [],
})
