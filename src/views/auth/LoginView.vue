<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import Spinner from "@/components/Spinner.vue";
import { useRouter } from "vue-router";
import { object, string } from "yup";
import { useForm } from "vee-validate";
import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

const router = useRouter();

// Validation
const schema = object({
  email: string().email("Has to be valid email").required("Email is required"),
  password: string().min(6).required("Password is required"),
});

const { handleSubmit } = useForm({ validationSchema: schema });

const errorHandling = ref("");
const isLoading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    await signInWithEmailAndPassword(auth, values.email, values.password);

    router.push({ name: "home" });
  } catch (error: any) {
    console.log(error.code);

    switch (error.code) {
      case "auth/user-not-found":
        errorHandling.value = "No account with that email was found";
        break;
      case "auth/wrong-password":
        errorHandling.value = "Incorrect password";
        break;
      default:
        errorHandling.value = "Email or password was incorrect";
        break;
    }
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <main class="h-[95vh] flex flex-col items-center justify-center gap-y-2">
    <h1 class="font-bold text-2xl">Login</h1>
    <span v-show="errorHandling" class="text-red-700">{{ errorHandling }}</span>
    <form
      @submit="onSubmit"
      class="flex flex-col gap-y-3 mb-2 max-w-[320px] w-full"
    >
      <BaseInput name="email" label="Email" />
      <BaseInput name="password" label="Password" type="password" />
      <button
        v-show="!isLoading"
        type="submit"
        class="w-full mt-4 bg-green-800 hover:bg-green-800/80 duration-150 py-2 rounded"
      >
        Login
      </button>
      <button
        v-show="isLoading"
        type="button"
        disabled
        class="flex items-center justify-center w-full mt-4 bg-green-800 py-2 rounded"
      >
        <Spinner />
      </button>
    </form>
    <p class="text-gray-500 flex gap-x-2 items-center">
      Don't have an account yet?
      <RouterLink :to="{ name: 'register' }" class="text-pinky">
        Sign up</RouterLink
      >
    </p>
  </main>
</template>
