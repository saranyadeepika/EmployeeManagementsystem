import User from '../../../model';
import {  NextResponse } from 'next/server';
import { connecting } from '@/dataConfig.js';

export async function PUT(request) {
    connecting();
    try {
        const { id, firstName, lastName, email } = await request.json();

        // Check if the user ID is provided
        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Find the existing user by ID
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if the email is already in use by another user (if the email has changed)
        if (email && email !== existingUser.email) {
            const userWithEmail = await User.findOne({ email });
            if (userWithEmail) {
                return NextResponse.json({ error: "Email is already in use" }, { status: 400 });
            }
        }

        // Update the user fields
        existingUser.firstName = firstName || existingUser.firstName;
        existingUser.lastName = lastName || existingUser.lastName;
        existingUser.email = email || existingUser.email;

        // Save the updated user
        const updatedUser = await existingUser.save();

        // Respond with success
        return NextResponse.json({
            message: "User updated successfully",
            success: true,
            updatedUser
        }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
