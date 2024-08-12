import { useQuery } from '@tanstack/react-query'
import { BarChart, Loader2 } from 'lucide-react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import colors from 'tailwindcss/colors'

import { getPopularProducts } from '@/api/get-popular-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { PieLabel } from '@/components/utils/pie-label'

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
]

export function PopularProductsChart() {
  const { data: popularProducts } = useQuery({
    queryKey: ['metrics', 'popular-products'],
    queryFn: getPopularProducts,
  })

  const chartConfig: ChartConfig = {} satisfies ChartConfig

  popularProducts?.forEach(({ product }) => {
    chartConfig[product] = { label: product }
  })

  return (
    <Card className="col-span-3 max-[1025px]:col-span-4">
      <CardHeader className="p-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos Populares
          </CardTitle>
          <BarChart className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        {popularProducts ? (
          <ChartContainer
            config={chartConfig}
            height={320}
            className="min-h-30 max-h-60 w-full"
          >
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={popularProducts}
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
                {popularProducts.map((_, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                      className="stroke-background hover:opacity-80"
                    />
                  )
                })}
              </Pie>
              <Tooltip />
              <ChartLegend
                className="justify-cente flex flex-wrap items-center gap-1 xl:hidden"
                content={<ChartLegendContent nameKey="product" />}
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex h-60 w-full items-center justify-center">
            <Loader2 className="size-20 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
