import { http, HttpResponse } from 'msw'

import { SignInRequestBody } from '../sign-in'

export const signInMock = http.post<never, SignInRequestBody>(
  '/authenticate',
  async ({ request }) => {
    const { email } = await request.json()

    if (email === 'jhondoe@example.com') {
      return new HttpResponse(null, {
        status: 200,
        headers: { 'set-cookie': 'auth=sample-jwt' },
      })
    }

    return new HttpResponse(null, { status: 401 })
  },
)
