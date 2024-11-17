import User from '@/model';
import { NextRequest, NextResponse } from 'next/server';
import { connecting } from '@/dataConfig.js';

export async function DELETE(request) {
    // Establish database connection
    await connecting();

    try {
        // Extract user ID from query parameters
        const { searchParams } = new URL(request.url);
        console.log(searchParams)
        const userId = searchParams.get('user');

        
        if (!userId) {
            return NextResponse.json({
                error: "User ID is required to delete a user",
                success: false,
            }, { status: 400 });
        }

        // Attempt to delete the user by ID
        const deletedUser = await User.findByIdAndDelete(userId);

        // If user is not found, return a 404 response
        if (!deletedUser) {
            return NextResponse.json({
                error: "User not found",
                success: false,
            }, { status: 404 });
        }

        // Return a successful response after deletion
        return NextResponse.json({
            message: "User deleted successfully",
            success: true,
        }, { status: 200 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
        // Return an error response if something goes wrong
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
