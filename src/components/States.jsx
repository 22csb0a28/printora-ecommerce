import { PackageSearch, TriangleAlert } from 'lucide-react'

export function EmptyState({ title, children, action, icon: Icon = PackageSearch }) {
  return (
    <div className="border border-dashed border-ink/20 py-16 px-6 text-center">
      <Icon className="size-10 mx-auto text-ash" strokeWidth={1.5} />
      <h3 className="display text-3xl mt-4">{title}</h3>
      {children && <p className="mt-2 text-ash max-w-md mx-auto">{children}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export function ErrorState({ message = 'Something went wrong while loading. Please refresh and try again.' }) {
  return (
    <div className="flex items-start gap-3 border-l-4 border-ember bg-ember/5 px-5 py-4" role="alert">
      <TriangleAlert className="size-5 text-ember shrink-0 mt-0.5" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
