import { Navigate, Outlet } from 'react-router-dom'

export const PrivateRoutes = () => {
    const tokenLocal = localStorage.getItem('token');
return (
    <>
    Token: {tokenLocal ? "true" : "false"}
    {tokenLocal ? <Outlet/> : <Navigate to='/login'/>}
    </>
  )
}