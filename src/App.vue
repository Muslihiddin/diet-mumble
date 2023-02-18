<script setup lang="ts">
import BaseNav from "./components/BaseNav.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div
    class="min-w-full min-h-screen bg-secondary text-grayish px-2 sm:px-[70px]"
  >
    <BaseNav />
    <RouterView />
  </div>
</template>
