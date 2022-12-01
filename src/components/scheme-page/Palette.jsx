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
  const { data, isLoading } = useGetCurrentSchemeIdQuery();
  const { mutate: mutateDeletePalette } = useDeletePaletteMutation(paletteType);
  const { mutate: mutateRenamePalette } = useRenamePaletteMutation(paletteType);
  const { mutate: mutateUpdateColors } = useUpdateColorsMutation(paletteType);
  const { mutate: mutateUpdateColorNames } =
    useUpdateColorNamesMutation(paletteType);

  const [showRenamePaletteDialog, setShowRenamePaletteDialog] = useState(false);

  function renamePalette(newName) {
    setShowRenamePaletteDialog(false);

    const variables = {
      schemeId: data.id,
      paletteType: paletteType,
      paletteId: docId,
      paletteName: newName || `random: ${Math.random() * 100}`,
    };
    mutateRenamePalette(variables);
  }

  function deletePalette() {
    const variables = {
      schemeId: data.id,
      paletteTypeId: paletteType,
      paletteId: docId,
    };
    mutateDeletePalette(variables);
  }

  function addColorBlock() {
    if (!isLoading) {
      const variablesForColors = {
        currentSchemeId: data.id,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColors: colors.concat("#000"),
      };
      const variablesForColorNames = {
        currentSchemeId: data.id,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColorNames: colorNames.concat("nucolo"),
      };
      mutateUpdateColors(variablesForColors);
      mutateUpdateColorNames(variablesForColorNames);
    }
  }

  function changeColor(colorIndex, newColor) {
    if (!isLoading) {
      colors[colorIndex] = newColor;

      const variables = {
        currentSchemeId: data.id,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColors: colors,
      };

      mutateUpdateColors(variables);
    }
  }

  function renameColor(colorIndex, newName) {
    if (!isLoading) {
      colorNames[colorIndex] = newName;

      const variables = {
        currentSchemeId: data.id,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColorNames: colorNames,
      };

      mutateUpdateColorNames(variables);
    }
  }

  function deleteColorBlock(colorIndex) {
    if (!isLoading) {
      colors.splice(colorIndex, 1);
      colorNames.splice(colorIndex, 1);

      const variablesForColors = {
        currentSchemeId: data.id,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColors: colors,
      };
      const variablesForColorNames = {
        currentSchemeId: data.id,
        paletteGroup: paletteType,
        paletteId: docId,
        updatedColorNames: colorNames,
      };

      mutateUpdateColors(variablesForColors);
      mutateUpdateColorNames(variablesForColorNames);
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
