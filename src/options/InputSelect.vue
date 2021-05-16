<template>
  <div class="text-base text-gray-700">
    <label>
      {{ label }}
      <select
        @change="inputHandler"
        class="block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        :name="label"
      >
        <option
          v-for="option in options"
          :key="option"
          :value="option"
          :selected="option === modelValue"
        >
          {{ option }}
        </option>
      </select>
    </label>
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  props: {
    label: String,
    options: Array,
    modelValue: String,
  },
  setup(props, { emit }) {
    const inputHandler = (e) => {
      emit("update:modelValue", e.target.value);
    };
    onMounted(() => {
      emit("update:modelValue", props.options[0]);
    });
    return {
      inputHandler,
    };
  },
};
</script>
