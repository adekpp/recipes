import {
  onSnapshot,
  collection,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";
import { ref, watchEffect } from "vue";
import { db } from "../firebase/index";

const isLoading = ref(null);

const getCollection = (collectionName) => {
  const documents = ref(null);
  isLoading.value = true;

  // //collection ref
  // let colRef = collection(db, collectionName);

  // if (q) {
  //   colRef = query(colRef, where(...q));
  // }

  const getCollectionRTL = (q) => {
    //collection ref
    let colRef = collection(db, collectionName);

    let queryAll = query(colRef, orderBy("createdAt", "desc"));

    if (q) {
      queryAll = query(colRef, where(...q));
    }

    const unsub = onSnapshot(queryAll, (snapshot) => {
      let results = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });

      documents.value = results;
      isLoading.value = false;
    });

    watchEffect((onInvalidate) => {
      onInvalidate(() => unsub());
    });
  };

  return { documents, isLoading, getCollectionRTL };
};

export default getCollection;
