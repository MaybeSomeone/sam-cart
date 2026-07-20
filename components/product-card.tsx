'use client'

import { Plus, Users } from 'lucide-react'
import type { Product } from '@/lib/data'

export function ProductCard({
  product,
  onOpen,
  onAdd,
}: {
  product: Product
  onOpen?: () => void
  onAdd?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-xl bg-card text-left shadow-sm transition-transform active:scale-[0.98]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-2 top-2 rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">
          {product.brand}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-2.5">
        <p className="line-clamp-2 text-[13px] leading-snug text-foreground">{product.title}</p>

        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Users className="h-3 w-3 text-primary" />
          <span>已拼 {product.groupCount} 单</span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-[11px] font-bold text-primary">¥</span>
            <span className="text-xl font-black leading-none text-primary">{product.price}</span>
            <span className="text-[11px] text-muted-foreground line-through">
              ¥{product.originalPrice}
            </span>
          </div>
          <span
            onClick={(e) => {
              e.stopPropagation()
              onAdd?.()
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform active:scale-90"
            aria-label="加入购物车"
          >
            <Plus className="h-4 w-4" strokeWidth={3} />
          </span>
        </div>
      </div>
    </button>
  )
}
