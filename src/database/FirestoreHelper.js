import {
  doc,
  updateDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import db from "./firestore-config";

const nameOfSchemesCollection = "schemesFirestore";

async function setCurrentSchemeDocId(id) {
  const docRef = doc(db, "currentScheme", "ID");
  await updateDoc(docRef, {
    id: id,
  });
}

async function fetchCurrentSchemeDocId() {
  const docRef = doc(db, "currentScheme", "ID");
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}

/* 
  return a map of schemes (key = schemeDocumentId, value = scheme)
*/
async function fetchAllSchemes() {
  const schemes = new Map();
  const schemesCollection = await getDocs(
    collection(db, nameOfSchemesCollection)
  );
  schemesCollection.forEach((scheme) => {
    schemes.set(scheme.id, scheme.data());
  });

  return schemes;
}

export { setCurrentSchemeDocId, fetchCurrentSchemeDocId, fetchAllSchemes };
