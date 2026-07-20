'use client'

import { useState } from 'react'
import { PhoneFrame } from '@/components/phone-frame'
import { HomeScreen } from '@/components/screens/home-screen'
import { DetailScreen } from '@/components/screens/detail-screen'
import { CheckoutScreen } from '@/components/screens/checkout-screen'
import { products, type Product } from '@/lib/data'

const tabs = [
  { key: 'home', label: '首页' },
  { key: 'detail', label: '商品详情' },
  { key: 'checkout', label: '确认订单' },
] as const

type TabKey = (typeof tabs)[number]['key']

export default function Page() {
  const [tab, setTab] = useState<TabKey>('home')
  const [activeProduct, setActiveProduct] = useState<Product>(products[0])

  const openProduct = (p: Product) => {
    setActiveProduct(p)
    setTab('detail')
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 bg-muted px-4 py-6">
      <header className="text-center">
        <h1 className="text-lg font-black text-secondary">山姆代购小程序 · 高保真原型</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Sam&apos;s Club Agent Shopping · WeChat Mini Program
        </p>
      </header>

      {/* Segmented tab switcher */}
      <div className="flex w-full max-w-[393px] gap-1 rounded-full bg-card p-1 shadow-sm">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              tab === t.key
                ? 'bg-primary text-primary-foreground shadow'
                : 'text-muted-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <PhoneFrame>
        {tab === 'home' && <HomeScreen onOpenProduct={openProduct} />}
        {tab === 'detail' && <DetailScreen product={activeProduct} />}
        {tab === 'checkout' && <CheckoutScreen />}
      </PhoneFrame>
    </main>
  )
}
