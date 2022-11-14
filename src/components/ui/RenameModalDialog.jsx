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
        className={"fixed inset-0 bg-black/30"}
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className=" bg-blue-500">
          <Dialog.Title>Rename Palette</Dialog.Title>
          <input
            autoFocus
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <button onClick={handleConfirmClick}>Confirm</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default RenameModalDialog;
