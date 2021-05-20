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
</template>

<script>
import { ref, computed } from "vue";
export default {
  props: ["qLink", "paramLr"],
  setup(props) {
    const termRef = ref([]);
    chrome.storage.local.get("terms", (result) => {
      // join terms
      if (typeof result.terms !== "undefined") {
        termRef.value.push(...JSON.parse(result.terms));
      }
    });

    const showTerms = computed(() => {
      let terms = [{ id: -1, str: "all", unit: "", num: 0 }];
      terms.push(...termRef.value);
      return terms;
    });

    const getTermLink = (termStr) => {
      let termLink = props.qLink;
      if (termStr != "all") {
        termLink += "&tbs=qdr:" + termStr;
      }
      if (props.paramLr) {
        termLink += "&lr=" + props.paramLr;
      }
      return termLink;
    };

    return { termRef, showTerms, getTermLink };
  },
};
</script>
