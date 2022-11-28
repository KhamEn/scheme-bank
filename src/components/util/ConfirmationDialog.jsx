import { Dialog } from "@headlessui/react";

const ConfirmationDialog = ({ isOpen, setIsOpen, dialogTitle, onConfirm }) => {
  function handleConfirmClick() {
    onConfirm();
    setIsOpen(false);
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
        className={"fixed inset-0 bg-gray-900/70"}
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="rounded-md border bg-gray-100 p-5">
          <Dialog.Title className=" text-xl font-bold  text-gray-900 ">
            {dialogTitle}
          </Dialog.Title>
          <div className="mt-4 flex justify-evenly gap-2">
            <button
              onClick={handleConfirmClick}
              className="btn btn-delete w-full p-[2px]"
            >
              Delete
            </button>
            <button
              onClick={handleCancelClick}
              className="btn btn-neutral w-full p-[2px]"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
