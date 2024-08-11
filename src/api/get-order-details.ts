import { api } from '@/lib/axios'

export interface GetOrderURLParams {
  orderId: string
}

export interface GetOrderResponse {
  status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
  id: string
  createdAt: string
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  ordersItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrderDetails({ orderId }: GetOrderURLParams) {
  const response = await api.get(`/orders/${orderId}`)

  return response.data
}
