import { api } from '@/lib/axios'

interface UpdateProfileRequestBody {
  name: string
  description: string
}

export async function updateProfile({
  name,
  description,
}: UpdateProfileRequestBody) {
  await api.put(
    '/restaurants',
    { name, description },
    { withCredentials: true },
  )
}
