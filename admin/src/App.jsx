import {Login} from './pages/Login'
import { PrivateRoutes } from './components/PrivateRoutes';
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from './pages/NotFound';

function App() {
  return (
        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path='/dashboard/*' element={<Dashboard/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
  )
}

export default App
