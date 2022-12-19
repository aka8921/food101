import { useState } from 'react'
import Logo from '../../assets/logo.png'
import Arrow from '../../assets/arrow.svg'

import {GradientButton} from '../GradientButton'

export const Login = () => {
    const [isSignUp, setIsSignUp] = useState(0)
    const [userName, setUserName] = useState("test_user")
    const [password, setPassword] = useState("test_pwd")

    const toggleFormState = () => {
        setIsSignUp(!isSignUp)
    }

    const handleSignIn = async () => {
        const body = {
            userName,
            password
        }

        const response = await fetch('http://localhost:3000/api/sign-in', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const content = await response.json();

        console.log("sign In : ", content)
    }

    const handleSignUp = async () => {
        const body = {
            userName,
            password
        }

        const response = await fetch('http://localhost:3000/api/sign-up', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const content = await response.json();

        console.log("sign Up : ", content)
    }

    return(
        <div className="flex flex-col items-center justify-start h-screen gap-[20px]" style={{background: "radial-gradient(114.91% 40.16% at 50% 0%, #4160E0 0%, rgba(179, 141, 246, 0.1) 100%)"}}>
            {/* TOP_SECTION */}
            <div className="self-stretch flex items-center justify-center relative h-[320px]">
                <div className="text-center overflow-hidden absolute top-0">
                <span className='text-white font-black opacity-20 overflow-hidden text-[40vw] leading-[40vw] sm:text-[200px] sm:leading-[200px] text-center'>Food<br/>101</span>
                </div>
                <div className="flex items-center justify-center w-[150px] h-[150px] bg-white/70 rounded-lg backdrop-blur-3xl opac">
                <img src={Logo} alt="Food 101" />
                </div>
            </div>
            {/* TOGGLES */}
            <div className="relative transition-all transition-all flex bg-[#ECEFFF] w-[200px] h-[30px] cursor-pointer rounded-lg text-md font-medium text-[#405FE0]" onClick={toggleFormState}>
                <div className={`transition-all w-[100px] h-[30px] rounded-lg absolute bg-blue-500 ${isSignUp ? "left-[100px]" : "left-0"}`} style={{background: "linear-gradient(252.22deg, #E09EFF 0%, #385CDE 99.1%)"}} />
                <div className={`w-[100px] flex items-center justify-center z-50 ${isSignUp ? "" : "text-white"}`}>Sign In</div>
                <div className={`w-[100px] flex items-center justify-center z-50 ${isSignUp ? "text-white" : "" }`}>Sign Up</div>
            </div>
            {/* FORM_SECTION */}
            <div className="self-stretch flex flex-col gap-4 items-center justify-center relative mx-10 overflow-hidden">
                <h1 className='text-[30px] font-bold'>{isSignUp ? "Sign Up" : "Sign In"}</h1>
                <div className="self-stretch bg-white py-1 px-2 flex flex-col items-start rounded-lg">
                    <span className="text-[10px] text-[#A4A4A4]">Username</span>
                    <input type="text" value={userName} onChange={(e) => {setUserName(e.target.value)}} className='self-stretch outline-none my-1'/>
                </div>
                <div className="self-stretch bg-white py-1 px-2 flex flex-col items-start rounded-lg">
                    <span className="text-[10px] text-[#A4A4A4]">Password</span>
                    <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}  className='self-stretch outline-none my-1'/>
                </div>
            </div>
            {/* Button */}
            
                {isSignUp ? 
                
                (
                    <GradientButton
                    className="mt-auto self-stretch gap-2 text-white flex items-center justify-center m-5"
                    onClick={handleSignUp}
                    >
                        <span>Sign Up !</span>
                    </GradientButton>   
                    )
                
                : 
                
                (
                    <GradientButton
                    className="mt-auto self-stretch gap-2 text-white flex items-center justify-center m-5"
                    onClick={handleSignIn}
                    >
                        <span>Start Dining</span>
                        <img src={Arrow} alt="Arrow-right" className='w-[15px] mt-[2px]' /> 
                    </GradientButton>   
                )}
                
            
        </div>
    )
}