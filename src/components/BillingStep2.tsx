'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useBillingQuery, type PaymentMethod } from '@/lib/hooks/useBillingQuery'

export function BillingStep2() {
  const router = useRouter()
  const { query, setMethod } = useBillingQuery()
  const [method, setMethodState] = useState<PaymentMethod | null>(query.method || null)

  // update query when method selection changes
  useEffect(() => {
    if (method) {
      setMethod(method)
    }
  }, [method, setMethod])

  const onComplete = () => {
    if (!method) return
    router.push('/order-complete')
  }

  const handleMethodChange = (newMethod: PaymentMethod) => {
    setMethodState(newMethod)
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        {query.plan === '3x' ? 'plan: 3 monthly payments' : 'plan: single payment'}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleMethodChange('visa')}
          aria-pressed={method === 'visa'}
          className={[
            'border rounded-lg p-4 text-left transition flex items-center gap-3',
            method === 'visa' ? 'ring-2 ring-gray-900 border-gray-900' : 'hover:border-gray-400'
          ].join(' ')}
        >
          <span className="inline-block w-10 h-6 bg-blue-600 text-white text-xs rounded flex items-center justify-center">visa</span>
          <div>
            <div className="font-medium">visa</div>
            <div className="text-sm text-gray-600">**** **** **** 4242</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleMethodChange('paypal')}
          aria-pressed={method === 'paypal'}
          className={[
            'border rounded-lg p-4 text-left transition flex items-center gap-3',
            method === 'paypal' ? 'ring-2 ring-gray-900 border-gray-900' : 'hover:border-gray-400'
          ].join(' ')}
        >
          <span className="inline-block w-10 h-6 bg-yellow-400 text-black text-xs rounded flex items-center justify-center">pp</span>
          <div>
            <div className="font-medium">paypal</div>
            <div className="text-sm text-gray-600">pay with paypal</div>
          </div>
        </button>
      </div>

      <div className="pt-2">
        <button
          onClick={onComplete}
          disabled={!method}
          className="px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50"
        >
          complete payment
        </button>
      </div>
    </div>
  )
}