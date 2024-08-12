export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'delivering'
  | 'delivered'
  | 'canceled'

interface OrderStatusProps {
  status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, string> = {
  pending: 'Pendente',
  processing: 'Em Preparo',
  delivering: 'Em Entrega',
  delivered: 'Entregue',
  canceled: 'Cancelado',
}

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pending' && (
        <span
          data-testid="badge"
          className="size-2 rounded-full bg-slate-400 dark:bg-slate-500"
        />
      )}

      {status === 'canceled' && (
        <span
          data-testid="badge"
          className="size-2 rounded-full bg-rose-400 dark:bg-rose-500"
        />
      )}

      {status === 'delivered' && (
        <span
          data-testid="badge"
          className="size-2 rounded-full bg-emerald-400 dark:bg-emerald-500"
        />
      )}

      {['processing', 'delivering'].includes(status) && (
        <span
          data-testid="badge"
          className="size-2 rounded-full bg-amber-400 dark:bg-amber-500"
        />
      )}

      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  )
}
