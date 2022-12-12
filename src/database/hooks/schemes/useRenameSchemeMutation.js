import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { firestoreCollection, queryKeys } from "../../Enums";
import { auth, db } from "../../Firebase";

async function renameScheme(variables) {
  const schemeDocRef = doc(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid,
    firestoreCollection.SCHEMES,
    variables.schemeId
  );
  await updateDoc(schemeDocRef, {
    name: variables.newName,
  });
}

function useRenameSchemeMutation() {
  const queryClient = useQueryClient();

  return useMutation(renameScheme, {
    onSuccess: () => {
      queryClient.invalidateQueries([...queryKeys.GET_ALL_SCHEMES]);
    },
  });
}

export default useRenameSchemeMutation;
