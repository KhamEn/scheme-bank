import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const SidebarCollapsed = ({ expandSidebar }) => {
  return (
    <nav className={"p-2 h-screen bg-gray-500/25 "}>
      <ul>
        <button onClick={expandSidebar}>
          <ArrowRightOnRectangleIcon className=" h-6 w-6 " />
        </button>
      </ul>
    </nav>
  );
};

export default SidebarCollapsed;
