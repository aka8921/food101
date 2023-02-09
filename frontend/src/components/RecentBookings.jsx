export const RecentBookings = () => {
    const bookings = [
        {
            _id: "1234",
            name: "Veg Biriyani",
            count: 1,
            price: "$50.00",
            img: "https://www.indianveggiedelight.com/wp-content/uploads/2020/04/veg-biryani-instant-pot.jpg"
        },
        {
            _id: "1432",
            name: "Samosa",
            count: 3,
            price: "$30.00",
            img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe.jpg"
        }
    ]

    const handleCancel = (id) => {
        alert(`cancelling ${id}`)
    }


    const bookingItems = bookings.map ((item, i) => {
        return(
            <div className="flex items-center" key={i}>
                <div className="bg-red-300 w-[50px] h-[50px] rounded-full mr-2 overflow-hidden relative">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover"/>
                </div>
                <div className="flex flex-col">
                    <div className="text-md font-medium">{item.name} {item.count > 1 ? `(${item.count})`:""}</div>
                    <div className="text-[13px] opacity-50">{item.price}</div>
                </div>
                <div className="ml-auto bg-red-100 px-3 py-1 rounded-full font-semibold cursor-pointer text-sm text-red-600 mb-1"
                onClick={() => handleCancel(item._id)}
                >
                    Cancel
                </div>
        </div>
        )
    })
    return (
    <div className="flex flex-col my-2">
        <div className="font-bold text-lg mb-3">Recent Bookings</div>
        <div className="flex flex-col gap-5">
        {bookingItems}
        </div>
    </div>
    )
}