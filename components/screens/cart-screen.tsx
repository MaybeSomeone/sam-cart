'use client'

import { useState } from 'react'
import { Check, Minus, Plus, Trash2 } from 'lucide-react'
import { products } from '@/lib/data'
import { StatusBar } from '@/components/status-bar'

type CartItem = {
  id: string
  spec: string
  qty: number
  checked: boolean
}

const initialCart: CartItem[] = [
  { id: 'beef', spec: '原切西冷 10片', qty: 1, checked: true },
  { id: 'swiss-roll', spec: '原味 1000g', qty: 1, checked: true },
  { id: 'muffin', spec: '混合口味 6枚', qty: 2, checked: false },
]

export function CartScreen({ onCheckout }: { onCheckout: () => void }) {
  const [items, setItems] = useState<CartItem[]>(initialCart)

  const get = (id: string) => products.find((p) => p.id === id)!
  const allChecked = items.every((i) => i.checked)
  const selected = items.filter((i) => i.checked)
  const goods = selected.reduce((sum, i) => sum + get(i.id).price * i.qty, 0)

  const toggle = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)))
  const toggleAll = () =>
    setItems((prev) => prev.map((i) => ({ ...i, checked: !allChecked })))
  const changeQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)),
    )
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id))

  return (
    <div className="flex h-full flex-col bg-muted">
      <div className="shrink-0 bg-card">
        <StatusBar />
        <div className="flex items-center justify-between px-4 py-2">
          <h1 className="text-base font-bold text-foreground">购物车</h1>
          <span className="text-sm text-muted-foreground">共 {items.length} 件</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 pb-40">
        <div className="rounded-2xl bg-card p-3 shadow-sm">
          <div className="flex items-center gap-1.5 pb-2 text-sm font-semibold text-foreground">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-secondary text-[9px] font-bold text-secondary-foreground">
              山
            </span>
            山姆代购 · 拼单专送
          </div>
          <div className="space-y-3">
            {items.map((item) => {
              const p = get(item.id)
              return (
                <div key={item.id} className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-label={item.checked ? '取消选择' : '选择'}
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      item.checked
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border bg-card'
                    }`}
                  >
                    {item.checked && <Check className="h-3 w-3" strokeWidth={3} />}
                  </button>
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image || '/placeholder.svg'}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col self-stretch">
                    <p className="line-clamp-2 text-[13px] leading-snug text-foreground">
                      {p.title}
                    </p>
                    <span className="mt-1 w-fit rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                      {item.spec}
                    </span>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">¥{p.price.toFixed(2)}</span>
                      {/* stepper */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          aria-label="删除"
                          className="mr-1 text-muted-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => changeQty(item.id, -1)}
                          aria-label="减少"
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-foreground"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm tabular-nums text-foreground">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeQty(item.id, 1)}
                          aria-label="增加"
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <p className="mt-3 px-1 text-center text-[11px] text-muted-foreground">
          满 ¥299 免运费 · 代购服务费 8% 结算时计算
        </p>
      </div>

      {/* Bottom settle bar (above tab bar) */}
      <div className="absolute inset-x-0 bottom-[76px] z-10 flex items-center gap-3 border-t border-border bg-card px-4 py-2.5">
        <button
          type="button"
          onClick={toggleAll}
          className="flex items-center gap-1.5 text-sm text-foreground"
        >
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
              allChecked ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
            }`}
          >
            {allChecked && <Check className="h-3 w-3" strokeWidth={3} />}
          </span>
          全选
        </button>
        <div className="ml-auto flex items-baseline text-foreground">
          <span className="text-xs">合计</span>
          <span className="ml-1 text-sm font-bold text-primary">¥</span>
          <span className="text-xl font-black text-primary">{goods.toFixed(2)}</span>
        </div>
        <button
          type="button"
          onClick={onCheckout}
          disabled={selected.length === 0}
          className="h-10 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md active:scale-[0.98] disabled:opacity-50"
        >
          去结算({selected.length})
        </button>
      </div>
    </div>
  )
}
