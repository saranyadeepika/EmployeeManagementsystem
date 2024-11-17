import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = request.cookies.get('adminToken')?.value || '';
    const path = request.nextUrl.pathname;
    
    // Check if the path is public
    const isPublic = path === '/login' || path === '/signup' || path === '/';

    // Redirect to profile if accessing a public route while authenticated
    if (isPublic && token) {
        return NextResponse.redirect(new URL('/adminFinal', request.url));
    }

    // Redirect to login if accessing a protected route without a token
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If none of the above conditions are met, allow the request to continue
    return NextResponse.next(); 
}

// Configuration for which paths to apply this middleware
export const config = {
    matcher: ['/', '/signup', '/login', '/adminFinal'],
};
