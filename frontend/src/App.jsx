import {Login} from './pages/Login'
import { PrivateRoutes } from './components/PrivateRoutes';
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Logout } from './pages/Logout';

function App() {
  return (
    <div className="flex justify-center items-stretch w-screen h-screen">
      <div className="max-w-[800px] w-screen h-full overflow-hidden">
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<Home/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path="*" element={<p>404! <br /> Kourachu chor edukkatte</p>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
