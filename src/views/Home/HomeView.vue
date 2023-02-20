<script setup lang="ts">
import BaseSidebar from "@/components/BaseSidebar.vue";
import BaseTopbar from "@/components/BaseTopbar.vue";
</script>

<template>
  <main class="flex items-start h-95-vh">
    <BaseSidebar />
    <div class="w-full">
      <BaseTopbar />
      <RouterView />
    </div>
  </main>
</template>
