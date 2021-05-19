<template>
  <div class="flex flex-col border rounded-lg border-gray-300">
    <TermLinks :qLink="qLink" :paramLr="paramLr"></TermLinks>
    <LangLinks :qLink="qLink" :paramTbs="paramTbs"></LangLinks>
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
  setup() {
    const nowURL = new URL(document.location);
    const paramQ = nowURL.searchParams.get("q");
    const paramTbs = nowURL.searchParams.get("tbs");
    const paramLr = nowURL.searchParams.get("lr");
    const qLink = nowURL.toString().replace(/\?.*$/, "") + "?q=" + paramQ;
    return { paramQ, paramTbs, paramLr, qLink };
  },
};
</script>
