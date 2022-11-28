import { useState } from "react";
import { Menu } from "@headlessui/react";
import { Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import useGetAllSchemesQuery from "../../database/hooks/schemes/useGetAllSchemesQuery";
import useGetCurrentSchemeQuery from "../../database/hooks/schemes/useGetCurrentSchemeQuery";
import ModalDialog from "../util/ModalDialog";
import MenuItem from "./MenuItem";
import useCreateAndSelectSchemeMutation from "../../database/hooks/schemes/useCreateAndSelectSchemeMutation";
import ConfirmationDialog from "../util/ConfirmationDialog";

const DropdownMenu = () => {
  const { data: currentScheme, isLoading: currentSchemeIsLoading } =
    useGetCurrentSchemeQuery();
  const { data: allSchemes, isLoading: allSchemesIsLoading } =
    useGetAllSchemesQuery();
  const { mutate } = useCreateAndSelectSchemeMutation();

  const [newSchemeDialogIsOpen, setNewSchemeDialogIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteDialogVariables, setDeleteDialogVariables] = useState({});

  function handleNewPaletteClick(schemeName) {
    mutate(schemeName);
  }

  function showDeleteConfirmationDialog(variables) {
    setDeleteDialogVariables(variables);
    setShowDeleteDialog(true);
  }

  function listSchemes() {
    const schemesList = [];

    for (const [docId, scheme] of allSchemes) {
      schemesList.push(
        <MenuItem
          key={docId}
          id={docId}
          name={scheme.name}
          onDelete={showDeleteConfirmationDialog}
        />
      );
    }

    return schemesList;
  }

  return (
    <Menu as="div" className=" w-fit ">
      <div className="flex items-center">
        <Menu.Button
          className={
            "justify-betwee m-2 flex gap-1 rounded-sm border border-gray-900  bg-gray-100 p-1 hover:border-gray-900 hover:bg-gray-900 hover:text-gray-100 ui-open:border-gray-900 ui-open:bg-gray-900 ui-open:text-gray-100  "
          }
        >
          <Bars3Icon className="h-6" />
        </Menu.Button>
        {!currentSchemeIsLoading && (
          <div className="mr-2 font-bold">{currentScheme.name}</div>
        )}
      </div>

      <Menu.Items className="ml-2 flex flex-col gap-3 rounded-sm bg-gray-200 p-4">
        {!allSchemesIsLoading && listSchemes()}
        <Menu.Item
          as="button"
          onClick={() =>
            setNewSchemeDialogIsOpen((modalIsOpen) => !modalIsOpen)
          }
          className="mt-3 flex w-full transform items-center justify-center gap-2 border border-gray-500 p-1 text-base  font-semibold text-gray-500 transition ui-active:-translate-y-0.5 ui-active:cursor-pointer ui-active:border-gray-100 ui-active:bg-green-500 ui-active:text-gray-100"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span>New Scheme</span>
        </Menu.Item>
      </Menu.Items>

      <ConfirmationDialog
        isOpen={showDeleteDialog}
        setIsOpen={setShowDeleteDialog}
        dialogTitle={deleteDialogVariables.dialogTitle}
        onConfirm={deleteDialogVariables.deleteScheme}
      />
      <ModalDialog
        isOpen={newSchemeDialogIsOpen}
        setIsOpen={setNewSchemeDialogIsOpen}
        dialogTitle="New Scheme"
        originalName="anon scheme"
        onConfirm={handleNewPaletteClick}
      />
    </Menu>
  );
};

export default DropdownMenu;
