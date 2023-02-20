<script setup lang="ts">
import AddNewBtn from "@/components/AddNewBtn.vue";
import BaseList from "@/components/List/BaseList.vue";
import BaseModal from "@/components/BaseModal.vue";
import { useRestaurantsStore } from "@/stores/restaurants";
import { ref } from "vue";

const store = useRestaurantsStore();
const queryName = ref("newRestaurant");
</script>

<template>
  <main>
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-2xl font-bold tracking-wide">Restaurants</h2>
      <AddNewBtn :query-name="queryName" />
    </div>
    <BaseList :list="store.restaurants" />
  </main>

  <BaseModal :query-name="queryName" />
</template>
