import { Link } from "react-router-dom"

export const MainHeader = ({name}) => {
    return (
    <div className="flex justify-between items-end my-4">
        <div className="flex flex-col">
            <div className="text-md text-slate-500 font-light opacity-50">Welcome Back !</div>
            <div className="text-3xl font-bold">{name || "User"}</div>
        </div>
        <Link to="/recharge">
            <div className="bg-blue-100 px-3 py-1 rounded-full font-semibold cursor-pointer text-sm text-blue-600 mb-1">
                Recharge
            </div>
        </Link>
    </div>
    )
}