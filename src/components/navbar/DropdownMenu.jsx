import { Menu } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import useGetAllSchemesQuery from "../../database/hooks/schemes/useGetAllSchemesQuery";
import useGetCurrentSchemeQuery from "../../database/hooks/schemes/useGetCurrentSchemeQuery";

import MenuItem from "./MenuItem";

function DropdownMenu() {
  const { data: currentScheme, isLoading: currentSchemeIsLoading } =
    useGetCurrentSchemeQuery();
  const { data: allSchemes, isLoading: allSchemesIsLoading } =
    useGetAllSchemesQuery();

  function listSchemes() {
    const schemesList = [];

    for (const [docId, scheme] of allSchemes) {
      schemesList.push(<MenuItem key={docId} id={docId} name={scheme.name} />);
    }

    return schemesList;
  }

  return (
    <Menu as="div" className={"w-fit bg-gray-100 pr-2"}>
      <div className="flex items-center">
        <Menu.Button
          className={
            "justify-betwee m-2 flex gap-1 rounded-sm border border-gray-900 bg-gray-100 p-1 hover:bg-gray-900 hover:text-gray-100 ui-open:bg-gray-900 ui-open:text-gray-100 "
          }
        >
          <Bars3Icon className="h-6 w-6 " />
        </Menu.Button>
        {!currentSchemeIsLoading && (
          <div className="font-bold">{currentScheme.name}</div>
        )}
      </div>
      <Menu.Items className={"ml-2 rounded-sm bg-gray-200 p-2"}>
        {!allSchemesIsLoading && listSchemes()}
      </Menu.Items>
    </Menu>
  );
}

export default DropdownMenu;
