import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import useGetCurrentSchemeIdQuery from "../database/useGetCurrentSchemeIdQuery";
import { useQuery } from "@tanstack/react-query";
import db from "./firestore-config";


// TODO: return: a map (key: docId, value: palette{name, colors})
async function getPalettes(currentSchemeDocId, palleteSubCollection) {
  const palettesRef = collection(
    db,
    "schemesFirestore",
    currentSchemeDocId,
    palleteSubCollection
  );
  const palettesSnap = await getDocs(palettesRef);
  const palettes = new Map();
  palettesSnap.forEach((doc) => palettes.set(doc.id, doc.data()));
  return palettes;
  // const palettes = [];
  // palettesSnap.forEach((doc) => palettes.push(doc.data()));
  // return palettes;
}

function useGetPalettesQuery(palleteSubCollection) {
  const { data } = useGetCurrentSchemeIdQuery();
  const currentSchemeDocId = data?.id;

  return useQuery({
    queryKey: [currentSchemeDocId, palleteSubCollection],
    queryFn: () => {
      const palettes = getPalettes(currentSchemeDocId, palleteSubCollection);
      return palettes;
    },
    enabled: !!currentSchemeDocId,
  });
}

export default useGetPalettesQuery;
