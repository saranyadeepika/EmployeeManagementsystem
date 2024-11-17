import adminTable from '@/AdminModel';
import { NextRequest, NextResponse } from 'next/server';
import { connecting } from '@/dataConfig.js';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    // Establish database connection
    await connecting();

    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email'); // Retrieve email from URL parameters
        const pass = searchParams.get('password'); // Retrieve password from URL parameters

        // Find user by email
        const user = await adminTable.findOne({ email });

        if (!user) {
            // Return 404 if user is not found
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (user.password !== pass) {
            // Return error if password does not match
            return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
        }

        // User and password are valid; proceed to generate token
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email
        };
        const secret = process.env.SECRET;
        const options = { expiresIn: '1h' };

        // Generate token
        const token = jwt.sign(tokenData, secret, options);

        const response = NextResponse.json({
            message: "User authenticated successfully",
            success: true,
            user
        });

        // Set the token in cookies
        response.cookies.set('adminToken', token, {
            httpOnly: true,
            maxAge: 60 * 60, // 1 hour
            path: '/',
        });

        return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
