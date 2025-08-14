import { Product, Cart, CartLine } from './types'

export const PRODUCTS: Product[] = [
  {
    id: 'sku-1',
    name: 'classic tee',
    price: 1999,
    image: 'https://picsum.photos/id/100/800/600',
    description: 'soft cotton tee with a timeless fit'
  },
  {
    id: 'sku-2',
    name: 'hoodie',
    price: 4999,
    image: 'https://picsum.photos/id/101/800/600',
    description: 'cozy fleece-lined hoodie for everyday wear'
  },
  {
    id: 'sku-3',
    name: 'cap',
    price: 1499,
    image: 'https://picsum.photos/id/102/800/600',
    description: 'adjustable cap, breathable and light'
  }
]

export const findProduct = (id: string) => PRODUCTS.find(p => p.id === id)

const CART_COOKIE = 'cart'

export const readCartFromCookie = (cookieHeader: string | null | undefined): Cart => {
  if (!cookieHeader) return { items: [] }
  try {
    const raw = decodeURIComponent(cookieHeader)
    const parsed = JSON.parse(raw) as Cart
    if (!parsed || !Array.isArray(parsed.items)) return { items: [] }
    return {
      items: parsed.items
        .filter(i => typeof i?.productId === 'string' && Number.isFinite(i?.quantity))
        .map(i => ({ productId: i.productId, quantity: Math.max(1, Math.floor(i.quantity)) }))
    }
  } catch {
    return { items: [] }
  }
}

export const writeCartCookieValue = (cart: Cart) => encodeURIComponent(JSON.stringify(cart))

export const upsertCartItem = (cart: Cart, productId: string, delta: number): Cart => {
  const items = [...cart.items]
  const idx = items.findIndex(i => i.productId === productId)
  if (idx === -1) {
    if (delta <= 0) return cart
    items.push({ productId, quantity: delta })
  } else {
    items[idx] = { ...items[idx], quantity: items[idx].quantity + delta }
    if (items[idx].quantity <= 0) items.splice(idx, 1)
  }
  return { items }
}

export const setCartItemQuantity = (cart: Cart, productId: string, quantity: number): Cart => {
  const q = Math.max(0, Math.floor(quantity))
  const items = [...cart.items]
  const idx = items.findIndex(i => i.productId === productId)
  if (q === 0) {
    if (idx !== -1) items.splice(idx, 1)
    return { items }
  }
  if (idx === -1) items.push({ productId, quantity: q })
  else items[idx] = { ...items[idx], quantity: q }
  return { items }
}

export const emptyCart = (): Cart => ({ items: [] })

export const CART_COOKIE_NAME = CART_COOKIE


