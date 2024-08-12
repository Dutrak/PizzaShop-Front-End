import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
  const status = {
    pending: { text: 'Pendente', color: 'bg-slate-400' },
    processing: { text: 'Em Preparo', color: 'bg-amber-400' },
    delivering: { text: 'Em Entrega', color: 'bg-amber-400' },
    delivered: { text: 'Entregue', color: 'bg-emerald-400' },
    canceled: { text: 'Cancelado', color: 'bg-rose-400' },
  }

  it('should display the right text based on order status', () => {
    const statusIndex = Math.floor(Math.random() * Object.keys(status).length)

    const value = Object.values(status)[statusIndex]
    const key = Object.keys(status)[statusIndex] as keyof typeof status

    const wrapper = render(<OrderStatus status={key} />)

    const statusText = wrapper.getByText(value.text)
    const badgeElement = wrapper.getByTestId('badge')

    expect(statusText).toBeInTheDocument()
    expect(badgeElement).toHaveClass(value.color)
  })
})
