import { useEffect, useState } from 'react'
import './App.css'
import { ClerkProvider } from '@clerk/react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Header from './components/Header'
import { useNavigate } from "react-router";

import header from './components/Header'
import ExpensesForm from './components/ExpensesForm'
import IncomeForm from './components/IncomeForm'
import Home from './components/Home'
import Login from './components/Login'

const isProduction = true;
function App() {


  // const PUBLISHABLE_KEY = `pk_live_Y2xlcmsubWFzaC14Zi5naXRodWIuaW8k`
  const PUBLISHABLE_KEY = "pk_test_YWRhcHRpbmctaGFnZmlzaC00Ny5jbGVyay5hY2NvdW50cy5kZXYk"

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  // const navigate = useNavigate();
  // navigate('/');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await fetch('https://6a08073efa9b27c848fa8a5f.mockapi.io/api/et/expenses');
        // const expensesResponse = await fetch('http://localhost:3500/expenses');
        const expensesData = await expensesResponse.json();
        setExpenses(expensesData);

        const incomeResponse = await fetch('https://6a08073efa9b27c848fa8a5f.mockapi.io/api/et/incomes');
        const incomeData = await incomeResponse.json();
        setIncome(incomeData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} navigate={(to) => window.history.pushState(null, '', to)}>
      <BrowserRouter basename="/expense-tracker-project">
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
