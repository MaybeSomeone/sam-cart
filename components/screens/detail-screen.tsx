'use client'

import { useEffect, useState } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  Clock,
  Headphones,
  Share2,
  ShieldCheck,
  ShoppingCart,
  UserPlus,
} from 'lucide-react'
import type { Product } from '@/lib/data'
import { StatusBar } from '@/components/status-bar'

const specs = ['原味 1000g', '抹茶味 1000g', '巧克力味 1000g']

function useCountdown(initial: number) {
  const [left, setLeft] = useState(initial)
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])
  const h = String(Math.floor(left / 3600)).padStart(2, '0')
  const m = String(Math.floor((left % 3600) / 60)).padStart(2, '0')
  const s = String(left % 60).padStart(2, '0')
  return [h, m, s]
}

export function DetailScreen({
  product,
  onBack,
  onCart,
}: {
  product: Product
  onBack?: () => void
  onCart?: () => void
}) {
  const [spec, setSpec] = useState(0)
  const [rulesOpen, setRulesOpen] = useState(false)
  const [h, m, s] = useCountdown(45 * 60 + 20)
  const joined = 3
  const total = 6

  return (
    <div className="flex h-full flex-col bg-muted">
      {/* Header over image */}
      <div className="relative shrink-0">
        <div className="relative aspect-square w-full bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.title}
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-secondary/90 px-2.5 py-1 text-[11px] font-medium text-secondary-foreground backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" />
            山姆 100% 正品保障
          </span>
          <span className="absolute bottom-3 right-3 rounded-full bg-foreground/40 px-2 py-0.5 text-[11px] text-primary-foreground backdrop-blur">
            1 / 5
          </span>
        </div>
        {/* Top controls */}
        <div className="absolute inset-x-0 top-0">
          <StatusBar />
          <div className="flex items-center justify-between px-4 py-1">
            <button
              type="button"
              onClick={onBack}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-foreground shadow-sm backdrop-blur"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-foreground shadow-sm backdrop-blur"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll content */}
      <div className="-mt-3 flex-1 overflow-y-auto rounded-t-2xl bg-muted pb-24">
        {/* Price block */}
        <div className="rounded-t-2xl bg-card px-4 py-3">
          <div className="flex items-end gap-2">
            <div className="flex items-baseline text-primary">
              <span className="text-sm font-bold">¥</span>
              <span className="text-3xl font-black">{product.price}</span>
            </div>
            <span className="mb-1 text-sm text-muted-foreground line-through">
              ¥{product.originalPrice}
            </span>
            <span className="mb-1 rounded-md bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-accent-foreground">
              拼单价
            </span>
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            含 8% 代购服务费 · 运费另计
          </p>
          <h1 className="mt-2 text-base font-bold leading-snug text-foreground text-pretty">
            Member&apos;s Mark 瑞士卷蛋糕（{product.title.includes('瑞士') ? '原味' : '经典'}）
          </h1>
        </div>

        {/* Group buy status */}
        <div className="mx-4 mt-3 overflow-hidden rounded-2xl border-2 border-primary/20 bg-card">
          <div className="flex items-center justify-between bg-primary px-4 py-2 text-primary-foreground">
            <span className="text-sm font-bold">🔥 拼单进行中</span>
            <div className="flex items-center gap-1 text-sm font-semibold">
              <Clock className="h-4 w-4" />
              <span className="tabular-nums">
                {h}:{m}:{s}
              </span>
              <span className="text-xs opacity-90">后结束</span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">
                已拼 <span className="text-primary">{joined}</span> / {total} 人
              </span>
              <span className="text-xs text-muted-foreground">还差 {total - joined} 人成团</span>
            </div>
            {/* progress */}
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(joined / total) * 100}%` }}
              />
            </div>
            {/* avatars */}
            <div className="mt-3 flex items-center gap-2">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                    i < joined
                      ? 'bg-secondary text-secondary-foreground'
                      : 'border-2 border-dashed border-primary/40 text-primary'
                  }`}
                >
                  {i < joined ? `U${i + 1}` : '+'}
                </span>
              ))}
              <span className="ml-auto text-xs text-muted-foreground">
                单独购买 ¥{product.originalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Spec selector */}
        <div className="mx-4 mt-3 rounded-2xl bg-card p-4">
          <p className="text-sm font-semibold text-foreground">规格 / 口味</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {specs.map((sp, i) => (
              <button
                key={sp}
                type="button"
                onClick={() => setSpec(i)}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                  spec === i
                    ? 'border-primary bg-accent font-semibold text-primary'
                    : 'border-border bg-card text-foreground'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Collapsible rules */}
        <div className="mx-4 mt-3 rounded-2xl bg-card">
          <button
            type="button"
            onClick={() => setRulesOpen((v) => !v)}
            className="flex w-full items-center justify-between p-4"
          >
            <span className="text-sm font-semibold text-foreground">代购规则说明</span>
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform ${
                rulesOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {rulesOpen && (
            <div className="space-y-2.5 px-4 pb-4 text-[13px] leading-relaxed text-muted-foreground">
              <p>· 代购服务费为商品金额的 8%，已包含在拼单价内。</p>
              <p>· 拼单成功后 48 小时内完成代购采买并发货。</p>
              <p>· 满 ¥299 免运费，未满收取 ¥15 冷链运费。</p>
              <p>· 未成团自动全额退款，原路退回至微信支付。</p>
              <p>· 生鲜商品签收后如有质量问题，24 小时内可申请退款。</p>
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t border-border bg-card px-3 py-2.5 pb-5 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
        <button
          type="button"
          className="flex flex-col items-center gap-0.5 px-1 text-muted-foreground"
        >
          <Headphones className="h-5 w-5" />
          <span className="text-[10px]">客服</span>
        </button>
        <button
          type="button"
          onClick={onCart}
          className="flex flex-col items-center gap-0.5 px-1 text-muted-foreground"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-[10px]">购物车</span>
        </button>
        <button
          type="button"
          className="ml-1 h-11 flex-1 rounded-full border-2 border-primary bg-card text-sm font-bold text-primary active:scale-[0.98]"
        >
          加入购物车
        </button>
        <button
          type="button"
          className="flex h-11 flex-[1.4] items-center justify-center gap-1.5 rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md active:scale-[0.98]"
        >
          <UserPlus className="h-4 w-4" />
          立即参与拼单
        </button>
      </div>
    </div>
  )
}
