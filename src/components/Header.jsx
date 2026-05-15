import { Show, SignIn, SignInButton, UserButton } from '@clerk/react';
import react from 'react'
import { NavLink } from "react-router";

function Header() {
    return (
        <header className='header'>
            <h1>Expense Tracker</h1>
            <span className='tagline'>Track your expenses and income</span>
            <nav className='nav'>
                <NavLink to="/">Home</NavLink>

                <Show when="signed-out">
                    <NavLink to="/login">Login</NavLink>
                    {/* <SignInButton /> */}
                </Show>
                <Show when="signed-in">
                    <NavLink to="/add-expense">Add Expenses</NavLink>
                    <NavLink to="/add-income">Add Income</NavLink>

                    <UserButton />
                </Show>
            </nav>
        </header>
    )
}
export default Header