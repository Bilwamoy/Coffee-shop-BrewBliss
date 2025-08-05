import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message, type = 'general' } = await request.json();

    if (!name || !email || !subject || !message) {
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

    const getTypeIcon = (type: string) => {
      switch (type) {
        case 'barista': return '👨‍🍳';
        case 'complaint': return '⚠️';
        case 'compliment': return '🌟';
        case 'suggestion': return '💡';
        case 'order': return '🛒';
        case 'catering': return '🍽️';
        default: return '📧';
      }
    };

    const getTypeTitle = (type: string) => {
      switch (type) {
        case 'barista': return 'Barista Consultation';
        case 'complaint': return 'Customer Complaint';
        case 'compliment': return 'Customer Compliment';
        case 'suggestion': return 'Customer Suggestion';
        case 'order': return 'Order Inquiry';
        case 'catering': return 'Catering Request';
        default: return 'General Inquiry';
      }
    };

    const emailContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8f6f3;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 15px 15px 0 0;">
          <div style="font-size: 48px; margin-bottom: 10px;">${getTypeIcon(type)}</div>
          <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Brew & Bliss Contact</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">${getTypeTitle(type)}</p>
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
          </div>
          
          <!-- Subject -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #8B4513; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
              <span style="margin-right: 10px;">📋</span> Subject
            </h3>
            <div style="background-color: #f9f7f4; padding: 20px; border-radius: 10px; border: 2px solid #e8e3de;">
              <p style="margin: 0; font-size: 16px; font-weight: 600; color: #333;">${subject}</p>
            </div>
          </div>
          
          <!-- Message -->
          <div style="margin-bottom: 30px;">
            <h3 style="color: #8B4513; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
              <span style="margin-right: 10px;">💬</span> Message
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
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin" style="background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-flex; align-items: center;">
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
              This message was sent through your Brew & Bliss website contact form
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email to admin
    const { data, error } = await resend.emails.send({
      from: 'Brew & Bliss Contact <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL || 'admin@brewbliss.com'],
      subject: `${getTypeTitle(type)}: ${subject} - From ${name}`,
      html: emailContent,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // Send confirmation email to customer
    const confirmationContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f6f3;">
        <div style="background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 15px 15px 0 0;">
          <div style="font-size: 48px; margin-bottom: 10px;">☕</div>
          <h1 style="margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 15px 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <p style="font-size: 18px; color: #333; margin: 0 0 20px 0;">Hi ${name},</p>
          
          <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
            We've received your message about "<strong>${subject}</strong>" and our team will get back to you within 24 hours.
          </p>
          
          <div style="background: linear-gradient(135deg, #f5f3f0 0%, #ede8e3 100%); padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #D2691E;">
            <p style="margin: 0; color: #333; font-style: italic;">"${message.substring(0, 150)}${message.length > 150 ? '...' : ''}"</p>
          </div>
          
          <p style="color: #666; line-height: 1.6; margin: 20px 0;">
            In the meantime, feel free to visit us at our coffee shop or browse our menu online!
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}" style="background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: 600; display: inline-block;">
              Visit Our Website
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #999; font-size: 14px;">
            <p style="margin: 0;">Brew & Bliss Coffee Shop</p>
            <p style="margin: 5px 0 0 0;">123 Coffee Lane, Brewtown, CA 90210</p>
          </div>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'Brew & Bliss <onboarding@resend.dev>',
      to: [email],
      subject: 'Thank you for contacting Brew & Bliss!',
      html: confirmationContent,
    });

    return NextResponse.json(
      { 
        message: 'Message sent successfully! We\'ll get back to you soon.',
        id: data?.id,
        type: getTypeTitle(type)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}