import type { ReactNode } from 'react'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center p-0 md:p-6">
      <div className="relative h-[852px] w-full max-w-[393px] overflow-hidden bg-background shadow-2xl md:rounded-[44px] md:border-[10px] md:border-foreground/90">
        {/* Dynamic island */}
        <div className="pointer-events-none absolute left-1/2 top-2 z-50 hidden h-7 w-28 -translate-x-1/2 rounded-full bg-foreground md:block" />
        <div className="flex h-full flex-col">{children}</div>
      </div>
    </div>
  )
}
