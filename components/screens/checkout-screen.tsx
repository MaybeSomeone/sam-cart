'use client'

import { ChevronLeft, ChevronRight, MapPin, Store } from 'lucide-react'
import { products } from '@/lib/data'
import { StatusBar } from '@/components/status-bar'

const cart = [
  { product: products[1], spec: '原切西冷 10片', qty: 1 },
  { product: products[0], spec: '原味 1000g', qty: 1 },
  { product: products[3], spec: '混合口味 6枚', qty: 1 },
]

export function CheckoutScreen() {
  const goods = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const agentFee = Math.round(goods * 0.08 * 100) / 100
  const shipping = goods >= 299 ? 0 : 15
  const total = goods + agentFee + shipping

  return (
    <div className="flex h-full flex-col bg-muted">
      {/* Header */}
      <div className="shrink-0 bg-card">
        <StatusBar />
        <div className="flex items-center px-3 py-2">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-base font-bold text-foreground">确认订单</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {/* Delivery */}
        <div className="rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <MapPin className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">王小明</span>
                <span className="text-sm text-muted-foreground">138****6688</span>
                <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-medium text-accent-foreground">
                  默认
                </span>
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-foreground">
                广东省深圳市南山区科技园南区 · 深南大道 9988 号 · 腾讯滨海大厦 A 座 3201
              </p>
            </div>
            <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs font-medium text-secondary"
          >
            <Store className="h-3.5 w-3.5" />
            改为自提点自提（南山区自提点 3 个可选）
          </button>
        </div>

        {/* Items */}
        <div className="mt-3 rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-secondary text-[9px] font-bold text-secondary-foreground">
              山
            </span>
            山姆代购 · 拼单专送
          </div>
          <div className="mt-3 space-y-3">
            {cart.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.image || '/placeholder.svg'}
                    alt={item.product.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="line-clamp-2 text-[13px] leading-snug text-foreground">
                    {item.product.title}
                  </p>
                  <span className="mt-1 w-fit rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
                    {item.spec}
                  </span>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">
                      ¥{item.product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground">x{item.qty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fee breakdown */}
        <div className="mt-3 rounded-2xl bg-card p-4 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-foreground">费用明细</p>
          <div className="space-y-2.5 text-sm">
            <Row label="商品金额" value={`¥${goods.toFixed(2)}`} />
            <Row label="代购服务费 (8%)" value={`¥${agentFee.toFixed(2)}`} muted />
            <Row
              label="运费"
              value={shipping === 0 ? '¥0.00' : `¥${shipping.toFixed(2)}`}
              note={shipping === 0 ? '满 ¥299 已免运费' : undefined}
            />
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm text-foreground">合计应付</span>
            <div className="flex items-baseline text-primary">
              <span className="text-sm font-bold">¥</span>
              <span className="text-2xl font-black">{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <p className="mt-3 px-1 text-center text-[11px] leading-relaxed text-muted-foreground">
          提交订单即代表同意《山姆代购服务协议》，代购商品以实际采买为准
        </p>
      </div>

      {/* Bottom pay bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-card px-4 py-2.5 pb-5 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">合计</span>
          <div className="flex items-baseline text-primary">
            <span className="text-sm font-bold">¥</span>
            <span className="text-2xl font-black">{total.toFixed(2)}</span>
          </div>
        </div>
        <button
          type="button"
          className="flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-md active:scale-[0.98]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8.7 2C4.9 2 2 4.6 2 8c0 1.9 1 3.6 2.6 4.7l-.6 1.9 2.2-1.1c.7.2 1.4.3 2.1.3h.6a4.9 4.9 0 0 1-.3-1.7c0-3 2.8-5.3 6.2-5.3h.6C14.9 3.7 12.1 2 8.7 2Zm-2.5 3.4a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Zm4.8 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z" />
            <path d="M22 12.5c0-2.8-2.7-5-6-5s-6 2.2-6 5 2.7 5 6 5c.6 0 1.2-.1 1.8-.3l1.9 1-.5-1.6c1.7-.9 2.8-2.4 2.8-4.1Zm-8-1a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm4 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
          </svg>
          微信支付
        </button>
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  muted,
  note,
}: {
  label: string
  value: string
  muted?: boolean
  note?: string
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">
        {label}
        {muted && <span className="ml-1 text-[11px] text-muted-foreground/70">（含代购费）</span>}
      </span>
      <div className="flex items-center gap-2">
        {note && <span className="text-[11px] text-primary">{note}</span>}
        <span className="font-medium text-foreground">{value}</span>
      </div>
    </div>
  )
}
