<script setup lang="ts">
import IconClose from "./icons/IconClose.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useDeleteQuery } from "@/composables/deleteQuery";

const props = defineProps({
  queryName: {
    type: String,
    required: true,
  },
});

const route = useRoute();

const transition = computed((): boolean => {
  return !!route.query[props.queryName];
});

// close modal by pressing Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    useDeleteQuery(props.queryName);
  }
});
</script>

<template>
  <div
    class="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex items-center justify-center"
    :class="{
      'bg-black/70 pointer-events-auto': transition,
      'pointer-events-none': !transition,
    }"
    @click.self="useDeleteQuery(queryName)"
  >
    <Transition name="modal">
      <div
        v-show="transition"
        class="rounded-lg p-2 bg-gradient-to-r bg-primary w-[480px]"
      >
        <div class="flex justify-between items-center">
          <div></div>
          <i
            ><IconClose
              class="text-grayish/40 hover:text-grayish cursor-pointer duration-150 block w-[32px] h-[32px]"
              @click="useDeleteQuery(queryName)"
          /></i>
        </div>
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
