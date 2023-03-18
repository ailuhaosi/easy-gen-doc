import{_ as W}from"./_plugin-vue_export-helper.cdc0426e.js";import{i as _,g as l,q as b,n as v,o as c,c as m,e as t,a as o,t as u,v as E,m as f,r as C,x as F}from"./app.332edcc9.js";const S={class:"component-wrapper"},A={class:"component-wrapper-demo"},D={class:"code-content",style:{height:"0"}},I={class:"code-content-height"},N={class:"vue"},x={class:"lock-code-word"},M={name:"CodeWithFolding"},j=Object.assign(M,{props:{desc:{type:String,default:"\u8BE6\u7EC6\u63CF\u8FF0"},code:{type:String,default:"",required:!0},language:{type:[String,void 0],default:void 0}},setup(a){const h=a,y=e=>e.split(`
`).length;_(()=>10*y(h.code)),_(()=>({mode:h.language,theme:"default",lineNumbers:!0,smartIndent:!0,indentUnit:2,foldGutter:!0,lineWrapping:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter","CodeMirror-lint-markers"],matchBrackets:!0,styleActiveLine:!0,readOnly:!0}));const i=l([]),g=l([]),n=l([]),k=e=>{n.value[e]=!n.value[e],v(()=>{n.value[e]===!0?i.value[e].style.height=+g.value[e]+25+"px":i.value[e].style.height=0})},p=l(null),w=()=>{const e=p.value,s=e.getElementsByClassName("code-content-height");i.value=e.getElementsByClassName("code-content");const d=s.length;for(let r=0;r<d;r++)g.value.push(s[r].getBoundingClientRect().height),n.value.push(!1)};return b(()=>{v(()=>{w()})}),(e,s)=>{const d=C("ElIconArrowDownBold"),r=C("ElIconArrowUpBold"),B=F("highlight");return c(),m("div",{class:"demo",ref_key:"CodeWithFoldingContainerRef",ref:p},[t(` <h2>\u521B\u5EFA\u7EC4\u4EF6\u6587\u6863\u6A21\u677F</h2>\r
    <p>\u7EC4\u4EF6\u63CF\u8FF0</p>\r
    <h3>\u7EC4\u4EF6\u529F\u80FD\u540D\u5B57</h3>\r
    <p>\u7EC4\u4EF6\u529F\u80FD\u63CF\u8FF0</p> `),o("div",S,[o("div",A,u(a.desc),1),E((c(),m("div",D,[o("div",I,[t(` <div class="code-user-desc">\r
              \u7EC4\u4EF6\u63CF\u8FF0\u8BF4\u660E\r
            </div> `),t(' <pre><code class="language-vue">{{codeStr}}</code></pre> '),t(` <highlightjs\r
            :autodetect="!language"\r
            :language="language"\r
            :code="code"\r
          ></highlightjs> `),o("pre",null,[o("code",N,u(a.code),1)]),t(` <Codemirror\r
            :value="code"\r
            :options="cmOptions"\r
            border\r
            placeholder="\u6D4B\u8BD5 placeholder"\r
            :height="cmHeight"\r
          /> `)])])),[[B]]),o("div",{class:"lock-code",onClick:s[0]||(s[0]=H=>k(0))},[t('  ref="xxx" '),n.value[0]==!1?(c(),f(d,{key:0,class:"icon-folding"})):(c(),f(r,{key:1,class:"icon-folding"})),o("span",x,u(n.value[0]===!1?"\u663E\u793A\u4EE3\u7801":"\u9690\u85CF\u4EE3\u7801"),1)])]),t(` <h3>attributes</h3>\r
    <p>\u7EC4\u4EF6\u53C2\u6570\u8BF4\u660E\u540E\u671F\u6269\u5C55</p> `)],512)}}}),R=W(j,[["__scopeId","data-v-4d0675eb"],["__file","CodeWithFolding.vue"]]);export{R as default};
