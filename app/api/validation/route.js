import { NextRequest, NextResponse } from 'next/server';
import adminTable from '@/AdminModel';
import nodemailer from 'nodemailer';
import { randomPass } from '@/GenratePass';
import { connecting } from '@/dataConfig';

// Set up nodemailer transporter (replace with environment variables in production)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saranyadeepikamygapula@gmail.com',
    pass: 'qfnd vxwt dpid ukwv', // Use environment variables for sensitive data
  },
});

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const email = searchParams.get('email') ?? undefined;

  try {
    await connecting();
    
    // Check if the provided email exists in the adminTable database
    const adminRecord = await adminTable.findOne({ email });

    if (!adminRecord) {
      // If email does not exist in the database, return an error response
      return NextResponse.json({ success: false, message: 'Email not found in database' }, { status: 404 });
    }

    const pass = randomPass();

    // Update the password in the database
    await adminTable.updateOne({ email }, { $set: { password: pass } });

    console.log('Message sent');
    await transporter.sendMail({
      from: 'saranyadeepikamygapula@gmail.com',
      to: email,
      subject: 'Account Approved',
      html: `<p>Hello,</p>
             <p>You can now log in using the following password:</p>
             <p><strong>Password:</strong> ${pass}</p>
             <p>You can <a href="http://localhost:3000/login">log in here</a>.</p>`,
    });

    return NextResponse.json({ success: true, message: 'Employee approved, password set, and notified', password: pass });

  } catch (error) {
    console.error('Error in approval process:', error);

    // Check if error is an instance of Error before accessing error.message
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
