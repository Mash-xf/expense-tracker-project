import { render, screen } from '@testing-library/react'
import IncomeList from '../IncomeList'

describe('IncomeList', () => {
  it('shows each income item and the total income amount', () => {
    const incomes = [
      {
        id: 1,
        title: 'Salary',
        amount: 1200,
        date: '2026-05-01',
      },
      {
        id: 2,
        title: 'Freelance',
        amount: 350.75,
        date: '2026-05-10',
      },
    ]

    render(<IncomeList incomes={incomes} />)

    expect(screen.getByRole('heading', { name: 'Salary' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Freelance' })).toBeInTheDocument()
    expect(screen.getByText('Amount: $1200.00')).toBeInTheDocument()
    expect(screen.getByText('Date: 2026-05-10')).toBeInTheDocument()
    expect(screen.getByText('Total Income: $1550.75')).toBeInTheDocument()
  })

  it('shows zero total when there is no income', () => {
    render(<IncomeList incomes={[]} />)

    expect(screen.getByText('Total Income: $0.00')).toBeInTheDocument()
  })
})
