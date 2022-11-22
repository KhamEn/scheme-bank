import { Menu } from "@headlessui/react";
import useGetCurrentSchemeIdQuery from "../../database/hooks/schemes/useGetCurrentSchemeIdQuery";
import useSelectSchemeMutation from "../../database/hooks/schemes/useSetCurrentSchemeMutation";

const MenuItem = ({ id, name }) => {
  const { data, isLoading } = useGetCurrentSchemeIdQuery();
  const { mutate } = useSelectSchemeMutation();

  function handleClick() {
    mutate(id);
  }

  if (isLoading) {
    return (
      <Menu.Item
        as="div"
        className=" m-2 rounded-sm border border-black bg-white p-1 text-black hover:cursor-pointer hover:bg-black/50 hover:text-white/80"
        onClick={handleClick}
      >
        {name}
      </Menu.Item>
    );
  } else {
    if (data.id === id) {
      return (
        <Menu.Item
          as="div"
          className="m-2 rounded-sm  border border-black bg-black  p-1  text-white hover:cursor-pointer"
          onClick={handleClick}
        >
          {name}
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item
          as="div"
          className=" m-2 rounded-sm  border border-black bg-white p-1 text-black hover:cursor-pointer hover:bg-black/80 hover:text-white/80"
          onClick={handleClick}
        >
          {name}
        </Menu.Item>
      );
    }
  }
};

export default MenuItem;
