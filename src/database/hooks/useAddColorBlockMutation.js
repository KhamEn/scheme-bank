import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import db from "../firestore-config";
import { FIRESTORE_COLLECTION } from "../Enums";
import useGetCurrentSchemeIdQuery from "./useGetCurrentSchemeIdQuery";

async function addColorBlock(variables) {
  const paletteRef = doc(
    db,
    FIRESTORE_COLLECTION.schemes,
    variables.currentSchemeId,
    variables.paletteGroup,
    variables.paletteId
  );

  await updateDoc(paletteRef, {
    colors: variables.colors.concat("#000"),
  });
}

function useAddColorBlockMutation(paletteGroup) {
  const queryClient = useQueryClient();
  const { data } = useGetCurrentSchemeIdQuery();

  return useMutation(addColorBlock, {
    onSuccess: () => {
      queryClient.invalidateQueries([data.id, paletteGroup]);
    },
  });
}

export default useAddColorBlockMutation;
