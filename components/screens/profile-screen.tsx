'use client'

import {
  ChevronRight,
  Clock,
  CreditCard,
  Gift,
  Headphones,
  Heart,
  MapPin,
  Package,
  Settings,
  ShieldCheck,
  Ticket,
  Truck,
} from 'lucide-react'
import { StatusBar } from '@/components/status-bar'

const orderTabs = [
  { icon: CreditCard, label: '待付款' },
  { icon: Package, label: '待成团' },
  { icon: Truck, label: '待收货' },
  { icon: Clock, label: '售后' },
]

const tools = [
  { icon: MapPin, label: '收货地址' },
  { icon: Heart, label: '我的收藏' },
  { icon: Ticket, label: '优惠券' },
  { icon: Gift, label: '邀请有礼' },
  { icon: Headphones, label: '联系客服' },
  { icon: Settings, label: '设置' },
]

export function ProfileScreen() {
  return (
    <div className="flex h-full flex-col bg-muted">
      <div className="shrink-0 bg-primary">
        <StatusBar dark />
        {/* User card */}
        <div className="flex items-center gap-3 px-5 pb-6 pt-1">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20 text-2xl font-black text-primary-foreground ring-2 ring-primary-foreground/40">
            王
          </span>
          <div className="flex-1 text-primary-foreground">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">王小明</span>
              <span className="flex items-center gap-0.5 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[11px] font-semibold">
                <ShieldCheck className="h-3 w-3" />
                山姆代购会员
              </span>
            </div>
            <p className="mt-1 text-xs opacity-90">微信号：xiaoming_sz · 已省 ¥1,286</p>
          </div>
          <ChevronRight className="h-5 w-5 text-primary-foreground/80" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Orders */}
        <div className="mx-4 -mt-3 rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-foreground">我的订单</span>
            <button type="button" className="flex items-center text-xs text-muted-foreground">
              全部订单
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {orderTabs.map((o, i) => {
              const Icon = o.icon
              return (
                <button key={o.label} type="button" className="relative flex flex-col items-center gap-1.5 py-1">
                  <Icon className="h-6 w-6 text-secondary" />
                  <span className="text-xs text-foreground">{o.label}</span>
                  {i === 1 && (
                    <span className="absolute right-3 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                      2
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Wallet strip */}
        <div className="mx-4 mt-3 flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
          <Stat label="优惠券" value="6" unit="张" />
          <span className="h-8 w-px bg-border" />
          <Stat label="积分" value="2,480" />
          <span className="h-8 w-px bg-border" />
          <Stat label="余额" value="128.5" unit="元" />
        </div>

        {/* Tools */}
        <div className="mx-4 mt-3 grid grid-cols-3 gap-y-5 rounded-2xl bg-card p-4 shadow-sm">
          {tools.map((t) => {
            const Icon = t.icon
            return (
              <button key={t.label} type="button" className="flex flex-col items-center gap-1.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs text-foreground">{t.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <span className="text-lg font-black text-foreground">
        {value}
        {unit && <span className="ml-0.5 text-xs font-normal text-muted-foreground">{unit}</span>}
      </span>
      <span className="mt-0.5 text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
