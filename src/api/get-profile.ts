import { api } from '@/lib/axios'

export interface getProfileResponse {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer' | null
  createdAt: Date
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await api.get<getProfileResponse>('/me')

  return response.data
}
