import { Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

export const PrivateRoutes = () => {
    const [auth, setAuth] = useState(null)
    useEffect(() => {
        const authToken = localStorage.getItem('token')
        console.log(authToken)
        setAuth(authToken)
    }, [auth])
return (
    auth ? <Outlet/> : <Navigate to='/login'/>
  )
}