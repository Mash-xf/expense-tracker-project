import React from "react";

function ExpenseList({ expenses, incomes }) {


    const expenseTotal = expenses?.reduce((total, expense) => total + expense.amount, 0);
    const incomeTotal = incomes?.reduce((total, income) => total + income.amount, 0);
    const overlap = incomeTotal - expenseTotal;

    function formatAmount(amount) {
        return `KSh ${Number(amount).toLocaleString("en-KE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    }

    return (
        <div className="expense-list">
            {expenses?.map((expense) => {
                return (
                    <div key={expense.id} className="expense-item">
                        <h3>{expense.title}</h3>
                        <p className="expense-category">({expense.category})</p>
                        <p className="expense-date">Added on {expense.date}</p>
                        <p className="expense-amount">{formatAmount(expense.amount)}</p>
                    </div>
                )
            })}
            <p className="total">Total Expenses: {formatAmount(expenseTotal)}</p>
            <p className="total">Overlap: {formatAmount(overlap)}</p>

        </div>


    );
}

export default ExpenseList;