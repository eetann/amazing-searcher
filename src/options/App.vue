<template>
  <div class="m-5">
    <div class="text-2xl text-black">Amazing Searcher Settings Page</div>
    <div class="flex flex-wrap">
      <div class="w-full">
        <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
          <li
            class="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer"
          >
            <a
              class="text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              v-on:click="toggleTabs(1)"
              v-bind:class="{
                'text-red-600 bg-white': openTab !== 1,
                'text-white bg-red-600': openTab === 1,
              }"
            >
              Term
            </a>
          </li>
          <li
            class="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer"
          >
            <a
              class="text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              v-on:click="toggleTabs(2)"
              v-bind:class="{
                'text-red-600 bg-white': openTab !== 2,
                'text-white bg-red-600': openTab === 2,
              }"
            >
              Lang
            </a>
          </li>
          <li
            class="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer"
          >
            <a
              class="text-sm font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal"
              v-on:click="toggleTabs(3)"
              v-bind:class="{
                'text-red-600 bg-white': openTab !== 3,
                'text-white bg-red-600': openTab === 3,
              }"
            >
              Recipe
            </a>
          </li>
        </ul>
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
        >
          <div class="px-4 py-5 flex-auto">
            <div class="tab-content tab-space">
              <div :class="{ hidden: openTab !== 1, block: openTab === 1 }">
                <TermList></TermList>
              </div>
              <div :class="{ hidden: openTab !== 2, block: openTab === 2 }">
                <LangList></LangList>
              </div>
              <div :class="{ hidden: openTab !== 3, block: openTab === 3 }">
                <RecipeList></RecipeList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TermList from "@/options/TermList.vue";
import LangList from "@/options/LangList.vue";
import RecipeList from "@/options/RecipeList.vue";
export default {
  components: {
    TermList,
    LangList,
    RecipeList,
  },
  setup() {
    const openTab = ref(1);
    const toggleTabs = (tabNumber) => {
      openTab.value = tabNumber;
    };
    return { openTab, toggleTabs };
  },
};
</script>

<style>
.my-button {
  @apply py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg;
}
.table-head-th > tr > *,
.table-body-td > tr > *,
.table-out-div > * {
  @apply px-5 py-1 text-left text-base;
}
</style>

