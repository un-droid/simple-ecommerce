'use client'

import { useTransition } from 'react'

type Props = {
  productId: string
  className?: string
  label?: string
}

export function AddToCartButton({ productId, className, label }: Props) {
  const [isPending, startTransition] = useTransition()

  const add = () => {
    startTransition(async () => {
      await fetch('/api/cart', { method: 'POST', body: JSON.stringify({ productId }) })
      window.dispatchEvent(new Event('cart:updated'))
    })
  }

  return (
    <button onClick={add} disabled={isPending} className={className || 'px-4 py-2 bg-gray-900 text-white rounded disabled:opacity-50'}>
      {isPending ? 'adding...' : (label || 'add to cart')}
    </button>
  )
}


