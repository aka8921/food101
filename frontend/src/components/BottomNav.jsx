import arrow from "../assets/arrowBlack.svg"
import { useNavigate, Link } from "react-router-dom";

export const BottomNav = () => {
    const navigate = useNavigate();
    const handleLogout = ()=> {
        console.log("Logging you out... ")
        localStorage.clear()
        navigate("/login")
    }
    return (
        <div className="flex flex-col items-stretch mt-3 gap-2">
            <Link to={"/orders"}>
                <div className="flex items-center bg-slate-100 hover:bg-slate-200 h-[30px] px-2 rounded-lg">
                    <div className="text-sm">Order History</div>
                    <div className="ml-auto"><img src={arrow} alt="Arrow-right" className='w-[15px] mt-[2px]' /> </div>
                </div>
            </Link>
            
            <Link to={"/recharge"}>
                <div className="flex items-center bg-slate-100 hover:bg-slate-200 h-[30px] px-2 rounded-lg">
                    <div className="text-sm">Recharge History</div>
                    <div className="ml-auto"><img src={arrow} alt="Arrow-right" className='w-[15px] mt-[2px]' /> </div>
                </div>
            </Link>
            
            <div className="flex items-center justify-center cursor-pointer text-white bg-red-400 hover:bg-red-500 h-[30px] px-2 rounded-lg" onClick={handleLogout}>
                <div className="text-sm">Logout</div>
            </div>
            
        </div>
    )
}