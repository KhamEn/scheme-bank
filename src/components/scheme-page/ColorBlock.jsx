import {
  TrashIcon,
  PencilSquareIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { Popover } from "@headlessui/react";
import { useEffect } from "react";
import TextInputDialog from "../util/TextInputDialog";

const ColorBlock = ({
  index,
  color: originalColor,
  name,
  onUpdate,
  onRename,
  onDelete,
}) => {
  const [color, setColor] = useState(originalColor);
  const [confirmed, setConfirmed] = useState(false);
  const [showCopyConfirmation, setShowCopyConfirmation] = useState(false);
  const [showRenameColorDialog, setShowRenameColorDialog] = useState(false);

  useEffect(() => {
    if (showCopyConfirmation) {
      (async () => {
        setTimeout(() => {
          setShowCopyConfirmation(false);
        }, "500");
      })();
    }
  }, [showCopyConfirmation]);

  function onConfirmColor() {
    setConfirmed(true);
    onUpdate(index, color);
  }

  function onCopyColorValue() {
    navigator.clipboard.writeText(color);
    setShowCopyConfirmation(true);
  }

  return (
    <div className="m-2 w-16 sm:w-24 ">
      <Popover className="relative">
        {({ open }) => (
          <>
            {/* {revert to the original color if the popover is closed without             confirming} */}
            {!open && !confirmed && setColor(originalColor)}

            <Popover.Overlay className="fixed inset-0 z-10 bg-gray-900/80" />
            <Popover.Button>
              <div
                className="h-16 w-16 rounded-full hover:cursor-pointer sm:h-24 sm:w-24"
                style={{ backgroundColor: color }}
              ></div>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 shadow-lg">
              <ChromePicker
                color={color}
                onChange={(color) => setColor(color.hex)}
              />
              <div className="flex">
                <Popover.Button
                  onClick={onConfirmColor}
                  className="btn btn-create w-full bg-gray-100"
                >
                  Confirm
                </Popover.Button>
                <Popover.Button
                  onClick={() => setColor(originalColor)}
                  className="btn btn-delete w-full bg-gray-100"
                >
                  Cancel
                </Popover.Button>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>

      <div className="flex items-center text-sm font-light">
        <PencilSquareIcon
          onClick={() => setShowRenameColorDialog(true)}
          className="transform-jump mr-1 h-4 w-4 text-gray-500 hover:cursor-pointer hover:text-blue-500"
        />
        <p>{name || "color name"}</p>
      </div>

      <div className="flex items-center text-sm font-light">
        <ClipboardDocumentIcon
          onClick={onCopyColorValue}
          className="transform-jump mr-1 h-4 w-4 text-gray-500 hover:cursor-pointer hover:text-gray-900"
        />
        {showCopyConfirmation ? (
          <div className="m-1 w-full rounded-lg bg-gray-900 text-center text-gray-100">
            Copied
          </div>
        ) : (
          <div className="p-1">{color}</div>
        )}
      </div>

      <button
        onClick={() => onDelete(index)}
        className="btn btn-delete p-[1px] text-xs font-light"
      >
        <TrashIcon className=" inline-block h-4" />
      </button>

      {showRenameColorDialog && (
        <TextInputDialog
          onConfirm={(newName) => onRename(index, newName)}
          dialogTitle="Rename Color Block"
          originalName={name || "anon"}
          isOpen={showRenameColorDialog}
          setIsOpen={setShowRenameColorDialog}
        />
      )}
    </div>
  );
};

export default ColorBlock;
