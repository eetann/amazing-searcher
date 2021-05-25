<template>
  <div class="text-base text-gray-700">
    <label>
      {{ label }}
      <input
        :type="type"
        :name="label"
        :placeholder="label"
        :value="modelValue"
        maxlength="100"
        @input="inputHandler"
        class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        required
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
