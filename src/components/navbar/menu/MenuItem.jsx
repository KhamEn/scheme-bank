import { Menu } from "@headlessui/react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import useDeleteSchemeMutation from "../../../database/hooks/schemes/useDeleteSchemeMutation";
import useGetCurrentSchemeIdQuery from "../../../database/hooks/schemes/useGetCurrentSchemeIdQuery";
import useRenameSchemeMutation from "../../../database/hooks/schemes/useRenameSchemeMutation";
import useSelectSchemeMutation from "../../../database/hooks/schemes/useSetCurrentSchemeMutation";

const MenuItem = ({ id, name, onRename, onDelete }) => {
  const currentSchemeIdQuery = useGetCurrentSchemeIdQuery();
  const selectSchemeMutation = useSelectSchemeMutation();
  const renameSchemeMutation = useRenameSchemeMutation();
  const deleteSchemeMutation = useDeleteSchemeMutation();

  function handleRenameClick() {
    const variables = {
      originalName: name,
      renameScheme: (newName) => {
        renameSchemeMutation.mutate({
          schemeId: id,
          newName: newName,
        });
      },
    };
    onRename(variables);
  }

  function handleDeleteClick() {
    const variables = {
      dialogTitle: `Delete "${name}"?`,
      deleteScheme: () => {
        deleteSchemeMutation.mutate({ id: id });
      },
    };
    onDelete(variables);
  }

  function selectScheme() {
    selectSchemeMutation.mutate(id);
  }

  if (currentSchemeIdQuery.isLoading || currentSchemeIdQuery.data !== id) {
    return (
      <div className="flex gap-1 p-1">
        <Menu.Item
          as="button"
          onClick={selectScheme}
          className="h-full w-full transform rounded-sm border border-gray-900 bg-gray-100 p-1 text-gray-900 transition ui-active:-translate-y-0.5 ui-active:cursor-pointer ui-active:bg-gray-900 ui-active:text-gray-100"
        >
          {name}
        </Menu.Item>
        <Menu.Item
          as="button"
          onClick={handleRenameClick}
          className="transform rounded-sm border border-gray-500 p-1 text-gray-500 transition ui-active:-translate-y-0.5 ui-active:border-blue-500 ui-active:bg-blue-500 ui-active:text-gray-100"
        >
          <PencilSquareIcon className="h-4 w-4" />
        </Menu.Item>
        <Menu.Item
          as="button"
          onClick={handleDeleteClick}
          className="transform rounded-sm border border-gray-500 p-1 text-gray-500 transition ui-active:-translate-y-0.5 ui-active:border-red-500 ui-active:bg-red-500 ui-active:text-gray-100"
        >
          <TrashIcon className="h-4 w-4" />
        </Menu.Item>
      </div>
    );
  } else {
    return (
      <Menu.Item as="button" className="flex items-center gap-1 p-1">
        <span
          className="w-full transform rounded-sm border border-gray-900  bg-gray-900 p-1 text-gray-100 transition ui-active:-translate-y-0.5 ui-active:cursor-pointer "
          onClick={selectScheme}
        >
          {name}
        </span>
      </Menu.Item>
    );
  }
};

export default MenuItem;
