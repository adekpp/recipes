import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../firebase/index";

const useLogin = () => {
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
    } catch (err) {
      console.log(err.message);
    }
  };

  return { loginWithGoogle };
};

export default useLogin;
