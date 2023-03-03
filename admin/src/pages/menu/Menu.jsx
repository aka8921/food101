import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import jwt_decode from "jwt-decode";
  
 export const Menu = () => {
  const token = localStorage.getItem('token')
  const decodedToken = jwt_decode(token);
  const [menu, setMenu] = useState([])


  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = () => {
    const jwt_token = localStorage.getItem('token')

    fetch('http://localhost:3000/api/menu', {
            headers: {
              'Authorization': `Bearer ${jwt_token}`,
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then(data => {
            setMenu(data)
          })
          .catch(error => {
            console.error('There was an error:', error);
          });
}

const handleDelete = async (id) => {
  const jwt_token = localStorage.getItem('token')

  const body ={itemId: id}

  const response = await fetch('http://localhost:3000/api/admin/menu', {
        method: 'DELETE',
        headers: {
        'Authorization': `Bearer ${jwt_token}`,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const content = await response.json();

    if(content.status === "ok"){
        fetchMenu()
    }
    else{
        alert(`Error: ${content.message}`)
    }
}



    return (
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Menu</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the menu items in the system including their name, price and profit.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link to={"/menu/add"}>
            <button
              type="button"
              className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add New Item
            </button>
            </Link>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Price
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Profit
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {menu.map((item) => (
                      <tr key={item._id}>
                        <td className=" whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <div className='flex items-center justify-start gap-2'>
                            <img src={item.imageUrl} alt={item.name} className="w-[30px] h-[30px] rounded-full"/>
                            {item.name}
                          </div>
                        
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">₹{item.price}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">₹{item.profit}</td>                        
                        <td className="relative flex gap-8 items-center justify-end whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div onClick={() => handleDelete(item._id)} className=" cursor-pointer text-red-600 hover:text-red-900">
                            Delete
                          </div>
                          <Link to={`/menu/${item._id}/edit`}>
                            <div className="text-indigo-600 hover:text-indigo-900">
                              Edit
                            </div>
                          </Link>                        
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  