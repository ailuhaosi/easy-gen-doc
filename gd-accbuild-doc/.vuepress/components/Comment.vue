<template>
  <div class="vp-doc">
    <h2 id="评论" tabindex="-1">
      评论
      <a class="header-anchor" href="#评论" aria-hidden="true"> # </a>
    </h2>
    <div id="commentRef"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick,defineComponent } from "vue";
import { Comment } from "@tomiaa/comment";

const client_id = "ffd7cb7605068bcadd036f242f3d17f28bb23bd29c7fbb780413b281557f651b";
const client_secret = `b185210e513821c9126fcf24c4d7708fe6043e4048febd36d0e168d69a16d091`;
const vCommon = defineComponent({
  
})
//inst?.getList()
onMounted(() => {
  window.CommonRef = new Comment({
    client_id,
    client_secret,
    owner: "gd771747384",
    repo: "gd-accbuild-template",
    prefix: "gd-accbuild-template",
  });
  window.CommonRef.mount(document.querySelector("#commentRef"));
});
</script>
