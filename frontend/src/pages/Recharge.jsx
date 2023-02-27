import { useState } from 'react'
import {Header} from '../components/Header'
import { GradientButton } from '../components/GradientButton'
import Arrow from '../assets/arrow.svg'
import { useNavigate } from "react-router-dom";
export const Recharge = () => {
    const navigate = useNavigate();
    const [rechargeAmount, setRechargeAmount] = useState(0)

    const rechargeMealCard = ()=>{
        const jwt_token = localStorage.getItem('token')
        fetch('http://localhost:3000/api/recharge', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwt_token}`,
            },
            body: JSON.stringify({
              rechargeAmount: Number(rechargeAmount)
            })
          })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              navigate("/")
            })
            .catch(error => {
              console.error(error);
              alert("Error")
            });
    }

    return(
        <div className="flex flex-col py-5 px-6 overflow-auto h-screen">
                <Header title="Recharge"/>
                <div className="flex flex-col mt-5">
                Enter Recharge Amount: <input type="text" value={rechargeAmount} onChange={e=> setRechargeAmount(e.target.value)}/>
                </div>
                <GradientButton
                    className="mt-auto self-stretch gap-2 text-white flex items-center justify-center"
                    onClick={rechargeMealCard}
                    >
                        <span>Recharge Now</span>
                        <img src={Arrow} alt="Arrow-right" className='w-[15px] mt-[2px]' /> 
                    </GradientButton>
        </div>
    )
}