import { api } from '@/lib/axios'

export interface CancelOrderURLParams {
  orderId: string
}

export async function cancelOrder({ orderId }: CancelOrderURLParams) {
  await api.patch(`/orders/${orderId}/cancel`)
}
