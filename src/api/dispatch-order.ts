import { api } from '@/lib/axios'

export interface DispatchOrderURLParams {
  orderId: string
}

export async function dispatchOrder({ orderId }: DispatchOrderURLParams) {
  await api.patch(`/orders/${orderId}/dispatch`)
}
