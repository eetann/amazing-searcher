<template>
  <div class="flex items-center">
    <img :src="icon" width="24" height="24" />
    <div>
      <div class="flex items-center" v-for="link in heading.links" :key="link">
        <a :href="link" class="text-xl text-blue-600 visited:text-purple-600">
          {{
            heading.links.length > 1
              ? heading.title + " (" + link.lang + ")"
              : heading.title
          }}
        </a>
      </div>
    </div>
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
