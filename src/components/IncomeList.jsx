import react from 'react'

function IncomeList({ incomes }) {

    function formatAmount(amount) {
        return `KSh ${Number(amount).toLocaleString("en-KE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    }

    return (
        <div className="income-list">
            {incomes?.map((income) => {
                return (
                    <div key={income.id} className="income-item">
                        <h3>{income.title}</h3>
                        <p className="income-date">Added on {income.date}</p>
                        <p className="income-amount">{formatAmount(income.amount)}</p>
                    </div>
                )
            })}
            <p className="total">Total Income: {formatAmount(incomes?.reduce((total, income) => total + income.amount, 0))}</p>

        </div>


    );
}

export default IncomeList;