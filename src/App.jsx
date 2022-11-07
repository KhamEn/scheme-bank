import { enableMapSet } from "immer";
import Sidebar from "./Navbar/Sidebar";

// Immer
enableMapSet()

function App() {
  return (
    <div>
      <Sidebar />
    </div>
  );
}

export default App;
