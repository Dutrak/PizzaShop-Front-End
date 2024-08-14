import { http, HttpResponse } from 'msw'

import { DeliverOrderURLParams } from '../deliver-order'

export const deliverOrderMock = http.patch<DeliverOrderURLParams>(
  '/orders/:orderId/deliver',
  async ({ params }) => {
    const { orderId } = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
