import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, setDoc, doc, collection, updateDoc } from "firebase/firestore";
import {
  firestoreCollection,
  firestoreSubCollection,
  queryKeys,
} from "../../Enums";
import { db } from "../../Firebase";

/*
@param variables.uid uid of the user in Firebase Auth
*/
async function createUserWithStarterScheme(variables) {
  // Add a new user to Firestore
  const userDocRef = doc(
    db,
    firestoreCollection.BASE_COLLECTION,
    variables.uid
  );
  await setDoc(userDocRef, { currentSchemeId: "" });

  // Add a scheme
  const schemesCollectionRef = collection(
    db,
    firestoreCollection.BASE_COLLECTION,
    variables.uid,
    firestoreCollection.SCHEMES
  );
  const newSchemeDocRef = await addDoc(schemesCollectionRef, {
    name: "starter scheme",
  });
  await updateDoc(userDocRef, { currentSchemeId: newSchemeDocRef.id });

  // Add palettes
  const primaryPalettesColRef = collection(
    db,
    firestoreCollection.BASE_COLLECTION,
    variables.uid,
    firestoreCollection.SCHEMES,
    newSchemeDocRef.id,
    firestoreSubCollection.PRIMARY_PALETTES
  );
  await addDoc(primaryPalettesColRef, {
    name: "prim",
    colors: [],
    colorNames: [],
  });
  const neutralPalettesColRef = collection(
    db,
    firestoreCollection.BASE_COLLECTION,
    variables.uid,
    firestoreCollection.SCHEMES,
    newSchemeDocRef.id,
    firestoreSubCollection.NEUTRAL_PALETTES
  );
  await addDoc(neutralPalettesColRef, {
    name: "neut",
    colors: [],
    colorNames: [],
  });
  const accentPalettesColRef = collection(
    db,
    firestoreCollection.BASE_COLLECTION,
    variables.uid,
    firestoreCollection.SCHEMES,
    newSchemeDocRef.id,
    firestoreSubCollection.ACCENT_PALETTES
  );
  await addDoc(accentPalettesColRef, {
    name: "acce",
    colors: [],
    colorNames: [],
  });
}

function useCreateUserWithStarterSchemeMutation() {
  const queryClient = useQueryClient();
  return useMutation(createUserWithStarterScheme, {
    onSuccess: () => {
      queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME_ID]),
        queryClient.invalidateQueries([...queryKeys.GET_CURRENT_SCHEME]),
        queryClient.invalidateQueries([...queryKeys.GET_ALL_SCHEMES]);
    },
  });
}

export default useCreateUserWithStarterSchemeMutation;
