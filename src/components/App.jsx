import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Topbar from "./navbar/Topbar";
import SchemePage from "./scheme-page/SchemePage";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <div className="flex flex-row bg-gray-100 text-gray-900">
          <Sidebar />
          <SchemePage />
        </div> */}
        {/* <Sidebar /> */}
        <Topbar />
        <SchemePage />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
