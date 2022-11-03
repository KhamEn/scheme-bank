const SidebarExpanded = ({ collapseSidebar }) => {
  return (
    <nav
      className={
        "p-2 fixed top-0 left-0 h-screen min-w-max flex flex-col bg-gray-900 text-white shadow-lg"
      }
    >
      <ul>
        <button className=" bg-red-900" onClick={collapseSidebar}>
          {"<<<<"}
        </button>
        <li>Scheme Uno</li>
        <li>Scheme Dos</li>
        <li>Scheme Three</li>
      </ul>
    </nav>
  );
};

export default SidebarExpanded;
