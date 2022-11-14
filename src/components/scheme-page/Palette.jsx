import { useState } from "react";
import useDeletePaletteMutation from "../../database/hooks/palettes/useDeletePaletteMutation";
import useGetCurrentSchemeIdQuery from "../../database/hooks/schemes/useGetCurrentSchemeIdQuery";
import useUpdateColorsMutation from "../../database/hooks/colors/useUpdateColorsMutation";
import useRenamePaletteMutation from "../../database/hooks/palettes/useRenamePaletteMutation";
import RenameModalDialog from "../ui/RenameModalDialog";

const Palette = ({ paletteType, docId, name, colors }) => {
  const { data, isLoading } = useGetCurrentSchemeIdQuery();
  const { mutate: mutateUpdatePalette } = useUpdateColorsMutation(paletteType);
  const { mutate: mutateDeletePalette } = useDeletePaletteMutation(paletteType);
  const { mutate: mutateRenamePalette } = useRenamePaletteMutation(paletteType);

  const [isOpen, setIsOpen] = useState(false);

  function handleRenamePaletteClick(newName) {
    setIsOpen(false);

    const variables = {
      schemeId: data.id,
      paletteType: paletteType,
      paletteId: docId,
      paletteName: newName || `random: ${Math.random() * 100}`,
    };
    mutateRenamePalette(variables);
  }

  function handleDeletePaletteClick() {
    const variables = {
      schemeId: data.id,
      paletteTypeId: paletteType,
      paletteId: docId,
    };
    mutateDeletePalette(variables);
  }

  function handleAddColorClick() {
    if (!isLoading) {
      const variables = {
        currentSchemeId: data.id,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColors: colors.concat("#000"),
      };
      mutateUpdatePalette(variables);
    }
  }

  function handleDeleteColorClick(targetIndex) {
    if (!isLoading) {
      colors.splice(targetIndex, 1);

      const variables = {
        currentSchemeId: data.id,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColors: colors,
      };

      mutateUpdatePalette(variables);
    }
  }

  function listColorBlocks() {
    return colors.map((color, index) => {
      return (
        <div key={`${docId}${color}${index}`}>
          <div style={{ backgroundColor: color }}>{color}</div>
          <button
            onClick={() => handleDeleteColorClick()(index)}
            className=" border-4 border-red-500"
          >
            Delete Color Block
          </button>
        </div>
      );
    });
  }

  return (
    <div className=" border border-gray-500">
      <h3>{name}</h3>
      <button
        onClick={() => setIsOpen(true)}
        className=" bg-gray-500 border-2 border-green-500"
      >
        Rename Palette
      </button>
      <button
        className=" bg-red-500 border-2 border-black"
        onClick={handleDeletePaletteClick}
      >
        Delete Palette
      </button>
      <button
        onClick={handleAddColorClick}
        className=" bg-green-500 border-2 border-black"
      >
        + Add Color
      </button>
      <div>{listColorBlocks()}</div>
      <RenameModalDialog
        rename={handleRenamePaletteClick}
        originalName={name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default Palette;
