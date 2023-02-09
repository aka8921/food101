import { useNavigate, Link } from "react-router-dom";
import { MainHeader } from "../components/MainHeader";
import { MealCard } from "../components/MealCard";
import { Menu } from "../components/Menu";
import { BottomNav } from "../components/BottomNav";
import { RecentBookings } from "../components/RecentBookings";


export const Home = () => {
    return(
        <div className="flex flex-col py-5 px-6 overflow-auto h-screen">
            <MainHeader />
            <MealCard />
            <RecentBookings />
            <Menu />
            <BottomNav />
        </div>
    )
}