<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { BIconChevronDown } from "bootstrap-icons-vue";
</script>
<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="inline-flex w-full justify-center items-center">
        Recipes
        <BIconChevronDown class="-mr-1 ml-1 h-3 w-3" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <router-link to="/add">
            <MenuItem>
              <div class="cursor-pointer block px-4 py-2 text-sm">
                Add recipe
              </div>
            </MenuItem>
          </router-link>
          <router-link to="/allrecipes">
            <MenuItem>
              <div class="block px-4 py-2 text-sm">Browse recipes</div>
            </MenuItem>
          </router-link>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
