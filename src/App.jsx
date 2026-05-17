import { useEffect, useState } from 'react'
import './App.css'
import { ClerkProvider } from '@clerk/react'
// Note: Changed 'react-router' to 'react-router-dom' which is standard for web apps
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'

import ExpensesForm from './components/ExpensesForm'
import IncomeForm from './components/IncomeForm'
import Home from './components/Home'
import Login from './components/Login'

// Create a wrapper component so we can use useNavigate() inside ClerkProvider
function AppContent({ expenses, setExpenses, income, setIncome }) {
  const navigate = useNavigate();

  return (

    <ClerkProvider 
      publishableKey="pk_test_YWRhcHRpbmctaGFnZmlzaC00Ny5jbGVyay5hY2NvdW50cy5kZXYk" 
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      afterSignInUrl="/expense-tracker-project/" 
      afterSignOutUrl="/expense-tracker-project/"
    >
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
    </ClerkProvider>
  );
}

function App() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await fetch('https://6a08073efa9b27c848fa8a5f.mockapi.io/api/et/expenses');
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
    <BrowserRouter basename="/expense-tracker-project">
      <AppContent 
        expenses={expenses} 
        setExpenses={setExpenses} 
        income={income} 
        setIncome={setIncome} 
      />
    </BrowserRouter>
  )
}

export default App
