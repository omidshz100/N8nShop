import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log the contact form submission
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    });

    // Send email notification
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'N8N Shop Contact <noreply@yourdomain.com>', // You'll need to verify your domain with Resend
          to: ['omidshz100@gmail.com'],
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p style="margin: 0 0 10px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h3 style="margin-top: 0; color: #374151;">Message:</h3>
                <p style="line-height: 1.6; color: #4b5563;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 8px; font-size: 14px; color: #1e40af;">
                <p style="margin: 0;"><strong>Reply to:</strong> You can reply directly to this email to contact ${name}.</p>
              </div>
            </div>
          `,
          replyTo: email // This allows you to reply directly to the person who contacted you
        });
        
        console.log('Email sent successfully to omidshz100@gmail.com');
      } else {
        console.warn('RESEND_API_KEY not found, email not sent');
        // Still return success to user, but log that email wasn't sent
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the request if email fails, but log it
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
