import Link from 'next/link'

export default function OrderCompletePage() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">order complete</h1>
      <p>thank you for your purchase</p>
      <Link href="/" className="underline">back to shop</Link>
    </div>
  )
}