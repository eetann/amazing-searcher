<template>
  <div class="flex items-center">
    <div
      class="w-5 h-5 bg-pink-900 bg-opacity-50 border-2 rounded-lg border-gray-700"
    ></div>
    <a
      :href="heading.link"
      class="text-xl text-blue-600 visited:text-purple-600"
      >{{ heading.name }}</a
    >
  </div>
</template>

<script>
export default {
  props: ["heading"],
};
</script>
