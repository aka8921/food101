import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import jwt_decode from "jwt-decode";
  
 export const Transactions = () => {
  const token = localStorage.getItem('token')
  const decodedToken = jwt_decode(token);
  const [transactions, setTransactions] = useState([])


  useEffect(() => {
    fetchTransactions()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Add 1 because getMonth() returns a zero-based index
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year.toString().slice(-2)}`;
    return(formattedDate); // Output: 28/2/23
}

  const fetchTransactions = () => {
    const jwt_token = localStorage.getItem('token')
    console.log("fuction: fetchTransactions")
    console.log("token: ", jwt_token)

    fetch('http://localhost:3000/api/admin/transactions', {
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
        setTransactions(data.transactions)
      })
      .catch(error => {
        console.error('There was an error:', error);
      });
}



    return (
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Transactions</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the Transactions carried on through the platform, both via MealCard and Cash.
            </p>
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
                        Username
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Tag
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Method
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {transactions.slice(0).reverse().map((transaction) => (
                      <tr key={transaction.username}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        @{transaction.username}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(transaction.createdAt)}</td>
                        <td className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${transaction.transactionAmount > 0 ? "text-green-600" : "text-red-600"}`}>{(transaction.transactionAmount > 0 ? "+" : "")+transaction.transactionAmount} ₹</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.tag}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{transaction.transactionMethod}</td>
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
  