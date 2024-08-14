import { http, HttpResponse } from 'msw'

import { DispatchOrderURLParams } from '../dispatch-order'

export const dispatchOrderMock = http.patch<DispatchOrderURLParams>(
  '/orders/:orderId/dispatch',
  async ({ params }) => {
    const { orderId } = params

    if (orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
