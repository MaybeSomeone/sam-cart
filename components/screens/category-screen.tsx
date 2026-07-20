'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { products, type Product } from '@/lib/data'
import { StatusBar } from '@/components/status-bar'

const categories = [
  { key: 'bakery', label: '烘焙甜点' },
  { key: 'meat', label: '肉类生鲜' },
  { key: 'snack', label: '休闲零食' },
  { key: 'dairy', label: '乳品饮料' },
  { key: 'fruit', label: '新鲜水果' },
  { key: 'deli', label: '熟食热餐' },
  { key: 'home', label: '家居日用' },
]

// map products to a demo category for display
const catMap: Record<string, string> = {
  'swiss-roll': 'bakery',
  muffin: 'bakery',
  beef: 'meat',
  nuts: 'snack',
  milk: 'dairy',
  berries: 'fruit',
  chicken: 'deli',
}

export function CategoryScreen({ onOpenProduct }: { onOpenProduct: (p: Product) => void }) {
  const [active, setActive] = useState('bakery')
  const list = products.filter((p) => catMap[p.id] === active)
  const shown = list.length > 0 ? list : products

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="shrink-0 bg-card">
        <StatusBar />
        <div className="px-4 pb-2">
          <div className="flex h-9 items-center gap-2 rounded-full bg-muted px-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">搜索分类商品...</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left rail */}
        <div className="w-24 shrink-0 overflow-y-auto bg-muted pb-24">
          {categories.map((c) => {
            const isActive = active === c.key
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setActive(c.key)}
                className={`relative flex w-full items-center justify-center py-4 text-[13px] transition-colors ${
                  isActive
                    ? 'bg-card font-bold text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                )}
                {c.label}
              </button>
            )
          })}
        </div>

        {/* Right content */}
        <div className="flex-1 overflow-y-auto p-3 pb-24">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-3.5 w-1 rounded-full bg-primary" />
            <h3 className="text-sm font-bold text-foreground">
              {categories.find((c) => c.key === active)?.label}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {shown.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onOpenProduct(p)}
                className="flex flex-col overflow-hidden rounded-xl bg-card text-left shadow-sm active:scale-[0.98]"
              >
                <div className="aspect-square w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image || '/placeholder.svg'}
                    alt={p.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-2">
                  <p className="line-clamp-2 text-[12px] leading-snug text-foreground">{p.title}</p>
                  <div className="mt-auto flex items-baseline pt-1.5 text-primary">
                    <span className="text-xs font-bold">¥</span>
                    <span className="text-base font-black">{p.price}</span>
                    <span className="ml-1 text-[10px] text-muted-foreground line-through">
                      ¥{p.originalPrice}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
