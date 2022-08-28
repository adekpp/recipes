import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { ref } from "vue";
import { auth, providerFb, providerGoogle } from "../firebase/index";

const error = ref(null);

const useLogin = () => {
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, providerFb);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const loginWithGoogleMobile = async () => {
    try {
      await signInWithRedirect(auth, providerGoogle);
      const result = await getRedirectResult(auth);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const loginWithFacebookMobile = async () => {
    try {
      await signInWithRedirect(auth, providerFb);
      const result = await getRedirectResult(auth);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  return {
    loginWithGoogle,
    loginWithGoogleMobile,
    loginWithFacebook,
    loginWithFacebookMobile,
    error,
  };
};

export default useLogin;
