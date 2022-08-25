<template>
  <div
    ref="navbar"
    class="w-full flex bg-neutral px-3 py-3 justify-between top-0 z-40 mb-10 sticky"
  >
    <div class="flex place-items-center">
      <router-link to="/" class="flex flex-row">
        <div class="text-red-500 font-bold text-md md:text-2xl">delicious</div>
        <span class="font-bold text-md md:text-2xl">.</span>
        <div class="text-white font-bold text-md md:text-2xl">recipes</div>
      </router-link>
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

    <nav class="flex place-items-center">
      <div class="hidden md:block avatar">
        <div class="w-12 rounded-full">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="dropdownLabel btn bg-secondary hover:bg-secondary-focus">
          <p class="text-sm md:text-sm ">My profile</p>
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li class="flex flex-row justify-end">
            <div class="md:hidden avatar">
              <div class="w-8 rounded-full">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
          </li>
          <li><router-link to="/add">Add recipe</router-link></li>
          <li><a>Favorites</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { BIconSearch } from "bootstrap-icons-vue";
export default {
  components: {
    BIconSearch,
  },
};
</script>

<style>
/* .dropdownLabel {
  font-size: 10px;
} */
</style>
