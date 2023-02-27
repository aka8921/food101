import plus from "../assets/plus.svg"
import minus from "../assets/minus.svg"

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
        },
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
        },
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

    const handleCartAdd = (id) => {
        alert(`Adding ${id} to Cart`)
    }

    const handleCartRemove = (id) => {
        alert(`Removing ${id} to Cart`)
    }


    const menuItems = menu.map ((item, i) => {
        return(
            <div className="flex flex-col items-center shrink-0" key={i}>
                <div className="flex flex-col items-center relative">
                    <div className="bg-red-300 w-[70px] relative h-[70px] rounded-full overflow-hidden">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="w-[80px] overflow-hidden h-[25px] flex justify-between items-center rounded-full bg-white mt-[-10px] relative z-50 font-semibold cursor-pointer text-[10px] shadow-lg mb-1"
                    >
                        <div 
                        className="flex items-center self-stretch w-[25px] justify-center"
                        onClick={() => {handleCartAdd(item._id)}}
                        >
                            <img src={plus} alt="" className="w-[12px]" />
                        </div>
                        <div className="">0</div>
                        <div 
                        className="flex items-center self-stretch w-[25px] justify-center"
                        onClick={() => {handleCartRemove(item._id)}}
                        >
                            <img src={minus} alt="" className="w-[12px]" />
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