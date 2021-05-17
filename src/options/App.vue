<template>
  <div class="m-5">
    <div class="text-2xl text-black">Amazing Searcher Setting Page</div>
    <TermList></TermList>
    <RecipeList></RecipeList>
  </div>
</template>

<script>
import { ref } from "vue";
import TermList from "@/options/TermList.vue";
import RecipeList from "@/options/RecipeList.vue";
export default {
  components: {
    TermList,
    RecipeList,
  },
};
</script>

<style>
.my-button {
  @apply py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg;
}
.table-head-th > tr > *,
.table-body-td > tr > *,
.table-out-div > * {
  @apply px-5 py-1 text-left text-base;
}
</style>

