<template>
  <div>
    <label class="text-gray-700">
      {{ label }}
      <input
        :type="type"
        :name="label"
        :placeholder="label"
        :value="modelValue"
        @input="inputHandler"
        class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
      />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    modelValue: String,
  },
  setup(_, { emit }) {
    const inputHandler = (e) => {
      emit("update:modelValue", e.target.value);
    };
    return {
      inputHandler,
    };
  },
};
</script>
