<template>
  <div class="w-96 mx-4 my-4 text-base">
    Lang
    <div class="flex flex-wrap">
      <a
        v-for="lang in showLangs"
        :key="lang.id"
        :href="getLangLink(lang.param)"
        class="m-1 h-8 inline-flex items-center px-2 text-blue-600 ring-1 ring-blue-600 rounded-md"
        >{{ lang.str }}</a
      >
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  props: ["qLink", "paramTbs"],
  setup(props) {
    const langRef = ref([]);

    chrome.storage.local.get("langs", (result) => {
      // join langs
      if (typeof result.langs !== "undefined") {
        langRef.value.push(...JSON.parse(result.langs));
      }
    });

    const showLangs = computed(() => {
      let langs = [{ id: -1, param: "all", str: "all" }];
      langs.push(...langRef.value);
      return langs;
    });

    const getLangLink = (langParam) => {
      let langLink = props.qLink;
      if (langParam != "all") {
        langLink += "&lr=" + langParam;
      }
      if (props.paramTbs) {
        langLink += "&tbs=qdr:" + props.paramTbs;
      }
      return langLink;
    };

    return { langRef, showLangs, getLangLink };
  },
};
</script>
