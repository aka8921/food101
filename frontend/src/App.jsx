import {Login} from './pages/Login'
import { PrivateRoutes } from './components/PrivateRoutes';
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="flex justify-center items-stretch w-screen h-screen">
      <div className="max-w-[800px] w-screen h-full overflow-hidden">
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<Home/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
