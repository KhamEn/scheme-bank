import { PlusCircleIcon } from "@heroicons/react/24/outline";
import useAddPaletteMutation from "../../database/hooks/palettes/useAddPaletteMutation";
import useGetCurrentSchemeIdQuery from "../../database/hooks/schemes/useGetCurrentSchemeIdQuery";
import useGetAllPalettesQuery from "../../database/hooks/palettes/useGetAllPalettesQuery";
import Palette from "./Palette";

const PaletteGroup = ({ groupName }) => {
  const allPalettesQuery = useGetAllPalettesQuery(groupName);
  const currentSchemeIdQuery = useGetCurrentSchemeIdQuery();
  const addPaletteMutation = useAddPaletteMutation(groupName);

  function handleNewPaletteClick() {
    const paletteName = "new paletteo";
    const variables = {
      schemeId: currentSchemeIdQuery.data,
      paletteType: groupName,
      paletteName: paletteName,
    };
    addPaletteMutation.mutate(variables);
  }

  function listPalettes() {
    const palettes = [];

    for (const [docId, palette] of allPalettesQuery.data) {
      const paletteComponent = (
        <Palette
          key={docId}
          paletteType={groupName}
          docId={docId}
          name={palette.name}
          colors={palette.colors}
          colorNames={palette.colorNames}
        />
      );
      palettes.push(paletteComponent);
    }

    return palettes;
  }

  return (
    <div className="mt-4">
      <header className="flex items-end ">
        <h1 className=" uppercase">{groupName}</h1>
        <button
          onClick={handleNewPaletteClick}
          className="btn btn-create ml-4 flex items-center p-[2px]"
        >
          <PlusCircleIcon className=" inline-block h-6 " />
          <span className="">New Palette</span>
        </button>
      </header>

      {!allPalettesQuery.isLoading && listPalettes()}
    </div>
  );
};

export default PaletteGroup;
