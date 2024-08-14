import { http, HttpResponse } from 'msw'

import { GetOrderResponse, GetOrderURLParams } from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderURLParams,
  never,
  GetOrderResponse
>('/orders/:orderId', async ({ params }) => {
  const { orderId } = params

  return HttpResponse.json({
    id: orderId,
    customer: {
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      phone: '21231323113',
    },
    ordersItems: [
      { id: '1', product: { name: 'Pizza' }, priceInCents: 100, quantity: 2 },
      { id: '2', product: { name: 'Coke' }, priceInCents: 50, quantity: 1 },
    ],
    status: 'pending',
    createdAt: new Date().toISOString(),
    totalInCents: 250,
  })
})
