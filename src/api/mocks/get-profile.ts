import { http, HttpResponse } from 'msw'

import { getProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, getProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json({
      id: 'Generated Id',
      name: 'Jhon Doe',
      email: 'Jhondoe@example.com',
      phone: '21231323113',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
