'use client'

import { BillingStep1 } from './BillingStep1'
import { BillingStep2 } from './BillingStep2'

type Props = {
  step?: 1 | 2
}

export function BillingWizard({ step = 1 }: Props) {
  if (step === 2) return <BillingStep2 />
  return <BillingStep1 />
}