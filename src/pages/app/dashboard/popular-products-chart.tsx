import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart } from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { PieLabel } from '@/components/utils/pie-label'

const data = [
  { product: 'Pepperoni', amount: 40 },
  { product: 'Muzzarela', amount: 30 },
  { product: 'Marguerita', amount: 50 },
  { product: 'Portuguesa', amount: 16 },
  { product: 'Chocolate', amount: 26 },
]

const chartConfig = {
  Pepperoni: {
    label: 'Pepperoni',
  },
  Muzzarela: {
    label: 'Muzzarela',
  },
  Marguerita: {
    label: 'Marguerita',
  },
  Portuguesa: {
    label: 'Portuguesa',
  },
  Chocolate: {
    label: 'Chocolate',
  },
} satisfies ChartConfig

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

export function PopularProductsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="p-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos Populares
          </CardTitle>
          <BarChart className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          height={240}
          className="min-h-30 max-h-60 w-full pt-5"
        >
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={86}
              innerRadius={64}
              strokeWidth={4}
              labelLine={false}
              label={PieLabel}
            >
              {data.map((_, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    className="stroke-background hover:opacity-80"
                  />
                )
              })}
            </Pie>
            <ChartLegend
              className="justify-cente flex flex-wrap items-center gap-1 xl:hidden"
              content={<ChartLegendContent nameKey="product" />}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
