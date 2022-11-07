import { useState } from "react";

import SidebarCollapsed from "./SidebarCollapsed";
import SidebarExpanded from "./SidebarExpanded";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return isExpanded ? (
    <SidebarExpanded collapseSidebar={() => setIsExpanded(false)} />
  ) : (
    <SidebarCollapsed expandSidebar={() => setIsExpanded(true)} />
  );
};

export default Sidebar;
