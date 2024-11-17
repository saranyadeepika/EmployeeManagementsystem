
import {  NextResponse } from 'next/server';
import { connecting } from '@/dataConfig.js';



export async function GET() {
    connecting();
    try {

        const response = NextResponse.json({ message: 'Token cleared' });

        response.cookies.set('adminToken', '', {
            httpOnly: true, 
            maxAge: 0, // Set maxAge to 0 to immediately expire the cookie
            path: '/', // The cookie is available on the entire site
        });

        return response;
    
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
