<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";

const store = useAuthStore();

const handleLogout = async () => {
  await signOut(auth);
};
</script>

<template>
  <div class="sticky top-4 z-10 ml-[210px]">
    <div
      class="flex justify-between items-center bg-primary rounded-lg w-full h-[48px] py-2 px-3 mb-4"
    >
      <div>
        <p v-if="store.isLoggedin" class="text-gray-400">
          Hello {{ auth.currentUser?.displayName }}
        </p>
      </div>
      <RouterLink
        v-if="!store.isLoggedin"
        :to="{ name: 'login' }"
        class="font-semibold hover:text-pinky duration-150"
        >Sign in</RouterLink
      >
      <button
        v-if="store.isLoggedin"
        class="font-semibold hover:text-pinky duration-150"
        @click="handleLogout"
      >
        Logout
      </button>
    </div>
  </div>
</template>
