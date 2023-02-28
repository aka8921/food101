import { useNavigate, Link } from "react-router-dom";
import { MainHeader } from "../components/MainHeader";
import { MealCard } from "../components/MealCard";
import { Menu } from "../components/Menu";
import { BottomNav } from "../components/BottomNav";
import { RecentBookings } from "../components/RecentBookings";
import { useEffect, useState } from "react";
import { GradientButton } from "../components/GradientButton";
import Arrow from '../assets/arrow.svg'


export const Home = () => {
    const [userDetails, setUserDetails] = useState({})
    const [cart, setCart] = useState({
      items:[],
      total: 0
    })
    const[test, setTest] = useState(0)

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
      // item number updates for some reason
      let testTemp = test
      testTemp++
      setTest(testTemp)
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
              // item number updates for some reason
      let testTemp = test
      testTemp++
      setTest(testTemp)
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

    const getItemQuantity = (id) => {
      console.log("getItemQuantity")
      const itemIndex = cart.items.findIndex((x) => x.item === id);
      if(itemIndex > -1)
      {
        const qty = cart.items[itemIndex].quantity
        return qty
      }
      return 0
    }

    const checkoutOrder = () => {
      const emptyCart = {
        items:[],
        total: 0
      }

      setCart(emptyCart)
    }

    useEffect(()=> {
        fetchUserDetails()
    }, [])

    return(
        <div className="flex flex-col py-5 px-6 overflow-auto h-screen">
            <MainHeader name={userDetails.firstName+" "+userDetails.lastName}/>
            <MealCard balance={userDetails.mealCard}/>
            <RecentBookings />
            <Menu addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} getItemQuantity={getItemQuantity}/>
            <BottomNav />

            {
              cart.items.length > 0 && 
              <GradientButton
              className="mt-auto self-stretch gap-2 text-white flex items-center justify-center"
              onClick={checkoutOrder}
              >
                  <span>Place Order</span>
                  <img src={Arrow} alt="Arrow-right" className='w-[15px] mt-[2px]' /> 
            </GradientButton>  
            }
            
        </div>
    )
}