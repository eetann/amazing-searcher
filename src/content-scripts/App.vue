<template>
  <div class="flex flex-col border rounded-lg border-gray-300">
    <TermButtons></TermButtons>
    <HitRecipes></HitRecipes>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TermButtons from "@/content-scripts/TermButtons.vue";
import HitRecipes from "@/content-scripts/HitRecipes.vue";
export default {
  components: {
    TermButtons,
    HitRecipes,
  },
};
</script>
