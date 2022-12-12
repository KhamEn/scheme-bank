import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../Firebase";
import { firestoreCollection } from "../../Enums";
import useGetCurrentSchemeIdQuery from "../schemes/useGetCurrentSchemeIdQuery";

/*
@param variablese.schemeId - the doc id of the scheme where the new palette will be added
@param variables.paletteType - the doc id of the palette group where the new palette will be added
@param variables.paletteName - the name of the new palette
*/
async function addPalette(variables) {
  const palettesCollectionRef = collection(
    db,
    firestoreCollection.BASE_COLLECTION,
    auth.currentUser.uid,
    firestoreCollection.SCHEMES,
    variables.schemeId,
    variables.paletteType
  );
  await addDoc(palettesCollectionRef, {
    name: variables.paletteName,
    colors: [],
    colorNames: [],
  });
}

function useAddPaletteMutation(paletteType) {
  const queryClient = useQueryClient();
  const { data } = useGetCurrentSchemeIdQuery();

  return useMutation(addPalette, {
    onSuccess: () => {
      queryClient.invalidateQueries([data, paletteType]);
    },
  });
}

export default useAddPaletteMutation;
