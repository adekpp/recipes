import { ref } from "vue";
import { supabase } from "../supabase/config";

export function useLogin() {
  const isLoading = ref(null);
  const login = async (provider) => {
    isLoading.value = true;
    const { session } = await supabase.auth.signIn({
      provider: provider,
    });
    isLoading.value = false;
  };

  return { isLoading, login };
}
