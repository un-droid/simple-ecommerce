'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useTransition } from 'react'

type CartData = {
  items: { product: { id: string, name: string, price: number, image?: string }, quantity: number, lineTotal: number }[],
  subtotal: number,
  total: number,
  count: number
}

const formatCurrency = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)

export function CartClient() {
  const [cart, setCart] = useState<CartData | null>(null)
  const [isPending, startTransition] = useTransition()

  const load = async () => {
    const res = await fetch('/api/cart', { cache: 'no-store' })
    setCart(await res.json())
  }

  const changeQty = (id: string, quantity: number) => {
    startTransition(async () => {
      await fetch('/api/cart', { method: 'POST', body: JSON.stringify({ productId: id, quantity }) })
      await load()
      window.dispatchEvent(new Event('cart:updated'))
    })
  }

  const clear = () => {
    startTransition(async () => {
      await fetch('/api/cart', { method: 'POST', body: JSON.stringify({ action: 'clear' }) })
      await load()
      window.dispatchEvent(new Event('cart:updated'))
    })
  }

  useEffect(() => {
    load()
  }, [])

  if (!cart) return <div className="p-6">loading...</div>

  if (cart.items.length === 0) {
    return (
      <div className="space-y-4 p-6">
        <p>your cart is empty</p>
        <Link href="/" className="underline">continue shopping</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <ul className="divide-y">
        {cart.items.map(line => (
          <li key={line.product.id} className="py-4 flex items-center gap-4">
            {line.product.image ? (
              <Image src={line.product.image} alt={line.product.name} width={64} height={64} className="rounded object-cover" />
            ) : null}
            <div className="flex-1">
              <div className="font-medium">{line.product.name}</div>
              <div className="text-sm text-gray-500">{formatCurrency(line.product.price)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => changeQty(line.product.id, Math.max(0, line.quantity - 1))} className="px-2 py-1 border rounded">-</button>
              <input
                className="w-14 text-center border rounded py-1"
                type="number"
                min={0}
                value={line.quantity}
                onChange={e => changeQty(line.product.id, Math.max(0, Number(e.target.value)))}
              />
              <button onClick={() => changeQty(line.product.id, line.quantity + 1)} className="px-2 py-1 border rounded">+</button>
            </div>
            <div className="font-medium w-24 text-right">{formatCurrency(line.lineTotal)}</div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-lg">subtotal</div>
        <div className="text-lg font-semibold">{formatCurrency(cart.subtotal)}</div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <button onClick={clear} disabled={isPending} className="px-4 py-2 border rounded disabled:opacity-50">clear cart</button>
        <Link href="/checkout" className="px-4 py-2 bg-gray-900 text-white rounded">checkout</Link>
      </div>
    </div>
  )
}


