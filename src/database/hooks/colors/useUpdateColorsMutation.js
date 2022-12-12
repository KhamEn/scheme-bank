import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { firestoreCollection } from "../../Enums";
import useGetCurrentSchemeIdQuery from "../schemes/useGetCurrentSchemeIdQuery";

async function updateColors(variables) {
  const paletteDocRef = doc(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid,
    firestoreCollection.SCHEMES,
    variables.currentSchemeId,
    variables.paletteGroup,
    variables.paletteId
  );

  await updateDoc(paletteDocRef, {
    colors: variables.updatedColors,
  });
}

function useUpdateColorsMutation(paletteType) {
  const queryClient = useQueryClient();
  const { data } = useGetCurrentSchemeIdQuery();

  return useMutation(updateColors, {
    onSuccess: () => {
      queryClient.invalidateQueries([data, paletteType]);
    },
  });
}

export default useUpdateColorsMutation;
