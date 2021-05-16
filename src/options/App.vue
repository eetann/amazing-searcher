<template>
  <div class="m-5">
    <div class="text-2xl text-black">Amazing Searcher Setting Page</div>
    <RecipeList></RecipeList>
  </div>
</template>

<script>
import { ref } from "vue";
import RecipeList from "@/options/RecipeList.vue";
export default {
  components: {
    RecipeList,
  },
};
</script>
