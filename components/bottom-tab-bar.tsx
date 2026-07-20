'use client'

import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react'

export type MainTab = 'home' | 'category' | 'cart' | 'profile'

const items: { key: MainTab; label: string; icon: typeof Home }[] = [
  { key: 'home', label: '首页', icon: Home },
  { key: 'category', label: '分类', icon: LayoutGrid },
  { key: 'cart', label: '购物车', icon: ShoppingCart },
  { key: 'profile', label: '我的', icon: User },
]

export function BottomTabBar({
  active,
  onChange,
  cartCount = 0,
}: {
  active: MainTab
  onChange: (t: MainTab) => void
  cartCount?: number
}) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 flex items-stretch border-t border-border bg-card pb-5 shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = active === item.key
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className="relative flex flex-1 flex-col items-center gap-0.5 pt-2 pb-1"
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="relative">
              <Icon
                className={`h-6 w-6 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
                strokeWidth={isActive ? 2.4 : 2}
              />
              {item.key === 'cart' && cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </span>
            <span
              className={`text-[11px] font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
