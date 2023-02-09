import {Login} from './pages/Login'
import { PrivateRoutes } from './components/PrivateRoutes';
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from './pages/NotFound';
import {Orders} from './pages/Orders'
import { Transactions } from './pages/Transactions';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <div className="flex justify-center items-stretch w-screen h-screen bg-blue-100">
      <div className="max-w-[400px] w-screen h-full bg-white overflow-hidden shadow-lg">
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/transactions' element={<Transactions/>}/>
          </Route>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
