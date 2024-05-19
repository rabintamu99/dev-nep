import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  
  // Check if token is null or undefined
  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
  }

  // Proceed with the request if the token exists
  return NextResponse.next()
}

// Configure matching paths
export const config = {
  matcher: ['/c/:path*/submit', '/c/create', '/settings', '/article/create'],
}
