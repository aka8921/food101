import { Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react';

export const PrivateRoutes = () => {
    const [tokenLocal, setTokenLocal] = useState(localStorage.getItem('token'));
return (
    <>
    {tokenLocal ? <Outlet/> : <Navigate to='/login'/>}
    </>
  )
}