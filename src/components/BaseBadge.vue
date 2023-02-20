<script setup lang="ts">
defineProps({
  status: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex items-center justify-center pb-[2px] px-2 rounded-xl text-sm"
    :class="{
      'bg-yellow-500/20 text-yellow-500': status === 'wanna try',
      'bg-green-500/20 text-green-500': status === 'recommended',
      'bg-red-500/20 text-red-500': status === 'not recommended',
    }"
  >
    {{ status }}
  </div>
</template>
