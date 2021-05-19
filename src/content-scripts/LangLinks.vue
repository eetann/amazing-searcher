<template>
  <div class="w-96 mx-4 my-4 text-base">
    Lang
    <div class="flex flex-wrap">
      <a
        v-for="lang in showLangs"
        :key="lang.id"
        :href="getLangLink(lang.str)"
        class="m-1 h-8 inline-flex items-center px-2 text-blue-600 ring-1 ring-blue-600 rounded-md"
        >{{ lang.str }}</a
      >
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  setup() {
    const langRef = ref([]);

    chrome.storage.local.get("langs", (result) => {
      // join langs
      if (typeof result.langs !== "undefined") {
        langRef.value.push(...JSON.parse(result.langs));
      }
    });

    let nowURL = new URL(document.location);
    let paramQ = nowURL.searchParams.get("q");
    let paramAs_qdr = nowURL.searchParams.get("as_qdr");
    let paramLr = nowURL.searchParams.get("lr");
    let qLink = nowURL.toString().replace(/\?.*$/, "") + "?q=" + paramQ;

    const showLangs = computed(() => {
      let langs = [{ id: -1, str: "all" }];
      langs.push(...langRef.value);
      return langs;
    });

    const getLangLink = (langStr) => {
      let langLink = qLink;
      if (langStr != "all") {
        langLink += "&lr=" + langStr;
      }
      if (paramAs_qdr) {
        langLink += "&as_qdr=" + paramAs_qdr;
      }
      return langLink;
    };

    return { langRef, showLangs, getLangLink };
  },
};
</script>
