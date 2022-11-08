import useGetCurrentSchemeIdQuery from "../database/useGetCurrentSchemeIdQuery";
import useSelectSchemeMutation from "../database/useSelectScheme";

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
        <li className=" bg-green-900 hover:cursor-pointer" onClick={handleClick}>
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
