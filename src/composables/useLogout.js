import { supabase } from "../supabase/config";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
const storage = useStorage("store", { toastSeen: "" });
export function useLogout() {
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    storage.value.toastSeen = false;
  };

  return { logout };
}
