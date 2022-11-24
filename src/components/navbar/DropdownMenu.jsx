import { useState } from "react";
import { Menu } from "@headlessui/react";
import { Bars3Icon, PlusCircleIcon } from "@heroicons/react/24/outline";
import useGetAllSchemesQuery from "../../database/hooks/schemes/useGetAllSchemesQuery";
import useGetCurrentSchemeQuery from "../../database/hooks/schemes/useGetCurrentSchemeQuery";
import ModalDialog from "../util/ModalDialog";
import MenuItem from "./MenuItem";
import useCreateAndSelectSchemeMutation from "../../database/hooks/schemes/useCreateAndSelectSchemeMutation";

const DropdownMenu = () => {
  const { data: currentScheme, isLoading: currentSchemeIsLoading } =
    useGetCurrentSchemeQuery();
  const { data: allSchemes, isLoading: allSchemesIsLoading } =
    useGetAllSchemesQuery();
  const { mutate } = useCreateAndSelectSchemeMutation();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleNewPaletteClick(schemeName) {
    mutate(schemeName);
  }

  function listSchemes() {
    const schemesList = [];

    for (const [docId, scheme] of allSchemes) {
      schemesList.push(<MenuItem key={docId} id={docId} name={scheme.name} />);
    }

    return schemesList;
  }

  return (
    <Menu as="div" className=" w-fit ">
      <div className="flex items-center">
        <Menu.Button
          className={
            "justify-betwee m-2 flex gap-1 rounded-sm border border-gray-900  bg-gray-100 p-1 hover:border-gray-300 hover:bg-gray-300 hover:text-gray-100 ui-open:border-gray-300 ui-open:bg-gray-300 ui-open:text-gray-100  "
          }
        >
          <Bars3Icon className="h-6 w-6 " />
        </Menu.Button>
        {!currentSchemeIsLoading && (
          <div className="mr-2 font-bold">{currentScheme.name}</div>
        )}
      </div>
      <Menu.Items className="ml-2 rounded-sm bg-gray-300 pt-1">
        {!allSchemesIsLoading && listSchemes()}
        <Menu.Item
          as="div"
          onClick={() => setModalIsOpen((modalIsOpen) => !modalIsOpen)}
          className="mt-3 flex w-full transform items-center justify-center gap-2 border-t border-gray-900 p-[2px] text-base font-semibold text-gray-900 transition hover:scale-105 hover:cursor-pointer hover:border hover:border-gray-100 hover:bg-green-900 hover:text-gray-100"
        >
          <PlusCircleIcon className="h-6 w-6" />
          <span>New Scheme</span>
        </Menu.Item>
      </Menu.Items>
      <ModalDialog
        onConfirm={handleNewPaletteClick}
        originalName="anon scheme"
        dialogTitle="New Palette"
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
      />
    </Menu>
  );
};

export default DropdownMenu;
