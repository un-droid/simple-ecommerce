import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PRODUCTS } from '@/lib/data'
import { AddToCartButton } from '@/components/AddToCartButton'

const formatCurrency = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ id: p.id }))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = PRODUCTS.find(p => p.id === id)
  if (!product) return notFound()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      <div>
        {product.image ? (
          <Image src={product.image} alt={product.name} width={900} height={700} className="w-full h-auto rounded" />
        ) : null}
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="text-xl font-medium">{formatCurrency(product.price)}</div>
        <p className="text-gray-600">{product.description || 'no description provided'}</p>
        <div className="flex items-center gap-3 pt-2">
          <AddToCartButton productId={product.id} />
          <Link href="/cart" className="px-4 py-2 border rounded">go to cart</Link>
        </div>
      </div>
    </div>
  )
}


