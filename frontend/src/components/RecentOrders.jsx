export const RecentOrders = ({orders, fetchOrders}) => {
    const now = new Date();
    const hours = now.getHours();
    const shouldRender = hours >= 0 && hours < 11;

    const handleDelete = async (id) => {
            const jwt_token = localStorage.getItem('token')
            console.log("fuction: fetchUserDetails")
            console.log("token: ", jwt_token)

            const body ={orderId: id}
      
            const response = await fetch('http://localhost:3000/api/order', {
                  method: 'DELETE',
                  headers: {
                  'Authorization': `Bearer ${jwt_token}`,
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body)
              });
              const content = await response.json();
      
              if(content.status === "ok"){
                  fetchOrders()
              }
              else{
                  alert(`Error: ${content.message}`)
              }
    }


    const bookingItems = orders.map ((order, i) => {
        const orderedItems = order.items.map((item, j) => {
            return(
                <div className="flex flex-col" key={j}>
                    <div className="text-sm font-regular text-gray-800">{item.name} {item.quantity > 1 ? `(${item.quantity})`:""}</div>
                    {/* <div className="text-[13px] opacity-50">{item.price}</div> */}
                </div>
            )
        })

        return(
            <div className="flex items-center" key={i}>
                {/* <div className="bg-red-300 w-[50px] h-[50px] rounded-full mr-2 overflow-hidden relative">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover"/>
                </div> */}
                <div className="flex-col">
                   {orderedItems} 
                </div>
                
                {shouldRender && <div className="ml-auto bg-red-100 px-3 py-1 rounded-full font-semibold cursor-pointer text-sm text-red-600 mb-1"
                onClick={() => handleDelete(order._id)}
                >
                    Delete
                </div>}
            </div>
        )
    })
    return (
    <div className="flex flex-col my-2">
        <div className="font-bold text-lg mb-3">Pending Orders</div>
        <div className="flex flex-col gap-5">
        {bookingItems}
        </div>
    </div>
    )
}