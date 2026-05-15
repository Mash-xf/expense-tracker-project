import react from 'react'

function IncomeList({ incomes }) {

    return (
        <div className="income-list">
            {incomes?.map((income) => {
                return (
                    <div key={income.id} className="income-item">
                        <h3>{income.title}</h3>
                        <p>Amount: ${income.amount.toFixed(2)}</p>
                        <p>Date: {income.date}</p>
                    </div>
                )
            })}
            <p>Total Income: ${incomes?.reduce((total, income) => total + income.amount, 0).toFixed(2)}</p>

        </div>


    );
}

export default IncomeList;