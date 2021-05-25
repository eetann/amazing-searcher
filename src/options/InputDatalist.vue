<template>
  <div class="text-base text-gray-700">
    <label>
      {{ label }}
      <input
        :type="type"
        :name="label"
        :placeholder="label"
        :list="listId"
        :value="modelValue"
        maxlength="100"
        @change="inputHandler"
        class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        required
      />
      <datalist :id="listId">
        <option
          v-for="option in options"
          :key="option.key"
          :value="option.value"
        >
          {{ option.key }}
        </option>
      </datalist>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    listId: String,
    options: Array,
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
