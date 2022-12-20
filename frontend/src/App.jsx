import {Login} from './pages/Login'

import { Routes, Route, useRoutes } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);
  return (
    <div className="flex justify-center items-stretch w-screen h-screen">
      <div className="max-w-[800px] w-screen h-full overflow-hidden">
        {routes}
      </div>
    </div>
  )
}

export default App
