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
    const langList = {
      lang_ar: "Arabic",
      lang_bg: "Bulgarian",
      lang_ca: "Catalan",
      "lang_zh-CN": "Chinese (Simplified)",
      "lang_zh-TW": "Chinese (Traditional)",
      lang_hr: "Croatian",
      lang_cs: "Czech",
      lang_da: "Danish",
      lang_nl: "Dutch",
      lang_en: "English",
      lang_et: "Estonian",
      lang_fi: "Finnish",
      lang_fr: "French",
      lang_de: "German",
      lang_el: "Greek",
      lang_iw: "Hebrew",
      lang_hu: "Hungarian",
      lang_is: "Icelandic",
      lang_id: "Indonesian",
      lang_it: "Italian",
      lang_ja: "Japanese",
      lang_ko: "Korean",
      lang_lv: "Latvian",
      lang_lt: "Lithuanian",
      lang_no: "Norwegian",
      lang_pl: "Polish",
      lang_pt: "Portuguese",
      lang_ro: "Romanian",
      lang_ru: "Russian",
      lang_sr: "Serbian",
      lang_sk: "Slovak",
      lang_sl: "Slovenian",
      lang_es: "Spanish",
      lang_sv: "Swedish",
      lang_tr: "Turkish",
    };
    const options = Object.entries(langList).map(([key, value]) => ({
      key: value,
      value: key,
    }));
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
        { id: 0, param: "lang_en", str: langList["lang_en"] },
        { id: 1, param: "lang_ja", str: langList["lang_ja"] },
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
      let newLangs = [{ param: newLang.value, str: langList[newLang.value] }];
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
