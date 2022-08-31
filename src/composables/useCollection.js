import { ref } from "vue";
import { db } from "../firebase/index";
import { addDoc, collection } from "firebase/firestore";

const error = ref(null);


const useCollection = (collectionName) => {
  const colRef = collection(db, collectionName);

  const addDocument = async (document) => {
    try {
      const res = await addDoc(colRef, document);
    } catch (err) {
      console.log(err.message);
      error.value = "Couldn't add doc";
    }
  };

  return { addDocument, error };
};

export default useCollection;
