export const MealCard = () => {
    return (
        <div className="relative flex items-center justify-center">
            <div 
            style={{background: "linear-gradient(252.22deg, #E09EFF 0%, #385CDE 99.1%)"}} 
            className="z-20 my-4 px-5 py-5 text-white relative w-full min-h-[200px] rounded-2xl flex flex-col items-start justify-between overflow-hidden" 
            >
                <div className="absolute right-[-25px] top-[-25px] w-[180px] h-[180px] overflow-hidden rounded-full">
                    <img 
                    className="object-cover w-full h-full" 
                    src="https://images.unsplash.com/photo-1482361046637-0226fdcfa3b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                    alt="" 
                    />
                </div>
                <div className="flex flex-col items-start justify-between">
                    <div className="text-md font-light">Balance</div>
                    <div className="text-2xl font-semibold">₹5,403</div>
                </div>
                <div className="text-[30px]"
                style={{fontFamily: "'Teko', sans-serif"}}
                >
                # 125 - 678 - 889
                </div>
            </div>
            <div
            style={{background: "linear-gradient(252.22deg, #E09EFF 0%, #385CDE 99.1%)"}} 
            className="z-1 opacity-40 absolute  bottom-[-8px] my-4 px-5 py-5 text-white w-[90%] h-[200px] rounded-2xl flex flex-col items-start justify-between overflow-hidden" 
            ></div>
            <div
            style={{background: "linear-gradient(252.22deg, #E09EFF 0%, #385CDE 99.1%)"}} 
            className="z-10 opacity-10 absolute  bottom-[-15px] my-4 px-5 py-5 text-white w-[80%] h-[200px] rounded-2xl flex flex-col items-start justify-between overflow-hidden" 
            ></div>
        </div>

    )
}