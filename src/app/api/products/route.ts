import { NextResponse } from 'next/server'
import { PRODUCTS } from '@/lib/data'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({ products: PRODUCTS })
}


