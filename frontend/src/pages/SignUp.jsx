import { useState } from 'react'
import Logo from '../assets/logo.png'
import { useNavigate, Link } from "react-router-dom";
import {GradientButton} from '../components/GradientButton'

export const SignUp = () => {
    const [userName, setUserName] = useState("test_user")
    const [firstName, setFirstName] = useState("First")
    const [lastName, setLastName] = useState("Last")
    const [password, setPassword] = useState("test_pwd")
    const [isHosteller, setIsHosteller] = useState(false)
    const navigate = useNavigate();

    const handleSignUp = async () => {
        const body = {
            username: userName,
            password,
            firstName,
            lastName,
            userType: isHosteller ? "hosteller" : "day-scholar"
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
        if(content.status === "ok"){
            navigate("/login")
        }
    }

    return(
        <div className="flex flex-col items-center justify-start h-screen gap-[20px]" style={{background: "radial-gradient(114.91% 40.16% at 50% 0%, #4160E0 0%, rgba(179, 141, 246, 0.1) 100%)"}}>
            {/* TOP_SECTION */}
            <div className="self-stretch flex items-center justify-center relative h-[120px]">
                <div className="text-center overflow-hidden absolute top-0">
                <span className='text-white font-black opacity-20 overflow-hidden text-[40vw] leading-[40vw] sm:text-[200px] sm:leading-[200px] text-center'>Food<br/>101</span>
                </div>
                <div className="flex items-center justify-center w-[60px] h-[60px] bg-white/70 rounded-lg backdrop-blur-3xl opac">
                <img src={Logo} alt="Food 101" />
                </div>
            </div>
            {/* FORM_SECTION */}
            <div className="self-stretch flex flex-col gap-4 items-center justify-center relative mx-10 overflow-hidden">
                <h1 className='text-[30px] font-bold'>Sign Up</h1>

                <div className="self-stretch bg-white py-1 px-2 flex flex-col items-start rounded-lg">
                    <span className="text-[10px] text-[#A4A4A4]">Username</span>
                    <input type="text" value={userName} onChange={(e) => {setUserName(e.target.value)}} className='self-stretch outline-none my-1'/>
                </div>

                <div className="self-stretch bg-white py-1 px-2 flex flex-col items-start rounded-lg">
                    <span className="text-[10px] text-[#A4A4A4]">First Name</span>
                    <input type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} className='self-stretch outline-none my-1'/>
                </div>

                <div className="self-stretch bg-white py-1 px-2 flex flex-col items-start rounded-lg">
                    <span className="text-[10px] text-[#A4A4A4]">Last Name</span>
                    <input type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}} className='self-stretch outline-none my-1'/>
                </div>
                <div className="self-stretch bg-white py-1 px-2 flex flex-col items-start rounded-lg">
                    <span className="text-[10px] text-[#A4A4A4]">Password</span>
                    <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}  className='self-stretch outline-none my-1'/>
                </div>
                <label>
                <div className="flex gap-1">
                    <input
                    type="checkbox"
                    checked={isHosteller}
                    onChange={() => {setIsHosteller(!isHosteller)}}
                    />
                    <div>Hosteller</div>
                </div>
                </label>
                <div className="flex text-xs gap-1">
                <div className='text-slate-500'>Already a user?</div>
                <Link to={"/login"} className="font-bold">Sign in</Link>
            </div>
            </div>

                    <GradientButton
                    className="mt-auto self-stretch gap-2 text-white flex items-center justify-center m-5"
                    onClick={handleSignUp}
                    >
                        <span>Sign Up !</span>
                    </GradientButton>   
        </div>
    )
}