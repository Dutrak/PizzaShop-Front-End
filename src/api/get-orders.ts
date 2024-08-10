import { api } from '@/lib/axios'

export interface getOrdersQueryParams {
  pageIndex?: number | null
}

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

export async function getOrders({ pageIndex }: getOrdersQueryParams) {
  const response = await api.get<GetOrdersRespnse>('/orders', {
    params: {
      pageIndex,
    },
  })

  return response.data
}
