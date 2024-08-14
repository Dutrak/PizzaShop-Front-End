import { http, HttpResponse } from 'msw'

import { GetOrdersResponse } from '../get-orders'

type Orders = GetOrdersResponse['orders']
type OrderStatus = GetOrdersResponse['orders'][number]['status']

const orderStatuses: OrderStatus[] = [
  'pending',
  'processing',
  'delivering',
  'delivered',
  'canceled',
]

const orders: Orders = Array.from({ length: 60 }, (_, index) => ({
  orderId: `order-${index + 1}`,
  customerName: `Customer ${index + 1}`,
  status: orderStatuses[index % orderStatuses.length],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  total: 2400,
}))

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0
    const customerName = searchParams.get('customerName') || ''
    const status = searchParams.get('status') || ''
    const orderId = searchParams.get('orderId') || ''

    let filteredOrders = orders

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      )
    }

    const perPage = 10
    const paginatedOrders = filteredOrders.slice(
      pageIndex * perPage,
      (pageIndex + 1) * perPage,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage,
        totalCount: filteredOrders.length,
      },
    })
  },
)
