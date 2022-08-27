import { ref } from "vue";
import { storage } from "../firebase/index";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import getUser from "../composables/getUser";

const { user } = getUser();
const filePath = ref(null);
const url = ref(null);

const useStorage = () => {
  const uploadFile = async (file) => {
    filePath.value = `recipes/${user.value.uid}/${file.name}`;

    const storagePath = storageRef(storage, filePath.value);

    const uploadTask = await uploadBytes(storagePath, file);

    url.value = await getDownloadURL(uploadTask.ref);
  };

  return { uploadFile, url };
};

export default useStorage;
