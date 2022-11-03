const SidebarCollapsed = ({expandSidebar }) => {
  return (
    <nav
      className={
        "p-2 fixed top-0 left-0 h-screen min-w-max flex flex-col bg-gray-900 text-white shadow-lg"
      }
    >
      <ul>
        <button className=" bg-green-900" onClick={expandSidebar}>
          {">>>"}
        </button>
      </ul>
    </nav>
  );
};

export default SidebarCollapsed;
