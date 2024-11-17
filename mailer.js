import nodemailer from 'nodemailer';

// Create the transporter for sending emails using Gmail's SMTP server
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // TLS is recommended on port 587
  auth: {
    user: process.env.ROOTMAIL, // Use process.env to access the environment variable
    pass: process.env.ROOTMAILPASSWORD, 
  },
});

// Async function to send an email
export async function sendMail({ email, name }) {
  try {
    const data = {
      name,
      email,
    };

    // Ensure data is serialized and URL encoded
    const serializedData = encodeURIComponent(JSON.stringify(data));

    // Sending the email
    const info = await transporter.sendMail({
      from: process.env.ROOTMAIL, // From address (configured in .env)
      to: 'fashionandlifestyle2263@gmail.com', // Receiver email address
      subject: "New Account Approval Request",
      html: `
        <p>A new account approval request has been received for <strong>${name}</strong> (${email}).</p>
        <p>Click below to approve or deny this request:</p>
        <div>
          <a href="http://localhost:3000/api/approve?name=${name}&email=${email}" 
             style="display: inline-block; background-color: green; color: white; padding: 10px 20px; text-decoration: none; margin-right: 10px;">Approve</a>
          <a href="http://localhost:3000/api/deny?data=${serializedData}" 
             style="display: inline-block; background-color: red; color: white; padding: 10px 20px; text-decoration: none;">Deny</a>
        </div>
      `,
    });

    // Return the data if email was sent successfully
    return data;

  } catch (error) {
    console.error('Error Sending Email:', error);
    return false;
  }
}
