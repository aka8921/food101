import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const RechargeUser = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [mealCard, setMealCard] = useState(0)
    const [role, setRole] = useState("day-scholar")

    const [rechargeAmount, setRechargeAmount] = useState("")

    useEffect(()=> {
      fetchUser()
    }, [])

    const fetchUser = async () => {
      const jwt_token = localStorage.getItem('token')
      console.log("fuction: fetchUser")
    
      const body ={username: id}
    
      fetch('http://localhost:3000/api/admin/user', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(res => {
        console.log("res")
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setFirstName(data.user.firstName || "")
        setLastName(data.user.lastName || "")
        setUsername(data.user.username || "")
        setMealCard(data.user.mealCard || 0)
        setRole(data.user.userType || "")
      })
      .catch(error => {
        console.error('There was an error:', error);
      });
    }

    const handleRechargeMealCard = async () => {
      const jwt_token = localStorage.getItem('token')
      const body = {
        rechargeAmount,
        transactionMethod: "meal-card"
      }

      const response = await fetch(`http://localhost:3000/api/admin/user/recharge/${id}`, {
            method: 'PUT',
            headers: {
            'Authorization': `Bearer ${jwt_token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const content = await response.json();

        if(content.status === "ok"){
            navigate(-1)
        }
    }

    return (
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div className='flex flex-col items-start gap-2'>
                <div onClick={() => {navigate(-1)}} className="flex py-2 items-center text-sm text-gray-400 hover:text-gray-900 cursor-pointer justify-center gap-2"><div className="w-4"><ArrowLeftIcon /></div> Go Back</div>                
              <div className='flex gap-2'><h3 className="text-[30px] font-semibold leading-6 text-gray-900">Recharge MealCard</h3> <div className='flex py-2 items-center text-sm text-gray-400 hover:text-gray-900 cursor-pointer justify-center gap-2'>@{id}</div></div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Current MealCard balance of <span className="font-bold">{firstName} {lastName} </span> : <span className="font-bold">₹{mealCard}</span> 
              </p>
            </div>

            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Recharge Amount
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    value={rechargeAmount}
                    onChange = {(e) => {
                      setRechargeAmount(e.target.value)
                    }}
                    className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
  
        <div className="pt-5">
          <div className="flex justify-end gap-x-3">
            <button
              type="button"
              className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => {navigate(-1)}}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRechargeMealCard}
              className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Recharge Now!
            </button>
          </div>
        </div>
      </div>
    )
  }
  