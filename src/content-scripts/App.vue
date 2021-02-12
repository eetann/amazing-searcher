<template>
  <div class="flex flex-col border rounded-lg border-black">
    <div v-for="item in headings.slice(0, 3)" :key="item.id">
      <MyHeading :heading="item"></MyHeading>
    </div>
    <div class="flex flex-col justify-center">
      <MyHeading :heading="headings[3]"></MyHeading>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import MyHeading from "@/components/MyHeading.vue";
export default {
  components: {
    MyHeading,
  },
  setup() {
    const headings = ref([
      { id: 0, name: "hoge.com", link: "https://example.com/", icon: "hoge" },
      { id: 1, name: "Document", link: "https://example.com/", icon: "hoge" },
      {
        id: 2,
        name: "Search By Document",
        link: "https://example.com/",
        icon: "hoge",
      },
      {
        id: 3,
        name: "Search By Google",
        link: "https://example.com/",
        icon: "hoge",
      },
    ]);
    return { headings };
  },
};
</script>
