<script setup lang="ts">
import { ref } from "vue";

const sidebarLinks = ref([
  { link: "Meals", name: "meals" },
  { link: "Restaurants", name: "restaurants" },
]);
</script>

<template>
  <nav class="fixed top-4 z-10 max-w-[210px] h-[95vh] flex flex-col px-2">
    <div class="bg-primary rounded-lg flex items-center justify-center py-2">
      <RouterLink
        :to="{ name: 'home' }"
        class="text-2xl font-bold text-grayish tracking-wider"
        >Logo</RouterLink
      >
    </div>
    <ul
      class="bg-primary rounded-lg h-full flex flex-col min-w-[180px] gap-y-1 mt-4 px-6 pt-3"
    >
      <li v-for="item in sidebarLinks" :key="item.name">
        <RouterLink
          :to="item.name"
          class="py-2 pl-2 flex justify-start items-center rounded hover:text-pinky duration-150"
          >{{ item.link }}</RouterLink
        >
      </li>
    </ul>
  </nav>
</template>

<style>
.router-link-exact-active {
  background-color: rgb(0 0 0 / 0.4);
  color: #ff2e63;
}
</style>
