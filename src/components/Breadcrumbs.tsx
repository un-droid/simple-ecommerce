'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type LabelMap = Record<string, string>

type Props = {
  labels?: LabelMap
  className?: string
}

const defaultLabels: LabelMap = {
  cart: 'cart',
  checkout: 'checkout'
}

const humanize = (segment: string, labels: LabelMap) => {
  const key = segment.toLowerCase()
  if (labels[key]) return labels[key]
  return decodeURIComponent(segment).replace(/-/g, ' ')
}

const Chevron = () => (
  <svg aria-hidden viewBox="0 0 20 20" className="w-3.5 h-3.5 text-gray-400">
    <path fill="currentColor" d="M7.293 14.707a1 1 0 0 1 0-1.414L9.586 11 7.293 8.707a1 1 0 1 1 1.414-1.414l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414 0"/>
  </svg>
)

const HomeIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" className="w-4 h-4 text-gray-500">
    <path fill="currentColor" d="M12 3.172 3.172 12H5v8a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-8h1.828L12 3.172z"/>
  </svg>
)

export function Breadcrumbs({ labels = defaultLabels, className }: Props) {
  const pathname = usePathname() || '/'
  const segments = pathname.split('/').filter(Boolean)

  let hrefAccumulator = ''

  return (
    <nav aria-label="breadcrumbs" className={`mb-4 ${className || ''}`}>
      <ol className="flex items-center gap-1.5 flex-wrap rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
        <li className="flex items-center gap-1.5">
          <HomeIcon />
          <Link href="/" className="text-gray-600 hover:text-gray-900 hover:underline">home</Link>
        </li>
        {segments.map((segment, index) => {
          hrefAccumulator += `/${segment}`
          const isLast = index === segments.length - 1
          const label = humanize(segment, labels)
          return (
            <li key={hrefAccumulator} className="flex items-center gap-1.5">
              <Chevron />
              {isLast ? (
                <span className="text-gray-900" aria-current="page">{label}</span>
              ) : (
                <Link href={hrefAccumulator} className="text-gray-600 hover:text-gray-900 hover:underline">{label}</Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}


