<template>
  <div class="flex flex-col border rounded-lg border-gray-300">
    <MyRecipes></MyRecipes>
  </div>
</template>

<script>
import MyRecipes from "@/components/MyRecipes.vue";
export default {
  components: {
    MyRecipes,
  },
};
</script>
