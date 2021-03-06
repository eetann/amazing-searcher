<template>
  <div>
    <div class="text-lg font-semibold">New Term</div>
    <form @submit.prevent="addTerm" class="flex items-end space-x-4">
      <InputNumber
        label="Number"
        :nmin="1"
        :nmax="1000"
        v-model="newNumber"
      ></InputNumber>
      <InputSelect
        label="Unit"
        :options="options"
        v-model="newUnit"
      ></InputSelect>
      <div class="w-24">
        <button type="submit" class="my-button">Add</button>
      </div>
    </form>
    <div class="pt-2 text-base whitespace-pre-wrap">{{ messages }}</div>
    <div class="pt-2 text-base text-red-600 whitespace-pre-wrap">
      {{ errorMessages }}
    </div>
  </div>
  <div>
    <div class="flex my-4 space-x-4">
      <div class="w-24">
        <button type="button" class="my-button" @click="importCSV">
          Import
        </button>
      </div>
      <div class="w-24">
        <button type="button" class="my-button" @click="exportCSV">
          Export
        </button>
      </div>
    </div>
    <div class="mb-5 rounded-lg shadow w-72">
      <table class="w-full table-fixed divide-y divide-gray-200">
        <thead class="bg-gray-50 table-head-th">
          <tr class="font-medium text-left">
            <th class="w-1/2">Term</th>
            <th class="w-1/2">Remove</th>
          </tr>
        </thead>
        <tbody class="text-base divide-y divide-gray-200 table-body-td">
          <tr v-for="term in showTerms" :key="term.id">
            <td>{{ term.within }}</td>
            <td>
              <iconTrash
                class="cursor-pointer"
                :width="20"
                :height="20"
                @click="removeTerm(term.id)"
              ></iconTrash>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="w-36">
    <button type="button" class="my-button" @click="resetTerms">Reset</button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import InputNumber from "@/options/InputNumber.vue";
import InputSelect from "@/options/InputSelect.vue";
import iconTrash from "@/components/iconTrash.vue";
import { checkTerm, checkTermJson, setTerm } from "@/options/setTerm.js";
export default {
  components: { InputNumber, InputSelect, iconTrash },
  setup() {
    const options = [
      { key: "minute(s)", value: "n" },
      { key: "hour(s)", value: "h" },
      { key: "day(s)", value: "d" },
      { key: "week(s)", value: "w" },
      { key: "month(s)", value: "m" },
      { key: "year(s)", value: "y" },
    ];
    const messages = ref("");
    const errorMessages = ref("");
    const newUnit = ref("");
    const newNumber = ref("");
    // get storage.local term
    const terms = ref([]);
    chrome.storage.local.get("terms", (result) => {
      // join terms
      if (typeof result.terms !== "undefined") {
        terms.value.push(...JSON.parse(result.terms));
      }
    });

    const showTerms = computed(() => {
      return terms.value.map((term) => {
        let unit = "year(s)";
        switch (term.unit) {
          case "n":
            unit = "minute(s)";
            break;
          case "h":
            unit = "hour(s)";
            break;
          case "d":
            unit = "day(s)";
            break;
          case "w":
            unit = "week(s)";
            break;
          case "m":
            unit = "month(s)";
            break;
        }
        term.within = term.num + " " + unit;
        return term;
      });
    });

    const resetTerms = () => {
      messages.value = "";
      errorMessages.value = "";
      const json = require("@/assets/default_terms.csv");
      let resTerms = checkTermJson(json);
      let newTerms = setTerm(resTerms.terms);
      terms.value = newTerms;
      messages.value = "The 'term' has been reset.";
    };

    const removeTerm = (termId) => {
      // clear messages
      errorMessages.value = "";
      let newTerms = terms.value.filter((term) => term.id != termId);
      newTerms = setTerm(newTerms);
      terms.value = newTerms;
      messages.value = "The 'term' has been deleted";
    };

    const addTerm = () => {
      // clear messages
      errorMessages.value = "";
      messages.value = "";

      let newTerm = {
        unit: newUnit.value,
        num: newNumber.value,
        str: newUnit.value + newNumber.value,
      };

      // check term
      try {
        checkTerm(newTerm);
      } catch (e) {
        errorMessages.value = "Error :" + e;
        return;
      }

      // add new term
      let newTerms = [newTerm];
      newTerms.push(...terms.value);
      newTerms = setTerm(newTerms);
      terms.value = newTerms;
      messages.value = "The new 'term' has been added!";

      // clear the value of 'number'
      newNumber.value = "";
    };

    const exportCSV = () => {
      let csvStr = "unit,num\n";
      csvStr += terms.value
        .map((term) => {
          return term.unit + "," + term.num;
        })
        .join("\n");
      const blob = new Blob([csvStr], { type: "text/csv" });
      const dlURL = window.URL.createObjectURL(blob);
      const aTagDl = document.createElement("a");
      aTagDl.href = dlURL;
      aTagDl.download = "amazing-searcher-terms.csv";
      aTagDl.click();
      window.URL.revokeObjectURL(dlURL);
    };

    const importCSV = () => {
      // clear messages
      errorMessages.value = "";
      messages.value = "";

      // read csv file
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".csv";
      input.onchange = (e) => {
        let errorMsg = "";
        const fileName = e.target.files[0];
        var reader = new FileReader();
        reader.onload = (readerEvent) => {
          let csvRow = readerEvent.target.result.split("\n");
          let csvTerms = [];
          for (let i = 1; i < csvRow.length; i++) {
            // TODO: ,が文字列に含まれていた場合の対処
            // TODO: 前後に空白が文字列に含まれていた場合の対処
            let row = csvRow[i].split(",");
            if (row.length != 2) {
              errorMsg +=
                "Error at index " + idx + ": term elements are missing.\n";
              continue;
            }
            let newTerm = {
              unit: row[0],
              num: row[1],
              str: row[0] + row[1],
            };
            try {
              checkTerm(newTerm);
            } catch (e) {
              errorMsg += "Error at index " + idx + ":" + e + "\n";
            }
            csvTerms.push(newTerm);
          }
          csvTerms.push(...terms.value);
          csvTerms = setTerm(csvTerms);
          terms.value = csvTerms;
          messages.value = "The new 'terms' have been added!";
          errorMessages.value = errorMsg;
        };
        reader.readAsText(fileName);
      };
      input.click();
    };

    return {
      options,
      messages,
      errorMessages,
      newUnit,
      newNumber,
      terms,
      showTerms,
      resetTerms,
      removeTerm,
      addTerm,
      exportCSV,
      importCSV,
    };
  },
};
</script>
