import { sidebar } from "vuepress-theme-hope";

export const zh = sidebar({
  "/zh/": [
    "",
    //"home",
    //"slides",
    {
      text: "开始低代码之旅",
      icon: "launch",
      prefix: "guide/",
      link: "guide/",
	  collapsable: true,
      children: "structure",
    },
	{
      text: "优速搭二次开发",
      icon: "proposal",
      prefix: "development/",
      link: "development/",
	  collapsable: true,
      children: /*"structure",*/ [{
          text: "前端",
          icon: "vue",
          collapsable: true,
          prefix: "fontend/",
          children: "structure",
        },{
          text: "后端",
          icon: "java",
          collapsable: true,
          prefix: "backend/",
          children: "structure",
        }], 
    }
  ],
});
