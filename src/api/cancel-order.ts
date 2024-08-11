import { api } from '@/lib/axios'

export interface CancelOrderURLParams {
  orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderURLParams) {
  console.log(orderId)
  await api.patch(`/orders/${orderId}/cancel`)
}
