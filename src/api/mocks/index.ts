import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { registerResataurantMock } from './register-restaurant-mock'
import { signInMock } from './sign-in-mock'

export const worker = setupWorker(signInMock, registerResataurantMock)

export async function enableMSW() {
  if (env.MODE !== 'test') return

  await worker.start()
}
