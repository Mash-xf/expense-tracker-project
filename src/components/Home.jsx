import IncomeList from './IncomeList'
import ExpenseList from './ExpenseList'
import { useEffect, useState } from 'react';
import { Show } from '@clerk/react';

const Home = (

  { expenses,
    setExpenses,
    income,
    setIncome, }
) => {

  return (


    <div className='home'>
      <Show when="signed-in">
        <IncomeList incomes={income} />
        <ExpenseList expenses={expenses} />
      </Show>
      <Show when="signed-out">

        <h2>Please sign in to view your expenses and income.</h2>
      </Show>
    </div>
  )
}

export default Home
