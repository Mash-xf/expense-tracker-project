import React from "react";

function ExpenseList({ expenses }) {
    return (
        <div className="expense-list">
            {expenses?.map((expense) => {
                return (
                    <div key={expense.id} className="expense-item">
                        <h3>{expense.title}</h3>
                        <p>Amount: ${expense.amount.toFixed(2)}</p>
                        <p>Category: {expense.category}</p>
                        <p>Date: {expense.date}</p>
                    </div>
                )
            })}
            <p>Total Expenses: ${expenses?.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}</p>

        </div>


    );
}

export default ExpenseList;