import {Login} from './pages/Login'
import { PrivateRoutes } from './components/PrivateRoutes';
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";

import { useEffect, useState } from 'react';

function App() {
  const [auth, setAuth] = useState("")

    const setToken = async () => {
        const authToken = await localStorage.getItem('token')
        // console.log("authToken - localStorage ", authToken)
        setAuth(authToken)
    }

    useEffect(() => {
        setToken()
    }, [])
    
  return (
    <div className="flex justify-center items-stretch w-screen h-screen">
      <div className="max-w-[800px] w-screen h-full overflow-hidden">
        <Routes>
          <Route element={<PrivateRoutes token={auth}/>}>
            <Route path='/' element={<Home/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path="*" element={<p>404! <br /> Kourachu chor edukkatte</p>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
