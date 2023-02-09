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
            date: "09/07/2023",
            amount: -10
        }
    ]
    return(
        <div className="flex flex-col py-5 px-6 overflow-auto h-screen">
                <Header title="Transactions"/>
        </div>
    )
}