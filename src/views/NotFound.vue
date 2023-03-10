<template>
  <h2 class="text-8xl inline-block mt-4 mb-8">Ohh noooooooo!</h2>
  <div class="flex flex-col gap-y-5 pl-5">
    <p class="text-5xl">
      We literally cannot find the page you are asking for😥
    </p>
    <p class="text-3xl">And we afraid this place is kinda dangerous.</p>
    <p class="text-3xl">Please hold my hand and let me show you the way home</p>
  </div>
  <RouterLink :to="{ name: 'home' }" class="block mt-4 ml-5 text-pinky"
    >Go back home</RouterLink
  >
</template>
