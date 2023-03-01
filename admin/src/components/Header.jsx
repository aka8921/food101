import { useNavigate } from "react-router-dom";

export const Header = ({title}) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-start">
            <div className="py-1 rounded-full font-semibold cursor-pointer text-sm text-blue-600"
            onClick={() => navigate(-1)}
            >
                Go Back
            </div>
            <div className="text-3xl font-bold">{title}</div>
        </div>
    )
}