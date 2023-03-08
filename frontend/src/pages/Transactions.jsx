import {Header} from '../components/Header'
import { useState, useEffect } from 'react'
export const Transactions = () => {
    // const transactions = [
    //     {
    //         date: "09/07/2023",
    //         amount: -50
    //     },
    //     {
    //         date: "09/07/2023",
    //         amount: 500
    //     },
    //     {
    //         date: "09/07/2023",
    //         amount: -30
    //     },
    //     {
    //         date: "09/07/2023",
    //         amount: -100
    //     },
    //     {
    //         date: "09/07/2023",
    //         amount: 1000
    //     },
    //     {
    //         date: "09/07/2023",
    //         amount: -40
    //     },
    //     {
    //         date: "10/07/2023",
    //         amount: -10
    //     }
    // ]

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetchTransactions()
    }, [])

    const transactionMethodTransformer = {
      "meal-card" : "MealCard",
      "cash": "Cash"
    }

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
        console.log("fuction: fetchUserDetails")
        console.log("token: ", jwt_token)
  
        fetch('http://localhost:3000/api/transaction', {
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
            setTransactions(data)
          })
          .catch(error => {
            console.error('There was an error:', error);
          });
    }

    const transactionsList = transactions.slice(0).reverse().map((transaction, i) => {
        const color = transaction.transactionAmount > 0 ? "text-green-600" : "text-red-600";
        return (
            <div className="flex items-center justify-between odd:bg-gray-100 px-6 py-1" key={i}>
              <div className="flex-flex-col items-start justify-center">
                <div className="text-[10px] text-slate-500">{transactionMethodTransformer[transaction.transactionMethod] || "--"}</div>
                <div className="text-md text-slate-500">{formatDate(transaction.createdAt)}</div>
              </div>
                
                <div className={`text-lg font-regular text-green ${color}`}>{(transaction.transactionAmount > 0 ? "+" : "")+transaction.transactionAmount} ₹</div>
            </div>)
    })
    return(
        <div className="flex flex-col py-5 px-6 overflow-auto h-screen">
                <Header title="Transactions"/>
                <div className="flex flex-col mt-5 -mx-6">
                    {transactionsList}
                </div>
        </div>
    )
}