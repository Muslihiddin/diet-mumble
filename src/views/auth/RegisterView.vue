<script setup lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import Spinner from "@/components/Spinner.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { object, string, ref as yupRef } from "yup";
import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, writeBatch } from "firebase/firestore";

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
const isLoading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  errorHandling.value = "";

  try {
    isLoading.value = true;
    await createUserWithEmailAndPassword(auth, values.email, values.password);

    await updateProfile(auth.currentUser, {
      displayName: values.username,
    });

    const batch = writeBatch(db);

    batch.set(doc(db, auth.currentUser.uid, "meals"), { data: [] });
    batch.set(doc(db, auth.currentUser.uid, "res"), { data: [] });
    batch.commit();

    router.push({ name: "home" });
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      errorHandling.value = "The provided email is already in use";
    } else {
      errorHandling.value = "Something went wrong. Try again";
      console.log(error);
    }
  } finally {
    isLoading.value = false;
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
        v-show="!isLoading"
        type="submit"
        class="w-full mt-4 bg-green-800 hover:bg-green-800/80 duration-150 py-2 rounded"
      >
        Register
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
      Already have an account?<RouterLink
        :to="{ name: 'login' }"
        class="text-pinky"
        >Sign in</RouterLink
      >
    </p>
  </main>
</template>
