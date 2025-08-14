
import { BillingWizard } from '@/components/BillingWizard'

type Props = {
  searchParams: { step?: string }
}

export default function CheckoutPage({ searchParams }: Props) {
  const step = searchParams.step === '2' ? 2 : 1

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">checkout</h1>
      <BillingWizard step={step} />
    </div>
  )
}