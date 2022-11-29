import { useState } from "react";
import useDeletePaletteMutation from "../../database/hooks/palettes/useDeletePaletteMutation";
import useGetCurrentSchemeIdQuery from "../../database/hooks/schemes/useGetCurrentSchemeIdQuery";
import useUpdateColorsMutation from "../../database/hooks/colors/useUpdateColorsMutation";
import useRenamePaletteMutation from "../../database/hooks/palettes/useRenamePaletteMutation";
import ModalDialog from "../util/ModalDialog";
import {
  TrashIcon,
  PlusCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

const Palette = ({ paletteType, docId, name, colors }) => {
  const { data, isLoading } = useGetCurrentSchemeIdQuery();
  const { mutate: mutateUpdatePalette } = useUpdateColorsMutation(paletteType);
  const { mutate: mutateDeletePalette } = useDeletePaletteMutation(paletteType);
  const { mutate: mutateRenamePalette } = useRenamePaletteMutation(paletteType);

  const [showRenamePaletteDialog, setShowRenamePaletteDialog] = useState(false);

  function handleRenamePaletteClick(newName) {
    setShowRenamePaletteDialog(false);

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
        <div key={`${docId}${color}${index}`} className="m-2 w-16 sm:w-24 ">
          <div
            className="h-16 w-16 rounded-full sm:h-24 sm:w-24"
            style={{ backgroundColor: color }}
          ></div>
          <input type="text" value="name" className=" mt-1 w-full" />
          <div>{color}</div>
          <button
            onClick={() => handleDeleteColorClick(index)}
            className="btn btn-delete p-[1px] text-xs font-light"
          >
            <TrashIcon className=" inline-block h-4" />
            {/* <span>Delete Color</span> */}
          </button>
        </div>
      );
    });
  }

  return (
    <div className="mt-4 w-max max-w-full rounded-md border border-gray-300 p-1 ">
      <header className="flex flex-wrap items-center gap-1 border-b border-gray-300 p-1">
        <h3>{name}</h3>
        <button
          onClick={handleAddColorClick}
          className="btn btn-create flex items-center p-[2px] text-xs font-extralight sm:text-sm sm:font-light"
        >
          <PlusCircleIcon className=" inline-block h-5" />
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
          onClick={handleDeletePaletteClick}
        >
          <TrashIcon className=" inline-block h-5" />
          <span>Delete Palette</span>
        </button>
      </header>
      <div className="flex  flex-wrap ">{listColorBlocks()}</div>

      {showRenamePaletteDialog && (
        <ModalDialog
          onConfirm={handleRenamePaletteClick}
          dialogTitle="Rename Palette"
          originalName={name}
          isOpen={showRenamePaletteDialog}
          setIsOpen={setShowRenamePaletteDialog}
        />
      )}
    </div>
  );
};

export default Palette;
