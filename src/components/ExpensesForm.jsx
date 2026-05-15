import { Show } from "@clerk/react";
import { useState } from "react";
import { useNavigate } from "react-router";



function ExpensesForm(   { expenses,
    setExpenses,
    income,
    setIncome, }) {
        let navigate = useNavigate();
        const [expense, setExpense] = useState({
        id: '',
        title: '',
        amount: 0,
        category: '',
        date: new Date()
    })

    const handleChange = (e) => {
        setExpense({
            ...expense,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!expense.title || !expense.amount || !expense.category) {
            alert('Please fill in all fields')
            return
        }
        const expenseData = {
            id: Date.now(),
            title: expense.title,
            amount: parseFloat(expense.amount),
            category: expense.category,
            date: new Date()
        }
        try {
            const response = await fetch("http://localhost:3500/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(expenseData),
            });

            if (!response.ok) {
                throw new Error("Failed to add the transaction");
            }

            const data = await response.json();

setExpenses(prev=> [...prev, data])
navigate('/')
            setExpense({
                id: '',
                title: '',
                amount: 0,
                category: '',
                date: new Date()
            })
        } catch (error) {
            console.error("Error adding transaction:", error);
            alert("Failed to add the transaction. Please try again.");
        }
    };
    return (
        <div className='expense-form'>
                            <Show when="signed-in">
    
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" placeholder='Title' value={expense.title} onChange={handleChange} />
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" placeholder='Amount' value={expense.amount} onChange={handleChange} />
                <label htmlFor="category">Category</label>
                <input type="text" name="category" placeholder='Category' value={expense.category} onChange={handleChange} />
                <label htmlFor="date">Date</label>
                <input type="date" name="date" placeholder='Date' value={expense.date} onChange={handleChange} />
            </form>

            <button onClick={handleSubmit} type='submit' className="button">Add Expense</button>
                </Show>

        </div>
    )

}

export default ExpensesForm;