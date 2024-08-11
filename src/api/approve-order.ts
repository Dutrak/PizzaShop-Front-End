import { api } from '@/lib/axios'

export interface ApproveOrderURLParams {
  orderId: string
}

export async function approveOrder({ orderId }: ApproveOrderURLParams) {
  await api.patch(`/orders/${orderId}/approve`)
}
