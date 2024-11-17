import { NextResponse } from "next/server";

import User from "@/model";
import { connecting } from "@/dataConfig";
export async function POST(request) {
    try {
        connecting();
        const { firstName, lastName, email } = await request.json();
        console.log(firstName, lastName, email); // Log to ensure the data is correct

        // Ensure email exists in the database
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Create and save a new user
        const newUser = new User({ firstName, lastName, email });
        const savedUser = await newUser.save();

        return NextResponse.json(
            {
                message: 'User registered successfully',
                savedUser,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error during user registration:', error); // Log detailed error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
