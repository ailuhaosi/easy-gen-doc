import { defineAsyncComponent } from 'vue'

export default {
  enhance: ({ app }) => {    
      app.component("AtomicMetaSpecific", defineAsyncComponent(() => import("F:/MyWorkSpace_program/lowcode-nocode/文档/gd-AccBuild-doc/gd-AccBuild-doc/.vuepress/components/AtomicMetaSpecific.vue"))),
      app.component("BizCodeWithFolding", defineAsyncComponent(() => import("F:/MyWorkSpace_program/lowcode-nocode/文档/gd-AccBuild-doc/gd-AccBuild-doc/.vuepress/components/BizCodeWithFolding.vue"))),
      app.component("CodeWithFolding", defineAsyncComponent(() => import("F:/MyWorkSpace_program/lowcode-nocode/文档/gd-AccBuild-doc/gd-AccBuild-doc/.vuepress/components/CodeWithFolding.vue"))),
      app.component("Test", defineAsyncComponent(() => import("F:/MyWorkSpace_program/lowcode-nocode/文档/gd-AccBuild-doc/gd-AccBuild-doc/.vuepress/components/Test.vue")))
  },
}
