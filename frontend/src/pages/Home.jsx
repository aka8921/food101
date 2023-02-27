import { useNavigate, Link } from "react-router-dom";
import { MainHeader } from "../components/MainHeader";
import { MealCard } from "../components/MealCard";
import { Menu } from "../components/Menu";
import { BottomNav } from "../components/BottomNav";
import { RecentBookings } from "../components/RecentBookings";
import { useEffect, useState } from "react";


export const Home = () => {
    const [userDetails, setUserDetails] = useState({})
    const fetchUserDetails = () => {
        const jwt_token = localStorage.getItem('token')
        console.log("fuction: fetchUserDetails")
        console.log("token: ", jwt_token)

        fetch('http://localhost:3000/api/user', {
            headers: {
              'Authorization': `Bearer ${jwt_token}`,
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then(data => {
            console.log(data);
            setUserDetails(data.user)
          })
          .catch(error => {
            console.error('There was an error:', error);
          });
    }
    useEffect(()=> {
        fetchUserDetails()
    }, [])
    return(
        <div className="flex flex-col py-5 px-6 overflow-auto h-screen">
            <MainHeader name={userDetails.firstName+" "+userDetails.lastName}/>
            <MealCard balance={userDetails.mealCard}/>
            <RecentBookings />
            <Menu />
            <BottomNav />
        </div>
    )
}