import {Header} from '../components/Header'
export const Transactions = () => {
    const transactions = [
        {
            date: "09/07/2023",
            amount: -50
        },
        {
            date: "09/07/2023",
            amount: 500
        },
        {
            date: "09/07/2023",
            amount: -30
        },
        {
            date: "09/07/2023",
            amount: -100
        },
        {
            date: "09/07/2023",
            amount: 1000
        },
        {
            date: "09/07/2023",
            amount: -40
        },
        {
            date: "10/07/2023",
            amount: -10
        }
    ]

    const transactionsList = transactions.map((transaction, i) => {
        const color = transaction.amount > 0 ? "text-green-600" : "text-red-600";
        return (
            <div className="flex items-center justify-between odd:bg-gray-100 px-6 py-1" key={i}>
                <div className="text-md text-slate-500">{transaction.date}</div>
                <div className={`text-lg font-regular text-green ${color}`}>{(transaction.amount > 0 ? "+" : "")+transaction.amount} ₹</div>
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