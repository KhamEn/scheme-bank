import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../firestore-config";
import { FIRESTORE_COLLECTION } from "../../Enums";
import useGetCurrentSchemeIdQuery from "../schemes/useGetCurrentSchemeIdQuery";

async function updateColors(variables) {
  const paletteRef = doc(
    db,
    FIRESTORE_COLLECTION.schemes,
    variables.currentSchemeId,
    variables.paletteGroup,
    variables.paletteId
  );

  await updateDoc(paletteRef, {
    colors: variables.updatedColors,
  });
}

function useUpdateColorsMutation(paletteType) {
  const queryClient = useQueryClient();
  const { data } = useGetCurrentSchemeIdQuery();

  return useMutation(updateColors, {
    onSuccess: () => {
      queryClient.invalidateQueries([data.id, paletteType]);
    },
  });
}

export default useUpdateColorsMutation;
