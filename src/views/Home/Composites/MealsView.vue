<script setup lang="ts">
import BaseList from "@/components/List/BaseList.vue";
import AddNewBtn from "@/components/AddNewBtn.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import Spinner from "@/components/Spinner.vue";
import type { Meal } from "@/types/Meal";
import { useMealsStore } from "@/stores/meals";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { object, string } from "yup";
import { useDeleteQuery } from "@/composables/deleteQuery";

const store = useMealsStore();
const queryName = ref("newMeal");

const selectionList = [
  { label: "Wanna try", value: "wanna try" },
  { label: "Not recommended", value: "not recommended" },
  { label: "Recommended", value: "recommended" },
];

// handling adding new meal
const schema = object({
  title: string().required("Title is required"),
  status: string().required("Status is required"),
});

const { handleSubmit, setValues } = useForm({ validationSchema: schema });

// sets default "choose option" for select field
setValues({
  status: "",
});

const isLoading = ref(false);

const onSubmit = handleSubmit(async (values, actions) => {
  try {
    isLoading.value = true;
    const docData = <Meal>{
      id: Date.now() + "",
      title: values.title,
      restaurant_title: values.restaurant_title || "Not given",
      status: values.status,
      type: "ml",
    };

    await store.setMeal(docData);
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
  <main class="pl-[210px] pt-1">
    <div class="flex items-center justify-between mb-3 bg-background">
      <h2 class="text-2xl font-bold tracking-wide">Meals</h2>
      <AddNewBtn :query-name="queryName" />
    </div>
    <BaseList
      v-if="
        store.getMeals !== 'loading' &&
        store.getMeals &&
        store.getMeals?.length > 0
      "
      :list="store.getMeals"
    />
    <div
      v-show="store.getMeals == 'loading'"
      class="w-full h-[500px] flex items-center justify-center"
    >
      <Spinner />
    </div>
    <p
      v-if="store.getMeals !== 'loading' && store.getMeals?.length == 0"
      class="text-center"
    >
      There is no meals yet. Add one by clicking "New" button 🙂
    </p>
  </main>

  <BaseModal :query-name="queryName">
    <form @submit="onSubmit" class="flex flex-col gap-y-4 p-2">
      <BaseInput name="title" label="Name of meal" type="text" />
      <BaseInput
        name="restaurant_title"
        label="Name of restaurant"
        type="text"
        optional
      />
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
