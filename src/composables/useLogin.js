import { ref, watch, onMounted, onUnmounted } from "vue";
import { supabase } from "../supabase/config";
import { useStorage } from "@vueuse/core";
import { createToaster } from "@meforma/vue-toaster";
import getUser from "../composables/getUser";
const { user } = getUser();
const toast = createToaster({
  position: "top",
  maxToasts: 1,
  type: "success",
  duration: 2000
});
const storage = useStorage("store", { toastSeen: null });

onMounted(() => {
  storage.value.toastSeen = null
});

export function useLogin() {
  const isLoading = ref(null);
  const login = async (provider) => {
    isLoading.value = true;
    const { session } = await supabase.auth.signIn({
      provider: provider,
    });
    isLoading.value = false;
  };

  watch(user, () => {
    if (user.value && storage.value.toastSeen != true) {
      toast.show(`Hello, ${user.value.email}`);
      storage.value.toastSeen = true;
    }
  });

  return { isLoading, login };
}
