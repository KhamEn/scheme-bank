import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import db from "../../firestore-config";
import { FIRESTORE_COLLECTION } from "../../Enums";
import useGetCurrentSchemeIdQuery from "../schemes/useGetCurrentSchemeIdQuery";

/*
@param variablese.schemeId - the doc id of the scheme where the new palette will be added
@param variables.paletteType - the doc id of the palette group where the new palette will be added
@param variables.paletteName - the name of the new palette
*/
async function addPalette(variables) {
  await addDoc(
    collection(
      db,
      FIRESTORE_COLLECTION.schemes,
      variables.schemeId,
      variables.paletteType
    ),
    {
      name: variables.paletteName,
      colors: [],
    }
  );
}

function useAddPaletteMutation(paletteType) {
  const queryClient = useQueryClient();
  const { data } = useGetCurrentSchemeIdQuery();

  return useMutation(addPalette, {
    onSuccess: () => {
      queryClient.invalidateQueries([data.id, paletteType]);
    },
  });
}

export default useAddPaletteMutation;
