<template>
  <div class="flex items-center">
    <img :src="icon" width="24" height="24" />
    <a
      :href="heading.link"
      class="text-xl text-blue-600 visited:text-purple-600"
      >{{ heading.title }}</a
    >
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["heading"],
  setup(props) {
    const icon = ref(
      chrome.extension.getURL("imgs/" + props.heading.icon + ".svg")
    );
    return { icon };
  },
};
</script>
