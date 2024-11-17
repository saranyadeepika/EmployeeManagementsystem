import User from '@/model.js';
import {  NextResponse } from 'next/server';
import { connecting } from '@/dataConfig';

export async function GET() {
    
    await connecting();
    
    try {
        // Retrieve all users from the database
        const users = await User.find(); // Fetch all documents in the User collection

        // Return a successful response with the users
        return NextResponse.json({
            message: "Users retrieved successfully",
            success: true,
            users // Send the retrieved users as part of the response
        }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
        // Return an error response if something goes wrong
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
