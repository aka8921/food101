import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import jwt_decode from "jwt-decode";
  
 export const Orders = () => {
  const token = localStorage.getItem('token')
  const decodedToken = jwt_decode(token);
  const [orders, setOrders] = useState([])


  useEffect(() => {
    fetchOrders()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Add 1 because getMonth() returns a zero-based index
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year.toString().slice(-2)}`;
    return(formattedDate); // Output: 28/2/23
}

  const fetchOrders = () => {
    const jwt_token = localStorage.getItem('token')
    console.log("fuction: fetchOrders")
    console.log("token: ", jwt_token)

    fetch('http://localhost:3000/api/admin/orders', {
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
        setOrders(data.orders)
      })
      .catch(error => {
        console.error('There was an error:', error);
      });
}

const approveOrder = (orderId, method) => {
  const jwt_token = localStorage.getItem('token')
  fetch(`http://localhost:3000/api/admin/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${jwt_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      method: method
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(`Order ${orderId} Approved by ${method}`);
      fetchOrders()
    })
    .catch(error => {
      console.log(error);
      alert(`Failed to approve order ${orderId}`);
    });
}

const cancelOrder = (orderId) => {
  const jwt_token = localStorage.getItem('token')
  fetch(`http://localhost:3000/api/admin/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${jwt_token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      console.log(`Order ${orderId} cancelled`);
      fetchOrders()      
    })
    .catch(error => {
      console.log(error);
      alert(`Failed to cancel order ${orderId}`);
    });
}



    return (
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Orders</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the pending orders. You can approve or delete them accordingly
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link to={"/users/add"}>
            {/* <button
              type="button"
              className="block rounded-md bg-red-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() => {deleteAll()}}
            >
              Delete All Orders
            </button> */}
            </Link>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Username
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Items
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Total
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Method
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {orders.slice(0).reverse().map((order) => (
                      <tr key={order._id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        @{order.username}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {
                          order.items.map((dish, key) => {
                            return(
                                <div className="text-xs text-slate-500" key={key}>{dish.name} {dish.quantity > 1 ? `(${dish.quantity})`: ""}</div>
                            )
                        })
                        }
                        </td>
                        
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${order.status == "cancelled" ? "text-red-600" : ""} ${order.status == "pending" ? "text-yellow-400" : ""} ${order.status == "approved" ? "text-green-600" : ""}`}>{order.total} ₹</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.status || "Unknown"}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.method || "Unknown"}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          
                          {order.status === "pending" && <div onClick={() => {approveOrder(order._id, "meal-card")}}>
                            <div className="cursor-pointer text-green-600 hover:text-green-900">
                              Card
                            </div>
                          </div>}

                          {order.status === "pending" && <div onClick={() => {approveOrder(order._id, "cash")}}>
                            <div className="cursor-pointer text-green-600 hover:text-green-900">
                              Cash
                            </div>
                          </div>}
                          {order.status === "pending"&& <div onClick={() => {cancelOrder(order._id)}} className=" cursor-pointer text-red-600 hover:text-red-900">
                            Cancel
                          </div>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  