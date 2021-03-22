<template>
  <div class="flex flex-col border rounded-lg border-gray-300">
    <Suspense>
      <template #default>
        <MyRecipes />
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
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
