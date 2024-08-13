import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '../get-managed-resturant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', async () => {
  return HttpResponse.json({
    id: 'Generated Id',
    name: 'Mock Restaurant',
    description: 'This is a managed restaurant description',
    managerId: 'Generated Id',
    createdAt: new Date(),
    updatedAt: null,
  })
})
