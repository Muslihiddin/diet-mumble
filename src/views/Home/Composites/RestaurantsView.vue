<script setup lang="ts">
import AddNewBtn from "@/components/AddNewBtn.vue";
import BaseList from "@/components/List/BaseList.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import { useForm } from "vee-validate";
import { useRestaurantsStore } from "@/stores/restaurants";
import { ref } from "vue";

const store = useRestaurantsStore();
const queryName = ref("newRestaurant");

const selectionList = [
  { label: "Wanna try", value: "wanna-try" },
  { label: "Not recommended", value: "not-recommended" },
  { label: "Recommended", value: "recommended" },
];

const { setValues, handleSubmit } = useForm();

// sets default 'choose option' for select field
setValues({
  status: "",
});

const onSubmit = handleSubmit((values: object) => {
  console.log(values);
});
</script>

<template>
  <main>
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-2xl font-bold tracking-wide">Restaurants</h2>
      <AddNewBtn :query-name="queryName" />
    </div>
    <BaseList :list="store.restaurants" />
  </main>

  <BaseModal :query-name="queryName">
    <form @submit="onSubmit" class="flex flex-col gap-y-4 p-2">
      <BaseInput name="title" label="Name of restaurant" type="text" />
      <BaseSelect
        name="status"
        label="Status"
        :selection-list="selectionList"
      />

      <button
        type="submit"
        class="bg-green-800 hover:bg-green-800/80 duration-150 py-2 rounded"
      >
        Add
      </button>
    </form>
  </BaseModal>
</template>
