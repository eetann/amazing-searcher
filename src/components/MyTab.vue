<template>
  <button
    @click="onClick"
    class="w-36 text-sm text-center focus:outline-none rounded-t"
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
        ? "text-black border-gray-600 border-b-2"
        : "text-gray-500 hover:bg-gray-100 hover:text-gray-700";
    });
    const onClick = () => {
      emit("update:modelValue", props.id);
    };
    return { isActive, onClick };
  },
};
</script>
