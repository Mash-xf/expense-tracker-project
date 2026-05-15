import { Show } from '@clerk/react'
import { useState } from 'react'
import { useNavigate } from "react-router";

function IncomeForm(   { expenses,
    setExpenses,
    income,
    setIncome, }) {
        let navigate = useNavigate();

    const [incomeString, setIncomeString] = useState({
        title: '',
        amount: 0,
        date: new Date()
    })

    const handleChange = (e) => {
        setIncomeString({
            ...incomeString,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!incomeString.title || !incomeString.amount || !incomeString.date) {
            alert('Please fill in all fields')
            return
        }
        const incomeData = {
            title: incomeString.title,
            amount: parseFloat(incomeString.amount),
            date: new Date(incomeString.date)
        }
        try {
            const response = await fetch("http://localhost:3500/incomeString", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(incomeData),
            }); 

            if (!response.ok) {
                throw new Error("Failed to add project");
            }

            const data = await response.json();

setIncome(prev=> [...prev, data])
navigate('/')
            setIncomeString({
                title: '',
                amount: 0,
                date: ''
            })
        } catch (error) {
            console.error("Error adding project:", error);
            alert("Failed to add the project. Please try again.");
        }
    }
    return (
        <div className='income-form'>
            <Show when="signed-in">

                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder='Title' value={income.title} onChange={handleChange} />
                    <label htmlFor="amount">Amount</label>
                    <input type="number" name="amount" placeholder='Amount' value={income.amount} onChange={handleChange} />
                    <label htmlFor="date">Date</label>
                </form>

                <button onClick={handleSubmit} type='submit' className="button">Add Income</button>
            </Show>

        </div>
    )

}
export default IncomeForm;