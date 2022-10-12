import { ref } from "vue";
import { supabase } from "../supabase/config";

const user = ref(supabase.auth.user());

const createUserProfile = async () => {
  let { data } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.value.id)
    .single();

  if (!data) {
    const updates = {
      id: user.value.id,
      email: user.value.email,
    };
    const { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal",
    });
  }
};

supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    user.value = supabase.auth.user();
    createUserProfile();
  } else {
    user.value = null;
  }
});

const getUser = () => {
  return { user };
};

export default getUser;
