import { getMetafieldValue } from '@/lib/cosmic'

interface InventoryBadgeProps {
  status?: unknown
}

export default function InventoryBadge({ status }: InventoryBadgeProps) {
  const value = getMetafieldValue(status)
  if (!value) return null

  const lower = value.toLowerCase()
  let classes = 'bg-gray-100 text-gray-700'

  if (lower.includes('in stock')) {
    classes = 'bg-green-100 text-green-700'
  } else if (lower.includes('low')) {
    classes = 'bg-amber-100 text-amber-700'
  } else if (lower.includes('out')) {
    classes = 'bg-red-100 text-red-700'
  } else if (lower.includes('pre')) {
    classes = 'bg-brand-100 text-brand-700'
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${classes}`}>
      {value}
    </span>
  )
}