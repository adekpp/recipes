import { supabase } from "../supabase/config";
import useApi from "../supabase/useApi";
import getUser from "../composables/getUser";

const { user } = getUser();
const { isUserLike } = useApi();

export function useLike() {
  let user_likes = [];

  async function like({ x, id }) {
    const isLiked = await isUserLike(`${id}`);

    let { data: userLike } = await supabase
      .from("profiles")
      .select("user_likes")
      .eq("id", user.value.id);
    user_likes = userLike[0].user_likes || [];
    if (!isLiked) {
      const { data } = await supabase.rpc("increment", {
        x,
        row_id: id,
      });
      user_likes.push(`${id}`);

      let { data: profiles, error } = await supabase
        .from("profiles")
        .update({ user_likes })
        .eq("id", user.value.id);
    } else {
      const unlike = user_likes.filter((ul) => ul !== `${id}`);
      const { data } = await supabase.rpc("decrement", {
        x,
        row_id: id,
      });
      let { data: profiles, error } = await supabase
        .from("profiles")
        .update({ user_likes: unlike })
        .eq("id", user.value.id);
    }
  }

  return {
    like,
  };
}
