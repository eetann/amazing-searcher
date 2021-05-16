<template>
  <div class="w-96 m-4 text-base">
    Within
    <div class="flex flex-wrap">
      <a
        v-for="(withintime, id) in withinRef"
        :key="id"
        href="#"
        class="m-1 h-8 inline-flex items-center px-2 text-blue-600 ring-1 ring-blue-600 rounded-md"
        >{{ withintime }}</a
      >
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const withinRef = ref([
      "3h",
      "1d",
      "1w",
      "1m",
      "3m",
      "6m",
      "1y",
      "2y",
      "3y",
    ]);
    return { withinRef };
  },
};
</script>
