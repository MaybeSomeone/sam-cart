export function StatusBar({ dark = false }: { dark?: boolean }) {
  const color = dark ? 'text-primary-foreground' : 'text-foreground'
  return (
    <div
      className={`flex h-11 shrink-0 items-center justify-between px-6 pt-1 text-sm font-semibold ${color}`}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        {/* signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
          <rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor" />
          <rect x="5" y="5" width="3" height="7" rx="1" fill="currentColor" />
          <rect x="10" y="2.5" width="3" height="9.5" rx="1" fill="currentColor" />
          <rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor" />
        </svg>
        {/* wifi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
          <path
            d="M8.5 11.5 0.5 3.5a11 11 0 0 1 16 0l-8 8Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
        {/* battery */}
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none" aria-hidden="true">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="12"
            rx="3"
            stroke="currentColor"
            opacity="0.4"
          />
          <rect x="2" y="2" width="17" height="9" rx="1.5" fill="currentColor" />
          <rect x="24" y="4" width="1.5" height="5" rx="0.75" fill="currentColor" opacity="0.6" />
        </svg>
      </div>
    </div>
  )
}
