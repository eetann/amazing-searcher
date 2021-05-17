<template>
  <div class="w-96 mx-4 mt-4 text-base">
    Term
    <div class="flex flex-wrap">
      <a
        v-for="term in showTerms"
        :key="term.id"
        :href="getTermLink(term.str)"
        class="m-1 h-8 inline-flex items-center px-2 text-blue-600 ring-1 ring-blue-600 rounded-md"
        >{{ term.str }}</a
      >
    </div>
  </div>
  <div class="w-96 mx-4 my-4 text-base">
    Lang
    <div class="flex flex-wrap">
      <a
        v-for="(langStr, id) in langRef"
        :key="id"
        :href="getLangLink(langStr)"
        class="m-1 h-8 inline-flex items-center px-2 text-blue-600 ring-1 ring-blue-600 rounded-md"
        >{{ langStr }}</a
      >
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  setup() {
    // TODO: 何があってもallは最初から加える
    const termRef = ref([]);
    chrome.storage.local.get("terms", (result) => {
      // join terms
      if (typeof result.terms !== "undefined") {
        termRef.value.push(...JSON.parse(result.terms));
      }
    });
    const langRef = ref(["lang_en", "lang_ja"]);
    let nowURL = new URL(document.location);
    let paramQ = nowURL.searchParams.get("q");
    let paramAs_qdr = nowURL.searchParams.get("as_qdr");
    let paramLr = nowURL.searchParams.get("lr");
    let qLink = nowURL.toString().replace(/\?.*$/, "") + "?q=" + paramQ;

    const showTerms = computed(() => {
      let terms = [{ id: -1, str: "all", unit: "", num: 0 }];
      terms.push(...termRef.value);
      return terms;
    });

    const getTermLink = (termStr) => {
      let termLink = qLink + "&as_qdr=" + termStr;
      if (paramLr) {
        termLink += "&lr=" + paramLr;
      }
      return termLink;
    };

    const getLangLink = (langStr) => {
      let langLink = qLink + "&lr=" + langStr;
      if (paramAs_qdr) {
        langLink += "&as_qdr=" + paramAs_qdr;
      }
      return langLink;
    };

    return { termRef, langRef, showTerms, getTermLink, getLangLink };
  },
};
</script>
