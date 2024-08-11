import { api } from '@/lib/axios'

export interface getOrdersQueryParams {
  pageIndex?: number | null
  orderId?: string | null
  customer?: string | null
  status?: string | null
}

export interface GetOrdersResponse {
  orders: {
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
    createdAt: string
    orderId: string
    customerName: string
    total: number
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({
  pageIndex,
  customer,
  orderId,
  status,
}: getOrdersQueryParams) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      customerName: customer,
      orderId,
      status,
    },
  })

  return response.data
}
