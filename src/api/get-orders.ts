import { api } from '@/lib/axios'

interface GetOrdersRespnse {
  orders: {
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
    createdAt: string
    orderId: string
    costumerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders() {
  const response = await api.get<GetOrdersRespnse>('/orders', {
    params: {
      pageIndex: 0,
    },
  })

  return response.data
}
