<template>
  <div class="mt-5">
    <div class="text-lg font-semibold">Lang</div>
    <div class="flex space-x-4 items-end">
      <InputText label="Lang" type="text" v-model="newLang"></InputText>
      <div class="w-24">
        <button type="button" class="my-button" @click="addLang">Add</button>
      </div>
    </div>
    <div class="pt-2 text-base whitespace-pre-wrap">{{ messages }}</div>
  </div>
  <div>
    <div class="mt-5 mb-2 text-lg font-semibold">Lang List</div>
    <div class="mb-5 shadow rounded-lg w-72">
      <table class="divide-y divide-gray-200 w-full table-fixed">
        <thead class="bg-gray-50 table-head-th">
          <tr class="text-left font-medium">
            <th class="w-2/3">Lang</th>
            <th class="w-1/3">Remove</th>
          </tr>
        </thead>
        <tbody class="text-base divide-y divide-gray-200 table-body-td">
          <tr v-for="lang in showLangs" :key="lang.id">
            <td>{{ lang.str }}</td>
            <td>
              <iconTrash
                class="cursor-pointer"
                :width="20"
                :height="20"
                @click="removeLang(lang.id)"
              ></iconTrash>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="w-36">
    <button type="button" class="my-button" @click="resetLangs">Reset</button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import InputText from "@/options/InputText.vue";
import iconTrash from "@/components/icons/iconTrash.vue";
import { setLang } from "@/options/setLang.js";
export default {
  components: { InputText, iconTrash },
  setup() {
    const messages = ref("");
    const newLang = ref("");
    // get storage.local lang
    const langs = ref([]);
    chrome.storage.local.get("langs", (result) => {
      // join langs
      if (typeof result.langs !== "undefined") {
        langs.value.push(...JSON.parse(result.langs));
      }
    });

    const showLangs = computed(() => {
      return langs.value;
    });

    const resetLangs = () => {
      messages.value = "";
      let defaultLangs = [
        { id: 0, str: "lang_en" },
        { id: 1, str: "lang_ja" },
      ];
      let newLangs = setLang(defaultLangs);
      langs.value = newLangs;
      messages.value = "The 'Lang' has been reset.";
    };

    const removeLang = (langId) => {
      // clear messages
      let newLangs = langs.value.filter((lang) => lang.id != langId);
      newLangs = setLang(newLangs);
      langs.value = newLangs;
      messages.value = "The 'Lang' has been deleted";
    };

    const addLang = () => {
      // clear messages
      messages.value = "";

      // add new lang
      let newLangs = [{ str: newLang.value }];
      newLangs.push(...langs.value);
      newLangs = setLang(newLangs);
      langs.value = newLangs;
      messages.value = "The new 'Lang' has been added!";

      // clear the value of 'lang'
      newLang.value = "";
    };

    return {
      messages,
      newLang,
      langs,
      showLangs,
      resetLangs,
      removeLang,
      addLang,
    };
  },
};
</script>
