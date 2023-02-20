<script setup lang="ts">
import { usePushQuery } from "@/composables/pushQuery";

const props = defineProps({
  queryName: {
    type: String,
    required: true,
  },
});

const handleAdding = () => {
  usePushQuery(props.queryName);
};
</script>

<template>
  <button
    type="button"
    class="flex items-center gap-x-1 px-3 py-1 rounded-lg bg-green-800 hover:bg-green-800/80 duration-150"
    @click="handleAdding"
  >
    New
  </button>
</template>
