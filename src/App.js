import { useEffect } from "react";
import { Provider } from "react-redux";
import { ProSidebarProvider } from "react-pro-sidebar";
import { DirectoryProvider } from "./ContextApi/DirectoryProvider";
import Home from "./Component/Home";
import LoadingDemo from "./Component/Page/loadingDemo";
import store from "./Redux/store";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Provider store={store}> {/* Provide Redux store */}
      <ProSidebarProvider>
        <DirectoryProvider>
          <div className="App">
            <Home />
            <LoadingDemo />
          </div>
        </DirectoryProvider>
      </ProSidebarProvider>
    </Provider>
    
  );
}

export default App;