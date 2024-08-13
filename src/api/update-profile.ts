import { api } from '@/lib/axios'

export interface UpdateProfileRequestBody {
  name: string
  description: string
}

export async function updateProfile({
  name,
  description,
}: UpdateProfileRequestBody) {
  await api.put('/restaurants', { name, description })
}
