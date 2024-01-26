import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Body from "./components/Body";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/browse",
    element: <App />,
    children: [
      {
        path: "/browse/upload",
        element: <Body />,
      },
      {
        path: "/browse/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/browse/*",
        element: <Error />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);
