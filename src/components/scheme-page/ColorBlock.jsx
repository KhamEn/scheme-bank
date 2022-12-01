import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { Popover } from "@headlessui/react";
import { useEffect } from "react";

const ColorBlock = ({ index, color: originalColor, onUpdate, onDelete }) => {
  const [color, setColor] = useState(originalColor);
  const [confirmed, setConfirmed] = useState(false);
  const [showCopyConfirmation, setShowCopyConfirmation] = useState(false);

  useEffect(() => {
    if (showCopyConfirmation) {
      (async () => {
        setTimeout(() => {
          setShowCopyConfirmation(false);
        }, "500");
      })();
    }
  }, [showCopyConfirmation]);

  function onConfirm() {
    setConfirmed(true);
    onUpdate(index, color);
  }

  function addToClipboard() {
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
                  onClick={onConfirm}
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

      <input type="text" value="name" className=" mt-1 w-full" disabled />
      {showCopyConfirmation ? (
        <div className="m-1 rounded-lg bg-gray-900 text-center text-gray-100">
          Copied
        </div>
      ) : (
        <div onClick={addToClipboard} className=" p-1 hover:cursor-pointer ">
          {color}
        </div>
      )}

      <button
        onClick={() => onDelete(index)}
        className="btn btn-delete p-[1px] text-xs font-light"
      >
        <TrashIcon className=" inline-block h-4" />
      </button>
    </div>
  );
};

export default ColorBlock;
