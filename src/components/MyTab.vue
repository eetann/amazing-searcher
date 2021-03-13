<template>
  <button
    @click="onClick"
    class="w-36 text-lg text-center focus:outline-none"
    :class="isActive"
  >
    {{ label }}
  </button>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    id: Number,
    label: String,
    modelValue: Number,
  },
  setup(props, { emit }) {
    const isActive = computed(() => {
      console.log(props.modelValue, props.id);
      return props.modelValue == props.id
        ? "text-black border-red-600 border-b-2"
        : "text-gray-500 hover:border-gray-400 hover:border-b-2 hover:text-gray-700";
    });
    const onClick = () => {
      emit("update:modelValue", props.id);
    };
    return { isActive, onClick };
  },
};
</script>
