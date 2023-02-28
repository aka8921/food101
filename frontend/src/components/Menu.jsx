import plus from "../assets/plus.svg"
import minus from "../assets/minus.svg"
import { useEffect, useState } from "react"

export const Menu = ({addToCart, removeFromCart}) => {

    const [menu, setMenu] = useState([])

    const fetchMenuItems = () => {
        const jwt_token = localStorage.getItem('token')
        console.log("fuction: fetchUserDetails")

        fetch('http://localhost:3000/api/menu', {
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
            setMenu(data)
          })
          .catch(error => {
            console.error('There was an error:', error);
          });
    }

    useEffect(()=> {
        fetchMenuItems()
        console.log("useEffect Menu")
    }, [])

    const getItemQuantityFromCart = (id) => {
        const itemIndex = cart.items.findIndex((x) => x.item === id);
        if (itemIndex >= 0){
            return cart.items[itemIndex].quantity
        }
        return 12
    }


    const menuItems = menu.map ((item, i) => {
        return(
            <div className="flex flex-col items-center shrink-0" key={i}>
                <div className="flex flex-col items-center relative">
                    <div className="bg-red-300 w-[70px] relative h-[70px] rounded-full overflow-hidden">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="w-[80px] overflow-hidden h-[25px] flex justify-between items-center rounded-full bg-white mt-[-10px] relative z-50 font-semibold cursor-pointer text-[10px] shadow-lg mb-1"
                    >
                        <div 
                        className="flex items-center self-stretch w-[25px] justify-center"
                        onClick={() => {removeFromCart(item)}}
                        >
                            <img src={minus} alt="" className="w-[12px]" />
                        </div>
                        <div className="">{0}</div>
                        <div 
                        className="flex items-center self-stretch w-[25px] justify-center"
                        onClick={() => {addToCart(item)}}
                        >
                            <img src={plus} alt="" className="w-[12px]" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-md font-medium">{item.name} {item.count > 1 ? `(${item.count})`:""}</div>
                    <div className="text-[13px] opacity-50">{item.price}</div>
                </div>
        </div>
        )
    })
    return (
    <div className="flex flex-col my-2">
        <div className="font-bold text-lg mb-3">Today's Menu</div>
        <div className="flex gap-5 overflow-auto -mx-6 px-6 no-scrollbar">
        {menuItems}
        </div>
    </div>
    )
}