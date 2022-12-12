import { useState } from "react";
import useDeletePaletteMutation from "../../database/hooks/palettes/useDeletePaletteMutation";
import useGetCurrentSchemeIdQuery from "../../database/hooks/schemes/useGetCurrentSchemeIdQuery";
import useUpdateColorsMutation from "../../database/hooks/colors/useUpdateColorsMutation";
import useRenamePaletteMutation from "../../database/hooks/palettes/useRenamePaletteMutation";
import TextInputDialog from "../util/TextInputDialog";
import ColorBlock from "./ColorBlock";
import {
  TrashIcon,
  PlusCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import useUpdateColorNamesMutation from "../../database/hooks/colors/useUpdateColorNamesMutation";

const Palette = ({ paletteType, docId, name, colors, colorNames }) => {
  const currentSchemeIdQuery = useGetCurrentSchemeIdQuery();
  const deletePaletteMutation = useDeletePaletteMutation(paletteType);
  const renamePaletteMutation = useRenamePaletteMutation(paletteType);
  const updateColorsMutation = useUpdateColorsMutation(paletteType);
  const updateColorNamesMutation = useUpdateColorNamesMutation(paletteType);

  const [showRenamePaletteDialog, setShowRenamePaletteDialog] = useState(false);

  function renamePalette(newName) {
    setShowRenamePaletteDialog(false);

    const variables = {
      schemeId: currentSchemeIdQuery.data,
      paletteType: paletteType,
      paletteId: docId,
      paletteName: newName || `random: ${Math.random() * 100}`,
    };
    renamePaletteMutation.mutate(variables);
  }

  function deletePalette() {
    const variables = {
      schemeId: currentSchemeIdQuery.data,
      paletteTypeId: paletteType,
      paletteId: docId,
    };
    deletePaletteMutation.mutate(variables);
  }

  function addColorBlock() {
    if (!currentSchemeIdQuery.isLoading) {
      const variablesForColors = {
        currentSchemeId: currentSchemeIdQuery.data,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColors: colors.concat("#000"),
      };
      const variablesForColorNames = {
        currentSchemeId: currentSchemeIdQuery.data,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColorNames: colorNames.concat("nucolo"),
      };
      updateColorsMutation.mutate(variablesForColors);
      updateColorNamesMutation.mutate(variablesForColorNames);
    }
  }

  function changeColor(colorIndex, newColor) {
    if (!currentSchemeIdQuery.isLoading) {
      colors[colorIndex] = newColor;

      const variables = {
        currentSchemeId: currentSchemeIdQuery.data,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColors: colors,
      };

      updateColorsMutation.mutate(variables);
    }
  }

  function renameColor(colorIndex, newName) {
    if (!currentSchemeIdQuery.isLoading) {
      colorNames[colorIndex] = newName;

      const variables = {
        currentSchemeId: currentSchemeIdQuery.data,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColorNames: colorNames,
      };

      updateColorNamesMutation.mutate(variables);
    }
  }

  function deleteColorBlock(colorIndex) {
    if (!currentSchemeIdQuery.isLoading) {
      colors.splice(colorIndex, 1);
      colorNames.splice(colorIndex, 1);

      const variablesForColors = {
        currentSchemeId: currentSchemeIdQuery.data,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColors: colors,
      };
      const variablesForColorNames = {
        currentSchemeId: currentSchemeIdQuery.data,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColorNames: colorNames,
      };

      updateColorsMutation.mutate(variablesForColors);
      updateColorNamesMutation.mutate(variablesForColorNames);
    }
  }

  return (
    <article className="mt-4 w-max max-w-full rounded-md border border-gray-300 p-1 ">
      <header className="flex flex-wrap items-center gap-1 border-b border-gray-300 p-1">
        <h3>{name}</h3>
        <button
          onClick={addColorBlock}
          className="btn btn-create flex items-center p-[2px] text-xs font-extralight sm:text-sm sm:font-light"
        >
          <PlusCircleIcon className="inline-block h-5" />
          <span>New Color</span>
        </button>
        <button
          onClick={() => setShowRenamePaletteDialog(true)}
          className="btn btn-update flex items-center p-[2px] text-xs font-extralight sm:text-sm sm:font-light"
        >
          <PencilSquareIcon className="inline-block h-5" />
          <span>Rename Palette</span>
        </button>
        <button
          className="btn btn-delete flex items-center p-[2px] text-xs font-extralight sm:text-sm sm:font-light"
          onClick={deletePalette}
        >
          <TrashIcon className=" inline-block h-5" />
          <span>Delete Palette</span>
        </button>
      </header>

      <main className="flex  flex-wrap ">
        {colors.map((color, index) => {
          return (
            <ColorBlock
              key={`${docId}${color}${index}`}
              index={index}
              color={color}
              name={colorNames[index]}
              onUpdate={changeColor}
              onRename={renameColor}
              onDelete={deleteColorBlock}
            />
          );
        })}
      </main>

      {showRenamePaletteDialog && (
        <TextInputDialog
          onConfirm={renamePalette}
          dialogTitle="Rename Palette"
          originalName={name}
          isOpen={showRenamePaletteDialog}
          setIsOpen={setShowRenamePaletteDialog}
        />
      )}
    </article>
  );
};

export default Palette;
