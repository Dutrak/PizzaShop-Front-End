import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', async () => {
  return HttpResponse.json([
    { product: 'Apple', amount: 100 },
    { product: 'Banana', amount: 80 },
    { product: 'Cherry', amount: 60 },
    { product: 'Date', amount: 40 },
    { product: 'Elderberry', amount: 20 },
  ])
})
