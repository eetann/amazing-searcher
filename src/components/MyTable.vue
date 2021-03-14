<template>
  <div class="my-5 shadow rounded-lg max-w-min">
    <table class="divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr class="text-left text-base table-header-th">
          <slot name="my-theader"></slot>
        </tr>
      </thead>
      <tbody class="text-base divide-y divide-gray-200 table-body-td">
        <slot name="my-tbody"></slot>
      </tbody>
    </table>
    <slot name="my-footer"></slot>
  </div>
</template>

<script>
</script>

<style>
.table-header-th > * {
  @apply px-5 py-2 font-medium;
}
.table-body-td > tr > *,
.table-footer-div {
  @apply px-5 py-1 text-left text-base whitespace-nowrap;
}
.table-body-td > tr > td > input {
  @apply text-gray-500 focus:text-gray-900 focus:outline-none;
}
</style>
