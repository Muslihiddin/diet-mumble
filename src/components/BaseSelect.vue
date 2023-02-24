<script setup lang="ts">
import type { PropType } from "vue";
import { useField } from "vee-validate";

type selectionList = {
  label: string;
  value: string;
}[];

const props = defineProps({
  selectionList: {
    type: Array as PropType<selectionList>,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const validateField = (value: string) => {
  if (!value) {
    return `${props.label} is reqiured`;
  }

  return true;
};

const { value, errorMessage, meta } = useField(props.name, validateField);
</script>

<template>
  <label :for="name" class="flex flex-col">
    {{ label }}
    <select
      :id="name"
      v-model="value"
      class="rounded border-gray-700 px-2 py-1 bg-primary border outline-none mt-1"
      :class="{
        'border-red-700': errorMessage && meta.touched,
      }"
    >
      <option value="" disabled>Choose option</option>
      <option
        v-for="item in selectionList"
        :ket="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </option>
    </select>
    <span
      v-show="errorMessage && meta.touched"
      class="text-red-700 font-medium"
      >{{ errorMessage }}</span
    >
  </label>
</template>
