<template>
  <div class="flex flex-col border rounded-lg border-gray-300">
    <TermLinks
      :qLink="qLink"
      :paramTbm="paramTbm"
      :paramLr="paramLr"
    ></TermLinks>
    <LangLinks
      :qLink="qLink"
      :paramTbm="paramTbm"
      :paramTbs="paramTbs"
    ></LangLinks>
    <HitRecipes :paramQ="paramQ"></HitRecipes>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TermLinks from "@/content-scripts/TermLinks.vue";
import LangLinks from "@/content-scripts/LangLinks.vue";
import HitRecipes from "@/content-scripts/HitRecipes.vue";
export default {
  components: {
    TermLinks,
    LangLinks,
    HitRecipes,
  },
  props: ["nowURL", "paramTbm"],
  setup(props) {
    const paramQ = props.nowURL.searchParams.get("q");
    const paramTbs = props.nowURL.searchParams.get("tbs");
    const paramLr = props.nowURL.searchParams.get("lr");
    const qLink = props.nowURL.toString().replace(/\?.*$/, "") + "?q=" + paramQ;
    return { paramQ, paramTbs, paramLr, qLink };
  },
};
</script>
