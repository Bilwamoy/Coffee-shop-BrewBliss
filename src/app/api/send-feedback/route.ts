import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend inside the function to avoid build-time issues
const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not configured');
  }
  return new Resend(process.env.RESEND_API_KEY);
};

export async function POST(request: NextRequest) {
  try {
    // Initialize Resend client
    let resend;
    try {
      resend = getResendClient();
    } catch (error) {
      console.error('Resend initialization error:', error);
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    const { name, email, message, rating } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const emailContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8f6f3;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 15px 15px 0 0;">
          <div style="font-size: 48px; margin-bottom: 10px;">💬</div>
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Customer Feedback</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Brew & Bliss Coffee Shop</p>
        </div>
        
        <!-- Content -->
        <div style="background-color: white; padding: 40px 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <!-- Customer Info -->
          <div style="background: linear-gradient(135deg, #f5f3f0 0%, #ede8e3 100%); padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 5px solid #D2691E;">
            <h2 style="color: #8B4513; margin: 0 0 20px 0; font-size: 20px; display: flex; align-items: center;">
              <span style="margin-right: 10px;">👤</span> Customer Information
            </h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <p style="margin: 0; color: #666; font-size: 14px; font-weight: 600;">NAME</p>
                <p style="margin: 5px 0 0 0; color: #333; font-size: 16px; font-weight: 500;">${name}</p>
              </div>
              <div>
                <p style="margin: 0; color: #666; font-size: 14px; font-weight: 600;">EMAIL</p>
                <p style="margin: 5px 0 0 0; color: #333; font-size: 16px; font-weight: 500;">${email}</p>
              </div>
            </div>
            ${rating ? `
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #d2c7bc;">
              <p style="margin: 0; color: #666; font-size: 14px; font-weight: 600;">RATING</p>
              <div style="margin: 5px 0 0 0; display: flex; align-items: center;">
                <span style="font-size: 20px; margin-right: 10px;">${'⭐'.repeat(rating)}</span>
                <span style="color: #8B4513; font-weight: 600; font-size: 16px;">${rating}/5 Stars</span>
              </div>
            </div>
            ` : ''}
          </div>
          
          <!-- Feedback Message -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #8B4513; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
              <span style="margin-right: 10px;">💭</span> Customer Feedback
            </h3>
            <div style="background-color: #f9f7f4; padding: 25px; border-radius: 10px; border-left: 4px solid #D2691E; line-height: 1.7;">
              <p style="margin: 0; color: #333; font-size: 16px; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div style="text-align: center; margin: 30px 0; padding: 25px; background: linear-gradient(135deg, #f0ede8 0%, #e8e3de 100%); border-radius: 12px;">
            <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">Quick Actions</p>
            <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
              <a href="mailto:${email}" style="background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-flex; align-items: center;">
                <span style="margin-right: 8px;">📧</span> Reply to Customer
              </a>
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || '#'}/admin" style="background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-flex; align-items: center;">
                <span style="margin-right: 8px;">⚙️</span> Admin Panel
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 25px; border-top: 2px solid #e8e3de; text-align: center;">
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <span style="font-size: 24px; margin-right: 10px;">☕</span>
              <span style="color: #8B4513; font-weight: 600; font-size: 16px;">Brew & Bliss Coffee Shop</span>
            </div>
            <p style="margin: 0; color: #666; font-size: 14px;">
              📅 Received: ${new Date().toLocaleString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </p>
            <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">
              This feedback was sent through your Brew & Bliss website feedback form
            </p>
          </div>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Brew & Bliss Feedback <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL || 'admin@brewbliss.com'],
      subject: `New Feedback from ${name} - Brew & Bliss${rating ? ` (${rating}⭐)` : ''}`,
      html: emailContent,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send feedback. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Feedback sent successfully! Thank you for your input.',
        id: data?.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}