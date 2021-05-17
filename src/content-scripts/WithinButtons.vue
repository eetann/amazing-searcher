<template>
  <div class="w-96 mx-4 mt-4 text-base">
    Within
    <div class="flex flex-wrap">
      <a
        v-for="(withinStr, id) in withinRef"
        :key="id"
        :href="getWithinLink(withinStr)"
        class="m-1 h-8 inline-flex items-center px-2 text-blue-600 ring-1 ring-blue-600 rounded-md"
        >{{ withinStr }}</a
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
import { ref } from "vue";
export default {
  setup() {
    const withinRef = ref([
      "all",
      "h3",
      "d1",
      "w1",
      "m1",
      "m3",
      "m6",
      "y1",
      "y2",
      "y3",
    ]);
    const langRef = ref(["lang_en", "lang_ja"]);
    let nowURL = new URL(document.location);
    let paramQ = nowURL.searchParams.get("q");
    let paramAs_qdr = nowURL.searchParams.get("as_qdr");
    let paramLr = nowURL.searchParams.get("lr");
    let qLink = nowURL.toString().replace(/\?.*$/, "") + "?q=" + paramQ;
    const getWithinLink = (withinStr) => {
      let withinLink = qLink + "&as_qdr=" + withinStr;
      if (paramLr) {
        withinLink += "&lr=" + paramLr;
      }
      return withinLink;
    };
    const getLangLink = (langStr) => {
      let langLink = qLink + "&lr=" + langStr;
      if (paramAs_qdr) {
        langLink += "&as_qdr=" + paramAs_qdr;
      }
      return langLink;
    };
    return { withinRef, langRef, getWithinLink, getLangLink };
  },
};
</script>
