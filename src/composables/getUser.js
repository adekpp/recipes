import { ref } from "vue";
import { auth } from "../firebase/index";
import { onAuthStateChanged } from "firebase/auth";

const user = ref(auth.currentUser);

onAuthStateChanged(auth, (_user) => {
  if (_user) {
    user.value = _user;
  } else {
    user.value = null;
  }
});

const getUser = () => {
  return { user };
};

export default getUser;
