<script setup lang="ts">
import AddNewBtn from "@/components/AddNewBtn.vue";
import BaseList from "@/components/List/BaseList.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import Spinner from "@/components/Spinner.vue";
import { useDeleteQuery } from "@/composables/deleteQuery";
import { useForm } from "vee-validate";
import { useRestaurantsStore } from "@/stores/restaurants";
import { ref } from "vue";
import { object, string } from "yup";
import type { Restaurant } from "@/types/Restaurant";

const store = useRestaurantsStore();
const queryName = ref("newRestaurant");

const selectionList = [
  { label: "Wanna try", value: "wanna try" },
  { label: "Not recommended", value: "not recommended" },
  { label: "Recommended", value: "recommended" },
];

// handling adding new restraunt
const schema = object({
  title: string().required("Title is required"),
  status: string().required("Status is required"),
});

const { setValues, handleSubmit } = useForm({ validationSchema: schema });

// sets default 'choose option' for select field
setValues({
  status: "",
});

const isLoading = ref(false);

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    isLoading.value = true;
    const docData = <Restaurant>{
      id: Date.now() + "",
      title: values.title,
      status: values.status,
      type: "rt",
    };

    await store.setRestaurant(docData);
  } catch (e) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }

  actions.resetForm();
  useDeleteQuery(queryName.value);
});
</script>

<template>
  <main>
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-2xl font-bold tracking-wide">Restaurants</h2>
      <AddNewBtn :query-name="queryName" />
    </div>
    <BaseList
      v-if="
        store.getRestaurants !== 'loading' &&
        store.getRestaurants &&
        store.getRestaurants?.length > 0
      "
      :list="store.getRestaurants"
    />
    <div
      v-show="store.getRestaurants == 'loading'"
      class="w-full h-[500px] flex items-center justify-center"
    >
      <Spinner />
    </div>
    <p
      v-if="
        store.getRestaurants !== 'loading' && store.getRestaurants?.length == 0
      "
      class="text-center"
    >
      There is no restaurants yet. Add one by clicking "New" button 🙂
    </p>
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
        v-show="!isLoading"
        type="submit"
        class="bg-green-800 hover:bg-green-800/80 duration-150 py-2 rounded"
      >
        Add
      </button>
      <button
        v-show="isLoading"
        disabled
        type="button"
        class="bg-green-800 py-2 rounded flex items-center justify-center"
      >
        <Spinner />
      </button>
    </form>
  </BaseModal>
</template>
