import { Sparkle } from 'lucide-react'
import { useSettings } from './SettingsContext.jsx'

export default function AnnouncementBar() {
  const { announcements } = useSettings()
  if (!announcements?.length) return <div className="h-9 bg-volt" />
  const items = [...announcements, ...announcements]
  return (
    <div className="bg-volt text-ink h-9 overflow-hidden flex items-center" role="region" aria-label="Announcements">
      <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {items.map((text, i) => (
          <span key={i} className="flex items-center gap-6 px-6 text-[12px] font-bold uppercase tracking-[0.14em]" aria-hidden={i >= announcements.length}>
            {text}
            <Sparkle className="size-3" />
          </span>
        ))}
      </div>
    </div>
  )
}
