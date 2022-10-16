<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { supabase } from "../../supabase/config";
import { ref } from "@vue/reactivity";
import { BIconChevronDown } from "bootstrap-icons-vue";
import { useLogin } from "../../composables/useLogin";
const { isLoading, login } = useLogin();
</script>
<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center items-center bg-[#FF642F] px-4 py-1 text-white hover:bg-[#fd5a23] active:scale-95"
      >
        <span class="text-sm font-light">Login</span>
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
          <MenuItem v-slot="{ active }" @click="login('google')">
            <a
              href="#"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'flex flex-row px-4 py-2 text-sm items-center',
              ]"
            >
              <img
                class="w-6 h-6 mr-2"
                src="../../assets/googleIcon.svg"
                alt=""
              />
              Google</a
            >
          </MenuItem>
          <MenuItem v-slot="{ active }" @click="login('facebook')">
            <a
              href="#"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'flex flex-row px-4 py-2 text-sm items-center',
              ]"
            >
              <img
                class="w-9 h-9 mr-1 -ml-[5px]"
                src="../../assets/facebookIcon.svg"
                alt=""
              />
              Facebook</a
            >
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
