import anthass from "../assets/anthass.gif"
import { Link } from "react-router-dom"
export const NotFound = () => {
    return(
        <div className="flex flex-col items-center justify-center h-screen"> 
                <div className="text-xl font-bold mb-3">Wrong Link !</div>   
                <img src={anthass} alt="" className="w-[200px] rounded-lg mb-3"/>
                <Link to={"/"}>
                <div className="bg-blue-100 px-3 py-1 rounded-full font-semibold cursor-pointer text-sm text-blue-600 mb-1">
                    Go Home
                </div>
                </Link>
        </div>
    )
}