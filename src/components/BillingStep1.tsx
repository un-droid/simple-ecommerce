'use client'

import { useState, useEffect } from 'react'
import { useBillingQuery, type Plan } from '@/lib/hooks/useBillingQuery'

export function BillingStep1() {
  const { query, setPlan, goToNextStep } = useBillingQuery()
  const [selected, setSelected] = useState<Plan | null>(query.plan || null)

  // update query when selection changes
  useEffect(() => {
    if (selected) {
      setPlan(selected)
    }
  }, [selected, setPlan])

  const onContinue = () => {
    if (!selected) return
    goToNextStep({ plan: selected })
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-600">select number of payments</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setSelected('single')}
          aria-pressed={selected === 'single'}
          className={[
            'border rounded-lg p-4 text-left transition',
            selected === 'single' ? 'ring-2 ring-gray-900 border-gray-900' : 'hover:border-gray-400'
          ].join(' ')}
        >
          <div className="font-medium">single payment</div>
          <div className="text-sm text-gray-600">pay once today</div>
        </button>

        <button
          type="button"
          onClick={() => setSelected('3x')}
          aria-pressed={selected === '3x'}
          className={[
            'border rounded-lg p-4 text-left transition',
            selected === '3x' ? 'ring-2 ring-gray-900 border-gray-900' : 'hover:border-gray-400'
          ].join(' ')}
        >
          <div className="font-medium">3 monthly payments</div>
          <div className="text-sm text-gray-600">split into 3 equal payments</div>
        </button>
      </div>

      <div className="pt-2">
        <button
          onClick={onContinue}
          disabled={!selected}
          className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50"
        >
          continue
        </button>
      </div>
    </div>
  )
}