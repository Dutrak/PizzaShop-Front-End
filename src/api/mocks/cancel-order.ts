import { http, HttpResponse } from 'msw'

import { CancelOrderURLParams } from '../cancel-order'

export const cancelOrderMock = http.patch<CancelOrderURLParams>(
  '/orders/:orderId/cancel',
  async ({ params }) => {
    const { orderId } = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
