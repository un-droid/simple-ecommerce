import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { CART_COOKIE_NAME, findProduct, readCartFromCookie, writeCartCookieValue, upsertCartItem, setCartItemQuantity, emptyCart } from '@/lib/data'
import { CartResponse, PopulatedCartLine } from '@/lib/types'

const buildResponse = async (): Promise<CartResponse> => {
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(CART_COOKIE_NAME)?.value
  const cart = readCartFromCookie(cookieValue)
  const items: PopulatedCartLine[] = cart.items
    .map(line => {
      const product = findProduct(line.productId)
      if (!product) return null
      const lineTotal = product.price * line.quantity
      return { product, quantity: line.quantity, lineTotal }
    })
    .filter(Boolean) as PopulatedCartLine[]
  const subtotal = items.reduce((sum, l) => sum + l.lineTotal, 0)
  const total = subtotal
  const count = items.reduce((sum, l) => sum + l.quantity, 0)
  return { items, subtotal, total, count }
}

export async function GET() {
  return NextResponse.json(await buildResponse())
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { productId?: string, quantity?: number, delta?: number, action?: 'add'|'set'|'clear' }
  const cookieStore = await cookies()
  const cookieValue = cookieStore.get(CART_COOKIE_NAME)?.value
  const cart = readCartFromCookie(cookieValue)

  if (body.action === 'clear') {
    const cleared = emptyCart()
    cookieStore.set(CART_COOKIE_NAME, writeCartCookieValue(cleared), { httpOnly: false, sameSite: 'lax', path: '/' })
    return NextResponse.json(await buildResponse())
  }

  const productId = body.productId
  if (!productId || !findProduct(productId)) {
    return NextResponse.json({ error: 'invalid product' }, { status: 400 })
  }

  let updated = cart
  if (typeof body.delta === 'number') updated = upsertCartItem(cart, productId, Math.floor(body.delta))
  else if (typeof body.quantity === 'number') updated = setCartItemQuantity(cart, productId, Math.floor(body.quantity))
  else updated = upsertCartItem(cart, productId, 1)

  ;(await cookies()).set(CART_COOKIE_NAME, writeCartCookieValue(updated), { httpOnly: false, sameSite: 'lax', path: '/' })
  return NextResponse.json(await buildResponse())
}


