'use client'

import { useEffect, useState } from 'react'
import { Bell, ChevronDown, Flame, Gift, MapPin, Search, Sparkles, Users } from 'lucide-react'
import { products, quickLinks, type Product } from '@/lib/data'
import { ProductCard } from '@/components/product-card'
import { StatusBar } from '@/components/status-bar'

const banners = [
  { title: '周末拼单狂欢', sub: '热门好物低至 5 折 · 满299包邮', tag: '限时拼团' },
  { title: '新会员专享', sub: '首单立减 ¥20 · 代购费 5 折', tag: '新人福利' },
]

const quickIcons = [Flame, Sparkles, Users, Gift]

export function HomeScreen({ onOpenProduct }: { onOpenProduct: (p: Product) => void }) {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % banners.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex h-full flex-col bg-muted">
      {/* Fixed top area */}
      <div className="shrink-0 bg-primary">
        <StatusBar dark />
        <div className="flex items-center gap-3 px-4 pb-3">
          <button type="button" className="flex items-center gap-0.5 text-primary-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-semibold">深圳·南山</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-80" />
          </button>
          <div className="relative ml-auto">
            <Bell className="h-6 w-6 text-primary-foreground" />
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-card px-1 text-[10px] font-bold text-primary">
              3
            </span>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="flex h-10 items-center gap-2 rounded-full bg-card px-4 shadow-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">搜索山姆好物...</span>
            <span className="ml-auto rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              搜索
            </span>
          </div>
        </div>
      </div>

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Banner */}
        <div className="px-4 pt-3">
          <div className="relative h-36 overflow-hidden rounded-2xl shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/banner-groupbuy.png"
              alt="拼团促销"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 to-secondary/10" />
            <div className="relative flex h-full flex-col justify-center gap-1 px-5 text-secondary-foreground">
              <span className="w-fit rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold">
                {banners[slide].tag}
              </span>
              <h2 className="text-xl font-black text-balance">{banners[slide].title}</h2>
              <p className="text-xs opacity-90">{banners[slide].sub}</p>
            </div>
            <div className="absolute bottom-3 right-4 flex gap-1">
              {banners.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === slide ? 'w-4 bg-primary-foreground' : 'w-1.5 bg-primary-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick grid */}
        <div className="mx-4 mt-3 grid grid-cols-4 gap-2 rounded-2xl bg-card p-3 shadow-sm">
          {quickLinks.map((q, i) => {
            const Icon = quickIcons[i]
            return (
              <button
                key={q.key}
                type="button"
                className="flex flex-col items-center gap-1.5 py-1"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${q.color}1a`, color: q.color }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs text-foreground">{q.label}</span>
              </button>
            )
          })}
        </div>

        {/* Feed heading */}
        <div className="mt-4 flex items-center gap-2 px-4">
          <span className="h-4 w-1 rounded-full bg-primary" />
          <h3 className="text-base font-bold text-foreground">热门拼单</h3>
          <span className="text-xs text-muted-foreground">正品保障 · 顺丰直邮</span>
        </div>

        {/* Waterfall */}
        <div className="mt-3 flex gap-2.5 px-4">
          <div className="flex w-1/2 flex-col gap-2.5">
            {products
              .filter((_, i) => i % 2 === 0)
              .map((p) => (
                <ProductCard key={p.id} product={p} onOpen={() => onOpenProduct(p)} />
              ))}
          </div>
          <div className="flex w-1/2 flex-col gap-2.5">
            {products
              .filter((_, i) => i % 2 === 1)
              .map((p) => (
                <ProductCard key={p.id} product={p} onOpen={() => onOpenProduct(p)} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
