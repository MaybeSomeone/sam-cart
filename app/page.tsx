'use client'

import { useState } from 'react'
import { PhoneFrame } from '@/components/phone-frame'
import { HomeScreen } from '@/components/screens/home-screen'
import { CategoryScreen } from '@/components/screens/category-screen'
import { CartScreen } from '@/components/screens/cart-screen'
import { ProfileScreen } from '@/components/screens/profile-screen'
import { DetailScreen } from '@/components/screens/detail-screen'
import { CheckoutScreen } from '@/components/screens/checkout-screen'
import { BottomTabBar, type MainTab } from '@/components/bottom-tab-bar'
import { products, type Product } from '@/lib/data'

type Stack = 'detail' | 'checkout' | null

export default function Page() {
  const [tab, setTab] = useState<MainTab>('home')
  const [stack, setStack] = useState<Stack>(null)
  const [activeProduct, setActiveProduct] = useState<Product>(products[0])

  const openProduct = (p: Product) => {
    setActiveProduct(p)
    setStack('detail')
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 bg-muted px-4 py-6">
      <header className="text-center">
        <h1 className="text-lg font-black text-secondary">山姆代购小程序 · 高保真原型</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Sam&apos;s Club Agent Shopping · WeChat Mini Program
        </p>
      </header>

      <PhoneFrame>
        {/* Main tab screens */}
        {tab === 'home' && <HomeScreen onOpenProduct={openProduct} />}
        {tab === 'category' && <CategoryScreen onOpenProduct={openProduct} />}
        {tab === 'cart' && <CartScreen onCheckout={() => setStack('checkout')} />}
        {tab === 'profile' && <ProfileScreen />}

        {/* Bottom tab bar (hidden when a screen is pushed) */}
        {stack === null && (
          <BottomTabBar active={tab} onChange={setTab} cartCount={3} />
        )}

        {/* Pushed screens over the tab bar */}
        {stack === 'detail' && (
          <div className="absolute inset-0 z-30 bg-muted">
            <DetailScreen
              product={activeProduct}
              onBack={() => setStack(null)}
              onCart={() => {
                setStack(null)
                setTab('cart')
              }}
            />
          </div>
        )}
        {stack === 'checkout' && (
          <div className="absolute inset-0 z-30 bg-muted">
            <CheckoutScreen onBack={() => setStack(null)} />
          </div>
        )}
      </PhoneFrame>
    </main>
  )
}
