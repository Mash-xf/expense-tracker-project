import { useEffect, useState } from 'react'
import './App.css'
import { ClerkProvider } from '@clerk/react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Header from './components/Header'

import header from './components/Header'
import ExpensesForm from './components/ExpensesForm'
import IncomeForm from './components/IncomeForm'
import Home from './components/Home'
import Login from './components/Login'


function App() {


  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await fetch('http://localhost:3500/expenses');
        const expensesData = await expensesResponse.json();
        setExpenses(expensesData);

        const incomeResponse = await fetch('http://localhost:3500/income');
        const incomeData = await incomeResponse.json();
        setIncome(incomeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home
            expenses={expenses}
            setExpenses={setExpenses}
            income={income}
            setIncome={setIncome}
          />} />
          <Route path="/add-expense" element={<ExpensesForm expenses={expenses}
            setExpenses={setExpenses}
            income={income}
            setIncome={setIncome} />} />
          <Route path="/add-income" element={<IncomeForm expenses={expenses}
            setExpenses={setExpenses}
            income={income}
            setIncome={setIncome} />} />
          <Route path="/login" element={<Login expenses={expenses}
            setExpenses={setExpenses}
            income={income}
            setIncome={setIncome} />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  )
}

export default App
