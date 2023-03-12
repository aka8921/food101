import {Header} from '../components/Header'
import { useEffect, useState } from 'react'
export const Orders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = () => {
        const jwt_token = localStorage.getItem('token')
        console.log("fuction: fetchUserDetails")
        console.log("token: ", jwt_token)
  
        fetch('http://localhost:3000/api/order', {
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
            setOrders(data)
            console.log(orders)
          })
          .catch(error => {
            console.error('There was an error:', error);
          });
    }

    const orderList = orders.slice(0).reverse().map((order, key) => {
        const orderItems = order.items.map((dish, key) => {
            return(
                <div className="text-xs text-slate-500" key={key}>{dish.name} {dish.quantity > 1 ? `(${dish.quantity})`: ""}</div>
            )
        })
        return(
            <div className={`flex justify-between items-center px-6 py-2 odd:bg-gray-100 ${order.status != "pending" ? "opacity-50" : ""}`} key={key}>
                        <div className="flex flex-col items-start gap-1">
                        <div className={`text-[10px] font-bold ${order.status == "cancelled" ? "text-red-600" : ""} ${order.status == "pending" ? "text-yellow-400" : ""} ${order.status == "approved" ? "text-green-600" : ""}`}>
                          {order.status}
                        </div>
                            {orderItems}
                        </div>
                        
                        <div className='flex gap-1'>
                             <div className={`font-bold ${order.status == "cancelled" ? "text-red-600" : ""} ${order.status == "pending" ? "text-yellow-400" : ""} ${order.status == "approved" ? "text-green-600" : ""}`}>₹{order.total}</div>
                        </div>
                    </div>
        )
    })
    return(
        <div className="flex flex-col py-5 px-6 overflow-auto h-screen">
                <Header title="Order History"/>
                <div className="flex flex-col mt-5 -mx-6">
                    {orderList}
                </div>
        </div>
    )
}