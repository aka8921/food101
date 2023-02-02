import { useNavigate, Link } from "react-router-dom";
import { MainHeader } from "../components/MainHeader";
import { MealCard } from "../components/MealCard";
import { Menu } from "../components/Menu";
import { PreviousOrders } from "../components/PreviousOrders";
import { RecentBookings } from "../components/RecentBookings";


export const Home = () => {
    return(
        <div className="flex flex-col p-5">
            <MainHeader />
            {/* <MealCard />
            <RecentBookings />
            <Menu />
            <PreviousOrders /> */}
        </div>
    )
}