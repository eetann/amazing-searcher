<template>
  <div
    class="m-4 space-y-2 text-2xl"
    v-for="headings in officialInfos"
    :key="headings.name"
  >
    {{ headings.name }}
    <div v-for="heading in headings.items" :key="heading.id">
      <MyHeading :heading="heading"></MyHeading>
    </div>
  </div>
</template>

<script>
import MyHeading from "@/components/MyHeading.vue";
import { getRecipes } from "@/composables/getOfficialInfo.js";
export default {
  components: {
    MyHeading,
  },
  async setup() {
    const officialInfos = await getRecipes();
    return { officialInfos };
  },
};
</script>
