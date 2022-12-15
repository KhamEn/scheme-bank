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
    name: "example",
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
    name: "blue",
    colors: [
      "#dbeafe",
      "#bfdbfe",
      "#93c5fd",
      "#60a5fa",
      "#3b82f6",
      "#2563eb",
      "#1d4ed8",
      "#1e40af",
      "#1e3a8a",
    ],
    colorNames: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    name: "gray",
    colors: [
      "#f3f4f6",
      "#e5e7eb",
      "#d1d5db",
      "#9ca3af",
      "#6b7280",
      "#4b5563",
      "#374151",
      "#1f2937",
      "#111827",
    ],
    colorNames: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    name: "green",
    colors: [
      "#dcfce7",
      "#bbf7d0",
      "#86efac",
      "#4ade80",
      "#22c55e",
      "#16a34a",
      "#15803d",
      "#166534",
      "#14532d",
    ],
    colorNames: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  });
  await addDoc(accentPalettesColRef, {
    name: "red",
    colors: [
      "#fee2e2",
      "#fecaca",
      "#fca5a5",
      "#f87171",
      "#ef4444",
      "#dc2626",
      "#b91c1c",
      "#991b1b",
      "#7f1d1d",
    ],
    colorNames: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
