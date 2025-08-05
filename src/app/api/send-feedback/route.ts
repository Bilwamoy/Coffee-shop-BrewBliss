import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, rating } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #8B4513; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 24px;">☕ New Feedback from Brew & Bliss</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #8B4513; margin-top: 0;">Customer Feedback Details</h2>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            ${rating ? `<p style="margin: 5px 0;"><strong>Rating:</strong> ${'⭐'.repeat(rating)} (${rating}/5)</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #8B4513;">Message:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #D2691E; border-radius: 4px;">
              <p style="margin: 0; line-height: 1.6;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666;">
            <p style="margin: 0;">This feedback was sent from your Brew & Bliss website</p>
            <p style="margin: 5px 0; font-size: 12px;">Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Brew & Bliss Feedback <onboarding@resend.dev>',
      to: [process.env.ADMIN_MAIL!],
      subject: `New Feedback from ${name} - Brew & Bliss`,
      html: emailContent,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Feedback sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}