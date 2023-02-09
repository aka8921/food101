import {Header} from '../components/Header'
export const Orders = () => {
    const orders = [
        {
            items:[
                {
                    item: {
                        _id: "1234",
                        name: "Veg Biriyani",
                        price: "$50.00",
                        img: "https://www.indianveggiedelight.com/wp-content/uploads/2020/04/veg-biryani-instant-pot.jpg"
                    },
                    quantity: 1
                },
                {
                    item: {
                        _id: "1234",
                        name: "Samosa",
                        price: "$50.00",
                        img: "https://www.indianveggiedelight.com/wp-content/uploads/2020/04/veg-biryani-instant-pot.jpg"
                    },
                    quantity: 3
                },
                {
                    item: {
                        _id: "1234",
                        name: "Meals",
                        price: "$50.00",
                        img: "https://www.indianveggiedelight.com/wp-content/uploads/2020/04/veg-biryani-instant-pot.jpg"
                    },
                    quantity: 1
                }
            ],
            total: 500
        },
        {
            items:[
                {
                    item: {
                        _id: "1234",
                        name: "Samosa",
                        price: "$50.00",
                        img: "https://www.indianveggiedelight.com/wp-content/uploads/2020/04/veg-biryani-instant-pot.jpg"
                    },
                    quantity: 3
                },
                {
                    item: {
                        _id: "1234",
                        name: "Meals",
                        price: "$50.00",
                        img: "https://www.indianveggiedelight.com/wp-content/uploads/2020/04/veg-biryani-instant-pot.jpg"
                    },
                    quantity: 1
                }
            ],
            total: 140
        },
        {
            items:[
                {
                    item: {
                        _id: "1234",
                        name: "Veg Biriyani",
                        price: "$50.00",
                        img: "https://www.indianveggiedelight.com/wp-content/uploads/2020/04/veg-biryani-instant-pot.jpg"
                    },
                    quantity: 2
                },
            ],
            total: 100
        }
    ]

    const orderList = orders.map((order, key) => {
        const orderItems = order.items.map((dish, key) => {
            return(
                <div className="text-xs text-slate-500" key={key}>{dish.item.name} {dish.quantity > 1 ? `(${dish.quantity})`: ""}</div>
            )
        })
        return(
            <div className="flex justify-between items-center px-6 py-2 odd:bg-gray-100" key={key}>
                        <div className="flex flex-col items-start gap-1">
                            {orderItems}
                        </div>
                        <div className='flex gap-1'>
                             <div className="text-green-500 font-bold">₹{order.total}</div>
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