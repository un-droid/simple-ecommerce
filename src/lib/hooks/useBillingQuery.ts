'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export type BillingStep = 1 | 2
export type Plan = 'single' | '3x'
export type PaymentMethod = 'visa' | 'paypal'

export interface BillingQuery {
  step: BillingStep
  plan?: Plan
  method?: PaymentMethod
}

export function useBillingQuery() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // read current query state
  const query: BillingQuery = {
    step: searchParams.get('step') === '2' ? 2 : 1,
    plan: searchParams.get('plan') as Plan | undefined,
    method: searchParams.get('method') as PaymentMethod | undefined,
  }

  // update query params while preserving existing ones
  const updateQuery = useCallback((updates: Partial<BillingQuery>) => {
    const current = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        current.set(key, value.toString())
      } else {
        current.delete(key)
      }
    })

    router.push(`/checkout?${current.toString()}`)
  }, [router, searchParams])

  // convenience methods for common operations
  const goToStep = useCallback((step: BillingStep) => {
    updateQuery({ step })
  }, [updateQuery])

  const setPlan = useCallback((plan: Plan) => {
    updateQuery({ plan })
  }, [updateQuery])

  const setMethod = useCallback((method: PaymentMethod) => {
    updateQuery({ method })
  }, [updateQuery])

  const goToNextStep = useCallback((additionalParams?: Partial<BillingQuery>) => {
    const nextStep = query.step === 1 ? 2 : query.step
    updateQuery({ step: nextStep, ...additionalParams })
  }, [query.step, updateQuery])

  return {
    query,
    updateQuery,
    goToStep,
    setPlan,
    setMethod,
    goToNextStep,
  }
}