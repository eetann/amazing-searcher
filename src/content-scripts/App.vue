<template>
  <div class="flex flex-col border rounded-lg border-gray-300">
    <TermLinks></TermLinks>
    <LangLinks></LangLinks>
    <HitRecipes></HitRecipes>
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
};
</script>
