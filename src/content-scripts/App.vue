<template>
  <div class="flex flex-col border rounded-lg border-gray-300">
    <div class="m-4">
      <div
        v-for="item in headings.slice(0, headings.length - 1)"
        :key="item.id"
      >
        <MyHeading :heading="item"></MyHeading>
      </div>
      <div class="flex flex-col justify-center">
        <MyHeading :heading="headings[headings.length - 1]"></MyHeading>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeading from "@/components/MyHeading.vue";
export default {
  components: {
    MyHeading,
  },
  setup() {
    const headings = [
      {
        id: 0,
        name: "hoge.com",
        link: "https://example.com/",
        icon: "badge-check",
      },
      {
        id: 1,
        name: "Document",
        link: "https://example.com/",
        icon: "document-text",
      },
      {
        id: 2,
        name: "Search By Document",
        link: "https://example.com/",
        icon: "document-search",
      },
      {
        id: 3,
        name: "Search By Google",
        link: "https://example.com/",
        icon: "search",
      },
    ];
    return { headings };
  },
};
</script>
