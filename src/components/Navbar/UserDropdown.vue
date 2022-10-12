<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { supabase } from "../../supabase/config";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps(["user"]);

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  router.push("/");
};
</script>
<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="avatar">
        <div class="w-8 rounded-full ring ring-[#FFD7C9] ring-offset-2">
          <img :src="user.user_metadata.avatar_url" />
        </div>
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
          <MenuItem v-slot="{ active }" @click="handleLogout">
            <a
              href="#"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'flex flex-row px-4 py-2 text-sm items-center',
              ]"
            >
              Logout</a
            >
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
