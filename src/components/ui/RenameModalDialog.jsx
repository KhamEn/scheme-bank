import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

const RenameModalDialog = ({ isOpen, setIsOpen, originalName, rename }) => {
  const [nameInput, setNameInput] = useState(originalName || "new name");

  useEffect(() => {
    if (!isOpen) {
      setNameInput(originalName);
    }
  }, [isOpen]);

  function handleConfirmClick() {
    const variables = {};
    setIsOpen(false);
    rename(nameInput);
  }

  function handleCancelClick() {
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <Dialog.Backdrop
        className={"fixed inset-0 bg-black/70"}
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="rounded-md border bg-gray-100 p-5">
          <Dialog.Title className=" text-xl font-bold  text-blue-900 ">
            Rename Palette
          </Dialog.Title>
          <input
            autoFocus
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            maxLength="25"
            className="mt-4 p-2"
          />
          <div className="mt-4 flex justify-evenly gap-2">
            <button
              onClick={handleConfirmClick}
              className="btn btn-create w-full p-[2px]"
            >
              Confirm
            </button>
            <button
              onClick={handleCancelClick}
              className="btn btn-delete w-full p-[2px]"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default RenameModalDialog;
