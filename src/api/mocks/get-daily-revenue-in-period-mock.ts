import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-revenue-in-period', async () => {
  return HttpResponse.json([
    { date: '2021-08-01', revenue: 2000 },
    { date: '2021-08-02', revenue: 400 },
    { date: '2021-08-03', revenue: 1800 },
    { date: '2021-08-04', revenue: 200 },
    { date: '2021-08-05', revenue: 3000 },
    { date: '2021-08-06', revenue: 900 },
    { date: '2021-08-07', revenue: 100 },
  ])
})
