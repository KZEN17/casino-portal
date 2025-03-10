import { NextResponse, NextRequest } from 'next/server';
import { MARKETS } from './constants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get market from URL path (en or ca)
  const pathnameMarket = MARKETS.find(market => pathname.startsWith(`/${market}`));
  
  // If pathname doesn't include a market, let it pass (could be login or other public pages)
  if (!pathnameMarket) {
    return NextResponse.next();
  }
  
  // Check if user is logged in
  const user = request.cookies.get('user')?.value;
  
  if (!user) {
    // If user is not logged in and trying to access a market route, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    // Parse user data from cookie
    const userData = JSON.parse(decodeURIComponent(user));
    const userMarket = userData.country;
    
    // If user is trying to access a market different from their own, redirect
    if (pathnameMarket !== userMarket) {
      // Replace the current market with the user's market in the URL
      const redirectUrl = pathname.replace(`/${pathnameMarket}`, `/${userMarket}`);
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  } catch (error) {
    // If user cookie is invalid, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

// Define which routes this middleware should run on
export const config = {
  matcher: [
    // Apply to all routes except api, _next, and static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};