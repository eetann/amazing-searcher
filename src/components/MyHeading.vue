<template>
  <div class="flex items-center">
    <div
      class="w-5 h-5 bg-pink-900 bg-opacity-50 border-2 rounded-lg border-gray-700"
    ></div>
    <p class="text-xl">{{ heading.name }}</p>
  </div>
</template>

<script>
export default {
  props: ["heading"],
};
</script>
