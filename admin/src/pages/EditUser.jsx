import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const EditUser = () => {
    const navigate = useNavigate()
    const { id } = useParams();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [mealCard, setMealCard] = useState(0)
    const [role, setRole] = useState("day-scholar")

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
        setRole(data.user.userType || "")
      })
      .catch(error => {
        console.error('There was an error:', error);
      });
    }

    const handleEditUser = async () => {
      const jwt_token = localStorage.getItem('token')
      const userObject = {
        newUsername: username,
        firstName,
        lastName,
        mealCard,
        userType: role,
        password,
      }

      console.log(userObject)

      const response = await fetch(`http://localhost:3000/api/admin/user/edit/${id}`, {
            method: 'PUT',
            headers: {
            'Authorization': `Bearer ${jwt_token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
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
              <div className='flex gap-2'><h3 className="text-[30px] font-semibold leading-6 text-gray-900">Edit User</h3> <div className='flex py-2 items-center text-sm text-gray-400 hover:text-gray-900 cursor-pointer justify-center gap-2'>@{id}</div></div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                The user might need to log-in again if there is any changes in username / password
              </p>
            </div>

            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  First name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    value={firstName}
                    onChange = {(e) => {
                      setFirstName(e.target.value)
                    }}
                    className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Last name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    value={lastName}
                    onChange = {(e) => {
                      setLastName(e.target.value)
                    }}
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Username
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                    type="text"
                    value={username}
                    onChange = {(e) => {
                      setUsername(e.target.value)
                    }}
                    name="username"
                    id="username"
                    className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Password
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="password"
                    value={password}
                    onChange = {(e) => {
                      setPassword(e.target.value)
                    }}
                    name="password"
                    id="password"
                    autoComplete="given-name"
                    className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Mealcard Balance
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                    type="text"
                    value={mealCard}
                    onChange = {(e) => {
                      setMealCard(e.target.value)
                    }}
                    name="mealcard"
                    id="mealcard"
                    className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */}
  
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Role
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange = {(e) => {
                      setRole(e.target.value)
                    }}
                    className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="day-scholar">Day Scholar</option>
                    <option value="hosteller">Hosteller</option>
                    <option value="admin">Admin</option>
                    <option value="kitchen-staff">Kitchen Staff</option>
                    <option value="canteen-staff">Canteen Staff</option>
                  </select>
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
              onClick={handleEditUser}
              className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    )
  }
  