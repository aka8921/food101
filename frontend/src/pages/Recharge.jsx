import { useState } from 'react'
import {Header} from '../components/Header'
export const Recharge = () => {
    const [rechargeAmount, setRechargeAmount] = useState(0)

    const rechargeMealCard = ()=>{
        alert("Recharging " + rechargeAmount)
    }

    return(
        <div className="flex flex-col py-5 px-6 overflow-auto h-screen">
                <Header title="Recharge"/>
                <div className="flex flex-col mt-5 -mx-6">
                Enter Amount: <input type="text" value={rechargeAmount} onChange={e=> setRechargeAmount(e.target.value)}/>
                </div>
                <button onClick={rechargeMealCard}>Recharge</button>
        </div>
    )
}