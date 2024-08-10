import { api } from '@/lib/axios'

interface getProfileResponse {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer' | null
  createdAt: Date
  updatedAt: Date
}

export async function getProfile() {
  const response = await api.get<getProfileResponse>('/me', {
    withCredentials: true,
  })

  return response.data
}
