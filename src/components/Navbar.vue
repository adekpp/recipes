<template>
  <div
    ref="navbar"
    class="w-full flex bg-neutral px-3 py-3 justify-between top-0 z-40 mb-10 sticky"
  >
    <div class="flex place-items-center">
      <div class="text-red-500 font-bold text-2xl">delicious</div>
      <span class="font-bold text-2xl">.</span>
      <div class="text-white font-bold text-2xl">recipes</div>
      <div class="hidden md:block ml-14">
        <label className="relative text-gray-600 focus-within:text-white block">
          <BIconSearch
            class="z-50 absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none"
          />

          <input
            type="text"
            placeholder="Search"
            class="input input-sm input-primary w-full max-w-xs z-10 pl-8"
          />
        </label>
      </div>
    </div>

    <nav class="hidden md:flex place-items-center gap-x-3">
      <router-link to="/add">Add recipe</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
    </nav>
  </div>
</template>

<script>
import { BIconSearch } from "bootstrap-icons-vue";
import { onMounted, ref, onUnmounted } from "vue";
export default {
  components: {
    BIconSearch,
  },
}
</script>

<style></style>
