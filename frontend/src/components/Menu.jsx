export const Menu = () => {
    const menu = [
        {
            _id: "1234",
            name: "Veg Biriyani",
            price: "$50.00",
            img: "https://www.indianveggiedelight.com/wp-content/uploads/2020/04/veg-biryani-instant-pot.jpg"
        },
        {
            _id: "1432",
            name: "Samosa",
            price: "$30.00",
            img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe.jpg"
        }
    ]

    const handleCart = (id) => {
        alert(`Adding ${id} to Cart`)
    }


    const menuItems = menu.map ((item, i) => {
        return(
            <div className="flex flex-col items-center" key={i}>
                <div className="flex flex-col items-center relative">
                    <div className="bg-red-300 w-[70px] relative h-[70px] rounded-full overflow-hidden">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="px-3 flex justify-between py-1 rounded-full bg-white mt-[-10px] relative z-50 font-semibold cursor-pointer text-[10px] shadow-lg mb-1"
                    >
                        <div className="">+</div>
                        <div className="">0</div>
                        <div className="">-</div>
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
        <div className="font-bold text-lg mb-3">Recent Bookings</div>
        <div className="flex gap-5">
        {menuItems}
        </div>
    </div>
    )
}