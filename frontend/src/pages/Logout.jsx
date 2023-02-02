import { useNavigate, Link } from "react-router-dom";


export const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = ()=> {
        console.log("Logging you out... ")
        localStorage.clear()
        navigate("/login")
    }
    return(
        <div className="flex items-center justify-center h-screen">        
            <div className="cursor-pointer w-40 flex align-center justify-center rounded-lg py-2 self-center text-white bg-red-300" onClick={handleLogout}>
                Logout
            </div>
        </div>
    )
}