import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

interface OrderTableRowProps {
  order: {
    status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
    createdAt: string
    orderId: string
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['get-orders'],
    })

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((cachedOrder) => {
          if (cachedOrder.orderId === orderId) {
            return { ...cachedOrder, status }
          }

          return cachedOrder
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="size-3" />
              <span className="sr-only">Detalhes do Pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="truncate font-mono text-sm font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 size-3" />
            Aprovar Pedido
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 size-3" />
            Alterar para em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-2 size-3" />
            Alterar para entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          variant="ghost"
          size="xs"
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 size-3" />
          Cancelar Pedido
        </Button>
      </TableCell>
    </TableRow>
  )
}
