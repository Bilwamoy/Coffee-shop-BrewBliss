# 📧 Contact System Setup Guide

Your Brew & Bliss coffee shop now has a fully functional contact system! Here's how to set it up and use it.

## 🚀 Features

### ✅ **Fully Functional Contact Form**
- **Multiple Contact Types**: General, Barista Questions, Complaints, Compliments, Suggestions, Orders, Catering
- **Real Email Sending**: Uses Resend API to send actual emails
- **Beautiful Email Templates**: Professional HTML emails with coffee shop branding
- **Auto-Confirmation**: Customers receive confirmation emails
- **Form Validation**: Client and server-side validation

### ✅ **"Ask Our Baristas" Section**
- **Homepage Integration**: Beautiful section showcasing expert baristas
- **Quick Action Buttons**: Brewing Tips, Bean Selection, Latte Art, Roasting
- **Direct Links**: All buttons link to contact form with barista type pre-selected

### ✅ **Admin Message Management**
- **Comprehensive Dashboard**: View all customer messages in admin panel
- **Message Filtering**: Filter by status, type, priority
- **Status Tracking**: Unread, Read, Replied, In Progress, Archived
- **Priority Levels**: High, Medium, Low priority classification
- **Staff Assignment**: Assign messages to specific team members

## 🛠️ Setup Instructions

### 1. **Environment Variables**
```bash
# Copy the example file
cp .env.example .env.local
```

### 2. **Get Resend API Key**
1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free)
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env.local` file

### 3. **Configure Environment**
Edit `.env.local`:
```env
RESEND_API_KEY=re_your_actual_api_key_here
ADMIN_EMAIL=your-admin@email.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. **Test the System**
1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000`
3. Scroll down to "Ask Our Expert Baristas" section
4. Click "Ask Our Baristas" button
5. Fill out the form and submit
6. Check your admin email for the message
7. Check the customer email for confirmation

## 📱 How to Use

### **For Customers:**
1. **Homepage**: Scroll to "Ask Our Expert Baristas" section
2. **Contact Page**: Visit `/contact` directly
3. **Quick Actions**: Click specific buttons for brewing tips, bean selection, etc.
4. **Form Submission**: Fill out form with name, email, subject, message
5. **Confirmation**: Receive immediate confirmation email

### **For Admins:**
1. **Admin Panel**: Visit `/admin/messages`
2. **View Messages**: See all customer inquiries organized by type and status
3. **Filter & Search**: Use filters to find specific messages
4. **Manage Status**: Mark as read, replied, in progress, or archived
5. **Email Integration**: Click reply to respond via email

## 🎨 Contact Types

| Type | Description | Use Case |
|------|-------------|----------|
| **👨‍🍳 Barista Questions** | Coffee expertise inquiries | Brewing tips, bean selection, latte art |
| **📧 General** | General inquiries | Store hours, locations, general info |
| **⚠️ Complaints** | Customer complaints | Service issues, quality problems |
| **🌟 Compliments** | Positive feedback | Praise for staff, products, service |
| **💡 Suggestions** | Improvement ideas | Menu suggestions, service improvements |
| **🛒 Order Inquiries** | Order-related questions | Order status, modifications, issues |
| **🍽️ Catering** | Catering requests | Corporate events, large orders |

## 📊 Admin Dashboard Features

### **Message Management**
- **Status Tracking**: Unread → Read → Replied → Archived
- **Priority Levels**: High (red), Medium (yellow), Low (green)
- **Staff Assignment**: Assign to specific baristas/managers
- **Tags System**: Automatic tagging based on content
- **Search & Filter**: Find messages quickly

### **Statistics**
- Total messages received
- Unread message count
- Barista questions count
- High priority messages

### **Email Templates**
- **Professional Design**: Coffee shop branded emails
- **Customer Info**: Name, email, contact details
- **Message Content**: Full message with formatting
- **Quick Actions**: Reply button, admin panel link
- **Timestamps**: When message was received

## 🔧 Customization

### **Email Templates**
Edit `/app/api/contact/route.ts` to customize:
- Email styling and branding
- Content structure
- Auto-reply messages
- Admin notification format

### **Contact Types**
Add new contact types in `/app/contact/page.tsx`:
```typescript
const contactTypes = [
  { value: 'new_type', label: 'New Type', icon: '🆕' },
  // ... existing types
];
```

### **Barista Profiles**
Update barista information in `/app/page.tsx`:
```typescript
// Update the barista cards with real staff info
<h3>Your Barista Name</h3>
<p>Their specialty and experience</p>
```

## 🚀 Deployment Notes

### **Production Setup**
1. Update `NEXT_PUBLIC_BASE_URL` to your domain
2. Verify `ADMIN_EMAIL` is correct
3. Test email delivery in production
4. Set up email domain verification in Resend (optional)

### **Email Deliverability**
- **Free Tier**: 100 emails/day, 3,000/month
- **Custom Domain**: Set up for better deliverability
- **SPF/DKIM**: Resend handles automatically

## 📞 Support

If you need help with setup:
1. Check the Resend documentation
2. Verify environment variables are correct
3. Test with a simple email first
4. Check browser console for errors

## 🎉 You're All Set!

Your coffee shop now has a professional contact system that:
- ✅ Sends real emails to admins
- ✅ Confirms receipt to customers  
- ✅ Organizes messages in admin panel
- ✅ Handles different inquiry types
- ✅ Showcases your barista expertise

Customers can now easily reach out with questions, and you'll never miss an important message! ☕✨