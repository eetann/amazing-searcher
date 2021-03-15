<template>
  <div class="flex items-center">
    <iconBadgeCheck v-if="heading.id == 0"></iconBadgeCheck>
    <iconDocumentText v-else-if="heading.id == 1"></iconDocumentText>
    <iconDocumentSearch v-else-if="heading.id == 2"></iconDocumentSearch>
    <iconSearch v-else-if="heading.id == 3"></iconSearch>
    <div>
      <div class="flex items-center" v-for="link in heading.links" :key="link">
        <a
          :href="link.url"
          class="text-xl text-blue-600 visited:text-purple-600"
        >
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
import iconBadgeCheck from "@/components/icons/iconBadgeCheck.vue";
import iconDocumentText from "@/components/icons/iconDocumentText.vue";
import iconDocumentSearch from "@/components/icons/iconDocumentSearch.vue";
import iconSearch from "@/components/icons/iconSearch.vue";
export default {
  components: {
    iconBadgeCheck,
    iconDocumentText,
    iconDocumentSearch,
    iconSearch,
  },
  props: ["heading"],
};
</script>
