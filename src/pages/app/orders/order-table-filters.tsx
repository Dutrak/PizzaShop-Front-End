import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const orderFiltersSchema = z.object({
  orderId: z.string().optional(),
  customer: z.string().optional(),
  status: z.string(),
})

type OrderFilters = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customer = searchParams.get('customerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } = useForm<OrderFilters>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      orderId: orderId ?? '',
      customer: customer ?? '',
      status: status ?? 'all',
    },
  })

  function handleFilterData({ orderId, customer, status }: OrderFilters) {
    setSearchParams((state) => {
      if (orderId) {
        state.set('orderId', orderId)
      } else {
        state.delete('orderId')
      }

      if (customer) {
        state.set('customerName', customer)
      } else {
        state.delete('customerName')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      state.set('page', '1')
      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('customerName')
      state.delete('status')
      state.set('page', '1')

      return state
    })

    reset({
      orderId: '',
      customer: '',
      status: 'all',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterData)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros</span>

      <Input
        placeholder="ID do pedido"
        className="h-8 w-auto"
        {...register('orderId')}
      />

      <Input
        placeholder="Nome do Cliente"
        className="h-8 w-[320px]"
        {...register('customer')}
      />

      <Controller
        name={'status'}
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
                <SelectItem value="processing">Em Preparo</SelectItem>
                <SelectItem value="delivering">Em Entrega</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
              </SelectContent>
            </Select>
          )
        }}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="size-4" />
        Filtrar Resultados
      </Button>

      <Button
        type="button"
        variant="outline"
        size="xs"
        onClick={handleClearFilters}
      >
        <X className="size-4" />
        Remover Filtros
      </Button>
    </form>
  )
}
