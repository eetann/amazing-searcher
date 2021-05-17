<template>
  <div class="flex flex-col border rounded-lg border-gray-300">
    <WithinButtons></WithinButtons>
    <HitRecipes></HitRecipes>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import WithinButtons from "@/content-scripts/WithinButtons.vue";
import HitRecipes from "@/content-scripts/HitRecipes.vue";
export default {
  components: {
    WithinButtons,
    HitRecipes,
  },
};
</script>
