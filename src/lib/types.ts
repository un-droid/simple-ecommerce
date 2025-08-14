export type Product = {
  id: string
  name: string
  price: number
  image?: string
  description?: string
}

export type CartLine = {
  productId: string
  quantity: number
}

export type Cart = {
  items: CartLine[]
}

export type PopulatedCartLine = {
  product: Product
  quantity: number
  lineTotal: number
}

export type CartResponse = {
  items: PopulatedCartLine[]
  subtotal: number
  total: number
  count: number
}


