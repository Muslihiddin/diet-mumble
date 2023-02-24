<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import { useForm } from "vee-validate";

const { handleSubmit } = useForm();

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <main class="h-[95vh] flex flex-col items-center justify-center gap-y-2">
    <h1 class="font-bold text-2xl">Register</h1>
    <form
      @submit="onSubmit"
      class="flex flex-col gap-y-3 mb-2 max-w-[320px] w-full"
    >
      <BaseInput name="username" label="Username" type="text" />
      <BaseInput name="passwoord" label="Password" type="password" />
      <BaseInput name="confirm_pass" label="Confirm password" type="password" />
      <button
        type="submit"
        class="w-full mt-4 bg-green-800 hover:bg-green-800/80 duration-150 py-2 rounded"
      >
        Register
      </button>
    </form>
    <p class="text-gray-500 flex gap-x-2 items-center">
      Already have an account?<RouterLink
        :to="{ name: 'login' }"
        class="text-pinky"
        >Sign in</RouterLink
      >
    </p>
  </main>
</template>
