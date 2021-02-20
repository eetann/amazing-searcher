<template>
  <div class="flex flex-col border rounded-lg border-gray-300">
    <div class="m-4">
      <div v-for="item in headings" :key="item.id">
        <MyHeading :heading="item"></MyHeading>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeading from "@/components/MyHeading.vue";
import { getOfficialInfo } from "@/composables/getOfficialInfo.js";
export default {
  components: {
    MyHeading,
  },
  setup() {
    let headings = [
      {
        id: 0,
        title: "hoge.com",
        link: "https://example.com/",
        icon: "badge-check",
      },
      {
        id: 1,
        title: "Document",
        link: "https://example.com/",
        icon: "document-text",
      },
      {
        id: 2,
        title: "Search By Document",
        link: "https://example.com/",
        icon: "document-search",
      },
      {
        id: 3,
        title: "Search By Google",
        link: "https://example.com/",
        icon: "search",
      },
    ];
    let info = getOfficialInfo();
    if (info.length !== 0) {
      headings[0].title = info[0].home_url
        .replace(/https?:\/\//, "")
        .replace(/\/$/, "");
      headings[0].link = info[0].home_url;

      headings[1].link = info[0].doc_url;
      headings[2].link = info[0].doc_search;
      // headings[3].link = info[3].keyword;
    }
    return { headings };
  },
};
</script>
