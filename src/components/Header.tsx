'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
  const [count, setCount] = useState(0)

  const refresh = async () => {
    try {
      const res = await fetch('/api/cart', { cache: 'no-store' })
      const data = await res.json()
      setCount(data.count || 0)
    } catch {}
  }

  useEffect(() => {
    refresh()
    const handler = () => refresh()
    window.addEventListener('cart:updated', handler)
    return () => window.removeEventListener('cart:updated', handler)
  }, [])

  return (
    <header className="flex items-center justify-between py-4">
      <Link href="/" className="text-xl font-semibold">simple shop</Link>
      <Link href="/cart" className="relative inline-flex items-center gap-2 underline">
        cart
        <span className="inline-flex items-center justify-center text-xs bg-gray-900 text-white rounded-full w-5 h-5">{count}</span>
      </Link>
    </header>
  )
}


