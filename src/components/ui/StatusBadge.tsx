import { STATUS_LABEL } from '../../config/site'
import type { FeatureStatus } from '../../config/site'

const styles: Record<FeatureStatus, string> = {
  concept: 'border-white/15 text-mute bg-white/[0.03]',
  planned: 'border-sky/40 text-sky bg-sky/10',
  'in-development': 'border-electric/50 text-electric bg-electric/10',
}

export function StatusBadge({ status }: { status: FeatureStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {STATUS_LABEL[status]}
    </span>
  )
}
