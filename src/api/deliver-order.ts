import { api } from '@/lib/axios'

export interface DeliverOrderURLParams {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderURLParams) {
  await api.patch(`/orders/${orderId}/deliver`)
}
