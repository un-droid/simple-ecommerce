'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTransition } from 'react'

type Props = {
  id: string
  name: string
  price: number
  image?: string
  description?: string
}

const formatCurrency = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)

export function ProductCard({ id, name, price, image, description }: Props) {
  const [isPending, startTransition] = useTransition()

  const add = async () => {
    startTransition(async () => {
      await fetch('/api/cart', { method: 'POST', body: JSON.stringify({ productId: id }) })
      window.dispatchEvent(new Event('cart:updated'))
    })
  }

  return (
    <li className="border rounded-lg overflow-hidden flex flex-col">
      <Link href={`/products/${id}`} className="block">
        {image ? (
          <Image src={image} alt={name} width={600} height={400} className="w-full h-48 object-cover" />
        ) : null}
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <Link href={`/products/${id}`} className="font-medium text-lg hover:underline">{name}</Link>
        <div className="text-gray-600 text-sm mb-2">{description}</div>
        <div className="mt-auto flex items-center justify-between">
          <div className="font-semibold">{formatCurrency(price)}</div>
          <button onClick={add} disabled={isPending} className="px-3 py-1.5 bg-gray-900 text-white rounded disabled:opacity-50">
            {isPending ? 'adding...' : 'add to cart'}
          </button>
        </div>
      </div>
    </li>
  )
}


