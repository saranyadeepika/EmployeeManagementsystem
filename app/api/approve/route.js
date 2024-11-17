import {  NextResponse } from 'next/server';
import adminTable from '@/AdminModel'; 
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ROOTMAIL,
    pass: process.env.ROOTMAILPASSWORD,
  },
});

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const email = searchParams.get('email') ?? undefined;
  const name = searchParams.get('name');

  // Check that email is not null before proceeding
  if (!email) {
    return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
  }

  // Debugging: log incoming request parameters
  console.log('Received request to approve employee:', { email, name });

  try {
    // Employee does not exist, so create and save a new entry
    const employee = new adminTable({
      name,
      email,
      isApprove: true, // Mark as approved
    });

    await employee.save();
    console.log('Employee saved to database:', employee);

    // Send notification email to the employee
    await transporter.sendMail({
      from: process.env.ROOTMAIL,
      to: email,  // Type-cast to ensure email is treated as a string
      subject: 'Account Approved',
      html: `<p>Hello ${name},</p>
             <p>Your account has been approved by the root admin. You can now <a href="http://localhost:3000/login">log in</a>.</p>`
    });
    console.log('Approval email sent to:', email);

    return NextResponse.json({ success: true, message: 'Employee approved and notified' });
  } catch (error) {
    console.error('Error in approval process:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
