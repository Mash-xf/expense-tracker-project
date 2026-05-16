import { render, screen } from '@testing-library/react'
import ExpenseList from '../ExpenseList'

describe('ExpenseList', () => {
  it('shows each expense and the total expenses amount', () => {
    const expenses = [
      {
        id: 1,
        title: 'Groceries',
        amount: 42.5,
        category: 'Food',
        date: '2026-05-14',
      },
      {
        id: 2,
        title: 'Bus fare',
        amount: 7.25,
        category: 'Transport',
        date: '2026-05-15',
      },
    ]

    render(<ExpenseList expenses={expenses} />)

    expect(screen.getByRole('heading', { name: 'Groceries' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Bus fare' })).toBeInTheDocument()
    expect(screen.getByText('Amount: $42.50')).toBeInTheDocument()
    expect(screen.getByText('Category: Food')).toBeInTheDocument()
    expect(screen.getByText('Date: 2026-05-15')).toBeInTheDocument()
    expect(screen.getByText('Total Expenses: $49.75')).toBeInTheDocument()
  })

  it('shows zero total when there are no expenses', () => {
    render(<ExpenseList expenses={[]} />)

    expect(screen.getByText('Total Expenses: $0.00')).toBeInTheDocument()
  })
})
