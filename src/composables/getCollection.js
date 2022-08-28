import { onSnapshot, collection, query, where } from "firebase/firestore";
import { ref, watchEffect } from "vue";
import { db } from "../firebase/index";

const getCollection = (collectionName, q) => {
  const documents = ref(null);

  //collection ref
  let colRef = collection(db, collectionName);

  if (q) {
    colRef = query(colRef, where(...q));
  }

  const unsub = onSnapshot(colRef, (snapshot) => {
    let results = [];
    snapshot.docs.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });

    documents.value = results;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents };
};

export default getCollection;
