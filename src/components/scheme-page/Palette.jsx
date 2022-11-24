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
        <div key={`${docId}${color}${index}`} className=" m-2 w-24 ">
          <div
            className="h-24 w-24 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <input type="text" value="name" className=" mt-1 w-full" />
          <div>{color}</div>
          <button
            onClick={() => handleDeleteColorClick()(index)}
            className="btn btn-delete flex w-full items-center justify-around p-[1px]  text-xs font-light"
          >
            <TrashIcon className=" inline-block h-4" />
            <span>Delete Color</span>
          </button>
        </div>
      );
    });
  }

  return (
    // negative z-index, otherwise it stays on top of the drop down menu.  (positioned value is required to enable z-index)
    <div className="mt-4 w-max max-w-prose rounded-md border border-gray-300 p-1 ">
      <header className="flex items-center border-b border-gray-300 p-1">
        <h3>{name}</h3>
        <button
          onClick={handleAddColorClick}
          className="btn btn-create ml-3 flex items-center p-[2px] text-sm font-light"
        >
          <PlusCircleIcon className=" inline-block h-5" />
          <span>New Color</span>
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="btn btn-update ml-3 flex items-center p-[2px] text-sm font-light"
        >
          <PencilSquareIcon className="inline-block h-5" />
          <span>Rename Palette</span>
        </button>
        <button
          className="btn btn-delete ml-3 flex items-center p-[2px] text-sm font-light"
          onClick={handleDeletePaletteClick}
        >
          <TrashIcon className=" inline-block h-5" />
          <span>Delete Palette</span>
        </button>
      </header>
      <div className="flex  flex-wrap ">{listColorBlocks()}</div>
      <ModalDialog
        onConfirm={handleRenamePaletteClick}
        dialogTitle="Rename Palette"
        originalName={name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default Palette;
