import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const AddMenu = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [profit, setProfit] = useState(0)
    const [imageUrl, setImageUrl] = useState("")
  

    const handleAddMenu = async () => {
      const jwt_token = localStorage.getItem('token')
      const menuObject = {
        name,
        price,
        profit,
        imageUrl
      }

      const response = await fetch('http://localhost:3000/api/admin/menu/', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${jwt_token}`,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(menuObject)
        });
        const content = await response.json();

        if(content.status === "ok"){
            navigate(-1)
        }
        else{
          alert("Error")
        }
    }

    return (
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div className='flex flex-col items-start gap-2'>
                <div onClick={() => {navigate(-1)}} className="flex py-2 items-center text-sm text-gray-400 hover:text-gray-900 cursor-pointer justify-center gap-2"><div className="w-4"><ArrowLeftIcon /></div> Go Back</div>                
              <h3 className="text-[30px] font-semibold leading-6 text-gray-900">Add Menu</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Add a new item to the menu
              </p>
            </div>

            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Name
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange = {(e) => {
                      setName(e.target.value)
                    }}
                    className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Price
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    value={price}
                    onChange = {(e) => {
                      setPrice(e.target.value)
                    }}
                    name="price"
                    id="price"
                    autoComplete="family-name"
                    className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="profit" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  Profit
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                    type="text"
                    value={profit}
                    onChange = {(e) => {
                      setProfit(e.target.value)
                    }}
                    name="profit"
                    id="profit"
                    className="block w-full max-w-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                  ImageUrl
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange = {(e) => {
                      setImageUrl(e.target.value)
                    }}
                    name="image"
                    id="image"
                    autoComplete="given-name"
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
              onClick={handleAddMenu}
              className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )
  }
  