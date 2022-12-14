import { useState } from "react";
import { Menu } from "@headlessui/react";
import { Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import useGetAllSchemesQuery from "../../../database/hooks/schemes/useGetAllSchemesQuery";
import useGetCurrentSchemeQuery from "../../../database/hooks/schemes/useGetCurrentSchemeQuery";
import TextInputDialog from "../../util/TextInputDialog";
import MenuItem from "./MenuItem";
import useCreateAndSelectSchemeMutation from "../../../database/hooks/schemes/useCreateAndSelectSchemeMutation";
import ConfirmationDialog from "../../util/ConfirmationDialog";

const DropdownMenu = () => {
  const currentSchemeQuery = useGetCurrentSchemeQuery();
  const allSchemesQuery = useGetAllSchemesQuery();
  const createAndSelectSchemeMutation = useCreateAndSelectSchemeMutation();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dataForDeleting, setDataForDeleting] = useState({});
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [dataForRenaming, setDataForRenaming] = useState({});
  const [showNewSchemeDialog, setShowNewSchemeDialog] = useState(false);

  function addNewPalette(schemeName) {
    createAndSelectSchemeMutation.mutate(schemeName);
  }

  /*
  A callback function for Menu Items.  It is used to pass the necessary data of the scheme required to rename said scheme.
  (Callback function is necessary for the same reasons stated in onDeleteScheme())
  */
  function onRenameScheme(variables) {
    setDataForRenaming(variables);
    setShowRenameDialog(true);
  }

  /*
  A callback function for Menu Items.  It is used to pass the necessary data of the scheme required to delete said scheme.
  The delete confirmation component is required to stay within the Menu component, but outside of MenuItems component.
  Otherwise, the confirmation component is never shown since it is a child of MenuItems and the menu is closed when a Menu Item is clicked (i.e. clicking on the button to delete the scheme)
  */
  function onDeleteScheme(variables) {
    setDataForDeleting(variables);
    setShowDeleteDialog(true);
  }

  function listSchemes() {
    const schemesList = [];

    for (const [docId, scheme] of allSchemesQuery.data) {
      schemesList.push(
        <MenuItem
          key={docId}
          id={docId}
          name={scheme.name}
          onRename={onRenameScheme}
          onDelete={onDeleteScheme}
        />
      );
    }

    return schemesList;
  }

  return (
    <Menu as="div" className="relative">
      <div className="flex items-center">
        <Menu.Button
          className={
            "mx-1 rounded-sm border border-ui-700 bg-gray-50 p-1  text-ui-700 hover:border-ui-700 hover:bg-ui-700 hover:text-gray-50 ui-open:border-ui-700 ui-open:bg-ui-700 ui-open:text-gray-50"
          }
        >
          <Bars3Icon className="h-6" />
        </Menu.Button>
        {currentSchemeQuery.isLoading ||
        currentSchemeQuery.isStale ||
        currentSchemeQuery.isError ? null : (
          <div className="mr-2 font-bold text-brand-300">
            {currentSchemeQuery.data.name}
          </div>
        )}
      </div>
      <Menu.Items className="absolute left-0 z-50 mt-1 h-screen w-screen gap-3 overflow-auto bg-ui-700 px-4 pt-4 pb-14  backdrop-blur-3xl sm:mt-2 sm:h-fit sm:w-fit sm:rounded-md sm:border sm:pb-4">
        {allSchemesQuery.isLoading ? <span>loading...</span> : listSchemes()}
        <Menu.Item
          as="button"
          onClick={() => setShowNewSchemeDialog((modalIsOpen) => !modalIsOpen)}
          className="mt-10 flex w-full transform items-center justify-center gap-2 border border-green-300 p-1  text-base font-semibold text-green-300 transition ui-active:-translate-y-0.5 ui-active:cursor-pointer ui-active:border-gray-100 ui-active:bg-green-500 ui-active:text-gray-100"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span>New Scheme</span>
        </Menu.Item>
      </Menu.Items>

      {showDeleteDialog && (
        <ConfirmationDialog
          isOpen={showDeleteDialog}
          setIsOpen={setShowDeleteDialog}
          dialogTitle={dataForDeleting.dialogTitle}
          onConfirm={dataForDeleting.deleteScheme}
        />
      )}
      {showRenameDialog && (
        <TextInputDialog
          isOpen={showRenameDialog}
          setIsOpen={setShowRenameDialog}
          dialogTitle="Rename Scheme"
          originalName={dataForRenaming.originalName}
          onConfirm={dataForRenaming.renameScheme}
        />
      )}
      {showNewSchemeDialog && (
        <TextInputDialog
          isOpen={showNewSchemeDialog}
          setIsOpen={setShowNewSchemeDialog}
          dialogTitle="New Scheme"
          originalName="anon scheme"
          onConfirm={addNewPalette}
        />
      )}
    </Menu>
  );
};

export default DropdownMenu;
