import Image from 'next/image'
import Link from 'next/link'
import { headers } from 'next/headers'
import { ProductCard } from '@/components/ProductCard'

type Product = { id: string, name: string, price: number, image?: string, description?: string }

const formatCurrency = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)

async function fetchProducts(): Promise<Product[]> {
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host')
  const proto = h.get('x-forwarded-proto') ?? 'http'
  const base = `${proto}://${host}`
  const res = await fetch(`${base}/api/products`, { cache: 'no-store' })
  const data = await res.json()
  return data.products as Product[]
}

async function addToCart(formData: FormData) {
  'use server'
  const id = String(formData.get('id'))
  const h = await headers()
  const host = h.get('x-forwarded-host') ?? h.get('host')
  const proto = h.get('x-forwarded-proto') ?? 'http'
  const base = `${proto}://${host}`
  await fetch(`${base}/api/cart`, { method: 'POST', body: JSON.stringify({ productId: id }) })
}

export default async function Home() {
  const products = await fetchProducts()
  return (
    <div className="pb-10">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p.id} {...p} />
        ))}
      </ul>
    </div>
  )
}
