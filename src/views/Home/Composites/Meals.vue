<script setup lang="ts">
import BaseList from "@/components/List/BaseList.vue";
import AddNewBtn from "@/components/AddNewBtn.vue";
import BaseModal from "@/components/BaseModal.vue";
import { useMealsStore } from "@/stores/meals";

const store = useMealsStore();
</script>
<template>
  <main>
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-2xl font-bold tracking-wide">Meals</h2>
      <AddNewBtn :query-name="'newMeal'" />
    </div>
    <BaseList :list="store.meals" />
  </main>

  <BaseModal :query-name="'newMeal'" />
</template>
