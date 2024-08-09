interface PieLabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  index: number
  name: string
  value: number
}

export const PieLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  name,
  value,
}: PieLabelProps) => {
  const RADIAN = Math.PI / 180
  const radius = 12 + innerRadius + (outerRadius - innerRadius)
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      className="fill-muted-foreground text-xs"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {name.length > 12 ? name.substring(0, 12).concat('...') : name} ({value})
    </text>
  )
}
