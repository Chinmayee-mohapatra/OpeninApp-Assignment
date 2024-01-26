import React from "react";
import { Outlet } from "react-router-dom";

import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="w-screen h-screen overflow-y-scroll no-scrollbar sm:overflow-hidden flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/6 md:w-1/5 lg:w-1/4">
        <SideBar />
      </div>
      <div className="w-full sm:w-5/6 md:w-4/5 lg:w-3/4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
