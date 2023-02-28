import { useNavigate, Link } from "react-router-dom";
import { MainHeader } from "../components/MainHeader";
import { MealCard } from "../components/MealCard";
import { Menu } from "../components/Menu";
import { BottomNav } from "../components/BottomNav";
import { RecentBookings } from "../components/RecentBookings";
import { useEffect, useState } from "react";


export const Home = () => {
    const [userDetails, setUserDetails] = useState({})
    const [cart, setCart] = useState({
      items:[],
      total: 0
    })

    const addToCart = (item) => {
      const newCart = cart
      const newItem = {
        item: item._id,
        quantity: 1,
        name: item.name,
        price: item.price,
      };

      const itemIndex = newCart.items.findIndex((x) => x.item === newItem.item);
      if (itemIndex >= 0) {
        newCart.items[itemIndex].quantity += 1;
      } else {
        newCart.items.push(newItem);
      }
      newCart.total += newItem.quantity * newItem.price;
      setCart(newCart);
      console.log(cart)
    }

    const removeFromCart = (item) => {
      const newCart = cart;
      const itemIndex = newCart.items.findIndex((x) => x.item === item._id);
      if (itemIndex >= 0) {
        const itemPrice = newCart.items[itemIndex].price;
        let tempItemFromCart = newCart.items[itemIndex]
        if(tempItemFromCart.quantity > 1 ) 
        {
          tempItemFromCart.quantity = tempItemFromCart.quantity - 1
          newCart.items.splice(itemIndex, 1, tempItemFromCart);
        }
        else{
          newCart.items.splice(itemIndex, 1);
        }
        newCart.total -= itemPrice;
        setCart(newCart);
        console.log(cart)
      }
    }

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
            // console.log(data);
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
            <Menu addToCart={addToCart} removeFromCart={removeFromCart}/>
            <BottomNav />
        </div>
    )
}