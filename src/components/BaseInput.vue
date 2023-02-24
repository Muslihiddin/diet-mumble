<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, default: "text" },
  label: { type: String, required: true },
  optional: { type: Boolean, default: false },
});

const validateField = (value: string) => {
  if (!value && !props.optional) {
    return `${props.label} is reqiured`;
  }

  return true;
};

const { value, errorMessage, meta } = useField(props.name, validateField);
</script>

<template>
  <div>
    <label :for="name"
      >{{ label }}
      <span v-if="optional" class="text-gray-500">(optional)</span></label
    >
    <input
      :id="name"
      :name="name"
      :type="type"
      v-model="value"
      class="border-gray-700 bg-primary px-2 py-1 border w-full rounded outline-none mt-1"
      :class="{
        'border-red-700': errorMessage && meta.touched,
      }"
    />
    <span
      v-show="errorMessage && meta.touched"
      class="text-red-700 font-medium"
      >{{ errorMessage }}</span
    >
  </div>
</template>
