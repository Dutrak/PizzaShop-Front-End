import { http, HttpResponse } from 'msw'

import { GetMonthRevenueResponse } from '../get-month-revenue'

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueResponse
>('/metrics/month-revenue', async () => {
  return HttpResponse.json({
    revenue: 1500,
    diffFromLastMonth: 500,
  })
})
