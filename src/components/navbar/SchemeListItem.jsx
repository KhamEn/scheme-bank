import useGetCurrentSchemeIdQuery from "../../database/hooks/schemes/useGetCurrentSchemeIdQuery";
import useSelectSchemeMutation from "../../database/hooks/schemes/useSetCurrentSchemeMutation";

const SchemeListItem = ({ id, name }) => {
  const { data, isLoading } = useGetCurrentSchemeIdQuery();
  const { mutate } = useSelectSchemeMutation();

  function handleClick() {
    mutate(id);
  }

  if (isLoading) {
    return (
      <li className=" bg-red-900 hover:cursor-pointer" onClick={handleClick}>
        {name}
      </li>
    );
  } else {
    if (data.id === id) {
      return (
        <li
          className=" bg-green-900 hover:cursor-pointer"
          onClick={handleClick}
        >
          {name}
        </li>
      );
    } else {
      return (
        <li className=" bg-red-900 hover:cursor-pointer" onClick={handleClick}>
          {name}
        </li>
      );
    }
  }
};

export default SchemeListItem;
