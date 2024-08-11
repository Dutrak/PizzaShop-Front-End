import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { DatePickerWithRange } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenueInPeriod } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  })

  const chartData = useMemo(() => {
    return dailyRevenueInPeriod?.map((chartItem) => {
      return {
        date: chartItem.date,
        revenue: chartItem.revenue / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  const chartConfig: ChartConfig = {} satisfies ChartConfig

  chartData?.forEach(({ date, revenue }) => {
    chartConfig[date] = { label: revenue }
  })

  return (
    <Card className="col-span-6 max-[1025px]:col-span-5">
      <CardHeader className="flex-row items-center justify-between p-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          <Label>Periodo: </Label>
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {chartData && (
          <ChartContainer
            className="min-h-30 max-h-60 w-full"
            config={chartConfig}
            height={240}
          >
            <LineChart
              accessibilityLayer
              style={{ fontSize: 12 }}
              data={chartData}
            >
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <XAxis dataKey="date" tickLine={false} axisLine={false} dy={16} />
              <Line
                type="linear"
                strokeWidth={2}
                dataKey="revenue"
                stroke={colors.violet['500']}
              />

              <CartesianGrid vertical={false} />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
