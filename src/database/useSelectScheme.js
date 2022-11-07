import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import db from "./firestore-config";

const nameOfSchemesCollection = "schemesFirestore";

async function setCurrentSchemeDocId(id) {
  const docRef = doc(db, "currentScheme", "ID");
  await updateDoc(docRef, {
    id: id,
  });
}

function useSelectScheme() {
    const queryClienet = useQueryClient()

  return useMutation(setCurrentSchemeDocId, {
    onSuccess: () => {
        queryClienet.invalidateQueries(["currentSchemeId"])
    }
  });
}

export default useSelectScheme;
