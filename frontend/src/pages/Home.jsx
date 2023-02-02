import { useNavigate, Link } from "react-router-dom";


export const Home = () => {
    const navigate = useNavigate();
    const handleLogout = ()=> {
        console.log("Logging you out... ")
        localStorage.clear()
        navigate("/login")
    }
    return(
        <div>
            <div className="cursor-pointer w-40 flex align-center justify-center rounded-lg py-2 self-center text-white bg-red-300" onClick={handleLogout}>
                Logout
            </div>
            Home
            <Link to="/test">Test</Link>
        </div>
    )
}