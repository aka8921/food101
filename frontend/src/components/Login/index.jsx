import Logo from '../../assets/logo.png'
import Arrow from '../../assets/arrow.svg'

export const Login = () => {
    return(
        <div className="flex flex-col items-center justify-start h-screen gap-[20px]" style={{background: "radial-gradient(114.91% 40.16% at 50% 0%, #4160E0 0%, rgba(179, 141, 246, 0.1) 100%)"}}>
            <div className="self-stretch flex items-center justify-center relative h-[320px]">
                <div className="text-center overflow-hidden absolute top-0">
                <span className='text-white font-black opacity-20 overflow-hidden text-[40vw] leading-[40vw] sm:text-[200px] sm:leading-[200px] text-center'>Food<br/>101</span>
                </div>
                <div className="flex items-center justify-center w-[150px] h-[150px] bg-white/70 rounded-lg backdrop-blur-3xl opac">
                <img src={Logo} alt="Food 101" />
                </div>
            </div>
            <div className="self-stretch flex flex-col gap-4 items-center justify-center relative mx-10 overflow-hidden">
                <h1 className='text-[50px] font-bold'>Sign In</h1>
                <div className="self-stretch bg-white py-1 px-2 flex flex-col items-start rounded-lg">
                    <span className="text-[10px] text-[#A4A4A4]">Username</span>
                    <input type="text"  className='self-stretch outline-none my-1'/>
                </div>
                <div className="self-stretch bg-white py-1 px-2 flex flex-col items-start rounded-lg">
                    <span className="text-[10px] text-[#A4A4A4]">Password</span>
                    <input type="password"  className='self-stretch outline-none my-1'/>
                </div>
            </div>
            <div 
            style={{background: "linear-gradient(252.22deg, #E09EFF 0%, #385CDE 99.1%)"}} 
            className="mt-auto self-stretch gap-2 bg-blue-500 text-white cursor-pointer hover:opacity-90 rounded-lg flex items-center justify-center py-4 m-5 font-bold">
                <span>Start Dining</span>
                <img src={Arrow} alt="Arrow-right" className='w-[15px] mt-[2px]' />
            </div>
        </div>
    )
}