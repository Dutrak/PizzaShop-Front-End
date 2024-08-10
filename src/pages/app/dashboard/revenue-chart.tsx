import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'

const chartConfig = {
  date: {
    label: 'date',
  },
  revenue: {
    label: 'revenue',
  },
} satisfies ChartConfig

const data = [
  { date: '10/12', revenue: 1200 },
  { date: '11/12', revenue: 800 },
  { date: '12/12', revenue: 200 },
  { date: '13/12', revenue: 1600 },
  { date: '14/12', revenue: 500 },
  { date: '15/12', revenue: 360 },
  { date: '16/12', revenue: 970 },
]

export function RevenueChart() {
  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between p-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="min-h-30 max-h-60 w-full"
          config={chartConfig}
          height={240}
        >
          <LineChart accessibilityLayer style={{ fontSize: 12 }} data={data}>
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
      </CardContent>
    </Card>
  )
}
