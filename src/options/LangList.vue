<template>
  <div class="mt-5">
    <div class="text-lg font-semibold">Lang</div>
    <div class="flex space-x-4 items-end">
      <InputSelect
        label="Lang"
        :options="options"
        v-model="newLang"
      ></InputSelect>
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
import InputSelect from "@/options/InputSelect.vue";
import iconTrash from "@/components/icons/iconTrash.vue";
import { setLang } from "@/options/setLang.js";
export default {
  components: { InputSelect, iconTrash },
  setup() {
    const options = [
      { key: "Arabic", value: "lang_ar" },
      { key: "Bulgarian", value: "lang_bg" },
      { key: "Catalan", value: "lang_ca" },
      { key: "Chinese (Simplified)", value: "lang_zh-CN" },
      { key: "Chinese (Traditional)", value: "lang_zh-TW" },
      { key: "Croatian", value: "lang_hr" },
      { key: "Czech", value: "lang_cs" },
      { key: "Danish", value: "lang_da" },
      { key: "Dutch", value: "lang_nl" },
      { key: "English", value: "lang_en" },
      { key: "Estonian", value: "lang_et" },
      { key: "Finnish", value: "lang_fi" },
      { key: "French", value: "lang_fr" },
      { key: "German", value: "lang_de" },
      { key: "Greek", value: "lang_el" },
      { key: "Hebrew", value: "lang_iw" },
      { key: "Hungarian", value: "lang_hu" },
      { key: "Icelandic", value: "lang_is" },
      { key: "Indonesian", value: "lang_id" },
      { key: "Italian", value: "lang_it" },
      { key: "Japanese", value: "lang_ja" },
      { key: "Korean", value: "lang_ko" },
      { key: "Latvian", value: "lang_lv" },
      { key: "Lithuanian", value: "lang_lt" },
      { key: "Norwegian", value: "lang_no" },
      { key: "Polish", value: "lang_pl" },
      { key: "Portuguese", value: "lang_pt" },
      { key: "Romanian", value: "lang_ro" },
      { key: "Russian", value: "lang_ru" },
      { key: "Serbian", value: "lang_sr" },
      { key: "Slovak", value: "lang_sk" },
      { key: "Slovenian", value: "lang_sl" },
      { key: "Spanish", value: "lang_es" },
      { key: "Swedish", value: "lang_sv" },
      { key: "Turkish", value: "lang_tr" },
    ];
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
      options,
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
