import { api } from '@/lib/axios'

export interface RegisterRestaurantRequestBody {
  restaurantName: string
  restaurantDescription: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant({
  restaurantName,
  managerName,
  restaurantDescription,
  email,
  phone,
}: RegisterRestaurantRequestBody) {
  await api.post('/restaurants', {
    restaurantName,
    restaurantDescription,
    managerName,
    email,
    phone,
  })
}
