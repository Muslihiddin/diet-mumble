<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { object, string, ref as yupRef } from "yup";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const router = useRouter();

// Validation
const schema = object({
  username: string().required("Username is required"),
  email: string()
    .email("It should be valid email")
    .required("Email is required"),
  password: string()
    .min(6, "Should contain at least 6 symbols")
    .required("Password is required"),
  confirm_pass: string()
    .oneOf([yupRef("password")], "Passwords should match")
    .required("Password confirmation is required"),
});

const { handleSubmit } = useForm({ validationSchema: schema });

const errorHandling = ref("");

const onSubmit = handleSubmit(async (values) => {
  errorHandling.value = "";

  try {
    await createUserWithEmailAndPassword(auth, values.email, values.password);

    await updateProfile(auth.currentUser, {
      displayName: values.username,
    });

    router.push({ name: "home" });
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      errorHandling.value = "The provided email is already in use";
    } else {
      errorHandling.value = "Something went wrong. Try again";
    }
  }
});
</script>

<template>
  <main class="h-[95vh] flex flex-col items-center justify-center gap-y-2">
    <h1 class="font-bold text-2xl">Register</h1>
    <span v-show="errorHandling" class="text-red-700">{{ errorHandling }}</span>
    <form
      @submit="onSubmit"
      class="flex flex-col gap-y-3 mb-2 max-w-[320px] w-full"
    >
      <BaseInput name="username" label="Username" />
      <BaseInput name="email" label="Email" />
      <BaseInput name="password" label="Password" type="password" />
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
